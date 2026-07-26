import logging

from planner import analyze_query
from agents.research import research_topic
from agents.fact_checker import fact_check
from agents.contradiction import detect_contradictions
from agents.report import generate_report

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)


def run(query):
    try:

        logging.info("Planner Started")
        plan = analyze_query(query)
        logging.info("Planner Finished")

        logging.info("Research Started")
        research = research_topic(plan)
        logging.info("Research Finished")

        logging.info("Fact Checker Started")
        verification = fact_check(research)
        logging.info("Fact Checker Finished")

        logging.info("Contradiction Detector Started")
        contradictions = detect_contradictions(
            research,
            verification
        )
        logging.info("Contradiction Detector Finished")

        logging.info("Generating Report")
        report = generate_report(
            plan,
            research,
            verification,
            contradictions
        )

        logging.info("Report Generated Successfully")

        return {
            "planner": plan,
            "research": research,
            "fact_check": verification,
            "contradictions": contradictions,
            "final_report": report
        }

    except Exception as e:
        logging.exception("Pipeline Failed")

        return {
            "status": "error",
            "message": str(e)
        }