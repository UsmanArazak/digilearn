'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Globe, MousePointer2, Smartphone, ChevronRight, Layout, Search, Target, User } from 'lucide-react';

export default function LandingPage() {
  const { t, i18n } = useTranslation('common');

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ha' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <div className="bg-off-white text-gray-900 min-h-screen flex flex-col p-6 animate-fade-in overflow-x-hidden pb-32">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
             <div className="w-4 h-4 bg-accent rounded-sm rotate-45"></div>
          </div>
          DigiLearn
        </div>
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-1.5 rounded-full text-sm font-bold shadow-sm active:scale-95 transition-all"
        >
          <Globe size={16} />
          <span>{t('header.lang_toggle')}</span>
        </button>
      </header>

      {/* Hero Section */}
      <section className="mb-10">
        <h1 className="text-3xl font-black leading-tight mb-2 tracking-tight">
          Choose your<br />course
        </h1>
        
        {/* Category Chips */}
        <div className="flex gap-3 overflow-x-auto py-4 no-scrollbar -mx-6 px-6">
           <div className="bg-white p-3 px-6 rounded-full shadow-sm flex items-center gap-3 border border-gray-50 flex-shrink-0">
              <MousePointer2 size={18} className="text-accent fill-accent" />
              <span className="font-bold text-sm">Design</span>
              <span className="bg-gray-100 px-2 py-0.5 rounded-md text-[10px] font-black">10</span>
           </div>
           <div className="bg-gray-100 p-3 px-6 rounded-full flex items-center gap-3 flex-shrink-0">
              <span className="font-bold text-sm text-gray-500">Programming</span>
              <span className="bg-gray-200 px-2 py-0.5 rounded-md text-[10px] font-black">24</span>
           </div>
        </div>
      </section>

      {/* Big Course Cards */}
      <section className="flex flex-col gap-5 mb-10">
        {/* Phone Basics Card */}
        <div className="bg-accent rounded-[2.5rem] p-7 relative overflow-hidden min-h-[200px] shadow-lg shadow-accent/5 flex flex-col active:scale-[0.98] transition-transform">
           <div className="relative z-10 flex flex-col h-full">
             <div className="flex justify-between items-start">
                <h2 className="text-2xl font-black leading-tight max-w-[140px] text-gray-900">
                   {t('skill_tracks.phone_basics.title')}
                </h2>
             </div>
             <p className="text-xs font-bold text-gray-900/40 mt-1 uppercase tracking-wider">By DigiLearn Team</p>
             
             <div className="mt-auto">
                <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-black inline-block">
                   Mobile track
                </div>
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

        {/* Internet 101 Card */}
        <div className="bg-gray-900 rounded-[2.5rem] p-7 relative overflow-hidden min-h-[200px] shadow-xl shadow-black/5 flex flex-col active:scale-[0.98] transition-transform">
           <div className="relative z-10 flex flex-col h-full">
             <div className="flex justify-between items-start">
                <h2 className="text-2xl font-black leading-tight max-w-[140px] text-white">
                   {t('skill_tracks.internet_101.title')}
                </h2>
             </div>
             <p className="text-xs font-bold text-white/20 mt-1 uppercase tracking-wider">By DigiLearn Team</p>
             
             <div className="mt-auto">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-black text-white inline-block border border-white/5">
                   Web track
                </div>
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

      {/* Floating Bottom Navigation (Aesthetic only like reference) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[380px] bg-white/80 backdrop-blur-2xl p-4 rounded-full shadow-2xl border border-white/20 flex justify-around items-center z-50">
         <div className="bg-gray-100 p-3 rounded-full text-gray-900"><Layout size={20} /></div>
         <div className="p-3 text-gray-300"><Search size={20} /></div>
         <div className="p-3 text-gray-300"><Target size={20} /></div>
         <div className="p-3 text-gray-300"><User size={20} /></div>
      </div>
    </div>
  );
}

