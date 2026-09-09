import React, { createContext, useContext, useState } from 'react';
import { Icon } from '../Icon';
import type {
  MapNavProps, MapNavGroupProps, CompassProps, LayerButtonProps, MapLayerItemProps, MapLayersMenuProps, MapNavGlobeProps,
} from './MapNav.types';
import './MapNav.css';

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');
const renderIcon = (icon: string | React.ReactNode, size: number) => (typeof icon === 'string' ? <Icon name={icon} size={size} /> : icon);

/* ─── Compass (Figma "compass", 55px) ────────────────────────────────────── */
export function Compass({ heading = 0, onClick, size = 55, className }: CompassProps) {
  return (
    <button
      type="button"
      className={cx('prea-compass', className)}
      style={{ width: size, height: size }}
      onClick={onClick}
      aria-label={`Kompass, Ausrichtung ${Math.round(heading)}°`}
      title="Nach Norden ausrichten"
    >
      <svg className="prea-compass__svg" viewBox="0 0 55 55" aria-hidden="true">
        <defs>
          <filter id="prea-compass-inner" x="0" y="0" width="55" height="55" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="bg" />
            <feBlend in="SourceGraphic" in2="bg" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="2.58" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.37 0" />
            <feBlend in2="shape" result="inner" />
          </filter>
        </defs>
        {/* face: BG fill + inner shadow + border */}
        <g filter="url(#prea-compass-inner)"><circle className="prea-compass__face" cx="27.5" cy="27.5" r="27.5" /></g>
        <circle className="prea-compass__ring" cx="27.5" cy="27.5" r="27" fill="none" />
        {/* rotating dial */}
        <g className="prea-compass__dial" style={{ transform: `rotate(${-heading}deg)`, transformOrigin: '27.5px 27.5px' }}>
          <circle className="prea-compass__dashes" cx="27.5" cy="27.5" r="19.98" fill="none" strokeWidth="3" strokeDasharray="1 7.17" />
          <path className="prea-compass__ticks" d="M27.5039 45.9883V48.9883C27.3309 48.9883 27.1584 48.9855 26.9863 48.9815L27.0566 45.9834C27.2051 45.9869 27.3545 45.9883 27.5039 45.9883ZM28.0205 48.9815C27.8488 48.9855 27.6766 48.9883 27.5039 48.9883V45.9883C27.6534 45.9883 27.8027 45.9869 27.9512 45.9834L28.0205 48.9815ZM6.01953 27.5039C6.01953 27.3309 6.02132 27.1584 6.02539 26.9863L7.52539 27.0215L9.02442 27.0566C9.0209 27.2051 9.01953 27.3545 9.01953 27.5039C9.01953 27.6534 9.0209 27.8027 9.02442 27.9512L7.52441 27.9854L7.52539 27.9863L6.02539 28.0205C6.02134 27.8488 6.01953 27.6766 6.01953 27.5039ZM48.9815 28.0205L47.4824 27.9863L45.9834 27.9512C45.9869 27.8027 45.9883 27.6534 45.9883 27.5039C45.9883 27.3545 45.9869 27.2051 45.9834 27.0566L48.9815 26.9863C48.9855 27.1584 48.9883 27.3309 48.9883 27.5039C48.9883 27.6766 48.9855 27.8488 48.9815 28.0205ZM28.0205 6.02539L27.9512 9.02442C27.8027 9.0209 27.6534 9.01953 27.5039 9.01953C27.3545 9.01953 27.2051 9.0209 27.0566 9.02442L26.9863 6.02539C27.1584 6.02132 27.3309 6.01953 27.5039 6.01953C27.6766 6.01953 27.8488 6.02134 28.0205 6.02539Z" />
          <path className="prea-compass__n" d="M33.6084 19.8281V35.0194H31.4233L23.6404 23.5323V35.0194H21.1848V19.8281H23.7236L31.1528 30.7326V19.8281H33.6084Z" />
          <path className="prea-compass__north" d="M27.7734 3.77295L31.2375 9.77295H24.3093L27.7734 3.77295Z" />
        </g>
      </svg>
    </button>
  );
}

/* ─── MapNavGlobe — 36px ring toggle (Figma top element of mapNav) ───────── */
export function MapNavGlobe({ active = false, label = '3D-Ansicht', className, type = 'button', ...rest }: MapNavGlobeProps) {
  return (
    <button type={type} className={cx('prea-mapnav-globe', active && 'prea-mapnav-globe--active', className)} aria-label={label} title={label} aria-pressed={active} {...rest}>
      <svg viewBox="0 0 36 36" aria-hidden="true">
        <path className="prea-mapnav-globe__ring" d="M18 12.709C22.626 12.709 26.779 13.3837 29.7461 14.4492C31.233 14.9832 32.3791 15.6001 33.1377 16.2441C33.8996 16.891 34.1865 17.4879 34.1865 18C34.1865 18.5121 33.8996 19.1089 33.1377 19.7559C32.3791 20.3999 31.233 21.0168 29.7461 21.5508C26.779 22.6163 22.626 23.291 18 23.291C13.374 23.291 9.22103 22.6163 6.25391 21.5508C4.76702 21.0168 3.6209 20.3999 2.8623 19.7559C2.10043 19.1089 1.81348 18.5121 1.81348 18C1.81354 17.4879 2.10039 16.891 2.8623 16.2441C3.62092 15.6001 4.76698 14.9832 6.25391 14.4492C9.22103 13.3837 13.374 12.709 18 12.709Z" strokeWidth="1.63" />
      </svg>
    </button>
  );
}

/* ─── MapNavGroup ────────────────────────────────────────────────────────── */
export function MapNavGroup({ children, className }: MapNavGroupProps) {
  return <div className={cx('prea-mapnav-group', className)} role="group">{children}</div>;
}

/* ─── MapNav ─────────────────────────────────────────────────────────────── */
export function MapNav({ children, heading = 0, onResetHeading, showCompass = true, globeActive, onGlobeToggle, showGlobe = true, className, style }: MapNavProps) {
  return (
    <div className={cx('prea-mapnav', className)} style={style} role="toolbar" aria-label="Kartennavigation">
      {showGlobe && <MapNavGlobe active={globeActive} onClick={onGlobeToggle} />}
      {children}
      {showCompass && <Compass heading={heading} onClick={onResetHeading} />}
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
