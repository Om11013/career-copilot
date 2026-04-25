from fastapi import FastAPI

from api.ai import router as ai_router
from core.middleware import add_middlewares

app = FastAPI()

add_middlewares(app)

app.include_router(ai_router, prefix="/ai")


@app.get("/")
def read_root():
    return {"message": "Career Copilot API running"}
