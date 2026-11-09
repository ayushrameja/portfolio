import { monogram } from '../brand/monogram';
import { INTRO_TIMING } from './intro-timing';

const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
const fragment = `
precision mediump float;
uniform vec2 resolution;
uniform sampler2D mark;
uniform float time;
uniform float size;
float g(float x){return exp(-x*x);}
// A and R share a texture atlas, but remain independent original paths.
float ink(vec2 p,float letter){
 vec2 uv=p/size+.5;
 if(uv.x<0.||uv.x>1.||uv.y<0.||uv.y>1.)return 0.;
 return texture2D(mark,vec2((uv.x+letter)*.5,1.-uv.y)).a;
}
vec3 refractInk(vec2 p,float letter,float lens){
 float split=.025*lens;
 float blur=.006*lens;
 return vec3(
  (ink(p+vec2(split+blur,0.),letter)+ink(p+vec2(split-blur,0.),letter))*.5,
  ink(p,letter),
  (ink(p-vec2(split+blur,0.),letter)+ink(p-vec2(split-blur,0.),letter))*.5);
}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;
 float unit=min(resolution.x,resolution.y);
 vec2 p=(gl_FragCoord.xy-resolution*.5)/unit;
 bool revealing=time>=${INTRO_TIMING.revealStart / 1000};
 float progress=clamp((time-(revealing?${INTRO_TIMING.revealStart / 1000}:${INTRO_TIMING.foldStart / 1000}))/${INTRO_TIMING.foldTravel / 1000},0.,1.);
 float eased=progress*progress*(3.-2.*progress);
 float active=sin(progress*3.14159);
 // The visible facing changes across the turn: outgoing face, edge-on,
 // incoming face. The curved region narrows at the midpoint, never a slab.
 float facing=cos(progress*3.14159);
 float width=(.012+.18*abs(facing))*active+.001;
 float seam=mix(-.12,1.12,eased)+sin(uv.y*3.14159)*.045*facing*active;
 float d=(uv.x-seam)*resolution.x/unit;
 float rolled=g(d/width)*active;
 float lift=.025*rolled*abs(facing);
 float inside=1.-(1.-smoothstep(0.,.002,min(uv.y,1.-uv.y)-lift))*rolled*abs(facing);
 float changed=1.-smoothstep(-.002,.002,d);
 changed=progress<.5?max(changed,1.-inside):min(changed,inside);
 // Distortion spans more of the artwork than the thin physical edge. Both
 // letters settle back to their exact paths when the travelling lens leaves.
 float lens=g(d/.15)*active;
 vec2 old=p;
 old.x+=.055*lens+sin(p.y*12.)*.022*lens;
 old.y+=sin(p.y*10.)*.035*lens;
 vec2 next=p;
 next.x-=.055*lens-sin(p.y*12.)*.022*lens;
 next.y-=sin(p.y*10.)*.035*lens;
 float logo=smoothstep(.10,.48,time);
 vec3 dark=vec3(.0353);
 vec3 light=vec3(.98);
 vec3 oldColor=revealing?mix(light,dark,refractInk(old,1.,lens)):mix(dark,light,refractInk(old,0.,lens)*logo);
 vec3 nextColor=mix(light,dark,refractInk(next,1.,lens));
 // Curvature reverses its lighting as the other face opens. Spectral light
 // hugs the bend; the surface stays the same black/white as its resting face.
 float faceMask=progress<.5?smoothstep(-.002,.002,d):1.-smoothstep(-.002,.002,d);
 float curve=rolled*faceMask;
 vec3 spectrum=.5+.5*cos(6.28318*(d*3.+uv.y*.12+vec3(0.,.33,.67)));
 vec3 lighting=(spectrum-.5)*lens*.32;
 vec3 color=mix(oldColor,nextColor,changed)+lighting;
 color+=curve*(revealing?-.16:.16)*facing;
 color-=g((d-width*.4)/max(width*.45,.004))*active*.12;
 color+=g(d/.006)*active*.22;
 if(revealing){
  // The second white sheet uncovers the actual dark hero DOM.
  float sheet=1.-changed;
  float shadow=g(d/.045)*active*.16;
  float alpha=sheet+(1.-sheet)*shadow;
  vec3 outgoing=oldColor+lighting-curve*.16+g(d/.006)*active*.22;
  gl_FragColor=vec4(clamp(outgoing,0.,1.)*sheet,alpha);
 }else{
  gl_FragColor=vec4(clamp(color,0.,1.),1.);
 }
}`;

export function createFoldRenderer(canvas: HTMLCanvasElement) {
 const gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:true,antialias:false,depth:false,stencil:false,powerPreference:'low-power'});
 if(!gl)return null;
 const shaders:WebGLShader[]=[];
 let program:WebGLProgram|null=null, buffer:WebGLBuffer|null=null, texture:WebGLTexture|null=null;
 let disposed=false;
 const destroy=()=>{
  if(disposed)return; disposed=true;
  shaders.forEach(s=>gl.deleteShader(s)); gl.deleteProgram(program); gl.deleteBuffer(buffer); gl.deleteTexture(texture);
  gl.getExtension('WEBGL_lose_context')?.loseContext(); canvas.width=canvas.height=1;
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
  const source=document.createElement('canvas');source.width=1024;source.height=512;
  const ctx=source.getContext('2d');if(!ctx)throw Error('Texture unavailable');
  (['a','r'] as const).forEach((letter,index)=>{
   ctx.setTransform(512/50,0,0,512/50,index*512-(letter==='a'?.5:54.5)*512/50,0);
   monogram[letter].paths.forEach(d=>ctx.fill(new Path2D(d),'evenodd'));
  });
  gl.bindTexture(gl.TEXTURE_2D,texture);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source);source.width=source.height=1;
  const resolution=gl.getUniformLocation(program,'resolution'),size=gl.getUniformLocation(program,'size'),time=gl.getUniformLocation(program,'time');
  const resize=()=>{
   const {width,height}=canvas.getBoundingClientRect();if(!width||!height||disposed)return;
   const ratio=Math.min(devicePixelRatio||1,1.5,Math.sqrt(900000/(width*height)));
   canvas.width=Math.floor(width*ratio);canvas.height=Math.floor(height*ratio);
   gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(resolution,canvas.width,canvas.height);
   gl.uniform1f(size,Math.min(268,Math.max(152,innerWidth*.21))/Math.min(width,height));
  };
  resize();
  return {resize,destroy,draw:(ms:number)=>{if(disposed)return;gl.uniform1f(time,ms/1000);gl.drawArrays(gl.TRIANGLES,0,3);}};
 }catch{destroy();return null;}
}
