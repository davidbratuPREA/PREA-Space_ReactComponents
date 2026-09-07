import React from 'react';
import type { ChatNotesProps } from './Chat.types';
import { ChatInput } from './ChatInput';
import './Chat.css';

/**
 * ChatNotes
 *
 * Matches Figma "chat_notes" (Style = Default | Active) — the composer docked
 * at the bottom of a panel:
 *
 *   ┌─ DataPanelBG · top border · shadow 0 -4px 10px · padding 8 ──┐
 *   │  <ChatInput> without sub-menu, all four corners rounded       │
 *   └───────────────────────────────────────────────────────────────┘
 */
export function ChatNotes({ width = 560, className, style, ...inputProps }: ChatNotesProps) {
  const cls = ['prea-chat-notes', className].filter(Boolean).join(' ');
  return (
    <div className={cls} style={{ width, ...style }}>
      <ChatInput {...inputProps} width="100%" />
    </div>
  );
}
