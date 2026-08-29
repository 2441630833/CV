import * as THREE from "three";

export const WIND_GLSL = [
  "uniform float uTime;",
  "uniform float uWind;",
  "vec3 windOffset(vec3 p){",
  "  float ph = p.x*0.42 + p.y*0.30 + p.z*0.70;",
  "  float a = 0.030*uWind;",
  "  return vec3((sin(uTime*0.58+ph)+0.45*sin(uTime*1.37+ph*2.3))*a,",
  "              sin(uTime*0.79+ph*1.7)*a*0.42,",
  "              sin(uTime*0.51+ph*0.9)*a*0.55);",
  "}",
].join("\n");

export const NOISE_GLSL = [
  "vec2 hash22(vec2 p){ p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));",
  "  return -1.0+2.0*fract(sin(p)*43758.5453123); }",
  "float gnoise(vec2 p){ vec2 i=floor(p),f=fract(p); vec2 u=f*f*(3.0-2.0*f);",
  "  return mix(mix(dot(hash22(i+vec2(0,0)),f-vec2(0,0)),dot(hash22(i+vec2(1,0)),f-vec2(1,0)),u.x),",
  "             mix(dot(hash22(i+vec2(0,1)),f-vec2(0,1)),dot(hash22(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y); }",
  "const mat2 ROT=mat2(0.80,0.60,-0.60,0.80);",
  "float gfbm(vec2 p){ float a=0.5,s=0.0; for(int i=0;i<5;i++){ s+=a*gnoise(p); p=ROT*p*2.03; a*=0.5;} return s; }",
  "float ridged(vec2 p){ float a=0.5,s=0.0; for(int i=0;i<4;i++){ s+=a*(1.0-abs(gnoise(p)*2.0)); p=ROT*p*2.11; a*=0.5;} return s; }",
].join("\n");

export const LIGHT_GLSL = [
  "uniform vec3 uKeyDir,uKeyCol,uFillDir,uFillCol,uAmbCol,uHazeCol;",
  "uniform float uHaze,uFog,uMaskOn,uHazeLift;",
  "uniform vec4 uMask;",
  "vec3 litSurface(vec3 N,vec3 albedo,float ao){ float k=max(dot(N,uKeyDir),0.0); float f=max(dot(N,uFillDir),0.0);",
  "  float sky=0.5+0.5*N.y;",
  "  return albedo*(uKeyCol*(0.09+1.05*k)+uFillCol*(0.04+0.34*f)+uAmbCol*(0.35+0.65*sky))*ao; }",
  "vec3 aerial(vec3 c,float h){ float amt=clamp(uFog+uHaze*smoothstep(0.05,0.95,h),0.0,1.0);",
  "  float gain=smoothstep(0.003,0.075,dot(c,vec3(0.30,0.59,0.11)));",
  "  return mix(c,uHazeCol,amt*mix(uHazeLift,1.0,gain)); }",
  "uniform vec3 uScanO; uniform float uScanR,uScanOn;",
  "bool unscanned(vec3 w,float lag){ if(uScanOn<0.5) return false;",
  "  float wob=sin(w.y*0.011+w.x*0.007)*36.0+sin(w.z*0.021+w.y*0.013)*17.0;",
  "  return distance(w,uScanO)>uScanR-lag+wob; }",
  "float maskAt(vec3 lp,float boxH){ if(uMaskOn<0.5) return 1.0;",
  "  float e=1.0-smoothstep(uMask.x,uMask.y,lp.x);",
  "  float l=smoothstep(uMask.z,uMask.w,lp.y/boxH+0.5);",
  "  return clamp(e*l,0.0,1.0); }",
].join("\n");

export function radialTexture(size, stops) {
  const c = document.createElement("canvas"); c.width = c.height = size;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach((s) => grad.addColorStop(s[0], s[1]));
  g.fillStyle = grad; g.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.minFilter = THREE.LinearFilter;
  if ("sRGBEncoding" in THREE) t.encoding = THREE.sRGBEncoding;
  return t;
}

export function makeFlowerTexture() {
  const c = document.createElement("canvas"); c.width = c.height = 64;
  const g = c.getContext("2d");
  const TAU = Math.PI * 2;
  const FLORETS = [
    [32, 22, 7.4], [22, 33, 6.0], [42, 33, 6.2], [27, 44, 5.0],
    [39, 45, 5.4], [32, 33, 4.4], [46, 22, 4.2], [18, 22, 4.0],
  ];
  for (let f = 0; f < FLORETS.length; f++) {
    const cx = FLORETS[f][0], cy = FLORETS[f][1], r = FLORETS[f][2];
    g.save(); g.translate(cx, cy); g.rotate(f * 1.31);
    for (let p = 0; p < 5; p++) {
      g.save(); g.rotate((p / 5) * TAU);
      g.fillStyle = "rgba(255,255,251," + (0.72 + 0.28 * (r / 7.4)) + ")";
      g.beginPath(); g.ellipse(0, -r * 0.55, r * 0.34, r * 0.55, 0, 0, TAU); g.fill();
      g.restore();
    }
    g.fillStyle = "#f0e7bd";
    g.beginPath(); g.arc(0, 0, r * 0.24, 0, TAU); g.fill();
    g.restore();
  }
  const t = new THREE.CanvasTexture(c);
  if ("sRGBEncoding" in THREE) t.encoding = THREE.sRGBEncoding;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.generateMipmaps = true;
  return t;
}
