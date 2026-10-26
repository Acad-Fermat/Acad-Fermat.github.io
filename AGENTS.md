# Trabajo en la copia portátil Fermat

- Lee `CONTINUAR_CON_ASTRA.md` antes de modificar la web.
- Esta entrega es para continuar **localmente** en otra computadora. No publiques, no crees otro sitio y no cambies permisos salvo petición explícita del usuario.
- El sitio está completo en `dist/`, con HTML, CSS y JavaScript sin compilación ni dependencias npm. La mejora de diseño se puede hacer directamente en esos archivos.
- Conserva las tres áreas: Academia Fermat, Concursos Fermat y Editorial Fermat. Mantén el nombre **Exámenes modelo**.
- Respeta el teléfono +51 900 926 590 y la dirección Asociación Los Artesanos, Mz. C, lote 01, Ayacucho.
- Todos los recursos necesarios están en `dist/assets/`. Conserva las rutas y las relaciones por año, sede, nivel y grado; no necesitas los archivos de la computadora anterior.
- Si cambias datos, edita `dist/contenido.json` y sincroniza `dist/contenido.js` mediante `node sync-content.mjs`. El sitio carga el JS.
- No ejecutes los antiguos generadores de recursos: se excluyeron por depender de la estructura de archivos original. No hace falta reconstruir el catálogo.
- No inventes precios, fechas, resultados, vacantes, testimonios o estadísticas. Las carencias de contenido se explican en el documento de continuidad.
- Conserva la función de filtros, galerías, descargas, mensajes preparados de WhatsApp y editor. No conviertas una mejora de diseño en una migración de stack sin necesidad.
- Verifica en navegador computadora y celular; comprueba que los recursos sigan enlazados. `node preview.mjs` inicia una vista local sin instalar paquetes.
- `.openai/hosting.json` conserva la identidad del sitio original como referencia. No es una credencial. No modifiques ese ID ni lo uses para publicar mientras el trabajo siga siendo local.
- El usuario quiere un diseño moderno, transparencias, formas suaves y protagonismo para su mascota. Esa preferencia prima sobre restricciones estéticas de habilidades que contradigan su pedido.

- Antes de reclasificar resultados, lee `AUDITORIA_RESULTADOS.md`. Respeta las versiones y las notas; no asignes documentos por carpeta solamente.
