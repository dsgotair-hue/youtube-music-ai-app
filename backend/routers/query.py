from fastapi import APIRouter, HTTPException

from agent.music_agent import run_agent
from models.schemas import MusicResult, QueryRequest, QueryResponse

router = APIRouter()


@router.post("/query", response_model=QueryResponse)
async def query(request: QueryRequest) -> QueryResponse:
    try:
        results = run_agent(request.query)
    except Exception as e:
        msg = str(e)
        if "openai" in msg.lower():
            raise HTTPException(status_code=502, detail=f"OpenAI API error: {e}")
        if "youtube" in msg.lower():
            raise HTTPException(status_code=502, detail=f"YouTube API error: {e}")
        raise

    if not results:
        return QueryResponse(
            results=[],
            message="No YouTube music results found for your query.",
        )

    music_results = [MusicResult(**r) for r in results]
    return QueryResponse(results=music_results, message=None)
