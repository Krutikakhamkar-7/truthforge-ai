# Veritas — Fact Verification Dashboard 

Frontend dashboard for the Autonomous Multi-Agent Research & Fact Verification System.
This covers **only** the Report Generator + Frontend Dashboard responsibility — no
agent logic or backend code is included.

## Stack

React 18 (Vite) · Tailwind CSS · Framer Motion · Axios · React Icons · Recharts · jsPDF

## Getting started

```bash
npm install
npm run dev
```

The app runs against a local **mock response** by default (`src/data/mockResponse.js`),
so you can demo the full UI with zero backend.

## Wiring up the real backend

1. Open `src/api/research.js`
2. Set `USE_MOCK = false`
3. Set `VITE_API_BASE_URL` in a `.env` file (see `.env.example`) to your backend URL

The dashboard expects `POST /api/research` to return:

```json
{
  "question": "string",
  "summary": "string",
  "confidence": 92,
  "verdict": "Highly Reliable | Partially Reliable | Needs Verification",
  "timeline": [{ "id": 1, "label": "string", "detail": "string" }],
  "claims": [
    {
      "id": "string",
      "text": "string",
      "status": "Verified | Contradicted | Unverified",
      "confidence": 92,
      "evidence": [
        {
          "id": "string",
          "source": "string",
          "type": "Government | Research Paper | News | Wikipedia | Blog",
          "date": "ISO date string",
          "url": "string",
          "trustScore": 92,
          "snippet": "string"
        }
      ]
    }
  ],
  "sources": [{ "type": "string", "trust": 92, "count": 8 }],
  "contradictions": [
    { "id": "string", "claimA": "string", "claimB": "string", "severity": "High | Medium | Low", "explanation": "string" }
  ],
  "hallucinations": [
    { "id": "string", "claim": "string", "detected": true, "riskScore": 76, "reason": "string" }
  ],
  "charts": {
    "confidenceDistribution": [{ "name": "Verified", "value": 2 }],
    "sourceTrust": [{ "name": "Government", "trust": 96 }],
    "confidenceOverTime": [{ "stage": "Research", "confidence": 60 }]
  }
}
```

## Folder structure

```
src/
  api/            axios client + research endpoint call
  components/     all dashboard sections + reusable ui/ primitives
  context/        theme (dark/light) context
  data/           mock backend response for local dev/demo
  hooks/          useResearch state machine (idle/loading/success/error)
  pages/          Dashboard page composing every section
  utils/          formatting + shared helpers (truth-color spectrum, PDF/report builders)
```

## Design system

- **Palette**: near-black ink surfaces (`#07080C`–`#20232F`), indigo brand accent (`#6E56CF`),
  and a consistent red→amber→emerald "truth spectrum" (`#F2495C` / `#F5A623` / `#2FD97F`) used
  for every confidence, trust, and risk score in the app — one visual language for "how sure are we."
- **Type**: Space Grotesk (display), Inter (UI/body), JetBrains Mono (scores, dates, source metadata).
- **Surfaces**: glassmorphism panels (`backdrop-blur-xl` + translucent borders) over a soft
  radial brand glow, with a subtle noise overlay for texture.
