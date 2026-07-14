import { tabsMainEntry } from './prea-tabs.registry';
import { buttonEntry }   from './prea-button.registry';
import type { ComponentRegistry } from './types';

export const registry: ComponentRegistry = {
  'tabs-main': tabsMainEntry,
  'button':    buttonEntry,
};

export const categories = Array.from(
  new Set(Object.values(registry).map((c) => c.category))
);

export type { ComponentEntry, ComponentStatus, PropDef, ComponentFile } from './types';
