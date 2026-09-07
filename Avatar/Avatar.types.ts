import React from 'react';

export type AvatarSize = 'small' | 'medium' | 'big';

export interface AvatarProps {
  /** Image URL. Without it the avatar shows an icon (Figma Style=Icon). */
  src?: string;
  alt?: string;
  /** small 18 · medium 24 · big 28 (Figma Avatar/Sizing). */
  size?: AvatarSize | number;
  /** Fallback icon — Figma icon name or node. Default "li:users". */
  icon?: string | React.ReactNode;
  /** Red status dot (Figma badge). */
  badge?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface AvatarGroupProps {
  children: React.ReactNode;
  /** Negative overlap in px. Default 0 (Figma stacks with 10px gap instead). */
  overlap?: number;
  gap?: number;
  className?: string;
}
