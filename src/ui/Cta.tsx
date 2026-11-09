import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, NO_REDUCE } from "./gsap";

/** Magnetic pill CTA: leans toward the cursor, snaps back with elastic. */
export function Cta({ label, onClick }: { label: string; onClick: () => void }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCE, () => {
        const w = wrap.current!;
        const b = btn.current!;
        const move = contextSafe!((e: PointerEvent) => {
          const r = w.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          gsap.to(b, { x: x * 0.18, y: y * 0.3, duration: 0.4, ease: "power3.out" });
        });
        const leave = contextSafe!(() => gsap.to(b, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1,.4)" }));
        w.addEventListener("pointermove", move);
        w.addEventListener("pointerleave", leave);
        return () => {
          w.removeEventListener("pointermove", move);
          w.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: wrap },
  );

  return (
    <span ref={wrap} className="magnet">
      <button ref={btn} type="button" className="btn-go" onClick={onClick}>
        {label}
        <span className="go-dot" aria-hidden="true">
          <ArrowRight size={18} aria-hidden="true" />
        </span>
      </button>
    </span>
  );
}
