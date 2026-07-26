from orchestrator import run
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="Multi-Agent Research System",
    description="Member 1 - Master Orchestrator API",
    version="1.0"
)

# Request Model
class QueryRequest(BaseModel):
    query: str

# Home Route
@app.get("/")
def home():
    return {
        "message": "Welcome to the Multi-Agent Research System"
    }

# Analyze Route
@app.post("/analyze")
def analyze(data: QueryRequest):
    return run(data.query)