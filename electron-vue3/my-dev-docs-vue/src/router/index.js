import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home', // 稍后可以改为默认指向某个模块，例如日志
    component: () => import('../views/Home.vue'), // 暂时指向日志
  },
  {
    path: '/logs/add',
    name: 'PostsAdd',
    component: () => import('../views/Posts/LogsAdd/index.vue'),
  },
  {
    path: '/errors',
    name: 'Errors',
    component: () => import('../views/ErrorsView.vue'),
  },
  {
    path: '/configs',
    name: 'Configs',
    component: () => import('../views/ConfigsView.vue'),
  },
  {
    path: '/summaries',
    name: 'Summaries',
    component: () => import('../views/SummariesView.vue'),
  },
  {
    path: '/ideas',
    name: 'Ideas',
    component: () => import('../views/IdeasView/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(), // Electron 通常使用 Hash 模式
  routes,
});

export default router;
