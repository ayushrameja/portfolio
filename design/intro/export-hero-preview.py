from pathlib import Path
import re,json
root=Path.cwd();dist=root/'dist'
s=(dist/'index.html').read_text()
s=re.sub(r'<link[^>]*rel="stylesheet"[^>]*>',lambda m:'<style>'+(dist/re.search(r'href="/([^"]+)"',m[0])[1]).read_text()+'</style>',s)
s=re.sub(r'<script type="module" src="/([^"]+)"></script>',lambda m:'<script type="module">'+(dist/m[1]).read_text()+'</script>',s)
s=re.sub(r'<link[^>]*rel="icon"[^>]*>','',s)
s=s.replace('sessionStorage.getItem("ar-intro-seen") === "1"','false')
s=re.sub(r'100(?:d|s)?vh','580px',s)
s=s.replace('</body>','<script>setTimeout(()=>console.log("layout",innerWidth,document.documentElement.scrollWidth),3500)</script></body>')
outer='''<!doctype html><html><head><style>body{margin:0;font:13px var(--font-sans,Arial);color:var(--foreground)}.tools{display:flex;gap:8px;margin-bottom:12px}button{padding:8px 12px;border:1px solid var(--border);border-radius:var(--radius,8px);color:var(--foreground);background:var(--card);cursor:pointer}iframe{display:block;width:100%;height:580px;border:0;border-radius:var(--radius,12px);margin:auto}</style></head><body><div class="tools"><button id="replay">Replay</button><button id="slow">Slow motion</button><button id="mobile">Mobile / desktop</button></div><iframe id="frame" title="Loading to hero prototype"></iframe><script>const page=PAGE;const frame=document.getElementById('frame');function play(slow=false){const patch=slow?'<script>const original=Element.prototype.animate;Element.prototype.animate=function(...args){const a=original.apply(this,args);a.playbackRate=.35;return a};const timer=window.setTimeout;window.setTimeout=(fn,ms,...args)=>timer(fn,ms===4000?12000:ms,...args);<X/script>':'';frame.srcdoc=page.replace('<head>','<head>'+patch.replace('<X/script>','<'+ '/script>'));}document.getElementById('replay').onclick=()=>play();document.getElementById('slow').onclick=()=>play(true);document.getElementById('mobile').onclick=()=>{frame.style.width=frame.style.width?'':'min(390px,100%)';play()};play();</script></body></html>'''
outer=outer.replace('PAGE',json.dumps(s).replace('</','<\\/'))
(root/'design/intro/hero-preview.html').write_text(outer)
