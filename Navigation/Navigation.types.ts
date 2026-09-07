import React from 'react';

/* ─── MainNavItem (Figma "mainNav-item") ─────────────────────────────────── */
export interface MainNavItemProps {
  /** Figma icon name or node. 20px collapsed / 16px expanded. */
  icon?: string | React.ReactNode;
  label?: React.ReactNode;
  /** Expanded (icon + label, 191px) or collapsed (32×32 icon). */
  expanded?: boolean;
  active?: boolean;
  /** Renders a chevron and, when active, the children as a nested list (Figma dropdown). */
  children?: React.ReactNode;
  /** Controlled open state for the nested list. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClick?: () => void;
  href?: string;
  /** Accessible label — needed when collapsed. */
  title?: string;
  className?: string;
}

/* ─── NavDropdownItem (Figma "navItem-dropdown") ─────────────────────────── */
export interface NavDropdownItemProps {
  label: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
}

/* ─── NavSectionHead (Figma "headProjects" / "headChats") ─────────────────── */
export interface NavSectionHeadProps {
  title: React.ReactNode;
  actionLabel?: React.ReactNode;
  onAction?: () => void;
  className?: string;
}

/* ─── MainNav (Figma "mainNav" Style=Open | Close) ───────────────────────── */
export interface MainNavProps {
  /** true = 280px with labels · false = 48px icon rail. */
  expanded?: boolean;
  onToggle?: () => void;
  /** Logo node shown in the header (Figma PREA-Logo + "SPACE"). */
  logo?: React.ReactNode;
  /** Product name next to the logo. */
  title?: React.ReactNode;
  /** Top part (New Chat, main items…). */
  children?: React.ReactNode;
  /** Bottom part (project lists, settings, user). */
  footer?: React.ReactNode;
  /** Height. Default "100vh". */
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── BottomNav (Figma "bottomNav") ──────────────────────────────────────── */
export interface BottomNavProps {
  /** Left buttons (ChatButton-like pills, 22px). */
  children?: React.ReactNode;
  /** Right side: status icons (Figma icon names or nodes, 16px). */
  icons?: Array<string | React.ReactNode>;
  date?: React.ReactNode;
  time?: React.ReactNode;
  /** Blue edit-mode bar (Figma State=EditMode). */
  editMode?: boolean;
  editLabel?: React.ReactNode;
  onExitEdit?: () => void;
  exitLabel?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface BottomNavButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon?: string | React.ReactNode;
  children?: React.ReactNode;
  /** grey (Figma "Ebenen" bg #F1F1F1) · primary (blue "Neu erstellen") · plain (no bg). */
  variant?: 'grey' | 'primary' | 'plain';
}

/* ─── PathMenu (Figma "pathMenu") ────────────────────────────────────────── */
export interface PathMenuProps {
  onBack?: () => void;
  onForward?: () => void;
  onReload?: () => void;
  /** Breadcrumb element (use <Breadcrumb/>). */
  breadcrumb?: React.ReactNode;
  /** Right-hand tool buttons (Figma Style=Projekt) — use <IconButton>. */
  tools?: React.ReactNode;
  /** Search element (use <SearchInput/>). */
  search?: React.ReactNode;
  /** Panel toggle button at the far right (Figma Style=Default). */
  onTogglePanel?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── IconButton — the 22px icon-only "Default Button" used all over the menus */
export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: string | React.ReactNode;
  label: string;
  /** primary = blue bg + white icon. */
  variant?: 'plain' | 'primary';
  size?: 18 | 22 | 24 | 32;
  active?: boolean;
}

/* ─── Tabs (Figma "TabsTertiary" pills / "TabsSecondary" underline) ──────── */
export interface TabItem { key: string; label: React.ReactNode; }

export interface TabsProps {
  tabs: TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  /** tertiary = pill tabs (20px) · secondary = underline tabs (26px). */
  variant?: 'tertiary' | 'secondary';
  /** Trailing "+" button. */
  onAdd?: () => void;
  className?: string;
}

/* ─── PanelTabs (Figma "panelTab") ───────────────────────────────────────── */
export interface PanelTabsProps {
  /** Top pill tabs. */
  tabs: TabItem[];
  activeKey?: string;
  onChange?: (key: string) => void;
  onAddTab?: () => void;
  /** Second underline row. */
  subTabs?: TabItem[];
  activeSubKey?: string;
  onSubChange?: (key: string) => void;
  onAddSubTab?: () => void;
  /** Right-hand tools (row 1 when no subTabs, row 2 otherwise). */
  tools?: React.ReactNode;
  /** Width. Figma 556. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── ToggleDataMenu (Figma "ToggleDataMenu") ────────────────────────────── */
export interface ToggleDataMenuProps {
  title: React.ReactNode;
  icon?: string | React.ReactNode;
  onToggle?: () => void;
  className?: string;
}

/* ─── SearchPanel (Figma "searchPanel") ──────────────────────────────────── */
export interface SearchPanelProps {
  children: React.ReactNode;
  /** Width. Figma 348. */
  width?: number | string;
  className?: string;
}
