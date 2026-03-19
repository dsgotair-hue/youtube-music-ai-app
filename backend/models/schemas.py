from pydantic import BaseModel, Field
from typing import Optional


class QueryRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=500)


class MusicResult(BaseModel):
    title: str
    artist: str
    url: str


class QueryResponse(BaseModel):
    results: list[MusicResult]
    message: Optional[str] = None
