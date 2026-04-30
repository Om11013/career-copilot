from orchestrator.intent_classifier import detect_intent
from orchestrator.intent_mapping import INTENT_TOOL_MAP, should_run_resume_analyzer
from orchestrator.tools.jd_parser_tool import jd_parser_tool
from orchestrator.tools.job_matcher_tool import job_matcher_tool
from orchestrator.tools.reasoning_tool import reasoning_tool
from orchestrator.tools.resume_tool import resume_analyzer_tool


def run_orchestrator(input_payload: dict):
    """
    Main orchestrator function
    """

    # Step 1 — Extract inputs
    user_query = str(input_payload.get("user_query", ""))
    resume_file = input_payload.get("resume_file")
    resume_text = input_payload.get("resume_text")
    resume_data = input_payload.get("resume_data")
    job_description = input_payload.get("job_description")

    # Step 2 — Initialize context
    context_state = {"resume_text": resume_text, "resume_data": resume_data, "jd_data": None, "match_result": None}

    # Step 3 — Detect intent
    intent = detect_intent(user_query)

    # Step 4 — Get tool plan
    tool_plan = INTENT_TOOL_MAP.get(intent, ["reasoning"])

    # Step 5 — Execute tools
    for tool in tool_plan:

        # ---- Resume Analyzer ----
        if tool == "resume_analyzer":
            if should_run_resume_analyzer(context_state):
                result = resume_analyzer_tool(resume_file=resume_file, resume_text=context_state["resume_text"])
                context_state.update(result)

        # ---- JD Parser ----
        elif tool == "jd_parser":
            if not job_description:
                return {"error": "Job description is required"}

            result = jd_parser_tool(job_description)
            context_state.update(result)

        # ---- Job Matcher ----
        elif tool == "job_matcher":
            if not context_state["resume_data"] or not context_state["jd_data"]:
                return {"error": "Missing data for job matching"}

            result = job_matcher_tool(resume_data=context_state["resume_data"], jd_data=context_state["jd_data"])
            context_state["match_result"] = result

        # ---- Reasoning ----
        elif tool == "reasoning":
            prompt = build_reasoning_prompt(user_query, intent, context_state)
            result = reasoning_tool(prompt)
            return {"response": result["response"]}

    # Step 6 — Default return (if no reasoning used)
    return {"intent": intent, "data": context_state}


def build_reasoning_prompt(user_query, intent, context_state):
    """
    Builds prompt for final reasoning
    """

    resume_data = context_state.get("resume_data")
    match_result = context_state.get("match_result")

    prompt = f"""
You are an AI Career Copilot.

User Query:
{user_query}

Intent:
{intent}

Available Data:

Resume Insights:
{resume_data}

Match Result:
{match_result}

Instructions:
- Answer the user clearly and directly
- Explain gaps if present
- Suggest improvements if needed
- Do NOT output raw JSON
"""

    return prompt
