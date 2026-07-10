import React from 'react';

export type ComponentStatus = 'stable' | 'beta' | 'coming-soon';

export interface PropDef {
  name: string;
  type: string;
  default: string;
  required: boolean;
  description: string;
}

export interface ComponentFile {
  name: string;
  content: string;
}

export interface ComponentEntry {
  id: string;
  name: string;
  category: string;
  description: string;
  status: ComponentStatus;
  figmaUrl?: string;
  files: ComponentFile[];
  usage: string;
  props: PropDef[];
  demo: React.ReactNode;
}

export type ComponentRegistry = Record<string, ComponentEntry>;
