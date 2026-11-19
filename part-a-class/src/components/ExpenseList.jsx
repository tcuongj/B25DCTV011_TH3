import React, { Component } from 'react';
import ExpenseItem from './ExpenseItem.jsx';
import { ALL, formatMoney } from '../utils.js';

class ExpenseList extends Component {
  render() {
    const { expenses, total, filter, onDelete } = this.props;
    return (
      <div>
        {expenses.length === 0 ? (
          <div className="empty">Chưa có khoản chi nào.</div>
        ) : (
          <ul className="list">
            {expenses.map((e) => (
              <ExpenseItem key={e.id} expense={e} onDelete={onDelete} />
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
}

export default ExpenseList;
