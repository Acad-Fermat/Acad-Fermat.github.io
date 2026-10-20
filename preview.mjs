import {createServer} from 'node:http';
import {createReadStream,statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve,relative,isAbsolute,extname,join} from 'node:path';

const root=fileURLToPath(new URL('./dist/',import.meta.url));
const port=Number(process.argv[2]||4173);
if(!Number.isInteger(port)||port<1||port>65535)throw new Error('Indica un puerto válido. Ejemplo: node preview.mjs 4174');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.pdf':'application/pdf','.woff2':'font/woff2'};
const server=createServer((req,res)=>{
  try{
    let path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
    const rel=relative(root,path);
    if(rel.startsWith('..')||isAbsolute(rel)){res.writeHead(403);res.end('Acceso no permitido');return;}
    if(statSync(path).isDirectory())path=join(path,'index.html');
    const size=statSync(path).size;
    res.writeHead(200,{'Content-Type':types[extname(path).toLowerCase()]||'application/octet-stream','Content-Length':size,'Cache-Control':'no-cache'});
    if(req.method==='HEAD'){res.end();return;}
    const stream=createReadStream(path);stream.on('error',()=>res.destroy());stream.pipe(res);
  }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Archivo no encontrado');}
});
server.on('error',e=>{console.error(e.code==='EADDRINUSE'?`El puerto ${port} está ocupado. Prueba: node preview.mjs ${port+1}`:e.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`Fermat: http://127.0.0.1:${port}\nCierra este servidor con Ctrl+C.`));
