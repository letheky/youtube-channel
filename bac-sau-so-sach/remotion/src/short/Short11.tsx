import React,{useMemo} from "react";
import {AbsoluteFill,Audio,Sequence,staticFile} from "remotion";
import {C,sans} from "../theme";
import {BacSauFlat,LedgerInHands} from "./BacSauFlat";
import {Card,Chip,F,Ground,GROUND_Y,useT} from "./flat";
import {Sparkles,WalletArt} from "./Props";
import {cueAt,Subtitles,type Short01Props} from "./Short01";

export const Short11:React.FC<Short01Props>=({data,audio})=>data?<Body data={data} audio={audio}/>:<AbsoluteFill style={{background:F.yellow}}/>;
const Body:React.FC<Short01Props&{data:NonNullable<Short01Props["data"]>}>=({data,audio})=>{
 const t=useT(),{words}=data;
 const T=useMemo(()=>({cash:cueAt(words,"Chi phí là"),fee:cueAt(words,"Trong đó"),label:cueAt(words,"Còn dòng một phần trăm"),quote:cueAt(words,"Duyệt nhanh một phút")}),[words]);
 const current=words.find(w=>t>=w.start&&t<=w.end);
 const mouth=current?Math.abs(Math.sin((t-current.start)/Math.max(.08,current.end-current.start)*Math.PI)):0;
 const events:[number,string][]=[[0,"pop"],[T.cash,"ding"],[T.fee,"pop"],[T.label,"thud"],[T.quote,"ding"]];
 return <AbsoluteFill style={{background:t<T.cash?F.yellow:t<T.quote?F.mint:F.pink,overflow:"hidden",fontFamily:sans,color:C.ink}}>
  <div style={{position:"absolute",top:54,left:72,fontSize:32,fontWeight:800}}>BÁC SÁU SỔ SÁCH</div>
  <div style={{position:"absolute",top:112,left:60,right:60,fontSize:28,textAlign:"center"}}>Ví dụ 30 ngày · Không phải biểu phí app cụ thể</div>
  {t<T.cash&&<Card at={0} seed="s11-hook" top={195} fontSize={77}>NHẬN <span style={{color:C.red}}>4 TRIỆU</span><br/>TRẢ <span style={{color:C.red}}>5,05 TRIỆU</span><br/><span style={{fontSize:48}}>DÒNG LÃI GHI RIÊNG: 1%?</span></Card>}
  {t>=T.cash&&t<T.label&&<>
   <Card at={T.cash} seed="s11-cash" top={185} fontSize={58}>CHI PHÍ KỲ 30 NGÀY<br/><span style={{color:C.red,fontSize:86}}>1.050.000đ</span><br/><span style={{fontSize:67}}>26,25% THỰC NHẬN</span></Card>
   {t>=T.fee&&<Chip at={T.fee} seed="s11-fee" top={660} text="PHÍ 1 TRIỆU + LÃI 50.000đ" fontSize={46}/>}
   <div style={{position:"absolute",top:815,left:80,right:80,fontSize:31,textAlign:"center"}}>Chi phí = tiền phải trả − tiền thực tới tay</div>
  </>}
  {t>=T.label&&t<T.quote&&<>
   <Card at={T.label} seed="s11-label" top={190} fontSize={66}>1% CHỈ MÔ TẢ<br/><span style={{color:C.red,fontSize:83}}>50.000đ LÃI RIÊNG</span></Card>
   <Chip at={T.label+.3} seed="s11-missing" top={640} text="CHƯA KỂ 1 TRIỆU PHÍ" fontSize={52}/>
   <div style={{position:"absolute",top:805,left:80,right:80,fontSize:32,textAlign:"center"}}>Kiểm cả tiền nhận, khoản phí và ngày phải trả</div>
  </>}
  {t>=T.quote&&<>
   <Card at={T.quote} seed="s11-quote" top={200} fontSize={77}>DUYỆT NHANH MỘT PHÚT.<br/><span style={{color:C.red}}>TRẢ BẰNG TIỀN THẬT.</span></Card>
   <Chip at={T.quote+.2} seed="s11-cta" top={730} text="▶ XEM VIDEO ĐẦY ĐỦ" fontSize={57} bg={C.red} color={F.card}/><Sparkles at={T.quote+.2} x={540} y={750} r={350}/>
  </>}
  <div style={{position:"absolute",left:50,top:GROUND_Y-560}}><BacSauFlat size={480} pose={t<T.cash?"hold":t<T.quote?"point":"wave"} face={t<T.cash?"squint":t<T.quote?"neutral":"happy"} talking={Boolean(current)} mouthOpen={mouth} holding={<LedgerInHands/>}/></div>
  <svg viewBox="0 0 200 200" width={350} height={350} style={{position:"absolute",right:55,top:GROUND_Y-370}}><WalletArt/></svg>
  <Ground/><Subtitles words={words}/><Audio src={staticFile(audio)}/>
  {events.map(([at,name],i)=><Sequence key={i} from={Math.max(0,Math.round(at*30))} durationInFrames={36} layout="none"><Audio src={staticFile(`_sfx/${name}.wav`)} volume={.35}/></Sequence>)}
 </AbsoluteFill>;
};
