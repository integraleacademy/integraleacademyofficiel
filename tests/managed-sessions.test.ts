import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeManagedSessions, type CatalogueRow } from '../src/lib/managed-sessions';
import { createHomeSecurityHighlights } from '../src/lib/home-security-trainings';

const training = {id:'t',name:'APS',slug:'aps',isActive:true,pageUrl:'/formations-securite/aps'};
const row: CatalogueRow = {id:'platform-test',slug:'aps',centre:'puget',start:'2098-02-05',end:'2098-02-28',exam:'2098-03-01',
  aliases:[],visibility:'public',capacity:12,sold:7};
const base = {id:'existing',training,startDate:row.start,endDate:row.end,examDate:row.exam,location:'Puget-sur-Argens',status:'OPEN',seatsLeft:12};

test('les ventes, puis une annulation, actualisent la même fiche et la carte accueil', () => {
  for (const [sold,left] of [[7,5],[12,0],[13,0],[11,1]]) {
    const [session] = mergeManagedSessions([base],[training],[{...row,sold}]);
    assert.equal(session.id, 'existing'); assert.equal(session.seatsLeft,left);
    assert.equal(session.status, left === 0 ? 'FULL' : 'OPEN');
    assert.equal(createHomeSecurityHighlights([session], '2098-01-01')[0].places, left===0?'Complet':left===1?'1 place restante':'5 places restantes');
  }
});
test('création, réédition, retrait et sessions historiques', () => {
  const [created]=mergeManagedSessions([], [training], [row]); assert.equal(created.id,row.id);
  const [moved]=mergeManagedSessions([base],[training],[{...row, start:'2098-04-02',end:'2098-05-03',exam:'2098-05-04',aliases:[row]}]);
  assert.equal(moved.id,'existing'); assert.equal(moved.startDate.toISOString().slice(0,10),'2098-04-02');
  assert.deepEqual(mergeManagedSessions([base],[training],[{...row,visibility:'internal'}]),[]);
  assert.deepEqual(mergeManagedSessions([],[training],[{...row,visibility:'match'}]),[]);
  assert.equal(mergeManagedSessions([base],[training],[])[0].seatsLeft,null);
  assert.equal(mergeManagedSessions([base],[training],[row,{...row,id:'autre'}])[0].seatsLeft,null);
});

test('un report du seul début SSIAP conserve le décalage propre à la formule', () => {
  const course = {...training,slug:'ssiap-1'};
  const original = {...row,slug:'ssiap-1'};
  const moved = {...original,start:'2098-02-06',aliases:[original]};
  const [session]=mergeManagedSessions([{...base,training:course,title:'SSIAP 1 sans SST'}],[course],[moved]);
  assert.equal(session.startDate.toISOString().slice(0,10),'2098-02-06');
});

test('les deux formules SSIAP partagent les places et conservent leurs dates individuelles', () => {
  const course = {...training,slug:'ssiap-1'};
  const cohort = {...row,slug:'ssiap-1',standard_start:'2098-02-09',exam:'',sold:11};
  for (const stored of [[],[
    {...base,examDate:null,training:course,title:'SSIAP 1 avec SST'},
    {...base,id:'sans',examDate:null,training:course,title:'SSIAP 1 sans SST',startDate:cohort.standard_start},
  ]]) {
    const sessions = mergeManagedSessions(stored,[course],[cohort]);
    assert.deepEqual(sessions.map(s => [s.startDate.toISOString().slice(0,10),s.seatsLeft]),[[row.start,1],[cohort.standard_start,1]]);
    assert.notEqual(sessions[0].id,sessions[1].id);
  }
});

test('un recyclage reporté reste rattaché au groupe SSIAP et reprend son compteur', () => {
  const course = {...training,slug:'recyclage-ssiap-1'};
  const cohort = {...row,slug:course.slug,start:'2098-02-24',end:'2098-02-25',exam:'',sold:11,
    group_periods:[{centre:row.centre,start:row.start,end:row.end}]};
  const original = {...base,training:course,title:'Recyclage SSIAP 1',startDate:'2098-02-22',endDate:'2098-02-23',examDate:null};
  const [session] = mergeManagedSessions([original],[course],[cohort]);
  assert.equal(session.seatsLeft,1);
  assert.equal(session.startDate.toISOString().slice(0,10),cohort.start);
  assert.deepEqual(mergeManagedSessions([original],[course],[{...cohort,visibility:'closed'}]),[]);
});

test('une seule formule existante est complétée et une formule volontairement masquée reste masquée', () => {
  const course = {...training,slug:'ssiap-1'};
  const cohort = {...row,slug:'ssiap-1',exam:'',standard_start:'2098-02-09',sold:11};
  const avec = {...base,training:course,examDate:null,title:'SSIAP 1 avec SST'};
  const sans = {...base,id:'sans',training:course,examDate:null,title:'SSIAP 1 sans SST',startDate:cohort.standard_start};
  for (const one of [avec,sans]) {
    const result = mergeManagedSessions([one],[course],[cohort]);
    assert.deepEqual(result.map(s=>s.title).sort(),[avec.title,sans.title]);
    assert.ok(result.every(s=>s.seatsLeft===1));
  }
  const visible = mergeManagedSessions([avec,{...sans,status:'HIDDEN'}],[course],[cohort]);
  assert.deepEqual(visible.map(s=>s.title),[avec.title]);
  assert.equal(mergeManagedSessions([{...base,status:'FULL'}],[training],[])[0].status,'OPEN');
});

test('le report, le nom, le lieu et le retrait remplacent la fiche du planning public', () => {
  const former = {...base, title: 'Ancienne promotion', remoteStartDate: row.start};
  const scheduled = {...row, managed:true, edited:true, visibility:'match' as const, name:'Promotion Atlas',
    start:'2098-05-05',end:'2098-06-01',exam:'',venue:'Salle Atlas',aliases:[row]};
  const [session] = mergeManagedSessions([former],[training],[scheduled]);
  assert.equal(session.title,'Promotion Atlas');
  assert.equal(session.location,'Puget-sur-Argens · Salle Atlas');
  assert.equal(session.startDate.toISOString().slice(0,10),scheduled.start);
  assert.equal(session.examDate,null); assert.equal(session.remoteStartDate,null);
  const hidden = {...scheduled,visibility:'closed' as const};
  const local = {...row,managed:false,id:'gestion-ancien',visibility:'match' as const};
  assert.deepEqual(mergeManagedSessions([former],[training],[local,hidden]),[]);
  const replacement = {...row,managed:true,edited:true,name:'Nouvelle promotion',id:'platform-nouveau',sold:2};
  for (const withdrawn of [hidden,{...hidden,deleted:true}]) {
    const [offer,...others] = mergeManagedSessions([former],[training],[withdrawn,local,replacement]);
    assert.deepEqual(others,[]);
    assert.deepEqual([offer.id,offer.title,offer.seatsLeft],[replacement.id,replacement.name,10]);
  }
});

test('un changement de niveau SSIAP retire les anciennes cartes et publie le bon programme', () => {
  const initial = {...row,slug:'ssiap-1'};
  const next = {...row,slug:'ssiap-3',name:'SSIAP 3 Juin',managed:true,edited:true,aliases:[initial]};
  const course1={...training,slug:'ssiap-1'}, course3={...training,id:'t3',slug:'ssiap-3',name:'SSIAP 3'};
  const card={...base,training:course1,title:'SSIAP 1 avec SST'};
  for(const visibility of ['public','match'] as const){
    const projected = mergeManagedSessions([card],[course1,course3],[{...next,visibility}]);
    assert.deepEqual(projected.map(o=>[o.training.slug,o.title,o.id]),[['ssiap-3','SSIAP 3 Juin',row.id]]);
  }
});
