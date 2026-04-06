'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock3, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { AuthGuard } from '@/components/AuthGuard';
import { COURSE_IDS, LESSONS_BY_COURSE, PROGRESS_STORAGE_KEY, type CourseId, type ProgressMap } from '@/data/lessons';

const isCourseId = (id: string): id is CourseId => COURSE_IDS.includes(id as CourseId);

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation('common');
  const courseId = params.id;
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  if (!isCourseId(courseId)) {
    notFound();
  }

  const lessons = LESSONS_BY_COURSE[courseId];

  useEffect(() => {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) {
      setCompletedLessons([]);
      return;
    }
    try {
      const progress = JSON.parse(raw) as ProgressMap;
      setCompletedLessons(progress[courseId] ?? []);
    } catch {
      setCompletedLessons([]);
    }
  }, [courseId]);

  return (
    <AuthGuard>
      <div className="bg-off-white min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 px-4 pb-28">
          <section className="mt-2 mb-6">
            <Link href="/home" className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 mb-4">
              <ArrowLeft size={18} />
              {t('course.back_to_home')}
            </Link>

            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">
              {t(`skill_tracks.${courseId}.title`)}
            </h1>
            <p className="text-base text-gray-600 mb-4 font-medium leading-relaxed">
              {t(`skill_tracks.${courseId}.description`)}
            </p>

            <div className="flex gap-2 mb-6">
              <span className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700">
                <BookOpen size={16} />
                {t('course.lessons_count', { count: lessons.length })}
              </span>
              <span className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700">
                <Clock3 size={16} />
                {t('course.duration', { count: lessons.reduce((sum, lesson) => sum + lesson.readTimeMin, 0) })}
              </span>
            </div>
          </section>

          <section className="space-y-3">
            {lessons.map((lesson, index) => (
              <Link
                key={`${courseId}-${index}`}
                href={`/course/${courseId}/lesson/${index}`}
                className="block bg-white rounded-2xl border border-gray-50 shadow-sm p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">
                      {t('course.lesson_number', { count: index + 1 })}
                    </p>
                    <h2 className="text-base font-bold text-gray-900">{t(lesson.titleKey)}</h2>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    {completedLessons.includes(index) && <CheckCircle2 size={18} className="text-green-600" />}
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </main>

        <BottomNav />
      </div>
    </AuthGuard>
  );
}
