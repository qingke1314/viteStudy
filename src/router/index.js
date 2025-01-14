import Router from 'vue-router';
import Vue from 'vue';
import Cookies from 'js-cookie';

Vue.use(Router);
// 模拟获取用户登录状态的函数
function isLogin() {
  return ![null, undefined].includes(Cookies.get('access_token'));
}

const router = new Router({
	routes: [
		{
			path: '/',
			redirect: '/home',
			component: () => import('@/components/BasicLayout/index.vue'),
			children: [
				{
					path: '/home',
					component: () => import('@/components/HelloWorld.vue')
				},
				{
					path: '/any',
					component: () => import('@/components/HelloWorld.vue')
				},{
					path: '/vueTest',
					component: () => import('@/views/test/vueTest.vue')
				}
			],
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('@/views/login/index.vue'),
		},
	]
});
router.beforeEach((to, _from, next) => {
	if(to.path !== '/login' && !isLogin()) {
		next('/login');
	} else if(to.path === '/login' && isLogin()) {
		next('/home');
	} else {
		next();
	}
});
export default router;