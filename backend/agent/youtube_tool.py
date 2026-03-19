from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from langchain_core.tools import tool

from config import YOUTUBE_API_KEY


def search_youtube(keywords: str) -> list[dict]:
    """Search YouTube for music videos matching the given keywords."""
    try:
        youtube = build("youtube", "v3", developerKey=YOUTUBE_API_KEY)
        response = (
            youtube.search()
            .list(
                q=keywords,
                part="snippet",
                type="video",
                videoCategoryId="10",
                maxResults=20,
            )
            .execute()
        )
        return [
            {
                "title": item["snippet"]["title"],
                "artist": item["snippet"]["channelTitle"],
                "url": f"https://www.youtube.com/watch?v={item['id']['videoId']}",
            }
            for item in response.get("items", [])
        ]
    except HttpError as e:
        raise Exception(f"YouTube API error: {e}") from e
    except Exception as e:
        raise Exception(f"YouTube API error: {e}") from e


@tool
def youtube_music_search(keywords: str) -> list[dict]:
    """Search YouTube for music videos. Returns a list of dicts with title, artist, and url."""
    return search_youtube(keywords)
