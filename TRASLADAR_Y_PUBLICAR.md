# Trasladar el proyecto a la otra computadora

Entrega del 26/10/2026. Incluye todo el código y los recursos necesarios para la web, las 53 fotos de Huancapi, sus dos resultados finales, el álbum ZIP descargable y los enlaces directos por sede. Esta entrega no se ha publicado.

## Incorporar a tu repositorio existente

1. Descomprime el ZIP. Dentro está la carpeta `Acad-Fermat-web`.
2. En la otra computadora, abre la copia local del repositorio `Acad-Fermat/Acad-Fermat.github.io`. Guarda o respalda cualquier cambio propio pendiente y actualiza esa copia antes de incorporar la entrega.
3. Copia **el contenido** de `Acad-Fermat-web` dentro de la raíz de tu repositorio existente y reemplaza los archivos de esta entrega. No anides la carpeta dentro del repositorio. Conserva tu carpeta `.git`: el ZIP no incluye historial ni credenciales. Copia también `.gitignore` y `.nojekyll`.
4. Abre una terminal en la raíz del repositorio y ejecuta:

```sh
node sync-content.mjs
node scripts/validate.mjs
node preview.mjs
```

Solo necesitas Node.js. La web no requiere instalar paquetes, ejecutar Python ni recuperar las fotografías originales. Abre `http://127.0.0.1:4173/concursos2026/huancapi/fotos` para revisar. Mantén abierta la terminal del servidor; usa otra para Git.

## Subir desde esa computadora

Comprueba el destino y revisa los cambios:

```sh
git remote get-url origin
git status --short
git diff --stat
```

El remoto debe corresponder a `https://github.com/Acad-Fermat/Acad-Fermat.github.io.git`. La configuración prevista guarda las fuentes en `main` y publica la web desde `gh-pages`.

```sh
git add --all
git commit -m "Actualizar Huancapi 2026 y enlaces directos por sede"
git push origin main
node scripts/deploy-pages.mjs
```

Revisa los archivos antes de `git add --all` si tu copia contiene cambios adicionales. El script publica en el repositorio de Acad-Fermat y exige fuentes guardadas en un commit. Git debe estar autenticado en esa computadora con acceso al repositorio. GitHub Pages debe estar configurado en `gh-pages`, carpeta raíz. No copies el contenido de `dist/` a la raíz de `main`: el script se ocupa de preparar `gh-pages`.

El `.gitignore` de esta entrega incluye una excepción para el ZIP descargable de Huancapi; debe subirse junto al resto de los recursos.

## Enlaces públicos después de publicar

- `https://acad-fermat.github.io/concursos2026/huancapi`
- `https://acad-fermat.github.io/concursos2026/huancapi/fotos`
- `https://acad-fermat.github.io/concursos2026/huancapi/resultados`

Los enlaces con `127.0.0.1` sirven para revisar en tu computadora. Para enviar fotos a otras personas, utiliza los enlaces públicos una vez terminada la publicación.

Detalles: `ENLACES_DIRECTOS.md`, `HUANCAPI_2026.md` y `CONTINUAR_CON_ASTRA.md`. El archivo `ENTREGA_SHA256.json` enumera y verifica los archivos incluidos; excluye su propio contenido. El ZIP excluye `.git`, `.local`, capturas de revisión y cachés, y conserva todos los archivos de la web y scripts del proyecto.
