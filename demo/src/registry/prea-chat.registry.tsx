import React, { useState } from 'react';
import { ChatButton, ChatDropdown, ChatInput, ChatNotes } from '../../../Chat';
import type { ComponentEntry } from './types';

// ─── Raw source files ──────────────────────────────────────────────────────
import chatButtonSrc   from '../../../Chat/ChatButton.tsx?raw';
import chatDropdownSrc from '../../../Chat/ChatDropdown.tsx?raw';
import chatInputSrc    from '../../../Chat/ChatInput.tsx?raw';
import chatNotesSrc    from '../../../Chat/ChatNotes.tsx?raw';
import chatTypes       from '../../../Chat/Chat.types.ts?raw';
import chatCss         from '../../../Chat/Chat.css?raw';
import chatIndex       from '../../../Chat/index.ts?raw';

// ─── Demo ─────────────────────────────────────────────────────────────────
const headingStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 12,
  textTransform: 'uppercase', letterSpacing: '0.05em',
};

const CHATS = [
  { key: 'headline',  label: 'Headline Chatname' },
  { key: 'chat13',    label: 'Chat #13' },
  { key: 'potsdamer', label: 'Potsdamer Platz' },
  { key: 'summer',    label: 'Summer sale' },
  { key: 'bluestar',  label: 'Bluestar#33' },
];
const PROJECTS = [
  { key: 'deep-street', label: 'Deep Street',  icon: 'li:folder' },
  { key: 'berlin',      label: 'Berlin Mitte', icon: 'li:folder' },
];

function SubMenu({ onLog }: { onLog: (s: string) => void }) {
  return (
    <>
      <ChatDropdown
        label="Chats"
        icon="li:message-square"
        items={CHATS}
        actions={[
          { key: 'new', label: 'Neuer Chat',    icon: 'message-square-plus' },
          { key: 'all', label: 'Alle Anzeigen', icon: 'li:message-chat-square' },
        ]}
        searchPlaceholder="Chats suchen"
        onSelect={(k) => onLog(`Chats → ${k}`)}
      />
      <ChatDropdown
        label="Projekte"
        icon="li:folder"
        items={PROJECTS}
        actions={[{ key: 'new-project', label: 'Neues Projekt', icon: 'li:folder-plus' }]}
        searchPlaceholder="Projekte suchen"
        onSelect={(k) => onLog(`Projekte → ${k}`)}
      />
    </>
  );
}

function ChatDemo() {
  const [log, setLog] = useState('');
  const [activeText, setActiveText] = useState('Ich würde gerne ');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

      <div>
        <p style={headingStyle}>ChatInput — Default state (type to reveal the send button, open the dropdowns)</p>
        <ChatInput
          onSend={(v) => setLog(`send → "${v}"`)}
          onAttach={() => setLog('attach clicked')}
          modelLabel="GPT 5.6"
          onModelClick={() => setLog('model clicked')}
          subMenu={<SubMenu onLog={setLog} />}
        />
      </div>

      <div>
        <p style={headingStyle}>ChatInput — Active state (controlled value)</p>
        <ChatInput
          value={activeText}
          onChange={setActiveText}
          onSend={(v) => { setLog(`send → "${v}"`); setActiveText(''); }}
          onAttach={() => setLog('attach clicked')}
          modelLabel="GPT 5.6"
          subMenu={<SubMenu onLog={setLog} />}
        />
      </div>

      <div>
        <p style={headingStyle}>ChatNotes — docked composer (no sub-menu)</p>
        <div style={{ paddingTop: 16 }}>
          <ChatNotes
            onSend={(v) => setLog(`notes → "${v}"`)}
            onAttach={() => setLog('attach clicked')}
          />
        </div>
      </div>

      <div>
        <p style={headingStyle}>ChatButton — hover me</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <ChatButton icon="li:plus" label="Anhängen" />
          <ChatButton icon="OpenAI">GPT 5.6</ChatButton>
          <ChatButton icon="OpenAI" active>GPT 5.6 (active)</ChatButton>
          <ChatButton icon="li:paperclip">Datei</ChatButton>
          <ChatButton variant="primary" icon="li:arrow-up" label="Senden" />
          <ChatButton icon="li:plus" label="Disabled" disabled />
        </div>
      </div>

      <div>
        <p style={headingStyle}>ChatDropdown — standalone</p>
        <div style={{ display: 'flex', gap: 12, minHeight: 60 }}>
          <ChatDropdown label="Chats" items={CHATS} actions={[{ key: 'new', label: 'Neuer Chat', icon: 'message-square-plus' }]} searchPlaceholder="Chats suchen" onSelect={(k) => setLog(`→ ${k}`)} />
          <ChatDropdown label="Ohne Suche" icon="li:layers" items={PROJECTS} searchable={false} onSelect={(k) => setLog(`→ ${k}`)} />
        </div>
      </div>

      {log && <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: 0 }}>{log}</p>}
    </div>
  );
}

// ─── Usage snippet ─────────────────────────────────────────────────────────
const USAGE = `import { ChatInput, ChatDropdown, ChatNotes, ChatButton } from './Chat';
// Requires the Icon component (./Icon) for the Figma icon names.

// Composer with model picker and sub-menu
<ChatInput
  placeholder="Wie kann ich dir helfen?"
  onSend={(text) => sendMessage(text)}
  onAttach={() => openFilePicker()}
  modelLabel="GPT 5.6"
  modelIcon="OpenAI"
  onModelClick={() => openModelPicker()}
  subMenu={
    <>
      <ChatDropdown
        label="Chats"
        items={chats.map((c) => ({ key: c.id, label: c.title }))}
        actions={[
          { key: 'new', label: 'Neuer Chat',    icon: 'message-square-plus' },
          { key: 'all', label: 'Alle Anzeigen', icon: 'li:message-chat-square' },
        ]}
        searchPlaceholder="Chats suchen"
        onSelect={(key) => openChat(key)}
      />
      <ChatDropdown label="Projekte" icon="li:folder" items={projects} />
    </>
  }
/>

// Controlled value
<ChatInput value={draft} onChange={setDraft} onSend={submit} modelLabel="GPT 5.6" />

// Docked composer for the notes panel
<ChatNotes width="100%" onSend={addNote} onAttach={attach} />

// Buttons
<ChatButton icon="li:plus" label="Anhängen" onClick={attach} />
<ChatButton icon="OpenAI">GPT 5.6</ChatButton>
<ChatButton variant="primary" icon="li:arrow-up" label="Senden" />
`;

// ─── Registry entry ────────────────────────────────────────────────────────
export const chatEntry: ComponentEntry = {
  id: 'chat',
  name: 'Chat',
  category: 'Chat',
  description: 'Chat composer family: ChatInput (auto-growing prompt box with attach / model / send buttons and a sub-menu strip), ChatDropdown (searchable chats/projects picker), ChatNotes (docked composer) and ChatButton.',
  status: 'stable',
  figmaUrl: 'https://www.figma.com/design/OTZ34BoAggjKtRk774W8NK/PREA-Space-Design-library?node-id=203-1383',
  files: [
    { name: 'ChatInput.tsx',    content: chatInputSrc },
    { name: 'ChatDropdown.tsx', content: chatDropdownSrc },
    { name: 'ChatNotes.tsx',    content: chatNotesSrc },
    { name: 'ChatButton.tsx',   content: chatButtonSrc },
    { name: 'Chat.types.ts',    content: chatTypes },
    { name: 'Chat.css',         content: chatCss },
    { name: 'index.ts',         content: chatIndex },
  ],
  usage: USAGE,
  props: [
    // ChatInput
    { name: 'ChatInput.value / defaultValue', type: 'string',              default: "''",   required: false, description: 'Controlled or uncontrolled text.' },
    { name: 'ChatInput.onChange',      type: '(value: string) => void',    default: '—',    required: false, description: 'Fires on every keystroke.' },
    { name: 'ChatInput.onSend',        type: '(value: string) => void',    default: '—',    required: false, description: 'Enter or the blue send button (shown only when there is text).' },
    { name: 'ChatInput.placeholder',   type: 'string',                     default: "'Wie kann ich dir helfen?'", required: false, description: 'Placeholder in defText colour.' },
    { name: 'ChatInput.onAttach',      type: '() => void',                 default: '—',    required: false, description: 'Renders the "+" button when set.' },
    { name: 'ChatInput.modelLabel',    type: 'ReactNode',                  default: '—',    required: false, description: 'Renders the model button (e.g. "GPT 5.6") when set.' },
    { name: 'ChatInput.modelIcon',     type: 'string | ReactNode',         default: "'OpenAI'", required: false, description: 'Icon of the model button.' },
    { name: 'ChatInput.actions',       type: 'ReactNode',                  default: '—',    required: false, description: 'Replaces the default attach + model buttons.' },
    { name: 'ChatInput.subMenu',       type: 'ReactNode',                  default: '—',    required: false, description: 'Content of the bottom strip, usually ChatDropdowns. Omit to hide the strip.' },
    { name: 'ChatInput.width',         type: 'number | string',            default: '540',  required: false, description: 'Use "100%" to fill.' },
    // ChatDropdown
    { name: 'ChatDropdown.label',      type: 'ReactNode',                  default: '—',    required: true,  description: 'Trigger text.' },
    { name: 'ChatDropdown.icon',       type: 'string | ReactNode',         default: "'li:message-square'", required: false, description: 'Trigger icon.' },
    { name: 'ChatDropdown.items',      type: '{ key, label, icon?, disabled?, onClick? }[]', default: '[]', required: false, description: 'Main list; filtered by the search field.' },
    { name: 'ChatDropdown.actions',    type: 'same as items',              default: '[]',   required: false, description: 'Rows under the divider.' },
    { name: 'ChatDropdown.searchable', type: 'boolean',                    default: 'true', required: false, description: 'Show the search field.' },
    { name: 'ChatDropdown.onSelect',   type: '(key: string) => void',      default: '—',    required: false, description: 'Fires for items and actions.' },
    { name: 'ChatDropdown.open / onOpenChange', type: 'boolean / (open) => void', default: '—', required: false, description: 'Controlled open state.' },
    // ChatNotes
    { name: 'ChatNotes.*',             type: 'ChatInputProps minus subMenu', default: '—',  required: false, description: 'Same as ChatInput; width default 560.' },
    // ChatButton
    { name: 'ChatButton.icon',         type: 'string | ReactNode',         default: '—',    required: false, description: 'Figma icon name or node, 16px.' },
    { name: 'ChatButton.variant',      type: "'default' | 'primary'",      default: "'default'", required: false, description: 'primary = blue send button.' },
    { name: 'ChatButton.active',       type: 'boolean',                    default: 'false', required: false, description: 'Forces the hover/active look.' },
    { name: 'ChatButton.label',        type: 'string',                     default: '—',    required: false, description: 'aria-label / tooltip for icon-only buttons.' },
  ],
  demo: <ChatDemo />,
};
