"""Create web copies; originals are never modified. Run from the project root."""
from pathlib import Path
from PIL import Image, ImageOps
from concurrent.futures import ThreadPoolExecutor
import hashlib, json, re, unicodedata

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / 'dist'
OUT = DIST / 'assets' / 'web'
OUT.mkdir(parents=True, exist_ok=True)
DATA = DIST / 'contenido.json'
data = json.loads(DATA.read_text(encoding='utf-8'))
report_path = ROOT / 'revision-diseno' / 'optimizacion-imagenes.json'
report_path.parent.mkdir(exist_ok=True)
old = json.loads(report_path.read_text('utf-8')) if report_path.exists() else {}
media, entries = {}, []

def convert(source, stem, limit=1600, quality=80, thumb=480, trim=False):
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        if trim and image.mode == 'RGBA':
            image = image.crop(image.getchannel('A').getbbox())
        image = image.convert('RGBA' if 'A' in image.getbands() else 'RGB')
        variants = []
        for size in [thumb, limit]:
            version = image.copy()
            version.thumbnail((size, size), Image.Resampling.LANCZOS)
            target = OUT / f'{stem}-{size}.webp'
            if not target.exists() or target.stat().st_mtime < source.stat().st_mtime:
                version.save(target, 'WEBP', quality=quality, method=4)
            variants.append({'src':target.relative_to(DIST).as_posix(), 'width':version.width,
                             'height':version.height, 'bytes':target.stat().st_size})
        full = variants[-1]
        meta = {'width':full['width'], 'height':full['height'], 'thumb':variants[0]['src'],
                'srcset':', '.join(f"{v['src']} {v['width']}w" for v in variants)}
        return full['src'], meta, {'source':str(source.relative_to(ROOT.parent)),'originalBytes':source.stat().st_size,
                                    'webBytes':sum(v['bytes'] for v in variants),'variants':variants}

def walk(value):
    if isinstance(value,str) and value.startswith('assets/') and Path(value).suffix.lower() in ['.png','.jpeg','.jpg']:
        yield value
    elif isinstance(value,dict):
        for v in value.values():yield from walk(v)
    elif isinstance(value,list):
        for v in value:yield from walk(v)

refs=sorted(set(walk(data)))
def catalog_job(ref):
    src, meta, entry = convert(DIST/ref, 'catalogo-'+Path(ref).stem, 1900, 86, 560)
    return ref, src, meta, entry
mapping={}
with ThreadPoolExecutor(max_workers=4) as pool:
    for ref,src,meta,entry in pool.map(catalog_job,refs):
        mapping[ref]=src;media[src]=meta;entries.append(entry)

def replace(value):
    if isinstance(value,str):return mapping.get(value,value)
    if isinstance(value,dict):return {k:replace(v) for k,v in value.items()}
    if isinstance(value,list):return [replace(v) for v in value]
    return value
data=replace(data)

albums=[]
photos=ROOT/'FOTOS PARA  WEB'/'FOTOS PARA  WEB'
for folder in sorted(p for p in photos.iterdir() if p.is_dir()):
    name=re.sub(r'(\D)(20\d{2})',r'\1 \2',folder.name)
    year=int(re.search(r'20\d{2}',name).group())
    venue=re.sub(r'\s*20\d{2}', '', name).title().replace('Vraem','VRAEM')
    slug=unicodedata.normalize('NFKD',venue).encode('ascii','ignore').decode().lower().replace(' ','-')
    album={'id':f'{year}-{slug}', 'eventId':f'{year}-{slug.replace("-vraem", "")}', 'name':venue, 'year':year, 'photos':[]}
    sources=sorted(p for p in folder.iterdir() if p.suffix.lower() in ['.jpeg','.jpg','.png'])
    def photo_job(p):
        stem=f'{year}-{slug}-'+hashlib.sha256(p.name.encode()).hexdigest()[:10]
        return convert(p,stem)
    with ThreadPoolExecutor(max_workers=4) as pool:
        for i,(src,meta,entry) in enumerate(pool.map(photo_job,sources)):
            media[src]=meta;entries.append(entry)
            album['photos'].append({'image':src,'caption':f'Encuentro Fermat · {venue} {year} · Fotografía {i+1}'})
    albums.append(album)
    print(f'{venue} {year}: {len(sources)} fotos',flush=True)

cover,meta,entry=convert(photos/'PORTADA.jpeg','portada-concursos',1920,82,800)
media[cover]=meta;entries.append(entry);data['competitionCover']=cover
data['photoAlbums']=sorted(albums,key=lambda a:(-a['year'],a['name']))
data['brand']={}
for key,filename,limit,thumb,trim in [('logo','LOGO.png',512,128,False),
                                      ('wide','ChatGPT Image 28 ene 2026, 05_03_16.png',960,360,True)]:
    src,meta,entry=convert(ROOT.parent/filename,'fermat-'+key,limit,90,thumb,trim)
    data['brand'][key]=src;media[src]=meta;entries.append(entry)
data['providedLogo']=data['brand']['logo']
data['media']={**data.get('media',{}),**media}
DATA.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
entries=list({e['source']:e for e in [*old.get('files',[]),*entries]}.values())
report={'originalBytes':sum(e['originalBytes'] for e in entries), 'webBytes':sum(e['webBytes'] for e in entries),
        'photoCount':sum(len(a['photos']) for a in albums),'albums':len(albums),'files':entries}
report_path.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k!='files'}),flush=True)
