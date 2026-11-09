import { ArrowUpRight } from "lucide-react";
import { Sheet } from "./Sheet";
import type { Project } from "./me";

export function ProjectSheet({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Sheet open={!!project} onClose={onClose} title={project ? `${project.name} project` : "Project"} shadow="var(--c-violet)">
      {project && (
        <div className="sheet-body">
          <header className="about-item">
            <p className="eyebrow" style={{ color: "var(--c-violet)" }}>Project</p>
            <h2 className="sheet-title">
              <span className="sticker" style={{ "--s": "var(--c-violet)" } as React.CSSProperties}>{project.name}</span>
            </h2>
            <p className="sheet-lead">{project.detail}</p>
          </header>
          <section className="about-item" aria-labelledby="arch-h">
            <h3 id="arch-h" className="sheet-h">Architecture</h3>
            <ul className="arch-list">
              {project.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>
          <section className="about-item" aria-labelledby="stk-h">
            <h3 id="stk-h" className="sheet-h">Stack</h3>
            <ul className="chip-row">
              {project.stack.map((s) => (
                <li key={s}>
                  <kbd>{s}</kbd>
                </li>
              ))}
            </ul>
          </section>
          <div className="about-item">
            {project.links.map((l) => (
              <a key={l.label} className="pill-link" href={l.href} target="_blank" rel="noreferrer">
                {l.label} <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      )}
    </Sheet>
  );
}
