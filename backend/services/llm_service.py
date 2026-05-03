from datetime import datetime

from google import genai

try:
    from groq import Groq

    HAS_GROQ = True
except ImportError:
    HAS_GROQ = False
    Groq = None  # type: ignore

from core.config import settings

gemini_client = genai.Client(api_key=settings.GEMINI_API_KEY)
groq_client = Groq(api_key=settings.GROQ_API_KEY) if HAS_GROQ and settings.GROQ_API_KEY else None


def ask_llm(prompt: str):
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    context_injected_prompt = f"System Info: The current date and time is {current_time}.\n\n{prompt}"

    if groq_client:
        try:
            groq_response = groq_client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": context_injected_prompt}],
            )
            return str(groq_response.choices[0].message.content)
        except Exception as e:
            print(f"Groq API failed: {e}. Falling back to Gemini.")

    # Fallback to Gemini
    gemini_response = gemini_client.models.generate_content(model="gemini-2.5-flash", contents=context_injected_prompt)
    return str(gemini_response.text)
