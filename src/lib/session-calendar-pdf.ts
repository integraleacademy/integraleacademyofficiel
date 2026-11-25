import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { calendarDate, calendarMonthName, holidayDates, type SessionCalendar, type PhaseKind } from './session-calendar';

const W = 595.28, H = 841.89, M = 36;
const color = (hex: number) => rgb((hex >> 16) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255);
const ink = color(0x13243c), muted = color(0x41556a), navy = color(0x102139), gold = color(0xe4b357), white = color(0xffffff);
const styles: Record<PhaseKind, [string, number]> = {
  formation: ['Formation', 0xd9eaf6], distance: ['À distance', 0xe7e0f6], centre: ['En centre', 0xcfeae2],
  entreprise: ['Entreprise', 0xf5e8cb], examen: ['Examen', 0x182e50], inscription: ['Inscription', 0xf9d9cd],
};
const clean = (s: string) => String(s).normalize('NFC').replace(/[\u00a0\u202f\t\r\n]/g, ' ').replace(/[→↗]/g, '-').replace(/[^\u0020-\u00ffŒœŠšŸŽž–—‘’“”•…€]/g, '');
function lines(text: string, font: PDFFont, size: number, width: number) {
  const out: string[] = []; let line = '';
  for (const word of clean(text).split(/\s+/).filter(Boolean)) {
    const proposed = line ? line + ' ' + word : word;
    if (line && font.widthOfTextAtSize(proposed, size) > width) { out.push(line); line = word; }
    else line = proposed;
  }
  if (line) out.push(line);
  return out;
}
export async function createCalendarPdf(model: SessionCalendar) {
  const doc = await PDFDocument.create();
  const body = await doc.embedFont(StandardFonts.Helvetica), bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const logo = await doc.embedPng(await readFile(path.join(process.cwd(), 'public/images/sigle.png')));
  doc.setTitle('Calendrier détaillé · ' + model.title); doc.setAuthor('Intégrale Academy');
  const rect = (p: PDFPage, x: number, y: number, w: number, h: number, fill: ReturnType<typeof rgb>) =>
    p.drawRectangle({ x, y: H - y - h, width: w, height: h, color: fill });
  function text(p: PDFPage, str: string, x: number, top: number, size = 10, font = body, fill = ink) {
    p.drawText(clean(str), { x, y: H - top - size, size, font, color: fill });
  }
  function paragraph(p: PDFPage, str: string, x: number, y: number, width: number, size = 10, font = body, fill = ink) {
    for (const line of lines(str, font, size, width)) { text(p, line, x, y, size, font, fill); y += size * 1.35; }
    return y;
  }
  function header(title: string, subtitle: string) {
    const p = doc.addPage([W, H]);
    const headline = lines(title, bold, 23, W - 2 * M);
    const height = 85 + headline.length * 28;
    rect(p, 0, 0, W, height, navy); rect(p, 0, 0, W, 4, gold);
    const logoDim = logo.scaleToFit(28, 28);
    p.drawImage(logo, { x: M, y: H - 43, width: logoDim.width, height: logoDim.height });
    text(p, 'INTÉGRALE ACADEMY', M + 36, 24, 10, bold, white);
    text(p, 'CALENDRIER DE FORMATION', W - 177, 25, 8, bold, gold);
    headline.forEach((s, i) => text(p, s, M, 49 + i * 28, 23, bold, white));
    text(p, subtitle, M, height - 24, 10, body, white);
    return { p, y: height + 20 };
  }
  const period = model.monthOnly ? 'Rentrée de ' + calendarMonthName(model.start) : 'Du ' + calendarDate(model.start) + ' au ' + calendarDate(model.end);
  let { p, y } = header(model.title, period);
  const extra = [model.sessionTitle, model.duration].filter(Boolean).join(' · ');
  if (extra) y = paragraph(p, extra, M, y, W - 2*M, 12, bold) + 10;
  y = paragraph(p, model.location, M, y, W - 2*M, 11, bold) + 2;
  if (model.address && !model.location.includes(model.address)) y = paragraph(p, model.address, M, y, W - 2*M, 10, body, muted);
  y += 18;
  function tableHead() {
    text(p, 'Déroulement de la session', M, y, 17, bold); y += 31;
    rect(p, M, y, W - 2*M, 23, navy);
    for (const [label, x] of [['DATES', M+8], ['ÉTAPE', 172], ['ORGANISATION', 337]] as const) text(p, label, x, y + 7, 8, bold, white);
    y += 23;
  }
  tableHead();
  const rows = model.monthSteps.length ? model.monthSteps.map(step => ({ date: step.date, label: step.title, detail: step.detail, kind: 'formation' as const }))
    : model.monthOnly ? [{ date: calendarMonthName(model.start), label: 'Rentrée', detail: model.note, kind: 'formation' as const }]
    : model.phases.map(phase => ({
      date: (model.vtc && phase.kind === 'examen' ? 'Semaine du ' : '') + calendarDate(phase.start) + (phase.start !== phase.end ? ' au ' + calendarDate(phase.end) : ''),
      label: phase.label, detail: phase.detail, kind: phase.kind,
    }));
  const rowFont = rows.length > 14 ? 8 : 9;
  for (const [index, row] of rows.entries()) {
    const columns = [[row.date, M+8, 116, bold], [row.label, 172, 152, bold], [row.detail, 337, W-M-347, body]] as const;
    const height = Math.max(rowFont === 8 ? 21 : 29, 9 + Math.max(...columns.map(([s,, width, font]) => lines(s,font,rowFont,width).length)) * rowFont * 1.35);
    if (y + height > H - 67) { ({p,y} = header('Déroulement de la session', period)); tableHead(); }
    rect(p,M,y,W-2*M,height,index%2 ? color(0xf3f6f8) : white);
    rect(p,M,y,3,height-1,color(styles[row.kind][1]));
    for (const [s,x,width,font] of columns) paragraph(p,s,x,y+4,width,rowFont,font);
    y += height;
  }
  if (!model.monthOnly || model.monthSteps.length) {
    if (y + 68 > H - 50) ({p,y} = header('Informations pratiques', period));
    paragraph(p,model.note,M,y+13,W-2*M,9,body,muted);
  }
  const months: Date[] = [];
  const first = new Date(model.firstMonth), last = new Date(model.lastMonth);
  if (!Number.isFinite(+first) || !Number.isFinite(+last)) throw new Error('Session sans date publique');
  for (let cursor = Date.UTC(first.getUTCFullYear(), first.getUTCMonth(),1); cursor <= +last;) {
    const date = new Date(cursor); months.push(date);
    cursor = Date.UTC(date.getUTCFullYear(), date.getUTCMonth()+1,1);
  }
  const kinds = [...new Set(model.phases.map(s => s.kind))];
  for (let offset=0; offset<months.length; offset+=12) {
    const group = months.slice(offset, offset+12);
    const { p: grid, y: top } = header('Calendrier mois par mois', period);
    let lx=M, ly=top;
    for (const kind of kinds) {
      const label=model.vtc && kind==='examen' ? 'Semaine d’examen' : model.dms && kind==='formation' ? 'DESP' : model.dms && kind==='centre' ? 'SSIAP 3' : styles[kind][0];
      const w = bold.widthOfTextAtSize(label,9)+31;
      if (lx+w>W-M) { lx=M; ly+=17; }
      rect(grid,lx,ly,10,10,color(styles[kind][1])); text(grid,label,lx+15,ly,9,bold); lx+=w;
    }
    ly+=kinds.length?21:0;
    text(grid,model.monthOnly ? 'Rentrée annoncée sur le mois. Le jour exact reste à préciser.' : 'Les cases colorées correspondent aux périodes publiées.',M,ly,9,body,muted);
    grid.drawCircle({x:M+3,y:H-ly-21,size:2,color:color(0xb44630)});text(grid,'Jour férié',M+10,ly+15,8,body,muted);
    const columns = Math.min(3,group.length), gap=12, width=(W-2*M-(columns-1)*gap)/columns;
    const dayWidth = width/7, dayHeight = group.length<=3 ? Math.min(32,dayWidth*.75) : 14;
    const cellH = dayHeight*6+44;
    group.forEach((month,i)=>{
      const x=M+(i%columns)*(width+gap), top=ly+45+Math.floor(i/columns)*(cellH+12);
      const monthKey=month.toISOString().slice(0,10); const name=calendarMonthName(monthKey);
      text(grid,name[0].toLocaleUpperCase('fr-FR')+name.slice(1),x,top,13,bold);
      rect(grid,x,top+20,width,1,color(0xc8d6e0));
      ['Lu','Ma','Me','Je','Ve','Sa','Di'].forEach((day,j)=>text(grid,day,x+j*dayWidth+3,top+25,8,bold,muted));
      const start=(month.getUTCDay()+6)%7, days=new Date(Date.UTC(month.getUTCFullYear(),month.getUTCMonth()+1,0)).getUTCDate();
      const holidays=holidayDates(month.getUTCFullYear());
      for (let d=1;d<=days;d++) {
        const pos=start+d-1, xx=x+(pos%7)*dayWidth, yy=top+40+Math.floor(pos/7)*dayHeight;
        const key=monthKey.slice(0,8)+String(d).padStart(2,'0');
        const matching=model.phases.filter(phase=>phase.start<=key&&key<=phase.end);
        const phase=matching.find(entry=>entry.kind==='examen')??matching[0];
        const bg=phase?styles[phase.kind][1]:0xf0f3f5;
        rect(grid,xx,yy,dayWidth-1.2,dayHeight-1.2,color(bg));
        const fontSize=group.length<=3?10:8;
        text(grid,String(d),xx+(dayWidth-body.widthOfTextAtSize(String(d),fontSize))/2,yy+(dayHeight-fontSize)/2-1,fontSize,body,phase?.kind==='examen'?white:ink);
        if(holidays.has(key))grid.drawCircle({x:xx+dayWidth-4,y:H-yy-3,size:1.6,color:color(0xb44630)});
      }
    });
  }
  const pages=doc.getPages();
  pages.forEach((page,index)=>{
    rect(page,M,H-45,W-2*M,1,color(0xc8d6e0));text(page,'Intégrale Academy · 04 22 47 07 68',M,H-34,8,body,muted);
    text(page,`${index+1} / ${pages.length}`,W-M-25,H-34,8,bold,muted);
  });
  return doc.save();
}
