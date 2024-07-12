import { createContext, useMemo, useState } from 'react';

import { ThemeProvider as MuiThemeProvider, Theme as MuiTheme } from '@mui/material/styles';
import { getMuiThemeConfig } from '@/components';

import { Theme, ThemeName } from '@/types';
import { THEME_KEY, getTheme } from '@/utils';
type ContextType = {
  theme: ThemeName;
  currentTheme: Theme;
  changeTheme: () => void;
  muiTheme: MuiTheme;
};

interface StateProps {
  children: React.ReactElement;
}

export const ThemeContext = createContext({} as ContextType);

export const ThemeProvider = ({ children }: StateProps) => {
  const defaultTheme = 'dark';

  const [theme, setTheme] = useState<ThemeName>(defaultTheme);
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  const changeTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, newTheme);
    setTheme(newTheme);
  };
  const muiTheme = useMemo(() => getMuiThemeConfig(currentTheme, theme), [currentTheme, theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        currentTheme,
        changeTheme,
        muiTheme,
      }}
    >
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
