from typing import TypedDict, List, Dict, Optional
from pydantic import BaseModel

class SceneData(BaseModel):
    timestamp: float  # Start time in seconds
    duration: float
    text: str
    visual_type: str  # "code", "diagram", "text", "image"
    visual_data: Optional[Dict] = None

class VideoState(TypedDict):
    topic: str
    research: Optional[str]
    script: Optional[List[SceneData]]
    audio_path: Optional[str]
    video_path: Optional[str]
    metadata: Optional[Dict]  # title, description, tags
    approved: bool
    error: Optional[str]