INTENT_TOOL_MAP = {"resume_analysis": ["resume_analyzer"], "job_matching": ["resume_analyzer", "jd_parser", "job_matcher"], "gap_analysis": ["resume_analyzer", "jd_parser", "job_matcher", "reasoning"], "improvement_guidance": ["resume_analyzer", "reasoning"], "general_query": ["reasoning"]}  # only if resume_data missing  # only if resume_data missing  # only if resume_data missing


def should_run_resume_analyzer(context_state):
    return context_state.get("resume_data") is None


def should_run_jd_parser(context_state):
    return context_state.get("jd_data") is None


def should_run_reasoning(intent):
    return intent in ["gap_analysis", "improvement_guidance", "general_query"]
