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
  const cohort = {...row,slug:'ssiap-1',standard_start:'2098-02-09',sold:11};
  for (const stored of [[],[
    {...base,training:course,title:'SSIAP 1 avec SST'},
    {...base,id:'sans',training:course,title:'SSIAP 1 sans SST',startDate:cohort.standard_start},
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
