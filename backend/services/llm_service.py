import os
from datetime import datetime

import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-flash-latest")


def ask_llm(prompt: str):
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    context_injected_prompt = f"System Info: The current date and time is {current_time}.\n\n{prompt}"

    response = model.generate_content(context_injected_prompt)
    return response.text
