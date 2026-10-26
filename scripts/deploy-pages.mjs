import { execFileSync } from 'node:child_process';
import { readFile, readdir, mkdir, copyFile, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)),'..');
const output = resolve(root,'dist');
const checkout = resolve(root,'.local/github-pages');
const expectedRemote = 'https://github.com/Acad-Fermat/Acad-Fermat.github.io.git';
const git = (args,cwd=root) => execFileSync('git',args,{cwd,encoding:'utf8',stdio:['ignore','pipe','inherit']}).trim();
if (!checkout.startsWith(root+sep)) throw Error('Destino de publicación fuera del proyecto');
execFileSync(process.execPath,[resolve(root,'scripts/validate.mjs')],{cwd:root,stdio:'inherit'});
if (git(['remote','get-url','origin'])!==expectedRemote) throw Error('El remoto no corresponde a Acad-Fermat');
if (git(['status','--porcelain'])) throw Error('Guarda las fuentes en un commit antes de publicar');
await mkdir(checkout,{recursive:true});
const fresh = !existsSync(resolve(checkout,'.git'));
if (fresh) {
  if ((await readdir(checkout)).length) throw Error('El checkout inicial debe estar vacío');
  // Reutiliza los objetos locales para no volver a transferir todos los PDF.
  git(['clone','--shared','--no-checkout',root,checkout]);
  git(['remote','set-url','origin',expectedRemote],checkout);
  git(['switch','--orphan','gh-pages'],checkout);
}
if (git(['remote','get-url','origin'],checkout)!==expectedRemote) throw Error('Remoto de publicación inesperado');
git(['config','credential.helper','manager'],checkout);
git(['config','credential.https://github.com.username','Acad-Fermat'],checkout);
git(['config','user.name',git(['config','user.name'])],checkout);
git(['config','user.email',git(['config','user.email'])],checkout);
if (git(['ls-remote','--heads','origin','refs/heads/gh-pages'],checkout)) {
  git(['fetch','--no-tags','origin','gh-pages'],checkout);
  if (fresh) git(['checkout','-B','gh-pages','FETCH_HEAD'],checkout);
  else git(['merge','--ff-only','FETCH_HEAD'],checkout);
}
if (git(['branch','--show-current'],checkout)!=='gh-pages') throw Error('Rama de publicación inesperada');
const files = new Set((await readdir(output,{withFileTypes:true})).filter(entry=>entry.isFile()).map(entry=>entry.name));
const data = JSON.parse(await readFile(resolve(output,'contenido.json'),'utf8'));
function collect(value) {
  if (typeof value==='string' && value.startsWith('assets/')) value.split(',').forEach(item=>files.add(item.trim().split(/\s+/)[0]));
  else if (value && typeof value==='object') Object.values(value).forEach(collect);
}
collect(data);
const routes=JSON.parse(await readFile(resolve(output,'routes.json'),'utf8'));
routes.forEach(file=>files.add(file));
for (const file of git(['ls-files','-z'],checkout).split('\0').filter(Boolean)) {
  if (!files.has(file)) {
    const target = resolve(checkout,file);
    if (!target.startsWith(checkout+sep)) throw Error('Recurso fuera del checkout');
    if (existsSync(target)) await unlink(target);
  }
}
for (const file of files) {
  const source = resolve(output,file), target = resolve(checkout,file);
  if (!source.startsWith(output+sep) || !target.startsWith(checkout+sep)) throw Error('Ruta de recurso inválida');
  await mkdir(dirname(target),{recursive:true});
  await copyFile(source,target);
}
git(['add','--all'],checkout);
const sourceCommit = git(['rev-parse','HEAD']);
if (git(['diff','--cached','--name-only'],checkout)) git(['commit','-m',`Publicar Fermat desde ${sourceCommit}`],checkout);
git(['push','origin','HEAD:refs/heads/gh-pages'],checkout);
console.log(JSON.stringify({branch:'gh-pages',sourceCommit,publishedCommit:git(['rev-parse','HEAD'],checkout),files:files.size},null,2));
