import fs from 'node:fs/promises';
const source='public/';
const read=p=>fs.readFile(source+p,'utf8');
let html=await read('index.html');const css=await read('style.css');
const files=['content.js','rules.js','core.js','certificate.js','api-client.js','app.js'];
const scripts=(await Promise.all(files.map(read))).map(s=>s.replace(/^import .*?;\r?\n/gm,'').replace(/^export /gm,'')).join('\n');
const libraries=(await Promise.all(['assets/pdf-lib.min.js','assets/fontkit.min.js'].map(read))).join('\n');
html=html.replace('<link rel="stylesheet" href="style.css">',`<style>${css}</style>`).replace(/<script[^>]*src="[^"]+"[^>]*><\/script>/g,'');
html=html.replace('</body>',`<script>${libraries.replace(/<\/script/gi,'<\\/script')}</script><script>(()=>{${scripts.replace(/<\/script/gi,'<\\/script')}\n})();</script></body>`);
for(const [name,mime] of [['bk-west-logo.svg','image/svg+xml'],['bk-west-logo.png','image/png'],['hero.jpg','image/jpeg'],['NotoSans-Regular.ttf','font/ttf'],['NotoSans-LICENSE.txt','text/plain']]){const bytes=await fs.readFile(source+'assets/'+name);html=html.replaceAll('assets/'+name,`data:${mime};base64,${bytes.toString('base64')}`);}
await fs.mkdir('output',{recursive:true});await fs.writeFile('output/index.html',html);await fs.writeFile('output/Digital-verantwortlich.html',html);
console.log('Unabhängige HTML-Datei erzeugt: '+html.length+' Zeichen; sämtliche Medien und PDF-Bibliotheken eingebettet.');
