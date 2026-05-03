import json

from orchestrator.tools.jd_parser_tool import jd_parser_tool
from orchestrator.tools.job_matcher_tool import job_matcher_tool
from orchestrator.tools.resume_tool import resume_analyzer_tool
from services.llm_service import ask_llm

# --- 1. Tool Definition Layer ---

TOOLS_REGISTRY = [{"name": "resume_analyzer", "description": "Extracts structured data from the user's resume. Call this if resume data is missing.", "input_schema": {}}, {"name": "jd_parser", "description": "Parses the job description into structured skills. Call this before job matching.", "input_schema": {}}, {"name": "job_matcher", "description": "Calculates match score between resume and job description. Requires both to be parsed first.", "input_schema": {}}]


def execute_tool(tool_name: str, input_args: dict, context_state: dict):
    """Tool Abstraction Layer executing the corresponding Python function."""

    try:
        if tool_name == "resume_analyzer":
            resume_file = context_state.get("resume_file")
            resume_text = context_state.get("resume_text")
            if not resume_file and not resume_text:
                return "Error: No resume provided by user."

            result = resume_analyzer_tool(resume_file=resume_file, resume_text=resume_text)
            context_state["resume_data"] = result.get("resume_data")
            context_state["resume_text"] = result.get("resume_text")
            return "Success: Resume parsed."

        elif tool_name == "jd_parser":
            jd = context_state.get("job_description")
            if not jd:
                return "Error: No job description provided."

            result = jd_parser_tool(jd)
            context_state["jd_data"] = result.get("jd_data")
            return "Success: Job description parsed."

        elif tool_name == "job_matcher":
            resume_data = context_state.get("resume_data")
            jd_data = context_state.get("jd_data")
            if not resume_data or not jd_data:
                return "Error: Missing resume_data or jd_data. Parse them first."

            result = job_matcher_tool(resume_data=resume_data, jd_data=jd_data)
            context_state["match_result"] = result
            return f"Success: Job match score is {result.get('match_score')}/100"

        return f"Error: Tool {tool_name} not found."
    except Exception as e:
        return f"Error executing {tool_name}: {str(e)}"


# --- 2. LLM Prompt Design ---


def build_agent_prompt(user_query: str, context_state: dict, observation_log: list) -> str:
    # We expose structured data to LLM so it can reason and answer.
    state_summary = {"user_provided_inputs": {"has_resume": bool(context_state.get("resume_file") or context_state.get("resume_text")), "has_job_description": bool(context_state.get("job_description"))}, "resume_data": context_state.get("resume_data"), "jd_data": context_state.get("jd_data"), "match_result": context_state.get("match_result")}

    prompt = f"""
You are an AI Career Copilot Agent. Your job is to fulfill the user's request by calling tools sequentially.

User Query: "{user_query}"

Current Context State:
{json.dumps(state_summary, indent=2)}

Available Tools:
{json.dumps(TOOLS_REGISTRY, indent=2)}

Past Observations:
{json.dumps(observation_log, indent=2)}

INSTRUCTIONS:
1. Decide the next action based on context. If you need to use a tool, output a JSON object with "action": "tool_name" and "input": {{}}.
2. Do not call a tool if its prerequisite data is missing.
3. If you have enough information to answer the user fully, or if no tools apply, output "action": "finish" and provide the final response in "output".
4. You MUST respond ONLY with valid JSON. Do not add conversational text outside the JSON.

OUTPUT FORMAT MUST BE STRICTLY JSON:
{{
  "action": "tool_name" | "finish",
  "input": {{}},
  "output": "Your final conversational response to the user (ONLY IF action is 'finish')"
}}
"""
    return prompt


# --- 3. Agent Loop Implementation ---


def run_orchestrator(input_payload: dict):
    user_query = str(input_payload.get("user_query", ""))

    # Initialize context state with available inputs
    context_state = {"resume_file": input_payload.get("resume_file"), "resume_text": input_payload.get("resume_text"), "resume_data": input_payload.get("resume_data"), "job_description": input_payload.get("job_description"), "jd_data": None, "match_result": None}

    observation_log: list[dict] = []
    max_steps = 4

    for step in range(max_steps):

        # 1. Build prompt
        prompt = build_agent_prompt(user_query, context_state, observation_log)

        # 2. Call LLM
        response_text = ask_llm(prompt)

        # 3. Parse JSON response safely
        try:
            clean_text = response_text.replace("```json", "").replace("```", "").strip()
            action_data = json.loads(clean_text)
        except json.JSONDecodeError:
            # Fallback if LLM outputs plain text instead of JSON
            safe_state = {k: v for k, v in context_state.items() if k != "resume_file"}
            return {"response": response_text, "data": safe_state}

        action = action_data.get("action")

        # 4. Handle Finish Action
        if action == "finish":

            safe_state = {k: v for k, v in context_state.items() if k != "resume_file"}
            return {"response": action_data.get("output", "Task complete."), "data": safe_state}

        # 5. Execute tool and track state
        input_args = action_data.get("input", {})
        observation = execute_tool(action, input_args, context_state)

        observation_log.append({"tool": action, "observation": observation})

    # Exceeded max steps
    safe_state = {k: v for k, v in context_state.items() if k != "resume_file"}
    return {"response": "I've reached my maximum steps without finishing. Please try rephrasing your request.", "data": safe_state}
