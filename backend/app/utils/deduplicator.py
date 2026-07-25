from typing import List
from urllib.parse import urlparse, urlunparse
from app.models.evidence import EvidenceItem


def normalize_url(url: str) -> str:
    """
    Normalizes a URL to assist in accurate deduplication.
    Strips trailing slashes, scheme variations (http vs https), and query string noise.
    """
    if not url:
        return ""
    try:
        parsed = urlparse(url.strip().lower())
        # Drop trailing slash from path
        path = parsed.path.rstrip("/")
        # Reconstruct canonical string without query parameters
        return urlunparse(("", parsed.netloc, path, "", "", ""))
    except Exception:
        return url.strip().lower()


def normalize_title(title: str) -> str:
    """
    Normalizes a title string for similarity comparisons.
    """
    if not title:
        return ""
    # Strip whitespace, lower case, drop non-alphanumeric characters
    cleaned = "".join(c for c in title.lower() if c.isalnum() or c.isspace())
    return " ".join(cleaned.split())


def deduplicate_evidence(items: List[EvidenceItem]) -> List[EvidenceItem]:
    """
    Removes duplicate evidence items based on normalized URLs and titles.
    When duplicates are encountered, preserves the one with the higher trust score.

    Args:
        items (List[EvidenceItem]): Raw list of collected evidence items.

    Returns:
        List[EvidenceItem]: Cleaned list of unique evidence items.
    """
    seen_urls = set()
    seen_titles = set()
    unique_items: List[EvidenceItem] = []

    # Sort candidates initially so higher trust score items are processed first
    sorted_candidates = sorted(items, key=lambda x: x.trust_score, reverse=True)

    for item in sorted_candidates:
        norm_url = normalize_url(item.url)
        norm_title = normalize_title(item.title)

        # Check if URL or Title was already recorded
        if norm_url and norm_url in seen_urls:
            continue
        if norm_title and len(norm_title) > 10 and norm_title in seen_titles:
            continue

        if norm_url:
            seen_urls.add(norm_url)
        if norm_title:
            seen_titles.add(norm_title)

        unique_items.append(item)

    return unique_items
