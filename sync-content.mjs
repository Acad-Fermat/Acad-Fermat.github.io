import {readFileSync,writeFileSync} from 'node:fs';
const file=new URL('./dist/contenido.json',import.meta.url);
const data=JSON.parse(readFileSync(file,'utf8'));
for(const field of ['events','academy','models','books','news','gallery','diplomas'])if(!Array.isArray(data[field]))throw new Error(`Falta la lista ${field}`);
if(!data.contact?.whatsapp||!data.mascot)throw new Error('Falta el contacto o la mascota');
writeFileSync(new URL('./dist/contenido.js',import.meta.url),'window.FERMAT_CONTENT = '+JSON.stringify(data)+';\n');
console.log('Contenido validado y sincronizado.');
