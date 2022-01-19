import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nextPlugin } from 'translation-check';

import { en } from './locales/en';
import { ru } from './locales/ru';

const resources = {
  en: {
    buttons: en.buttons,
    dialogs: en.dialogs,
    glossary: en.glossary,
    placeholders: en.placeholders,
    validation: en.validation,
  },
  ru: {
    buttons: ru.buttons,
    dialogs: ru.dialogs,
    glossary: ru.glossary,
    placeholders: ru.placeholders,
    validation: ru.validation,
  },
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
