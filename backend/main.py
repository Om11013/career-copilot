from fastapi import FastAPI

from api.chat import router as chat_router
from api.resume import router as resume_router
from core.middleware import add_middlewares

app = FastAPI()
add_middlewares(app)

app.include_router(chat_router, prefix="/ai")
app.include_router(resume_router, prefix="/ai")


@app.get("/")
def read_root():
    return {"message": "Career Copilot API running"}
