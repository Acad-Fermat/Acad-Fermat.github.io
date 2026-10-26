// Entradas HTML reales: funcionan al abrir o recargar enlaces en GitHub Pages.
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const data=JSON.parse(readFileSync(resolve(root,'contenido.json'),'utf8'));
const template=readFileSync(resolve(root,'index.html'),'utf8');
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const files=[];
for(const event of data.events){
  const slug=event.id.replace(/^\d{4}-/,'');
  const path=`concursos${event.year}/${slug}`;
  const album=data.photoAlbums?.find(a=>(a.eventId||a.id)===event.id);
  for(const section of ['', '/resultados', ...(album?['/fotos']:[])]){
    const file=`${path}${section}/index.html`;
    const label=section==='/fotos'?'Fotografías':section==='/resultados'?'Resultados':'Concurso';
    const title=`${label} · ${event.name} ${event.year} · Fermat`;
    const url=`https://acad-fermat.github.io/${path}${section}/`;
    const description=`${label} de Concursos Fermat en ${event.name}, edición ${event.year}. Consulta los documentos y comparte los momentos de esta sede.`;
    let html=template.replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`)
      .replace(/<link rel="canonical"[^>]+>/,`<link rel="canonical" href="${url}">`)
      .replace(/<meta name="description"[^>]+>/,`<meta name="description" content="${escape(description)}">`)
      .replace('</head>',`<meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${url}"><meta property="og:type" content="website">${event.poster?`<meta property="og:image" content="https://acad-fermat.github.io/${event.poster}">`:''}</head>`);
    mkdirSync(dirname(resolve(root,file)),{recursive:true});
    writeFileSync(resolve(root,file),html);
    files.push(file);
  }
}
writeFileSync(resolve(root,'routes.json'),JSON.stringify(files,null,2)+'\n');
console.log(`${files.length} enlaces directos generados.`);
