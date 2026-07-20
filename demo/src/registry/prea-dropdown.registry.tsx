import React from 'react';
import { Atom } from 'lucide-react';
import { DropdownMenu, GroupDropdownMenu } from '../../../DropdownMenu';
import type { ComponentEntry } from './types';

// ─── Raw source files ──────────────────────────────────────────────────────
import dropdownSource      from '../../../DropdownMenu/DropdownMenu.tsx?raw';
import groupDropdownSource from '../../../DropdownMenu/GroupDropdownMenu.tsx?raw';
import dropdownTypes       from '../../../DropdownMenu/DropdownMenu.types.ts?raw';
import dropdownCss         from '../../../DropdownMenu/DropdownMenu.css?raw';
import dropdownIndex       from '../../../DropdownMenu/index.ts?raw';

// ─── Demo ─────────────────────────────────────────────────────────────────
const AtomIcon = <Atom size={14} strokeWidth={1.5} />;

const headingStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: '#888',
  marginBottom: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

function DropdownDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* ── DropdownMenu ──────────────────────────────────────────────── */}
      <div>
        <p style={headingStyle}>DropdownMenu — Version Default (all items with icon + chevron)</p>
        <DropdownMenu
          items={[
            { key: '1', label: 'Availabilities', icon: AtomIcon },
            { key: '2', label: 'Sales',           icon: AtomIcon },
            { key: '3', label: 'Floors',          icon: AtomIcon },
          ]}
        />
      </div>

      <div>
        <p style={headingStyle}>DropdownMenu — Version Mix (icon items + text-only items)</p>
        <DropdownMenu
          items={[
            { key: '1', label: 'Select Item #1', showChevron: false },
            { key: '2', label: 'Select Item #2', showChevron: false },
            { key: '3', label: 'Select Item #3', showChevron: false },
            { key: '4', label: 'Select Item #4', showChevron: false },
            { key: '5', label: 'Select Item #5', icon: AtomIcon },
            { key: '6', label: 'Select Item #6', icon: AtomIcon },
          ]}
        />
      </div>

      <div>
        <p style={headingStyle}>DropdownMenu — Danger item</p>
        <DropdownMenu
          items={[
            { key: '1', label: 'Availabilities', icon: AtomIcon },
            { key: '2', label: 'Sales',           icon: AtomIcon },
            { key: '3', label: 'Delete',          icon: AtomIcon, danger: true },
          ]}
        />
      </div>

      {/* ── GroupDropdownMenu ──────────────────────────────────────────── */}
      <div>
        <p style={headingStyle}>GroupDropdownMenu — Single group (32px items, 14px text)</p>
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
      </div>

      <div>
        <p style={headingStyle}>GroupDropdownMenu — Multiple groups</p>
        <GroupDropdownMenu
          groups={[
            {
              heading: 'Properties',
              items: [
                { key: '1', label: 'Sales' },
                { key: '2', label: 'Floors' },
                { key: '3', label: 'Availabilities' },
              ],
            },
            {
              heading: 'Actions',
              items: [
                { key: '4', label: 'Edit' },
                { key: '5', label: 'Delete', danger: true },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}

// ─── Usage snippet ─────────────────────────────────────────────────────────
const USAGE = `import { DropdownMenu, GroupDropdownMenu } from './DropdownMenu';
import { Atom } from 'lucide-react';

// DropdownMenu — icon + label + chevron items (23px)
<DropdownMenu
  items={[
    { key: '1', label: 'Availabilities', icon: <Atom size={14} strokeWidth={1.5} /> },
    { key: '2', label: 'Sales',          icon: <Atom size={14} strokeWidth={1.5} /> },
    { key: '3', label: 'Delete',         icon: <Atom size={14} strokeWidth={1.5} />, danger: true },
  ]}
/>

// GroupDropdownMenu — text-only grouped items (32px)
<GroupDropdownMenu
  groups={[
    {
      heading: 'Group head',
      items: [
        { key: '1', label: 'Item list' },
        { key: '2', label: 'Item list' },
      ],
    },
  ]}
/>
`;

// ─── Registry entry ────────────────────────────────────────────────────────
export const dropdownEntry: ComponentEntry = {
  id: 'dropdown',
  name: 'Dropdown',
  category: 'Navigation',
  description: 'Two dropdown components from the PREA design system: DropdownMenu (23px items with icon/label/chevron) and GroupDropdownMenu (32px text-only items with group headings).',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=29-462',
  files: [
    { name: 'DropdownMenu.tsx',        content: dropdownSource },
    { name: 'GroupDropdownMenu.tsx',   content: groupDropdownSource },
    { name: 'DropdownMenu.types.ts',   content: dropdownTypes },
    { name: 'DropdownMenu.css',        content: dropdownCss },
    { name: 'index.ts',                content: dropdownIndex },
  ],
  usage: USAGE,
  props: [
    { name: 'items',       type: 'DropdownItemDef[]',   default: '—',    required: true,  description: 'Array of menu items. Each item has key, label, optional icon and showChevron.' },
    { name: 'groups',      type: 'DropdownGroup[]',     default: '—',    required: true,  description: '(GroupDropdownMenu) Array of groups. Each group has heading and items.' },
    { name: 'className',   type: 'string',              default: '—',    required: false, description: 'Additional CSS class for the container.' },
    { name: 'style',       type: 'React.CSSProperties', default: '—',    required: false, description: 'Inline styles for the container.' },
  ],
  demo: <DropdownDemo />,
};
