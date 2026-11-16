export const connectedMode=location.protocol!=='file:'&&document.documentElement.dataset.learningMode!=='self-study';
export async function apiCall(path,data){
 if(!connectedMode)throw new Error('Die zentrale Klassenübersicht funktioniert über die gehostete Online-Seite.');
 let response;try{response=await fetch('/api/'+path,{method:data===undefined?'GET':'POST',credentials:'same-origin',cache:'no-store',headers:data===undefined?{}:{'Content-Type':'application/json'},body:data===undefined?undefined:JSON.stringify(data),signal:AbortSignal.timeout(15000)});}catch{throw new Error('Der Server ist gerade nicht erreichbar. Bitte erneut versuchen.');}
 let value;try{value=await response.json();}catch{throw new Error('Die zentrale Lernstandsübersicht ist auf dieser Vorschau noch nicht eingerichtet.');}
 if(!response.ok){const e=new Error(value.error||'Die Anfrage ist fehlgeschlagen.');e.status=response.status;throw e;}return value;
}
