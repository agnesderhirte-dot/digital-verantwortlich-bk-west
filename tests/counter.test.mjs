import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {VERSION,questions,modules} from '../public/content.js';
import {emptyState,makeExam,grade,restore} from '../public/core.js';
import {counterPayload,formatCounter,initCounter} from '../public/counter.js';
import {createCounterHandlers,summarizeCounter,validateCounterSubmission} from '../lib/counter-service.js';

const valid=()=>({version:VERSION,attemptId:randomUUID(),passed:true});
const request=(body,headers={})=>new Request('https://digital-verantwortlich-bk-west.vercel.app/api/counter',{method:'POST',headers:{origin:'https://digital-verantwortlich-bk-west.vercel.app','content-type':'application/json',...headers},body:JSON.stringify(body)});

test('Statistik enthält nur Abgabe-ID, Version und Ergebnis; keine Identität, Antworten oder Unterschrift',()=>{
 const counter={attemptId:randomUUID(),sent:false};
 assert.deepEqual(Object.keys(counterPayload({counter,passed:true,name:'Test Person',group:'TEST',entries:[{id:'l1',answer:1}],signature:'privat'})).sort(),['attemptId','passed','version']);
 assert.equal(counterPayload({passed:true}),null);assert.equal(counterPayload({passed:true,counter:{...counter,sent:true}}),null);
 for(const extra of [{name:'Test Person'},{group:'TEST'},{entries:[]},{signature:[]},{score:15}])assert.throws(()=>validateCounterSubmission({...valid(),...extra}));
 for(const passed of ['true',1,null,undefined])assert.throws(()=>validateCounterSubmission({...valid(),passed}));
 assert.throws(()=>validateCounterSubmission({...valid(),version:'veraltet'}));
 assert.throws(()=>validateCounterSubmission({...valid(),attemptId:'<script>'}));
 assert.equal(validateCounterSubmission({...valid(),passed:false}).passed,false);
});

test('Prozentrechnung nutzt bestandene Testversuche; bei leerer Statistik kein erfundener Prozentsatz',()=>{
 assert.deepEqual(summarizeCounter({attempts:'12',passed:'9'}),{attempts:12,passed:9,passRate:75});
 assert.equal(formatCounter({attempts:12,passed:9}),'Tests: 12 · bestanden: 75 %');
 assert.equal(formatCounter({attempts:0,passed:0}),'Tests: 0 · bestanden: –');
 for(const data of [{attempts:0,passed:1},{attempts:-1,passed:0},{attempts:NaN,passed:0}])assert.throws(()=>summarizeCounter(data));
});

test('Doppelzählungsschutz bleibt nach Neuladen erhalten; vorhandene alte Abschlüsse werden nicht rückwirkend gemeldet',()=>{
 const counter={attemptId:randomUUID(),sent:false};
 const s={...emptyState(),identity:{name:'Test Person',group:'TEST'},completed:modules.map(m=>m.id),result:{...grade(makeExam().map(e=>({...e,answer:questions.find(q=>q.id===e.id).answer}))),counter}};
 assert.deepEqual(restore(JSON.stringify(s)).result.counter,counter);
 assert.equal(restore(JSON.stringify({...s,result:{...s.result,counter:{...counter,sent:true}}})).result.counter.sent,true);
 const old={...s.result};delete old.counter;assert.equal(counterPayload(restore(JSON.stringify({...s,result:old})).result),null);
});

test('Offline-Kurs sendet keine Zähleranfragen und blendet die zentrale Anzeige aus',async()=>{
 const element={hidden:false};let calls=0;
 const client=initCounter({getState:()=>({result:{passed:true,counter:{attemptId:randomUUID(),sent:false}}}),save:()=>{},doc:{querySelector:()=>element},fetcher:()=>{calls++;throw Error();},page:{protocol:'file:'}});
 await client.submit();assert.equal(calls,0);assert.equal(element.hidden,true);
});

test('Gleichzeitiges Absenden im Client verwendet eine Anfrage und bestätigt erst nach erfolgreicher Antwort',async()=>{
 const element={};const state={result:{passed:false,counter:{attemptId:randomUUID(),sent:false}}};let posts=0,saves=0;
 const doc={querySelector:()=>element,addEventListener:()=>{},visibilityState:'hidden'};
 const client=initCounter({getState:()=>state,save:()=>{saves++;},doc,page:{protocol:'https:'},fetcher:async(url,options)=>{
  if(options.method==='POST'){posts++;assert.deepEqual(Object.keys(JSON.parse(options.body)).sort(),['attemptId','passed','version']);assert.equal(options.credentials,'omit');}
  return Response.json({attempts:4,passed:3,counted:true});
 }});
 await Promise.all([client.submit(),client.submit()]);assert.equal(posts,1);assert.equal(saves,1);assert.equal(state.result.counter.sent,true);assert.equal(element.textContent,'Tests: 4 · bestanden: 75 %');
 await client.submit();assert.equal(posts,1);
});

test('Bei vorübergehendem Sendefehler bleibt dieselbe Kennung für einen späteren Versuch erhalten',async()=>{
 const state={result:{passed:true,counter:{attemptId:randomUUID(),sent:false}}};const ids=[];let fail=true;
 const doc={querySelector:()=>({}),addEventListener:()=>{},visibilityState:'hidden'};
 const client=initCounter({getState:()=>state,save:()=>{},doc,page:{protocol:'https:'},fetcher:async(url,options)=>{
  if(options.method!=='POST')return Response.json({attempts:0,passed:0});ids.push(JSON.parse(options.body).attemptId);
  return fail?new Response('',{status:503}):Response.json({attempts:1,passed:1,counted:true});
 }});
 await client.submit();assert.equal(state.result.counter.sent,false);fail=false;await client.submit();
 assert.equal(ids.length,2);assert.equal(ids[0],ids[1]);assert.equal(state.result.counter.sent,true);
});

test('Fremde Ursprünge, zusätzliche Schülerdaten, falscher Typ und große Anfrage erreichen die Datenbank nicht',async()=>{
 let calls=0;const handlers=createCounterHandlers({query:async()=>{calls++;return [];}});
 for(const [req,status] of [[request(valid(),{origin:'https://fremd.example'}),403],[request(valid(),{'content-type':'text/plain'}),415],[request({...valid(),name:'Test Person'}),400],[request(valid(),{'content-length':'9000'}),413],[request({...valid(),passed:'ja'}),400]])assert.equal((await handlers.POST(req)).status,status);
 assert.equal(calls,0);
});

test('Zählerfehler bleiben ohne technische Interna; Schreiben mit unveränderlichem Namensraum und Serverparametern',async()=>{
 let params;const h=createCounterHandlers({namespace:'preview',query:async(sql,p)=>{params=p;return [{attempts:2,passed:1,requests:1,counted:true}];}});
 const body=valid();const response=await h.POST(request(body));assert.equal(response.status,200);assert.deepEqual(params,['preview',body.attemptId,1]);assert.equal((await response.json()).passRate,50);
 const broken=createCounterHandlers({query:async()=>{throw Error('secret://private');}});
 const failure=await broken.GET();assert.equal(failure.status,503);assert.doesNotMatch(await failure.text(),/secret|private/);
 const busy=createCounterHandlers({query:async()=>[{requests:601}]});assert.equal((await busy.POST(request(valid()))).status,429);
});
