import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {legalPages} from '../public/legal-pages.js';

test('Rechtshinweise sind in Anwendung und Offline-Build eingebunden, offene Hostingangaben bleiben erkennbar',async()=>{
 const app=await fs.readFile(new URL('../public/app.js',import.meta.url),'utf8');
 const build=await fs.readFile(new URL('../build-independent.mjs',import.meta.url),'utf8');
 assert.match(app,/import \{legalPages\}/);assert.match(app,/\.\.\.legalPages/);assert.match(build,/'legal-pages\.js'/);
 const [imprint,privacy]=[legalPages.impressum[2],legalPages.datenschutz[2]];
 assert.match(imprint,/Am Westbahnhof 3–5/);assert.match(imprint,/45144 Essen/);
 assert.match(imprint,/matthias\.albrecht@berufskolleg-west\.de/);
 assert.match(privacy,/peter\.engels@berufskolleg-west\.de/);
 assert.match(privacy,/nicht abschließend verifiziert/);assert.match(privacy,/Art\. 77/);
 for(const text of [imprint,privacy]){assert.match(text,/Entwurf zur schulischen Prüfung/);assert.doesNotMatch(text,/googlemail|gmail\.com|Private Vorschau/);}
});
