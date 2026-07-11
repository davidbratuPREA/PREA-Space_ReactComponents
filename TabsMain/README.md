# PREATabs

Browser-style editable card tabs for Ant Design **v6** (compatible with v5).

Matches the PREA design system (ANT X 2.0 by antuikit.com) — Figma node `12709:1207`.

---

## Files

| File | Purpose |
|---|---|
| `PREATabs.tsx` | Main component (export entry) |
| `PREATab.tsx` | Internal tab item (not exported) |
| `PREATabs.types.ts` | TypeScript types |
| `PREATabs.css` | Styles using `--ant-*` CSS tokens |
| `index.ts` | Barrel export |

---

## Integration

### 1. Copy the folder

Drop the entire `PREATabs/` directory into your library's `components/` (or equivalent) directory.

### 2. Peer dependencies

These must already be present in the host project:

```json
{
  "antd": ">=6.0.0",
  "@ant-design/icons": ">=5.0.0",
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0"
}
```

### 3. Import the CSS

In your library's global stylesheet entry point (e.g. `index.less` / `index.css`), import:

```css
@import './PREATabs/PREATabs.css';
```

Or import directly in the consuming app:

```tsx
import 'path/to/PREATabs/PREATabs.css';
```

### 4. Use the component

```tsx
import { PREATabs } from './PREATabs';
import type { PREATabItem } from './PREATabs';
import { useState } from 'react';

const Demo = () => {
  const [items, setItems] = useState<PREATabItem[]>([
    { key: '1', label: 'Dashboard', children: <p>Dashboard content</p> },
    { key: '2', label: 'Reports', children: <p>Reports content</p> },
    { key: '3', label: 'Settings', children: <p>Settings content</p> },
  ]);
  const [activeKey, setActiveKey] = useState('1');

  const onEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (action === 'add') {
      const newKey = String(Date.now());
      setItems((prev) => [
        ...prev,
        { key: newKey, label: `Tab ${prev.length + 1}`, children: null },
      ]);
      setActiveKey(newKey);
    } else {
      const nextItems = items.filter((item) => item.key !== targetKey);
      setItems(nextItems);
      if (activeKey === targetKey) {
        setActiveKey(nextItems[nextItems.length - 1]?.key ?? '');
      }
    }
  };

  return (
    <PREATabs
      items={items}
      activeKey={activeKey}
      onChange={setActiveKey}
      onEdit={onEdit}
    />
  );
};
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `PREATabItem[]` | — | **Required.** Array of tab definitions |
| `activeKey` | `string` | — | Controlled active tab key |
| `defaultActiveKey` | `string` | First tab key | Uncontrolled default active tab key |
| `onChange` | `(key: string) => void` | — | Called when active tab changes |
| `onEdit` | `(targetKey: string, action: 'add' \| 'remove') => void` | — | Called on + / × actions. If omitted, the + button is hidden |
| `maxTabWidth` | `number` | `250` | Maximum width of each tab in px |
| `className` | `string` | — | Extra class on root element |
| `style` | `React.CSSProperties` | — | Inline styles on root element |

### `PREATabItem`

| Field | Type | Default | Description |
|---|---|---|---|
| `key` | `string` | — | **Required.** Unique tab identifier |
| `label` | `ReactNode` | — | **Required.** Tab header content |
| `children` | `ReactNode` | — | Tab panel content |
| `closable` | `boolean` | `true` | Show the × close button |
| `disabled` | `boolean` | `false` | Disable click and close |

---

## Theming

The component inherits all antd CSS tokens automatically. To override specific values, use antd's `ConfigProvider`:

```tsx
import { ConfigProvider } from 'antd';

<ConfigProvider theme={{ token: { colorBorder: '#ff0000' } }}>
  <PREATabs ... />
</ConfigProvider>
```

---

## Figma Reference

- **File:** [ANT X 2.0 by antuikit.com](https://www.figma.com/design/qppuMRJyleO2qSHFckMAlo)
- **Node:** `12709:1207` — PREA Tabs / Container
- **Docs:** https://ant.design/components/tabs
