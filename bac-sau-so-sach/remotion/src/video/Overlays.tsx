import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { KetSo } from "../KetSo";
import { C, fmt, hand, paperBackground, sans } from "../theme";
import type { ResolvedOverlay } from "./cues";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0→1 khi vào, 1→0 khi ra */
function useWindow(start: number, end: number) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const enter = spring({ frame: frame - start * fps, fps, config: { damping: 20, stiffness: 130 } });
  const exit = interpolate(t, [end, end + 0.4], [1, 0], clamp);
  return { t, fps, frame, v: Math.min(enter, exit), visible: t >= start - 0.1 && t <= end + 0.5 };
}

function usePop(at: number) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - at * fps, fps, config: { damping: 14, stiffness: 160 } });
}

/** Dòng chưa tới lượt không chiếm chỗ; tới lượt thì mở rộng dần để khung lớn theo lời đọc */
const Grow: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const g = interpolate(frame, [at * fps - 2, at * fps + 9], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  if (g <= 0) return null;
  return <div style={{ maxHeight: g * 240, overflow: g < 1 ? "hidden" : "visible" }}>{children}</div>;
};

const Panel: React.FC<{ wide: boolean; v: number; children: React.ReactNode }> = ({ wide, v, children }) => (
  <div
    style={{
      position: "absolute",
      ...(wide ? { left: 260, right: 260, top: 110 } : { right: 70, width: 800, top: 90 }),
      ...paperBackground,
      backgroundPosition: "0 -20px",
      borderRadius: 18,
      padding: "34px 48px 30px",
      boxShadow: "0 18px 50px rgba(30,20,10,0.35)",
      borderLeft: `6px solid ${C.margin}`,
      opacity: v,
      transform: `translateX(${(1 - v) * (wide ? 0 : 80)}px) translateY(${(1 - v) * (wide ? 40 : 0)}px)`,
    }}
  >
    {children}
  </div>
);

const PanelTitle: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 40, color: C.margin, letterSpacing: 2, marginBottom: 14 }}>
    {text}
  </div>
);

// ---------------------------------------------------------------------------

const Headline: React.FC<{ r: ResolvedOverlay; side?: boolean }> = ({ r, side }) => {
  const o = r.overlay as Extract<typeof r.overlay, { type: "headline" }>;
  const { v, visible } = useWindow(r.start, r.end);
  if (!visible) return null;
  return (
    <div style={{ position: "absolute", left: side ? 1100 : 90, top: side ? 220 : 90, width: side ? 740 : undefined, opacity: v, transform: `scale(${0.9 + 0.1 * v})`, transformOrigin: "left top" }}>
      <div
        style={{
          fontFamily: sans,
          fontWeight: 800,
          fontSize: side ? 66 : 92,
          color: "#fff",
          textShadow: "0 6px 0 rgba(0,0,0,0.35), 0 0 30px rgba(0,0,0,0.5)",
          WebkitTextStroke: `3px ${C.ink}`,
        }}
      >
        {o.text}
      </div>
      {o.sub && (
        <div style={{ display: "inline-block", marginTop: 12, background: C.gold, color: C.ink, fontFamily: sans, fontWeight: 800, fontSize: side ? 44 : 52, padding: "6px 22px", borderRadius: 10 }}>
          {o.sub}
        </div>
      )}
    </div>
  );
};

const Chips: React.FC<{ r: ResolvedOverlay; wide: boolean; side?: boolean }> = ({ r, side }) => {
  const o = r.overlay as Extract<typeof r.overlay, { type: "chips" }>;
  const { v, visible } = useWindow(r.start, r.end);
  if (!visible) return null;
  return (
    <div style={{ position: "absolute", left: side ? 1100 : 80, top: side ? 220 : 80, maxWidth: side ? 740 : undefined, display: "flex", flexDirection: "column", gap: 16, opacity: v }}>
      {o.items.map((it, i) => (
        <Chip key={it.text} text={it.text} at={r.inner[i]} />
      ))}
    </div>
  );
};

const Chip: React.FC<{ text: string; at: number }> = ({ text, at }) => {
  const p = usePop(at);
  return (
    <div
      style={{
        alignSelf: "flex-start",
        fontFamily: sans,
        fontWeight: 800,
        fontSize: 48,
        color: C.ink,
        background: C.paper,
        border: `4px solid ${C.ink}`,
        borderRadius: 14,
        padding: "8px 26px",
        boxShadow: `6px 6px 0 ${C.margin}`,
        opacity: p,
        transform: `translateX(${(1 - p) * -60}px) rotate(${(1 - p) * -4}deg)`,
      }}
    >
      {text}
    </div>
  );
};

const Ledger: React.FC<{ r: ResolvedOverlay; wide: boolean }> = ({ r, wide }) => {
  const o = r.overlay as Extract<typeof r.overlay, { type: "ledger" }>;
  const { v, visible } = useWindow(r.start, r.end);
  if (!visible) return null;
  return (
    <Panel wide={wide} v={v}>
      <PanelTitle text={o.title} />
      {o.lines.map((l, i) => (
        <Grow key={i} at={r.inner[i]}>
          <LedgerLineView line={l} at={r.inner[i]} wide={wide} />
        </Grow>
      ))}
    </Panel>
  );
};

const LedgerLineView: React.FC<{ line: Extract<ResolvedOverlay["overlay"], { type: "ledger" }>["lines"][number]; at: number; wide: boolean }> = ({
  line,
  at,
  wide,
}) => {
  const p = usePop(at);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pen = interpolate(frame, [at * fps + 3, at * fps + 20], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const total = line.tone === "total";
  const color = line.tone === "minus" ? C.red : line.tone === "plus" ? C.green : line.tone === "note" ? C.inkSoft : C.ink;
  const size = wide ? 50 : 40;
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 24,
        padding: "10px 0 12px",
        borderTop: total ? `4px double ${C.ink}` : undefined,
        marginTop: total ? 8 : 0,
        opacity: p,
        transform: `translateX(${(1 - p) * -30}px)`,
      }}
    >
      <span style={{ fontFamily: hand, fontSize: line.tone === "note" ? size * 0.8 : size, color: line.tone === "note" ? C.inkSoft : C.ink }}>{line.label}</span>
      {line.value && (
        <span style={{ fontFamily: sans, fontWeight: 800, fontSize: total ? size * 1.15 : size, color, whiteSpace: "nowrap", transform: `scale(${0.6 + 0.4 * p})` }}>
          {line.value}
        </span>
      )}
      <div style={{ position: "absolute", left: 0, bottom: 2, height: 3, width: `${pen * 100}%`, background: C.rule }} />
    </div>
  );
};

const Rules: React.FC<{ r: ResolvedOverlay; wide: boolean }> = ({ r, wide }) => {
  const o = r.overlay as Extract<typeof r.overlay, { type: "rules" }>;
  const { v, visible } = useWindow(r.start, r.end);
  if (!visible) return null;
  return (
    <Panel wide={wide} v={v}>
      <PanelTitle text={o.title} />
      {o.items.map((it, i) => (
        <Grow key={i} at={r.inner[i]}>
          <RuleItem n={i + 1} text={it.text} at={r.inner[i]} next={r.inner[i + 1] ?? Infinity} />
        </Grow>
      ))}
    </Panel>
  );
};

const RuleItem: React.FC<{ n: number; text: string; at: number; next: number }> = ({ n, text, at, next }) => {
  const p = usePop(at);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = frame / fps >= at && frame / fps < next;
  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: "10px 0", opacity: p * (active ? 1 : 0.55), transform: `translateX(${(1 - p) * -30}px)` }}>
      <div
        style={{
          flex: "0 0 56px",
          height: 56,
          borderRadius: 28,
          background: active ? C.margin : C.inkSoft,
          color: "#fff",
          fontFamily: sans,
          fontWeight: 800,
          fontSize: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {n}
      </div>
      <div style={{ fontFamily: sans, fontWeight: active ? 800 : 700, fontSize: 34, color: C.ink, lineHeight: 1.3, paddingTop: 6 }}>{text}</div>
    </div>
  );
};

const Chart: React.FC<{ r: ResolvedOverlay; wide: boolean }> = ({ r }) => {
  const o = r.overlay as Extract<typeof r.overlay, { type: "chart" }>;
  const { v, visible, frame, fps } = useWindow(r.start, r.end);
  if (!visible) return null;

  const W = 1300, H = 600, PL = 110, PR = 40, PT = 60, PB = 70;
  const X0 = 50, X1 = 150, Y0 = -30, Y1 = 30;
  // Lời/lỗ mỗi tháng (triệu). Thuế 2026: miễn nếu doanh thu năm ≤ ngưỡng; vượt thì GTGT trên toàn bộ + TNCN trên phần vượt.
  const profit = (cups: number, wage = 0) => {
    const rev = (cups * o.days * o.price) / 1000;
    const revYear = rev * 12;
    const tax = revYear <= o.taxFreeRevenue ? 0 : (revYear * o.vatRate + (revYear - o.taxFreeRevenue) * o.pitRate) / 12;
    return (cups * o.days * o.marginPerCup) / 1000 - tax - o.fixedCost - wage;
  };
  const sx = (x: number) => PL + ((x - X0) / (X1 - X0)) * (W - PL - PR);
  const sy = (y: number) => PT + ((Y1 - y) / (Y1 - Y0)) * (H - PT - PB);
  const draw = interpolate(frame, [r.start * fps + 10, r.start * fps + 55], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const xDraw = X0 + (X1 - X0) * draw;
  // vẽ bằng nhiều điểm vì có bậc thang thuế tại ngưỡng doanh thu
  const line = (wage: number) => {
    let d = `M ${sx(X0)} ${sy(profit(X0, wage))}`;
    for (let x = X0 + 0.5; x <= xDraw; x += 0.5) d += ` L ${sx(x)} ${sy(profit(x, wage))}`;
    return d;
  };
  const be = (wage: number) => {
    let x = X0;
    while (x < X1 && profit(x, wage) < 0) x += 0.05;
    return x;
  };

  return (
    <Panel wide v={v}>
      <PanelTitle text={o.title} />
      <svg width={W} height={H} style={{ display: "block", marginLeft: -40 }}>
        {[-30, -20, -10, 0, 10, 20, 30].map((y) => (
          <g key={y}>
            <line x1={PL} x2={W - PR} y1={sy(y)} y2={sy(y)} stroke={y === 0 ? C.ink : C.rule} strokeWidth={y === 0 ? 3 : 1.5} />
            <text x={PL - 16} y={sy(y) + 9} textAnchor="end" fontFamily={sans} fontSize={24} fill={C.inkSoft}>
              {y > 0 ? `+${y}` : y}
            </text>
          </g>
        ))}
        {[50, 70, 100, 125, 150].map((x) => (
          <text key={x} x={sx(x)} y={H - 30} textAnchor="middle" fontFamily={sans} fontSize={24} fill={C.inkSoft}>
            {x} ly
          </text>
        ))}
        <text x={PL} y={PT - 34} textAnchor="start" fontFamily={sans} fontSize={22} fill={C.inkSoft}>Lời/lỗ mỗi tháng (triệu đồng)</text>
        <rect x={PL} y={sy(0)} width={W - PL - PR} height={sy(Y0) - sy(0)} fill={C.red} opacity={0.06} />
        <path d={line(o.ownerWage)} stroke={C.gold} strokeWidth={5} strokeDasharray="14 10" fill="none" />
        <path d={line(0)} stroke={C.green} strokeWidth={7} fill="none" strokeLinecap="round" />
        <text x={sx(128)} y={sy(profit(128)) - 22} textAnchor="end" fontFamily={sans} fontWeight={700} fontSize={24} fill={C.green} opacity={draw}>
          lời/lỗ của quán
        </text>
        <text x={sx(X1) - 10} y={sy(profit(X1, o.ownerWage)) + 38} textAnchor="end" fontFamily={sans} fontWeight={700} fontSize={24} fill="#A97A1E" opacity={draw}>
          nếu trả lương cho chủ quán
        </text>
        {o.markers.map((m, i) => {
          const p = spring({ frame: frame - r.inner[i] * fps, fps, config: { damping: 12 } });
          const isBE = Math.abs(m.cups - be(0)) < 1.5;
          const isBEW = Math.abs(m.cups - be(o.ownerWage)) < 1.5;
          const y = isBEW ? 0 : profit(m.cups);
          const val = isBE || isBEW ? "hòa vốn" : `${y > 0 ? "+" : ""}${fmt(y)} tr`;
          const col = isBEW ? "#A97A1E" : y >= 0 ? C.green : C.red;
          // điểm hòa vốn nằm sát trục 0 -> đặt nhãn phía dưới để không đè nhãn điểm có lời bên cạnh
          const above = y > 0.5 && !isBE && !isBEW;
          const shift = Math.min(0, W - 8 - (sx(m.cups) + 90)); // giữ nhãn trong khung bên phải
          return (
            <g key={i} opacity={p} transform={`translate(${sx(m.cups)} ${sy(y)}) scale(${p})`}>
              <circle r={14} fill={col} stroke="#fff" strokeWidth={4} />
              <rect x={-90 + shift} y={above ? -84 : 24} width={180} height={58} rx={10} fill="#fff" stroke={col} strokeWidth={3} />
              <text x={shift} y={above ? -60 : 48} textAnchor="middle" fontFamily={sans} fontWeight={800} fontSize={22} fill={C.ink}>
                {m.cups} ly/ngày
              </text>
              <text x={shift} y={above ? -34 : 74} textAnchor="middle" fontFamily={sans} fontWeight={800} fontSize={22} fill={col}>
                {val}
              </text>
            </g>
          );
        })}
      </svg>
    </Panel>
  );
};

const Quote: React.FC<{ r: ResolvedOverlay }> = ({ r }) => {
  const o = r.overlay as Extract<typeof r.overlay, { type: "quote" }>;
  const { v, visible, frame, fps } = useWindow(r.start, r.end);
  const sub = r.extra[0];
  const sp = sub !== undefined ? spring({ frame: frame - sub * fps, fps, config: { damping: 12 } }) : 0;
  const subVisible = sub !== undefined && frame / fps >= sub && frame / fps < sub + 9;
  return (
    <>
      {visible && (
        <div style={{ position: "absolute", left: 0, right: 0, top: o.quoteTop ?? 120, textAlign: "center", opacity: v }}>
          <span style={{ background: "rgba(244,235,217,0.94)", padding: "18px 44px", borderRadius: 16, fontFamily: hand, fontSize: o.quoteFontSize ?? 70, color: C.ink, boxShadow: "0 12px 40px rgba(0,0,0,0.3)", ...(o.quoteWidth ? {display:"inline-block",width:o.quoteWidth,maxWidth:"calc(100% - 120px)",boxSizing:"border-box",whiteSpace:"pre-line",lineHeight:1.15} : {}) }}>
            “{o.text}”
          </span>
        </div>
      )}
      {subVisible && (
        <div style={{ position: "absolute", right: 90, top: o.subscribeTop ?? 90, transform: `scale(${sp})`, transformOrigin: "right top" }}>
          <div style={{ background: "#CC0000", color: "#fff", fontFamily: sans, fontWeight: 800, fontSize: 46, padding: "16px 40px", borderRadius: 14, boxShadow: "0 10px 30px rgba(0,0,0,0.35)" }}>
            ĐĂNG KÝ KÊNH
          </div>
        </div>
      )}
    </>
  );
};

const KetSoOverlay: React.FC<{ r: ResolvedOverlay }> = ({ r }) => {
  const o = r.overlay as Extract<typeof r.overlay, { type: "ketso" }>;
  const { v, visible, fps } = useWindow(r.start, r.end);
  if (!visible) return null;
  // KetSo đếm frame từ 0 = lúc overlay bắt đầu
  const timing = { rows: r.inner.map((t) => Math.round((t - r.start) * fps) + 15), result: Math.round((r.extra[0] - r.start) * fps) };
  return (
    <AbsoluteFill style={{ opacity: v }}>
      <ShiftFrame by={Math.round(r.start * fps)}>
        <KetSo {...o.props} timing={timing} />
      </ShiftFrame>
    </AbsoluteFill>
  );
};

const ShiftFrame: React.FC<{ by: number; children: React.ReactNode }> = ({ by, children }) => (
  <Sequence from={by} layout="none">
    {children}
  </Sequence>
);

const Salary: React.FC<{ r: ResolvedOverlay; wide: boolean }> = ({ r, wide }) => {
  const o = r.overlay as Extract<typeof r.overlay, { type: "salary" }>;
  const { t, v, visible } = useWindow(r.start, r.end);
  const active = o.payments.map((p, i) => p.amount * interpolate(t, [r.inner[i], r.inner[i] + 0.5], [0, 1], clamp));
  const used = active.reduce((sum, value) => sum + value, 0);
  const colors = [C.red, C.gold, C.inkSoft];
  if (!visible) return null;
  return <Panel wide={wide} v={v}>
    <PanelTitle text={o.title} />
    <div style={{ fontFamily: sans, fontSize: 32, color: C.inkSoft, marginBottom: 20 }}>Mỗi tháng nhận {fmt(o.salary, 0)} triệu</div>
    <div style={{ display: "flex", height: 46, borderRadius: 10, overflow: "hidden", background: C.green, marginBottom: 22 }}>
      {active.map((amount, i) => <div key={i} style={{ width: `${amount / o.salary * 100}%`, background: colors[i % colors.length], borderRight: amount ? `3px solid ${C.paper}` : undefined }} />)}
    </div>
    {o.payments.map((p, i) => <Grow key={p.label} at={r.inner[i]}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0", fontFamily: sans, fontSize: 32, color: C.ink }}><span>{p.label}</span><b style={{ color: colors[i % colors.length] }}>{fmt(p.amount, 2)} triệu</b></div></Grow>)}
    <div style={{ borderTop: `3px solid ${C.rule}`, marginTop: 16, paddingTop: 16, display: "flex", justifyContent: "space-between", fontFamily: sans, fontSize: 34, color: C.red, fontWeight: 800 }}><span>Tổng góp</span><span>{fmt(used, 2)} tr · {fmt(used / o.salary * 100, 0)}%</span></div>
    <div style={{ marginTop: 16, fontFamily: sans, fontSize: 36, fontWeight: 800, color: C.green }}>Còn {fmt(o.salary - used, 2)} triệu để sống</div>
  </Panel>;
};

const Comparison: React.FC<{ r: ResolvedOverlay }> = ({ r }) => {
  const o = r.overlay as Extract<typeof r.overlay, { type: "comparison" }>;
  const { v, visible } = useWindow(r.start, r.end);
  const p = usePop(r.extra[0]);
  if (!visible) return null;
  return <AbsoluteFill style={{ ...paperBackground, opacity: v, padding: "60px 90px", color: C.ink, fontFamily: sans }}>
    <div style={{ fontWeight: 800, fontSize: 56, color: C.margin }}>{o.title}</div>
    <div style={{ marginTop: 12, marginBottom: 36, fontSize: 30, color: C.inkSoft }}>{o.subtitle ?? "Cùng một chiếc máy · Đơn vị: triệu đồng"}</div>
    <div style={{ display: "grid", gridTemplateColumns: "1.9fr 1fr 1fr", padding: "18px 28px", background: C.ink, color: C.paper, fontSize: 30, fontWeight: 800 }}><span>{o.columns?.[0] ?? "Cách mua"}</span><span style={{ textAlign: "right" }}>{o.columns?.[1] ?? "Tổng phải trả"}</span><span style={{ textAlign: "right" }}>{o.columns?.[2] ?? "Chênh so mốc"}</span></div>
    {o.rows.map((row, i) => <Grow key={row.label} at={r.inner[i]}><div style={{ display: "grid", gridTemplateColumns: "1.9fr 1fr 1fr", alignItems: "center", minHeight: 112, padding: "18px 28px", borderBottom: `2px solid ${C.rule}`, background: i === 0 ? "rgba(47,122,75,0.08)" : undefined, fontSize: 36 }}><span style={{ fontWeight: 700 }}>{row.label}</span><b style={{ textAlign: "right", color: i === 0 ? C.green : C.ink }}>{row.totalText ?? fmt(row.total, 2)}</b><b style={{ textAlign: "right", color: i === 0 ? C.green : C.red }}>{row.extraText ?? (i === 0 ? "Mốc so sánh" : `+${fmt(row.extra, 2)}`)}</b></div></Grow>)}
    <div style={{ position: "absolute", left: 118, bottom: 142, width: 1040, fontSize: 26, lineHeight: 1.55, color: C.inkSoft }}>{o.notes.map(note => <div key={note}>{note}</div>)}</div>
    <div style={{ position: "absolute", right: 110, bottom: 170, border: `7px double ${C.red}`, padding: "12px 22px", color: C.red, fontSize: 55, fontWeight: 800, opacity: Math.min(1, p), transform: `rotate(-6deg) scale(${0.8 + 0.2 * p})` }}>{o.stamp}</div>
  </AbsoluteFill>;
};

export const isFullscreen = (r: ResolvedOverlay) => ["ketso", "comparison"].includes(r.overlay.type);

export const OverlayView: React.FC<{ r: ResolvedOverlay; wide: boolean; side?: boolean }> = ({ r, wide, side }) => {
  switch (r.overlay.type) {
    case "headline":
      return <Headline r={r} side={side} />;
    case "chips":
      return <Chips r={r} wide={wide} side={side} />;
    case "ledger":
      return <Ledger r={r} wide={wide} />;
    case "salary":
      return <Salary r={r} wide={wide} />;
    case "comparison":
      return <Comparison r={r} />;
    case "rules":
      return <Rules r={r} wide={wide} />;
    case "chart":
      return <Chart r={r} wide={wide} />;
    case "quote":
      return <Quote r={r} />;
    case "ketso":
      return <KetSoOverlay r={r} />;
  }
};
