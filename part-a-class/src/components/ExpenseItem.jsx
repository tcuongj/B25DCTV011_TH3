import React, { Component } from 'react';
import { formatDate, formatMoney } from '../utils.js';

class ExpenseItem extends Component {
  render() {
    const { expense, onDelete } = this.props;
    return (
      <li className="item">
        <div className="item-main">
          <span>{expense.content}</span>
          <span className="item-meta">{expense.category} · {formatDate(expense.date)}</span>
        </div>
        <div className="item-right">
          <span className="amount">{formatMoney(expense.amount)}</span>
          <button className="danger" onClick={() => onDelete(expense.id)}>Xóa</button>
        </div>
      </li>
    );
  }
}

export default ExpenseItem;
