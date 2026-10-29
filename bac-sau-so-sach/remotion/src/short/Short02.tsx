import React, { useMemo } from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, fmt, sans } from "../theme";
import { BacSauFlat, LedgerInHands } from "./BacSauFlat";
import { Card, Chip, F, Ground, GROUND_Y, useT } from "./flat";
import { PropPop, Sparkles } from "./Props";
import { cueAt, Subtitles, type Short01Props } from "./Short01";

// Út dùng hình vector trong Short, giữ tóc đuôi ngựa và trang phục của bảng nhân vật.
const UtFlat: React.FC<{ talking: boolean; mouth: number }> = ({ talking, mouth }) => <svg viewBox="0 0 400 550" width={400} height={550}>
  <path d="M272 72 Q390 40 370 200 Q360 290 310 350 Q350 210 290 160Z" fill={C.hair} stroke={C.ink} strokeWidth={7} />
  <path d="M119 364 L100 530 H298 L278 364Z" fill={C.rule} stroke={C.ink} strokeWidth={7} />
  <path d="M135 279 Q89 295 74 388 L121 405 L140 351 L131 447 H278 L266 350 L290 404 L331 382 Q315 291 267 279Z" fill={F.card} stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
  <path d="M170 240 L169 285 L203 312 L235 282 L232 240Z" fill={C.skin} stroke={C.ink} strokeWidth={6} />
  <path d="M135 290 L167 278 L202 313 L176 333Z M202 313 L235 278 L268 289 L232 333Z" fill={F.card} stroke={C.ink} strokeWidth={5} />
  <ellipse cx={201} cy={160} rx={106} ry={127} fill={C.hair} stroke={C.ink} strokeWidth={7} />
  <path d="M111 149 Q103 245 156 274 Q211 306 270 250 Q296 211 289 140 Q221 136 186 80 Q155 131 111 149Z" fill={C.skin} stroke={C.ink} strokeWidth={7} />
  <path d="M107 169 Q101 94 154 64 Q221 26 278 89 Q238 96 210 70 Q180 134 107 169Z" fill={C.hair} stroke={C.ink} strokeWidth={7} />
  <ellipse cx={156} cy={186} rx={17} ry={23} fill={C.ink} /><ellipse cx={245} cy={186} rx={17} ry={23} fill={C.ink} />
  <circle cx={151} cy={179} r={5} fill={F.card} /><circle cx={240} cy={179} r={5} fill={F.card} />
  <path d="M137 151 Q154 140 174 150 M227 149 Q246 140 262 152" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
  {talking ? <ellipse cx={202} cy={239} rx={19} ry={7 + mouth * 11} fill={C.red} stroke={C.ink} strokeWidth={4} /> : <path d="M180 234 Q202 253 224 233" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />}
  <path d="M141 297 L262 442" fill="none" stroke={C.inkSoft} strokeWidth={16} />
  <rect x={221} y={397} width={89} height={90} rx={14} fill={C.inkSoft} stroke={C.ink} strokeWidth={6} />
  <rect x={252} y={408} width={24} height={23} rx={3} fill={C.gold} stroke={C.ink} strokeWidth={4} />
</svg>;

const NumberStamp: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at * fps, fps, config: { damping: 12, stiffness: 190 } });
  return <div style={{ position: "absolute", top: 752, left: 140, right: 140, textAlign: "center", border: `10px double ${C.red}`, borderRadius: 22, color: C.red, fontSize: 112, fontFamily: sans, fontWeight: 800, padding: "22px 0", background: F.card, opacity: Math.min(1, p), transform: `rotate(-5deg) scale(${0.5 + p * 0.5})` }}>≈ 29%/NĂM</div>;
};

export const Short02: React.FC<Short01Props> = ({ data, audio }) => {
  if (!data) return <AbsoluteFill style={{ background: F.yellow }} />;
  return <ShortBody data={data} audio={audio} />;
};

const ShortBody: React.FC<Short01Props & { data: NonNullable<Short01Props["data"]> }> = ({ data, audio }) => {
  const t = useT(); const { words } = data;
  const T = useMemo(() => {
    const at = (s: string, after = 0) => cueAt(words, s, after);
    const khoan = at("Khoan"); const compare = at("Bây giờ so lại cho công bằng", khoan);
    const cash = at("Trả thẳng", compare); const gop = at("Trả góp không phần trăm", cash);
    const fees = at("cộng thêm gần", gop); const total = at("là hai mươi bốn triệu", fees); const diff = at("Chênh nhau gần một triệu chín", total);
    const rate = at("gần hai mươi chín phần trăm một năm", diff);
    const quote = at("Ở đời không có gì là không đồng", rate);
    return { khoan, compare, cash, gop, fees, total, diff, rate, quote };
  }, [words]);
  const current = words.find(w => t >= w.start && t <= w.end);
  const mouth = current ? Math.abs(Math.sin((t - current.start) / Math.max(0.08, current.end - current.start) * Math.PI)) : 0;
  const compare = t >= T.compare && t < T.quote;
  const background = t < T.khoan ? F.yellow : t < T.compare ? F.pink : t < T.quote ? F.mint : F.yellow;
  const events: [number, string][] = [[0, "pop"], [T.khoan, "thud"], [T.cash, "pop"], [T.gop, "pop"], [T.diff, "ding"], [T.rate, "thud"], [T.quote, "ding"]];
  return <AbsoluteFill style={{ background, overflow: "hidden", color: C.ink, fontFamily: sans }}>
    <div style={{ position: "absolute", top: 54, left: 72, fontSize: 32, fontWeight: 800 }}>BÁC SÁU SỔ SÁCH</div>
    {t < T.khoan && <>
      <Card at={0} seed="s2-hook" top={150} fontSize={106}>TRẢ GÓP <span style={{ color: C.red }}>0%</span></Card>
      <Chip at={0.25} seed="s2-month" top={455} text="CHỈ GẦN 4 TRIỆU/THÁNG?" fontSize={49} />
      <Chip at={1.1} seed="s2-zero" top={610} text="Lãi 0đ… có thật hời?" fontSize={56} />
      <PropPop at={0.6} x={760} y={810} size={180} seed="s2-phone"><g><rect x={48} y={8} width={104} height={184} rx={16} fill={C.ink} /><rect x={57} y={22} width={86} height={151} rx={8} fill={F.card} /><rect x={83} y={18} width={34} height={8} rx={4} fill={C.ink} /><circle cx={100} cy={182} r={5} fill={C.rule} /></g></PropPop>
    </>}
    {t >= T.khoan && t < T.compare && <>
      <Card at={T.khoan} seed="s2-stop" top={210} fontSize={150}><span style={{ color: C.red }}>KHOAN!</span></Card>
      <Chip at={T.khoan + 0.2} seed="s2-ledger" top={570} text="Đưa sổ đây Bác coi!" fontSize={57} />
    </>}
    {compare && <>
      <Card at={T.compare} seed="s2-compare" top={130} fontSize={72}>CÙNG MỘT CHIẾC MÁY</Card>
      <Chip at={T.cash} seed="s2-cash" top={410} text={`Trả thẳng: ${fmt(22.49, 2)} triệu`} fontSize={55} bg={F.card} />
      <Chip at={T.gop} seed="s2-gop" top={535} text={t < T.total ? "Góp: 23,49 triệu + phí" : "Tổng góp: 24,38 triệu"} fontSize={55} color={C.red} bg={F.card} />
      <Chip at={T.diff} seed="s2-diff" top={660} text="CHÊNH GẦN 1,9 TRIỆU" fontSize={52} />
      <NumberStamp at={T.rate} />
      <div style={{ position: "absolute", top: 1000, right: 60, width: 460, textAlign: "center", fontSize: 27, lineHeight: 1.4, color: C.inkSoft }}>Tính cả phí và mất giảm giá.<br />Giảm 1 triệu là giả định minh họa.</div>
    </>}
    {t >= T.quote && <>
      <Card at={T.quote} seed="s2-quote" top={160} fontSize={81}>Ở ĐỜI KHÔNG CÓ GÌ<br /><span style={{ color: C.red }}>LÀ KHÔNG ĐỒNG.</span></Card>
      <Chip at={T.quote + 0.35} seed="s2-cta" top={620} text="▶ XEM VIDEO ĐẦY ĐỦ" fontSize={57} bg={C.red} color={F.card} />
      <Sparkles at={T.quote + 0.35} x={540} y={650} r={340} />
    </>}
    <div style={{ position: "absolute", left: 45, top: GROUND_Y - (compare ? 480 : 620) }}><BacSauFlat size={compare ? 380 : 500} pose={t < T.khoan ? "hold" : t < T.compare ? "stop" : t < T.quote ? "point" : "wave"} face={t < T.khoan ? "squint" : t < T.quote ? "neutral" : "happy"} talking={Boolean(current) && t >= T.khoan} mouthOpen={mouth} holding={<LedgerInHands />} /></div>
    {(t < T.compare || t >= T.quote) && <div style={{ position: "absolute", right: 60, top: GROUND_Y - 500 }}><UtFlat talking={Boolean(current) && t < T.khoan} mouth={mouth} /></div>}
    <Ground />
    <Subtitles words={words} />
    <Audio src={staticFile(audio)} />
    {events.map(([at, name], i) => <Sequence key={i} from={Math.max(0, Math.round(at * 30))} durationInFrames={36} layout="none"><Audio src={staticFile(`_sfx/${name}.wav`)} volume={0.35} /></Sequence>)}
  </AbsoluteFill>;
};
