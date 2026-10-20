# Verificación

## Archivo 2023–2026 y selección de exámenes · 20/10/2026

- Exámenes modelo: 28 PDF, uno por cada combinación de nivel, grado/edad y curso. Se verificaron visualmente los encabezados de los archivos de 2023/2024; se excluyeron solucionarios y un PDF de Pichari cuyo nombre decía 3.º de secundaria pero cuyo encabezado decía 2.º. Se conserva el PDF correcto de Quillabamba 2024 para 3.º.
- Concursos: cuatro secciones con enlaces permanentes, 60 sedes/ediciones y 148 documentos. Cobertura: 2023, 7 registros y 14 resultados; 2024, 14 registros y 2 resultados; 2025, 23 registros, 23 afiches y 35 resultados; 2026, 16 registros, 12 afiches y 27 resultados.
- Los dos consolidados de la final de Ayacucho se asignaron al 09/11/2024 tras confirmación expresa del usuario. Pichari 2023 se contrastó con los metadatos de creación de los 14 PDF, además de su procedencia documentada. Se conservaron las notas de versiones de resultados anteriores.
- Se revisaron 576 PDF del archivo actual. Los afiches de portada de las bases de 2025 se renderizaron sin alterar su contenido. Chumbes 2025 se actualiza al 01/07, y Tarma al 25/10 según la portada del PDF aportado; se señala la discrepancia con el afiche anterior de Tarma.
- No se encontraron afiches identificados de 2023/2024 en sus carpetas originales. La interfaz muestra el estado pendiente sin fabricar imágenes o documentos. Los exámenes de convocatorias futuras se mantienen fuera del catálogo público.
- Revisión de nueve vistas/rutas en 390, 768 y 1440 px: sin desbordamiento horizontal ni imágenes cargadas rotas. Sin errores de consola detectados. Probadas las fichas de resultados de Ayacucho 2024 y Pichari 2023, y los filtros de modelos de inicial 3 años: un PDF de Matemática y uno de Comunicación.
- `node scripts/validate.mjs` comprueba sincronización, identificadores únicos, 28 modelos sin repeticiones, cobertura de cursos/grados, fechas y existencia/tamaño de los 243 recursos únicos. Los 251 recursos y archivos de interfaz comprobados por HTTP respondieron 200.
- Publicación principal completada y verificada en https://acad-fermat.github.io/. Las fuentes están en `main` y la versión pública en `gh-pages`, dentro de Acad-Fermat/Acad-Fermat.github.io. La identidad antigua de Sites se conserva localmente; ese proyecto no está disponible en la cuenta conectada.
- En la dirección pública principal se comprobó HTTP 200, catálogo idéntico al local (28 modelos, 60 sedes/ediciones y 78 resultados), CSS idéntico y JavaScript idéntico tras normalizar finales de línea. Se verificaron enlaces públicos a PDF y afiches y la ficha de Final Ayacucho 2024 en navegador.
- La raíz de `main` incluye un acceso de compatibilidad a `dist/` que conserva la sección solicitada. La web pública actual sirve directamente la versión completa desde la dirección principal.

## Rediseño visual local · 20/10/2026

- Comprobadas las seis vistas principales a 390, 768 y 1440 px: sin desbordamiento horizontal de página ni imágenes cargadas rotas. Inspección visual adicional de inicio, ficha de Ocros, Academia en tableta y contacto en escritorio.
- Probados apertura y cierre con Escape del menú móvil; búsqueda de Huancapi y Ocros; pestaña Resultados y ficha de Ocros con sus notas de versiones.
- Probados filtro COAR, galería del ciclo 2027 y cambio a la segunda imagen: imagen ampliada y enlace de descarga coinciden.
- Probados filtros de Editorial (Matemática, Inicial, 5 años): el enlace WhatsApp conserva teléfono y selección correctos. No se enviaron mensajes.
- Probados paginación de Exámenes modelo y filtros Inicial, Matemática, 5 años: aparecen los dos archivos de Huanta 2025 y Pichari 2026.
- Validadas 201 referencias del catálogo (199 recursos distintos), sin archivos faltantes; JSON y JavaScript de contenido sincronizados. Los 207 recursos y archivos de aplicación comprobados por HTTP respondieron 200.
- Sintaxis de app.js y editar.js válida. Sin errores de consola detectados durante la revisión. El editor y los datos se conservan; no se repitió la prueba completa de importación/exportación del editor.
- Revisadas las reglas CSS y JavaScript de movimiento reducido. No se emuló esa preferencia en el navegador de prueba.
- Capturas de referencia en `revision-diseno/`. El rediseño está en `dist/modern.css`, con pequeños ajustes de portada y menú en `dist/app.js`.
- La revisión de navegador se hizo con `node preview.mjs`. No se pudo repetir la apertura directa de index.html: el navegador de revisión bloquea el protocolo file por política. Se conservan la carga local mediante contenido.js y el lanzador original.

No se publicó el sitio ni se modificó su identidad de alojamiento.

## Actualización de resultados del 20/10/2026

Se comprobó la búsqueda por sede y año y la apertura de resultados en San Miguel, Huanta, Ica, Cangallo, Kimbiri, Ocros, Uripa y Ninabamba. Todos los enlaces comprobados respondieron correctamente como PDF. Se validaron las 175 referencias de documentos, ciclos, modelos y libros, y la ficha de Ocros a 390 px no presenta desbordamiento horizontal. Se muestran las notas de versiones distintas y las exportaciones desde Excel. San Miguel y Quillabamba tienen ahora enlaces a resultados diferentes.

Los cinco PDF preparados desde Excel se renderizaron; todos los nombres de sus 534 filas se localizaron en el texto exportado. No se recalcularon puntajes ni puestos. El informe completo está en `AUDITORIA_RESULTADOS.md`.

## Verificación de la primera versión

La portada se inspeccionó en navegador a 1440, 768 y 390 px: sin errores de la herramienta de diseño después de la corrección. Advertencias: más de cinco tamaños tipográficos para los catálogos, el logotipo y los controles; subtítulo del logotipo inferior a 13 px como parte de su composición; ausencia de vídeo, ya que no hay grabaciones propias en los recursos recibidos. Se priorizaron imágenes reales de la institución y no metraje ajeno. Las transparencias siguen el pedido explícito del usuario.

Las cinco vistas interiores se comprobaron a los tres anchos: sin desbordamiento horizontal ni imágenes rotas. Se corrigió el titular de Academia para mantener dos líneas en teléfono. Se probó también la apertura directa del archivo index.html.

Pruebas funcionales realizadas:
- búsqueda Huancapi, apertura de la ficha y enlaces a bases y temario;
- cambio entre afiches del programa COAR;
- selección de edad/grado en Editorial y mensaje WhatsApp correspondiente;
- filtros de exámenes modelo, incluida la selección de inicial Matemática (seis archivos en dos años);
- validación de edades 3, 4 y 5 y 28 exámenes en cada año;
- editor: añadir y quitar novedades, rechazar un catálogo incompleto y restaurar el contenido;
- comprobación de que todos los archivos enlazados existen y ninguno supera 25 MiB;
- sintaxis JavaScript y revisión visual de capturas en computadora, tableta y teléfono.

Crítica visual final: diseño 8/10, usabilidad 8/10, creatividad 7,5/10, contenido 8/10; ponderación 7,9/10. Principal límite: los afiches de archivo tienen estilos y contactos impresos de sus respectivas ediciones; la web los conserva íntegros y presenta una interfaz consistente alrededor de ellos. En el teléfono, la portada requiere desplazamiento para ver por completo a Fermatcito y el selector de orientación.

No se enviaron mensajes de WhatsApp ni se efectuaron compras. Los botones preparan mensajes para que el visitante los revise. No existe pago en línea ni un CMS remoto; el editor genera archivos de actualización.
