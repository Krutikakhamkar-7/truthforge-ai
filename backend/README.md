# Evidence Collector Module (Member 2 - Multi-Agent AI Research System)

A standalone, production-ready **Evidence Collector Service** built with **FastAPI** and **Python**.

This module searches for research claims across multiple academic, scientific, and web evidence sources (**Tavily API**, **PubMed API**, **arXiv API**, **Wikipedia API**), extracts key fields, calculates trust scores based on domain authority, removes duplicate sources, sorts evidence by trust score, and returns clean, structured JSON.

---

## 🏗️ Project Structure (Clean Architecture)

```
TruthForge AI/
├── app/
│   ├── __init__.py
│   ├── main.py                   # FastAPI Application Entrypoint & CORS setup
│   ├── config.py                 # Pydantic Settings & Environment Loader
│   ├── models/
│   │   ├── __init__.py
│   │   └── evidence.py           # Pydantic Schemas (EvidenceRequest, EvidenceItem, EvidenceResponse)
│   ├── routes/
│   │   ├── __init__.py
│   │   └── evidence_router.py    # POST /collect-evidence API Route
│   ├── services/
│   │   ├── __init__.py
│   │   ├── tavily_service.py     # Tavily Search API Collector
│   │   ├── pubmed_service.py     # NCBI PubMed E-utilities Collector
│   │   ├── arxiv_service.py      # arXiv Atom XML Collector
│   │   ├── wikipedia_service.py  # Wikipedia REST & Search API Collector
│   │   └── collector_service.py  # Central Concurrent Aggregator & Orchestrator
│   └── utils/
│       ├── __init__.py
│       ├── trust_score.py        # Trust Score Engine (WHO, FDA, Nature, PubMed, arXiv, Wikipedia, Blogs)
│       └── deduplicator.py       # URL & Title Normalization & Deduplication Logic
├── tests/
│   ├── __init__.py
│   └── test_collector.py         # Pytest suite covering endpoints, trust rules, deduplication
├── .env                          # Local Environment Variables
├── .env.example                  # Environment Variables Template
├── .gitignore                    # Git Ignore rules
├── requirements.txt              # Project Dependencies
└── README.md                     # Documentation
```

---

## 🏆 Trust Scoring System

Each collected item is evaluated against authoritative trust score rules:

| Source / Domain | Trust Score | Description |
| :--- | :---: | :--- |
| **WHO** (World Health Organization) | **100** | Global public health authority (`who.int`) |
| **FDA** (Food and Drug Administration) | **98** | Medical and drug safety regulatory agency (`fda.gov`) |
| **Nature** | **97** | High-impact scientific journal (`nature.com`) |
| **PubMed** | **95** | Peer-reviewed medical literature (`pubmed.ncbi.nlm.nih.gov`) |
| **arXiv** | **90** | Open-access scientific pre-print repository (`arxiv.org`) |
| **Wikipedia** | **75** | Encyclopedic summaries (`wikipedia.org`) |
| **Blogs / General Web** | **30** | Web searches, blog posts, general articles |

---

## ⚡ Quick Start & Local Setup

### 1. Clone & Navigate to Project Directory
```bash
cd "TruthForge AI"
```

### 2. Create and Activate Virtual Environment
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# macOS / Linux
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env` and add your Tavily API Key:
```bash
cp .env.example .env
```
Inside `.env`:
```env
TAVILY_API_KEY=tvly-your-api-key-here
PORT=8000
HOST=0.0.0.0
```
> *Note: PubMed, arXiv, and Wikipedia APIs operate without API keys. Tavily search requires `TAVILY_API_KEY` for live web search.*

---

## 🚀 Running the FastAPI Application

Start the local Uvicorn development server:
```bash
uvicorn app.main:app --reload
```
The service will start at:
- **API Base URL**: `http://localhost:8000`
- **Interactive OpenAPI (Swagger) Docs**: `http://localhost:8000/docs`
- **ReDoc Documentation**: `http://localhost:8000/redoc`

---

## 📡 API Usage

### Endpoint: `POST /collect-evidence`

#### Input Payload:
```json
{
  "claim": "AI can replace doctors"
}
```

#### Example `curl` Request:
```bash
curl -X POST "http://localhost:8000/collect-evidence" \
     -H "Content-Type: application/json" \
     -d '{"claim": "AI can replace doctors"}'
```

#### Example Clean JSON Response:
```json
{
  "claim": "AI can replace doctors",
  "total_results": 4,
  "evidence": [
    {
      "title": "Artificial Intelligence in Clinical Practice: Opportunities and Limits",
      "source": "PubMed",
      "url": "https://pubmed.ncbi.nlm.nih.gov/34567890/",
      "published_date": "2023 May 15",
      "summary": "Journal: Journal of Medical Internet Research. Authors: Smith J, Doe A. PMID: 34567890",
      "trust_score": 95.0
    },
    {
      "title": "Evaluating Deep Learning vs Human Physicians in Primary Care Diagnostics",
      "source": "arXiv",
      "url": "https://arxiv.org/abs/2304.12345v1",
      "published_date": "2023-04-24",
      "summary": "This paper examines diagnostic accuracy of neural networks against board-certified physicians...",
      "trust_score": 90.0
    },
    {
      "title": "Artificial intelligence in healthcare",
      "source": "Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Artificial_intelligence_in_healthcare",
      "published_date": "2023-09-10",
      "summary": "Artificial intelligence in healthcare is the use of complex algorithms and software to emulate human cognition...",
      "trust_score": 75.0
    },
    {
      "title": "Can AI replace medical professionals?",
      "source": "Blogs",
      "url": "https://medium.com/@healthtech/can-ai-replace-doctors",
      "published_date": "2023-08-01",
      "summary": "A discussion on how AI tools act as assistants rather than replacements for doctors...",
      "trust_score": 30.0
    }
  ]
}
```

---

## 🔗 Standalone Service Integration (Requirement 13)

This module can be imported directly into any other Python application or teammate's FastAPI service **without running a separate HTTP server**:

```python
import asyncio
from app.services.collector_service import EvidenceCollectorService

async def main():
    claim = "AI can replace doctors"
    # Direct async call to EvidenceCollectorService
    response = await EvidenceCollectorService.collect_evidence(claim)
    
    print(f"Claim: {response.claim}")
    print(f"Total Unique Evidence Items: {response.total_results}\n")
    
    for item in response.evidence:
        print(f"[{item.trust_score}] {item.source} - {item.title}")
        print(f"URL: {item.url}")
        print(f"Summary: {item.summary}\n")

if __name__ == "__main__":
    asyncio.run(main())
```

---

## 🧪 Running Automated Tests

Run the test suite using `pytest`:
```bash
pytest
```

To view async output logs during testing:
```bash
pytest -s -v
```

---

## 🛠️ Tech Stack & Dependencies

- **Python 3.9+**
- **FastAPI**: Modern, fast web framework for building APIs.
- **Pydantic & Pydantic-Settings**: Data validation, schemas, and environment management.
- **httpx**: Async HTTP client for concurrent API calls.
- **tavily-python**: Tavily AI Search API integration.
- **Uvicorn**: ASGI server.
- **Pytest & pytest-asyncio**: Test suite.
