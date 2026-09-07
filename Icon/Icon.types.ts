export interface IconProps {
  /**
   * Icon name as used in Figma, e.g. "li:atom", "li:chevron-right", "OpenAI",
   * "in_planung", "PREA-Logo". Case-insensitive; the "li:" prefix is optional.
   * Names not in the Figma registry fall back to lucide-react.
   */
  name: string;
  /** Size in px — Figma sizes: 10 12 14 16 18 20 22 24 28 32 36 48 */
  size?: number;
  /**
   * Colour for monochrome icons (stroke or fill). Defaults to currentColor so it
   * inherits from CSS. Ignored by multi-colour icons (brand logos, status badges).
   */
  color?: string;
  /** Stroke width for line icons — Figma uses 1.5 by default */
  strokeWidth?: number;
  /** Accessible label. When omitted the icon is aria-hidden (decorative). */
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}
