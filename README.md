# Corporación Educativa Fermat

Academia, Concursos y Editorial Fermat. Sitio estático en español con afiches, resultados, catálogos y exámenes modelo.

Web principal: https://acad-fermat.github.io/

## Revisión de publicaciones · 21/10/2026 · publicación autorizada

Tras la corrección del usuario, se conserva la estructura anterior, sin secciones de novedades ni información adicional. Solo se actualizan las imágenes de tres afiches de concursos (Huancapi, San Miguel y Santa Rosa 2026) y tres catálogos de Comunicación dentro de las fichas existentes. La página principal incorpora dos tarjetas transparentes con los logos y enlaces de Facebook y TikTok. Las fuentes y la procedencia están en `FUENTES_FACEBOOK.md`.

Las seis imágenes públicas principales suman 505.992 bytes, un 25,1 % menos que las recibidas; se conservan miniaturas y originales. Después de revisar la versión simplificada, el usuario autorizó expresamente publicarla en GitHub de Acad-Fermat y actualizar la web principal.

## Abrir y comprobar

```sh
node preview.mjs
node scripts/validate.mjs
```

La vista local se abre en http://127.0.0.1:4173. No requiere paquetes ni compilación.

## Contenido

- `dist/index.html`: estructura, navegación y ventanas.
- `dist/styles.css`, `dist/modern.css` y `dist/experience.css`: diseño adaptable, transparencias, tres áreas y temas claro/oscuro.
- `dist/app.js`: vistas, filtros, búsquedas y mensajes preparados de WhatsApp.
- `dist/contenido.json`: catálogo editable. Ejecutar `node sync-content.mjs` después de modificarlo.
- `dist/assets/`: recursos públicos enlazados por el catálogo.
- `dist/editar.html`: editor local que exporta archivos de actualización.

Concursos se organiza en cuatro ediciones: 2023, 2024, 2025 y 2026. Los enlaces `#concursos?ano=2023` a `#concursos?ano=2026` abren cada sección directamente. Los recursos no identificados se mantienen pendientes de incorporar.

Exámenes modelo contiene 28 PDF: uno por cada edad/grado y curso (Matemática y Comunicación), seleccionados de los años más antiguos verificados, 2023 y 2024. Los originales se conservan íntegros.

## Versión del 21/10/2026 · publicación autorizada

La portada diferencia Academia, Concursos y Editorial con tarjetas y secciones propias. Los dos logos nuevos se muestran en cabecera y pie; Concursos utiliza la fotografía `PORTADA.jpeg`. El botón de sol/luna recuerda el tema elegido y, inicialmente, respeta el sistema.

Hay 466 fotografías en ocho galerías por sede y año, con filtro de edición, miniaturas, flechas, teclado, cierre con Escape y deslizamiento táctil. `#concursos?galeria=1` abre todas las galerías; las fichas de las sedes también enlazan sus fotografías. El año se conserva según el nombre de la carpeta aportada.

`dist/assets/web/` contiene copias WebP adaptables: fotos de hasta 1600 px, miniaturas de 480 px, portada de 1920 px y afiches de hasta 1900 px. Las imágenes pasan de 999,1 MB a 111,1 MB, contando ambas versiones (88,9 % menos). Cada foto ampliada pesa unos 152 KB de media. Los PDF conservan sus archivos íntegros y se descargan a petición. Los originales de fotos, el RAR y los logos se mantienen localmente; las carpetas de fotografías originales están excluidas de Git.

El proceso se documenta en `scripts/optimize-media.py` y el detalle local está en `revision-diseno/optimizacion-imagenes.json`. El funcionamiento del sitio requiere únicamente `dist/`, sin Python ni los originales. El usuario autorizó subir esta versión a Acad-Fermat y actualizar su página pública.

## Publicación en GitHub Pages

`main` conserva las fuentes. `gh-pages` contiene solo el sitio y los recursos que utiliza. GitHub Pages debe usar **Deploy from a branch → gh-pages → /(root)**.

La raíz de `main` también incluye un acceso directo a `dist/`, para que la dirección principal abra la misma web cuando GitHub Pages utiliza su configuración inicial `main → /(root)`. Este acceso conserva el enlace a la sección solicitada. No requiere la API de GitHub para servir el sitio.

Con Git autenticado como Acad-Fermat, guarda los cambios en un commit y ejecuta:

```sh
git push origin main
node scripts/deploy-pages.mjs
```

El script valida el catálogo, comprueba el destino y publica sin sobrescribir el historial. No almacena credenciales. La autenticación se administra con Git Credential Manager.

Contacto institucional: +51 900 926 590. Asociación Los Artesanos, Mz. C, lote 01, Ayacucho.
