import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
const base='https://integraleacademyofficiel-1.onrender.com';
const courses=[['aps','/formations-securite/aps'],['a3p','/formations-securite/a3p-apr'],['ssiap-1','/formations-securite/ssiap-1'],['ssiap-2','/formations-securite/ssiap-2'],['ssiap-3','/formations-securite/ssiap-3'],['sst','/formations-securite/sst'],['desp','/dirigeant'],['desp-vae','/vaedirigeant']];
const results=[];const errors=[];
await mkdir('assistant-ui-artifacts',{recursive:true});
const browser=await chromium.launch();
let currentPage;
async function dismiss(page){const close=page.getByRole('button',{name:'Fermer la fenêtre',exact:true});if(await close.isVisible())await close.click();}
async function bounds(dialog,page,label){
 const m=await dialog.evaluate(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height,viewport:[innerWidth,innerHeight],overflow:el.scrollWidth-el.clientWidth};});
 assert.ok(m.x>=-1&&m.y>=-1&&m.right<=m.viewport[0]+1&&m.bottom<=m.viewport[1]+1,label+' out of viewport: '+JSON.stringify(m));
 assert.ok(m.overflow<=1,label+' horizontal overflow');
 const close=dialog.getByRole('button',{name:'Fermer l’assistant'});
 const r=await close.boundingBox();assert.ok(r&&r.y>=0&&r.y+r.height<=m.viewport[1],label+' inaccessible close');
 return m;
}
async function course(page,key,path,viewport){
 currentPage=page;
 const response=await page.goto(base+path,{waitUntil:'networkidle',timeout:60000});assert.ok(response.status()<400,path+' HTTP '+response.status());
 await dismiss(page);
 const trigger=page.getByRole('button',{name:/^Notre assistant va vous aider/}).first();await trigger.click();
 const dialog=page.locator('dialog[open]');await dialog.getByRole('heading',{name:'Comment pouvons-nous vous aider ?',exact:true}).waitFor();
 assert.equal(await dialog.locator('[data-assistant-design="compact"]').count(),1);
 const dimensions=await bounds(dialog,page,key);
 const info=dialog.getByRole('button',{name:/^Me renseigner/});const enroll=dialog.getByRole('button',{name:/^Préparer mon inscription/});
 const a=await info.boundingBox(),b=await enroll.boundingBox();
 if(viewport.width>600)assert.ok(Math.abs(a.y-b.y)<2&&b.x>a.x,'cards must be adjacent');else assert.ok(b.y>a.y&&Math.abs(a.x-b.x)<2,'cards must stack');
 await page.screenshot({path:`assistant-ui-artifacts/${key}-${viewport.width}x${viewport.height}.png`});
 await info.click();await dialog.getByRole('heading',{name:'Les informations essentielles',exact:true}).waitFor();await bounds(dialog,page,key+' result');
 assert.ok(await dialog.getByRole('heading',{name:'Informations clés',exact:true}).isVisible());
 assert.ok(await dialog.getByText('Prochaine formation',{exact:true}).isVisible());
 await dialog.getByRole('button',{name:'Retour aux choix',exact:true}).click();
 await enroll.click();await dialog.getByRole('heading',{name:'Préparons votre inscription',exact:true}).waitFor();
 const rdv=dialog.getByRole('link',{name:/Réserver un rendez-vous téléphonique/});assert.ok(await rdv.getAttribute('href'));
 await dialog.getByRole('button',{name:'Fermer l’assistant'}).click();await dialog.waitFor({state:'detached'});
 assert.ok(await trigger.evaluate(el=>el===document.activeElement),'focus restoration');
 assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');
 await trigger.click();await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});
 results.push({path,key,viewport,dimensions,status:'passed'});console.log('PASS',path,viewport.width,viewport.height);
}
try{
 for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
  const context=await browser.newContext({viewport,colorScheme:'light'});const page=await context.newPage();page.on('pageerror',e=>errors.push({url:page.url(),message:e.message}));
  for(const [key,path]of courses)await course(page,key,path,viewport);
  await page.goto(base+'/',{waitUntil:'networkidle'});await dismiss(page);
  await page.getByRole('button',{name:'Être conseillé',exact:true}).click();const dialog=page.locator('dialog[open]');
  for(const label of ['Agent de sécurité privée (APS)','Agent de protection physique des personnes (A3P)','Dirigeant d’entreprise de sécurité (DESP)','Chauffeur VTC','Un BTS en alternance']){
   await dialog.getByRole('button',{name:label,exact:true}).click();await dialog.getByRole('heading',{name:'Les informations essentielles',exact:true}).waitFor();await bounds(dialog,page,label);
   await dialog.getByRole('button',{name:'Retour aux formations',exact:true}).click();
  }
  await dialog.getByRole('button',{name:'Fermer l’assistant'}).click();
  await page.locator('[data-home-formation-options] button').first().click();await page.locator('dialog[open]').getByRole('heading',{name:'Les informations essentielles',exact:true}).waitFor();await page.keyboard.press('Escape');
  results.push({path:'/',viewport,choices:5,homeDock:true,status:'passed'});
  await page.goto(base+'/despvaeouinitial',{waitUntil:'networkidle'});await dismiss(page);await page.getByRole('button',{name:/^Me renseigner/}).click();await page.locator('dialog[open]').getByRole('heading',{name:'Les informations essentielles',exact:true}).waitFor();await bounds(page.locator('dialog[open]'),page,'inline DESP');await page.keyboard.press('Escape');
  assert.ok(await page.getByRole('button',{name:/^Me renseigner/}).isVisible());results.push({path:'/despvaeouinitial',viewport,inline:true,status:'passed'});
  await context.close();
 }
 for(const viewport of [{width:320,height:740},{width:768,height:1024},{width:1280,height:600},{width:844,height:390}]){
  const context=await browser.newContext({viewport,colorScheme:'light'});const page=await context.newPage();page.on('pageerror',e=>errors.push({url:page.url(),message:e.message}));await course(page,'aps','/formations-securite/aps',viewport);await context.close();
 }
 const context=await browser.newContext({viewport:{width:1440,height:900},colorScheme:'dark'});const page=await context.newPage();await course(page,'aps-dark','/formations-securite/aps',{width:1440,height:900});await context.close();
 assert.deepEqual(errors,[],'Browser JavaScript errors');
 console.log(JSON.stringify({status:'passed',scenarios:results.length,errors}));
}catch(error){if(currentPage&&!currentPage.isClosed()){await currentPage.screenshot({path:'assistant-ui-artifacts/failure.png'});console.error('PAGE STATE',await currentPage.locator('body').innerText().then(x=>x.slice(-5500)));}console.error(error);await writeFile('assistant-ui-artifacts/failure.txt',error.stack||String(error));throw error;}
finally{await writeFile('assistant-ui-artifacts/report.json',JSON.stringify({results,errors},null,2));await browser.close();}
