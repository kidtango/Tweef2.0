import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';

interface AuthRouteProps {
  component: any;
  render: (value: ReactNode) => any;
}

const AuthRoute: React.FC<AuthRouteProps> = ({
  component: Component,
  render,
  ...rest
}) => {
  const account = { user: 'Scott' };

  if (!account.user) {
    return <Redirect to="/login" />;
  }

  return render ? render({ ...rest }) : <Component {...rest} />;
};
export default AuthRoute;
