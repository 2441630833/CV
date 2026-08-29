import * as THREE from "three";
import { WIND_GLSL as W, NOISE_GLSL as N, LIGHT_GLSL as L } from "./shaders.js";

export function barkMaterial(uni, soft) {
  return new THREE.ShaderMaterial({
    uniforms: uni, extensions: { derivatives: true },
    transparent: soft, depthWrite: true, side: THREE.DoubleSide,
    vertexShader: W + [
      "attribute vec3 inf; varying vec3 vN,vW,vInf,vL; varying float vH; uniform float uBoxH;",
      "void main(){ vInf=inf; vN=normalize(normal);",
      " vec3 p=position+windOffset(position)*(0.35+0.65*inf.z); vL=p;",
      " vH=clamp(p.y/uBoxH+0.5,0.0,1.0);",
      " vec4 wp=modelMatrix*vec4(p,1.0); vW=wp.xyz; gl_Position=projectionMatrix*viewMatrix*wp; }",
    ].join("\n"),
    fragmentShader: N + L + [
      "precision highp float; uniform float uAlpha,uBoxH; varying vec3 vN,vW,vInf,vL; varying float vH;",
      "vec2 bd(vec2 uv){ return vec2(uv.x*7.0,uv.y*0.62); }",
      "float bhh(vec2 uv){ vec2 q=bd(uv); vec2 w=vec2(gfbm(q*0.5),gfbm(q*0.5+9.1)); vec2 p=q+w*0.6;",
      " float ridge=ridged(p); float plate=smoothstep(-0.25,0.45,gfbm(q*0.34));",
      " float crack=smoothstep(0.30,0.86,ridged(p*1.9+4.0)); float fine=gfbm(p*5.5)*0.5+0.5;",
      " return (ridge-0.5)*1.85*mix(0.35,1.0,plate)-crack*0.42+fine*0.20; }",
      "vec3 bumped(vec3 N,vec3 p,float h,float k){ vec3 dpx=dFdx(p),dpy=dFdy(p);",
      " float dhx=dFdx(h)*k,dhy=dFdy(h)*k; vec3 r1=cross(dpy,N),r2=cross(N,dpx);",
      " float det=dot(dpx,r1); vec3 g=sign(det)*(dhx*r1+dhy*r2); return normalize(abs(det)*N-g); }",
      "void main(){ if(unscanned(vW,520.0))discard; vec2 uv=vInf.xy; float cap=vInf.z;",
      " float m=smoothstep(0.05,0.42,cap); vec3 N=normalize(vN); float h=bhh(uv); N=bumped(N,vW,h,mix(0.26,0.06,m)); vec2 q=bd(uv);",
      " float grain=gfbm(q*1.25)*0.5+0.5; float mottle=gfbm(q*0.28+21.0)*0.5+0.5; float crack=smoothstep(0.30,0.86,ridged(q*1.9+4.0));",
      " vec3 wood=mix(mix(vec3(0.02,0.019,0.018),vec3(0.29,0.283,0.264),grain),mix(vec3(0.024,0.019,0.016),vec3(0.175,0.14,0.11),grain),mottle*0.78);",
      " wood*=1.0-0.70*crack;",
      " float mo=gfbm(vec2(vW.x*2.6,vW.z*2.6+vW.y*1.9))*0.5+0.5;",
      " vec3 moss=mix(vec3(0.0204,0.0311,0.005),vec3(0.0914,0.1392,0.0227),mo)* (0.80+0.42*cap);",
      " vec3 col=mix(wood,moss,m);",
      " float lich=smoothstep(0.56,0.84,gfbm(q*0.62+31.0)*0.5+0.5); lich*=(1.0-m)*smoothstep(-0.1,0.7,N.y)*smoothstep(0.15,0.5,h);",
      " col=mix(col,vec3(0.162,0.176,0.132),lich*0.78);",
      " col*=1.0-0.48*smoothstep(0.0,0.16,cap)*(1.0-smoothstep(0.16,0.6,cap));",
      " float ao=mix(0.30,1.02,smoothstep(-0.4,0.62,h))*mix(1.0,0.86,m);",
      " vec3 lit=litSurface(N,col,ao); vec3 V=normalize(cameraPosition-vW);",
      " lit+=col*uAmbCol*pow(1.0-max(dot(N,V),0.0),4.0)*0.85;",
      " lit+=uKeyCol*pow(max(dot(reflect(-uKeyDir,N),V),0.0),20.0)*0.045*(1.0-m)*ao;",
      " float a=uAlpha*maskAt(vL,uBoxH); if(a<0.004)discard; gl_FragColor=vec4(aerial(lit,vH),a); }",
    ].join("\n"),
  });
}

export function grassMaterial(uni, soft) {
  return new THREE.ShaderMaterial({
    uniforms: uni, side: THREE.DoubleSide, transparent: soft, depthWrite: true,
    vertexShader: W + [
      "attribute vec3 offset,nrm; attribute vec4 rnd; attribute float aux;",
      "uniform vec3 uMouse; uniform float uMouseR,uBoxH;",
      "varying float vT,vShade,vDark,vTone,vH; varying vec3 vN,vW,vL;",
      "void main(){ float t=uv.y; vT=t; float len=rnd.y;",
      " vec3 ref=abs(nrm.y)<0.95?vec3(0.0,1.0,0.0):vec3(1.0,0.0,0.0);",
      " vec3 T0=normalize(cross(nrm,ref)); vec3 B0=cross(nrm,T0);",
      " float ca=cos(rnd.x),sa=sin(rnd.x); vec3 wd=T0*ca+B0*sa; vec3 ld=T0*-sa+B0*ca;",
      " float bend=t*t; float gust=(sin(uTime*1.75+offset.x*1.6+rnd.x)*0.12+sin(uTime*0.85+offset.x*0.55)*0.07)*uWind;",
      " vec3 world=offset+windOffset(offset)+nrm*(t*len)+wd*(position.x*len*0.62)+ld*(rnd.z*0.42*len)*bend+(T0*gust+B0*gust*0.6)*bend*len*1.6;",
      " vec3 toB=offset-uMouse; float infl=smoothstep(uMouseR,0.0,length(toB*vec3(1.0,1.0,0.30))); infl*=infl;",
      " vec3 push=toB-nrm*dot(toB,nrm); float pl=length(push); push=pl>0.0001?push/pl:T0;",
      " world+=push*infl*bend*len*2.2; world-=nrm*infl*bend*len*1.0; vDark=infl;",
      " vShade=(0.66+0.34*rnd.w)*(0.82+0.18*sin(rnd.x*2.0)); vShade*=0.46+0.54*clamp(nrm.y*0.5+0.62,0.0,1.0);",
      " vTone=smoothstep(0.16,0.86,aux); vN=normalize(mix(nrm,normalize(ld*rnd.z+nrm),0.35)); vL=world;",
      " vH=clamp(world.y/uBoxH+0.5,0.0,1.0);",
      " vec4 wp=modelMatrix*vec4(world,1.0); vW=wp.xyz; gl_Position=projectionMatrix*viewMatrix*wp; }",
    ].join("\n"),
    fragmentShader: L + [
      "precision highp float; uniform float uAlpha,uBoxH; varying float vT,vShade,vDark,vTone,vH; varying vec3 vN,vW,vL;",
      "void main(){ if(unscanned(vW,520.0))discard;",
      " vec3 deep=vec3(0.0126,0.0192,0.0031); vec3 mid=vec3(0.0488,0.0744,0.0121);",
      " vec3 tip=vec3(0.1222,0.186,0.0304); vec3 tipHi=vec3(0.26,0.39,0.064);",
      " vec3 col=mix(deep,mid,smoothstep(0.0,0.62,vT)); col=mix(col,tip,smoothstep(0.38,1.0,vT)*(0.35+0.65*vTone));",
      " col*=0.62+0.72*vTone; col*=vShade; col*=1.0-vDark*0.55; vec3 N=normalize(vN);",
      " vec3 lit=litSurface(N,col,mix(0.40,1.10,smoothstep(0.0,0.88,vT))*(0.70+0.52*vTone));",
      " lit+=tipHi*smoothstep(0.68,1.0,vT)*vTone*(0.30+0.70*max(dot(N,uKeyDir),0.0))*0.95;",
      " vec3 V=normalize(cameraPosition-vW); lit+=col*uKeyCol*pow(max(dot(V,-uKeyDir),0.0),2.2)*0.55*vT;",
      " float a=uAlpha*maskAt(vL,uBoxH); if(a<0.004)discard; gl_FragColor=vec4(aerial(lit,vH),a); }",
    ].join("\n"),
  });
}
