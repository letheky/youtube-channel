import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C, sans } from "../theme";

export type ThumbnailProps = { image: string | null; big: string; small: string; bigFontSize?: number; smallFontSize?: number; textWidth?: number };

/** Thumbnail 1280×720: ảnh nền + chữ lớn ở 1/3 bên trái (ảnh đã chừa trống) */
export const Thumbnail: React.FC<ThumbnailProps> = ({ image, big, small, bigFontSize = 112, smallFontSize = 58, textWidth = 560 }) => (
  <AbsoluteFill style={{ backgroundColor: C.paper }}>
    {image && <Img src={staticFile(image)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
    <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(20,14,8,0.55) 0%, rgba(20,14,8,0.25) 42%, rgba(0,0,0,0) 60%)" }} />
    <div style={{ position: "absolute", left: 44, top: 120, width: textWidth }}>
      <div
        style={{
          fontFamily: sans,
          fontWeight: 800,
          fontSize: bigFontSize,
          whiteSpace: "pre-line",
          lineHeight: 0.98,
          color: "#fff",
          WebkitTextStroke: `6px ${C.ink}`,
          paintOrder: "stroke fill",
          textShadow: "0 10px 0 rgba(0,0,0,0.35)",
        }}
      >
        {big}
      </div>
      <div
        style={{
          display: "inline-block",
          marginTop: 26,
          background: C.red,
          color: "#fff",
          fontFamily: sans,
          fontWeight: 800,
          fontSize: smallFontSize,
          whiteSpace: "nowrap",
          padding: "8px 26px",
          borderRadius: 14,
          transform: "rotate(-3deg)",
          boxShadow: "0 8px 0 rgba(0,0,0,0.3)",
        }}
      >
        {small}
      </div>
    </div>
  </AbsoluteFill>
);
