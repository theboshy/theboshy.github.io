// Single source of truth for whether the idle animations should run.
// (`gsap.core.Timeline` comes from the global namespace declared by the gsap package.)

interface PlaybackState {
  /** A node is hovered or focused: the diagram holds still so it can be read. */
  inspecting: boolean;
  /** The visitor pressed pause (WCAG 2.2.2 for animations longer than 5 s). */
  userPaused: boolean;
  inView: boolean;
  tabHidden: boolean;
}

export function createPlayback() {
  const timelines: gsap.core.Timeline[] = [];
  const state: PlaybackState = { inspecting: false, userPaused: false, inView: true, tabHidden: document.hidden };

  const sync = () => {
    const running = !state.inspecting && !state.userPaused && state.inView && !state.tabHidden;
    timelines.forEach((t) => (running ? t.play() : t.pause()));
  };

  return {
    add(timeline: gsap.core.Timeline) {
      timelines.push(timeline);
      sync();
    },
    update(patch: Partial<PlaybackState>) {
      Object.assign(state, patch);
      sync();
    },
    get userPaused() {
      return state.userPaused;
    },
  };
}

export type Playback = ReturnType<typeof createPlayback>;
