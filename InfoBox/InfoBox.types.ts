import React from 'react';

// ─── InfoBox (Figma "info_box") ────────────────────────────────────────────

export interface InfoBoxProps {
  /** Small grey label above the value (11px, head-text color) */
  label: React.ReactNode;
  /** The KPI / value (16px medium, text color) */
  value: React.ReactNode;
  /** Width. Figma default 155px. Use "100%" to fill. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

// ─── InfoBoxModule (Figma "info_box_module") ───────────────────────────────

export interface InfoBoxModuleProps {
  /** Usually a list of <InfoBox />. Items wrap onto new lines with a 12px gap. */
  children?: React.ReactNode;
  /** Width. Figma default 839px. Use "100%" to fill. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

// ─── BoxLink (Figma "box_link") ────────────────────────────────────────────

export interface BoxLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'onClick'> {
  children: React.ReactNode;
  /** When omitted, the link renders as a <button> and only fires onClick. */
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

// ─── NavInfoCard (Figma "nav_InfoCard") ────────────────────────────────────

export interface NavInfoCardLink {
  key: string;
  label: React.ReactNode;
  href?: string;
  onClick?: (key: string) => void;
}

export interface NavInfoCardProps {
  /** Card title (18px medium) */
  title: React.ReactNode;
  /** Description (13px regular, sub-text color) */
  description?: React.ReactNode;
  /** Column of <BoxLink>s, 12px apart */
  links?: NavInfoCardLink[];
  /** Width. Figma default 283px. Use "100%" to fill. */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
