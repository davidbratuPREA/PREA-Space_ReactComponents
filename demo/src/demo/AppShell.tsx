import React, { useEffect, useRef, useState } from 'react';
import { MainNav, MainNavDivider, MainNavItem, MainNavUser, NavDropdownItem, NavSectionHead, BottomNav, BottomNavButton } from '../../../Navigation';
import { Icon } from '../../../Icon';
import { Avatar } from '../../../Avatar';
import './demo.css';

const AVATAR = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="%23111"/><circle cx="12" cy="9" r="4" fill="%2358a"/><ellipse cx="12" cy="19" rx="7" ry="4" fill="%2358a"/></svg>');
export const AVATAR_URL = AVATAR;

/** Scales a fixed 1920×1080 app frame to the width of its container (used for the welcome thumbnail). */
export function ScaledScreen({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const update = () => setScale(el.clientWidth / 1920);
    update();
    const ro = new ResizeObserver(update); ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: '0 0' }}>{children}</div>
    </div>
  );
}

/** Full-HD 1920×1080 screen at 1:1 — no scaling; the frame scrolls when the window is narrower. */
export function DemoFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="demo-frame">
      <div className="demo-frame__screen">{children}</div>
    </div>
  );
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

const PROJECTS = ['Berlin Mitte', 'Potsdamer Platz', 'Hafencity'];
const CHATS = ['Marktanalyse Berlin', 'Vergleich Frankfurt', 'Standortcheck Hamburg'];
const DEEPSTREET = ['Map', 'Projekte', 'Portfolio', 'Accounts', 'Kontakte'];

/** Figma app frame: mainNav full height on the left (48px rail, 280px when expanded); MainWrapper (content + bottomNav) beside it. */
export function AppShell({ active = 'chat', children, bottomLeft, bottomOverlay, editMode, onExitEdit }: AppShellProps) {
  const [expanded, setExpanded] = useState(false);
  const ex = expanded;
  const railHeader = (
    <>
      <MainNavItem expanded={ex} icon="message-square-plus" label="New Chat" title="New Chat" active={active === 'chat'} />
      <MainNavDivider size={ex ? 'sm' : 'md'} />
      <MainNavItem expanded={ex} icon="li:folder" label="Projekte" title="Projekte" active={active === 'projekte'}>
        {PROJECTS.map((p) => <NavDropdownItem key={p} label={p} />)}
      </MainNavItem>
      <MainNavItem expanded={ex} icon="li:colors" label="Deep Street" title="Deep Street" active={active === 'deepstreet'}>
        {DEEPSTREET.map((p) => <NavDropdownItem key={p} label={p} active={p === 'Portfolio' && active === 'deepstreet'} />)}
      </MainNavItem>
      <MainNavItem expanded={ex} icon="li:users" label="Team" title="Team" active={active === 'team'} />
      <MainNavItem expanded={ex} icon="li:atom" label="Analysen" title="Analysen" active={active === 'analysen'} />
      <MainNavItem expanded={ex} icon="li:globe-02" label="Karte" title="Karte" active={active === 'karte'} />
    </>
  );
  const railFooter = ex ? (
    <>
      <MainNavDivider />
      <NavSectionHead title="Projekte" actionLabel="Alle anzeigen" />
      {PROJECTS.map((p) => <MainNavItem key={p} expanded icon="li:folder" label={p} />)}
      <MainNavDivider />
      <NavSectionHead title="Chats" actionLabel="Alle anzeigen" />
      {CHATS.map((c) => <MainNavItem key={c} expanded icon="li:message-square" label={c} />)}
      <MainNavDivider />
      <MainNavItem expanded icon="li:moon" label="Dark Mode" />
      <MainNavItem expanded icon="li:languages" label="Deutsch" />
      <MainNavItem expanded icon="li:settings" label="System" />
      <MainNavDivider />
      <MainNavUser expanded avatar={<Avatar size="big" src={AVATAR} />} name="Gabriel Khodzitski" />
    </>
  ) : (
    <>
      <MainNavDivider />
      <MainNavItem expanded={false} icon="li:folder" title="Projekte">{PROJECTS.map((p) => <NavDropdownItem key={p} label={p} />)}</MainNavItem>
      <MainNavDivider />
      <MainNavItem expanded={false} icon="li:message-square" title="Chats">{CHATS.map((c) => <NavDropdownItem key={c} label={c} />)}</MainNavItem>
      <MainNavDivider />
      <MainNavItem expanded={false} icon="li:moon" title="Dark Mode" />
      <MainNavItem expanded={false} icon="li:languages" title="Deutsch" />
      <MainNavItem expanded={false} icon="li:settings" title="System" />
      <MainNavDivider />
      <MainNavUser expanded={false} avatar={<Avatar size="big" src={AVATAR} />} name="Gabriel Khodzitski" />
    </>
  );
  return (
    <div className="app">
      <div className="app__rail">
        <MainNav expanded={ex} onToggle={() => setExpanded((v) => !v)} height="100%" logo={<Icon name="PREA-Logo" size={24} />} footer={railFooter}>
          {railHeader}
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
