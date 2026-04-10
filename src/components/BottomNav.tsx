'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Home, Target, User } from 'lucide-react';

export default function BottomNav() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === '/home';
  const isProgress = pathname === '/progress';

  return (
    <div className="fixed bottom-0 w-full max-w-[430px] bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-3xl pb-safe z-50">
      <nav className="flex justify-around items-center p-4">
        <button
          type="button"
          onClick={() => router.push('/home')}
          className={['flex flex-col items-center gap-1', isHome ? 'text-black' : 'text-gray-400'].join(' ')}
        >
          <div className={[isHome ? 'bg-accent' : 'bg-transparent', 'p-2 rounded-full'].join(' ')}>
            <Home size={24} />
          </div>
          <span className={['text-xs', isHome ? 'font-semibold' : 'font-medium'].join(' ')}>{t('nav.home')}</span>
        </button>
        <button
          type="button"
          onClick={() => router.push('/progress')}
          className={['flex flex-col items-center gap-1', isProgress ? 'text-black' : 'text-gray-400'].join(' ')}
        >
          <div className={[isProgress ? 'bg-accent' : 'bg-transparent', 'p-2 rounded-full'].join(' ')}>
            <Target size={24} />
          </div>
          <span className={['text-xs', isProgress ? 'font-semibold' : 'font-medium'].join(' ')}>{t('nav.progress')}</span>
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
