'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock3, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { AuthGuard } from '@/components/AuthGuard';

type CourseId = 'stay_safe_online' | 'internet_101';

const VALID_COURSE_IDS: CourseId[] = ['stay_safe_online', 'internet_101'];

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation('common');
  const courseId = params.id as CourseId;

  if (!VALID_COURSE_IDS.includes(courseId)) {
    notFound();
  }

  const lessons = t(`course_content.${courseId}.lessons`, { returnObjects: true }) as string[];

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
                {t('course.duration', { count: lessons.length * 8 })}
              </span>
            </div>
          </section>

          <section className="space-y-3">
            {lessons.map((lesson, index) => (
              <article
                key={`${courseId}-${index}`}
                className="bg-white rounded-2xl border border-gray-50 shadow-sm p-4"
              >
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">
                  {t('course.lesson_number', { count: index + 1 })}
                </p>
                <h2 className="text-base font-bold text-gray-900">{lesson}</h2>
              </article>
            ))}
          </section>
        </main>

        <BottomNav />
      </div>
    </AuthGuard>
  );
}
