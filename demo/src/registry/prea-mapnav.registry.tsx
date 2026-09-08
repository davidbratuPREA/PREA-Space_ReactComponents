import React, { useState } from 'react';
import { MapNav, MapNavGroup, Compass, LayerButton, MapLayerItem, MapLayersMenu } from '../../../MapNav';
import { MapButton } from '../../../Button';
import type { ComponentEntry } from './types';

import src   from '../../../MapNav/MapNav.tsx?raw';
import types from '../../../MapNav/MapNav.types.ts?raw';
import css   from '../../../MapNav/MapNav.css?raw';
import index from '../../../MapNav/index.ts?raw';

const headingStyle: React.CSSProperties = { fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' };

function MapNavDemo() {
  const [heading, setHeading] = useState(35);
  const [mode, setMode] = useState<'2D' | '3D'>('2D');
  const [visible, setVisible] = useState<Record<string, boolean>>({ 'Bebauungsplan': true, 'Verkehr': false });
  const [log, setLog] = useState('');
  const vis = (k: string) => ({ visible: visible[k] ?? true, onVisibleChange: (v: boolean) => setVisible((s) => ({ ...s, [k]: v })) });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      <div>
        <p style={headingStyle}>MapNav — compass + item_mapNav groups (36px, MapButtons 24px) · click compass to reset</p>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          <MapNav heading={heading} onResetHeading={() => setHeading(0)}>
            <MapNavGroup>
              <MapButton icon="li:plus" label="Zoom in" onClick={() => setLog('zoom in')} />
              <MapButton icon="li:minus" label="Zoom out" onClick={() => setLog('zoom out')} />
            </MapNavGroup>
            <MapNavGroup>
              <MapButton icon="li:navigation" label="Standort" onClick={() => setLog('locate')} />
              <MapButton icon="li:rotate-ccw2" label="Drehen" onClick={() => setHeading((h) => (h + 45) % 360)} />
              <MapButton icon="li:perspective" label="Neigen" onClick={() => setLog('tilt')} />
            </MapNavGroup>
            <MapNavGroup>
              <MapButton icon="2D" label="2D" active={mode === '2D'} onClick={() => setMode('2D')} />
              <MapButton icon="3D" label="3D" active={mode === '3D'} onClick={() => setMode('3D')} />
            </MapNavGroup>
            <MapNavGroup>
              <MapButton icon="li:layers" label="Ebenen" onClick={() => setLog('layers')} />
            </MapNavGroup>
          </MapNav>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Compass heading={heading} onClick={() => setHeading(0)} />
            <div style={{ display: 'flex', gap: 4 }}>
              <LayerButton icon="li:info-1" label="Info" /><LayerButton icon="li:panels-top-left" label="Panel" /><LayerButton icon="li:funnel" label="Filter" /><LayerButton icon="li:colors" label="Farben" /><LayerButton icon="li:eye" label="Sichtbar" active />
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: 0 }}>heading {heading}° · {mode}{log ? ` · ${log}` : ''}</p>
          </div>
        </div>
      </div>

      <div>
        <p style={headingStyle}>MapLayersMenu — 314px · head group with „Aktive Ebenen“ · groups / subgroups / layers · hover a row for the layerBtn actions</p>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          <MapLayersMenu
            onClose={() => setLog('close')}
            onRemoveActive={() => setLog('remove all active')}
            activeLayers={
              <>
                <MapLayerItem label="Bebauungsplan" {...vis('Bebauungsplan')} onInfo={() => setLog('info Bebauungsplan')} />
                <MapLayerItem label="Verkehr" {...vis('Verkehr')} onInfo={() => setLog('info Verkehr')} />
                <MapLayerItem label="Flurstücke" />
              </>
            }
          >
            <MapLayerItem label="Grundlagen">
              <MapLayerItem label="Flurstücke" onClick={() => setLog('Flurstücke')} />
              <MapLayerItem label="Gebäude" />
            </MapLayerItem>
            <MapLayerItem label="Nutzung" defaultOpen>
              <MapLayerItem label="Wohnen" />
              <MapLayerItem label="Gewerbe" />
              <MapLayerItem label="Mischgebiet" />
            </MapLayerItem>
            <MapLayerItem label="Planung">
              <MapLayerItem label="Flächennutzungsplan" />
            </MapLayerItem>
            <MapLayerItem label="Verkehr" defaultOpen>
              <MapLayerItem kind="subgroup" label="ÖPNV">
                <MapLayerItem label="Haltestellen" />
              </MapLayerItem>
              <MapLayerItem kind="subgroup" label="Straßen" defaultOpen>
                <MapLayerItem label="Autobahnen" />
                <MapLayerItem label="Bundesstraßen" />
                <MapLayerItem label="Radwege" />
              </MapLayerItem>
            </MapLayerItem>
            <MapLayerItem label="Umwelt"><MapLayerItem label="Lärm" /></MapLayerItem>
            <MapLayerItem label="Demografie"><MapLayerItem label="Einwohner" /></MapLayerItem>
            <MapLayerItem label="Wirtschaft"><MapLayerItem label="Gewerbeflächen" /></MapLayerItem>
          </MapLayersMenu>
          <MapLayersMenu onClose={() => setLog('close')} style={{ alignSelf: 'flex-start' }}>
            <MapLayerItem label="Grundlagen"><MapLayerItem label="Flurstücke" /></MapLayerItem>
            <MapLayerItem label="Planung"><MapLayerItem label="Bebauungsplan" /></MapLayerItem>
            <MapLayerItem kind="layer" label="Umwelt" />
          </MapLayersMenu>
        </div>
      </div>
    </div>
  );
}

const USAGE = `import { MapNav, MapNavGroup, MapLayersMenu, MapLayerItem } from './MapNav';
import { MapButton } from './Button';
// Requires ./Button, ./Navigation (IconButton) and ./Icon.

<MapNav heading={map.bearing} onResetHeading={() => map.resetNorth()}>
  <MapNavGroup>
    <MapButton icon="li:plus"  label="Zoom in"  onClick={() => map.zoomIn()} />
    <MapButton icon="li:minus" label="Zoom out" onClick={() => map.zoomOut()} />
  </MapNavGroup>
  <MapNavGroup>
    <MapButton icon="2D" label="2D" active={!tilt} onClick={() => setTilt(false)} />
    <MapButton icon="3D" label="3D" active={tilt}  onClick={() => setTilt(true)} />
  </MapNavGroup>
</MapNav>

// Rows pick their icon from kind (group / subgroup / layer / active) and indent
// automatically by nesting depth (level 1 → 2 → 3).
<MapLayersMenu onClose={close} onRemoveActive={clearLayers}
  activeLayers={active.map((l) => <MapLayerItem key={l.id} label={l.name} visible={l.visible} onVisibleChange={(v) => toggle(l, v)} />)}>
  {tree.map((g) => (
    <MapLayerItem key={g.id} label={g.name}>                       // li:folder
      {g.subgroups.map((sg) => (
        <MapLayerItem key={sg.id} kind="subgroup" label={sg.name}>  // li:layers-three
          {sg.layers.map((l) => <MapLayerItem key={l.id} label={l.name} onClick={() => add(l)} />)}  // li:layer-single
        </MapLayerItem>
      ))}
    </MapLayerItem>
  ))}
</MapLayersMenu>
`;

export const mapNavEntry: ComponentEntry = {
  id: 'mapnav',
  name: 'Map Navigation',
  category: 'Navigation',
  description: 'Map controls from the Figma Menus page: MapNav column (compass + 36px MapButton groups), Compass, MapLayersMenu (314px panel: head group with title + „Aktive Ebenen“, then the layer tree), MapLayerItem (20px rows with folder / layers / layer icons, 3 indent levels, hover action row) and the 18px LayerButton.',
  status: 'pending',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=69-1177',
  files: [
    { name: 'MapNav/MapNav.tsx',      content: src },
    { name: 'MapNav/MapNav.types.ts', content: types },
    { name: 'MapNav/MapNav.css',      content: css },
    { name: 'MapNav/index.ts',        content: index },
  ],
  usage: USAGE,
  props: [
    { name: 'MapNav.heading / onResetHeading / showCompass', type: 'number / () => void / boolean', default: '0 / — / true', required: false, description: 'Compass on top of the groups.' },
    { name: 'MapNavGroup.children', type: 'MapButton[]', default: '—', required: true, description: '36px pill, 5px padding, 10px gap.' },
    { name: 'MapLayerItem.label / level', type: 'ReactNode / 1 | 2 | 3', default: '— / nesting depth', required: false, description: 'Chevron slot 14 / 34 px, level 3 indent 56 px.' },
    { name: 'MapLayerItem.kind / icon', type: "'group' | 'subgroup' | 'layer' | 'active' / string | ReactNode", default: 'group if children else layer', required: false, description: 'Default 14px icon: folder / layers-three / layer-single / eye.' },
    { name: 'MapLayerItem.trailing', type: 'ReactNode', default: '—', required: false, description: 'Always-visible right element (Figma „Entfernen“).' },
    { name: 'MapLayerItem.children / defaultOpen / open', type: 'ReactNode / boolean', default: '—', required: false, description: 'Chevron + nested rows.' },
    { name: 'MapLayerItem.visible / onVisibleChange', type: 'boolean / (v) => void', default: 'true', required: false, description: 'Eye / eye-closed action.' },
    { name: 'MapLayerItem.onInfo / onPanel / onFilter / onColors', type: '() => void', default: '—', required: false, description: 'Hover actions (info-1, panels-top-left, funnel, colors).' },
    { name: 'MapLayersMenu.activeLayers / onRemoveActive', type: 'ReactNode / () => void', default: '—', required: false, description: '„Aktive Ebenen“ block with „Entfernen“.' },
    { name: 'LayerButton.icon / label / active', type: 'string | ReactNode / string / boolean', default: '—', required: false, description: '18px icon button, hover #CACACA.' },
  ],
  demo: <MapNavDemo />,
};
