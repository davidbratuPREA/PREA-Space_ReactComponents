import React from 'react';

// ─── ChatButton (Figma "chat_btn") ─────────────────────────────────────────

export type ChatButtonVariant = 'default' | 'primary';

export interface ChatButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Icon — a Figma icon name ("li:plus", "OpenAI") or any ReactNode. 16px. */
  icon?: string | React.ReactNode;
  /** Optional text label (12px). Omit for an icon-only 32×32 button. */
  children?: React.ReactNode;
  /** Forces the Hover/Active look (btn_BG_Active + btn_Border). */
  active?: boolean;
  /** 'primary' = the blue send button (Toggle/btn-Active bg, white icon). */
  variant?: ChatButtonVariant;
  /** Accessible label — required for icon-only buttons. */
  label?: string;
}

// ─── ChatDropdown (Figma "dropdown_chat" + "chat_Dropdown") ────────────────

export interface ChatDropdownItem {
  key: string;
  label: React.ReactNode;
  /** Figma icon name or ReactNode. Default for list items: "li:message-square". */
  icon?: string | React.ReactNode;
  disabled?: boolean;
  onClick?: (key: string) => void;
}

export interface ChatDropdownProps {
  /** Trigger label (13px medium), e.g. "Chats" */
  label: React.ReactNode;
  /** Trigger icon — Figma icon name or ReactNode. Default "li:message-square". */
  icon?: string | React.ReactNode;
  /** Main list (e.g. recent chats). */
  items?: ChatDropdownItem[];
  /** Rows shown under the divider (e.g. "Neuer Chat", "Alle Anzeigen"). */
  actions?: ChatDropdownItem[];
  /** Show the search field at the top of the panel. Default true. */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Fired with the item key when an item or action is clicked. */
  onSelect?: (key: string) => void;
  /** Controlled open state. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Panel width. Figma default 274px. */
  panelWidth?: number | string;
  /** Text shown when the search has no results. */
  emptyText?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ─── ChatInput (Figma "chat_menu") ─────────────────────────────────────────

export interface ChatInputProps {
  /** Controlled value. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Placeholder (Figma: "Wie kann ich dir helfen?") */
  placeholder?: string;
  /**
   * Called with the trimmed text when the send button is clicked or Enter is
   * pressed (Shift+Enter inserts a newline). The blue send button is rendered
   * whenever there is text — the Figma "State=Active".
   */
  onSend?: (value: string) => void;
  /** Disables input and buttons. */
  disabled?: boolean;
  /** Fires when the "+" (attach) button is clicked. Hidden when omitted. */
  onAttach?: () => void;
  /** Model button label, e.g. "GPT 5.6". Hidden when omitted. */
  modelLabel?: React.ReactNode;
  /** Model button icon — Figma icon name or ReactNode. Default "OpenAI". */
  modelIcon?: string | React.ReactNode;
  onModelClick?: () => void;
  /** Replaces the default action row (attach + model button). */
  actions?: React.ReactNode;
  /** Content of the sub-menu strip (Figma "chatSub"), usually <ChatDropdown>s. */
  subMenu?: React.ReactNode;
  /** Autofocus the textarea. */
  autoFocus?: boolean;
  /** Max textarea height in px before it scrolls. Default 200. */
  maxHeight?: number;
  /** Width. Figma default 540px. Use "100%" to fill. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

// ─── ChatNotes (Figma "chat_notes") ────────────────────────────────────────

export interface ChatNotesProps extends Omit<ChatInputProps, 'subMenu' | 'width'> {
  /** Width of the docked bar. Figma default 560px. Use "100%" to fill. */
  width?: number | string;
}
