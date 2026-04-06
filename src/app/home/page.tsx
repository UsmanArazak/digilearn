'use client';

import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import SkillTrackCard from '@/components/SkillTrackCard';
import { Smartphone, Globe, Mail, ShieldAlert } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <div className="bg-off-white min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 px-4 pb-28">
        {/* ... */}
        <section className="mt-2 mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
            {t('hero.welcome')}
          </h2>
          <p className="text-base text-gray-600 mb-6 font-medium leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <button className="w-full bg-accent text-gray-900 font-bold py-4 rounded-xl shadow-sm text-lg active:scale-[0.98] transition-transform">
            {t('hero.cta')}
          </button>
        </section>

        {/* Skill Tracks Section */}
        <section>
          <SkillTrackCard 
            title={t('skill_tracks.phone_basics.title')} 
            description={t('skill_tracks.phone_basics.description')} 
            icon={<Smartphone size={24} />} 
          />
          <SkillTrackCard 
            title={t('skill_tracks.internet_101.title')} 
            description={t('skill_tracks.internet_101.description')} 
            icon={<Globe size={24} />} 
          />
          <SkillTrackCard 
            title={t('skill_tracks.email_messaging.title')} 
            description={t('skill_tracks.email_messaging.description')} 
            icon={<Mail size={24} />} 
          />
          <SkillTrackCard 
            title={t('skill_tracks.online_safety.title')} 
            description={t('skill_tracks.online_safety.description')} 
            icon={<ShieldAlert size={24} />} 
          />
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
