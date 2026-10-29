import React,{useMemo} from "react";
import {AbsoluteFill,Audio,Sequence,staticFile} from "remotion";
import {C,sans} from "../theme";
import {BacSauFlat,LedgerInHands} from "./BacSauFlat";
import {Card,Chip,F,Ground,GROUND_Y,useT} from "./flat";
import {Sparkles,WalletArt} from "./Props";
import {cueAt,Subtitles,type Short01Props} from "./Short01";

export const Short13:React.FC<Short01Props>=({data,audio})=>data?<Body data={data} audio={audio}/>:<AbsoluteFill style={{background:F.yellow}}/>;
const Body:React.FC<Short01Props&{data:NonNullable<Short01Props["data"]>}>=({data,audio})=>{
 const t=useT(),{words}=data;
 const T=useMemo(()=>({extra:cueAt(words,"Chọn bảy triệu"),cost:cueAt(words,"Vậy cái giá"),quote:cueAt(words,"Rút thì nhanh một lần")}),[words]);
 const current=words.find(w=>t>=w.start&&t<=w.end);
 const mouth=current?Math.abs(Math.sin((t-current.start)/Math.max(.08,current.end-current.start)*Math.PI)):0;
 const events:[number,string][]=[[0,"pop"],[T.extra,"ding"],[T.cost,"thud"],[T.quote,"ding"]];
 return <AbsoluteFill style={{background:t<T.extra?F.yellow:t<T.quote?F.mint:F.pink,overflow:"hidden",fontFamily:sans,color:C.ink}}>
  <div style={{position:"absolute",top:54,left:72,fontSize:32,fontWeight:800}}>BÁC SÁU SỔ SÁCH</div>
  <div style={{position:"absolute",top:112,left:60,right:60,fontSize:28,textAlign:"center"}}>Anh Tư · Mô phỏng theo bình quân thực 7 triệu</div>
  {t<T.extra&&<Card at={0} seed="s13-hook" top={195} fontSize={76}>RÚT <span style={{color:C.red}}>140 TRIỆU</span><br/>BẰNG <span style={{color:C.red}}>50 THÁNG HƯU</span><br/><span style={{fontSize:46}}>GIẢ ĐỊNH 2,8 TRIỆU / THÁNG</span></Card>}
  {t>=T.extra&&t<T.cost&&<>
   <Card at={T.extra} seed="s13-extra" top={195} fontSize={69}>THÊM 5 NĂM TỰ NGUYỆN<br/><span style={{color:C.red,fontSize:88}}>92,4 TRIỆU</span></Card>
   <Chip at={T.extra+.2} seed="s13-rate" top={650} text="22% × 7 TRIỆU × 60 THÁNG" fontSize={43}/>
   <div style={{position:"absolute",top:760,left:70,right:70,fontSize:26,textAlign:"center"}}>Chưa trừ hỗ trợ · 10 năm cũ được bảo lưu</div>
  </>}
  {t>=T.cost&&t<T.quote&&<>
   <Card at={T.cost} seed="s13-cost" top={190} fontSize={66}>140 + 92,4 = 232,4 TRIỆU<br/><span style={{color:C.red,fontSize:88}}>83 THÁNG HƯU</span><br/><span style={{fontSize:49}}>6 NĂM 11 THÁNG</span></Card>
   <Chip at={T.cost+.2} seed="s13-divide" top={680} text="232,4 TRIỆU ÷ 2,8 TRIỆU" fontSize={46}/>
  </>}
  {t<T.quote&&<div style={{position:"absolute",top:805,left:65,right:65,fontSize:24,textAlign:"center",lineHeight:1.25}}>Giả định sức mua cố định · Bỏ lãi / chiết khấu<br/>Không bảo đảm cho hồ sơ thật sau 27 năm</div>}
  {t>=T.quote&&<>
   <Card at={T.quote} seed="s13-quote" top={200} fontSize={70}>RÚT THÌ NHANH MỘT LẦN.<br/><span style={{color:C.red}}>ĐỂ YÊN THÌ CÒN<br/>ĐƯỜNG CHỌN.</span></Card>
   <Chip at={T.quote+.2} seed="s13-cta" top={730} text="▶ XEM VIDEO ĐẦY ĐỦ" fontSize={57} bg={C.red} color={F.card}/><Sparkles at={T.quote+.2} x={540} y={750} r={350}/>
  </>}
  <div style={{position:"absolute",left:50,top:GROUND_Y-560}}><BacSauFlat size={480} pose={t<T.extra?"hold":t<T.quote?"point":"wave"} face={t<T.extra?"squint":t<T.quote?"neutral":"happy"} talking={Boolean(current)} mouthOpen={mouth} holding={<LedgerInHands/>}/></div>
  <svg viewBox="0 0 200 200" width={350} height={350} style={{position:"absolute",right:55,top:GROUND_Y-370}}><WalletArt/></svg>
  <Ground/><Subtitles words={words}/><Audio src={staticFile(audio)}/>
  {events.map(([at,name],i)=><Sequence key={i} from={Math.max(0,Math.round(at*30))} durationInFrames={36} layout="none"><Audio src={staticFile(`_sfx/${name}.wav`)} volume={.35}/></Sequence>)}
 </AbsoluteFill>;
};
