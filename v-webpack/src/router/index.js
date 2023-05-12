import Vue from 'vue'
import Router from 'vue-router'
import tools from './tools'
const { dynamicImport } = tools // 组件懒加载

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'BASE_LAYOUT',
      component: dynamicImport('components/baseLayout'),
      children: [
        {
          path: '/home',
          name: 'Home',
          component: dynamicImport('components/home/index')
        }
      ]
    },
    {
      path: '/java',
      name: 'java',
      component: dynamicImport('components/baseLayout'),
      children: [
        {
          path: '/java/dataType',
          name: 'dataType',
          component: dynamicImport('modules/java/datatype/index'),
        },
        {
          path: '/java/methods',
          name: 'methods',
          component: dynamicImport('modules/java/methods/index'),
        }
      ]
    },
    {
      path: '/operate',
      name: 'operate',
      component: dynamicImport('components/baseLayout'),
      children: [
        {
          path: '/operate/withThis',
          name: 'withThis',
          component: dynamicImport('modules/operate/withThis/index'),
        },
        {
          path: '/operate/mark',
          name: 'mark',
          component: dynamicImport('modules/operate/mark/index'),
        }
      ]
    },
    {
      path: '/404',
      name: 'notFount',
      component: dynamicImport('components/notFount/notFound')
    }
  ]
})
