import type { L10n } from '../lib/i18n';

/** `icon` is a simple-icons slug. Some brands (AWS, DynamoDB) were removed from it, so they show text only. */
export const marquee: { name: string; icon?: string }[] = [
  { name: 'Node.js', icon: 'nodedotjs' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'NestJS', icon: 'nestjs' },
  { name: 'Java', icon: 'openjdk' },
  { name: 'Kotlin', icon: 'kotlin' },
  { name: 'Spring Boot', icon: 'springboot' },
  { name: 'Go', icon: 'go' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'DynamoDB' },
  { name: 'OpenSearch', icon: 'opensearch' },
  { name: 'Redis', icon: 'redis' },
  { name: 'AWS' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Kubernetes', icon: 'kubernetes' },
  { name: 'GraphQL', icon: 'graphql' },
  { name: 'GitHub Actions', icon: 'githubactions' },
  { name: 'Sentry', icon: 'sentry' },
];

export const stackGroups: { title: L10n; items: string[]; note: L10n }[] = [
  {
    title: { en: 'Backend', es: 'Backend' },
    items: ['Node.js · NestJS · Express', 'TypeScript', 'Java · Kotlin · Spring Boot', 'Go · Python', 'GraphQL · REST'],
    note: { en: 'Where I spend most of my time.', es: 'Donde paso la mayor parte del tiempo.' },
  },
  {
    title: { en: 'Data', es: 'Datos' },
    items: ['PostgreSQL', 'DynamoDB', 'OpenSearch / Elasticsearch', 'Redis', 'MongoDB · Firebase'],
    note: { en: 'Model the access patterns first.', es: 'Primero se modelan los patrones de acceso.' },
  },
  {
    title: { en: 'Cloud & delivery', es: 'Cloud y entrega' },
    items: ['AWS (Lambda, EC2, S3, RDS)', 'Docker · Kubernetes', 'GitHub Actions · GitLab CI', 'Sentry · LaunchDarkly'],
    note: { en: 'Deploys should be boring.', es: 'Un deploy debería ser aburrido.' },
  },
  {
    title: { en: 'Architecture', es: 'Arquitectura' },
    items: ['Clean Architecture', 'Domain-Driven Design', 'Event-driven · Serverless', 'Microservices'],
    note: { en: 'Boundaries before frameworks.', es: 'Límites antes que frameworks.' },
  },
  {
    title: { en: 'AI', es: 'IA' },
    items: ['Semantic search · vectors', 'Multi-provider LLM layers', 'Claude Code · Cursor'],
    note: { en: 'Useful, measured, replaceable.', es: 'Útil, medida y reemplazable.' },
  },
  {
    title: { en: 'Frontend', es: 'Frontend' },
    items: ['Vue.js', 'React', 'Angular'],
    note: { en: 'Enough to ship the whole feature.', es: 'Lo suficiente para lanzar la feature completa.' },
  },
];
