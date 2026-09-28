# Motion and interaction

Short, eased and always a response to something: 200ms for hovers, 700ms for things entering the viewport. Everything here has a `prefers-reduced-motion` fallback in [`src/styles/reduced-motion.css`](../src/styles/reduced-motion.css) or in the script itself.

| Easing   | Value                        | Used for                               |
| -------- | ---------------------------- | -------------------------------------- |
| standard | `cubic-bezier(.25,.1,.25,1)` | Section reveals                        |
| out-expo | `cubic-bezier(.16,1,.3,1)`   | Text entering, panels, the highlighter |
| spring   | GSAP `back.out(1.4)`         | Iso boxes rising on hover              |

| Behavior          | Trigger                                            | Implementation                                                                                                          | Reduced motion                         |
| ----------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Section reveal    | 15% visible, once                                  | `IntersectionObserver` + CSS transition                                                                                 | Shown immediately                      |
| Hero entrance     | First paint                                        | Pure CSS keyframes (no JS, so it doesn't delay LCP)                                                                     | Shown immediately                      |
| Highlighter paint | With the reveal                                    | `scaleX(0 → 1)` per word, 90ms stagger                                                                                  | Static marker                          |
| `text-in`         | Panel content changes                              | 6px rise + fade, 200ms, 50ms stagger                                                                                    | None                                   |
| Corner box hover  | Hover / focus                                      | Pseudo-element corners and stripes, 200ms                                                                               | Kept (not motion)                      |
| Border beam       | Always, primary CTA only                           | `offset-path` around the button, 6s                                                                                     | Hidden                                 |
| Stack marquee     | Always, pauses on hover                            | CSS translate loop, 40s                                                                                                 | Static                                 |
| Timeline drawing  | Scroll                                             | `rafThrottle`d scroll handler sets `--tl-progress`                                                                      | Fully drawn                            |
| Cursor            | Pointer moves                                      | A trailing dot; becomes a corner frame over `[data-cursor="frame"]` and a caret over text. rAF loop sleeps when settled | Disabled                               |
| Hero parallax     | Pointer moves                                      | Dot grid offset up to 12px, rAF-throttled                                                                               | Disabled                               |
| Theme switch      | Button                                             | View Transitions API, circle growing from the button                                                                    | Instant                                |
| Diagrams          | See [isometric-diagrams.md](isometric-diagrams.md) | GSAP, lazy-loaded                                                                                                       | Static; hover still explains each node |

The native cursor is never hidden; the custom one only decorates it, and only on devices with a fine pointer.
