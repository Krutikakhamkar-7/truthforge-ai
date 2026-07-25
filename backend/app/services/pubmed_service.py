import logging
from typing import List, Dict, Any
import httpx

from app.config import settings
from app.models.evidence import EvidenceItem
from app.utils.trust_score import calculate_trust_score

logger = logging.getLogger(__name__)

NCBI_ESEARCH_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
NCBI_ESUMMARY_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"


async def search_pubmed(query: str, max_results: int = 3) -> List[EvidenceItem]:
    """
    Fetches peer-reviewed medical articles from NCBI PubMed using E-utilities API.

    Args:
        query (str): The search claim or keywords.
        max_results (int): Maximum number of articles to return.

    Returns:
        List[EvidenceItem]: Standardized evidence items extracted from PubMed.
    """
    evidence_items: List[EvidenceItem] = []

    try:
        async with httpx.AsyncClient(timeout=settings.REQUEST_TIMEOUT) as client:
            # 1. Search PubMed for matching PMIDs
            search_params = {
                "db": "pubmed",
                "term": query,
                "retmode": "json",
                "retmax": max_results,
            }
            search_res = await client.get(NCBI_ESEARCH_URL, params=search_params)
            search_res.raise_for_status()
            search_data = search_res.json()

            id_list = search_data.get("esearchresult", {}).get("idlist", [])
            if not id_list:
                logger.info("No PubMed records found for query: %s", query)
                return []

            # 2. Fetch summary details for returned PMIDs
            summary_params = {
                "db": "pubmed",
                "id": ",".join(id_list),
                "retmode": "json",
            }
            summary_res = await client.get(NCBI_ESUMMARY_URL, params=summary_params)
            summary_res.raise_for_status()
            summary_data = summary_res.json()

            result_dict: Dict[str, Any] = summary_data.get("result", {})

            for pmid in id_list:
                item_data = result_dict.get(pmid)
                if not item_data:
                    continue

                title = item_data.get("title", "Untitled PubMed Article").rstrip(".")
                pubdate = item_data.get("pubdate", "Unknown")
                source_journal = item_data.get("source", "PubMed Journal")
                authors = item_data.get("authors", [])
                author_names = ", ".join([a.get("name", "") for a in authors[:3]]) if authors else "Unknown Authors"

                url = f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/"
                summary = f"Journal: {source_journal}. Authors: {author_names}. PMID: {pmid}"

                score, resolved_source = calculate_trust_score(source_name="PubMed", url=url)

                evidence_items.append(
                    EvidenceItem(
                        title=title,
                        source=resolved_source,
                        url=url,
                        published_date=pubdate,
                        summary=summary,
                        trust_score=score,
                    )
                )

    except Exception as exc:
        logger.error("Error fetching evidence from PubMed: %s", str(exc), exc_info=True)

    return evidence_items
