import React from 'react';
import rawFull from '../assets/logo.svg?raw';
import rawIcon from '../assets/logo_icon.svg?raw';

interface LogoProps {
  /** 'full' = logo + PREA text | 'icon' = icon only */
  variant?: 'full' | 'icon';
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Logo({ variant = 'full', size = 24, className, style }: LogoProps) {
  const svg = variant === 'icon' ? rawIcon : rawFull;

  return (
    <span
      className={['logo-icon', className].filter(Boolean).join(' ')}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        width: size,
        height: size,
        flexShrink: 0,
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
      aria-label="PREA Space logo"
      role="img"
    />
  );
}
