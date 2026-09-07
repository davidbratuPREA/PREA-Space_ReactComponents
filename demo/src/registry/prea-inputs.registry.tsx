import React, { useState } from 'react';
import {
  TextInput, SmallInput, ColorInput, CreateInput, SearchInput,
  SearchListItem, SearchListHeader, GroupSearchButton,
} from '../../../Inputs';
import type { ComponentEntry } from './types';

// ─── Raw source files ──────────────────────────────────────────────────────
import textInputSrc      from '../../../Inputs/TextInput.tsx?raw';
import smallInputSrc     from '../../../Inputs/SmallInput.tsx?raw';
import colorInputSrc     from '../../../Inputs/ColorInput.tsx?raw';
import createInputSrc    from '../../../Inputs/CreateInput.tsx?raw';
import searchInputSrc    from '../../../Inputs/SearchInput.tsx?raw';
import searchListItemSrc from '../../../Inputs/SearchListItem.tsx?raw';
import inputsTypes       from '../../../Inputs/Inputs.types.ts?raw';
import inputsCss         from '../../../Inputs/Inputs.css?raw';
import inputsIndex       from '../../../Inputs/index.ts?raw';

// ─── Demo ─────────────────────────────────────────────────────────────────
const headingStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 500, color: '#888', marginBottom: 12,
  textTransform: 'uppercase', letterSpacing: '0.05em',
};
const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 16 };

const RESULTS = (log: (s: string) => void) => [
  { key: 'recent', items: [
    { key: 'r1', label: 'Potsdamer Platz' },
    { key: 'r2', label: 'Potsdamer Str.' },
    { key: 'r3', label: 'Potsdam', action: { label: 'Router berechnen', icon: 'li:navigation', onClick: () => log('route → Potsdam') } },
  ] },
  { key: 'addr', title: 'Adresse', onShowAll: () => log('show all addresses'), items: [
    { key: 'a1', label: 'Potsdamer Str, 39114 Magdeburg' },
    { key: 'a2', label: 'Potshauser Straße, 42651 Solingen' },
    { key: 'a3', label: 'Potthälterpad, 45145 Essen-Frohnhausen' },
  ] },
  { key: 'proj', title: 'Projekte', onShowAll: () => log('show all projects'), items: [
    { key: 'p1', label: 'Potzhofer Straße, 42651 Solingen', icon: 'li:folder' },
    { key: 'p2', label: 'Potsi', icon: 'li:folder' },
  ] },
];

function InputsDemo() {
  const [log, setLog] = useState('');
  const [mode, setMode] = useState('HEX');
  const [hex, setHex] = useState('E1F509');
  const [op, setOp] = useState(100);
  const [q, setQ] = useState('Pot');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

      <div>
        <p style={headingStyle}>TextInput — default / with value / focus (click in)</p>
        <div style={row}>
          <TextInput label="Description" hint="Lorem ipsum dolores sub-description" placeholder="Input name" />
          <TextInput label="Description" hint="Lorem ipsum dolores sub-description" defaultValue="Input name" />
          <TextInput label="With dropdown" placeholder="Select…" dropdown />
        </div>
      </div>

      <div>
        <p style={headingStyle}>SmallInput & ColorInput — colour picker fields</p>
        <div style={{ ...row, alignItems: 'center' }}>
          <SmallInput value={mode} onChange={setMode} options={[{ value: 'HEX' }, { value: 'CMYK' }, { value: 'RGB' }, { value: 'HSL' }]} />
          <ColorInput value={hex} onChange={setHex} opacity={op} onOpacityChange={setOp} />
          <SmallInput placeholder="0" editable width={40} />
          <span style={{ fontSize: 11, color: '#888' }}>{mode} · #{hex} · {op}%</span>
        </div>
      </div>

      <div>
        <p style={headingStyle}>CreateInput — 28px</p>
        <div style={row}>
          <CreateInput placeholder="Name" />
          <CreateInput defaultValue="Lorem ipsum" />
        </div>
      </div>

      <div>
        <p style={headingStyle}>SearchInput — default 24px and big 34px with results (click into the big one)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SearchInput placeholder="Suche..." onSubmit={(v) => setLog(`submit → ${v}`)} />
          <SearchInput
            size="big"
            placeholder="Weise eine Aufgabe zu oder stelle eine Frage..."
            value={q}
            onChange={setQ}
            results={RESULTS(setLog)}
            onSelect={(it) => setLog(`selected → ${it.label}`)}
          />
        </div>
      </div>

      <div>
        <p style={headingStyle}>SearchListItem / SearchListHeader / GroupSearchButton — standalone</p>
        <div style={{ width: 441, display: 'flex', flexDirection: 'column' }}>
          <SearchListItem label="Potsdam" query="Pot" />
          <SearchListItem label="Potsdam" query="Pot" action={{ label: 'Router berechnen', icon: 'li:navigation' }} />
          <SearchListHeader title="Header" onShowAll={() => setLog('show all')} />
          <div style={{ marginTop: 8 }}><GroupSearchButton>Alle anzeigen</GroupSearchButton></div>
        </div>
      </div>

      {log && <p style={{ fontSize: 11, color: '#888', margin: 0 }}>{log}</p>}
    </div>
  );
}

// ─── Usage snippet ─────────────────────────────────────────────────────────
const USAGE = `import { TextInput, SmallInput, ColorInput, CreateInput, SearchInput } from './Inputs';
// Requires the Icon component (./Icon).

<TextInput label="Description" hint="Sub-description" placeholder="Input name" value={v} onChange={setV} />
<TextInput label="Country" dropdown placeholder="Select…" />

// Colour picker fields
<SmallInput value={mode} onChange={setMode} options={[{ value: 'HEX' }, { value: 'RGB' }, { value: 'HSL' }]} />
<ColorInput value={hex} onChange={setHex} opacity={alpha} onOpacityChange={setAlpha} />

<CreateInput placeholder="Name" value={name} onChange={setName} />

// Search with grouped results and prefix highlighting
<SearchInput
  size="big"
  placeholder="Weise eine Aufgabe zu oder stelle eine Frage..."
  value={q}
  onChange={setQ}
  results={[
    { key: 'recent', items: recent },                                  // no title → recent block
    { key: 'addr', title: 'Adresse', items: addresses, onShowAll: showAllAddresses },
    { key: 'proj', title: 'Projekte', items: projects },
  ]}
  onSelect={(item) => open(item)}
/>
`;

// ─── Registry entry ────────────────────────────────────────────────────────
export const inputsEntry: ComponentEntry = {
  id: 'inputs',
  name: 'Inputs',
  category: 'Data Entry',
  description: 'Form fields from the Figma Inputs page: TextInput (label/hint/dropdown), SmallInput (tiny select), ColorInput (hex + opacity), CreateInput, and SearchInput with grouped, prefix-highlighted results (SearchListItem, SearchListHeader, GroupSearchButton).',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=145-3677',
  files: [
    { name: 'TextInput.tsx',      content: textInputSrc },
    { name: 'SmallInput.tsx',     content: smallInputSrc },
    { name: 'ColorInput.tsx',     content: colorInputSrc },
    { name: 'CreateInput.tsx',    content: createInputSrc },
    { name: 'SearchInput.tsx',    content: searchInputSrc },
    { name: 'SearchListItem.tsx', content: searchListItemSrc },
    { name: 'Inputs.types.ts',    content: inputsTypes },
    { name: 'Inputs.css',         content: inputsCss },
    { name: 'index.ts',           content: inputsIndex },
  ],
  usage: USAGE,
  props: [
    { name: 'TextInput.value / onChange', type: 'string / (value, e) => void', default: '—', required: false, description: 'Controlled or uncontrolled (defaultValue).' },
    { name: 'TextInput.label / hint',     type: 'ReactNode',                   default: '—', required: false, description: '10px description above / below the field.' },
    { name: 'TextInput.dropdown',         type: 'boolean',                     default: 'false', required: false, description: 'Shows a chevron-down.' },
    { name: 'TextInput.suffix',           type: 'ReactNode',                   default: '—', required: false, description: 'Custom right-hand element.' },
    { name: 'SmallInput.options',         type: '{ value, label? }[]',         default: '—', required: false, description: 'Turns the field into a tiny select.' },
    { name: 'SmallInput.editable',        type: 'boolean',                     default: 'false', required: false, description: 'Free typing.' },
    { name: 'ColorInput.value / onChange', type: 'string (hex) / (hex) => void', default: '—', required: false, description: 'Hex without "#".' },
    { name: 'ColorInput.opacity / onOpacityChange', type: 'number 0–100',     default: '100', required: false, description: 'Opacity field.' },
    { name: 'SearchInput.size',           type: "'default' | 'big'",           default: "'default'", required: false, description: '24px or 34px.' },
    { name: 'SearchInput.results',        type: '{ key, title?, items[], onShowAll? }[]', default: '—', required: false, description: 'Groups shown while focused; a group without title is the recent block.' },
    { name: 'SearchInput.onSelect',       type: '(item, group) => void',       default: '—', required: false, description: 'Item click.' },
    { name: 'SearchInput.onSubmit',       type: '(value) => void',             default: '—', required: false, description: 'Enter key.' },
    { name: 'SearchListItem.query',       type: 'string',                      default: "''", required: false, description: 'Prefix rendered medium/dark; rest grey.' },
    { name: 'SearchListItem.action',      type: '{ label, icon?, onClick? }',  default: '—', required: false, description: 'Right-hand action shown on hover.' },
    { name: '*.width',                    type: 'number | string',             default: 'Figma width', required: false, description: 'Use "100%" to fill.' },
  ],
  demo: <InputsDemo />,
};
