import Vue from 'vue';
import './js/theme.js';
import './js/globalConfig.js';
import App from './App.vue';
import router from './router/index';
import store from './store';
import i18n from './i18n/index';
import './css/index.css';
import './js/font.js';
import './js/elementUi.js';

Vue.prototype.$ELEMENT = { size: 'small' };
new Vue({
  render: h => h(App),
	router,
  store,
  i18n
}).$mount('#app');

/**
 * 开发手册：
 * 1、按需引入：unplugin-vue-components/vite库
 *            他会解析模板，自动导入对应组件和样式
 * 2、主题：拷贝element-ui中的组件样式，将颜色改为变量模式，初始化项目时根据配置设置变量值，
 *          并定义方法，改变配置时更新变量值。然后修改unplugin-vue-components/vite的解析路径为自己拷贝的；
 */