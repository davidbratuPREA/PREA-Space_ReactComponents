import React from 'react';
import type { NavInfoCardProps } from './InfoBox.types';
import { BoxLink } from './BoxLink';
import './InfoBox.css';

/**
 * NavInfoCard
 *
 * Matches Figma "nav_InfoCard":
 *   ┌ bg BGLinkBox · border · radius 6 · padding 16 ┐
 *   │ Title        18/20 medium                      │
 *   │ Description  13/17 regular, sub-text           │  ← header, gap 12
 *   │                                                │  ← gap 28
 *   │ BoxLink                                        │
 *   │ BoxLink                                        │  ← links, gap 12
 *   └────────────────────────────────────────────────┘
 */
export function NavInfoCard({
  title,
  description,
  links,
  width = 283,
  className,
  style,
}: NavInfoCardProps) {
  const cls = ['prea-navinfocard', className].filter(Boolean).join(' ');
  return (
    <div className={cls} style={{ width, ...style }}>
      <div className="prea-navinfocard__header">
        <p className="prea-navinfocard__title">{title}</p>
        {description !== undefined && description !== null && (
          <p className="prea-navinfocard__description">{description}</p>
        )}
      </div>

      {links && links.length > 0 && (
        <nav className="prea-navinfocard__links" aria-label="Links">
          {links.map((l) => (
            <BoxLink
              key={l.key}
              href={l.href}
              onClick={l.onClick ? () => l.onClick!(l.key) : undefined}
            >
              {l.label}
            </BoxLink>
          ))}
        </nav>
      )}
    </div>
  );
}
