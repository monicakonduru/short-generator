import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import errors as genai_errors
from pydantic import BaseModel

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class GenerateScriptRequest(BaseModel):
    topic: str
    style: str


@app.get("/")
def home():
    return {
        "message": "Backend working",
        "api_key_loaded": bool(GEMINI_API_KEY),
        "model": GEMINI_MODEL,
    }


@app.post("/generate-script")
def generate_script(body: GenerateScriptRequest):
    if not client:
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY not set in .env — get one at https://aistudio.google.com/apikey",
        )

    topic = body.topic.strip()
    style = body.style.strip()
    if not topic:
        raise HTTPException(status_code=400, detail="Topic is required")
    if not style:
        raise HTTPException(status_code=400, detail="Style is required")

    style_traits = [t.strip() for t in style.replace("\n", ",").split(",") if t.strip()]
    style_lines = "\n".join(f"- {trait}" for trait in style_traits)

    prompt = f"""
Write a cinematic storytelling YouTube script
about {topic}.

Style:
{style_lines}
""".strip()

    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
        )
    except genai_errors.ClientError as e:
        if e.code == 429:
            raise HTTPException(
                status_code=429,
                detail="Gemini rate limit exceeded. Try again in a minute.",
            )
        if e.code in (401, 403):
            raise HTTPException(
                status_code=401,
                detail="Invalid Gemini API key. Get one at https://aistudio.google.com/apikey",
            )
        raise HTTPException(status_code=502, detail=f"Gemini API error: {e.message}")
    except genai_errors.ServerError as e:
        raise HTTPException(status_code=502, detail=f"Gemini server error: {e.message}")
    except genai_errors.APIError as e:
        raise HTTPException(status_code=502, detail=f"Gemini API error: {e.message}")

    script = response.text
    if not script:
        raise HTTPException(status_code=502, detail="Gemini returned an empty script")

    return {"script": script}
