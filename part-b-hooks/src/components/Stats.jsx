import React, { useMemo } from 'react';
import { CATEGORIES, formatMoney } from '../utils.js';

export default function Stats({ expenses }) {
  const byCategory = useMemo(() => {
    const sums = Object.fromEntries(CATEGORIES.map((c) => [c, 0]));
    expenses.forEach((e) => { if (e.category in sums) sums[e.category] += e.amount; });
    return sums;
  }, [expenses]);

  return (
    <div className="card">
      <h2>Thống kê theo loại</h2>
      <div className="stats">
        {CATEGORIES.map((c) => (
          <div className="stat" key={c}>
            <span>{c}</span>
            <strong>{formatMoney(byCategory[c])}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
