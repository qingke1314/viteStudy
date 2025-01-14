import Vue from 'vue';
/**
 * 主题
 */
const theme = {
  normal: `:root {
    --primaryColor: rgba(64, 160, 255);
    --primaryColor90: rgba(64, 160, 255, 0.9);
    --primaryColor30: rgba(64, 160, 255, 0.3);
    --fillColor: rgba(64, 160, 255, 0.1);
    --primaryColorDeep: rgb(49, 160, 255);
  }`,
  red: `:root {
    --primaryColor: rgba(255, 0, 0);
    --primaryColor90: rgba(255, 0, 0, 0.9);
    --primaryColor30: rgba(255, 0, 0, 0.3);
    --fillColor: rgba(255, 0, 0, 0.1);
    --primaryColorDeep: rgb(233 0 0);
  }`
};
/**
 * 更改主题
 * @param {*} type
 */
const changeTheme = (type) => {
  const old = document.getElementById('rootStyle');
  if(old) {
    old.parentNode.removeChild(old);
  }
  const rootStyle = document.createElement('style');
  rootStyle.setAttribute('id', 'rootStyle');
  if(rootStyle.styleSheet) {
    rootStyle.styleSheet.cssText = theme[type];
  } else {
    rootStyle.appendChild(document.createTextNode(theme[type]));
  }
  document.getElementsByTagName('head')[0].appendChild(rootStyle);
};
const themeType = window.globalConfig ? window.globalConfig.themeType : 'red';
changeTheme(themeType);
Vue.prototype.$_changeTheme = (type) => {
  changeTheme(type);
};
