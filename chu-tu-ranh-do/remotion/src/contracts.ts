export type Word = {word: string; start: number; end: number};
export type Narration = {text: string; duration: number; words: Word[]};
export type Caption = {text: string; start: number; end: number};
export type Shot = {
  id: string;
  from: number;
  duration: number;
  title: string;
  body: string;
  labels: [string, string, string];
  note?: string;
};
export type EpisodeProps = {
  title: string;
  duration: number;
  audio?: string;
  captions: Caption[];
  shots: Shot[];
  technicalPreview: boolean;
};
