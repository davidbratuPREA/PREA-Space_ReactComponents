import React, { createContext, useContext } from 'react';

type AppTheme = 'light' | 'dark';

export const ThemeContext = createContext<AppTheme>('light');

export function useAppTheme(): AppTheme {
  return useContext(ThemeContext);
}
