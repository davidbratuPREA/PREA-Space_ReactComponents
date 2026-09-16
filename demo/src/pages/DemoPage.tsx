import React, { useState } from 'react';
import { DemoFrame } from '../demo/AppShell';
import { DashboardScreen, DataPanelScreen, PortfolioScreen, NotesScreen } from '../demo/screens';

const SCREENS = [
  { key: 'dashboard', label: 'Dashboard', caption: 'MainNav rail · ChatInput — the „+“ opens the Lvl2 menu, Chats / Projekte dropdowns · click a BottomNav section to show its nav_InfoCard above the button', render: () => <DashboardScreen /> },
  { key: 'data', label: 'Data panel & map', caption: 'TabsMain · DataPanelWrapper in the active-tab colour · PathMenu + Breadcrumb · SearchPanel · PanelTabs · DataPanel / DataGroup / DataBox · „Ebenen“ toggles the MapLayersMenu · FilterPanel · „Bearbeiten“ switches the BottomNav to edit mode · MapNav', render: () => <DataPanelScreen /> },
  { key: 'portfolio', label: 'Portfolio · Kanban', caption: 'TabsMain · PathMenu with search · PanelTabs with tools · InfoBoxModule KPI strip · KanbanBoard with status columns', render: () => <PortfolioScreen /> },
  { key: 'notes', label: 'Notes & chat', caption: 'Notes panel: NoteThread with answers and nested comments · ChatNotes composer · DropdownMenu Lvl2 (Konnektoren) · MapNav', render: () => <NotesScreen /> },
];

export function DemoPage() {
  const [active, setActive] = useState(SCREENS[0].key);
  const [zoom, setZoom] = useState<'fit' | number>('fit');
  const screen = SCREENS.find((s) => s.key === active) ?? SCREENS[0];
  return (
    <div className="comp-page comp-page--wide demo-page">
      <div className="comp-page__header">
        <div className="comp-page__eyebrow">App demo</div>
        <h1 className="comp-page__title">PREA Space — screens</h1>
        <p className="comp-page__desc">Four screens of the app assembled only from the components in this library, following the Figma Demo page. Everything is live: hover the rail items, open dropdowns, collapse Kanban groups, drag the perspective control, toggle the theme in the header. The frame is scaled to fit by default — switch to 100 % to see the components at their real size.</p>
      </div>
      <div className="demo-page__tabs" role="tablist">
        {SCREENS.map((s) => (
          <button key={s.key} type="button" role="tab" aria-selected={s.key === active} className={['demo-page__tab', s.key === active && 'demo-page__tab--active'].filter(Boolean).join(' ')} onClick={() => setActive(s.key)}>{s.label}</button>
        ))}
      </div>
      <div className="demo-page__bar">
        <p className="demo-page__caption">{screen.caption}</p>
        <div className="demo-page__zoom" role="group" aria-label="Zoom">
          <span>Zoom</span>
          {(['fit', 1] as const).map((z) => (
            <button key={String(z)} type="button" className={['demo-page__tab', zoom === z && 'demo-page__tab--active'].filter(Boolean).join(' ')} onClick={() => setZoom(z)}>{z === 'fit' ? 'Fit to page' : '100 % (1:1)'}</button>
          ))}
        </div>
      </div>
      <DemoFrame key={screen.key} zoom={zoom}>{screen.render()}</DemoFrame>
    </div>
  );
}
