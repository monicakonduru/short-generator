import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from openai import OpenAI
from pydantic import BaseModel

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

app = FastAPI()


class GenerateScriptRequest(BaseModel):
    topic: str
    style: str


@app.get("/")
def home():
    return {"message": "Backend working", "api_key_loaded": bool(OPENAI_API_KEY)}


@app.post("/generate-script")
def generate_script(body: GenerateScriptRequest):
    if not client:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not set in .env")

    topic = body.topic.strip()
    style = body.style.strip()
    if not topic:
        raise HTTPException(status_code=400, detail="Topic is required")
    if not style:
        raise HTTPException(status_code=400, detail="Style is required")

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "You write engaging narration scripts for vertical YouTube shorts. "
                    "Match the requested tone and style. "
                    "Keep it under 150 words, hook in the first line, end with a punch."
                ),
            },
            {
                "role": "user",
                "content": f"Write a {style} style script for: {topic}",
            },
        ],
    )

    script = response.choices[0].message.content
    return {"topic": topic, "style": style, "script": script}
