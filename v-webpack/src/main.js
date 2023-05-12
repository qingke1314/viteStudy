// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import configFns from './config/index.js'
import warnWord from './directive/warnWord'
import './styles/index.scss'
import '../static/font_2050407_ajw0x839o37/iconfont.css'

Vue.config.productionTip = false
configFns.forEach(e => {
  e(Vue)
})
Vue.directive('warnWord', warnWord)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
