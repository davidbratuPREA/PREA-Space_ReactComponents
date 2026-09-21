import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AppShell, MapArea, AVATAR_URL } from './AppShell';
import { PathMenu, PanelTabs, IconButton, ToolDivider, SearchPanel, BottomNavButton, ToggleDataMenu } from '../../../Navigation';
import { Breadcrumb } from '../../../Breadcrumb';
import { TabsMain } from '../../../TabsMain';
import { SearchInput, TextInput } from '../../../Inputs';
import { ChatInput, ChatDropdown, ChatNotes } from '../../../Chat';
import { NavInfoCard, InfoBox, InfoBoxModule } from '../../../InfoBox';
import { DataPanel, DataGroup, DataBox } from '../../../DataBox';
import { MapNav, MapNavGroup, MapLayersMenu, MapLayerItem } from '../../../MapNav';
import { MapButton } from '../../../Button';
import { FilterPanel, FilterSection, FilterGroupHead, FilterItem, FilterRange } from '../../../Filters';
import { ColorPicker } from '../../../ColorPicker';
import type { ColorPickerRow } from '../../../ColorPicker';
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
/** Breadcrumb items with a dropdown (the item gets its active state while the dropdown is open). */
const crumbsWithMenu = (...labels: string[]) => labels.map((l, i) => ({
  key: String(i), label: l,
  dropdownItems: [{ key: 'a', label: `${l} 01`, active: true }, { key: 'b', label: `${l} 02` }, { key: 'c', label: `${l} 03` }],
}));
const SEARCH_RESULTS = [
  { key: 'recent', items: [{ key: 'r1', label: 'Potsdamer Platz', icon: 'li:clock' }, { key: 'r2', label: 'Potsdamer Str.', icon: 'li:clock' }, { key: 'r3', label: 'Potsdam', icon: 'li:clock' }] },
  { key: 'adresse', title: 'Adresse', onShowAll: () => undefined, items: [{ key: 'a1', label: 'Potsdamer Str, 39114 Magdeburg', icon: 'li:marker-pin' }, { key: 'a2', label: 'Potshauser Straße, 42651 Solingen', icon: 'li:marker-pin' }, { key: 'a3', label: 'Potthälterpad, 45145 Essen-Frohnhausen', icon: 'li:marker-pin' }] },
  { key: 'projekte', title: 'Projekte', onShowAll: () => undefined, items: [{ key: 'p1', label: 'Potzhofer Straße, 42651 Solingen', icon: 'li:folder' }, { key: 'p2', label: 'Potzhofer Straße, 42651 Solingen', icon: 'li:folder' }, { key: 'p3', label: 'Potsi', icon: 'li:folder' }] },
];

function MapWithNav({ children }: { children?: React.ReactNode }) {
  const [heading, setHeading] = useState(0);
  const [tilt, setTilt] = useState(72);
  return (
    <MapArea>
      <div className="app__map-search"><SearchInput size="big" width={330} placeholder="Weise eine Aufgabe zu oder stelle eine Frage…" results={SEARCH_RESULTS} onChange={() => undefined} /></div>
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
const SECTIONS = [
  { key: 'identity', icon: 'li:colors', label: 'Identity' }, { key: 'people', icon: 'li:users', label: 'People' }, { key: 'build', icon: 'li:layers', label: 'Build' },
  { key: 'capital', icon: 'li:euro', label: 'Capital' }, { key: 'deepstreet', icon: 'li:map', label: 'Deep Street' }, { key: 'control', icon: 'li:sliders', label: 'Control' },
];
const SECTION_CARD: Record<string, { title: string; description: string; links: string[] }> = {
  identity: { title: 'Identity', description: 'Wer wir sind: Marke, Werte und Auftritt von PREA.', links: ['Brand', 'Werte', 'Team'] },
  people: { title: 'People', description: 'Mitarbeitende, Rollen und Zuständigkeiten im Überblick.', links: ['Verzeichnis', 'Rollen', 'Onboarding'] },
  build: { title: 'Build', description: 'Projekte in Planung und Bau – Status, Fristen, Beteiligte.', links: ['Projekte', 'Bauzeitplan', 'Dokumente'] },
  capital: { title: 'Capital', description: 'Finanzierung, Budgets und Kennzahlen der Portfolios.', links: ['Budgets', 'Kennzahlen', 'Reports'] },
  deepstreet: { title: 'Deep Street', description: 'Sechs Kapitel mit den Grundsätzen, die unser Denken, Handeln und unsere Kultur definieren.', links: ['Dashboard', 'Map', 'Portfolio'] },
  control: { title: 'Control', description: 'Einstellungen, Berechtigungen und Systemstatus.', links: ['Einstellungen', 'Rechte', 'Status'] },
};

function AttachMenu({ gmail, drive, cal, setGmail, setDrive, setCal }: { gmail: boolean; drive: boolean; cal: boolean; setGmail: (v: boolean) => void; setDrive: (v: boolean) => void; setCal: (v: boolean) => void }) {
  return (
    <DropdownMenu groups={[
      [{ key: 'files', label: 'Dateien / Fotos hinzufügen', icon: 'li:paperclip', showChevron: false }, { key: 'project', label: 'Zum Projekt hinzufügen', icon: 'li:folder-plus', showChevron: false }],
      [{ key: 'skills', label: 'Skills', icon: 'li:file-06', showChevron: false }, { key: 'plugins', label: 'Plugins hinzufügen', icon: 'li:zap-square', showChevron: false },
        { key: 'connectors', label: 'Konnektoren', icon: 'li:unplug', children: [
          [{ key: 'add', label: 'Konnektor hinzufügen', icon: 'li:plus', showChevron: false }, { key: 'manage', label: 'Konnektoren verwalten', icon: 'li:dataflow-01', showChevron: false }],
          [{ key: 'gmail', label: 'Gmail', icon: 'gmail', toggle: { checked: gmail, onChange: setGmail } }, { key: 'drive', label: 'Drive', icon: 'google-drive', toggle: { checked: drive, onChange: setDrive } }, { key: 'cal', label: 'Kalender', icon: 'google-calendar', toggle: { checked: cal, onChange: setCal } }],
        ] }],
    ]} />
  );
}

export function DashboardScreen() {
  const [sent, setSent] = useState<string | null>(null);
  const [section, setSection] = useState<string | null>(null);   // nav_InfoCard hidden until a BottomNav section is clicked
  const [gmail, setGmail] = useState(true); const [drive, setDrive] = useState(true); const [cal, setCal] = useState(false);
  const card = section ? SECTION_CARD[section] : null;
  // the nav_InfoCard sits right above the active BottomNav button (Figma: same left edge)
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [cardLeft, setCardLeft] = useState(8);
  useLayoutEffect(() => { const b = section ? btnRefs.current[section] : null; if (b) setCardLeft(b.offsetLeft); }, [section]);
  // close the card when clicking anywhere outside it (or its button)
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!section) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (cardRef.current?.contains(t)) return;
      if (Object.values(btnRefs.current).some((b) => b?.contains(t))) return;
      setSection(null);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [section]);
  return (
    <AppShell active="chat"
      bottomLeft={SECTIONS.map((s) => (
        <BottomNavButton key={s.key} ref={(el) => { btnRefs.current[s.key] = el; }} icon={s.icon} active={section === s.key} onClick={() => setSection(section === s.key ? null : s.key)}>{s.label}</BottomNavButton>
      ))}
      bottomOverlay={card && (
        <div ref={cardRef} className="app__dash-card" style={{ left: cardLeft }}>
          <NavInfoCard title={card.title} description={card.description} links={card.links.map((l) => ({ key: l, label: l }))} />
        </div>
      )}
    >
      <div className="app__dash">
        <div className="app__hello">Hallo, Gabriel</div>
        <ChatInput
          width={540} placeholder="Wie kann ich dir helfen?" modelLabel="GPT 5.6" modelIcon="OpenAI"
          onSend={(t) => setSent(t)}
          attachMenu={<AttachMenu gmail={gmail} drive={drive} cal={cal} setGmail={setGmail} setDrive={setDrive} setCal={setCal} />}
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
      </div>
    </AppShell>
  );
}

/* ─── 2 · Data panel + map (Ebenen / Filter) ─────────────────────────────── */
const LAYER_COLORS: ColorPickerRow[] = [
  { key: 'low', label: 'Moderat', value: { hex: 'E1F509', opacity: 100 } },
  { key: 'mid', label: 'Erhöht', value: { hex: 'F5AA09', opacity: 100 } },
  { key: 'high', label: 'Hoch', value: { hex: 'FB3D3D', opacity: 80 } },
];

/** layer_filter with its 3 step tabs (Figma Step=1 / 2 / 3). */
function LayerFilter({ onClose, onApply }: { onClose: () => void; onApply: () => void }) {
  const [step, setStep] = useState('1');
  const [f, setF] = useState<Record<string, boolean>>({ a: true, b: true, c: false, d: true });
  const [range, setRange] = useState({ from: '', to: '' });
  return (
    <FilterPanel tabs={[{ key: '1', label: 'Tab item' }, { key: '2', label: 'Tab item' }, { key: '3', label: 'Tab item' }]} activeTab={step} onTabChange={setStep}
      onClose={onClose} onApply={onApply} onReset={() => { setF({}); setRange({ from: '', to: '' }); }}>
      {step === '1' && (
        <>
          <FilterSection gap={10}>
            <TextInput width="100%" placeholder="Name" /><TextInput width="100%" placeholder="City" /><TextInput width="100%" placeholder="PLZ" />
            <TextInput width="100%" placeholder="Straße" hint="Lorem ipsum dolores sub-description" />
            <TextInput width="100%" placeholder="Bundesland" dropdown />
          </FilterSection>
          <FilterSection>
            <FilterGroupHead title="Gegenstand der Transaktion" />
            {['a', 'b', 'c', 'd'].map((k) => <FilterItem key={k} label="Item name" icon="grid-01" checked={!!f[k]} onChange={(v) => setF((s) => ({ ...s, [k]: v }))} />)}
          </FilterSection>
          <FilterSection>
            <FilterGroupHead title="Filter" hint="(Alle Angaben werden UND-verknüpft)" />
            {['e', 'f', 'g'].map((k) => <FilterItem key={k} label="Item name" icon="grid-01" checked={!!f[k]} onChange={(v) => setF((s) => ({ ...s, [k]: v }))} />)}
          </FilterSection>
        </>
      )}
      {step === '2' && (
        <>
          <FilterSection>
            <FilterGroupHead title="Nutzung" />
            <FilterItem label="Büro" checked={!!f.office} onChange={(v) => setF((s) => ({ ...s, office: v }))} />
            <FilterItem label="Wohnen" icon="home" checked={!!f.living} onChange={(v) => setF((s) => ({ ...s, living: v }))} />
            <FilterItem label="Neubau" sub checked={!!f.new} onChange={(v) => setF((s) => ({ ...s, new: v }))} />
            <FilterItem label="Bestand" sub checked={!!f.old} onChange={(v) => setF((s) => ({ ...s, old: v }))} />
            <FilterItem label="Handel" icon="shopping-cart" checked={!!f.retail} onChange={(v) => setF((s) => ({ ...s, retail: v }))} />
          </FilterSection>
          <FilterSection>
            <FilterGroupHead title="Status" />
            <FilterItem label="In Planung" status="in_planung" checked={!!f.s1} onChange={(v) => setF((s) => ({ ...s, s1: v }))} />
            <FilterItem label="Im Bau" status="im_baut" checked={!!f.s2} onChange={(v) => setF((s) => ({ ...s, s2: v }))} />
            <FilterItem label="Fertiggestellt" status="fertiggestellt" checked={!!f.s3} onChange={(v) => setF((s) => ({ ...s, s3: v }))} />
          </FilterSection>
        </>
      )}
      {step === '3' && (
        <FilterSection gap={10}>
          <FilterRange label="Fläche (m²)" from={range.from} to={range.to} onChange={setRange} />
          <FilterRange label="Baujahr" fromPlaceholder="1900" toPlaceholder="2026" />
          <FilterRange label="Miete (€/m²)" />
        </FilterSection>
      )}
    </FilterPanel>
  );
}

/** Popover host: closes on outside click; only one open at a time. */
function useOutsideClose(open: boolean, onClose: () => void, ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open, onClose, ref]);
}

type LayerPopover = { kind: 'filter' | 'colors'; layer: string } | null;

/** DataPanelWrapper column. The primary panel has the collapse button and the li:cols tool (active while the secondary panel is open);
 *  a secondary panel has neither — it is closed by clicking the active li:cols button on the primary panel again. */
function DataPanelColumn({ crumbsLabels, activeTab, onDuplicate, duplicateActive, onCollapse, secondary }: { crumbsLabels: string[]; activeTab: string; onDuplicate?: () => void; duplicateActive?: boolean; onCollapse?: () => void; secondary?: boolean }) {
  const [tab, setTab] = useState(activeTab);
  const [sub, setSub] = useState('alle');
  return (
    <div className="app__panel">
      <PathMenu breadcrumb={<Breadcrumb items={crumbsWithMenu(...crumbsLabels)} />} onTogglePanel={secondary ? undefined : onCollapse} />
      <SearchPanel width="100%"><SearchInput width="100%" placeholder="Suche…" onChange={() => undefined} /></SearchPanel>
      <PanelTabs width="100%"
        tabs={[{ key: 'asset', label: 'Asset' }, { key: 'analytics', label: 'Analytics' }, { key: 'relation', label: 'Relation' }, { key: 'notes', label: 'Notes' }]}
        activeKey={tab} onChange={setTab}
        subTabs={[{ key: 'alle', label: 'Alle' }, { key: 'adresse', label: 'Adresse' }, { key: 'grund', label: 'Grundstück' }, { key: 'flur', label: 'Flurstücke' }, { key: 'geb', label: 'Gebäude' }]}
        activeSubKey={sub} onSubChange={setSub}
        tools={secondary ? <span className="app__tools-spacer" aria-hidden /> : <IconButton icon="li:cols" label="Panel daneben öffnen" active={duplicateActive} aria-pressed={duplicateActive} onClick={onDuplicate} />}
      />
      <div className="app__panel-scroll">
        <DataPanel width="100%">
          {tab === 'relation' ? (
            Array.from({ length: 5 }, (_, i) => (
              <DataGroup key={i} title="HeadGroup-lv.1"><DataBox minHeight={140}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 140, color: '#d946ef', fontSize: 12 }}>AG Grid Table</div></DataBox></DataGroup>
            ))
          ) : (
            <>
              <DataGroup title="HeadGroup-lv.1">
                <DataBox groups={[{ head: 'Head', values: ['Info item value', 'Info item value'] }, { head: 'Head', values: ['Info item value'] }, { head: 'Head', values: ['Info item value'] }]} subGroups={[['Info subItem value', 'Info subItem value', 'Info subItem value', 'Info subItem value'], [], ['Info subItem value', 'Info subItem value']]} />
              </DataGroup>
              <DataGroup title="HeadGroup-lv.1">
                <DataGroup level={2} title="subHeadGroup-lv.2"><DataBox minHeight={165}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 165, color: '#d946ef', fontSize: 12 }}>AG Grid Table</div></DataBox></DataGroup>
                <DataGroup level={2} title="subHeadGroup-lv.2" defaultOpen={false} />
              </DataGroup>
              <DataGroup title="HeadGroup-lv.1"><DataBox minHeight={140}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 140, color: '#d946ef', fontSize: 12 }}>AG Grid Table</div></DataBox></DataGroup>
              <DataGroup title="HeadGroup-lv.1"><DataBox minHeight={140}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 140, color: '#d946ef', fontSize: 12 }}>AG Grid Table</div></DataBox></DataGroup>
              <DataGroup title="HeadGroup-lv.1" defaultOpen={false} /><DataGroup title="HeadGroup-lv.1" defaultOpen={false} /><DataGroup title="HeadGroup-lv.1" defaultOpen={false} />
            </>
          )}
        </DataPanel>
      </div>
    </div>
  );
}

export function DataPanelScreen() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [secondPanel, setSecondPanel] = useState(false);
  const [layers, setLayers] = useState(false);
  const [edit, setEdit] = useState(false);
  const [popover, setPopover] = useState<LayerPopover>(null);
  const [colors, setColors] = useState<ColorPickerRow[]>(LAYER_COLORS);
  const popRef = useRef<HTMLDivElement>(null);
  const closePop = React.useCallback(() => setPopover(null), []);
  useOutsideClose(!!popover, closePop, popRef);
  const layerProps = (name: string) => ({
    onFilter: () => setPopover((p) => (p?.kind === 'filter' && p.layer === name ? null : { kind: 'filter', layer: name })),
    onColors: () => setPopover((p) => (p?.kind === 'colors' && p.layer === name ? null : { kind: 'colors', layer: name })),
  });
  return (
    <AppShell active="projekte" editMode={edit} onExitEdit={() => setEdit(false)}
      bottomLeft={<><BottomNavButton icon="li:layers" active={layers} onClick={() => setLayers((v) => !v)}>Ebenen (3)</BottomNavButton><BottomNavButton icon="li:pencil" onClick={() => setEdit(true)}>Bearbeiten</BottomNavButton></>}>
      <TabsMain items={TABS} defaultActiveKey="2" onEdit={() => undefined} />
      <div className="app__split">
        {panelOpen && <DataPanelColumn crumbsLabels={['Deep Street', 'Asset', 'Flurstücke', '1802']} activeTab="asset" onCollapse={() => setPanelOpen(false)} onDuplicate={() => setSecondPanel((v) => !v)} duplicateActive={secondPanel} />}
        {panelOpen && secondPanel && <DataPanelColumn crumbsLabels={['Deep Street', 'Relation', 'Sales']} activeTab="relation" secondary />}
        <MapWithNav>
          {!panelOpen && <div className="app__float" style={{ left: 10, top: 10 }}><ToggleDataMenu title="Deep Street" onToggle={() => setPanelOpen(true)} /></div>}
        </MapWithNav>
        {/* Ebenen menu sits over the data panel area (Figma: x 8 inside the DataPanelWrapper, bottom) */}
          {layers && (
            <div className="app__float" style={{ left: 8, bottom: 8 }}>
              <MapLayersMenu onClose={() => setLayers(false)} onRemoveActive={() => undefined}
                activeLayers={<><MapLayerItem label="Map Layer" {...layerProps('active-1')} /><MapLayerItem label="Map Layer" {...layerProps('active-2')} /><MapLayerItem label="Map Layer" {...layerProps('active-3')} /></>}>
                <MapLayerItem kind="group" label="Map Layer Group" />
                <MapLayerItem label="Map Layer Group" defaultOpen><MapLayerItem label="Map Layer" {...layerProps('g2-1')} /><MapLayerItem label="Map Layer" {...layerProps('g2-2')} /><MapLayerItem label="Map Layer" {...layerProps('g2-3')} /></MapLayerItem>
                <MapLayerItem kind="group" label="Map Layer Group" />
                <MapLayerItem label="Map Layer Group" defaultOpen>
                  <MapLayerItem kind="subgroup" label="Map Layer subGroup" />
                  <MapLayerItem kind="subgroup" label="Map Layer subGroup" defaultOpen><MapLayerItem label="Map Layer" {...layerProps('sg-1')} /><MapLayerItem label="Map Layer" {...layerProps('sg-2')} /><MapLayerItem label="Map Layer" {...layerProps('sg-3')} /></MapLayerItem>
                </MapLayerItem>
                <MapLayerItem kind="group" label="Map Layer Group" /><MapLayerItem kind="group" label="Map Layer Group" /><MapLayerItem kind="group" label="Map Layer Group" />
                <MapLayerItem label="Map Layer Group" defaultOpen><MapLayerItem label="Map Layer" {...layerProps('g5-1')} /><MapLayerItem label="Map Layer" {...layerProps('g5-2')} /></MapLayerItem>
                <MapLayerItem kind="group" label="Map Layer Group" /><MapLayerItem kind="group" label="Map Layer Group" /><MapLayerItem kind="group" label="Map Layer Group" /><MapLayerItem kind="group" label="Map Layer Group" /><MapLayerItem kind="group" label="Map Layer Group" /><MapLayerItem kind="group" label="Map Layer Group" />
              </MapLayersMenu>
            </div>
          )}
          {layers && popover && (
            <div ref={popRef} className="app__float" style={{ left: 8 + 314 + 8, bottom: 8 }}>
              {popover.kind === 'filter'
                ? <LayerFilter onClose={closePop} onApply={closePop} />
                : <ColorPicker rows={colors} onRowsChange={setColors} swatches={['E1F509', '21E713', 'F5AA09', 'FB3D3D', '0663E5']} onApply={closePop} onReset={() => setColors(LAYER_COLORS)} />}
            </div>
          )}
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
  const [edit, setEdit] = useState(false);
  return (
    <AppShell active="deepstreet" editMode={edit} onExitEdit={() => setEdit(false)}
      bottomLeft={<><BottomNavButton icon="li:plus" variant="primary">Neu erstellen</BottomNavButton><BottomNavButton icon="li:layers">Ebenen</BottomNavButton></>}
      bottomIcons={['li:clock', 'li:globe-02']} bottomDate="Mo. 07. Sep 2026" bottomTime="14:32">
      <TabsMain items={[{ key: '1', label: 'Portfolio Name', closable: true }, { key: '2', label: 'Portfolio: Projektname 01', closable: true }, { key: '3', label: 'Portfolio Name', closable: true }, { key: '4', label: 'Portfolio Name', closable: true }]} defaultActiveKey="2" onEdit={() => undefined} />
      <div className="app__panel app__panel--wide" style={{ flex: '1 1 0', minHeight: 0 }}>
        <PathMenu breadcrumb={<Breadcrumb items={crumbs('Deep Street', 'Portfolio', 'Projektname 01')} />} search={<SearchInput width={270} placeholder="Suche…" onChange={() => undefined} />} />
        <PanelTabs width="100%"
          tabs={['Dashboard', 'Task', 'Relation', 'Asset', 'Map', 'Analytics', 'Data', 'Pitch', 'Notes'].map((l) => ({ key: l.toLowerCase(), label: l }))}
          activeKey={tab} onChange={setTab} onAddTab={() => undefined}
          subTabs={[{ key: 't1', label: 'Tabelle 1' }, { key: 't2', label: 'Tabelle 2' }, { key: 't3', label: 'Tabelle 3' }]} activeSubKey={sub} onSubChange={setSub} onAddSubTab={() => undefined}
          tools={<><IconButton icon="li:plus" label="Neu" variant="primary" /><ToolDivider /><IconButton icon="li:list" label="Liste" /><IconButton icon="li:cols" label="Tabelle" active /><IconButton icon="li:info-1" label="Info" /></>}
        />
        {/* info_box_module full width, then the kanban board fills the remaining height (columns scroll on their own) */}
        <InfoBoxModule width="100%">
          {Array.from({ length: 8 }, (_, i) => <InfoBox key={i} label="Eiusmod dolor Eius mod dolor Eiusmod dolor" value="XXXXXXX" />)}
        </InfoBoxModule>
        <div className="app__kanban">
          <KanbanBoard className="app__kanban-board">
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
  const [gmail, setGmail] = useState(true); const [drive, setDrive] = useState(true); const [cal, setCal] = useState(false);
  const person = (name: string) => ({ author: { name, avatar: AVATAR_URL }, date: '30. Jun 11:40' });
  const actions = [
    { key: 'src', icon: 'reddit', label: 'Reddit' }, { key: 'edit', icon: 'li:pencil', title: 'Bearbeiten' }, { key: 'share', icon: 'li:share', title: 'Teilen' }, { key: 'more', icon: 'li:ellipsis-horizontal', title: 'Mehr' },
  ];
  return (
    <AppShell active="chat" bottomLeft={<BottomNavButton icon="li:message-square" active>Chats</BottomNavButton>}>
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
            <div style={{ padding: 8 }}>
              <ChatNotes width="100%" placeholder="Antwort schreiben…" onSend={() => undefined}
                attachMenu={<AttachMenu gmail={gmail} drive={drive} cal={cal} setGmail={setGmail} setDrive={setDrive} setCal={setCal} />} />
            </div>
          </div>
        </div>
        <MapWithNav />
      </div>
    </AppShell>
  );
}
