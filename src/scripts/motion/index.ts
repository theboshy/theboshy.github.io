// Lightweight, dependency-free interactions. One module per behavior.
import { initClock } from './clock';
import { initCopyEmail } from './copy-email';
import { initCursor } from './cursor';
import { initLang } from './lang';
import { initMenu } from './menu';
import { initNav } from './nav';
import { initParallax } from './parallax';
import { initReveal } from './reveal';
import { initTheme } from './theme';
import { initTimeline } from './timeline';

for (const init of [
  initReveal,
  initNav,
  initMenu,
  initTheme,
  initLang,
  initTimeline,
  initCopyEmail,
  initClock,
  initParallax,
  initCursor,
]) {
  init();
}
