/** Fades sections in the first time they enter the viewport (also triggers their highlighter). */
export function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.15 },
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}
