import React, { useState } from 'react';
import { Icon } from '../Icon';
import type {
  MainNavItemProps, NavDropdownItemProps, NavSectionHeadProps, MainNavProps,
  BottomNavProps, BottomNavButtonProps, PathMenuProps, IconButtonProps,
  TabsProps, PanelTabsProps, ToggleDataMenuProps, SearchPanelProps,
} from './Navigation.types';
import './Navigation.css';

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

/** Renders a Figma icon name or a custom node. */
function renderIcon(icon: string | React.ReactNode | undefined, size: number) {
  if (!icon) return null;
  return typeof icon === 'string' ? <Icon name={icon} size={size} /> : icon;
}

/* ─── IconButton ─────────────────────────────────────────────────────────── */
export function IconButton({ icon, label, variant = 'plain', size = 22, active, className, type = 'button', ...rest }: IconButtonProps) {
  const iconSize = size === 32 ? 20 : size === 24 ? 18 : 14;
  return (
    <button
      type={type}
      className={cx('prea-iconbtn', size !== 22 && `prea-iconbtn--${size}`, variant === 'primary' && 'prea-iconbtn--primary', active && 'prea-iconbtn--active', className)}
      aria-label={label}
      title={label}
      aria-pressed={active}
      {...rest}
    >
      {renderIcon(icon, iconSize)}
    </button>
  );
}

/* ─── NavDropdownItem ────────────────────────────────────────────────────── */
export function NavDropdownItem({ label, active, onClick, href, className }: NavDropdownItemProps) {
  const cls = cx('prea-navdrop', active && 'prea-navdrop--active', className);
  if (href) return <a className={cls} href={href} aria-current={active ? 'page' : undefined} onClick={onClick}>{label}</a>;
  return <button type="button" className={cls} aria-current={active ? 'page' : undefined} onClick={onClick}>{label}</button>;
}

/* ─── MainNavItem ────────────────────────────────────────────────────────── */
export function MainNavItem({
  icon, label, expanded = true, active, children, open, onOpenChange, onClick, href, title, className,
}: MainNavItemProps) {
  const hasChildren = React.Children.count(children) > 0;
  const [innerOpen, setInnerOpen] = useState(!!active);
  const [hover, setHover] = useState(false);
  const isOpen = open ?? innerOpen;
  const setOpen = (v: boolean) => { setInnerOpen(v); onOpenChange?.(v); };

  const handleClick = () => {
    if (hasChildren && expanded) setOpen(!isOpen);
    onClick?.();
  };

  const labelText = title ?? (typeof label === 'string' ? label : undefined);
  const content = (
    <>
      <span className="prea-navitem__icon">{renderIcon(icon, expanded ? 16 : 20)}</span>
      {expanded && <span className="prea-navitem__label">{label}</span>}
      {expanded && hasChildren && (
        <span className="prea-navitem__chevron" style={{ transform: isOpen ? 'rotate(180deg)' : undefined }}>
          <Icon name="chevron-down" size={20} />
        </span>
      )}
    </>
  );

  const btnProps = {
    className: 'prea-navitem__btn',
    'aria-label': expanded ? undefined : labelText,
    title: expanded ? undefined : labelText,
    'aria-current': active ? ('page' as const) : undefined,
    'aria-expanded': hasChildren && expanded ? isOpen : undefined,
    onClick: handleClick,
  };

  return (
    <div
      className={cx('prea-navitem', expanded ? 'prea-navitem--expanded' : 'prea-navitem--collapsed', active && 'prea-navitem--active', className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {href ? <a href={href} {...btnProps}>{content}</a> : <button type="button" {...btnProps}>{content}</button>}
      {expanded && hasChildren && isOpen && <div className="prea-navitem__children" role="group">{children}</div>}
      {!expanded && hasChildren && hover && <div className="prea-navitem__flyout" role="menu">{children}</div>}
    </div>
  );
}

/* ─── NavSectionHead ─────────────────────────────────────────────────────── */
export function NavSectionHead({ title, actionLabel, onAction, className }: NavSectionHeadProps) {
  return (
    <div className={cx('prea-navsection', className)}>
      <span className="prea-navsection__title">{title}</span>
      {actionLabel && <button type="button" className="prea-navsection__action" onClick={onAction}>{actionLabel}</button>}
    </div>
  );
}

/* ─── MainNav ────────────────────────────────────────────────────────────── */
export function MainNav({ expanded = true, onToggle, logo, title = 'SPACE', children, footer, height = '100vh', className, style }: MainNavProps) {
  return (
    <nav
      className={cx('prea-mainnav', expanded ? 'prea-mainnav--open' : 'prea-mainnav--close', className)}
      style={{ height, ...style }}
      aria-label="Main navigation"
    >
      <div className="prea-mainnav__header">
        <div className="prea-mainnav__brand">
          {expanded ? (
            <>
              <div className="prea-mainnav__logo">
                {logo}
                {logo && <span className="prea-mainnav__logo-divider" />}
                <span className="prea-mainnav__title">{title}</span>
              </div>
              <IconButton size={32} icon="panel-left" label="Menü einklappen" onClick={onToggle} />
            </>
          ) : (
            <IconButton size={32} icon="panel-left" label="Menü ausklappen" onClick={onToggle} />
          )}
        </div>
        {children}
      </div>
      {footer && <div className="prea-mainnav__footer">{footer}</div>}
    </nav>
  );
}

export function MainNavDivider() { return <div className="prea-mainnav__divider" role="separator" />; }

/* ─── BottomNav ──────────────────────────────────────────────────────────── */
export function BottomNavButton({ icon, children, variant = 'plain', className, type = 'button', ...rest }: BottomNavButtonProps) {
  return (
    <button type={type} className={cx('prea-bottomnav-btn', variant !== 'plain' && `prea-bottomnav-btn--${variant}`, className)} {...rest}>
      {icon && <span className="prea-bottomnav-btn__icon">{renderIcon(icon, 14)}</span>}
      {children}
    </button>
  );
}

export function BottomNav({
  children, icons, date, time, editMode, editLabel = 'Bearbeitungsmodus', onExitEdit, exitLabel = 'Beenden', className, style,
}: BottomNavProps) {
  if (editMode) {
    return (
      <div className={cx('prea-bottomnav', 'prea-bottomnav--edit', className)} style={style} role="status">
        <div className="prea-bottomnav__left"><span className="prea-bottomnav__datetime">{editLabel}</span></div>
        <div className="prea-bottomnav__right">
          <BottomNavButton className="prea-bottomnav__exit" onClick={onExitEdit}>{exitLabel}</BottomNavButton>
        </div>
      </div>
    );
  }
  return (
    <div className={cx('prea-bottomnav', className)} style={style}>
      <div className="prea-bottomnav__left">{children}</div>
      <div className="prea-bottomnav__right">
        {icons && icons.length > 0 && (
          <div className="prea-bottomnav__icons">{icons.map((ic, i) => <span key={i}>{renderIcon(ic, 16)}</span>)}</div>
        )}
        {(date || time) && (
          <div className="prea-bottomnav__datetime">
            {date && <span>{date}</span>}
            {time && <span>{time}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── PathMenu ───────────────────────────────────────────────────────────── */
export function ToolDivider() { return <span className="prea-tool-divider" role="separator" />; }

export function PathMenu({ onBack, onForward, onReload, breadcrumb, tools, search, onTogglePanel, className, style }: PathMenuProps) {
  return (
    <div className={cx('prea-pathmenu', className)} style={style}>
      <div className="prea-pathmenu__nav">
        <IconButton icon="arrow-left" label="Zurück" onClick={onBack} />
        <IconButton icon="arrow-right" label="Vor" onClick={onForward} />
        <IconButton icon="rotate-cw" label="Neu laden" onClick={onReload} />
      </div>
      <div className="prea-pathmenu__crumb">{breadcrumb}</div>
      {(tools || search || onTogglePanel) && (
        <div className="prea-pathmenu__tools">
          {tools}
          {search}
          {onTogglePanel && <IconButton icon="panel-left" label="Panel umschalten" onClick={onTogglePanel} />}
        </div>
      )}
    </div>
  );
}

/* ─── Tabs ───────────────────────────────────────────────────────────────── */
export function Tabs({ tabs, activeKey, defaultActiveKey, onChange, variant = 'tertiary', onAdd, className }: TabsProps) {
  const [inner, setInner] = useState(defaultActiveKey ?? tabs[0]?.key);
  const current = activeKey ?? inner;
  return (
    <div className={cx('prea-menutabs', `prea-menutabs--${variant}`, className)} role="tablist">
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          role="tab"
          aria-selected={t.key === current}
          className={cx('prea-menutabs__tab', t.key === current && 'prea-menutabs__tab--active')}
          onClick={() => { setInner(t.key); onChange?.(t.key); }}
        >
          {t.label}
        </button>
      ))}
      {onAdd && <IconButton className="prea-menutabs__add" size={22} icon="plus" label="Hinzufügen" onClick={onAdd} />}
    </div>
  );
}

/* ─── PanelTabs ──────────────────────────────────────────────────────────── */
export function PanelTabs({
  tabs, activeKey, onChange, onAddTab, subTabs, activeSubKey, onSubChange, onAddSubTab, tools, width = 556, className, style,
}: PanelTabsProps) {
  const hasSub = !!subTabs && subTabs.length > 0;
  return (
    <div className={cx('prea-paneltabs', !hasSub && 'prea-paneltabs--single', className)} style={{ width, ...style }}>
      <div className="prea-paneltabs__row">
        <Tabs variant="tertiary" tabs={tabs} activeKey={activeKey} onChange={onChange} onAdd={onAddTab} />
        {!hasSub && tools && <div className="prea-pathmenu__tools">{tools}</div>}
      </div>
      {hasSub && (
        <div className="prea-paneltabs__row">
          <Tabs variant="secondary" tabs={subTabs!} activeKey={activeSubKey} onChange={onSubChange} onAdd={onAddSubTab} />
          {tools && <div className="prea-pathmenu__tools">{tools}</div>}
        </div>
      )}
    </div>
  );
}

/* ─── ToggleDataMenu ─────────────────────────────────────────────────────── */
export function ToggleDataMenu({ title, icon = 'panel-left', onToggle, className }: ToggleDataMenuProps) {
  return (
    <div className={cx('prea-toggledata', className)}>
      <span>{title}</span>
      <IconButton size={32} icon={icon} label="Daten-Panel umschalten" onClick={onToggle} />
    </div>
  );
}

/* ─── SearchPanel ────────────────────────────────────────────────────────── */
export function SearchPanel({ children, width = 348, className }: SearchPanelProps) {
  return <div className={cx('prea-searchpanel', className)} style={{ width }}>{children}</div>;
}
