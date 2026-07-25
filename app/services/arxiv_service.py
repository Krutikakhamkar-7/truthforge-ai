import logging
import xml.etree.ElementTree as ET
from typing import List
import httpx

from app.config import settings
from app.models.evidence import EvidenceItem
from app.utils.trust_score import calculate_trust_score

logger = logging.getLogger(__name__)

ARXIV_API_URL = "https://export.arxiv.org/api/query"
ATOM_NS = "{http://www.w3.org/2005/Atom}"


async def search_arxiv(query: str, max_results: int = 3) -> List[EvidenceItem]:
    """
    Fetches pre-print scientific papers from arXiv API.

    Args:
        query (str): The search claim or keywords.
        max_results (int): Maximum number of papers to return.

    Returns:
        List[EvidenceItem]: Standardized evidence items extracted from arXiv.
    """
    evidence_items: List[EvidenceItem] = []

    try:
        formatted_query = f"all:{query}"
        params = {
            "search_query": formatted_query,
            "start": 0,
            "max_results": max_results,
        }

        async with httpx.AsyncClient(timeout=settings.REQUEST_TIMEOUT) as client:
            response = await client.get(ARXIV_API_URL, params=params)
            response.raise_for_status()

            # Parse Atom XML
            root = ET.fromstring(response.text)
            entries = root.findall(f"{ATOM_NS}entry")

            for entry in entries:
                title_elem = entry.find(f"{ATOM_NS}title")
                id_elem = entry.find(f"{ATOM_NS}id")
                published_elem = entry.find(f"{ATOM_NS}summary")
                published_date_elem = entry.find(f"{ATOM_NS}published")

                title = title_elem.text.strip().replace("\n", " ") if title_elem is not None and title_elem.text else "Untitled arXiv Paper"
                url = id_elem.text.strip() if id_elem is not None and id_elem.text else "https://arxiv.org"
                raw_summary = published_elem.text.strip().replace("\n", " ") if published_elem is not None and published_elem.text else ""
                
                # Truncate summary for clean output
                short_summary = raw_summary[:300] + "..." if len(raw_summary) > 300 else raw_summary

                raw_date = published_date_elem.text.strip() if published_date_elem is not None and published_date_elem.text else "Unknown"
                pubdate = raw_date.split("T")[0] if "T" in raw_date else raw_date

                score, resolved_source = calculate_trust_score(source_name="arXiv", url=url)

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
        logger.error("Error fetching evidence from arXiv: %s", str(exc), exc_info=True)

    return evidence_items
