import React from 'react';
import type { BreadcrumbProps } from './Breadcrumb.types';
import './Breadcrumb.css';

/**
 * PREA Breadcrumb — Navigation trail showing the user's location.
 *
 * The last item is always rendered as the active (current) page.
 * All preceding items render as links (if href is provided) or
 * plain interactive text.
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { key: 'home', label: 'Home', href: '/' },
 *     { key: 'products', label: 'Products', href: '/products' },
 *     { key: 'item', label: 'Item Detail' },
 *   ]}
 * />
 * ```
 */
export function Breadcrumb({
  items,
  separator = '/',
  className = '',
  style,
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" style={style}>
      <ol
        className={['prea-breadcrumb', className].filter(Boolean).join(' ')}
      >
        {items.map((item, index) => {
          const isActive = index === items.length - 1;

          return (
            <li
              key={item.key}
              className={[
                'prea-breadcrumb__item',
                isActive ? 'prea-breadcrumb__item--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {/* Separator before every item except the first */}
              {index > 0 && (
                <span
                  className="prea-breadcrumb__separator"
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}

              {/* Crumb — link or span */}
              {!isActive && item.href ? (
                <a
                  href={item.href}
                  className="prea-breadcrumb__link"
                  aria-current={undefined}
                >
                  {item.icon && (
                    <span className="prea-breadcrumb__icon">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                </a>
              ) : (
                <span
                  className="prea-breadcrumb__link"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.icon && (
                    <span className="prea-breadcrumb__icon">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
