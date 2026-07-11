import React, { useState } from 'react';
import { theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Tab from './Tab';
import type { TabsMainProps } from './TabsMain.types';
import './TabsMain.css';

/**
 * TabsMain — Browser-style editable card tabs for Ant Design v6.
 *
 * Main tab system, used on top of the page to navigate through pages.
 * Uses `theme.useToken()` internally so all colours automatically react to
 * any ConfigProvider theme (light, dark, custom) without requiring
 * cssVar mode to be enabled.
 *
 * @example
 * ```tsx
 * import { TabsMain } from './TabsMain';
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
 *   <TabsMain
 *     items={items}
 *     activeKey={activeKey}
 *     onChange={setActiveKey}
 *     onEdit={onEdit}
 *   />
 * );
 * ```
 */
const TabsMain: React.FC<TabsMainProps> = ({
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
  const cssVars = {
    '--prea-color-fill-quaternary': token.colorFillQuaternary,
    '--prea-color-fill-tertiary':   token.colorFillTertiary,
    '--prea-color-fill-secondary':  token.colorFillSecondary,
    '--prea-color-fill':            token.colorFill,
    '--prea-color-bg-container':    token.colorBgContainer,
    '--prea-color-border':          token.colorBorder,
    '--prea-color-text':            token.colorText,
    '--prea-color-text-secondary':  token.colorTextSecondary,
    '--prea-color-text-disabled':   token.colorTextDisabled,
    '--prea-color-primary':         token.colorPrimary,
    '--prea-line-width':            `${token.lineWidth}px`,
    '--prea-border-radius-sm':      `${token.borderRadiusSM}px`,
    '--prea-font-size':             `${token.fontSizeSM}px`,
    '--prea-line-height':           `${token.lineHeightSM}`,
    '--prea-motion-fast':           token.motionDurationFast,
    '--prea-padding-xxs':           `${token.paddingXXS}px`,
    '--prea-padding-sm':            `${token.paddingSM}px`,
    '--prea-padding-xs':            `${token.paddingXS}px`,
  } as React.CSSProperties;

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
      <div className="prea-tabs__bar" role="tablist" aria-label="TabsMain">
        {items.map((item, index) => {
          const isActive = item.key === activeKey;

          return (
            <React.Fragment key={item.key}>
              {index > 0 && (
                <div className="prea-tabs__divider" aria-hidden="true" />
              )}
              <Tab
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
            id={`tabs-main-panel-${item.key}`}
          >
            {item.children}
          </div>
        ))}
      </div>
    </div>
  );
};

export { TabsMain };
export type { TabsMainProps } from './TabsMain.types';
export type { TabsMainItem } from './TabsMain.types';
