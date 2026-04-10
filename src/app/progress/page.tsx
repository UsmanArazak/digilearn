'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Flame, Globe, Mail, ShieldCheck, Smartphone, Target } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { AuthGuard } from '@/components/AuthGuard';
import { COURSE_IDS, LESSONS_BY_COURSE, PROGRESS_STORAGE_KEY, type CourseId, type ProgressMap } from '@/data/lessons';
import { getStreak, type StreakState } from '@/utils/streak';

const TOTAL_LESSONS_AVAILABLE = 20;

const safeReadProgress = (): ProgressMap => {
  const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as ProgressMap;
  } catch {
    return {};
  }
};

const courseIconFor = (courseId: CourseId) => {
  switch (courseId) {
    case 'phone_basics':
      return Smartphone;
    case 'internet_101':
      return Globe;
    case 'email_messaging':
      return Mail;
    case 'online_safety':
      return ShieldCheck;
    default:
      return Target;
  }
};

export default function ProgressPage() {
  const { t } = useTranslation('common');
  const router = useRouter();

  const [progressState, setProgressState] = useState<ProgressMap>({});
  const [streak, setStreak] = useState<StreakState>({ currentStreak: 0, longestStreak: 0, lastActiveDate: '' });

  const refresh = () => {
    setProgressState(safeReadProgress());
    setStreak(getStreak());
  };

  useEffect(() => {
    refresh();

    const onFocus = () => refresh();
    const onVis = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    const onProgressEvent = () => refresh();

    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('digilearn_progress_updated', onProgressEvent);
    window.addEventListener('digilearn_streak_updated', onProgressEvent);

    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('digilearn_progress_updated', onProgressEvent);
      window.removeEventListener('digilearn_streak_updated', onProgressEvent);
    };
  }, []);

  const perCourse = useMemo(() => {
    return COURSE_IDS.map((courseId) => {
      const completed = Array.from(new Set(progressState[courseId] ?? [])).length;
      const total = LESSONS_BY_COURSE[courseId].length;
      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      const status =
        completed === 0 ? 'not_started' : completed >= total ? 'completed' : 'in_progress';

      return { courseId, completed, total, pct, status };
    });
  }, [progressState]);

  const totalCompleted = perCourse.reduce((sum, c) => sum + c.completed, 0);
  const overallPercent =
    TOTAL_LESSONS_AVAILABLE > 0 ? Math.round((totalCompleted / TOTAL_LESSONS_AVAILABLE) * 100) : 0;

  const motivationKey =
    overallPercent === 0
      ? 'progress.motivation.zero'
      : overallPercent < 50
        ? 'progress.motivation.started'
        : overallPercent < 100
          ? 'progress.motivation.halfway'
          : 'progress.motivation.complete';

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (overallPercent / 100) * circumference;

  return (
    <AuthGuard>
      <div className="bg-off-white min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 px-4 pb-28">
          <section className="mt-2 mb-5">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">
              {t('progress.page.title')}
            </h1>
            <p className="text-base text-gray-600 font-medium leading-relaxed">
              {t(motivationKey)}
            </p>
          </section>

          <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 mb-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-extrabold mb-2">
                  {t('progress.summary.title')}
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-black text-gray-900">{overallPercent}%</span>
                  <span className="text-sm font-bold text-gray-500">{t('progress.summary.complete_label')}</span>
                </div>
                <p className="text-sm font-semibold text-gray-600">
                  {t('progress.summary.lessons_done', { completed: totalCompleted, total: TOTAL_LESSONS_AVAILABLE })}
                </p>
              </div>

              <div className="relative h-24 w-24">
                <svg viewBox="0 0 100 100" className="h-24 w-24">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="rgb(229 231 235)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="rgb(204 255 0)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={dashOffset}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-accent/30 flex items-center justify-center text-gray-900">
                <Flame size={22} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold text-gray-900">{t('progress.streak.title')}</p>
                <p className="text-sm text-gray-600 font-semibold">
                  {t('progress.streak.current', { count: streak.currentStreak })} · {t('progress.streak.longest', { count: streak.longestStreak })}
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            {perCourse.map((c) => {
              const Icon = courseIconFor(c.courseId);
              const statusLabelKey =
                c.status === 'not_started'
                  ? 'progress.status.not_started'
                  : c.status === 'completed'
                    ? 'progress.status.completed'
                    : 'progress.status.in_progress';

              const statusStyles =
                c.status === 'completed'
                  ? 'bg-green-50 text-green-700 border-green-100'
                  : c.status === 'in_progress'
                    ? 'bg-light-bg text-gray-700 border-gray-100'
                    : 'bg-gray-100 text-gray-600 border-gray-200';

              return (
                <button
                  key={c.courseId}
                  type="button"
                  onClick={() => router.push(`/course/${c.courseId}`)}
                  className="w-full text-left bg-white rounded-3xl border border-gray-50 shadow-sm p-5"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-accent/30 flex items-center justify-center text-gray-900">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h2 className="text-base font-extrabold text-gray-900">
                          {t(`skill_tracks.${c.courseId}.title`)}
                        </h2>
                        <p className="text-sm text-gray-600 font-semibold">
                          {t('progress.course.lessons', { completed: c.completed, total: c.total })}
                        </p>
                      </div>
                    </div>

                    <span className={['inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold border', statusStyles].join(' ')}>
                      {t(statusLabelKey)}
                    </span>
                  </div>

                  <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full bg-accent transition-all" style={{ width: `${c.pct}%` }} />
                  </div>
                </button>
              );
            })}
          </section>
        </main>

        <BottomNav />
      </div>
    </AuthGuard>
  );
}

