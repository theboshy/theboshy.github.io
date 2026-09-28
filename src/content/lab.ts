import type { L10n } from '../lib/i18n';

// Casos anónimos (docs/04 §4). Sin nombres, links, código ni capturas.
// Engineering only: no market, pitch or channel. The product idea stays private; the design doesn't.
export const assistantCase = {
  title: { en: 'Conversational AI system', es: 'Sistema conversacional con IA' } as L10n,
  pitch: {
    en: 'A multi-tenant system where an AI agent answers inbound messages, grounded in each tenant’s own knowledge, with a human handoff path.',
    es: 'Un sistema multi-tenant donde un agente de IA responde mensajes entrantes, basado en el conocimiento de cada tenant y con un camino de paso a humano.',
  } as L10n,
  status: 'Status: spike',
  tags: ['TypeScript', 'Postgres', 'Multi-LLM'],
  decisions: [
    {
      title: { en: 'Isolation in the database, not the app', es: 'Aislamiento en la base de datos, no en la app' },
      body: {
        en: 'Row-level security in Postgres: a bug in a query can’t cross tenants.',
        es: 'Row-level security en Postgres: un bug en una query no cruza entre tenants.',
      },
      reverse: { en: 'a tenant needs a dedicated instance.', es: 'un tenant necesita una instancia dedicada.' },
    },
    {
      title: { en: 'One LLM interface, many providers', es: 'Una interfaz LLM, varios proveedores' },
      body: {
        en: 'No vendor lock-in; cost and quality stay comparable side by side.',
        es: 'Sin lock-in; costo y calidad se pueden comparar lado a lado.',
      },
      reverse: {
        en: 'one provider’s features become essential.',
        es: 'las features de un proveedor se vuelven esenciales.',
      },
    },
    {
      title: { en: 'Human handoff is a first-class path', es: 'El paso a humano es un camino de primera clase' },
      body: {
        en: 'Escalation is designed in from day one, with full context, not bolted on as an error case.',
        es: 'Escalar a una persona se diseña desde el día uno y con todo el contexto, no se agrega como caso de error.',
      },
      reverse: { en: 'never.', es: 'nunca.' },
    },
  ] satisfies { title: L10n; body: L10n; reverse: L10n }[],
  /** First-person learnings. Empty hides the block. */
  learnings: { en: [], es: [] } as L10n<string[]>,
};

export const brandCase = {
  title: { en: 'Brand site & design system', es: 'Sitio y design system de marca' } as L10n,
  pitch: {
    en: 'Website and design system for a streetwear brand: one accent color at ≤5% of any surface, a strict type pairing, and tokens synced between design and code.',
    es: 'Sitio y design system para una marca de streetwear: un solo color de acento en ≤5% de cualquier superficie, una pareja tipográfica estricta y tokens sincronizados entre diseño y código.',
  } as L10n,
  tags: ['Next.js', 'Design tokens', 'Tailwind'],
  // Neutral swatches on purpose: the brand's real palette is not published.
  swatches: ['#0b0b0b', '#3a3a38', '#8a8a85', '#e9e9e4', 'var(--accent-blue)'],
};
