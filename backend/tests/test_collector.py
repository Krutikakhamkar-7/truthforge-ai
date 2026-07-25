import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.models.evidence import EvidenceItem
from app.utils.trust_score import calculate_trust_score, TRUST_SCORE_RULES
from app.utils.deduplicator import deduplicate_evidence
from app.services.collector_service import EvidenceCollectorService

client = TestClient(app)


def test_trust_score_assignment():
    """
    Verify exact trust score values assigned per specifications:
    WHO=100, FDA=98, Nature=97, PubMed=95, arXiv=90, Wikipedia=75, Blogs=30
    """
    assert calculate_trust_score("WHO")[0] == 100.0
    assert calculate_trust_score("FDA")[0] == 98.0
    assert calculate_trust_score("Nature")[0] == 97.0
    assert calculate_trust_score("PubMed")[0] == 95.0
    assert calculate_trust_score("arXiv")[0] == 90.0
    assert calculate_trust_score("Wikipedia")[0] == 75.0
    assert calculate_trust_score("Blogs")[0] == 30.0
    assert calculate_trust_score("Unknown Blog", "https://medium.com/test")[0] == 30.0


def test_deduplication_and_sorting():
    """
    Verify duplicate URLs/titles are removed and higher trust score item is preserved.
    """
    items = [
        EvidenceItem(
            title="Duplicate Title",
            source="Blogs",
            url="https://example.com/article1",
            published_date="2023-01-01",
            summary="Blog summary",
            trust_score=30.0,
        ),
        EvidenceItem(
            title="Duplicate Title",
            source="PubMed",
            url="https://pubmed.ncbi.nlm.nih.gov/123456/",
            published_date="2023-01-01",
            summary="PubMed summary",
            trust_score=95.0,
        ),
    ]

    unique = deduplicate_evidence(items)
    assert len(unique) == 1
    assert unique[0].source == "PubMed"
    assert unique[0].trust_score == 95.0


def test_root_endpoint():
    """
    Verify root status endpoint returns 200 OK.
    """
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["module"] == "Evidence Collector (Member 2)"
    assert data["status"] == "online"


def test_collect_evidence_endpoint_validation():
    """
    Verify 400 response for empty claim.
    """
    response = client.post("/collect-evidence", json={"claim": ""})
    assert response.status_code == 400


@pytest.mark.asyncio
async def test_standalone_service_call():
    """
    Verify EvidenceCollectorService can be called directly in Python without web server.
    Requirement 13 compliance test.
    """
    result = await EvidenceCollectorService.collect_evidence(claim="AI can replace doctors", max_results_per_source=1)
    assert result.claim == "AI can replace doctors"
    assert isinstance(result.total_results, int)
    assert isinstance(result.evidence, list)
    
    # Verify trust score descending order
    scores = [item.trust_score for item in result.evidence]
    assert scores == sorted(scores, reverse=True)
