import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type TileProps = HTMLAttributes<HTMLElement> & {
  accent?: string;
  labelledBy?: string;
  children: ReactNode;
};

/** Core bento primitive. `accent` sets --accent; pointer position feeds the spotlight. */
export function Tile({ accent, labelledBy, className = "", style, children, onPointerMove, ...rest }: TileProps) {
  return (
    <section
      {...rest}
      aria-labelledby={labelledBy}
      className={`tile ${className}`}
      style={{ ...(accent ? { "--accent": accent } : {}), ...style } as CSSProperties}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        e.currentTarget.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
        onPointerMove?.(e);
      }}
    >
      {children}
    </section>
  );
}

export function TileHead({ id, icon: Icon, children }: { id: string; icon: LucideIcon; children: ReactNode }) {
  return (
    <header className="tile-head">
      <span className="tile-icon" aria-hidden="true">
        <Icon size={15} aria-hidden="true" />
      </span>
      <h2 id={id}>{children}</h2>
    </header>
  );
}
