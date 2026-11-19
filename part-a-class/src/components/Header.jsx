import React, { Component } from 'react';
import Clock from './Clock.jsx';

class Header extends Component {
  state = { showClock: true };

  toggleClock = () => this.setState((s) => ({ showClock: !s.showClock }));

  render() {
    const { showClock } = this.state;
    return (
      <header className="card header">
        <h1>💰 Sổ chi tiêu cá nhân</h1>
        <div className="header-right">
          {showClock && <Clock />}
          <button onClick={this.toggleClock}>{showClock ? 'Ẩn' : 'Hiện'} đồng hồ</button>
        </div>
      </header>
    );
  }
}

export default Header;
