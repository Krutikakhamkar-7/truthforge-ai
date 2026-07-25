import re
from typing import Tuple

# Mapping of authoritative source names to their assigned trust scores
TRUST_SCORE_RULES = {
    "WHO": 100.0,
    "FDA": 98.0,
    "Nature": 97.0,
    "PubMed": 95.0,
    "arXiv": 90.0,
    "Wikipedia": 75.0,
    "Blogs": 30.0,
}

# Domain keyword pattern mapping
DOMAIN_PATTERNS = [
    (r"who\.int", "WHO", 100.0),
    (r"fda\.gov", "FDA", 98.0),
    (r"nature\.com", "Nature", 97.0),
    (r"ncbi\.nlm\.nih\.gov", "PubMed", 95.0),
    (r"pubmed\.ncbi\.nlm\.nih\.gov", "PubMed", 95.0),
    (r"arxiv\.org", "arXiv", 90.0),
    (r"wikipedia\.org", "Wikipedia", 75.0),
    (r"medium\.com|substack\.com|blogspot\.com|wordpress\.com|ghost\.io|/blog", "Blogs", 30.0),
]


def calculate_trust_score(source_name: str, url: str = "") -> Tuple[float, str]:
    """
    Assigns a trust score and canonical source identifier based on the requirement rules:
    - WHO = 100
    - FDA = 98
    - Nature = 97
    - PubMed = 95
    - arXiv = 90
    - Wikipedia = 75
    - Blogs/General Web = 30

    Args:
        source_name (str): Direct source name from collector (e.g. 'PubMed', 'arXiv', 'Wikipedia').
        url (str): Item URL for domain inspection (used for web search results).

    Returns:
        Tuple[float, str]: (trust_score, resolved_source_name)
    """
    # 1. Check direct exact match with known source rules
    normalized_source = source_name.strip()
    for rule_key, score in TRUST_SCORE_RULES.items():
        if normalized_source.lower() == rule_key.lower():
            return score, rule_key

    # 2. Check URL domain patterns if URL provided
    if url:
        url_lower = url.lower()
        for pattern, resolved_name, score in DOMAIN_PATTERNS:
            if re.search(pattern, url_lower):
                return score, resolved_name

    # 3. Fuzzy search source name against known keys
    source_lower = normalized_source.lower()
    if "who" in source_lower or "world health organization" in source_lower:
        return 100.0, "WHO"
    elif "fda" in source_lower or "food and drug administration" in source_lower:
        return 98.0, "FDA"
    elif "nature" in source_lower:
        return 97.0, "Nature"
    elif "pubmed" in source_lower or "ncbi" in source_lower:
        return 95.0, "PubMed"
    elif "arxiv" in source_lower:
        return 90.0, "arXiv"
    elif "wikipedia" in source_lower:
        return 75.0, "Wikipedia"
    elif any(b in source_lower for b in ["blog", "medium", "substack", "wordpress"]):
        return 30.0, "Blogs"

    # Default fallback for general web results or blogs
    return 30.0, "Blogs"
