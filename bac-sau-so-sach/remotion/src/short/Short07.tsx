import React,{useMemo} from "react";
import {AbsoluteFill,Audio,Sequence,staticFile} from "remotion";
import {C,sans} from "../theme";
import {BacSauFlat,LedgerInHands} from "./BacSauFlat";
import {Card,Chip,F,Ground,GROUND_Y,useT} from "./flat";
import {Sparkles,WalletArt} from "./Props";
import {cueAt,Subtitles,type Short01Props} from "./Short01";

export const Short07:React.FC<Short01Props>=({data,audio})=>data?<Body data={data} audio={audio}/>:<AbsoluteFill style={{background:F.yellow}}/>;
const Body:React.FC<Short01Props&{data:NonNullable<Short01Props["data"]>}>=({data,audio})=>{
 const t=useT(),{words}=data;
 const T=useMemo(()=>{
  const cashback=cueAt(words,"được hoàn một trăm ngàn");
  const paid=cueAt(words,"chuyển trả một triệu",cashback);
  const interest=cueAt(words,"kỳ sau lại có tiền lãi",paid);
  const hypothetical=cueAt(words,"Út và mọi con số",interest);
  const minimum=cueAt(words,"Khoản tối thiểu là yêu cầu",hypothetical);
  const account=cueAt(words,"Tiền đang nằm trong tài khoản thanh toán",minimum);
  const quote=cueAt(words,"hạn mức là tiền được mượn",account);
  return {cashback,paid,interest,hypothetical,minimum,account,quote};
 },[words]);
 const current=words.find(w=>t>=w.start&&t<=w.end);
 const mouth=current?Math.abs(Math.sin((t-current.start)/Math.max(.08,current.end-current.start)*Math.PI)):0;
 const events:[number,string][]=[[0,"pop"],[T.cashback,"ding"],[T.paid,"pop"],[T.interest,"thud"],[T.minimum,"pop"],[T.quote,"ding"]];
 return <AbsoluteFill style={{background:t<T.minimum?F.yellow:t<T.quote?F.mint:F.pink,overflow:"hidden",fontFamily:sans,color:C.ink}}>
  <div style={{position:"absolute",top:54,left:72,fontSize:32,fontWeight:800}}>BÁC SÁU SỔ SÁCH</div>
  <div style={{position:"absolute",left:65,right:65,top:110,textAlign:"center",fontSize:27}}>Ví dụ giả định · Không khuyên vay nợ</div>
  {t<T.minimum&&<>
   <Card at={0} seed="s7-hook" top={165} fontSize={94}>TRẢ ĐÚNG HẠN<br/><span style={{color:C.red}}>VẪN CÓ LÃI?</span></Card>
   {t>=T.cashback&&<Chip at={T.cashback} seed="s7-cashback" top={610} text="ĐƯỢC HOÀN 100.000đ" fontSize={53}/>}
   {t>=T.paid&&<Chip at={T.paid} seed="s7-paid" top={720} text="TRẢ TỐI THIỂU 1.000.000đ" fontSize={46}/>}
   {t>=T.interest&&<div style={{position:"absolute",top:830,left:80,right:80,fontSize:38,fontWeight:900,color:C.red,textAlign:"center"}}>KỲ SAU VẪN CÓ TIỀN LÃI</div>}
  </>}
  {t>=T.minimum&&t<T.account&&<>
   <Card at={T.minimum} seed="s7-rule" top={170} fontSize={80}>TRẢ TỐI THIỂU<br/><span style={{fontSize:100,color:C.red}}>≠</span><br/>TRẢ ĐỦ ĐỂ MIỄN LÃI</Card>
   <Chip at={T.minimum+.2} seed="s7-condition" top={750} text="ĐỌC ĐÚNG ĐIỀU KIỆN THẺ" fontSize={45}/>
  </>}
  {t>=T.account&&t<T.quote&&<>
   <Card at={T.account} seed="s7-account" top={170} fontSize={75}>TÀI KHOẢN CÓ TIỀN<br/><span style={{fontSize:100,color:C.red}}>≠</span><br/>ĐÃ TRẢ NỢ THẺ</Card>
   <Chip at={T.account+.2} seed="s7-received" top={750} text="KIỂM TIỀN ĐÃ GHI NHẬN" fontSize={46}/>
  </>}
  {t>=T.quote&&<>
   <Card at={T.quote} seed="s7-quote" top={170} fontSize={70}>HẠN MỨC LÀ TIỀN ĐƯỢC MƯỢN,<br/><span style={{color:C.red}}>KHÔNG PHẢI TIỀN ĐÃ KIẾM.</span></Card>
   <Chip at={T.quote+.2} seed="s7-cta" top={750} text="▶ XEM VIDEO ĐẦY ĐỦ" fontSize={57} bg={C.red} color={F.card}/>
   <Sparkles at={T.quote+.2} x={540} y={710} r={350}/>
  </>}
  <div style={{position:"absolute",left:50,top:GROUND_Y-560}}><BacSauFlat size={480} pose={t<T.minimum?"hold":t<T.quote?"point":"wave"} face={t<T.minimum?"squint":t<T.quote?"neutral":"happy"} talking={Boolean(current)} mouthOpen={mouth} holding={<LedgerInHands/>}/></div>
  <svg viewBox="0 0 200 200" width={380} height={380} style={{position:"absolute",right:55,top:GROUND_Y-380}}><rect x={55} y={25} width={105} height={70} rx={9} fill={C.green} stroke={C.ink} strokeWidth={3}/><WalletArt/></svg>
  <Ground/><Subtitles words={words}/><Audio src={staticFile(audio)}/>
  {events.map(([at,name],i)=><Sequence key={i} from={Math.max(0,Math.round(at*30))} durationInFrames={36} layout="none"><Audio src={staticFile(`_sfx/${name}.wav`)} volume={.35}/></Sequence>)}
 </AbsoluteFill>;
};
