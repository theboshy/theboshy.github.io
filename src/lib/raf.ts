/** Coalesces a high-frequency event (scroll, pointermove) into at most one call per frame. */
export function rafThrottle<A extends unknown[]>(fn: (...args: A) => void) {
  let frame = 0;
  let lastArgs: A;
  return (...args: A) => {
    lastArgs = args;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      fn(...lastArgs);
    });
  };
}
