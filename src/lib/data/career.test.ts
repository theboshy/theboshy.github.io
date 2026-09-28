import { describe, expect, it } from 'vitest';
import { experience, type Company } from '../../content/experience';
import { careerGantt, careerStats, ganttPasses, toMonths } from './career';

const role = (start: string, end: string | null) => ({ title: 'Engineer', start, end, bullets: { en: [], es: [] } });
const company = (id: string, roles: ReturnType<typeof role>[], industries: Company['industries'] = ['fintech']) => ({
  id,
  name: id,
  industries,
  roles,
  stack: [],
});

const fixture: Company[] = [
  company('now', [role('2024-01', null)], ['fintech']),
  company('freelance', [role('2022-01', '2022-12')], ['enterprise']),
  company('first', [role('2020-01', '2021-12')], ['logistics']),
];

describe('toMonths', () => {
  it('turns YYYY-MM into comparable integers', () => {
    expect(toMonths('2020-02') - toMonths('2019-12')).toBe(2);
  });
});

describe('careerStats', () => {
  it('counts whole years, real companies and real industries', () => {
    expect(careerStats(fixture, '2020-01', '2025-06')).toEqual({ years: 5, companies: 2, industries: 2 });
  });
});

describe('careerGantt', () => {
  const { rows, years } = careerGantt(fixture, '2020-01', '2025-12');

  it('orders rows oldest first', () => {
    expect(rows.map((r) => r.company)).toEqual(['first', 'freelance', 'now']);
  });

  it('keeps every bar inside the chart', () => {
    for (const s of rows.flatMap((r) => r.segments)) {
      expect(s.left).toBeGreaterThanOrEqual(0);
      expect(s.left + s.width).toBeLessThanOrEqual(100.0001);
    }
  });

  it('runs the current role up to the right edge', () => {
    const current = rows.at(-1)!.segments[0];
    expect(current.current).toBe(true);
    expect(current.left + current.width).toBeCloseTo(100);
  });

  it('adds one tick per year', () => {
    expect(years.map((y) => y.year)).toEqual([2020, 2021, 2022, 2023, 2024, 2025]);
  });
});

describe('ganttPasses', () => {
  it('needs at least five dated roles', () => {
    expect(ganttPasses(fixture)).toBe(false);
    expect(ganttPasses(experience)).toBe(true);
  });
});

describe('content contract: experience', () => {
  const roles = experience.flatMap((c) => c.roles.map((r) => ({ company: c.name, ...r })));

  it('uses valid YYYY-MM dates with start before end', () => {
    for (const r of roles) {
      expect(r.start, r.company).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
      if (r.end) expect(toMonths(r.end), r.company).toBeGreaterThanOrEqual(toMonths(r.start));
    }
  });

  it('lists companies newest first', () => {
    const starts = experience.map((c) => toMonths(c.roles.at(-1)!.start));
    expect(starts).toEqual([...starts].sort((a, b) => b - a));
  });

  it('has exactly one current role', () => {
    expect(roles.filter((r) => r.end === null)).toHaveLength(1);
  });

  it('keeps the same number of bullets in both languages', () => {
    for (const r of roles) expect(r.bullets.es.length, r.company).toBe(r.bullets.en.length);
  });
});
