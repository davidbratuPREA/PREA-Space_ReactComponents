# PREA Space — React Components: Project Handoff

> **Date:** 2026-09-07  
> **Prepared by:** Antigravity (Google Deepmind)  
> **For:** Claude — continuing from where we left off

---

## 1. What Is This Project?

**PREA Space** is a product (a financial/data analytics web application) built by the company PREA. The owner is **David Bratu** (`david.bratu@prea.eu`).

This repository is a **custom React component library** for the PREA Space product. The components are built from scratch, pixel-perfectly matching a **Figma design system** ("PREA Space Design System"). They are **not wrapped Ant Design components** — they are standalone, pure React + CSS — except for `TabsMain` which uses Ant Design's `theme.useToken()` to read live design tokens.

The library is used by the broader PREA Space application. Developers who need a component visit the **live demo site**, preview it, copy the import, and download the source files as a ZIP.

---

## 2. Repository

### Git Remote
```
https://github.com/davidbratuPREA/PREA-Space_ReactComponents
```

### GitHub Credentials
The GitHub PAT is embedded directly in the git remote URL (not stored separately).
To retrieve it locally, run:
```bash
git remote -v
```
It is in the format `https://davidbratuPREA:<TOKEN>@github.com/...`

> [!CAUTION]
> The token is embedded in the remote URL — pushing with `git push origin main` will authenticate automatically. Do not commit the raw token to any file.

### Live Demo (GitHub Pages)
```
https://davidbratuprea.github.io/PREA-Space_ReactComponents/
```

Deployed automatically by GitHub Actions on every push to `main`.

### Local Path (on David's Mac)
```
/Users/david.bratu@prea.eu/Library/CloudStorage/GoogleDrive-david.bratu@prea.eu/My Drive/DeepStreet-ReactComponents/
```

> [!NOTE]
> The local folder is named **DeepStreet-ReactComponents** (a legacy name). The GitHub repo is **PREA-Space_ReactComponents**. These are the same project. Don't let that confuse you.

---

## 3. Repository Structure

```
PREA-Space_ReactComponents/
│
├── Button/                    # ✅ Button component
│   ├── Button.tsx
│   ├── Button.types.ts
│   ├── Button.css
│   └── index.ts
│
├── TabsMain/                  # ✅ TabsMain component (uses antd theme tokens)
│   ├── TabsMain.tsx
│   ├── Tab.tsx                # Internal sub-component
│   ├── TabsMain.types.ts
│   ├── TabsMain.css
│   ├── index.ts
│   └── README.md
│
├── DropdownMenu/              # ✅ DropdownMenu + GroupDropdownMenu
│   ├── DropdownMenu.tsx       # DropdownItem + DropdownMenu
│   ├── GroupDropdownMenu.tsx  # DropdownBigItem + GroupDropdownMenu
│   ├── DropdownMenu.types.ts
│   ├── DropdownMenu.css
│   └── index.ts
│
├── Breadcrumb/                # ✅ Breadcrumb with inline dropdown support
│   ├── Breadcrumb.tsx         # BreadcrumbItem + Breadcrumb
│   ├── Breadcrumb.types.ts
│   ├── Breadcrumb.css
│   └── index.ts
│
├── Divider/                   # ✅ Horizontal + Vertical divider
│   ├── Divider.tsx
│   ├── Divider.types.ts
│   ├── Divider.css
│   └── index.ts
│
├── Icon/                      # ✅ Lucide icon wrapper (PREA "li:" naming)
│   ├── Icon.tsx
│   ├── Icon.types.ts
│   ├── Icon.css
│   └── index.ts
│
├── DesignTokensFigma/
│   └── 3. Components/
│       ├── Light.tokens.json  # Exported Figma design tokens (light mode)
│       └── Dark.tokens.json   # Exported Figma design tokens (dark mode)
│
├── demo/                      # Vite + React showcase app (what deploys to GitHub Pages)
│   ├── src/
│   │   ├── App.tsx            # Root — HashRouter, theme state
│   │   ├── ThemeContext.ts    # React context for light/dark
│   │   ├── index.css          # Full design system CSS (vars, layout, dark mode)
│   │   ├── main.tsx
│   │   ├── pages/
│   │   │   ├── WelcomePage.tsx
│   │   │   └── ComponentPage.tsx   # Renders: preview, usage, props table, file list
│   │   ├── components/
│   │   │   ├── Layout/        # Sidebar nav + header (light/dark toggle)
│   │   │   ├── Showcase/      # CodeBlock, PropsTable, DownloadButton
│   │   │   └── Logo.tsx
│   │   └── registry/
│   │       ├── index.ts                    # Master registry map
│   │       ├── types.ts                    # ComponentEntry, PropDef, ComponentFile
│   │       ├── prea-tabs.registry.tsx
│   │       ├── prea-button.registry.tsx
│   │       ├── prea-breadcrumb.registry.tsx
│   │       ├── prea-dropdown.registry.tsx
│   │       ├── prea-divider.registry.tsx
│   │       └── prea-icons.registry.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── .github/
│   └── workflows/
│       └── deploy.yml         # CI/CD: build demo → deploy to GitHub Pages
│
├── .gitignore
└── README.md
```

---

## 4. Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript 5.5 |
| Build Tool | Vite 5.4 |
| Routing | React Router DOM v7 |
| Icons | **lucide-react** (PREA uses "li:" naming prefix from Figma) |
| Design tokens (TabsMain only) | `antd` v6 `theme.useToken()` |
| Styling | **Vanilla CSS** — no CSS modules, no Tailwind. Class prefix: `prea-*` |
| Demo hosting | GitHub Pages (via `actions/deploy-pages`) |
| Node | 20 (pinned in CI) |

### Key Dependencies (demo/package.json)
```json
{
  "antd": "^6.5.0",
  "@ant-design/icons": "^5.6.0",
  "lucide-react": "^1.25.0",
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "react-router-dom": "^7.18.1",
  "jszip": "^3.10.1"
}
```

---

## 5. Design System Philosophy

### CSS Class Naming
All component CSS uses the `prea-` prefix. Example:
```
prea-btn
prea-btn--solid
prea-btn--danger
prea-btn--loading
prea-breadcrumb-item
prea-breadcrumb-item--active
```

### Dark Mode
Dark mode is applied via `html[data-theme="dark"]` (NOT `prefers-color-scheme` media query directly). The `App.tsx` sets this on `<html>`:
```ts
document.documentElement.setAttribute('data-theme', appTheme);
```
CSS uses:
```css
[data-theme="dark"] .prea-btn { ... }
```

> [!IMPORTANT]
> We deliberately use `html[data-theme="dark"]` over `:root` for **higher specificity** — this was a deliberate fix to prevent specificity battles with Ant Design.

### Token Source of Truth
**Figma** is the source of truth for all color values. The exported token files are:
- `DesignTokensFigma/3. Components/Light.tokens.json`
- `DesignTokensFigma/3. Components/Dark.tokens.json`

When implementing a new component, you look up exact hex values from Figma (or these JSON files) and hardcode them in the CSS — you do NOT invent colors. Colors were iteratively matched to match Figma pixel-perfectly.

### Icon Naming Convention
PREA uses a `li:` prefix for Lucide icons in Figma. The `Icon` component converts this:
- `"li:atom"` → `Atom` (Lucide component name)
- `"li:chevron-right"` → `ChevronRight`

---

## 6. Components Built (and Status)

| Component | Status | Notes |
|---|---|---|
| `TabsMain` | ✅ Stable | Browser-style editable card tabs. Uses antd `theme.useToken()` so it auto-adapts to any antd ConfigProvider theme. Has `::before` pseudo-element trick for hover bg to avoid layout jumps. |
| `Button` | ✅ Stable | 5 variants (solid, default, dashed, text, link), 3 sizes (sm, md, lg), danger, loading spinner, icon support (start/end), block, round/circle shapes, full dark mode. |
| `DropdownMenu` | ✅ Stable | Matches Figma "Dropdown Item" exactly. Icon (14px) + label (12px) + chevron-right (14px). Danger/disabled states. |
| `GroupDropdownMenu` | ✅ Stable | Grouped dropdown with section headings. Text-only rows (DropdownBigItem). Multiple groups separated by divider. |
| `Breadcrumb` | ✅ Stable | Each item carries its OWN chevron (not between items). Hover → chevron-right flips to chevron-down if item has dropdown. Click opens inline dropdown. Separate hover colors for text-part vs. icon-part. |
| `Divider` | ✅ Stable | Horizontal (block, 1px) and Vertical (inline, 1px) variants. |
| `Icon` | ✅ Stable | Thin wrapper around lucide-react. Accepts PREA `li:` naming, renders the correct Lucide SVG. Falls back gracefully (renders null) if icon not found. |

---

## 7. Demo App Architecture

The `demo/` folder is a standalone Vite + React app. It is **completely separate from the component source files** — it just imports them from the parent directories.

### Routing
- `/` → `WelcomePage` — intro screen
- `/:componentId` → `ComponentPage` — component details

Uses `HashRouter` (not `BrowserRouter`) because GitHub Pages doesn't support SPA routing without a server. This means URLs look like:
```
https://davidbratuprea.github.io/PREA-Space_ReactComponents/#/button
```

### Registry Pattern
Each component has a registry file (`demo/src/registry/prea-*.registry.tsx`) that exports a `ComponentEntry`:

```ts
interface ComponentEntry {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'stable' | 'beta' | 'coming-soon';
  figmaUrl?: string;
  files: ComponentFile[];   // { name: string; content: string } — actual source strings
  usage: string;            // Code snippet shown in "Usage" section
  props: PropDef[];         // Shown in Props table
  demo: React.ReactNode;    // Live interactive preview
}
```

The `files` array contains the **actual source code as strings** (inlined with template literals). This powers the **Download as ZIP** button — it uses JSZip to bundle them client-side.

### Vite Config Quirks
```ts
// vite.config.ts
base: process.env.GITHUB_ACTIONS ? '/PREA-Space_ReactComponents/' : '/',
resolve: {
  dedupe: ['react', 'react-dom', 'antd', '@ant-design/icons', 'lucide-react'],
},
server: { fs: { allow: ['..'] } }  // needed to import from parent component folders
```

> [!IMPORTANT]
> The `dedupe` array is critical. Without it, `lucide-react` (and `antd`) would be loaded twice — once from `demo/node_modules` and once from the parent folder — causing React hook errors.

---

## 8. CI/CD — GitHub Actions

**File:** `.github/workflows/deploy.yml`

Triggers on:
- Push to `main`
- Manual dispatch from GitHub UI

Steps:
1. Checkout repo
2. Setup Node 20
3. `npm ci` in `demo/`
4. `npx vite build` in `demo/` (with `GITHUB_ACTIONS=true` env → sets correct base path)
5. Upload `demo/dist` as Pages artifact
6. Deploy to GitHub Pages

---

## 9. How to Run Locally

```bash
cd "demo"
npm install
npm run dev
```

Opens at `http://localhost:5173`.

---

## 10. How to Add a New Component

This is the established pattern — follow it exactly:

### Step 1 — Create the component source folder

```
/NewComponent/
├── NewComponent.tsx        # Main component file
├── NewComponent.types.ts   # TypeScript interfaces
├── NewComponent.css        # Styles (prea-newcomponent-* class names)
└── index.ts                # Re-export barrel
```

### Step 2 — Create the registry entry

Create `demo/src/registry/prea-newcomponent.registry.tsx`:

```tsx
import React from 'react';
import type { ComponentEntry } from './types';
// Import the component from the parent folder
import { NewComponent } from '../../NewComponent';

// Import source files as raw strings
import newComponentTsx from '../../NewComponent/NewComponent.tsx?raw';
import newComponentCss from '../../NewComponent/NewComponent.css?raw';
import newComponentTypes from '../../NewComponent/NewComponent.types.ts?raw';
import indexTs from '../../NewComponent/index.ts?raw';

export const newComponentEntry: ComponentEntry = {
  id: 'new-component',
  name: 'NewComponent',
  category: 'Category Name',
  description: 'What this component does.',
  status: 'stable',
  figmaUrl: 'https://figma.com/...',
  files: [
    { name: 'NewComponent.tsx',       content: newComponentTsx },
    { name: 'NewComponent.css',       content: newComponentCss },
    { name: 'NewComponent.types.ts',  content: newComponentTypes },
    { name: 'index.ts',               content: indexTs },
  ],
  usage: `import { NewComponent } from './NewComponent';

<NewComponent />`,
  props: [
    { name: 'someProp', type: 'string', default: "''", required: false, description: 'Description here.' },
  ],
  demo: <NewComponent />,
};
```

### Step 3 — Register it in index.ts

Edit `demo/src/registry/index.ts`:

```ts
import { newComponentEntry } from './prea-newcomponent.registry';

export const registry: ComponentRegistry = {
  // existing entries...
  'new-component': newComponentEntry,
};
```

### Step 4 — Push to main

```bash
git add .
git commit -m "feat: add NewComponent"
git push origin main
```

GitHub Actions will auto-deploy to GitHub Pages.

---

## 11. Git History (Recent Commits)

```
b2131c9  chore: remove old JSON files, add exported Figma design tokens (light/dark)
c648465  fix(dark-mode): use html[data-theme='dark'] (higher specificity than :root) + fix breadcrumb dropdown
406d704  fix(TabsMain): use ::before pseudo-element for hover bg to avoid layout jump
f3f2119  fix(TabsMain): add margin-bottom:1px to non-active tabs
89deaec  fix(TabsMain): replace generic rgba values with exact Figma token hex values
1999e88  fix: apply exact Figma light/dark token values to Dropdown, Breadcrumb, Divider + add IconGapXL
f402f49  fix(DropdownMenu): use inline-flex so width is content-driven
62dafde  fix(demo): remove plain breadcrumb demo, fix preview-frame overflow so dropdowns aren't clipped
1c1dd4a  fix(Breadcrumb): correct Figma tokens for text/icon hover colors, fix height to 18px, fix chevron behavior
2d22838  fix: add lucide-react to vite dedupe
4d4bfb5  rebuild: Breadcrumb, Dropdown, Divider, Icon from Figma — use lucide-react
5b29ee7  feat: add Breadcrumb, DropdownMenu, GroupDropdownMenu, Divider, Icons components
86afbd4  feat: add Button component, rename PREATabs→TabsMain
```

---

## 12. Important Design Decisions & Gotchas

1. **No CSS Modules / No Tailwind.** Everything is vanilla CSS with `prea-*` class names. Don't introduce other styling approaches.

2. **Dark mode via `html[data-theme="dark"]`**, NOT media queries. This gives user-controlled toggle and higher specificity over antd.

3. **Figma is the source of truth for all colors.** Never invent hex values. Use the token JSON files or ask David to get exact colors from Figma.

4. **`lucide-react` must be in Vite `dedupe`** (already there). If you add a new package that's shared between the root component folders and `demo/`, add it to `dedupe` too.

5. **`demo/` `server.fs.allow: ['..']`** is required so Vite can serve files from parent directories (the component source folders).

6. **Breadcrumb chevron behavior:** The chevron lives INSIDE the item pill (not between items). It's `chevron-right` by default, and flips to `chevron-down` on hover ONLY if the item has a `dropdownItems` array.

7. **TabsMain uses `::before` pseudo-element** for tab hover background to avoid a 1px layout jump that occurs when adding/removing a border on hover.

8. **Registry `files[]` contains full source strings** (imported via `?raw` in Vite). When updating a component's source, the registry file does NOT need to change — it imports via `?raw` which is always current.

9. **The repo folder on David's Mac is synced via Google Drive** — paths contain spaces. Always quote paths in shell commands.

10. **The README.md is slightly outdated** — it still references `PREATabs` (the old name, now `TabsMain`) and doesn't list all current components. Update it when adding new components.

---

## 13. What To Do Next (Open Items / Future Components)

David will tell Claude what the next component to build is. The likely pipeline (based on what was discussed) includes more PREA Design System components matching Figma specs. The workflow is always:

1. David provides the Figma component spec (either by sharing a Figma link or describing it)
2. We implement: `ComponentFolder/` + `demo/src/registry/prea-component.registry.tsx`
3. Register in `index.ts`, push to `main`, verify on GitHub Pages

The Figma MCP server is configured and available (`figma-dev-mode-mcp-server`) — you can use `get_design_context` and `get_screenshot` to inspect Figma designs directly if David shares a Figma file/node URL.

---

## 14. Figma MCP Access

The Figma MCP server is available. Tools:
- `get_design_context` — inspect component design specs
- `get_screenshot` — screenshot a Figma node
- `get_variable_defs` — get design token variables
- `get_code_connect_map` — check any Code Connect mappings

David will provide Figma node URLs when working on a new component.

---

## 15. Quick Reference

| Item | Value |
|---|---|
| GitHub Repo | `https://github.com/davidbratuPREA/PREA-Space_ReactComponents` |
| Live Demo | `https://davidbratuprea.github.io/PREA-Space_ReactComponents/` |
| Git push command | `git push origin main` (PAT embedded in remote URL) |
| Local path | `/Users/david.bratu@prea.eu/Library/CloudStorage/GoogleDrive-david.bratu@prea.eu/My Drive/DeepStreet-ReactComponents/` |
| Run locally | `cd demo && npm install && npm run dev` |
| CSS class prefix | `prea-*` |
| Dark mode trigger | `html[data-theme="dark"]` |
| Icon library | `lucide-react` with PREA `li:` naming prefix |
| Design tokens source | `DesignTokensFigma/3. Components/Light.tokens.json` & `Dark.tokens.json` |

---

*End of handoff. Claude should now have everything needed to continue building components for the PREA Space design system.*
