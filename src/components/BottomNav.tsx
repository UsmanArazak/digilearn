'use client';

import { useTranslation } from 'react-i18next';
import { Home, Search, Target, User } from 'lucide-react';

export default function BottomNav() {
  const { t } = useTranslation('common');

  return (
    <div className="fixed bottom-0 w-full max-w-[430px] bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-3xl pb-safe z-50">
      <nav className="flex justify-around items-center p-4">
        <button className="flex flex-col items-center gap-1 text-black">
          <div className="bg-accent p-2 rounded-full">
            <Home size={24} />
          </div>
          <span className="text-xs font-semibold">{t('nav.home')}</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <div className="p-2">
            <Search size={24} />
          </div>
          <span className="text-xs font-medium">{t('nav.search')}</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <div className="p-2">
            <Target size={24} />
          </div>
          <span className="text-xs font-medium">{t('nav.progress')}</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <div className="p-2">
            <User size={24} />
          </div>
          <span className="text-xs font-medium">{t('nav.profile')}</span>
        </button>
      </nav>
    </div>
  );
}
