import I18n from 'i18n-s';
import { getLanguage, getI18nData } from './site';

const language = getLanguage();
const i18nData = getI18nData();
const i18n = new I18n({
  log: process.env.NODE_ENV === 'development',
  // log: false,
});

i18n.setLocale(language);
i18n.setLocaleData(language, i18nData);

const __ = i18n.__.bind(i18n);

export { __, language };
