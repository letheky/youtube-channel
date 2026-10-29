import React from 'react';
import {AbsoluteFill, Html5Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import type {EpisodeProps, Shot} from './contracts';
import {theme as C} from './theme';

const FlowCard: React.FC<{shot: Shot}> = ({shot}) => {
  const f = useCurrentFrame();
  const progress = interpolate(f, [0, 15], [0, 1], {extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', left: 560, top: 228, width: 1250, height: 535, opacity: progress, transform: `translateY(${(1 - progress) * 18}px)`}}>
    <div style={{fontSize: 53, fontWeight: 700, color: C.ink, lineHeight: 1.15, minHeight: 126}}>{shot.title}</div>
    <div style={{display: 'flex', gap: 18, alignItems: 'center', marginTop: 40}}>
      {shot.labels.map((label, i) => <React.Fragment key={i}>
        {i > 0 && <div style={{fontSize: 55, color: C.teal}}>→</div>}
        <div style={{width: 340, minHeight: 138, padding: '22px 18px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 24, border: `3px solid ${i === 1 ? C.amber : C.line}`, background: i === 1 ? '#fff5d7' : C.panel, color: C.ink, fontWeight: 700, fontSize: 34, lineHeight: 1.3}}>{label}</div>
      </React.Fragment>)}
    </div>
    <div style={{fontSize: 34, color: C.muted, lineHeight: 1.4, marginTop: 30}}>{shot.body}</div>
    {shot.note && <div style={{fontSize: 23, color: C.muted, marginTop: 22}}>{shot.note}</div>}
  </div>;
};

export const Explainer: React.FC<EpisodeProps> = (props) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = f / fps;
  const caption = props.captions.find(c => sec >= c.start && sec < c.end);
  const duration = Math.max(1, Math.ceil(props.duration * fps));
  return <AbsoluteFill style={{background: C.paper, color: C.ink, fontFamily: C.font}}>
    <div style={{height: 24, background: C.ink}} />
    <div style={{position: 'absolute', left: 70, top: 67, fontSize: 28, letterSpacing: 2, fontWeight: 700, color: C.teal}}>CHÚ TƯ RÀNH ĐỒ</div>
    <div style={{position: 'absolute', right: 75, top: 69, fontSize: 25, color: C.muted}}>HIỂU MÓN MÌNH XÀI, QUYẾT ĐỊNH CHO ĐÁNG.</div>
    <div style={{position: 'absolute', top: 134, left: 70, right: 70, height: 2, background: C.line}} />
    <Img src={staticFile('branding/avatar-chu-tu.png')} style={{position: 'absolute', left: 85, top: 255, width: 365, height: 365, objectFit: 'contain', borderRadius: '50%', border: `7px solid ${C.amber}`}} />
    <div style={{position: 'absolute', left: 100, top: 660, width: 350, textAlign: 'center', fontSize: 28, lineHeight: 1.4, color: C.muted}}>Cùng Tư coi từng chặng,<br/>rồi mới quyết định.</div>
    {props.shots.map(shot => <Sequence key={shot.id} from={Math.round(shot.from * fps)} durationInFrames={Math.max(1, Math.round(shot.duration * fps))}><FlowCard shot={shot}/></Sequence>)}
    {props.audio && <Html5Audio src={staticFile(props.audio)} />}
    <div style={{position: 'absolute', left: 75, right: 75, bottom: 72, minHeight: 124, borderRadius: 22, background: C.ink, padding: '22px 50px', boxSizing: 'border-box', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white', fontSize: 39, fontWeight: 600, lineHeight: 1.35}}>{caption?.text ?? ''}</div>
    {props.technicalPreview && <div style={{position: 'absolute', left: 75, bottom: 220, fontSize: 22, color: '#855b07', fontWeight: 700}}>BẢN THỬ KỸ THUẬT · CHƯA PHẢI VIDEO PHÁT HÀNH</div>}
    <div style={{position: 'absolute', bottom: 0, left: 0, height: 9, width: `${100 * Math.min(1, f / duration)}%`, background: C.amber}} />
  </AbsoluteFill>;
};
