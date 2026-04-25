from fastapi import APIRouter

from services.llm_service import ask_llm

router = APIRouter()


@router.get("/ask")
def ask_ai(query: str):
    print(query)
    return {"response": ask_llm(query)}
