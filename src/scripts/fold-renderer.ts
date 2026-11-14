import { monogram } from '../brand/monogram';
import { INTRO_TIMING } from './intro-timing';

const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
const fragment = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D mark;
uniform vec4 panel; // resting panel centre and half size, canvas pixels
uniform float radius;
uniform float gutter;
uniform float size;
uniform float time;
uniform vec3 pageA; // leading accent and letter of the a page, then of the r page
uniform vec3 inkA;
uniform vec3 pageB;
uniform vec3 inkB;
uniform vec3 hero;
uniform vec3 glowA; // the remaining accents, blended in from the corners
uniform vec3 glowB;
const float PI=3.14159265;
float g(float x){return exp(-x*x);}
float grain(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453)-.5;}
// Each page is a deep, soft blend of all four accents, led by its own. Depth
// is set by brightness, so both pages end up equally dark whatever their hue.
vec3 deep(vec3 c,float level){return c*level/dot(c,vec3(.299,.587,.114));}
vec3 paper(vec3 lead,vec3 other,vec2 n){
 vec3 c=deep(lead,.3);
 c=mix(c,deep(glowA,.3),.55*g(length(n-vec2(-1.,1.))));
 c=mix(c,deep(glowB,.26),.5*g(length(n-vec2(1.,-1.))));
 return mix(c,deep(other,.26),.3*g(length(n-vec2(1.,1.))/.9));
}
float box(vec2 p,vec2 b,float r){
 r=min(r,min(b.x,b.y));
 vec2 q=abs(p)-b+r;
 return length(max(q,0.))+min(max(q.x,q.y),0.)-r;
}
// A horizontal span of the page. Its seam end keeps its own rounded corners,
// so the radius tightens as the span narrows, like the reference icon.
float span(vec2 q,float x0,float x1,float hy){
 return box(q-vec2((x0+x1)*.5,0.),vec2(max((x1-x0)*.5,0.),hy),radius);
}
// A and R share a texture atlas, but remain independent original paths.
// Sampled without branching: a lookup skipped for some pixels leaves its
// neighbours without derivatives, which drew hairlines along the letter's box.
float ink(vec2 q,float letter){
 vec2 uv=q/size+.5;
 vec2 inside=step(0.,uv)*step(uv,vec2(1.));
 uv=clamp(uv,0.,1.);
 return texture2D(mark,vec2((uv.x+letter)*.5,1.-uv.y)).a*inside.x*inside.y;
}
vec3 refractInk(vec2 q,float letter,float lens,float unit){
 float split=.012*lens*unit;
 float blur=.008*lens*unit;
 return vec3(
  (ink(q+vec2(split+blur,0.),letter)+ink(q+vec2(split-blur,0.),letter))*.5,
  ink(q,letter),
  (ink(q-vec2(split+blur,0.),letter)+ink(q-vec2(split-blur,0.),letter))*.5);
}
// Refracted light reads warm on deep surfaces and cool on bright ones, as in
// the reference: red-orange glow on dark, cyan-lavender haze on light.
vec3 haze(vec3 c,float amount,float d,float y){
 float band=.5+.5*sin(y*5.+d*9.);
 vec3 warm=vec3(.62,.1,.02)+vec3(-.25,.32,.06)*g(d/.05);
 vec3 cool=-vec3(.42,.06,0.)*band-vec3(.04,.26,0.)*(1.-band);
 return c+amount*mix(warm,cool,c.g);
}
void main(){
 vec2 q=gl_FragCoord.xy-panel.xy;
 vec2 h=panel.zw;
 float unit=2.*min(h.x,h.y);
 bool revealing=time>=${INTRO_TIMING.revealStart / 1000};
 float progress=clamp((time-(revealing?${INTRO_TIMING.revealStart / 1000}:${INTRO_TIMING.foldStart / 1000}))/${INTRO_TIMING.foldTravel / 1000},0.,1.);
 float eased=progress*progress*(3.-2.*progress);
 float active=sin(progress*PI);
 float facing=cos(progress*PI);
 // The outgoing page is in front until the edge-on midpoint, then the
 // incoming page. Only the front page lifts, bows and flares.
 bool outFront=progress<.5;
 float lip=abs(facing)*active;
 float seam=(mix(-.12,1.12,eased)*2.-1.)*h.x;
 float yn=clamp(q.y/h.y,-1.,1.);
 float bow=.06*unit*lip*(1.-yn*yn);
 float flare=min(.035*unit,gutter*.85)*lip*g((q.x-seam)/(.1*unit));
 float reach=gutter*.85;
 float end=outFront?max(max(seam,-h.x)-bow,-h.x-reach):min(min(seam,h.x)+bow,h.x+reach);
 float hy=h.y+flare;
 float dFront=outFront?span(q,end,h.x,hy):span(q,-h.x,end,hy);
 float dBack=box(q,h,radius);
 float cFront=clamp(.5-dFront,0.,1.);
 float cBack=clamp(.5-dBack,0.,1.);
 // Cylindrical curl at the front page's seam end: content compresses toward
 // the silhouette, then settles to its exact flat position.
 float e=max(outFront?q.x-end:end-q.x,0.);
 float curl=(.012+.07*abs(facing))*active*unit+1.;
 float t=min(e/curl,1.);
 float wrap=(curl*acos(1.-t)-e)*(e<curl?1.:g((e-curl)/curl));
 // Refraction spans more of the artwork than the physical edge; both letters
 // return to their exact paths once the travelling lens leaves.
 float d=q.x-seam;
 float lens=g(d/(.17*unit))*active;
 vec2 warp=vec2(.05*lens+sin(q.y/unit*13.)*.034*lens,sin(q.y/unit*9.)*.03*lens)*unit;
 vec2 pOut=q+warp;
 vec2 pIn=q-warp;
 if(outFront)pOut.x-=wrap;else pIn.x+=wrap;
 float logo=smoothstep(.10,${INTRO_TIMING.logoIn / 1000},time);
 // Branches on revealing are the same for every pixel, so texture lookups
 // inside them keep their derivatives. During the reveal only the outgoing
 // page is a page; the incoming one is the hero, so its lookups are skipped.
 vec3 paperB=paper(pageB,pageA,q/h*vec2(-1.,1.));
 float glow=lens*.55;
 vec3 outColor;
 if(revealing)outColor=mix(paperB,inkB,refractInk(pOut,1.,lens,unit));
 else outColor=mix(paper(pageA,pageB,q/h),inkA,refractInk(pOut,0.,lens,unit)*logo);
 outColor=haze(outColor,glow,d/unit,q.y/unit);
 // Green-gold rim light hugs the curl; every page is deep enough to take it.
 float rim=(1.-t)*active;
 vec3 shine=vec3(.2,.42,.12)*rim*min(lip*2.5,1.)+vec3(g(e/1.5))*active*.22;
 // Premultiplied layers. During the reveal the incoming page is the real
 // hero: transparent inside its rect, painted only where the page flares past it.
 vec4 incoming;
 if(revealing)incoming=vec4(hero*(1.-cBack)+haze(hero,glow,d/unit,q.y/unit)-hero,1.-cBack);
 else incoming=vec4(haze(mix(paperB,inkB,refractInk(pIn,1.,lens,unit)),glow,d/unit,q.y/unit),1.);
 vec4 outgoing=vec4(outColor,1.);
 vec4 front=(outFront?outgoing:incoming)+vec4(shine,0.);
 vec4 back=(outFront?incoming:outgoing)*cBack;
 front*=cFront;
 float shadow=g(max(dFront,0.)/(.012*unit))*lip*.22*(1.-cFront);
 vec4 under=vec4(0.,0.,0.,shadow)+back*(1.-shadow);
 // The front page hides the back page even where it is the transparent hero.
 vec4 color=front+under*(1.-cFront);
 color.rgb+=grain(gl_FragCoord.xy)*.045*color.a;
 gl_FragColor=vec4(clamp(color.rgb,0.,1.),color.a);
}`;

export function createFoldRenderer(canvas: HTMLCanvasElement, surface: HTMLElement) {
 const gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:true,antialias:false,depth:false,stencil:false,powerPreference:'low-power'});
 if(!gl)return null;
 const shaders:WebGLShader[]=[];
 let program:WebGLProgram|null=null, buffer:WebGLBuffer|null=null, texture:WebGLTexture|null=null;
 let disposed=false;
 const destroy=()=>{
  if(disposed)return; disposed=true;
  shaders.forEach(s=>gl.deleteShader(s)); gl.deleteProgram(program); gl.deleteBuffer(buffer); gl.deleteTexture(texture);
  // loseContext() blocked for ~50ms on desktop, longer on phones. Deleting the
  // objects and shrinking the drawing buffer frees the memory; the context
  // itself goes with the detached canvas.
  canvas.width=canvas.height=1;
 };
 try {
  const compile=(type:number,source:string)=>{
   const shader=gl.createShader(type); if(!shader)throw Error('Shader unavailable'); shaders.push(shader);
   gl.shaderSource(shader,source);gl.compileShader(shader);
   if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error('Shader failed'); return shader;
  };
  program=gl.createProgram(); if(!program)throw Error('Program unavailable');
  gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));
  gl.bindAttribLocation(program,0,'position');gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Link failed');gl.useProgram(program);
  buffer=gl.createBuffer();texture=gl.createTexture();if(!buffer||!texture)throw Error('Allocation failed');
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
  // 1024px per letter with mipmaps keeps the mark crisp from phones to 5K displays.
  const source=document.createElement('canvas');source.width=2048;source.height=1024;
  const ctx=source.getContext('2d');if(!ctx)throw Error('Texture unavailable');
  (['a','r'] as const).forEach((letter,index)=>{
   ctx.setTransform(1024/50,0,0,1024/50,index*1024-(letter==='a'?.5:54.5)*1024/50,0);
   monogram[letter].paths.forEach(d=>ctx.fill(new Path2D(d),'evenodd'));
  });
  gl.bindTexture(gl.TEXTURE_2D,texture);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source);gl.generateMipmap(gl.TEXTURE_2D);source.width=source.height=1;
  const uniform=(name:string)=>gl.getUniformLocation(program!,name);
  const panel=uniform('panel'),radius=uniform('radius'),gutter=uniform('gutter'),size=uniform('size'),time=uniform('time');
  // Page colours come from the hero theme, so the loader and hero share one palette.
  const theme=getComputedStyle(surface);
  const color=(name:string,role:string,fallback:string)=>{
   let value=theme.getPropertyValue(role).trim();
   if(/^#[0-9a-f]{3}$/i.test(value))value=value.replace(/[0-9a-f]/gi,'$&$&');
   const hex=parseInt((/^#[0-9a-f]{6}$/i.test(value)?value:fallback).slice(1),16);
   gl.uniform3f(uniform(name),(hex>>16)/255,(hex>>8&255)/255,(hex&255)/255);
  };
  color('pageA','--intro-a-page','#7c5cff');color('inkA','--intro-a-ink','#f4f1ea');
  color('pageB','--intro-r-page','#5cc8ff');color('inkB','--intro-r-ink','#f4f1ea');
  color('hero','--hero-top','#0a0a0c');color('glowA','--hero-sky','#5cc8ff');color('glowB','--hero-coral','#ff5a3c');
  // The panel's centre x, half width and shorter side in canvas pixels, for the reveal's scissor.
  let centre=0,half=0,unit=0;
  const resize=()=>{
   const box=canvas.getBoundingClientRect(),hero=surface.getBoundingClientRect();if(!box.width||!box.height||disposed)return;
   const ratio=Math.min(devicePixelRatio||1,2,Math.sqrt(4200000/(box.width*box.height)));
   canvas.width=Math.floor(box.width*ratio);canvas.height=Math.floor(box.height*ratio);
   gl.viewport(0,0,canvas.width,canvas.height);
   centre=(hero.left-box.left+hero.width/2)*ratio;half=hero.width/2*ratio;unit=Math.min(hero.width,hero.height)*ratio;
   // WebGL pixels run bottom-up; the panel's centre is measured from the canvas's bottom edge.
   gl.uniform4f(panel,centre,(box.bottom-hero.bottom+hero.height/2)*ratio,half,hero.height/2*ratio);
   gl.uniform1f(radius,(parseFloat(getComputedStyle(surface).borderTopLeftRadius)||0)*ratio);
   gl.uniform1f(gutter,Math.min(hero.top-box.top,hero.left-box.left)*ratio);
   gl.uniform1f(size,Math.min(268,Math.max(152,innerWidth*.21))*ratio);
  };
  resize();
  // In the reveal everything left of the seam's refraction trail is the
  // uncovered page, fully transparent, so only the strip from there to the
  // right edge is shaded. The trail fades to nothing within half a unit.
  const scissor=(ms:number)=>{
   const progress=Math.min(1,Math.max(0,(ms-INTRO_TIMING.revealStart)/INTRO_TIMING.foldTravel));
   const eased=progress*progress*(3-2*progress);
   const left=Math.max(0,Math.floor(centre+((-.12+1.24*eased)*2-1)*half-.5*unit));
   gl.scissor(left,0,Math.max(0,canvas.width-left),canvas.height);
  };
  return {resize,destroy,draw:(ms:number)=>{
   if(disposed)return;
   if(ms>=INTRO_TIMING.revealStart){gl.enable(gl.SCISSOR_TEST);scissor(ms);}else gl.disable(gl.SCISSOR_TEST);
   gl.uniform1f(time,ms/1000);gl.drawArrays(gl.TRIANGLES,0,3);
  }};
 }catch{destroy();return null;}
}
