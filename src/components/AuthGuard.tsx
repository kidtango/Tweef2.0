import React, { ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useSnackbar } from 'notistack';
import history from 'utils/history';

interface AuthGuardProps {
  children: ReactElement;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  //Todo: add real user data with Auth0
  const { user, loginWithRedirect } = useAuth0();
  const { enqueueSnackbar } = useSnackbar();

  if (!user) {
    loginWithRedirect();
    return <Redirect to="/" />;
  }

  return children;
};

export default AuthGuard;
