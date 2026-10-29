import React from "react";
import { Composition, staticFile, Still } from "remotion";
import { ChannelAvatar, ChannelBanner } from "./ChannelArt";
import { KetSo, ketSoDuration, type KetSoProps } from "./KetSo";
import { traSua100Ly } from "./data/tra-sua-100-ly";
import { traSua100LyVideo } from "./data/tra-sua-100-ly.video";
import { traGop0PhanTramVideo } from "./data/tra-gop-0-phan-tram.video";
import { BaiVideo, OUTRO_SECONDS, type BaiVideoProps } from "./video/BaiVideo";
import { Thumbnail, type ThumbnailProps } from "./video/Thumbnail";
import type { Timeline } from "./video/types";
import { Short01, type Short01Props, type ShortData } from "./short/Short01";
import { Short02 } from "./short/Short02";
import { Short03 } from "./short/Short03";
import { tiemVangKhongLoVideo } from "./data/tiem-vang-khong-lo.video";
import { taiXeCongNgheVideo } from "./data/tai-xe-cong-nghe.video";
import { Short04 } from "./short/Short04";
import { Short05 } from "./short/Short05";
import { quanCaPheMatBangVideo } from "./data/quan-ca-phe-mat-bang.video";
import { gui1TyNghiHuuVideo } from "./data/gui-1-ty-nghi-huu.video";
import { Short06 } from "./short/Short06";

import { theTinDungVideo } from "./data/the-tin-dung.video";
import { Short07 } from "./short/Short07";
import { luong15TrieuVideo } from "./data/luong-15-trieu-300-trieu.video";
import { Short08 } from "./short/Short08";
import { muaNhaHayThueVideo } from "./data/mua-nha-hay-thue.video";
import { Short09 } from "./short/Short09";

import { tiemSuaXeVideo } from "./data/tiem-sua-xe-dau-hem.video";
import { Short10 } from "./short/Short10";

import { vayAppVideo } from "./data/vay-app-online.video";
import { Short11 } from "./short/Short11";

import { luongHuuVideo } from "./data/luong-huu-bhxh.video";
import { Short13 } from "./short/Short13";

const FPS = 30;

const loadTimeline = async (slug: string): Promise<Timeline> => {
  const res = await fetch(staticFile(`${slug}/timeline.json`));
  if (!res.ok) throw new Error(`Chưa có videos/${slug}/timeline.json — chạy: node scripts/build-timeline.mjs ${slug}`);
  return res.json();
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="KetSo"
        component={KetSo}
        durationInFrames={ketSoDuration(traSua100Ly)}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={traSua100Ly satisfies KetSoProps}
        calculateMetadata={({ props }) => ({ durationInFrames: ketSoDuration(props) })}
      />

      {/* Video #1 — render: npx remotion render src/index.ts Video-01 */}
      <Composition
        id="Video-01"
        component={BaiVideo}
        fps={FPS}
        width={1920}
        height={1080}
        durationInFrames={FPS * 60}
        defaultProps={{ timeline: null, spec: traSua100LyVideo, subtitles: true } satisfies BaiVideoProps}
        calculateMetadata={async ({ props }) => {
          const timeline = await loadTimeline("01-tra-sua-100-ly");
          return { durationInFrames: Math.ceil((timeline.duration + OUTRO_SECONDS) * FPS), props: { ...props, timeline } };
        }}
      />

      {/* Short dọc giới thiệu video #1 — render: npx remotion render src/index.ts Short-01 */}
      <Composition
        id="Short-01"
        component={Short01}
        fps={FPS}
        width={1080}
        height={1920}
        durationInFrames={FPS * 50}
        defaultProps={{ data: null, audio: "01-tra-sua-100-ly/short/short.mp3" } satisfies Short01Props}
        calculateMetadata={async ({ props }) => {
          const res = await fetch(staticFile("01-tra-sua-100-ly/short/short.json"));
          if (!res.ok) throw new Error("Chưa có short.json — chạy: node scripts/build-short.mjs 01-tra-sua-100-ly");
          const data: ShortData = await res.json();
          return { durationInFrames: Math.ceil(data.duration * FPS), props: { ...props, data } };
        }}
      />

      <Still
        id="Thumbnail-01"
        component={Thumbnail}
        width={1280}
        height={720}
        defaultProps={{ image: "01-tra-sua-100-ly/anh/thumbnail.png", big: "100 LY/NGÀY", small: "LỜI… 2,5 TRIỆU?" } satisfies ThumbnailProps}
      />
      <Composition
        id="Video-02"
        component={BaiVideo}
        fps={FPS}
        width={1920}
        height={1080}
        durationInFrames={FPS * 60}
        defaultProps={{ timeline: null, spec: traGop0PhanTramVideo, subtitles: true } satisfies BaiVideoProps}
        calculateMetadata={async ({ props }) => {
          const timeline = await loadTimeline("02-tra-gop-0-phan-tram");
          return { durationInFrames: Math.ceil((timeline.duration + OUTRO_SECONDS) * FPS), props: { ...props, timeline } };
        }}
      />
      <Still
        id="Thumbnail-02"
        component={Thumbnail}
        width={1280}
        height={720}
        defaultProps={{ image: "02-tra-gop-0-phan-tram/anh/thumbnail.png", big: "TRẢ GÓP 0%", small: "THẬT RA… 29%?" } satisfies ThumbnailProps}
      />
      <Composition
        id="Short-02"
        component={Short02}
        fps={FPS}
        width={1080}
        height={1920}
        durationInFrames={FPS * 50}
        defaultProps={{ data: null, audio: "02-tra-gop-0-phan-tram/short/short.mp3" } satisfies Short01Props}
        calculateMetadata={async ({ props }) => {
          const res = await fetch(staticFile("02-tra-gop-0-phan-tram/short/short.json"));
          if (!res.ok) throw new Error("Chưa có short.json — chạy: node scripts/build-short.mjs 02-tra-gop-0-phan-tram");
          const data: ShortData = await res.json();
          return { durationInFrames: Math.ceil(data.duration * FPS), props: { ...props, data } };
        }}
      />
      <Composition id="Video-03" component={BaiVideo} fps={FPS} width={1920} height={1080} durationInFrames={FPS * 60}
        defaultProps={{ timeline: null, spec: tiemVangKhongLoVideo, subtitles: true } satisfies BaiVideoProps}
        calculateMetadata={async ({ props }) => { const timeline = await loadTimeline("03-tiem-vang-khong-lo"); return { durationInFrames: Math.ceil((timeline.duration + OUTRO_SECONDS) * FPS), props: { ...props, timeline } }; }} />
      <Still id="Thumbnail-03" component={Thumbnail} width={1280} height={720}
        defaultProps={{ image: "03-tiem-vang-khong-lo/anh/thumbnail.png", big: "TIỆM VÀNG", small: "KHÔNG BAO GIỜ LỖ?" } satisfies ThumbnailProps} />
      <Composition id="Short-03" component={Short03} fps={FPS} width={1080} height={1920} durationInFrames={FPS * 50}
        defaultProps={{ data: null, audio: "03-tiem-vang-khong-lo/short/short.mp3" } satisfies Short01Props}
        calculateMetadata={async ({ props }) => { const res = await fetch(staticFile("03-tiem-vang-khong-lo/short/short.json")); if (!res.ok) throw new Error("Chưa có Short-03: chạy build-short.mjs"); const data: ShortData = await res.json(); return { durationInFrames: Math.ceil(data.duration * FPS), props: { ...props, data } }; }} />
      <Composition id="Video-04" component={BaiVideo} fps={FPS} width={1920} height={1080} durationInFrames={FPS * 60}
        defaultProps={{ timeline: null, spec: taiXeCongNgheVideo, subtitles: true } satisfies BaiVideoProps}
        calculateMetadata={async ({ props }) => { const timeline = await loadTimeline("04-tai-xe-cong-nghe"); return { durationInFrames: Math.ceil((timeline.duration + OUTRO_SECONDS) * FPS), props: { ...props, timeline } }; }} />
      <Still id="Thumbnail-04" component={Thumbnail} width={1280} height={720}
        defaultProps={{ image: "04-tai-xe-cong-nghe/anh/thumbnail.png", big: "12 TIẾNG\n/NGÀY", small: "CÒN… 19K/GIỜ?", bigFontSize: 86, smallFontSize: 42, textWidth: 420 } satisfies ThumbnailProps} />
      <Composition id="Short-04" component={Short04} fps={FPS} width={1080} height={1920} durationInFrames={FPS * 50}
        defaultProps={{ data: null, audio: "04-tai-xe-cong-nghe/short/short.mp3" } satisfies Short01Props}
        calculateMetadata={async ({ props }) => { const res = await fetch(staticFile("04-tai-xe-cong-nghe/short/short.json")); if (!res.ok) throw new Error("Chưa có Short-04: chạy build-short.mjs"); const data: ShortData = await res.json(); return { durationInFrames: Math.ceil(data.duration * FPS), props: { ...props, data } }; }} />
      <Composition id="Video-05" component={BaiVideo} fps={FPS} width={1920} height={1080} durationInFrames={FPS * 60}
        defaultProps={{ timeline: null, spec: quanCaPheMatBangVideo, subtitles: true } satisfies BaiVideoProps}
        calculateMetadata={async ({ props }) => { const timeline = await loadTimeline("05-quan-ca-phe-mat-bang"); return { durationInFrames: Math.ceil((timeline.duration + OUTRO_SECONDS) * FPS), props: { ...props, timeline } }; }} />
      <Still id="Thumbnail-05" component={Thumbnail} width={1280} height={720}
        defaultProps={{ image: "05-quan-ca-phe-mat-bang/anh/thumbnail.png", big: "THUÊ 24 THÁNG\nHOÀN VỐN…", small: "THÁNG 32?!", bigFontSize: 66, smallFontSize: 60, textWidth: 560 } satisfies ThumbnailProps} />
      <Composition id="Short-05" component={Short05} fps={FPS} width={1080} height={1920} durationInFrames={FPS * 50}
        defaultProps={{ data: null, audio: "05-quan-ca-phe-mat-bang/short/short.mp3" } satisfies Short01Props}
        calculateMetadata={async ({ props }) => { const res = await fetch(staticFile("05-quan-ca-phe-mat-bang/short/short.json")); if (!res.ok) throw new Error("Chưa có Short-05: chạy build-short.mjs"); const data: ShortData = await res.json(); return { durationInFrames: Math.ceil(data.duration * FPS), props: { ...props, data } }; }} />
      <Composition id="Video-06" component={BaiVideo} fps={FPS} width={1920} height={1080} durationInFrames={FPS * 60}
        defaultProps={{ timeline: null, spec: gui1TyNghiHuuVideo, subtitles: true } satisfies BaiVideoProps}
        calculateMetadata={async ({ props }) => { const timeline = await loadTimeline("06-gui-1-ty-nghi-huu"); return { durationInFrames: Math.ceil((timeline.duration + OUTRO_SECONDS) * FPS), props: { ...props, timeline } }; }} />
      <Still id="Thumbnail-06" component={Thumbnail} width={1280} height={720}
        defaultProps={{ image: "06-gui-1-ty-nghi-huu/anh/thumbnail.png", big: "GỬI 1 TỶ\nLÃI 4,5 TRIỆU", small: "XÀI ĐƯỢC… 1,2 TRIỆU?", bigFontSize: 58, smallFontSize: 38, textWidth: 560 } satisfies ThumbnailProps} />
      <Composition id="Short-06" component={Short06} fps={FPS} width={1080} height={1920} durationInFrames={FPS * 50}
        defaultProps={{ data: null, audio: "06-gui-1-ty-nghi-huu/short/short.mp3" } satisfies Short01Props}
        calculateMetadata={async ({ props }) => { const res = await fetch(staticFile("06-gui-1-ty-nghi-huu/short/short.json")); if (!res.ok) throw new Error("Chưa có Short-06: chạy build-short.mjs"); const data: ShortData = await res.json(); return { durationInFrames: Math.ceil(data.duration * FPS), props: { ...props, data } }; }} />
      <Composition id="Video-07" component={BaiVideo} fps={FPS} width={1920} height={1080} durationInFrames={FPS * 60}
        defaultProps={{ timeline: null, spec: theTinDungVideo, subtitles: true } satisfies BaiVideoProps}
        calculateMetadata={async ({ props }) => { const timeline = await loadTimeline("07-the-tin-dung"); return { durationInFrames: Math.ceil((timeline.duration + OUTRO_SECONDS) * FPS), props: { ...props, timeline } }; }} />
      <Still id="Thumbnail-07" component={Thumbnail} width={1280} height={720}
        defaultProps={{ image: "07-the-tin-dung/anh/thumbnail.png", big: "NỢ 20 TRIỆU\nTRẢ TỐI THIỂU", small: "LÃI… 1,17 TRIỆU?!", bigFontSize: 54, smallFontSize: 42, textWidth: 560 } satisfies ThumbnailProps} />
      <Composition id="Short-07" component={Short07} fps={FPS} width={1080} height={1920} durationInFrames={FPS * 50}
        defaultProps={{ data: null, audio: "07-the-tin-dung/short/short.mp3" } satisfies Short01Props}
        calculateMetadata={async ({ props }) => { const res = await fetch(staticFile("07-the-tin-dung/short/short.json")); if (!res.ok) throw new Error("Chưa có Short-07: chạy build-short.mjs"); const data: ShortData = await res.json(); return { durationInFrames: Math.ceil(data.duration * FPS), props: { ...props, data } }; }} />
      <Composition id="Video-08" component={BaiVideo} fps={FPS} width={1920} height={1080} durationInFrames={FPS * 60}
        defaultProps={{ timeline: null, spec: luong15TrieuVideo, subtitles: true } satisfies BaiVideoProps}
        calculateMetadata={async ({ props }) => { const timeline = await loadTimeline("08-luong-15-trieu-300-trieu"); return { durationInFrames: Math.ceil((timeline.duration + OUTRO_SECONDS) * FPS), props: { ...props, timeline } }; }} />
      <Still id="Thumbnail-08" component={Thumbnail} width={1280} height={720}
        defaultProps={{ image: "08-luong-15-trieu-300-trieu/anh/thumbnail.png", big: "LƯƠNG 15 TRIỆU\n5 NĂM DÀNH…", small: "CHỈ 170 TRIỆU?", bigFontSize: 54, smallFontSize: 46, textWidth: 560 } satisfies ThumbnailProps} />
      <Composition id="Short-08" component={Short08} fps={FPS} width={1080} height={1920} durationInFrames={FPS * 50}
        defaultProps={{ data: null, audio: "08-luong-15-trieu-300-trieu/short/short.mp3" } satisfies Short01Props}
        calculateMetadata={async ({ props }) => { const res = await fetch(staticFile("08-luong-15-trieu-300-trieu/short/short.json")); if (!res.ok) throw new Error("Chưa có Short-08: chạy build-short.mjs"); const data: ShortData = await res.json(); return { durationInFrames: Math.ceil(data.duration * FPS), props: { ...props, data } }; }} />
      <Composition id="Video-09" component={BaiVideo} fps={FPS} width={1920} height={1080} durationInFrames={FPS * 60}
        defaultProps={{ timeline: null, spec: muaNhaHayThueVideo, subtitles: true } satisfies BaiVideoProps}
        calculateMetadata={async ({ props }) => { const timeline = await loadTimeline("09-mua-nha-hay-thue"); return { durationInFrames: Math.ceil((timeline.duration + OUTRO_SECONDS) * FPS), props: { ...props, timeline } }; }} />
      <Still id="Thumbnail-09" component={Thumbnail} width={1280} height={720}
        defaultProps={{ image: "09-mua-nha-hay-thue/anh/thumbnail.png", big: "THUÊ NHÀ\n20 NĂM", small: "HƠN MUA… 1 TỶ?!", bigFontSize: 92, smallFontSize: 52, textWidth: 520 } satisfies ThumbnailProps} />
      <Composition id="Short-09" component={Short09} fps={FPS} width={1080} height={1920} durationInFrames={FPS * 50}
        defaultProps={{ data: null, audio: "09-mua-nha-hay-thue/short/short.mp3" } satisfies Short01Props}
        calculateMetadata={async ({ props }) => { const res = await fetch(staticFile("09-mua-nha-hay-thue/short/short.json")); if (!res.ok) throw new Error("Chưa có Short-09: chạy build-short.mjs"); const data: ShortData = await res.json(); return { durationInFrames: Math.ceil(data.duration * FPS), props: { ...props, data } }; }} />
      <Composition id="Video-10" component={BaiVideo} fps={FPS} width={1920} height={1080} durationInFrames={FPS * 60}
        defaultProps={{ timeline: null, spec: tiemSuaXeVideo, subtitles: true } satisfies BaiVideoProps}
        calculateMetadata={async ({ props }) => { const timeline = await loadTimeline("10-tiem-sua-xe-dau-hem"); return { durationInFrames: Math.ceil((timeline.duration + OUTRO_SECONDS) * FPS), props: { ...props, timeline } }; }} />
      <Still id="Thumbnail-10" component={Thumbnail} width={1280} height={720}
        defaultProps={{ image: "10-tiem-sua-xe-dau-hem/anh/thumbnail.png", big: "THU 2 TRIỆU\nMỖI NGÀY", small: "CÒN… 57K/GIỜ?", bigFontSize: 76, smallFontSize: 56, textWidth: 560 } satisfies ThumbnailProps} />
      <Composition id="Short-10" component={Short10} fps={FPS} width={1080} height={1920} durationInFrames={FPS * 50}
        defaultProps={{ data: null, audio: "10-tiem-sua-xe-dau-hem/short/short.mp3" } satisfies Short01Props}
        calculateMetadata={async ({ props }) => { const res = await fetch(staticFile("10-tiem-sua-xe-dau-hem/short/short.json")); if (!res.ok) throw new Error("Chưa có Short-10: chạy build-short.mjs"); const data: ShortData = await res.json(); return { durationInFrames: Math.ceil(data.duration * FPS), props: { ...props, data } }; }} />
      <Composition id="Video-11" component={BaiVideo} fps={FPS} width={1920} height={1080} durationInFrames={FPS * 60}
        defaultProps={{ timeline: null, spec: vayAppVideo, subtitles: true } satisfies BaiVideoProps}
        calculateMetadata={async ({ props }) => { const timeline = await loadTimeline("11-vay-app-online"); return { durationInFrames: Math.ceil((timeline.duration + OUTRO_SECONDS) * FPS), props: { ...props, timeline } }; }} />
      <Still id="Thumbnail-11" component={Thumbnail} width={1280} height={720}
        defaultProps={{ image: "11-vay-app-online/anh/thumbnail-v2.png", big: "LÃI 1%?\nTỐN 26,25%", small: "VÍ DỤ 30 NGÀY", bigFontSize: 72, smallFontSize: 34, textWidth: 490 } satisfies ThumbnailProps} />
      <Composition id="Short-11" component={Short11} fps={FPS} width={1080} height={1920} durationInFrames={FPS * 50}
        defaultProps={{ data: null, audio: "11-vay-app-online/short/short.mp3" } satisfies Short01Props}
        calculateMetadata={async ({ props }) => { const res = await fetch(staticFile("11-vay-app-online/short/short.json")); if (!res.ok) throw new Error("Chưa có Short-11: chạy build-short.mjs"); const data: ShortData = await res.json(); return { durationInFrames: Math.ceil(data.duration * FPS), props: { ...props, data } }; }} />
      <Composition id="Video-13" component={BaiVideo} fps={FPS} width={1920} height={1080} durationInFrames={FPS * 60}
        defaultProps={{ timeline: null, spec: luongHuuVideo, subtitles: true } satisfies BaiVideoProps}
        calculateMetadata={async ({ props }) => { const timeline = await loadTimeline("13-luong-huu-bhxh"); return { durationInFrames: Math.ceil((timeline.duration + OUTRO_SECONDS) * FPS), props: { ...props, timeline } }; }} />
      <Still id="Thumbnail-13" component={Thumbnail} width={1280} height={720}
        defaultProps={{ image: "13-luong-huu-bhxh/anh/thumbnail.png", big: "RÚT\n140 TRIỆU", small: "BỎ… 2,8 TRIỆU/THÁNG?", bigFontSize: 90, smallFontSize: 32, textWidth: 490 } satisfies ThumbnailProps} />
      <Composition id="Short-13" component={Short13} fps={FPS} width={1080} height={1920} durationInFrames={FPS * 50}
        defaultProps={{ data: null, audio: "13-luong-huu-bhxh/short/short.mp3" } satisfies Short01Props}
        calculateMetadata={async ({ props }) => { const res = await fetch(staticFile("13-luong-huu-bhxh/short/short.json")); if (!res.ok) throw new Error("Chưa có Short-13: chạy build-short.mjs"); const data: ShortData = await res.json(); return { durationInFrames: Math.ceil(data.duration * FPS), props: { ...props, data } }; }} />
      <Still id="Kenh-AnhDaiDien" component={ChannelAvatar} width={800} height={800} />
      <Still id="Kenh-AnhBia" component={ChannelBanner} width={2560} height={1440} />
    </>
  );
};
