import logging
import urllib.parse
from typing import List
import httpx

from app.config import settings
from app.models.evidence import EvidenceItem
from app.utils.trust_score import calculate_trust_score

logger = logging.getLogger(__name__)

WIKIPEDIA_SEARCH_URL = "https://en.wikipedia.org/w/api.php"
WIKIPEDIA_REST_SUMMARY_URL = "https://en.wikipedia.org/api/rest_v1/page/summary/"


async def search_wikipedia(query: str, max_results: int = 3) -> List[EvidenceItem]:
    """
    Fetches encyclopedic articles and extracts summaries from Wikipedia API.

    Args:
        query (str): The search claim or keywords.
        max_results (int): Maximum number of Wikipedia articles to return.

    Returns:
        List[EvidenceItem]: Standardized evidence items extracted from Wikipedia.
    """
    evidence_items: List[EvidenceItem] = []

    try:
        search_params = {
            "action": "query",
            "list": "search",
            "srsearch": query,
            "utf8": 1,
            "format": "json",
            "srlimit": max_results,
        }

        headers = {
            "User-Agent": "EvidenceCollectorBot/1.0 (https://github.com/truthforge-ai; truthforge@research.dev)"
        }

        async with httpx.AsyncClient(timeout=settings.REQUEST_TIMEOUT, headers=headers) as client:
            res = await client.get(WIKIPEDIA_SEARCH_URL, params=search_params)
            res.raise_for_status()
            data = res.json()

            search_results = data.get("query", {}).get("search", [])

            for item in search_results:
                title = item.get("title", "Wikipedia Entry")
                page_id = item.get("pageid")
                
                # Form clean Wikipedia URL
                encoded_title = urllib.parse.quote(title.replace(" ", "_"))
                url = f"https://en.wikipedia.org/wiki/{encoded_title}"

                summary = ""
                pubdate = "Wikipedia Entry"

                # Try fetching clean extract from REST summary API
                try:
                    summary_res = await client.get(f"{WIKIPEDIA_REST_SUMMARY_URL}{encoded_title}")
                    if summary_res.status_code == 200:
                        sum_data = summary_res.json()
                        summary = sum_data.get("extract", "")
                        timestamp = sum_data.get("timestamp")
                        if timestamp:
                            pubdate = timestamp.split("T")[0]
                except Exception:
                    pass

                # Fallback to search snippet if REST extract unavailable
                if not summary:
                    raw_snippet = item.get("snippet", "")
                    # Basic HTML tag stripping
                    clean_snippet = "".join(c for c in raw_snippet if c not in ["<", ">"])
                    summary = clean_snippet if clean_snippet else f"Wikipedia reference page for {title}."

                short_summary = summary[:300] + "..." if len(summary) > 300 else summary

                score, resolved_source = calculate_trust_score(source_name="Wikipedia", url=url)

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
        logger.error("Error fetching evidence from Wikipedia: %s", str(exc), exc_info=True)

    return evidence_items
