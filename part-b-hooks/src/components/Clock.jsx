import React from 'react';
import useClock from '../hooks/useClock.js';

export default function Clock() {
  const now = useClock();
  return <span className="clock">🕒 {now.toLocaleTimeString('vi-VN')}</span>;
}
