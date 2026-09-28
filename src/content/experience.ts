import type { L10n } from '../lib/i18n';

export type Industry = 'cybersecurity' | 'fintech' | 'logistics' | 'ecommerce' | 'enterprise';

export interface Role {
  title: string;
  start: string; // YYYY-MM
  end: string | null; // null = hoy
  client?: L10n;
  bullets: L10n<string[]>;
}

export interface Company {
  id: string;
  name: string;
  industries: Industry[];
  roles: Role[];
  stack: string[];
  /** Current employer under NDA: shows a "details private" chip and only public, general info. */
  restricted?: boolean;
}

// Fuente: CV (cv-peter-gomez.pdf) + docs/08-content-inputs.md. Nada inventado.
export const experience: Company[] = [
  {
    id: 'meli',
    name: 'MercadoLibre',
    industries: ['fintech'],
    restricted: true,
    roles: [
      {
        title: 'Senior Software Engineer',
        start: '2026-05',
        end: null,
        client: { en: 'Payments platform', es: 'Plataforma de pagos' },
        bullets: {
          en: ['Building and operating backend services that power online payments at scale.'],
          es: ['Construyo y opero servicios backend que soportan pagos en línea a escala.'],
        },
      },
    ],
    stack: ['Java', 'Kotlin', 'Spring Boot', 'Groovy', 'PostgreSQL', 'Redis', 'AWS'],
  },
  {
    id: 'cafeto',
    name: 'Cafeto Software',
    industries: ['cybersecurity'],
    roles: [
      {
        title: 'Senior Software Engineer',
        start: '2025-09',
        end: '2026-02',
        client: {
          en: 'Apptega (enterprise cybersecurity & compliance)',
          es: 'Apptega (ciberseguridad y compliance empresarial)',
        },
        bullets: {
          en: [
            'Led backend design for the Security Questionnaires product from scratch, with Clean Architecture and DDD.',
            'Designed the DynamoDB data model (partition/sort keys, GSIs) for complex enterprise query workloads.',
            'Shipped semantic search over historical compliance answers using vectorization on OpenSearch.',
          ],
          es: [
            'Lideré el diseño backend del producto Security Questionnaires desde cero, con Clean Architecture y DDD.',
            'Diseñé el modelo de datos en DynamoDB (partition/sort keys, GSIs) para consultas empresariales complejas.',
            'Lancé búsqueda semántica sobre respuestas históricas de compliance con vectorización en OpenSearch.',
          ],
        },
      },
    ],
    stack: ['NestJS', 'DynamoDB', 'OpenSearch', 'DDD'],
  },
  {
    id: 'gap',
    name: 'Growth Acceleration Partners',
    industries: ['fintech', 'logistics'],
    roles: [
      {
        title: 'Senior Software Engineer L3',
        start: '2023-10',
        end: '2025-02',
        client: {
          en: 'Zenbusiness (US business formation fintech)',
          es: 'Zenbusiness (fintech de creación de empresas en EE. UU.)',
        },
        bullets: {
          en: [
            'Led backend development for a platform serving hundreds of thousands of US small business owners.',
            'Rebuilt the email templating system as a Pug-based pipeline, cutting template update time by over 60%.',
            'Kept releases stable at scale with feature flags, Sentry, E2E tests and CI/CD on Kubernetes.',
          ],
          es: [
            'Lideré el desarrollo backend de una plataforma usada por cientos de miles de pequeños empresarios en EE. UU.',
            'Rehice el sistema de plantillas de email como un pipeline con Pug: más de 60% menos tiempo por actualización.',
            'Mantuve releases estables a escala con feature flags, Sentry, tests E2E y CI/CD sobre Kubernetes.',
          ],
        },
      },
      {
        title: 'Senior Software Engineer',
        start: '2023-07',
        end: '2023-09',
        client: {
          en: 'Bison Tech (raw material transport)',
          es: 'Bison Tech (transporte de materias primas)',
        },
        bullets: {
          en: [
            'Built Node.js APIs and Vue.js interfaces, plus the PDF reports and exports used daily in field operations.',
          ],
          es: [
            'Construí APIs en Node.js e interfaces en Vue.js, además de los reportes PDF y exportes usados a diario en campo.',
          ],
        },
      },
    ],
    stack: ['Node.js', 'Microservices', 'Kubernetes', 'LaunchDarkly', 'Sentry', 'Vue.js'],
  },
  {
    id: 'mjv',
    name: 'MJV Technology & Innovation',
    industries: ['ecommerce'],
    roles: [
      {
        title: 'Tech Lead',
        start: '2021-06',
        end: '2023-06',
        client: {
          en: 'Coca-Cola, Powerade (e-commerce & marketing)',
          es: 'Coca-Cola, Powerade (e-commerce y marketing)',
        },
        bullets: {
          en: [
            'Led technical design and technology selection, from architecture to production.',
            'Architected microservices backends for high-traffic consumer brand platforms.',
            'Mentored engineers and set code review practices for 2+ years.',
          ],
          es: [
            'Lideré el diseño técnico y la selección de tecnología, de la arquitectura a producción.',
            'Diseñé backends de microservicios para plataformas de marcas de consumo con alto tráfico.',
            'Mentoricé ingenieros y definí prácticas de code review durante más de 2 años.',
          ],
        },
      },
      {
        title: 'Full Stack Developer',
        start: '2019-10',
        end: '2021-06',
        client: { en: 'Coca-Cola, Powerade', es: 'Coca-Cola, Powerade' },
        bullets: {
          en: [
            'Built e-commerce and campaign platforms with Angular, React and Node.js.',
            'Built a CMS-like dashboard so marketing teams could launch campaigns without writing code.',
          ],
          es: [
            'Construí plataformas de e-commerce y campañas con Angular, React y Node.js.',
            'Construí un dashboard tipo CMS para que marketing lanzara campañas sin escribir código.',
          ],
        },
      },
    ],
    stack: ['Node.js', 'Docker', 'Kubernetes', 'Angular', 'React', 'Flutter'],
  },
  {
    id: 'freelance',
    name: 'Freelance',
    industries: ['fintech', 'enterprise'],
    roles: [
      {
        title: 'Full Stack Developer',
        start: '2018-10',
        end: '2019-11',
        bullets: {
          en: [
            'Built the backend for Uffpay, a New York fintech payments startup (Node.js, AWS).',
            'Delivered enterprise software for SIE Software and other clients in Java, Go, Node.js and Python.',
          ],
          es: [
            'Construí el backend de Uffpay, una startup fintech de pagos de Nueva York (Node.js, AWS).',
            'Entregué software empresarial para SIE Software y otros clientes en Java, Go, Node.js y Python.',
          ],
        },
      },
    ],
    stack: ['Node.js', 'AWS', 'Firebase', 'Go', 'Java'],
  },
  {
    id: 'lexco',
    name: 'Lexco S.A.',
    industries: ['enterprise'],
    roles: [
      {
        title: 'IT System Analyst',
        start: '2017-08',
        end: '2018-09',
        bullets: {
          en: ['Built enterprise document management systems in Java and Go with a modular microservice architecture.'],
          es: ['Construí sistemas de gestión documental en Java y Go con una arquitectura de microservicios modular.'],
        },
      },
    ],
    stack: ['Java', 'Go'],
  },
];

export const extras: L10n<string[]> = {
  en: [
    '🎓 Computer Systems Analysis · SENA · 2015–2017',
    '🏆 Top 3 Developer Team & Rookie of the Year · Sena Soft 2016',
  ],
  es: ['🎓 Análisis de Sistemas · SENA · 2015–2017', '🏆 Top 3 Developer Team y Rookie of the Year · Sena Soft 2016'],
};

export const CAREER_START = '2017-08';
