import React, { useMemo } from "react";
import { AbsoluteFill, Audio, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, paperBackground, sans } from "../theme";
import { resolveOverlays } from "./cues";
import { isFullscreen, OverlayView } from "./Overlays";
import type { Overlay, TimelineScene } from "./types";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Mỗi shot tự tính chuyển động theo thời lượng của nó, crossfade sáu frame. */
const KenBurns: React.FC<{ src: string; n: number; dim: number; frames: number; fade: boolean }> = ({ src, n, dim, frames, fade }) => {
  const frame = useCurrentFrame();
  const p = Math.min(1, frame / Math.max(1, frames - 1));
  const zoomIn = n % 2 === 1;
  const scale = zoomIn ? 1 + 0.06 * p : 1.06 - 0.06 * p;
  const opacity = fade ? interpolate(frame, [0, 6], [0, 1], clamp) : 1;
  return (
    <AbsoluteFill style={{ opacity, backgroundColor: C.ink }} data-shot-image={src}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", transformOrigin: n % 3 === 0 ? "35% 50%" : "65% 50%", transform: `scale(${scale})` }} />
      <AbsoluteFill style={{ backgroundColor: `rgba(20,14,8,${dim})` }} />
    </AbsoluteFill>
  );
};

const Subtitles: React.FC<{ scene: TimelineScene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const ph = scene.phrases.find((p) => t >= p.start - 0.05 && t <= p.end + 0.25);
  if (!ph) return null;
  const words = scene.words.slice(ph.from, ph.to + 1);
  return (
    <div data-subtitles style={{ position: "absolute", left: 0, right: 0, bottom: 88, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          maxWidth: 1560,
          background: "rgba(20,14,8,0.72)",
          borderRadius: 14,
          padding: "12px 30px 14px",
          fontFamily: sans,
          fontWeight: 700,
          fontSize: 46,
          lineHeight: 1.25,
          textAlign: "center",
          color: "#fff",
        }}
      >
        {words.map((w, i) => (
          <span key={i} style={{ color: t >= w.start ? C.gold : "#fff" }}>
            {w.word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </div>
    </div>
  );
};

/** Cảnh không có ảnh: nền giấy sổ + tên cảnh nhỏ */
const PaperBackdrop: React.FC<{ title: string }> = ({ title }) => (
  <AbsoluteFill style={paperBackground}>
    <div style={{ position: "absolute", left: 80, top: 0, bottom: 0, width: 3, background: C.margin, opacity: 0.6 }} />
    <div style={{ position: "absolute", left: 120, top: 34, fontFamily: sans, fontWeight: 700, fontSize: 30, color: C.inkSoft }}>{title}</div>
  </AbsoluteFill>
);

const Keyword: React.FC<{ text: string; n: number; lower?: boolean }> = ({ text, n, lower }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 18, stiffness: 170 } });
  return <div data-keyword style={{ position: "absolute", left: lower ? 60 : 80, top: lower ? undefined : 76, bottom: lower ? 250 : undefined, maxWidth: lower ? 1800 : 1510, fontFamily: sans, fontWeight: 800, fontSize: lower ? 54 : 80, lineHeight: 1.3, color: "#fff", WebkitTextStroke: `2px ${C.ink}`, paintOrder: "stroke fill", background: n % 2 ? C.red : C.gold, border: `3px solid ${C.ink}`, borderRadius: 12, padding: "10px 28px 14px", boxShadow: `7px 7px 0 ${C.ink}`, opacity: Math.min(1, pop), transform: `scale(${0.88 + 0.12 * pop})`, transformOrigin: "left top" }}>{text}</div>;
};

export const Scene: React.FC<{ scene: TimelineScene; overlays: Overlay[]; subtitles: boolean; frames: number; sidePanels?: boolean; lowerKeyword?: boolean }> = ({ scene, overlays, subtitles, frames, sidePanels = false, lowerKeyword = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const resolved = useMemo(() => resolveOverlays(scene.slug, scene.words, overlays, scene.duration), [scene, overlays]);
  const panelActive = resolved.some((r) => !["headline", "chips", "quote"].includes(r.overlay.type) && t >= r.start && t <= r.end);
  const fullscreen = resolved.some((r) => isFullscreen(r) && t >= r.start && t <= r.end + 0.4);
  const sideAmount = sidePanels ? resolved.reduce((amount, r) => {
    if (isFullscreen(r) || r.overlay.type === "quote") return amount;
    const enter = interpolate(t, [r.start - 0.2, r.start + 0.4], [0, 1], clamp);
    const exit = interpolate(t, [r.end, r.end + 0.4], [1, 0], clamp);
    return Math.max(amount, Math.min(enter, exit));
  }, 0) : 0;
  const dim = panelActive && !sidePanels ? 0.12 : 0.03;
  // Bao gồm cả thời gian overlay vào/ra để chữ không chồng nhau lúc chuyển.
  const keywordBlocked = resolved.some((r) => t >= r.start - 0.1 && t <= r.end + 0.5);
  const shots = scene.shots?.length ? scene.shots : [{ id: scene.slug, start: 0, end: scene.duration, image: scene.image, keyword: "" }];
  const active = shots.findIndex((s, i) => t >= s.start && (t < s.end || i === shots.length - 1));
  const hasImage = Boolean((shots[active]?.image) ?? scene.image);

  return (
    <AbsoluteFill style={sidePanels ? paperBackground : undefined}>
      <AbsoluteFill style={{ transformOrigin: "left top", transform: `translate(${36 * sideAmount}px, ${240 * sideAmount}px) scale(${1 - (1 - 1000 / 1920) * sideAmount})`, overflow: "hidden", borderRadius: 18 * sideAmount }}>
      {shots.map((shot, i) => {
        const from = Math.round(shot.start * fps);
        const end = i === shots.length - 1 ? frames : Math.round(shot.end * fps);
        const length = Math.max(1, end - from);
        const image = shot.image ?? scene.image;
        return <Sequence key={shot.id} from={from} durationInFrames={Math.min(frames - from, length + 6)} name={shot.id}>
          {image ? <KenBurns src={image} n={scene.n + i} dim={dim} frames={length} fade={i > 0} /> : <PaperBackdrop title={scene.title} />}
        </Sequence>;
      })}
      </AbsoluteFill>
      {!keywordBlocked && active >= 0 && shots[active].keyword && <Sequence from={Math.round(shots[active].start * fps)} layout="none"><Keyword text={shots[active].keyword} n={scene.n + active} lower={lowerKeyword} /></Sequence>}
      {resolved.map((r, i) => (
        <OverlayView key={i} r={r} wide={!hasImage} side={sidePanels} />
      ))}
      {subtitles && !fullscreen && <Subtitles scene={scene} />}
      <Audio src={staticFile(scene.audio)} />
    </AbsoluteFill>
  );
};
