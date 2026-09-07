import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '../Icon';
import type { ChatDropdownItem, ChatDropdownProps } from './Chat.types';
import { renderIcon } from './ChatButton';
import './Chat.css';

/**
 * ChatDropdown
 *
 * Matches Figma "dropdown_chat" (State = Default | Hover | Active) with the
 * "chat_Dropdown" panel that opens in the Active state:
 *
 *   [icon 16] Chats [chevron-down 16]          ← trigger, 22px, 13px medium
 *   ┌─ panel 274px · panel-bg · border · 6px ─┐
 *   │ [search] Chats suchen                    │  ← optional, filters items
 *   │ ├ item · item · item …                   │  ← 23px rows, 14px icon
 *   │ ─────────────────────────────────────── │  ← divider
 *   │ ├ action · action                        │  ← e.g. "Neuer Chat"
 *   └──────────────────────────────────────────┘
 *
 * Trigger: hover → btn_BG, open → btn_BG_Active. Closes on outside click / Esc.
 */
export function ChatDropdown({
  label,
  icon = 'li:message-square',
  items = [],
  actions = [],
  searchable = true,
  searchPlaceholder = 'Suchen',
  onSelect,
  open,
  defaultOpen = false,
  onOpenChange,
  panelWidth,
  emptyText = 'Keine Treffer',
  className,
  style,
}: ChatDropdownProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? (open as boolean) : internalOpen;
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  function setOpen(next: boolean) {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
    if (!next) setQuery('');
  }

  // close on outside click / Escape
  useEffect(() => {
    if (!isOpen) return;
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // focus search when opening
  useEffect(() => {
    if (isOpen && searchable) searchRef.current?.focus();
  }, [isOpen, searchable]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => String(typeof it.label === 'string' ? it.label : it.key).toLowerCase().includes(q));
  }, [items, query]);

  function pick(it: ChatDropdownItem) {
    if (it.disabled) return;
    it.onClick?.(it.key);
    onSelect?.(it.key);
    setOpen(false);
  }

  function renderRow(it: ChatDropdownItem, defaultIcon: string | undefined) {
    const ic = it.icon === undefined ? defaultIcon : it.icon;
    return (
      <li key={it.key} role="none">
        <button
          type="button"
          role="menuitem"
          className="prea-chat-dropdown__item"
          disabled={it.disabled}
          onClick={() => pick(it)}
        >
          {ic && <span className="prea-chat-dropdown__item-icon" aria-hidden>{renderIcon(ic, 14)}</span>}
          <span className="prea-chat-dropdown__item-label">{it.label}</span>
        </button>
      </li>
    );
  }

  const cls = ['prea-chat-dropdown', isOpen && 'prea-chat-dropdown--open', className].filter(Boolean).join(' ');

  return (
    <div className={cls} style={style} ref={rootRef}>
      <button
        type="button"
        className="prea-chat-dropdown__trigger"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setOpen(!isOpen)}
      >
        {icon && <span className="prea-chat-dropdown__trigger-icon" aria-hidden>{renderIcon(icon, 16)}</span>}
        <span className="prea-chat-dropdown__label">{label}</span>
        <span className="prea-chat-dropdown__chevron" aria-hidden>
          <Icon name="li:chevron-down" size={16} />
        </span>
      </button>

      {isOpen && (
        <div
          className="prea-chat-dropdown__panel"
          role="menu"
          style={panelWidth !== undefined ? { width: panelWidth } : undefined}
        >
          {searchable && (
            <div className="prea-chat-dropdown__search">
              <div className="prea-chat-dropdown__search-inner">
                <span className="prea-chat-dropdown__search-icon" aria-hidden>
                  <Icon name="li:search" size={16} />
                </span>
                <input
                  ref={searchRef}
                  className="prea-chat-dropdown__search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                />
              </div>
            </div>
          )}

          {items.length > 0 && (
            filtered.length > 0 ? (
              <ul className="prea-chat-dropdown__list">
                {filtered.map((it) => renderRow(it, 'li:message-square'))}
              </ul>
            ) : (
              <div className="prea-chat-dropdown__empty">{emptyText}</div>
            )
          )}

          {actions.length > 0 && (
            <>
              {items.length > 0 && <div className="prea-chat-dropdown__divider" role="separator" />}
              <ul className="prea-chat-dropdown__list">
                {actions.map((it) => renderRow(it, undefined))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
