import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Layout({ children, theme, onToggleTheme }: LayoutProps) {
  return (
    <div className="shell">
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <div className="shell__body">
        <Sidebar />
        <main className="shell__main">{children}</main>
      </div>
    </div>
  );
}
