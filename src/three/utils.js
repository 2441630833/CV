import * as THREE from "three";

export const TAU = Math.PI * 2;
export const UP = new THREE.Vector3(0, 1, 0);
export const BOXW = 10;

/* deterministic rng — the same meadow grows every reload */
let _s = 0x3f9a1c7b;
export function rng() {
  _s |= 0; _s = (_s + 0x6d2b79f5) | 0;
  let t = Math.imul(_s ^ (_s >>> 15), 1 | _s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
export const rand = (lo, hi) => lo + (hi - lo) * rng();
export const sstep = (a, b, x) => { const t = Math.min(Math.max((x - a) / (b - a), 0), 1); return t * t * (3 - 2 * t); };
export const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);

/* integer-hash value noise (no sin at the lattice) */
export function hash2(x, y) {
  let n = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}
export function vnoise(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy), b = hash2(ix + 1, iy), c = hash2(ix, iy + 1), d = hash2(ix + 1, iy + 1);
  const t = a + (b - a) * ux;
  return t + ((c + (d - c) * ux) - t) * uy;
}
export function fbm2(x, y) {
  let s = 0, amp = 0.5, nx, ny;
  for (let i = 0; i < 4; i++) {
    s += amp * vnoise(x, y);
    nx = 0.80 * x + 0.60 * y; ny = -0.60 * x + 0.80 * y;
    x = nx * 2.07 + 3.1; y = ny * 2.07 - 1.7; amp *= 0.5;
  }
  return s / 0.9375;
}
