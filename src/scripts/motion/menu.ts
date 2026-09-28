/** Full-screen mobile menu: toggle buttons, Escape to close, scroll lock while open. */
export function initMenu() {
  const sheet = document.querySelector<HTMLElement>('[data-sheet]');
  if (!sheet) return;
  const toggles = document.querySelectorAll<HTMLButtonElement>('[data-menu-toggle]');

  const setOpen = (open: boolean) => {
    sheet.toggleAttribute('data-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    toggles.forEach((t) => t.setAttribute('aria-expanded', String(open)));
  };

  toggles.forEach((t) => t.addEventListener('click', () => setOpen(!sheet.hasAttribute('data-open'))));
  sheet.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  addEventListener('keydown', (e) => e.key === 'Escape' && sheet.hasAttribute('data-open') && setOpen(false));
}
