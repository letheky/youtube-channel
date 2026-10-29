import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { F, useBoil } from "./flat";

export type Pose = "down" | "up" | "stop" | "hold" | "wave" | "point";
export type Face = "neutral" | "happy" | "squint" | "shock" | "grin";

const SKIN = "#EDBB8E";
const SKIN_DARK = "#D9A273";
const HAIR = "#A3A3A3";
const HAIR_LIGHT = "#CFCFCF";
const SHIRT = "#E9DCC0";
const CHECK = "#B89B6E";
const PEN = "#2F6FD6";

/** Vị trí bàn tay (trái, phải) trong khung 400×520 theo tư thế */
function hands(pose: Pose, wave: number): [[number, number], [number, number]] {
  switch (pose) {
    case "up":
      return [[30, 240], [370, 240]];
    case "stop":
      return [[75, 505], [345, 300]];
    case "hold":
      return [[150, 430], [250, 430]];
    case "wave":
      return [[75, 505], [372 + wave * 14, 230 - Math.abs(wave) * 6]];
    case "point":
      return [[75, 505], [380, 210]];
    default:
      return [[70, 505], [330, 505]];
  }
}

const Arm: React.FC<{ from: [number, number]; to: [number, number]; side: -1 | 1 }> = ({ from, to, side }) => {
  const ex = (from[0] + to[0]) / 2 + side * 34;
  const ey = (from[1] + to[1]) / 2 + 26;
  return (
    <g>
      <path d={`M${from[0]} ${from[1]} Q${ex} ${ey} ${to[0]} ${to[1]}`} stroke={SHIRT} strokeWidth={50} strokeLinecap="round" fill="none" />
      <circle cx={to[0]} cy={to[1]} r={25} fill={SKIN} />
    </g>
  );
};

export const BacSauFlat: React.FC<{
  pose?: Pose;
  face?: Face;
  talking?: boolean;
  /** 0–1 tiến độ trong âm tiết đang đọc (để mấp máy miệng) */
  mouthOpen?: number;
  holding?: React.ReactNode;
  size?: number;
  seed?: string;
}> = ({ pose = "down", face = "neutral", talking = false, mouthOpen = 0, holding, size = 560, seed = "bac" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const boil = useBoil(seed, 2);
  const blink = frame % Math.round(fps * 2.9) < 4 && face !== "shock";
  const wave = Math.sin((frame / fps) * 9);
  const [lh, rh] = hands(pose, wave);
  const bob = Math.sin((frame / fps) * 3) * 3;

  const eyes = () => {
    if (blink || face === "happy" || face === "grin") {
      const up = face === "happy" || face === "grin";
      return [150, 250].map((x) => (
        <path key={x} d={up ? `M${x - 12} 206 Q${x} 192 ${x + 12} 206` : `M${x - 12} 202 L${x + 12} 202`} stroke={F.ink} strokeWidth={6} strokeLinecap="round" fill="none" />
      ));
    }
    if (face === "squint") return [150, 250].map((x) => <path key={x} d={`M${x - 13} 203 L${x + 13} 199`} stroke={F.ink} strokeWidth={7} strokeLinecap="round" />);
    if (face === "shock")
      return [150, 250].map((x) => (
        <g key={x}>
          <circle cx={x} cy={201} r={17} fill="#fff" />
          <circle cx={x} cy={201} r={8} fill={F.ink} />
        </g>
      ));
    return [150, 250].map((x) => <circle key={x} cx={x} cy={202} r={8} fill={F.ink} />);
  };

  const brows = () => {
    const y = face === "shock" ? 150 : 163;
    if (face === "squint")
      return (
        <>
          <path d="M118 166 L178 158" stroke={HAIR} strokeWidth={13} strokeLinecap="round" />
          <path d="M222 152 L282 162" stroke={HAIR} strokeWidth={13} strokeLinecap="round" />
        </>
      );
    return (
      <>
        <path d={`M122 ${y} Q150 ${y - 8} 178 ${y}`} stroke={HAIR} strokeWidth={13} strokeLinecap="round" fill="none" />
        <path d={`M222 ${y} Q250 ${y - 8} 278 ${y}`} stroke={HAIR} strokeWidth={13} strokeLinecap="round" fill="none" />
      </>
    );
  };

  const mouth = () => {
    if (talking) {
      const h = 6 + 18 * mouthOpen;
      return <ellipse cx={200} cy={272} rx={18} ry={h / 2 + 3} fill="#7A2E2E" />;
    }
    if (face === "shock") return <ellipse cx={200} cy={276} rx={15} ry={20} fill="#7A2E2E" />;
    if (face === "grin")
      return (
        <g>
          <path d="M162 262 Q200 302 238 262 Z" fill="#7A2E2E" />
          <path d="M170 264 L230 264 L226 272 L174 272 Z" fill="#fff" />
        </g>
      );
    if (face === "happy") return <path d="M172 266 Q200 290 228 266" stroke="#7A2E2E" strokeWidth={7} strokeLinecap="round" fill="none" />;
    if (face === "squint") return <path d="M180 274 L222 268" stroke="#7A2E2E" strokeWidth={7} strokeLinecap="round" />;
    return <path d="M182 272 Q200 280 218 272" stroke="#7A2E2E" strokeWidth={7} strokeLinecap="round" fill="none" />;
  };

  return (
    <div style={{ width: size, height: size * 1.3, transform: `${boil} translateY(${bob}px)` }}>
      <svg viewBox="0 0 400 520" width={size} height={size * 1.3}>
        <defs>
          <pattern id={`check-${seed}`} width={34} height={34} patternUnits="userSpaceOnUse">
            <rect width={34} height={34} fill={SHIRT} />
            <path d="M0 17 H34 M17 0 V34" stroke={CHECK} strokeWidth={3} opacity={0.55} />
          </pattern>
        </defs>
        {/* tay phía sau (khi giơ lên) */}
        {pose === "up" && <Arm from={[110, 360]} to={lh} side={-1} />}
        {(pose === "up" || pose === "stop" || pose === "wave" || pose === "point") && <Arm from={[290, 360]} to={rh} side={1} />}
        {/* thân áo caro */}
        <path d="M88 345 Q200 318 312 345 L345 520 L55 520 Z" fill={`url(#check-${seed})`} />
        <path d="M168 330 L200 382 L232 330 Z" fill="#F7F1E3" />
        <rect x={176} y={292} width={48} height={46} rx={10} fill={SKIN_DARK} />
        {/* tai */}
        <circle cx={96} cy={205} r={22} fill={SKIN_DARK} />
        <circle cx={304} cy={205} r={22} fill={SKIN_DARK} />
        {/* bút bi sau tai */}
        <g transform="rotate(-28 312 150)">
          <rect x={302} y={110} width={14} height={78} rx={6} fill={PEN} />
          <rect x={302} y={110} width={14} height={16} rx={4} fill="#1E4FA8" />
        </g>
        {/* mặt */}
        <rect x={96} y={78} width={208} height={238} rx={98} fill={SKIN} />
        {/* tóc muối tiêu, trán hói nhẹ */}
        <path d="M94 196 Q86 74 200 60 Q314 74 306 196 L290 196 Q292 128 254 116 Q226 132 200 120 Q170 134 146 116 Q108 128 110 196 Z" fill={HAIR} />
        <path d="M150 84 Q200 70 252 86" stroke={HAIR_LIGHT} strokeWidth={8} strokeLinecap="round" fill="none" />
        {brows()}
        {/* kính */}
        <g stroke={F.ink} strokeWidth={7} fill="rgba(255,255,255,0.18)">
          <rect x={112} y={176} width={76} height={54} rx={14} />
          <rect x={212} y={176} width={76} height={54} rx={14} />
          <path d="M188 198 Q200 190 212 198" fill="none" />
          <path d="M112 192 L96 186 M288 192 L304 186" fill="none" />
        </g>
        {eyes()}
        <path d="M196 230 Q204 246 194 250" stroke={SKIN_DARK} strokeWidth={6} strokeLinecap="round" fill="none" />
        <circle cx={128} cy={252} r={15} fill="#F29A8A" opacity={0.65} />
        <circle cx={272} cy={252} r={15} fill="#F29A8A" opacity={0.65} />
        {mouth()}
        {/* tay phía trước */}
        {pose !== "up" && <Arm from={[110, 360]} to={lh} side={-1} />}
        {(pose === "down" || pose === "hold") && <Arm from={[290, 360]} to={rh} side={1} />}
        {pose === "hold" && holding}
      </svg>
    </div>
  );
};

/** Cuốn sổ bìa đỏ — dùng làm `holding` (toạ độ trong khung 400×520) */
export const LedgerInHands: React.FC = () => (
  <g transform="translate(118 376)">
    <rect x={0} y={0} width={164} height={118} rx={10} fill="#B83A2E" />
    <rect x={10} y={8} width={144} height={102} rx={6} fill="none" stroke="#E7B66B" strokeWidth={4} />
    <rect x={44} y={36} width={76} height={20} rx={4} fill="#E7B66B" />
    <rect x={150} y={0} width={14} height={118} rx={4} fill="#8F2A21" />
  </g>
);
