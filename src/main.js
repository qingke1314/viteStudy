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
