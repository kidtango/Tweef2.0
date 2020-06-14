import React, {
  lazy,
  Suspense,
  Fragment,
  ReactNode,
  ComponentType,
  LazyExoticComponent
} from 'react';
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom';
import DashboardLayout from 'layouts/DashboardLayout';

interface RouteProps {
  exact?: boolean;
  guard?: ReactNode;
  path?: string;
  component?:
    | ComponentType<RouteComponentProps<any>>
    | LazyExoticComponent<ComponentType<any>>;
  layout?: ReactNode;
  routes?: {
    exact?: boolean;
    path?: string;
    component?:
      | ComponentType<RouteComponentProps<any>>
      | LazyExoticComponent<ComponentType<any>>;
  }[];
}

const routesConfig: RouteProps[] = [
  {
    path: '/app',
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/market" />
      },
      {
        exact: true,
        path: '/app/market',
        component: lazy(() => import('views/market/MarketBrowseView'))
      }
    ]
  }
];

const renderRoutes = (routes: RouteProps[]) =>
  routes ? (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {routes.map((route: RouteProps, i) => {
          const Guard: any = route.guard || Fragment;
          const Layout: any = route.layout || Fragment;
          const Component: any = route.component;

          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  ) : null;

const Routes = () => {
  return renderRoutes(routesConfig);
};

export default Routes;
