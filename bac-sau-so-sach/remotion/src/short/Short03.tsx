import React, { useMemo } from "react";
import { AbsoluteFill, Audio, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, sans } from "../theme";
import { BacSauFlat, LedgerInHands } from "./BacSauFlat";
import { Card, Chip, F, Ground, GROUND_Y, useT } from "./flat";
import { Sparkles } from "./Props";
import { cueAt, Subtitles, type Short01Props } from "./Short01";

// Chị Hai trưởng thành, tóc búi và áo bà ba/tạp dề theo bảng nhân vật.
const ChiHaiFlat: React.FC = () => <svg viewBox="0 0 400 550" width={400} height={550}>
  <ellipse cx={284} cy={94} rx={55} ry={48} fill={C.hair} stroke={C.ink} strokeWidth={7} />
  <path d="M130 348 L112 532 H292 L272 348Z" fill={C.inkSoft} stroke={C.ink} strokeWidth={7} />
  <path d="M134 274 Q90 285 72 405 L119 414 L138 350 L130 464 H277 L268 349 L291 412 L330 393 Q313 285 267 274Z" fill={C.rule} stroke={C.ink} strokeWidth={7} />
  <path d="M170 234 L168 282 Q201 312 236 281 L233 234Z" fill={C.skin} stroke={C.ink} strokeWidth={6} />
  <ellipse cx={201} cy={156} rx={105} ry={121} fill={C.hair} stroke={C.ink} strokeWidth={7} />
  <path d="M107 155 Q105 236 150 267 Q202 299 257 264 Q292 231 291 144 Q230 133 190 81 Q158 134 107 155Z" fill={C.skin} stroke={C.ink} strokeWidth={7} />
  <path d="M105 173 Q94 86 158 58 Q231 22 283 98 Q228 98 199 77 Q162 139 105 173Z" fill={C.hair} stroke={C.ink} strokeWidth={7} />
  <ellipse cx={155} cy={185} rx={12} ry={17} fill={C.ink} /><ellipse cx={245} cy={185} rx={12} ry={17} fill={C.ink} />
  <path d="M138 153 Q155 141 176 151 M226 151 Q245 141 261 155 M146 218 L155 222 M245 222 L255 218 M183 241 Q202 253 222 240" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
  <path d="M148 301 L151 354 H253 L257 301 M146 352 L126 480 H279 L258 352Z" fill={C.inkSoft} stroke={C.ink} strokeWidth={7} />
  <path d="M165 420 Q201 403 239 420 L233 475 Q202 494 169 475Z" fill={C.gold} stroke={C.ink} strokeWidth={6} />
  <path d="M171 416 Q201 425 232 416" fill="none" stroke={C.ink} strokeWidth={5} />
</svg>;

const LossStamp: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at * fps, fps, config: { damping: 13, stiffness: 180 } });
  if (frame / fps < at) return null;
  return <div style={{ position: "absolute", top: 828, left: 360, right: 70, border: `9px double ${C.red}`, background: F.card, borderRadius: 20, textAlign: "center", padding: "18px 8px", color: C.red, fontFamily: sans, fontWeight: 800, fontSize: 82, opacity: Math.min(1, p), transform: `rotate(-5deg) scale(${0.6 + p * 0.4})` }}>LỖ 2 TRIỆU</div>;
};

export const Short03: React.FC<Short01Props> = ({ data, audio }) => data ? <Body data={data} audio={audio} /> : <AbsoluteFill style={{ background: F.yellow }} />;

const Body: React.FC<Short01Props & { data: NonNullable<Short01Props["data"]> }> = ({ data, audio }) => {
  const t = useT(); const { words } = data;
  const T = useMemo(() => {
    const at = (s: string, after = 0) => cueAt(words, s, after);
    const stop=at("Khoan"); const buy=at("Tuần trước chị mua",stop);
    const rise=at("Tuần này người ta nói",buy); const sell=at("Chị đem vàng ra bán",rise);
    const green=at("Cột mua vào",sell); const loss=at("Lỗ hai triệu",green);
    const quote=at("Mua vàng thì nhìn cả giá bán lại",loss);
    return {stop,buy,rise,sell,green,loss,quote};
  },[words]);
  const current=words.find(w=>t>=w.start&&t<=w.end);
  const mouth=current?Math.abs(Math.sin((t-current.start)/Math.max(0.08,current.end-current.start)*Math.PI)):0;
  const compare=t>=T.buy&&t<T.quote;
  const events:[number,string][]=[[0,"pop"],[T.stop,"thud"],[T.buy,"pop"],[T.rise,"ding"],[T.green,"pop"],[T.loss,"thud"],[T.quote,"ding"]];
  return <AbsoluteFill style={{ background: t<T.stop?F.yellow:t<T.buy?F.pink:t<T.quote?F.mint:F.yellow, overflow:"hidden",fontFamily:sans,color:C.ink }}>
    <div style={{position:"absolute",top:54,left:72,fontSize:32,fontWeight:800}}>BÁC SÁU SỔ SÁCH</div>
    {t<T.stop&&<>
      <Card at={0} seed="s3-hook" top={155} fontSize={100}>VÀNG LÊN<br /><span style={{color:C.red}}>1 TRIỆU…</span></Card>
      <Chip at={0.4} seed="s3-question" top={580} text="SAO VẪN LỖ 2 TRIỆU?" fontSize={55} />
    </>}
    {t>=T.stop&&t<T.buy&&<>
      <Card at={T.stop} seed="s3-stop" top={210} fontSize={150}><span style={{color:C.red}}>KHOAN!</span></Card>
      <Chip at={T.stop+0.2} seed="s3-ledger" top={580} text="Đưa sổ đây Bác coi!" fontSize={57} />
    </>}
    {compare&&<>
      <Card at={T.buy} seed="s3-compare" top={140} fontSize={78}>NHÌN CẢ HAI CỘT GIÁ</Card>
      {t>=T.buy&&<Chip at={T.buy} seed="s3-buy" top={420} text="MUA: 143,6 TRIỆU" fontSize={61} bg={F.card} />}
      {t>=T.rise&&<Chip at={T.rise} seed="s3-rise" top={545} text="Hai cột cùng tăng 1 triệu" fontSize={50} />}
      {t>=T.green&&<Chip at={T.green} seed="s3-sell" top={675} text="BÁN: 141,6 TRIỆU" fontSize={61} bg={F.card} color={C.red} />}
      <LossStamp at={T.loss} />
      <div style={{position:"absolute",top:1045,right:65,width:490,textAlign:"center",fontSize:29,lineHeight:1.5,color:C.inkSoft}}>Tiệm bán cho mình: giá bán ra.<br />Tiệm mua của mình: giá mua vào.<br />Ví dụ theo giá ngày 19/10/2026.</div>
    </>}
    {t>=T.quote&&<>
      <Card at={T.quote} seed="s3-quote" top={150} fontSize={83}>MUA VÀNG THÌ NHÌN<br /><span style={{color:C.red}}>CẢ GIÁ BÁN LẠI.</span></Card>
      <Chip at={T.quote+0.2} seed="s3-cta" top={650} text="▶ XEM VIDEO ĐẦY ĐỦ" fontSize={57} bg={C.red} color={F.card} />
      <Sparkles at={T.quote+0.2} x={540} y={680} r={350} />
    </>}
    <div style={{position:"absolute",left:45,top:GROUND_Y-(compare?480:620)}}><BacSauFlat size={compare?380:500} pose={t<T.stop?"hold":t<T.buy?"stop":t<T.quote?"point":"wave"} face={t<T.stop?"squint":t<T.quote?"neutral":"happy"} talking={Boolean(current)} mouthOpen={mouth} holding={<LedgerInHands/>}/></div>
    {!compare&&<div style={{position:"absolute",right:60,top:GROUND_Y-500}}><ChiHaiFlat/></div>}
    <Ground/><Subtitles words={words}/><Audio src={staticFile(audio)}/>
    {events.map(([at,name],i)=><Sequence key={i} from={Math.max(0,Math.round(at*30))} durationInFrames={36} layout="none"><Audio src={staticFile(`_sfx/${name}.wav`)} volume={0.35}/></Sequence>)}
  </AbsoluteFill>;
};
