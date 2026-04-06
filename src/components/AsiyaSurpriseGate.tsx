'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SURPRISE_SEEN_KEY = 'digilearn_surprise_seen';
const VALID_NAMES = ['asiya', 'aseeyah'];

function normalizeName(input: string) {
  return input.trim().toLowerCase();
}

type Phase = 'checking' | 'prompt' | 'reveal' | 'normal';

function makeConfettiPieces() {
  // Runs only in client-side effects to avoid hydration issues.
  const pieces = Array.from({ length: 26 }).map((_, i) => {
    const leftPct = 42 + Math.random() * 16; // cluster near center
    const delayMs = Math.random() * 120;
    const durationMs = 700 + Math.random() * 500;
    const size = 6 + Math.random() * 8;
    const topPct = 44 + Math.random() * 8;
    // Slight variety in shape.
    const isSquare = i % 2 === 0;
    return { id: i, leftPct, delayMs, durationMs, size, topPct, isSquare };
  });
  return pieces;
}

export default function AsiyaSurpriseGate({ children }: { children: ReactNode }) {
  const { t } = useTranslation('common');

  const [phase, setPhase] = useState<Phase>('checking');
  const [name, setName] = useState('');
  const [typedNameForUi, setTypedNameForUi] = useState<string>('');
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const [confettiSeed, setConfettiSeed] = useState(0);

  const validNormalized = useMemo(() => VALID_NAMES, []);

  const confettiPieces = useMemo(
    () => (phase === 'reveal' ? makeConfettiPieces() : []),
    [phase]
  );

  useEffect(() => {
    try {
      const seen = localStorage.getItem(SURPRISE_SEEN_KEY);
      if (seen === '1') {
        setPhase('normal');
      } else {
        setPhase('prompt');
      }
    } catch {
      // If localStorage is unavailable, fail open and show landing.
      setPhase('normal');
    }
  }, []);

  useEffect(() => {
    if (phase !== 'reveal') return;
    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem(SURPRISE_SEEN_KEY, '1');
      } catch {
        // ignore
      }
      setPhase('normal');
    }, 2400);

    return () => window.clearTimeout(timer);
  }, [phase]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizeName(name);
    const pretty = name.trim();
    setTypedNameForUi(pretty);

    if (validNormalized.includes(normalized)) {
      setFallbackVisible(false);
      setConfettiSeed((s) => s + 1);
      setPhase('reveal');
      return;
    }

    setFallbackVisible(true);
  };

  if (phase === 'checking') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-off-white">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (phase === 'normal') {
    return <>{children}</>;
  }
  const revealMessage = t('surprise.reveal.title');
  const revealSubtitle = t('surprise.reveal.subtitle', { name: typedNameForUi || name.trim() });

  return (
    <div className="relative min-h-screen">
      {/* Background veil to keep the focus on the surprise. */}
      <div className="fixed inset-0 bg-off-white/80 backdrop-blur-[2px] z-50" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        {phase === 'prompt' && (
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-lg border border-gray-50 p-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles size={20} className="text-accent" />
              <p className="text-sm font-extrabold text-gray-900">{t('surprise.prompt.title')}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="text-sm font-bold text-gray-700" htmlFor="surpriseName">
                {t('surprise.prompt.label')}
              </label>
              <input
                id="surpriseName"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setFallbackVisible(false);
                }}
                className="w-full bg-light-bg p-4 rounded-2xl shadow-sm border border-gray-100 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-400 font-medium"
                placeholder={t('surprise.prompt.placeholder')}
                autoComplete="off"
              />

              {typedNameForUi && (
                <p className="text-sm text-gray-600 font-semibold">
                  {t('surprise.prompt.greeting', { name: typedNameForUi })}
                </p>
              )}

              {fallbackVisible && (
                <p className="text-sm text-gray-800 font-extrabold">
                  {t('surprise.prompt.fallback')}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-accent text-gray-900 font-extrabold py-4 rounded-2xl text-lg active:scale-95 transition-transform"
              >
                {t('surprise.prompt.continue')}
              </button>
            </form>
          </div>
        )}

        {phase === 'reveal' && (
          <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-gray-50 p-6 relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-xl" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-xl" />

            {/* Hearts & sparkles */}
            <div className="relative flex items-center justify-center mb-4">
              <Heart size={42} className="text-accent animate-float" fill="currentColor" />
            </div>

            <div className="relative z-10">
              <p className="text-sm uppercase tracking-widest font-extrabold text-gray-400 mb-1">
                {t('surprise.reveal.kicker')}
              </p>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight">{revealMessage}</h2>
              <p className="text-sm text-gray-600 font-semibold">{revealSubtitle}</p>
            </div>

            {/* Confetti burst (pure CSS via inline styles, no extra dependencies). */}
            <div className="pointer-events-none absolute inset-0">
              {confettiPieces.map((p) => (
                <span
                  key={`${confettiSeed}-${p.id}`}
                  style={{
                    position: 'absolute',
                    left: `${p.leftPct}%`,
                    top: `${p.topPct}%`,
                    width: `${p.size}px`,
                    height: `${p.size * (p.isSquare ? 1 : 0.6)}px`,
                    backgroundColor: 'rgba(204, 255, 0, 1)',
                    borderRadius: p.isSquare ? '2px' : '999px',
                    opacity: 0.95,
                    animation: `digilearnConfetti ${p.durationMs}ms ease-out ${p.delayMs}ms forwards`,
                    transform: `translate(0px, 0px) rotate(0deg)`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes digilearnConfetti {
          0% {
            transform: translate(0px, 0px) rotate(0deg);
            opacity: 0.95;
          }
          100% {
            transform: translate(${Math.round(-10)}px, ${Math.round(-120)}px) rotate(${Math.round(180)}deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

