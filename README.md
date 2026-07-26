# 🧠 Veritas– Multi-Agent Fact Verification System

> AI-powered research and fact verification platform that analyzes claims using multiple intelligent agents, trusted evidence sources, and explainable AI.

![React](https://img.shields.io/badge/Frontend-React-blue)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green)
![Python](https://img.shields.io/badge/Python-3.11-yellow)
![License](https://img.shields.io/badge/License-MIT-red)

---

# 📖 Overview

Veritas is a Multi-Agent AI system designed to verify factual claims by collecting evidence from trusted sources, analyzing contradictions, calculating confidence scores, and generating explainable reports.

Unlike traditional chatbots, TruthForge AI does not rely on a single LLM response. Instead, multiple specialized AI agents collaborate to produce transparent and trustworthy results.

---

# 🚀 Problem Statement

AI-generated content often contains hallucinations and misinformation.

Veritas solves this problem by:

- Collecting evidence from trusted sources
- Verifying claims
- Detecting contradictions
- Calculating confidence scores
- Providing explainable reports with citations

---

# 🏗️ System Architecture

```

User Query
│
▼
Research Agent
│
▼
Evidence Collector Agent
│
▼
Verification Agent
│
▼
Hallucination Detection Agent
│
▼
Report Generator Agent
│
▼
Frontend Dashboard

```

---

# 🤖 AI Agents

## 🔍 1. Research Agent

Responsibilities:

- Understands user query
- Searches trusted sources
- Retrieves relevant documents
- Filters useful information

Sources:

- Tavily Search
- Wikipedia
- PubMed
- arXiv

---

## 📚 2. Evidence Collector & Verification Agent

Responsibilities:

- Collect evidence
- Remove duplicate sources
- Calculate trust score
- Rank evidence

Verification includes:

- Source authority
- Reliability
- Relevance
- Citation quality

---

## ⚖️ 3. Hallucination Detection Agent

Responsibilities:

- Compare evidence
- Detect contradictions
- Find unsupported claims
- Estimate hallucination risk

Outputs:

- Supporting Evidence
- Contradicting Evidence
- Hallucination Score

---

## 📄 4. Report Generator Agent

Responsibilities:

- Generate summary
- Produce confidence score
- Create final verdict
- Export downloadable PDF report

---

# ✨ Features

- Multi-Agent AI Workflow
- Fact Verification
- Evidence Collection
- Confidence Score
- Trust Score Calculation
- Hallucination Detection
- Interactive Dashboard
- Data Visualizations
- PDF Report Generation
- Explainable AI
- Modern Responsive UI

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- Recharts
- React Icons

---

## Backend

- FastAPI
- Python
- LangGraph
- LangChain

---

## AI Models

- OpenAI GPT
- Tavily API

---

## Evidence Sources

- Wikipedia
- PubMed
- arXiv
- Tavily Search

---

# 📊 Dashboard Features

- Confidence Gauge
- Trust Distribution
- Evidence Pie Chart
- Source Ranking
- Contradiction Analysis
- Final Verdict
- PDF Report Download

---

# 📂 Project Structure

```

truthforge-ai/
│
├── backend/
│ ├── agents/
│ ├── api/
│ ├── workflows/
│ └── main.py
│
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── charts/
│ └── assets/
│
├── public/
├── README.md
└── package.json

```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Krutikakhamkar-7/veritas.git
```

## Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## Frontend

```bash
npm install

npm run dev
```

---

# 🌐 Deployment

Frontend

- Netlify

Backend

- FastAPI

---

# 📈 Workflow

1. User enters claim
2. Research Agent searches trusted sources
3. Evidence Collector gathers information
4. Verification Agent validates sources
5. Hallucination Agent detects contradictions
6. Report Agent generates verdict
7. Dashboard visualizes results

---

# 🎯 Use Cases

- Academic Research
- Journalism
- Healthcare Information
- Scientific Verification
- AI Fact Checking
- Education

---

# 👥 Team

| Name | Role |
|------|------|
| Nivrut Chavan | Research Agent |
| Dnyaneshwari Hande | Evidence Collector & Verification |
| Siddhesh Devre | Hallucination Detection |
| Krutika Khamkar | Frontend Dashboard & Report UI |

---

# 🔮 Future Scope

- Voice Input
- Multi-language Support
- Browser Extension
- Real-time Fact Checking
- Citation Export
- Live AI Reasoning
- Knowledge Graph

---

# 🏆 Hackathon

Developed for **InnovaHack Chapter 1**

Theme:
**AI-Powered Fact Verification using Multi-Agent Systems**

---

# 📜 License

MIT License

---

# ❤️ Acknowledgements

- OpenAI
- LangChain
- LangGraph
- Tavily
- FastAPI
- React
- Tailwind CSS

---

## ⭐ If you like this project, give it a star!
