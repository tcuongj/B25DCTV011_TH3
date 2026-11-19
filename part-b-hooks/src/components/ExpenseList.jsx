import React from 'react';
import ExpenseItem from './ExpenseItem.jsx';
import { ALL, formatMoney } from '../utils.js';

export default function ExpenseList({ expenses, total, filter, onDelete, busy }) {
  return (
    <div>
      {expenses.length === 0 ? (
        <div className="empty">Không có khoản chi nào.</div>
      ) : (
        <ul className="list">
          {expenses.map((e) => (
            <ExpenseItem key={e.id} expense={e} onDelete={onDelete} busy={busy} />
          ))}
        </ul>
      )}
      <div className="total">
        <span>Tổng tiền{filter !== ALL ? ` (${filter})` : ''}</span>
        <span>{formatMoney(total)}</span>
      </div>
    </div>
  );
}
