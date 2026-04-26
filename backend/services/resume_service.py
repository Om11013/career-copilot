import json

from services.llm_service import ask_llm


def analyze_resume(resume_text: str):
    prompt = f"""
    Analyze the following resume:

    {resume_text}

    Return ONLY valid JSON in this format:
    {{
      "strengths": [],
      "weaknesses": [],
      "suggestions": [],
      "score": number
    }}
    """

    response = ask_llm(prompt)

    try:
        return json.loads(response)
    except Exception:
        return {"error": "Invalid response from AI", "raw": response}
