import React from 'react';
import { DropdownMenu }      from '../../../DropdownMenu/DropdownMenu';
import { GroupDropdownMenu } from '../../../DropdownMenu/GroupDropdownMenu';
import type { ComponentEntry } from './types';

// ─── Raw source files (bundled for download) ──────────────────────────────────
import dropdownMenuSource      from '../../../DropdownMenu/DropdownMenu.tsx?raw';
import groupDropdownMenuSource from '../../../DropdownMenu/GroupDropdownMenu.tsx?raw';
import dropdownMenuTypes       from '../../../DropdownMenu/DropdownMenu.types.ts?raw';
import dropdownMenuCss         from '../../../DropdownMenu/DropdownMenu.css?raw';
import dropdownMenuIndex       from '../../../DropdownMenu/index.ts?raw';

// ─── Shared demo styles ───────────────────────────────────────────────────────
const card: React.CSSProperties = {
  border: '1px solid var(--border)',
  borderRadius: 8,
  overflow: 'hidden',
};
const cardBody: React.CSSProperties = {
  padding: '20px 24px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  gap: 24,
};
const cardFooter: React.CSSProperties = {
  padding: '12px 24px',
  borderTop: '1px solid var(--border)',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};
const footerTitle: React.CSSProperties  = { fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' };
const footerDesc: React.CSSProperties   = { fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 };
const inlineCode: React.CSSProperties  = {
  fontFamily: 'var(--font-mono)',
  background: 'var(--bg-code, rgba(128,128,128,0.12))',
  borderRadius: 3,
  padding: '1px 5px',
  fontSize: '0.92em',
};
const sectionHeading: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  fontWeight: 600,
  color: 'var(--text-primary)',
};
const sectionDivider: React.CSSProperties = {
  borderBottom: '1px solid var(--border)',
  paddingBottom: 8,
  marginTop: 8,
};

// ─── Demo sections — DropdownMenu ─────────────────────────────────────────────
function DefaultDropdownSection() {
  return (
    <div style={card}>
      <div style={cardBody}>
        <DropdownMenu
          items={[
            { key: '1', label: 'Select Item #1' },
            { key: '2', label: 'Select Item #2' },
            { key: '3', label: 'Select Item #3' },
            { key: '4', label: 'Select Item #4' },
            { key: '5', label: 'Select Item #5' },
            { key: '6', label: 'Select Item #6' },
          ]}
        />
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>Default</span>
        <span style={footerDesc}>
          The base dropdown panel. Ships as the popup only — wire it to any trigger.
        </span>
      </div>
    </div>
  );
}

function StatesDropdownSection() {
  const chevron = <span style={{ fontSize: 10, opacity: 0.45 }}>›</span>;
  return (
    <div style={card}>
      <div style={cardBody}>
        <DropdownMenu
          items={[
            { key: '1', label: 'Availabilities', suffix: chevron },
            { key: '2', label: 'Availabilities', suffix: chevron },
            { key: '3', label: 'Availabilities', suffix: chevron, danger: true },
          ]}
        />
        <DropdownMenu
          items={[
            { key: '1', label: 'Edit item',   icon: <span style={{ fontSize: 13 }}>✏️</span> },
            { key: '2', label: 'Duplicate',   icon: <span style={{ fontSize: 13 }}>📋</span> },
            { key: '3', label: 'Archive',     icon: <span style={{ fontSize: 13 }}>📦</span>, disabled: true },
            { key: '4', label: 'Delete item', icon: <span style={{ fontSize: 13 }}>🗑️</span>, danger: true },
          ]}
        />
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>States — Hover · Danger · Disabled</span>
        <span style={footerDesc}>
          Set <code style={inlineCode}>danger</code> for destructive actions (red) and{' '}
          <code style={inlineCode}>disabled</code> to prevent interaction.
        </span>
      </div>
    </div>
  );
}

// ─── Demo sections — GroupDropdownMenu ───────────────────────────────────────
function GroupDropdownSection() {
  return (
    <div style={card}>
      <div style={cardBody}>
        <GroupDropdownMenu
          groups={[
            {
              heading: 'Group head',
              items: [
                { key: '1', label: 'Item list' },
                { key: '2', label: 'Item list' },
                { key: '3', label: 'Item list' },
                { key: '4', label: 'Item list' },
              ],
            },
          ]}
        />
        <GroupDropdownMenu
          groups={[
            {
              heading: 'Actions',
              items: [
                { key: '1', label: 'Edit' },
                { key: '2', label: 'Duplicate' },
              ],
            },
            {
              heading: 'Danger zone',
              items: [
                { key: '3', label: 'Archive', disabled: true },
                { key: '4', label: 'Delete',  danger: true },
              ],
            },
          ]}
        />
      </div>
      <div style={cardFooter}>
        <span style={footerTitle}>GroupDropdownMenu</span>
        <span style={footerDesc}>
          Groups items under a section header. Each group supports the same item states as DropdownMenu.
        </span>
      </div>
    </div>
  );
}

function DropdownDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
        <h3 style={sectionHeading}>DropdownMenu</h3>
      </div>
      <DefaultDropdownSection />
      <StatesDropdownSection />

      <div style={sectionDivider}>
        <h3 style={sectionHeading}>GroupDropdownMenu</h3>
      </div>
      <GroupDropdownSection />
    </div>
  );
}

// ─── Usage snippet ────────────────────────────────────────────────────────────
const USAGE = `import { DropdownMenu, GroupDropdownMenu } from './DropdownMenu';

// Flat dropdown panel
<DropdownMenu
  items={[
    { key: '1', label: 'Edit',   icon: <EditIcon /> },
    { key: '2', label: 'Delete', danger: true },
    { key: '3', label: 'Archive', disabled: true },
  ]}
/>

// Grouped dropdown panel
<GroupDropdownMenu
  groups={[
    {
      heading: 'Group A',
      items: [
        { key: '1', label: 'Option 1', onClick: (key) => console.log(key) },
        { key: '2', label: 'Option 2' },
      ],
    },
    {
      heading: 'Danger zone',
      items: [{ key: '3', label: 'Delete', danger: true }],
    },
  ]}
/>
`;

// ─── ComponentEntry ───────────────────────────────────────────────────────────
export const dropdownEntry: ComponentEntry = {
  id:       'dropdown',
  name:     'Dropdown',
  category: 'Navigation',
  status:   'stable',
  description:
    'Dropdown panel components: DropdownMenu for a flat list and GroupDropdownMenu for sectioned items. Both ship as standalone panels — wire to any trigger.',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK?node-id=26:840',
  usage: USAGE,

  demo: <DropdownDemo />,

  props: [
    { name: 'items',              type: 'DropdownItem[]',  default: '—',     required: true,  description: '(DropdownMenu) Array of menu items.' },
    { name: 'DropdownItem.key',   type: 'string',          default: '—',     required: true,  description: 'Unique item identifier.' },
    { name: 'DropdownItem.label', type: 'ReactNode',       default: '—',     required: true,  description: 'Item label text or element.' },
    { name: 'DropdownItem.icon',  type: 'ReactNode',       default: '—',     required: false, description: 'Optional icon before the label.' },
    { name: 'DropdownItem.danger',    type: 'boolean',     default: 'false', required: false, description: 'Renders item in red (destructive).' },
    { name: 'DropdownItem.disabled',  type: 'boolean',     default: 'false', required: false, description: 'Grays out item and prevents click.' },
    { name: 'DropdownItem.suffix',    type: 'ReactNode',   default: '—',     required: false, description: 'Element after label (e.g. chevron).' },
    { name: 'DropdownItem.onClick',   type: '(key: string) => void', default: '—', required: false, description: 'Click handler called with item key.' },
    { name: 'groups', type: 'DropdownGroup[]', default: '—', required: false, description: '(GroupDropdownMenu) Groups with heading + items.' },
  ],

  files: [
    { name: 'DropdownMenu.tsx',      content: dropdownMenuSource },
    { name: 'GroupDropdownMenu.tsx', content: groupDropdownMenuSource },
    { name: 'DropdownMenu.types.ts', content: dropdownMenuTypes },
    { name: 'DropdownMenu.css',      content: dropdownMenuCss },
    { name: 'index.ts',              content: dropdownMenuIndex },
  ],
};
