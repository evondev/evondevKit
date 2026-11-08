# Mặt nền mở (Canvas) ⚑

Vùng chứa của biến thể mở của bộ **Soft** (`styles.md`, `P13`): cả màn một nền xám, không thanh,
không khối bọc; **card trắng là bề mặt duy nhất**.

```
 nền xám --background, cả màn, không đường kẻ nào
  ◐                Dashboard            [tìm      ] [Tạo] 🔔 ◐   <- header không thanh
 ╭──────────╮     ╭──────────────────╮ ╭──────────╮
 │ Tổng quan│     │ card             │ │ card     │              <- mục đang chọn: viên trắng
 ╰──────────╯     │                  │ │          │
   Sản phẩm       ╰──────────────────╯ ╰──────────╯
   Khách hàng
```

- **Sidebar trong suốt, không viền, header không thanh**: logo, tên trang, nút nằm thẳng trên nền
  xám (như header của Sidebar nổi).
- **Mục đang chọn là viên trắng** `bg-surface` cộng bóng nhẹ nhất của `P7`; rê `hover:bg-foreground/4`.
  Trên nền xám, viên trắng là tín hiệu rõ nhất mà không cần màu nhấn (`I15`). Ở bề mặt Flat (người
  dùng tự xin canvas không bóng) thì viên trắng thêm `ring-1 ring-border`, không bóng (`M15`).
- **Chỉ cho màn toàn card.** Bảng, danh sách chạy hết bề ngang phải nằm trong một card trắng; bảng
  đặt thẳng trên nền xám thì dòng rê, dòng kẻ không có mép nào để dựa. Màn chính là bảng thì
  khuyên Inset hay Paper, không canvas.
- **Bo góc card theo `P7`** (biến thể của Soft); khoảng giữa các card đều nhau, không card nào dính
  mép màn: nội dung `p-4 lg:p-6`.
- **Dưới `lg`** như khung thường: sidebar thành panel trượt, header thêm ☰, vẫn không thanh nền.
