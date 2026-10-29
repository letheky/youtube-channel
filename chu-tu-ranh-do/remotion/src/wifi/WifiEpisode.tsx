import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import type {Caption} from '../contracts';
import {theme as C} from '../theme';
import {Character, WifiVisual} from './WifiVisual';
import {wifiSpecs} from './specs';

export type WifiSceneData = {scene: number; audio: string; durationInFrames: number; captions: Caption[]; beatFrames: number[]; cueFrames: Record<string, number>};
export type WifiVideoProps = {scenes: WifiSceneData[]; review: boolean};

const SceneView: React.FC<{scene: number; beat: number; markers?: Record<string, boolean>; caption?: string; label?: string}> = ({scene,beat,markers,caption,label}) => {
  const spec = wifiSpecs[scene-1];
  if (!spec || !Number.isInteger(beat) || beat < 0 || beat > 2) throw new Error('Invalid Wi-Fi scene/beat');
  return <AbsoluteFill style={{background: C.paper, color: C.ink, fontFamily: C.font}}>
    <div style={{height: 14, background: C.ink}}/>
    <div style={{position: 'absolute', left: 65, top: 50, fontSize: 25, fontWeight: 700, color: C.teal, letterSpacing: 1.7}}>CHÚ TƯ RÀNH ĐỒ</div>
    <div style={{position: 'absolute', right: 65, top: 50, fontSize: 24, color: C.muted}}>WI-FI TRONG NHÀ · {String(scene).padStart(2,'0')}/12</div>
    <div style={{position: 'absolute', left: 65, right: 65, top: 107, height: 2, background: C.line}}/>
    <Character pose={spec.pose}/>
    <div style={{position: 'absolute', left: 525, top: 141, width: 1260}}>
      <div style={{fontSize: 42, lineHeight: 1.22, fontWeight: 700, minHeight: 58}}>{spec.title}</div>
      <div style={{fontSize: 26, color: C.teal, fontWeight: 700, marginTop: 12, marginBottom: 23}}>{spec.beats[beat]}</div>
      <WifiVisual scene={scene} beat={beat} markers={markers}/>
    </div>
    <div style={{position: 'absolute', left: 65, bottom: 241, fontSize: 22, color: C.muted}}>Nguồn: {spec.source}</div>
    <div style={{position: 'absolute', left: 65, bottom: 209, fontSize: 20, color: C.muted}}>Hình minh họa AI · sơ đồ do kênh dựng {label ? `· ${label}` : ''}</div>
    <div style={{position: 'absolute', left: 65, right: 65, bottom: 52, height: 144, background: C.ink, borderRadius: 23, color: 'white', fontWeight: 600, fontSize: 40, lineHeight: 1.28, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '12px 45px', boxSizing: 'border-box'}}>{caption ?? ''}</div>
    <div style={{position: 'absolute', left: 65, bottom: 18, fontSize: 18, color: C.muted}}>Hiểu món mình xài, quyết định cho đáng.</div>
  </AbsoluteFill>;
};

export const WifiDesign: React.FC<{scene: number; beat: number}> = ({scene,beat}) => <SceneView scene={scene} beat={beat} caption="Khung duyệt bố cục — chưa phải thời điểm trong video thật." label="DUYỆT BỐ CỤC"/>;

const TimedScene: React.FC<{data: WifiSceneData; review: boolean}> = ({data,review}) => {
  const f = useCurrentFrame();
  const beat = Math.max(0, data.beatFrames.filter(n => n <= f).length - 1);
  const markers = Object.fromEntries(Object.entries(data.cueFrames).map(([key,from]) => [key,f >= from]));
  const caption = data.captions.find(c => f/30 >= c.start && f/30 < c.end)?.text;
  return <>
    <SceneView scene={data.scene} beat={beat} markers={markers} caption={caption} label={review ? 'BẢN DUYỆT · CHƯA ĐĂNG' : undefined}/>
    <Html5Audio src={staticFile(data.audio)}/>
  </>;
};

export const WifiEpisode: React.FC<WifiVideoProps> = ({scenes,review}) => {
  let cursor = 0;
  return <AbsoluteFill>{scenes.map(data => {
    const from = cursor;
    cursor += data.durationInFrames;
    return <Sequence key={data.scene} from={from} durationInFrames={data.durationInFrames}><TimedScene data={data} review={review}/></Sequence>;
  })}</AbsoluteFill>;
};
