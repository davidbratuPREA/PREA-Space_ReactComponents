import React from 'react';
import { Icon } from '../Icon';
import type { GroupSearchButtonProps, SearchListHeaderProps, SearchListItemProps } from './Inputs.types';
import './Inputs.css';

function renderIcon(icon: string | React.ReactNode | undefined, size: number) {
  if (icon === undefined || icon === null || icon === false) return null;
  return typeof icon === 'string' ? <Icon name={icon} size={size} /> : icon;
}

/** Figma "Button_groupSearch" — 18px text button ("Alle anzeigen"), hover bg ItemHover. */
export function GroupSearchButton({ children, className, type = 'button', ...rest }: GroupSearchButtonProps) {
  return (
    <button type={type} className={['prea-group-search-btn', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </button>
  );
}

/**
 * SearchListItem
 *
 * Matches Figma "search_list_item" (State = Default | Hover):
 *   [icon 14] **Pot**sdam ………… [↗ Router berechnen]  ← action visible on hover
 * The part of `label` matching `query` is medium/dark, the rest regular/grey.
 */
export function SearchListItem({ label, query = '', icon = 'li:clock', action, onClick, className }: SearchListItemProps) {
  const q = query.trim();
  const idx = q ? label.toLowerCase().indexOf(q.toLowerCase()) : -1;
  const parts = idx >= 0
    ? [label.slice(0, idx), label.slice(idx, idx + q.length), label.slice(idx + q.length)]
    : ['', '', label];

  return (
    <div
      className={['prea-search-item', className].filter(Boolean).join(' ')}
      role="option"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } }}
    >
      <div className="prea-search-item__content">
        {icon && <span className="prea-search-item__icon" aria-hidden>{renderIcon(icon, 14)}</span>}
        <span className="prea-search-item__label">
          {parts[0] && <span className="prea-search-item__rest">{parts[0]}</span>}
          {parts[1] && <span className="prea-search-item__match">{parts[1]}</span>}
          <span className="prea-search-item__rest">{parts[2]}</span>
        </span>
      </div>
      {action && (
        <button
          type="button"
          className="prea-search-item__action"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}
          onClick={(e) => { e.stopPropagation(); action.onClick?.(); }}
        >
          {action.icon !== undefined && (
            <span className="prea-search-item__action-icon" aria-hidden>{renderIcon(action.icon ?? 'li:navigation', 12)}</span>
          )}
          {action.label}
        </button>
      )}
    </div>
  );
}

/** Figma "search_list_item" State=Header — group title + optional "Alle anzeigen". */
export function SearchListHeader({ title, onShowAll, showAllLabel = 'Alle anzeigen', className }: SearchListHeaderProps) {
  return (
    <div className={['prea-search-header', className].filter(Boolean).join(' ')}>
      <p className="prea-search-header__title">{title}</p>
      {onShowAll && <GroupSearchButton onClick={onShowAll}>{showAllLabel}</GroupSearchButton>}
    </div>
  );
}
