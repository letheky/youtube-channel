import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Explainer} from './Explainer';
import type {EpisodeProps} from './contracts';
import preview from './preview.json';
import {WifiDesign, WifiEpisode} from './wifi/WifiEpisode';
import {WifiThumbnail} from './wifi/Thumbnail';
import {WifiShort} from './wifi/WifiShort';

const defaultProps: EpisodeProps = {
  ...preview,
  shots: preview.shots.map(shot => {
    if (shot.labels.length !== 3) throw new Error(`Shot ${shot.id} requires three labels`);
    return {...shot, labels: [shot.labels[0], shot.labels[1], shot.labels[2]]};
  }),
};

const Root: React.FC = () => <><Composition
  id="ChuTu-TechnicalPreview"
  component={Explainer}
  width={1920}
  height={1080}
  fps={30}
  durationInFrames={Math.ceil(preview.duration * 30)}
  defaultProps={defaultProps}
  calculateMetadata={({props}) => ({durationInFrames: Math.max(1, Math.ceil(props.duration * 30))})}
/>
<Composition id="ChuTu-Wifi-Design" component={WifiDesign} width={1920} height={1080} fps={30} durationInFrames={1} defaultProps={{scene: 1, beat: 0}}/>
<Composition id="ChuTu-Wifi-Thumbnail" component={WifiThumbnail} width={1280} height={720} fps={30} durationInFrames={1} defaultProps={{variant: 'A' as const}}/>
<Composition id="ChuTu-Wifi-Short" component={WifiShort} width={1080} height={1920} fps={30} durationInFrames={1} defaultProps={{review:true}} calculateMetadata={({props})=>{
  if(!props.data) throw new Error('Supply props from existing scene2 audio');
  return {durationInFrames:props.data.durationInFrames};
}}/>
<Composition id="ChuTu-Wifi-Video" component={WifiEpisode} width={1920} height={1080} fps={30} durationInFrames={1} defaultProps={{scenes: [], review: true}} calculateMetadata={({props}) => {
  if (!props.scenes.length) throw new Error('Provide props built from actual episode audio; empty video is not renderable');
  return {durationInFrames: props.scenes.reduce((sum,s) => sum + s.durationInFrames, 0)};
}}/>
</>;
registerRoot(Root);
