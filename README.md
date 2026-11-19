# Sổ chi tiêu cá nhân

- **Họ tên: Ngô Trong Cường
- **Mã sinh viên: B25DCTV011

Ứng dụng ghi lại các khoản chi hằng ngày (nội dung, số tiền, loại, ngày chi), xây dựng hai lần:

## Cách chạy

Yêu cầu: Node.js >= 18.

### Phần A
```bash
cd part-a-class
npm install
npm run dev
```

### Phần B
1. Tạo project trên [mockapi.io](https://mockapi.io), thêm resource **`expenses`** với các field:
   `content` (String), `amount` (Number), `category` (String), `date` (String, dạng `YYYY-MM-DD`).
2. Sao chép `.env.example` thành `.env` và điền URL resource:
   ```
   VITE_API_URL=https://<id>.mockapi.io/api/v1/expenses
   ```
3. Chạy:
   ```bash
   cd part-b-hooks
   npm install
   npm run dev
   ```

Mở địa chỉ Vite in ra (mặc định http://localhost:5173).

## Chức năng

**Phần A (Class):** `App` giữ state (danh sách + loại đang lọc); `Clock` dùng `componentDidMount`/`componentWillUnmount` (nút "Ẩn đồng hồ" để kiểm tra dừng đúng); form có validate; danh sách dùng `key`, xóa có `window.confirm`; lọc theo loại + tổng tiền; tiêu đề tab cập nhật bằng `componentDidUpdate`.

**Phần B (Hooks):** viết lại bằng `useState`/`useEffect`; `useFetch` (GET/POST/DELETE, trạng thái tải + lỗi + nút thử lại); `useRef` focus ô nhập sau khi thêm; `useContext` cho chế độ sáng/tối.

**Nâng cao (Phần B):** `useClock`, thống kê tổng tiền theo loại (`Stats`), ô tìm kiếm có debounce 400 ms (`useDebounce`).

## Hooks khắc phục thách thức của Class như thế nào?

1. **Logic bị xé theo vòng đời.** Ở Class, tiêu đề tab phải viết ở cả `componentDidMount` và `componentDidUpdate` (kèm so sánh `prevState`); đồng hồ thì `setInterval` ở một nơi, `clearInterval` ở nơi khác. Với Hooks, mỗi việc gói trong một `useEffect` (khai báo phụ thuộc `[totalAll]`, cleanup ngay bên dưới), nên dễ đọc và khó quên dọn dẹp.
2. **Tái sử dụng logic.** Logic đồng hồ trong Class gắn chặt vào `Clock`; muốn dùng lại phải dùng HOC/render props. Ở Phần B, `useClock`, `useDebounce`, `useFetch` là hàm thường, dùng ở bất kỳ component nào mà không đổi cây component.
3. **`this` và `bind`.** Class phải dùng arrow function field cho `handleChange`, `handleDelete`..., dễ sai `this`. Function Component không có `this`, state đọc trực tiếp.
4. **Chia sẻ giá trị toàn cục.** Chế độ sáng/tối ở Class cần `contextType` (chỉ một context) hoặc `Consumer` lồng nhau; với `useContext` chỉ một dòng `useTheme()` ở `Header`.
5. **Gọi API có loading/lỗi.** `useFetch` gom `data/loading/busy/error`, hủy request bằng `AbortController` khi unmount; ở Class phải lặp lại state và logic này trong từng component cần gọi API.
