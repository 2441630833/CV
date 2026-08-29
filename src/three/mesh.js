import * as THREE from "three";
import { UP, TAU, rand, sstep, fbm2 } from "./utils.js";
import { limbSurface } from "./limbs.js";

export function tessellate(L, bag) {
  const S = L.segs, R = L.radial, base = bag.pos.length / 3;
  const grid = new Float32Array((S + 1) * (R + 1) * 3);
  const gnrm = new Float32Array((S + 1) * (R + 1) * 3);
  const caps = new Float32Array((S + 1) * (R + 1));
  const p = new THREE.Vector3(), n = new THREE.Vector3();
  for (let i = 0; i <= S; i++) for (let j = 0; j <= R; j++) {
    const cap = limbSurface(L, i / S, (j / R) * TAU, p, n);
    const k = (i * (R + 1) + j) * 3;
    grid[k] = p.x; grid[k + 1] = p.y; grid[k + 2] = p.z;
    gnrm[k] = n.x; gnrm[k + 1] = n.y; gnrm[k + 2] = n.z;
    caps[i * (R + 1) + j] = cap;
  }
  const a = new THREE.Vector3(), b = new THREE.Vector3(), du = new THREE.Vector3(), dv = new THREE.Vector3();
  const get = (i2, j2, o) => {
    i2 = Math.min(S, Math.max(0, i2)); j2 = (j2 + R) % R;
    const q = (i2 * (R + 1) + j2) * 3;
    return o.set(grid[q], grid[q + 1], grid[q + 2]);
  };
  for (let i = 0; i <= S; i++) for (let j = 0; j <= R; j++) {
    get(i + 1, j, a); get(i - 1, j, b); du.subVectors(a, b);
    get(i, j + 1, a); get(i, j - 1, b); dv.subVectors(a, b);
    n.crossVectors(dv, du);
    if (n.lengthSq() < 1e-12) limbSurface(L, i / S, (j / R) * TAU, p, n); else n.normalize();
    const k = (i * (R + 1) + j) * 3;
    bag.pos.push(grid[k], grid[k + 1], grid[k + 2]); bag.nor.push(n.x, n.y, n.z);
    bag.inf.push(1 - Math.abs(2 * (j / R) - 1), (i / S) * L.vScale, caps[i * (R + 1) + j]);
  }
  for (let i = 0; i < S; i++) for (let j = 0; j < R; j++) {
    const q0 = base + i * (R + 1) + j, q1 = q0 + R + 1;
    bag.idx.push(q0, q1, q0 + 1, q1, q1 + 1, q0 + 1);
  }
  L.grid = grid; L.gnrm = gnrm; L.gcaps = caps; L.S = S; L.R = R;
}

export function plantBlades(L, count, bag, rng) {
  const S = L.S, R = L.R, grid = L.grid, gn = L.gnrm, caps = L.gcaps;
  if (!grid) return 0;
  const cells = S * R, cdf = new Float64Array(cells);
  let total = 0;
  for (let i = 0; i < S; i++) for (let j = 0; j < R; j++) {
    const q00 = (i * (R + 1) + j) * 3, q10 = q00 + 3, q01 = ((i + 1) * (R + 1) + j) * 3;
    const ax = grid[q10] - grid[q00], ay = grid[q10 + 1] - grid[q00 + 1], az = grid[q10 + 2] - grid[q00 + 2];
    const bx = grid[q01] - grid[q00], by = grid[q01 + 1] - grid[q00 + 1], bz = grid[q01 + 2] - grid[q00 + 2];
    const area = Math.sqrt((ay * bz - az * by) ** 2 + (az * bx - ax * bz) ** 2 + (ax * by - ay * bx) ** 2);
    const cap = 0.25 * (caps[i * (R + 1) + j] + caps[i * (R + 1) + j + 1] + caps[(i + 1) * (R + 1) + j] + caps[(i + 1) * (R + 1) + j + 1]);
    total += area * cap * cap; cdf[i * R + j] = total;
  }
  if (total <= 0) return 0;
  let planted = 0;
  for (let bb = 0; bb < count; bb++) {
    const target = rng() * total;
    let lo = 0, hi = cells - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (cdf[mid] < target) lo = mid + 1; else hi = mid; }
    const i = (lo / R) | 0, j = lo - i * R, u = rng(), v = rng();
    const i0 = i * (R + 1) + j, i1 = i0 + 1, i2 = i0 + R + 1, i3 = i2 + 1;
    const w0 = (1 - u) * (1 - v), w1 = u * (1 - v), w2 = (1 - u) * v, w3 = u * v;
    const cap2 = caps[i0] * w0 + caps[i1] * w1 + caps[i2] * w2 + caps[i3] * w3;
    if (cap2 < 0.05) continue;
    const p0 = i0 * 3, p1 = i1 * 3, p2 = i2 * 3, p3 = i3 * 3;
    const px = grid[p0] * w0 + grid[p1] * w1 + grid[p2] * w2 + grid[p3] * w3;
    const py = grid[p0 + 1] * w0 + grid[p1 + 1] * w1 + grid[p2 + 1] * w2 + grid[p3 + 1] * w3;
    const pz = grid[p0 + 2] * w0 + grid[p1 + 2] * w1 + grid[p2 + 2] * w2 + grid[p3 + 2] * w3;
    const nx = gn[p0] * w0 + gn[p1] * w1 + gn[p2] * w2 + gn[p3] * w3;
    const ny = gn[p0 + 1] * w0 + gn[p1 + 1] * w1 + gn[p2 + 1] * w2 + gn[p3 + 1] * w3;
    const nz = gn[p0 + 2] * w0 + gn[p1 + 2] * w1 + gn[p2 + 2] * w2 + gn[p3 + 2] * w3;
    const nl = Math.hypot(nx, ny, nz) || 1;
    bag.off.push(px, py, pz); bag.nrm.push(nx / nl, ny / nl, nz / nl);
    const stray = rng() < 0.06 ? rand(1.4, 1.9) : 1.0;
    bag.rnd.push(rng() * TAU, L.blade((i + v) / S) * (0.45 + 0.6 * cap2) * (0.58 + 0.5 * rng()) * stray, (rng() - 0.5) * 1.15, rng());
    bag.aux.push(fbm2(px * 0.85 + 17, pz * 0.85 - py * 0.7) * 0.62 + fbm2(px * 5.6 - 3.3, pz * 5.6 + py * 2.1) * 0.38);
    planted++;
  }
  return planted;
}

export function bladeGeometry() {
  const SEGS = 3, verts = [], uvs = [], idx = [];
  for (let i = 0; i <= SEGS; i++) { const t = i / SEGS, w = 0.5 * (1 - t * t); verts.push(-w, t, 0, w, t, 0); uvs.push(0, t, 1, t); }
  verts[verts.length - 6] = 0; verts[verts.length - 3] = 0;
  for (let i = 0; i < SEGS; i++) { const a = i * 2, b = a + 1, c = a + 2, d = a + 3; idx.push(a, b, c, b, d, c); }
  const g = new THREE.InstancedBufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(idx);
  return g;
}

export function growOffshoot(list, start, dir, len, r0, gen, rng) {
  const side = new THREE.Vector3().crossVectors(dir, UP);
  if (side.lengthSq() < 1e-6) side.set(1, 0, 0);
  side.normalize();
  const up = new THREE.Vector3().crossVectors(side, dir).normalize();
  const bow = gen === 0 ? rng(0.1, 0.46) : rng(-0.34, 0.42), kink = rng(-0.26, 0.26);
  const node = (f, u2, k) => start.clone().addScaledVector(dir, len * f).addScaledVector(up, len * u2).addScaledVector(side, len * k);
  const pts = [start.clone(), node(0.32, bow * 0.3, kink * 0.7), node(0.68, bow * 0.85, kink * 0.24), node(1, bow, kink * 0.44)];
  const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal", 0.5);
  const r1 = r0 * 0.52;
  const L = {
    curve, segs: gen === 0 ? 16 : 11, radial: gen === 0 ? 9 : 7,
    rw: (t) => (r0 + (r1 - r0) * t) * (1 - 0.86 * sstep(0.9, 1, t)),
    moss: (t) => (r0 + (r1 - r0) * t) * 0.95 * (1 - 0.55 * t),
    blade: (t) => (r0 + (r1 - r0) * t) * 0.3 * (1 - 0.55 * t) + 0.035, vScale: len * 7,
  };
  // transport frames
  const fr = { pts: [], tans: [], nrms: [] };
  for (let i = 0; i <= L.segs; i++) { fr.pts.push(curve.getPointAt(i / L.segs)); fr.tans.push(curve.getTangentAt(i / L.segs).normalize()); }
  const refV = Math.abs(fr.tans[0].y) < 0.9 ? UP : new THREE.Vector3(1, 0, 0);
  fr.nrms.push(new THREE.Vector3().crossVectors(fr.tans[0], refV).normalize());
  for (let i = 1; i <= L.segs; i++) {
    const axis = new THREE.Vector3().crossVectors(fr.tans[i - 1], fr.tans[i]);
    const nn = fr.nrms[i - 1].clone();
    if (axis.lengthSq() > 1e-12) { axis.normalize(); nn.applyAxisAngle(axis, Math.acos(Math.min(1, Math.max(-1, fr.tans[i - 1].dot(fr.tans[i]))))); }
    fr.nrms.push(nn.normalize());
  }
  L.fr = fr; L.len = curve.getLength(); list.push(L);
  if (gen >= 1) return;
  const kids = Math.round(rng(1, 2));
  for (let i = 0; i < kids; i++) {
    const tt = Math.min(0.98, 0.34 + (i / Math.max(kids, 1)) * 0.5 + rng(-0.06, 0.06));
    const pt = curve.getPointAt(tt);
    const tan = curve.getTangentAt(tt).normalize();
    const ax = new THREE.Vector3().crossVectors(tan, UP);
    if (ax.lengthSq() < 1e-6) ax.set(1, 0, 0);
    ax.normalize().applyAxisAngle(tan, rng() * TAU);
    const kdir = tan.clone().applyAxisAngle(ax, rng(0.45, 1.05)).addScaledVector(UP, 0.16).normalize();
    growOffshoot(list, pt, kdir, len * rng(0.5, 0.74), (r0 + (r1 - r0) * tt) * rng(0.58, 0.78), gen + 1, rng);
  }
}

export function buildWire(L, out) {
  if (!L.grid) return;
  const S = L.S, R = L.R, g = L.grid;
  const ringEvery = Math.max(2, Math.round(S / 52)), longEvery = Math.max(2, Math.round(R / 9));
  const push = (q) => out.push(g[q], g[q + 1], g[q + 2]);
  for (let i = 0; i <= S; i += ringEvery) for (let j = 0; j < R; j++) {
    const a = (i * (R + 1) + j) * 3, b = a + 3; push(a); push(b);
  }
  for (let j = 0; j < R; j += longEvery) for (let i = 0; i < S; i++) {
    const a = (i * (R + 1) + j) * 3, b = ((i + 1) * (R + 1) + j) * 3; push(a); push(b);
  }
}
