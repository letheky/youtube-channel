"""Build Remotion props from existing final VSP audio. Never calls synthesis.

Draft video keeps review marking until listening QA is completed separately.
"""
import argparse
import hashlib
import json
import math
import re
import shutil
from pathlib import Path

from kich_ban import load

ROOT = Path(__file__).resolve().parents[1]
SLUG = '01-wifi-khac-goi-mang'
FPS = 30


def token(s):
    return re.sub(r'[^\w]', '', s.casefold())


def locate(words, phrase):
    needle = [token(t) for t in phrase.split()]
    haystack = [token(w['word']) for w in words]
    hits = [i for i in range(len(haystack)-len(needle)+1) if haystack[i:i+len(needle)] == needle]
    if len(hits) != 1:
        raise ValueError(f'Cue must occur once: {phrase!r}; found {len(hits)}')
    return round(words[hits[0]]['start'] * FPS)


def captions(words):
    # Balance long sentences rather than leaving a one-word tail. Keep exact
    # words and their measured boundaries; this does not alter locked audio.
    sentences, sentence = [], []
    for w in words:
        sentence.append(w)
        if re.search(r'[.!?]$', w['word']):
            sentences.append(sentence)
            sentence = []
    if sentence:
        sentences.append(sentence)
    result = []
    for sentence in sentences:
        remaining = sentence
        while remaining:
            text = ' '.join(w['word'] for w in remaining)
            groups = max(1, math.ceil(len(text)/90), math.ceil((remaining[-1]['end']-remaining[0]['start'])/6))
            if groups == 1 or len(remaining) <= 3:
                take = len(remaining)
            else:
                ideal = len(text)/groups
                choices = []
                for n in range(2, len(remaining)-1):
                    prefix = ' '.join(w['word'] for w in remaining[:n])
                    seconds = remaining[n-1]['end']-remaining[0]['start']
                    if len(prefix) > 90 or seconds > 6:
                        break
                    clause_bonus = ideal*.18 if re.search(r'[,;:]$', remaining[n-1]['word']) else 0
                    choices.append((abs(len(prefix)-ideal)-clause_bonus,n))
                take = min(choices)[1] if choices else 1
            group, remaining = remaining[:take], remaining[take:]
            result.append({'text':' '.join(w['word'] for w in group), 'start':group[0]['start'], 'end':group[-1]['end']})
    assert ' '.join(c['text'] for c in result) == ' '.join(w['word'] for w in words)
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--scenes', default='1', help='Comma separated existing scenes, never synthesize missing files')
    args = parser.parse_args()
    selected = [int(n) for n in args.scenes.split(',')]
    if selected != sorted(set(selected)) or not all(1 <= n <= 12 for n in selected):
        raise ValueError('Scene numbers must be unique, ascending and 1–12')
    script = load(ROOT / f'kich-ban/{SLUG}.md')
    plan = (ROOT / f'docs/episodes/{SLUG}-shots.md').read_text(encoding='utf-8')
    anchors = re.findall(r'- Neo “([^”]+)”', plan)
    if len(anchors) != 36:
        raise ValueError('Expected three editorial cue anchors per scene')
    public = ROOT / 'remotion/public/wifi'
    public.mkdir(parents=True, exist_ok=True)
    for name in ('character-sheet-v1.png', 'apartment-v1.png'):
        shutil.copy2(ROOT / f'assets/episodes/01-wifi/{name}', public / name)
    result, audit = [], []
    for n in selected:
        scene = script.scenes[n-1]
        audio = ROOT / f'videos/{SLUG}/giong/{scene.slug}.mp3'
        data = json.loads(audio.with_suffix('.json').read_text(encoding='utf-8'))
        words = data['words']
        if data['text'] != scene.narration or [w['word'] for w in words] != scene.narration.split():
            raise ValueError(f'{scene.slug}: existing audio transcript differs from script')
        if any(not 0 <= w['start'] < w['end'] <= data['duration']+.08 for w in words):
            raise ValueError(f'{scene.slug}: invalid word timing')
        if any(a['end'] > b['start']+.002 for a,b in zip(words,words[1:])):
            raise ValueError(f'{scene.slug}: overlapping word timings')
        beats = [locate(words, a) for a in anchors[3*(n-1):3*n]]
        beats[0] = 0  # Establish scene immediately; later transitions stay anchored to real words.
        if beats != sorted(beats):
            raise ValueError(f'{scene.slug}: beat order differs from narration')
        cues = {}
        if n == 1:
            cues = {'bedroom': locate(words, 'Vô phòng ngủ'), 'loading': locate(words, 'hình cứ đứng lại')}
        if n == 3:
            for key, phrase in {'service':'sáu trăm', 'wifi':'hai mươi', 'upgrade':'chín trăm', 'percent':'năm mươi phần trăm'}.items():
                # "hai mươi" is intentionally repeated; choose first only for initial display.
                if key == 'wifi':
                    first = next(i for i in range(len(words)-1) if [token(w['word']) for w in words[i:i+2]] == ['hai','mươi'])
                    cues[key] = round(words[first]['start'] * FPS)
                else:
                    cues[key] = locate(words, phrase)
        if n == 12:
            for i, phrase in enumerate(['so ở gần và xa', 'kiểm vị trí và vật cản', 'xem băng tần', 'rồi mới cân nhắc']):
                cues[f'recap{i}'] = locate(words, phrase)
        shutil.copy2(audio, public / audio.name)
        result.append({'scene': n, 'audio': f'wifi/{audio.name}', 'durationInFrames': math.ceil(data['duration']*FPS), 'captions': captions(words), 'beatFrames': beats, 'cueFrames': cues})
        audit.append({'scene': n, 'audio_sha256': hashlib.sha256(audio.read_bytes()).hexdigest(), 'duration': data['duration'], 'words': len(words), 'beat_frames': beats, 'cue_frames': cues})
    out = ROOT / 'remotion/out'
    out.mkdir(parents=True, exist_ok=True)
    suffix = '-'.join(map(str, selected))
    target = out / f'wifi-review-scenes-{suffix}.json'
    target.write_text(json.dumps({'scenes': result, 'review': True}, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    target.with_suffix('.audit.json').write_text(json.dumps({'listened': False, 'release_ready': False, 'scenes': audit}, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    def srt_time(t):
        ms=round(t*1000)
        h,ms=divmod(ms,3600000); m,ms=divmod(ms,60000); s,ms=divmod(ms,1000)
        return f'{h:02d}:{m:02d}:{s:02d},{ms:03d}'
    rows,offset=[],0
    for scene in result:
        for cap in scene['captions']:
            rows.append(f"{len(rows)+1}\n{srt_time(offset+cap['start'])} --> {srt_time(offset+cap['end'])}\n{cap['text']}\n")
        offset+=scene['durationInFrames']/FPS
    target.with_suffix('.srt').write_text('\n'.join(rows),encoding='utf-8')
    print(f'Built {len(result)} scenes from existing audio: {target}; listening QA still required')


if __name__ == '__main__':
    main()
