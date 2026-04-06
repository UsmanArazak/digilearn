'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Globe, Heart, Bookmark, Lock, MousePointer2, Smartphone, ChevronRight, Layout, Search, Target, User } from 'lucide-react';

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
      <section className="flex flex-col gap-6 mb-10">
        {/* Phone Basics Card */}
        <div className="bg-accent rounded-[3.5rem] p-8 relative overflow-hidden min-h-[380px] shadow-xl shadow-accent/10 flex flex-col group active:scale-[0.98] transition-transform">
           <div className="relative z-10 flex flex-col h-full">
             <div className="flex justify-between items-start">
                <h2 className="text-3xl font-black leading-[1.1] max-w-[180px] text-gray-900">
                   {t('skill_tracks.phone_basics.title')}
                </h2>
                <div className="flex gap-2">
                    <div className="bg-white/40 p-2.5 rounded-full backdrop-blur-md"><Heart size={20} className="text-gray-900" /></div>
                    <div className="bg-white/40 p-2.5 rounded-full backdrop-blur-md"><Bookmark size={20} className="text-gray-900" /></div>
                </div>
             </div>
             <p className="text-sm font-bold text-gray-900/50 mt-2">By DigiLearn Team</p>
             
             <div className="mt-auto flex items-center">
                <div className="bg-white px-5 py-2.5 rounded-full text-xs font-black shadow-sm">
                   Mobile track
                </div>
             </div>
           </div>

           {/* Large Illustration Content */}
           <div className="absolute right-[-10%] bottom-[5%] w-[70%] h-[70%] flex items-center justify-center pointer-events-none">
              <Smartphone size={200} className="text-gray-900 opacity-5 absolute scale-125" strokeWidth={1} />
              <div className="relative">
                 <div className="w-48 h-48 bg-white/20 rounded-full blur-3xl absolute animate-pulse"></div>
                 <Smartphone size={160} className="text-gray-900 relative drop-shadow-2xl animate-float" strokeWidth={1.5} />
              </div>
           </div>

           {/* Lock Controls */}
           <div className="absolute left-8 bottom-8 flex items-center gap-2">
             <div className="bg-black/10 p-4 rounded-3xl backdrop-blur-md border border-white/20">
                <Lock size={22} className="text-gray-900" />
             </div>
             <div className="w-12 h-1 h-0.5 bg-black/10 rounded-full"></div>
             <div className="bg-white/30 p-4 rounded-3xl backdrop-blur-md border border-white/20">
                <Lock size={22} className="text-gray-900 opacity-30" />
             </div>
           </div>
        </div>

        {/* Internet 101 Card (Secondary style like the reference) */}
        <div className="bg-gray-900 rounded-[3.5rem] p-8 relative overflow-hidden min-h-[380px] flex flex-col active:scale-[0.98] transition-transform">
           <div className="relative z-10 flex flex-col h-full">
             <div className="flex justify-between items-start">
                <h2 className="text-3xl font-black leading-[1.1] max-w-[180px] text-white">
                   {t('skill_tracks.internet_101.title')}
                </h2>
                <div className="flex gap-2">
                    <div className="bg-white/10 p-2.5 rounded-full backdrop-blur-md"><Heart size={20} className="text-white" /></div>
                    <div className="bg-white/10 p-2.5 rounded-full backdrop-blur-md"><Bookmark size={20} className="text-white" /></div>
                </div>
             </div>
             <p className="text-sm font-bold text-white/40 mt-2">By DigiLearn Team</p>
             
             <div className="mt-8 flex flex-col gap-4">
                <div className="bg-white/10 p-5 rounded-[2rem] border border-white/5 backdrop-blur-sm flex items-center gap-4">
                   <div className="bg-accent p-3 rounded-2xl text-gray-900">
                      <Layout size={24} />
                   </div>
                   <div className="flex-1">
                      <p className="text-xs font-bold text-white/40">12 minutes</p>
                      <h4 className="text-sm font-black text-white">Safe Browsing</h4>
                   </div>
                   <div className="bg-white p-2 rounded-full"><ChevronRight size={16} className="text-gray-900" /></div>
                </div>
             </div>
           </div>
           
           <div className="mt-auto z-10">
              <div className="bg-white/10 px-5 py-2.5 rounded-full text-xs font-black text-white inline-block border border-white/5">
                 Web track
              </div>
           </div>

           {/* Graphic Element */}
           <div className="absolute right-[-15%] top-[20%] w-[60%] h-[60%] opacity-10 pointer-events-none">
              <Globe size={300} className="text-accent" strokeWidth={1} />
           </div>
           
           <div className="absolute right-8 bottom-8">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/20">
                 <ChevronRight size={24} className="text-gray-900" />
              </div>
           </div>
        </div>
      </section>

      {/* Stats row or CTA */}
      <div className="mt-auto px-2 pb-6">
        <Link href="/home" className="w-full bg-accent text-gray-900 font-black py-6 rounded-[2.5rem] text-center text-lg active:scale-95 transition-all shadow-xl shadow-accent/10 block mb-4">
          {t('landing.cta')}
        </Link>
        <p className="text-center text-gray-400 font-bold text-sm">
           {t('landing.sign_in')}
        </p>
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

