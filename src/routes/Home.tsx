import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Award, Boxes, Check, FolderGit2, Mail, Gamepad2, Rocket, Smile, Sparkles } from "lucide-react";
import { gsap, useGSAP, NO_REDUCE, reducedMotion } from "../ui/gsap";
import { MORPH_PATHS, Asterisk, Clover, GithubIcon, LinkedinIcon, Morpher, Pulse, Ring, Squiggle } from "../ui/art";
import { Tile, TileHead } from "../ui/Tile";
import { Cta } from "../ui/Cta";
import { AboutSheet } from "../ui/AboutSheet";
import { ProjectSheet } from "../ui/ProjectSheet";
import { hideSplash } from "../ui/splash";
import { me } from "../ui/me";
import "./home.css";

const Journey = lazy(() => import("../ui/Journey"));

const SCRAMBLE = "01!<>-_/[]{}=+*^?#";

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const project = me.projects.find((p) => p.id === projectId) ?? null;

  /* step pills auto-advance (motion only) */
  useEffect(() => {
    if (reducedMotion()) return;
    const t = window.setInterval(() => setStep((s) => (s + 1) % me.steps.length), 2400);
    return () => window.clearInterval(t);
  }, []);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();

      mm.add(NO_REDUCE, () => {
        const q = gsap.utils.selector(root);

        /* ---- entrance (waits for splash) ---- */
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        tl.fromTo(q(".topbar, .marquee"), { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, clearProps: "transform,opacity" }, 0)
          .fromTo(
            q(".tile"),
            { clipPath: "inset(100% 0% 0% 0% round 22px)", y: 40 },
            { clipPath: "inset(0% 0% 0% 0% round 22px)", y: 0, duration: 1.1, stagger: 0.06, clearProps: "clipPath,transform" },
            0.05,
          )
          .to(q(".brace"), { duration: 1.2, ease: "none", scrambleText: { text: me.handle ? `{ ${me.handle} }` : "", chars: SCRAMBLE, speed: 0.6 } }, 0.3)
          .fromTo(
            q(".hero .sticker"),
            { scale: 0, rotation: () => gsap.utils.random(-30, 30) },
            { scale: 1, rotation: (_i: number, el: HTMLElement) => Number(el.dataset.tilt), duration: 0.9, ease: "back.out(2.4)", stagger: 0.09 },
            0.35,
          )
          .fromTo(q(".shape-wrap"), { scale: 0, rotation: -120 }, { scale: 1, rotation: 0, duration: 1.4, ease: "elastic.out(1,.5)", stagger: 0.1 }, 0.45)
          .from(q(".hero-lead, .steps, .hero-cta"), { y: 16, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.6);
        hideSplash().then(() => tl.play());

        /* ---- stat count-up ---- */
        const num = { v: 0 };
        const statEl = q(".stat-num")[0] as HTMLElement | undefined;
        if (statEl) {
          statEl.textContent = "0";
          gsap.to(num, { v: me.stat.value, duration: 1.6, delay: 1.2, ease: "power2.out", onUpdate: () => (statEl.textContent = String(Math.round(num.v))) });
        }

        /* ---- always moving ---- */
        const track = q(".marquee-track");
        gsap.to(track, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
        gsap.to(q(".shape-clover"), { rotation: 360, duration: 16, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
        gsap.to(q(".shape-asterisk"), { rotation: -360, duration: 9, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
        gsap.to(q(".shape-ring"), { y: -12, scale: 1.06, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.9 });
        gsap
          .timeline({ repeat: -1, delay: 1.9 })
          .fromTo(q(".squig-path"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.4, ease: "power2.inOut" })
          .to(q(".squig-path"), { drawSVG: "100% 100%", duration: 1, ease: "power2.inOut" }, "+=2.4");
        const morph = gsap.timeline({ repeat: -1, delay: 2 });
        [...MORPH_PATHS.slice(1), MORPH_PATHS[0]].forEach((d) => morph.to(q(".morph-path"), { morphSVG: d, duration: 1.2, ease: "elastic.out(1,.55)" }, "+=1"));
        gsap.to(q(".shape-morpher"), { rotation: 360, duration: 30, ease: "none", repeat: -1, transformOrigin: "50% 50%" });

        /* ---- hero-only pointer parallax ---- */
        const hero = q(".hero")[0] as HTMLElement;
        const wraps = q(".shape-wrap") as HTMLElement[];
        const movers = wraps.map((w, i) => ({
          depth: 12 + i * 9,
          x: gsap.quickTo(w, "x", { duration: 0.9, ease: "power3" }),
          y: gsap.quickTo(w, "y", { duration: 0.9, ease: "power3" }),
        }));
        const onMove = contextSafe!((e: PointerEvent) => {
          const r = hero.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          movers.forEach((m) => {
            m.x(-nx * m.depth * 2);
            m.y(-ny * m.depth * 2);
          });
        });
        const onLeave = contextSafe!(() => movers.forEach((m) => (m.x(0), m.y(0))));
        hero.addEventListener("pointermove", onMove);
        hero.addEventListener("pointerleave", onLeave);

        /* ---- sticker wiggle ---- */
        const stickers = q(".hero .sticker") as HTMLElement[];
        const offs = stickers.map((s) => {
          const tilt = Number(s.dataset.tilt);
          const h = contextSafe!(() => gsap.to(s, { keyframes: { rotation: [tilt - 7, tilt + 6, tilt - 4, tilt + 2, tilt], easeEach: "power1.inOut" }, duration: 0.7, overwrite: "auto" }));
          s.addEventListener("pointerenter", h);
          return () => s.removeEventListener("pointerenter", h);
        });

        return () => {
          hero.removeEventListener("pointermove", onMove);
          hero.removeEventListener("pointerleave", onLeave);
          offs.forEach((o) => o());
        };
      });

      /* reduced motion: show the final copy, no loops */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        hideSplash(0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const marquee = [...me.marquee, ...me.marquee];

  return (
    <div className="bento-home" ref={root}>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div className="marquee-set" key={k}>
              {marquee.map((m, i) => (
                <span key={i}>
                  {m}
                  <i>✦</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header className="topbar">
        <a className="wordmark" href="/" aria-label={`${me.handle} — home`}>
          <span>{me.handle}</span>
          <i className="laser" aria-hidden="true" />
        </a>
        <nav className="topnav" aria-label="Primary">
          <button type="button" className="pill-link pill-hire" onClick={() => setAboutOpen(true)}>
            <span className="ping" aria-hidden="true" />
            Hire me
          </button>
          <button type="button" className="pill-link hide-sm" onClick={() => setProjectId(me.projects[0].id)}>
            Work
          </button>
          <a className="pill-link" href={me.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon size={16} />
            <span className="hide-sm">GitHub</span>
          </a>
        </nav>
      </header>

      <main className="bh-grid">
        {/* HERO */}
        <Tile className="hero a-hero" accent="var(--c-green)" labelledBy="hero-h">
          <div className="hero-art" aria-hidden="true">
            <div className="shape-wrap w-clover"><Clover /></div>
            <div className="shape-wrap w-ring"><Ring /></div>
            <div className="shape-wrap w-ast"><Asterisk /></div>
            <div className="shape-wrap w-squig"><Squiggle /></div>
            <div className="shape-wrap w-morph"><Morpher /></div>
          </div>
          <div className="hero-copy">
            <p className="brace" aria-hidden="true">{`{ ${me.handle} }`}</p>
            <h1 id="hero-h">
              <span className="line">
                I build{" "}
                <span className="sticker" data-tilt="-2.5" style={{ "--s": "var(--c-green)", "--tilt": "-2.5deg" } as React.CSSProperties}>
                  AI that ships
                </span>
              </span>
              <span className="line">
                <span className="sticker" data-tilt="1.5" style={{ "--s": "var(--c-pink)", "--tilt": "1.5deg" } as React.CSSProperties}>
                  end to end
                </span>
              </span>
            </h1>
            <p className="hero-lead">{me.lead}</p>
            <ol className="steps" aria-label="How I work">
              {me.steps.map((s, i) => (
                <li key={s}>
                  <button type="button" className={`step ${i === step ? "current" : ""} ${i < step ? "done" : ""}`} aria-current={i === step ? "step" : undefined} onClick={() => setStep(i)}>
                    <span className="num">{i < step ? <Check size={13} aria-hidden="true" /> : i + 1}</span>
                    {s}
                  </button>
                </li>
              ))}
            </ol>
            <div className="hero-cta">
              <Cta label="Let's talk" onClick={() => setAboutOpen(true)} />
              <span className="avail">
                <span className="ping avail-dot" aria-hidden="true" /> Open to work
              </span>
            </div>
          </div>
        </Tile>

        {/* PHOTO */}
        <Tile className="t-cream t-photo a-photo" accent="var(--c-green)" labelledBy="photo-h">
          <TileHead id="photo-h" icon={Smile}>Hi, I'm Junaid</TileHead>
          <div className="photo-frame">
            <div className="photo-card">
              <img src={me.photo} alt={me.photoAlt} width={1100} height={825} decoding="async" />
            </div>
          </div>
          <p className="photo-cap">
            <Award size={14} aria-hidden="true" />
            <span>
              <b>{me.location}.</b> {me.certs[0]}
            </span>
          </p>
        </Tile>

        {/* PROJECTS */}
        <Tile className="t-cream a-proj" accent="var(--c-green)" labelledBy="proj-h">
          <TileHead id="proj-h" icon={FolderGit2}>Featured work</TileHead>
          <ul className="proj-list">
            {me.projects.map((p) => (
              <li key={p.id}>
                <button type="button" className="proj-row" onClick={() => setProjectId(p.id)} aria-label={`${p.name}: ${p.blurb}`}>
                  <span className="proj-dot" style={{ background: p.accent }} aria-hidden="true" />
                  <span className="proj-text">
                    <strong>{p.name}</strong>
                    <small>{p.blurb}</small>
                  </span>
                  <span className="arrow-pill" aria-hidden="true">
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Tile>

        {/* JOURNEY GAME */}
        <Tile className="a-demo" accent="var(--c-cyan)" labelledBy="demo-h">
          <TileHead id="demo-h" icon={Gamepad2}>Fly through my work</TileHead>
          <Suspense fallback={<div className="journey" />}>
            <Journey />
          </Suspense>
        </Tile>

        {/* STAT */}
        <Tile className="t-block a-stat" accent="var(--c-orange)" labelledBy="stat-h">
          <span className="deco deco-square" aria-hidden="true" />
          <TileHead id="stat-h" icon={Rocket}>Shipped</TileHead>
          <p className="stat-big">
            <span className="stat-num">{me.stat.value}</span>
            <span className="stat-label">{me.stat.label}</span>
          </p>
          <Pulse />
          <p className="stat-cap">{me.stat.caption}</p>
        </Tile>

        {/* STACK */}
        <Tile className="a-stack" accent="var(--c-violet)" labelledBy="stack-h">
          <TileHead id="stack-h" icon={Boxes}>Stack</TileHead>
          <ul className="keys-row">
            {me.stack.map((s, i) => (
              <li key={s}>
                <kbd style={{ "--i": i } as React.CSSProperties}>{s}</kbd>
              </li>
            ))}
          </ul>
        </Tile>

        {/* ME */}
        <Tile className="t-block a-me" accent="var(--c-pink)" labelledBy="me-h">
          <span className="deco deco-circle rev" aria-hidden="true" />
          <TileHead id="me-h" icon={Sparkles}>About me</TileHead>
          <div className="me-row">
            <span className="avatar" aria-hidden="true">{me.initials}</span>
            <div>
              <p className="me-name">{me.name}</p>
              <p className="me-role">{me.role}</p>
            </div>
          </div>
          <p className="me-line">{me.tagline}</p>
          <div className="me-foot">
            <ul className="socials">
              {[
                { href: me.github, label: "GitHub", icon: <GithubIcon /> },
                { href: me.linkedin, label: "LinkedIn", icon: <LinkedinIcon /> },
                { href: `mailto:${me.email}`, label: "Email", icon: <Mail size={15} aria-hidden="true" /> },
              ].map((s, i) => (
                <li key={s.label} style={{ "--i": i } as React.CSSProperties}>
                  <a href={s.href} aria-label={s.label} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
            <button type="button" className="tile-btn" onClick={() => setAboutOpen(true)}>
              Let's talk <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </div>
        </Tile>
      </main>

      <AboutSheet
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        onProject={(id) => {
          setAboutOpen(false);
          setProjectId(id);
        }}
      />
      <ProjectSheet project={project} onClose={() => setProjectId(null)} />
    </div>
  );
}
