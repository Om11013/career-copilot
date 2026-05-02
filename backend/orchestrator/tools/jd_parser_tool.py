from modules.job_matching.parser import parse_job_description


def jd_parser_tool(job_description: str):
    """
    Returns:
    {
        "jd_data": dict
    }
    """

    if not job_description:
        raise ValueError("Job description is required")

    parsed = parse_job_description(job_description)

    return {"jd_data": parsed.dict()}
