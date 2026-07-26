def generate_report(plan, research, fact_check, contradictions):

    return f"""
# AI Research Report

## Topic
{plan['topic']}

## Domain
{plan['domain']}

## Intent
{plan['intent']}

------------------------------------

## Research Summary

{research}

------------------------------------

## Fact Verification

{fact_check}

------------------------------------

## Contradiction Analysis

{contradictions}

------------------------------------

## Final Conclusion

Based on the research and verification,
the information appears reliable.
Please review the contradiction analysis before making important decisions.
"""