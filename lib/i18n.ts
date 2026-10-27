/**
 * 极简 i18n（零依赖）。
 *
 * 这个静态模板只用到一句标语，所以内置字典就够了。
 * 想扩展：
 *   1. 往 DICT 里加新 locale
 *   2. 往 SUPPORTED_LOCALES 里加一项（导航栏语言切换会自动出现）
 * 需要真正的多语言项目时，把 use-i18n 换成 next-intl / react-i18next，
 * useI18n().t('key') 的调用方式不用改。
 */

export type Locale = 'zh-CN' | 'en-US';

export const SUPPORTED_LOCALES: { code: Locale; label: string; shortLabel: string }[] = [
  { code: 'zh-CN', label: '简体中文', shortLabel: '中文' },
  { code: 'en-US', label: 'English', shortLabel: 'EN' },
];

const DICT: Record<Locale, Record<string, string>> = {
  'zh-CN': {
    'home.slogan': '一站式的产品与工具入口',
  },
  'en-US': {
    'home.slogan': 'Everything you need, in one place',
  },
};

export const defaultLocale: Locale = 'zh-CN';

/** 取词；缺 key 时回退到中文，再回退到 key 本身。 */
export function translate(locale: Locale, key: string): string {
  return DICT[locale]?.[key] ?? DICT[defaultLocale]?.[key] ?? key;
}
