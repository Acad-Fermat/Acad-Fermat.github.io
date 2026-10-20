(() => {
  let data=structuredClone(window.FERMAT_CONTENT);
  const $=id=>document.getElementById(id);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function status(text,error=false){$('status').textContent=text;$('status').style.color=error?'#9d2525':'var(--green)';}
  function validPath(path){return /^https:\/\//.test(path)||/^assets\/[a-zA-Z0-9._\/-]+$/.test(path);}
  function validate(d){
    for(const field of ['events','academy','books','models','news','gallery','diplomas'])if(!Array.isArray(d[field]))throw new Error(`Falta la lista ${field}.`);
    if(!d.contact?.whatsapp||!d.mascot)throw new Error('Falta contacto o mascota.');
    for(const e of d.events){if(!e.id||!e.name||!e.year||!Array.isArray(e.documents))throw new Error('Cada sede necesita id, name, year y documents.');for(const doc of e.documents)if(!doc.file||!doc.kind||!doc.name)throw new Error('Documento de sede incompleto.');}
    for(const a of d.academy)if(!a.id||!a.name||!Array.isArray(a.images)||!Array.isArray(a.courses)||!Array.isArray(a.venues))throw new Error('Ciclo de academia incompleto.');
    for(const b of d.books)if(!b.id||!b.title||!b.image||!Array.isArray(b.grades))throw new Error('Colección editorial incompleta.');
    return d;
  }
  function render(){
    for(const [key,label] of [['news','title'],['gallery','caption'],['diplomas','title']]){
      $(key+'-list').innerHTML=data[key].map((item,i)=>`<li>${esc(item[label])}<button data-remove="${key}" data-index="${i}" aria-label="Quitar ${esc(item[label])}">Quitar</button></li>`).join('');
    }
    $('json-editor').value=JSON.stringify(data,null,2);
  }
  $('news-form').addEventListener('submit',e=>{e.preventDefault();data.news.push({title:$('news-title').value.trim(),text:$('news-text').value.trim()});e.target.reset();render();status('Novedad añadida. Descarga los archivos para conservar el cambio.');});
  $('gallery-form').addEventListener('submit',e=>{e.preventDefault();const image=$('gallery-image').value.trim();if(!validPath(image)){status('Usa una ruta assets/archivo.jpg o un enlace HTTPS.',true);return;}data.gallery.push({image,caption:$('gallery-caption').value.trim()});e.target.reset();render();status('Fotografía añadida. Recuerda incluir el archivo en assets.');});
  $('diploma-form').addEventListener('submit',e=>{e.preventDefault();const file=$('diploma-file').value.trim();if(!validPath(file)){status('Usa una ruta assets/archivo.pdf o un enlace HTTPS.',true);return;}data.diplomas.push({title:$('diploma-title').value.trim(),file});e.target.reset();render();status('Documento añadido. Descarga los archivos de contenido.');});
  document.addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;data[b.dataset.remove].splice(Number(b.dataset.index),1);render();status('Elemento quitado del editor.');});
  $('apply-json').addEventListener('click',()=>{try{data=validate(JSON.parse($('json-editor').value));render();status('Catálogo válido. Ya puedes descargar la actualización.');}catch(e){status('No se aplicaron cambios: '+e.message,true);}});
  $('import-file').addEventListener('change',async e=>{try{if(!e.target.files.length)return;data=validate(JSON.parse(await e.target.files[0].text()));render();status('Archivo cargado correctamente.');}catch(err){status('No se pudo cargar: '+err.message,true);}});
  $('reset').addEventListener('click',()=>{data=structuredClone(window.FERMAT_CONTENT);render();status('Se restauró el contenido publicado en el editor.');});
  function download(type){try{validate(data);const content=type==='js'?'window.FERMAT_CONTENT = '+JSON.stringify(data)+';\n':JSON.stringify(data,null,2);const blob=new Blob([content],{type:type==='js'?'text/javascript;charset=utf-8':'application/json;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='contenido.'+type;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status(`Archivo contenido.${type} descargado. Reemplázalo en la carpeta del sitio y vuelve a publicar.`);}catch(e){status(e.message,true);}}
  $('download-js').addEventListener('click',()=>download('js'));$('download-json').addEventListener('click',()=>download('json'));render();
})();
