import React from 'react';
import { InfoBox, InfoBoxModule, BoxLink, NavInfoCard } from '../../../InfoBox';
import type { ComponentEntry } from './types';

// ─── Raw source files ──────────────────────────────────────────────────────
import infoBoxSrc       from '../../../InfoBox/InfoBox.tsx?raw';
import infoBoxModuleSrc from '../../../InfoBox/InfoBoxModule.tsx?raw';
import boxLinkSrc       from '../../../InfoBox/BoxLink.tsx?raw';
import navInfoCardSrc   from '../../../InfoBox/NavInfoCard.tsx?raw';
import infoBoxTypes     from '../../../InfoBox/InfoBox.types.ts?raw';
import infoBoxCss       from '../../../InfoBox/InfoBox.css?raw';
import infoBoxIndex     from '../../../InfoBox/index.ts?raw';

// ─── Demo ─────────────────────────────────────────────────────────────────
const headingStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: '#888',
  marginBottom: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

function InfoBoxDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

      <div>
        <p style={headingStyle}>InfoBoxModule — KPI strip (wraps on narrow widths)</p>
        <InfoBoxModule width="100%">
          <InfoBox label="Eiusmod dolor Eius mod dolor Eiusmod dolor" value="XXXXXXX" />
          <InfoBox label="Gross floor area" value="12,480 m²" />
          <InfoBox label="Occupancy" value="94.2 %" />
          <InfoBox label="Annual rent" value="€ 3.1 M" />
          <InfoBox label="WALT" value="6.4 yrs" />
        </InfoBoxModule>
      </div>

      <div>
        <p style={headingStyle}>InfoBox — standalone</p>
        <InfoBox label="Eiusmod dolor Eius mod dolor Eiusmod dolor" value="XXXXXXX" />
      </div>

      <div>
        <p style={headingStyle}>NavInfoCard</p>
        <NavInfoCard
          title="Deep Street"
          description="Sechs Kapitel mit den Grundsätzen, die unser Denken, Handeln und unsere Kultur definieren."
          links={[
            { key: 'dashboard', label: 'Dashboard', href: '#' },
            { key: 'map',       label: 'Map',       href: '#' },
            { key: 'portfolio', label: 'Portfolio', href: '#' },
          ]}
        />
      </div>

      <div>
        <p style={headingStyle}>BoxLink — hover me</p>
        <div style={{ display: 'flex', gap: 24 }}>
          <BoxLink href="#">Dashboard</BoxLink>
          <BoxLink onClick={() => console.log('clicked')}>As a button</BoxLink>
        </div>
      </div>

    </div>
  );
}

// ─── Usage snippet ─────────────────────────────────────────────────────────
const USAGE = `import { InfoBox, InfoBoxModule, BoxLink, NavInfoCard } from './InfoBox';

// KPI strip — InfoBoxes wrap onto new lines automatically
<InfoBoxModule width="100%">
  <InfoBox label="Gross floor area" value="12,480 m²" />
  <InfoBox label="Occupancy"        value="94.2 %" />
  <InfoBox label="Annual rent"      value="€ 3.1 M" />
</InfoBoxModule>

// Navigation card
<NavInfoCard
  title="Deep Street"
  description="Sechs Kapitel mit den Grundsätzen, die unser Denken, Handeln und unsere Kultur definieren."
  links={[
    { key: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { key: 'map',       label: 'Map',       onClick: (key) => navigate(key) },
  ]}
/>

// Standalone link (renders <a> with href, <button> without)
<BoxLink href="/portfolio">Portfolio</BoxLink>
`;

// ─── Registry entry ────────────────────────────────────────────────────────
export const infoBoxEntry: ComponentEntry = {
  id: 'infobox',
  name: 'InfoBox',
  category: 'Data Display',
  description: 'Info cards: InfoBox (KPI tile), InfoBoxModule (wrapping KPI strip), BoxLink (text link with hover state) and NavInfoCard (title + description + link list).',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=207-20410',
  files: [
    { name: 'InfoBox.tsx',        content: infoBoxSrc },
    { name: 'InfoBoxModule.tsx',  content: infoBoxModuleSrc },
    { name: 'BoxLink.tsx',        content: boxLinkSrc },
    { name: 'NavInfoCard.tsx',    content: navInfoCardSrc },
    { name: 'InfoBox.types.ts',   content: infoBoxTypes },
    { name: 'InfoBox.css',        content: infoBoxCss },
    { name: 'index.ts',           content: infoBoxIndex },
  ],
  usage: USAGE,
  props: [
    { name: 'InfoBox.label',            type: 'ReactNode',           default: '—',    required: true,  description: 'Small grey label (11px).' },
    { name: 'InfoBox.value',            type: 'ReactNode',           default: '—',    required: true,  description: 'The KPI value (16px medium).' },
    { name: 'InfoBox.width',            type: 'number | string',     default: '155',  required: false, description: 'Tile width.' },
    { name: 'InfoBoxModule.children',   type: 'ReactNode',           default: '—',    required: false, description: 'InfoBoxes to lay out; wraps with 12px gap.' },
    { name: 'InfoBoxModule.width',      type: 'number | string',     default: '839',  required: false, description: 'Strip width. Use "100%" to fill.' },
    { name: 'BoxLink.href',             type: 'string',              default: '—',    required: false, description: 'Renders <a> when set, <button> otherwise.' },
    { name: 'BoxLink.onClick',          type: '(e) => void',         default: '—',    required: false, description: 'Click handler.' },
    { name: 'NavInfoCard.title',        type: 'ReactNode',           default: '—',    required: true,  description: 'Card title (18px medium).' },
    { name: 'NavInfoCard.description',  type: 'ReactNode',           default: '—',    required: false, description: 'Description (13px, sub-text color).' },
    { name: 'NavInfoCard.links',        type: '{ key, label, href?, onClick? }[]', default: '—', required: false, description: 'Column of BoxLinks.' },
    { name: 'NavInfoCard.width',        type: 'number | string',     default: '283',  required: false, description: 'Card width.' },
    { name: 'className / style',        type: 'string / CSSProperties', default: '—', required: false, description: 'Available on every component.' },
  ],
  demo: <InfoBoxDemo />,
};
