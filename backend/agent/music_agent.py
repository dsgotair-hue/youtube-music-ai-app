from typing import Optional, TypedDict

from langchain_openai import ChatOpenAI
from langgraph.graph import END, START, StateGraph

from agent.youtube_tool import search_youtube
from config import OPENAI_API_KEY


class AgentState(TypedDict):
    query: str
    search_keywords: Optional[str]
    results: list[dict]
    error: Optional[str]


def extract_intent(state: AgentState) -> AgentState:
    llm = ChatOpenAI(model="gpt-4o-mini", api_key=OPENAI_API_KEY)
    messages = [
        {
            "role": "system",
            "content": (
                "You are a music search assistant. "
                "Extract concise music search keywords from the user's query. "
                "Return only the keywords, nothing else."
            ),
        },
        {"role": "user", "content": state["query"]},
    ]
    response = llm.invoke(messages)
    return {**state, "search_keywords": response.content.strip()}


def search_youtube_node(state: AgentState) -> AgentState:
    results = search_youtube(state["search_keywords"])
    return {**state, "results": results}


_graph = StateGraph(AgentState)
_graph.add_node("extract_intent", extract_intent)
_graph.add_node("search_youtube_node", search_youtube_node)
_graph.add_edge(START, "extract_intent")
_graph.add_edge("extract_intent", "search_youtube_node")
_graph.add_edge("search_youtube_node", END)

_compiled = _graph.compile()


def run_agent(query: str) -> list[dict]:
    state = _compiled.invoke(
        {"query": query, "search_keywords": None, "results": [], "error": None}
    )
    return state["results"]
