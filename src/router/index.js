import Router from 'vue-router';
import Vue from 'vue';
import Cookies from 'js-cookie';

Vue.use(Router);
// 模拟获取用户登录状态的函数
function isLogin() {
	console.log(Cookies.get('access_token'), 'xc');
  return ![null, undefined].includes(Cookies.get('access_token'));
}

const router = new Router({
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
			component: () => import('@/views/login/index.vue'),
		},
		{
			path: '/home',
			name: 'Home',
			component: () => import('@/components/BasicLayout/index.vue'),
			children: [
				{
					path: '/',
					component: () => import('@/components/HelloWorld.vue')
				}
			],
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