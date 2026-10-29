import React, { useMemo } from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { C, sans } from "../theme";
import { BacSauFlat, LedgerInHands } from "./BacSauFlat";
import { Card, Chip, F, Ground, GROUND_Y, useT } from "./flat";
import { Sparkles } from "./Props";
import { cueAt, Subtitles, type Short01Props } from "./Short01";

// Anh Tư: tóc đen ngắn, áo khoác xanh trơn và khẩu trang dưới cằm.
const AnhTuFlat: React.FC = () => <svg viewBox="0 0 400 550" width={350} height={482}>
  <path d="M133 352 L114 530 H190 L203 407 L217 530 H292 L270 352Z" fill={C.inkSoft} stroke={C.ink} strokeWidth={7}/>
  <path d="M139 276 Q94 284 77 408 L120 421 L141 345 L131 462 H280 L270 345 L293 421 L334 403 Q312 282 267 276Z" fill={C.green} stroke={C.ink} strokeWidth={7}/>
  <path d="M174 272 L164 460 H244 L229 272Z" fill={C.paper} stroke={C.ink} strokeWidth={5}/>
  <path d="M171 235 L170 283 Q202 306 235 281 L233 233Z" fill={C.skin} stroke={C.ink} strokeWidth={6}/>
  <ellipse cx={201} cy={157} rx={97} ry={115} fill={C.skin} stroke={C.ink} strokeWidth={7}/>
  <path d="M103 167 Q72 85 127 66 L110 45 L168 49 L180 25 L214 44 L261 32 L254 59 Q309 65 300 147 L277 122 L267 91 L228 113 L228 80 L181 116 L188 81 L145 121 L131 157 L125 185Z" fill={C.hair} stroke={C.ink} strokeWidth={7}/>
  <path d="M137 158 Q157 144 177 154 M224 154 Q245 141 264 155" fill="none" stroke={C.ink} strokeWidth={7} strokeLinecap="round"/>
  <ellipse cx={157} cy={184} rx={11} ry={15} fill={C.ink}/><ellipse cx={244} cy={184} rx={11} ry={15} fill={C.ink}/>
  <path d="M187 231 Q204 242 223 229 M203 194 L198 211 L208 214" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round"/>
  <path d="M111 195 L137 261 M289 194 L264 261" fill="none" stroke={C.rule} strokeWidth={5}/>
  <path d="M135 246 Q201 280 266 245 L255 277 Q204 300 146 278Z" fill={C.rule} stroke={C.ink} strokeWidth={5}/>
</svg>;

export const Short04: React.FC<Short01Props> = ({data,audio}) => data ? <Body data={data} audio={audio}/> : <AbsoluteFill style={{background:F.yellow}}/>;

const Body: React.FC<Short01Props & {data:NonNullable<Short01Props["data"]>}> = ({data,audio}) => {
  const t=useT(); const {words}=data;
  const T=useMemo(()=>{
    const stop=cueAt(words,"Khoan"); const gross=cueAt(words,"Khách trả sáu trăm",stop);
    const app=cueAt(words,"Ứng dụng giữ",gross); const fuel=cueAt(words,"Cây xăng lấy",app);
    const vehicle=cueAt(words,"Chiếc xe ăn",fuel); const misc=cueAt(words,"Lặt vặt",vehicle);
    const net=cueAt(words,"Còn lại",misc); const hourly=cueAt(words,"Vậy là con chạy",net);
    const quote=cueAt(words,"Màn hình hiện doanh thu",hourly);
    return {stop,gross,app,fuel,vehicle,misc,net,hourly,quote};
  },[words]);
  const current=words.find(w=>t>=w.start&&t<=w.end);
  const mouth=current?Math.abs(Math.sin((t-current.start)/Math.max(.08,current.end-current.start)*Math.PI)):0;
  const costs:[[number,string],[number,string],[number,string],[number,string]]=[
    [T.app,"Ứng dụng: −250.000đ"],[T.fuel,"Xăng: −108.000đ"],
    [T.vehicle,"Xe: −37.000đ"],[T.misc,"Lặt vặt: −30.000đ"],
  ];
  const events:[number,string][]=[[0,"pop"],[T.stop,"thud"],...costs.map(([at])=>[at,"pop"] as [number,string]),[T.net,"thud"],[T.quote,"ding"]];
  return <AbsoluteFill style={{background:t<T.stop?F.yellow:t<T.gross?F.pink:t<T.hourly?F.mint:F.yellow,overflow:"hidden",fontFamily:sans,color:C.ink}}>
    <div style={{position:"absolute",top:54,left:72,fontSize:32,fontWeight:800}}>BÁC SÁU SỔ SÁCH</div>
    {t<T.stop&&<>
      <Card at={0} seed="s4-hook" top={160} fontSize={104}>660.000đ<br/><span style={{color:C.red}}>MỖI NGÀY?</span></Card>
      <Chip at={.5} seed="s4-hours" top={590} text="CHẠY 12 TIẾNG…" fontSize={62}/>
    </>}
    {t>=T.stop&&t<T.gross&&<>
      <Card at={T.stop} seed="s4-stop" top={205} fontSize={150}><span style={{color:C.red}}>KHOAN!</span></Card>
      <Chip at={T.stop+.2} seed="s4-ledger" top={600} text="Đưa sổ đây Bác coi!" fontSize={57}/>
    </>}
    {t>=T.gross&&t<T.hourly&&<>
      <Card at={T.gross} seed="s4-gross" top={145} fontSize={75}>KHÁCH TRẢ: 660.000đ</Card>
      {costs.map(([at,text],i)=><Chip key={text} at={at} seed={`s4-cost-${i}`} top={450+i*110} text={text} fontSize={51} bg={F.card} color={C.red}/>)}
      {t>=T.net&&<Chip at={T.net} seed="s4-net" top={905} text="CÒN ≈ 235.000đ" fontSize={62} bg={C.green} color={F.card}/>}
      <div style={{position:"absolute",top:1080,right:65,width:490,textAlign:"center",fontSize:29,lineHeight:1.5}}>Ví dụ một ngày của anh Tư.<br/>Phí, xăng, xe đều đã làm tròn.<br/>Khấu trừ gồm phí/thuế.</div>
    </>}
    {t>=T.hourly&&t<T.quote&&<>
      <Card at={T.hourly} seed="s4-hourly" top={170} fontSize={103}>12 TIẾNG<br/><span style={{color:C.red}}>CHƯA TỚI<br/>20.000đ/GIỜ</span></Card>
      <Chip at={T.hourly+.3} seed="s4-assumption" top={740} text="VÍ DỤ · KHÔNG ĐẠI DIỆN TOÀN NGHỀ" fontSize={34}/>
    </>}
    {t>=T.quote&&<>
      <Card at={T.quote} seed="s4-quote" top={150} fontSize={74}>MÀN HÌNH HIỆN DOANH THU.<br/><span style={{color:C.red}}>CUỐN SỔ MỚI HIỆN THU NHẬP.</span></Card>
      <Chip at={T.quote+.2} seed="s4-cta" top={680} text="▶ XEM VIDEO ĐẦY ĐỦ" fontSize={57} bg={C.red} color={F.card}/>
      <Sparkles at={T.quote+.2} x={540} y={650} r={350}/>
    </>}
    <div style={{position:"absolute",left:45,top:GROUND_Y-(t>=T.gross&&t<T.hourly?420:600)}}><BacSauFlat size={t>=T.gross&&t<T.hourly?330:480} pose={t<T.stop?"hold":t<T.gross?"stop":t<T.quote?"point":"wave"} face={t<T.stop?"squint":t<T.quote?"neutral":"happy"} talking={Boolean(current)} mouthOpen={mouth} holding={<LedgerInHands/>}/></div>
    {(t<T.gross||t>=T.hourly)&&<div style={{position:"absolute",right:75,top:GROUND_Y-482}}><AnhTuFlat/></div>}
    <Ground/><Subtitles words={words}/><Audio src={staticFile(audio)}/>
    {events.map(([at,name],i)=><Sequence key={i} from={Math.max(0,Math.round(at*30))} durationInFrames={36} layout="none"><Audio src={staticFile(`_sfx/${name}.wav`)} volume={.35}/></Sequence>)}
  </AbsoluteFill>;
};
