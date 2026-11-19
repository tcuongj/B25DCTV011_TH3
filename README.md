# SỔ CHI TIÊU CÁ NHÂN

- **Họ tên:** Ngô Trọng Cường
- **Mã sinh viên:** B25DCTV011

## 1. Giới thiệu

Xây dựng ứng dụng quản lý chi tiêu cá nhân, cho phép người dùng thêm, xóa, tìm kiếm và lọc các khoản chi theo nội dung, số tiền, loại chi tiêu và ngày tháng.

Ứng dụng được thực hiện theo hai cách: Class Component và Function Component sử dụng React Hooks.

## 2. Cách chạy chương trình

**Yêu cầu:** Node.js phiên bản 18 trở lên.

**Phần A:**
```bash
cd part-a-class
npm install
npm run dev
```

**Phần B:**

- Tạo resource `expenses` trên MockAPI với các trường `content`, `amount`, `category`, `date`.
- Sao chép `.env.example` thành `.env` và điền URL API:

```env
VITE_API_URL=https://<id>.mockapi.io/api/v1/expenses
```

Chạy chương trình:

```bash
cd part-b-hooks
npm install
npm run dev
```

Mở địa chỉ Vite cung cấp, mặc định là `http://localhost:5173`.

## 3. Chức năng chính

**Phần A – Class Component:**
- Quản lý và hiển thị danh sách chi tiêu.
- Thêm, xóa và lọc khoản chi.
- Kiểm tra dữ liệu nhập và tính tổng tiền.
- Sử dụng vòng đời component để tạo đồng hồ và cập nhật tiêu đề trang.

**Phần B – React Hooks:**
- Sử dụng `useState`, `useEffect`, `useRef`, `useContext`.
- Dùng `useFetch` để lấy, thêm và xóa dữ liệu từ API.
- Hỗ trợ giao diện sáng/tối.
- Bổ sung đồng hồ, thống kê chi tiêu và tìm kiếm có debounce 400 ms.

## 4. Hooks khắc phục hạn chế của Class như thế nào?

1. **Quản lý vòng đời:** `useEffect` giúp gom logic và xử lý dọn dẹp tại cùng một nơi.
2. **Tái sử dụng code:** Có thể tạo custom hook như `useFetch`, `useClock`, `useDebounce` để dùng lại ở nhiều component.
3. **Xử lý sự kiện:** Không cần sử dụng `this` hay `bind` như Class Component.
4. **Chia sẻ dữ liệu:** `useContext` giúp lấy dữ liệu từ Context đơn giản hơn.
5. **Gọi API:** Có thể quản lý dữ liệu, trạng thái tải và lỗi tập trung trong `useFetch`, đồng thời hủy request khi cần.

## 5. Kết luận

Qua bài thực hành, em hiểu rõ hơn sự khác nhau giữa Class Component và Function Component. React Hooks giúp code ngắn gọn, dễ quản lý và tái sử dụng hơn, đặc biệt khi xử lý state, vòng đời component và API.
