import React, { createContext, useContext, useState } from 'react';
import { Icon } from '../Icon';
import type {
  MapNavProps, MapNavGroupProps, CompassProps, LayerButtonProps, MapLayerItemProps, MapLayersMenuProps,
} from './MapNav.types';
import './MapNav.css';

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');
const renderIcon = (icon: string | React.ReactNode, size: number) => (typeof icon === 'string' ? <Icon name={icon} size={size} /> : icon);

/* ─── Compass ────────────────────────────────────────────────────────────── */
export function Compass({ heading = 0, onClick, size = 55, className }: CompassProps) {
  return (
    <button type="button" className={cx('prea-compass', className)} style={{ width: size, height: size }} onClick={onClick} aria-label={`Kompass, Ausrichtung ${Math.round(heading)}°`} title="Nach Norden ausrichten">
      <svg className="prea-compass__needle" viewBox="0 0 32 32" style={{ transform: `rotate(${-heading}deg)` }} aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="1" opacity=".35" />
        <path className="prea-compass__n" d="M16 3 L20 16 H12 Z" />
        <path className="prea-compass__s" d="M16 29 L12 16 H20 Z" />
        <circle cx="16" cy="16" r="1.5" fill="currentColor" />
      </svg>
    </button>
  );
}

/* ─── MapNavGroup ────────────────────────────────────────────────────────── */
export function MapNavGroup({ children, className }: MapNavGroupProps) {
  return <div className={cx('prea-mapnav-group', className)} role="group">{children}</div>;
}

/* ─── MapNav ─────────────────────────────────────────────────────────────── */
export function MapNav({ children, heading = 0, onResetHeading, showCompass = true, className, style }: MapNavProps) {
  return (
    <div className={cx('prea-mapnav', className)} style={style} role="toolbar" aria-label="Kartennavigation">
      {showCompass && <Compass heading={heading} onClick={onResetHeading} />}
      {children}
    </div>
  );
}

/* ─── LayerButton ────────────────────────────────────────────────────────── */
export function LayerButton({ icon, label, active, className, type = 'button', ...rest }: LayerButtonProps) {
  return (
    <button type={type} className={cx('prea-layerbtn', active && 'prea-layerbtn--active', className)} aria-label={label} title={label} aria-pressed={active} {...rest}>
      {renderIcon(icon, 14)}
    </button>
  );
}

/* ─── MapLayerItem ───────────────────────────────────────────────────────── */
const LevelContext = createContext<0 | 1 | 2 | 3>(0);
const KIND_ICON: Record<NonNullable<MapLayerItemProps['kind']>, string> = {
  group: 'li:folder', subgroup: 'li:layers-three', layer: 'li:layer-single', active: 'li:eye',
};

export function MapLayerItem({
  label, kind, icon, level: levelProp, children, defaultOpen = false, open, onOpenChange,
  visible = true, onVisibleChange, onInfo, onPanel, onFilter, onColors, actions, hideActions, trailing, onClick, className,
}: MapLayerItemProps) {
  const parentLevel = useContext(LevelContext);
  const level = (levelProp ?? Math.min(parentLevel + 1, 3)) as 1 | 2 | 3;
  const hasChildren = React.Children.count(children) > 0;
  const rowKind = kind ?? (hasChildren ? 'group' : 'layer');
  const [inner, setInner] = useState(defaultOpen);
  const isOpen = open ?? inner;
  const toggle = () => { setInner(!isOpen); onOpenChange?.(!isOpen); };
  const stop = (fn?: () => void) => (e: React.MouseEvent) => { e.stopPropagation(); fn?.(); };
  const showActions = !hideActions && rowKind !== 'active';

  return (
    <div className={cx('prea-layer', `prea-layer--lvl${level}`, `prea-layer--${rowKind}`, className)}>
      <div className="prea-layer__row" onClick={() => { if (hasChildren) toggle(); onClick?.(); }}>
        {level !== 3 && (
          <span className="prea-layer__dropdown" aria-hidden="true">
            {hasChildren && <span className="prea-layer__chevron"><Icon name={isOpen ? 'li:chevron-down' : 'chevron-right'} size={10} /></span>}
          </span>
        )}
        <span className="prea-layer__text">
          <span className="prea-layer__icon">{renderIcon(icon ?? KIND_ICON[rowKind], 14)}</span>
          <button type="button" className="prea-layer__label" aria-expanded={hasChildren ? isOpen : undefined}>{label}</button>
        </span>
        {trailing && <span className="prea-layer__trailing" onClick={(e) => e.stopPropagation()}>{trailing}</span>}
        {showActions && (
          <span className="prea-layer__actions">
            {actions}
            <LayerButton icon="li:info-1" label="Info" onClick={stop(onInfo)} />
            <LayerButton icon="li:panels-top-left" label="Im Panel öffnen" onClick={stop(onPanel)} />
            <LayerButton icon="li:funnel" label="Filter" onClick={stop(onFilter)} />
            <LayerButton icon="li:colors" label="Farben" onClick={stop(onColors)} />
            <LayerButton icon={visible ? 'li:eye' : 'li:eye-closed'} label={visible ? 'Ausblenden' : 'Einblenden'} onClick={stop(() => onVisibleChange?.(!visible))} />
          </span>
        )}
      </div>
      {hasChildren && isOpen && (
        <LevelContext.Provider value={level}>
          <div className="prea-layer__children" role="group">{children}</div>
        </LevelContext.Provider>
      )}
    </div>
  );
}

/* ─── MapLayersMenu ──────────────────────────────────────────────────────── */
export function MapLayersMenu({
  title = 'Ebenen', onClose, activeTitle = 'Aktive Ebenen', activeLayers, activeOpen, onActiveOpenChange, onRemoveActive, removeLabel = 'Entfernen',
  children, width = 314, className, style,
}: MapLayersMenuProps) {
  const hasActive = React.Children.count(activeLayers) > 0;
  return (
    <div className={cx('prea-layersmenu', className)} style={{ width, ...style }} role="dialog" aria-label={typeof title === 'string' ? title : undefined}>
      <div className="prea-layersmenu__head">
        <div className="prea-layersmenu__title-row">
          <span className="prea-layersmenu__title">{title}</span>
          {onClose && <LayerButton icon="li:X-close" label="Schließen" onClick={onClose} />}
        </div>
        {hasActive && (
          <div className="prea-layersmenu__active">
            <MapLayerItem
              kind="active" level={1} label={activeTitle} defaultOpen open={activeOpen} onOpenChange={onActiveOpenChange}
              trailing={<button type="button" className="prea-layersmenu__remove" onClick={onRemoveActive}>{removeLabel}</button>}
            >
              {activeLayers}
            </MapLayerItem>
          </div>
        )}
      </div>
      {children && <div className="prea-layersmenu__layers">{children}</div>}
    </div>
  );
}
