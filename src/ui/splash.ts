/** Fades out the inline splash from index.html. Resolves once it is gone. */
export function hideSplash(minMs = 900): Promise<void> {
  const el = document.getElementById("splash");
  if (!el) return Promise.resolve();
  const started = (window as unknown as { __splashStart?: number }).__splashStart ?? performance.now();
  const wait = Math.max(0, minMs - (performance.now() - started));
  return new Promise((resolve) => {
    window.setTimeout(() => {
      el.classList.add("out");
      window.setTimeout(() => {
        el.remove();
        resolve();
      }, 420);
    }, wait);
  });
}
