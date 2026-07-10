import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { registry, categories } from '../../registry';

// Coming-soon placeholder components (not yet coded)
const comingSoon = [
  { id: 'prea-button', name: 'PREAButton', category: 'Inputs' },
];

export function Sidebar() {
  const [search, setSearch] = useState('');

  const allItems = useMemo(() => {
    const coded = Object.values(registry).map((c) => ({
      id: c.id,
      name: c.name,
      category: c.category,
      status: c.status,
      available: true,
    }));
    const planned = comingSoon.map((c) => ({
      ...c,
      status: 'coming-soon' as const,
      available: false,
    }));
    return [...coded, ...planned];
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return allItems;
    const q = search.toLowerCase();
    return allItems.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [search, allItems]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof filtered> = {};
    for (const item of filtered) {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    }
    return map;
  }, [filtered]);

  return (
    <nav className="sidebar" aria-label="Component navigation">
      <div className="sidebar__search-wrap">
        <div className="sidebar__search-wrapper">
          <svg
            className="sidebar__search-icon"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="sidebar__search"
            type="search"
            placeholder="Search components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search components"
          />
        </div>
      </div>

      <div className="sidebar__content">
        {Object.entries(grouped).length === 0 && (
          <p style={{ padding: '12px 8px', fontSize: 13, color: 'var(--text-muted)' }}>
            No components found.
          </p>
        )}

        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="sidebar__section">
            <div className="sidebar__section-label">{category}</div>
            {items.map((item) =>
              item.available ? (
                <NavLink
                  key={item.id}
                  to={`/${item.id}`}
                  className={({ isActive }) =>
                    ['sidebar__item', isActive ? 'sidebar__item--active' : ''].join(' ')
                  }
                >
                  {item.name}
                  <span
                    className={`sidebar__status sidebar__status--${item.status}`}
                  >
                    {item.status === 'stable' ? 'Stable' : item.status === 'beta' ? 'Beta' : 'Soon'}
                  </span>
                </NavLink>
              ) : (
                <div
                  key={item.id}
                  className="sidebar__item sidebar__item--disabled"
                >
                  {item.name}
                  <span className="sidebar__status sidebar__status--coming-soon">
                    Soon
                  </span>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
