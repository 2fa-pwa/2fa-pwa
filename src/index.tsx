import AlertProvider from './components/AlertProvider';
import App from './components/App';
import { ModalProvider } from 'react-declarative';
import PermissionProvider from './components/PermissionProvider';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './config/theme';

const wrappedApp = (
  <ThemeProvider theme={theme}>
    <ModalProvider>
      <AlertProvider>
        <PermissionProvider>
          <App />
        </PermissionProvider>
      </AlertProvider>
    </ModalProvider>
  </ThemeProvider>
);

ReactDOM.render(wrappedApp, document.getElementById('root'));
