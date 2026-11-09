import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin, Physics2DPlugin, ScrambleTextPlugin);

export { gsap, useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin, Physics2DPlugin, ScrambleTextPlugin };

export const NO_REDUCE = "(prefers-reduced-motion: no-preference)";

export function reducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const CONFETTI_COLORS = ["#ff5a6e", "#ff8709", "#ffd23f", "#0ae448", "#abff84", "#3fe0ff", "#9d95ff", "#fec5fb", "#fffce1"];

/** Physics2D confetti burst from a viewport point. No-op under reduced motion. */
export function confetti(x: number, y: number, count = 46) {
  if (reducedMotion()) return;
  const layer = document.createElement("div");
  layer.className = "confetti-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);
  const shapes = ["circle", "pill", "tri"] as const;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("i");
    const shape = shapes[i % 3];
    const size = gsap.utils.random(7, 13);
    el.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    el.style.width = (shape === "pill" ? size * 1.8 : size) + "px";
    el.style.height = size + "px";
    if (shape === "circle") el.style.borderRadius = "50%";
    if (shape === "pill") el.style.borderRadius = "999px";
    if (shape === "tri") el.style.clipPath = "polygon(50% 0, 100% 100%, 0 100%)";
    el.style.left = x + "px";
    el.style.top = y + "px";
    layer.appendChild(el);
    gsap.to(el, {
      duration: gsap.utils.random(1.4, 2),
      physics2D: { velocity: gsap.utils.random(260, 620), angle: gsap.utils.random(200, 340), gravity: 900 },
      rotation: gsap.utils.random(-360, 360),
      opacity: 0,
      ease: "power1.in",
    });
  }
  window.setTimeout(() => layer.remove(), 2200);
}
