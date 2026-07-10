import { preatabsEntry } from './prea-tabs.registry';
import type { ComponentRegistry } from './types';

export const registry: ComponentRegistry = {
  'prea-tabs': preatabsEntry,
};

export const categories = Array.from(
  new Set(Object.values(registry).map((c) => c.category))
);

export type { ComponentEntry, ComponentStatus, PropDef, ComponentFile } from './types';
