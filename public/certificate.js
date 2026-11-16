import {VERSION} from './content.js';
import {validateRecord,normalizeIdentity} from './core.js';
import {loadPdfResources} from './pdf-resources.js';
export function formatDate(value){return new Intl.DateTimeFormat('de-DE',{day:'2-digit',month:'2-digit',year:'numeric',timeZone:'Europe/Berlin'}).format(new Date(value));}
export async function checkCertificateIdentity(identity,resources){
 normalizeIdentity(identity.name,identity.group);
 if(!globalThis.fontkit?.create)throw new Error('Die PDF-Schrift wird noch geladen. Bitte versuche es gleich erneut.');
 const {font}=resources||await loadPdfResources();const face=globalThis.fontkit.create(font);
 if([...identity.name+' '+identity.group].some(char=>!face.hasGlyphForCodePoint(char.codePointAt(0))))throw new Error('Die Zertifikatsschrift unterstützt ein Zeichen in Name oder Klasse noch nicht. Bitte kläre mit der Lehrkraft eine passende Schreibweise, bevor du beginnst.');
}
export async function createCertificate(input,resources){
 const record=validateRecord(input);
 if(!globalThis.PDFLib?.PDFDocument||!globalThis.fontkit)throw new Error('Die PDF-Bibliothek wurde nicht geladen. Bitte lade die Seite neu; dein Stand bleibt in derselben Sitzung erhalten.');
 const assets=resources||await loadPdfResources();await checkCertificateIdentity(record,assets);
 const {PDFDocument,rgb}=globalThis.PDFLib;
 const pdf=await PDFDocument.create();pdf.registerFontkit(globalThis.fontkit);
 const font=await pdf.embedFont(assets.font,{subset:true}),logo=await pdf.embedPng(assets.logo);
 const page=pdf.addPage([595.28,841.89]),W=595.28,H=841.89;
 const color=h=>rgb(parseInt(h.slice(0,2),16)/255,parseInt(h.slice(2,4),16)/255,parseInt(h.slice(4,6),16)/255);
 const navy=color('08243b'),muted=color('586773'),lime=color('c9e600'),pink=color('e5007d'),blue=color('12a9df'),line=color('dce3e7');
 const rect=(x,top,w,h,c)=>page.drawRectangle({x,y:H-top-h,width:w,height:h,color:c});
 const text=(t,x,top,size=10,c=navy)=>page.drawText(t,{x,y:H-top-size,font,size,color:c});
 const lines=(t,width,size)=>{const out=[];let current='';for(const word of t.split(/\s+/)){const attempt=current?current+' '+word:word;if(font.widthOfTextAtSize(attempt,size)<=width){current=attempt;continue;}if(current)out.push(current);current='';for(const char of word){if(font.widthOfTextAtSize(current+char,size)>width){out.push(current);current=char;}else current+=char;}}if(current)out.push(current);return out;};
 const wrap=(t,x,top,width,size=10,c=navy,leading=size*1.45)=>{const list=lines(t,width,size);list.forEach((s,i)=>text(s,x,top+i*leading,size,c));return top+list.length*leading;};
 rect(0,0,W,9,navy);rect(0,9,W*.7,3,lime);rect(W*.7,9,W*.2,3,blue);rect(W*.9,9,W*.1,3,pink);
 page.drawImage(logo,{x:45,y:H-106,width:76,height:61.8});text('BERUFSKOLLEG WEST',145,53,13);text('DER STADT ESSEN',145,74,9,muted);text('DIGITALE VERANTWORTUNG',145,90,8,muted);
 rect(45,124,505,1,line);text('PERSÖNLICHER SCHULUNGSNACHWEIS',45,144,8,muted);text('ZERTIFIKAT',43,163,34);text('Digital. Aber verantwortlich.',45,212,17);
 text('Leihgeräte und eigene digitale Geräte im Unterricht',45,240,10,muted);
 let nameSize=23;while(nameSize>14&&lines(record.name,505,nameSize).length>2)nameSize--;
 wrap(record.name,45,272,505,nameSize,navy,nameSize*1.3);
 rect(45,338,505,3,lime);wrap('KLASSE  '+record.group,45,354,505,10,navy,14);
 wrap('hat die sechs Lernmodule bearbeitet, den Abschlusstest bestanden und die unten genannten Erklärungen elektronisch bestätigt.',45,387,505,10,navy,14.5);
 rect(45,432,505,44,color('f1f5f6'));text('ERGEBNIS',59,440,7.5,muted);text(record.score+' von 15 Punkten - '+Math.round(record.score/15*100)+' %',59,455,11);text('ABSCHLUSSDATUM',360,440,7.5,muted);text(formatDate(record.issuedAt),360,455,11);
 text('BEHANDELTE THEMEN',45,493,8,muted);
 const topics=['Leihgeräte, Sorgfalt und Haftung','Eigene Geräte und Unterrichtsregeln','Datenschutz und Accountsicherheit','Fotos, Videos und Tonaufnahmen','Verantwortung und faire Klärung','Urheberrecht und Hilfe bei Vorfällen'];
 topics.forEach((t,i)=>{const x=i%2===0?45:307,top=512+Math.floor(i/2)*18;rect(x,top+5,4,4,i%2?blue:pink);text(t,x+12,top,8.2);});
 text('PERSÖNLICH BESTÄTIGT',45,579,8,muted);
 const statements=['Schulung bearbeitet; alle 14 Regeln gelesen und zur Kenntnis genommen.','Rechte, Pflichten und mögliche Folgen im Einzelfall kennengelernt.','Geltende rechtmäßige Regeln einhalten und bei Vorfällen Hilfe holen.'];
 statements.forEach((s,i)=>{const y=597+i*16;page.drawLine({start:{x:45,y:H-y-5},end:{x:48,y:H-y-8},thickness:1,color:navy});page.drawLine({start:{x:48,y:H-y-8},end:{x:53,y:H-y-1},thickness:1,color:navy});text(s,60,y,8.1);});
 text('Persönlich bestätigt am '+formatDate(record.issuedAt),45,652,8,muted);
 if(record.signature.mode==='drawn'){for(const stroke of record.signature.strokes){for(let i=1;i<stroke.length;i++)page.drawLine({start:{x:45+stroke[i-1][0]*220,y:H-672-stroke[i-1][1]*57},end:{x:45+stroke[i][0]*220,y:H-672-stroke[i][1]*57},thickness:1.1,color:navy});}}else wrap(record.signedName,45,685,230,9,navy,12);
 text(record.signature.mode==='drawn'?'Schülerunterschrift':'Persönliche Namensbestätigung',45,738,7,muted);
 if(assets.teacher){const signature=await pdf.embedPng(assets.teacher);page.drawImage(signature,{x:335,y:H-704,width:145,height:52});}
 text('OStR Matthias Albrecht',315,708,10);text('Digitalisierungsbeauftragter',315,724,8);text(formatDate(record.issuedAt),315,738,8,muted);
 rect(45,758,505,1,line);text('Nachweis-ID: '+record.id,45,768,7.1);text('Lernfassung: '+VERSION+' | Regeln: '+record.rulesVersion,45,782,6.8,muted);
 wrap('Selbstlern-Nachweis mit selbst angegebenem Namen; keine Identitätsprüfung oder kryptografische Signatur. Die Bestätigung enthält weder eine pauschale Haftungsübernahme noch einen Verzicht auf Rechte. Lehrkraftunterschrift als autorisierte Grafik; keine kryptografische Signatur.',45,798,505,6.6,muted,9);
 pdf.setTitle('Zertifikat - Digital. Aber verantwortlich.');pdf.setAuthor('Digital. Aber verantwortlich.');pdf.setSubject('Selbstlern-Nachweis für '+record.name);pdf.setCreator('Digital. Aber verantwortlich. '+VERSION);pdf.setCreationDate(new Date(record.issuedAt));pdf.setModificationDate(new Date(record.issuedAt));
 return pdf.save();
}
