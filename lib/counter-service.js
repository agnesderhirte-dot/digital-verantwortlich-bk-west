import {VERSION} from '../public/content.js';

export const readCounterSql='SELECT attempts, passed FROM course_counter_totals WHERE namespace=$1';
export const recordCounterSql=`
WITH gate AS (
 INSERT INTO course_counter_limits(namespace, minute, requests)
 VALUES ($1, floor(extract(epoch from now())/60)::bigint, 1)
 ON CONFLICT(namespace) DO UPDATE SET
  minute=EXCLUDED.minute,
  requests=CASE WHEN course_counter_limits.minute=EXCLUDED.minute THEN course_counter_limits.requests+1 ELSE 1 END
 RETURNING requests
), accepted AS (
 INSERT INTO course_counter_receipts(namespace, attempt_id)
 SELECT $1, $2::uuid FROM gate WHERE requests<=600
 ON CONFLICT DO NOTHING RETURNING 1
), updated AS (
 UPDATE course_counter_totals SET attempts=attempts+1, passed=passed+$3::integer
 WHERE namespace=$1 AND EXISTS(SELECT 1 FROM accepted)
 RETURNING attempts, passed
)
SELECT
 COALESCE((SELECT attempts FROM updated),(SELECT attempts FROM course_counter_totals WHERE namespace=$1)) AS attempts,
 COALESCE((SELECT passed FROM updated),(SELECT passed FROM course_counter_totals WHERE namespace=$1)) AS passed,
 (SELECT requests FROM gate) AS requests,
 EXISTS(SELECT 1 FROM accepted) AS counted`;

export function summarizeCounter(row){
 const attempts=Number(row?.attempts),passed=Number(row?.passed);
 if(!Number.isSafeInteger(attempts)||!Number.isSafeInteger(passed)||attempts<0||passed<0||passed>attempts)throw Error('Invalid counter data');
 return {attempts,passed,passRate:attempts?Math.round(passed/attempts*100):null};
}

export function validateCounterSubmission(value){
 if(!value||Array.isArray(value)||typeof value!=='object'||Object.keys(value).sort().join(',')!=='attemptId,passed,version')throw Error('Invalid submission');
 if(value.version!==VERSION||typeof value.attemptId!=='string'||!/^\b[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b$/i.test(value.attemptId))throw Error('Invalid submission');
 if(typeof value.passed!=='boolean')throw Error('Invalid result');
 return {attemptId:value.attemptId,passed:value.passed};
}

const json=(body,status=200,headers={})=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}});
const unavailable=()=>json({error:'Zähler vorübergehend nicht verfügbar.'},503);

export function createCounterHandlers({query,namespace='preview',allowedOrigins=['https://digital-verantwortlich-bk-west.vercel.app'],reportError=()=>{}}){
 if(!['production','preview'].includes(namespace))throw Error('Invalid namespace');
 return {
  async GET(){
   try{const rows=await query(readCounterSql,[namespace]);return json(summarizeCounter(rows[0]),200,{'Cache-Control':'public, max-age=15, s-maxage=30, stale-while-revalidate=120'});}
   catch{reportError();return unavailable();}
  },
  async POST(request){
   if(!allowedOrigins.includes(request.headers.get('origin'))||request.headers.get('sec-fetch-site')==='cross-site')return json({error:'Nicht erlaubter Ursprung.'},403);
   if(request.headers.get('content-type')?.split(';')[0].trim()!=='application/json')return json({error:'JSON erforderlich.'},415);
   if(Number(request.headers.get('content-length'))>8192)return json({error:'Anfrage zu groß.'},413);
   let body;
   try{
    const reader=request.body?.getReader();if(!reader)throw Error();let bytes=0;const chunks=[];
    while(true){const {value,done}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>8192){await reader.cancel();return json({error:'Anfrage zu groß.'},413);}chunks.push(value);}
    const all=new Uint8Array(bytes);let offset=0;for(const chunk of chunks){all.set(chunk,offset);offset+=chunk.length;}
    body=validateCounterSubmission(JSON.parse(new TextDecoder().decode(all)));
   }catch{return json({error:'Unvollständige oder ungültige Testabgabe.'},400);}
   try{
    const rows=await query(recordCounterSql,[namespace,body.attemptId,body.passed?1:0]);
    if(Number(rows[0]?.requests)>600)return json({error:'Bitte später erneut versuchen.'},429,{'Retry-After':'60'});
    return json({...summarizeCounter(rows[0]),counted:rows[0].counted===true});
   }catch{reportError();return unavailable();}
  }
 };
}
