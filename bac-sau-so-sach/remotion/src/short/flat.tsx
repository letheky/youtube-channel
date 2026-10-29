import React from "react";
import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { sans } from "../theme";

// Bảng màu "giấy cắt" cho Short (giống video mẫu: nền pastel, thẻ trắng ngà, chữ đỏ)
export const F = {
  yellow: "#FFCB47",
  pink: "#F4A7AD",
  mint: "#96CDBE",
  lavender: "#A9B7EE",
  peach: "#F7B983",
  cream: "#F4EBD9",
  card: "#FBF7EE",
  shadow: "rgba(60,40,20,0.22)",
  ink: "#2B2622",
  red: "#E0354B",
  green: "#2F8A57",
  ground: "#A8724A",
  groundDark: "#8E5E3B",
  purple: "#563F86",
  gold: "#F6C343",
};

export const W = 1080;
export const H = 1920;
export const GROUND_Y = 1390;

/** Rung kiểu stop-motion: đổi vị trí mỗi 4 frame */
export function useBoil(seed: string, amp = 2.2) {
  const frame = useCurrentFrame();
  const step = Math.floor(frame / 4);
  const x = (random(`${seed}-x-${step}`) - 0.5) * 2 * amp;
  const y = (random(`${seed}-y-${step}`) - 0.5) * 2 * amp;
  const r = (random(`${seed}-r-${step}`) - 0.5) * 1.2;
  return `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${r.toFixed(2)}deg)`;
}

/** 0→1 spring bật ra từ thời điểm `at` (giây) */
export function usePopAt(at: number, cfg = { damping: 11, stiffness: 170, mass: 0.7 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - Math.round(at * fps), fps, config: cfg });
}

export function useT() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
}

export const Card: React.FC<{
  at: number;
  seed: string;
  top: number;
  children: React.ReactNode;
  width?: number;
  fontSize?: number;
  pad?: string;
  bg?: string;
}> = ({ at, seed, top, children, width = 900, fontSize = 74, pad = "34px 40px", bg = F.card }) => {
  const p = usePopAt(at);
  const boil = useBoil(seed, 1.6);
  if (p <= 0.001) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: (W - width) / 2,
        top,
        width,
        transform: `${boil} scale(${interpolate(p, [0, 1], [0.4, 1])})`,
        opacity: Math.min(1, p * 2),
        transformOrigin: "50% 50%",
      }}
    >
      <div
        style={{
          background: bg,
          borderRadius: 26,
          padding: pad,
          boxShadow: `10px 12px 0 ${F.shadow}`,
          fontFamily: sans,
          fontWeight: 800,
          fontSize,
          lineHeight: 1.18,
          color: F.ink,
          textAlign: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const Chip: React.FC<{
  at: number;
  seed: string;
  top: number;
  text: string;
  color?: string;
  fontSize?: number;
  bg?: string;
  out?: number;
}> = ({ at, seed, top, text, color = F.ink, fontSize = 54, bg = F.card, out }) => {
  const p = usePopAt(at, { damping: 9, stiffness: 200, mass: 0.6 });
  const t = useT();
  const boil = useBoil(seed, 1.4);
  const gone = out !== undefined ? interpolate(t, [out, out + 0.2], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  if (p <= 0.001 || gone <= 0) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top, display: "flex", justifyContent: "center", opacity: gone }}>
      <div
        style={{
          transform: `${boil} scale(${interpolate(p, [0, 1], [0.2, 1])}) rotate(${(1 - p) * -8}deg)`,
          background: bg,
          borderRadius: 999,
          padding: "14px 40px",
          boxShadow: `7px 8px 0 ${F.shadow}`,
          fontFamily: sans,
          fontWeight: 800,
          fontSize,
          color,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    </div>
  );
};

/** Đất nâu lượn sóng + nền tím phía dưới (chỗ đặt phụ đề) */
export const Ground: React.FC = () => {
  const frame = useCurrentFrame();
  const step = Math.floor(frame / 4);
  const wave = (y: number, amp: number, k: number) => {
    let d = `M0 ${y}`;
    for (let x = 0; x <= W; x += 60) {
      const j = (random(`g-${k}-${x}-${step}`) - 0.5) * 6;
      d += ` L${x} ${y + Math.sin(x / 90 + k) * amp + j}`;
    }
    return d + ` L${W} ${H} L0 ${H} Z`;
  };
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      <path d={wave(GROUND_Y + 8, 10, 1)} fill={F.groundDark} />
      <path d={wave(GROUND_Y, 9, 2)} fill={F.ground} />
      <path d={wave(GROUND_Y + 92, 12, 3)} fill={F.purple} />
    </svg>
  );
};
