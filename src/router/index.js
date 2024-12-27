import Router from 'vue-router';
import Vue from 'vue';
import HelloWorldVue from '../components/HelloWorld.vue';

Vue.use(Router)
export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: HelloWorldVue
		}
	]
})