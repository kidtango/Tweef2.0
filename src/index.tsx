import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-quill/dist/quill.snow.css';
import SettingsContextProvider from 'context/SettingsContext';
import { restoreSettings } from 'utils/settings';
import { Auth0Provider } from '@auth0/auth0-react';
import history from 'utils/history';

// import { Auth0Provider } from './components/Auth/Auth';

const {
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_AUTH_CLIENT_ID,
  REACT_APP_AUTH0_AUDIENCE
} = process.env;

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState?: any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const settings = restoreSettings();

ReactDOM.render(
  <Auth0Provider
    domain={REACT_APP_AUTH_DOMAIN!}
    clientId={REACT_APP_AUTH_CLIENT_ID!}
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    audience={REACT_APP_AUTH0_AUDIENCE}
  >
    <SettingsContextProvider settings={settings!}>
      <App />
    </SettingsContextProvider>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
