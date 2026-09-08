import React from 'react';
import { Logo } from '../components/Logo';

export function WelcomePage() {
  return (
    <div className="welcome">
      <Logo variant="icon" size={80} style={{ marginBottom: 8 }} />

      <p className="welcome__sub">
        This is a custom React component library, following the PREA Space
        Design System. Pick a component from the sidebar to explore its live
        demo, API reference, and source files.
      </p>

      <p className="welcome__hint">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        Select a component from the sidebar to get started
      </p>
    </div>
  );
}
