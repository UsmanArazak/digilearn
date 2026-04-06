'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Globe, Smartphone, BookOpen, ShieldCheck, Zap } from 'lucide-react';

export default function LandingPage() {
  const { t, i18n } = useTranslation('common');

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ha' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <div className="bg-[#111111] text-white min-h-screen flex flex-col p-6 animate-fade-in overflow-x-hidden">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <div className="text-xl font-bold tracking-tighter">DigiLearn</div>
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 border border-gray-700 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white/5 active:scale-95 transition-all"
        >
          <Globe size={16} />
          <span>{t('header.lang_toggle')}</span>
        </button>
      </header>

      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black leading-[1.1] mb-6 tracking-tight">
          {t('landing.heading')}
        </h1>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-[320px]">
          {t('landing.subtitle')}
        </p>
        <div className="inline-block bg-accent text-black text-xs font-bold px-4 py-2 rounded-full mb-10 tracking-wide uppercase">
          {t('landing.tag')}
        </div>

        {/* Hero Visual */}
        <div className="relative flex justify-center py-10 scale-90 sm:scale-100">
          <div className="w-64 h-64 bg-accent/20 rounded-full blur-3xl absolute animate-pulse"></div>
          <div className="w-56 h-56 bg-accent rounded-[3.5rem] rotate-12 flex items-center justify-center animate-float relative shadow-2xl">
            <Smartphone size={100} className="text-black transform -rotate-12" />
          </div>
        </div>
      </section>

      {/* Skill Track Previews */}
      <section className="space-y-4 mb-16">
        <div className="bg-[#1a1a1a] border border-gray-800 p-5 rounded-[2.5rem] flex items-center gap-5">
          <div className="bg-[#222] p-3 rounded-2xl text-accent">
            <BookOpen size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight mb-1">{t('skill_tracks.phone_basics.title')}</h3>
            <p className="text-gray-500 text-sm">Preview track</p>
          </div>
          <Zap size={20} className="ml-auto text-accent fill-accent" />
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 p-5 rounded-[2.5rem] flex items-center gap-5">
          <div className="bg-[#222] p-3 rounded-2xl text-accent">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight mb-1">{t('skill_tracks.online_safety.title')}</h3>
            <p className="text-gray-500 text-sm">Preview track</p>
          </div>
          <Zap size={20} className="ml-auto text-accent fill-accent" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="grid grid-cols-3 gap-4 mb-20 border-t border-gray-800 pt-10">
        <div className="text-center">
          <div className="text-2xl font-black mb-1">{t('landing.stats.tracks').split(' ')[0]}</div>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{t('landing.stats.tracks').split(' ').slice(1).join(' ')}</div>
        </div>
        <div className="text-center border-x border-gray-800">
          <div className="text-2xl font-black mb-1">{t('landing.stats.lessons').split(' ')[0]}</div>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{t('landing.stats.lessons').split(' ').slice(1).join(' ')}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black mb-1">{t('landing.stats.languages').split(' ')[0]}</div>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{t('landing.stats.languages').split(' ').slice(1).join(' ')}</div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="mt-auto pt-6 flex flex-col gap-4">
        <Link href="/home" className="w-full bg-accent text-black font-black py-5 rounded-[2rem] text-center text-lg active:scale-95 transition-all shadow-lg shadow-accent/10">
          {t('landing.cta')}
        </Link>
        <button className="text-gray-500 text-sm font-medium hover:text-white transition-colors">
          {t('landing.sign_in')}
        </button>
      </div>
    </div>
  );
}
