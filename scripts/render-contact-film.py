#!/usr/bin/env python3
"""Rebuild the original Contact film (36s, 1600×900, H.264/AAC).

Requires ffmpeg and Python pillow, numpy, fonttools, brotli.
Uses only this repository's brand/images/fonts and an original synthesized score.
No third-party reference footage or audio is included in the output.
Usage: python scripts/render-contact-film.py [--stills]
"""
import math
import subprocess
import sys
import tempfile
import wave
from functools import lru_cache
from pathlib import Path

import numpy as np
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/videos'
OUT.mkdir(parents=True, exist_ok=True)
WORK = Path(tempfile.mkdtemp(prefix='academy-film-'))
W, H, FPS, DURATION = 1600, 900, 30, 36
NAVY, GOLD, WHITE, PAPER = '#081626', '#e6b03a', '#fffaf0', '#f7f3eb'
TIMES = [0, 4.8, 10.8, 18, 24, 30, 36]

for weight in ['Bold', 'SemiBold', 'Regular']:
    font = TTFont(ROOT / f'public/fonts/entreprises/Poppins-{weight}.woff2')
    font.flavor = None
    font.save(WORK / f'{weight}.ttf')


def ease(t):
    return 1 - (1 - max(0, min(1, t))) ** 3


@lru_cache(maxsize=160)
def font(size, weight='Bold'):
    return ImageFont.truetype(str(WORK / f'{weight}.ttf'), size)


@lru_cache(maxsize=250)
def text_layer(value, size, color=WHITE, weight='Bold'):
    f = font(size, weight)
    bounds = f.getbbox(value)
    im = Image.new('RGBA', (int(f.getlength(value)) + 8, bounds[3] - bounds[1] + 12))
    ImageDraw.Draw(im).text((4, 5 - bounds[1]), value, font=f, fill=color)
    return im


def put(im, layer, x, y, alpha=1):
    if alpha <= 0:
        return
    if alpha < .995:
        layer = layer.copy()
        layer.putalpha(layer.getchannel('A').point(lambda a: int(a * alpha)))
    im.paste(layer, (int(x), int(y)), layer)


def title(im, value, size, x, y, u, delay=0, color=WHITE, center=False, weight='Bold'):
    p = ease((u - delay) / .65)
    layer = text_layer(value, size, color, weight)
    put(im, layer, x - layer.width / 2 if center else x, y + (1 - p) * 60, p)


@lru_cache(maxsize=50)
def panel(width, height, color=WHITE, radius=30, shadow=True):
    pad = 40
    im = Image.new('RGBA', (width + pad * 2, height + pad * 2))
    if shadow:
        sh = Image.new('RGBA', im.size)
        ImageDraw.Draw(sh).rounded_rectangle((pad, pad+10, pad+width, pad+height+10), radius, fill=(0, 0, 0, 35))
        im = sh.filter(ImageFilter.GaussianBlur(16))
    ImageDraw.Draw(im).rounded_rectangle((pad, pad, pad+width, pad+height), radius, fill=color)
    return im


def card(im, layer, x, y, u, delay=0, float_phase=0):
    p = ease((u - delay) / .65)
    put(im, layer, x - 40, y - 40 + (1-p)*90 + math.sin(u*1.5 + float_phase)*4, p)


def photo(path, size, radius=24):
    im = ImageOps.fit(Image.open(ROOT/'public/images'/path).convert('RGB'), size, method=Image.Resampling.LANCZOS)
    im = im.convert('RGBA')
    mask = Image.new('L', size)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius, fill=255)
    im.putalpha(mask)
    return im


def background(a, b):
    a, b = np.array(a), np.array(b)
    yy, xx = np.mgrid[0:H, 0:W]
    v = np.clip(1 - np.sqrt(((xx-W*.7)/W)**2+((yy-H*.2)/H)**2), 0, 1)[..., None]
    return Image.fromarray(np.uint8(a + (b-a)*v)).convert('RGBA')


BACKS = [background((6, 17, 30), (19, 43, 62)), background((222, 158, 36), (246, 205, 111)), background((242, 236, 225), (255, 253, 247))]
logo = Image.open(ROOT/'public/images/logo.png').convert('RGBA')
logo = ImageOps.contain(logo, (238, 72), Image.Resampling.LANCZOS)


def chrome(im, scene, u, t):
    # Fixed brand anchor and very subtle geometric motion.
    dark = scene in [0, 3]
    d = ImageDraw.Draw(im)
    line = (39, 64, 83, 255) if dark else (202, 155, 64, 120) if scene in [1, 5] else (229, 220, 204, 255)
    cx, cy = (1240, 340) if scene != 5 else (800, 435)
    for r in [180, 360, 550, 780]:
        rr = r + math.sin(t*.35)*15
        d.ellipse((cx-rr, cy-rr, cx+rr, cy+rr), outline=line, width=2)
    if dark:
        put(im, logo, 74, 48)
    else:
        d.rounded_rectangle((60, 35, 331, 129), 22, fill=NAVY)
        put(im, logo, 76, 46)
    # Continuous timeline, small enough not to compete with native player controls.
    d.rounded_rectangle((75, 861, 1525, 864), 2, fill=(255,255,255,35) if dark else (8,22,38,25))
    d.rounded_rectangle((75, 861, 75 + 1450*t/DURATION, 864), 2, fill=GOLD if dark else NAVY)


questions = []
for i, (label, detail) in enumerate([
    ('Quelle formation ?', 'Un métier qui vous correspond.'),
    ('Quel financement ?', 'Des possibilités à étudier ensemble.'),
    ('Par où commencer ?', 'Un premier échange, tout simplement.'),
]):
    p = panel(540, 133).copy()
    dd = ImageDraw.Draw(p)
    dd.ellipse((62, 66, 110, 114), fill=GOLD)
    put(p, text_layer('?', 30, NAVY), 76, 72)
    put(p, text_layer(label, 26, NAVY), 128, 61)
    put(p, text_layer(detail, 17, '#56616b', 'Regular'), 128, 110)
    questions.append(p)

steps = []
for i, (heading, line1, line2) in enumerate([
    ('Votre projet', 'Vos envies.', 'Votre situation.'),
    ('Votre formation', 'Le bon parcours.', 'Les prochaines sessions.'),
    ('Votre financement', 'Les possibilités selon', 'votre situation.'),
]):
    p = panel(434, 276).copy()
    dd = ImageDraw.Draw(p)
    dd.ellipse((69, 68, 131, 130), fill=NAVY)
    put(p, text_layer(f'0{i+1}', 23, GOLD), 82, 87)
    put(p, text_layer(heading, 29, NAVY), 70, 162)
    put(p, text_layer(line1, 21, '#5c6570', 'Regular'), 70, 225)
    put(p, text_layer(line2, 21, '#5c6570', 'Regular'), 70, 263)
    steps.append(p)

training = []
for label, desc, name, color in [
    ('APS', 'Sécurité privée', 'aps-mission-surveillance.webp', '#4e8ae0'),
    ('A3P', 'Protection rapprochée', 'a3p-competence-proteger.webp', '#59a784'),
    ('SSIAP', 'Sécurité incendie', 'ssiap-1-mission-ensemble.webp', '#de7265'),
    ('VTC', 'Transport de personnes', 'vtc-parcours.webp', '#a489d1'),
    ('BTS', 'En alternance', 'bts-mco-parcours.webp', '#e6b03a'),
]:
    p = panel(268, 387, '#132b40').copy()
    put(p, photo('formation-scenes-manuel/'+name, (244, 238), 20), 52, 52)
    put(p, text_layer(label, 34, WHITE), 63, 311)
    put(p, text_layer(desc, 15, '#d3dde5', 'Regular'), 63, 369)
    ImageDraw.Draw(p).rounded_rectangle((64, 398, 121, 402), 2, fill=color)
    training.append(p)

campus = photo('campus/campus-accueil.jpg', (616, 529), 28)
photo_card = panel(644, 624).copy()
put(photo_card, campus, 54, 54)
put(photo_card, text_layer('Bienvenue à Intégrale Academy.', 21, NAVY), 70, 612)


def scene_frame(scene, u, t):
    im = BACKS[0 if scene in [0,3] else 1 if scene in [1,5] else 2].copy()
    chrome(im, scene, u, t)
    if scene == 0:
        title(im, 'Votre projet.', 102, 76, 277, u, .05)
        title(im, 'Parlons-en.', 108, 76, 407, u, .27, GOLD)
        title(im, 'Le premier pas vers votre futur métier.', 24, 80, 568, u, .6, '#c8d3db', weight='Regular')
        for i,p in enumerate(questions):
            card(im, p, 964-i*28, 245+i*153, u, .4+i*.28, i)
    elif scene == 1:
        title(im, 'Ne restez pas', 109, W/2, 265, u, .05, NAVY, True)
        title(im, 'avec vos questions.', 109, W/2, 397, u, .24, NAVY, True)
        title(im, 'Notre équipe vous accompagne.', 35, W/2, 566, u, .65, NAVY, True, 'Regular')
        # Three dots become one continuous path, a visual answer to the questions.
        d=ImageDraw.Draw(im)
        p=ease((u-1)/1)
        d.line((626, 670, 626+348*p, 670), fill='#af791e', width=2)
        for x in [626,800,974]: d.ellipse((x-8,662,x+8,678),fill=NAVY)
    elif scene == 2:
        title(im, 'Un échange.', 73, 80, 202, u, 0, NAVY)
        title(im, 'Un parcours qui se précise.', 69, 80, 297, u, .18, NAVY)
        for i,p in enumerate(steps): card(im, p, 80+i*501, 454, u, .55+i*.33, i)
        title(im, 'On avance ensemble, étape par étape.', 24, 80, 790, u, 1.7, '#646b72', weight='Regular')
    elif scene == 3:
        title(im, 'Un métier à votre mesure.', 75, 80, 202, u)
        title(im, 'Construisons le parcours qui vous correspond.', 27, 82, 313, u, .2, '#c8d3db', weight='Regular')
        for i,p in enumerate(training): card(im, p, 80+i*293, 410, u, .45+i*.16, i)
    elif scene == 4:
        title(im, 'Des personnes.', 68, 78, 227, u, 0, NAVY)
        title(im, 'Pas seulement', 68, 78, 318, u, .17, NAVY)
        title(im, 'un formulaire.', 68, 78, 409, u, .34, '#99701f')
        title(im, 'Une équipe à votre écoute,', 27, 80, 538, u, .65, '#5e6770', weight='Regular')
        title(im, 'dès le premier échange.', 27, 80, 584, u, .78, '#5e6770', weight='Regular')
        title(im, '04 22 47 07 68', 43, 80, 692, u, 1.05, NAVY)
        card(im, photo_card, 878, 171, u, .2, 1)
    else:
        title(im, 'Faites le', 113, W/2, 230, u, .08, NAVY, True)
        title(im, 'premier pas.', 119, W/2, 370, u, .27, NAVY, True)
        title(im, '04 22 47 07 68', 45, W/2, 553, u, .55, NAVY, True)
        title(im, 'Premier échange gratuit et sans engagement.', 25, W/2, 636, u, .9, NAVY, True, 'Regular')
        title(im, 'INTÉGRALE ACADEMY', 18, W/2, 785, u, 1.2, NAVY, True, 'SemiBold')
    return im


def frame(t):
    scene=max(i for i in range(6) if t>=TIMES[i])
    u=t-TIMES[scene]
    im=scene_frame(scene,u,t)
    # Short eased lateral reveal between chapters, without flashing frames.
    if scene>0 and u<.32:
        prev=scene_frame(scene-1,TIMES[scene]-TIMES[scene-1],t)
        edge=int(ease(u/.32)*W)
        prev.paste(im.crop((0,0,edge,H)),(0,0))
        im=prev
    return im.convert('RGB')


def soundtrack(path):
    """Original warm electric-piano / soft pulse score, no voice or sampled audio."""
    sr=48000
    n=sr*DURATION
    mix=np.zeros((n,2),dtype=np.float64)
    rng=np.random.default_rng(321)
    def add(start, value, gain=1, pan=0):
        offset=int(start*sr)
        count=min(len(value),n-offset)
        if count<=0:return
        mix[offset:offset+count,0]+=value[:count]*gain*math.sqrt((1-pan)/2)
        mix[offset:offset+count,1]+=value[:count]*gain*math.sqrt((1+pan)/2)
    def note(midi,length=2.5):
        ts=np.arange(int(sr*length))/sr
        f=440*2**((midi-69)/12)
        envelope=(1-np.exp(-ts*140))*np.exp(-ts*2.5)
        return envelope*(np.sin(2*np.pi*f*ts)+.24*np.sin(2*np.pi*f*2*ts)*np.exp(-ts*2)+.07*np.sin(2*np.pi*f*4*ts))*0.18
    chords=[[57,60,64,67],[53,57,60,64],[48,55,59,64],[55,59,62,69]]
    for bar in range(15):
        start=bar*2.4
        chord=chords[bar%4]
        for j,midi in enumerate(chord): add(start+.018*j,note(midi,3),.28,(-.4+.25*j))
        for step,idx in enumerate([0,2,1,3,2,1,3,2]):
            beat=start+step*.3
            add(beat,note(chord[idx]+12,1.6),.34,math.sin(step)*.4)
            add(beat+.225,note(chord[idx]+12,1.4),.055,-math.sin(step)*.4)
        tt=np.arange(int(sr*2.4))/sr
        bass=np.sin(2*np.pi*440*2**((chord[0]-24-69)/12)*tt)*(1-np.exp(-tt*25))*np.exp(-tt*1.8)
        add(start,bass,.08)
    for b in range(60):
        ts=np.arange(int(sr*.22))/sr
        kick=np.sin(2*np.pi*(48*ts+10*(1-np.exp(-ts*22))))*np.exp(-ts*24)*(1-np.exp(-ts*250))
        add(b*.6,kick,.085)
        if b%2:
            noise=rng.standard_normal(len(ts))
            noise=np.concatenate([[0],np.diff(noise)])*np.exp(-ts*45)
            add(b*.6,noise,.009,.12)
        hat_t=np.arange(int(sr*.06))/sr
        hat=rng.standard_normal(len(hat_t))*np.exp(-hat_t*100)
        add(b*.6+.3,hat,.008,-.2)
    fade=np.minimum(1,np.arange(n)/(sr*.8))*np.minimum(1,(n-np.arange(n))/(sr*1.6))
    mix*=fade[:,None]
    mix*=.7/max(.01,abs(mix).max())
    with wave.open(str(path),'wb') as wav:
        wav.setnchannels(2);wav.setsampwidth(2);wav.setframerate(sr)
        wav.writeframes((np.clip(mix,-1,1)*32767).astype('<i2').tobytes())


if __name__=='__main__':
    frame(2.5).save(OUT/'contact-integrale-academy-poster.webp',quality=90)
    sheet=Image.new('RGB',(1200,1014),PAPER)
    for i,t in enumerate([2.5,7.5,14.5,21.5,27,33]):
        still=frame(t)
        still.save(WORK/f'scene-{i+1}.png')
        sheet.paste(still.resize((600,337),Image.Resampling.LANCZOS),((i%2)*600,(i//2)*338))
    sheet.save(WORK/'contact-sheet.jpg',quality=95)
    print(f'QA frames: {WORK}',flush=True)
    if '--stills' in sys.argv: sys.exit(0)
    soundtrack(WORK/'score.wav')
    cmd=['ffmpeg','-hide_banner','-loglevel','error','-y','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-', '-i',str(WORK/'score.wav'),'-c:v','libx264','-preset','fast','-crf','23','-pix_fmt','yuv420p','-c:a','aac','-b:a','128k','-movflags','+faststart','-t',str(DURATION),str(OUT/'contact-integrale-academy-v1.mp4')]
    p=subprocess.Popen(cmd,stdin=subprocess.PIPE)
    for i in range(DURATION*FPS):
        p.stdin.write(frame(i/FPS).tobytes())
        if i%(FPS*6)==0: print(f'Rendered {i//FPS}/{DURATION}s',flush=True)
    p.stdin.close()
    if p.wait(): raise RuntimeError('Video encoding failed')
    print('Film ready:',OUT/'contact-integrale-academy-v1.mp4',flush=True)
