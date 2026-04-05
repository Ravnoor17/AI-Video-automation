from langgraph.graph import StateGraph, END
from .state import VideoState
from .nodes import (
    research_topic,
    generate_audio,
    generate_visuals,  # ⬅️ ADD THIS
    render_video,
    human_review,
    upload_youtube
)

def create_video_agent():
    workflow = StateGraph(VideoState)
    
    workflow.add_node("research_node", research_topic)
    workflow.add_node("audio_node", generate_audio)
    workflow.add_node("visuals_node", generate_visuals)  # ⬅️ ADD THIS
    workflow.add_node("video_node", render_video)
    workflow.add_node("review_node", human_review)
    workflow.add_node("upload_node", upload_youtube)
    
    workflow.set_entry_point("research_node")
    workflow.add_edge("research_node", "audio_node")
    workflow.add_edge("audio_node", "visuals_node")  # ⬅️ ADD THIS
    workflow.add_edge("visuals_node", "video_node")  # ⬅️ CHANGE THIS
    workflow.add_edge("video_node", "review_node")
    
    # Conditional edge based on approval
    workflow.add_conditional_edges(
        "review_node",
        lambda state: "upload_node" if state["approved"] else "end",
        {
            "upload_node": "upload_node",
            "end": END
        }
    )
    
    workflow.add_edge("upload_node", END)
    
    return workflow.compile()