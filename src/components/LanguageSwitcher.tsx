'use client';

import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation('common');

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ha' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm text-sm font-bold border border-gray-100 active:scale-95 transition-all"
    >
      <Globe size={16} />
      <span>{t('header.lang_toggle')}</span>
    </button>
  );
}
