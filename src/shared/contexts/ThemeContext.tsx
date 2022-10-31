import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';

import { LightTheme } from '../../themes';

interface IAppThemeProviderProps {
  children: React.ReactNode
}
export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {

  return (
    <ThemeProvider theme={LightTheme}>
      <Box width="100vw" height="100vh" bgcolor={LightTheme.palette.background.default}>
        {children}
      </Box>
    </ThemeProvider>
  );
};
