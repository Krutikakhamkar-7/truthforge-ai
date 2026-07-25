import asyncio
import logging
from typing import List, Optional

from app.models.evidence import EvidenceItem, EvidenceResponse, EvidenceRequest
from app.services.tavily_service import search_tavily
from app.services.pubmed_service import search_pubmed
from app.services.arxiv_service import search_arxiv
from app.services.wikipedia_service import search_wikipedia
from app.utils.deduplicator import deduplicate_evidence

logger = logging.getLogger(__name__)


class EvidenceCollectorService:
    """
    Independent Evidence Collector Service.
    
    Orchestrates searching across Tavily, PubMed, arXiv, and Wikipedia API collectors
    in parallel, extracts standardized evidence attributes, calculates trust scores,
    deduplicates duplicate sources, and sorts evidence in descending order of trust score.
    """

    @classmethod
    async def collect_evidence(
        cls, claim: str, max_results_per_source: int = 3
    ) -> EvidenceResponse:
        """
        Main entry point for collecting evidence for a given research claim.

        Can be invoked directly via Python code or via FastAPI endpoint.

        Args:
            claim (str): The research claim to evaluate (e.g. 'AI can replace doctors').
            max_results_per_source (int): Max items to retrieve from each API source.

        Returns:
            EvidenceResponse: Clean response object with sorted and deduplicated evidence.
        """
        logger.info("Initiating evidence collection for claim: '%s'", claim)

        # Dispatch API collectors concurrently for maximum efficiency
        results = await asyncio.gather(
            search_tavily(claim, max_results=max_results_per_source),
            search_pubmed(claim, max_results=max_results_per_source),
            search_arxiv(claim, max_results=max_results_per_source),
            search_wikipedia(claim, max_results=max_results_per_source),
            return_exceptions=True,
        )

        all_items: List[EvidenceItem] = []
        source_names = ["Tavily", "PubMed", "arXiv", "Wikipedia"]

        for idx, res in enumerate(results):
            src_name = source_names[idx]
            if isinstance(res, Exception):
                logger.error("Collector '%s' raised an unhandled exception: %s", src_name, str(res))
            elif isinstance(res, list):
                logger.info("Collector '%s' retrieved %d items", src_name, len(res))
                all_items.extend(res)

        # Remove duplicate items across sources
        unique_items = deduplicate_evidence(all_items)

        # Sort evidence items strictly by trust_score descending
        sorted_items = sorted(unique_items, key=lambda item: item.trust_score, reverse=True)

        logger.info(
            "Completed evidence collection. Total raw: %d, Total unique & sorted: %d",
            len(all_items),
            len(sorted_items),
        )

        return EvidenceResponse(
            claim=claim,
            total_results=len(sorted_items),
            evidence=sorted_items,
        )
