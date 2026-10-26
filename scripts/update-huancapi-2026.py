"""Importación puntual. Conserva originales; no reconstruye los otros álbumes.

python scripts/update-huancapi-2026.py --photos CARPETA --results CARPETA
Requiere Pillow. Después ejecutar node sync-content.mjs.
"""
import argparse
import hashlib
import json
import shutil
import zipfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from PIL import Image, ImageOps

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--photos', type=Path, required=True)
parser.add_argument('--results', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
dist = root / 'dist'
out = dist / 'assets/huancapi-2026'
out.mkdir(parents=True, exist_ok=True)
sources = sorted(p for p in args.photos.iterdir() if p.suffix.lower() in ('.jpg', '.jpeg', '.png'))
if not sources:
    raise ValueError('No se encontraron fotografías')
pdfs = {}
for subject, token in [('comprension-lectora', 'COMPRENSION LECTORA'), ('matematica', 'MATEMÁTICA')]:
    matches = [p for p in args.results.glob('RESULTADOS*.pdf') if token in p.name and 'HUANCAPI' in p.name]
    if len(matches) != 1:
        raise ValueError(f'Se esperaba exactamente un resultado final de {subject}: {matches}')
    pdfs[subject] = matches[0]

def convert(item):
    n, source = item
    stem = f'fermat-huancapi-2026-{n:02d}'
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        web = image.copy()
        web.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
        web.save(out / f'{stem}.webp', quality=86, method=6)
        thumb = image.copy()
        thumb.thumbnail((480, 480), Image.Resampling.LANCZOS)
        thumb.save(out / f'{stem}-480.webp', quality=82, method=6)
        download = image.copy()
        download.thumbnail((2560, 2560), Image.Resampling.LANCZOS)
        download.save(out / f'{stem}.jpg', quality=92, subsampling=0, optimize=True, progressive=True)
    path = f'assets/huancapi-2026/{stem}'
    return ({'image': path + '.webp', 'caption': f'Encuentro Fermat · Huancapi 2026 · Fotografía {n}',
             'download': path + '.jpg', 'downloadFilename': f'Fermat-Huancapi-2026-{n:02d}.jpg'},
            {'width': web.width, 'height': web.height, 'thumb': path + '-480.webp',
             'srcset': f'{path}-480.webp {thumb.width}w, {path}.webp {web.width}w'})

with ThreadPoolExecutor(max_workers=4) as pool:
    converted = list(pool.map(convert, enumerate(sources, 1)))
archive = out / 'Fermat-Huancapi-2026-fotografias.zip'
with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_STORED) as bundle:
    for photo, _ in converted:
        bundle.write(dist / photo['download'], arcname=photo['downloadFilename'])
if archive.stat().st_size >= 100 * 1024 * 1024:
    raise ValueError('El álbum supera el límite de GitHub de 100 MiB')
data_path = dist / 'contenido.json'
data = json.loads(data_path.read_text(encoding='utf-8'))
event = next(e for e in data['events'] if e['id'] == '2026-huancapi')
event['documents'] = [d for d in event['documents'] if d['kind'] != 'Resultados']
for subject, source in pdfs.items():
    destination = out / f'resultados-{subject}-huancapi-2026.pdf'
    shutil.copyfile(source, destination)
    assert hashlib.sha256(source.read_bytes()).digest() == hashlib.sha256(destination.read_bytes()).digest()
    label = 'Comprensión lectora' if subject == 'comprension-lectora' else 'Matemática'
    event['documents'].append({'kind': 'Resultados', 'name': f'{label} · resultados finales Huancapi 2026',
                               'file': destination.relative_to(dist).as_posix()})
event.pop('resultsNote', None)
event['thankYou'] = {'title': '¡Gracias, Huancapi!', 'text': 'A estudiantes, familias, docentes e instituciones educativas: gracias por su participación y por hacer de este encuentro una experiencia de aprendizaje, esfuerzo y compañerismo.'}
for photo, meta in converted:
    data['media'][photo['image']] = meta
# La fotografía grupal abre el álbum; las demás conservan su orden original.
photos = [converted[38][0]] + [photo for i, (photo, _) in enumerate(converted) if i != 38] if len(converted) > 38 else [p for p, _ in converted]
album = {'id': '2026-huancapi', 'eventId': event['id'], 'name': 'Huancapi', 'year': 2026, 'photos': photos,
         'archive': {'file': archive.relative_to(dist).as_posix(), 'bytes': archive.stat().st_size,
                     'filename': archive.name}}
data['photoAlbums'] = [album] + [a for a in data['photoAlbums'] if a['id'] != album['id']]
data_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
report = {'photos': len(sources), 'originalBytes': sum(p.stat().st_size for p in sources),
          'galleryBytes': sum((dist / p['image']).stat().st_size for p, _ in converted),
          'thumbnailBytes': sum((dist / m['thumb']).stat().st_size for _, m in converted),
          'downloadZipBytes': archive.stat().st_size,
          'pdfs': {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in pdfs.values()}}
print(json.dumps(report, ensure_ascii=False, indent=2))
