import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from 'locales/ko.json';
import en from 'locales/en.json';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';
import { getLocale, changeLanguage } from 'services/locale';

const locale = getLocale();
const dayjsLocale = locale.startsWith('ko') ? 'ko' : 'en';

dayjs.locale(dayjsLocale);

i18n
  .use(initReactI18next)
  .init({
    lng: locale,
    fallbackLng: 'en',
    supportedLngs: ['ko', 'en'],
    compatibilityJSON: 'v3',
    defaultNS: 'ns1',
    resources: {
      en: {
        ns1: en,
      },
      ko: {
        ns1: ko,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    changeLanguage(locale.substring(0, 2));
  });

export default i18n;
