import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import FilterBar from './components/FilterBar.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import Stats from './components/Stats.jsx';
import useFetch from './hooks/useFetch.js';
import useDebounce from './hooks/useDebounce.js';
import { ALL, formatMoney } from './utils.js';

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const { data, loading, busy, error, add, remove, refetch } = useFetch(API_URL);
  const [filter, setFilter] = useState(ALL);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  // mockapi có thể trả amount dạng chuỗi -> ép về số; mới nhất lên đầu
  const expenses = useMemo(
    () => data.map((e) => ({ ...e, amount: Number(e.amount) })).sort((a, b) => b.date.localeCompare(a.date)),
    [data]
  );

  const visible = useMemo(() => {
    const kw = debouncedSearch.trim().toLowerCase();
    return expenses.filter(
      (e) => (filter === ALL || e.category === filter) && e.content.toLowerCase().includes(kw)
    );
  }, [expenses, filter, debouncedSearch]);

  const totalAll = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const totalVisible = useMemo(() => visible.reduce((s, e) => s + e.amount, 0), [visible]);

  // Tiêu đề tab = tổng chi (thay cho componentDidMount + componentDidUpdate)
  useEffect(() => {
    document.title = `Tổng chi: ${formatMoney(totalAll)}`;
  }, [totalAll]);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa khoản chi này?')) remove(id);
  };

  return (
    <div className="app">
      <Header />
      <ExpenseForm onAdd={add} busy={busy} />

      {error && (
        <div className="card status fail">
          ⚠️ {error} <button onClick={refetch}>Thử lại</button>
        </div>
      )}

      <Stats expenses={expenses} />

      <div className="card">
        <h2>Danh sách khoản chi</h2>
        <div className="toolbar">
          <input
            type="search"
            placeholder="Tìm theo nội dung..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <FilterBar current={filter} onChange={setFilter} />
        {loading ? (
          <div className="status">Đang tải dữ liệu...</div>
        ) : (
          <ExpenseList
            expenses={visible}
            total={totalVisible}
            filter={filter}
            onDelete={handleDelete}
            busy={busy}
          />
        )}
      </div>
    </div>
  );
}
