# Corporación Educativa Fermat

Academia, Concursos y Editorial Fermat. Sitio estático en español con afiches, resultados, catálogos y exámenes modelo.

Web principal: https://acad-fermat.github.io/

## Abrir y comprobar

```sh
node preview.mjs
node scripts/validate.mjs
```

La vista local se abre en http://127.0.0.1:4173. No requiere paquetes ni compilación.

## Contenido

- `dist/index.html`: estructura, navegación y ventanas.
- `dist/styles.css` y `dist/modern.css`: diseño adaptable, transparencias y movimiento.
- `dist/app.js`: vistas, filtros, búsquedas y mensajes preparados de WhatsApp.
- `dist/contenido.json`: catálogo editable. Ejecutar `node sync-content.mjs` después de modificarlo.
- `dist/assets/`: recursos públicos enlazados por el catálogo.
- `dist/editar.html`: editor local que exporta archivos de actualización.

Concursos se organiza en cuatro ediciones: 2023, 2024, 2025 y 2026. Los enlaces `#concursos?ano=2023` a `#concursos?ano=2026` abren cada sección directamente. Los recursos no identificados se mantienen pendientes de incorporar.

Exámenes modelo contiene 28 PDF: uno por cada edad/grado y curso (Matemática y Comunicación), seleccionados de los años más antiguos verificados, 2023 y 2024. Los originales se conservan íntegros.

## Publicación en GitHub Pages

`main` conserva las fuentes. `gh-pages` contiene solo el sitio y los recursos que utiliza. GitHub Pages debe usar **Deploy from a branch → gh-pages → /(root)**.

Con Git autenticado como Acad-Fermat, guarda los cambios en un commit y ejecuta:

```sh
git push origin main
node scripts/deploy-pages.mjs
```

El script valida el catálogo, comprueba el destino y publica sin sobrescribir el historial. No almacena credenciales. La autenticación se administra con Git Credential Manager.

Contacto institucional: +51 900 926 590. Asociación Los Artesanos, Mz. C, lote 01, Ayacucho.
