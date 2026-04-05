import {
	useCurrentFrame,
	useVideoConfig,
	Audio,
	Sequence,
	spring,
	interpolate,
} from 'remotion';
import { staticFile } from 'remotion';

type Scene = {
  timestamp: number;
  duration: number;
  text: string;
  visual_type: string;
  visual_data?: {
    heading?: string;
    points?: string[];
    image_path?: string;  // ⬅️ ADD THIS LINE
    description?: string; // ⬅️ ADD THIS TOO (optional but useful)
  };
};

type ScriptData = {
  scenes: Scene[];
  audio_path: string;
  metadata: {
    title: string;
  };
};

export const MyVideo = ({ scriptData }: { scriptData: ScriptData | null }) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// Load script from props or use default
	const script = scriptData || {
		scenes: [],
		audio_path: '',
		metadata: {title: 'AI Video'},
	};

	// Debug: Log on first render
	if (frame === 0) {
		console.log('=== VIDEO RENDER DEBUG ===');
		console.log('Total frames:', durationInFrames);
		console.log('FPS:', fps);
		console.log('Duration:', durationInFrames / fps, 'seconds');
		console.log('Scenes:', script.scenes.length);
		console.log('Audio path:', script.audio_path);
		
		script.scenes.forEach((scene, i) => {
			const startFrame = Math.floor(scene.timestamp * fps);
			const durationFrames = Math.floor(scene.duration * fps);
			console.log(`Scene ${i}: ${scene.timestamp}s (frame ${startFrame}) for ${scene.duration}s (${durationFrames} frames)`);
		});
	}

	return (
		<div
			style={{
				flex: 1,
				backgroundColor: '#0a0a0a',
				fontFamily: 'Inter, Arial, sans-serif',
			}}
		>
			{/* Audio track */}
			{script.audio_path && (<Audio src={staticFile(script.audio_path.replace("/", ""))} />)}

			{/* Render each scene */}
			{script.scenes.map((scene: Scene, i: number) => {
			const startFrame = Math.floor(scene.timestamp * fps);
			const durationFrames = Math.floor(scene.duration * fps);

			return (
				<Sequence key={i} from={startFrame} durationInFrames={durationFrames}>
					<Scene
						data={scene}
						frame={frame - startFrame}
						fps={fps}
						sceneIndex={i}
					/>
				</Sequence>
			);
		})}
		</div>
	);
};

const getColors = (visualType: string) => {
	switch (visualType) {
		case 'code':
			return { bg: '#1e1e1e', text: '#d4d4d4', accent: '#4ec9b0' };
		case 'diagram':
			return { bg: '#0a0a0a', text: '#ffffff', accent: '#3b82f6' };
		case 'image':
			return { bg: '#1a1a1a', text: '#f5f5f5', accent: '#10b981' };
		default:
			return { bg: '#0a0a0a', text: '#ffffff', accent: '#8b5cf6' };
	}
};

const Scene = ({
  data,
  frame,
  fps,
  sceneIndex,
}: {
  data: Scene;
  frame: number;
  fps: number;
  sceneIndex: number;
}) => {
	// Animations
	const opacity = spring({frame, fps, from: 0, to: 1, durationInFrames: 20});
	const scale = spring({frame, fps, from: 0.95, to: 1, durationInFrames: 30});
	
	// Subtitle reveal (word by word)
	const words = data.text.split(' ');
	const totalDuration = data.duration * fps;
	const wordsPerSecond = words.length / data.duration;
	const currentWord = Math.min(
		words.length,
		Math.floor((frame / fps) * wordsPerSecond)
	);

	const colors = getColors(data.visual_type);

	return (
		<div style={{
			position: 'absolute',
			top: 0, left: 0,
			width: '100%', height: '100%',
			opacity,
		}}>
			{/* Background Image (if exists) */}
			{data.visual_data?.image_path ? (
				<>
					{/* Generated slide as full-screen background */}
					<div style={{
						position: 'absolute',
						top: 0, left: 0,
						width: '100%', height: '100%',
						overflow: 'hidden'
					}}>
						<img 
							src={staticFile(data.visual_data.image_path.replace('/', ''))}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',  // ⬅️ Covers entire screen, crops if needed
								objectPosition: 'center',
								transform: `scale(${scale})`,
							}}
						/>
					</div>
					
					{/* Dark overlay for subtitle readability */}
					<div style={{
						position: 'absolute',
						bottom: 0, left: 0, right: 0,
						height: '30%',
						background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
						zIndex: 5
					}} />
				</>
			) : (
				/* Fallback gradient if no image */
				<div style={{
					position: 'absolute',
					top: 0, left: 0,
					width: '100%', height: '100%',
					background: `linear-gradient(135deg, ${colors.bg} 0%, #000000 100%)`,
				}} />
			)}

			{/* Progress bar */}
			<div style={{
				position: 'absolute',
				top: 0, left: 0,
				width: '100%', height: 4,
				background: 'rgba(255,255,255,0.1)',
				zIndex: 10
			}}>
				<div style={{
					height: '100%',
					width: `${(frame / totalDuration) * 100}%`,
					background: colors.accent,
				}} />
			</div>

			{/* Animated subtitles at bottom - SMALLER VERSION */}
			<div style={{
				position: 'absolute',
				bottom: 60,  // ⬅️ Closer to bottom
				left: '50%',
				transform: 'translateX(-50%)',
				width: '85%',  // ⬅️ Narrower
				maxWidth: 1200,  // ⬅️ Smaller max width
				textAlign: 'center',
				zIndex: 10
			}}>
				<div style={{
					background: 'rgba(0, 0, 0, 0.75)',
					backdropFilter: 'blur(10px)',
					padding: '20px 40px',  // ⬅️ Less padding
					borderRadius: 15,
					border: `1px solid ${colors.accent}30`,  // ⬅️ Thinner border
				}}>
					<p style={{
						fontSize: 36,  // ⬅️ Smaller font (was 42)
						color: '#ffffff',
						lineHeight: 1.5,  // ⬅️ Tighter line height
						fontWeight: 400,  // ⬅️ Regular weight
						margin: 0,
						textShadow: '0 2px 20px rgba(0,0,0,0.8)'
					}}>
						{words.slice(0, currentWord).map((word, i) => {
							const wordDelay = i * 3;
							const wordOpacity = interpolate(
								frame,
								[wordDelay, wordDelay + 5],
								[0, 1],
								{extrapolateRight: 'clamp'}
							);
							
							return (
								<span key={i} style={{
									opacity: wordOpacity,
									display: 'inline-block',
									marginRight: 8
								}}>
									{word}
								</span>
							);
						})}
					</p>
				</div>
			</div>

			{/* Scene counter */}
			<div style={{
				position: 'absolute',
				top: 30, right: 40,
				fontSize: 28,
				fontWeight: 'bold',
				color: 'white',
				background: `${colors.accent}40`,
				padding: '8px 16px',
				borderRadius: 8,
				backdropFilter: 'blur(10px)',
				zIndex: 10
			}}>
				{sceneIndex + 1}
			</div>
		</div>
	);
};