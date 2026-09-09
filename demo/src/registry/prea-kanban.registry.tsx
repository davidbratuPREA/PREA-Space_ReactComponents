import React from 'react';
import { KanbanBoard, KanbanColumn, KanbanProject, KanbanGroupHeader, KanbanItemRow, KanbanStatusBadge, QuantityBadge, KanbanPriorityBadge } from '../../../Kanban';
import type { KanbanProjectGroup } from '../../../Kanban';
import type { ComponentEntry } from './types';

// ─── Raw source files ──────────────────────────────────────────────────────
import kanbanSrc   from '../../../Kanban/Kanban.tsx?raw';
import kanbanTypes from '../../../Kanban/Kanban.types.ts?raw';
import kanbanCss   from '../../../Kanban/Kanban.css?raw';
import kanbanIndex from '../../../Kanban/index.ts?raw';

// ─── Demo ─────────────────────────────────────────────────────────────────
const headingStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 12,
  textTransform: 'uppercase', letterSpacing: '0.05em',
};

const ITEMS = [
  { key: '1', label: 'Bebaute Fläche', value: 'xxx' },
  { key: '2', label: 'Bebaute Fläche', value: 'xxx' },
  { key: '3', label: 'Bebaute Fläche', value: 'xxx' },
  { key: '4', label: 'Bebaute Fläche', value: 'xxx', highlight: true },
  { key: '5', label: 'Bebaute Fläche', value: 'xxx', highlight: true, icon: 'eco' },
  { key: '6', label: 'Bebaute Fläche', value: 'xxx' },
];
const GROUPS: KanbanProjectGroup[] = [
  { key: 'a', title: 'Potsdamer Platz 23, 10823 Berlin', items: ITEMS, priority: 'Hoch' },
  { key: 'b', title: 'Potsdamer Platz 23, 10823 Berlin', items: ITEMS },
  { key: 'c', title: 'Potsdamer Platz 23, 10823 Berlin', items: ITEMS },
];

function KanbanDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      <div>
        <p style={headingStyle}>KanbanBoard — click project / address rows to collapse</p>
        <KanbanBoard>
          <KanbanColumn status="inProgress">
            <KanbanProject title="Projekt 02" groups={GROUPS} width="100%" />
            <KanbanProject title="Projekt 02" groups={GROUPS} width="100%" />
          </KanbanColumn>
          <KanbanColumn status="onHold">
            <KanbanProject title="Projekt 02" groups={GROUPS} width="100%" />
          </KanbanColumn>
          <KanbanColumn status="pending">
            <KanbanProject title="Projekt 02" groups={GROUPS} width="100%" />
          </KanbanColumn>
        </KanbanBoard>
      </div>

      <div>
        <p style={headingStyle}>Badges & rows</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          <KanbanStatusBadge status="onHold" /><KanbanStatusBadge status="pending" /><KanbanStatusBadge status="inProgress" /><KanbanStatusBadge status="done" />
          <QuantityBadge count={1} /><QuantityBadge count={12} />
          <KanbanPriorityBadge>Hoch</KanbanPriorityBadge>
        </div>
        <div style={{ width: 441, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
          <KanbanGroupHeader title="Projekt 02" />
          <KanbanGroupHeader title="Potsdamer Platz 23, 10823 Berlin" variant="sub" />
          <KanbanItemRow label="Bebaute Fläche" value="xxx" />
          <KanbanItemRow label="Bebaute Fläche" value="xxx" highlight />
          <KanbanItemRow label="Bebaute Fläche" value="xxx" highlight icon="eco" />
          <KanbanItemRow priority="Hoch" />
          <KanbanGroupHeader title="Potsdamer Platz 23, 10823 Berlin" variant="sub" open={false} />
        </div>
      </div>
    </div>
  );
}

// ─── Usage snippet ─────────────────────────────────────────────────────────
const USAGE = `import { KanbanBoard, KanbanColumn, KanbanProject, KanbanStatusBadge } from './Kanban';
// Requires the Icon component (./Icon).

<KanbanBoard>
  <KanbanColumn status="inProgress">
    {projects.map((p) => (
      <KanbanProject
        key={p.id}
        width="100%"
        title={p.name}
        groups={p.assets.map((a) => ({
          key: a.id,
          title: a.address,
          items: [
            { key: 'area', label: 'Bebaute Fläche', value: a.area },
            { key: 'eco',  label: 'Energie',        value: a.energy, highlight: true, icon: 'eco' },
          ],
          priority: a.priority,           // renders the flag badge row
        }))}
      />
    ))}
  </KanbanColumn>
  <KanbanColumn status="onHold">…</KanbanColumn>
  <KanbanColumn status="pending" count={3}>…</KanbanColumn>
</KanbanBoard>

<KanbanStatusBadge status="done">Fertig</KanbanStatusBadge>
`;

// ─── Registry entry ────────────────────────────────────────────────────────
export const kanbanEntry: ComponentEntry = {
  id: 'kanban',
  name: 'Kanban',
  category: 'Data Display',
  description: 'Project kanban from the Figma Kanban page: KanbanBoard › KanbanColumn (status-coloured) › KanbanProject (collapsible header, sub-groups, item rows, priority badge) plus KanbanStatusBadge, QuantityBadge and KanbanPriorityBadge.',
  status: 'pending',
  layout: 'wide',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=207-11740',
  files: [
    { name: 'Kanban.tsx',      content: kanbanSrc },
    { name: 'Kanban.types.ts', content: kanbanTypes },
    { name: 'Kanban.css',      content: kanbanCss },
    { name: 'index.ts',        content: kanbanIndex },
  ],
  usage: USAGE,
  props: [
    { name: 'KanbanColumn.status',   type: "'onHold' | 'pending' | 'inProgress' | 'done'", default: '—', required: true, description: 'Column colour scheme and badge.' },
    { name: 'KanbanColumn.count',    type: 'number | string', default: 'children count', required: false, description: 'Quantity badge.' },
    { name: 'KanbanColumn.width',    type: 'number | string', default: '457', required: false, description: 'Column width.' },
    { name: 'KanbanProject.title',   type: 'ReactNode', default: '—', required: true, description: 'Grey project header.' },
    { name: 'KanbanProject.groups',  type: '{ key, title, items?, priority?, defaultOpen? }[]', default: '[]', required: false, description: 'Collapsible sub-groups; first open by default.' },
    { name: 'KanbanProject.groups[].items', type: '{ key, label, value?, highlight?, icon? }[]', default: '—', required: false, description: 'Label/value rows; highlight = green.' },
    { name: 'KanbanGroupHeader.variant', type: "'header' | 'sub'", default: "'header'", required: false, description: 'Grey 12px project row or white 18px address row.' },
    { name: 'KanbanItemRow.priority', type: 'ReactNode', default: '—', required: false, description: 'Renders the flag badge row instead of label/value.' },
    { name: 'KanbanStatusBadge.status', type: 'KanbanStatus', default: '—', required: true, description: 'Coloured uppercase badge.' },
  ],
  demo: <KanbanDemo />,
};
