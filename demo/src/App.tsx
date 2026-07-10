import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { WelcomePage } from './pages/WelcomePage';
import { ComponentPage } from './pages/ComponentPage';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem('prea-theme') as Theme | null;
    if (stored) return stored;
  } catch { /* noop */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App() {
  const [appTheme, setAppTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', appTheme);
    try { localStorage.setItem('prea-theme', appTheme); } catch { /* noop */ }
  }, [appTheme]);

  const toggleTheme = () =>
    setAppTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <HashRouter>
      <Layout theme={appTheme} onToggleTheme={toggleTheme}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/:componentId" element={<ComponentPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
