import AlertProvider from './components/AlertProvider';
import App from './components/App';
import PermissionProvider from './components/PermissionProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './config/theme';

const wrappedApp = (
  <ThemeProvider theme={theme}>
    <AlertProvider>
      <PermissionProvider>
        <App />
      </PermissionProvider>
    </AlertProvider>
  </ThemeProvider>
);

ReactDOM.render(wrappedApp, document.getElementById('root'));
