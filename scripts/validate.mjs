import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const data = JSON.parse(readFileSync(resolve(root, 'contenido.json'), 'utf8'));
const context = { window: {} };
runInNewContext(readFileSync(resolve(root, 'contenido.js'), 'utf8'), context);
assert.equal(JSON.stringify(data), JSON.stringify(context.window.FERMAT_CONTENT), 'Sincroniza contenido.js');
assert.equal(data.contact.whatsapp, '51900926590', 'Contacto incorrecto');
const ids = data.events.map(event => event.id);
assert.equal(new Set(ids).size, ids.length, 'Hay identificadores de sede repetidos');
for (const year of [2023,2024,2025,2026]) assert(data.events.some(event => event.year === year), `Falta ${year}`);
const keys = data.models.map(model => `${model.level}/${model.grade}/${model.subject}`);
assert.equal(new Set(keys).size, keys.length, 'Hay exámenes repetidos por grado y curso');
assert.equal(keys.length, 28, 'Se esperan 14 grados/edades y dos cursos');
for (const subject of ['Matemática','Comunicación']) {
  for (const [level, grades] of [['Inicial',[3,4,5]],['Primaria',[1,2,3,4,5,6]],['Secundaria',[1,2,3,4,5]]]) {
    for (const grade of grades) assert(keys.includes(`${level}/${grade}/${subject}`), `Falta ${subject} ${level} ${grade}`);
  }
}
for (const event of data.events) {
  if (event.date) assert.equal(Number(event.date.slice(0,4)),event.year, `Fecha fuera de la edición ${event.id}`);
}
const assets = new Set();
function scan(value) {
  if (typeof value === 'string' && value.startsWith('assets/')) {
    // Responsive srcset entries include a width descriptor, not part of the path.
    value.split(',').forEach(item=>assets.add(item.trim().split(/\s+/)[0]));
  }
  else if (value && typeof value === 'object') Object.values(value).forEach(scan);
}
scan(data);
const routes=JSON.parse(readFileSync(resolve(root,'routes.json'),'utf8'));
assert.equal(new Set(routes).size,routes.length,'Enlaces directos repetidos');
assert.equal(routes.length,data.events.length*2+data.photoAlbums.length,'Faltan enlaces de sedes, resultados o fotos');
for(const route of routes){
  assert(/^concursos\d{4}\/[a-z0-9-]+\/(?:fotos\/|resultados\/)?index\.html$/.test(route),'Enlace directo inválido');
  const html=readFileSync(resolve(root,route),'utf8');
  assert(html.includes('<base href="/">'),`Recursos relativos sin raíz en ${route}`);
  assert(html.includes(`https://acad-fermat.github.io/${route.replace(/index\.html$/,'')}`),`URL canónica incorrecta en ${route}`);
}
const albumArchives = new Map((data.photoAlbums || []).filter(a=>a.archive).map(a=>[a.archive.file,a.archive]));
for (const [path, archive] of albumArchives) {
  assert(path.endsWith('.zip'), 'El álbum descargable debe ser ZIP');
  assert.equal(statSync(resolve(root,path)).size,archive.bytes,'Peso del ZIP desactualizado');
}
for (const path of assets) {
  const absolute = resolve(root,path), local = relative(root,absolute);
  assert(!local.startsWith('..') && !isAbsolute(local), 'Ruta fuera de dist');
  assert(existsSync(absolute),`Falta ${path}`);
  assert(statSync(absolute).size < (albumArchives.has(path)?100:25)*1024*1024, `Recurso demasiado grande: ${path}`);
}
if (data.photoAlbums) {
  assert.equal(new Set(data.photoAlbums.map(a=>a.id)).size,data.photoAlbums.length,'Galerías repetidas');
  for (const album of data.photoAlbums) {
    assert(data.events.some(e=>e.id===(album.eventId||album.id)),`Galería sin sede: ${album.id}`);
    assert(album.photos.length,`Galería vacía: ${album.id}`);
    for (const photo of album.photos) {
      const meta=data.media?.[photo.image];
      assert(meta?.thumb && meta.width>0 && meta.height>0,`Foto sin dimensiones o miniatura: ${photo.image}`);
      assert(Math.max(meta.width,meta.height)<=1600,'Fotografía sin reducir');
    }
  }
  assert(data.brand?.logo && data.brand?.wide && data.competitionCover,'Falta identidad o portada');
}
if (data.social) {
  assert.equal(data.social.find(s=>s.id==='facebook')?.url,'https://www.facebook.com/concursos.fermat/','Facebook incorrecto');
  assert.equal(data.social.find(s=>s.id==='tiktok')?.url,'https://www.tiktok.com/@concurso.fermat','TikTok incorrecto');
}
const ayacucho = data.events.find(event => event.id === '2024-ayacucho-gran-final');
assert.equal(ayacucho.documents.filter(doc=>doc.kind==='Resultados').length,2);
assert.equal(data.events.find(event=>event.id==='2023-pichari').documents.filter(doc=>doc.kind==='Resultados').length,14);
console.log(JSON.stringify({models:data.models.length,events:data.events.length,results:data.events.reduce((n,event)=>n+event.documents.filter(doc=>doc.kind==='Resultados').length,0),assets:assets.size},null,2));
