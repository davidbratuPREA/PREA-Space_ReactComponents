import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { BreadcrumbItemDef, BreadcrumbProps } from './Breadcrumb.types';
import './Breadcrumb.css';

// ─── BreadcrumbItem ────────────────────────────────────────────────────────

/**
 * BreadcrumbItem
 *
 * Matches Figma "Breadcrumb Item" — a self-contained unit:
 *   [text-part] [icon-part]
 *
 * The ">" (chevron-right) lives INSIDE the item, not between items.
 *
 * States (all items can reach any state):
 *   • Default  — plain text + chevron-right, no background
 *   • Hover    — pill background, chevron flips to chevron-down (if dropdownItems provided)
 *   • Active   — dropdown is open
 */
export function BreadcrumbItem({
  label,
  href,
  dropdownItems,
  onDropdownSelect,
  onClick,
  itemKey,
}: BreadcrumbItemDef & { itemKey: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasDropdown = Boolean(dropdownItems && dropdownItems.length > 0);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  function handlePillClick() {
    if (hasDropdown) {
      setIsOpen((prev) => !prev);
    } else if (onClick) {
      onClick(itemKey);
    }
  }

  function handleOptionClick(optionKey: string) {
    setIsOpen(false);
    if (onDropdownSelect) onDropdownSelect(optionKey);
  }

  const pillCls = [
    'prea-breadcrumb-item',
    isOpen && 'prea-breadcrumb-item--active',
  ]
    .filter(Boolean)
    .join(' ');

  // Label — link or span
  const textContent = href ? (
    <a href={href} className="prea-breadcrumb-item__text" onClick={(e) => e.preventDefault()}>
      {label}
    </a>
  ) : (
    <span className="prea-breadcrumb-item__text">{label}</span>
  );

  // Chevron — down when open/hoverable, right otherwise
  const chevronIcon =
    hasDropdown && isOpen ? (
      <ChevronDown size={14} strokeWidth={1.5} />
    ) : hasDropdown ? (
      /* on hover CSS switches to bg; chevron stays right until opened */
      <ChevronDown size={14} strokeWidth={1.5} />
    ) : (
      <ChevronRight size={14} strokeWidth={1.5} />
    );

  return (
    <div className={pillCls} ref={containerRef}>
      {/* Pill = text + chevron */}
      <div
        className="prea-breadcrumb-item__pill"
        onClick={handlePillClick}
        role={hasDropdown ? 'button' : undefined}
        tabIndex={hasDropdown ? 0 : undefined}
        aria-haspopup={hasDropdown ? 'listbox' : undefined}
        aria-expanded={hasDropdown ? isOpen : undefined}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handlePillClick();
          if (e.key === 'Escape') setIsOpen(false);
        }}
      >
        {textContent}
        <span className="prea-breadcrumb-item__icon" aria-hidden>
          {chevronIcon}
        </span>
      </div>

      {/* Dropdown panel — only rendered when open */}
      {isOpen && hasDropdown && (
        <div className="prea-breadcrumb-item__dropdown" role="listbox">
          {dropdownItems!.map((opt) => (
            <div
              key={opt.key}
              className={[
                'prea-breadcrumb-item__dropdown-option',
                opt.active && 'prea-breadcrumb-item__dropdown-option--active',
              ]
                .filter(Boolean)
                .join(' ')}
              role="option"
              aria-selected={opt.active}
              onClick={() => handleOptionClick(opt.key)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Breadcrumb ────────────────────────────────────────────────────────────

/**
 * Breadcrumb
 *
 * Matches Figma "Breadcrumb" — a horizontal row of BreadcrumbItems.
 * Each item carries its own chevron (">" is NOT a separate separator).
 * Any item can be a dropdown trigger (not only the last).
 */
export function Breadcrumb({ items, className, style }: BreadcrumbProps) {
  const cls = ['prea-breadcrumb', className].filter(Boolean).join(' ');
  return (
    <nav className={cls} aria-label="Breadcrumb" style={style}>
      <ol style={{ display: 'flex', alignItems: 'center', gap: 0, listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item) => (
          <li key={item.key}>
            <BreadcrumbItem {...item} itemKey={item.key} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
