// UI and section copy. `[[...]]` marks words drawn with the yellow highlighter.
// es.ts is typed against this object, and the build fails if the two ever diverge.
export const en = {
  meta: {
    title: 'Peter G. Lobo · Software Engineer',
    description:
      'Senior Software Engineer in Bogotá. 9+ years building APIs, distributed systems and AI-integrated platforms.',
  },
  nav: {
    work: 'Work',
    lab: 'Lab',
    stack: 'Stack',
    numbers: 'Numbers',
    how: 'How I work',
    contact: 'Contact',
    theme: 'Toggle theme',
    menu: 'Menu',
    skip: 'Skip to content',
    langBanner: 'Prefer Spanish?',
    langBannerCta: 'Ver en español',
  },
  hero: {
    eyebrow: 'Peter G. Lobo',
    title: 'I build systems that [[hold up]] in production.',
    subtitle:
      'Senior Software Engineer at MercadoLibre. 9+ years building APIs, distributed systems and AI-integrated platforms.',
    location: 'Bogotá, Colombia · UTC-5',
    email: 'Email',
  },
  loop: {
    eyebrow: 'The loop',
    title: '[[Build, ship, learn]]. Repeat.',
    body: 'Every project I touch runs the same loop: decide on paper, build small, ship safely, measure what happens, and feed it back.',
    idleTitle: 'The whole loop',
    idleBody: 'Hover a step to see how I work.',
    cta: 'How I document decisions',
  },
  work: {
    eyebrow: 'Work',
    title: "Where I've [[shipped]].",
    body: 'Nine years across fintech, cybersecurity, e-commerce and logistics. Mostly backend, often leading the design.',
    now: 'now',
    client: 'Client',
    extras: 'Also',
    private: 'details private',
  },
  lab: {
    eyebrow: '🧪 Lab',
    title: "Things I'm [[building]] on the side.",
    disclaimer: 'Private, in progress. Names and code stay private; the thinking doesn’t.',
    decisions: 'Decisions I locked',
    reverse: 'Reverses if',
    learned: 'What I’m learning',
    play: 'Play',
    pause: 'Pause',
    replyLabel: 'reply',
    handoffLabel: 'handoff',
  },
  stack: {
    eyebrow: 'Stack',
    title: 'Tools I [[reach for]].',
    body: 'Backend first. The rest is there because production needed it.',
  },
  numbers: {
    eyebrow: '📊 Numbers',
    title: 'By the [[numbers]].',
    body: 'Only what can be counted honestly.',
    careerTitle: 'Career timeline',
    careerSub: 'Roles by year · 2017 → today',
    years: 'years building software',
    companies: 'companies',
    industries: 'industries',
    soRep: 'Stack Overflow (ES) reputation',
    soBadges: 'gold · silver · bronze badges',
    colCompany: 'Company',
    colRole: 'Role',
    colStart: 'Start',
    colEnd: 'End',
  },
  how: {
    eyebrow: 'Process',
    title: 'How I [[work]].',
    adrCaption: 'The ADR format I use (illustrative)',
  },
  contact: {
    title: "Let's [[talk]].",
    body: 'Interesting problem, side project or just want to compare notes on AI agents? My inbox is open.',
    copy: 'Copy email',
    copied: 'Copied ✓',
  },
  footer: {
    source: 'View source',
  },
  notFound: {
    title: "This route isn't in the [[loop]].",
    body: 'The page you were looking for fell off the diagram.',
    back: 'Back home',
  },
};

export type Dict = typeof en;
