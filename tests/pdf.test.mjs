import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {createCertificate,checkCertificateIdentity} from '../public/certificate.js';
import {VERSION} from '../public/content.js';
import {RULES_VERSION} from '../public/rules.js';
const source=await fs.readFile(new URL('../public/assets/pdf-lib.min.js',import.meta.url),'utf8');
const context={setTimeout,clearTimeout,Uint8Array,ArrayBuffer,TextEncoder,TextDecoder,Array,Date,Object};
vm.runInThisContext(source);vm.runInThisContext(await fs.readFile(new URL('../public/assets/fontkit.min.js',import.meta.url),'utf8'));

const font=await fs.readFile(new URL('../public/assets/NotoSans-Regular.ttf',import.meta.url)),logo=await fs.readFile(new URL('../public/assets/bk-west-logo.png',import.meta.url));
const teacher=await fs.readFile(new URL('../public/assets/albrecht-signature.png',import.meta.url));
const record=name=>({name,group:'W'.repeat(30),score:12,total:15,issuedAt:'2026-11-16T10:00:00Z',id:'BKW-12345678-1234-4234-8234-123456789ABC',version:VERSION,rulesVersion:RULES_VERSION,ruleCount:14,signedName:name});
test('PDF mit Umlauten, langem und maximal breitem Namen bleibt eine gültige A4-Seite',async()=>{for(const name of ['Léa Özdemir-Müller', 'Léa-Marie Özdemir-Müller Fernández de la Cruz Alexandra Sophie von Beispielhausen'.slice(0,80),'W'.repeat(80)]){const bytes=await createCertificate(record(name),{font,logo,teacher});assert.equal(Buffer.from(bytes.subarray(0,5)).toString(),'%PDF-');const pdf=await PDFLib.PDFDocument.load(bytes);assert.equal(pdf.getPageCount(),1);assert.equal(Math.round(pdf.getPage(0).getHeight()),842);}});
test('Gezeichnete Schülerunterschrift erzeugt ein gültiges PDF',async()=>{const bytes=await createCertificate({...record('Alex Beispiel'),signature:{mode:'drawn',strokes:[[[.1,.8],[.2,.2],[.35,.6],[.6,.3],[.8,.7]]]}},{font,logo,teacher});assert.ok(bytes.length>10000);});
test('Nicht unterstützte Zeichen werden schon vor Beginn statt erst beim Download erklärt',async()=>{await assert.rejects(checkCertificateIdentity({name:'Alex 😀 Beispiel',group:'IT26'},{font,logo,teacher}),/unterstützt ein Zeichen/);});
test('Ungültige Zertifikatsdaten werden vor der PDF-Erstellung abgewiesen',async()=>{await assert.rejects(createCertificate({...record('Alex Beispiel'),score:99},{font,logo,teacher}));});
if(process.env.WRITE_PDF_SAMPLE==='1'){await fs.mkdir('output',{recursive:true});await fs.writeFile('output/Zertifikat-geprueft.pdf',await createCertificate(record('Léa Özdemir-Müller'),{font,logo,teacher}));await fs.writeFile('output/Zertifikat-Langname.pdf',await createCertificate(record('W'.repeat(80)),{font,logo,teacher}));}



