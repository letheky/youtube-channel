"""Render local brand video masters; no uploads, no third-party audio fetches."""
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / 'work'
WORK.mkdir(parents=True, exist_ok=True)
OUT = ROOT / 'assets' / 'motion'
OUT.mkdir(parents=True, exist_ok=True)

def run(args):
    subprocess.run(args, check=True)

def textfile(name, text):
    p = WORK / name
    p.write_text(text, encoding='utf-8')
    return str(p).replace('\\', '/').replace(':', r'\:')

font = r'C\:/Windows/Fonts/arial.ttf'
bold = r'C\:/Windows/Fonts/arialbd.ttf'
serif = r'C\:/Windows/Fonts/georgia.ttf'

intro = OUT / 'intro-3s-master-silent.mp4'
if '--outro-only' not in sys.argv:
    run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-loop', '1', '-framerate', '30',
     '-i', str(ROOT / 'assets/branding/banner-dau-vet-2560x1440.png'),
     '-vf', "scale=1920:1080,zoompan=z='1+0.025*on/95':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1920x1080:fps=30,fade=t=in:st=0:d=0.25,fade=t=out:st=2.85:d=0.35,format=yuv420p",
     '-t', '3.2', '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '18', '-movflags', '+faststart', str(intro)])

vi_title_a = textfile('outro-title-vi-a.txt', 'DẤU VẾT')
vi_title_b = textfile('outro-title-vi-b.txt', 'THỜI ĐẠI')
en_title = textfile('outro-title-en.txt', 'TRACES OF TIME')
next_text = textfile('outro-next.txt', 'KHÁM PHÁ TIẾP · KEEP EXPLORING')
subscribe = textfile('outro-subscribe.txt', 'ĐĂNG KÝ · SUBSCRIBE')
label_a = textfile('outro-label-a.txt', 'CÂU CHUYỆN TIẾP THEO · NEXT STORY')
label_b = textfile('outro-label-b.txt', 'CÙNG CHỦ ĐỀ · RELATED STORY')

vf = (
    '[0:v]drawgrid=w=120:h=120:t=1:c=0xC7A15A@0.05[bg];'
    '[1:v]scale=280:280,format=rgba[logo];'
    '[bg][logo]overlay=130:150,'
    f"drawtext=fontfile='{bold}':textfile='{vi_title_a}':fontsize=53:fontcolor=0xE5C483:x=128:y=475,"
    f"drawtext=fontfile='{bold}':textfile='{vi_title_b}':fontsize=53:fontcolor=0xE5C483:x=128:y=555,"
    f"drawtext=fontfile='{bold}':textfile='{en_title}':fontsize=23:fontcolor=0xC8A96C:x=132:y=657,"
    "drawbox=x=130:y=720:w=350:h=2:c=0xB9914E@0.6:t=fill,"
    f"drawtext=fontfile='{font}':textfile='{subscribe}':fontsize=24:fontcolor=0xDBD6CD:x=130:y=759,"
    f"drawtext=fontfile='{bold}':textfile='{next_text}':fontsize=29:fontcolor=0xE5C483:x=720:y=197,"
    "drawbox=x=720:y=300:w=520:h=293:c=0xC4A468@0.75:t=2,"
    "drawbox=x=1280:y=300:w=520:h=293:c=0xC4A468@0.75:t=2,"
    f"drawtext=fontfile='{font}':textfile='{label_a}':fontsize=18:fontcolor=0xB8BCC4:x=738:y=620,"
    f"drawtext=fontfile='{font}':textfile='{label_b}':fontsize=18:fontcolor=0xB8BCC4:x=1300:y=620,"
    "fade=t=in:st=0:d=0.4,fade=t=out:st=11.4:d=0.6,format=yuv420p[v]"
)
outro = OUT / 'outro-12s-master-silent.mp4'
run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y',
     '-f', 'lavfi', '-i', 'color=c=0x071222:s=1920x1080:r=30:d=12',
     '-loop', '1', '-framerate', '30', '-i', str(ROOT / 'assets/branding/avatar-dau-vet.png'),
     '-filter_complex', vf, '-map', '[v]', '-t', '12', '-an',
     '-c:v', 'libx264', '-preset', 'fast', '-crf', '18', '-movflags', '+faststart', str(outro)])

for clip in ((outro,) if '--outro-only' in sys.argv else (intro, outro)):
    run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-ss', '1.5', '-i', str(clip),
         '-frames:v', '1', str(WORK / (clip.stem + '-preview.jpg'))])
    run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-i', str(clip), '-f', 'null', '-'])
    meta = subprocess.check_output(['ffprobe', '-v', 'error', '-show_format', '-show_streams', '-of', 'json', str(clip)], text=True)
    (WORK / (clip.stem + '-probe.json')).write_text(meta, encoding='utf-8')
    print(clip)
