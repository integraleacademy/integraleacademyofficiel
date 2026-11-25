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
