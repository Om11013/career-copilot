import io
import json

import pdfplumber

from services.llm_service import ask_llm


def extract_text_from_pdf(file_bytes: bytes) -> str:
    text = ""
    try:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                # layout=True preserves visual layout, spaces, and bullet formatting
                page_text = page.extract_text(layout=True)
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print(f"PDF extraction error: {e}")
    return text


def analyze_resume(resume_text: str):
    print(resume_text)
    prompt = f"""
    You are an expert resume analyzer. Analyze the resume below and provide
    structured insights.

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
    * Do NOT hallucinate missing sections. If a section is missing, explicitly
      state 'Not found' in the array or string.
    * Keep output concise but informative.
    * Do NOT include unnecessary explanations.
    * Output ONLY the raw JSON object.
    """

    response = ask_llm(prompt)

    try:
        return json.loads(response)
    except Exception:
        return {"error": "Invalid response from AI", "raw": response}
