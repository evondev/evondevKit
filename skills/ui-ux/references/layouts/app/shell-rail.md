# Dải icon (Rail) ⚑

Khung app của bộ mặt **Rail** (`styles.md`, `P13`): sidebar **luôn** ở dạng dải icon `w-16`,
không có nút mở rộng. Mọi luật của mục **Thu gọn sidebar** ngay dưới áp nguyên (icon đứng yên
tâm 32px, tooltip tên mục, chấm chỉ cho số cần xử lý, gạch ngắn thay nhãn nhóm, mép mờ khi còn
mục khuất), trừ phần chuyển động mở ra.

- **Chỉ dùng khi có từ 8 mục chính trở xuống, không nhóm lồng.** Người dùng phải nhận ra mục
  bằng icon; quá 8 icon thì phải rê từng cái mới biết, lúc đó cần nhãn chữ: khuyên Clean hay Dark
  Sidebar thay vì Rail.
- **Icon nằm đúng tâm ô 40×40.** Bảng tâm 32px ở mục Thu gọn tính cho icon `size-4` (16px): đệm
  `12 + 12 + 8`. Dự án dùng icon 18px hay 20px mà giữ `px-3` thì tâm lệch phải 1–2px, nhìn dải
  icon thấy rõ mỗi icon xô về một phía trong nền đang chọn (chủ dự án thấy trên trang
  mẫu). Icon khác 16px thì đệm trái của link là `(40 − cỡ icon) / 2`; ô tìm có viền 1px thì
  trừ thêm 1px. Đo: tâm icon trừ tâm ô phải bằng 0.
- **Icon phải phân biệt được không cần chữ**: hai mục cùng một icon (Báo cáo và Thống kê cùng
  biểu đồ cột) là đổi một cái. Tooltip là phụ, không phải cách duy nhất biết mục là gì.
- **Đầu dải chỉ có logo** `size-8`, không tên tổ chức; chân dải chỉ avatar. Tên tổ chức, tên
  người vào tooltip và menu tài khoản.
- **Vùng nội dung lấy lại 176px bề ngang** so với sidebar `w-60`: đó là lý do chọn Rail (bản đồ,
  lịch, trình soạn, bảng nhiều cột). Đừng lấp phần dư bằng khoảng trắng hai bên.
- **Dưới `lg`**: không giữ dải icon. Từ 5 mục trở xuống thì thanh điều hướng dưới (mục trên),
  nhiều hơn thì ☰ mở panel trượt **có nhãn chữ** như sidebar thường: trên điện thoại không có
  rê chuột để đọc tooltip.

**Biến thể có nhãn** (`rail-labeled`): icon trên, chữ nhỏ dưới, không cần rê mới biết mục là gì.

```
┌────────┐
│   ◐    │  <- logo
│        │
│  [▤]   │  <- nền đang chọn chỉ tô ô icon, không tô cả mục
│ Việc   │
│   ⚙    │
│Cài đặt │
│   ◐    │  <- avatar ghim đáy
└────────┘
```

- **Dùng khi người dùng chưa thuộc icon** (app mới với họ, người không rành máy, mở app vài lần
  một tuần), hoặc icon của app khó đoán. Người dùng thành thạo mở app cả ngày thì bản chỉ icon:
  nhãn thành chữ thừa sau tuần đầu. Bộ mặt Rail khuyên một trong hai theo người dùng ở `U1`.
- **Dải `w-20` (80px)**, mục `flex flex-col items-center gap-1 py-1.5`, cả mục là vùng bấm
  (`I29`). Ô icon `size-10 rounded-xl`, icon `size-5` (20px) giữa ô: có chữ đi kèm thì icon
  16px trông lọt thỏm trong ô 40px (đo trên trang mẫu); **nền rê và nền đang chọn chỉ tô ô
  icon** (`group-hover:bg-item-hover`, đang chọn `bg-secondary`), không tô cả mục: tô cả khối
  80×60 là một mảng xám to nhất cột. Nhãn `text-xs text-foreground/70`, đang chọn `font-medium
  text-foreground`.
- **Nhãn một dòng, tối đa ~10 ký tự** ("Việc", "Khách hàng", "Cài đặt"). Nhãn dài hơn bị cắt hay
  xuống hai dòng thì chọn chữ ngắn hơn; không rút được thì dùng sidebar có chữ, không ép vào
  dải. Trần 7 mục, không phải 8: mỗi mục cao gần gấp rưỡi mục chỉ icon.
- **Không tooltip** (chữ đã hiện), vẫn giữ `aria-current`. Số cần xử lý là chấm ở góc trên phải
  ô icon như bản chỉ icon.
- **Dưới `lg`** thành thanh điều hướng dưới: cùng dáng icon trên chữ dưới, người dùng không phải
  học lại.
