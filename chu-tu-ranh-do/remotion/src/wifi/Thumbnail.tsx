import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {theme as C} from '../theme';

export const WifiThumbnail: React.FC<{variant: 'A' | 'B'}> = ({variant}) => {
  const pose = variant === 'A' ? 1 : 2;
  return <AbsoluteFill style={{background: C.ink, fontFamily: C.font, color: 'white'}}>
    <div style={{position: 'absolute', left: -170, top: 120, width: 770, height: 770, borderRadius: '50%', background: variant === 'A' ? '#e4f1ef' : '#fff0c5'}}/>
    <div style={{position: 'absolute', left: 0, top: 130, width: 640, height: 530, overflow: 'hidden', transform: 'scale(1.12)', transformOrigin: 'top left'}}>
      <Img src={staticFile('wifi/character-sheet-v1.png')} style={{position: 'absolute', width: 1280, height: 1280, maxWidth: 'none', left: -(pose%2)*640, top: -Math.floor(pose/2)*640}}/>
    </div>
    <div style={{position: 'absolute', left: 53, top: 41, background: C.teal, padding: '9px 18px', borderRadius: 12, fontWeight: 700, fontSize: 32, letterSpacing: 1}}>WI-FI TRONG NHÀ</div>
    <div style={{position: 'absolute', left: 650, top: 145, width: 580, fontWeight: 700, fontSize: variant === 'A' ? 78 : 70, lineHeight: 1.17}}>
      {variant === 'A' ? <><div>GÓI MẠNH</div><div style={{color: '#ffd36b', marginTop: 25}}>PHÒNG VẪN<br/>YẾU?</div></> : <><div>THÊM TIỀN<br/>MẠNG…</div><div style={{color: '#ffd36b', marginTop: 25, fontSize: 61}}>ĐÃ ĐÚNG CHỖ?</div></>}
    </div>
    {variant === 'B' && <svg width="290" height="190" viewBox="0 0 290 190" style={{position: 'absolute', left: 850, bottom: 32}} fill="none" strokeWidth="8" stroke="#d7e1e7"><path d="M58 105V22 M230 105V22" strokeLinecap="round"/><rect x="25" y="96" width="240" height="71" rx="17" fill="white"/><path d="M70 132H78 M98 132H106 M126 132H134" stroke={C.teal}/></svg>}
    <div style={{position: 'absolute', right: 42, bottom: 20, fontSize: 21, fontWeight: 700, color: '#d7e1e7'}}>CHÚ TƯ RÀNH ĐỒ</div>
  </AbsoluteFill>;
};
