export function signatureField(){return `<fieldset class="signature-panel"><legend>Deine persönliche Unterschrift</legend><label class="check-row"><input type="radio" name="signature-mode" value="drawn" checked><span>Mit Finger, Stift oder Maus unterschreiben</span></label><canvas id="signature-pad" width="900" height="240" aria-label="Zeichenfläche für deine Unterschrift"></canvas><button type="button" class="button secondary" id="clear-signature">Unterschrift löschen</button><p id="signature-status" role="status">Noch keine Unterschrift gezeichnet.</p><label class="check-row"><input type="radio" name="signature-mode" value="typed"><span>Alternative ohne Zeichnen: meine persönliche Namensbestätigung verwenden</span></label><p class="small">Die Unterschrift bleibt in dieser Browsersitzung und erscheint im PDF. Keine Identitätsprüfung oder kryptografische Signatur.</p></fieldset>`;}
export function bindSignature(form){
 const canvas=form.querySelector('#signature-pad'),ctx=canvas.getContext('2d');let strokes=[],active=null;
 const status=form.querySelector('#signature-status');
 const draw=()=>{ctx.clearRect(0,0,canvas.width,canvas.height);ctx.strokeStyle='#08243b';ctx.lineWidth=2.5;ctx.lineCap='round';for(const line of strokes){ctx.beginPath();line.forEach(([x,y],i)=>i?ctx.lineTo(x*900,y*240):ctx.moveTo(x*900,y*240));ctx.stroke();}status.textContent=strokes.some(s=>s.length>1)?'Unterschrift erfasst. Du kannst sie löschen und neu zeichnen.':'Noch keine Unterschrift gezeichnet.';};
 const point=e=>{const box=canvas.getBoundingClientRect();return [Math.max(0,Math.min(1,(e.clientX-box.left)/box.width)),Math.max(0,Math.min(1,(e.clientY-box.top)/box.height))];};
 canvas.onpointerdown=e=>{if(e.button!==0||active!==null||strokes.length>=100)return;e.preventDefault();canvas.setPointerCapture(e.pointerId);active=e.pointerId;strokes.push([point(e)]);};
 canvas.onpointermove=e=>{if(active!==e.pointerId)return;if(strokes.reduce((n,s)=>n+s.length,0)>=5000)return;strokes.at(-1).push(point(e));draw();};
 const end=e=>{if(active!==e.pointerId)return;active=null;draw();};canvas.onpointerup=end;canvas.onpointercancel=end;
 form.querySelector('#clear-signature').onclick=()=>{strokes=[];draw();};
 for(const radio of form.querySelectorAll('[name="signature-mode"]'))radio.addEventListener('change',()=>{const typed=radio.checked&&radio.value==='typed';canvas.hidden=typed;form.querySelector('#clear-signature').hidden=typed;});
 return ()=>({mode:new FormData(form).get('signature-mode'),strokes:strokes.map(s=>s.map(p=>[...p]))});
}
