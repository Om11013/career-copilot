from typing import Any, Dict, List, Tuple

from services.llm_service import ask_llm

from .schemas import ParsedJD


def get_insights(resume_data: Dict[str, Any], jd: ParsedJD, score: int, matched: List[str], missing: List[str]) -> str:
    prompt = f"""
    You are an expert career coach. A user has applied for the role of "{jd.role}".
    Based on their resume and the job description, their deterministic match score is {score}/100.
    
    Matched Skills: {matched}
    Missing Skills: {missing}
    
    Provide a brief, encouraging insight containing:
    1. Why it's a good match
    2. What's missing
    3. An improvement suggestion
    
    Keep it under 3-4 sentences.
    """
    return ask_llm(prompt).strip()


def calculate_match(resume_data: Dict[str, Any], jd: ParsedJD) -> Tuple[int, List[str], List[str], str]:
    resume_text = str(resume_data).lower()

    matched_skills = []
    missing_skills = []

    req_skills = jd.required_skills if jd.required_skills else []
    for skill in req_skills:
        if skill.lower() in resume_text:
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    if len(req_skills) > 0:
        skill_score = (len(matched_skills) / len(req_skills)) * 50
    else:
        skill_score = 50.0

    exp_keywords = [word for word in jd.experience.lower().split() if word.isalnum()]
    if exp_keywords:
        exp_matches = sum(1 for kw in exp_keywords if kw in resume_text)
        exp_score = (exp_matches / len(exp_keywords)) * 30
    else:
        exp_score = 30.0

    pref_skills = jd.preferred_skills if jd.preferred_skills else []
    if pref_skills:
        pref_matches = sum(1 for skill in pref_skills if skill.lower() in resume_text)
        keyword_score = (pref_matches / len(pref_skills)) * 20
    else:
        keyword_score = 20.0

    total_score = int(skill_score + exp_score + keyword_score)
    total_score = min(max(total_score, 0), 100)

    insight = get_insights(resume_data, jd, total_score, matched_skills, missing_skills)

    return total_score, matched_skills, missing_skills, insight
