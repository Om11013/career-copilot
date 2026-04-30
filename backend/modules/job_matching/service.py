from .matcher import calculate_match
from .parser import parse_job_description
from .schemas import JobMatchRequest, JobMatchResponse


def match_job_service(request: JobMatchRequest) -> JobMatchResponse:
    parsed_jd = parse_job_description(request.job_description)
    score, matched, missing, insight = calculate_match(request.resume_data, parsed_jd)

    return JobMatchResponse(match_score=score, matched_skills=matched, missing_skills=missing, insight=insight)
