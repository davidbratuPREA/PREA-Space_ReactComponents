import React from 'react';
import { Breadcrumb } from '../../../Breadcrumb';
import type { ComponentEntry } from './types';

// ─── Raw source files ──────────────────────────────────────────────────────
import breadcrumbSource from '../../../Breadcrumb/Breadcrumb.tsx?raw';
import breadcrumbTypes  from '../../../Breadcrumb/Breadcrumb.types.ts?raw';
import breadcrumbCss    from '../../../Breadcrumb/Breadcrumb.css?raw';
import breadcrumbIndex  from '../../../Breadcrumb/index.ts?raw';

// ─── Demo ─────────────────────────────────────────────────────────────────
const assetOptions = [
  { key: 'sales',           label: 'Sales' },
  { key: 'floors',          label: 'Floors' },
  { key: 'availabilities',  label: 'Availabilities', active: true },
  { key: 'leases',          label: 'Leases' },
];

const headingStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: '#888',
  marginBottom: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

function BreadcrumbDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      <div>
        <p style={headingStyle}>Plain breadcrumb — chevron-right on every item</p>
        <Breadcrumb
          items={[
            { key: 'deep-street', label: 'Deep Street' },
            { key: 'asset',       label: 'Asset' },
            { key: 'flurstucke',  label: 'Flurstücke' },
            { key: '1802',        label: '1802' },
          ]}
        />
      </div>

      <div>
        <p style={headingStyle}>Any item can open a dropdown (hover to see chevron-down + pill)</p>
        <Breadcrumb
          items={[
            {
              key: 'deep-street',
              label: 'Deep Street',
              dropdownItems: [
                { key: 'ds1', label: 'Street A' },
                { key: 'ds2', label: 'Street B', active: true },
              ],
            },
            {
              key: 'asset',
              label: 'Asset',
              dropdownItems: [
                { key: 'asset-a', label: 'Asset A', active: true },
                { key: 'asset-b', label: 'Asset B' },
              ],
            },
            {
              key: 'flurstucke',
              label: 'Flurstücke',
              dropdownItems: assetOptions,
            },
            {
              key: '1802',
              label: '1802',
              dropdownItems: assetOptions,
            },
          ]}
        />
      </div>

    </div>
  );
}

// ─── Usage snippet ─────────────────────────────────────────────────────────
const USAGE = `import { Breadcrumb } from './Breadcrumb';

// Plain breadcrumb — each item has its own ">" (not a separate separator)
<Breadcrumb
  items={[
    { key: 'deep-street', label: 'Deep Street' },
    { key: 'asset',       label: 'Asset' },
    { key: 'flurstucke',  label: 'Flurstücke' },
    { key: '1802',        label: '1802' },
  ]}
/>

// Any item can open a dropdown — hover shows pill + chevron-down
<Breadcrumb
  items={[
    { key: 'deep-street', label: 'Deep Street' },
    {
      key: 'flurstucke',
      label: 'Flurstücke',
      dropdownItems: [
        { key: 'sales',          label: 'Sales' },
        { key: 'availabilities', label: 'Availabilities', active: true },
      ],
      onDropdownSelect: (key) => console.log('Selected:', key),
    },
    { key: '1802', label: '1802' },
  ]}
/>
`;

// ─── Registry entry ────────────────────────────────────────────────────────
export const breadcrumbEntry: ComponentEntry = {
  id: 'breadcrumb',
  name: 'Breadcrumb',
  category: 'Navigation',
  description: 'Navigation breadcrumb. Each item contains its own chevron — ">" is not a separate separator. Any item can be a dropdown trigger (not only the last).',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=45-1432',
  files: [
    { name: 'Breadcrumb.tsx',       content: breadcrumbSource },
    { name: 'Breadcrumb.types.ts',  content: breadcrumbTypes },
    { name: 'Breadcrumb.css',       content: breadcrumbCss },
    { name: 'index.ts',             content: breadcrumbIndex },
  ],
  usage: USAGE,
  props: [
    { name: 'items',                type: 'BreadcrumbItemDef[]',   default: '—', required: true,  description: 'Array of breadcrumb items. Each item has key, label, optional href and optional dropdownItems.' },
    { name: 'items[].dropdownItems', type: 'Array<{key, label, active?}>', default: '—', required: false, description: 'When provided, the item becomes a dropdown trigger (chevron-down on hover).' },
    { name: 'items[].onDropdownSelect', type: '(key: string) => void', default: '—', required: false, description: 'Callback when a dropdown option is selected.' },
    { name: 'className',            type: 'string',                default: '—', required: false, description: 'Additional CSS class.' },
    { name: 'style',                type: 'React.CSSProperties',   default: '—', required: false, description: 'Inline styles.' },
  ],
  demo: <BreadcrumbDemo />,
};
