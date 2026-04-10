'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Bell } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { LATEST_UPDATE_ID, UPDATES_LAST_SEEN_STORAGE_KEY } from '@/data/updates';

export default function Header() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [hasUnseen, setHasUnseen] = useState(false);

  useEffect(() => {
    const compute = () => {
      if (!LATEST_UPDATE_ID) {
        setHasUnseen(false);
        return;
      }

      const lastSeen = localStorage.getItem(UPDATES_LAST_SEEN_STORAGE_KEY);
      setHasUnseen(lastSeen !== LATEST_UPDATE_ID);
    };

    compute();
    window.addEventListener('digilearn_update_seen', compute);
    return () => window.removeEventListener('digilearn_update_seen', compute);
  }, []);

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
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push('/updates')}
          className="relative inline-flex items-center justify-center rounded-2xl bg-white border border-gray-100 shadow-sm h-10 w-10 hover:bg-gray-50 transition-colors"
          aria-label={t('header.updates')}
        >
          <Bell size={18} className="text-gray-800" />
          {hasUnseen && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />}
        </button>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
