export const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];
export const ALL = 'Tất cả';

export const formatMoney = (n) => `${Number(n).toLocaleString('vi-VN')} đ`;
export const formatDate = (d) => d.split('-').reverse().join('/');

// Ngày hôm nay theo giờ địa phương, dạng YYYY-MM-DD
export const todayStr = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

// Trả về object lỗi, rỗng nếu hợp lệ
export const validateExpense = ({ content, amount, date }) => {
  const errors = {};
  if (!content.trim()) errors.content = 'Nội dung không được để trống';
  const n = Number(amount);
  if (amount === '' || !Number.isFinite(n) || n <= 0) {
    errors.amount = 'Số tiền phải là số lớn hơn 0';
  }
  if (!date) errors.date = 'Vui lòng chọn ngày chi';
  else if (date > todayStr()) errors.date = 'Ngày chi không được ở tương lai';
  return errors;
};
