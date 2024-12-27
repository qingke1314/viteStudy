import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import i18n from './i18n/index';

new Vue({
  render: h => h(App),
	router,
  i18n
}).$mount('#app');
