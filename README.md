# PREA Space — React Components

Custom React component library built on top of **Ant Design v6**, following the **PREA Space Design System**.

## Live Demo

👉 **[davidbratuprea.github.io/PREA-Space_ReactComponents/](https://davidbratuprea.github.io/PREA-Space_ReactComponents/)**

Deployed automatically to GitHub Pages on every push to `main`.

## Components

| Component | Category | Status |
|-----------|----------|--------|
| `PREATabs` | Navigation | ✅ Stable |

## Project Structure

```
PREA-Space_ReactComponents/
├── PREATabs/          # PREATabs component source
│   ├── PREATabs.tsx
│   ├── PREATab.tsx
│   ├── PREATabs.css
│   ├── PREATabs.types.ts
│   └── index.ts
└── demo/              # Component library showcase (Vite + React)
    └── src/
        ├── registry/  # Component registry (add new components here)
        ├── pages/     # Component detail pages
        └── components/
```

## Running Locally

```bash
cd demo
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Adding a New Component

1. Create a folder `/YourComponent/` with the component source files
2. Add a registry entry at `demo/src/registry/your-component.registry.tsx`
3. Import and export it in `demo/src/registry/index.ts`
4. Push to `main` — the demo deploys automatically

## Using a Component

Download the ZIP from the live demo page, or copy individual files:

```tsx
import { PREATabs } from './PREATabs';
import type { PREATabItem } from './PREATabs';
import { useState } from 'react';

const [items, setItems] = useState<PREATabItem[]>([
  { key: '1', label: 'Tab One', children: <p>Content 1</p> },
  { key: '2', label: 'Tab Two', children: <p>Content 2</p> },
]);

const [activeKey, setActiveKey] = useState('1');

<PREATabs
  items={items}
  activeKey={activeKey}
  onChange={setActiveKey}
  onEdit={(key, action) => { /* add / remove logic */ }}
/>
```

Components automatically adapt to any `ConfigProvider` theme (light, dark, or custom tokens).
