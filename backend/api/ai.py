from fastapi import APIRouter

from services.llm_service import ask_llm
from services.resume_service import analyze_resume

router = APIRouter()


@router.get("/ask")
def ask_ai(query: str):
    print(query)
    return {"response": ask_llm(query)}


@router.post("/analyze-resume")
def analyze_resume_api(payload: dict):
    return analyze_resume(payload["resume"])
