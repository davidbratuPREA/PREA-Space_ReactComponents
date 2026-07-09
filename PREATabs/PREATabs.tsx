import React, { useState } from 'react';
import { theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PREATab from './PREATab';
import type { PREATabsProps } from './PREATabs.types';
import './PREATabs.css';

/**
 * PREATabs — Browser-style editable card tabs for Ant Design v6.
 *
 * Designed to match the PREA design system (ANT X 2.0).
 * Uses `theme.useToken()` internally so all colours automatically react to
 * any ConfigProvider theme (light, dark, custom) without requiring
 * cssVar mode to be enabled.
 *
 * @example
 * ```tsx
 * import { PREATabs } from './PREATabs';
 *
 * const [items, setItems] = useState([
 *   { key: '1', label: 'Tab One', children: <p>Content 1</p> },
 *   { key: '2', label: 'Tab Two', children: <p>Content 2</p> },
 * ]);
 * const [activeKey, setActiveKey] = useState('1');
 *
 * const onEdit = (targetKey: string, action: 'add' | 'remove') => {
 *   if (action === 'add') {
 *     const newKey = String(Date.now());
 *     setItems((prev) => [...prev, { key: newKey, label: 'New Tab', children: null }]);
 *     setActiveKey(newKey);
 *   } else {
 *     setItems((prev) => prev.filter((item) => item.key !== targetKey));
 *     if (activeKey === targetKey) setActiveKey(items[0]?.key ?? '');
 *   }
 * };
 *
 * return (
 *   <PREATabs
 *     items={items}
 *     activeKey={activeKey}
 *     onChange={setActiveKey}
 *     onEdit={onEdit}
 *   />
 * );
 * ```
 */
const PREATabs: React.FC<PREATabsProps> = ({
  items,
  activeKey: controlledActiveKey,
  defaultActiveKey,
  onChange,
  onEdit,
  maxTabWidth = 250,
  className,
  style,
}) => {
  const { token } = theme.useToken();

  // Inject live antd design tokens as component-scoped CSS variables.
  // This works with any ConfigProvider setup (light, dark, custom tokens)
  // without requiring cssVar mode to be enabled.
  const cssVars = {
    '--prea-color-fill-quaternary': token.colorFillQuaternary,      // tab bar bg
    '--prea-color-fill-tertiary':   token.colorFillTertiary,        // outer container bg
    '--prea-color-fill-secondary':  token.colorFillSecondary,       // tab hover bg
    '--prea-color-fill':            token.colorFill,                // button hover bg (one step lighter)
    '--prea-color-bg-container':    token.colorBgContainer,         // active tab bg
    '--prea-color-border':          token.colorBorder,              // active tab border + dividers
    '--prea-color-text':            token.colorText,                // label text
    '--prea-color-text-secondary':  token.colorTextSecondary,       // close btn + add btn icon
    '--prea-color-text-disabled':   token.colorTextDisabled,        // disabled label
    '--prea-color-primary':         token.colorPrimary,             // focus ring
    '--prea-line-width':            `${token.lineWidth}px`,
    '--prea-border-radius-sm':      `${token.borderRadiusSM}px`,
    '--prea-font-size':             `${token.fontSizeSM}px`,        // 12px per Figma
    '--prea-line-height':           `${token.lineHeightSM}`,        // 18px per Figma
    '--prea-motion-fast':           token.motionDurationFast,
    '--prea-padding-xxs':           `${token.paddingXXS}px`,        // 4px  — tab vertical pad
    '--prea-padding-sm':            `${token.paddingSM}px`,         // 12px — tab left pad
    '--prea-padding-xs':            `${token.paddingXS}px`,         // 8px  — tab right pad
  } as React.CSSProperties;

  // Support both controlled (activeKey + onChange) and uncontrolled modes.
  const isControlled = controlledActiveKey !== undefined;
  const [internalActiveKey, setInternalActiveKey] = useState<string>(
    defaultActiveKey ?? items[0]?.key ?? ''
  );

  const activeKey = isControlled ? controlledActiveKey : internalActiveKey;

  const handleTabClick = (key: string) => {
    if (!isControlled) setInternalActiveKey(key);
    onChange?.(key);
  };

  const handleClose = (key: string) => onEdit?.(key, 'remove');
  const handleAdd = () => onEdit?.('', 'add');

  return (
    <div
      className={['prea-tabs', className].filter(Boolean).join(' ')}
      style={{ ...cssVars, ...style }}
    >
      {/* ── Tab bar ─────────────────────────────────────────── */}
      <div className="prea-tabs__bar" role="tablist" aria-label="PREA Tabs">
        {items.map((item, index) => {
          const isActive = item.key === activeKey;

          return (
            <React.Fragment key={item.key}>
              {/* Always render dividers — visibility controlled by CSS opacity */}
              {index > 0 && (
                <div className="prea-tabs__divider" aria-hidden="true" />
              )}
              <PREATab
                item={item}
                isActive={isActive}
                maxTabWidth={maxTabWidth}
                onClick={() => handleTabClick(item.key)}
                onClose={() => handleClose(item.key)}
              />
            </React.Fragment>
          );
        })}

        {/* + Add button */}
        {onEdit && (
          <>
            <div className="prea-tabs__divider" aria-hidden="true" />
            <button
              className="prea-tabs__add-btn"
              onClick={handleAdd}
              aria-label="Add tab"
              type="button"
            >
              <PlusOutlined style={{ fontSize: 13 }} />
            </button>
          </>
        )}
      </div>

      {/* ── Tab panels ──────────────────────────────────────── */}
      <div className="prea-tabs__content">
        {items.map((item) => (
          <div
            key={item.key}
            className={[
              'prea-tabs__panel',
              item.key === activeKey ? 'prea-tabs__panel--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            role="tabpanel"
            aria-hidden={item.key !== activeKey}
            id={`prea-tabs-panel-${item.key}`}
          >
            {item.children}
          </div>
        ))}
      </div>
    </div>
  );
};

export { PREATabs };
export type { PREATabsProps } from './PREATabs.types';
export type { PREATabItem } from './PREATabs.types';
