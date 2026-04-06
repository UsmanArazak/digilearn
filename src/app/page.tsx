'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Smartphone, ChevronRight, Globe } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function LandingPage() {
  const { t } = useTranslation('common');

  return (
    <div className="bg-off-white text-gray-900 min-h-screen flex flex-col p-6 animate-fade-in overflow-x-hidden pb-32">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div className="text-xl font-black tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
             <div className="w-4 h-4 bg-accent rounded-sm rotate-45"></div>
          </div>
          DigiLearn
        </div>
        <LanguageSwitcher />
      </header>

      {/* Hero Section */}
      <section className="mb-8">
        <p className="text-gray-400 font-bold text-sm mb-2 uppercase tracking-widest animate-fade-in-up">
           {t('landing.info')}
        </p>
        <h1 className="text-2xl font-extrabold leading-tight mb-2 tracking-tight">
           {t('landing.choose_course')}
        </h1>
      </section>

      {/* Course Cards */}
      <section className="flex flex-col gap-4 mb-8">
        {/* Safe Online Card */}
        <Link href="/login" className="block">
        <div className="bg-accent rounded-[2.5rem] p-7 relative overflow-hidden min-h-[160px] shadow-lg shadow-accent/5 flex flex-col active:scale-[0.98] transition-transform">
           <div className="relative z-10 flex flex-col h-full">
             <div className="flex justify-between items-start">
                <h2 className="text-2xl font-black leading-tight max-w-[160px] text-gray-900">
                   {t('skill_tracks.stay_safe_online.title')}
                </h2>
             </div>
           </div>

           {/* Illustration Content */}
           <div className="absolute right-[-5%] bottom-[-5%] w-[50%] h-[80%] flex items-center justify-center pointer-events-none">
              <div className="relative">
                 <div className="w-32 h-32 bg-white/20 rounded-full blur-2xl absolute animate-pulse"></div>
                 <Smartphone size={100} className="text-gray-900 relative drop-shadow-xl animate-float" strokeWidth={1.5} />
              </div>
           </div>
        </div>
        </Link>

        {/* Internet 101 Card */}
        <Link href="/login" className="block">
        <div className="bg-gray-900 rounded-[2.5rem] p-7 relative overflow-hidden min-h-[160px] shadow-xl shadow-black/5 flex flex-col active:scale-[0.98] transition-transform">
           <div className="relative z-10 flex flex-col h-full">
             <div className="flex justify-between items-start">
                <h2 className="text-2xl font-black leading-tight max-w-[140px] text-white">
                   {t('skill_tracks.internet_101.title')}
                </h2>
             </div>
           </div>
           
           {/* Graphic Element */}
           <div className="absolute right-[-10%] bottom-[-10%] w-[50%] h-[80%] flex items-center justify-center pointer-events-none opacity-40">
              <Globe size={180} className="text-accent" strokeWidth={1} />
           </div>
           
           <div className="absolute right-6 bottom-6">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/20">
                 <ChevronRight size={20} className="text-gray-900" />
              </div>
           </div>
        </div>
        </Link>
      </section>

      {/* CTA Section */}
      <div className="mt-auto px-2 pb-6">
        <Link href="/register" className="w-full bg-accent text-gray-900 font-black py-6 rounded-[2.5rem] text-center text-lg active:scale-95 transition-all shadow-xl shadow-accent/10 block mb-4">
          {t('landing.cta')}
        </Link>
        <Link href="/login" className="text-center text-gray-400 font-bold text-sm block">
           {t('landing.sign_in')}
        </Link>
      </div>
    </div>
  );
}

