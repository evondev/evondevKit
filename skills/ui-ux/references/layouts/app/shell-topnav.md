# Menu ngang (Top navigation) ⚑

Khung app của bộ mặt **Topbar** (`styles.md`, `P13`): không sidebar, các mục chính nằm thành
một hàng trong header.

```
┌────────────────────────────────────────────────────────────────────┐
│ ◐ Evondev   Tổng quan  [Đơn hàng]  Khách hàng  Báo cáo    🔍 🔔 ◐ │  <- header trắng, border-b
└────────────────────────────────────────────────────────────────────┘
 nền xám            ┌──────────────────────────────┐
                    │  nội dung giữa màn, max-w-6xl │
                    └──────────────────────────────┘
```

- **Chỉ dùng khi có từ 6 mục chính trở xuống, không nhóm lồng.** Trang con của một mục (Báo
  cáo › Doanh thu, Báo cáo › Kho) là tab trong đầu trang của mục đó, không phải menu xổ từ
  header. Nhiều mục hơn hay có nhóm: khung có sidebar.
- **Header `h-14` nền `--surface`, `border-b border-border`**, chạy hết bề ngang. Trái: logo +
  tên sản phẩm; liền sau là hàng link, cách tên `ml-6`. Phải: tìm (nút icon mở command palette,
  `overlay.md`), thông báo, avatar (`Nhóm nút bên phải thanh header`).
- **Link**: `h-9 rounded-lg px-3 text-sm text-foreground/70`, rê `hover:bg-item-hover
  hover:text-foreground`, đang chọn `bg-secondary font-medium text-foreground` và
  `aria-current="page"`. Không gạch chân màu nhấn dưới mục đang chọn: một tín hiệu nền như sidebar
  là đủ, cùng ngôn ngữ với mục đang chọn ở mọi chỗ khác của app (`N5`).
- **Hàng link không bao giờ xuống dòng.** Khổ giữa (`md`–`lg`) không đủ chỗ thì mục cuối gom vào
  một nút **"Thêm"** có `ChevronDown` mở menu (`overlay.md`). Probe báo "hàng header rớt dòng"
  là lỗi phải sửa.
- **Nội dung giữa màn**: `mx-auto w-full max-w-6xl px-4 sm:px-6`. Không có sidebar để bám, nên
  ngoại lệ có tên của dòng "nội dung bám sidebar" trong `shell.md`. Trang bảng rộng thì `max-w-7xl`.
- **Dưới `md`**: hàng link ẩn, thay bằng ☰ mở panel trượt trái có đủ mục (như sidebar dưới `lg`),
  hay thanh điều hướng dưới nếu từ 5 mục trở xuống.
