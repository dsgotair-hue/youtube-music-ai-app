"""
Integration tests for the FastAPI app using httpx.AsyncClient with ASGITransport.
External APIs (OpenAI, YouTube) are mocked via routers.query.run_agent.

Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 6.1, 6.2, 6.3
"""

import pytest
from unittest.mock import patch
from httpx import AsyncClient, ASGITransport


@pytest.mark.asyncio
async def test_valid_query_returns_200_with_results():
    """Valid query returns 200 with results list and null message."""
    # Import app inside test so conftest env patch is already active
    from main import app  # noqa: F401 — ensures routers.query is loaded

    mock_results = [
        {"title": "Test Song", "artist": "Test Artist", "url": "https://www.youtube.com/watch?v=abc123"}
    ]

    with patch("routers.query.run_agent", return_value=mock_results):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.post("/api/query", json={"query": "jazz music"})

    assert response.status_code == 200
    body = response.json()
    assert len(body["results"]) == 1
    assert body["results"][0]["title"] == "Test Song"
    assert body["results"][0]["artist"] == "Test Artist"
    assert body["results"][0]["url"] == "https://www.youtube.com/watch?v=abc123"
    assert body["message"] is None


@pytest.mark.asyncio
async def test_empty_results_returns_200_with_message():
    """Empty results returns 200 with empty list and a non-empty message."""
    from main import app  # noqa: F401

    with patch("routers.query.run_agent", return_value=[]):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.post("/api/query", json={"query": "obscure query"})

    assert response.status_code == 200
    body = response.json()
    assert body["results"] == []
    assert isinstance(body["message"], str) and len(body["message"]) > 0


@pytest.mark.asyncio
async def test_missing_query_field_returns_422():
    """Missing query field returns 422 validation error."""
    from main import app

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.post("/api/query", json={})

    assert response.status_code == 422


@pytest.mark.asyncio
async def test_openai_error_returns_502():
    """OpenAI error propagates as 502 with detail containing 'OpenAI'."""
    from main import app  # noqa: F401

    with patch("routers.query.run_agent", side_effect=Exception("OpenAI API error: rate limit")):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.post("/api/query", json={"query": "test"})

    assert response.status_code == 502
    assert "OpenAI" in response.json()["detail"]


@pytest.mark.asyncio
async def test_youtube_error_returns_502():
    """YouTube error propagates as 502 with detail containing 'YouTube'."""
    from main import app  # noqa: F401

    with patch("routers.query.run_agent", side_effect=Exception("YouTube API error: quota exceeded")):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            response = await client.post("/api/query", json={"query": "test"})

    assert response.status_code == 502
    assert "YouTube" in response.json()["detail"]
