import { useEffect, useState } from 'react';

// Trả về thời gian hiện tại, cập nhật mỗi giây; tự dọn interval khi unmount
export default function useClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}
