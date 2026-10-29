import React,{useMemo} from "react";
import {AbsoluteFill,Audio,Sequence,staticFile} from "remotion";
import {C,sans} from "../theme";
import {BacSauFlat,LedgerInHands} from "./BacSauFlat";
import {Card,Chip,F,Ground,GROUND_Y,useT} from "./flat";
import {Sparkles,WalletArt} from "./Props";
import {cueAt,Subtitles,type Short01Props} from "./Short01";

export const Short08:React.FC<Short01Props>=({data,audio})=>data?<Body data={data} audio={audio}/>:<AbsoluteFill style={{background:F.yellow}}/>;
const Body:React.FC<Short01Props&{data:NonNullable<Short01Props["data"]>}>=({data,audio})=>{
 const t=useT(),{words}=data;
 const T=useMemo(()=>({
  naive:cueAt(words,"Nó tính gọn lắm"),
  assumption:cueAt(words,"Bảo và toàn bộ tiền sinh hoạt"),
  annual:cueAt(words,"Hai chục bốn triệu chia mười hai"),
  saving:cueAt(words,"giờ chỉ còn hai triệu"),
  result:cueAt(words,"Giữ mức góp hai triệu"),
  quote:cueAt(words,"Tiền để dành là phần còn lại"),
 }),[words]);
 const current=words.find(w=>t>=w.start&&t<=w.end);
 const mouth=current?Math.abs(Math.sin((t-current.start)/Math.max(.08,current.end-current.start)*Math.PI)):0;
 const events:[number,string][]=[[0,"pop"],[T.naive,"pop"],[T.annual,"thud"],[T.saving,"pop"],[T.result,"ding"],[T.quote,"ding"]];
 return <AbsoluteFill style={{background:t<T.annual?F.yellow:t<T.quote?F.mint:F.pink,overflow:"hidden",fontFamily:sans,color:C.ink}}>
  <div style={{position:"absolute",top:54,left:72,fontSize:32,fontWeight:800}}>BÁC SÁU SỔ SÁCH</div>
  <div style={{position:"absolute",left:65,right:65,top:110,textAlign:"center",fontSize:27}}>Nhân vật và ngân sách giả định · Không khuyên đầu tư</div>
  {t<T.annual&&<>
   <Card at={0} seed="s8-hook" top={165} fontSize={82}>LƯƠNG 15 TRIỆU<br/><span style={{color:C.red}}>5 NĂM:300 TRIỆU?</span></Card>
   <Chip at={T.naive} seed="s8-naive" top={620} text="PHÉP NHẨM: CẤT 5 TRIỆU/THÁNG" fontSize={43}/>
   <div style={{position:"absolute",top:730,left:80,right:80,fontSize:36,fontWeight:800,textAlign:"center"}}>15 triệu là lương trước khấu trừ</div>
   {t>=T.assumption&&<Chip at={T.assumption} seed="s8-assume" top={820} text="CÒN CÁC KHOẢN CHI CẢ NĂM" fontSize={45}/>}
  </>}
  {t>=T.annual&&t<T.result&&<>
   <Card at={T.annual} seed="s8-year" top={170} fontSize={76}>ĐỪNG QUÊN<br/><span style={{color:C.red}}>24 TRIỆU/NĂM</span><br/><span style={{fontSize:50}}>Trích 2 triệu/tháng · giả định</span></Card>
   <div style={{position:"absolute",top:580,left:90,right:90,fontSize:43,fontWeight:800,lineHeight:1.3,textAlign:"center"}}>Thực nhận 13.425.000đ<br/>− Sinh hoạt 8.900.000đ<br/>− Quỹ năm 2.000.000đ</div>
   {t>=T.saving&&<Chip at={T.saving} seed="s8-saving" top={790} text="GÓP 2.525.000đ/THÁNG" fontSize={48}/>} 
  </>}
  {t>=T.result&&t<T.quote&&<>
   <Card at={T.result} seed="s8-result" top={170} fontSize={75}>2,525 TRIỆU ×60<br/><span style={{fontSize:91,color:C.red}}>151,5 TRIỆU</span><br/><span style={{fontSize:51}}>CHƯA TÍNH LÃI</span></Card>
   <Chip at={T.result+.25} seed="s8-target" top={750} text="KHÁC 300 TRIỆU PHÉP NHẨM" fontSize={43}/>
  </>}
  {t>=T.quote&&<>
   <Card at={T.quote} seed="s8-quote" top={170} fontSize={62}>TIỀN ĐỂ DÀNH LÀ PHẦN CÒN LẠI<br/>SAU MỘT NĂM THẬT,<br/><span style={{color:C.red}}>KHÔNG PHẢI SAU MỘT<br/>THÁNG ĐẸP TRỜI.</span></Card>
   <Chip at={T.quote+.2} seed="s8-cta" top={750} text="▶ XEM VIDEO ĐẦY ĐỦ" fontSize={57} bg={C.red} color={F.card}/>
   <Sparkles at={T.quote+.2} x={540} y={790} r={350}/>
  </>}
  <div style={{position:"absolute",left:50,top:GROUND_Y-560}}><BacSauFlat size={480} pose={t<T.annual?"hold":t<T.quote?"point":"wave"} face={t<T.annual?"squint":t<T.quote?"neutral":"happy"} talking={Boolean(current)} mouthOpen={mouth} holding={<LedgerInHands/>}/></div>
  <svg viewBox="0 0 200 200" width={350} height={350} style={{position:"absolute",right:55,top:GROUND_Y-370}}><WalletArt/></svg>
  <Ground/><Subtitles words={words}/><Audio src={staticFile(audio)}/>
  {events.map(([at,name],i)=><Sequence key={i} from={Math.max(0,Math.round(at*30))} durationInFrames={36} layout="none"><Audio src={staticFile(`_sfx/${name}.wav`)} volume={.35}/></Sequence>)}
 </AbsoluteFill>;
};
