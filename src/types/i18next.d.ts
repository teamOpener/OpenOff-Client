import 'i18next';
import ko from 'locales/ko.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1';
    resources: {
      ns1: typeof ko;
    };
  }
}
