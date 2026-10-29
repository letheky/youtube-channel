import React, { useMemo } from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { C, sans } from "../theme";
import { BacSauFlat, LedgerInHands } from "./BacSauFlat";
import { Card, Chip, F, Ground, GROUND_Y, useT } from "./flat";
import { ShopArt, Sparkles } from "./Props";
import { cueAt, Subtitles, type Short01Props } from "./Short01";

export const Short05: React.FC<Short01Props> = ({data,audio}) => data ? <Body data={data} audio={audio}/> : <AbsoluteFill style={{background:F.yellow}}/>;
const Body: React.FC<Short01Props & {data:NonNullable<Short01Props["data"]>}> = ({data,audio}) => {
  const t=useT();const {words}=data;
  const T=useMemo(()=>{
    const initial=cueAt(words,"Cô Bảy trong câu chuyện");
    const setup=cueAt(words,"Ba khoản này cộng lại",initial);
    const lease=cueAt(words,"Ví dụ cô Bảy chỉ có",setup);
    const recovery=cueAt(words,"Trong khi mô phỏng",lease);
    const condition=cueAt(words,"Điều kiện là còn được thuê",recovery);
    const quote=cueAt(words,"Đừng chỉ đếm bàn kín",condition);
    return {initial,setup,lease,recovery,condition,quote};
  },[words]);
  const current=words.find(w=>t>=w.start&&t<=w.end);
  const mouth=current?Math.abs(Math.sin((t-current.start)/Math.max(.08,current.end-current.start)*Math.PI)):0;
  const events:[number,string][]=[[0,"pop"],[T.initial,"pop"],[T.setup,"pop"],[T.lease,"thud"],[T.recovery,"thud"],[T.quote,"ding"]];
  return <AbsoluteFill style={{background:t<T.initial?F.yellow:t<T.lease?F.mint:t<T.quote?F.pink:F.yellow,overflow:"hidden",fontFamily:sans,color:C.ink}}>
    <div style={{position:"absolute",top:54,left:72,fontSize:32,fontWeight:800}}>BÁC SÁU SỔ SÁCH</div>
    {t<T.initial&&<>
      <Card at={0} seed="s5-hook" top={160} fontSize={91}>QUÁN ĐÔNG…<br/><span style={{color:C.red}}>VẪN MUỐN SANG?</span></Card>
      <Chip at={.5} seed="s5-capital-question" top={620} text="TIỀN LÀM QUÁN VỀ CHƯA?" fontSize={49}/>
    </>}
    {t>=T.initial&&t<T.lease&&<>
      <Card at={T.initial} seed="s5-initial" top={160} fontSize={100}>420 TRIỆU<br/><span style={{fontSize:65}}>ĐỂ BẮT ĐẦU</span></Card>
      {t<T.setup&&<Chip at={T.initial+.3} seed="s5-separate" top={620} text="VỐN · CỌC · DỰ PHÒNG" fontSize={50}/>}
      {t>=T.setup&&<>
        <Chip at={T.setup} seed="s5-setup" top={605} text="300 TRIỆU CẦN THU HỒI" fontSize={49} bg={C.green} color={F.card}/>
        <div style={{position:"absolute",top:738,left:90,right:90,fontSize:31,textAlign:"center",lineHeight:1.45}}>Cải tạo + máy móc + bàn ghế.<br/>Cọc 60 triệu và dự phòng 60 triệu theo dõi riêng.</div>
      </>}
    </>}
    {t>=T.lease&&t<T.quote&&<>
      <Card at={T.lease} seed="s5-lease" top={155} fontSize={101}>24 THÁNG<br/><span style={{fontSize:63}}>THUÊ CHẮC CHẮN</span></Card>
      {t>=T.recovery&&<>
        <Chip at={T.recovery} seed="s5-recovery" top={620} text="THÁNG 32 MỚI ĐỦ 300 TRIỆU" fontSize={46} bg={C.red} color={F.card}/>
        <div style={{position:"absolute",top:755,left:100,right:100,textAlign:"center",fontSize:35,fontWeight:800,lineHeight:1.4}}>Nếu được thuê tiếp cùng giá<br/>và giữ nguyên dòng tiền giả định.</div>
      </>}
    </>}
    {t>=T.quote&&<>
      <Card at={T.quote} seed="s5-quote" top={150} fontSize={72}>ĐỪNG CHỈ ĐẾM BÀN KÍN.<br/><span style={{color:C.red}}>HÃY ĐẾM THÁNG LẤY LẠI TIỀN.</span></Card>
      <Chip at={T.quote+.2} seed="s5-cta" top={760} text="▶ XEM VIDEO ĐẦY ĐỦ" fontSize={57} bg={C.red} color={F.card}/>
      <Sparkles at={T.quote+.2} x={540} y={720} r={350}/>
    </>}
    <div style={{position:"absolute",left:50,top:GROUND_Y-585}}><BacSauFlat size={480} pose={t<T.initial?"hold":t<T.quote?"point":"wave"} face={t<T.initial?"squint":t<T.quote?"neutral":"happy"} talking={Boolean(current)} mouthOpen={mouth} holding={<LedgerInHands/>}/></div>
    <svg viewBox="0 0 200 200" width={400} height={400} style={{position:"absolute",right:80,top:GROUND_Y-400}}><ShopArt/></svg>
    <Ground/>
    <div style={{position:"absolute",left:80,right:80,top:112,textAlign:"center",fontSize:26,lineHeight:1.2}}>Ví dụ giả định · Không khuyên đầu tư</div>
    <Subtitles words={words}/><Audio src={staticFile(audio)}/>
    {events.map(([at,name],i)=><Sequence key={i} from={Math.max(0,Math.round(at*30))} durationInFrames={36} layout="none"><Audio src={staticFile(`_sfx/${name}.wav`)} volume={.35}/></Sequence>)}
  </AbsoluteFill>;
};
