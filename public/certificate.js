import {modules,declarations,VERSION} from './content.js';
export function formatDate(value){return new Intl.DateTimeFormat('de-DE',{day:'2-digit',month:'2-digit',year:'numeric',timeZone:'Europe/Berlin'}).format(new Date(value));}
export async function createCertificate(record,resources={}){
 const {PDFDocument,rgb}=globalThis.PDFLib;
 const pdf=await PDFDocument.create();pdf.registerFontkit(globalThis.fontkit);
 const bytes=async(path)=>new Uint8Array(await (await fetch(path)).arrayBuffer());
 const [fontBytes,logoBytes]=await Promise.all([resources.font||bytes('assets/NotoSans-Regular.ttf'),resources.logo||bytes('assets/bk-west-logo.png')]);
 const font=await pdf.embedFont(fontBytes,{subset:true});const logo=await pdf.embedPng(logoBytes);
 const page=pdf.addPage([595.28,841.89]);const W=595.28,H=841.89;
 const color=h=>rgb(parseInt(h.slice(0,2),16)/255,parseInt(h.slice(2,4),16)/255,parseInt(h.slice(4,6),16)/255);
 const navy=color('08243b'),muted=color('586773'),lime=color('c9e600'),pink=color('e5007d'),blue=color('12a9df'),line=color('dce3e7');
 const rect=(x,top,w,h,c)=>page.drawRectangle({x,y:H-top-h,width:w,height:h,color:c});
 const text=(t,x,top,size=10,c=navy)=>page.drawText(t,{x,y:H-top-size,font,size,color:c});
 const wrap=(t,x,top,width,size=10,c=navy,leading=size*1.5)=>{let lines=[],current='';for(const word of t.split(/\s+/)){const attempt=current?current+' '+word:word;if(font.widthOfTextAtSize(attempt,size)<=width){current=attempt;continue;}if(current)lines.push(current);current='';for(const char of word){if(font.widthOfTextAtSize(current+char,size)>width){lines.push(current);current=char;}else current+=char;}}if(current)lines.push(current);for(let i=0;i<lines.length;i++)text(lines[i],x,top+i*leading,size,c);return top+lines.length*leading;};
 rect(0,0,W,9,navy);rect(0,9,W*.7,3,lime);rect(W*.7,9,W*.2,3,blue);rect(W*.9,9,W*.1,3,pink);
 page.drawImage(logo,{x:45,y:H-111,width:76,height:61.8});
 text('BERUFSKOLLEG WEST',145,57,13);text('DER STADT ESSEN',145,78,9,muted);text('DIGITALE VERANTWORTUNG',145,94,8,muted);
 rect(45,139,505,1,line);text('SCHULUNGSNACHWEIS',45,163,9,muted);text('ZERTIFIKAT',43,182,36);
 text('Digital. Aber verantwortlich.',45,233,17);text('Sicherer Umgang mit Leihgeräten und eigenen digitalen Geräten',45,263,9.2,muted);
 let y=wrap(record.name,45,303,505,23,navy,30);y=Math.max(347,y+10);rect(45,y,505,3,lime);y+=17;text('KLASSE  '+record.group,45,y,10);y+=32;
 y=wrap('hat die interaktive Schulung zu Leih-Tablets und Bring Your Own Device (BYOD) vollständig bearbeitet und den Abschlusstest erfolgreich bestanden.',45,y,505,10.3);y+=15;
 rect(45,y,505,45,color('f1f5f6'));text('ERGEBNIS',59,y+8,7.5,muted);text(`${record.score} von ${record.total} Punkten · ${Math.round(record.score/record.total*100)} %`,59,y+23,11);text('ABSCHLUSSDATUM',360,y+8,7.5,muted);text(formatDate(record.issuedAt),360,y+23,11);y+=67;
 text('BEHANDELTE THEMEN',45,y,8,muted);y+=19;
 const topics=['Leihgeräte, Sorgfalt und Haftung','Eigene Geräte und Unterrichtsregeln','Datenschutz und Accountsicherheit','Fotos, Videos und Tonaufnahmen','Rechtliche Folgen und Verantwortung','Urheberrecht und Hilfe bei Vorfällen'];
 topics.forEach((t,i)=>{const x=i%2===0?45:307;const top=y+Math.floor(i/2)*20;rect(x,top+5,4,4,i%2?blue:pink);text(t,x+12,top,8.5);});y+=75;
 text('PERSÖNLICHE BESTÄTIGUNGEN',45,y,8,muted);y+=18;
 const compact=['Schulung vollständig bearbeitet; erläuterte Regeln zur Kenntnis genommen.','Über mögliche schulische, zivilrechtliche und strafrechtliche Folgen informiert.','Zur Einhaltung der Nutzungsregeln und unverzüglichen Meldung von Vorfällen verpflichtet.'];
 compact.forEach(t=>{page.drawLine({start:{x:45,y:H-y-6},end:{x:48,y:H-y-9},thickness:1.2,color:navy});page.drawLine({start:{x:48,y:H-y-9},end:{x:53,y:H-y-2},thickness:1.2,color:navy});y=wrap(t,60,y,487,8.5,navy,12.3)+5;});
 rect(45,750,505,1,line);text('Nachweis-ID: '+record.id,45,762,8);text('Lernfassung: '+VERSION+' · Regeln: '+(record.rulesVersion||'BKW-2026-10-13-v3')+' · '+(record.ruleCount||14)+' Regeln bestätigt',45,777,6.7,muted);
 wrap('Digital erstellter Lernnachweis auf Grundlage der Namensangabe und der elektronischen Bestätigungen. Keine Identitätsprüfung oder digitale Signatur. Geltende Schulregeln und Leihvereinbarungen bleiben maßgeblich.',45,795,505,6.8,muted,9.5);
 pdf.setTitle('Zertifikat – Digital. Aber verantwortlich.');pdf.setAuthor('Berufskolleg West der Stadt Essen');pdf.setSubject('Schulungsnachweis für '+record.name);pdf.setCreator('Digital. Aber verantwortlich. · '+VERSION);pdf.setCreationDate(new Date(record.issuedAt));pdf.setModificationDate(new Date(record.issuedAt));
 if(y>741)throw new Error('Der Name ist für das Zertifikatslayout zu lang. Bitte wende dich an deine Lehrkraft.');
 return pdf.save();
}
