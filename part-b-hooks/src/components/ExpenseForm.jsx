import React, { useRef, useState } from 'react';
import { CATEGORIES, todayStr, validateExpense } from '../utils.js';

const initialForm = () => ({ content: '', amount: '', category: CATEGORIES[0], date: todayStr() });

export default function ExpenseForm({ onAdd, busy }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const contentRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateExpense(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const ok = await onAdd({
      content: form.content.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
    });
    if (ok) {
      setForm(initialForm());
      contentRef.current?.focus(); // focus lại ô nhập sau khi thêm thành công
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h2>Thêm khoản chi</h2>
      <div className="form">
        <div className="field full">
          <label htmlFor="content">Nội dung</label>
          <input id="content" name="content" ref={contentRef} value={form.content} onChange={handleChange} placeholder="VD: Cà phê với bạn" />
          {errors.content && <div className="error">{errors.content}</div>}
        </div>
        <div className="field">
          <label htmlFor="amount">Số tiền (đ)</label>
          <input id="amount" name="amount" type="number" min="0" value={form.amount} onChange={handleChange} />
          {errors.amount && <div className="error">{errors.amount}</div>}
        </div>
        <div className="field">
          <label htmlFor="category">Loại</label>
          <select id="category" name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="date">Ngày chi</label>
          <input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
          {errors.date && <div className="error">{errors.date}</div>}
        </div>
        <div className="field" style={{ alignSelf: 'end' }}>
          <button type="submit" className="primary" style={{ width: '100%' }} disabled={busy}>
            {busy ? 'Đang xử lý...' : 'Thêm'}
          </button>
        </div>
      </div>
    </form>
  );
}
