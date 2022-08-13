import React, { createContext, useContext, useMemo } from 'react';
import {
  ThemeProvider as ThemeProviderBase,
  DefaultTheme,
} from 'styled-components';

import { Default } from './themes/defaultTheme';
import { GlobalStyle } from './styles/globalStyle';

interface ThemeContextProps {
  theme?: DefaultTheme | undefined;
}

interface ThemeProviderProps extends ThemeContextProps {
  children?: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: undefined,
});

export function ThemeProvider({
  theme,
  children,
}: ThemeProviderProps) {
  const currentTheme = useMemo(
    () => ({ theme: theme || Default }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={currentTheme}>
      <ThemeProviderBase theme={currentTheme.theme}>
        <GlobalStyle />
        {children}
      </ThemeProviderBase>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const themeContext = useContext(ThemeContext);

  return themeContext;
}

export default ThemeContext;
