import logging
import os
import traceback

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

import config  # noqa: F401 — triggers startup validation of env vars
from routers import health, query

logger = logging.getLogger(__name__)

app = FastAPI(title="YouTube Music AI App")

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(health.router)
app.include_router(query.router, prefix="/api")


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.error("Unhandled exception for %s %s\n%s", request.method, request.url, traceback.format_exc())
    return JSONResponse(status_code=500, content={"detail": "Internal server error"})
