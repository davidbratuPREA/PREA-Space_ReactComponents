import React, { useState } from 'react';
import { ToggleSwitch, StatusBadge, FilterItem, FilterGroupHead, FilterPanel, FilterSection, FilterTabs, FilterRange } from '../../../Filters';
import { TextInput } from '../../../Inputs';
import type { ComponentEntry } from './types';

// ─── Raw source files ──────────────────────────────────────────────────────
import toggleSrc      from '../../../Filters/ToggleSwitch.tsx?raw';
import statusSrc      from '../../../Filters/StatusBadge.tsx?raw';
import filterItemSrc  from '../../../Filters/FilterItem.tsx?raw';
import filterPanelSrc from '../../../Filters/FilterPanel.tsx?raw';
import filtersTypes   from '../../../Filters/Filters.types.ts?raw';
import filtersCss     from '../../../Filters/Filters.css?raw';
import filtersIndex   from '../../../Filters/index.ts?raw';

// ─── Demo ─────────────────────────────────────────────────────────────────
const headingStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 500, color: '#888', marginBottom: 12,
  textTransform: 'uppercase', letterSpacing: '0.05em',
};
const TABS = [{ key: 'a', label: 'Tab item' }, { key: 'b', label: 'Tab item' }, { key: 'c', label: 'Tab item' }];

function FiltersDemo() {
  const [tab, setTab] = useState('a');
  const [log, setLog] = useState('');
  const [range, setRange] = useState({ from: '', to: '' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

      <div>
        <p style={headingStyle}>FilterPanel — the three Figma steps (click the tabs)</p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start', padding: '0 0 16px' }}>
          <FilterPanel tabs={TABS} activeTab={tab} onTabChange={setTab} onClose={() => setLog('close')} onApply={() => setLog('apply')} onReset={() => setLog('reset')} height={502}>
            {tab === 'a' && (
              <>
                <FilterSection gap={10}>
                  <TextInput width="100%" placeholder="Name" />
                  <TextInput width="100%" placeholder="City" />
                  <TextInput width="100%" placeholder="PLZ" />
                  <TextInput width="100%" placeholder="Straße" hint="Lorem ipsum dolores sub-description" />
                  <TextInput width="100%" placeholder="Bundesland" dropdown />
                </FilterSection>
                <FilterSection>
                  <FilterGroupHead title="Gegenstand der Transaktion" />
                  <FilterItem label="Item name" />
                  <FilterItem label="Item name" />
                  <FilterItem label="Item name" defaultChecked={false} />
                  <FilterItem label="Item name" />
                </FilterSection>
                <FilterSection>
                  <FilterGroupHead title="Filter" hint="(Alle Angaben werden UND-verknüpft)" />
                  <FilterItem label="Item name" defaultChecked={false} />
                  <FilterItem label="Item name" defaultChecked={false} />
                  <FilterItem label="Item name" defaultChecked={false} />
                </FilterSection>
              </>
            )}
            {tab === 'b' && (
              <FilterSection>
                <FilterItem label="Item name" />
                <FilterItem label="Item name" defaultChecked={false} />
                <FilterItem label="sub-Item name" sub defaultChecked={false} />
                <FilterItem label="sub-Item name" sub defaultChecked={false} />
                <FilterItem label="sub-Item name" sub defaultChecked={false} />
                <FilterItem label="sub-Item name" sub defaultChecked={false} />
                <FilterItem label="Item name" defaultChecked={false} />
                <FilterItem label="sub-Item name" sub defaultChecked={false} />
                <FilterItem label="Item name" defaultChecked={false} />
                <FilterItem label="Item name" defaultChecked={false} />
                <FilterItem label="Item name" />
                <FilterItem label="Item name" defaultChecked={false} />
                <FilterItem label="Item name" defaultChecked={false} />
                <FilterItem label="Item name" />
              </FilterSection>
            )}
            {tab === 'c' && (
              <FilterSection gap={10}>
                <FilterRange label="Description" from={range.from} to={range.to} onChange={setRange} />
                <FilterRange label="Description" />
                <FilterRange label="Description" />
                <TextInput width="100%" label="Description" placeholder="Input name" />
                <TextInput width="100%" label="Description" placeholder="Input name" />
                <TextInput width="100%" label="Description" placeholder="Input name" />
                <TextInput width="100%" label="Description" placeholder="Input name" />
              </FilterSection>
            )}
          </FilterPanel>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <p style={headingStyle}>ToggleSwitch</p>
              <div style={{ display: 'flex', gap: 12 }}>
                <ToggleSwitch defaultChecked label="On" />
                <ToggleSwitch label="Off" />
                <ToggleSwitch defaultChecked disabled label="Disabled" />
              </div>
            </div>
            <div>
              <p style={headingStyle}>FilterItem — item, sub-item, special (status)</p>
              <div style={{ width: 278, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <FilterItem label="Item name" />
                <FilterItem label="Item name" defaultChecked={false} />
                <FilterItem label="sub-Item name" sub />
                <FilterItem label="sub-Item name" sub defaultChecked={false} />
                <FilterItem label="In Planung" status="in_planung" />
                <FilterItem label="Im Bau" status="im_baut" defaultChecked={false} />
                <FilterItem label="Fertiggestellt" status="fertiggestellt" onChange={(v) => setLog(`fertiggestellt → ${v}`)} />
              </div>
            </div>
            <div>
              <p style={headingStyle}>StatusBadge & FilterTabs</p>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                <StatusBadge status="in_planung" /><StatusBadge status="im_baut" /><StatusBadge status="fertiggestellt" />
              </div>
              <FilterTabs tabs={TABS} defaultActiveKey="b" />
            </div>
          </div>
        </div>
        {log && <p style={{ fontSize: 11, color: '#888', margin: 0 }}>{log}</p>}
      </div>

    </div>
  );
}

// ─── Usage snippet ─────────────────────────────────────────────────────────
const USAGE = `import { FilterPanel, FilterSection, FilterGroupHead, FilterItem, FilterRange, ToggleSwitch, StatusBadge } from './Filters';
import { TextInput } from './Inputs';
// Requires ./Inputs and ./Icon.

<FilterPanel
  tabs={[{ key: 'general', label: 'Allgemein' }, { key: 'layers', label: 'Layer' }]}
  activeTab={tab} onTabChange={setTab}
  onClose={close} onApply={apply} onReset={reset}
  height={502}
>
  <FilterSection gap={10}>
    <TextInput width="100%" placeholder="Name" />
    <TextInput width="100%" placeholder="Bundesland" dropdown />
  </FilterSection>
  <FilterSection>
    <FilterGroupHead title="Gegenstand der Transaktion" />
    <FilterItem label="Büro" checked={f.office} onChange={(v) => set('office', v)} />
    <FilterItem label="Wohnen" icon="home" checked={f.living} onChange={(v) => set('living', v)} />
    <FilterItem label="Neubau" sub checked={f.new} onChange={(v) => set('new', v)} />
    <FilterItem label="In Planung" status="in_planung" checked={f.planned} onChange={(v) => set('planned', v)} />
  </FilterSection>
  <FilterSection gap={10}>
    <FilterRange label="Fläche (m²)" from={r.from} to={r.to} onChange={setR} />
  </FilterSection>
</FilterPanel>

<ToggleSwitch checked={on} onChange={setOn} label="Aktiv" />
<StatusBadge status="fertiggestellt" />
`;

// ─── Registry entry ────────────────────────────────────────────────────────
export const filtersEntry: ComponentEntry = {
  id: 'filters',
  name: 'Filters',
  category: 'Data Entry',
  description: 'Filter building blocks from the Figma Filters page: FilterPanel (tabs, sections, apply/reset footer), FilterItem with ToggleSwitch (item, sub-item, status variants), FilterGroupHead, FilterRange, FilterTabs and StatusBadge.',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=88-4554',
  files: [
    { name: 'FilterPanel.tsx',   content: filterPanelSrc },
    { name: 'FilterItem.tsx',    content: filterItemSrc },
    { name: 'ToggleSwitch.tsx',  content: toggleSrc },
    { name: 'StatusBadge.tsx',   content: statusSrc },
    { name: 'Filters.types.ts',  content: filtersTypes },
    { name: 'Filters.css',       content: filtersCss },
    { name: 'index.ts',          content: filtersIndex },
  ],
  usage: USAGE,
  props: [
    { name: 'FilterPanel.tabs / activeTab / onTabChange', type: '{ key, label }[] / string / (key) => void', default: '—', required: false, description: 'Header tabs (secondary underline style).' },
    { name: 'FilterPanel.onClose',    type: '() => void',        default: '—', required: false, description: 'Close (×) button.' },
    { name: 'FilterPanel.onApply / onReset', type: '() => void', default: '—', required: false, description: 'Footer buttons; footer hidden when both omitted.' },
    { name: 'FilterPanel.height',     type: 'number | string',   default: 'auto', required: false, description: 'Body scrolls when content is taller (Figma 502).' },
    { name: 'FilterSection.gap',      type: 'number',            default: '6',  required: false, description: 'Row gap; use 10 for inputs.' },
    { name: 'FilterItem.checked / onChange', type: 'boolean / (checked) => void', default: 'true', required: false, description: 'Toggle state; label click toggles too.' },
    { name: 'FilterItem.icon',        type: 'string | ReactNode', default: "'grid-01'", required: false, description: '14px icon.' },
    { name: 'FilterItem.sub',         type: 'boolean',           default: 'false', required: false, description: 'Indented sub item without icon.' },
    { name: 'FilterItem.status',      type: "'in_planung' | 'im_baut' | 'fertiggestellt'", default: '—', required: false, description: 'Renders a StatusBadge instead of the icon.' },
    { name: 'FilterRange.from / to / onChange', type: 'string / string / ({from,to}) => void', default: '—', required: false, description: 'Two inputs joined by "bis".' },
    { name: 'ToggleSwitch.checked / onChange', type: 'boolean / (checked) => void', default: 'false', required: false, description: '32×18 switch.' },
    { name: 'StatusBadge.status',     type: "'in_planung' | 'im_baut' | 'fertiggestellt'", default: '—', required: true, description: '20px status badge.' },
  ],
  demo: <FiltersDemo />,
};
