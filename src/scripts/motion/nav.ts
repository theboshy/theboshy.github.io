/** Nav border once the page scrolls, plus scroll-spy for the section links. */
export function initNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;

  const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const links = new Map([...nav.querySelectorAll<HTMLAnchorElement>('[data-spy]')].map((a) => [a.dataset.spy!, a]));
  // A section is "current" while it crosses a thin band in the middle of the viewport.
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((link, id) => link.classList.toggle('is-current', id === entry.target.id));
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  for (const id of links.keys()) {
    const section = document.getElementById(id);
    if (section) spy.observe(section);
  }
}
