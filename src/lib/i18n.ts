import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '../locales/en/common.json';
import haCommon from '../locales/ha/common.json';

const resources = {
  en: { common: enCommon },
  ha: { common: haCommon }
};

if (!i18n.isInitialized) {
  const savedLng = typeof window !== 'undefined' ? localStorage.getItem('digilearn_language') : 'en';
  
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: savedLng || 'en',
      fallbackLng: 'en',
      ns: ['common'],
      defaultNS: 'common',
      interpolation: {
        escapeValue: false // react already safes from xss
      }
    });

  // Keep localStorage in sync with language changes
  i18n.on('languageChanged', (lng) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('digilearn_language', lng);
    }
  });
}

export default i18n;
