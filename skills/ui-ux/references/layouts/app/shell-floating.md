# Sidebar nổi (Floating) ⚑

Khung app của bộ mặt **Float** (`styles.md`, `P13`). Ngược với Khung bọc: ở đây **sidebar** là
khối trắng tách khỏi mép, nội dung nằm thẳng trên nền xám như khung thường.

```
 nền xám --background, cả màn
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░ ┌────────────┐ ░  Hoá đơn                 [chuông] [+] ░   <- header không thanh, nằm trên nền xám
░ │ ◐ Tổ chức  │ ░                                       ░
░ ├────────────┤ ░  ┌────────┐ ┌────────┐ ┌────────┐     ░
░ │ ⌂ Tổng quan│ ░  │ card   │ │ card   │ │ card   │     ░   <- card trắng như khung thường
░ │ ▤ Hoá đơn  │ ░  └────────┘ └────────┘ └────────┘     ░
░ │            │ ░                                       ░
░ │ ⚙ Cài đặt  │ ░                                       ░
░ └────────────┘ ░                                       ░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  ↑ sidebar là khối trắng bo góc, cách mép 8px, không bóng
```

- **Sidebar**: `m-2 mr-0`, `rounded-xl`, `bg-surface`, `border border-border`, **không bóng**
  (`M15`), cao hết màn trừ hai mép (`h-[calc(100dvh-1rem)]`, `sticky top-2`). Bên trong y như
  sidebar trắng: nền rê `--item-hover`, đang chọn `--secondary`, đường kẻ dưới đầu sidebar chạy
  hết bề ngang khối.
- **Header của trang không có thanh nền**: tên trang, nút nằm thẳng trên nền xám, cao `h-14`
  cộng `mt-2` để chữ thẳng hàng tên tổ chức trong sidebar. Thanh header trắng chạy ngang thì
  thành hai khối trắng chạm góc nhau, mất cảm giác sidebar nổi.
- **Nội dung như khung thường**: card trắng trên nền xám, không bọc thêm khối nào.
- **Dưới `lg`**: như khung thường, sidebar thành panel trượt sát mép (không cách mép, không bo
  ở mép trái), header có thanh `--surface` và ☰.
