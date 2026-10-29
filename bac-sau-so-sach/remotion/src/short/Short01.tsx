import React, { useMemo } from "react";
import { AbsoluteFill, Audio, Easing, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { fmt, sans } from "../theme";
import { BacSauFlat, LedgerInHands, type Face, type Pose } from "./BacSauFlat";
import { Card, Chip, F, Ground, GROUND_Y, H, usePopAt, useT, W } from "./flat";
import { BulbArt, CashArt, CoinArt, CoinRain, CupArt, PhoneArt, PropPop, RollerArt, ShopArt, Sparkles, StaffArt, WalletArt } from "./Props";

export type ShortWord = { word: string; start: number; end: number };
export type ShortData = { duration: number; words: ShortWord[] };
export type Short01Props = { data: ShortData | null; audio: string };

// ---------------------------------------------------------------- cue theo lời đọc
const norm = (s: string) => s.toLocaleLowerCase("vi").replace(/[^\p{L}\p{N}]+/gu, "");
export function cueAt(words: ShortWord[], text: string, after = 0): number {
  const toks = text.split(/\s+/).map(norm).filter(Boolean);
  const ws = words.map((w) => norm(w.word));
  for (let i = 0; i + toks.length <= ws.length; i++) {
    if (words[i].start < after) continue;
    if (toks.every((t, k) => ws[i + k] === t)) return words[i].start;
  }
  throw new Error(`Short: không tìm thấy cue "${text}" sau ${after}s`);
}
const lastEnd = (words: ShortWord[]) => words[words.length - 1].end;

type Item = { cue: string; label: string; v: number; Art: React.FC; bg: string; subtotal?: boolean };
const ITEMS: Item[] = [
  { cue: "Trừ nguyên liệu", label: "Nguyên liệu & bao bì", v: 41, Art: CupArt, bg: F.peach },
  { cue: "Trừ app", label: "App giao hàng", v: 10.5, Art: PhoneArt, bg: F.lavender },
  { cue: "Trừ mặt bằng", label: "Tiền mặt bằng", v: 15, Art: ShopArt, bg: F.yellow },
  { cue: "Trừ nhân viên", label: "Nhân viên", v: 16.2, Art: StaffArt, bg: F.mint },
  { cue: "Trừ điện nước", label: "Điện nước, thuế, linh tinh", v: 11.5, Art: BulbArt, bg: F.pink },
  { cue: "Lời trên giấy mười triệu tám", label: "Lời trên giấy", v: 0, Art: CashArt, bg: F.cream, subtotal: true },
  { cue: "Trừ khấu hao", label: "Khấu hao vốn ban đầu", v: 8.3, Art: RollerArt, bg: F.lavender },
];
const REVENUE = 105;
const BAR_COLORS = ["#E0354B", "#8E7CC3", "#E7A92A", "#2F8A57", "#D76C8A", "#5B6BBF"];

function useTimes(words: ShortWord[]) {
  return useMemo(() => {
    const c = (s: string, after = 0) => cueAt(words, s, after);
    const t: Record<string, number> = {};
    t.hook = c("Một trăm ly một ngày");
    t.p35 = c("Ba mươi lăm ngàn một ly");
    t.vichi = c("Vị chi ba triệu rưỡi");
    t.hon = c("hơn một trăm triệu một tháng");
    t.nghe = c("Nghe sướng lỗ tai chưa");
    t.khoan = c("Khoan");
    t.dua = c("đưa sổ đây Bác coi");
    t.dt = c("Doanh thu một trăm lẻ năm triệu");
    const items = ITEMS.map((it) => c(it.cue, t.dt));
    t.cl = c("Còn lại", items[items.length - 1]);
    t.stamp = c("hai triệu năm trăm ngàn đồng", t.cl);
    t.quote = c("Lời trên giấy chưa phải là lời trong túi", t.stamp);
    t.end = lastEnd(words);
    return { t, items };
  }, [words]);
}

// ---------------------------------------------------------------- nền đổi màu: vòng tròn loang
const BgWipe: React.FC<{ stops: [number, string][] }> = ({ stops }) => {
  const t = useT();
  let i = 0;
  stops.forEach(([at], k) => {
    if (t >= at) i = k;
  });
  const [at, color] = stops[i];
  const prev = i > 0 ? stops[i - 1][1] : color;
  const r = interpolate(t - at, [0, 0.45], [0, 2300], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: prev }}>
      <div style={{ position: "absolute", left: W / 2 - r, top: 1000 - r, width: r * 2, height: r * 2, borderRadius: "50%", backgroundColor: color }} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- bộ đếm tiền + thanh tiền rụng
const MoneyCounter: React.FC<{ t0: number; items: number[]; until: number }> = ({ t0, items, until }) => {
  const t = useT();
  const p = usePopAt(t0);
  if (t < t0 || t >= until) return null;

  // giá trị đang hiển thị: đếm lên 0→105, rồi trừ dần mỗi khoản
  let value = REVENUE * interpolate(t, [t0, t0 + 1.1], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  let removed = 0;
  ITEMS.forEach((it, k) => {
    if (it.subtotal) return;
    const k01 = interpolate(t, [items[k], items[k] + 0.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
    removed += it.v * k01;
  });
  value -= removed;
  const color = value > 50 ? F.green : value > 10 ? F.ink : F.red;

  let acc = 0;
  let colorIdx = 0;
  const bar = 840;
  return (
    <div style={{ position: "absolute", left: 90, top: 480, width: 900, transform: `scale(${interpolate(p, [0, 1], [0.5, 1])})`, opacity: Math.min(1, p * 2) }}>
      <div style={{ background: F.card, borderRadius: 26, padding: "22px 30px 30px", boxShadow: `10px 12px 0 ${F.shadow}`, textAlign: "center" }}>
        <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 40, color: "#6E6257" }}>Tiền còn lại cho chủ quán</div>
        <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 132, color, lineHeight: 1.05, fontVariantNumeric: "tabular-nums" }}>
          {fmt(Math.max(0, value))} <span style={{ fontSize: 60 }}>triệu</span>
        </div>
        <div style={{ position: "relative", width: bar, height: 44, margin: "14px auto 0", borderRadius: 22, background: "#E8DFCF", overflow: "visible" }}>
          {/* phần còn lại */}
          <div style={{ position: "absolute", right: 0, top: 0, height: 44, width: (bar * Math.max(0, value)) / REVENUE, background: F.green, borderRadius: 22 }} />
          {/* các mảng bị trừ rơi xuống */}
          {ITEMS.map((it, k) => {
            if (it.subtotal) return null;
            const w = (bar * it.v) / REVENUE;
            const x = acc;
            acc += w;
            const col = BAR_COLORS[colorIdx++ % BAR_COLORS.length];
            const d = t - items[k];
            if (d < 0) return <div key={k} style={{ position: "absolute", left: x, top: 0, width: w, height: 44, background: F.green, borderRight: "2px solid #E8DFCF" }} />;
            if (d > 1.4) return null;
            return (
              <div
                key={k}
                style={{
                  position: "absolute",
                  left: x,
                  top: 0,
                  width: w,
                  height: 44,
                  background: col,
                  transform: `translateY(${d * d * 900}px) rotate(${d * (k % 2 ? 60 : -60)}deg)`,
                  opacity: 1 - d / 1.4,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- con dấu kết quả
const Stamp: React.FC<{ at: number; text: string }> = ({ at, text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - Math.round(at * fps), fps, config: { damping: 10, stiffness: 220, mass: 0.7 } });
  if (s <= 0.001) return null;
  const ring = interpolate(frame - at * fps, [6, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const C = 2 * Math.PI * 300;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 410, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", transform: `scale(${interpolate(s, [0, 1], [3, 1])}) rotate(-7deg)`, opacity: Math.min(1, s * 3) }}>
        <svg width={860} height={330} viewBox="0 0 860 330" style={{ position: "absolute", left: -110, top: -60 }}>
          <ellipse cx={430} cy={165} rx={410} ry={150} fill="none" stroke={F.red} strokeWidth={12} pathLength={C} strokeDasharray={C} strokeDashoffset={C * (1 - ring)} strokeLinecap="round" />
        </svg>
        <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 180, color: F.red, whiteSpace: "nowrap", textShadow: `8px 8px 0 ${F.shadow}` }}>{text}</div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- phụ đề karaoke ở dải tím
export const Subtitles: React.FC<{ words: ShortWord[] }> = ({ words }) => {
  const t = useT();
  const groups = useMemo(() => {
    const out: number[][] = [];
    let cur: number[] = [];
    words.forEach((w, i) => {
      cur.push(i);
      const next = words[i + 1];
      if (/[.?!:,"]$/.test(w.word) || cur.length >= 5 || (next && next.start - w.end > 0.35)) {
        out.push(cur);
        cur = [];
      }
    });
    if (cur.length) out.push(cur);
    return out;
  }, [words]);
  const g = groups.find((g) => t >= words[g[0]].start - 0.05 && t <= words[g[g.length - 1]].end + 0.2);
  if (!g) return null;
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: GROUND_Y + 150, textAlign: "center", fontFamily: sans, fontWeight: 800, fontSize: 64, lineHeight: 1.2 }}>
      {g.map((i) => {
        const w = words[i];
        const on = t >= w.start;
        const pop = on ? interpolate(t - w.start, [0, 0.12], [1.18, 1], { extrapolateRight: "clamp" }) : 1;
        return (
          <span key={i} style={{ display: "inline-block", margin: "0 9px", color: on ? F.gold : "#fff", transform: `scale(${pop})`, WebkitTextStroke: `3px ${F.ink}`, paintOrder: "stroke fill" }}>
            {w.word.replace(/["“”]/g, "")}
          </span>
        );
      })}
    </div>
  );
};

// ---------------------------------------------------------------- hiệu ứng âm thanh
const Sfx: React.FC<{ events: [number, string, number][] }> = ({ events }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      {events.map(([at, name, vol], i) => (
        <Sequence key={i} from={Math.max(0, Math.round(at * fps))} durationInFrames={Math.round(fps * 1.2)} layout="none">
          <Audio src={staticFile(`_sfx/${name}.wav`)} volume={vol} />
        </Sequence>
      ))}
    </>
  );
};

// ---------------------------------------------------------------- composition
export const Short01: React.FC<Short01Props> = ({ data, audio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (!data) return <AbsoluteFill style={{ backgroundColor: F.yellow }} />;
  return <ShortBody data={data} audio={audio} frame={frame} fps={fps} />;
};

const ShortBody: React.FC<{ data: ShortData; audio: string; frame: number; fps: number }> = ({ data, audio, frame, fps }) => {
  const { words } = data;
  const { t: T, items } = useTimes(words);
  const t = frame / fps;
  const ctaAt = T.end + 0.25;

  // nhân vật: tư thế & biểu cảm theo đoạn
  const word = words.find((w) => t >= w.start && t <= w.end);
  const talking = Boolean(word);
  const mouthOpen = word ? Math.abs(Math.sin(((t - word.start) / Math.max(0.08, word.end - word.start)) * Math.PI)) : 0;
  const lastHit = [...items].reverse().find((x) => t >= x);
  const recentHit = lastHit !== undefined && t - lastHit < 0.9;
  let pose: Pose = "point";
  let face: Face = "neutral";
  if (t >= T.hon) [pose, face] = ["up", "grin"];
  if (t >= T.khoan) [pose, face] = ["stop", "squint"];
  if (t >= T.dua) [pose, face] = ["hold", "squint"];
  if (t >= T.dt) [pose, face] = ["hold", recentHit ? "shock" : "neutral"];
  if (t >= items[5] && t < items[6]) [pose, face] = ["point", "squint"];
  if (t >= T.cl) [pose, face] = ["up", "shock"];
  if (t >= T.quote) [pose, face] = ["wave", "happy"];

  const bgStops: [number, string][] = [
    [0, F.yellow],
    [T.khoan, F.pink],
    [T.dt, F.mint],
    ...ITEMS.map((it, k) => [items[k], it.bg] as [number, string]),
    [T.cl, F.yellow],
    [T.quote, F.mint],
  ];

  // rung màn hình khi con dấu đập xuống / "KHOAN!"
  const shakeAt = [T.stamp, T.khoan].find((s) => t >= s && t < s + 0.4);
  const shake = shakeAt !== undefined ? Math.sin((t - shakeAt) * 70) * (0.4 - (t - shakeAt)) * 40 : 0;

  const sfx: [number, string, number][] = [
    [T.hook, "pop", 0.5],
    [T.p35, "pop", 0.5],
    [T.vichi, "pop", 0.5],
    [T.hon, "ding", 0.45],
    [T.hon + 0.3, "ding", 0.35],
    [T.khoan, "thud", 0.8],
    [T.dua, "pop", 0.5],
    ...bgStops.slice(1).map(([at]) => [at, "whoosh", 0.35] as [number, string, number]),
    [T.dt + 0.1, "ding", 0.35],
    ...items.map((at, k) => [at + 0.05, ITEMS[k].subtotal ? "pop" : "tick", 0.6] as [number, string, number]),
    [T.stamp, "thud", 0.9],
    [ctaAt, "ding", 0.45],
  ];

  const stage = (from: number, to: number) => t >= from && t < to;

  return (
    <AbsoluteFill style={{ transform: `translate(${shake}px, ${shake * 0.5}px)`, overflow: "hidden" }}>
      <BgWipe stops={bgStops} />

      {/* ---------- 1. Hook: 100 ly/ngày ---------- */}
      {stage(0, T.khoan) && (
        <>
          <Card at={T.hook} seed="c1" top={150}>
            Quán trà sữa bán
            <br />
            <span style={{ color: F.red }}>100 ly/ngày</span>
          </Card>
          <Chip at={T.p35} seed="c1a" top={460} text="35.000đ × 100 ly" />
          <Chip at={T.vichi} seed="c1b" top={580} text="= 3,5 triệu/ngày" color={F.red} fontSize={64} />
          <Chip at={T.hon} seed="c1c" top={720} text="≈ 105 TRIỆU/THÁNG" color="#fff" bg={F.red} fontSize={76} />
          {Array.from({ length: 10 }).map((_, i) => (
            <PropPop key={i} at={T.hook + 0.12 * i} x={640 + (i % 4) * 105} y={980 + Math.floor(i / 4) * 130} size={130} seed={`cup${i}`}>
              <CupArt />
            </PropPop>
          ))}
          <CoinRain at={T.hon} />
          <Sparkles at={T.nghe} x={330} y={1000} />
        </>
      )}

      {/* ---------- 2. Khoan! ---------- */}
      {stage(T.khoan, T.dt) && (
        <>
          <Card at={T.khoan} seed="c2" top={230} fontSize={170} pad="30px 40px 44px">
            <span style={{ color: F.red }}>KHOAN!</span>
          </Card>
          <Chip at={T.dua} seed="c2a" top={560} text="Đưa sổ đây Bác coi!" fontSize={60} />
        </>
      )}

      {/* ---------- 3. Kết sổ: trừ từng khoản ---------- */}
      {stage(T.dt, T.cl) && (
        <>
          {t < items[0] && <Card at={T.dt} seed="c3" top={150} fontSize={70}>Doanh thu 1 tháng</Card>}
          {ITEMS.map((it, k) => {
            const from = items[k];
            const to = k + 1 < items.length ? items[k + 1] : T.cl;
            if (!stage(from, to)) return null;
            return (
              <React.Fragment key={k}>
                <Card at={from} seed={`it${k}`} top={110} fontSize={64} pad="24px 30px">
                  {it.label}{" "}
                  <span style={{ color: it.subtotal ? F.green : F.red, whiteSpace: "nowrap" }}>{it.subtotal ? "10,8 triệu" : `−${fmt(it.v)} tr`}</span>
                </Card>
                <PropPop at={from + 0.05} x={790} y={1120} size={340} seed={`ip${k}`}>
                  <it.Art />
                </PropPop>
              </React.Fragment>
            );
          })}
          {t < items[0] && (
            <PropPop at={T.dt + 0.2} x={790} y={1120} size={340} seed="cash">
              <CashArt />
            </PropPop>
          )}
          <MoneyCounter t0={T.dt} items={items} until={T.cl + 99} />
        </>
      )}

      {/* ---------- 4. Còn lại 1,3 triệu ---------- */}
      {stage(T.cl, T.quote) && (
        <>
          <Card at={T.cl} seed="c4" top={130} fontSize={96} width={640}>
            Còn lại:
          </Card>
          <Stamp at={T.stamp} text="2,5 TRIỆU" />
          <Chip at={T.stamp + 0.5} seed="c4a" top={760} text="từ doanh thu 105 triệu!" fontSize={52} />
          <PropPop at={T.cl + 0.1} x={800} y={1200} size={300} seed="wallet" float={false}>
            <WalletArt />
          </PropPop>
          {[0, 1, 2].map((i) => {
            const d = t - (T.stamp + 0.2 + i * 0.25);
            if (d < 0 || d > 1.2) return null;
            return (
              <svg key={i} viewBox="0 0 200 200" width={90} height={90} style={{ position: "absolute", left: 760 + (i - 1) * 40 + d * 60 * (i - 1), top: 1120 - Math.sin((d / 1.2) * Math.PI) * 260, opacity: 1 - d / 1.2 }}>
                <CoinArt spin={Math.cos(d * 12)} />
              </svg>
            );
          })}
        </>
      )}

      {/* ---------- 5. Câu chốt + kêu gọi ---------- */}
      {t >= T.quote && (
        <>
          <Card at={T.quote} seed="c5" top={170} fontSize={78}>
            <QuoteWords words={words.filter((w) => w.start >= T.quote - 0.01)} split={3} />
          </Card>
          <CtaButton at={ctaAt} />
          <Chip at={ctaAt + 0.35} seed="c5b" top={760} text="Theo dõi Bác Sáu Sổ Sách" fontSize={50} />
          <Sparkles at={ctaAt} x={540} y={620} r={330} />
        </>
      )}

      {/* nhân vật luôn đứng trên mặt đất, bị đất che phần dưới */}
      <div style={{ position: "absolute", left: 60, top: GROUND_Y - 640 }}>
        <BacSauFlat pose={pose} face={face} talking={talking} mouthOpen={mouthOpen} size={520} holding={<LedgerInHands />} />
      </div>
      <Ground />
      <Subtitles words={words} />

      <Audio src={staticFile(audio)} />
      <Sfx events={sfx} />
    </AbsoluteFill>
  );
};

/** Câu chốt hiện từng chữ theo lời đọc; `split` chữ đầu màu đen, phần sau màu đỏ xuống dòng */
const QuoteWords: React.FC<{ words: ShortWord[]; split: number }> = ({ words, split }) => {
  const t = useT();
  return (
    <>
      {words.map((w, i) => {
        const on = interpolate(t - w.start, [0, 0.15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <React.Fragment key={i}>
            {i === split && <br />}
            <span style={{ display: "inline-block", opacity: 0.15 + 0.85 * on, transform: `translateY(${(1 - on) * 14}px)`, color: i >= split ? F.red : F.ink, margin: "0 8px" }}>
              {w.word.replace(/[.]/g, "")}
            </span>
          </React.Fragment>
        );
      })}
    </>
  );
};

const CtaButton: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = usePopAt(at, { damping: 8, stiffness: 180, mass: 0.7 });
  if (p <= 0.001) return null;
  const pulse = 1 + Math.sin((frame / fps) * 7) * 0.04;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          transform: `scale(${p * pulse}) rotate(${(1 - p) * 10 - 2}deg)`,
          background: F.red,
          color: "#fff",
          fontFamily: sans,
          fontWeight: 800,
          fontSize: 66,
          padding: "22px 50px",
          borderRadius: 999,
          boxShadow: `8px 10px 0 ${F.shadow}`,
          whiteSpace: "nowrap",
        }}
      >
        ▶ Xem video đầy đủ
      </div>
    </div>
  );
};

export const SHORT_SIZE = { width: W, height: H };
