import {neon} from '@neondatabase/serverless';
import {createCounterHandlers} from '../lib/counter-service.js';

// Alle Datenbankzugänge bleiben ausschließlich in der Serverumgebung.
const query=async(text,params)=>{
 const url=process.env.COUNTER_DATABASE_URL;if(!url)throw Error('Counter unavailable');
 const sql=neon(url,{fetchOptions:{signal:AbortSignal.timeout(8000)}});
 return sql.query(text,params);
};
const origins=['https://digital-verantwortlich-bk-west.vercel.app'];
if(process.env.VERCEL_ENV!=='production'&&process.env.VERCEL_URL)origins.push('https://'+process.env.VERCEL_URL);
const handlers=createCounterHandlers({query,namespace:process.env.VERCEL_ENV==='production'?'production':'preview',allowedOrigins:origins,reportError:()=>console.error('Course counter request failed; request contents are not logged.')});
export const GET=handlers.GET;
export const POST=handlers.POST;
