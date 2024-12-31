import Vue from 'vue';
import './globalConfig.js';
import App from './App.vue';
import router from './router/index';
import store from './store';
import i18n from './i18n/index';
import './css/index.scss';
import './theme.js';
import './font.js';

Vue.prototype.$ELEMENT = { size: 'small' };
new Vue({
  render: h => h(App),
	router,
  store,
  i18n
}).$mount('#app');
