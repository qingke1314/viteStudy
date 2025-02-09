import Router from 'vue-router';

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../components/home.vue'),
    },
  ]
});

export default router;