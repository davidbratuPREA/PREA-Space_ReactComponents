import React from 'react';
import { Icon } from '../Icon';
import { Avatar, AvatarGroup } from '../Avatar';
import type { NoteAction, NoteCardProps, NoteDividerProps, NoteThreadProps, NotesPanelProps } from './Notes.types';
import './Notes.css';

function renderIcon(icon: string | React.ReactNode, size: number) {
  return typeof icon === 'string' ? <Icon name={icon} size={size} /> : icon;
}

function ActionButton({ a }: { a: NoteAction }) {
  const hasLabel = a.label !== undefined && a.label !== null;
  return (
    <button type="button" className={['prea-note__action', hasLabel && 'prea-note__action--text'].filter(Boolean).join(' ')} title={a.title} aria-label={!hasLabel ? a.title : undefined} onClick={a.onClick}>
      <span className="prea-note__action-icon" aria-hidden>{renderIcon(a.icon, 14)}</span>
      {hasLabel && <span>{a.label}</span>}
    </button>
  );
}

/**
 * NoteCard
 *
 * Matches Figma "notesChat" Style=Note (grey) and the "commentMain" card (white):
 *   [avatar 24] Name  date ………… [source ▸ edit · share · more]  ← actions on hover
 *   body text 12/19
 *   ───────────────────────────────────────────────────────────
 *   [👍] [☺]                              2 Antwort [◉][◉]
 */
export function NoteCard({ author, date, children, actions = [], actionsVisible = false, onLike, onReact, replies, variant = 'note', className, style }: NoteCardProps) {
  const cls = ['prea-note', variant === 'comment' && 'prea-note--comment', className].filter(Boolean).join(' ');
  const showFooter = onLike || onReact || replies;
  return (
    <article className={cls} style={style}>
      <header className="prea-note__head">
        <div className="prea-note__user">
          <Avatar src={author.avatar} size="medium" alt="" />
          <span className="prea-note__name">{author.name}</span>
          {date !== undefined && <span className="prea-note__date">{date}</span>}
        </div>
        {actions.length > 0 && (
          <div className={['prea-note__actions', actionsVisible && 'prea-note__actions--visible'].filter(Boolean).join(' ')}>
            {actions.map((a) => <ActionButton key={a.key} a={a} />)}
          </div>
        )}
      </header>

      <p className="prea-note__body">{children}</p>

      {showFooter && (
        <footer className="prea-note__footer">
          <div className="prea-note__btns">
            {onLike && <ActionButton a={{ key: 'like', icon: 'li:thumbs-up', title: 'Gefällt mir', onClick: onLike }} />}
            {onReact && <ActionButton a={{ key: 'react', icon: 'li:face-slightly-smiling', title: 'Reagieren', onClick: onReact }} />}
          </div>
          {replies && (
            <button type="button" className="prea-note__replies" onClick={replies.onClick}>
              <span>{replies.label ?? `${replies.count} ${replies.count === 1 ? 'Antwort' : 'Antworten'}`}</span>
              {replies.avatars && replies.avatars.length > 0 && (
                <AvatarGroup>
                  {replies.avatars.map((src, i) => <Avatar key={i} src={src} size="small" />)}
                </AvatarGroup>
              )}
            </button>
          )}
        </footer>
      )}
    </article>
  );
}

/**
 * NoteThread
 *
 * Matches Figma Style=backNote (back arrow + the note) followed by Style=Answear
 * (grey container with the answered note's text and white comment cards).
 */
export function NoteThread({ note, onBack, comments = [], children, className, style }: NoteThreadProps) {
  return (
    <div className={['prea-note-thread', className].filter(Boolean).join(' ')} style={style}>
      <div className="prea-note-thread__back-row">
        {onBack && (
          <button type="button" className="prea-note-thread__back" aria-label="Zurück" onClick={onBack}>
            <Icon name="li:arrow-left" size={18} />
          </button>
        )}
        <NoteCard {...note} replies={undefined} />
      </div>
      {(comments.length > 0 || children) && (
        <div className="prea-note-thread__answers">
          {comments.map((c, i) => <NoteCard key={i} {...c} variant="comment" />)}
          {children}
        </div>
      )}
    </div>
  );
}

/** Figma Style=Divider — "2 Antworten ───────" */
export function NoteDivider({ label, className }: NoteDividerProps) {
  return (
    <div className={['prea-note-divider', className].filter(Boolean).join(' ')} role="separator">
      <span>{label}</span>
      <span className="prea-note-divider__line" />
    </div>
  );
}

/** Figma "notesPanel" — vertical list of notes, 8px gap and padding */
export function NotesPanel({ children, width = 661, className, style }: NotesPanelProps) {
  return <div className={['prea-notes-panel', className].filter(Boolean).join(' ')} style={{ width, ...style }}>{children}</div>;
}
