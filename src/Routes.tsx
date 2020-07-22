import React, {
  lazy,
  Suspense,
  Fragment,
  ReactNode,
  ComponentType,
  LazyExoticComponent
} from "react";
import { Switch, Redirect, Route, RouteComponentProps } from "react-router-dom";
import DashboardLayout from "layouts/DashboardLayout";
import AuthGuard from "components/AuthGuard";

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
    guard?: ReactNode;
    component?:
      | ComponentType<RouteComponentProps<any>>
      | LazyExoticComponent<ComponentType<any>>;
  }[];
}

const routesConfig: RouteProps[] = [
  {
    exact: true,
    path: "/login",
    component: lazy(() => import("views/auth/loginView"))
  },
  {
    path: "/",
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: "/",
        component: () => <Redirect to="/app/market" />
      },

      {
        exact: true,
        path: "/app/market",
        component: lazy(() => import("views/market/LivestockBrowseView"))
      },
      {
        exact: true,
        path: "/app/market/itemDetail/:livestockId",
        component: lazy(() => import("views/market/LivestockDetailsView"))
      },
      {
        exact: true,
        guard: AuthGuard,
        path: "/app/market/listItem",
        component: lazy(() => import("views/market/LivestockCreateView"))
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
