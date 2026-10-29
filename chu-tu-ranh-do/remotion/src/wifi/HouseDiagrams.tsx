import React from 'react';
import {theme as C} from '../theme';

export const RouterIcon: React.FC<{x: number; y: number; scale?: number}> = ({x,y,scale=1}) => <g transform={`translate(${x} ${y}) scale(${scale})`} fill="white" stroke={C.teal} strokeWidth="4"><path d="M12 0V-30 M82 0V-30" strokeLinecap="round"/><rect x="0" y="0" width="95" height="43" rx="8"/><path d="M16 23h6 M32 23h6 M48 23h6"/></g>;

export const FloorPlan: React.FC<{alternative?: boolean; title: string}> = ({alternative=false,title}) => <svg width="600" height="390" viewBox="0 0 600 390" style={{fontFamily:C.font}}>
  <text x="300" y="35" textAnchor="middle" fill={C.ink} fontSize="29" fontWeight="700">{title}</text>
  <rect x="25" y="65" width="550" height="260" rx="14" fill="white" stroke={C.ink} strokeWidth="6"/>
  <path d={alternative?'M315 65V155 M315 225V325':'M275 65V155 M275 225V325'} stroke={C.ink} strokeWidth="10"/>
  <rect x={alternative?350:200} y="96" width="40" height="115" rx="5" fill="#dce5e5" stroke={C.muted} strokeWidth="3"/>
  <text x={alternative?370:220} y="238" textAnchor="middle" fill={C.muted} fontSize="21">Tủ</text>
  <rect x={alternative?70:355} y="255" width="135" height="43" rx="9" fill="#e4f1ef" stroke={C.line} strokeWidth="2"/>
  <RouterIcon x={alternative?195:70} y={150} scale={.8}/>
  <rect x="473" y="150" width="35" height="66" rx="6" fill="#fff0c5" stroke={C.amber} strokeWidth="4"/>
  <text x="125" y="300" textAnchor="middle" fill={C.muted} fontSize="20">Phòng A</text>
  <text x="455" y="300" textAnchor="middle" fill={C.muted} fontSize="20">Phòng B</text>
  <text x="300" y="367" textAnchor="middle" fill={C.muted} fontSize="21">Sơ đồ minh họa · không đo vùng phủ</text>
</svg>;

export const Placement: React.FC = () => <svg width="1240" height="410" viewBox="0 0 1240 410" style={{fontFamily:C.font}}>
  <rect x="10" y="15" width="560" height="370" rx="25" fill="white" stroke={C.line} strokeWidth="3"/>
  <rect x="660" y="15" width="560" height="370" rx="25" fill="white" stroke={C.amber} strokeWidth="3"/>
  <text x="290" y="72" textAnchor="middle" fill={C.ink} fontSize="30" fontWeight="700">Bị nhét trong góc tủ?</text>
  <rect x="135" y="100" width="310" height="235" rx="8" fill="#d8dfe3" stroke={C.muted} strokeWidth="5"/>
  <path d="M155 210h270" stroke={C.muted} strokeWidth="5"/>
  <RouterIcon x={243} y={163} scale={1.1}/>
  <text x="940" y="72" textAnchor="middle" fill={C.ink} fontSize="30" fontWeight="700">Thử một chỗ thoáng trên kệ</text>
  <path d="M755 230h370 M780 230v100 M1100 230v100" stroke={C.muted} strokeWidth="10" strokeLinecap="round"/>
  <RouterIcon x={890} y={180} scale={1.2}/>
  <path d="M1003 207h62v116" stroke={C.teal} strokeWidth="5" fill="none"/>
  <text x="940" y="365" textAnchor="middle" fill={C.muted} fontSize="23">Dây đi gọn, không băng lối đi</text>
</svg>;
