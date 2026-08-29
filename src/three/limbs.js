import * as THREE from "three";
import { UP, BOXW, sstep, clamp01, fbm2 } from "./utils.js";

export function makeP(aspect) {
  const bh = BOXW / aspect;
  return (fx, fy, z) => new THREE.Vector3((fx - 0.5) * BOXW, (0.5 - fy) * bh, z || 0);
}

export function transportFrames(curve, segs) {
  const pts = [], tans = [], nrms = [];
  for (let i = 0; i <= segs; i++) {
    pts.push(curve.getPointAt(i / segs));
    tans.push(curve.getTangentAt(i / segs).normalize());
  }
  const ref = Math.abs(tans[0].y) < 0.9 ? UP : new THREE.Vector3(1, 0, 0);
  nrms.push(new THREE.Vector3().crossVectors(tans[0], ref).normalize());
  for (let i = 1; i <= segs; i++) {
    const axis = new THREE.Vector3().crossVectors(tans[i - 1], tans[i]);
    const n = nrms[i - 1].clone();
    if (axis.lengthSq() > 1e-12) {
      axis.normalize();
      n.applyAxisAngle(axis, Math.acos(Math.min(1, Math.max(-1, tans[i - 1].dot(tans[i])))));
    }
    nrms.push(n.normalize());
  }
  return { pts, tans, nrms };
}

function mossCap(p, n, steep) {
  const upness = n.y + n.z * (0.1 + 0.42 * steep) - n.x * (0.05 + 0.45 * steep);
  const fray = fbm2(p.x * 2.3 + 4.4, p.z * 2.3 - p.y * 1.9) - 0.5;
  const tongue = fbm2(p.x * 0.95 + 21, p.z * 0.95 - p.y * 0.8) - 0.5;
  const patch = fbm2(p.x * 0.52 + 9.3, p.z * 0.52 + p.y * 0.44);
  return sstep(0.16, 0.7, upness + fray * 0.4 + tongue * 0.52) * sstep(0.1, 0.5, patch);
}
function mossLump(p) {
  return 0.66 + 0.48 * fbm2(p.x * 2.4 - 2.2, p.z * 2.4 + p.y * 2.0)
    + 0.18 * fbm2(p.x * 7.3 + 5.1, p.z * 7.3 - p.y * 4.4) - 0.09;
}
function table(vals) {
  return (t) => {
    const x = clamp01(t) * (vals.length - 1);
    const i = Math.min(vals.length - 2, Math.floor(x));
    return vals[i] + (vals[i + 1] - vals[i]) * (x - i);
  };
}
function knot(t, a, b) {
  return 1 + a * Math.sin(t * 23 + 1.3) + b * Math.sin(t * 57 + 0.4) + b * 0.5 * Math.sin(t * 103 + 2.2);
}

export function makeLimb(P, pts, opt) {
  const curve = new THREE.CatmullRomCurve3(pts.map((q) => P(q[0], q[1], q[2])), false, "centripetal", 0.5);
  let rw = opt.rw, moss = opt.moss;
  if (opt.rt) {
    const rt = table(opt.rt);
    rw = (t) => rt(t) * 0.52 * knot(t, 0.05, 0.024);
    moss = (t) => rt(t) * 0.88;
  }
  return {
    curve, segs: opt.segs, radial: opt.radial, rw, moss,
    blade: opt.blade || ((t) => moss(t) * 0.055 + 0.014),
    sink: opt.sink || 0, vScale: opt.vScale,
    fr: transportFrames(curve, opt.segs), len: curve.getLength(),
  };
}

const _fp = new THREE.Vector3(), _ft = new THREE.Vector3(), _fn = new THREE.Vector3(), _fb = new THREE.Vector3();
export function limbFrame(L, t) {
  const f = clamp01(t) * L.segs;
  const i = Math.min(L.segs - 1, Math.floor(f)), a = f - i;
  _fp.copy(L.fr.pts[i]).lerp(L.fr.pts[i + 1], a);
  if (L.sink) _fp.y -= L.moss(t) * L.sink;
  _ft.copy(L.fr.tans[i]).lerp(L.fr.tans[i + 1], a).normalize();
  _fn.copy(L.fr.nrms[i]).lerp(L.fr.nrms[i + 1], a);
  _fn.addScaledVector(_ft, -_fn.dot(_ft)).normalize();
  _fb.crossVectors(_ft, _fn).normalize();
}

export function limbSurface(L, t, th, outP, outN) {
  limbFrame(L, t);
  const steep = Math.min(1, Math.abs(_ft.y) * 1.15);
  const c = Math.cos(th), s = Math.sin(th);
  outN.set(_fn.x * c + _fb.x * s, _fn.y * c + _fb.y * s, _fn.z * c + _fb.z * s).normalize();
  const rw = L.rw(t);
  outP.copy(_fp).addScaledVector(outN, rw);
  const cap = mossCap(outP, outN, steep);
  outP.copy(_fp).addScaledVector(outN, rw + L.moss(t) * cap * mossLump(outP));
  return cap;
}

export function limbTangent(L, t) {
  limbFrame(L, t);
  return _ft.clone();
}
