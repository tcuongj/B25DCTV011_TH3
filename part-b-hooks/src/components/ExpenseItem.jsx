import React from 'react';
import { formatDate, formatMoney } from '../utils.js';

export default function ExpenseItem({ expense, onDelete, busy }) {
  return (
    <li className="item">
      <div className="item-main">
        <span>{expense.content}</span>
        <span className="item-meta">{expense.category} · {formatDate(expense.date)}</span>
      </div>
      <div className="item-right">
        <span className="amount">{formatMoney(expense.amount)}</span>
        <button className="danger" disabled={busy} onClick={() => onDelete(expense.id)}>Xóa</button>
      </div>
    </li>
  );
}
