import React, { Component } from 'react';
import { CATEGORIES, todayStr, validateExpense } from '../utils.js';

const initialForm = () => ({ content: '', amount: '', category: CATEGORIES[0], date: todayStr() });

class ExpenseForm extends Component {
  state = { form: initialForm(), errors: {} };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((s) => ({ form: { ...s.form, [name]: value } }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.state;
    const errors = validateExpense(form);
    this.setState({ errors });
    if (Object.keys(errors).length > 0) return;

    this.props.onAdd({
      content: form.content.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
    });
    this.setState({ form: initialForm(), errors: {} });
  };

  render() {
    const { form, errors } = this.state;
    return (
      <form className="card" onSubmit={this.handleSubmit} noValidate>
        <h2>Thêm khoản chi</h2>
        <div className="form">
          <div className="field full">
            <label htmlFor="content">Nội dung</label>
            <input id="content" name="content" value={form.content} onChange={this.handleChange} placeholder="VD: Cà phê với bạn" />
            {errors.content && <div className="error">{errors.content}</div>}
          </div>
          <div className="field">
            <label htmlFor="amount">Số tiền (đ)</label>
            <input id="amount" name="amount" type="number" min="0" value={form.amount} onChange={this.handleChange} />
            {errors.amount && <div className="error">{errors.amount}</div>}
          </div>
          <div className="field">
            <label htmlFor="category">Loại</label>
            <select id="category" name="category" value={form.category} onChange={this.handleChange}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="date">Ngày chi</label>
            <input id="date" name="date" type="date" value={form.date} onChange={this.handleChange} />
            {errors.date && <div className="error">{errors.date}</div>}
          </div>
          <div className="field" style={{ alignSelf: 'end' }}>
            <button type="submit" className="primary" style={{ width: '100%' }}>Thêm</button>
          </div>
        </div>
      </form>
    );
  }
}

export default ExpenseForm;
