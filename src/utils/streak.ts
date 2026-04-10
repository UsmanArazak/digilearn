export interface StreakState {
  currentStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  longestStreak: number;
}

export const STREAK_STORAGE_KEY = 'digilearn_streak';

const todayKey = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const addDays = (dateKey: string, days: number) => {
  const [y, m, d] = dateKey.split('-').map((n) => Number(n));
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  dt.setDate(dt.getDate() + days);
  return todayKey(dt);
};

export const getStreak = (): StreakState => {
  const raw = localStorage.getItem(STREAK_STORAGE_KEY);
  if (!raw) {
    return { currentStreak: 0, longestStreak: 0, lastActiveDate: '' };
  }
  try {
    const parsed = JSON.parse(raw) as Partial<StreakState>;
    return {
      currentStreak: typeof parsed.currentStreak === 'number' ? parsed.currentStreak : 0,
      longestStreak: typeof parsed.longestStreak === 'number' ? parsed.longestStreak : 0,
      lastActiveDate: typeof parsed.lastActiveDate === 'string' ? parsed.lastActiveDate : '',
    };
  } catch {
    return { currentStreak: 0, longestStreak: 0, lastActiveDate: '' };
  }
};

export const updateStreakForToday = (): StreakState => {
  const today = todayKey();
  const prev = getStreak();

  if (prev.lastActiveDate === today) {
    return prev;
  }

  const wasYesterday = prev.lastActiveDate && addDays(prev.lastActiveDate, 1) === today;
  const nextCurrent = wasYesterday ? Math.max(1, prev.currentStreak + 1) : 1;
  const nextLongest = Math.max(prev.longestStreak, nextCurrent);

  const next: StreakState = {
    currentStreak: nextCurrent,
    longestStreak: nextLongest,
    lastActiveDate: today,
  };

  localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(next));
  return next;
};

