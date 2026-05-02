from services.llm_service import ask_llm

INTENTS = ["resume_analysis", "job_matching", "gap_analysis", "improvement_guidance", "general_query"]


def detect_intent(user_query: str) -> str:
    """
    Uses LLM to classify user intent.
    Returns one of the predefined intents.
    """

    if not user_query:
        return "general_query"

    prompt = f"""
You are an intent classification system.

Classify the user's query into EXACTLY one of the following labels:

- resume_analysis
- job_matching
- gap_analysis
- improvement_guidance
- general_query

Rules:
- Return ONLY the label
- Do NOT explain
- Do NOT add extra text

Examples:

Query: Analyze my resume
Intent: resume_analysis

Query: Match me with this job
Intent: job_matching

Query: Why am I not getting shortlisted?
Intent: gap_analysis

Query: How can I improve my resume?
Intent: improvement_guidance

Query: What skills are trending?
Intent: general_query

---

User Query: {user_query}
Intent:
"""

    try:
        response = ask_llm(prompt).strip().lower()

        # Clean response
        response = response.replace("\n", "").strip()

        # Validate
        if response in INTENTS:
            return response

        return "general_query"

    except Exception:
        return "general_query"
