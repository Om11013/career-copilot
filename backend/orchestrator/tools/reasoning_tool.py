from services.llm_service import ask_llm


def reasoning_tool(prompt: str):
    """
    Returns:
    {
        "response": str
    }
    """

    if not prompt:
        raise ValueError("Prompt is required")

    response = ask_llm(prompt)

    return {"response": response}
