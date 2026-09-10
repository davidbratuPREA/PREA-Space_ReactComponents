import React from 'react';

export interface NoteAuthor {
  name: React.ReactNode;
  /** Avatar image URL. */
  avatar?: string;
}

export interface NoteAction {
  key: string;
  /** Figma icon name or node (14px). */
  icon: string | React.ReactNode;
  /** Optional text (Figma: "Reddit" source button). */
  label?: React.ReactNode;
  title?: string;
  onClick?: () => void;
}

/* ─── NoteCard (Figma "notesChat" Style=Note / commentMain) ──────────────── */
export interface NoteCardProps {
  author: NoteAuthor;
  /** Formatted date, e.g. "30. Jun 11:40". */
  date?: React.ReactNode;
  /** Note body. */
  children: React.ReactNode;
  /** Header actions revealed on hover (source button, edit, share, more…). */
  actions?: NoteAction[];
  /** Always show the actions instead of only on hover. */
  actionsVisible?: boolean;
  onLike?: () => void;
  onReact?: () => void;
  /** Reply summary shown at the right of the footer (Figma "2 Antwort" + avatars). */
  replies?: { count: number; label?: React.ReactNode; avatars?: string[]; onClick?: () => void };
  /**
   * Comments on this note (Figma thread: "comment #1 on answer #1"). Rendered as
   * nested comment cards between the body and the footer.
   */
  comments?: NoteCardProps[];
  /** note = grey card (Style=Note) · comment = white card nested inside another note. */
  variant?: 'note' | 'comment';
  className?: string;
  style?: React.CSSProperties;
}

/* ─── NoteThread (Figma Style=backNote + Style=Answear) ──────────────────── */
export interface NoteThreadProps {
  /** The note being answered — rendered with a back button (Style=backNote). */
  note: NoteCardProps;
  onBack?: () => void;
  /**
   * Answers shown below the post, after a "N Antworten" divider. Each answer is a
   * NoteCard; give it `comments` to nest comment cards inside it.
   */
  answers?: NoteCardProps[];
  /** @deprecated use `answers`. */
  comments?: NoteCardProps[];
  /** Divider label; defaults to "N Antworten". Pass null to hide the divider. */
  answersLabel?: React.ReactNode | null;
  /** Extra content under the answers (e.g. a <ChatNotes> composer). */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── NoteDivider (Figma Style=Divider) ──────────────────────────────────── */
export interface NoteDividerProps {
  label: React.ReactNode;
  className?: string;
}

/* ─── NotesPanel (Figma "notesPanel") ────────────────────────────────────── */
export interface NotesPanelProps {
  children?: React.ReactNode;
  /** Width. Figma 661. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
