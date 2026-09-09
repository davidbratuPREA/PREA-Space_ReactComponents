import React, { useState } from 'react';
import { Checkbox, CreateDropdownItem, CreateEntryItem, CreateEntryHead, StatusMenu, CreateEntryMenu, CreateEntryStep, CreateMenuPrimaryButton } from '../../../CreateMenu';
import { SearchInput } from '../../../Inputs';
import { Button } from '../../../Button';
import type { StatusOption } from '../../../CreateMenu';
import type { ComponentEntry } from './types';

import src   from '../../../CreateMenu/CreateMenu.tsx?raw';
import types from '../../../CreateMenu/CreateMenu.types.ts?raw';
import css   from '../../../CreateMenu/CreateMenu.css?raw';
import index from '../../../CreateMenu/index.ts?raw';

const headingStyle: React.CSSProperties = { fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' };
const STATUSES: StatusOption[] = [
  { key: 'plan', status: 'in_planung', label: 'In Planung' },
  { key: 'bau',  status: 'im_baut', label: 'Im Bau' },
  { key: 'done', status: 'fertiggestellt', label: 'Fertiggestellt' },
];
const ENTRIES = ['Berlin Mitte', 'Potsdamer Platz', 'Hafencity', 'Frankfurt Westend', 'München Schwabing'];

function CreateMenuDemo() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('plan');
  const [checked, setChecked] = useState<Record<string, boolean>>({ 'Berlin Mitte': true, 'Hafencity': true, 'Potsdamer Platz': true, 'Frankfurt Westend': true });
  const [log, setLog] = useState('');
  const count = Object.values(checked).filter(Boolean).length;

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
            <p style={{ ...headingStyle, marginBottom: 8 }}>StatusMenu — 150px · „Neuer Status“ opens an inline input</p>
            <StatusMenu options={STATUSES} value={status} onChange={setStatus} onCreate={(n) => setLog(`neuer Status: ${n}`)} />
          </div>
        </div>
        {log && <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '8px 0 0' }}>{log}</p>}
      </div>

      <div>
        <p style={headingStyle}>CreateEntryMenu list (350px) — search · CreateEntryHead · checkable CreateEntryItems · footer</p>
        <CreateEntryMenu title="Einträge hinzufügen" width={350} height={470} onClose={() => setLog('close')}
          footer={
            <>
              <Button variant="text" size="sm" onClick={() => setLog('zurück')}>Zurück</Button>
              <div className="prea-createmenu__footer-end">
                <Button variant="outlined" size="sm" onClick={() => setLog('Status wählen')}>Status wählen</Button>
                <CreateMenuPrimaryButton disabled={count === 0} onClick={() => setLog(`${count} hinzugefügt`)}>Hinzufügen ({count})</CreateMenuPrimaryButton>
              </div>
            </>
          }>
          <div style={{ padding: '0 2px 6px' }}><SearchInput width="100%" placeholder="Suche" onChange={() => undefined} /></div>
          <CreateEntryHead title="Projekte" actionLabel="Alle Status löschen" onAction={() => setLog('Status gelöscht')} />
          {ENTRIES.map((e, i) => (
            <CreateEntryItem key={e} label={e} checkable checked={!!checked[e]} onCheckedChange={(v) => setChecked((s) => ({ ...s, [e]: v }))} status={STATUSES[i % 3].status} />
          ))}
        </CreateEntryMenu>
      </div>

      <div>
        <p style={headingStyle}>Pieces — CreateEntryItem (26px) · CreateDropdownItem (23px) · Checkbox (14px)</p>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          <div style={{ width: 230, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <CreateEntryHead title="Head" />
            <CreateEntryItem label="Berlin Mitte" status="in_planung" onClick={() => setLog('Berlin Mitte')} />
            <CreateEntryItem label="Hafencity" status="fertiggestellt" onClick={() => setLog('Hafencity')} />
            <CreateEntryItem label="Ohne Status" onClick={() => setLog('ohne')} />
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

const USAGE = `import { CreateEntryMenu, CreateDropdownItem, CreateEntryHead, CreateEntryItem,
         StatusMenu, Checkbox, CreateMenuPrimaryButton } from './CreateMenu';
// Requires ./Filters (StatusBadge), ./Inputs, ./Navigation (IconButton) and ./Icon.

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

// List — pick entries
<CreateEntryMenu title="Einträge hinzufügen" width={350} height={470} onClose={close}
  footer={<>
    <Button variant="text" size="sm" onClick={back}>Zurück</Button>
    <div className="prea-createmenu__footer-end">
      <Button variant="outlined" size="sm" onClick={pickStatus}>Status wählen</Button>
      <CreateMenuPrimaryButton onClick={add}>Hinzufügen ({selected.length})</CreateMenuPrimaryButton>
    </div>
  </>}>
  <SearchInput width="100%" onChange={setQuery} />
  <CreateEntryHead title="Projekte" actionLabel="Alle Status löschen" onAction={clearStatus} />
  {items.map((it) => (
    <CreateEntryItem key={it.id} label={it.name} status={it.status} checkable
      checked={selected.includes(it.id)} onCheckedChange={(v) => toggle(it.id, v)} />
  ))}
</CreateEntryMenu>

<StatusMenu options={[{ key: 'plan', status: 'in_planung', label: 'In Planung' }]} value={status} onChange={setStatus} onCreate={addStatus} />
`;

export const createMenuEntry: ComponentEntry = {
  id: 'createmenu',
  name: 'Create & Status Menus',
  category: 'Navigation',
  description: 'Creation flow from the Figma Menus page: CreateEntryMenu (250×161 steps / 350×470 list, fixed height across steps) with CreateEntryStep (name input + „Projekt hinzufügen“ + black button), CreateDropdownItem (23px icon rows), CreateEntryHead + CreateEntryItem (26px rows with StatusBadge, optional checkbox), StatusMenu (150px with inline „Neuer Status“) and the 14px Checkbox.',
  status: 'pending',
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
    { name: 'CreateEntryItem.label / status / icon', type: "ReactNode / StatusKind / string", default: "— / — / 'chevron-right'", required: false, description: '26px row with StatusBadge and trailing 12px icon.' },
    { name: 'CreateEntryItem.checkable / checked / onCheckedChange', type: 'boolean / boolean / (v) => void', default: 'false', required: false, description: 'Leading Checkbox (list version).' },
    { name: 'CreateEntryHead.title / actionLabel / onAction', type: 'ReactNode / ReactNode / () => void', default: '—', required: false, description: '20px head, 10px text, red action.' },
    { name: 'StatusMenu.options / value / onChange / onCreate', type: 'StatusOption[] / string / (key) => void / (name) => void', default: '—', required: false, description: 'Badge list + divider + „Neuer Status“.' },
    { name: 'Checkbox.checked / onChange / label', type: 'boolean / (v) => void / ReactNode', default: '—', required: false, description: '14px box, radius 4, #202020 fill.' },
  ],
  demo: <CreateMenuDemo />,
};
