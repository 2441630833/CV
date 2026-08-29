import * as THREE from "three";
import { TAU, rand, sstep, clamp01 } from "./utils.js";
import { BOXW } from "./utils.js";
import { tessellate, plantBlades, bladeGeometry, buildWire } from "./mesh.js";
import { limbSurface } from "./limbs.js";
import { barkMaterial, grassMaterial } from "./materials.js";
import { WIND_GLSL as W, LIGHT_GLSL as L, radialTexture, makeFlowerTexture } from "./shaders.js";

export function lightUniforms(shared, opt) {
  const u = {
    uTime: shared.uTime, uWind: shared.uWind,
    uKeyDir: { value: shared.KEY.clone() },
    uKeyCol: { value: new THREE.Color(1.14, 1.06, 0.88) },
    uFillDir: { value: shared.FILL.clone() },
    uFillCol: { value: new THREE.Color(0.78, 0.78, 0.62) },
    uAmbCol: { value: new THREE.Color(0.086, 0.09, 0.08) },
    uHazeCol: { value: new THREE.Color().fromArray(opt.hazeCol || [0.176, 0.195, 0.145]) },
    uHaze: { value: opt.haze ?? 0.15 }, uHazeLift: { value: opt.hazeLift ?? 0.2 },
    uFog: { value: opt.fog ?? 0 },
    uAlpha: { value: opt.alpha ?? 1 }, uBoxH: { value: BOXW / opt.aspect },
    uMask: { value: new THREE.Vector4(...(opt.mask || [0, 1, 0, 1])) },
    uMaskOn: { value: opt.mask ? 1 : 0 },
    uScanO: shared.uScanO, uScanR: shared.uScanR, uScanOn: shared.uScanOn,
    uMouse: { value: opt.mouse.value }, uMouseR: { value: opt.mouseR ?? 1.5 },
  };
  return u;
}

function flowerMaterial(uni) {
  return new THREE.ShaderMaterial({
    uniforms: { ...uni, uMap: { value: makeFlowerTexture() } },
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
    vertexShader: W + [
      "attribute vec3 iPos; attribute vec2 iRnd; uniform float uBoxH;",
      "varying vec2 vUv; varying float vH; varying vec3 vL,vW;",
      "void main(){ vUv=uv; vec3 p=iPos+windOffset(iPos)*1.6;",
      " p+=vec3(sin(uTime*1.5+iRnd.y*6.28),0.0,0.0)*0.02*uWind; vL=p;",
      " vH=clamp(p.y/uBoxH+0.5,0.0,1.0); vW=(modelMatrix*vec4(p,1.0)).xyz;",
      " vec4 mv=modelViewMatrix*vec4(p,1.0); float ws=length(modelMatrix[0].xyz);",
      " mv.xy+=position.xy*iRnd.x*ws; gl_Position=projectionMatrix*mv; }",
    ].join("\n"),
    fragmentShader: L + [
      "precision highp float; uniform sampler2D uMap; uniform float uAlpha,uBoxH;",
      "varying vec2 vUv; varying float vH; varying vec3 vL,vW;",
      "void main(){ if(unscanned(vW,520.0))discard; vec4 t=texture2D(uMap,vUv);",
      " if(t.a<0.14)discard; vec3 col=t.rgb*t.rgb*(uKeyCol*0.62+uAmbCol*0.9);",
      " gl_FragColor=vec4(aerial(col,vH),t.a*uAlpha*maskAt(vL,uBoxH)); }",
    ].join("\n"),
  });
}

export function assembleRoot(limbs, opt, shared) {
  const group = new THREE.Group();
  const uni = lightUniforms(shared, opt);
  const soft = !!opt.mask || opt.alpha < 1;

  const bag = { pos: [], nor: [], inf: [], idx: [] };
  for (const lmb of limbs) tessellate(lmb, bag);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(bag.pos, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(bag.nor, 3));
  geo.setAttribute("inf", new THREE.Float32BufferAttribute(bag.inf, 3));
  geo.setIndex(bag.idx);
  const shell = new THREE.Mesh(geo, barkMaterial(uni, soft));
  shell.frustumCulled = false; shell.renderOrder = opt.order;
  group.add(shell);

  const fur = { off: [], nrm: [], rnd: [], aux: [] };
  let total = 0;
  for (const lmb of limbs) total += lmb.len;
  for (const lmb of limbs) plantBlades(lmb, Math.round(opt.blades * lmb.len / total), fur, shared.rng);
  const bg = bladeGeometry();
  bg.setAttribute("offset", new THREE.InstancedBufferAttribute(new Float32Array(fur.off), 3));
  bg.setAttribute("nrm", new THREE.InstancedBufferAttribute(new Float32Array(fur.nrm), 3));
  bg.setAttribute("rnd", new THREE.InstancedBufferAttribute(new Float32Array(fur.rnd), 4));
  bg.setAttribute("aux", new THREE.InstancedBufferAttribute(new Float32Array(fur.aux), 1));
  bg.instanceCount = fur.off.length / 3;
  const grass = new THREE.Mesh(bg, grassMaterial(uni, soft));
  grass.frustumCulled = false; grass.renderOrder = opt.order + 0.1;
  group.add(grass);

  // flowers, clumped on the main limbs
  const host = limbs.slice(0, opt.mainLimbs || limbs.length);
  const plantMaxX = opt.mask ? opt.mask[0] + 0.25 : 1e9;
  const wP = [], wR = [];
  const p = new THREE.Vector3(), n = new THREE.Vector3();
  let k = 0, guard = 0;
  while (k < opt.flowers && guard < opt.flowers * 60) {
    guard++;
    const Lw = host[Math.floor(shared.rng() * host.length)];
    const t0 = shared.rng(), th0 = shared.rng() * TAU;
    for (let c2 = 0; c2 < 9 && k < opt.flowers; c2++) {
      const tt = clamp01(t0 + rand(-0.008, 0.008));
      const tth = th0 + rand(-0.24, 0.24);
      if (limbSurface(Lw, tt, tth, p, n) < 0.45 || p.x > plantMaxX) continue;
      p.addScaledVector(n, rand(0.02, 0.16));
      wP.push(p.x, p.y, p.z);
      wR.push(rand(opt.flowerSize[0], opt.flowerSize[1]), shared.rng());
      k++;
    }
  }
  if (wP.length) {
    const wg = new THREE.InstancedBufferGeometry();
    wg.setAttribute("position", new THREE.Float32BufferAttribute([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0], 3));
    wg.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 1], 2));
    wg.setIndex([0, 1, 2, 0, 2, 3]);
    wg.setAttribute("iPos", new THREE.InstancedBufferAttribute(new Float32Array(wP), 3));
    wg.setAttribute("iRnd", new THREE.InstancedBufferAttribute(new Float32Array(wR), 2));
    wg.instanceCount = wP.length / 3;
    const blooms = new THREE.Mesh(wg, flowerMaterial(uni));
    blooms.frustumCulled = false; blooms.renderOrder = opt.order + 0.3;
    group.add(blooms);
  }

  if (opt.wire) {
    const wpos = [];
    for (const lmb of limbs) buildWire(lmb, wpos);
    if (wpos.length) {
      const wgeo = new THREE.BufferGeometry();
      wgeo.setAttribute("position", new THREE.Float32BufferAttribute(wpos, 3));
      const wm = new THREE.LineSegments(wgeo, new THREE.ShaderMaterial({
        uniforms: { uScanO: shared.uScanO, uScanR: shared.uScanR, uWire: shared.uWire, uTime: shared.uTime },
        transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending,
        vertexShader: "varying vec3 vW; void main(){ vec4 wp=modelMatrix*vec4(position,1.0); vW=wp.xyz; gl_Position=projectionMatrix*viewMatrix*wp; }",
        fragmentShader: [
          "precision highp float; uniform vec3 uScanO; uniform float uScanR,uWire,uTime; varying vec3 vW;",
          "void main(){ float d=distance(vW,uScanO);",
          " float rim=exp(-pow((d-uScanR)/135.0,2.0)); float trail=smoothstep(uScanR,uScanR-950.0,d);",
          " float a=(rim*1.6+trail*0.34)*uWire; if(a<0.004)discard;",
          " a*=0.66+0.34*sin(d*0.045-uTime*7.0);",
          " vec3 col=mix(vec3(0.30,0.72,0.46),vec3(0.86,1.0,0.90),rim);",
          " gl_FragColor=vec4(col,clamp(a,0.0,1.0)); }",
        ].join("\n"),
      }));
      wm.frustumCulled = false; wm.renderOrder = 8;
      group.add(wm); shared.wireMeshes.push(wm);
    }
  }

  for (const lmb of limbs) { lmb.grid = lmb.gnrm = lmb.gcaps = null; }
  group.userData = { uni };
  return group;
}

export function buildAmbient(scene, shared, NARROW) {
  const geo = new THREE.PlaneGeometry(1, 1);
  const shadow = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
    map: radialTexture(256, [[0, "rgba(12,16,10,0.62)"], [0.45, "rgba(12,16,10,0.26)"], [1, "rgba(12,16,10,0)"]]),
    transparent: true, depthWrite: false, depthTest: false,
  }));
  shadow.renderOrder = 1; shadow.position.z = -70; scene.add(shadow);

  const glow = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
    map: radialTexture(256, [[0, "rgba(226,236,212,0.30)"], [0.42, "rgba(214,226,200,0.10)"], [1, "rgba(214,226,200,0)"]]),
    transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending,
  }));
  glow.renderOrder = -1; glow.position.z = -320; scene.add(glow);

  const COUNT = NARROW.matches ? 1500 : 3000;
  const pos = new Float32Array(COUNT * 3), seed = new Float32Array(COUNT * 4);
  for (let i = 0; i < COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 3400;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 1500;
    pos[i * 3 + 2] = -380 + Math.random() * 1000;
    seed[i * 4] = Math.random() * 6.283; seed[i * 4 + 1] = 0.25 + Math.random() * 0.9;
    seed[i * 4 + 2] = 0.4 + Math.random() * 1.4; seed[i * 4 + 3] = 0.7 + 1.05 * Math.pow(Math.random(), 2.2);
  }
  const pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  pg.setAttribute("seed", new THREE.BufferAttribute(seed, 4));
  const poleTex = radialTexture(64, [[0, "rgba(255,255,255,1)"], [0.35, "rgba(236,244,224,0.5)"], [1, "rgba(236,244,224,0)"]]);
  const motes = new THREE.Points(pg, new THREE.ShaderMaterial({
    uniforms: { uTime: shared.uTime, uMap: { value: poleTex }, uSize: { value: 9 }, uScale: { value: 440 } },
    transparent: true, depthWrite: false, depthTest: true, blending: THREE.AdditiveBlending,
    vertexShader: [
      "attribute vec4 seed; uniform float uTime,uSize,uScale; varying float vFade;",
      "void main(){ float ph=seed.x,sp=seed.y,am=seed.z; vec3 p=position;",
      " p.x+=sin(uTime*sp*0.35+ph)*34.0*am; float climb=mod(uTime*11.0*sp+ph*60.0,1500.0)-750.0;",
      " p.y+=climb; p.z+=cos(uTime*sp*0.28+ph)*24.0*am;",
      " vec4 mv=modelViewMatrix*vec4(p,1.0); gl_PointSize=uSize*seed.w*(uScale/max(-mv.z,1.0));",
      " float edge=1.0-abs(climb)/750.0; float tw=0.55+0.45*sin(uTime*(0.7+sp*1.6)+ph*3.1);",
      " vFade=clamp(edge*3.0,0.0,1.0)*tw; gl_Position=projectionMatrix*mv; }",
    ].join("\n"),
    fragmentShader: "precision highp float; uniform sampler2D uMap; varying float vFade; void main(){ vec4 t=texture2D(uMap,gl_PointCoord); gl_FragColor=vec4(t.rgb,t.a*vFade*0.52); }",
  }));
  motes.frustumCulled = false; motes.renderOrder = 6; scene.add(motes);
  return { shadow, glow, motes };
}
