import { lazy } from './util';
import FormatRoutes from '@/router/util';
import BaseLayout from '@/layout/BaseLayout/index';
const NotFound = lazy(() => import('@/layout/NotFound/index'));
const LevelTitle = lazy(() => import('@/packages/ContextStudy/index.jsx'));
const Task = lazy(() => import('@/packages/ContextAndReducer/TaskApp.jsx'));
const Memo = lazy(() => import('@/packages/EffectStudy/index.jsx'));
const WarnWord = lazy(() => import('@/packages/WarnWords/index.jsx'))
const UseState = lazy(() => import('@/packages/UseState/index.jsx'))
const onlyOffice = lazy(() => import('@/packages/OnlyOffice/index.jsx'))

const routes = [
  {
    path: '/*',
    exact: true,
    component: BaseLayout,
    children: [
      {
        path: 'reducer/*',
        exact: true,
        children: [
          {
            path: 'task',
            component: Task,
          },
          {
            path: 'levelTitle',
            component: LevelTitle
          }
        ]
      },
      {
        path: 'hook/*',
        exact: true,
        children: [
          {
            path: 'memo',
            component: Memo
          }
        ]
      },
      {
        path: 'warnWord',
        exact: true,
        component: WarnWord
      },
      {
        path: 'useState',
        exact: true,
        component: UseState
      },
      {
        path: 'onlyOffice',
        exact: true,
        component: onlyOffice
      }
    ]
  },
  {
    path: '/404',
    exact: true,
    component: NotFound
  }
]

const IFormatRoutes = ({ fallback }) => {
  return <FormatRoutes routes={routes} fallback={fallback}>
  </FormatRoutes>
}

export default IFormatRoutes