from datetime import datetime

import google.generativeai as genai

from core.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-flash-latest")


def ask_llm(prompt: str):
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    context_injected_prompt = f"System Info: The current date and time is {current_time}.\n\n{prompt}"

    response = model.generate_content(context_injected_prompt)
    return response.text
