import React, { useState } from 'react';
import { NotesPanel, NoteCard, NoteThread, NoteDivider } from '../../../Notes';
import { Avatar, AvatarGroup } from '../../../Avatar';
import type { ComponentEntry } from './types';

// ─── Raw source files ──────────────────────────────────────────────────────
import notesSrc    from '../../../Notes/Notes.tsx?raw';
import notesTypes  from '../../../Notes/Notes.types.ts?raw';
import notesCss    from '../../../Notes/Notes.css?raw';
import notesIndex  from '../../../Notes/index.ts?raw';
import avatarSrc   from '../../../Avatar/Avatar.tsx?raw';
import avatarTypes from '../../../Avatar/Avatar.types.ts?raw';
import avatarCss   from '../../../Avatar/Avatar.css?raw';
import avatarIndex from '../../../Avatar/index.ts?raw';

// ─── Demo ─────────────────────────────────────────────────────────────────
const headingStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 500, color: '#888', marginBottom: 12,
  textTransform: 'uppercase', letterSpacing: '0.05em',
};
// tiny inline avatar so the demo has no external image dependency
const AVATAR = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="%23111"/><circle cx="12" cy="9" r="4" fill="%2358a"/><ellipse cx="12" cy="19" rx="7" ry="4" fill="%2358a"/></svg>');
const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus maximus nisi, nec tincidunt quam imperdiet eu. Aliquam erat volutpat. Nullam tristique ligula at tristique posuere. Etiam scelerisque nisi non feugiat laoreet. Cras dapibus eros non interdum dignissim. Donec sagittis justo in eros tristique venenatis id vitae ligula.';

function NotesDemo() {
  const [log, setLog] = useState('');
  const [thread, setThread] = useState(false);
  const actions = [
    { key: 'src',   icon: 'reddit', label: 'Reddit', onClick: () => setLog('open source') },
    { key: 'edit',  icon: 'li:pencil', title: 'Bearbeiten', onClick: () => setLog('edit') },
    { key: 'share', icon: 'li:share',  title: 'Teilen',     onClick: () => setLog('share') },
    { key: 'more',  icon: 'li:ellipsis-horizontal', title: 'Mehr', onClick: () => setLog('more') },
  ];
  const note = { author: { name: 'John Doe', avatar: AVATAR }, date: '30. Jun 11:40', actions, onLike: () => setLog('like'), onReact: () => setLog('react'), children: LOREM };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      <div>
        <p style={headingStyle}>{thread ? 'NoteThread — back + answers' : 'NotesPanel — hover a note for actions, click "2 Antworten" to open the thread'}</p>
        <NotesPanel>
          {!thread ? (
            <>
              <NoteCard {...note} replies={{ count: 2, avatars: [AVATAR, AVATAR], onClick: () => setThread(true) }} />
              <NoteCard {...note} replies={{ count: 2, avatars: [AVATAR, AVATAR], onClick: () => setThread(true) }} />
            </>
          ) : (
            <>
              <NoteThread
                note={note}
                onBack={() => setThread(false)}
                comments={[
                  { ...note, actions: [] },
                  { ...note, actions: [] },
                ]}
              />
              <NoteDivider label="2 Antworten" />
            </>
          )}
        </NotesPanel>
        {log && <p style={{ fontSize: 11, color: '#888', margin: '8px 0 0' }}>{log}</p>}
      </div>

      <div>
        <p style={headingStyle}>Avatar — small 18 · medium 24 · big 28 · icon / image / badge</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar size="small" /><Avatar size="medium" /><Avatar size="big" />
          <Avatar size="small" src={AVATAR} /><Avatar size="medium" src={AVATAR} /><Avatar size="big" src={AVATAR} />
          <Avatar size="medium" src={AVATAR} badge /><Avatar size="big" badge />
          <AvatarGroup overlap={6}><Avatar size="small" src={AVATAR} /><Avatar size="small" src={AVATAR} /><Avatar size="small" /></AvatarGroup>
        </div>
      </div>
    </div>
  );
}

// ─── Usage snippet ─────────────────────────────────────────────────────────
const USAGE = `import { NotesPanel, NoteCard, NoteThread, NoteDivider } from './Notes';
import { Avatar } from './Avatar';
// Requires ./Avatar and ./Icon.

<NotesPanel width="100%">
  {notes.map((n) => (
    <NoteCard
      key={n.id}
      author={{ name: n.user.name, avatar: n.user.avatarUrl }}
      date={format(n.createdAt)}
      actions={[
        { key: 'src',   icon: 'reddit', label: 'Reddit', onClick: () => open(n.source) },
        { key: 'edit',  icon: 'li:pencil', title: 'Bearbeiten', onClick: () => edit(n) },
        { key: 'share', icon: 'li:share',  title: 'Teilen',     onClick: () => share(n) },
        { key: 'more',  icon: 'li:ellipsis-horizontal', title: 'Mehr', onClick: () => menu(n) },
      ]}
      onLike={() => like(n)}
      onReact={() => react(n)}
      replies={{ count: n.replies.length, avatars: n.replies.map((r) => r.user.avatarUrl), onClick: () => openThread(n) }}
    >
      {n.text}
    </NoteCard>
  ))}
</NotesPanel>

// Thread view
<NoteThread note={noteProps} onBack={close} comments={replies.map(toNoteProps)}>
  <ChatNotes width="100%" onSend={reply} />
</NoteThread>
<NoteDivider label="2 Antworten" />

<Avatar src={url} size="medium" badge />
`;

// ─── Registry entry ────────────────────────────────────────────────────────
export const notesEntry: ComponentEntry = {
  id: 'notes',
  name: 'Notes',
  category: 'Chat',
  description: 'Threaded notes from the Figma Notes page: NotesPanel, NoteCard (author, hover actions, like/react, reply summary), NoteThread (back + white comment cards), NoteDivider — plus the Avatar component (3 sizes, icon/image, badge).',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=261-615',
  files: [
    { name: 'Notes/Notes.tsx',        content: notesSrc },
    { name: 'Notes/Notes.types.ts',   content: notesTypes },
    { name: 'Notes/Notes.css',        content: notesCss },
    { name: 'Notes/index.ts',         content: notesIndex },
    { name: 'Avatar/Avatar.tsx',      content: avatarSrc },
    { name: 'Avatar/Avatar.types.ts', content: avatarTypes },
    { name: 'Avatar/Avatar.css',      content: avatarCss },
    { name: 'Avatar/index.ts',        content: avatarIndex },
  ],
  usage: USAGE,
  props: [
    { name: 'NoteCard.author',   type: '{ name, avatar? }',  default: '—', required: true,  description: 'Author shown in the header.' },
    { name: 'NoteCard.date',     type: 'ReactNode',          default: '—', required: false, description: 'Formatted date.' },
    { name: 'NoteCard.actions',  type: '{ key, icon, label?, title?, onClick? }[]', default: '[]', required: false, description: 'Header actions; visible on hover (or actionsVisible).' },
    { name: 'NoteCard.onLike / onReact', type: '() => void', default: '—', required: false, description: 'Footer buttons.' },
    { name: 'NoteCard.replies',  type: '{ count, label?, avatars?, onClick? }', default: '—', required: false, description: 'Reply summary at the footer right.' },
    { name: 'NoteCard.variant',  type: "'note' | 'comment'", default: "'note'", required: false, description: 'Grey note or white comment card.' },
    { name: 'NoteThread.note / comments / onBack', type: 'NoteCardProps / NoteCardProps[] / () => void', default: '—', required: false, description: 'Back row + answer container.' },
    { name: 'NoteDivider.label', type: 'ReactNode',          default: '—', required: true,  description: '"2 Antworten" + line.' },
    { name: 'Avatar.size',       type: "'small' | 'medium' | 'big' | number", default: "'medium'", required: false, description: '18 / 24 / 28 px.' },
    { name: 'Avatar.src / icon / badge', type: 'string / string | ReactNode / boolean', default: "— / 'li:users' / false", required: false, description: 'Image, fallback icon, red dot.' },
  ],
  demo: <NotesDemo />,
};
