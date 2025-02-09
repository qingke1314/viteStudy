import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import VueRouter from 'vue-router';
import { Button } from 'element-ui';

Vue.component(Button.name, Button);
Vue.use(VueRouter);
new Vue({
  render: h => h(App),
  router
}).$mount('#app');
