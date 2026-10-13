/**
 * Original, silent contact film. No stock footage or audio.
 * Render: NODE_PATH=<directory containing @napi-rs/canvas> node scripts/render-contact-film-v2.cjs
 * Requires @napi-rs/canvas and ffmpeg. --stills only renders review frames.
 * The renderer is an offline authoring tool; it is not part of the site build.
 */
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'public/videos');
const review = process.env.FILM_REVIEW_DIR || '/tmp/contact-film-v2';
fs.mkdirSync(review, { recursive: true });
for (const weight of ['Regular', 'Medium', 'SemiBold', 'Bold']) {
  GlobalFonts.registerFromPath(path.join(root, `public/fonts/entreprises/Poppins-${weight}.woff2`), `Poppins ${weight}`);
}
const W = 1920, H = 1080, FPS = 60, DURATION = 30;
const C = { paper: '#f7f5ee', navy: '#102338', ink: '#152638', gold: '#e5b947', muted: '#6e786f', white: '#ffffff', line: '#dcded6' };
const canvas = createCanvas(W, H), ctx = canvas.getContext('2d');
const clamp = v => Math.max(0, Math.min(1, v));
const ease = v => { v = clamp(v); return v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2; };
const outEase = v => 1 - Math.pow(1 - clamp(v), 4);
const range = (t, start, duration = .8) => clamp((t - start) / duration);
const mix = (a, b, p) => a + (b - a) * p;
function save(fn) { ctx.save(); fn(); ctx.restore(); }
function bg(color) { ctx.fillStyle = color; ctx.fillRect(0, 0, W, H); }
function rr(x,y,w,h,r,fill) { ctx.beginPath(); ctx.roundRect(x,y,w,h,r); ctx.fillStyle = fill; ctx.fill(); }
function circle(x,y,r,fill) { ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fillStyle=fill; ctx.fill(); }
function text(s,x,y,size=70,color=C.ink,weight='SemiBold',align='left') {
  ctx.font=`${size}px "Poppins ${weight}"`; ctx.fillStyle=color; ctx.textBaseline='alphabetic'; ctx.textAlign=align; ctx.fillText(s,x,y);
}
function reveal(s,x,y,size,color,p,weight='SemiBold',align='left') {
  save(()=>{ ctx.beginPath(); ctx.rect(0,y-size*1.18,W,size*1.5); ctx.clip(); ctx.globalAlpha=clamp(p*3); text(s,x,y+(1-outEase(p))*size*1.15,size,color,weight,align); });
}
function line(x1,y1,x2,y2,color,width=3) { ctx.strokeStyle=color; ctx.lineWidth=width; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); }
function arrow(x,y,size,color) { line(x-size,y+size,x+size,y-size,color,5); line(x-size*.65,y-size,x+size,y-size,color,5); line(x+size,y-size,x+size,y+size*.65,color,5); }
function label(s,x,y,color=C.muted,align='left') { text(s,x,y,24,color,'Medium',align); }
function pill(s,x,y,w,t,start,fill=C.white,ink=C.ink) {
  const p=outEase(range(t,start,.75));
  save(()=>{ ctx.globalAlpha=p; ctx.translate(0,(1-p)*70); rr(x,y,w,84,42,fill); text(s,x+w/2,y+54,30,ink,'Medium','center'); });
}
function card(s,x,y,w,h,angle,p,fill=C.white,ink=C.ink) {
  save(()=>{
    ctx.translate(x,y); ctx.rotate(angle); ctx.scale(p,p);
    ctx.shadowColor='rgba(16,35,56,.09)';ctx.shadowBlur=44;ctx.shadowOffsetY=18;
    rr(-w/2,-h/2,w,h,26,fill); ctx.shadowColor='transparent';
    text(s,-w/2+38,15,35,ink,'Medium'); arrow(w/2-48,0,12,ink);
  });
}
let logo, campus;
function intro(t) {
  bg(C.paper);
  label('INTÉGRALE ACADEMY',120,118,C.ink);
  label('VOTRE PROJET COMMENCE ICI',1800,118,C.muted,'right');
  // A line accompanies the same project marker throughout the film.
  ctx.strokeStyle=C.line;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(1105,155);ctx.bezierCurveTo(1640,80,1900,620,1550,850);ctx.stroke();
  reveal('Votre prochain',120,415,128,C.ink,range(t,.1,.95));
  reveal('métier.',120,555,155,C.ink,range(t,.3,.95));
  const up=outEase(range(t,.85,1.15)); line(124,586,mix(124,624,up),586,C.gold,9);
  reveal('Et si on en parlait ?',125,688,43,C.muted,range(t,1,.8),'Regular');
  const gather=ease(range(t,3.8,.9));
  const cards=[['Quelle formation ?',1430,300,500,-.065,.65],['Quel financement ?',1510,508,535,.035,1.05],['Quel parcours ?',1390,716,470,-.04,1.45]];
  cards.forEach(([s,x,y,w,a,start],i)=>card(s,mix(x,1470,gather),mix(y,510,gather),w,130,a*(1-gather),outEase(range(t,start,.9))*(1-gather*.12)));
  if(t>4.1){const p=ease(range(t,4.1,.85)); rr(mix(1220,0,p),mix(430,0,p),mix(500,W,p),mix(160,H,p),mix(26,0,p),C.navy);}
}
function conversation(t) {
  bg(C.navy);
  reveal('Tout commence',120,393,109,C.paper,range(t,0,.8));
  reveal('par un échange.',120,522,109,C.gold,range(t,.15,.8));
  reveal('Une question. Une équipe à votre écoute.',125,628,32,'#afbac4',range(t,.65,.8),'Regular');
  const q=outEase(range(t,.5,.85));
  save(()=>{ctx.globalAlpha=q; ctx.translate(0,60*(1-q)); rr(1110,300,650,160,35,'#263b4e'); text('J’ai un projet',1150,368,38,C.paper,'Medium');text('de formation.',1150,419,38,C.paper,'Medium');});
  const a=outEase(range(t,1.25,.9));
  save(()=>{ctx.globalAlpha=a;ctx.translate(0,65*(1-a));rr(1110,503,650,180,35,C.paper);text('Construisons-le',1150,579,43,C.ink,'SemiBold');text('ensemble.',1150,639,43,C.ink,'SemiBold');circle(1714,645,11,C.gold);});
  const p=ease(range(t,2.6,1.05));
  if(p>0){
    const point=u=>{const v=1-u;return [v*v*v*1714+3*v*v*u*1714+3*v*u*u*960+u*u*u*960,v*v*v*645+3*v*v*u*820+3*v*u*u*690+u*u*u*885];};
    ctx.strokeStyle=C.gold;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(1714,645);
    for(let i=1;i<=80;i++){const [x,y]=point(p*i/80);ctx.lineTo(x,y);}ctx.stroke();
    const [x,y]=point(p);circle(x,y,12,C.gold);
  }
  if(t>3.55){const p=ease(range(t,3.55,.65));circle(960,885,2200*p,C.paper);}
}
function journey(t) {
  bg(C.paper);
  const camera = ease(range(t,2.25,.85))*W + ease(range(t,5.25,.85))*W;
  const stages=[
    {n:'01',title:'Votre projet.',sub:'Vos envies donnent la direction.',items:['Reconversion','Évolution','Premier emploi']},
    {n:'02',title:'Votre formation.',sub:'Un parcours qui vous correspond.',items:['APS','A3P','SSIAP','DESP','VTC','BTS']},
    {n:'03',title:'Votre financement.',sub:'Des solutions selon votre situation.',items:['Étudier les possibilités','Préparer votre dossier']},
  ];
  save(()=>{
    ctx.translate(-camera,0);
    line(200,830,W*3-200,830,C.line,3);
    const progress=200+camera+1450*outEase(range(t,0,8.7));
    line(200,830,progress,830,C.gold,5);
    stages.forEach((s,i)=>save(()=>{
      const x=i*W, local=t-i*3;
      ctx.translate(x,0);
      text(s.n,1775,593,470,'#e9e9df','SemiBold','right');
      label('UN PREMIER ÉCHANGE POUR AVANCER',120,119);
      reveal(s.title,120,414,i===2?110:126,C.ink,range(local,0,.7));
      reveal(s.sub,125,520,42,C.muted,range(local,.23,.7),'Regular');
      let px=125;
      s.items.forEach((item,j)=>{
        ctx.font='30px "Poppins Medium"';const w=ctx.measureText(item).width+64;
        pill(item,px,620,w,local,.55+j*.12,i===1?C.navy:C.white,i===1?C.paper:C.ink);px+=w+16;
      });
      circle(200,830,18,C.paper);circle(200,830,9,C.gold);
      label(['ÉCOUTER','ORIENTER','ACCOMPAGNER'][i],120,949,C.ink);
    }));
    circle(progress,830,13,C.gold);
  });
  if(t>8.6){const p=ease(range(t,8.6,.6));rr(W*(1-p),0,W,H,0,C.paper);}
}
function photoCover(img,x,y,w,h,zoom=1) {
  const scale=Math.max(w/img.width,h/img.height)*zoom,sw=img.width*scale,sh=img.height*scale;
  ctx.drawImage(img,x+(w-sw)/2,y+(h-sh)/2,sw,sh);
}
function team(t) {
  bg(C.paper);
  const p=outEase(range(t,0,1));
  label('INTÉGRALE ACADEMY',120,119,C.ink);
  reveal('Une équipe.',120,397,116,C.ink,range(t,.1,.8));
  reveal('À vos côtés.',120,531,116,C.ink,range(t,.3,.8));
  reveal('Pour donner forme',125,649,43,C.muted,range(t,.6,.8),'Regular');
  reveal('à votre avenir.',125,707,43,C.muted,range(t,.72,.8),'Regular');
  save(()=>{
    ctx.translate(70*(1-p),0);ctx.globalAlpha=p;
    ctx.beginPath();ctx.roundRect(1035,106,775,868,32);ctx.clip();
    photoCover(campus,1035,106,775,868,1.02+.03*range(t,0,5));
    const g=ctx.createLinearGradient(0,650,0,974);g.addColorStop(0,'transparent');g.addColorStop(1,'rgba(16,35,56,.8)');ctx.fillStyle=g;ctx.fillRect(1035,650,775,324);
    text('Bienvenue chez vous.',1080,864,42,C.white,'SemiBold');
    text('Puget-sur-Argens',1080,919,28,C.white,'Regular');
  });
  const lineP=outEase(range(t,1.3,1.3));line(125,816,mix(125,735,lineP),816,C.gold,4);circle(mix(125,735,lineP),816,10,C.gold);
  if(t>4.75){const p=ease(range(t,4.75,.65));rr(0,H*(1-p),W,H,0,C.navy);}
}
function end(t) {
  bg(C.navy);
  const p=outEase(range(t,.05,.85));
  save(()=>{ctx.globalAlpha=p;ctx.translate(0,30*(1-p));ctx.drawImage(logo,735,153,450,450*logo.height/logo.width);});
  reveal('On en parle ?',W/2,543,155,C.paper,range(t,.2,.9),'SemiBold','center');
  const l=outEase(range(t,.65,1.1));line(mix(960,764,l),598,mix(960,1156,l),598,C.gold,6);
  reveal('04 22 47 07 68',W/2,747,77,C.gold,range(t,.75,.9),'Medium','center');
  reveal('Un premier échange gratuit et sans engagement.',W/2,837,31,'#bac5cc',range(t,1.05,.9),'Regular','center');
}
function frame(t) {
  ctx.resetTransform();ctx.globalAlpha=1;ctx.clearRect(0,0,W,H);
  if(t<4.95)intro(t);else if(t<9.15)conversation(t-4.95);else if(t<18.35)journey(t-9.15);else if(t<23.75)team(t-18.35);else end(t-23.75);
}
(async()=>{
  [logo,campus]=await Promise.all([loadImage(path.join(root,'public/images/logo.png')),loadImage(path.join(root,'public/images/campus/campus-accueil.jpg'))]);
  for(const t of [0,2.4,4.6,6.9,8.7,10.8,13.8,16.8,20.8,24.8,27.5]){frame(t);fs.writeFileSync(path.join(review,`frame-${String(t).replace('.','_')}.jpg`),canvas.toBuffer('image/jpeg',90));}
  frame(2.4);fs.writeFileSync(path.join(out,'contact-integrale-academy-v2-poster.webp'),canvas.toBuffer('image/webp',90));
  if(process.argv.includes('--stills')) return;
  const ff=spawn('ffmpeg',['-y','-hide_banner','-loglevel','error','-f','rawvideo','-pixel_format','rgba','-video_size',`${W}x${H}`,'-framerate',String(FPS),'-i','pipe:0','-an','-c:v','libx264','-preset','slow','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart','-threads','4',path.join(out,'contact-integrale-academy-v2.mp4')],{stdio:['pipe','inherit','inherit']});
  ff.stdin.on('error',e=>{console.error(e);process.exitCode=1;});
  for(let i=0;i<DURATION*FPS;i++){
    frame(i/FPS);if(!ff.stdin.write(canvas.data()))await once(ff.stdin,'drain');
    if(i%(FPS*3)===0)console.log(`Rendered ${i/FPS}/${DURATION}s`);
  }
  ff.stdin.end();const [code]=await once(ff,'exit');if(code!==0)throw new Error(`ffmpeg exited ${code}`);
  console.log('Silent 1080p/60 film complete.');
})().catch(e=>{console.error(e);process.exitCode=1;});
