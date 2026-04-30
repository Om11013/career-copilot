import json

from fastapi import APIRouter, File, Form, UploadFile

from orchestrator.orchestrator import run_orchestrator

router = APIRouter()


@router.post("/orchestrate")
async def orchestrate(user_query: str = Form(...), resume_file: UploadFile = File(None), resume_text: str = Form(None), resume_data: str = Form(None), job_description: str = Form(None)):
    try:
        file_bytes = None

        if resume_file:
            file_bytes = await resume_file.read()

        parsed_resume_data = None
        if resume_data:
            parsed_resume_data = json.loads(resume_data)

        input_payload = {"user_query": user_query, "resume_file": file_bytes, "resume_text": resume_text, "resume_data": parsed_resume_data, "job_description": job_description}

        result = run_orchestrator(input_payload)

        return result

    except Exception as e:
        return {"error": str(e)}
