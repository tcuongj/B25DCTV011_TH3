import React, { Component } from 'react';
import { ALL, CATEGORIES } from '../utils.js';

class FilterBar extends Component {
  render() {
    const { current, onChange } = this.props;
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
}

export default FilterBar;
