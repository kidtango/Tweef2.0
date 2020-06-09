import React, {
  lazy,
  Suspense,
  Fragment,
  ReactNode,
  ReactFragment,
  ComponentType
} from 'react';
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom';

interface RouteProps {
  exact?: boolean;
  guard?: ReactNode;
  path?: string;
  component?:
    | ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  layout?: ReactNode;
  routes?: { exact: boolean; path: string; component: () => any }[];
}

const routesConfig: RouteProps[] = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/home" />
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
