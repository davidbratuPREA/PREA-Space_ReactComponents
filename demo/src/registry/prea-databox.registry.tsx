import React, { useState } from 'react';
import { DataPanel, DataGroup, DataBox, DataBoxItem, DataButton } from '../../../DataBox';
import type { ComponentEntry } from './types';

// ─── Raw source files ──────────────────────────────────────────────────────
import dataPanelSrc   from '../../../DataBox/DataPanel.tsx?raw';
import dataGroupSrc   from '../../../DataBox/DataGroup.tsx?raw';
import dataBoxSrc     from '../../../DataBox/DataBox.tsx?raw';
import dataBoxItemSrc from '../../../DataBox/DataBoxItem.tsx?raw';
import dataButtonSrc  from '../../../DataBox/DataButton.tsx?raw';
import dataBoxTypes   from '../../../DataBox/DataBox.types.ts?raw';
import dataBoxCss     from '../../../DataBox/DataBox.css?raw';
import dataBoxIndex   from '../../../DataBox/index.ts?raw';

// ─── Demo ─────────────────────────────────────────────────────────────────
const headingStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: '#888',
  marginBottom: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const sampleGroups = [
  { head: 'Head', values: ['Info item value', 'Info item value'] },
  { head: 'Head', values: ['Info item value'] },
  { head: 'Head', values: ['Info item value'] },
];
const sampleSubGroups = [
  ['Info subItem value', 'Info subItem value', 'Info subItem value', 'Info subItem value'],
  ['Info subItem value', 'Info subItem value'],
];

/** Placeholder for the Figma "Item=AG" slot — where an AG Grid table would mount */
function AgPlaceholder() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 500,
        color: '#f346ff',
      }}
    >
      AG Grid Table
    </div>
  );
}

function DataBoxDemo() {
  const [log, setLog] = useState<string>('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

      <div>
        <p style={headingStyle}>DataPanel — click headers to collapse / expand</p>
        <DataPanel>
          <DataGroup title="HeadGroup-lv.1" onPlusClick={() => setLog('plus → HeadGroup-lv.1')}>
            <DataBox groups={sampleGroups} subGroups={sampleSubGroups} />
          </DataGroup>

          <DataGroup title="HeadGroup-lv.1">
            <DataGroup level={2} title="subHeadGroup-lv.2">
              <DataBox minHeight={165}><AgPlaceholder /></DataBox>
            </DataGroup>
            <DataGroup level={2} title="subHeadGroup-lv.2" defaultOpen={false}>
              <DataBox minHeight={165}><AgPlaceholder /></DataBox>
            </DataGroup>
          </DataGroup>

          <DataGroup title="HeadGroup-lv.1" defaultOpen={false}>
            <DataBox minHeight={143}><AgPlaceholder /></DataBox>
          </DataGroup>
          <DataGroup title="HeadGroup-lv.1" defaultOpen={false}>
            <DataBox minHeight={143}><AgPlaceholder /></DataBox>
          </DataGroup>
        </DataPanel>
        {log && <p style={{ fontSize: 11, color: '#888', marginTop: 8 }}>{log}</p>}
      </div>

      <div>
        <p style={headingStyle}>DataBox — standalone (Item=DataBox)</p>
        <div style={{ width: 498 }}>
          <DataBox groups={sampleGroups} subGroups={sampleSubGroups} />
        </div>
      </div>

      <div>
        <p style={headingStyle}>DataBox — free-form slot (Item=AG)</p>
        <div style={{ width: 498 }}>
          <DataBox minHeight={165}><AgPlaceholder /></DataBox>
        </div>
      </div>

      <div>
        <p style={headingStyle}>DataBoxItem — text atoms</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          <DataBoxItem variant="head">Head</DataBoxItem>
          <DataBoxItem variant="value">Info item value</DataBoxItem>
          <DataBoxItem variant="subValue">Info subItem value</DataBoxItem>
        </div>
      </div>

      <div>
        <p style={headingStyle}>DataButton — hover me</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <DataButton onClick={() => setLog('plus clicked')} />
          <DataButton icon="li:minus" label="Remove" />
          <DataButton icon="li:pencil" label="Edit" />
        </div>
      </div>

    </div>
  );
}

// ─── Usage snippet ─────────────────────────────────────────────────────────
const USAGE = `import { DataPanel, DataGroup, DataBox } from './DataBox';

<DataPanel>
  {/* Level-1 group with a data card */}
  <DataGroup title="HeadGroup-lv.1" onPlusClick={() => addItem()}>
    <DataBox
      groups={[
        { head: 'Head', values: ['Info item value', 'Info item value'] },
        { head: 'Head', values: ['Info item value'] },
      ]}
      subGroups={[
        ['Info subItem value', 'Info subItem value'],
        ['Info subItem value'],
      ]}
    />
  </DataGroup>

  {/* Nested level-2 groups, one holding an AG Grid table */}
  <DataGroup title="HeadGroup-lv.1">
    <DataGroup level={2} title="subHeadGroup-lv.2">
      <DataBox minHeight={165}>
        <AgGridReact rowData={rows} columnDefs={cols} />
      </DataBox>
    </DataGroup>
    <DataGroup level={2} title="subHeadGroup-lv.2" defaultOpen={false}>
      …
    </DataGroup>
  </DataGroup>

  {/* Controlled open state */}
  <DataGroup title="HeadGroup-lv.1" open={isOpen} onOpenChange={setIsOpen}>
    …
  </DataGroup>
</DataPanel>
`;

// ─── Registry entry ────────────────────────────────────────────────────────
export const dataBoxEntry: ComponentEntry = {
  id: 'databox',
  name: 'DataBox',
  category: 'Data Display',
  description: 'Collapsible data panel family: DataPanel › DataGroup (level 1/2, open/closed, optional plus button) › DataBox (info groups + sub values, or a free-form slot for an AG Grid table) › DataBoxItem.',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=163-9227',
  files: [
    { name: 'DataPanel.tsx',    content: dataPanelSrc },
    { name: 'DataGroup.tsx',    content: dataGroupSrc },
    { name: 'DataBox.tsx',      content: dataBoxSrc },
    { name: 'DataBoxItem.tsx',  content: dataBoxItemSrc },
    { name: 'DataButton.tsx',   content: dataButtonSrc },
    { name: 'DataBox.types.ts', content: dataBoxTypes },
    { name: 'DataBox.css',      content: dataBoxCss },
    { name: 'index.ts',         content: dataBoxIndex },
  ],
  usage: USAGE,
  props: [
    // DataPanel
    { name: 'DataPanel.width',        type: 'number | string',          default: '500',   required: false, description: 'Panel width. Use "100%" to fill the parent.' },
    // DataGroup
    { name: 'DataGroup.title',        type: 'ReactNode',                default: '—',     required: true,  description: 'Header text.' },
    { name: 'DataGroup.level',        type: '1 | 2',                    default: '1',     required: false, description: 'Nesting level — level 2 is indented (10px inset).' },
    { name: 'DataGroup.open',         type: 'boolean',                  default: '—',     required: false, description: 'Controlled open state.' },
    { name: 'DataGroup.defaultOpen',  type: 'boolean',                  default: 'true',  required: false, description: 'Initial state when uncontrolled.' },
    { name: 'DataGroup.onOpenChange', type: '(open: boolean) => void',  default: '—',     required: false, description: 'Fires when the header is toggled.' },
    { name: 'DataGroup.onPlusClick',  type: '(e) => void',              default: '—',     required: false, description: 'When set, renders a DataButton (plus) in the header.' },
    // DataBox
    { name: 'DataBox.groups',         type: '{ head, values[] }[]',     default: '—',     required: false, description: 'Left column info groups (Head + values).' },
    { name: 'DataBox.subGroups',      type: 'ReactNode[][]',            default: '—',     required: false, description: 'Right column sub values; first group top, last group bottom.' },
    { name: 'DataBox.children',       type: 'ReactNode',                default: '—',     required: false, description: 'Free-form body (Figma Item=AG). Replaces groups/subGroups.' },
    { name: 'DataBox.minHeight',      type: 'number | string',          default: '—',     required: false, description: 'Min height for the free-form slot (Figma AG: 165px).' },
    // DataBoxItem
    { name: 'DataBoxItem.variant',    type: "'head' | 'value' | 'subValue'", default: "'value'", required: false, description: 'Text style: 10px head label, 12px medium value, or 10px right-aligned sub value.' },
    // DataButton
    { name: 'DataButton.icon',        type: 'string',                   default: "'li:plus'", required: false, description: 'Lucide icon in PREA "li:" naming.' },
    { name: 'DataButton.label',       type: 'string',                   default: "'Add'", required: false, description: 'Accessible label / tooltip.' },
    { name: 'className / style',      type: 'string / CSSProperties',   default: '—',     required: false, description: 'Available on every component.' },
  ],
  demo: <DataBoxDemo />,
};
