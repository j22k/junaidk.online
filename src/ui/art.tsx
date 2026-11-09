/* ---------- brand glyphs (lucide v1 dropped brand icons) ---------- */
export function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
export function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ---------- floating hero shapes ---------- */
export function Clover() {
  return (
    <svg className="shape shape-clover" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id="g-clover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff0fd" />
          <stop offset="1" stopColor="#f472d0" />
        </linearGradient>
      </defs>
      <g fill="url(#g-clover)">
        <circle cx="50" cy="25" r="25" />
        <circle cx="75" cy="50" r="25" />
        <circle cx="50" cy="75" r="25" />
        <circle cx="25" cy="50" r="25" />
      </g>
    </svg>
  );
}

export function Ring() {
  return (
    <svg className="shape shape-ring" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id="g-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00bae2" />
          <stop offset="1" stopColor="#fec5fb" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="36" fill="none" stroke="url(#g-ring)" strokeWidth="20" />
    </svg>
  );
}

export function Asterisk() {
  return (
    <svg className="shape shape-asterisk" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id="g-ast" gradientUnits="userSpaceOnUse" x1="10" y1="10" x2="90" y2="90">
          <stop offset="0" stopColor="#ff8709" />
          <stop offset="1" stopColor="#ffd9c2" />
        </linearGradient>
      </defs>
      <g stroke="url(#g-ast)" strokeWidth="13" strokeLinecap="round">
        <line x1="50" y1="12" x2="50" y2="88" />
        <line x1="12" y1="50" x2="88" y2="50" />
        <line x1="23" y1="23" x2="77" y2="77" />
        <line x1="77" y1="23" x2="23" y2="77" />
      </g>
    </svg>
  );
}

export function Squiggle() {
  return (
    <svg className="shape shape-squiggle" viewBox="0 0 120 80" aria-hidden="true">
      <defs>
        <linearGradient id="g-sq" gradientUnits="userSpaceOnUse" x1="8" y1="60" x2="112" y2="22">
          <stop offset="0" stopColor="#9d95ff" />
          <stop offset="1" stopColor="#f472d0" />
        </linearGradient>
      </defs>
      <path className="squig-path" d="M8 60 C 20 20, 34 20, 40 44 S 62 70, 70 40 S 92 8, 112 22" fill="none" stroke="url(#g-sq)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const MORPH_PATHS = [
  "M50 10C72 10 90 28 90 50C90 72 72 90 50 90C28 90 10 72 10 50C10 28 28 10 50 10Z",
  "M50 6C54 34 66 46 94 50C66 54 54 66 50 94C46 66 34 54 6 50C34 46 46 34 50 6Z",
  "M28 12H72C82 12 88 18 88 28V72C88 82 82 88 72 88H28C18 88 12 82 12 72V28C12 18 18 12 28 12Z",
  "M50 8C60 8 92 40 92 50C92 60 60 92 50 92C40 92 8 60 8 50C8 40 40 8 50 8Z",
  "M52 10C74 8 92 30 88 54C84 78 62 94 40 86C18 78 8 54 18 34C26 18 38 11 52 10Z",
];

export function Morpher() {
  return (
    <svg className="shape shape-morpher" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id="g-morph" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#abff84" />
          <stop offset="1" stopColor="#0ae448" />
        </linearGradient>
      </defs>
      <path className="morph-path" d={MORPH_PATHS[0]} fill="url(#g-morph)" />
    </svg>
  );
}

/* ---------- heartbeat line (stat tile) ---------- */
export function Pulse() {
  const beat = "M0 20 H40 L50 20 L58 4 L68 36 L76 20 H110 L116 14 L122 26 L128 20 H200";
  return (
    <svg className="pulse" viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true">
      <g className="pulse-run" fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {[0, 200, 400, 600].map((x) => (
          <path key={x} d={beat} transform={`translate(${x} 0)`} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}
