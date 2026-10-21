"""Import the six public assets exported by the browser. Never scrape Facebook."""
from pathlib import Path
from PIL import Image,ImageOps
import json,shutil,sys

root=Path(__file__).resolve().parent.parent
source=Path(sys.argv[1])
datafile=root/'dist/contenido.json'
data=json.loads(datafile.read_text('utf-8'))
originals=root/'.local/facebook-2026-10-21'
output=root/'dist/assets/social'
originals.mkdir(parents=True,exist_ok=True);output.mkdir(parents=True,exist_ok=True)
sources={
 'huancapi':('23babe7df5abd037.jpg','2026-huancapi','https://www.facebook.com/concursos.fermat/posts/pfbid0YaDf4Ppzk5mmwNFNGDdTGdFoQmN7giJ3bkVvtKmsvdKyy828st895T4sjTrfCsQnl'),
 'santa-rosa':('026fd2f9f6de07c1.jpg','2026-santa-rosa','https://www.facebook.com/concursos.fermat/posts/pfbid0mgsErjvAzpE729iH2sL7DZ99sdxh4Ymp9AajDQGyWbYtX6359TgtiMQJpxuUJrTcl'),
 'san-miguel':('23427811d1e29bb7.jpg','2026-san-miguel','https://www.facebook.com/concursos.fermat/posts/pfbid029wBehG7Pgg15QnCAZE95pAPpsW3cUiP6Amx1g2t1xCaFskUe5p1Rt8JNpF4rxeJfl'),
 'comunicacion-inicial':('ce6b44be58a7251b.jpg','comunicacion-inicial','https://www.facebook.com/concursos.fermat/posts/pfbid02sU9A2whDVzsVgg3soAwaCyPTGXJzTQR7b8GuDZCCKoYYJqu2geBz79xMtawbeHYEl'),
 'comunicacion-primaria':('b35a8cc4455f87a3.jpg','comunicacion-primaria','https://www.facebook.com/concursos.fermat/posts/pfbid02sU9A2whDVzsVgg3soAwaCyPTGXJzTQR7b8GuDZCCKoYYJqu2geBz79xMtawbeHYEl'),
 'comunicacion-secundaria':('4e72afbc7b07a614.jpg','comunicacion-secundaria','https://www.facebook.com/concursos.fermat/posts/pfbid02sU9A2whDVzsVgg3soAwaCyPTGXJzTQR7b8GuDZCCKoYYJqu2geBz79xMtawbeHYEl')
}
report=[]
for slug,(name,entity,post) in sources.items():
 original=source/name
 if original.resolve()!=(originals/name).resolve():shutil.copy2(original,originals/name)
 with Image.open(original) as im:
  im=ImageOps.exif_transpose(im).convert('RGB');variants=[]
  for size,quality in [(320,68),(1600,80)]:
   version=im.copy();version.thumbnail((size,size),Image.Resampling.LANCZOS)
   path=output/f'{slug}-2026-{size}.webp';version.save(path,'WEBP',quality=quality,method=6)
   variants.append({'src':path.relative_to(root/'dist').as_posix(),'width':version.width,'height':version.height,'bytes':path.stat().st_size})
  full=variants[-1]
  data['media'][full['src']]={'width':full['width'],'height':full['height'],'thumb':variants[0]['src'],'srcset':', '.join(f"{v['src']} {v['width']}w" for v in variants)}
  if entity.startswith('2026-'):
   event=next(e for e in data['events'] if e['id']==entity)
   # The earlier full-resolution image remains an alternate poster.
   event['posterAlternatives']=[p for p in dict.fromkeys([event['poster'],*event.get('posterAlternatives',[])]) if p!=full['src']]
   event['poster']=full['src']
  else:
   book=next(b for b in data['books'] if b['id']==entity)
   book['images']=list(dict.fromkeys([full['src'],*book.get('images',[]),book['image']]))
   book['image']=full['src']
  report.append({'asset':slug,'sourceURL':post,'originalBytes':original.stat().st_size,'webBytes':sum(v['bytes'] for v in variants),'variants':variants})
data['updated']='2026-10-21'
datafile.write_bytes((json.dumps(data,ensure_ascii=False,indent=2)+'\n').encode('utf-8'))
result={'files':report,'originalBytes':sum(r['originalBytes'] for r in report),'webBytes':sum(r['webBytes'] for r in report)}
(root/'revision-diseno/facebook-optimizacion.json').write_bytes((json.dumps(result,ensure_ascii=False,indent=2)+'\n').encode('utf-8'))
print(json.dumps({k:v for k,v in result.items() if k!='files'}))
