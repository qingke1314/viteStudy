export const items = [
  {
    label: '首页',
    key: '/',
    icon: '',
    path: '/'
  },
  {
    label: '关于reducer和context',
    key: '/reducer',
    icon: '',
    path: '/reducer',
    children: [
      {
        label: '任务列表',
        key: '/reducer/task',
        icon: '',
        path: '/reducer/task'
      },
      {
        label: '层级title',
        key: '/reducer/levelTitle',
        icon: '',
        path: '/reducer/levelTitle'
      }
    ],
  },
  {
    label: '关于hook',
    key: '/hook',
    icon: '',
    path: '/hook',
    children: [
      {
        label: '关于memo',
        key: '/hook/memo',
        icon: '',
        path: '/hook/memo',
      }
    ],
  },
  {
    label: '敏感词指令',
    key: '/warnWord',
    icon: '',
    path: '/warnWord',
  },
  {
    label: 'demo自测',
    key: '/useState',
    icon: '',
    path: '/useState',
  },
  {
    label: 'onlyOffice嵌入组件',
    key: '/onlyOffice',
    icon: '',
    path: '/onlyOffice',
  }
]