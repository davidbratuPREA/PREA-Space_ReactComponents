import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { registry } from '../registry';
import { CodeBlock } from '../components/Showcase/CodeBlock';
import { PropsTable } from '../components/Showcase/PropsTable';
import { DownloadButton } from '../components/Showcase/DownloadButton';

export function ComponentPage() {
  const { componentId } = useParams<{ componentId: string }>();
  const [copiedImport, setCopiedImport] = useState(false);

  const entry = componentId ? registry[componentId] : undefined;

  if (!entry) {
    return <Navigate to="/" replace />;
  }

  const importStatement = `import { ${entry.name} } from './${entry.name}';`;

  const handleCopyImport = async () => {
    try {
      await navigator.clipboard.writeText(importStatement);
      setCopiedImport(true);
      setTimeout(() => setCopiedImport(false), 2000);
    } catch { /* noop */ }
  };

  return (
    <div className="comp-page">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="comp-page__header">
        <div className="comp-page__eyebrow">{entry.category}</div>
        <h1 className="comp-page__title">{entry.name}</h1>
        <p className="comp-page__desc">{entry.description}</p>
        <div className="comp-page__meta">
          <span className="comp-page__tag">
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: entry.status === 'stable' ? '#22c55e' : '#f59e0b', flexShrink: 0 }} />
            {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
          </span>
          <span className="comp-page__tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
            {entry.files.length} file{entry.files.length !== 1 ? 's' : ''}
          </span>
          {entry.figmaUrl && (
            <a
              className="comp-page__tag"
              href={entry.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/>
                <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/>
                <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/>
                <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/>
                <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/>
              </svg>
              View in Figma
            </a>
          )}
        </div>
      </div>

      {/* ── Action bar ─────────────────────────────────────── */}
      <div className="action-bar">
        <DownloadButton componentName={entry.name} files={entry.files} />

        <button
          className={`action-btn action-btn--secondary`}
          onClick={handleCopyImport}
          aria-label="Copy import statement"
        >
          {copiedImport ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy import
            </>
          )}
        </button>

        {entry.figmaUrl && (
          <a
            className="action-btn action-btn--ghost"
            href={entry.figmaUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z"/>
            </svg>
            Open in Figma
          </a>
        )}
      </div>

      {/* ── Preview ────────────────────────────────────────── */}
      <div className="section">
        <div className="section-title">Preview</div>
        <div className="preview-frame">
          <div className="preview-frame__content">{entry.demo}</div>
        </div>
      </div>

      {/* ── Usage ──────────────────────────────────────────── */}
      <div className="section">
        <div className="section-title">Usage</div>
        <CodeBlock code={entry.usage} language="tsx" />
      </div>

      {/* ── Props ──────────────────────────────────────────── */}
      {entry.props.length > 0 && (
        <div className="section">
          <div className="section-title">Props</div>
          <PropsTable props={entry.props} />
        </div>
      )}

      {/* ── Files ──────────────────────────────────────────── */}
      <div className="section">
        <div className="section-title">Source Files</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {entry.files.map((file) => (
            <div
              key={file.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 16px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 13,
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontSize: 12.5 }}>
                📄 {file.name}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                {(new Blob([file.content]).size / 1024).toFixed(1)} KB
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
