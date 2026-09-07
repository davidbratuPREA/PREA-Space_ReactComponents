import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';
import type { SearchInputProps } from './Inputs.types';
import { SearchListHeader, SearchListItem } from './SearchListItem';
import './Inputs.css';

/**
 * SearchInput
 *
 * Matches Figma "inp_Search" (Size = Default | Big, Active):
 *
 *   ┌ [🔍] Suche…                        ┐  ← default 24px; active border #202020
 *   ┌ [🔍] Weise eine Aufgabe zu …       ┐  ← big 34px
 *   │──────────────────────────────────── │  ← results while focused (big)
 *   │ recent items                        │
 *   │ ───────────── divider ───────────── │
 *   │ Adresse            Alle anzeigen    │  ← group header
 *   │ ◎ Potsdamer Str, 39114 Magdeburg    │  ← query prefix highlighted
 *   └─────────────────────────────────────┘
 */
export function SearchInput({
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Suche...',
  size = 'default',
  results,
  onSelect,
  onSubmit,
  disabled = false,
  autoFocus,
  width = 328,
  className,
  style,
}: SearchInputProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const text = isControlled ? (value as string) : internal;
  const [focused, setFocused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!focused) return;
    const onDown = (e: MouseEvent) => { if (rootRef.current && !rootRef.current.contains(e.target as Node)) setFocused(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setFocused(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [focused]);

  const hasResults = !!results && results.some((g) => g.items.length > 0);
  const open = focused && hasResults;

  const cls = ['prea-search-input', `prea-search-input--${size}`, open && 'prea-search-input--open', className]
    .filter(Boolean).join(' ');

  return (
    <div className={cls} style={{ width, ...style }} ref={rootRef}>
      <div className="prea-search-input__box">
        <span className="prea-search-input__icon" aria-hidden><Icon name="li:search" size={16} /></span>
        <input
          className="prea-input-native"
          type="text"
          role="searchbox"
          value={text}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          onFocus={() => setFocused(true)}
          onChange={(e) => { if (!isControlled) setInternal(e.target.value); onChange?.(e.target.value); }}
          onKeyDown={(e) => { if (e.key === 'Enter') onSubmit?.(text); }}
          aria-expanded={open}
        />
      </div>

      {open && (
        <div className="prea-search-input__results" role="listbox">
          {results!.filter((g) => g.items.length > 0).map((g, i) => (
            <React.Fragment key={g.key}>
              {i > 0 && <div className="prea-search-input__divider" role="separator" />}
              <div className="prea-search-input__group">
                {g.title !== undefined && <SearchListHeader title={g.title} onShowAll={g.onShowAll} />}
                <div className="prea-search-input__list">
                  {g.items.map((it) => (
                    <SearchListItem
                      key={it.key}
                      label={it.label}
                      query={text}
                      icon={it.icon ?? (g.title === undefined ? 'li:clock' : 'li:marker-pin')}
                      action={it.action}
                      onClick={() => { onSelect?.(it, g); setFocused(false); }}
                    />
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
