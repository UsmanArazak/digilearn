'use client';

import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function Header() {
  const { t, i18n } = useTranslation('common');

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ha' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-off-white sticky top-0 z-10 w-full mb-4">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        {t('header.title')}
      </h1>
      <button 
        onClick={toggleLanguage}
        className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm text-sm font-semibold border border-gray-100 active:scale-95 transition-transform"
      >
        <Globe size={16} />
        {t('header.lang_toggle')}
      </button>
    </header>
  );
}
