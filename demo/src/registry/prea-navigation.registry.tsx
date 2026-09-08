import React, { useState } from 'react';
import {
  MainNav, MainNavDivider, MainNavItem, NavDropdownItem, NavSectionHead,
  BottomNav, BottomNavButton, PathMenu, ToolDivider, IconButton, Tabs, PanelTabs, ToggleDataMenu, SearchPanel,
} from '../../../Navigation';
import { Breadcrumb } from '../../../Breadcrumb';
import { SearchInput } from '../../../Inputs';
import { Avatar } from '../../../Avatar';
import { Icon } from '../../../Icon';
import type { ComponentEntry } from './types';

import navSrc   from '../../../Navigation/Navigation.tsx?raw';
import navTypes from '../../../Navigation/Navigation.types.ts?raw';
import navCss   from '../../../Navigation/Navigation.css?raw';
import navIndex from '../../../Navigation/index.ts?raw';

const headingStyle: React.CSSProperties = { fontSize: 12, fontWeight: 500, color: '#888', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' };
const PROJECTS = ['Berlin Mitte', 'Potsdamer Platz', 'Hafencity', 'Frankfurt Westend'];
const DEEPSTREET = ['Map', 'Projekte', 'Portfolio', 'Accounts', 'Kontakte'];

function NavDemo() {
  const [expanded, setExpanded] = useState(true);
  const [active, setActive] = useState('projekte');
  const [edit, setEdit] = useState(false);
  const [tab, setTab] = useState('karte');
  const [sub, setSub] = useState('alle');
  const [log, setLog] = useState('');

  const navBody = (
    <>
      <MainNavItem expanded={expanded} icon="message-square-plus" label="New Chat" onClick={() => setLog('New Chat')} />
      <MainNavDivider size="sm" />
      <MainNavItem expanded={expanded} icon="li:folder" label="Projekte" active={active === 'projekte'} onClick={() => setActive('projekte')}>
        {PROJECTS.map((p) => <NavDropdownItem key={p} label={p} active={p === 'Berlin Mitte'} onClick={() => setLog(p)} />)}
      </MainNavItem>
      <MainNavItem expanded={expanded} icon="li:colors" label="Deep Street" active={active === 'deepstreet'} onClick={() => setActive('deepstreet')}>
        {DEEPSTREET.map((p) => <NavDropdownItem key={p} label={p} onClick={() => setLog(p)} />)}
      </MainNavItem>
      <MainNavItem expanded={expanded} icon="li:users" label="Team" active={active === 'team'} onClick={() => setActive('team')} />
      <MainNavItem expanded={expanded} icon="li:atom" label="Analysen" active={active === 'analysen'} onClick={() => setActive('analysen')} />
      <MainNavItem expanded={expanded} icon="li:globe-02" label="Karte" active={active === 'karte'} onClick={() => setActive('karte')} />
    </>
  );
  const navFooter = (
    <>
      <MainNavDivider />
      <NavSectionHead title="Projekte" actionLabel="Alle anzeigen" onAction={() => setLog('Alle Projekte')} />
      {PROJECTS.slice(0, 3).map((p) => <MainNavItem key={p} expanded icon="li:folder" label={p} onClick={() => setLog(p)} />)}
      <MainNavDivider />
      <NavSectionHead title="Chats" actionLabel="Alle anzeigen" onAction={() => setLog('Alle Chats')} />
      <MainNavItem expanded icon="li:message-square" label="Marktanalyse Berlin" onClick={() => setLog('Marktanalyse')} />
      <MainNavItem expanded icon="li:message-square" label="Vergleich Frankfurt" onClick={() => setLog('Vergleich')} />
      <MainNavItem expanded icon="li:message-square" label="Standortcheck Hamburg" onClick={() => setLog('Standortcheck')} />
      <MainNavDivider />
      <MainNavItem expanded icon="li:moon" label="Dark Mode" onClick={() => setLog('Dark Mode')} />
      <MainNavItem expanded icon="li:languages" label="Deutsch" onClick={() => setLog('Deutsch')} />
      <MainNavItem expanded icon="li:settings" label="System" onClick={() => setLog('System')} />
      <MainNavDivider />
      <MainNavItem expanded icon={<Avatar size="big" />} label="Gabriel Khodzitski" title="Gabriel Khodzitski" onClick={() => setLog('User')} />
    </>
  );
  const closedFooter = (
    <>
      <MainNavDivider />
      <MainNavItem expanded={false} icon="li:folder" title="Projekte">
        {PROJECTS.map((p) => <NavDropdownItem key={p} label={p} onClick={() => setLog(p)} />)}
      </MainNavItem>
      <MainNavDivider />
      <MainNavItem expanded={false} icon="li:message-square" title="Chats">
        <NavDropdownItem label="Marktanalyse Berlin" />
        <NavDropdownItem label="Vergleich Frankfurt" />
      </MainNavItem>
      <MainNavDivider />
      <MainNavItem expanded={false} icon="li:moon" title="Dark Mode" />
      <MainNavItem expanded={false} icon="li:languages" title="Deutsch" />
      <MainNavItem expanded={false} icon="li:settings" title="System" />
      <MainNavDivider />
      <MainNavItem expanded={false} icon={<Avatar size="big" />} title="Gabriel Khodzitski" />
    </>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      <div>
        <p style={headingStyle}>MainNav — Open (280 × 1080) / Close (48 × 1080) · hover a collapsed item with children for the flyout</p>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <MainNav expanded={expanded} onToggle={() => setExpanded(!expanded)} logo={<Icon name="PREA-Logo" size={24} />} footer={expanded ? navFooter : closedFooter}>
            {navBody}
          </MainNav>
          <MainNav expanded={false} onToggle={() => setLog('toggle')} footer={closedFooter}>
            <MainNavItem expanded={false} icon="message-square-plus" title="New Chat" active />
            <MainNavDivider />
            <MainNavItem expanded={false} icon="li:folder" title="Projekte">
              {PROJECTS.map((p) => <NavDropdownItem key={p} label={p} onClick={() => setLog(p)} />)}
            </MainNavItem>
            <MainNavItem expanded={false} icon="li:colors" title="Deep Street">
              {DEEPSTREET.map((p) => <NavDropdownItem key={p} label={p} active={p === 'Portfolio'} onClick={() => setLog(p)} />)}
            </MainNavItem>
            <MainNavItem expanded={false} icon="li:users" title="Team" />
            <MainNavItem expanded={false} icon="li:atom" title="Analysen" />
            <MainNavItem expanded={false} icon="li:globe-02" title="Karte" />
          </MainNav>
        </div>
        {log && <p style={{ fontSize: 11, color: '#888', margin: '8px 0 0' }}>clicked → {log}</p>}
      </div>

      <div>
        <p style={headingStyle}>PathMenu — Default · Projekt</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 760 }}>
          <PathMenu
            breadcrumb={<Breadcrumb items={[{ key: 'h', label: 'Home' }, { key: 'p', label: 'Projekte' }, { key: 'b', label: 'Berlin Mitte' }]} />}
            onBack={() => setLog('back')} onForward={() => setLog('forward')} onReload={() => setLog('reload')} onTogglePanel={() => setLog('panel')}
          />
          <PathMenu
            breadcrumb={<Breadcrumb items={[{ key: 'h', label: 'Home' }, { key: 'p', label: 'Projekte' }, { key: 'b', label: 'Berlin Mitte' }]} />}
            tools={
              <>
                <IconButton icon="li:plus" label="Neu" variant="primary" onClick={() => setLog('+')} />
                <ToolDivider />
                <IconButton icon="li:list" label="Liste" active />
                <IconButton icon="li:cols" label="Tabelle" />
                <IconButton icon="li:info-1" label="Info" />
                <ToolDivider />
              </>
            }
            search={<SearchInput width={270} placeholder="Suche" onChange={() => undefined} />}
          />
        </div>
      </div>

      <div>
        <p style={headingStyle}>PanelTabs — TabsTertiary pills + TabsSecondary underline · Tabs standalone</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PanelTabs
            tabs={[{ key: 'karte', label: 'Karte' }, { key: 'daten', label: 'Daten' }, { key: 'notizen', label: 'Notizen' }]}
            activeKey={tab} onChange={setTab} onAddTab={() => setLog('add tab')}
            tools={<><IconButton icon="li:list" label="Liste" /><IconButton icon="li:cols" label="Tabelle" /><IconButton icon="li:panel-left" label="Panel" /></>}
          />
          <PanelTabs
            tabs={[{ key: 'karte', label: 'Karte' }, { key: 'daten', label: 'Daten' }, { key: 'notizen', label: 'Notizen' }]}
            activeKey={tab} onChange={setTab} onAddTab={() => setLog('add tab')}
            subTabs={[{ key: 'alle', label: 'Alle' }, { key: 'wohnen', label: 'Wohnen' }, { key: 'buero', label: 'Büro' }]}
            activeSubKey={sub} onSubChange={setSub} onAddSubTab={() => setLog('add sub')}
            tools={<><IconButton icon="li:funnel" label="Filter" /><IconButton icon="li:download" label="Export" /></>}
          />
          <div style={{ display: 'flex', gap: 24 }}>
            <Tabs variant="tertiary" tabs={[{ key: 'a', label: 'Übersicht' }, { key: 'b', label: 'Details' }]} />
            <Tabs variant="secondary" tabs={[{ key: 'a', label: 'Übersicht' }, { key: 'b', label: 'Details' }, { key: 'c', label: 'Historie' }]} />
          </div>
        </div>
      </div>

      <div>
        <p style={headingStyle}>BottomNav — Default · Projekt · EditMode</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 760 }}>
          <BottomNav icons={['li:cloud-sun', 'li:globe-02']} date="Mo. 07. Sep 2026" time="14:32">
            <BottomNavButton icon="li:layers" variant="grey" onClick={() => setLog('Ebenen')}>Ebenen</BottomNavButton>
            <BottomNavButton icon="li:pencil" onClick={() => setEdit(true)}>Bearbeiten</BottomNavButton>
          </BottomNav>
          <BottomNav icons={['li:cloud-sun', 'li:globe-02']} date="Mo. 07. Sep 2026" time="14:32">
            <BottomNavButton icon="li:plus" variant="primary" onClick={() => setLog('Neu erstellen')}>Neu erstellen</BottomNavButton>
            <BottomNavButton icon="li:layers" variant="grey">Ebenen</BottomNavButton>
          </BottomNav>
          <BottomNav editMode={true} onExitEdit={() => setEdit(false)} />
          {edit && <p style={{ fontSize: 11, color: '#888', margin: 0 }}>edit mode on (first bar's „Bearbeiten“) — press „Beenden“ above</p>}
        </div>
      </div>

      <div>
        <p style={headingStyle}>ToggleDataMenu · SearchPanel</p>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <ToggleDataMenu title="Deep Street" onToggle={() => setLog('toggle data')} />
          <SearchPanel><SearchInput width="100%" placeholder="Suche" onChange={() => undefined} /></SearchPanel>
        </div>
      </div>
    </div>
  );
}

const USAGE = `import { MainNav, MainNavItem, NavDropdownItem, NavSectionHead, MainNavDivider,
         PathMenu, IconButton, ToolDivider, PanelTabs, BottomNav, BottomNavButton } from './Navigation';
// Requires ./Icon. PathMenu pairs with ./Breadcrumb and ./Inputs (SearchInput).

const [open, setOpen] = useState(true);
<MainNav expanded={open} onToggle={() => setOpen(!open)} logo={<Icon name="PREA-Logo" size={24} />} height="100vh"
  footer={<>
    <MainNavItem expanded={open} icon="li:moon" label="Dark Mode" onClick={toggleTheme} />
    <MainNavDivider />
    <MainNavItem expanded={open} icon={<Avatar size="big" src={user.avatar} />} label={user.name} title={user.name} />
  </>}>
  <MainNavItem expanded={open} icon="message-square-plus" label="New Chat" onClick={newChat} />
  <MainNavDivider />
  <MainNavItem expanded={open} icon="li:folder" label="Projekte" active={route === 'projects'}>
    {projects.map((p) => <NavDropdownItem key={p.id} label={p.name} active={p.id === current} onClick={() => go(p)} />)}
  </MainNavItem>
  <NavSectionHead title="Chats" actionLabel="Alle anzeigen" onAction={showAllChats} />
</MainNav>

<PathMenu breadcrumb={<Breadcrumb items={crumbs} />} onBack={back} onForward={fwd} onReload={reload}
  tools={<><IconButton icon="li:plus" label="Neu" variant="primary" /><ToolDivider /><IconButton icon="li:list" label="Liste" active /></>}
  search={<SearchInput width={270} />} />

<PanelTabs tabs={tabs} activeKey={tab} onChange={setTab} onAddTab={addTab}
  subTabs={subTabs} activeSubKey={sub} onSubChange={setSub} tools={<IconButton icon="li:funnel" label="Filter" />} />

<BottomNav icons={['li:cloud-sun']} date="Mo. 07. Sep" time="14:32" editMode={editing} onExitEdit={stopEditing}>
  <BottomNavButton icon="li:layers" variant="grey">Ebenen</BottomNavButton>
</BottomNav>
`;

export const navigationEntry: ComponentEntry = {
  id: 'navigation',
  name: 'Navigation Menus',
  category: 'Navigation',
  description: 'App chrome from the Figma Menus page: MainNav (280px open / 48px rail, nested dropdown items, section heads, hover flyout), PathMenu (history buttons + Breadcrumb + tools + search), PanelTabs (pill + underline tabs), BottomNav (default / project / edit-mode), ToggleDataMenu, SearchPanel and the 22px IconButton.',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=69-1177',
  files: [
    { name: 'Navigation/Navigation.tsx',      content: navSrc },
    { name: 'Navigation/Navigation.types.ts', content: navTypes },
    { name: 'Navigation/Navigation.css',      content: navCss },
    { name: 'Navigation/index.ts',            content: navIndex },
  ],
  usage: USAGE,
  props: [
    { name: 'MainNav.expanded / onToggle', type: 'boolean / () => void', default: 'true', required: false, description: '280px with labels or 48px icon rail. Height 1080px by default (Figma).' },
    { name: 'MainNav.logo / title / footer', type: 'ReactNode', default: "— / 'SPACE' / —", required: false, description: 'Header brand and bottom block.' },
    { name: 'MainNavItem.icon / label / active', type: 'string | ReactNode / ReactNode / boolean', default: '—', required: false, description: '32px row; icon 16px expanded, 20px collapsed.' },
    { name: 'MainNavItem.children', type: 'NavDropdownItem[]', default: '—', required: false, description: 'Nested list (chevron) when expanded; hover flyout (GroupDropdown: head + 32px items, 154px, at +14px) when collapsed.' },
    { name: 'MainNavItem.flyoutTitle', type: 'ReactNode', default: 'title / label', required: false, description: 'Head text of the collapsed flyout.' },
    { name: 'MainNavDivider.size', type: "'md' | 'sm'", default: "'md'", required: false, description: '11px (footer) or 7px (header) divider.' },
    { name: 'NavDropdownItem.label / active', type: 'ReactNode / boolean', default: '—', required: false, description: '32px row, 32px indent, grey → dark when active.' },
    { name: 'PathMenu.breadcrumb / tools / search', type: 'ReactNode', default: '—', required: false, description: 'Middle breadcrumb, right tool buttons, search input.' },
    { name: 'IconButton.icon / label / variant / size', type: "string | ReactNode / string / 'plain' | 'primary' / 18 | 22 | 24 | 32", default: "— / — / 'plain' / 22", required: false, description: 'Icon-only button used across the menus.' },
    { name: 'Tabs.variant', type: "'tertiary' | 'secondary'", default: "'tertiary'", required: false, description: '20px pill tabs or 26px underline tabs.' },
    { name: 'PanelTabs.tabs / subTabs / tools', type: 'TabItem[] / TabItem[] / ReactNode', default: '—', required: false, description: 'Pill row, optional underline row and right-hand tools.' },
    { name: 'BottomNav.icons / date / time', type: '(string | ReactNode)[] / ReactNode', default: '—', required: false, description: 'Right-hand status area.' },
    { name: 'BottomNav.editMode / onExitEdit', type: 'boolean / () => void', default: 'false', required: false, description: 'Blue bar with white „Beenden“ button.' },
    { name: 'BottomNavButton.variant', type: "'grey' | 'primary' | 'plain'", default: "'plain'", required: false, description: '22px pill button.' },
  ],
  demo: <NavDemo />,
};
