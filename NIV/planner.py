import json
from gemini_client import model

def analyze_query(query):

    prompt = f"""
Analyze the following query.

Return ONLY JSON.

Query:
{query}

Format:

{{
    "topic":"",
    "domain":"",
    "intent":"",
    "keywords":[]
}}
"""

    response = model.generate_content(prompt)

    text = response.text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)