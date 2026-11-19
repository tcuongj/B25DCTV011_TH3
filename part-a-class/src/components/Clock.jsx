import React, { Component } from 'react';

class Clock extends Component {
  state = { now: new Date() };

  componentDidMount() {
    this.timerId = setInterval(() => this.setState({ now: new Date() }), 1000);
  }

  // Dọn interval khi component bị gỡ (ẩn đồng hồ) để không rò rỉ bộ nhớ
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return <span className="clock">🕒 {this.state.now.toLocaleTimeString('vi-VN')}</span>;
  }
}

export default Clock;
