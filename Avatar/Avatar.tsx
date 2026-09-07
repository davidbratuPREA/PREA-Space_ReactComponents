import React, { useState } from 'react';
import { Icon } from '../Icon';
import type { AvatarGroupProps, AvatarProps } from './Avatar.types';
import './Avatar.css';

/**
 * Avatar
 *
 * Matches Figma "Avatar" (Size = Small 18 | Medium 24 | Big 28, Style = Icon | Image, badge).
 * Falls back to the icon when no image is given or the image fails to load.
 */
export function Avatar({ src, alt = '', size = 'medium', icon = 'li:users', badge = false, className, style }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const numeric = typeof size === 'number';
  const cls = ['prea-avatar', !numeric && `prea-avatar--${size}`, className].filter(Boolean).join(' ');
  const iconPx = Math.round((numeric ? size : { small: 18, medium: 24, big: 28 }[size]) * 0.6);
  return (
    <span className={cls} style={numeric ? { ['--avatar-size' as string]: `${size}px`, ...style } : style} role={alt ? 'img' : undefined} aria-label={alt || undefined}>
      {src && !failed ? (
        <img className="prea-avatar__img" src={src} alt="" onError={() => setFailed(true)} />
      ) : (
        <span className="prea-avatar__icon" aria-hidden>{typeof icon === 'string' ? <Icon name={icon} size={iconPx} /> : icon}</span>
      )}
      {badge && <span className="prea-avatar__badge" aria-hidden />}
    </span>
  );
}

/** Row of avatars; Figma stacks them with a 10px gap. */
export function AvatarGroup({ children, overlap = 0, gap = 10, className }: AvatarGroupProps) {
  return (
    <span className={['prea-avatar-group', className].filter(Boolean).join(' ')} style={{ gap: overlap ? 0 : gap }}>
      {overlap
        ? React.Children.map(children, (c, i) => <span style={{ marginLeft: i ? -overlap : 0, display: 'inline-flex' }}>{c}</span>)
        : children}
    </span>
  );
}
