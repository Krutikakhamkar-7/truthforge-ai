from langgraph.graph import StateGraph, END
from typing import TypedDict

class AgentState(TypedDict):
    query: str
    research: str
    report: str
def research_node(state):
    print("Research Running")

    state["research"] = research_agent(state["query"])

    return state
def report_node(state):

    print("Report Running")

    state["report"] = report_agent(state["research"])

    return state
builder = StateGraph(AgentState)


builder.add_node("research", research_node)
builder.add_node("report", report_node)


builder.set_entry_point("research")

builder.add_edge("research", "report")
builder.add_edge("report", END)


graph = builder.compile()

result = graph.invoke({
    "query": "What is AI?",
    "research": "",
    "report": ""
})

print("Workflow Finished")
print(result)
from agents.research import research_agent
from agents.report import report_agent