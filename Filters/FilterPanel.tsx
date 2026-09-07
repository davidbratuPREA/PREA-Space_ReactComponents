import React, { useState } from 'react';
import { Icon } from '../Icon';
import { TextInput } from '../Inputs';
import type { FilterPanelProps, FilterRangeProps, FilterSectionProps, FilterTabsProps } from './Filters.types';
import './Filters.css';

/** Figma "TabsSecondary" — underline tabs used in the filter header. */
export function FilterTabs({ tabs, activeKey, defaultActiveKey, onChange, className }: FilterTabsProps) {
  const isControlled = activeKey !== undefined;
  const [internal, setInternal] = useState(defaultActiveKey ?? tabs[0]?.key);
  const active = isControlled ? activeKey : internal;
  return (
    <div className={['prea-filter-tabs', className].filter(Boolean).join(' ')} role="tablist">
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          role="tab"
          aria-selected={t.key === active}
          className={['prea-filter-tabs__tab', t.key === active && 'prea-filter-tabs__tab--active'].filter(Boolean).join(' ')}
          onClick={() => { if (!isControlled) setInternal(t.key); onChange?.(t.key); }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/** A block of rows inside the panel; consecutive sections are divided by a line. */
export function FilterSection({ children, gap = 6, className }: FilterSectionProps) {
  return (
    <div className={['prea-filter-section', className].filter(Boolean).join(' ')} style={{ ['--filter-section-gap' as string]: `${gap}px` }}>
      {children}
    </div>
  );
}

/** Figma layer_filter step 3 — "Input bis Input" range row with a description. */
export function FilterRange({ label, from = '', to = '', onChange, fromPlaceholder = 'Input name', toPlaceholder = 'Input name', separator = 'bis', className }: FilterRangeProps) {
  return (
    <div className={['prea-filter-range', className].filter(Boolean).join(' ')}>
      {label && <p className="prea-filter-range__label">{label}</p>}
      <div className="prea-filter-range__row">
        <TextInput width="100%" value={from} placeholder={fromPlaceholder} onChange={(v) => onChange?.({ from: v, to })} />
        <span className="prea-filter-range__sep">{separator}</span>
        <TextInput width="100%" value={to} placeholder={toPlaceholder} onChange={(v) => onChange?.({ from, to: v })} />
      </div>
    </div>
  );
}

/**
 * FilterPanel
 *
 * Matches Figma "layer_filter" (Step 1 | 2 | 3): a 300px floating panel with
 *   header  — secondary tabs + close (white, bottom border)
 *   body    — <FilterSection>s separated by dividers (inputs, groups of
 *             FilterItems, FilterRanges …), scrolls when taller than `height`
 *   footer  — "Aktualisieren" primary button + reset (rotate-ccw) button
 */
export function FilterPanel({
  tabs,
  activeTab,
  onTabChange,
  onClose,
  children,
  onApply,
  applyLabel = 'Aktualisieren',
  onReset,
  resetLabel = 'Zurücksetzen',
  width,
  height,
  className,
  style,
}: FilterPanelProps) {
  const cls = ['prea-filter-panel', className].filter(Boolean).join(' ');
  const hasHeader = (tabs && tabs.length > 0) || onClose;
  const hasFooter = onApply || onReset;
  return (
    <div className={cls} style={{ width, height, ...style }}>
      {hasHeader && (
        <div className="prea-filter-panel__header">
          {tabs && tabs.length > 0 ? <FilterTabs tabs={tabs} activeKey={activeTab} onChange={onTabChange} /> : <span />}
          {onClose && (
            <button type="button" className="prea-filter-panel__close" aria-label="Schließen" onClick={onClose}>
              <Icon name="li:X-close" size={14} />
            </button>
          )}
        </div>
      )}
      <div className="prea-filter-panel__body">{children}</div>
      {hasFooter && (
        <div className="prea-filter-panel__footer">
          {onApply && <button type="button" className="prea-filter-panel__btn prea-filter-panel__btn--primary" onClick={onApply}>{applyLabel}</button>}
          {onReset && (
            <button type="button" className="prea-filter-panel__btn prea-filter-panel__btn--secondary" aria-label={resetLabel} title={resetLabel} onClick={onReset}>
              <Icon name="li:rotate-ccw2" size={18} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
