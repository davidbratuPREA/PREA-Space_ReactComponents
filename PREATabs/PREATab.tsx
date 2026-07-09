import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import type { PREATabItem } from './PREATabs.types';

interface PREATabProps {
  item: PREATabItem;
  isActive: boolean;
  maxTabWidth: number;
  onClick: () => void;
  onClose: () => void;
}

/**
 * Internal single tab item — not exported from the package.
 * Rendered by PREATabs for each entry in `items`.
 */
const PREATab: React.FC<PREATabProps> = ({
  item,
  isActive,
  maxTabWidth,
  onClick,
  onClose,
}) => {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.disabled) onClose();
  };

  const classNames = [
    'prea-tabs__tab',
    isActive ? 'prea-tabs__tab--active' : '',
    item.disabled ? 'prea-tabs__tab--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      style={{ maxWidth: maxTabWidth }}
      onClick={!item.disabled ? onClick : undefined}
      role="tab"
      aria-selected={isActive}
      aria-disabled={item.disabled}
      tabIndex={item.disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!item.disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <span className="prea-tabs__tab-label" title={typeof item.label === 'string' ? item.label : undefined}>
        {item.label}
      </span>

      {item.closable !== false && (
        <button
          className="prea-tabs__close-btn"
          onClick={handleClose}
          aria-label={`Close tab${typeof item.label === 'string' ? ` "${item.label}"` : ''}`}
          tabIndex={item.disabled ? -1 : 0}
          type="button"
        >
          <CloseOutlined style={{ fontSize: 10 }} />
        </button>
      )}
    </div>
  );
};

export default PREATab;
