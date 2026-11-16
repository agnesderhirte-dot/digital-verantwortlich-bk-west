import {VERSION,modules,questions,declarations} from './content.js';
import {RULES_VERSION,applicableRules} from './rules.js';
export const STORAGE_KEY='bkw-digital-session-v1';
export const emptyState=()=>({version:VERSION,identity:null,completed:[],exam:null,result:null,checks:[false,false,false],ruleChecks:[],rulesVersion:RULES_VERSION,certificate:null});
export function normalizeIdentity(name,group){
 if(typeof name!=='string'||typeof group!=='string')throw new Error('Bitte gib deinen Namen und deine Klasse ein.');
 name=name.normalize('NFC').trim().replace(/\s+/g,' ');group=group.normalize('NFC').trim().replace(/\s+/g,' ');
 if(name.length<3||name.length>80||!/\p{L}/u.test(name)||/[\p{Cc}\p{Cf}<>]/u.test(name))throw new Error('Bitte gib deinen vollständigen Namen ein (3–80 Zeichen).');
 if(!group||group.length>30||/[\p{Cc}\p{Cf}<>]/u.test(group))throw new Error('Bitte gib deine Klasse ein (maximal 30 Zeichen).');
 return {name,group};
}
export const allComplete=s=>Array.isArray(s?.completed)&&modules.every(m=>s.completed.includes(m.id));
export function shuffled(values,rng=Math.random){const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function makeExam(rng=Math.random){const selected=modules.flatMap(m=>shuffled(questions.filter(q=>q.module===m.id),rng).slice(0,2));const rest=shuffled(questions.filter(q=>!selected.includes(q)),rng).slice(0,3);return shuffled([...selected,...rest],rng).map(q=>({id:q.id,order:shuffled(q.options.map((_,i)=>i),rng),answer:null}));}
export function grade(exam){
 if(!Array.isArray(exam)||exam.length!==15||exam.some(e=>!e||typeof e!=='object')||new Set(exam.map(e=>e.id)).size!==15)throw new Error('Ungültiger Test. Bitte starte ihn neu.');
 const entries=exam.map(e=>{const q=questions.find(q=>q.id===e.id);if(!q||!Number.isInteger(e.answer)||e.answer<0||e.answer>=q.options.length)throw new Error('Bitte beantworte alle 15 Fragen.');return {id:q.id,answer:e.answer,correct:e.answer===q.answer};});
 if(modules.some(m=>entries.filter(e=>questions.find(q=>q.id===e.id).module===m.id).length<2))throw new Error('Der Test muss alle sechs Themen abdecken. Bitte starte ihn neu.');
 const score=entries.filter(e=>e.correct).length;return {score,total:15,passed:score>=12,entries};
}
export function gradeGame(game,answers){
 const valid=(v,n)=>Number.isInteger(v)&&v>=0&&v<n;
 if(!game||!Array.isArray(answers))return false;
 if(game.kind==='sort')return answers.length===game.items.length&&game.items.every((item,i)=>valid(answers[i],(game.labels||[0,1,2]).length)&&answers[i]===item.answer);
 if(game.kind==='multi')return answers.length===game.answer.length&&new Set(answers).size===answers.length&&answers.every(v=>valid(v,game.options.length))&&game.answer.every(v=>answers.includes(v));
 return answers.length===1&&valid(answers[0],game.options.length)&&answers[0]===game.answer;
}
export function canCertify(s){try{
 if(!s||!s.identity||!allComplete(s)||!s.result||!Array.isArray(s.checks)||!declarations.every((_,i)=>s.checks[i]===true)||s.rulesVersion!==RULES_VERSION||!Array.isArray(s.ruleChecks)||!applicableRules().every(r=>s.ruleChecks.includes(r.id)))return false;
 normalizeIdentity(s.identity.name,s.identity.group);return grade(s.result.entries).passed;
 }catch{return false;}}
export function validateSignature(value){
 if(!value||!['drawn','typed'].includes(value.mode))throw new Error('Bitte unterschreibe oder wähle die Namensbestätigung als Alternative.');
 if(value.mode==='typed')return {mode:'typed',strokes:[]};
 const lines=value.strokes;if(!Array.isArray(lines)||lines.length>100||!lines.length||lines.some(line=>!Array.isArray(line)||line.length<1)||lines.reduce((n,line)=>n+line.length,0)>5000||lines.some(line=>line.some(p=>!Array.isArray(p)||p.length!==2||p.some(v=>typeof v!=='number'||!Number.isFinite(v)||v<0||v>1)))||!lines.some(line=>line.length>1&&line.some(p=>Math.abs(p[0]-line[0][0])+Math.abs(p[1]-line[0][1])>.01)))throw new Error('Bitte zeichne deine Unterschrift oder wähle die Alternative ohne Zeichnen.');
 return {mode:'drawn',strokes:lines.map(line=>line.map(p=>[...p]))};
}
export function validateRecord(record){
 if(!record||typeof record!=='object')throw new Error('Der Nachweis ist unvollständig. Bitte bestätige den Abschluss erneut.');
 const identity=normalizeIdentity(record.name,record.group);
 if(record.version!==VERSION||record.rulesVersion!==RULES_VERSION||record.ruleCount!==applicableRules().length||!Number.isInteger(record.score)||record.score<12||record.score>15||record.total!==15||typeof record.id!=='string'||!/^BKW-[0-9A-F-]{36}$/.test(record.id)||typeof record.issuedAt!=='string'||!Number.isFinite(Date.parse(record.issuedAt))||record.signedName!==identity.name)throw new Error('Der Nachweis ist ungültig. Bitte bestätige den Abschluss erneut.');
 return {...identity,score:record.score,total:15,issuedAt:new Date(record.issuedAt).toISOString(),id:record.id,version:VERSION,rulesVersion:RULES_VERSION,ruleCount:applicableRules().length,signedName:identity.name,signature:validateSignature(record.signature||{mode:'typed'})};
}
export function createRecord(s,signedName,{now=new Date(),id=globalThis.crypto.randomUUID()}={},signature={mode:'typed'}){
 if(!canCertify(s))throw new Error('Bitte bearbeite alle Module, bestehe den Test und bestätige alle Regeln.');
 if(typeof signedName!=='string'||signedName.normalize('NFC').trim().replace(/\s+/g,' ')!==s.identity.name)throw new Error('Bitte bestätige mit genau dem Namen, den du zu Beginn angegeben hast.');
 return validateRecord({...s.identity,score:grade(s.result.entries).score,total:15,issuedAt:s.result.finishedAt||now.toISOString(),id:'BKW-'+id.toUpperCase(),version:VERSION,rulesVersion:RULES_VERSION,ruleCount:applicableRules().length,signedName:s.identity.name,signature:validateSignature(signature)});
}
export function restore(raw){try{
 const input=JSON.parse(raw);if(!input||input.version!==VERSION||!input.identity)return emptyState();
 const s=emptyState();s.identity=normalizeIdentity(input.identity.name,input.identity.group);
 s.completed=Array.isArray(input.completed)?modules.filter(m=>input.completed.includes(m.id)).map(m=>m.id):[];
 s.checks=declarations.map((_,i)=>input.checks?.[i]===true);s.ruleChecks=Array.isArray(input.ruleChecks)?applicableRules().filter(r=>input.ruleChecks.includes(r.id)).map(r=>r.id):[];s.rulesVersion=input.rulesVersion===RULES_VERSION?RULES_VERSION:null;
 if(input.result){try{s.result={...grade(input.result.entries),...(typeof input.result.finishedAt==='string'&&Number.isFinite(Date.parse(input.result.finishedAt))?{finishedAt:input.result.finishedAt}:{})};}catch{}}
 if(Array.isArray(input.exam)&&input.exam.length===15&&new Set(input.exam.map(e=>e?.id)).size===15){const exam=input.exam.map(e=>{const q=questions.find(q=>q.id===e?.id);if(!q||!Array.isArray(e.order)||e.order.length!==q.options.length||new Set(e.order).size!==q.options.length||e.order.some(i=>!Number.isInteger(i)||i<0||i>=q.options.length)||!(e.answer===null||Number.isInteger(e.answer)&&e.answer>=0&&e.answer<q.options.length))throw Error();return {id:q.id,order:[...e.order],answer:e.answer};});grade(exam.map(e=>({...e,answer:e.answer??0})));s.exam=exam;}
 if(input.certificate&&canCertify(s)){try{const record=validateRecord(input.certificate);if(record.name===s.identity.name&&record.group===s.identity.group&&record.score===s.result.score)s.certificate=record;}catch{}}
 return s;
 }catch{return emptyState();}}
