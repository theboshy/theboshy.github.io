import type { L10n } from '../lib/i18n';
import type { Axis } from '../lib/iso';

export type Accent = 'violet' | 'blue' | 'orange' | 'pink' | 'green' | 'neutral';

export interface IsoNode {
  id: string;
  /** Box corner in iso units, desktop layout. */
  at: [number, number];
  /** Box corner in iso units, mobile layout. `null` hides the node on mobile. */
  atMobile: [number, number] | null;
  /** Footprint and height in iso units. Defaults to 4×4×1.5. */
  size?: [number, number, number];
  /** lucide-static icon name, projected onto the top face. */
  icon: string;
  accent: Accent;
  label: L10n;
  title: L10n;
  body: L10n;
}

export interface IsoEdge {
  from: string;
  to: string;
  /** Axis of the first segment when the connector needs an elbow. Defaults to 'x'. */
  via?: Axis;
  /** Set to false to drop the edge from the mobile layout. */
  mobile?: boolean;
}

/** The animated particle. Without a plan it walks every edge in declaration order (a loop). */
export interface ParticlePlan {
  /** Node-id paths played one after another, e.g. the two outcomes of a request. */
  routes: string[][];
  /** Seconds the particle rests when it reaches a node (e.g. an LLM "thinking"). */
  dwell?: Record<string, number>;
}

export interface Diagram {
  id: string;
  nodes: IsoNode[];
  edges: IsoEdge[];
  particle?: ParticlePlan;
}

const same = (s: string): L10n => ({ en: s, es: s });

// ── Diagram 1: how I work ─────────────────────────────────────────
export const loopDiagram: Diagram = {
  id: 'loop',
  nodes: [
    {
      id: 'design',
      at: [0, 0],
      atMobile: [2, -2],
      icon: 'pen-tool',
      accent: 'violet',
      label: { en: 'Design', es: 'Diseñar' },
      title: { en: 'Design: write it down first', es: 'Diseñar: primero se escribe' },
      body: {
        en: 'Problem, constraints, ADR. Decisions get recorded, not re-argued.',
        es: 'Problema, restricciones, ADR. Las decisiones se registran, no se rediscuten.',
      },
    },
    {
      id: 'build',
      at: [9, 0],
      atMobile: [2, 6],
      icon: 'code-xml',
      accent: 'blue',
      label: { en: 'Build', es: 'Construir' },
      title: { en: 'Build: small, typed, tested', es: 'Construir: pequeño, tipado y testeado' },
      body: {
        en: 'Clean boundaries, boring tech where it counts, and tests that describe behavior.',
        es: 'Límites limpios, tecnología aburrida donde importa y tests que describen comportamiento.',
      },
    },
    {
      id: 'ship',
      at: [18, 0],
      atMobile: [10, 7],
      icon: 'rocket',
      accent: 'orange',
      label: { en: 'Ship', es: 'Lanzar' },
      title: { en: 'Ship: uneventfully', es: 'Lanzar: sin sobresaltos' },
      body: {
        en: 'Behind feature flags, through CI, with a rollback plan. Deploys should be boring.',
        es: 'Detrás de feature flags, por CI y con plan de rollback. Un deploy debería ser aburrido.',
      },
    },
    {
      id: 'observe',
      at: [18, 9],
      atMobile: [11, 14],
      icon: 'activity',
      accent: 'pink',
      label: { en: 'Observe', es: 'Observar' },
      title: { en: 'Observe: measure, don’t guess', es: 'Observar: medir, no suponer' },
      body: {
        en: 'Logs, traces, metrics, error tracking. If it’s not measured, it’s a guess.',
        es: 'Logs, trazas, métricas y error tracking. Lo que no se mide es una suposición.',
      },
    },
    {
      id: 'learn',
      at: [9, 9],
      atMobile: [18, 15],
      icon: 'refresh-ccw',
      accent: 'green',
      label: { en: 'Learn', es: 'Aprender' },
      title: { en: 'Learn: feed it back', es: 'Aprender: todo vuelve al inicio' },
      body: {
        en: 'Postmortems, evals, refactors. What production teaches goes into the next design.',
        es: 'Postmortems, evals y refactors. Lo que enseña producción entra al siguiente diseño.',
      },
    },
  ],
  edges: [
    { from: 'design', to: 'build' },
    { from: 'build', to: 'ship' },
    { from: 'ship', to: 'observe' },
    { from: 'observe', to: 'learn' },
    { from: 'learn', to: 'design', mobile: false },
  ],
};

// ── Diagram 2: Lab conversational AI system (anonymised, nothing proprietary) ──
export const labDiagram: Diagram = {
  id: 'lab',
  nodes: [
    {
      id: 'message',
      at: [0, 4],
      atMobile: [-3, 3],
      size: [3, 3, 2.2],
      icon: 'smartphone',
      accent: 'neutral',
      label: { en: 'Message', es: 'Mensaje' },
      title: { en: 'An inbound message', es: 'Un mensaje entrante' },
      body: {
        en: 'Arrives at any hour. Everything after this is asynchronous.',
        es: 'Llega a cualquier hora. Todo lo que sigue es asíncrono.',
      },
    },
    {
      id: 'ingest',
      at: [6, 4],
      atMobile: [4, 4],
      icon: 'webhook',
      accent: 'blue',
      label: { en: 'Ingest', es: 'Ingesta' },
      title: { en: 'Validate before anything runs', es: 'Validar antes de ejecutar nada' },
      body: {
        en: 'Signature check, deduplication and a durable queue, so retries never double-answer.',
        es: 'Verificación de firma, deduplicación y una cola durable: los reintentos nunca responden dos veces.',
      },
    },
    {
      id: 'router',
      at: [12, 4],
      atMobile: [10, 5],
      icon: 'split',
      accent: 'violet',
      label: { en: 'Tenant router', es: 'Router de tenants' },
      title: { en: 'Every tenant is isolated', es: 'Cada tenant está aislado' },
      body: {
        en: 'Tenant is resolved per message; isolation is enforced by the database, not app code.',
        es: 'El tenant se resuelve por mensaje; el aislamiento lo impone la base de datos, no el código.',
      },
    },
    {
      id: 'agent',
      at: [18, 4],
      atMobile: [11, 11],
      icon: 'bot',
      accent: 'orange',
      label: { en: 'Agent runtime', es: 'Agente' },
      title: { en: 'Answer, ask, or escalate', es: 'Responder, preguntar o escalar' },
      body: {
        en: 'Grounded in each tenant’s own knowledge. It decides: answer, ask a follow-up, or escalate.',
        es: 'Basado en el conocimiento de cada tenant. Decide: responder, repreguntar o escalar.',
      },
    },
    {
      id: 'llm',
      at: [18, -3],
      atMobile: [12, 18],
      icon: 'sparkles',
      accent: 'pink',
      label: { en: 'LLM layer', es: 'Capa LLM' },
      title: { en: 'One interface, many providers', es: 'Una interfaz, varios proveedores' },
      body: {
        en: 'Swapping models is a config change, not a rewrite. Cost and quality stay comparable.',
        es: 'Cambiar de modelo es configuración, no reescritura. Costo y calidad se pueden comparar.',
      },
    },
    {
      id: 'db',
      at: [12, 11],
      atMobile: null,
      size: [4, 4, 1],
      icon: 'database',
      accent: 'neutral',
      label: same('Postgres · RLS'),
      title: { en: 'Row-level security', es: 'Row-level security' },
      body: {
        en: 'Shared multi-tenant schema. A query that forgets its WHERE still can’t leak data.',
        es: 'Esquema multi-tenant compartido. Una query que olvida su WHERE igual no puede filtrar datos.',
      },
    },
    {
      id: 'reply',
      at: [29, 0],
      atMobile: [18, 12],
      icon: 'message-square-reply',
      accent: 'green',
      label: { en: 'Reply', es: 'Respuesta' },
      title: { en: 'A grounded reply', es: 'Una respuesta fundamentada' },
      body: {
        en: 'Only from the tenant’s knowledge; when unsure, it asks instead of guessing.',
        es: 'Solo con el conocimiento del tenant; si duda, pregunta en vez de adivinar.',
      },
    },
    {
      id: 'handoff',
      at: [29, 10],
      atMobile: [19, 19],
      icon: 'headset',
      accent: 'orange',
      label: { en: 'Human handoff', es: 'Paso a humano' },
      title: { en: 'Low confidence? A person takes over', es: '¿Poca confianza? Entra una persona' },
      body: {
        en: 'With the full conversation as context, so the customer never repeats themselves.',
        es: 'Con toda la conversación como contexto: el cliente nunca tiene que repetir.',
      },
    },
  ],
  edges: [
    { from: 'message', to: 'ingest' },
    { from: 'ingest', to: 'router' },
    { from: 'router', to: 'agent' },
    { from: 'agent', to: 'llm' },
    { from: 'router', to: 'db' },
    { from: 'agent', to: 'db', via: 'y' },
    { from: 'agent', to: 'reply' },
    { from: 'agent', to: 'handoff' },
  ],
  particle: {
    routes: [
      ['message', 'ingest', 'router', 'agent', 'llm', 'agent', 'reply'],
      ['message', 'ingest', 'router', 'agent', 'llm', 'agent', 'handoff'],
    ],
    dwell: { llm: 0.5 },
  },
};
