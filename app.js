(() => {
  'use strict';
  const D = window.FERMAT_CONTENT;
  const main = document.querySelector('main');
  const dialog = document.querySelector('#detail-dialog');
  const dialogBody = document.querySelector('#dialog-body');
  const TODAY = new Intl.DateTimeFormat('en-CA',{timeZone:'America/Lima',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const state = {academyYear:2027,academyType:'Todos',eventYear:2026,eventTab:'Sedes y calendario',eventSearch:'',bookSubject:'Todos',bookLevel:'Todos',modelYear:'Todos',modelLevel:'Todos',modelSubject:'Todos',modelGrade:'Todos',modelPage:1};
  const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = (name='arrow') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${({arrow:'<path d="M5 19 19 5M5 5h14v14"/>',right:'<path d="M4 12h16m-6-6 6 6-6 6"/>',download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18"/>',book:'<path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Zm0 0v15"/>'})[name]||''}</svg>`;
  const wa = message => `https://wa.me/${D.contact.whatsapp}?text=${encodeURIComponent(message)}`;
  const external = 'target="_blank" rel="noopener"';
  const date = (value,year=true) => value ? new Intl.DateTimeFormat('es-PE',{day:'numeric',month:'long',...(year?{year:'numeric'}:{})}).format(new Date(value+'T12:00:00-05:00')) : 'Fecha por confirmar';
  const gradeName = (level,grade) => level==='Inicial' ? `${grade} años` : `${grade}.º de ${level.toLowerCase()}`;
  const options = (list,value) => list.map(x=>`<option ${String(x)===String(value)?'selected':''} value="${esc(x)}">${esc(x)}</option>`).join('');
  const years = (list,value,type) => `<div class="years" role="group" aria-label="Elegir año">${list.map(y=>`<button data-action="${type}" data-value="${y}" aria-pressed="${value===y}">${y}</button>`).join('')}</div>`;
  const img = (src,alt,cls='',eager=false) => `<img src="${esc(src)}" alt="${esc(alt)}" class="${cls}" ${eager?'fetchpriority="high"':'loading="lazy"'}>`;
  const btn = (label,href,cls='',target=false) => `<a class="btn ${cls}" href="${esc(href)}" ${target?external:''}>${label}${icon()}</a>`;
  const empty = (title,body) => `<div class="empty"><h2>${title}</h2><p>${body}</p></div>`;

  function pageHead(area,title,description){return `<div class="page-head wrap"><p class="page-breadcrumb"><a href="#inicio">Fermat</a> / ${area}</p><h1 class="reveal">${title}</h1><p class="reveal" style="--delay:90ms">${description}</p></div>`;}
  function home(){
    const huancapi=D.events.find(e=>e.id==='2026-huancapi');
    const school=D.academy.find(a=>a.id==='escolar-2027');
    const coar=D.academy.find(a=>a.id==='coar-2027');
    return `<section class="hero wrap"><div class="hero-copy"><span class="eyebrow reveal">Aprende · Compite · Crece</span><h1 class="reveal">Tu talento,<br><em>sin límites.</em></h1><p class="reveal" style="--delay:90ms">Aprende en nuestra academia, acepta nuevos retos y encuentra los libros para ir más lejos.</p><div class="hero-actions reveal" style="--delay:160ms">${btn('Encuentra tu camino','#caminos')}<a class="text-link" href="#concursos">Ver concursos ${icon()}</a></div><div class="hero-note reveal" style="--delay:220ms"><img src="marca.svg" width="28" height="28" alt="">Academia, concursos y editorial. Un mismo propósito.</div></div><div class="hero-art"><div class="hero-diamond" aria-hidden="true"></div><span class="mascot-label" aria-hidden="true">¡Vamos más lejos!</span><span class="subject-symbol symbol-plus" aria-hidden="true">+</span><span class="subject-symbol symbol-times" aria-hidden="true">×</span><span class="subject-symbol symbol-divide" aria-hidden="true">÷</span>${img(D.mascot,'Fermatcito, nuestra mascota, te da la bienvenida','hero-mascot',true)}<div class="pathfinder reveal" style="--delay:300ms"><h2>¿Cuál es tu próximo reto?</h2><label for="path-choice">Quiero prepararme para…</label><select id="path-choice"><option value="academia">Mejorar en el colegio</option><option value="coar">Ingresar al COAR</option><option value="concursos">Participar en un concurso</option><option value="editorial">Encontrar mi libro</option><option value="modelos">Practicar con un examen</option></select><a id="path-result" class="text-link" href="#academia">Explorar la academia ${icon('right')}</a></div></div></section>
    <nav id="caminos" class="three-paths wrap" aria-label="Las tres áreas de Fermat">${[['Academia Fermat','Aprende y construye tu futuro.','academia'],['Concursos Fermat','Demuestra todo lo que sabes.','concursos'],['Editorial Fermat','Lleva el conocimiento contigo.','editorial']].map(([a,b,c])=>`<a class="path-link scroll-reveal" href="#${c}"><strong>${a}</strong><p>${b}</p>${icon()}</a>`).join('')}</nav>
    <section class="section wrap"><p class="intro-copy scroll-reveal">En Fermat ${img('marca.svg','')} acompañamos tu camino, desde la primera pregunta hasta tu próximo logro.</p></section>
    <section class="wrap"><div class="section-heading"><div><h2 class="scroll-reveal">${TODAY<=huancapi.date?'Nos vemos en Huancapi.':'El reto de Huancapi.'}</h2><p>${TODAY<=huancapi.date?'El próximo encuentro de nuestra comunidad.':'Explora los recursos de esta edición.'}</p></div><a class="text-link" href="#concursos">Todas las sedes ${icon()}</a></div><div class="event-feature"><div><h2 class="scroll-reveal">${TODAY<=huancapi.date?'Un nuevo reto<br>te espera.':'Un encuentro<br>para recordar.'}</h2><p class="event-date scroll-reveal">24 de octubre de 2026</p><p class="scroll-reveal">Concurso de Matemática y Comprensión Lectora para inicial, primaria y secundaria. Sede: colegio Basilio Auqui, Huancapi.</p><button class="btn scroll-reveal" data-event="${huancapi.id}">Ver bases y temario ${icon()}</button></div><div class="feature-media scroll-reveal">${img(huancapi.poster,'Afiche del concurso Fermat Huancapi, 24 de octubre de 2026','media-zoom')}<div class="date-stamp" aria-hidden="true"><b>24</b>octubre</div></div></div></section>
    <section class="section wrap academic-home"><div class="academic-art scroll-reveal">${img(school.images[0],'Afiche del ciclo Verano escolar Fermat 2027')}${img(coar.images[0],'Afiche de preparación COAR Fermat 2027')}</div><div><h2 class="scroll-reveal">El futuro se prepara.</h2><p class="scroll-reveal">Un espacio para aprender con propósito. Encuentra el ciclo que acompaña tu etapa y consulta sus cursos, horarios y afiches.</p><div class="home-programs scroll-reveal"><span>Escolares</span><span>Preparación COAR</span><span>Preuniversitarios</span></div>${btn('Conoce la academia','#academia','scroll-reveal')}</div></section>
    <section class="section wrap editorial-home"><div class="section-heading"><div><h2 class="scroll-reveal">Más páginas. Más posibilidades.</h2><p class="scroll-reveal">Los retos de nuestros concursos, reunidos en colecciones de Matemática y Comunicación para cada grado.</p></div>${btn('Explorar los libros','#editorial','lime scroll-reveal')}</div><div class="book-stage">${[D.books[0],D.books[4],D.books[2]].map((b,i)=>`<figure class="${i===1?'middle':''} scroll-reveal"><a href="#editorial">${img(b.image,`Catálogo de ${b.subject}, nivel ${b.level}`)}<figcaption>${b.subject} · ${b.level}</figcaption></a></figure>`).join('')}</div></section>
    <section class="home-exams wrap"><div><h2 class="scroll-reveal">Practica tu próximo logro.</h2><p class="scroll-reveal">Un examen por grado y por curso, de nuestras primeras ediciones.</p></div>${btn('Ir a exámenes modelo','#modelos','scroll-reveal')}</section>
    ${community()}${faq()}${contact(false)}`;
  }

  function academy(){
    const list=D.academy.filter(a=>a.year===state.academyYear&&(state.academyType==='Todos'||a.audience===state.academyType));
    return pageHead('Academia Fermat','Aprende hoy.<br>Crece mañana.','Preparación para escolares, postulantes COAR y preuniversitarios. Elige tu año y encuentra tu programa.')+
    `<section class="wrap catalogue-section"><div class="toolbar">${years([2027,2026,2025],state.academyYear,'academy-year')}<div class="field"><label for="academy-type">Programa</label><select id="academy-type">${options(['Todos','Escolares','COAR','Preuniversitarios'],state.academyType)}</select></div></div><p class="filter-count" role="status">${list.length} ${list.length===1?'ciclo':'ciclos'} · ${state.academyYear}${state.academyYear<2027?' · Archivo de programas':''}</p><div class="academy-list">${list.map(a=>`<article class="academy-item"><button class="academy-poster" data-academy="${a.id}" aria-label="Ver afiches de ${a.name}">${img(a.images[0],`Afiche ${a.name} ${a.year}`)}<span class="gallery-count">${a.images.length} ${a.images.length===1?'afiche':'afiches y recursos'} ↗</span></button><div class="academy-details"><h2>${esc(a.name)}</h2><p>${esc(a.description)}</p><div class="facts">${a.start?`<div><small>Inicio del ciclo</small>${date(a.start)}</div>`:''}${a.schedule?`<div><small>Horario publicado</small>${esc(a.schedule)}</div>`:''}</div>${a.venues.length?`<p><strong>Sedes:</strong> ${a.venues.join(' · ')}</p>`:''}<div class="course-tags">${a.courses.map(c=>`<span>${esc(c)}</span>`).join('')}</div><div class="academy-actions">${btn('Consultar este ciclo',wa(`Hola Fermat, quisiera información del ciclo ${a.name} ${a.year}.`),'',true)}<button class="text-link" style="border:0;background:none" data-academy="${a.id}">Ver todos los afiches ${icon()}</button></div></div></article>`).join('')}</div>${list.length?'':empty('Tu siguiente etapa',state.academyType==='Preuniversitarios'?'Consulta con nuestro equipo los ciclos preuniversitarios, cursos y horarios disponibles.':'No hay ciclos publicados con este filtro. Prueba con otro año o programa.')}<article class="request-program"><div><h2>Rumbo a la universidad.</h2><p>${esc(D.preuniversity.description)}</p></div>${btn('Consultar preparación',wa('Hola Fermat, quisiera conocer los ciclos preuniversitarios disponibles.'),'lime',true)}</article><div class="notice"><p>Los afiches conservan la información de cada edición. Para matrículas, vacantes y horarios vigentes, consulta a nuestro equipo.</p><a class="text-link" href="#contacto">Recibir orientación ${icon()}</a></div></section>`;
  }

  const competitionYears = [2026,2025,2024,2023];
  const normalized = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es');
  const eventDate = (event,withYear=true) => event.date ? date(event.date,withYear) : event.year < Number(TODAY.slice(0,4)) ? 'Fecha no registrada' : 'Fecha por confirmar';
  const eventDocuments = (event,tab=state.eventTab) => event.documents.filter(doc => tab==='Resultados' ? doc.kind==='Resultados' : tab==='Bases y temarios' ? doc.kind.includes('Bases')||doc.kind==='Temario'||doc.kind==='Horario' : true);
  function competitionArchive(){
    return '<nav class="competition-years" aria-label="Ediciones de Concursos Fermat">'+competitionYears.map(year=>{
      const events=D.events.filter(event=>event.year===year);
      const results=events.reduce((count,event)=>count+event.documents.filter(doc=>doc.kind==='Resultados').length,0);
      return '<button data-action="event-year" data-value="'+year+'" aria-pressed="'+(state.eventYear===year)+'"><span class="edition-label">Concursos Fermat</span><strong>'+year+'</strong><small>'+events.length+' sedes y ediciones · '+results+' PDF de resultados</small><span class="edition-arrow" aria-hidden="true">↗</span></button>';
    }).join('')+'</nav>';
  }
  function eventList(){
    const search=normalized(state.eventSearch);
    const list=D.events.filter(event=>event.year===state.eventYear&&normalized(event.name+' '+(event.edition||'')).includes(search)&&(state.eventTab!=='Afiches'||event.poster));
    const tab=state.eventTab;
    return '<p class="filter-count" role="status">'+list.length+' '+(list.length===1?'sede':'sedes y ediciones')+' · '+state.eventYear+'</p><div class="event-list '+(tab==='Afiches'?'poster-list':'')+'">'+list.map(event=>{
      const docs=eventDocuments(event);
      const media=event.poster?img(event.poster,'Afiche de Fermat '+event.name+' '+event.year):'<span class="poster-fallback"><img src="marca.svg" alt="" width="50" height="50"></span>';
      const detail=tab==='Resultados'?(docs.length?docs.length+' '+(docs.length===1?'archivo de resultados':'archivos de resultados'):'Sin archivos verificados'):tab==='Bases y temarios'?(docs.length?docs.map(doc=>doc.kind).filter((value,index,array)=>array.indexOf(value)===index).join(' · '):'Documentos por incorporar'):tab==='Afiches'?'Ver afiche y documentos':event.documents.length?event.documents.length+' recursos disponibles':event.year<2025?'Registro del archivo histórico':'Material por incorporar';
      return '<button class="event-row" data-event="'+esc(event.id)+'">'+media+'<div>'+(event.date&&event.date>=TODAY?'<span class="status">Próximo encuentro</span>':'')+'<h3>'+esc(event.name)+'</h3><p>'+eventDate(event,false)+(event.edition?' · '+esc(event.edition):'')+'</p><small>'+detail+'</small></div><span class="row-arrow">'+icon()+'</span></button>';
    }).join('')+'</div>'+(list.length?'':empty(tab==='Afiches'?'Afiches por incorporar':'No encontramos esa sede',tab==='Afiches'?'Todavía no hay afiches identificados para esta edición con el filtro actual. Puedes consultar sus sedes y resultados.':'Prueba con otro nombre o cambia el año de la edición.'));
  }
  function competitions(){
    const historical=state.eventYear<Number(TODAY.slice(0,4));
    return pageHead('Concursos Fermat','El reto nos reúne.','Matemática y Comunicación. Explora las ediciones de 2023 a 2026: sedes, afiches, bases y resultados.')+
      '<section class="wrap catalogue-section">'+competitionArchive()+'<div class="edition-heading"><div><span class="eyebrow">'+(historical?'Nuestro archivo de concursos':'Encuentros y convocatorias')+'</span><h2>Concursos Fermat '+state.eventYear+'</h2><p>'+(historical?'Consulta los materiales conservados de esta edición. Los recursos pendientes se indican en cada sede.':'Encuentra tu sede y consulta el afiche, las bases, los horarios y los resultados disponibles.')+'</p></div><span class="edition-tag">'+(historical?'Archivo histórico':'Edición '+state.eventYear)+'</span></div>'+
      '<nav class="tabs" aria-label="Recursos del concurso">'+['Sedes y calendario','Afiches','Bases y temarios','Resultados'].map(tab=>'<button data-action="event-tab" data-value="'+tab+'" aria-pressed="'+(state.eventTab===tab)+'">'+tab+'</button>').join('')+'</nav><div class="toolbar"><div class="field search"><label for="event-search">Encuentra tu sede</label><input type="search" id="event-search" placeholder="Por ejemplo: Huancapi, Uripa, Ayacucho…" value="'+esc(state.eventSearch)+'"></div><a class="text-link" href="#modelos">Exámenes modelo '+icon()+'</a></div><div id="event-results">'+eventList()+'</div><div class="notice"><div><h2>'+(historical?'¿Buscas un documento histórico?':'Participa con tu colegio.')+'</h2><p>'+(historical?'Indícanos el año, la sede y tu nivel para consultar materiales de esta edición.':'Consulta la inscripción de estudiantes, delegaciones y requisitos de tu sede.')+'</p></div>'+btn(historical?'Consultar archivo':'Consultar inscripción',wa('Hola Fermat, quisiera información de Concursos Fermat '+state.eventYear+'.'),'',true)+'</div><div class="community-grid"><article><h3>Reconocimientos y diplomas</h3><p>'+(D.diplomas.length?'Consulta los reconocimientos publicados por edición.':'Los diplomas digitales se incorporarán aquí cuando estén disponibles. Consulta por tu edición y sede.')+'</p>'+D.diplomas.map(doc=>'<a class="text-link" href="'+esc(doc.file)+'" '+external+'>'+esc(doc.title)+' '+icon()+'</a>').join('')+'<a class="text-link" href="'+wa('Hola Fermat, quisiera consultar sobre mi diploma del concurso.')+'" '+external+'>Consultar mi diploma '+icon()+'</a></article><article><h3>Practica a tu ritmo</h3><p>Una selección de los exámenes más antiguos: uno por grado y por curso, para que encuentres tu material sin repeticiones.</p><a class="text-link" href="#modelos">Explorar exámenes modelo '+icon()+'</a></article></div></section>';
  }
  function editorial(){
    const list=D.books.filter(b=>(state.bookSubject==='Todos'||b.subject===state.bookSubject)&&(state.bookLevel==='Todos'||b.level===state.bookLevel));
    return pageHead('Editorial Fermat','Conocimiento<br>que va contigo.','Recopilaciones de concursos de nuestras sedes. Libros de Matemática y Comunicación para inicial, primaria y secundaria.')+`<section class="wrap catalogue-section"><div class="toolbar"><div class="field"><label for="book-subject">Colección</label><select id="book-subject">${options(['Todos','Matemática','Comunicación'],state.bookSubject)}</select></div><div class="field"><label for="book-level">Nivel educativo</label><select id="book-level">${options(['Todos','Inicial','Primaria','Secundaria'],state.bookLevel)}</select></div></div><div class="book-catalogue">${list.map(b=>`<article class="book-item"><button class="book-image" style="border:0" data-book="${b.id}" aria-label="Ampliar catálogo de ${b.subject}, ${b.level}">${img(b.image,`Libros Fermat de ${b.subject}, nivel ${b.level}`)}</button><div class="book-info"><p class="book-level">${b.level}</p><h2>${esc(b.title)}</h2><p>${esc(b.description)}</p><p>Elige el grado que necesitas y consulta disponibilidad, precio y opciones de entrega con nuestro equipo.</p><label for="grade-${b.id}">${b.level==='Inicial'?'Edad':'Grado'}</label><select id="grade-${b.id}">${b.grades.map(g=>`<option value="${g}">${gradeName(b.level,g)}</option>`).join('')}</select><a class="btn order-book" data-book-id="${b.id}" href="${wa(`Hola Fermat, quisiera consultar el libro de ${b.subject} para ${gradeName(b.level,b.grades[0])}.`)}" ${external}>Consultar y pedir ${icon()}</a><p class="note">Venta y distribución. Precio y entrega por confirmar.</p></div></article>`).join('')}</div><div class="notice"><div><h2>Libros para tu institución.</h2><p>Consulta pedidos para colegios, docentes y distribuidores. Te ayudamos a elegir la colección y los grados que necesitas.</p></div>${btn('Consultar distribución',wa('Hola Editorial Fermat, quisiera información sobre pedidos para mi institución o distribución de libros.'),'',true)}</div></section>`;
  }

  function modelResults(){
    const list=D.models.filter(m=>(state.modelYear==='Todos'||m.year===Number(state.modelYear))&&(state.modelLevel==='Todos'||m.level===state.modelLevel)&&(state.modelSubject==='Todos'||m.subject===state.modelSubject)&&(state.modelGrade==='Todos'||m.grade===Number(state.modelGrade)));
    const pages=Math.max(1,Math.ceil(list.length/12));state.modelPage=Math.min(state.modelPage,pages);
    return `<p class="filter-count" role="status">${list.length} ${list.length===1?'examen disponible':'exámenes disponibles'}</p>${list.length?`<div class="model-list">${list.slice((state.modelPage-1)*12,state.modelPage*12).map(m=>`<article class="model-row"><div><h2>${m.subject}</h2><p>${gradeName(m.level,m.grade)}</p></div><p class="model-meta">${m.city} · ${m.year}</p><span class="model-year">PDF · Examen modelo</span><div class="model-links"><a href="${m.file}" ${external} aria-label="Ver examen de ${m.subject}, ${gradeName(m.level,m.grade)}, ${m.city} ${m.year}">Ver ${icon('arrow')}</a><a href="${m.file}" download="Fermat-${m.year}-${m.city}-${m.subject}-${m.level}-${m.grade}.pdf" aria-label="Descargar examen de ${m.subject}, ${gradeName(m.level,m.grade)}, ${m.city} ${m.year}">${icon('download')}</a></div></article>`).join('')}</div><nav class="pagination" aria-label="Páginas de exámenes"><button data-action="model-page" data-value="${state.modelPage-1}" ${state.modelPage===1?'disabled':''}>Anterior</button><span>${state.modelPage} de ${pages}</span><button data-action="model-page" data-value="${state.modelPage+1}" ${state.modelPage===pages?'disabled':''}>Siguiente</button></nav>`:empty('No hay exámenes con ese filtro','Cambia el año, nivel, grado o curso para explorar otros exámenes.')}`;
  }
  function models(){return pageHead('Exámenes modelo','La práctica<br>abre caminos.','Un examen por grado y por curso. Seleccionamos los más antiguos disponibles para que practiques sin repeticiones.')+`<section class="wrap catalogue-section"><div class="toolbar"><div class="field"><label for="model-year">Año</label><select id="model-year">${options(['Todos',...[...new Set(D.models.map(model=>model.year))].sort((a,b)=>a-b)],state.modelYear)}</select></div><div class="field"><label for="model-level">Nivel</label><select id="model-level">${options(['Todos','Inicial','Primaria','Secundaria'],state.modelLevel)}</select></div><div class="field"><label for="model-grade">${state.modelLevel==='Inicial'?'Edad':'Grado'}</label><select id="model-grade">${options(['Todos',...(state.modelLevel==='Inicial'?[3,4,5]:state.modelLevel==='Secundaria'?[1,2,3,4,5]:[1,2,3,4,5,6])],state.modelGrade)}</select></div><div class="field"><label for="model-subject">Curso</label><select id="model-subject">${options(['Todos','Matemática','Comunicación'],state.modelSubject)}</select></div></div><div id="model-results">${modelResults()}</div><div class="notice"><p>Estos exámenes son material de práctica de concursos anteriores. Las bases y temarios de cada sede determinan el contenido de su edición.</p><a class="text-link" href="#concursos">Ver bases por sede ${icon()}</a></div></section>`;}
  function community(){return `<section class="section wrap"><div class="section-heading"><div><h2 class="scroll-reveal">La comunidad Fermat.</h2><p>Un lugar para compartir lo que aprendemos y celebramos.</p></div></div><div class="community-grid"><article class="scroll-reveal"><h3>Novedades de la academia</h3>${D.news.length?D.news.map(n=>`<p><strong>${esc(n.title)}</strong><br>${esc(n.text)}</p>`).join(''):'<p>Consulta los afiches de los ciclos publicados y encuentra la preparación que corresponde a tu etapa.</p>'}<a class="text-link" href="#academia">Explorar los ciclos ${icon()}</a></article><article class="scroll-reveal"><h3>Momentos que nos unen</h3>${D.gallery.length?D.gallery.map(g=>img(g.image,g.caption)).join(''):'<p>Este espacio reunirá fotografías de clases, encuentros y premiaciones. ¿Formaste parte de un concurso? Comparte tu experiencia con nosotros.</p>'}<a class="text-link" href="${wa('Hola Fermat, quisiera compartir una fotografía o experiencia de la comunidad.')}" ${external}>Compartir un momento ${icon()}</a></article></div></section>`;}
  function faq(){return `<section class="section wrap" id="preguntas"><div class="faq"><h2 class="scroll-reveal">Resolvemos tus dudas.</h2>${[
    ['¿Cómo elijo mi programa?','En Academia, selecciona el año y el programa: escolares o preparación COAR. Para la preparación preuniversitaria, consulta directamente los ciclos disponibles.'],
    ['¿Cómo participo en un concurso?','Elige tu año y sede en Concursos. Lee las bases y verifica el horario de tu nivel. Después, escribe a nuestro equipo para consultar requisitos e inscripción.'],
    ['¿Dónde encuentro los resultados?','En Concursos, abre la pestaña Resultados y selecciona la sede. Verás los documentos disponibles; cuando todavía no haya un archivo, se indicará que no hay archivos verificados disponibles.'],
    ['¿Qué son los exámenes modelo?','Son pruebas de concursos anteriores para practicar. Puedes filtrarlas por año, nivel, grado y curso, y descargarlas en PDF.'],
    ['¿Cómo compro los libros?','En Editorial, elige Matemática o Comunicación, tu nivel y grado. El botón de consulta abre WhatsApp con tu selección para confirmar precio, disponibilidad y entrega.']
  ].map(([q,a],i)=>`<details class="scroll-reveal" ${i===0?'open':''}><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></section>`;}
  function contact(page){return `<section class="contact-section wrap" id="contacto"><div class="contact-card"><div><${page?'h1':'h2'} class="scroll-reveal">Tu próximo paso<br>empieza aquí.</${page?'h1':'h2'}><p class="scroll-reveal">Cuéntanos qué estás buscando. Te orientamos para elegir tu ciclo, participar en un concurso o encontrar tus libros.</p><div class="contact-data scroll-reveal"><a href="tel:+51900926590">+51 900 926 590</a><span>${esc(D.contact.address)}<br>${esc(D.contact.city)}</span></div></div><form id="contact-form"><div><label for="contact-name">Tu nombre</label><input id="contact-name" name="name" placeholder="¿Cómo te llamas?" maxlength="100" required autocomplete="name"></div><div><label for="contact-interest">Me interesa</label><select id="contact-interest" name="interest"><option>Academia Fermat</option><option>Preparación COAR</option><option>Preparación preuniversitaria</option><option>Concursos Fermat</option><option>Editorial Fermat</option></select></div><div><label for="contact-message">Tu consulta</label><textarea id="contact-message" name="message" placeholder="Cuéntanos un poco más…" maxlength="1500" required></textarea></div><button class="btn" type="submit">Continuar en WhatsApp ${icon()}</button><p class="note">Se abrirá WhatsApp con tu mensaje. Podrás revisarlo antes de enviarlo.</p></form></div></section>`;}

  function showModal(html){dialogBody.innerHTML=html;dialog.showModal();document.body.style.overflow='hidden';}
  function closeModal(){dialog.close();document.body.style.overflow='';}
  dialog.addEventListener('close',()=>{document.body.style.overflow='';});
  document.querySelector('.dialog-close').addEventListener('click',closeModal);
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal();}});
  function eventModal(id){
    const e=D.events.find(e=>e.id===id);if(!e)return;
    const showResults=location.hash.startsWith('#concursos')&&state.eventTab==='Resultados';
    const docs=location.hash.startsWith('#concursos')?eventDocuments(e):e.documents;
    showModal(`<div class="dialog-content"><h2 id="dialog-title">${esc(e.name)} · ${e.year}</h2><div class="dialog-event">${e.poster?`<a href="${e.poster}" ${external}>${img(e.poster,`Afiche completo ${e.name} ${e.year}`)}</a>`:'<div class="placeholder-mark"><img src="marca.svg" alt="Fermat"></div>'}<div class="dialog-details"><p><strong>${eventDate(e)}</strong>${e.edition?' · '+esc(e.edition):''}</p>${e.venue?`<p>${esc(e.venue)}</p>`:''}<p>Matemática y Comunicación<br>Inicial · Primaria · Secundaria</p>${e.poster?`<a class="text-link" href="${e.poster}" download="Afiche-Fermat-${e.name}-${e.year}${e.poster.slice(e.poster.lastIndexOf('.'))}">Descargar afiche ${icon('download')}</a>`:''}<h3>${showResults?'Resultados publicados':'Documentos de esta sede'}</h3>${e.archiveNote?`<p class="note">${esc(e.archiveNote)}</p>`:''}${e.resultsNote?`<p class="note">${esc(e.resultsNote)}</p>`:''}${docs.length?docs.map(d=>`<div class="document-row"><div class="doc-title"><strong>${esc(d.kind)}</strong><small>${esc(d.name.replace(/_/g,' '))}</small>${d.note?`<small>${esc(d.note)}</small>`:''}</div><div class="document-actions"><a href="${d.file}" ${external} aria-label="Ver ${esc(d.kind)} de ${esc(e.name)}">Ver ↗</a><a href="${d.file}" download="${esc(d.name)}${d.file.slice(d.file.lastIndexOf('.'))}" aria-label="Descargar ${esc(d.kind)} de ${esc(e.name)}">${icon('download')}</a></div></div>`).join(''):'<p class="note">No hay documentos publicados en esta categoría. Consulta a nuestro equipo.</p>'}${btn('Consultar esta sede',wa(`Hola Fermat, quisiera información sobre el concurso de ${e.name} ${e.year}.`),'',true)}</div></div></div>`);
  }
  function galleryModal(a){
    showModal(`<div class="dialog-content"><h2 id="dialog-title">${esc(a.name)} · ${a.year}</h2><div class="gallery-view"><div class="gallery-main">${img(a.images[0],`Afiche ${a.name} ${a.year}`,'gallery-selected')}<a class="btn gallery-download" href="${a.images[0]}" download="Fermat-${a.name}-${a.year}.jpeg">Descargar imagen ${icon('download')}</a></div><div class="gallery-thumbs" role="group" aria-label="Elegir afiche">${a.images.map((src,i)=>`<button data-gallery-src="${src}" data-gallery-name="${esc(a.name)}" aria-label="Ver imagen ${i+1}" aria-pressed="${i===0}">${img(src,`Imagen ${i+1}`)}</button>`).join('')}</div></div></div>`);
  }
  // Movimiento localizado: solo ratón y con la preferencia de movimiento activada.
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  function bindDepth(){
    const art = main.querySelector('.hero-art');
    if(!art) return;
    const reset = () => { art.style.removeProperty('--tilt-x'); art.style.removeProperty('--tilt-y'); };
    art.addEventListener('pointermove', event => {
      if(event.pointerType !== 'mouse' || motionPreference.matches) return;
      const rect = art.getBoundingClientRect();
      art.style.setProperty('--tilt-x', ((.5 - (event.clientY - rect.top) / rect.height) * 4).toFixed(2) + 'deg');
      art.style.setProperty('--tilt-y', (((event.clientX - rect.left) / rect.width - .5) * 4).toFixed(2) + 'deg');
    });
    art.addEventListener('pointerleave', reset);
  }
  function bind(){
    bindDepth();
    document.querySelectorAll('.scroll-reveal').forEach((el,i)=>{el.style.setProperty('--delay',`${i%3*70}ms`);observer.observe(el);});
    const path=document.querySelector('#path-choice');
    if(path)path.addEventListener('change',()=>{const config={academia:['#academia','Explorar la academia'],coar:['#academia?programa=COAR','Prepararme para el COAR'],concursos:['#concursos','Encontrar mi concurso'],editorial:['#editorial','Elegir mi libro'],modelos:['#modelos','Buscar un examen modelo']};const [href,label]=config[path.value];document.querySelector('#path-result').href=href;document.querySelector('#path-result').innerHTML=label+' '+icon('right');});
    const eventSearch=document.querySelector('#event-search');if(eventSearch)eventSearch.addEventListener('input',()=>{state.eventSearch=eventSearch.value;document.querySelector('#event-results').innerHTML=eventList();});
    for(const [id,key] of [['academy-type','academyType'],['book-subject','bookSubject'],['book-level','bookLevel'],['model-year','modelYear'],['model-level','modelLevel'],['model-grade','modelGrade'],['model-subject','modelSubject']]){const el=document.getElementById(id);if(el)el.addEventListener('change',()=>{state[key]=el.value;state.modelPage=1;if(key==='modelLevel')state.modelGrade='Todos';render(false);});}
    const form=document.querySelector('#contact-form');if(form)form.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(form);window.open(wa(`Hola Fermat, soy ${f.get('name')}. Me interesa ${f.get('interest')}. ${f.get('message')}`),'_blank','noopener');});
    document.querySelectorAll('select[id^="grade-"]').forEach(select=>select.addEventListener('change',()=>{const id=select.id.slice(6);const book=D.books.find(b=>b.id===id);document.querySelector(`.order-book[data-book-id="${id}"]`).href=wa(`Hola Fermat, quisiera consultar el libro de ${book.subject} para ${gradeName(book.level,select.value)}.`);}));
  }
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{threshold:.1});
  document.addEventListener('click',e=>{
    const el=e.target.closest('[data-action],[data-event],[data-academy],[data-book],[data-gallery-src]');if(!el)return;
    if(el.dataset.event){eventModal(el.dataset.event);return;}
    if(el.dataset.academy){galleryModal(D.academy.find(a=>a.id===el.dataset.academy));return;}
    if(el.dataset.book){const b=D.books.find(b=>b.id===el.dataset.book);galleryModal({name:`${b.subject} · ${b.level}`,year:'Catálogo',images:[b.image]});return;}
    if(el.dataset.gallerySrc){dialog.querySelector('.gallery-selected').src=el.dataset.gallerySrc;dialog.querySelector('.gallery-selected').alt=el.dataset.galleryName;dialog.querySelector('.gallery-download').href=el.dataset.gallerySrc;dialog.querySelectorAll('[data-gallery-src]').forEach(b=>b.setAttribute('aria-pressed',String(b===el)));return;}
    const act=el.dataset.action,val=el.dataset.value;
    if(act==='academy-year')state.academyYear=Number(val);
    if(act==='event-year'){
      state.eventYear=Number(val);state.eventSearch='';
      const target='#concursos?ano='+state.eventYear;
      if(location.hash===target)render(false);else location.hash=target;
      return;
    }
    if(act==='event-tab')state.eventTab=val;
    if(act==='model-page'){state.modelPage=Number(val);document.querySelector('#model-results').innerHTML=modelResults();document.querySelector('#model-results').scrollIntoView({block:'start',behavior:motionPreference.matches?'instant':'smooth'});return;}
    render(false);
  });
  const menu=document.querySelector('.menu-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');document.querySelector('#navigation').classList.toggle('open',open);});
  function closeMenu(){
    menu.setAttribute('aria-expanded','false');
    menu.setAttribute('aria-label','Abrir menú');
    document.querySelector('#navigation').classList.remove('open');
  }
  document.addEventListener('keydown', event => {
    if(event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true'){
      closeMenu(); menu.focus();
    }
  });
  function render(scroll=true){
    closeMenu();
    const raw=location.hash.slice(1)||'inicio';const [route,query]=raw.split('?');
    if(route==='caminos'||route==='preguntas'){if(!document.getElementById(route)){main.innerHTML=home();bind();}requestAnimationFrame(()=>document.getElementById(route)?.scrollIntoView());return;}
    if(query&&new URLSearchParams(query).get('programa')==='COAR')state.academyType='COAR';
    if(route==='concursos'&&query){const year=Number(new URLSearchParams(query).get('ano'));if(competitionYears.includes(year))state.eventYear=year;}
    observer.disconnect();
    const pages={inicio:home,academia:academy,concursos:competitions,editorial,modelos:models,contacto:()=>contact(true)};
    main.innerHTML=(pages[route]||home)();
    const titles={academia:'Academia',concursos:'Concursos',editorial:'Editorial',modelos:'Exámenes modelo',contacto:'Contacto'};
    document.title=(titles[route]?titles[route]+' Fermat':'Fermat')+' · Aprende, compite y crece';
    document.querySelectorAll('#navigation a').forEach(a=>{if(a.hash==='#'+route)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');document.querySelector('#navigation').classList.remove('open');
    bind();if(scroll){window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true});}
  }
  window.addEventListener('hashchange',()=>{if(dialog.open)closeModal();render();});
  render(false);
})();
