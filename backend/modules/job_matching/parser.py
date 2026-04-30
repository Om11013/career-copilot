import json

from services.llm_service import ask_llm

from .schemas import ParsedJD


def parse_job_description(jd_text: str) -> ParsedJD:
    prompt = f"""
    You are an expert HR system. Parse the following Job Description and extract:
    - required_skills (List of strings)
    - preferred_skills (List of strings)
    - role (String, the job title)
    - experience (String, e.g. "3-5 years" or "Entry level")

    Job Description:
    {jd_text}

    Return ONLY a valid JSON object matching this schema. No markdown, no backticks, just the JSON string:
    {{
      "required_skills": ["skill1", "skill2"],
      "preferred_skills": ["skill3"],
      "role": "Job Title",
      "experience": "Experience requirement"
    }}
    """
    response_text = ask_llm(prompt)

    cleaned = response_text.strip()
    if cleaned.startswith("```json"):
        cleaned = cleaned[7:]
    if cleaned.startswith("```"):
        cleaned = cleaned[3:]
    if cleaned.endswith("```"):
        cleaned = cleaned[:-3]

    try:
        data = json.loads(cleaned.strip())
        return ParsedJD(**data)
    except Exception:
        return ParsedJD(required_skills=[], preferred_skills=[], role="", experience="")
