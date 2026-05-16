import os

from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Backend working", "api_key_loaded": bool(OPENAI_API_KEY)}
