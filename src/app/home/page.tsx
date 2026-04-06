'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import SkillTrackCard from '@/components/SkillTrackCard';
import { ShieldCheck, Globe } from 'lucide-react';
import { AuthGuard } from '@/components/AuthGuard';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { t } = useTranslation('common');
  const { user, logout } = useAuth();
  const router = useRouter();
  const firstName = user?.name?.split(' ')[0] || '';
  const welcomeText = firstName ? t('hero.welcome_name', { name: firstName }) : t('hero.welcome');

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <AuthGuard>
      <div className="bg-off-white min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 px-4 pb-28">
          {/* ... */}
          <section className="mt-2 mb-8">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleLogout}
                className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {t('auth.sign_out')}
              </button>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
              {welcomeText}
            </h2>
            <p className="text-base text-gray-600 mb-6 font-medium leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </section>

          {/* Skill Tracks Section */}
          <section className="space-y-4">
            <SkillTrackCard 
              title={t('skill_tracks.stay_safe_online.title')}
              description={t('skill_tracks.stay_safe_online.description')}
              icon={<ShieldCheck size={24} />}
              href="/course/stay_safe_online"
            />
            <SkillTrackCard 
              title={t('skill_tracks.internet_101.title')} 
              description={t('skill_tracks.internet_101.description')} 
              icon={<Globe size={24} />}
              href="/course/internet_101"
            />
          </section>
        </main>

        <BottomNav />
      </div>
    </AuthGuard>
  );
}
