import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '../locales/en/common.json';
import haCommon from '../locales/ha/common.json';

const resources = {
  en: { common: enCommon },
  ha: { common: haCommon }
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      ns: ['common'],
      defaultNS: 'common',
      interpolation: {
        escapeValue: false // react already safes from xss
      }
    });
}

export default i18n;
