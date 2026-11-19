import React, { useState } from 'react';
import Clock from './Clock.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Header() {
  const [showClock, setShowClock] = useState(true);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="card header">
      <h1>💰 Sổ chi tiêu cá nhân</h1>
      <div className="header-right">
        {showClock && <Clock />}
        <button onClick={() => setShowClock((s) => !s)}>{showClock ? 'Ẩn' : 'Hiện'} đồng hồ</button>
        <button onClick={toggleTheme}>{theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}</button>
      </div>
    </header>
  );
}
