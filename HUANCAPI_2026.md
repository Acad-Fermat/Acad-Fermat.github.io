# Huancapi 2026 · actualización local del 26/10/2026

La ficha `2026-huancapi` conserva su afiche, bases, temario y fecha del 24 de octubre. Se añadieron los dos resultados finales suministrados por el usuario y un agradecimiento breve dentro de la ficha, sin avisos adicionales. Esta revisión todavía no se ha publicado.

## Fotografías y descargas

- 53 fotografías de `F:\EDITORIAL\examenes\HUANCAPI FOTOS`, sin modificar los originales (212.08 MB).
- Galería WebP: lado mayor de hasta 1600 px, calidad 86; 6.03 MB en total. Miniaturas de 480 px, calidad 82; 0.82 MB. Se respeta la orientación EXIF.
- Descargas JPEG: lado mayor de hasta 2560 px, calidad 92, sin submuestreo de color, progresivas. El botón individual cambia con la fotografía seleccionada.
- Descarga del álbum completo: ZIP de 53 JPEG, 45.18 MB (43.1 MiB). La imagen grupal número 39 abre el álbum; las demás mantienen su orden.
- Recursos portátiles en `dist/assets/huancapi-2026/`. Ninguna foto original es necesaria para servir la web.

## Resultados

Se copiaron íntegros los dos PDF de `F:\EDITORIAL\11 HUANCAPI (24 DE OCT)\CLAVES\RESULTADOS HUANCAPI\RESULTADOS FINALES`. Cada uno tiene 14 páginas. SHA-256 verificado entre origen y copia:

- Comprensión lectora: `65b730da81b8476ab6fb8c98392ce336389bc9715569de8afd1fc8148b4c50bf`
- Matemática: `f9ef4271b66de2184005e1e31ac92d06a0dbb3584a46bde649f6153d87a8719e`

## Continuar el trabajo

Editar datos en `dist/contenido.json`; ejecutar `node sync-content.mjs` y `node scripts/validate.mjs`. No hace falta ejecutar el importador para retocar el diseño. `scripts/update-huancapi-2026.py --photos CARPETA --results CARPETA` permite repetir esta importación puntual con Pillow y acceso a los originales; conserva los otros álbumes. Los botones están en `dist/app.js` y sus estilos en `dist/experience.css`.

Verificado: 60 ediciones, 80 documentos de resultados, 28 exámenes modelo, 9 álbumes y 519 fotografías. Validación general correcta. ZIP íntegro con 53 archivos, JPEG dentro de 2560 px y PDF idénticos al origen. Navegador de escritorio y celular de 390 px: ficha, agradecimiento, galería, flechas del teclado, resultados filtrados y ausencia de desbordamiento horizontal. Descargas individuales y del ZIP completadas; ambos PDF responden HTTP 200. Capturas de revisión en `revision-diseno/huancapi-2026/` (carpeta local ignorada por Git).
