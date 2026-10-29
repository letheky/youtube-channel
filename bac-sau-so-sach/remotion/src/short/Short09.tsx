import React,{useMemo} from "react";
import {AbsoluteFill,Audio,Sequence,staticFile} from "remotion";
import {C,sans} from "../theme";
import {BacSauFlat,LedgerInHands} from "./BacSauFlat";
import {Card,Chip,F,Ground,GROUND_Y,useT} from "./flat";
import {Sparkles,WalletArt} from "./Props";
import {cueAt,Subtitles,type Short01Props} from "./Short01";

export const Short09:React.FC<Short01Props>=({data,audio})=>data?<Body data={data} audio={audio}/>:<AbsoluteFill style={{background:F.yellow}}/>;
const Body:React.FC<Short01Props&{data:NonNullable<Short01Props["data"]>}>=({data,audio})=>{
 const t=useT(),{words}=data;
 const T=useMemo(()=>({equal:cueAt(words,"Cùng tiền ban đầu"),both:cueAt(words,"Cả hai đều được để dành"),change:cueAt(words,"Bác đổi riêng tăng giá nhà"),result:cueAt(words,"Tổng phía mua lúc này"),quote:cueAt(words,"Mua hay thuê, đừng so mỗi tiền nhà")}),[words]);
 const current=words.find(w=>t>=w.start&&t<=w.end);
 const mouth=current?Math.abs(Math.sin((t-current.start)/Math.max(.08,current.end-current.start)*Math.PI)):0;
 const events:[number,string][]=[[0,"pop"],[T.equal,"pop"],[T.both,"ding"],[T.change,"thud"],[T.result,"ding"],[T.quote,"ding"]];
 return <AbsoluteFill style={{background:t<T.change?F.yellow:t<T.quote?F.mint:F.pink,overflow:"hidden",fontFamily:sans,color:C.ink}}>
  <div style={{position:"absolute",top:54,left:72,fontSize:32,fontWeight:800}}>BÁC SÁU SỔ SÁCH</div>
  <div style={{position:"absolute",top:110,left:60,right:60,fontSize:27,textAlign:"center"}}>Hiếu–Thảo và bộ số giả định · Không khuyên đầu tư</div>
  {t<T.change&&<>
   <Card at={0} seed="s9-hook" top={170} fontSize={80}>THUÊ NHÀ<br/><span style={{color:C.red}}>LÀ MẤT TRẮNG?</span></Card>
   {t>=T.equal&&<><Chip at={T.equal} seed="s9-equal" top={570} text="CÙNG VỐN · CÙNG TIỀN THÁNG" fontSize={43}/><div style={{position:"absolute",top:675,left:75,right:75,fontSize:39,fontWeight:800,textAlign:"center"}}>1,26 tỷ ban đầu · 25 triệu/tháng<br/>cho nhà ở và tích lũy</div></>}
   {t>=T.both&&<Chip at={T.both} seed="s9-both" top={790} text="CẢ HAI ĐỀU TÍCH LŨY PHẦN DƯ" fontSize={41}/>}
  </>}
  {t>=T.change&&t<T.quote&&<>
   <Card at={T.change} seed="s9-change" top={175} fontSize={60}>CHỈ ĐỔI TĂNG GIÁ NHÀ<br/><span style={{color:C.red,fontSize:95}}>3% → 5%/NĂM</span><br/><span style={{fontSize:46}}>Giữ các giả định khác · 20 năm</span></Card>
   <div style={{position:"absolute",top:570,left:80,right:80,fontSize:41,fontWeight:800,textAlign:"center",lineHeight:1.35}}>Vẫn dự trù thanh lý 3%<br/>và tài khoản mua như cũ</div>
   {t>=T.result&&<Chip at={T.result} seed="s9-result" top={740} text="MUA ≈10,390 TỶ > THUÊ ≈8,929 TỶ" fontSize={38}/>}
   <div style={{position:"absolute",top:850,left:80,right:80,fontSize:32,textAlign:"center"}}>Không dự báo · Kết luận theo mô hình</div>
  </>}
  {t>=T.quote&&<>
   <Card at={T.quote} seed="s9-quote" top={185} fontSize={68}>MUA HAY THUÊ,<br/>ĐỪNG SO MỖI TIỀN NHÀ;<br/><span style={{color:C.red}}>HÃY SO CẢ<br/>ĐƯỜNG ĐI CỦA TIỀN.</span></Card>
   <Chip at={T.quote+.2} seed="s9-cta" top={790} text="▶ XEM VIDEO ĐẦY ĐỦ" fontSize={57} bg={C.red} color={F.card}/>
   <Sparkles at={T.quote+.2} x={540} y={810} r={350}/>
  </>}
  <div style={{position:"absolute",left:50,top:GROUND_Y-560}}><BacSauFlat size={480} pose={t<T.change?"hold":t<T.quote?"point":"wave"} face={t<T.change?"squint":t<T.quote?"neutral":"happy"} talking={Boolean(current)} mouthOpen={mouth} holding={<LedgerInHands/>}/></div>
  <svg viewBox="0 0 200 200" width={350} height={350} style={{position:"absolute",right:55,top:GROUND_Y-370}}><WalletArt/></svg>
  <Ground/><Subtitles words={words}/><Audio src={staticFile(audio)}/>
  {events.map(([at,name],i)=><Sequence key={i} from={Math.max(0,Math.round(at*30))} durationInFrames={36} layout="none"><Audio src={staticFile(`_sfx/${name}.wav`)} volume={.35}/></Sequence>)}
 </AbsoluteFill>;
};
