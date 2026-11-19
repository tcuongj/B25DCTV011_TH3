import { useCallback, useEffect, useState } from 'react';

const HEADERS = { 'Content-Type': 'application/json' };

async function parse(res) {
  if (!res.ok) throw new Error(`Lỗi ${res.status}: ${res.statusText || 'máy chủ không phản hồi đúng'}`);
  return res.json();
}

/**
 * useFetch(url) – lấy danh sách (GET) và cung cấp add (POST), remove (DELETE).
 * loading: đang tải danh sách | busy: đang thêm/xóa | error: thông báo lỗi
 */
export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!url) {
      setError('Chưa cấu hình VITE_API_URL (xem README).');
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then(parse)
      .then(setData)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message || 'Không thể kết nối máy chủ');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort(); // hủy request khi unmount / đổi url
  }, [url, reloadKey]);

  const mutate = useCallback(async (path, options) => {
    setBusy(true);
    setError(null);
    try {
      return await parse(await fetch(url + path, { headers: HEADERS, ...options }));
    } catch (err) {
      setError(err.message || 'Không thể kết nối máy chủ');
      return null;
    } finally {
      setBusy(false);
    }
  }, [url]);

  const add = useCallback(async (item) => {
    const created = await mutate('', { method: 'POST', body: JSON.stringify(item) });
    if (created) setData((prev) => [...prev, created]);
    return Boolean(created);
  }, [mutate]);

  const remove = useCallback(async (id) => {
    const deleted = await mutate(`/${id}`, { method: 'DELETE' });
    if (deleted) setData((prev) => prev.filter((x) => x.id !== id));
    return Boolean(deleted);
  }, [mutate]);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  return { data, loading, busy, error, add, remove, refetch };
}
