import React, { useState } from 'react';
import { Icon } from '../Icon';
import { IconButton } from '../Navigation';
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
      {renderIcon(icon, 12)}
    </button>
  );
}

/* ─── MapLayerItem ───────────────────────────────────────────────────────── */
export function MapLayerItem({
  label, level = 1, children, defaultOpen = false, open, onOpenChange,
  visible = true, onVisibleChange, onInfo, onPanel, onFilter, onColors, actions, hideActions, onClick, className,
}: MapLayerItemProps) {
  const hasChildren = React.Children.count(children) > 0;
  const [inner, setInner] = useState(defaultOpen);
  const isOpen = open ?? inner;
  const toggle = () => { setInner(!isOpen); onOpenChange?.(!isOpen); };
  const stop = (fn?: () => void) => (e: React.MouseEvent) => { e.stopPropagation(); fn?.(); };

  return (
    <div className={cx('prea-layer', `prea-layer--lvl${level}`, className)}>
      <div className="prea-layer__row" onClick={() => { if (hasChildren) toggle(); onClick?.(); }}>
        <span className={cx('prea-layer__chevron', hasChildren && isOpen && 'prea-layer__chevron--open', !hasChildren && 'prea-layer__chevron--spacer')}>
          <Icon name="chevron-right" size={10} />
        </span>
        <button type="button" className="prea-layer__label" aria-expanded={hasChildren ? isOpen : undefined}>{label}</button>
        {!hideActions && (
          <span className="prea-layer__actions">
            {actions}
            <LayerButton icon="info-1" label="Info" onClick={stop(onInfo)} />
            <LayerButton icon="panels-top-left" label="Im Panel öffnen" onClick={stop(onPanel)} />
            <LayerButton icon="funnel" label="Filter" onClick={stop(onFilter)} />
            <LayerButton icon="colors" label="Farben" onClick={stop(onColors)} />
            <LayerButton icon={visible ? 'eye' : 'eye-closed'} label={visible ? 'Ausblenden' : 'Einblenden'} onClick={stop(() => onVisibleChange?.(!visible))} />
          </span>
        )}
      </div>
      {hasChildren && isOpen && <div className="prea-layer__children" role="group">{children}</div>}
    </div>
  );
}

/* ─── MapLayersMenu ──────────────────────────────────────────────────────── */
export function MapLayersMenu({
  title = 'Ebenen', onClose, activeTitle = 'Aktive Ebenen', activeLayers, onRemoveActive, removeLabel = 'Entfernen',
  children, width = 314, className, style,
}: MapLayersMenuProps) {
  const hasActive = React.Children.count(activeLayers) > 0;
  return (
    <div className={cx('prea-layersmenu', className)} style={{ width, ...style }} role="dialog" aria-label={typeof title === 'string' ? title : undefined}>
      <div className="prea-layersmenu__head">
        <span className="prea-layersmenu__title">{title}</span>
        {onClose && (
          <IconButton icon="X-close" label="Schließen" onClick={onClose} />
        )}
      </div>
      <div className="prea-layersmenu__section">
        <div className="prea-layersmenu__subhead">
          <span>{activeTitle}</span>
          {hasActive && <button type="button" className="prea-layersmenu__remove" onClick={onRemoveActive}>{removeLabel}</button>}
        </div>
        {hasActive ? activeLayers : <div className="prea-layersmenu__empty">Keine aktiven Ebenen</div>}
      </div>
      {children && <div className="prea-layersmenu__section">{children}</div>}
    </div>
  );
}
