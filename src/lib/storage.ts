/** localStorage wrapper that never throws (private mode, blocked site data, sandboxed iframes). */
export const store = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Storage unavailable: the preference just isn't persisted.
    }
  },
};
