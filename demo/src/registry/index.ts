import { tabsMainEntry }   from './prea-tabs.registry';
import { buttonEntry }     from './prea-button.registry';
import { breadcrumbEntry } from './prea-breadcrumb.registry';
import { dropdownEntry }   from './prea-dropdown.registry';
import { dividerEntry }    from './prea-divider.registry';
import { iconsEntry }      from './prea-icons.registry';
import { dataBoxEntry }    from './prea-databox.registry';
import { infoBoxEntry }    from './prea-infobox.registry';
import { chatEntry }       from './prea-chat.registry';
import { inputsEntry }     from './prea-inputs.registry';
import { filtersEntry }    from './prea-filters.registry';
import { kanbanEntry }     from './prea-kanban.registry';
import { colorPickerEntry } from './prea-colorpicker.registry';
import { notesEntry }      from './prea-notes.registry';
import { navigationEntry } from './prea-navigation.registry';
import { mapNavEntry }     from './prea-mapnav.registry';
import { createMenuEntry } from './prea-createmenu.registry';
import type { ComponentRegistry } from './types';

export const registry: ComponentRegistry = {
  'tabs-main':  tabsMainEntry,
  'button':     buttonEntry,
  'breadcrumb': breadcrumbEntry,
  'dropdown':   dropdownEntry,
  'divider':    dividerEntry,
  'icons':      iconsEntry,
  'databox':    dataBoxEntry,
  'infobox':    infoBoxEntry,
  'chat':       chatEntry,
  'inputs':     inputsEntry,
  'filters':    filtersEntry,
  'kanban':     kanbanEntry,
  'colorpicker': colorPickerEntry,
  'notes':      notesEntry,
  'navigation': navigationEntry,
  'mapnav':     mapNavEntry,
  'createmenu': createMenuEntry,
};

export const categories = Array.from(
  new Set(Object.values(registry).map((c) => c.category))
);

export type { ComponentEntry, ComponentStatus, PropDef, ComponentFile } from './types';
