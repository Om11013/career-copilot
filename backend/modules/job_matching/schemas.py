from typing import Any, Dict, List

from pydantic import BaseModel


class JobMatchRequest(BaseModel):
    resume_data: Dict[str, Any]
    job_description: str


class JobMatchResponse(BaseModel):
    match_score: int
    matched_skills: List[str]
    missing_skills: List[str]
    insight: str


class ParsedJD(BaseModel):
    required_skills: List[str]
    preferred_skills: List[str]
    role: str
    experience: str
