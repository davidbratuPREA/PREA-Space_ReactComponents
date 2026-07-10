import React from 'react';
import type { PropDef } from '../../registry/types';

interface PropsTableProps {
  props: PropDef[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) return null;

  return (
    <table className="props-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map((p) => (
          <tr key={p.name}>
            <td>
              <span className="props-table__prop">{p.name}</span>
            </td>
            <td>
              <span className="props-table__type">{p.type}</span>
            </td>
            <td>
              <span className="props-table__default">{p.default}</span>
            </td>
            <td style={{ textAlign: 'center' }}>
              {p.required ? (
                <span style={{ color: '#f87171', fontWeight: 600 }}>Yes</span>
              ) : (
                <span style={{ color: 'var(--text-muted)' }}>No</span>
              )}
            </td>
            <td>{p.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
