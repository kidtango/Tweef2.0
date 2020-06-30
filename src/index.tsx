import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-quill/dist/quill.snow.css';
import SettingsContextProvider from 'context/SettingsContext';
import { restoreSettings } from 'utils/settings';

const settings = restoreSettings();

ReactDOM.render(
  <SettingsContextProvider settings={settings!}>
    <App />
  </SettingsContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
