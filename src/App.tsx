import React from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import {
  jssPreset,
  makeStyles,
  createStyles,
  ThemeProvider,
  StylesProvider
} from '@material-ui/core';
import { useSettingsContext } from 'context/SettingsContext';
import { createTheme } from 'theme';
import { Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Routes from 'Routes';
import history from 'utils/history';
import { useAuth0 } from '@auth0/auth0-react';

import { ReactQueryDevtools } from 'react-query-devtools';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
      }
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      height: '100%',
      width: '100%'
    },
    '#root': {
      height: '100%',
      width: '100%'
    }
  })
);

interface Props {}

const App: React.FC = () => {
  useStyles();
  const { isLoading, error } = useAuth0();

  const { settings } = useSettingsContext();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <ThemeProvider theme={createTheme(settings!)}>
      <SnackbarProvider maxSnack={1}>
        <StylesProvider jss={jss}>
          <Router history={history}>
            <Routes />
          </Router>
        </StylesProvider>
      </SnackbarProvider>
      <ReactQueryDevtools />
    </ThemeProvider>
  );
};

export default App;
