import React from 'react';
import type { BoxLinkProps } from './InfoBox.types';
import './InfoBox.css';

/**
 * BoxLink
 *
 * Matches Figma "box_link" (State = Default | Hover).
 * 13/17 regular · Link color → LinkHover + underline on hover.
 * Renders an <a> when `href` is given, otherwise a <button>.
 */
export function BoxLink({ children, href, onClick, className, ...rest }: BoxLinkProps) {
  const cls = ['prea-boxlink', className].filter(Boolean).join(' ');

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  // No href → semantic button (only anchor-agnostic attrs are forwarded)
  const { style, title, id, tabIndex } = rest;
  return (
    <button type="button" className={cls} onClick={onClick} style={style} title={title} id={id} tabIndex={tabIndex}>
      {children}
    </button>
  );
}
