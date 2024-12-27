import VueI18n from 'vue-i18n';
import Vue from 'vue';
import zh from './locales/zh.json';

/**
 * 注册国际化
 */
Vue.use(VueI18n);
/**
 * 初始语言包，默认加载中文
 */
const messages = { zh };
/**
 * 加载语言包
 * 没有加载时才加载，避免初始化就大量加载
 * @param {*} locale 语种
 * @returns void
 */
const loadLocaleMessage = async (locale) => {
  if(!messages[locale]){
    const langModule = await import(`./locales/${locale}.json`);
    messages[locale] = langModule.default;
  };
  return messages[locale];
};
/**
 * 新建i18n实例
 */
const i18n = new VueI18n({
  locale: 'zh',
  messages
});
/**
 * 设置多语言
 * 根据语种加载对应语言包，通过i8n实例的setLocaleMessage设置语言包，然后更改语种
 * @param {*} language 语种
 */
Vue.prototype.$setLocale = async (language) => {
  const messages = await loadLocaleMessage(language);
  i18n.setLocaleMessage(language, messages);
  i18n.locale = language;
};
/**
 * 获取当前语种
 * @returns 当前语种
 */
Vue.prototype.$getLocale = () => i18n.locale;
export default i18n;