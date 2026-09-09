# PREA Space — React Components

Custom React component library for **PREA Space**, built pixel-perfectly against the **PREA Space Design System** in Figma. Components are standalone React + vanilla CSS (class prefix `prea-*`); `TabsMain` additionally reads Ant Design v6 theme tokens.

## Live Demo

👉 **[davidbratuprea.github.io/PREA-Space_ReactComponents/](https://davidbratuprea.github.io/PREA-Space_ReactComponents/)**

Deployed automatically to GitHub Pages on every push to `main`.

## Components

| Component | Category | Exports | Status |
|-----------|----------|---------|--------|
| `TabsMain` | Navigation | `TabsMain` | ✅ Stable |
| `Button` | General | `Button` | ✅ Stable |
| `Breadcrumb` | Navigation | `Breadcrumb`, `BreadcrumbItem` | ✅ Stable |
| `DropdownMenu` | Navigation | `DropdownMenu`, `GroupDropdownMenu` | ✅ Stable |
| `Navigation` | Navigation | `MainNav`, `MainNavItem`, `MainNavUser`, `NavDropdownItem`, `NavSectionHead`, `PathMenu`, `PanelTabs`, `Tabs`, `BottomNav`, `IconButton`, `ToggleDataMenu`, `SearchPanel` | ✅ Stable |
| `MapNav` | Navigation | `MapNav`, `MapNavGroup`, `MapNavGlobe`, `Compass`, `MapLayersMenu`, `MapLayerItem`, `LayerButton` | 🟠 Pending |
| `CreateMenu` | Navigation | `CreateEntryMenu`, `CreateEntryStep`, `CreateEntryList`, `CreateDropdownItem`, `CreateEntryItem`, `CreateEntryHead`, `StatusMenu`, `Checkbox` | 🟠 Pending |
| `Divider` | Layout | `Divider` | ✅ Stable |
| `Icon` | General | `Icon` (lucide-react, PREA `li:` naming) | ✅ Stable |
| `DataBox` | Data Display | `DataPanel`, `DataGroup`, `DataBox`, `DataBoxItem`, `DataButton` | ✅ Stable |
| `InfoBox` | Data Display | `InfoBox`, `InfoBoxModule`, `BoxLink`, `NavInfoCard` | ✅ Stable |
| `Kanban` | Data Display | `KanbanBoard`, `KanbanColumn`, `KanbanProject`, `KanbanStatusBadge`, `QuantityBadge` | 🟠 Pending |
| `Inputs` | Data Entry | `TextInput`, `SmallInput`, `ColorInput`, `CreateInput`, `SearchInput`, `SearchListItem` | ✅ Stable |
| `ColorPicker` | Data Entry | `ColorPicker`, `ColorSwitchItem`, `ColorSwatch` | ✅ Stable |
| `Filters` | Data Entry | `FilterPanel`, `FilterItem`, `ToggleSwitch`, `StatusBadge`, `FilterRange`, `FilterTabs` | 🟠 Pending |
| `Notes` | Chat | `NotesPanel`, `NoteCard`, `NoteThread`, `NoteDivider` | 🟠 Pending |
| `Avatar` | General | `Avatar`, `AvatarGroup` | ✅ Stable |
| `Chat` | Chat | `ChatInput`, `ChatDropdown`, `ChatNotes`, `ChatButton` | ✅ Stable |

## Project Structure

```
PREA-Space_ReactComponents/
├── Avatar/               # one folder per component family
├── Button/
├── Breadcrumb/
├── Chat/
├── ColorPicker/
├── CreateMenu/
├── DataBox/
├── Divider/
├── Filters/
├── DropdownMenu/
├── Icon/
├── InfoBox/
├── Inputs/
├── Kanban/
├── MapNav/
├── Navigation/
├── Notes/
├── TabsMain/
│   ├── <Name>.tsx        # component(s)
│   ├── <Name>.types.ts   # TypeScript interfaces
│   ├── <Name>.css        # styles — Figma tokens as CSS vars, dark mode via html[data-theme="dark"]
│   └── index.ts          # barrel export
├── DesignTokensFigma/    # exported Figma design tokens (Light / Dark)
└── demo/                 # Component showcase (Vite + React) — deploys to GitHub Pages
    └── src/
        ├── registry/     # one prea-*.registry.tsx per component (add new components here)
        ├── pages/        # Welcome + component detail page
        └── components/   # Layout, Showcase (CodeBlock, PropsTable, DownloadButton)
```

## Design tokens & dark mode

Figma is the source of truth for every color and size. Each `.css` file declares its tokens on `:root` (light) and overrides them under `html[data-theme='dark']`. Toggle dark mode by setting `document.documentElement.setAttribute('data-theme', 'dark')`.

## Running Locally

```bash
cd demo
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Adding a New Component

1. Create a folder `/YourComponent/` with `YourComponent.tsx`, `YourComponent.types.ts`, `YourComponent.css`, `index.ts`
2. Add a registry entry at `demo/src/registry/prea-yourcomponent.registry.tsx` (imports sources via `?raw` for the ZIP download)
3. Register it in `demo/src/registry/index.ts`
4. Push to `main` — the demo deploys automatically

See `HANDOFF.md` for the full conventions and gotchas.

## Using a Component

Download the ZIP from the live demo page, or copy the component folder into your project:

```tsx
import { DataPanel, DataGroup, DataBox } from './DataBox';

<DataPanel>
  <DataGroup title="HeadGroup-lv.1">
    <DataBox
      groups={[{ head: 'Head', values: ['Info item value'] }]}
      subGroups={[['Info subItem value']]}
    />
  </DataGroup>
</DataPanel>
```
