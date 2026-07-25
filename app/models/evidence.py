from typing import List, Optional
from pydantic import BaseModel, Field, HttpUrl


class EvidenceRequest(BaseModel):
    """
    Input schema for evidence collection.
    """
    claim: str = Field(
        ...,
        description="The research claim or statement to verify",
        examples=["AI can replace doctors"]
    )
    max_results_per_source: Optional[int] = Field(
        default=3,
        ge=1,
        le=10,
        description="Maximum number of results to fetch per evidence source"
    )


class EvidenceItem(BaseModel):
    """
    Standardized evidence item model.
    Contains only the required fields: title, source, url, published_date, summary, trust_score.
    """
    title: str = Field(..., description="Title of the paper, article, or entry")
    source: str = Field(..., description="Source name (e.g. PubMed, arXiv, Wikipedia, WHO, FDA, Nature, Blog)")
    url: str = Field(..., description="URL link to the source document")
    published_date: Optional[str] = Field(default="Unknown", description="Publication date if available")
    summary: str = Field(..., description="Short summary or abstract of the evidence")
    trust_score: float = Field(..., description="Assigned trust score (0-100) based on domain authority")


class EvidenceResponse(BaseModel):
    """
    Response schema returning sorted and deduplicated evidence list.
    """
    claim: str = Field(..., description="The original claim evaluated")
    total_results: int = Field(..., description="Total count of unique evidence items collected")
    evidence: List[EvidenceItem] = Field(..., description="Deduplicated evidence items sorted by trust score descending")
