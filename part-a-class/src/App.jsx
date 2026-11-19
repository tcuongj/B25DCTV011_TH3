import React, { Component } from 'react';
import Header from './components/Header.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import FilterBar from './components/FilterBar.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import { ALL, formatMoney } from './utils.js';

// Dữ liệu mẫu viết sẵn trong code
const SAMPLE_EXPENSES = [
  { id: 1, content: 'Cơm trưa', amount: 35000, category: 'Ăn uống', date: '2026-11-17' },
  { id: 2, content: 'Vé xe buýt tháng', amount: 120000, category: 'Đi lại', date: '2026-11-16' },
  { id: 3, content: 'Mua giáo trình React', amount: 89000, category: 'Học tập', date: '2026-11-15' },
  { id: 4, content: 'Xem phim', amount: 95000, category: 'Giải trí', date: '2026-11-14' },
];

class App extends Component {
  // App giữ state: danh sách khoản chi + loại đang lọc
  state = { expenses: SAMPLE_EXPENSES, filter: ALL };

  componentDidMount() {
    this.updateTitle();
  }

  // Chỉ cập nhật tiêu đề tab khi danh sách thật sự thay đổi
  componentDidUpdate(prevProps, prevState) {
    if (prevState.expenses !== this.state.expenses) this.updateTitle();
  }

  getTotal(list) {
    return list.reduce((sum, e) => sum + e.amount, 0);
  }

  updateTitle() {
    document.title = `Tổng chi: ${formatMoney(this.getTotal(this.state.expenses))}`;
  }

  handleAdd = (data) => {
    const expense = { id: Date.now(), ...data };
    this.setState((prev) => ({ expenses: [expense, ...prev.expenses] }));
  };

  handleDelete = (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa khoản chi này?')) return;
    this.setState((prev) => ({ expenses: prev.expenses.filter((e) => e.id !== id) }));
  };

  handleFilter = (filter) => this.setState({ filter });

  render() {
    const { expenses, filter } = this.state;
    const visible = filter === ALL ? expenses : expenses.filter((e) => e.category === filter);

    return (
      <div className="app">
        <Header />
        <ExpenseForm onAdd={this.handleAdd} />
        <div className="card">
          <h2>Danh sách khoản chi</h2>
          <FilterBar current={filter} onChange={this.handleFilter} />
          <ExpenseList
            expenses={visible}
            total={this.getTotal(visible)}
            filter={filter}
            onDelete={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}

export default App;
