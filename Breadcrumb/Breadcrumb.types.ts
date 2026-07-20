import type { ReactNode } from 'react';

export interface BreadcrumbItemDef {
  /** Unique key */
  key: string;
  /** Label text */
  label: ReactNode;
  /** Optional link URL — if omitted the item renders as plain text */
  href?: string;
  /** Optional icon rendered before the label */
  icon?: ReactNode;
}

export interface BreadcrumbProps {
  /** Ordered list of crumb items. Last item is the current active page. */
  items: BreadcrumbItemDef[];
  /**
   * Custom separator rendered between crumbs.
   * @default '/'
   */
  separator?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
