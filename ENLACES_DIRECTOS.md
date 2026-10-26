# Enlaces directos de Concursos Fermat

Implementados localmente el 26/10/2026. Pendientes de publicación.

- Sede: `/concursos2026/huancapi`
- Fotografías: `/concursos2026/huancapi/fotos`
- Resultados: `/concursos2026/huancapi/resultados`

El esquema se aplica a todas las ediciones, de 2023 a 2026. Se conserva el identificador de la sede sin el prefijo de año. Por ejemplo, `/concursos2025/ayacucho-apertura` y `/concursos2025/ayacucho-gran-final` distinguen las ediciones de la misma ciudad. Solo se generan enlaces de fotos cuando existe un álbum, relacionándolo mediante `eventId`.

Abrir una ficha o un álbum actualiza la dirección. Los botones permiten copiar el enlace de la sede o de su galería. Las direcciones utilizan el dominio donde se está viendo la web: en local comienzan por `http://127.0.0.1:4175`; cuando se publiquen, comenzarán por `https://acad-fermat.github.io`. Los enlaces locales solo funcionan en la computadora que sirve la vista previa.

## Generación y publicación

`node sync-content.mjs` sincroniza los datos y genera automáticamente las 129 entradas HTML actuales mediante `scripts/build-routes.mjs`. Tras cambiar `dist/index.html` o los datos, ejecutar este comando para mantener las entradas actualizadas. JavaScript, estilos e imágenes se comparten mediante `<base href="/">`; el destino previsto es la raíz del dominio de GitHub Pages de Acad-Fermat.

Cada ruta tiene un `index.html` real, título, descripción, URL canónica y metadatos para compartir. Esto permite abrir y recargar las direcciones en GitHub Pages sin depender de una redirección por error 404. `dist/routes.json` contiene el manifiesto; `scripts/deploy-pages.mjs` incorpora esas páginas cuando se autorice publicar. Los enlaces anteriores con `#concursos` siguen funcionando. No se ha ejecutado el despliegue.

## Verificación

- Las 129 rutas responden HTTP 200 en el servidor local.
- Huancapi: acceso directo a ficha, fotos y resultados; dos PDF en la vista de resultados y 53 fotos en el álbum.
- Recargar la galería mantiene la sección; Atrás regresa a la ficha y Escape cierra el visor hacia Concursos del mismo año.
- Portapapeles comprobado con el enlace de fotos; campo seleccionable disponible si el navegador bloquea el acceso al portapapeles.
- Galería Santa Rosa 2025 verificada: relación con su sede correcta y 75 fotos.
- Vista de 390 px sin desbordamiento horizontal ni errores de JavaScript durante estas comprobaciones.
- `node scripts/validate.mjs` comprueba cobertura, rutas, entradas HTML y base/canonical además de las validaciones del catálogo.
