from gemini_client import model

def research_topic(plan):

    prompt = f"""
You are a research assistant.

Topic:
{plan["topic"]}

Intent:
{plan["intent"]}

Keywords:
{plan["keywords"]}

Write a detailed research summary in 5–8 points.
"""

    response = model.generate_content(prompt)

    return response.text