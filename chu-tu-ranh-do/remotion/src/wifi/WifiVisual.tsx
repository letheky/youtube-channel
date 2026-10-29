import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {theme as C} from '../theme';
import {FloorPlan,Placement} from './HouseDiagrams';

const panel: React.CSSProperties = {borderRadius: 26, border: `3px solid ${C.line}`, padding: 28, background: C.panel, boxSizing: 'border-box'};
const card: React.CSSProperties = {...panel, textAlign: 'center', fontSize: 34, fontWeight: 700};
const small: React.CSSProperties = {fontSize: 28, color: C.muted, lineHeight: 1.45};
const tag: React.CSSProperties = {fontSize: 25, fontWeight: 700, color: C.teal, letterSpacing: 1};
export const pill = (text: string, amber = false) => <div style={{padding: '14px 24px', borderRadius: 16, background: amber ? '#fff0c5' : '#e4f1ef', color: amber ? '#825600' : C.teal, fontSize: 28, fontWeight: 700, textAlign: 'center'}}>{text}</div>;

export const Character: React.FC<{pose: number}> = ({pose}) => <div style={{position: 'absolute', left: -45, top: 200, width: 640, height: 640, overflow: 'hidden', transform: 'scale(0.9)', transformOrigin: 'top left'}}>
  <Img src={staticFile('wifi/character-sheet-v1.png')} style={{position: 'absolute', width: 1280, height: 1280, maxWidth: 'none', left: -(pose % 2) * 640, top: -Math.floor(pose / 2) * 640}} />
</div>;

const Node: React.FC<{x: number; y: number; title: string; icon: string; accent?: boolean}> = ({x,y,title,icon,accent}) => <g transform={`translate(${x},${y})`}>
  <rect width="280" height="175" rx="25" fill={accent ? '#fff0c5' : 'white'} stroke={accent ? C.amber : C.line} strokeWidth="4"/>
  <text x="140" y="75" textAnchor="middle" fill={C.teal} fontSize="44" fontWeight="700">{icon}</text>
  <text x="140" y="132" textAnchor="middle" fill={C.ink} fontSize="29" fontWeight="700">{title}</text>
</g>;

const Network: React.FC<{mesh?: boolean; wired?: boolean}> = ({mesh=false,wired=false}) => <svg width="1240" height="350" viewBox="0 0 1240 350">
  <defs><marker id="arrow" markerWidth="12" markerHeight="12" refX="9" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10" fill="none" stroke={C.teal} strokeWidth="2"/></marker></defs>
  <path d="M290 137H458" fill="none" stroke={C.teal} strokeWidth="6" markerEnd="url(#arrow)" strokeDasharray={mesh ? '13 9' : undefined}/>
  <path d="M760 137H928" fill="none" stroke={C.teal} strokeWidth="6" markerEnd="url(#arrow)" strokeDasharray={mesh ? '13 9' : undefined}/>
  <Node x={10} y={50} title={mesh ? 'Router gốc' : 'Internet'} icon={mesh ? '⌂' : '◎'}/>
  <Node x={475} y={50} title={mesh ? 'Điểm mở rộng' : 'Router'} icon="⌁" accent/>
  <Node x={945} y={50} title={wired ? 'Máy tính' : 'Điện thoại'} icon={wired ? '▣' : '▯'}/>
  <text x="380" y="285" textAnchor="middle" fill={C.muted} fontSize="26">{mesh ? 'Đường nối giữa các điểm' : 'Đường nhà mạng'}</text>
  <text x="850" y="285" textAnchor="middle" fill={C.muted} fontSize="26">{wired ? 'Ethernet khi phù hợp' : 'Wi-Fi trong nhà'}</text>
</svg>;

export const WifiVisual: React.FC<{scene: number; beat: number; markers?: Record<string, boolean>}> = ({scene,beat,markers}) => {
  const frame = useCurrentFrame();
  const known = (key: string) => markers ? Boolean(markers[key]) : true;
  if (scene === 1 && beat === 2) return <div><Network/><div style={{...panel, ...small}}>Tách từng chặng: đổi chỗ, đổi cách nối hay nhờ nhà mạng kiểm tra?</div></div>;
  if (scene === 4 && beat > 0) return <div>
    <div style={{display:'flex',gap:24}}><FloorPlan title="Cách bố trí A"/><FloorPlan title="Cách bố trí B" alternative/></div>
    <div style={{...panel,...small,marginTop:15}}>{beat===1?'Vị trí tủ, vật cản và chỗ đặt cục phát đều cần được xem xét.':'Cùng diện tích không bảo đảm cùng vùng phủ. Không có số tốc độ được suy ra từ bản vẽ.'}</div>
  </div>;
  if (scene === 8) return <div>
    {beat===0?<><Placement/><div style={{...small,marginTop:20}}>Chỉ đổi vị trí khi dây và nguồn cho phép; không kéo dây ngang lối đi.</div></>:beat===1?<><div style={{display:'flex',alignItems:'center',gap:30}}><FloorPlan title="Kiểm những chỗ mình thường dùng"/><div style={{...panel,...small,width:570}}>Trung tâm trên bản vẽ chưa chắc là chỗ tốt nhất trong nhà thật.<br/><br/>So lại kết nối sau mỗi thay đổi.</div></div></>:<><div style={{display:'flex',alignItems:'center',gap:22,marginTop:65}}>{['Đổi một yếu tố','So lại','Ghi nhận'].map((s,i)=><React.Fragment key={s}>{i>0&&<div style={{fontSize:60,color:C.teal}}>→</div>}<div style={{...card,width:350,minHeight:200,display:'flex',alignItems:'center',justifyContent:'center'}}>{s}</div></React.Fragment>)}</div><div style={{...small,marginTop:42}}>Có khá hơn không? Ghi nhận rồi mới tính bước tiếp.</div></>}
  </div>;
  if ([1,4,8].includes(scene)) return <div>
    <div style={{position: 'relative', width: 1240, height: 485, borderRadius: 24, overflow: 'hidden', border: `2px solid ${C.line}`}}>
      <Img src={staticFile('wifi/apartment-v1.png')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1 + Math.min(frame, 150) / 15000})`}}/>
      <div style={{position: 'absolute', top: 18, left: 24, right: 24, display: 'flex', justifyContent: 'space-between'}}>{pill(scene === 8 ? 'Vị trí thoáng, dây và nguồn phù hợp' : 'Phòng khách')}{pill(scene === 4 ? 'Vật cản và bố trí khác nhau' : 'Phòng ngủ', true)}</div>
      {scene === 1 && <div style={{position: 'absolute', left: known('bedroom') ? 716 : 512, top: known('bedroom') ? 178 : 141, width: known('bedroom') ? 100 : 130, height: known('bedroom') ? 100 : 130, border: `6px solid ${C.amber}`, boxSizing: 'border-box', borderRadius: '50%', boxShadow: '0 0 0 5px #ffffffbb'}}/>}
      {scene === 1 && known('loading') && <div style={{position: 'absolute', left: 825, top: 203, width: 38, height: 38, border: `6px solid ${C.line}`, borderTopColor: C.teal, borderRadius: '50%', transform: `rotate(${frame*6}deg)`}}/>}
      <div style={{position: 'absolute', bottom: 15, left: 20, background: '#ffffffec', borderRadius: 12, padding: '10px 16px', fontSize: 22, color: C.muted}}>Minh họa bố trí · không phải đo vùng phủ</div>
    </div>
    {scene === 1 && beat === 1 ? <div style={{...small, marginTop: 14}}>Nâng gói? Có sóng mà chậm? Đặt điểm mở rộng ở đâu?</div> : null}
    {scene === 4 && beat > 0 ? <div style={{...small, marginTop: 14}}>Khoảng cách · tường · kim loại · cách bố trí</div> : null}
    {scene === 8 ? <div style={{...small, marginTop: 14}}>{beat === 0 ? 'Chỉ đổi vị trí khi dây và nguồn cho phép; giữ lối đi gọn.' : beat === 1 ? 'Vị trí trên bản vẽ chưa bảo đảm kết quả trong nhà thật.' : 'Đổi một yếu tố → so lại → ghi nhận'}</div> : null}
  </div>;
  if (scene === 2 || scene === 9 || scene === 10) return <div>
    <Network mesh={scene === 9} wired={scene === 10}/>
    {scene === 9 && beat === 2 ? <div style={{display: 'flex', gap: 16}}>{['Mesh', 'Bộ lặp', 'Điểm truy cập dùng dây'].map(t => <div key={t} style={{...card, flex: 1, fontSize: 28}}>{t}</div>)}</div> : <div style={{...panel, ...small}}>{scene === 2 ? (beat === 0 ? 'Một kết nối đi qua nhiều chặng.' : beat === 1 ? 'Gói cước và Wi-Fi tới từng phòng cần được phân biệt.' : 'Kiểm từng chặng trước khi kết luận bên nào có lỗi.') : scene === 9 ? 'Một hộp mới cũng cần nhận được kết nối đủ tốt để phát tiếp.' : 'Xem cổng, dây và cách bố trí; không tạo chỗ vấp.'}</div>}
    {scene === 9 && beat === 2 ? <div style={{...small, marginTop: 24}}>Xem tài liệu đúng model, cách nối và điều kiện nhà mình.</div> : null}
  </div>;
  if (scene === 3) return <div>
    {pill('VÍ DỤ GIẢ ĐỊNH · KHÔNG PHẢI SỐ ĐO', true)}
    <div style={{display: 'flex', gap: 25, alignItems: 'center', marginTop: 38}}>
      <div style={{...card, width: 470, minHeight: 245}}><div style={tag}>CHẶNG ĐẦU</div><div style={{fontSize: 91, marginTop: 24}}>{known('upgrade') ? '900' : known('service') ? '600' : '—'}</div><div style={small}>Mbps</div></div>
      <div style={{fontSize: 70, color: C.teal}}>→</div>
      <div style={{...card, width: 470, minHeight: 245, borderColor: C.amber}}><div style={tag}>CHẶNG WI-FI</div><div style={{fontSize: 91, marginTop: 24}}>{known('wifi') ? '20' : '—'}</div><div style={small}>Mbps</div></div>
    </div>
    <div style={{marginTop: 28, ...small}}>{beat < 2 ? (known('percent') ? 'Chặng đầu tăng 50%; chặng hẹp phía sau vẫn còn.' : 'Mở rộng chặng đầu chưa chắc sửa được chặng sau.') : 'Mô hình cổ chai đơn giản, bỏ qua hao hụt và điều kiện khác.'}</div>
  </div>;
  if (scene === 5) return <div>
    <div style={{display: 'flex', gap: 28, marginTop: 30}}>{['2,4 GHz', '5 GHz'].map((s,i) => <div key={s} style={{...card, flex: 1, padding: 48, background: i ? '#fff0c5' : '#e4f1ef'}}><div style={{fontSize: 76}}>{s}</div><div style={{...small, marginTop: 28}}>Một dải tần Wi-Fi</div></div>)}</div>
    <div style={{...panel, marginTop: 28, ...small}}>{beat === 0 ? 'Không phải tên gói cước hoặc mạng di động 5G.' : beat === 1 ? 'Khoảng cách, vật cản và thiết bị làm thay đổi kết quả.' : 'Nếu thiết bị hỗ trợ: so các lựa chọn sẵn có, giữ đúng cấu hình vùng.'}</div>
  </div>;
  if (scene === 6) return <div>
    <div style={{display: 'flex', gap: 28, alignItems: 'center', marginTop: 30}}><div style={{...card, width: 410}}><div style={{display: 'flex', gap: 14, alignItems: 'flex-end', justifyContent: 'center', height: 160}}>{[48,80,112,144].map(h => <div key={h} style={{height: h, width: 47, background: C.teal, borderRadius: 8}}/>)}</div><div style={{marginTop: 25}}>Mức tín hiệu</div></div><div style={{fontSize: 88, color: C.amber}}>≠</div><div style={{...card, flex: 1, minHeight: 275, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Toàn bộ câu chuyện<br/>về tốc độ</div></div>
    <div style={{...panel, ...small, marginTop: 28}}>{beat === 0 ? 'Có vạch sóng chưa chứng minh đường truyền đang rảnh.' : beat === 1 ? 'Nhiễu và trao đổi vô tuyến có thể làm chậm kết nối.' : 'Một app? Một máy? Hay cả mạng? Kiểm thêm trước khi kết luận.'}</div>
  </div>;
  if (scene === 7) return <div>
    <div style={{display: 'flex', gap: 25}}>{['GẦN ROUTER', 'PHÒNG HAY CHẬM'].map((s,i) => <div key={s} style={{...card, flex: 1, minHeight: 230, background: i ? '#fff0c5' : 'white'}}><div style={tag}>{s}</div><div style={{fontSize: 43, marginTop: 34}}>Người xem tự kiểm</div><div style={{...small, marginTop: 18}}>Không có số đo sẵn</div></div>)}</div>
    <div style={{...panel, ...small, marginTop: 28}}>{beat === 0 ? 'Cùng thiết bị · cùng công cụ · điều kiện tương tự' : beat === 1 ? 'Gần ổn, xa kém: chú ý chặng không dây. Gần cũng kém: kiểm thêm.' : 'So thêm máy khác; một lần đo chưa xác định được mọi nguyên nhân.'}</div>
  </div>;
  if (scene === 11) return <div>
    <div style={{display: 'flex', gap: 24}}>{['ĐÚNG MODEL', 'GHI CẤU HÌNH', 'GIỮ BẢO MẬT'].map((s,i) => <div key={s} style={{...card, flex: 1, minHeight: 260, borderColor: beat === i ? C.amber : C.line}}><div style={{fontSize: 79, color: C.teal, marginBottom: 28, height: 92}}>{i === 2 ? <svg width="76" height="86" viewBox="0 0 76 86" fill="none" stroke={C.teal} strokeWidth="7"><path d="M20 35V22a18 18 0 0 1 36 0v13"/><rect x="9" y="35" width="58" height="43" rx="8"/><path d="M38 50v14"/></svg> : ['▤','✎'][i]}</div>{s}</div>)}</div>
    <div style={{...small, marginTop: 30}}>Chỉ chỉnh mạng mình có quyền quản lý. Không tắt mật khẩu hoặc bỏ mã hóa để sửa chậm.</div>
  </div>;
  const items = ['So gần và xa bằng cùng thiết bị', 'Kiểm vị trí và vật cản', 'Xem băng tần, thiết bị, môi trường', 'Cân nhắc đường dây hoặc mở rộng'];
  return <div>
    {items.map((s,i) => <div key={s} style={{...panel, padding: '18px 26px', marginBottom: 15, fontSize: 32, fontWeight: 700, opacity: beat === 0 ? .38 : markers && !known(`recap${i}`) ? .3 : 1, display: 'flex', gap: 25, alignItems: 'center'}}><span style={{color: C.teal, fontSize: 35}}>{i+1}.</span>{s}</div>)}
    <div style={small}>{beat === 2 ? 'Mỗi nhà có thể có nguyên nhân khác nhau. Kiểm đúng chặng.' : 'Gói mạng và Wi-Fi từng phòng có liên quan, nhưng không phải một con số.'}</div>
  </div>;
};
