import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nextPlugin } from 'translation-check';

import { en } from './locales/en';
import { ru } from './locales/ru';

const resources = {
  en,
  ru,
};

i18n
  .use(i18nextPlugin)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
  .then();

export default i18n;
