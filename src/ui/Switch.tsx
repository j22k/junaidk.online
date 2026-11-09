export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} className="switch" onClick={() => onChange(!checked)}>
      <span className="lbl" aria-hidden="true">
        {checked ? "ON" : "OFF"}
      </span>
      <span className="thumb" aria-hidden="true" />
    </button>
  );
}
