import logging
from typing import List
import httpx

from app.config import settings
from app.models.evidence import EvidenceItem
from app.utils.trust_score import calculate_trust_score

logger = logging.getLogger(__name__)

TAVILY_SEARCH_URL = "https://api.tavily.com/search"


async def search_tavily(query: str, max_results: int = 3) -> List[EvidenceItem]:
    """
    Fetches real-time web search results using Tavily Search API.
    Dynamically maps result domains to trust scores (e.g. WHO, FDA, Nature, Blogs).

    Args:
        query (str): The search claim or keywords.
        max_results (int): Maximum number of web results to return.

    Returns:
        List[EvidenceItem]: Standardized evidence items extracted from Tavily web search.
    """
    evidence_items: List[EvidenceItem] = []

    api_key = settings.TAVILY_API_KEY
    if not api_key or api_key.strip() in ["", "tvly-your-api-key-here"]:
        logger.warning("TAVILY_API_KEY is not set or using default template. Skipping Tavily search.")
        return []

    try:
        payload = {
            "api_key": api_key.strip(),
            "query": query,
            "search_depth": "basic",
            "max_results": max_results,
            "include_domains": [],
            "exclude_domains": [],
        }

        async with httpx.AsyncClient(timeout=settings.REQUEST_TIMEOUT) as client:
            response = await client.post(TAVILY_SEARCH_URL, json=payload)
            
            if response.status_code == 401:
                logger.warning("Invalid Tavily API key provided.")
                return []

            response.raise_for_status()
            data = response.json()

            results = data.get("results", [])
            for res in results:
                title = res.get("title", "Web Article")
                url = res.get("url", "")
                raw_summary = res.get("content", "")
                pubdate = res.get("published_date") or "Unknown"

                short_summary = raw_summary[:300] + "..." if len(raw_summary) > 300 else raw_summary

                # Calculate trust score based on URL domain or site name
                score, resolved_source = calculate_trust_score(source_name="Web Search", url=url)

                evidence_items.append(
                    EvidenceItem(
                        title=title,
                        source=resolved_source,
                        url=url,
                        published_date=pubdate,
                        summary=short_summary,
                        trust_score=score,
                    )
                )

    except Exception as exc:
        logger.error("Error fetching evidence from Tavily: %s", str(exc), exc_info=True)

    return evidence_items
