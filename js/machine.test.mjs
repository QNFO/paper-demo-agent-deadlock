import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const src=html.split('/*MACHINE-START*/')[1].split('/*MACHINE-END*/')[0];
const M=new Function(src+';return Machine;')();
const D={r:1,c:1,i:0};
test('D=(1,1,0) has no compliant action under zero tolerance (P2)',()=>{
  assert.deepEqual(M.allowed(D,'zero'),[]);assert.ok(M.isDeadlock(D,'zero'));
});
test('escape hatch lets the agent refrain at D',()=>{
  assert.deepEqual(M.allowed(D,'escape'),['refrain']);
});
test('halt is never compliant',()=>{
  for(const r of[0,1])for(const c of[0,1])for(const i of[0,1])for(const v of['zero','escape'])assert.equal(M.compliant({r,c,i},'halt',v),false);
});
test('only D deadlocks among the reachable states',()=>{
  for(const [r,c,i] of [[1,1,1],[1,0,0],[0,1,0],[0,1,1],[0,0,0]])assert.ok(!M.isDeadlock({r,c,i},'zero'));
});
test('context event moves (1,1,1) to D (P1)',()=>{
  assert.ok(M.isD(M.contextEvent({r:1,c:1,i:1})));
});
test('exposure matches the paper: 0.40951 at q=0.1,n=5; 0.7927 at q=0.27',()=>{
  assert.ok(Math.abs(M.exposure(0.1,5)-0.40951)<1e-9);
  assert.ok(Math.abs(M.exposure(0.27,5)-0.7926928407)<1e-9);
});
test('task deadlocks only under zero tolerance',()=>{
  const t=[{name:'a',needed:true,status:'blocked'}];
  assert.equal(M.taskOutcome(t,'zero').deadlock,'a');
  assert.equal(M.taskOutcome(t,'escape').deadlock,null);
});
