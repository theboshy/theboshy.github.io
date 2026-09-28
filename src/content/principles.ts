import type { L10n } from '../lib/i18n';

export const principles: { title: L10n; body: L10n }[] = [
  {
    title: { en: 'Docs before code.', es: 'Docs antes que código.' },
    body: {
      en: 'Vision, constraints and phases are written before the first commit. The repo explains itself.',
      es: 'Visión, restricciones y fases se escriben antes del primer commit. El repo se explica solo.',
    },
  },
  {
    title: { en: 'Decisions are recorded.', es: 'Las decisiones se registran.' },
    body: {
      en: 'ADRs with the reasoning and what would reverse them, so nobody re-argues them in a PR.',
      es: 'ADRs con el razonamiento y qué las revertiría, para que nadie las rediscuta en un PR.',
    },
  },
  {
    title: { en: 'Phases with exit criteria.', es: 'Fases con criterios de salida.' },
    body: {
      en: 'Each phase says what done means, and what not to build yet.',
      es: 'Cada fase dice qué significa terminar y qué no construir todavía.',
    },
  },
  {
    title: { en: 'Security is a design input.', es: 'La seguridad es una entrada del diseño.' },
    body: {
      en: 'Threat model first, not an audit at the end. Isolation lives in the database, not in good intentions.',
      es: 'Primero el threat model, no una auditoría al final. El aislamiento vive en la base de datos, no en las buenas intenciones.',
    },
  },
  {
    title: { en: 'Agent-friendly repos.', es: 'Repos amigables con agentes.' },
    body: {
      en: 'AGENTS.md as the single source of truth, for humans and AI alike.',
      es: 'AGENTS.md como única fuente de verdad, para humanos e IA por igual.',
    },
  },
  {
    title: { en: 'AI in the loop, not at the wheel.', es: 'La IA acompaña, no maneja.' },
    body: {
      en: 'Claude Code and Cursor speed me up; tests and reviews keep it honest.',
      es: 'Claude Code y Cursor me aceleran; los tests y las reviews mantienen la calidad.',
    },
  },
];

// Lines of at most 40 characters, so the block fits without scrolling on a 360 px phone.
export const adrSample = `# ADR 0004 · Tenant isolation

Status:    Accepted
Context:   Many businesses, one database.
           An app bug must not leak data.

Decision:  Postgres Row Level Security
           on every tenant table.

Consequences
  + Isolation holds if a WHERE is missed
  - Migrations ship policies with tables

Reverses if: a tenant needs its own DB`;
