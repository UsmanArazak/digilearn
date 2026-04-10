'use client';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { AuthGuard } from '@/components/AuthGuard';
import { COMING_SOON, UPDATES } from '@/data/updates';

type UpdatesTab = 'whats_new' | 'coming_soon';

export default function UpdatesPage() {
  const { t } = useTranslation('common');
  const [tab, setTab] = useState<UpdatesTab>('whats_new');

  const updates = useMemo(() => UPDATES, []);
  const comingSoon = useMemo(() => COMING_SOON, []);

  return (
    <AuthGuard>
      <div className="bg-off-white min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 px-4 pb-28">
          <section className="mt-2 mb-5">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">
              {t('updates.page.title')}
            </h1>
            <p className="text-base text-gray-600 font-medium leading-relaxed">
              {t('updates.page.subtitle')}
            </p>
          </section>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-1 mb-5">
            <div className="grid grid-cols-2">
              <button
                type="button"
                onClick={() => setTab('whats_new')}
                className={[
                  'rounded-2xl px-4 py-3 text-sm font-extrabold transition-colors',
                  tab === 'whats_new' ? 'bg-off-white text-gray-900' : 'text-gray-500 hover:text-gray-700',
                ].join(' ')}
              >
                <span className="inline-flex items-center gap-2">
                  {t('updates.tabs.whats_new')}
                  {tab === 'whats_new' && <span className="h-1 w-8 bg-accent rounded-full" aria-hidden="true" />}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setTab('coming_soon')}
                className={[
                  'rounded-2xl px-4 py-3 text-sm font-extrabold transition-colors',
                  tab === 'coming_soon' ? 'bg-off-white text-gray-900' : 'text-gray-500 hover:text-gray-700',
                ].join(' ')}
              >
                <span className="inline-flex items-center gap-2">
                  {t('updates.tabs.coming_soon')}
                  {tab === 'coming_soon' && <span className="h-1 w-8 bg-accent rounded-full" aria-hidden="true" />}
                </span>
              </button>
            </div>
          </div>

          {tab === 'whats_new' ? (
            <section className="space-y-3">
              {updates.map((u) => (
                <div key={u.id} className="bg-white rounded-2xl border border-gray-50 shadow-sm p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="inline-flex items-center gap-2">
                      <span className="inline-flex items-center bg-light-bg border border-gray-100 rounded-full px-3 py-1 text-xs font-extrabold text-gray-900">
                        {u.version}
                      </span>
                      <span className="text-xs font-bold text-gray-400">{u.date}</span>
                    </div>
                  </div>
                  <h2 className="text-base font-extrabold text-gray-900 mb-1">{t(u.titleKey)}</h2>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">{t(u.descriptionKey)}</p>
                </div>
              ))}
            </section>
          ) : (
            <section className="space-y-3">
              {comingSoon.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl border border-gray-50 shadow-sm p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="inline-flex items-center bg-accent rounded-full px-3 py-1 text-xs font-extrabold text-black">
                      {t(c.badgeKey)}
                    </span>
                  </div>
                  <h2 className="text-base font-extrabold text-gray-900 mb-1">{t(c.titleKey)}</h2>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">{t(c.descriptionKey)}</p>
                </div>
              ))}
            </section>
          )}
        </main>

        <BottomNav />
      </div>
    </AuthGuard>
  );
}

