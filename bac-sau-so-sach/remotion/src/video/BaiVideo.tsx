import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { C, hand, paperBackground, sans } from "../theme";
import { Scene } from "./Scene";
import { ChapterBar } from "./ChapterBar";
import type { Timeline, VideoSpec } from "./types";

export const OUTRO_SECONDS = 10;

export type BaiVideoProps = { timeline: Timeline | null; spec: VideoSpec; subtitles: boolean };

/** 10 giây cuối: chừa chỗ cho End screen của YouTube (video đề xuất bên trái, nút đăng ký bên phải) */
const Outro: React.FC<{ title: string; tagline: string }> = ({ title, tagline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = interpolate(frame, [0, fps * 0.8], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ ...paperBackground, opacity: v }}>
      <div style={{ position: "absolute", top: 120, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 96, color: C.margin, letterSpacing: 3 }}>{title}</div>
        <div style={{ fontFamily: hand, fontSize: 56, color: C.ink, marginTop: 10 }}>{tagline}</div>
      </div>
    </AbsoluteFill>
  );
};

export const BaiVideo: React.FC<BaiVideoProps> = ({ timeline, spec, subtitles }) => {
  const { fps } = useVideoConfig();
  if (!timeline) return <AbsoluteFill style={paperBackground} />;
  const scenes = timeline.scenes;
  const last = scenes[scenes.length - 1];
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      {scenes.map((sc, i) => {
        const from = Math.round(sc.start * fps);
        const until = i + 1 < scenes.length ? Math.round(scenes[i + 1].start * fps) : Math.round((sc.start + sc.duration + timeline.gap) * fps);
        return (
          <Sequence key={sc.slug} from={from} durationInFrames={until - from} name={`${sc.slug} · ${sc.title}`}>
            <Scene scene={sc} overlays={spec.overlays[sc.n] ?? []} subtitles={subtitles} frames={until - from} sidePanels={spec.sidePanels} lowerKeyword={spec.keywordPosition === "lower"} />
            <ChapterBar n={sc.n} title={sc.title} />
          </Sequence>
        );
      })}
      <Sequence from={Math.round((last.start + last.duration + timeline.gap) * fps)} durationInFrames={OUTRO_SECONDS * fps} name="outro">
        <Outro {...spec.outro} />
      </Sequence>
    </AbsoluteFill>
  );
};
