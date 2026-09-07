import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { ChatInputProps } from './Chat.types';
import { ChatButton } from './ChatButton';
import './Chat.css';

/**
 * ChatInput
 *
 * Matches Figma "chat_menu" (State = Default | Active, subMenu on/off):
 *
 *   ┌─ chatHead · bg · border · radius 8 · padding 14/12/12 ────────────┐
 *   │  Wie kann ich dir helfen?          ← 18/22 textarea, auto-grows   │
 *   │                                    ← gap 26                        │
 *   │  [+] [◎ GPT 5.6]                              [↑]  ← send, only   │
 *   └───────────────────────────────────────────── when there is text ──┘
 *   │  [▢ Chats ⌄] [▢ Projekte ⌄]        ← chatSub strip (sub_BG), 6/12 │
 *   └────────────────────────────────────────────────────────────────────┘
 *
 * Enter sends, Shift+Enter inserts a newline.
 */
export function ChatInput({
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Wie kann ich dir helfen?',
  onSend,
  disabled = false,
  onAttach,
  modelLabel,
  modelIcon = 'OpenAI',
  onModelClick,
  actions,
  subMenu,
  autoFocus,
  maxHeight = 200,
  width = 540,
  className,
  style,
}: ChatInputProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const text = isControlled ? (value as string) : internal;
  const taRef = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const next = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [maxHeight]);

  useEffect(() => { resize(); }, [text, resize]);

  function update(next: string) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  function send() {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend?.(trimmed);
    if (!isControlled) setInternal('');
  }

  const hasText = text.trim().length > 0;
  const hasSub = subMenu !== undefined && subMenu !== null && subMenu !== false;

  const cls = ['prea-chat-input', hasSub && 'prea-chat-input--with-sub', className].filter(Boolean).join(' ');

  const defaultActions = (
    <>
      {onAttach && (
        <ChatButton icon="li:plus" label="Anhängen" onClick={onAttach} disabled={disabled} />
      )}
      {modelLabel !== undefined && modelLabel !== null && (
        <ChatButton icon={modelIcon} onClick={onModelClick} disabled={disabled}>
          {modelLabel}
        </ChatButton>
      )}
    </>
  );

  return (
    <div className={cls} style={{ width, ...style }}>
      <div className="prea-chat-input__head">
        <textarea
          ref={taRef}
          className="prea-chat-input__textarea"
          rows={1}
          value={text}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          onChange={(e) => update(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />

        <div className="prea-chat-input__row">
          <div className="prea-chat-input__actions">{actions ?? defaultActions}</div>
          {onSend && hasText && (
            <ChatButton variant="primary" icon="li:arrow-up" label="Senden" onClick={send} disabled={disabled} />
          )}
        </div>
      </div>

      {hasSub && <div className="prea-chat-input__sub">{subMenu}</div>}
    </div>
  );
}
