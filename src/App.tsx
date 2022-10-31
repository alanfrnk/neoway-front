import { BrowserRouter } from 'react-router-dom';

import './shared/forms/TraducoesYup';

import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { AppRoutes } from './routes';


export const App = () => {
  return (
    <AppThemeProvider>

      <DrawerProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </DrawerProvider>

    </AppThemeProvider>
  );
};
