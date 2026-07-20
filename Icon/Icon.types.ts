export interface IconProps {
  /** Icon name in Lucide format, prefixed with "li:" (e.g. "li:atom", "li:chevron-right") */
  name: string;
  /** Size in px — matches Figma: 12 14 16 18 20 22 24 28 32 36 48 */
  size?: number;
  /** Stroke color — defaults to currentColor so it inherits from CSS */
  color?: string;
  /** Stroke width — Figma uses 1.5 by default */
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}
