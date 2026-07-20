import type { ReactNode } from 'react';

export interface DividerProps {
  /** Line orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Optional text label in the centre of the line */
  label?: ReactNode;
  /** Position of the label along the line */
  labelPosition?: 'left' | 'center' | 'right';
  /** Render the line as dashed instead of solid */
  dashed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
