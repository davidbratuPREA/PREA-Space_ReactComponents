import React, { useState } from 'react';
import { AppShell, MapArea, AVATAR_URL } from './AppShell';
import { PathMenu, PanelTabs, IconButton, ToolDivider, SearchPanel, BottomNavButton } from '../../../Navigation';
import { Breadcrumb } from '../../../Breadcrumb';
import { TabsMain } from '../../../TabsMain';
import { SearchInput, TextInput } from '../../../Inputs';
import { ChatInput, ChatDropdown, ChatNotes } from '../../../Chat';
import { NavInfoCard, InfoBox, InfoBoxModule } from '../../../InfoBox';
import { DataPanel, DataGroup, DataBox } from '../../../DataBox';
import { MapNav, MapNavGroup, MapLayersMenu, MapLayerItem } from '../../../MapNav';
import { MapButton } from '../../../Button';
import { FilterPanel, FilterSection, FilterGroupHead, FilterItem } from '../../../Filters';
import { KanbanBoard, KanbanColumn, KanbanProject } from '../../../Kanban';
import type { KanbanProjectGroup } from '../../../Kanban';
import { NotesPanel, NoteThread } from '../../../Notes';
import { DropdownMenu } from '../../../DropdownMenu';

/* ─── shared bits ─────────────────────────────────────────────────────────── */
const TABS = [
  { key: '1', label: 'Lorem ipsum dolor sit amet consec…', closable: true },
  { key: '2', label: 'Lorem ipsum dolor sit amet consec…', closable: true },
  { key: '3', label: 'Lorem ipsum dolor sit amet consec…', closable: true },
  { key: '4', label: 'Lorem ipsum dolor sit amet consec…', closable: true },
];
const crumbs = (...labels: string[]) => labels.map((l, i) => ({ key: String(i), label: l, href: '#' }));

function MapWithNav({ children }: { children?: React.ReactNode }) {
  const [heading, setHeading] = useState(0);
  const [tilt, setTilt] = useState(72);
  return (
    <MapArea>
      <div className="app__map-search"><SearchInput width={328} placeholder="Weise eine Aufgabe zu oder stelle eine Frage…" onChange={() => undefined} /></div>
      {children}
      <div className="app__mapnav">
        <MapNav heading={heading} onResetHeading={() => setHeading(0)} tilt={tilt} onTiltChange={setTilt}>
          <MapNavGroup><MapButton icon="3D" label="3D" /><MapButton icon="li:layer-double" label="Ebenen" /><MapButton icon="li:perspective" label="Neigen" /></MapNavGroup>
          <MapNavGroup><MapButton icon="li:navigation" label="Standort" /></MapNavGroup>
          <MapNavGroup><MapButton icon="li:plus" label="Zoom in" /><MapButton icon="li:minus" label="Zoom out" /></MapNavGroup>
          <MapNavGroup><MapButton icon="li:info-1" label="Info" onClick={() => setHeading((h) => (h + 30) % 360)} /></MapNavGroup>
        </MapNav>
      </div>
    </MapArea>
  );
}

/* ─── 1 · Dashboard ───────────────────────────────────────────────────────── */
export function DashboardScreen() {
  const [sent, setSent] = useState<string | null>(null);
  return (
    <AppShell active="chat">
      <div className="app__dash">
        <div className="app__hello">Hallo, Gabriel</div>
        <ChatInput
          width={560} placeholder="Wie kann ich dir helfen?" modelLabel="GPT 5.6" modelIcon="OpenAI"
          onSend={(t) => setSent(t)} onAttach={() => undefined}
          subMenu={
            <>
              <ChatDropdown label="Chats" icon="li:message-square" searchable searchPlaceholder="Chats suchen"
                items={['Marktanalyse Berlin', 'Vergleich Frankfurt', 'Standortcheck Hamburg'].map((l) => ({ key: l, label: l }))}
                actions={[{ key: 'new', label: 'Neuer Chat', icon: 'message-square-plus' }, { key: 'all', label: 'Alle anzeigen', icon: 'li:message-chat-square' }]} />
              <ChatDropdown label="Projekte" icon="li:folder" items={['Berlin Mitte', 'Potsdamer Platz', 'Hafencity'].map((l) => ({ key: l, label: l }))} />
            </>
          }
        />
        {sent && <p style={{ fontSize: 12, color: '#888', margin: '-28px 0 0' }}>gesendet: „{sent}“</p>}
        <div className="app__dash-card">
          <NavInfoCard
            title="Deep Street"
            description="Sechs Kapitel mit den Grundsätzen, die unser Denken, Handeln und unsere Kultur definieren."
            links={[{ key: 'dashboard', label: 'Dashboard' }, { key: 'map', label: 'Map' }, { key: 'portfolio', label: 'Portfolio' }]}
          />
        </div>
      </div>
    </AppShell>
  );
}

/* ─── 2 · Data panel + map (Ebenen / Filter) ─────────────────────────────── */
export function DataPanelScreen() {
  const [tab, setTab] = useState('asset');
  const [sub, setSub] = useState('alle');
  const [ftab, setFtab] = useState('a');
  const [f, setF] = useState<Record<string, boolean>>({ a: true, b: true, c: false, d: true });
  return (
    <AppShell active="projekte" bottomLeft={<><BottomNavButton icon="li:layers" variant="grey">Ebenen (3)</BottomNavButton><BottomNavButton icon="li:pencil">Bearbeiten</BottomNavButton></>}>
      <TabsMain items={TABS} defaultActiveKey="2" onEdit={() => undefined} />
      <div className="app__split">
        <div className="app__panel">
          <PathMenu breadcrumb={<Breadcrumb items={crumbs('Deep Street', 'Asset', 'Flurstücke', '1802')} />} onTogglePanel={() => undefined} />
          <SearchPanel width="100%"><SearchInput width="100%" placeholder="Suche…" onChange={() => undefined} /></SearchPanel>
          <PanelTabs width="100%"
            tabs={[{ key: 'asset', label: 'Asset' }, { key: 'analytics', label: 'Analytics' }, { key: 'relation', label: 'Relation' }, { key: 'notes', label: 'Notes' }]}
            activeKey={tab} onChange={setTab}
            subTabs={[{ key: 'alle', label: 'Alle' }, { key: 'adresse', label: 'Adresse' }, { key: 'grund', label: 'Grundstück' }, { key: 'flur', label: 'Flurstücke' }, { key: 'geb', label: 'Gebäude' }]}
            activeSubKey={sub} onSubChange={setSub}
            tools={<IconButton icon="li:panel-left" label="Panel" />}
          />
          <div className="app__panel-scroll">
            <DataPanel width="100%">
              <DataGroup title="HeadGroup-lv.1">
                <DataBox groups={[{ head: 'Head', values: ['Info item value', 'Info item value'] }, { head: 'Head', values: ['Info item value'] }, { head: 'Head', values: ['Info item value'] }]} subGroups={[['Info subItem value']]} />
              </DataGroup>
              <DataGroup title="HeadGroup-lv.1">
                <DataGroup level={2} title="subHeadGroup-lv.2"><DataBox minHeight={165}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 165, color: '#d946ef', fontSize: 12 }}>AG Grid</div></DataBox></DataGroup>
                <DataGroup level={2} title="subHeadGroup-lv.2" defaultOpen={false} />
              </DataGroup>
              <DataGroup title="HeadGroup-lv.1">
                <DataGroup level={2} title="subHeadGroup-lv.2"><DataBox minHeight={140}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 140, color: '#d946ef', fontSize: 12 }}>Relation Table</div></DataBox></DataGroup>
              </DataGroup>
            </DataPanel>
            <div className="app__float" style={{ left: 8, bottom: 8 }}>
              <MapLayersMenu onClose={() => undefined} onRemoveActive={() => undefined}
                activeLayers={<><MapLayerItem label="Map Layer" /><MapLayerItem label="Map Layer" /><MapLayerItem label="Map Layer" /></>}>
                <MapLayerItem kind="group" label="Map Layer Group" />
                <MapLayerItem label="Map Layer Group" defaultOpen><MapLayerItem label="Map Layer" /><MapLayerItem label="Map Layer" /><MapLayerItem label="Map Layer" /></MapLayerItem>
                <MapLayerItem kind="group" label="Map Layer Group" />
                <MapLayerItem label="Map Layer Group" defaultOpen>
                  <MapLayerItem kind="subgroup" label="Map Layer subGroup" />
                  <MapLayerItem kind="subgroup" label="Map Layer subGroup" defaultOpen><MapLayerItem label="Map Layer" /><MapLayerItem label="Map Layer" /><MapLayerItem label="Map Layer" /></MapLayerItem>
                </MapLayerItem>
                <MapLayerItem kind="group" label="Map Layer Group" /><MapLayerItem kind="group" label="Map Layer Group" /><MapLayerItem kind="group" label="Map Layer Group" />
              </MapLayersMenu>
            </div>
            <div className="app__float" style={{ left: 328, top: 24 }}>
              <FilterPanel tabs={[{ key: 'a', label: 'Tab item' }, { key: 'b', label: 'Tab item' }, { key: 'c', label: 'Tab item' }]} activeTab={ftab} onTabChange={setFtab} onClose={() => undefined} onApply={() => undefined} onReset={() => undefined}>
                <FilterSection gap={10}>
                  <TextInput width="100%" placeholder="Name" /><TextInput width="100%" placeholder="City" /><TextInput width="100%" placeholder="PLZ" />
                  <TextInput width="100%" placeholder="Straße" hint="Lorem ipsum dolores sub-description" />
                  <TextInput width="100%" placeholder="Bundesland" dropdown />
                </FilterSection>
                <FilterSection>
                  <FilterGroupHead title="Gegenstand der Transaktion" />
                  {['a', 'b', 'c', 'd'].map((k) => <FilterItem key={k} label="Item name" icon="grid-01" checked={f[k]} onChange={(v) => setF((s) => ({ ...s, [k]: v }))} />)}
                </FilterSection>
                <FilterSection>
                  <FilterGroupHead title="Filter" hint="(Alle Angaben werden UND-verknüpft)" />
                  <FilterItem label="Item name" icon="grid-01" /><FilterItem label="Item name" icon="grid-01" /><FilterItem label="Item name" icon="grid-01" />
                </FilterSection>
              </FilterPanel>
            </div>
          </div>
        </div>
        <MapWithNav />
      </div>
    </AppShell>
  );
}

/* ─── 3 · Portfolio · Relation Kanban ────────────────────────────────────── */
const ITEMS = [
  { key: '1', label: 'Bebaute Fläche', value: 'xxx' }, { key: '2', label: 'Bebaute Fläche', value: 'xxx' }, { key: '3', label: 'Bebaute Fläche', value: 'xxx' },
  { key: '4', label: 'Bebaute Fläche', value: 'xxx', highlight: true }, { key: '5', label: 'Bebaute Fläche', value: 'xxx', highlight: true, icon: 'eco' }, { key: '6', label: 'Bebaute Fläche', value: 'xxx' },
];
const GROUPS: KanbanProjectGroup[] = [
  { key: 'a', title: 'Potsdamer Platz 23, 10823 Berlin', items: ITEMS, priority: 'Hoch' },
  { key: 'b', title: 'Potsdamer Platz 23, 10823 Berlin', items: ITEMS, defaultOpen: false },
  { key: 'c', title: 'Potsdamer Platz 23, 10823 Berlin', items: ITEMS, defaultOpen: false },
];
export function PortfolioScreen() {
  const [tab, setTab] = useState('relation');
  const [sub, setSub] = useState('t1');
  return (
    <AppShell active="deepstreet" bottomLeft={<><BottomNavButton icon="li:layers">Ebenen</BottomNavButton><BottomNavButton icon="li:pencil">Bearbeiten</BottomNavButton></>}>
      <TabsMain items={[{ key: '1', label: 'Portfolio Name', closable: true }, { key: '2', label: 'Portfolio: Projektname 01', closable: true }, { key: '3', label: 'Portfolio Name', closable: true }, { key: '4', label: 'Portfolio Name', closable: true }]} defaultActiveKey="2" onEdit={() => undefined} />
      <div className="app__panel app__panel--wide" style={{ flex: '1 1 0', minHeight: 0 }}>
        <PathMenu breadcrumb={<Breadcrumb items={crumbs('Deep Street', 'Portfolio', 'Projektname 01')} />} search={<SearchInput width={270} placeholder="Suche…" onChange={() => undefined} />} />
        <PanelTabs width="100%"
          tabs={['Dashboard', 'Task', 'Relation', 'Asset', 'Map', 'Analytics', 'Data', 'Pitch', 'Notes'].map((l) => ({ key: l.toLowerCase(), label: l }))}
          activeKey={tab} onChange={setTab} onAddTab={() => undefined}
          subTabs={[{ key: 't1', label: 'Tabelle 1' }, { key: 't2', label: 'Tabelle 2' }, { key: 't3', label: 'Tabelle 3' }]} activeSubKey={sub} onSubChange={setSub} onAddSubTab={() => undefined}
          tools={<><IconButton icon="li:plus" label="Neu" variant="primary" /><ToolDivider /><IconButton icon="li:list" label="Liste" /><IconButton icon="li:cols" label="Tabelle" active /><IconButton icon="li:info-1" label="Info" /></>}
        />
        <div className="app__panel-scroll app__panel-scroll--pad" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <InfoBoxModule width="100%">
            {Array.from({ length: 8 }, (_, i) => <InfoBox key={i} label="Eiusmod dolor Eius mod dolor Eiusmod dolor" value="XXXXXXX" />)}
          </InfoBoxModule>
          <KanbanBoard>
            <KanbanColumn status="inProgress" count={3}>
              <KanbanProject title="Projekt 02" groups={GROUPS} width="100%" />
              <KanbanProject title="Projekt 02" groups={GROUPS} width="100%" />
              <KanbanProject title="Projekt 02" groups={GROUPS} width="100%" />
            </KanbanColumn>
            <KanbanColumn status="onHold" count={1}><KanbanProject title="Projekt 02" groups={GROUPS} width="100%" /></KanbanColumn>
            <KanbanColumn status="pending" count={0} />
          </KanbanBoard>
        </div>
      </div>
    </AppShell>
  );
}

/* ─── 4 · Notes / Chats / Threads + map ──────────────────────────────────── */
const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus maximus nisi, nec tincidunt quam imperdiet eu. Aliquam erat volutpat. Nullam tristique ligula at tristique posuere. Etiam scelerisque nisi non feugiat laoreet. Cras dapibus eros non interdum dignissim. Donec sagittis justo in eros tristique venenatis id vitae ligula.';
export function NotesScreen() {
  const [tab, setTab] = useState('notes');
  const [sub, setSub] = useState('chat');
  const [menu, setMenu] = useState(true);
  const [gmail, setGmail] = useState(true); const [drive, setDrive] = useState(true); const [cal, setCal] = useState(false);
  const person = (name: string) => ({ author: { name, avatar: AVATAR_URL }, date: '30. Jun 11:40' });
  const actions = [
    { key: 'src', icon: 'reddit', label: 'Reddit' }, { key: 'edit', icon: 'li:pencil', title: 'Bearbeiten' }, { key: 'share', icon: 'li:share', title: 'Teilen' }, { key: 'more', icon: 'li:ellipsis-horizontal', title: 'Mehr' },
  ];
  return (
    <AppShell active="chat" bottomLeft={<BottomNavButton icon="li:message-square" variant="grey">Chats</BottomNavButton>}>
      <TabsMain items={TABS} defaultActiveKey="2" onEdit={() => undefined} />
      <div className="app__split">
        <div className="app__panel">
          <PathMenu breadcrumb={<Breadcrumb items={crumbs('Deep Street', 'Notes', 'Chat')} />} onTogglePanel={() => undefined} />
          <SearchPanel width="100%"><SearchInput width="100%" placeholder="Suche…" onChange={() => undefined} /></SearchPanel>
          <PanelTabs width="100%"
            tabs={[{ key: 'asset', label: 'Asset' }, { key: 'analytics', label: 'Analytics' }, { key: 'relation', label: 'Relation' }, { key: 'notes', label: 'Notes' }]} activeKey={tab} onChange={setTab}
            subTabs={[{ key: 'chat', label: 'Chat' }, { key: 'audit', label: 'Audit Log' }]} activeSubKey={sub} onSubChange={setSub}
            tools={<IconButton icon="li:panel-left" label="Panel" />}
          />
          <div className="app__panel-scroll" style={{ display: 'flex', flexDirection: 'column' }}>
            <NotesPanel width="100%" style={{ flex: '1 1 0', minHeight: 0, overflowY: 'auto' }}>
              <NoteThread
                note={{ ...person('John Doe'), children: LOREM, actions, actionsVisible: true, onLike: () => undefined, onReact: () => undefined }}
                onBack={() => undefined}
                answers={[
                  { ...person('John Doe'), children: LOREM, onLike: () => undefined, onReact: () => undefined, comments: [{ ...person('John Doe'), children: LOREM, onLike: () => undefined, onReact: () => undefined }] },
                  { ...person('John Doe'), children: LOREM, onLike: () => undefined, onReact: () => undefined },
                ]}
              />
            </NotesPanel>
            <div style={{ position: 'relative', padding: 8 }}>
              {menu && (
                <div className="app__float" style={{ left: 16, bottom: 72 }}>
                  <DropdownMenu openKey="connectors" groups={[
                    [{ key: 'files', label: 'Dateien / Fotos hinzufügen', icon: 'li:paperclip', showChevron: false }, { key: 'project', label: 'Zum Projekt hinzufügen', icon: 'li:folder-plus', showChevron: false }],
                    [{ key: 'skills', label: 'Skills', icon: 'li:file-06', showChevron: false }, { key: 'plugins', label: 'Plugins hinzufügen', icon: 'li:zap-square', showChevron: false },
                      { key: 'connectors', label: 'Konnektoren', icon: 'li:unplug', children: [
                        [{ key: 'add', label: 'Konnektor hinzufügen', icon: 'li:plus', showChevron: false }, { key: 'manage', label: 'Konnektoren verwalten', icon: 'li:dataflow-01', showChevron: false }],
                        [{ key: 'gmail', label: 'Gmail', icon: 'gmail', toggle: { checked: gmail, onChange: setGmail } }, { key: 'drive', label: 'Drive', icon: 'google-drive', toggle: { checked: drive, onChange: setDrive } }, { key: 'cal', label: 'Kalender', icon: 'google-calendar', toggle: { checked: cal, onChange: setCal } }],
                      ] }],
                  ]} />
                </div>
              )}
              <ChatNotes width="100%" placeholder="Antwort schreiben…" onAttach={() => setMenu((m) => !m)} onSend={() => undefined} />
            </div>
          </div>
        </div>
        <MapWithNav />
      </div>
    </AppShell>
  );
}
