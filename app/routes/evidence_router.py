from fastapi import APIRouter, HTTPException, status
from app.models.evidence import EvidenceRequest, EvidenceResponse
from app.services.collector_service import EvidenceCollectorService

router = APIRouter(tags=["Evidence Collector"])


@router.post(
    "/collect-evidence",
    response_model=EvidenceResponse,
    status_code=status.HTTP_200_OK,
    summary="Collect evidence from Tavily, PubMed, arXiv, and Wikipedia",
    description=(
        "Queries multiple academic and general evidence APIs concurrently, extracts standard fields, "
        "calculates trust scores (WHO=100, FDA=98, Nature=97, PubMed=95, arXiv=90, Wikipedia=75, Blogs=30), "
        "deduplicates duplicate items, and returns results sorted by trust score."
    ),
)
async def collect_evidence_endpoint(request: EvidenceRequest) -> EvidenceResponse:
    """
    POST endpoint to evaluate a claim and return structured evidence.
    """
    if not request.claim or not request.claim.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The 'claim' field must not be empty."
        )

    try:
        response = await EvidenceCollectorService.collect_evidence(
            claim=request.claim.strip(),
            max_results_per_source=request.max_results_per_source or 3,
        )
        return response
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while collecting evidence: {str(exc)}"
        )
