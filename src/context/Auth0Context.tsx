// src/react-auth0-spa.js
import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode
} from 'react';
import createAuth0Client, {
  Auth0ClientOptions,
  Auth0Client
} from '@auth0/auth0-spa-js';

const DEFAULT_REDIRECT_CALLBACK = (appState: any) =>
  window.history.replaceState({}, document.title, window.location.pathname);

interface Auth0ContextProps {
  isAuthenticated?: boolean;
  user?: any;
  authLoading?: boolean;
  popupOpen?: boolean;
  bearerToken?: string;
  loginWithPopup?: () => void;
  handleRedirectCallback?: () => void;
  getIdTokenClaims?: (...p: any) => void;
  loginWithRedirect?: (...p: any) => void;
  getTokenSilently?: (...p: any) => void;
  getTokensWithPopup?: (...p: any) => void;
  logout?: (...p: any) => void;
}

interface Auth0Props extends Auth0ClientOptions {
  children: ReactNode;
  initOptions?: Auth0ClientOptions;
  onRedirectCallback: (appState: any) => void;
}

export const Auth0Context = createContext<Auth0ContextProps>(
  {} as Auth0ContextProps
);

export const useAuth0 = () => useContext(Auth0Context);

export const Auth0Provider: React.FC<Auth0Props> = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState();

  const [auth0Client, setAuth0] = useState<Auth0Client>({} as Auth0Client);

  const [authLoading, setAuthLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [bearerToken, setbearerToken] = useState('');

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);

      setAuth0(auth0FromHook);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        console.log('appState', appState);
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();
      console.log('isAuthenticated', isAuthenticated);

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        const { __raw } = await auth0FromHook.getIdTokenClaims();
        setbearerToken(__raw);

        setUser(user);
      }

      setAuthLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client!.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client!.getUser();
    console.log('loginWithPopup -> user', user);
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setAuthLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setAuthLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        authLoading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        bearerToken,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokensWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
