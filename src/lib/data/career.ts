// Numbers derived from content/experience.ts: everything is computed, nothing typed by hand.
// Functions take the data and "now" as parameters so they are deterministic under test.
import { CAREER_START, experience, type Company } from '../../content/experience';

/** A `YYYY-MM` month as a single integer, so month arithmetic is plain subtraction. */
export const toMonths = (ym: string) => {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
};
const currentMonth = () => new Date().toISOString().slice(0, 7);

/** Freelance is work, not a company; "enterprise" describes clients, not an industry. */
const NOT_A_COMPANY = new Set(['freelance']);
const NOT_AN_INDUSTRY = new Set(['enterprise']);

export function careerStats(companies: Company[] = experience, start = CAREER_START, now = currentMonth()) {
  return {
    years: Math.floor((toMonths(now) - toMonths(start)) / 12),
    companies: companies.filter((c) => !NOT_A_COMPANY.has(c.id)).length,
    industries: new Set(companies.flatMap((c) => c.industries).filter((i) => !NOT_AN_INDUSTRY.has(i))).size,
  };
}

export interface GanttSegment {
  title: string;
  start: string;
  end: string;
  current: boolean;
  /** Position and width as a percentage of the [career start, now] range. */
  left: number;
  width: number;
}

export interface GanttRow {
  company: string;
  segments: GanttSegment[];
}

/** Gantt rows, oldest company first, plus the year ticks for the axis. */
export function careerGantt(companies: Company[] = experience, start = CAREER_START, now = currentMonth()) {
  const firstYear = Number(start.slice(0, 4));
  const min = firstYear * 12;
  const max = toMonths(now) + 1; // include the current month
  const pct = (m: number) => ((m - min) / (max - min)) * 100;

  const rows: GanttRow[] = [...companies].reverse().map((c) => ({
    company: c.name,
    segments: [...c.roles].reverse().map((r) => {
      const from = toMonths(r.start);
      const to = r.end ? toMonths(r.end) + 1 : max;
      return {
        title: r.title,
        start: r.start,
        end: r.end ?? now,
        current: !r.end,
        left: pct(from),
        width: pct(to) - pct(from),
      };
    }),
  }));

  const years: { year: number; left: number }[] = [];
  for (let y = firstYear; y * 12 < max; y++) years.push({ year: y, left: pct(y * 12) });
  return { rows, years };
}

/** Inclusion rule for the chart: a timeline with fewer than 5 dated roles isn't worth drawing. */
export const MIN_GANTT_ROLES = 5;
export const ganttPasses = (companies: Company[] = experience) =>
  companies.flatMap((c) => c.roles).filter((r) => r.start).length >= MIN_GANTT_ROLES;
