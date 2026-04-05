# 🎬 AI Video Automation Pipeline

Fully automated YouTube video creation using AI - from script generation to video rendering and upload.

## 🌟 Features

- **🤖 Automated Script Generation** - Groq (Llama 3.3 70B) creates educational scripts
- **🎙️ Text-to-Speech** - ElevenLabs Voice Design for natural narration
- **🎨 AI Image Generation** - FLUX.1/Stability AI for beautiful slide backgrounds
- **🎥 Video Rendering** - Remotion for professional animations
- **📤 YouTube Upload** - Automated publishing (coming soon)
- **🔄 LangGraph Orchestration** - Fully agentic workflow

## 📊 Tech Stack

### Backend (Python)
- **LangGraph** - Agent orchestration
- **Groq** - Script generation (llama-3.3-70b-versatile)
- **ElevenLabs** - Voice synthesis
- **Replicate/Stability AI** - Image generation
- **pydub** - Audio processing

### Frontend (Node.js)
- **Remotion** - Video rendering engine
- **React** - Component-based video scenes
- **TypeScript** - Type-safe video definitions

## 🚀 Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- FFmpeg (for audio processing)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/ai-video-automation.git
cd ai-video-automation
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Frontend Setup
```bash
cd ../video-renderer
npm install
```

### 4. Environment Variables

Create `.env` in root directory:
```env
# Required
GROQ_API_KEY=your_groq_api_key
ELEVENLABS_API_KEY=your_elevenlabs_key

# Choose one image generation service
REPLICATE_API_TOKEN=your_replicate_token
# OR
STABILITY_API_KEY=your_stability_key
# OR
TOGETHER_API_KEY=your_together_key

# Optional (for YouTube upload)
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret
```

### 5. Get API Keys

| Service | Free Tier | Link |
|---------|-----------|------|
| Groq | 14,400 requests/day | [console.groq.com](https://console.groq.com) |
| ElevenLabs | 10k chars/month | [elevenlabs.io](https://elevenlabs.io) |
| Replicate | Limited credits | [replicate.com](https://replicate.com/account/api-tokens) |
| Together.ai | $25 credit | [api.together.xyz](https://api.together.xyz/settings/api-keys) |

## 🎯 Usage

### Run Full Pipeline
```bash
cd backend
python main.py
```

### Workflow

1. **Script Generation** - AI creates educational script with scene breakdowns
2. **Audio Generation** - TTS creates narration per scene, measures actual duration
3. **Visual Generation** - AI generates slide backgrounds for each scene
4. **Video Rendering** - Remotion compiles everything into MP4
5. **Human Review** - Approve/reject before upload
6. **YouTube Upload** - Automated publishing (optional)

### Preview Remotion Video
```bash
cd video-renderer
npm run dev
# Opens localhost:3000 for live preview
```

## 📁 Project Structure
ai-video-automation/
├── backend/                 # Python orchestration
│   ├── agents/
│   │   ├── graph.py        # LangGraph workflow
│   │   ├── nodes.py        # Agent nodes (research, audio, visuals, etc.)
│   │   └── state.py        # State schema
│   ├── config/
│   │   └── config.py       # Configuration
│   ├── main.py             # Entry point
│   └── requirements.txt
│
├── video-renderer/          # Remotion video engine
│   ├── src/
│   │   ├── Video.tsx       # Main video component
│   │   ├── Root.tsx        # Remotion composition
│   │   └── index.ts        # Entry
│   ├── public/
│   │   └── visuals/        # Generated images
│   └── package.json
│
├── output/                  # Generated content
│   ├── scripts/            # JSON scripts
│   ├── audio/              # TTS audio files
│   └── videos/             # Final MP4s
│
└── .env                     # API keys (gitignored)

## 🎨 Customization

### Change Video Topic

Edit `backend/main.py`:
```python
initial_state: VideoState = {
    "topic": "Your Custom Topic Here",
    # ...
}
```

### Change Voice

Edit `backend/agents/nodes.py`:
```python
# Use your ElevenLabs Voice Design ID
VOICE_ID = "your_voice_design_id"
```

### Customize Video Style

Edit `video-renderer/src/Video.tsx` - adjust colors, animations, layouts

## 📊 Cost Estimation

Per 10-minute video:

| Service | Cost |
|---------|------|
| Groq (Script) | Free |
| ElevenLabs (TTS) | Free tier / $0.30 |
| Image Generation | Free tier / $0.30-0.60 |
| Remotion Rendering | Free (local) |
| **Total** | **$0-1 per video** |

## 🔧 Troubleshooting

### Audio sync issues
- Ensure `pydub` and `ffmpeg` are installed
- Check that scene timestamps are cumulative

### Remotion render fails
- Verify Node.js version (18+)
- Check `props.json` exists in `video-renderer/`
- Run `npm run dev` to debug visually

### Image generation fails
- Check API key validity
- Verify free tier quota remaining
- Try different image model (FLUX/SDXL/Stability)

## 🚧 Roadmap

- [x] Script generation with Groq
- [x] Per-scene TTS with timing
- [x] AI image generation
- [x] Video rendering with Remotion
- [x] Animated subtitles
- [ ] YouTube upload integration
- [ ] Batch processing (multiple videos)
- [ ] Web UI for topic input
- [ ] Custom voice cloning
- [ ] Advanced animations library

## 📝 License

MIT License - feel free to use for your projects!

## 🙏 Acknowledgments

- [LangGraph](https://github.com/langchain-ai/langgraph) - Agent orchestration
- [Remotion](https://remotion.dev) - Video rendering framework
- [Groq](https://groq.com) - Fast LLM inference
- [ElevenLabs](https://elevenlabs.io) - Natural TTS

## 📧 Contact

Questions? Open an issue or reach out!

---

**⭐ Star this repo if you found it useful!**