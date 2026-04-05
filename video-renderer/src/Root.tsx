import {Composition} from 'remotion';
import {MyVideo} from './Video';

export const RemotionRoot = () => {
	return (
		<>
			<Composition
				id="AIVideo"
				component={MyVideo}
				durationInFrames={18000} // Default: 10 minutes at 30fps
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					scriptData: null,
				}}
				// Calculate duration dynamically from props
				calculateMetadata={({props}) => {
					const scriptData = props.scriptData;
					if (!scriptData || !scriptData.scenes || scriptData.scenes.length === 0) {
						return {
							durationInFrames: 18000, // Default 10 min
							fps: 30,
						};
					}
					
					// Calculate total duration from scenes
					const lastScene = scriptData.scenes[scriptData.scenes.length - 1];
					const totalSeconds = lastScene.timestamp + lastScene.duration;
					const totalFrames = Math.ceil(totalSeconds * 30); // 30 fps
					
					console.log(`📊 Video duration: ${totalSeconds}s (${totalFrames} frames)`);
					
					return {
						durationInFrames: totalFrames,
						fps: 30,
					};
				}}
			/>
		</>
	);
};