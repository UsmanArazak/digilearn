'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { LATEST_UPDATE_ID, UPDATES, UPDATES_LAST_SEEN_STORAGE_KEY } from '@/data/updates';

export default function UpdatesPopup() {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const updates = UPDATES;

  useEffect(() => {
    if (!LATEST_UPDATE_ID || updates.length === 0) return;

    const lastSeen = localStorage.getItem(UPDATES_LAST_SEEN_STORAGE_KEY);
    if (lastSeen !== LATEST_UPDATE_ID) {
      setIsOpen(true);
      setActiveIndex(0);
    }
  }, [updates.length]);

  const closeAndMarkSeen = () => {
    try {
      if (LATEST_UPDATE_ID) {
        localStorage.setItem(UPDATES_LAST_SEEN_STORAGE_KEY, LATEST_UPDATE_ID);
        window.dispatchEvent(new Event('digilearn_update_seen'));
      }
    } finally {
      setIsOpen(false);
    }
  };

  const goNext = () => {
    if (activeIndex >= updates.length - 1) {
      closeAndMarkSeen();
      return;
    }
    setActiveIndex((v) => Math.min(v + 1, updates.length - 1));
  };

  if (!isOpen) return null;

  const current = updates[activeIndex];
  const isLast = activeIndex === updates.length - 1;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeAndMarkSeen}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[420px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">
        <button
          type="button"
          onClick={closeAndMarkSeen}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          aria-label={t('updates.popup.close')}
        >
          <X size={18} />
        </button>

        <div className="mb-4">
          <p className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">
            {t('updates.popup.whats_new')}
          </p>

          <div className="inline-flex items-center gap-2 bg-light-bg rounded-full px-3 py-1 border border-gray-100">
            <span className="text-xs font-extrabold text-gray-900">{current.date}</span>
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-gray-900 leading-tight mb-2">
          {t(current.titleKey)}
        </h3>
        <p className="text-base text-gray-600 font-medium leading-relaxed mb-6">
          {t(current.descriptionKey)}
        </p>

        <div className="flex items-center justify-center gap-2 mb-5">
          {updates.map((u, idx) => (
            <span
              key={u.id}
              className={[
                'h-2 w-2 rounded-full transition-all',
                idx === activeIndex ? 'bg-accent w-6' : 'bg-gray-300',
              ].join(' ')}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={closeAndMarkSeen}
            className="rounded-2xl bg-light-bg border border-gray-200 px-4 py-3 text-sm font-extrabold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {t('updates.popup.cancel')}
          </button>

          <button
            type="button"
            onClick={goNext}
            className="rounded-2xl bg-accent px-4 py-3 text-sm font-extrabold text-black hover:brightness-95 transition"
          >
            {isLast ? t('updates.popup.got_it') : t('updates.popup.next')}
          </button>
        </div>
      </div>
    </div>
  );
}
