import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { gsap, confetti, reducedMotion } from "./gsap";
import { me } from "./me";

const N = me.journey.length;
const STOPS = me.journey.map((_, i) => 0.08 + (i * 0.84) / (N - 1));
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/** token like "var(--c-green)" -> resolved CSS colour string */
function token(root: HTMLElement, v: string) {
  const m = /var\((--[\w-]+)\)/.exec(v);
  return m ? getComputedStyle(root).getPropertyValue(m[1]).trim() : v;
}
/** index of the latest stop reached at progress p (-1 = none) */
function stopAt(p: number) {
  let idx = -1;
  STOPS.forEach((s, i) => {
    if (p >= s - 0.012) idx = i;
  });
  return idx;
}

/**
 * Gamified fly-through: scroll / drag / arrow keys / slider / buttons move a camera
 * along a 3D path; each waypoint is a collectable orb (one per career milestone).
 */
export default function Journey() {
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const st = useRef({ p: 0, target: 0 });
  const [idx, setIdx] = useState(-1);
  const [got, setGot] = useState(0);
  const [noGL, setNoGL] = useState(false);

  const goto = (i: number) => {
    st.current.target = i < 0 ? 0 : STOPS[Math.min(N - 1, i)];
    if (i >= N) st.current.target = 1;
  };

  useEffect(() => {
    const el = stage.current!;
    const cv = canvas.current!;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
      } catch {
        setNoGL(true);
        return;
      }
      const reduce = reducedMotion();
      const bg = new THREE.Color(token(el, "var(--ink)"));
      const cream = new THREE.Color(token(el, "var(--cream)"));
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(bg, 5, 24);
      const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 60);

      const curve = new THREE.CatmullRomCurve3(
        [
          [0, 0, 0],
          [4, 1, -6],
          [-3, -1, -13],
          [3, 2, -20],
          [-4, 0, -27],
          [2, -1, -34],
          [0, 1, -41],
        ].map(([x, y, z]) => new THREE.Vector3(x, y, z)),
      );

      const disposables: { dispose(): void }[] = [];
      const track = <T extends { dispose(): void }>(o: T) => (disposables.push(o), o);

      // path ribbon
      const tubeGeo = track(new THREE.TubeGeometry(curve, 240, 0.045, 6, false));
      const tubeMat = track(new THREE.MeshBasicMaterial({ color: cream, transparent: true, opacity: 0.4 }));
      scene.add(new THREE.Mesh(tubeGeo, tubeMat));

      // star field around the path
      const starPos: number[] = [];
      for (let i = 0; i < 500; i++) {
        const c = curve.getPoint(Math.random());
        starPos.push(c.x + (Math.random() - 0.5) * 22, c.y + (Math.random() - 0.5) * 14, c.z + (Math.random() - 0.5) * 8);
      }
      const starGeo = track(new THREE.BufferGeometry());
      starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starPos, 3));
      const starMat = track(new THREE.PointsMaterial({ color: cream, size: 0.06, transparent: true, opacity: 0.7 }));
      scene.add(new THREE.Points(starGeo, starMat));

      // waypoints = collectable orbs
      const orbs = me.journey.map((w, i) => {
        const color = new THREE.Color(token(el, w.color));
        const g = new THREE.Group();
        g.position.copy(curve.getPoint(STOPS[i]));
        const core = new THREE.Mesh(track(new THREE.IcosahedronGeometry(0.42, 0)), track(new THREE.MeshBasicMaterial({ color })));
        const ring = new THREE.Mesh(track(new THREE.TorusGeometry(0.85, 0.045, 8, 40)), track(new THREE.MeshBasicMaterial({ color })));
        g.add(core, ring);
        scene.add(g);
        return { g, core, ring, color, hit: false };
      });

      const resize = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      resize();

      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(el);

      let lastIdx = -2;
      let done = false;
      const pos = new THREE.Vector3();
      const tan = new THREE.Vector3();
      const tick = (time: number) => {
        if (!visible || document.hidden) return;
        const s = st.current;
        s.p = reduce ? s.target : s.p + (s.target - s.p) * 0.08;
        if (Math.abs(s.target - s.p) < 0.0002) s.p = s.target;
        const p = clamp(s.p);

        curve.getPoint(p, pos);
        curve.getTangent(p, tan);
        camera.position.copy(pos).add(new THREE.Vector3(0, 0.55, 0));
        camera.lookAt(pos.x + tan.x * 3, pos.y + 0.3 + tan.y * 3, pos.z + tan.z * 3);
        if (!reduce) camera.rotation.z += Math.sin(time * 1.2) * 0.02;

        orbs.forEach((o, i) => {
          if (!reduce) {
            o.core.rotation.y += 0.02;
            o.core.rotation.x += 0.012;
            o.ring.rotation.z += o.hit ? 0.06 : 0.015;
          }
          if (!o.hit && p >= STOPS[i] - 0.012) {
            o.hit = true;
            o.core.material.color.set(cream);
            if (!reduce) {
              gsap.fromTo(o.g.scale, { x: 1, y: 1, z: 1 }, { x: 1.7, y: 1.7, z: 1.7, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out" });
            }
            const count = orbs.filter((x) => x.hit).length;
            setGot(count);
            if (count === N && !done) {
              done = true;
              const r = el.getBoundingClientRect();
              confetti(r.left + r.width / 2, r.top + r.height / 2);
            }
          }
        });

        const i = stopAt(p);
        if (i !== lastIdx) {
          lastIdx = i;
          setIdx(i);
        }
        if (range.current && document.activeElement !== range.current) range.current.value = String(p);
        renderer.render(scene, camera);
      };
      gsap.ticker.add(tick);

      /* inputs: wheel, drag, keys */
      const move = (d: number) => {
        const s = st.current;
        s.target = clamp(s.target + d);
      };
      const onWheel = (e: WheelEvent) => {
        const s = st.current;
        const d = e.deltaY * 0.0009;
        if ((d > 0 && s.target >= 1) || (d < 0 && s.target <= 0)) return; // let the page scroll
        e.preventDefault();
        move(d);
      };
      let dragX: number | null = null;
      const onDown = (e: PointerEvent) => {
        dragX = e.clientX;
        el.setPointerCapture(e.pointerId);
      };
      const onMove = (e: PointerEvent) => {
        if (dragX === null) return;
        move(-(e.clientX - dragX) * 0.0016);
        dragX = e.clientX;
      };
      const onUp = () => (dragX = null);
      const onKey = (e: KeyboardEvent) => {
        const k = e.key;
        if (k === "ArrowRight" || k === "ArrowUp" || k === "w") move(0.04);
        else if (k === "ArrowLeft" || k === "ArrowDown" || k === "s") move(-0.04);
        else return;
        e.preventDefault();
      };
      el.addEventListener("wheel", onWheel, { passive: false });
      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
      el.addEventListener("pointercancel", onUp);
      el.addEventListener("keydown", onKey);

      cleanup = () => {
        gsap.ticker.remove(tick);
        ro.disconnect();
        io.disconnect();
        el.removeEventListener("wheel", onWheel);
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
        el.removeEventListener("pointercancel", onUp);
        el.removeEventListener("keydown", onKey);
        disposables.forEach((d) => d.dispose());
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  const w = idx >= 0 ? me.journey[idx] : null;
  const complete = got === N;

  return (
    <div className="journey">
      <div
        ref={stage}
        className="j-stage"
        tabIndex={0}
        role="group"
        aria-label="Interactive 3D fly-through of my career. Scroll, drag, or use the arrow keys to fly; collect all five orbs."
      >
        <canvas ref={canvas} aria-hidden="true" />
        {noGL && <p className="j-fallback">3D is unavailable here. Use the slider to step through my work.</p>}
        <span className="j-score" aria-hidden="true">
          <Star size={12} aria-hidden="true" /> {got}/{N}
        </span>
        <div className="j-card" style={w ? ({ "--wp": w.color } as React.CSSProperties) : undefined} aria-live="polite">
          {w ? (
            <>
              <strong>
                <span>
                  {w.title}
                  {complete && idx === N - 1 && <span className="j-done"> · all collected!</span>}
                </span>
                <small>{w.when}</small>
              </strong>
              <p>{w.text}</p>
            </>
          ) : (
            <>
              <strong>
                <span>Start your flight</span>
              </strong>
              <p>Scroll, drag or use ← → to collect {N} career orbs.</p>
            </>
          )}
        </div>
      </div>
      <div className="j-controls">
        <button type="button" className="j-btn" aria-label="Previous stop" disabled={idx < 0} onClick={() => goto(idx - 1)}>
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <input
          ref={range}
          className="j-range"
          type="range"
          min={0}
          max={1}
          step={0.001}
          defaultValue={0}
          aria-label="Flight progress"
          onInput={(e) => (st.current.target = Number(e.currentTarget.value))}
        />
        <button type="button" className="j-btn" aria-label="Next stop" disabled={idx >= N - 1} onClick={() => goto(idx + 1)}>
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
