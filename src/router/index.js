import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);
// 模拟获取用户登录状态的函数
function isLogin() {
	return true;
  // return sessionStorage.getItem('token') !== null;
}
export default new Router({
	routes: [
		{
			path: '/',
			redirect: to => {
				if(isLogin()) {
					return '/home';
				} else {
					return '/login';
				}
			},
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('@/views/login/index.vue')
		},
		{
			path: '/home',
			name: 'Home',
			component: () => import('@/components/BasicLayout/index.vue'),
			children: [
				{
					path: '/test',
					component: () => import('@/components/HelloWorld.vue')
				}
			]
		},
	]
})