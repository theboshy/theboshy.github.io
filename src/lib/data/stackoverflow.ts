// es.stackoverflow reputation, fetched at build time. If the API fails, the last committed
// snapshot is used: a network hiccup never breaks a deploy.
import snapshot from '../../content/data/stackoverflow.snapshot.json';

export interface SOStats {
  reputation: number;
  badges: { gold: number; silver: number; bronze: number };
  live: boolean;
}

// One request per process: otherwise the dev server would refetch on every page render.
let cached: Promise<SOStats> | undefined;
export const getStackOverflow = (userId = 9206) => (cached ??= fetchStackOverflow(userId));

async function fetchStackOverflow(userId: number): Promise<SOStats> {
  try {
    const res = await fetch(`https://api.stackexchange.com/2.3/users/${userId}?site=es.stackoverflow`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(String(res.status));
    const u = (await res.json()).items?.[0];
    if (!u) throw new Error('user not found');
    return { reputation: u.reputation, badges: u.badge_counts, live: true };
  } catch {
    return { reputation: snapshot.reputation, badges: snapshot.badges, live: false };
  }
}
