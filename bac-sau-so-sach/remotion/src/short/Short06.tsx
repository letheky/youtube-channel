import React, {useMemo} from "react";
import {AbsoluteFill,Audio,Sequence,staticFile} from "remotion";
import {C,sans} from "../theme";
import {BacSauFlat,LedgerInHands} from "./BacSauFlat";
import {Card,Chip,F,Ground,GROUND_Y,useT} from "./flat";
import {Sparkles} from "./Props";
import {cueAt,Subtitles,type Short01Props} from "./Short01";

export const Short06:React.FC<Short01Props>=({data,audio})=>data?<Body data={data} audio={audio}/>:<AbsoluteFill style={{background:F.yellow}}/>;
const Basket=()=> <svg viewBox="0 0 240 230" width={390} height={390} style={{position:"absolute",right:65,top:GROUND_Y-390}}>
  <path d="M55 108 Q120-35 185 108" fill="none" stroke={C.ink} strokeWidth="23"/>
  <path d="M55 108 Q120-35 185 108" fill="none" stroke={C.gold} strokeWidth="14"/>
  <ellipse cx="80" cy="98" rx="25" ry="51" fill={C.green} transform="rotate(-25 80 98)" stroke={C.ink} strokeWidth="6"/>
  <ellipse cx="139" cy="85" rx="26" ry="53" fill={C.green} transform="rotate(18 139 85)" stroke={C.ink} strokeWidth="6"/>
  <circle cx="172" cy="111" r="30" fill={C.red} stroke={C.ink} strokeWidth="6"/>
  <path d="M25 120 L47 210 Q120 235 193 210 L215 120Z" fill={C.gold} stroke={C.ink} strokeWidth="7" strokeLinejoin="round"/>
  {[70,110,150,190].map(x=><path key={x} d={`M${x} 128 L${x-8} 216`} stroke={C.ink} strokeWidth="4" opacity=".4"/>)}
  <path d="M34 153H205 M40 180H200" stroke={C.ink} strokeWidth="4" opacity=".4"/>
</svg>;
const Body:React.FC<Short01Props&{data:NonNullable<Short01Props["data"]>}>=({data,audio})=>{
  const t=useT(),{words}=data;
  const T=useMemo(()=>{
    const price=cueAt(words,"Nếu giá tăng bốn phần trăm");
    const keep=cueAt(words,"Nghĩa là cần giữ lại",price);
    const interest=cueAt(words,"Lãi năm mươi bốn triệu",keep);
    const spend=cueAt(words,"còn mười bốn triệu",interest);
    const average=cueAt(words,"Chia đều thì khoảng",spend);
    const quote=cueAt(words,"Tiền đủ nghỉ bao lâu",average);
    return {price,keep,interest,spend,average,quote};
  },[words]);
  const current=words.find(w=>t>=w.start&&t<=w.end);
  const mouth=current?Math.abs(Math.sin((t-current.start)/Math.max(.08,current.end-current.start)*Math.PI)):0;
  const events:[number,string][]=[[0,"pop"],[T.price,"pop"],[T.keep,"thud"],[T.spend,"thud"],[T.average,"pop"],[T.quote,"ding"]];
  return <AbsoluteFill style={{background:t<T.price?F.yellow:t<T.average?F.mint:t<T.quote?F.pink:F.yellow,overflow:"hidden",fontFamily:sans,color:C.ink}}>
    <div style={{position:"absolute",top:54,left:72,fontSize:32,fontWeight:800}}>BÁC SÁU SỔ SÁCH</div>
    <div style={{position:"absolute",left:65,right:65,top:110,textAlign:"center",fontSize:26}}>Ví dụ giả định · Không khuyên đầu tư</div>
    {t<T.price&&<>
      <Card at={0} seed="s6-hook" top={165} fontSize={96}>1 TỶ TIỀN GỬI<br/><span style={{color:C.red}}>NGHỈ HƯU?</span></Card>
      <Chip at={.3} seed="s6-gross" top={625} text="LÃI BÌNH QUÂN 4,5 TRIỆU/THÁNG" fontSize={43}/>
      <div style={{position:"absolute",top:750,left:80,right:80,textAlign:"center",fontSize:32,lineHeight:1.4}}>Lãi 5,4%/năm · nhận cuối kỳ.<br/>Chia 12 không phải trả lãi mỗi tháng.</div>
    </>}
    {t>=T.price&&t<T.average&&<>
      <Card at={T.price} seed="s6-price" top={170} fontSize={88}>GIÁ TĂNG 4%/NĂM<br/><span style={{fontSize:61}}>GIẢ ĐỊNH RIÊNG</span></Card>
      {t<T.keep&&<Chip at={T.price+.2} seed="s6-principal" top={630} text="GỐC CẦN THÀNH 1,04 TỶ" fontSize={48}/>}
      {t>=T.keep&&<>
        <Chip at={T.keep} seed="s6-keep" top={610} text="GIỮ LẠI 40 TRIỆU BÙ SỨC MUA" fontSize={43}/>
        {t>=T.interest&&<div style={{position:"absolute",top:750,left:85,right:85,textAlign:"center",fontWeight:900,fontSize:74}}>54 − 40 = <span style={{color:C.red}}>14 TRIỆU</span></div>}
      </>}
    </>}
    {t>=T.average&&t<T.quote&&<>
      <Card at={T.average} seed="s6-average" top={170} fontSize={97}>≈1,17 TRIỆU<br/><span style={{fontSize:65}}>MỖI THÁNG</span></Card>
      <Chip at={T.average+.2} seed="s6-average-note" top={620} text="BÌNH QUÂN · TIỀN CUỐI NĂM" fontSize={46}/>
      <div style={{position:"absolute",top:750,left:80,right:80,fontSize:33,textAlign:"center",lineHeight:1.4}}>Sau khi bù sức mua gốc.<br/>Giữ lãi 5,4% và giá tăng 4% là giả định.</div>
    </>}
    {t>=T.quote&&<>
      <Card at={T.quote} seed="s6-quote" top={170} fontSize={75}>TIỀN ĐỦ NGHỈ BAO LÂU,<br/><span style={{color:C.red}}>PHẢI TÍNH BẰNG SỨC MUA.</span></Card>
      <Chip at={T.quote+.2} seed="s6-cta" top={750} text="▶ XEM VIDEO ĐẦY ĐỦ" fontSize={57} bg={C.red} color={F.card}/>
      <Sparkles at={T.quote+.2} x={540} y={710} r={350}/>
    </>}
    <div style={{position:"absolute",left:50,top:GROUND_Y-585}}><BacSauFlat size={480} pose={t<T.price?"hold":t<T.quote?"point":"wave"} face={t<T.price?"squint":t<T.quote?"neutral":"happy"} talking={Boolean(current)} mouthOpen={mouth} holding={<LedgerInHands/>}/></div>
    <Basket/><Ground/><Subtitles words={words}/><Audio src={staticFile(audio)}/>
    {events.map(([at,name],i)=><Sequence key={i} from={Math.max(0,Math.round(at*30))} durationInFrames={36} layout="none"><Audio src={staticFile(`_sfx/${name}.wav`)} volume={.35}/></Sequence>)}
  </AbsoluteFill>;
};
