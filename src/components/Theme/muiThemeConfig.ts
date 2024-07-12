import { createTheme } from '@mui/material';
import { Theme, ThemeName } from '@/types';
import { green, red } from '@mui/material/colors';

export const getMuiThemeConfig = (currentTheme: Theme, themeName: ThemeName) => {
  return createTheme({
    palette: {
      mode: themeName,
      success: {
        main: green[500],
      },
      error: {
        main: red[500],
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: currentTheme.backgroundPrimary,
            color: currentTheme.textPrimary,
          },
        },
      },
    },
  });
};
