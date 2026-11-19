import React from 'react';
import { ALL, CATEGORIES } from '../utils.js';

export default function FilterBar({ current, onChange }) {
  return (
    <div className="filters">
      {[ALL, ...CATEGORIES].map((c) => (
        <button key={c} className={c === current ? 'active' : ''} onClick={() => onChange(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}
