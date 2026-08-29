import * as THREE from "three";
import { UP, rand } from "./utils.js";
import { makeLimb, limbSurface, limbTangent } from "./limbs.js";
import { growOffshoot } from "./mesh.js";

function table(vals) {
  return (t) => {
    const x = Math.min(1, Math.max(0, t)) * (vals.length - 1);
    const i = Math.min(vals.length - 2, Math.floor(x));
    return vals[i] + (vals[i + 1] - vals[i]) * (x - i);
  };
}

export function buildNearRoot(P) {
  const limbs = [];
  limbs.push(makeLimb(P, [
    [-0.075, 0.845, -0.62], [0.0, 0.79, -0.38], [0.107, 0.695, 0.04],
    [0.196, 0.588, 0.28], [0.25, 0.566, 0.34], [0.304, 0.603, 0.22],
    [0.411, 0.733, -0.1], [0.5, 0.779, -0.28], [0.585, 0.742, -0.05],
    [0.696, 0.661, 0.2], [0.75, 0.672, 0.14], [0.85, 0.64, -0.08],
    [0.93, 0.626, -0.3], [1.03, 0.634, -0.55], [1.09, 0.638, -0.7],
  ], {
    segs: 300, radial: 26, vScale: 30,
    rt: [0.575, 0.59, 0.63, 0.68, 0.695, 0.615, 0.58, 0.48, 0.55, 0.55, 0.52], sink: 0.5,
  }));

  const legRw = table([0.3, 0.28, 0.26, 0.25, 0.24, 0.23, 0.22]);
  const legMoss = table([0.24, 0.24, 0.23, 0.22, 0.21, 0.2, 0.19]);
  const knot = (t) => 1 + 0.05 * Math.sin(t * 23 + 1.3) + 0.022 * Math.sin(t * 57 + 0.4);
  limbs.push(makeLimb(P, [
    [0.532, 0.86, 0.2], [0.572, 0.7, 0.28], [0.612, 0.54, 0.34],
    [0.652, 0.39, 0.33], [0.69, 0.263, 0.26], [0.722, 0.18, 0.15], [0.752, 0.163, 0.02],
  ], { segs: 130, radial: 20, vScale: 22, rw: (t) => legRw(t) * knot(t), moss: legMoss }));

  const legR = table([0.23, 0.25, 0.27, 0.3, 0.33, 0.36, 0.4]);
  const legRm = table([0.19, 0.2, 0.21, 0.22, 0.24, 0.25, 0.26]);
  limbs.push(makeLimb(P, [
    [0.706, 0.176, -0.02], [0.74, 0.158, 0.02], [0.772, 0.245, -0.08],
    [0.797, 0.4, -0.18], [0.816, 0.57, -0.22], [0.836, 0.76, -0.18],
    [0.858, 0.95, -0.08], [0.888, 1.18, 0.04],
  ], { segs: 150, radial: 20, vScale: 22, rw: (t) => legR(t) * knot(t), moss: legRm }));

  return limbs;
}

export function buildFarRoot(P) {
  return [makeLimb(P, [
    [-0.06, 0.88, -0.35], [0.1, 0.762, -0.05], [0.21, 0.698, 0.22],
    [0.3, 0.57, 0.3], [0.41, 0.467, 0.18], [0.5, 0.5, -0.05],
    [0.6, 0.622, -0.22], [0.72, 0.748, -0.26], [0.8, 0.788, -0.08],
    [0.9, 0.66, 0.14], [0.99, 0.454, 0.28],
  ], {
    segs: 220, radial: 20, vScale: 26,
    rt: [0.76, 0.9, 0.9, 0.96, 0.925, 0.95, 1.02, 1.02, 0.99, 1.1, 1.3], sink: 0.5,
  })];
}

export function scatterOffshoots(limbs, rng) {
  const extra = [];
  const hp = new THREE.Vector3(), hn = new THREE.Vector3();
  for (let i = 0; i < 14; i++) {
    const r = rng();
    const src = limbs[r < 0.62 ? 0 : r < 0.82 ? 1 : 2];
    const t = rng(0.04, 0.96), th = rng() * Math.PI * 2;
    limbSurface(src, t, th, hp, hn);
    if (hn.y < -0.35) continue;
    const tan = limbTangent(src, t);
    const dir = hn.clone().multiplyScalar(rng(0.5, 1.2))
      .addScaledVector(tan, rng(-0.6, 1.5))
      .addScaledVector(UP, rng(-0.5, 0.55)).normalize();
    hp.addScaledVector(hn, -src.rw(t) * 0.55);
    growOffshoot(extra, hp.clone(), dir, rng(0.28, 0.72), src.rw(t) * rng(0.22, 0.4), 0, rng);
  }
  return limbs.concat(extra);
}
