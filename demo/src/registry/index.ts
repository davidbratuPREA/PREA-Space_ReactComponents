import { tabsMainEntry }   from './prea-tabs.registry';
import { buttonEntry }     from './prea-button.registry';
import { breadcrumbEntry } from './prea-breadcrumb.registry';
import { dropdownEntry }   from './prea-dropdown.registry';
import { dividerEntry }    from './prea-divider.registry';
import { iconsEntry }      from './prea-icons.registry';
import type { ComponentRegistry } from './types';

export const registry: ComponentRegistry = {
  'tabs-main':  tabsMainEntry,
  'button':     buttonEntry,
  'breadcrumb': breadcrumbEntry,
  'dropdown':   dropdownEntry,
  'divider':    dividerEntry,
  'icons':      iconsEntry,
};

export const categories = Array.from(
  new Set(Object.values(registry).map((c) => c.category))
);

export type { ComponentEntry, ComponentStatus, PropDef, ComponentFile } from './types';
