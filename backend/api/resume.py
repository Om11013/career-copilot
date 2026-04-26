from typing import Optional

from fastapi import APIRouter, File, Form, UploadFile

from services.resume_service import process_and_analyze_resume

router = APIRouter()


@router.post("/analyze-resume")
async def analyze_resume_api(file: Optional[UploadFile] = File(None), resume: Optional[str] = Form(None)):
    file_bytes = None
    filename = None
    if file:
        file_bytes = await file.read()
        filename = file.filename
    return process_and_analyze_resume(file_bytes, filename, resume)
