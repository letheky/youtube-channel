import React from "react";
import { C, sans } from "../theme";

/** Nhãn chương và CTA nằm ngoài vùng phụ đề, suốt mỗi cảnh kể cả khoảng nghỉ. */
export const ChapterBar: React.FC<{ n: number; title: string }> = ({ n, title }) => (
  <div data-chapter-bar style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 48, display: "flex", justifyContent: "space-between", alignItems: "stretch", fontFamily: sans, fontWeight: 800, fontSize: 23 }}>
    <div style={{ display: "flex", alignItems: "center", maxWidth: "80%", padding: "0 36px", color: C.gold, background: `${C.ink}D9`, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{String(n).padStart(2, "0")} · {title.toLocaleUpperCase("vi")}</div>
    <div style={{ display: "flex", alignItems: "center", background: C.red, color: "#fff", padding: "0 32px", letterSpacing: 1 }}>ĐĂNG KÝ</div>
  </div>
);
