import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY", "").strip()

if not OPENAI_API_KEY:
    raise RuntimeError(
        "Missing required environment variable: OPENAI_API_KEY. "
        "Set it in your .env file or environment before starting the server."
    )

if not YOUTUBE_API_KEY:
    raise RuntimeError(
        "Missing required environment variable: YOUTUBE_API_KEY. "
        "Set it in your .env file or environment before starting the server."
    )
