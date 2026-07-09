import type { ReactNode } from 'react';

/**
 * A single tab item in the PREA Tabs component.
 * Mirrors the Ant Design `TabsProps['items']` shape for easy integration.
 */
export interface PREATabItem {
  /** Unique identifier for the tab */
  key: string;
  /** Tab label displayed in the tab bar */
  label: ReactNode;
  /** Tab panel content rendered when the tab is active */
  children?: ReactNode;
  /** Whether this tab can be closed. Defaults to true. */
  closable?: boolean;
  /** Whether this tab is disabled */
  disabled?: boolean;
}

/**
 * Props for the PREATabs component.
 *
 * The `onEdit` callback intentionally mirrors antd's own `Tabs` `onEdit` signature
 * so this component is a drop-in replacement for editable card tabs.
 */
export interface PREATabsProps {
  /** Array of tab items */
  items: PREATabItem[];

  /**
   * The key of the currently active tab (controlled mode).
   * Use together with `onChange`.
   */
  activeKey?: string;

  /**
   * The key of the tab that is active by default (uncontrolled mode).
   * Ignored when `activeKey` is provided.
   */
  defaultActiveKey?: string;

  /**
   * Called when the active tab changes.
   * @param key The key of the newly active tab
   */
  onChange?: (key: string) => void;

  /**
   * Called when a tab is added or removed.
   * - action `'add'`    → user clicked the + button  (targetKey will be an empty string)
   * - action `'remove'` → user clicked the × button on a tab  (targetKey is the tab's key)
   *
   * Mirrors the antd `Tabs` `onEdit` signature exactly.
   */
  onEdit?: (targetKey: string, action: 'add' | 'remove') => void;

  /**
   * Maximum width of each tab in pixels.
   * @default 250
   */
  maxTabWidth?: number;

  /** Additional CSS class applied to the root element */
  className?: string;

  /** Inline styles applied to the root element */
  style?: React.CSSProperties;
}
