import React,{useMemo} from "react";
import {AbsoluteFill,Audio,Sequence,staticFile} from "remotion";
import {C,sans} from "../theme";
import {BacSauFlat,LedgerInHands} from "./BacSauFlat";
import {Card,Chip,F,Ground,GROUND_Y,useT} from "./flat";
import {Sparkles,WalletArt} from "./Props";
import {cueAt,Subtitles,type Short01Props} from "./Short01";

export const Short10:React.FC<Short01Props>=({data,audio})=>data?<Body data={data} audio={audio}/>:<AbsoluteFill style={{background:F.yellow}}/>;
const Body:React.FC<Short01Props&{data:NonNullable<Short01Props["data"]>}>=({data,audio})=>{
 const t=useT(),{words}=data;
 const T=useMemo(()=>({cash:cueAt(words,"Mười lăm triệu bảy trăm bốn chục ngàn"),reserve:cueAt(words,"giữ một triệu cho đồ nghề"),hours:cueAt(words,"Chênh tháng ít vậy"),extra:cueAt(words,"tám mươi bốn giờ"),rate:cueAt(words,"Chia phần sau giữ đồ nghề"),quote:cueAt(words,"Tay nghề nuôi tiệm")}),[words]);
 const current=words.find(w=>t>=w.start&&t<=w.end);
 const mouth=current?Math.abs(Math.sin((t-current.start)/Math.max(.08,current.end-current.start)*Math.PI)):0;
 const events:[number,string][]=[[0,"pop"],[T.cash,"pop"],[T.reserve,"ding"],[T.hours,"thud"],[T.rate,"ding"],[T.quote,"ding"]];
 return <AbsoluteFill style={{background:t<T.hours?F.yellow:t<T.quote?F.mint:F.pink,overflow:"hidden",fontFamily:sans,color:C.ink}}>
  <div style={{position:"absolute",top:54,left:72,fontSize:32,fontWeight:800}}>BÁC SÁU SỔ SÁCH</div>
  <div style={{position:"absolute",top:112,left:65,right:65,fontSize:29,textAlign:"center"}}>Tiệm chú Ba và mốc văn phòng: giả định riêng</div>
  {t<T.cash&&<Card at={0} seed="s10-hook" top={185} fontSize={75}>THU GẦN<br/><span style={{color:C.red}}>2 TRIỆU/NGÀY</span><br/><span style={{fontSize:50}}>TIỀN CÔNG CÒN BAO NHIÊU?</span></Card>}
  {t>=T.cash&&t<T.hours&&<>
   <Card at={T.cash} seed="s10-cash" top={185} fontSize={57}>TIỀN CHỦ TRƯỚC GIỮ ĐỒ NGHỀ<br/><span style={{color:C.red,fontSize:86}}>15,74 TRIỆU/THÁNG</span></Card>
   {t>=T.reserve&&<><Chip at={T.reserve} seed="s10-reserve" top={610} text="GIỮ 1 TRIỆU CHO ĐỒ NGHỀ" fontSize={44}/><div style={{position:"absolute",top:720,left:70,right:70,fontSize:57,fontWeight:800,textAlign:"center"}}>Còn 14,74 triệu có thể rút</div></>}
   <div style={{position:"absolute",top:865,left:80,right:80,fontSize:30,textAlign:"center"}}>Trước sinh hoạt gia đình · có cả công người chủ</div>
  </>}
  {t>=T.hours&&t<T.quote&&<>
   <Card at={T.hours} seed="s10-hours" top={180} fontSize={58}>GIỜ HIỆN DIỆN / THÁNG<br/><span style={{fontSize:76}}>TIỆM 260 · VĂN PHÒNG 176</span></Card>
   {t>=T.extra&&t<T.rate&&<Chip at={T.extra} seed="s10-extra" top={610} text="TIỆM NHIỀU HƠN 84 GIỜ" fontSize={52}/>}
   {t>=T.rate&&<><Chip at={T.rate} seed="s10-rate" top={610} text="SAU GIỮ ĐỒ NGHỀ: ≈57K/GIỜ" fontSize={43}/><div style={{position:"absolute",top:745,left:75,right:75,fontSize:42,fontWeight:800,textAlign:"center"}}>Mốc văn phòng: ≈85K/giờ</div></>}
   <div style={{position:"absolute",top:860,left:80,right:80,fontSize:31,textAlign:"center"}}>Theo bộ số này · Không xếp hạng nghề</div>
  </>}
  {t>=T.quote&&<>
   <Card at={T.quote} seed="s10-quote" top={200} fontSize={77}>TAY NGHỀ NUÔI TIỆM.<br/><span style={{color:C.red}}>SỔ RÕ GIỮ NGHỀ.</span></Card>
   <Chip at={T.quote+.2} seed="s10-cta" top={730} text="▶ XEM VIDEO ĐẦY ĐỦ" fontSize={57} bg={C.red} color={F.card}/><Sparkles at={T.quote+.2} x={540} y={750} r={350}/>
  </>}
  <div style={{position:"absolute",left:50,top:GROUND_Y-560}}><BacSauFlat size={480} pose={t<T.hours?"hold":t<T.quote?"point":"wave"} face={t<T.cash?"squint":t<T.quote?"neutral":"happy"} talking={Boolean(current)} mouthOpen={mouth} holding={<LedgerInHands/>}/></div>
  <svg viewBox="0 0 200 200" width={350} height={350} style={{position:"absolute",right:55,top:GROUND_Y-370}}><WalletArt/></svg>
  <Ground/><Subtitles words={words}/><Audio src={staticFile(audio)}/>
  {events.map(([at,name],i)=><Sequence key={i} from={Math.max(0,Math.round(at*30))} durationInFrames={36} layout="none"><Audio src={staticFile(`_sfx/${name}.wav`)} volume={.35}/></Sequence>)}
 </AbsoluteFill>;
};
