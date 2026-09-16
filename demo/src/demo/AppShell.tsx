import React, { useEffect, useRef, useState } from 'react';
import { MainNav, MainNavDivider, MainNavItem, MainNavUser, NavDropdownItem, BottomNav, BottomNavButton } from '../../../Navigation';
import { Avatar } from '../../../Avatar';
import './demo.css';

const AVATAR = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="%23111"/><circle cx="12" cy="9" r="4" fill="%2358a"/><ellipse cx="12" cy="19" rx="7" ry="4" fill="%2358a"/></svg>');
export const AVATAR_URL = AVATAR;

/**
 * A fixed 1920×1080 app frame. `zoom="fit"` scales it to the container width;
 * `zoom={1}` renders the components at their real pixel size (the frame scrolls).
 */
export function ScaledScreen({ children, className, zoom = 'fit' }: { children: React.ReactNode; className?: string; zoom?: 'fit' | number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(0.5);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const update = () => setFit(el.clientWidth / 1920);
    update();
    const ro = new ResizeObserver(update); ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const scale = zoom === 'fit' ? fit : zoom;
  return (
    <div ref={ref} className={className} style={{ position: 'relative', width: '100%', aspectRatio: zoom === 'fit' ? '16 / 9' : undefined, height: zoom === 'fit' ? undefined : Math.min(1080 * scale, 900), overflow: zoom === 'fit' ? 'hidden' : 'auto' }}>
      <div className="demo-frame__inner" style={{ transform: `scale(${scale})`, position: zoom === 'fit' ? 'absolute' : 'relative', width: zoom === 'fit' ? 1920 : 1920 * scale, height: zoom === 'fit' ? 1080 : 1080 * scale }}>
        <div style={{ width: 1920, height: 1080 }}>{children}</div>
      </div>
    </div>
  );
}

/** Framed, shadowed 1920×1080 screen for the demo page. */
export function DemoFrame({ children, zoom }: { children: React.ReactNode; zoom?: 'fit' | number }) {
  return <ScaledScreen className="demo-frame" zoom={zoom}>{children}</ScaledScreen>;
}

export interface AppShellProps {
  /** Which rail item is active. */
  active?: 'chat' | 'projekte' | 'deepstreet' | 'team' | 'analysen' | 'karte';
  children: React.ReactNode;
  /** Left-hand BottomNav buttons. */
  bottomLeft?: React.ReactNode;
  /** Element rendered above the BottomNav (e.g. the nav_InfoCard popover). */
  bottomOverlay?: React.ReactNode;
  /** Blue edit-mode bar instead of the default BottomNav. */
  editMode?: boolean;
  onExitEdit?: () => void;
}

/** Figma app frame: 48px mainNav full height on the left; MainWrapper (content + bottomNav) beside it. */
export function AppShell({ active = 'chat', children, bottomLeft, bottomOverlay, editMode, onExitEdit }: AppShellProps) {
  return (
    <div className="app">
      <div className="app__rail">
        <MainNav expanded={false} height="100%" footer={
          <>
            <MainNavDivider />
            <MainNavItem expanded={false} icon="li:folder" title="Projekte">
              {['Berlin Mitte', 'Potsdamer Platz', 'Hafencity'].map((p) => <NavDropdownItem key={p} label={p} />)}
            </MainNavItem>
            <MainNavItem expanded={false} icon="li:message-square" title="Chats">
              <NavDropdownItem label="Marktanalyse Berlin" /><NavDropdownItem label="Vergleich Frankfurt" />
            </MainNavItem>
            <MainNavDivider />
            <MainNavItem expanded={false} icon="li:moon" title="Dark Mode" />
            <MainNavItem expanded={false} icon="li:languages" title="Deutsch" />
            <MainNavItem expanded={false} icon="li:settings" title="System" />
            <MainNavDivider />
            <MainNavUser expanded={false} avatar={<Avatar size="big" src={AVATAR} />} name="Gabriel Khodzitski" />
          </>
        }>
          <MainNavItem expanded={false} icon="message-square-plus" title="New Chat" active={active === 'chat'} />
          <MainNavDivider />
          <MainNavItem expanded={false} icon="li:folder" title="Projekte" active={active === 'projekte'} />
          <MainNavItem expanded={false} icon="li:colors" title="Deep Street" active={active === 'deepstreet'}>
            {['Map', 'Projekte', 'Portfolio', 'Accounts', 'Kontakte'].map((p) => <NavDropdownItem key={p} label={p} active={p === 'Portfolio' && active === 'deepstreet'} />)}
          </MainNavItem>
          <MainNavItem expanded={false} icon="li:users" title="Team" active={active === 'team'} />
          <MainNavItem expanded={false} icon="li:atom" title="Analysen" active={active === 'analysen'} />
          <MainNavItem expanded={false} icon="li:globe-02" title="Karte" active={active === 'karte'} />
        </MainNav>
      </div>
      <div className="app__main">
        <div className="app__content">{children}</div>
        <div className="app__bottom">
          {bottomOverlay}
          <BottomNav icons={['li:fingerprint-pattern', 'li:fingerprint-pattern', 'li:fingerprint-pattern', 'li:fingerprint-pattern']} date="Aug 01" time="09:43" editMode={editMode} onExitEdit={onExitEdit}>
            {bottomLeft}
          </BottomNav>
        </div>
      </div>
    </div>
  );
}

/** Decorative map background with a few "blocks" and street labels. */
export function MapArea({ children }: { children?: React.ReactNode }) {
  return (
    <div className="app__map" aria-hidden>
      <div className="app__map-block" style={{ left: '8%', top: '10%', width: 220, height: 150, transform: 'rotate(-25deg)' }} />
      <div className="app__map-block" style={{ left: '30%', top: '58%', width: 260, height: 180, transform: 'rotate(-25deg)' }} />
      <div className="app__map-block" style={{ left: '56%', top: '30%', width: 320, height: 210, transform: 'rotate(-25deg)', borderRadius: 120 }} />
      <div className="app__map-block" style={{ left: '74%', top: '64%', width: 240, height: 140, transform: 'rotate(-25deg)' }} />
      <span className="app__map-label" style={{ left: '38%', top: '26%', transform: 'rotate(-25deg)' }}>Potsdamer Straße</span>
      <span className="app__map-label" style={{ left: '52%', top: '48%', transform: 'rotate(65deg)' }}>Ben-Gurion-Straße</span>
      <span className="app__map-label" style={{ left: '18%', top: '84%', transform: 'rotate(-25deg)' }}>Tiergartenstraße</span>
      <span className="app__map-label" style={{ left: '70%', top: '14%', transform: 'rotate(-25deg)' }}>Reichpietschufer</span>
      {children}
    </div>
  );
}
