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
      <MainNavDivider />
      <MainNavItem expanded={expanded} icon="li:folder" label="Projekte" active={active === 'projekte'} onClick={() => setActive('projekte')}>
        {PROJECTS.map((p) => <NavDropdownItem key={p} label={p} active={p === 'Berlin Mitte'} onClick={() => setLog(p)} />)}
      </MainNavItem>
      <MainNavItem expanded={expanded} icon="li:map" label="Karte" active={active === 'karte'} onClick={() => setActive('karte')} />
      <MainNavItem expanded={expanded} icon="li:message-chat-square" label="Chats" active={active === 'chats'} onClick={() => setActive('chats')}>
        <NavDropdownItem label="Marktanalyse Berlin" />
        <NavDropdownItem label="Vergleich Frankfurt" />
      </MainNavItem>
      <MainNavItem expanded={expanded} icon="li:users" label="Team" active={active === 'team'} onClick={() => setActive('team')} />
      {expanded && (
        <>
          <NavSectionHead title="Projekte" actionLabel="Alle anzeigen" onAction={() => setLog('Alle Projekte')} />
          {PROJECTS.slice(0, 3).map((p) => <NavDropdownItem key={p} label={p} onClick={() => setLog(p)} />)}
          <NavSectionHead title="Chats" actionLabel="Alle anzeigen" onAction={() => setLog('Alle Chats')} />
          <NavDropdownItem label="Marktanalyse Berlin" />
          <NavDropdownItem label="Vergleich Frankfurt" />
        </>
      )}
    </>
  );
  const navFooter = (
    <>
      <MainNavItem expanded={expanded} icon="li:moon" label="Dark Mode" onClick={() => setLog('Dark Mode')} />
      <MainNavItem expanded={expanded} icon="li:languages" label="Deutsch" onClick={() => setLog('Deutsch')} />
      <MainNavItem expanded={expanded} icon="li:settings" label="System" onClick={() => setLog('System')} />
      <MainNavDivider />
      <MainNavItem expanded={expanded} icon={<Avatar size="big" />} label="John Doe" title="John Doe" onClick={() => setLog('User')} />
    </>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      <div>
        <p style={headingStyle}>MainNav — Open (280) / Close (48) · hover a collapsed item with children for the flyout</p>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <MainNav expanded={expanded} onToggle={() => setExpanded(!expanded)} logo={<Icon name="PREA-Logo" size={28} />} height={720} footer={navFooter}>
            {navBody}
          </MainNav>
          <MainNav expanded={false} onToggle={() => setLog('toggle')} height={720} footer={
            <>
              <MainNavItem expanded={false} icon="li:moon" title="Dark Mode" />
              <MainNavItem expanded={false} icon="li:settings" title="System" />
              <MainNavDivider />
              <MainNavItem expanded={false} icon={<Avatar size="big" />} title="John Doe" />
            </>
          }>
            <MainNavItem expanded={false} icon="message-square-plus" title="New Chat" />
            <MainNavDivider />
            <MainNavItem expanded={false} icon="li:folder" title="Projekte" active>
              {PROJECTS.map((p) => <NavDropdownItem key={p} label={p} onClick={() => setLog(p)} />)}
            </MainNavItem>
            <MainNavItem expanded={false} icon="li:map" title="Karte" />
            <MainNavItem expanded={false} icon="li:message-chat-square" title="Chats" />
            <MainNavItem expanded={false} icon="li:users" title="Team" />
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
<MainNav expanded={open} onToggle={() => setOpen(!open)} logo={<Icon name="PREA-Logo" size={28} />}
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
    { name: 'MainNav.expanded / onToggle', type: 'boolean / () => void', default: 'true', required: false, description: '280px with labels or 48px icon rail.' },
    { name: 'MainNav.logo / title / footer', type: 'ReactNode', default: "— / 'SPACE' / —", required: false, description: 'Header brand and bottom block.' },
    { name: 'MainNavItem.icon / label / active', type: 'string | ReactNode / ReactNode / boolean', default: '—', required: false, description: '32px row; icon 16px expanded, 20px collapsed.' },
    { name: 'MainNavItem.children', type: 'NavDropdownItem[]', default: '—', required: false, description: 'Nested list (chevron) when expanded; hover flyout when collapsed.' },
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
