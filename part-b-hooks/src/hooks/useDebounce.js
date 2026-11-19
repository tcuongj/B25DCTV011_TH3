import { useEffect, useState } from 'react';

// Chỉ trả về giá trị mới sau khi ngừng thay đổi `delay` ms
export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
