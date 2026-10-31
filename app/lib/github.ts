import { useEffect, useState } from 'react';

const REPO_API = 'https://api.github.com/repos/brokspace/brok';
const CACHE_KEY = 'brokspace:stars';
const CACHE_MS = 10 * 60 * 1000;

/** Stars of brokspace/brok, or null when GitHub cannot be reached. */
export async function fetchStars(token?: string): Promise<number | null> {
  try {
    const response = await fetch(REPO_API, {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const repo = (await response.json()) as { stargazers_count?: unknown };
    return typeof repo.stargazers_count === 'number' ? repo.stargazers_count : null;
  } catch {
    return null;
  }
}

/**
 * Starts from the count rendered on the server (or at build time) and
 * refreshes it in the browser, at most every ten minutes per visitor.
 */
export function useStars(initial: number | null) {
  const [stars, setStars] = useState(initial);

  useEffect(() => {
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null') as {
        stars: number;
        at: number;
      } | null;
      if (cached && Date.now() - cached.at < CACHE_MS) {
        setStars(cached.stars);
        return;
      }
    } catch {
      // Storage unavailable: fetch every time.
    }
    let active = true;
    fetchStars().then((count) => {
      if (!active || count === null) return;
      setStars(count);
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ stars: count, at: Date.now() }));
      } catch {
        // Ignore.
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return stars;
}

export function formatStars(count: number) {
  if (count < 1000) return String(count);
  const thousands = count / 1000;
  return `${thousands < 10 ? thousands.toFixed(1).replace(/\.0$/, '') : Math.round(thousands)}k`;
}
