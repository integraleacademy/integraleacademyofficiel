/**
 * Contact film, aligned with the Contact / Ecole art direction.
 * Offline render: NODE_PATH=<canvas module directory> FILM_GEORGIA_FONT=<Georgia italic TTF>
 *   node scripts/render-contact-film-v3.cjs [--stills]
 * Requires @napi-rs/canvas, ffmpeg, DejaVu Sans (system sans on Linux) and Georgia italic.
 * Georgia is an authoring dependency only; no font binaries are redistributed.
 * All illustrations are existing Intégrale Academy site assets. No audio track.
 */
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'public/videos');
const review = process.env.FILM_REVIEW_DIR || '/tmp/contact-film-v3';
fs.mkdirSync(review, { recursive: true });
const serif = process.env.FILM_GEORGIA_FONT;
if (!serif || !fs.existsSync(serif)) throw new Error('Set FILM_GEORGIA_FONT to a local Georgia italic TTF.');
GlobalFonts.registerFromPath(serif, 'Academy Georgia');
GlobalFonts.registerFromPath('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 'Academy Sans');
GlobalFonts.registerFromPath('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 'Academy Sans Bold');

const W=1920,H=1080,FPS=60,DURATION=32;
// Exact light-theme tokens from src/app/globals.css.
const C={paper:'#f6f0e4',surface:'#fffbf3',ink:'#17130d',muted:'#463a2a',line:'#d6c7ae',gold:'#e6b03a',serif:'#8b5812'};
const canvas=createCanvas(W,H),ctx=canvas.getContext('2d');
const clamp=v=>Math.max(0,Math.min(1,v));
const smooth=v=>{v=clamp(v);return v*v*(3-2*v);};
const ease=v=>1-Math.pow(1-clamp(v),4);
const range=(t,s,d=.7)=>clamp((t-s)/d);
const mix=(a,b,p)=>a+(b-a)*p;
function saved(fn){ctx.save();fn();ctx.restore();}
function rounded(x,y,w,h,r,fill,stroke){ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke();}}
function line(x1,y1,x2,y2,color,width=2){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();}
function dot(x,y,r,color){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
function text(s,x,y,size=40,kind='body',color=C.ink,align='left'){
  ctx.font=`${size}px "${kind==='serif'?'Academy Georgia':kind==='bold'?'Academy Sans Bold':'Academy Sans'}"`;
  ctx.letterSpacing=kind==='bold'?`${-size*.045}px`:'0px';ctx.textBaseline='alphabetic';ctx.textAlign=align;ctx.fillStyle=color;ctx.fillText(s,x,y);
}
function reveal(s,x,y,size,kind,color,t,start=0,maxWidth){
  let finalSize=size;
  ctx.font=`${size}px "${kind==='serif'?'Academy Georgia':kind==='bold'?'Academy Sans Bold':'Academy Sans'}"`;
  if(maxWidth){const measured=ctx.measureText(s).width;finalSize=Math.min(size,size*maxWidth/measured);}
  const p=ease(range(t,start,.65));
  saved(()=>{ctx.beginPath();ctx.rect(x-5,y-size*1.2,W,size*1.55);ctx.clip();ctx.globalAlpha*=Math.min(1,p*2);text(s,x,y+(1-p)*size,finalSize,kind,color);});
}
function background(){ctx.fillStyle=C.paper;ctx.fillRect(-100,-100,W+200,H+200);}
function eyebrow(s,x=120,y=141){
  ctx.font='22px "Academy Sans Bold"';ctx.letterSpacing='2px';const width=ctx.measureText(s).width+72;
  rounded(x,y-34,width,56,28,C.surface,C.line);dot(x+25,y-7,5,C.gold);
  text(s,x+45,y,21,'bold',C.serif);
}
function arrow(x,y,size=13,color=C.serif){line(x-size,y+size,x+size,y-size,color,3);line(x-size*.7,y-size,x+size,y-size,color,3);line(x+size,y-size,x+size,y+size*.7,color,3);}
let images={};
function illustration(name,x,y,w,t,subtle=true){
  const img=images[name],h=w*img.height/img.width;
  saved(()=>{
    // The complete 3:2 artwork is retained. Movement belongs to its frame, not a destructive crop.
    const drift=subtle?Math.sin(Math.min(t,4)/4*Math.PI/2)*7:0;
    ctx.translate(0,-drift);
    ctx.shadowColor='rgba(70,58,42,.10)';ctx.shadowBlur=35;ctx.shadowOffsetY=15;
    rounded(x,y,w,h,30,C.surface);ctx.shadowColor='transparent';
    ctx.beginPath();ctx.roundRect(x,y,w,h,30);ctx.clip();ctx.drawImage(img,x,y,w,h);
    rounded(x,y,w,h,30,null,'rgba(139,88,18,.20)');
  });
}
const training=[
  {code:'APS',title:'Sécurité',accent:'privée.',body:['Observer, prévenir,','protéger.'],image:'aps-atelier-radio',tag:'PRÉVENTION & SÉCURITÉ'},
  {code:'A3P',title:'Protection',accent:'rapprochée.',body:['Anticiper, accompagner,','sécuriser.'],image:'a3p-mission-ensemble',tag:'PROTECTION DES PERSONNES'},
  {code:'SSIAP',title:'Sécurité',accent:'incendie.',body:['Prévenir, intervenir,','assister.'],image:'ssiap-1-galerie-ssi',tag:'SÉCURITÉ INCENDIE'},
  {code:'DESP',title:'Diriger',accent:'en sécurité privée.',body:['Organiser, piloter,','entreprendre.'],image:'desp-initial-mission',tag:'DIRECTION & ENTREPRISE'},
  {code:'VTC',title:'Transport',accent:'de personnes.',body:['Accueillir, conduire,','accompagner.'],image:'vtc-parcours',tag:'CHAUFFEUR PROFESSIONNEL'},
  {code:'BTS',title:'Apprendre',accent:'en alternance.',body:['Se former, pratiquer,','évoluer.'],image:'bts-ndrc-parcours',tag:'ÉTUDES & ENTREPRISE'},
];
function brand(x,y,size=25){text('INTÉGRALE',x,y,size,'bold',C.ink);ctx.font=`${size}px "Academy Sans Bold"`;const w=ctx.measureText('INTÉGRALE').width;text('ACADEMY',x+w+12,y,size,'bold',C.serif);}
function intro(t){
  background();eyebrow('VOTRE PROJET COMMENCE ICI');
  reveal('Votre avenir.',120,404,122,'bold',C.ink,t,-.2,710);
  reveal('Parlons-en.',120,557,140,'serif',C.serif,t,0,710);
  reveal('Des métiers concrets.',125,685,37,'body',C.muted,t,.38);
  reveal('Un projet qui vous ressemble.',125,739,37,'body',C.muted,t,.5);
  const p=ease(range(t,-.2,.9));
  saved(()=>{ctx.translate(65*(1-p),0);ctx.globalAlpha*=p;illustration('aps-arrivee',894,193,906,t);});
  const a=ease(range(t,1,.9));line(125,810,mix(125,690,a),810,C.line,2);dot(mix(125,690,a),810,7,C.gold);
  brand(126,933,26);text('Un premier échange pour avancer.',894,888,29,'body',C.muted);arrow(1770,879,12);
}
function trainingScene(i,t){
  background();const s=training[i];eyebrow('TROUVEZ VOTRE VOIE');
  // Shared gallery frame and consistent typography connect the six métiers.
  const p=ease(range(t,-.1,.65));
  saved(()=>{ctx.translate(48*(1-p),0);ctx.globalAlpha*=p;illustration(s.image,785,199,1015,t);});
  text(s.code,122,293,38,'bold',C.serif);
  reveal(s.title,120,440,109,'bold',C.ink,t,-.1,620);
  reveal(s.accent,120,560,116,'serif',C.serif,t,.05,622);
  s.body.forEach((l,j)=>reveal(l,125,690+j*51,34,'body',C.muted,t,.3+j*.06));
  text(s.tag,790,931,21,'bold',C.muted);arrow(1770,921,12);
  const labels=['APS','A3P','SSIAP','DESP','VTC','BTS'];
  labels.forEach((label,j)=>{
    const x=125+j*104; text(label,x,875,23,'bold',j===i?C.serif:'#a3957f');
    if(j===i){line(x,892,x+57*ease(range(t,.3,1.4)),892,C.gold,4);}
  });
}
function accompaniment(t){
  background();eyebrow('À VOS CÔTÉS, DÈS LE DÉPART');
  illustration('desp-vae-accompagnement',120,234,855,t);
  reveal('Votre projet.',1060,335,88,'bold',C.ink,t,0,720);
  reveal('Notre accompagnement.',1060,435,91,'serif',C.serif,t,.14,730);
  const steps=['Choisir votre formation.','Étudier votre financement.','Préparer votre admission.'];
  steps.forEach((s,i)=>{
    const p=ease(range(t,.6+i*.55,.7)),y=565+i*116;
    saved(()=>{ctx.globalAlpha*=p;ctx.translate(25*(1-p),0);text(`0${i+1}`,1065,y,24,'bold',C.serif);text(s,1134,y,32,'body',C.ink);line(1065,y+35,1770,y+35,C.line);});
  });
  text('Un premier échange pour avancer.',125,922,29,'body',C.muted);
}
function end(t){
  background();
  const p=ease(range(t,-.1,.8));
  saved(()=>{ctx.globalAlpha*=p;ctx.translate(0,25*(1-p));ctx.drawImage(images.logo,135,274,435,435);});
  eyebrow('FAISONS LE PREMIER PAS',694,279);
  reveal('On en parle ?',688,481,132,'serif',C.serif,t,.1,1080);
  reveal('04 22 47 07 68',693,647,89,'bold',C.ink,t,.4,1050);
  const a=ease(range(t,.7,.8));line(699,699,mix(699,1730,a),699,C.line,2);
  reveal('Un premier échange gratuit',698,775,34,'body',C.muted,t,.7);
  reveal('et sans engagement.',698,829,34,'body',C.muted,t,.85);
}
const sequence=[{start:0,end:4,paint:intro},...training.map((s,i)=>({start:4+i*3,end:7+i*3,paint:t=>trainingScene(i,t)})),{start:22,end:27,paint:accompaniment},{start:27,end:32,paint:end}];
function frame(t){
  ctx.resetTransform();ctx.globalAlpha=1;ctx.letterSpacing='0px';background();
  const index=sequence.findIndex(s=>t>=s.start&&t<s.end),s=sequence[Math.max(0,index)],local=t-s.start;
  if(index>0&&local<.5){
    const p=smooth(local/.5),prev=sequence[index-1];
    saved(()=>{ctx.translate(-45*p,0);prev.paint(prev.end-prev.start);});
    saved(()=>{ctx.translate(45*(1-p),0);ctx.globalAlpha=p;s.paint(local);});
  }else s.paint(local);
}
(async()=>{
  const names=['aps-arrivee','desp-vae-accompagnement',...training.map(s=>s.image)];
  for(const name of names)images[name]=await loadImage(path.join(root,`public/images/formation-scenes-manuel/${name}.webp`));
  images.logo=await loadImage(path.join(root,'public/images/logo2.png'));
  for(const t of [1.8,5.8,8.8,11.8,14.8,17.8,20.8,25.2,30]){
    frame(t);fs.writeFileSync(path.join(review,`frame-${String(t).replace('.','_')}.jpg`),canvas.toBuffer('image/jpeg',90));
  }
  // The opening poster has the same palette and composition as the surrounding page.
  frame(1.8);fs.writeFileSync(path.join(output,'contact-integrale-academy-v3-poster.webp'),canvas.toBuffer('image/webp',90));
  if(process.argv.includes('--stills'))return;
  const ff=spawn('ffmpeg',['-y','-hide_banner','-loglevel','error','-f','rawvideo','-pixel_format','rgba','-video_size',`${W}x${H}`,'-framerate',String(FPS),'-i','pipe:0','-an','-c:v','libx264','-preset','slow','-crf','22','-pix_fmt','yuv420p','-movflags','+faststart','-threads','4',path.join(output,'contact-integrale-academy-v3.mp4')],{stdio:['pipe','inherit','inherit']});
  ff.stdin.on('error',e=>{console.error(e);process.exitCode=1;});
  for(let i=0;i<DURATION*FPS;i++){
    frame(i/FPS);if(!ff.stdin.write(canvas.data()))await once(ff.stdin,'drain');
    if(i%(FPS*4)===0)console.log(`Rendered ${i/FPS}/${DURATION}s`);
  }
  ff.stdin.end();const [code]=await once(ff,'exit');if(code!==0)throw new Error(`ffmpeg exited ${code}`);
  console.log('Silent illustrated film complete: 1920×1080, 60 fps, 32 seconds.');
})().catch(e=>{console.error(e);process.exitCode=1;});
