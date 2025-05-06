import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const en = require('./en.json');
const pt = require('./pt.json');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    lng: 'pt', // Define o idioma padrão como português
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
