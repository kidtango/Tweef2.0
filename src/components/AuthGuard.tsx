import React, { Children, ReactNode, ReactElement } from 'react';
import { Redirect } from 'react-router-dom';

interface AuthGuardProps {
  children: ReactElement;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  //Todo: add real user data with Auth0
  const account = {
    user: 'scott'
  };

  if (!account.user) {
    return <Redirect to="/login" />;
  }

  return children;
};

export default AuthGuard;
