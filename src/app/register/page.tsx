'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Register() {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [language, setLanguage] = useState<'en' | 'ha'>(i18n.language === 'ha' ? 'ha' : 'en');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setError(t('auth.errors.fill_all'));
      return;
    }

    const userData = {
      name,
      phone,
      language,
      createdAt: new Date().toISOString(),
    };

    register(userData);
    i18n.changeLanguage(language);
    router.push('/home');
  };

  return (
    <div className="bg-off-white min-h-screen p-6 flex flex-col animate-fade-in">
      <header className="mb-10">
        <Link href="/" className="flex items-center gap-2 text-gray-500 font-bold hover:text-gray-900 transition-colors inline-flex">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-black mt-6 tracking-tight">{t('auth.create_account')}</h1>
      </header>

      <form onSubmit={handleRegister} className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-black mb-2 text-gray-900 uppercase tracking-wider">
            {t('auth.full_name')}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-300 font-medium"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-black mb-2 text-gray-900 uppercase tracking-wider">
            {t('auth.phone_number')}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-gray-300 font-medium"
            placeholder="080 123 4567"
          />
        </div>

        <div>
          <label className="block text-sm font-black mb-2 text-gray-900 uppercase tracking-wider">
            {t('auth.select_language')}
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`flex-1 p-4 rounded-2xl font-black text-sm transition-all ${
                language === 'en' ? 'bg-black text-white' : 'bg-white text-gray-400 border border-gray-100'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ha')}
              className={`flex-1 p-4 rounded-2xl font-black text-sm transition-all ${
                language === 'ha' ? 'bg-black text-white' : 'bg-white text-gray-400 border border-gray-100'
              }`}
            >
              Hausa
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm font-bold animate-shake">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-accent text-black font-black py-5 rounded-2xl text-lg mt-4 shadow-xl shadow-accent/10 active:scale-95 transition-all"
        >
          {t('auth.create_account')}
        </button>
      </form>
    </div>
  );
}
