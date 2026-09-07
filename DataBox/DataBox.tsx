import React from 'react';
import type { DataBoxProps } from './DataBox.types';
import { DataBoxItem } from './DataBoxItem';
import './DataBox.css';

/**
 * DataBox
 *
 * Matches Figma "DataBox" (Item = DataBox | AG).
 *
 *   ┌─ bg #EDEDED · border #E1E1E1 · radius 4 · padding 10 ───────────────┐
 *   │  Items (left)                          subItems (right, top+bottom)  │
 *   │  ┌ infoGroup ┐  gap 16 between groups  ┌ subInfoGroup ┐             │
 *   │  │ Head      │  gap 8 between rows     │ sub value    │  (top)      │
 *   │  │ Value     │                         └──────────────┘             │
 *   │  └───────────┘                         ┌ subInfoGroup ┐             │
 *   │                                        │ sub value    │  (bottom)   │
 *   └────────────────────────────────────────────────────────────────────┘
 *
 * • Data-driven: pass `groups` (+ optional `subGroups`).
 * • Free-form:   pass `children` instead — this is the Figma "Item=AG" variant,
 *                a slot meant to host an AG Grid table.
 */
export function DataBox({
  groups,
  subGroups,
  children,
  minHeight,
  className,
  style,
}: DataBoxProps) {
  const isCustom = children !== undefined && children !== null;

  const cls = ['prea-databox', isCustom && 'prea-databox--custom', className]
    .filter(Boolean)
    .join(' ');

  const mergedStyle: React.CSSProperties | undefined =
    minHeight !== undefined ? { minHeight, ...style } : style;

  if (isCustom) {
    return (
      <div className={cls} style={mergedStyle}>
        <div className="prea-databox__custom">{children}</div>
      </div>
    );
  }

  return (
    <div className={cls} style={mergedStyle}>
      {/* Left column — info groups */}
      <div className="prea-databox__items">
        {(groups ?? []).map((g, gi) => (
          <div className="prea-databox__group" key={g.key ?? gi}>
            <DataBoxItem variant="head">{g.head}</DataBoxItem>
            {g.values.map((v, vi) => (
              <DataBoxItem variant="value" key={vi}>
                {v}
              </DataBoxItem>
            ))}
          </div>
        ))}
      </div>

      {/* Right column — sub values (first group top, last group bottom) */}
      {subGroups && subGroups.length > 0 && (
        <div className="prea-databox__subitems">
          {subGroups.map((sg, si) => (
            <div className="prea-databox__subgroup" key={si}>
              {sg.map((v, vi) => (
                <DataBoxItem variant="subValue" key={vi}>
                  {v}
                </DataBoxItem>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
