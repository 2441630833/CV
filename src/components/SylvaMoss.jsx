import { useEffect, useRef } from "react";
import * as THREE from "three";
import { rng, sstep } from "../three/utils.js";
import { makeP } from "../three/limbs.js";
import { buildNearRoot, buildFarRoot, scatterOffshoots } from "../three/roots.js";
import { assembleRoot, buildAmbient } from "../three/assembly.js";

const DIST = 1400;
const ARCH = { w: 1900, left: -180, top: 306, aspect: 2800 / 1377 };
const ARCH_N = { w: 1120, left: -290, top: 555, aspect: 2800 / 1377 };
const FAR = { w: 1150, left: -40, top: 320, aspect: 1600 / 757, z: -260 };
const FAR_N = { w: 780, left: -110, top: 600, aspect: 1600 / 757, z: -260 };

export default function SylvaMoss() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const hero = canvas.parentElement;
    const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const NARROW = window.matchMedia("(max-width: 900px)");

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
    } catch (e) { canvas.style.display = "none"; return; }

    const shared = {
      uTime: { value: 0 }, uWind: { value: REDUCED ? 0 : 1 },
      uMouseNear: { value: new THREE.Vector3(9999, 9999, 9999) },
      uMouseFar: { value: new THREE.Vector3(9999, 9999, 9999) },
      uScanO: { value: new THREE.Vector3() }, uScanR: { value: 0 },
      uScanOn: { value: 0 }, uWire: { value: 0 }, wireMeshes: [],
      KEY: new THREE.Vector3(-0.3, 0.92, 0.28).normalize(),
      FILL: new THREE.Vector3(0.12, -0.86, 0.5).normalize(),
      rng,
    };

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    if ("sRGBEncoding" in THREE) renderer.outputEncoding = THREE.sRGBEncoding;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 10, 8000);
    camera.position.set(0, 0, DIST);
    const clock = new THREE.Clock();

    const small = NARROW.matches || window.innerWidth * window.innerHeight < 620000;
    const nearLimbs = scatterOffshoots(buildNearRoot(makeP(ARCH.aspect)), rng);
    const nearGroup = assembleRoot(nearLimbs, {
      aspect: ARCH.aspect, haze: 0.15, fog: 0, alpha: 1, order: 2,
      blades: small ? 70000 : 130000, flowers: small ? 120 : 220,
      flowerSize: [0.055, 0.118], mainLimbs: 3, wire: true,
      mouse: shared.uMouseNear, mouseR: 1.2,
    }, shared);
    scene.add(nearGroup);

    const farGroup = assembleRoot(buildFarRoot(makeP(FAR.aspect)), {
      aspect: FAR.aspect, haze: 0.16, fog: 0.26, alpha: 1, order: 0,
      hazeCol: [0.15, 0.164, 0.12], hazeLift: 0.92,
      blades: small ? 20000 : 45000, flowers: small ? 40 : 80,
      flowerSize: [0.034, 0.062], mask: [0.4, 3.4, 0, 0.42], wire: true,
      mouse: shared.uMouseFar, mouseR: 1.4,
    }, shared);
    scene.add(farGroup);

    const ambient = buildAmbient(scene, shared, NARROW);

    let W = 1, H = 1;
    function layout() {
      W = hero.clientWidth; H = hero.clientHeight;
      renderer.setSize(W, H, false);
      camera.fov = 2 * Math.atan(H / 2 / DIST) * 180 / Math.PI;
      camera.aspect = W / H; camera.updateProjectionMatrix();
      const u = W / (NARROW.matches ? 760 : 1600);
      const wx = (px) => px * u - W / 2;
      const wy = (py) => H / 2 - py * u;
      const A = NARROW.matches ? ARCH_N : ARCH, F = NARROW.matches ? FAR_N : FAR;
      const BOXW = 10;
      function place(group, box, pinFx, pinFy, z) {
        const boxH = box.w / box.aspect;
        const scale = box.w * u / BOXW;
        const k = (DIST - z) / DIST;
        const lx = (pinFx - 0.5) * BOXW, ly = (0.5 - pinFy) * (BOXW / box.aspect);
        const px = wx(box.left + pinFx * box.w), py = wy(box.top + pinFy * boxH);
        group.scale.setScalar(scale * k);
        group.position.set((px - lx * scale) * k, (py - ly * scale) * k, z);
        return { x: px, y: py, s: scale, boxH: boxH * u };
      }
      place(nearGroup, A, 0.732, 0.06, 0);
      place(farGroup, F, 0.41, 0.32, F.z);
      const aw = A.w * u, ah = aw / A.aspect;
      const cx = wx(A.left + 0.5 * A.w), cy = wy(A.top + 0.5 * (A.w / A.aspect));
      ambient.shadow.scale.set(aw * 1.02, ah * 0.72, 1);
      ambient.shadow.position.set(cx, cy - ah * 0.4, -70);
      ambient.glow.scale.set(aw * 1.15, ah * 1.5, 1);
      ambient.glow.position.set(cx - aw * 0.06, cy - ah * 0.18, -320);
      const half = renderer.getDrawingBufferSize(new THREE.Vector2()).y * 0.5;
      ambient.motes.material.uniforms.uSize.value = Math.max(5, 9 * u);
      ambient.motes.material.uniforms.uScale.value = half;
      nearGroup.updateMatrixWorld(true);
      shared.uScanO.value.set(-5.2, -0.9, 1.8);
      nearGroup.localToWorld(shared.uScanO.value);
      scanMax = Math.hypot(W, H) * 1.3 + 900;
    }

    let scanMax = 1500, scanT = 0, scanning = false;
    const SCAN_DUR = 3.4;
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const hit = new THREE.Vector3(), tmp = new THREE.Vector3();
    const ndc = { x: 10, y: 10 };
    const ptr = { x: 0, y: 0 }, smooth = { x: 0, y: 0 };

    function onPointer(e) {
      if (e.pointerType === "touch") return;
      const r = hero.getBoundingClientRect();
      ptr.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ptr.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    }
    function onLeave() { ptr.x = ptr.y = 0; ndc.x = 10; }
    function updateMouse(dt) {
      if (ndc.x > 2 || REDUCED) { shared.uMouseNear.value.set(9999, 9999, 9999); shared.uMouseFar.value.set(9999, 9999, 9999); return; }
      raycaster.setFromCamera(ndc, camera);
      if (!raycaster.ray.intersectPlane(plane, hit)) return;
      [[nearGroup, shared.uMouseNear], [farGroup, shared.uMouseFar]].forEach(([g, u2]) => {
        tmp.copy(hit); g.worldToLocal(tmp);
        if (u2.value.x > 999) u2.value.copy(tmp);
        else u2.value.lerp(tmp, 1 - Math.pow(0.0002, dt));
      });
    }

    let raf = 0, disposed = false, frames = 0, inView = true, scrolling = false;
    function loop() {
      if (disposed) return;
      raf = requestAnimationFrame(loop);
      // Pause the heavy WebGL render when the hero is scrolled out of view
      // OR while the page is actively scrolling. The canvas keeps its last
      // frame, so the moss stays visible but never competes with scroll
      // painting — this is what makes nav-click jumps smooth. The rAF keeps
      // ticking cheaply and resumes instantly when idle/in view.
      if (!inView || scrolling) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!REDUCED) shared.uTime.value += dt;
      smooth.x += (ptr.x - smooth.x) * 0.055;
      smooth.y += (ptr.y - smooth.y) * 0.055;
      camera.position.x = -smooth.x * 26;
      camera.position.y = smooth.y * 16;
      camera.lookAt(camera.position.x * 0.42, camera.position.y * 0.42, 0);
      if (!REDUCED) {
        nearGroup.rotation.y = smooth.x * 0.055;
        nearGroup.rotation.x = smooth.y * 0.026;
        nearGroup.rotation.z = Math.sin(shared.uTime.value * 0.22) * 0.0022;
        farGroup.rotation.y = smooth.x * 0.03;
      }
      if (scanning) {
        scanT += dt / SCAN_DUR;
        const e = Math.min(1, scanT);
        shared.uScanR.value = (1 - Math.pow(1 - e, 1.35)) * scanMax;
        shared.uWire.value = Math.min(1, e / 0.06) * (1 - sstep(0.72, 1, e));
        if (e >= 1) {
          scanning = false; shared.uScanOn.value = 0; shared.uWire.value = 0;
          for (const wm of shared.wireMeshes) { if (wm.parent) wm.parent.remove(wm); wm.geometry.dispose(); wm.material.dispose(); }
          shared.wireMeshes.length = 0;
        }
      }
      updateMouse(dt);
      renderer.render(scene, camera);
      if (++frames === 2) canvas.style.opacity = "1";
    }

    function onResize() { layout(); }
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    // Stop rendering once the hero canvas leaves the viewport.
    const io = new IntersectionObserver(
      (entries) => { inView = entries[0].isIntersecting; },
      { threshold: 0 }
    );
    io.observe(hero);

    // Skip WebGL frames while the page is actively scrolling.
    let scrollTimer = 0;
    function onScroll() {
      scrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => { scrolling = false; }, 90);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    layout();
    if (!REDUCED && !document.hidden) { shared.uScanOn.value = 1; scanning = true; }
    loop();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimer);
      io.disconnect();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) [].concat(o.material).forEach((m) => m.dispose && m.dispose());
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: 0, transition: "opacity .9s cubic-bezier(.22,.61,.36,1)" }}
    />
  );
}
