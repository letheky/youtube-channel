import React from "react";
import { interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { sans } from "../theme";
import { F, H, useBoil, usePopAt } from "./flat";

/** Bọc đạo cụ: bật ra (scale + xoay) tại `at`, rung nhẹ, tuỳ chọn biến mất tại `out` */
export const PropPop: React.FC<{ at: number; out?: number; x: number; y: number; size: number; seed: string; children: React.ReactNode; float?: boolean }> = ({
  at,
  out,
  x,
  y,
  size,
  seed,
  children,
  float = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = usePopAt(at, { damping: 9, stiffness: 160, mass: 0.8 });
  const boil = useBoil(seed, 2);
  const t = frame / fps;
  const gone = out !== undefined ? interpolate(t, [out, out + 0.25], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  if (p <= 0.001 || gone <= 0) return null;
  const fy = float ? Math.sin(t * 2.6 + x) * 8 : 0;
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2 + fy + (1 - gone) * 120,
        width: size,
        height: size,
        transform: `${boil} scale(${p * gone}) rotate(${(1 - p) * 25}deg)`,
        opacity: gone,
      }}
    >
      <svg viewBox="0 0 200 200" width={size} height={size}>
        {children}
      </svg>
    </div>
  );
};

export const CupArt: React.FC = () => (
  <g>
    <path d="M128 8 L112 60" stroke="#E0354B" strokeWidth={9} strokeLinecap="round" />
    <path d="M48 52 H152 L140 190 H60 Z" fill="#D9A77A" />
    <path d="M48 52 H152 L150 72 H50 Z" fill="#F4ECE0" />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <circle key={i} cx={72 + (i % 4) * 18 + (i > 3 ? 9 : 0)} cy={i > 3 ? 158 : 174} r={8} fill="#2B2622" />
    ))}
  </g>
);

export const CoinArt: React.FC<{ spin?: number }> = ({ spin = 1 }) => (
  <g transform={`translate(100 100) scale(${spin} 1) translate(-100 -100)`}>
    <circle cx={100} cy={100} r={80} fill="#E7A92A" />
    <circle cx={100} cy={100} r={64} fill={F.gold} />
    <text x={100} y={128} textAnchor="middle" fontFamily={sans} fontWeight={800} fontSize={80} fill="#C98A14">
      đ
    </text>
  </g>
);

export const WalletArt: React.FC = () => (
  <g>
    <rect x={20} y={60} width={160} height={120} rx={18} fill="#9A6A42" />
    <rect x={20} y={60} width={160} height={46} rx={18} fill="#B07C51" />
    <circle cx={150} cy={130} r={13} fill={F.gold} />
  </g>
);

export const PhoneArt: React.FC = () => (
  <g>
    <rect x={52} y={10} width={96} height={180} rx={18} fill="#2B2622" />
    <rect x={60} y={24} width={80} height={150} rx={8} fill="#F4ECE0" />
    <rect x={70} y={40} width={60} height={30} rx={6} fill={F.green} />
    <rect x={70} y={80} width={60} height={12} rx={4} fill="#E0354B" />
    <rect x={70} y={100} width={44} height={12} rx={4} fill="#C9BFAE" />
    <rect x={70} y={120} width={52} height={12} rx={4} fill="#C9BFAE" />
    <text x={100} y={162} textAnchor="middle" fontFamily={sans} fontWeight={800} fontSize={24} fill="#E0354B">
      −25%
    </text>
  </g>
);

export const ShopArt: React.FC = () => (
  <g>
    <rect x={24} y={80} width={152} height={110} fill="#F4ECE0" />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <path key={i} d={`M${24 + i * 25.3} 60 h25.3 v26 a12.6 12.6 0 0 1 -25.3 0 Z`} fill={i % 2 ? "#F4ECE0" : "#E0354B"} />
    ))}
    <rect x={18} y={48} width={164} height={14} rx={4} fill="#8E5E3B" />
    <rect x={44} y={112} width={50} height={78} fill="#96CDBE" />
    <rect x={110} y={112} width={48} height={40} fill="#A9B7EE" />
  </g>
);

export const StaffArt: React.FC = () => (
  <g>
    {[60, 140].map((x, i) => (
      <g key={x}>
        <rect x={x - 34} y={110} width={68} height={86} rx={20} fill={i ? "#E0354B" : "#2F8A57"} />
        <circle cx={x} cy={78} r={34} fill="#F2C9A0" />
        <path d={`M${x - 34} 74 Q${x} 30 ${x + 34} 74`} fill="#2B2622" />
        <rect x={x - 22} y={130} width={44} height={40} rx={6} fill="#F4ECE0" />
      </g>
    ))}
  </g>
);

export const BulbArt: React.FC = () => (
  <g>
    <circle cx={100} cy={82} r={60} fill={F.gold} />
    <rect x={76} y={132} width={48} height={40} rx={6} fill="#8E8E8E" />
    <path d="M100 52 L84 92 H104 L92 124" stroke="#E0354B" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {[-1, 1].map((s) => (
      <path key={s} d={`M${100 + s * 78} 40 l${s * 16} -14 M${100 + s * 84} 86 h${s * 20}`} stroke="#E0354B" strokeWidth={7} strokeLinecap="round" />
    ))}
  </g>
);

export const RollerArt: React.FC = () => (
  <g>
    <rect x={30} y={30} width={130} height={52} rx={18} fill="#F4A7AD" />
    <path d="M160 56 H182 V110 H100 V140" stroke="#8E8E8E" strokeWidth={10} fill="none" strokeLinejoin="round" />
    <rect x={88} y={138} width={24} height={56} rx={8} fill="#2B2622" />
    <rect x={10} y={150} width={60} height={40} rx={6} fill="#B07C51" />
  </g>
);

export const CashArt: React.FC = () => (
  <g>
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${i * 6} ${-i * 14}) rotate(${-6 + i * 5} 100 120)`}>
        <rect x={20} y={90} width={160} height={84} rx={10} fill="#7CC59A" />
        <rect x={30} y={100} width={140} height={64} rx={6} fill="none" stroke="#2F8A57" strokeWidth={4} />
        <circle cx={100} cy={132} r={20} fill="#2F8A57" />
      </g>
    ))}
  </g>
);

/** Mưa xu: `count` đồng xu rơi từ trên xuống, xoay lật, bắt đầu từ `at` (giây) */
export const CoinRain: React.FC<{ at: number; count?: number; dur?: number; seed?: string }> = ({ at, count = 26, dur = 2.6, seed = "rain" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - at;
  if (t < 0 || t > dur + 1.2) return null;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const delay = random(`${seed}-d-${i}`) * dur * 0.6;
        const tt = t - delay;
        if (tt < 0) return null;
        const x = random(`${seed}-x-${i}`) * 1000 + 40;
        const speed = 900 + random(`${seed}-s-${i}`) * 700;
        const y = -120 + tt * speed + 0.5 * 900 * tt * tt * 0.4;
        if (y > H) return null;
        const size = 60 + random(`${seed}-z-${i}`) * 50;
        return (
          <svg key={i} viewBox="0 0 200 200" width={size} height={size} style={{ position: "absolute", left: x, top: y, transform: `rotate(${tt * 300 * (i % 2 ? 1 : -1)}deg)` }}>
            <CoinArt spin={Math.cos(tt * 9 + i)} />
          </svg>
        );
      })}
    </>
  );
};

/** Lấp lánh quanh một điểm */
export const Sparkles: React.FC<{ at: number; x: number; y: number; r?: number }> = ({ at, x, y, r = 260 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - at;
  if (t < 0 || t > 2.5) return null;
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const k = interpolate(t, [0, 0.4, 2.5], [0, 1, 1.15]);
        const s = Math.max(0, Math.sin(t * 6 + i)) * (1 - t / 2.5);
        return (
          <svg key={i} width={60} height={60} viewBox="0 0 60 60" style={{ position: "absolute", left: x + Math.cos(a) * r * k - 30, top: y + Math.sin(a) * r * k - 30, transform: `scale(${s})` }}>
            <path d="M30 0 L36 24 L60 30 L36 36 L30 60 L24 36 L0 30 L24 24 Z" fill="#fff" />
          </svg>
        );
      })}
    </>
  );
};
