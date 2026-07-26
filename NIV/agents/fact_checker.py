from gemini_client import model


def fact_check(research):

    prompt = f"""
You are a professional fact-checking AI.

Verify the following research.

For every important claim:

- State the claim
- Mark it as:
✔ Verified
⚠ Partially Verified
✖ Needs More Evidence

Research:

{research}
"""

    response = model.generate_content(prompt)

    return response.text