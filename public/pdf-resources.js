let cached;
export async function loadPdfResources(){
 if(!cached)cached=Promise.all(['assets/NotoSans-Regular.ttf','assets/bk-west-logo.png','assets/albrecht-signature.png'].map(async path=>{
 const response=await fetch(path);if(!response.ok)throw new Error('Eine PDF-Ressource konnte nicht geladen werden. Bitte prüfe deine Verbindung und versuche es erneut.');return new Uint8Array(await response.arrayBuffer());
 })).then(([font,logo,teacher])=>({font,logo,teacher})).catch(error=>{cached=null;throw error;});
 return cached;
}
