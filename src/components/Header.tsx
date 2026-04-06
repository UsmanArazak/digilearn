'use client';

import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation('common');

  return (
    <header className="flex items-center justify-between p-4 bg-off-white sticky top-0 z-10 w-full mb-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
           <div className="w-4 h-4 bg-accent rounded-sm rotate-45"></div>
        </div>
        <h1 className="text-xl font-black tracking-tighter text-gray-900">
          {t('header.title')}
        </h1>
      </div>
      <LanguageSwitcher />
    </header>
  );
}
