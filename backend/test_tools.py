from orchestrator.orchestrator import run_orchestrator

input_payload = {
    "user_query": "Why am I not getting shortlisted?",
    "resume_text": """
    Backend developer with Python, FastAPI, REST APIs experience.
    """,
    "job_description": """
    Looking for Python developer with Docker, AWS, CI/CD experience.
    """,
}

result = run_orchestrator(input_payload)

print(result)
