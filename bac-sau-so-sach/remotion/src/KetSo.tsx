import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, fmt, hand, sans } from "./theme";

export type LedgerRow = {
  label: string;
  value: number;
  kind: "income" | "expense" | "subtotal";
};

export type KetSoProps = {
  title: string;
  subtitle: string;
  unit: string;
  rows: LedgerRow[];
  result: { label: string; value: number; prefix?: string };
  quote: string;
  /** Mốc frame (tính từ đầu cảnh) cho từng dòng và con dấu — để khớp lời đọc. Bỏ trống = nhịp đều. */
  timing?: { rows: number[]; result: number };
};

// Nhịp cảnh (frame @30fps)
const INTRO = 30;
const STEP = 42;
const COUNT = 18;
const HOLD = 150;

type Timing = { row: (i: number) => number; result: number };
const makeTiming = (p: KetSoProps): Timing =>
  p.timing
    ? { row: (i) => p.timing!.rows[i], result: p.timing.result }
    : { row: (i) => INTRO + i * STEP, result: INTRO + p.rows.length * STEP + 20 };
export const ketSoDuration = (p: KetSoProps) => makeTiming(p).result + HOLD;
const SEGMENT_COLORS = ["#B83A2E", "#D2693C", "#C98F3E", "#8C5A3C", "#A7766A", "#6B4E3D", "#9C4F4F"];


const countUp = (frame: number, start: number, value: number) =>
  value *
  interpolate(frame, [start, start + COUNT], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

const Row: React.FC<{ row: LedgerRow; start: number; unit: string }> = ({ row, start, unit }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - start, fps, config: { damping: 18, stiffness: 140 } });
  const pen = interpolate(frame, [start + 4, start + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  const isSub = row.kind === "subtotal";
  const color = row.kind === "income" ? C.green : row.kind === "expense" ? C.red : C.ink;
  const sign = row.kind === "expense" ? "−" : "";

  return (
    <div
      style={{
        position: "relative",
        height: 74,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: enter,
        transform: `translateX(${(1 - enter) * -40}px)`,
        borderTop: isSub ? `4px double ${C.ink}` : undefined,
        marginTop: isSub ? 10 : 0,
      }}
    >
      <span style={{ fontFamily: hand, fontSize: isSub ? 50 : 46, color: C.ink, fontWeight: isSub ? 700 : 400 }}>
        {row.label}
      </span>
      <span
        style={{
          fontFamily: sans,
          fontWeight: isSub ? 800 : 700,
          fontSize: isSub ? 52 : 46,
          color,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {sign}
        {fmt(countUp(frame, start, row.value))}
        <span style={{ fontSize: 26, fontWeight: 500, color: C.inkSoft, marginLeft: 10 }}>{unit}</span>
      </span>
      {/* nét bút gạch chân */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 8,
          height: 3,
          width: `${pen * 100}%`,
          background: C.rule,
          borderRadius: 2,
        }}
      />
    </div>
  );
};

const MoneyBar: React.FC<{ rows: LedgerRow[]; unit: string; finalValue: number; tm: Timing }> = ({
  rows,
  unit,
  finalValue,
  tm,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const H = 620;
  const W = 190;
  const income = rows.find((r) => r.kind === "income")?.value ?? 1;
  const scale = H / income;

  const barIn = spring({ frame: frame - tm.row(0), fps, config: { damping: 20 } });

  let top = 0;
  let colorIdx = 0;
  const segments = rows.flatMap((r, i) => {
    if (r.kind !== "expense") return [];
    const grow = spring({ frame: frame - tm.row(i), fps, config: { damping: 16, stiffness: 120 } });
    const h = r.value * scale * grow;
    const seg = { y: top, h, full: r.value * scale, label: r.label, value: r.value, color: SEGMENT_COLORS[colorIdx++ % SEGMENT_COLORS.length], grow };
    top += h;
    return [seg];
  });
  const remaining = Math.max(0, H * barIn - top);
  const remainingValue = remaining / scale;

  const endFrame = tm.result;
  const highlight = spring({ frame: frame - endFrame, fps, config: { damping: 12 } });

  return (
    <div style={{ position: "absolute", left: 1290, top: 230, width: 600, height: H + 60 }}>
      <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 30, color: C.inkSoft, marginBottom: 14 }}>
        Tiền đi đâu?
      </div>
      <div style={{ position: "relative", width: W, height: H }}>
        {/* khung toàn bộ doanh thu */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: `3px dashed ${C.rule}`,
            borderRadius: 14,
            opacity: barIn,
          }}
        />
        {segments.map((s) => (
          <React.Fragment key={s.label}>
            <div
              style={{
                position: "absolute",
                top: s.y,
                left: 0,
                width: W,
                height: s.h,
                background: s.color,
                borderBottom: `2px solid ${C.paper}`,
              }}
            />
            {s.full >= 40 && (
              <div
                style={{
                  position: "absolute",
                  top: s.y + s.h / 2 - 18,
                  left: W + 22,
                  whiteSpace: "nowrap",
                  fontFamily: sans,
                  fontSize: 24,
                  fontWeight: 500,
                  color: C.ink,
                  opacity: s.grow,
                }}
              >
                <span style={{ color: s.color, fontWeight: 800 }}>{fmt(s.value)}</span> {s.label}
              </div>
            )}
          </React.Fragment>
        ))}
        {/* phần còn lại của chủ quán */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: W,
            height: remaining,
            background: C.green,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            boxShadow: highlight > 0.01 ? `0 0 ${30 * highlight}px ${C.gold}` : undefined,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: H + 14,
            left: 0,
            whiteSpace: "nowrap",
            fontFamily: sans,
            fontSize: 30,
            fontWeight: 800,
            color: C.green,
            opacity: barIn,
          }}
        >
          {fmt(frame >= endFrame ? finalValue : remainingValue)} {unit} còn lại
          <span style={{ display: "block", fontSize: 22, fontWeight: 500, color: C.inkSoft }}>cho chủ quán</span>
        </div>
      </div>
    </div>
  );
};

const Stamp: React.FC<{ result: KetSoProps["result"]; unit: string; start: number }> = ({ result, unit, start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - start, fps, config: { damping: 11, stiffness: 180, mass: 0.8 } });
  const scale = interpolate(s, [0, 1], [2.6, 1]);
  const ring = interpolate(frame, [start + 8, start + 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const circumference = 2 * Math.PI * 120;

  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        top: 860,
        width: 1060,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: interpolate(s, [0, 0.15], [0, 1], { extrapolateRight: "clamp" }),
      }}
    >
      <span style={{ fontFamily: sans, fontWeight: 800, fontSize: 64, color: C.ink, letterSpacing: 2 }}>
        {result.label}
      </span>
      <div style={{ position: "relative", transform: `scale(${scale}) rotate(-6deg)` }}>
        <svg width={420} height={170} viewBox="0 0 420 170" style={{ position: "absolute", left: -30, top: -30 }}>
          <ellipse
            cx={210}
            cy={85}
            rx={200}
            ry={78}
            fill="none"
            stroke={C.red}
            strokeWidth={7}
            strokeLinecap="round"
            pathLength={circumference}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - ring)}
          />
        </svg>
        <span
          style={{
            fontFamily: sans,
            fontWeight: 800,
            fontSize: 92,
            color: C.red,
            fontVariantNumeric: "tabular-nums",
            whiteSpace: "nowrap",
          }}
        >
          {result.prefix ?? ""}
          {fmt(result.value)}
          <span style={{ fontSize: 40, marginLeft: 12 }}>{unit}</span>
        </span>
      </div>
    </div>
  );
};

export const KetSo: React.FC<KetSoProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tm = makeTiming(props);
  const rStart = tm.result;

  // rung máy nhẹ khi con dấu đập xuống
  const shakeT = frame - (rStart + 4);
  const shake = shakeT >= 0 && shakeT < 12 ? Math.sin(shakeT * 2.4) * (12 - shakeT) * 0.9 : 0;

  const header = spring({ frame, fps, config: { damping: 20 } });
  const quote = interpolate(frame, [rStart + 45, rStart + 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.paper,
        backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 73px, ${C.rule} 73px, ${C.rule} 74px)`,
        backgroundPosition: "0 -12px", // khớp đường kẻ giấy với nét gạch chân từng dòng
        transform: `translate(${shake}px, ${shake * 0.6}px)`,
      }}
    >
      {/* lề đỏ của sổ */}
      <div style={{ position: "absolute", left: 80, top: 0, bottom: 0, width: 3, background: C.margin, opacity: 0.6 }} />

      <div style={{ position: "absolute", left: 120, top: 60, opacity: header, transform: `translateY(${(1 - header) * -30}px)` }}>
        <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 72, color: C.margin, letterSpacing: 4 }}>
          {props.title}
        </div>
        <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 32, color: C.inkSoft, marginTop: 4 }}>
          {props.subtitle}
        </div>
      </div>

      <div style={{ position: "absolute", left: 120, top: 220, width: 1060 }}>
        {props.rows.map((row, i) => (
          <Row key={row.label} row={row} start={tm.row(i)} unit={props.unit} />
        ))}
      </div>

      <MoneyBar rows={props.rows} unit={props.unit} finalValue={props.result.value} tm={tm} />
      <Stamp result={props.result} unit={props.unit} start={rStart} />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 30,
          textAlign: "center",
          fontFamily: hand,
          fontSize: 44,
          color: C.ink,
          opacity: quote,
        }}
      >
        “{props.quote}”
      </div>
    </AbsoluteFill>
  );
};
