from typing import Optional

from fastapi import APIRouter, File, Form, UploadFile

from services.llm_service import ask_llm
from services.resume_service import analyze_resume, extract_text_from_pdf

router = APIRouter()


@router.get("/ask")
def ask_ai(query: str):
    print(query)
    return {"response": ask_llm(query)}


@router.post("/analyze-resume")
async def analyze_resume_api(file: Optional[UploadFile] = File(None), resume: Optional[str] = Form(None)):
    final_text = ""

    # Prefer PDF content if provided
    if file and file.filename and file.filename.endswith(".pdf"):
        file_bytes = await file.read()
        final_text = extract_text_from_pdf(file_bytes)
    elif resume:
        # Fall back to textarea string
        final_text = resume

    if not final_text.strip():
        return {"error": "No resume content provided. Please upload a PDF or paste text."}

    return analyze_resume(final_text)
