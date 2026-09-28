// Read once at startup: both are stable for the lifetime of a page view in practice.
export const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = matchMedia('(pointer: fine)').matches;
