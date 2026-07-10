import React from 'react';
import { registry } from '../registry';
import { Logo } from '../components/Logo';

export function WelcomePage() {
  const componentCount = Object.keys(registry).length;
  const stableCount = Object.values(registry).filter((c) => c.status === 'stable').length;

  return (
    <div className="welcome">
      <Logo size={200} style={{ marginBottom: 24 }} />

      <h1 className="welcome__title">
        <span>library</span>
      </h1>
      <p className="welcome__sub">
        This is a custom React component library, following the PREA Space
        Design System. Pick a component from the sidebar to explore its live
        demo, API reference, and source files.
      </p>

      <div className="welcome__stats">
        <div>
          <div className="welcome__stat-value">{componentCount}</div>
          <div className="welcome__stat-label">Components</div>
        </div>
        <div style={{ width: 1, background: 'var(--border)' }} />
        <div>
          <div className="welcome__stat-value">{stableCount}</div>
          <div className="welcome__stat-label">Stable</div>
        </div>
        <div style={{ width: 1, background: 'var(--border)' }} />
        <div>
          <div className="welcome__stat-value">v1.0</div>
          <div className="welcome__stat-label">PREA Design</div>
        </div>
      </div>

      <p className="welcome__hint">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        Select a component from the sidebar to get started
      </p>
    </div>
  );
}
