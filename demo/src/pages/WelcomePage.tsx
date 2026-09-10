import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { DashboardScreen } from '../demo/screens';
import { ScaledScreen } from '../demo/AppShell';

export function WelcomePage() {
  return (
    <div className="welcome">
      <Logo variant="icon" size={80} style={{ marginBottom: 8 }} />

      <p className="welcome__sub">
        This is a custom React component library, following the PREA Space
        Design System. Pick a component from the sidebar to explore its live
        demo, API reference, and source files.
      </p>

      <Link to="/demo" className="demo-card" aria-label="Open the app demo screens">
        <div className="demo-card__thumb"><ScaledScreen><DashboardScreen /></ScaledScreen></div>
        <div className="demo-card__body">
          <div>
            <p className="demo-card__title">App demo screens</p>
            <p className="demo-card__sub">Dashboard, data panel &amp; map, portfolio kanban, notes — built from these components.</p>
          </div>
          <span className="action-btn action-btn--primary" style={{ pointerEvents: 'none' }}>Open demo</span>
        </div>
      </Link>

      <p className="welcome__hint">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        Select a component from the sidebar to get started
      </p>
    </div>
  );
}
