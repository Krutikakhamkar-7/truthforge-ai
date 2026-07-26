from gemini_client import model


def detect_contradictions(research, fact_check):

    prompt = f"""
Compare the research with the fact-check report.

Research:
{research}

Fact Check:
{fact_check}

Tasks:

1. Find contradictions.
2. Find unsupported claims.
3. Find exaggerations.
4. Give consistency score out of 10.

Return in Markdown.
"""

    response = model.generate_content(prompt)

    return response.text