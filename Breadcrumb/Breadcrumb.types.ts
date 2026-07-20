import React from 'react';

/** State of a single breadcrumb item */
export type BreadcrumbItemState = 'default' | 'hover' | 'active';

export interface BreadcrumbItemDef {
  key: string;
  /** The displayed link label (e.g. "Deep Street") */
  label: string;
  /**
   * Optional href — makes the item a navigable link.
   * When omitted the item is rendered as a span.
   */
  href?: string;
  /**
   * Optional dropdown items.
   * When provided the item shows a chevron-down on hover and
   * opens a small dropdown list on click.
   */
  dropdownItems?: Array<{ key: string; label: string; active?: boolean }>;
  /** Called when the user selects a dropdown option */
  onDropdownSelect?: (optionKey: string) => void;
  /** Click handler for the item text itself */
  onClick?: (key: string) => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItemDef[];
  className?: string;
  style?: React.CSSProperties;
}
