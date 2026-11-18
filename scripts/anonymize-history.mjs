// Einmalige, ausdrücklich beauftragte Entfernung persönlicher Commit-E-Mail-Adressen.
// Keine Dateiinhalte werden verändert. --push nur im eigenen GitHub-Actions-Lauf.
import {execFileSync} from 'node:child_process';
const noreply='357091332+agnesderhirte-dot@users.noreply.github.com';
const git=(args,input)=>execFileSync('git',args,{input,maxBuffer:16*1024*1024});
const str=(args,input)=>git(args,input).toString('utf8').trim();
const oldHead=str(['rev-parse','HEAD']);
if(process.argv.includes('--push')&&(process.env.GITHUB_REPOSITORY!=='agnesderhirte-dot/digital-verantwortlich-bk-west'||process.env.GITHUB_SHA!==oldHead||process.env.GITHUB_REF!=='refs/heads/main'))throw Error('Zielrepository, Branch oder Startcommit stimmt nicht.');
const ids=str(['rev-list','--reverse','HEAD']).split('\n');
const replacements=new Map();let removedSignatures=0;
for(const id of ids){
 const raw=git(['cat-file','commit',id]);const split=raw.indexOf('\n\n');
 if(split<0)throw Error('Ungültiges Commitobjekt.');
 const lines=raw.subarray(0,split).toString('utf8').split('\n');const result=[];let skip=false;
 for(const line of lines){
  if(line.startsWith(' ')){if(!skip)result.push(line);continue;}
  skip=/^gpgsig(?:-sha256)? /.test(line);if(skip){removedSignatures++;continue;}
  if(line.startsWith('parent ')){const parent=replacements.get(line.slice(7));if(!parent)throw Error('Unvollständige Elternkette.');result.push('parent '+parent);}
  else if(/^(author|committer) /.test(line))result.push(line.replace(/<[^>]*>/,'<'+noreply+'>'));
  else result.push(line);
 }
 const rewritten=Buffer.concat([Buffer.from(result.join('\n')+'\n\n'),raw.subarray(split+2)]);
 const next=str(['hash-object','-t','commit','-w','--stdin'],rewritten);
 if(str(['rev-parse',id+'^{tree}'])!==str(['rev-parse',next+'^{tree}']))throw Error('Dateibaum verändert.');
 replacements.set(id,next);
}
const newHead=replacements.get(oldHead);
const emails=str(['log','--format=%ae%n%ce',newHead]).split('\n');
if(emails.some(email=>email!==noreply))throw Error('Commitadresse noch nicht bereinigt.');
if(str(['rev-list','--count',newHead])!==String(ids.length))throw Error('Historie unvollständig.');
console.log(JSON.stringify({commits:ids.length,removedSignatures,oldHead,newHead,allTreesPreserved:true}));
if(process.argv.includes('--push')&&newHead!==oldHead){
 const token=process.env.GITHUB_TOKEN;if(!token)throw Error('GitHub-Lauf nicht authentifiziert.');
 const header='AUTHORIZATION: basic '+Buffer.from('x-access-token:'+token).toString('base64');
 git(['-c','http.https://github.com/.extraheader='+header,'push','origin',newHead+':refs/heads/main','--force-with-lease=refs/heads/main:'+oldHead]);
 console.log('Aktuelle main-Historie ohne persönliche Commitadresse veröffentlicht. Alte GitHub-Caches und fremde Kopien sind davon nicht gelöscht.');
}
