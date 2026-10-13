/**
 * Contact film, aligned with the Contact / Ecole art direction.
 * Offline render: NODE_PATH=<canvas module directory> FILM_GEORGIA_FONT=<Georgia italic TTF>
 *   node scripts/render-contact-film-v4.cjs [--stills]
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
const review = process.env.FILM_REVIEW_DIR || '/tmp/contact-film-v4';
fs.mkdirSync(review, { recursive: true });
const serif = process.env.FILM_GEORGIA_FONT;
if (!serif || !fs.existsSync(serif)) throw new Error('Set FILM_GEORGIA_FONT to a local Georgia italic TTF.');
GlobalFonts.registerFromPath(serif, 'Academy Georgia');
GlobalFonts.registerFromPath('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 'Academy Sans');
GlobalFonts.registerFromPath('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 'Academy Sans Bold');

const W=1920,H=1080,FPS=60,DURATION=34;
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
function reveal(s,x,y,size,kind,color,t,start=0,maxWidth,align='left'){
  let finalSize=size;
  ctx.font=`${size}px "${kind==='serif'?'Academy Georgia':kind==='bold'?'Academy Sans Bold':'Academy Sans'}"`;
  ctx.letterSpacing=kind==='bold'?`${-size*.045}px`:'0px';
  if(maxWidth){const measured=ctx.measureText(s).width;finalSize=Math.min(size,size*maxWidth/measured);}
  const p=ease(range(t,start,.65));
  saved(()=>{ctx.beginPath();ctx.rect(align==='center'?0:x-5,y-size*1.2,W,size*1.55);ctx.clip();ctx.globalAlpha*=Math.min(1,p*2);text(s,x,y+(1-p)*size,finalSize,kind,color,align);});
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
  background();eyebrow('INTÉGRALE ACADEMY');
  reveal('Faites le',120,314,108,'bold',C.ink,t,-.2,710);
  reveal('premier pas',120,447,131,'serif',C.serif,t,.02,710);
  reveal('vers votre',120,564,99,'bold',C.ink,t,.18,710);
  reveal('futur métier.',120,696,128,'serif',C.serif,t,.32,710);
  const p=ease(range(t,-.2,.9));
  saved(()=>{ctx.translate(65*(1-p),0);ctx.globalAlpha*=p;illustration('aps-arrivee',894,193,906,t);});
  const a=ease(range(t,.8,1.4));line(125,805,mix(125,690,a),805,C.line,2);dot(mix(125,690,a),805,7,C.gold);
  text('Un projet qui vous ressemble.',125,888,30,'body',C.muted);
  text('Des métiers concrets.',894,888,30,'body',C.muted);arrow(1770,879,12);
}
function trainingCopy(i,t,offset=0){
  const s=training[i];
  saved(()=>{
    ctx.beginPath();ctx.rect(116,235,637,570);ctx.clip();ctx.translate(offset,0);
    text(s.code,122,293,38,'bold',C.serif);
    if(s.code==='DESP'){
      reveal(s.title,120,416,109,'bold',C.ink,t,-.1,620);
      reveal('en sécurité',120,522,100,'serif',C.serif,t,.04,622);
      reveal('privée.',120,625,100,'serif',C.serif,t,.13,622);
      s.body.forEach((l,j)=>reveal(l,125,725+j*49,34,'body',C.muted,t,.3+j*.06));
    }else{
      reveal(s.title,120,440,109,'bold',C.ink,t,-.1,620);
      reveal(s.accent,120,560,116,'serif',C.serif,t,.05,622);
      s.body.forEach((l,j)=>reveal(l,125,690+j*51,34,'body',C.muted,t,.3+j*.06));
    }
  });
}
function trainingImage(i,x=785){ctx.drawImage(images[training[i].image],x,199,1015,1015*2/3);}
function trainingScene(i,t,transition=null){
  background();eyebrow('TROUVEZ VOTRE VOIE');
  // One fixed gallery window: artwork moves side by side with no ghosted text or faces.
  saved(()=>{
    ctx.shadowColor='rgba(70,58,42,.10)';ctx.shadowBlur=35;ctx.shadowOffsetY=15;
    rounded(785,199,1015,1015*2/3,30,C.surface);ctx.shadowColor='transparent';
    ctx.beginPath();ctx.roundRect(785,199,1015,1015*2/3,30);ctx.clip();
    if(transition!==null){
      trainingImage(i-1,785-1015*transition);
      trainingImage(i,785+1015*(1-transition));
    }else trainingImage(i);
    rounded(785,199,1015,1015*2/3,30,null,'rgba(139,88,18,.20)');
  });
  if(transition!==null){
    trainingCopy(i-1,3,-665*transition);trainingCopy(i,1,665*(1-transition));
  }else trainingCopy(i,Math.max(1,t));
  const visible=transition!==null&&transition<.5?i-1:i;
  text(training[visible].tag,790,931,21,'bold',C.muted);arrow(1770,921,12);
  training.forEach((s,j)=>text(s.code,125+j*104,875,25,'bold',j===visible?C.serif:'#8c7d66'));
  const cursor=transition===null?i:i-1+transition;
  line(125+cursor*104,895,183+cursor*104,895,C.gold,4);
}
function accompaniment(t){
  background();eyebrow('À VOS CÔTÉS, DÈS LE DÉPART');
  illustration('desp-vae-accompagnement',120,234,855,t);
  reveal('Votre projet.',1060,305,88,'bold',C.ink,t,0,720);
  reveal('Notre',1060,415,98,'serif',C.serif,t,.14,730);
  reveal('accompagnement.',1060,520,91,'serif',C.serif,t,.25,730);
  const steps=['Choisir votre formation.','Étudier votre financement.','Préparer votre admission.'];
  steps.forEach((s,i)=>{
    const p=ease(range(t,.6+i*.55,.7)),y=637+i*101;
    saved(()=>{ctx.globalAlpha*=p;ctx.translate(25*(1-p),0);text(`0${i+1}`,1065,y,24,'bold',C.serif);text(s,1134,y,32,'body',C.ink);line(1065,y+35,1770,y+35,C.line);});
  });
  text('Un premier échange pour avancer.',125,922,29,'body',C.muted);
}
function end(t){
  background();
  const p=ease(range(t,-.1,.8));
  saved(()=>{ctx.globalAlpha*=p;ctx.translate(0,25*(1-p));ctx.drawImage(images.logo,865,86,190,190);});
  reveal('Faites le premier pas',960,430,110,'bold',C.ink,t,.12,1650,'center');
  reveal('vers votre futur métier.',960,580,126,'serif',C.serif,t,.32,1710,'center');
  const a=ease(range(t,.65,.9));line(mix(960,750,a),651,mix(960,1170,a),651,C.gold,5);
  reveal('04 22 47 07 68',960,789,78,'bold',C.ink,t,.75,1050,'center');
  reveal('Un premier échange gratuit et sans engagement.',960,880,31,'body',C.muted,t,.95,1550,'center');
}
const sequence=[{start:0,end:5,paint:intro},...training.map((s,i)=>({start:5+i*3,end:8+i*3,paint:t=>trainingScene(i,t),trainingIndex:i})),{start:23,end:28,paint:accompaniment},{start:28,end:34,paint:end}];
function frame(t){
  ctx.resetTransform();ctx.globalAlpha=1;ctx.letterSpacing='0px';background();
  const index=sequence.findIndex(s=>t>=s.start&&t<s.end),s=sequence[Math.max(0,index)],local=t-s.start;
  if(s.trainingIndex>0&&local<.5){
    trainingScene(s.trainingIndex,local,smooth(local/.5));
  }else if(index>0&&local<.45){
    // Short page-turn reveal at chapter boundaries; fully opaque layers avoid double lettering.
    const p=smooth(local/.45),prev=sequence[index-1];prev.paint(prev.end-prev.start);
    saved(()=>{ctx.beginPath();ctx.rect(W*(1-p),0,W*p,H);ctx.clip();s.paint(local+.55);});
  }else s.paint(index>0?local+.55:local);
}
(async()=>{
  const names=['aps-arrivee','desp-vae-accompagnement',...training.map(s=>s.image)];
  for(const name of names)images[name]=await loadImage(path.join(root,`public/images/formation-scenes-manuel/${name}.webp`));
  images.logo=await loadImage(path.join(root,'public/images/logo2.png'));
  for(const t of [2.4,6.8,8.25,9.8,12.8,15.8,18.8,21.8,26.2,31]){
    frame(t);fs.writeFileSync(path.join(review,`frame-${String(t).replace('.','_')}.jpg`),canvas.toBuffer('image/jpeg',90));
  }
  // The opening poster has the same palette and composition as the surrounding page.
  frame(2.4);fs.writeFileSync(path.join(output,'contact-integrale-academy-v4-poster.webp'),canvas.toBuffer('image/webp',90));
  if(process.argv.includes('--stills'))return;
  const ff=spawn('ffmpeg',['-y','-hide_banner','-loglevel','error','-f','rawvideo','-pixel_format','rgba','-video_size',`${W}x${H}`,'-framerate',String(FPS),'-i','pipe:0','-an','-c:v','libx264','-preset','slow','-crf','22','-pix_fmt','yuv420p','-movflags','+faststart','-threads','4',path.join(output,'contact-integrale-academy-v4.mp4')],{stdio:['pipe','inherit','inherit']});
  ff.stdin.on('error',e=>{console.error(e);process.exitCode=1;});
  for(let i=0;i<DURATION*FPS;i++){
    frame(i/FPS);if(!ff.stdin.write(canvas.data()))await once(ff.stdin,'drain');
    if(i%(FPS*4)===0)console.log(`Rendered ${i/FPS}/${DURATION}s`);
  }
  ff.stdin.end();const [code]=await once(ff,'exit');if(code!==0)throw new Error(`ffmpeg exited ${code}`);
  console.log('Silent illustrated film complete: 1920×1080, 60 fps, 34 seconds.');
})().catch(e=>{console.error(e);process.exitCode=1;});
