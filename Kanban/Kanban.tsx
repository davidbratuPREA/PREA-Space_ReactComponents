import React, { useState } from 'react';
import { Icon } from '../Icon';
import type {
  KanbanBoardProps, KanbanColumnProps, KanbanGroupHeaderProps, KanbanItemRowProps,
  KanbanPriorityBadgeProps, KanbanProjectProps, KanbanStatus, KanbanStatusBadgeProps, QuantityBadgeProps,
} from './Kanban.types';
import './Kanban.css';

const STATUS_LABEL: Record<KanbanStatus, string> = { onHold: 'On Hold', pending: 'Pending', inProgress: 'In Progress', done: 'Done' };

function renderIcon(icon: string | React.ReactNode | undefined, size: number) {
  if (icon === undefined || icon === null || icon === false) return null;
  return typeof icon === 'string' ? <Icon name={icon} size={size} /> : icon;
}

/** Figma "flag-03" (Untitled UI) — not part of the Icons page, so inlined here. */
const FlagIcon = () => (
  <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M1.66666 5.41667H8.16126C8.35396 5.41667 8.45031 5.41667 8.50534 5.37626C8.55332 5.34102 8.58394 5.28694 8.58947 5.22767C8.5958 5.15969 8.54623 5.07707 8.44709 4.91183L7.60289 3.50483C7.56548 3.44248 7.54677 3.4113 7.53946 3.37802C7.533 3.34858 7.533 3.31809 7.53946 3.28865C7.54677 3.25537 7.56548 3.22419 7.60289 3.16183L8.44709 1.75483C8.54623 1.58959 8.5958 1.50698 8.58947 1.439C8.58394 1.37972 8.55332 1.32564 8.50534 1.29041C8.45031 1.25 8.35396 1.25 8.16126 1.25H1.66666L1.66666 8.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Figma "statusBadge" — ON HOLD · PENDING · IN PROGRESS · DONE */
export function KanbanStatusBadge({ status, children, className, style }: KanbanStatusBadgeProps) {
  return (
    <span className={['prea-kanban-status', `prea-kanban--${status}`, className].filter(Boolean).join(' ')} style={style}>
      {children ?? STATUS_LABEL[status]}
    </span>
  );
}

/** Figma "quantityBadge" — 20px count box */
export function QuantityBadge({ count, className, style }: QuantityBadgeProps) {
  return <span className={['prea-kanban-qty', className].filter(Boolean).join(' ')} style={style}>{count}</span>;
}

/** Priority chip used in the btn_badge row (flag + "Hoch") */
export function KanbanPriorityBadge({ children, icon, className }: KanbanPriorityBadgeProps) {
  return (
    <span className={['prea-kanban-priority', className].filter(Boolean).join(' ')}>
      <span className="prea-kanban-priority__icon">{icon === undefined ? <FlagIcon /> : renderIcon(icon, 10)}</span>
      {children}
    </span>
  );
}

/** Figma "KanbanGroup" (Style = Header | subGroup) — collapsible row with chevron */
export function KanbanGroupHeader({ title, variant = 'header', open = true, onToggle, className }: KanbanGroupHeaderProps) {
  const cls = ['prea-kanban-group', `prea-kanban-group--${variant}`, open && 'prea-kanban-group--open', className].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} aria-expanded={open} onClick={onToggle}>
      <span className="prea-kanban-group__chevron" aria-hidden>
        <Icon name={open ? 'li:chevron-down' : 'li:chevron-right'} size={14} />
      </span>
      <span className="prea-kanban-group__title">{title}</span>
    </button>
  );
}

/** Figma "projekt_itemList" (Style = Default | Highlight | btn_badge) */
export function KanbanItemRow({ label, value, highlight = false, icon, priority, priorityIcon, className }: KanbanItemRowProps) {
  if (priority !== undefined && priority !== null) {
    return (
      <div className={['prea-kanban-row', 'prea-kanban-row--priority', className].filter(Boolean).join(' ')}>
        <KanbanPriorityBadge icon={priorityIcon}>{priority}</KanbanPriorityBadge>
      </div>
    );
  }
  return (
    <div className={['prea-kanban-row', highlight && 'prea-kanban-row--highlight', className].filter(Boolean).join(' ')}>
      {highlight && icon && <span className="prea-kanban-row__icon" aria-hidden>{renderIcon(icon, 14)}</span>}
      <span className="prea-kanban-row__label">{label}</span>
      <span className="prea-kanban-row__value">{value}</span>
    </div>
  );
}

/**
 * KanbanProject
 *
 * Matches Figma "projektKanban": a rounded card with a grey project header and
 * collapsible sub-groups (address rows) holding label/value item rows.
 */
export function KanbanProject({ title, groups = [], defaultOpen = true, children, width, className, style }: KanbanProjectProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.map((g, i) => [g.key, g.defaultOpen ?? i === 0])));

  return (
    <div className={['prea-kanban-project', className].filter(Boolean).join(' ')} style={{ width, ...style }}>
      <KanbanGroupHeader title={title} variant="header" open={open} onToggle={() => setOpen(!open)} />
      {open && (
        <div className="prea-kanban-project__body">
          {children ?? groups.map((g) => {
            const isOpen = openGroups[g.key] ?? false;
            return (
              <React.Fragment key={g.key}>
                <KanbanGroupHeader title={g.title} variant="sub" open={isOpen} onToggle={() => setOpenGroups({ ...openGroups, [g.key]: !isOpen })} />
                {isOpen && (g.items ?? []).map((it) => (
                  <KanbanItemRow key={it.key} label={it.label} value={it.value} highlight={it.highlight} icon={it.icon} />
                ))}
                {isOpen && g.priority !== undefined && <KanbanItemRow priority={g.priority} />}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Figma "Kandan" — a status column: badge + count header, then project cards */
export function KanbanColumn({ status, statusLabel, count, children, width = 457, className, style }: KanbanColumnProps) {
  const n = count ?? React.Children.count(children);
  return (
    <section className={['prea-kanban-column', `prea-kanban--${status}`, className].filter(Boolean).join(' ')} style={{ width, ...style }}>
      <div className="prea-kanban-column__head">
        <KanbanStatusBadge status={status}>{statusLabel}</KanbanStatusBadge>
        <QuantityBadge count={n} />
      </div>
      <div className="prea-kanban-column__body">{children}</div>
    </section>
  );
}

/** Figma "KanbanPanel" — horizontal row of columns, 10px apart, 8px padding */
export function KanbanBoard({ children, className, style }: KanbanBoardProps) {
  return <div className={['prea-kanban-board', className].filter(Boolean).join(' ')} style={style}>{children}</div>;
}
