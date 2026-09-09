import React, { useState } from 'react';
import { Checkbox, CreateDropdownItem, CreateEntryItem, CreateEntryHead, CreateEntryList, StatusMenu, CreateEntryMenu, CreateEntryStep } from '../../../CreateMenu';
import type { StatusOption } from '../../../CreateMenu';
import type { ComponentEntry } from './types';

import src   from '../../../CreateMenu/CreateMenu.tsx?raw';
import types from '../../../CreateMenu/CreateMenu.types.ts?raw';
import css   from '../../../CreateMenu/CreateMenu.css?raw';
import index from '../../../CreateMenu/index.ts?raw';

const headingStyle: React.CSSProperties = { fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' };
const STATUSES: StatusOption[] = [
  { key: 'progress', status: 'inProgress' },
  { key: 'hold',     status: 'onHold' },
  { key: 'pending',  status: 'pending' },
];
const ENTRIES = ['Berlin Mitte', 'Potsdamer Platz', 'Hafencity', 'Frankfurt Westend', 'München Schwabing', 'Köln Deutz', 'Stuttgart Mitte', 'Düsseldorf Hafen', 'Leipzig Zentrum', 'Dresden Neustadt', 'Hannover List', 'Bremen Viertel'];

function CreateMenuDemo() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('progress');
  const [itemStatus, setItemStatus] = useState<Record<string, 'inProgress' | 'onHold' | 'pending' | undefined>>({ 'Berlin Mitte': 'inProgress', 'Hafencity': 'pending' });
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({ 'Berlin Mitte': true, 'Hafencity': true, 'Potsdamer Platz': true, 'Frankfurt Westend': true });
  const [log, setLog] = useState('');
  const count = Object.values(checked).filter(Boolean).length;
  const visible = ENTRIES.filter((e) => e.toLowerCase().includes(search.toLowerCase()));
  const allChecked = visible.length > 0 && visible.every((e) => checked[e]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      <div>
        <p style={headingStyle}>CreateEntryMenu — Step 1 → Step 2 (250 × 161, same height) · click an item</p>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <CreateEntryMenu onClose={() => setLog('close')} onBack={step > 1 ? () => setStep(1) : undefined}>
            {step === 1 ? (
              <>
                <CreateDropdownItem icon="file-plus-02"  label="Portfolio"    onClick={() => setStep(2)} />
                <CreateDropdownItem icon="marker-pin-04" label="Plot of land" onClick={() => setStep(2)} />
                <CreateDropdownItem icon="building-03"   label="Building"     onClick={() => setStep(2)} />
                <CreateDropdownItem icon="building-06"   label="Unit"         onClick={() => setStep(2)} />
                <CreateDropdownItem icon="hourglass-01"  label="Status"       onClick={() => setStep(2)} />
              </>
            ) : (
              <CreateEntryStep
                value={name} onChange={setName} autoFocus
                addLabel="Projekt hinzufügen" onAdd={() => setLog('Projekt hinzufügen')}
                onSubmit={(v) => { setLog(`erstellt: ${v}`); setStep(1); setName(''); }}
              />
            )}
          </CreateEntryMenu>
          <CreateEntryMenu onClose={() => undefined} onBack={() => undefined}>
            <CreateEntryStep defaultValue="" addLabel="Projekt hinzufügen" submitDisabled={false} />
          </CreateEntryMenu>
          <div>
            <p style={{ ...headingStyle, marginBottom: 8 }}>StatusMenu — Default · Edit (150px, Kanban status badges)</p>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <StatusMenu options={STATUSES} value={status} onChange={setStatus} onCreate={(n) => setLog(`neuer Status: ${n}`)} onPickColor={() => setLog('Farbe')} />
              <StatusMenu options={STATUSES} editing onEditingChange={() => undefined} onPickColor={() => setLog('Farbe')} />
            </div>
          </div>
        </div>
        {log && <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '8px 0 0' }}>{log}</p>}
      </div>

      <div>
        <p style={headingStyle}>CreateEntryList (350 × 470) — search + sub-head · „Alle auswählen“ head · checkable items with status badge · footer</p>
        <CreateEntryList
          onClose={() => setLog('close')} onBack={() => setLog('zurück')}
          search={search} onSearchChange={setSearch}
          subHead={<>Zur Portfolio „Gabis Portfolio“ hinzufügen</>}
          secondaryLabel="Status wählen" onSecondary={() => setLog('Status wählen')}
          primaryLabel={`Hinzufügen (${count})`} primaryDisabled={count === 0} onPrimary={() => setLog(`${count} hinzugefügt`)}
        >
          <CreateEntryHead
            title="Alle auswählen" checked={allChecked} indeterminate={!allChecked && visible.some((e) => checked[e])}
            onCheckedChange={(v) => setChecked((s) => ({ ...s, ...Object.fromEntries(visible.map((e) => [e, v])) }))}
            actionLabel="Alle Status löschen" onAction={() => setItemStatus({})}
          />
          {visible.map((e) => (
            <CreateEntryItem key={e} label={e} checked={!!checked[e]} onCheckedChange={(v) => setChecked((s) => ({ ...s, [e]: v }))}
              status={itemStatus[e]} onClearStatus={() => setItemStatus((s) => ({ ...s, [e]: undefined }))} />
          ))}
        </CreateEntryList>
      </div>

      <div>
        <p style={headingStyle}>Pieces — CreateEntryHead (20px) · CreateEntryItem (26px) · CreateDropdownItem (23px) · Checkbox (14px)</p>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          <div style={{ width: 260, display: 'flex', flexDirection: 'column' }}>
            <CreateEntryHead title="Alle auswählen" actionLabel="Alle Status löschen" onAction={() => setLog('Status gelöscht')} />
            <CreateEntryItem label="Item name" status="inProgress" onClearStatus={() => setLog('clear')} />
            <CreateEntryItem label="Item name" checked status="onHold" />
            <CreateEntryItem label="Item name" />
          </div>
          <div style={{ width: 180, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <CreateDropdownItem icon="li:folder" label="Projekt" />
            <CreateDropdownItem icon="li:marker-pin" label="Standort" />
            <CreateDropdownItem icon="li:file-06" label="Notiz" disabled />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Checkbox defaultChecked label="Ausgewählt" />
            <Checkbox label="Nicht ausgewählt" />
            <Checkbox disabled label="Deaktiviert" />
          </div>
        </div>
      </div>
    </div>
  );
}

const USAGE = `import { CreateEntryMenu, CreateEntryStep, CreateEntryList, CreateDropdownItem,
         CreateEntryHead, CreateEntryItem, StatusMenu, Checkbox } from './CreateMenu';
// Requires ./Kanban (KanbanStatusBadge), ./Inputs, ./MapNav (LayerButton) and ./Icon.

// Step 1 — what to create (250 × 161; the height stays the same on every step)
<CreateEntryMenu onClose={close}>
  <CreateDropdownItem icon="file-plus-02"  label="Portfolio"    onClick={() => setKind('portfolio')} />
  <CreateDropdownItem icon="marker-pin-04" label="Plot of land" onClick={() => setKind('plot')} />
  <CreateDropdownItem icon="building-03"   label="Building"     onClick={() => setKind('building')} />
</CreateEntryMenu>

// Step 2 — name it
<CreateEntryMenu onClose={close} onBack={() => setKind(null)}>
  <CreateEntryStep value={name} onChange={setName} autoFocus
    addLabel="Projekt hinzufügen" onAdd={pickProject}
    submitLabel="Erstellen" onSubmit={(v) => create(kind, v)} />
</CreateEntryMenu>

// List — pick entries (350 × 470)
<CreateEntryList onClose={close} onBack={back} search={q} onSearchChange={setQ}
  subHead="Zur Portfolio „Gabis Portfolio“ hinzufügen"
  secondaryLabel="Status wählen" onSecondary={pickStatus}
  primaryLabel={'Hinzufügen (' + selected.length + ')'} onPrimary={add}>
  <CreateEntryHead title="Alle auswählen" checked={allSelected} onCheckedChange={selectAll}
    actionLabel="Alle Status löschen" onAction={clearStatus} />
  {items.map((it) => (
    <CreateEntryItem key={it.id} label={it.name} checked={selected.includes(it.id)} onCheckedChange={(v) => toggle(it.id, v)}
      status={it.status} onClearStatus={() => setStatus(it.id, undefined)} />
  ))}
</CreateEntryList>

// Status picker — Kanban status badges + "Neuer Status" (Enter to create, palette to pick a colour)
<StatusMenu options={[{ key: 'progress', status: 'inProgress' }, { key: 'hold', status: 'onHold' }, { key: 'pending', status: 'pending' }]}
  value={status} onChange={setStatus} onCreate={addStatus} onPickColor={openPalette} />
`;

export const createMenuEntry: ComponentEntry = {
  id: 'createmenu',
  name: 'Create & Status Menus',
  category: 'Navigation',
  description: 'Creation flow from the Figma Menus page: CreateEntryMenu (250×161 steps / 350×470 list, fixed height across steps) with CreateEntryStep (name input + „Projekt hinzufügen“ + black button), CreateDropdownItem (23px icon rows), CreateEntryList (350×470 search + checkable items + footer), CreateEntryHead + CreateEntryItem (20/26px rows with checkbox and Kanban status badge), StatusMenu (150px Kanban badges with „Neuer Status“ edit) and the 14px Checkbox.',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=69-1177',
  files: [
    { name: 'CreateMenu/CreateMenu.tsx',      content: src },
    { name: 'CreateMenu/CreateMenu.types.ts', content: types },
    { name: 'CreateMenu/CreateMenu.css',      content: css },
    { name: 'CreateMenu/index.ts',            content: index },
  ],
  usage: USAGE,
  props: [
    { name: 'CreateEntryMenu.title / onClose / onBack', type: 'ReactNode / () => void', default: "'Erstellen' / — / —", required: false, description: 'Grey head (subBG) with optional back and close.' },
    { name: 'CreateEntryMenu.width / height', type: 'number | string', default: '250 / 161', required: false, description: 'Fixed size; Figma 250×161 (steps) and 350×470 (list). Height is constant across steps.' },
    { name: 'CreateEntryMenu.footer', type: 'ReactNode', default: '—', required: false, description: 'Footer row with top border (list version).' },
    { name: 'CreateEntryStep.value / onChange / placeholder', type: 'string / (v) => void / string', default: "— / — / 'Name'", required: false, description: 'Step 2 name input (CreateInput, 28px).' },
    { name: 'CreateEntryStep.addLabel / onAdd', type: 'ReactNode / () => void', default: '—', required: false, description: 'Secondary „+ Projekt hinzufügen“ row.' },
    { name: 'CreateEntryStep.submitLabel / onSubmit / submitDisabled', type: "ReactNode / (v) => void / boolean", default: "'Erstellen' / — / value empty", required: false, description: 'Full-width black button at the bottom.' },
    { name: 'CreateDropdownItem.icon / label / onClick', type: 'string | ReactNode / ReactNode / () => void', default: '—', required: false, description: '23px row, 16px icon, 13px medium text.' },
    { name: 'CreateEntryItem.label / checked / onCheckedChange', type: 'ReactNode / boolean / (v) => void', default: '—', required: false, description: '26px row, padding 10, 14px checkbox + 13px label.' },
    { name: 'CreateEntryItem.status / statusLabel / onClearStatus', type: 'KanbanStatus / ReactNode / () => void', default: '—', required: false, description: 'Kanban status badge at the right with a 12px ✕.' },
    { name: 'CreateEntryHead.title / checked / onCheckedChange', type: 'ReactNode / boolean / (v) => void', default: '—', required: false, description: '20px „Alle auswählen“ head, 10px text.' },
    { name: 'CreateEntryHead.actionLabel / onAction', type: 'ReactNode / () => void', default: '—', required: false, description: 'Red 10px action („Alle Status löschen“).' },
    { name: 'CreateEntryList.search / onSearchChange / subHead', type: 'string / (v) => void / ReactNode', default: '—', required: false, description: 'Search group under the head (SearchInput 24px + 10px grey line).' },
    { name: 'CreateEntryList.onBack / secondaryLabel / primaryLabel / onPrimary', type: '() => void / ReactNode / ReactNode / () => void', default: "— / — / 'Hinzufügen' / —", required: false, description: 'Footer: 24px back button + two black buttons.' },
    { name: 'CreateEntryList.width / height', type: 'number | string', default: '350 / 470', required: false, description: 'Fixed size; items scroll.' },
    { name: 'StatusMenu.options / value / onChange', type: '{ key, status: KanbanStatus, label? }[] / string / (key) => void', default: '—', required: false, description: 'Kanban status badges (IN PROGRESS / ON HOLD / PENDING…).' },
    { name: 'StatusMenu.onCreate / onPickColor / editing', type: '(name) => void / () => void / boolean', default: '—', required: false, description: '„Neuer Status“ → Edit style: 24px input + palette button.' },
    { name: 'Checkbox.checked / onChange / label', type: 'boolean / (v) => void / ReactNode', default: '—', required: false, description: '14px box, radius 4, #202020 fill.' },
  ],
  demo: <CreateMenuDemo />,
};
