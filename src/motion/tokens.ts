/**
 * Motion language — one set of curves and durations for the whole site.
 *  - ui:      hover / press feedback on small controls (150–300 ms)
 *  - reveal:  headings and copy entering the viewport (400–800 ms)
 *  - image:   masks and clip-path wipes on photography (~1.1 s)
 */
export const ease = {
  /** decelerating — most entrances */
  out: [0.22, 1, 0.36, 1] as const,
  /** symmetric — masks, wipes, state swaps */
  inOut: [0.65, 0, 0.35, 1] as const,
  /** gentle settle — scale-down of photography */
  settle: [0.25, 1, 0.5, 1] as const,
}

export const dur = {
  ui: 0.22,
  swap: 0.5,
  reveal: 0.75,
  image: 1.15,
}

export const stagger = {
  tight: 0.06,
  base: 0.09,
}

/** Trigger reveals a little after the element enters, once only. */
export const inView = { once: true, margin: '0px 0px -14% 0px' } as const
