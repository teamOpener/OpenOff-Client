import { NativeModules, Platform } from 'react-native';
import i18n from 'i18next';

export const getLocale = (): string => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;
};

export const changeLanguage = async (locale: string) => {
  try {
    await i18n.changeLanguage(locale.substring(0, 2));
  } catch (e) {
    console.warn(e);
  }
};
