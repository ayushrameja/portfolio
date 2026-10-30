from pathlib import Path
import re, base64, mimetypes
root=Path(__file__).resolve().parents[2]
html=(root/'dist/index.html').read_text()
hero=re.search(r'<div class="hero-frame"[^>]*>.*?</main>',html,re.S)[0].removesuffix('</main>')
hero=re.sub(r'<script\b.*?</script>','',hero,flags=re.S)
hero=re.sub(r' srcset="[^"]*"','',hero)
def data(path):
 p=root/path.lstrip('/')
 return 'data:'+ (mimetypes.guess_type(p)[0] or 'application/octet-stream')+';base64,'+base64.b64encode(p.read_bytes()).decode()
hero=re.sub(r'src="(/_astro/[^"]+)"',lambda m:'src="'+data('dist'+m[1])+'"',hero)
logo=re.search(r'<svg class="intro-logo".*?</svg>',html,re.S)[0]
css='\n'.join(re.search(r'<style>(.*?)</style>',(root/f'src/components/{name}.astro').read_text(),re.S)[1] for name in ['Hero','Intro'])
css=re.sub(r'url\([\'\"]?(/[^)\'\"]+)[\'\"]?\)',lambda m:'url("'+data('public'+m[1])+'")',css)
css=re.sub(r'\d+(?:s|d)?vh','760px',css)
css=re.sub(r'\d+vw','700px',css)
template=(Path(__file__).parent/'template.html').read_text()
(Path(__file__).parent/'prototype.html').write_text(template.replace('/* COMPONENT_CSS */',css).replace('<!-- HERO -->',hero).replace('<!-- LOGO -->',logo))
print('Built standalone prototype.html')
