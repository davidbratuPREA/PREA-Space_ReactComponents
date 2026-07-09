# DeepStreet React Components

Custom React component library built on top of **Ant Design v6**, following the **PREA Design System (ANT X 2.0)**.

## Components

| Component | Description |
|-----------|-------------|
| `PREATabs` | Browser-style editable card tabs with light/dark mode support |

## Live Demo

> Deployed automatically to GitHub Pages on every push to `main`.

👉 **[View Demo](https://david-bratu.github.io/DeepStreet-ReactComponents/)**  
_(URL updates once GitHub Pages is enabled in repo settings)_

## Project Structure

```
DeepStreet-ReactComponents/
├── PREATabs/          # PREATabs component source
│   ├── PREATabs.tsx
│   ├── PREATab.tsx
│   ├── PREATabs.css
│   └── PREATabs.types.ts
└── demo/              # Vite + React demo app
    └── src/
        └── App.tsx
```

## Running Locally

```bash
cd demo
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Using a Component

```tsx
import { PREATabs } from './PREATabs';
import type { PREATabItem } from './PREATabs';

const items: PREATabItem[] = [
  { key: '1', label: 'Tab One', children: <p>Content 1</p> },
  { key: '2', label: 'Tab Two', children: <p>Content 2</p> },
];

const [activeKey, setActiveKey] = useState('1');

const onEdit = (key: string, action: 'add' | 'remove') => { /* ... */ };

<PREATabs
  items={items}
  activeKey={activeKey}
  onChange={setActiveKey}
  onEdit={onEdit}
/>
```

The component automatically adapts to any `ConfigProvider` theme (light, dark, or custom tokens).
