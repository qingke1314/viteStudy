import { lazy as reactLazy, Suspense } from 'react';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

const IRenderCompWithNoChildren = ({ RouteComponent, fallback, ...others }) => {
  return (
    <Suspense fallback={fallback || <div>loading</div>}>
      <RouteComponent {...others} />
    </Suspense>
  );
};
const FormatRoutes = ({ routes, fallback }) => {
  return (
    <Routes>
      { routes.map((route, id) => {
        const { children } = route;
        if(!children) {
          if(route.redirect) {
            const { redirect, ...others } = route;
            return <Route key={id} path={route.path} element={<Navigate to={redirect} {...others} />} />
          } else {
            const { component: RouteComponent, ...others } = route;
            if (RouteComponent) {
              // Suspense用于实现懒加载
              const RenderComponent = <IRenderCompWithNoChildren RouteComponent={RouteComponent} fallback={fallback} />;
              return (
                <Route key={id} {...others} element={RenderComponent} />
              );
            } else {
              console.error('[Router] component is required when config routes');
              return null;
            }
          }
        } else {
          const { component: LayoutComponent, children = [], ...others } = route;
          const IRenderComp = LayoutComponent
          ? (
            <LayoutComponent>
              <FormatRoutes routes={children} fallback={fallback} />
            </LayoutComponent>
          )
          : <FormatRoutes routes={children} fallback={fallback} />;
          return (
            <Route
              key={id}
              element={IRenderComp}
              { ...others }
            />
          )
        }
      }) }
    </Routes>
  )
}

export function lazy(dynamicImport, isRouteComponent) {
  if (isRouteComponent) {
    return {
      __LAZY__: true,
      dynamicImport,
    };
  } else {
    return reactLazy(dynamicImport);
  }
}
export default FormatRoutes;
