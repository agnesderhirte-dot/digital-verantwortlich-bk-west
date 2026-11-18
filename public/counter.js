import {VERSION} from './content.js';

export function counterPayload(result){
 if(!result?.counter||result.counter.sent||typeof result.passed!=='boolean')return null;
 return {attemptId:result.counter.attemptId,version:VERSION,passed:result.passed};
}

export function formatCounter(data){
 if(!data||!Number.isSafeInteger(data.attempts)||!Number.isSafeInteger(data.passed)||data.attempts<0||data.passed<0||data.passed>data.attempts)throw Error('Invalid counter');
 const percent=data.attempts?Math.round(data.passed/data.attempts*100)+' %':'–';
 return `Tests: ${data.attempts.toLocaleString('de-DE')} · bestanden: ${percent}`;
}

export function initCounter({getState,save,doc=document,fetcher=fetch,page=location}){
 const element=doc.querySelector('#course-counter');let pending=null;
 if(!element)return {submit:()=>Promise.resolve()};
 // Die eigenständige HTML-Datei bleibt vollständig offline. Auch alte lokale Tests werden nicht nachgesendet.
 if(!['http:','https:'].includes(page.protocol)){element.hidden=true;return {submit:()=>Promise.resolve()};}
 element.hidden=false;
 const render=data=>{element.textContent=formatCounter(data);element.title='Seit 18.11.2026: abgeschlossene Online-Testversuche einschließlich Wiederholungen. Keine eindeutige Personenzahl.';};
 const options=()=>({credentials:'omit',referrerPolicy:'no-referrer',signal:AbortSignal.timeout(10000)});
 async function refresh(){try{const response=await fetcher('/api/counter',options());if(response.ok)render(await response.json());else element.title='Zähler vorübergehend nicht verfügbar.';}catch{element.title='Zähler vorübergehend nicht verfügbar.';}}
 async function submit(){
  if(pending)return pending;
  const result=getState().result;const payload=counterPayload(result);if(!payload)return;
  pending=Promise.resolve().then(async()=>{
   try{
    const response=await fetcher('/api/counter',{...options(),method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    if(!response.ok)return;
    const data=await response.json();render(data);
    if(getState().result?.counter?.attemptId===payload.attemptId){getState().result.counter.sent=true;save();}
   }catch{}
  }).finally(()=>{pending=null;});return pending;
 }
 void refresh();void submit();
 doc.addEventListener('visibilitychange',()=>{if(doc.visibilityState==='visible'){void refresh();void submit();}});
 // Nur eine Aktualisierung pro Minute und nur solange die Seite sichtbar ist.
 const interval=setInterval(()=>{if(doc.visibilityState==='visible'){void refresh();void submit();}},60000);
 interval.unref?.();
 return {submit};
}
