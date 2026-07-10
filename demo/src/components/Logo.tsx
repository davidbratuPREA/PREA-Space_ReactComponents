import React from 'react';
import rawSvg from '../assets/logo.svg?raw';

interface LogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * PREA company logo — renders inline so `fill: currentColor` is controlled
 * by CSS. Color tokens:
 *   light mode → color: #181818  (set via .logo-icon in index.css)
 *   dark  mode → color: #FFFFFF
 */
export function Logo({ size = 24, className, style }: LogoProps) {
  return (
    <span
      className={['logo-icon', className].filter(Boolean).join(' ')}
      style={{ display: 'inline-flex', alignItems: 'center', width: size, height: size, flexShrink: 0, ...style }}
      dangerouslySetInnerHTML={{ __html: rawSvg }}
      aria-label="PREA Space logo"
      role="img"
    />
  );
}
