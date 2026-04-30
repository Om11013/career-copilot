from fastapi import APIRouter

from .schemas import JobMatchRequest, JobMatchResponse
from .service import match_job_service

router = APIRouter()


@router.post("/match-job", response_model=JobMatchResponse)
def match_job(request: JobMatchRequest):
    return match_job_service(request)
