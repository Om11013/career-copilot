import json

from services.llm_service import ask_llm
from services.pdf_service import extract_text_from_pdf


def process_and_analyze_resume(file_bytes: bytes | None, filename: str | None, raw_text: str | None):
    final_text = ""

    if file_bytes and filename and filename.endswith(".pdf"):
        final_text = extract_text_from_pdf(file_bytes)
    elif raw_text:
        final_text = raw_text

    if not final_text.strip():
        return {"error": "No resume content provided. Please upload a PDF or paste text."}

    return _analyze_resume_prompt(final_text)


def _analyze_resume_prompt(resume_text: str):
    prompt = f"""
    You are an expert resume analyzer. Analyze the resume below and provide structured insights.

    Resume:
    {resume_text}

    Return ONLY valid JSON strictly matching this schema:
    {{
      "summary": "Brief overview of candidate profile",
      "strengths": ["strength 1", "strength 2"],
      "weaknesses": ["missing skill 1", "gap 1"],
      "skills": {{
          "Category1": ["Skill 1", "Skill 2"]
      }},
      "experience": "Role progression, impact, relevance summary",
      "suggestions": ["Actionable improvement 1", "Actionable improvement 2"],
      "score": number (score out of 10)
    }}

    RULES:
    * Do NOT hallucinate missing sections. If a section is missing, explicitly state 'Not found' in the array or string.
    * Output ONLY raw JSON.
    """
    response = ask_llm(prompt)
    try:
        clean_text = response.replace("```json", "").replace("```", "").strip()
        return json.loads(clean_text)
    except Exception:
        return {"error": "Invalid response from AI", "raw": response}
