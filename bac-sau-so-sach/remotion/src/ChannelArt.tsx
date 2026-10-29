import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C, hand, paperBackground, sans } from "./theme";

// Ảnh tham chiếu nhân vật (1672×941) được chép sang videos/_kenh/ để staticFile đọc được.
const SHEET = "_kenh/bang-nhan-vat.png";
const SHEET_W = 1672;

/** Cắt một vùng [x, y, w, h] của bảng nhân vật, phóng theo chiều rộng `width`. */
const Crop: React.FC<{ box: [number, number, number, number]; width: number; style?: React.CSSProperties }> = ({ box: [x, y, w, h], width, style }) => {
  const k = width / w;
  return (
    <div style={{ width, height: h * k, overflow: "hidden", position: "relative", ...style }}>
      <Img src={staticFile(SHEET)} style={{ position: "absolute", left: -x * k, top: -y * k, width: SHEET_W * k }} />
    </div>
  );
};

const HEAD_SMILE: [number, number, number, number] = [760, 108, 300, 410];

/** Ảnh đại diện 800×800 — YouTube cắt tròn, hiển thị nhỏ tới ~40px: chỉ mặt Bác, nền vàng. */
export const ChannelAvatar: React.FC = () => (
  <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 45%, ${C.gold} 0%, #d9932b 70%)`, alignItems: "center", justifyContent: "center" }}>
    <div style={{ width: 640, height: 640, borderRadius: "50%", background: C.paper, border: `14px solid ${C.ink}`, overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
      <Crop box={HEAD_SMILE} width={560} style={{ marginBottom: -150 }} />
    </div>
  </AbsoluteFill>
);

/** Ảnh bìa 2560×1440. Vùng an toàn mọi thiết bị: 1546×423 ở giữa (x 507–2053, y 508–931). */
export const ChannelBanner: React.FC = () => (
  <AbsoluteFill style={paperBackground}>
    {/* dòng kẻ sổ */}
    <AbsoluteFill style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent 0 58px, rgba(60,90,140,0.18) 58px 60px)` }} />
    <div style={{ position: "absolute", left: 440, top: 0, bottom: 0, width: 6, background: C.margin, opacity: 0.7 }} />
    <div style={{ position: "absolute", left: 540, top: 508, width: 1130, height: 423, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 112, lineHeight: 1, color: C.margin, letterSpacing: 1, whiteSpace: "nowrap" }}>BÁC SÁU SỔ SÁCH</div>
      <div style={{ fontFamily: hand, fontSize: 70, color: C.ink, marginTop: 22 }}>“Khoan, đưa sổ đây Bác coi.”</div>
      <div style={{ display: "flex", gap: 22, marginTop: 34 }}>
        {["Tính từng đồng", "Video mới 18:00 mỗi ngày"].map((t, i) => (
          <div key={t} style={{ fontFamily: sans, fontWeight: 800, fontSize: 40, color: "#fff", background: i ? C.red : C.green, padding: "10px 28px", borderRadius: 14, border: `4px solid ${C.ink}`, boxShadow: `6px 6px 0 ${C.ink}` }}>{t}</div>
        ))}
      </div>
    </div>
    <div style={{ position: "absolute", left: 1680, top: 520, width: 400, height: 400, borderRadius: "50%", background: C.paper, border: `12px solid ${C.ink}`, boxShadow: `10px 10px 0 ${C.gold}`, overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
      <Crop box={HEAD_SMILE} width={350} style={{ marginBottom: -95 }} />
    </div>
  </AbsoluteFill>
);
