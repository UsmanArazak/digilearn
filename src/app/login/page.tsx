'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Login() {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const { login } = useAuth();

  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError(t('auth.errors.fill_all'));
      return;
    }

    const success = login(phone);
    if (success) {
      const savedUser = localStorage.getItem('digilearn_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        i18n.changeLanguage(parsedUser.language);
      }
      router.push('/home');
    } else {
      setError(t('auth.errors.no_account'));
    }
  };

  return (
    <div className="bg-off-white min-h-screen p-6 flex flex-col animate-fade-in">
      <header className="flex justify-between items-center mb-10">
        <Link href="/" className="flex items-center gap-2 text-gray-500 font-bold hover:text-gray-900 transition-colors inline-flex">
          <ArrowLeft size={20} />
        </Link>
        <LanguageSwitcher />
      </header>

      <h1 className="text-3xl font-black mb-8 tracking-tight">{t('auth.sign_in')}</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-black mb-2 text-gray-900 uppercase tracking-wider">
            {t('auth.phone_number')}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-300 font-medium"
            placeholder={t('auth.placeholders.phone')}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm font-bold animate-shake">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-accent text-black font-black py-5 rounded-2xl text-lg mt-4 shadow-xl shadow-accent/10 active:scale-95 transition-all"
        >
          {t('auth.sign_in')}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-400 font-bold text-sm">
           {t('auth.no_account')} <Link href="/register" className="text-gray-900">{t('auth.create_account')}</Link>
        </p>
      </div>
    </div>
  );
}
