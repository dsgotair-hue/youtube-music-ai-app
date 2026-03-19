import pytest
import httpx
from httpx import AsyncClient, ASGITransport


@pytest.mark.asyncio
async def test_health_returns_200_ok():
    # Import app here so conftest env patch is already active
    from main import app

    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as client:
        response = await client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
