import React, { createContext, useContext, useRef, useState } from 'react';
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

/* ─── MapNavGlobe — perspective control (Figma ring + codepen "Sphere Controller") ── */
const SLICES = 8;
export function MapNavGlobe({
  value, defaultValue = 72, onChange, min = 0, max = 80, sensitivity = 0.3, onReset, label = 'Perspektive', size = 36, className, style,
}: MapNavGlobeProps) {
  const [inner, setInner] = useState(defaultValue);
  const angle = Math.min(max, Math.max(min, value ?? inner));
  const set = (v: number) => { const c = Math.min(max, Math.max(min, v)); setInner(c); onChange?.(c); };
  const drag = useRef<{ y: number; start: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    drag.current = { y: e.clientY, start: angle };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    set(drag.current.start - (e.clientY - drag.current.y) * sensitivity);   // drag down → smaller angle (disc opens up), drag up → edge-on
  };
  const endDrag = () => { drag.current = null; setDragging(false); };
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); set(angle - 5); }
    if (e.key === 'ArrowDown') { e.preventDefault(); set(angle + 5); }
    if (e.key === 'Home') { e.preventDefault(); set(min); }
    if (e.key === 'End') { e.preventDefault(); set(max); }
  };

  const disc = size * 0.78;
  const thickness = Math.max(2, size * 0.09);
  return (
    <div
      className={cx('prea-mapnav-globe', dragging && 'prea-mapnav-globe--dragging', className)}
      style={{ width: size, height: size, ...style }}
      role="slider" tabIndex={0} aria-label={label} aria-valuemin={min} aria-valuemax={max} aria-valuenow={Math.round(angle)} aria-orientation="vertical"
      title={`${label} · ${Math.round(angle)}°`}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag}
      onDoubleClick={() => { set(max); onReset?.(); }} onKeyDown={onKeyDown}
    >
      <div className="prea-mapnav-globe__sphere">
        <div className="prea-mapnav-globe__disc" style={{ width: disc, height: disc, transform: `rotateX(${angle}deg)` }}>
          {Array.from({ length: SLICES }, (_, i) => (
            <span key={i} className="prea-mapnav-globe__slice" style={{ transform: `translateZ(${-(i + 1) * (thickness / SLICES)}px)` }} />
          ))}
          <span className="prea-mapnav-globe__face" />
        </div>
      </div>
    </div>
  );
}

/* ─── MapNavGroup ────────────────────────────────────────────────────────── */
export function MapNavGroup({ children, className }: MapNavGroupProps) {
  return <div className={cx('prea-mapnav-group', className)} role="group">{children}</div>;
}

/* ─── MapNav ─────────────────────────────────────────────────────────────── */
export function MapNav({ children, heading = 0, onResetHeading, showCompass = true, tilt, defaultTilt, onTiltChange, showGlobe = true, className, style }: MapNavProps) {
  return (
    <div className={cx('prea-mapnav', className)} style={style} role="toolbar" aria-label="Kartennavigation">
      {showGlobe && <MapNavGlobe value={tilt} defaultValue={defaultTilt} onChange={onTiltChange} />}
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
