import type { Cue, Overlay, Word } from "./types";

const norm = (s: string) => s.toLocaleLowerCase("vi").replace(/[^\p{L}\p{N}]+/gu, "");
const tokens = (s: string) => s.split(/\s+/).map(norm).filter(Boolean);

/** Trả về [chỉ số chữ đầu, chỉ số sau chữ cuối] của cụm cue, tìm từ `from`. */
function find(words: string[], cue: Cue, from: number): [number, number] | null {
  const { text, nth = 1 } = typeof cue === "string" ? { text: cue } : cue;
  const t = tokens(text);
  let seen = 0;
  for (let i = from; i + t.length <= words.length; i++) {
    if (t.every((tok, k) => words[i + k] === tok) && ++seen === nth) return [i, i + t.length];
  }
  return null;
}

export type ResolvedOverlay = { overlay: Overlay; start: number; end: number; inner: number[]; extra: number[] };

/**
 * Đổi mọi cue của các overlay trong một cảnh thành giây (tính từ đầu cảnh).
 * Ném lỗi nếu không tìm thấy — để biết ngay kịch bản và overlay lệch nhau.
 */
export function resolveOverlays(sceneSlug: string, words: Word[], overlays: Overlay[], sceneEnd: number): ResolvedOverlay[] {
  const ws = words.map((w) => norm(w.word));
  let cursor = 0;
  const at = (cue: Cue, from = cursor, advance = true) => {
    const hit = find(ws, cue, from) ?? find(ws, cue, 0);
    if (!hit) throw new Error(`[${sceneSlug}] không tìm thấy cue "${typeof cue === "string" ? cue : cue.text}" trong lời đọc`);
    if (advance) cursor = hit[1];
    return words[hit[0]].start;
  };

  return overlays.map((o) => {
    const start = at(o.cue);
    let inner: number[] = [];
    let extra: number[] = [];
    if (o.type === "chips" || o.type === "rules") inner = o.items.map((it) => at(it.cue));
    if (o.type === "ledger") inner = o.lines.map((l) => at(l.cue));
    if (o.type === "salary") inner = o.payments.map((p) => at(p.cue));
    if (o.type === "comparison") {
      inner = o.rows.map((row) => at(row.cue));
      extra = [at(o.stampCue)];
    }
    if (o.type === "chart") inner = o.markers.map((m) => at(m.cue));
    if (o.type === "ketso") {
      inner = o.rowCues.map((c) => at(c));
      extra = [at(o.resultCue)];
    }
    if (o.type === "quote" && o.subscribeCue) extra = [at(o.subscribeCue, 0, false)];
    const end = o.until ? at(o.until, cursor, false) : sceneEnd;
    return { overlay: o, start, end, inner, extra };
  });
}
