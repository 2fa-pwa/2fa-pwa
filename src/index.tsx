import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@mui/material/styles';

import App from './components/App';
import AlertProvider from './components/AlertProvider';

import theme from './config/theme';

const wrappedApp = (
  <ThemeProvider theme={theme}>
    <AlertProvider>
      <App />
    </AlertProvider>
  </ThemeProvider>
);

ReactDOM.render(wrappedApp, document.getElementById('root'));
