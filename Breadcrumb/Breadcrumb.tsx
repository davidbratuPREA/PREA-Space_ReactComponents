import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { BreadcrumbItemDef, BreadcrumbProps } from './Breadcrumb.types';
import './Breadcrumb.css';

// ─── BreadcrumbItem ────────────────────────────────────────────────────────

/**
 * BreadcrumbItem
 *
 * Matches Figma "Breadcrumb Item" — a self-contained nav unit:
 *
 *   [text-part]  [icon-part]
 *
 * Key design rules:
 * • The ">" (chevron-right) lives INSIDE the item — NOT between items.
 * • Default: no bg, chevron-right icon (even if item has a dropdown).
 * • Hover:   text-part → hoverbig (#e7e7e7)  |  icon-part → hoversmall (#d5d5d5)  |  chevron flips to chevron-down.
 * • Active:  text-part → activebig (#d5d5d5) |  icon-part → activesmall (#c1c1c1) |  dropdown opens.
 */
export function BreadcrumbItem({
  label,
  href,
  dropdownItems,
  onDropdownSelect,
  onClick,
  itemKey,
}: BreadcrumbItemDef & { itemKey: string }) {
  const [isOpen, setIsOpen]     = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasDropdown = Boolean(dropdownItems && dropdownItems.length > 0);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
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
    setIsHovered(false);
    if (onDropdownSelect) onDropdownSelect(optionKey);
  }

  const outerCls = [
    'prea-breadcrumb-item',
    isOpen && 'prea-breadcrumb-item--active',
  ]
    .filter(Boolean)
    .join(' ');

  // Chevron:
  // • Default → chevron-right  (even when item has dropdown)
  // • Hover   → chevron-down   (only if has dropdown)
  // • Active  → chevron-down
  const showChevronDown = hasDropdown && (isHovered || isOpen);
  const chevronIcon = showChevronDown
    ? <ChevronDown size={14} strokeWidth={1.5} />
    : <ChevronRight size={14} strokeWidth={1.5} />;

  // Label — link or plain span
  const textNode = href ? (
    <a href={href} className="prea-breadcrumb-item__text" onClick={(e) => e.preventDefault()}>
      {label}
    </a>
  ) : (
    <span className="prea-breadcrumb-item__text">{label}</span>
  );

  return (
    <div className={outerCls} ref={containerRef}>
      {/* Pill = text-part + icon-part */}
      <div
        className="prea-breadcrumb-item__pill"
        onClick={handlePillClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role={hasDropdown ? 'button' : undefined}
        tabIndex={hasDropdown ? 0 : undefined}
        aria-haspopup={hasDropdown ? 'listbox' : undefined}
        aria-expanded={hasDropdown ? isOpen : undefined}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handlePillClick();
          if (e.key === 'Escape') setIsOpen(false);
        }}
      >
        {textNode}
        <span className="prea-breadcrumb-item__icon" aria-hidden>
          {chevronIcon}
        </span>
      </div>

      {/* Dropdown panel */}
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
 * A horizontal row of BreadcrumbItems.
 * Each item carries its own chevron (not a standalone separator).
 * Any item can be a dropdown trigger.
 */
export function Breadcrumb({ items, className, style }: BreadcrumbProps) {
  const cls = ['prea-breadcrumb', className].filter(Boolean).join(' ');
  return (
    <nav className={cls} aria-label="Breadcrumb" style={style}>
      <ol style={{ display: 'flex', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item) => (
          <li key={item.key}>
            <BreadcrumbItem {...item} itemKey={item.key} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
