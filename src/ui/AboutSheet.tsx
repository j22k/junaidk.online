import { useState, type FormEvent } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { Sheet } from "./Sheet";
import { Switch } from "./Switch";
import { confetti } from "./gsap";
import { me } from "./me";

export function AboutSheet({ open, onClose, onProject }: { open: boolean; onClose: () => void; onProject: (id: string) => void }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [need, setNeed] = useState(me.needs[0]);
  const [msg, setMsg] = useState("");
  const [remote, setRemote] = useState(true);
  const [sent, setSent] = useState(false);

  const subject = `${need} — hello from ${name || "a visitor"}`;
  const body = `${msg}\n\n— ${name}${from ? ` (${from})` : ""}\nRemote OK: ${remote ? "yes" : "no"}`;
  const q = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const btn = e.currentTarget.querySelector("button[type=submit]") as HTMLElement;
    const r = btn.getBoundingClientRect();
    confetti(r.left + r.width / 2, r.top + r.height / 2);
    setSent(true);
    window.location.href = `mailto:${me.email}?${q}`;
  };

  return (
    <Sheet open={open} onClose={onClose} title="About Junaid" shadow="var(--c-pink)">
      <div className="sheet-body">
        <header className="about-item">
          <p className="eyebrow">About</p>
          <h2 className="sheet-title">{me.name}</h2>
          <p className="sheet-lead">{me.bio}</p>
        </header>

        <section className="about-item" aria-labelledby="svc-h">
          <h3 id="svc-h" className="sheet-h">What I can build</h3>
          <ul className="svc-grid">
            {me.services.map((s) => (
              <li key={s.title} className="svc" style={{ borderTopColor: s.color }}>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-item" aria-labelledby="work-h">
          <h3 id="work-h" className="sheet-h">Recent work</h3>
          <ul className="work-list">
            {me.projects.map((p) => (
              <li key={p.id}>
                <button type="button" className="work-link" onClick={() => onProject(p.id)}>
                  {p.name}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <form className="lead-card about-item" onSubmit={submit} aria-labelledby="lead-h">
          <h3 id="lead-h">Let's talk</h3>
          <div className="lead-row">
            <label>
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
            </label>
            <label>
              Your email
              <input type="email" value={from} onChange={(e) => setFrom(e.target.value)} autoComplete="email" />
            </label>
          </div>
          <fieldset className="needs">
            <legend>I need</legend>
            {me.needs.map((n) => (
              <label key={n} className={`need ${need === n ? "on" : ""}`}>
                <input type="radio" name="need" value={n} checked={need === n} onChange={() => setNeed(n)} />
                {n}
              </label>
            ))}
          </fieldset>
          <label>
            Message
            <textarea rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} required />
          </label>
          <div className="lead-foot">
            <span className="remote">
              <Switch checked={remote} onChange={setRemote} label="Remote is fine" /> Remote is fine
            </span>
            <button type="submit" className="send-pill">
              Send <Send size={15} aria-hidden="true" />
            </button>
          </div>
          <p role="status" className="lead-status">
            {sent ? (
              <>
                Opening your mail app. Or use{" "}
                <a href={`https://mail.google.com/mail/?view=cm&to=${me.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`} target="_blank" rel="noreferrer">Gmail</a>
                {" / "}
                <a href={`https://outlook.live.com/mail/0/deeplink/compose?to=${me.email}&${q}`} target="_blank" rel="noreferrer">Outlook</a>.
              </>
            ) : null}
          </p>
        </form>
      </div>
    </Sheet>
  );
}
