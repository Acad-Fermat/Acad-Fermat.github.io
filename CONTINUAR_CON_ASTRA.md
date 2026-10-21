# Continuidad para Astra · Web Fermat

## Revisión del 21/10/2026 · publicación autorizada

El usuario pidió renovar la portada, añadir modo oscuro, reemplazar los dos logos e integrar las fotos de `FOTOS PARA  WEB`. Tras recibir la vista local, autorizó expresamente subir esta revisión a GitHub de Acad-Fermat y actualizar la web principal. El destino se conserva: `https://acad-fermat.github.io/`, con fuentes en `main` y publicación en `gh-pages`.

La nueva capa visual es `dist/experience.css`. `contenido.json` incorpora `brand`, `competitionCover`, `photoAlbums` y `media` (dimensiones, miniaturas y srcset). Hay 466 fotos en ocho galerías; los álbumes enlazan a las ediciones mediante `eventId`. Se conservan los 28 modelos, 60 ediciones y 78 resultados. Los originales no se han modificado. Lee README y VERIFICACION para los detalles de esta revisión.

## Estado actual · 20/10/2026

El usuario autorizó publicar la web principal en la cuenta GitHub Acad-Fermat. El destino es `https://acad-fermat.github.io/`, con las fuentes en `main` y el sitio en `gh-pages`. Lee `README.md` para abrir, validar y publicar. La identidad antigua de Sites se conserva como referencia local, pero ese proyecto no es accesible desde la cuenta conectada.

El catálogo actual contiene 60 sedes/ediciones de 2023 a 2026, 35 afiches y 78 PDF de resultados. Exámenes modelo se redujo a 28 archivos: uno por nivel, grado/edad y curso, de los años más antiguos verificados, 2023 y 2024. La asignación de los dos resultados de Final Ayacucho al 09/11/2024 fue confirmada expresamente por el usuario. Los datos y cifras de las secciones siguientes describen la entrega anterior.

## Qué se quiere hacer ahora

El usuario trasladará este proyecto a otra computadora para **mejorar el diseño con Astra**. La web ya está construida y funciona. Parte de estos archivos y mejora su calidad visual sin rehacer la clasificación de documentos ni perder las funciones. Trabaja localmente hasta que el usuario solicite publicar.

No necesitas archivos de la computadora anterior, servicios privados, claves ni instalación de dependencias. Todo lo que la web usa está incluido en esta carpeta.

## Brief del usuario

Una web institucional con **tres vertientes claramente diferenciadas**:

1. **Academia Fermat:** educación para escolares, preparación para postulantes COAR y preparación preuniversitaria. Mostrar ciclos por año, con sus afiches, cursos y horarios disponibles.
2. **Concursos Fermat:** concursos de Matemática y Comunicación/Comprensión Lectora entre estudiantes de distintos colegios y sedes. Organizar por año y sede las bases, temarios, afiches, horarios y resultados. El área de práctica se llama **Exámenes modelo**, no «Exámenes de entrenamiento».
3. **Editorial Fermat:** venta y distribución de recopilaciones de exámenes de concursos de distintas sedes, por nivel, grado y curso (Matemática y Comunicación). La consulta y el pedido se realizan por WhatsApp.

El usuario pidió un diseño moderno con transparencias, formas que eviten la sensación de cajas cuadradas, buena tipografía, mejor redacción y énfasis en el logo y Fermatcito. Quiere un resultado con personalidad y espacios que pueda completar manualmente después.

Contacto confirmado: **+51 900 926 590**. WhatsApp sin signos: `51900926590`.

Dirección: **Asociación Los Artesanos, Mz. C, lote 01, Ayacucho**.

Referencia usada únicamente para la organización de Concursos: https://olimpiadaspeira.lovable.app/ . No copiar su diseño, su marca, textos, fechas, contactos ni testimonios.

## Cómo abrirlo

- Vista rápida sin instalaciones: doble clic en `ABRIR_WEB.cmd` o abre `dist/index.html`.
- Vista con servidor, recomendada para revisar: ejecuta `node preview.mjs` desde esta carpeta y abre `http://127.0.0.1:4173`. No se usa npm.
- La apertura directa funciona porque los datos se cargan desde `contenido.js`, sin depender de `fetch()` de un JSON local.

## Dónde editar

| Archivo | Función |
| --- | --- |
| `dist/index.html` | Estructura general, cabecera, navegación, pie, diálogo y metadatos. |
| `dist/styles.css` | Diseño adaptable, colores, tipografía, componentes, formas y movimiento. |
| `dist/modern.css` | Rediseño del 20/10/2026: paleta azul/esmeralda, cristal, degradados, profundidad y ajustes móviles. Se carga después de styles.css. |
| `dist/app.js` | Vistas, rutas con hash, filtros, galerías, fichas de sedes, exámenes y mensajes WhatsApp. |
| `dist/contenido.json` | Catálogo legible y editable: contacto, ciclos, sedes, documentos, modelos y libros. |
| `dist/contenido.js` | Copia del catálogo que carga el navegador. Sincronizar tras editar el JSON. |
| `dist/editar.html` y `dist/editar.js` | Editor para añadir novedades, galería, diplomas o editar/importar/exportar datos. |
| `dist/marca.svg` | Símbolo de marca y favicon. |
| `dist/assets/` | Todos los afiches, personajes, imágenes y documentos que usa la web. |
| `sync-content.mjs` | Valida el JSON y vuelve a generar `contenido.js`. |
| `ORIGEN_RECURSOS.json` | Relación entre nombres originales y archivos copiados. Es documentación; las rutas originales no se necesitan para ejecutar el sitio. |
| `DESIGN.md` | Criterio visual y decisiones de clasificación de la primera versión. |
| `VERIFICACION.md` | Pruebas y límites de la versión anterior; volver a verificar después de editar. |

Rutas principales: `#inicio`, `#academia`, `#concursos`, `#editorial`, `#modelos` y `#contacto`. La portada también tiene enlaces a caminos y preguntas frecuentes.

## Estado del contenido

- **32 entradas de sedes/ediciones**, no 32 ciudades distintas.
- **85 documentos de concursos** clasificados, incluidos 55 PDF de resultados para 22 sedes/ediciones tras la auditoría.
- **7 ciclos** de Academia para los años 2025, 2026 y 2027.
- **56 exámenes modelo**: 28 de Huanta 2025 y 28 de Pichari 2026, por nivel, grado/edad y curso.
- **6 colecciones editoriales**: Matemática y Comunicación en inicial, primaria y secundaria.
- Novedades, galería y diplomas están preparados para incorporar contenido real. Las listas iniciales están vacías; se muestran mensajes claros.
- El bloque preuniversitario deriva a consulta directa: no se aportaron afiches, ciclos ni horarios confirmados de ese programa.
- Precios, disponibilidad y entrega de libros se confirman por WhatsApp. No hay pasarela de pago.

En el JSON: `events` = concursos; `academy` = ciclos; `models` = exámenes; `books` = libros; `news`, `gallery` y `diplomas` = futuras publicaciones. Para cambiar datos, edita el JSON y ejecuta:

```text
node sync-content.mjs
```

No cambies los nombres de los campos sin adaptar el código. Las fechas usan `AAAA-MM-DD`; un valor `null` representa una fecha pendiente.

## Dirección visual existente y libertad para mejorar

La primera versión usa Jost, azul oscuro, verde y lima. Los rombos del símbolo se amplían detrás de Fermatcito. Hay transparencias en la cabecera y el selector del inicio, formas redondeadas, carteles auténticos y animaciones con alternativa de movimiento reducido.

Puedes revisar composición, escalas, ritmo, tipografía, uso de imágenes, adaptación móvil y presentación de los catálogos. Mantén la identidad institucional y el protagonismo de la mascota. El diseño previo es un punto de partida, no una restricción que impida mejorar.

Puntos concretos para revisar:

- En celular, la portada requiere desplazamiento para ver completos a Fermatcito y el selector: se puede mejorar esa composición.
- Los afiches tienen estilos distintos; su presentación alrededor puede ser más consistente sin alterar la información impresa.
- Las imágenes originales son de alta resolución: se puede estudiar su optimización conservando los originales y la legibilidad.
- La portada destaca Huancapi, 24 de octubre de 2026. No inventes una convocatoria posterior cuando esa fecha pase.
- La fuente Jost depende de Google Fonts; considera servirla localmente si se requiere independencia total de Internet.

## Detalles del material que requieren criterio

- El archivo original llamado `LOGO.png` era un diploma completo. El símbolo de la cabecera se reconstruyó en SVG a partir de la marca visible en los afiches. Solicitar el logo independiente si el usuario desea reemplazarlo por el original exacto.
- Final de Ayacucho 2025: existen afiches del **22** y del **29 de noviembre**; se priorizó el afiche detallado del 29. Confirmar antes de cambiar esta fecha.
- Churcampa 2025: el afiche indica **16 de agosto** y la carpeta original mencionaba setiembre. Se priorizó el afiche.
- Chumbes 2025 tenía afiche y bases que identificaban a Huanta; no se asignaron esos documentos a Chumbes.
- Los afiches de archivo pueden contener direcciones o teléfonos antiguos. La interfaz debe mantener el contacto actual confirmado por el usuario.
- Algunos materiales informativos de la galería COAR 2026 muestran años anteriores: si se reorganizan, distinguirlos como referencia histórica, sin presentarlos como cronograma vigente.
- Conservar el nombre **Exámenes modelo**. No usar borradores ni exámenes futuros como pruebas públicas de práctica.

## Qué comprobar tras la mejora

1. Navegación y menú móvil; las tres áreas deben ser fáciles de identificar.
2. Academia: año, programa y apertura/cambio de afiches.
3. Concursos: búsqueda de sede, selección de año, pestañas de bases/resultados y documentos correctos para cada sede.
4. Editorial: filtros y selección de grado; el enlace WhatsApp debe incluir el libro elegido.
5. Exámenes modelo: filtros por año, nivel, grado/edad y curso, paginación, visualización y descarga PDF. Inicial usa edades **3, 4 y 5**, no cero.
6. Formulario: prepara el mensaje en WhatsApp y permite que la persona lo revise; no envía mensajes automáticamente.
7. Editor de contenido: añadir/quitar, validar, importar/exportar. No confundirlo con un CMS conectado al servidor.
8. Computadora, tableta y celular: sin desbordamientos, textos cortados, imágenes rotas ni recursos perdidos. Probar también movimiento reducido.

## Publicación

La versión original se publicó en privado en:

https://fermat-academia-concursos-editorial.shadypony128.chatgpt.site

Esta copia conserva `.openai/hosting.json` para identificar ese sitio si más adelante se solicita actualizarlo. No incluye credenciales, historial Git ni una sesión autenticada. La identidad no autoriza a publicar: trabaja localmente y espera una petición explícita de publicación. No crees otro sitio para una simple mejora de esta copia.

## Actualización imprescindible: auditoría de resultados

Lee `AUDITORIA_RESULTADOS.md` antes de tocar las asignaciones. `FUENTES_RESULTADOS.json` identifica cada PDF publicado y `resultados-verificados.json` conserva la clasificación revisada.

Se corrigió San Miguel 2025: su archivo llamado RESULTADOS.pdf era de Quillabamba. Se localizaron resultados adicionales de Huanta, Ica, Chumbes, Kimbiri 2025/2026 y Santa Rosa. Cinco PDF de Huanta e Ica son exportaciones de valores guardados en Excel, identificadas como tales; no se recalcularon puntajes.

Cangallo, Uripa, Ninabamba y Ocros tienen versiones distintas. Conserva las notas de los documentos y de las fichas; no elijas automáticamente una versión por nombre de carpeta o fecha del archivo.

`PENDIENTES_DE_CLASIFICACION/` conserva 2 consolidados históricos de Ayacucho sin edición confirmada y 14 PDF de Pichari encontrados en una carpeta identificada como 2023. No se enlazan como resultados 2025/2026. `AUDITORIA/` incluye índices de la búsqueda.
