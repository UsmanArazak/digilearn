'use client';

import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { AuthGuard } from '@/components/AuthGuard';
import { useAuth } from '@/hooks/useAuth';
import { COURSE_IDS, LESSONS_BY_COURSE, PROGRESS_STORAGE_KEY, type CourseId, type ProgressMap } from '@/data/lessons';

interface LessonPlayerPageProps {
  params: {
    id: string;
    lessonIndex: string;
  };
}

const isCourseId = (id: string): id is CourseId => COURSE_IDS.includes(id as CourseId);

export default function LessonPlayerPage({ params }: LessonPlayerPageProps) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { user, loading } = useAuth();

  const courseId = params.id;
  const lessonIndex = Number.parseInt(params.lessonIndex, 10);
  const isValidCourse = isCourseId(courseId);
  const lessons = isValidCourse ? LESSONS_BY_COURSE[courseId] : [];
  const lesson = lessons[lessonIndex];

  const [stepIndex, setStepIndex] = useState(0);
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);

  if (!isValidCourse || Number.isNaN(lessonIndex) || !lesson) {
    notFound();
  }

  if (!loading && !user) {
    return null;
  }

  const currentStep = lesson.steps[stepIndex];
  const totalSteps = lesson.steps.length;
  const progressPct = ((stepIndex + 1) / totalSteps) * 100;
  const StepIcon = currentStep.icon;
  const hasNextLesson = lessonIndex < lessons.length - 1;

  const lessonTitle = t(lesson.titleKey);
  const stepHeading = t(currentStep.headingKey);
  const stepContent = t(currentStep.contentKey);

  const saveLessonComplete = () => {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    let progressState: ProgressMap = {};
    if (raw) {
      try {
        progressState = JSON.parse(raw) as ProgressMap;
      } catch {
        progressState = {};
      }
    }
    const courseProgress = progressState[courseId] ?? [];
    const deduped = Array.from(new Set([...courseProgress, lessonIndex])).sort((a, b) => a - b);
    const nextProgress: ProgressMap = { ...progressState, [courseId]: deduped };
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(nextProgress));
  };

  const handleBackStep = () => setStepIndex((prev) => Math.max(0, prev - 1));
  const handleNextStep = () => setStepIndex((prev) => Math.min(totalSteps - 1, prev + 1));

  const handleComplete = () => {
    saveLessonComplete();
    setIsCompleteScreen(true);
  };

  const handleContinue = () => router.push(`/course/${courseId}`);
  const handleNextLesson = () => router.push(`/course/${courseId}/lesson/${lessonIndex + 1}`);

  return (
    <AuthGuard>
      <div className="bg-off-white min-h-screen flex flex-col">
        {isCompleteScreen ? (
          <main className="flex-1 flex items-center justify-center p-5">
            <article className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/30 text-gray-900 flex items-center justify-center mb-4">
                <CheckCircle2 size={34} />
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-1">{t('lesson_player.lesson_complete')}</h1>
              <p className="text-sm text-gray-500 font-semibold mb-6">{lessonTitle}</p>

              <div className="space-y-3">
                <button
                  onClick={handleContinue}
                  className="w-full bg-accent text-gray-900 rounded-2xl py-4 font-extrabold"
                >
                  {t('lesson_player.continue')}
                </button>
                {hasNextLesson && (
                  <button
                    onClick={handleNextLesson}
                    className="w-full bg-white border border-gray-200 text-gray-800 rounded-2xl py-4 font-bold"
                  >
                    {t('lesson_player.next_lesson')}
                  </button>
                )}
              </div>
            </article>
          </main>
        ) : (
          <>
            <header className="px-4 pt-4 pb-2 border-b border-gray-100 bg-off-white">
              <div className="flex items-center justify-between gap-2 mb-3">
                <Link href={`/course/${courseId}`} className="text-gray-700 p-1">
                  <ArrowLeft size={20} />
                </Link>
                <h1 className="text-sm font-extrabold text-gray-900 text-center flex-1 truncate">{lessonTitle}</h1>
                <span className="text-xs font-bold text-gray-500">
                  {t('lesson_player.step_of', { step: stepIndex + 1, total: totalSteps })}
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progressPct}%` }} />
              </div>
            </header>

            <main className="flex-1 p-5 flex items-center justify-center">
              <article key={stepIndex} className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-center animate-step-fade">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-accent/30 text-gray-900 flex items-center justify-center mb-5">
                  <StepIcon size={40} />
                </div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-extrabold mb-1">
                  {t('course.lesson_number', { count: lessonIndex + 1 })}
                </p>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-3">{stepHeading}</h2>
                <p className="text-base text-gray-600 leading-relaxed font-medium">{stepContent}</p>
                <p className="text-xs text-gray-400 font-bold mt-5">
                  {t('lesson_player.read_time', { count: lesson.readTimeMin })}
                </p>
              </article>
            </main>

            <footer className="p-4 border-t border-gray-100 bg-off-white">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleBackStep}
                  disabled={stepIndex === 0}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl py-4 bg-gray-200 text-gray-700 font-bold disabled:opacity-50"
                >
                  <ChevronLeft size={18} />
                  {t('lesson_player.back')}
                </button>
                {stepIndex < totalSteps - 1 ? (
                  <button
                    onClick={handleNextStep}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl py-4 bg-accent text-gray-900 font-extrabold"
                  >
                    {t('lesson_player.next')}
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleComplete}
                    className="rounded-2xl py-4 bg-accent text-gray-900 font-extrabold"
                  >
                    {t('lesson_player.complete_lesson')}
                  </button>
                )}
              </div>
            </footer>
          </>
        )}
      </div>
    </AuthGuard>
  );
}
