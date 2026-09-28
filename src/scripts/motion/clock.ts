/** Live Bogotá time in the footer. Minute precision, so a 30 s tick is plenty. */
export function initClock() {
  const clock = document.querySelector<HTMLElement>('[data-clock]');
  if (!clock) return;
  const format = new Intl.DateTimeFormat('en-GB', { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit' });
  const tick = () => (clock.textContent = `${format.format(new Date())} COT`);
  tick();
  setInterval(tick, 30_000);
}
