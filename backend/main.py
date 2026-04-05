import asyncio
from anyio import Path
from dotenv import load_dotenv
from agents.graph import create_video_agent
from agents.state import VideoState
from pathlib import Path
load_dotenv()



async def main():
    agent = create_video_agent()
    
    topic_input = input("Enter video topic (or press Enter for default): ")
    topic_input = topic_input.replace(" ", "_").lower()

    if not topic_input:
        raise ValueError("Topic cannot be empty. Please provide a valid topic.")

    # Cleanup visuals (multiple files)
    visuals_dir = Path("../video-renderer/public/visuals")
    if visuals_dir.exists():
        for file in visuals_dir.glob("scene_*.png"):
            if file.is_file():
                file.unlink()

    # Cleanup audio 
    public_audio_path = Path(f"../video-renderer/public/{topic_input}.mp3")
    if public_audio_path.exists():
        if public_audio_path.is_file():
            public_audio_path.unlink()


    # Cleanup props file
    props_full_path = Path("../video-renderer/props.json")
    if props_full_path.exists() and props_full_path.is_file():
        props_full_path.unlink()

    # Initial state
    initial_state: VideoState = {
        "topic": topic_input, 
        "research": None,
        "script": None,
        "audio_path": None,
        "video_path": None,
        "metadata": None,
        "approved": False,
        "error": None
    }
    
    # Run agent
    final_state = await agent.ainvoke(initial_state)
    
    if final_state.get("error"):
        print(f"❌ Error: {final_state['error']}")
    elif final_state["approved"]:
        print(f"✅ Success! Video published")
    else:
        print(f"⏸️  Video ready but not published")

if __name__ == "__main__":
    asyncio.run(main())