import React from 'react';
import type { KanbanStatus } from '../Kanban';

/* ─── Checkbox (Figma "Checkbox") ────────────────────────────────────────── */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
}

/* ─── CreateDropdownItem (Figma "createDropdown_Item") ───────────────────── */
export interface CreateDropdownItemProps {
  icon?: string | React.ReactNode;
  label: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

/* ─── CreateEntryItem (Figma "createEntryItem" Version=Item) ─────────────── */
export interface CreateEntryItemProps {
  label: React.ReactNode;
  /** Leading 14px checkbox (Figma). */
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Kanban status shown as a badge at the right (Figma status=true), with an ✕ to clear it. */
  status?: KanbanStatus;
  statusLabel?: React.ReactNode;
  onClearStatus?: () => void;
  onClick?: () => void;
  className?: string;
}

/* ─── CreateEntryHead (Figma "createEntryItem" Version=Head) ─────────────── */
export interface CreateEntryHeadProps {
  /** Head label (Figma "Alle auswählen"). */
  title: React.ReactNode;
  /** Head checkbox — select all. */
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Red action at the right (Figma disableAll: "Alle Status löschen"). */
  actionLabel?: React.ReactNode;
  onAction?: () => void;
  className?: string;
}

/* ─── CreateEntryList (Figma 350px "createEntryMenu": search + sub-head, scrolling items, footer) */
export interface CreateEntryListProps {
  title?: React.ReactNode;
  onClose?: () => void;
  /** Search value (SearchInput, 24px). */
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  /** Small grey line under the search (Figma "Zur Porfolio “…” hinzufügen"). */
  subHead?: React.ReactNode;
  /** CreateEntryHead + CreateEntryItems. */
  children?: React.ReactNode;
  onBack?: () => void;
  /** Footer buttons (Figma: "Status wählen", "Hinzufügen (4)"). */
  secondaryLabel?: React.ReactNode;
  onSecondary?: () => void;
  primaryLabel?: React.ReactNode;
  onPrimary?: () => void;
  primaryDisabled?: boolean;
  /** Size. Figma 350 × 470. */
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── StatusMenu (Figma "statusMenu") ────────────────────────────────────── */
export interface StatusOption { key: string; status: KanbanStatus; label?: React.ReactNode; }

export interface StatusMenuProps {
  options: StatusOption[];
  value?: string;
  onChange?: (key: string) => void;
  /** Called with the new status name when the user confirms "Neuer Status" (Enter). */
  onCreate?: (name: string) => void;
  /** Palette button next to the new-status input (Figma Style=Edit). */
  onPickColor?: () => void;
  createLabel?: React.ReactNode;
  /** Controlled edit mode (Figma Style=Edit). */
  editing?: boolean;
  onEditingChange?: (editing: boolean) => void;
  /** Width. Figma 150. */
  width?: number | string;
  className?: string;
}

/* ─── CreateEntryMenu (Figma "createEntryMenu") ──────────────────────────── */
export interface CreateEntryMenuProps {
  title?: React.ReactNode;
  onClose?: () => void;
  onBack?: () => void;
  /** Body — CreateDropdownItems (step 1) or a <CreateEntryStep/> (step 2). */
  children?: React.ReactNode;
  /** Footer row with a top border (Figma 350px list version). */
  footer?: React.ReactNode;
  /** Width. Figma 250 (steps) / 350 (list). */
  width?: number | string;
  /** Height — fixed across steps. Figma 161 (steps) / 470 (list). */
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── CreateEntryStep (Figma "createEntryMenu" Step=2 body) ──────────────── */
export interface CreateEntryStepProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Optional secondary row under the input (Figma "Projekt hinzufügen"). */
  addLabel?: React.ReactNode;
  addIcon?: string | React.ReactNode;
  onAdd?: () => void;
  /** Black full-width button at the bottom (Figma "Erstellen"). */
  submitLabel?: React.ReactNode;
  onSubmit?: (value: string) => void;
  submitDisabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}
