from modules.job_matching.matcher import calculate_match
from modules.job_matching.schemas import ParsedJD


def job_matcher_tool(resume_data: dict, jd_data: dict):
    """
    Returns:
    {
        "match_score": int,
        "matched_skills": list,
        "missing_skills": list,
        "insight": str
    }
    """

    if not resume_data or not jd_data:
        raise ValueError("Missing inputs for job matching")

    # Convert dict → Pydantic model
    jd_model = ParsedJD(**jd_data)

    score, matched, missing, insight = calculate_match(resume_data, jd_model)

    return {"match_score": score, "matched_skills": matched, "missing_skills": missing, "insight": insight}
