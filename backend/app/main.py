import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes.evidence_router import router as evidence_router

# Setup application logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("app.main")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=(
        "Member 2 (Evidence Collector Module) of Multi-Agent AI Research System.\n\n"
        "Collects evidence for research claims from Tavily, PubMed, arXiv, and Wikipedia, "
        "ranks evidence by trust scores, deduplicates sources, and returns clean JSON."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
)

# Enable CORS for cross-service calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(evidence_router, prefix=settings.API_PREFIX)


@app.get("/", tags=["Health"])
async def root():
    """
    Root status check endpoint.
    """
    return {
        "module": "Evidence Collector (Member 2)",
        "status": "online",
        "version": settings.VERSION,
        "docs": "/docs",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True
    )
