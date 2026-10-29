import React from 'react';
import {AbsoluteFill,Html5Audio,Img,staticFile,useCurrentFrame} from 'remotion';
import {theme as C} from '../theme';
import type {WifiSceneData} from './WifiEpisode';

export type WifiShortProps={data?:WifiSceneData;review:boolean};
export const WifiShort:React.FC<WifiShortProps>=({data,review})=>{
  const frame=useCurrentFrame();
  if(!data || data.scene!==2) throw new Error('Short requires actual existing scene2 audio and cues');
  const beat=Math.max(0,data.beatFrames.filter(f=>f<=frame).length-1);
  const caption=data.captions.find(c=>frame/30>=c.start&&frame/30<c.end)?.text;
  const summary=['Từ Internet tới điện thoại có những chặng khác nhau.','Gói dịch vụ và Wi-Fi trong nhà cần được phân biệt.','Kiểm từng chặng trước khi kết luận bên nào có lỗi.'][beat];
  return <AbsoluteFill style={{background:C.paper,fontFamily:C.font,color:C.ink}}>
    <div style={{height:18,background:C.ink}}/>
    <div style={{position:'absolute',left:80,top:75,fontSize:34,fontWeight:700,color:C.teal}}>CHÚ TƯ RÀNH ĐỒ</div>
    <div style={{position:'absolute',left:80,top:165,width:920,fontSize:65,fontWeight:700,lineHeight:1.18}}>Wi-Fi yếu:<br/>nâng gói đã đúng chỗ?</div>
    <div style={{position:'absolute',left:-10,top:385,width:640,height:410,overflow:'hidden',transform:'scale(.94)',transformOrigin:'top left'}}><Img src={staticFile('wifi/character-sheet-v1.png')} style={{position:'absolute',width:1280,height:1280,maxWidth:'none',left:0,top:0}}/></div>
    <div style={{position:'absolute',left:615,top:435,width:380,fontSize:43,lineHeight:1.25,fontWeight:700,color:C.teal}}>{['Tách từng chặng ra coi.','Hai chặng có liên quan, nhưng khác nhau.','Đừng vội kết luận chỉ từ một dấu hiệu.'][beat]}</div>
    <div style={{position:'absolute',left:75,top:825,width:930,display:'flex',alignItems:'center',gap:15}}>
      {['Internet','Router','Điện thoại'].map((s,i)=><React.Fragment key={s}>{i>0&&<div style={{fontSize:45,color:C.teal}}>→</div>}<div style={{border:`3px solid ${i===1?C.amber:C.line}`,background:i===1?'#fff0c5':'white',borderRadius:24,width:257,height:145,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:36}}>{s}</div></React.Fragment>)}
    </div>
    <div style={{position:'absolute',left:80,top:1010,width:920,display:'flex',justifyContent:'space-between',fontSize:30,color:C.muted}}><div>Đường nhà mạng</div><div>Wi-Fi trong nhà</div></div>
    <div style={{position:'absolute',left:80,top:1115,width:920,padding:30,boxSizing:'border-box',background:'white',borderRadius:24,border:`2px solid ${C.line}`,fontSize:39,lineHeight:1.35}}>{summary}</div>
    <div style={{position:'absolute',left:80,top:1325,fontSize:25,color:C.muted}}>Nguồn: Google Nest · Ofcom</div>
    <div style={{position:'absolute',left:80,top:1365,fontSize:23,color:C.muted}}>Hình minh họa AI {review?'· BẢN DUYỆT · CHƯA ĐĂNG':''}</div>
    <div style={{position:'absolute',left:75,right:75,top:1435,height:220,padding:'20px 32px',boxSizing:'border-box',background:C.ink,color:'white',borderRadius:26,fontSize:48,fontWeight:700,lineHeight:1.25,display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center'}}>{caption??''}</div>
    <Html5Audio src={staticFile(data.audio)}/>
  </AbsoluteFill>;
};
