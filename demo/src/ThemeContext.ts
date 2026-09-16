import React, { createContext, useContext } from 'react';

type AppTheme = 'light' | 'dark';

export const ThemeContext = createContext<AppTheme>('light');

export function useAppTheme(): AppTheme {
  return useContext(ThemeContext);
}

/** Toggles the site's light / dark mode (wired by App). */
export const ThemeToggleContext = createContext<() => void>(() => undefined);

export function useToggleTheme(): () => void {
  return useContext(ThemeToggleContext);
}

/** Props for a MainNav "Dark Mode" item bound to the site theme: li:moon in light mode, li:sun in dark mode. */
export function useThemeNavItem() {
  const theme = useAppTheme();
  const toggle = useToggleTheme();
  const dark = theme === 'dark';
  return { icon: dark ? 'li:sun' : 'li:moon', label: dark ? 'Light Mode' : 'Dark Mode', onClick: toggle };
}
