# Header toàn màn (`full`) ⚑

Tuỳ chọn của trục **Header** (`P13`), ghép được với mọi điều hướng có cột trái (`sidebar`,
`rail`) và mọi vùng chứa. Header chạy hết bề ngang màn; điều hướng bắt đầu **dưới** header.

```
┌──────────────────────────────────────────────────────────────┐
│ ☰ ◐ Evondev          [ tìm trong cả app...     ]   🔔 ◐ Tên ⌄ │  <- header toàn màn
├────────────┬─────────────────────────────────────────────────┤
│ ⌂ Tổng quan│ Cài đặt tài khoản                                │  <- tên trang nằm trong vùng nội dung
│ ▤ Hợp đồng │ ┌─────────────────────────────────────────────┐ │
│            │ │ card                                        │ │
└────────────┴─────────────────────────────────────────────────┘
```

- **Dùng khi** ô tìm toàn cục là một việc chính (tìm hợp đồng, tìm hồ sơ, tìm sản phẩm) hay app có
  nút đổi workspace, tổ chức: header toàn màn cho ô tìm chỗ rộng ở giữa và cho logo một chỗ cố định.
  Không có hai thứ đó thì giữ header `content`.
- **Header `h-14`**: trái là logo + tên sản phẩm (cùng cột với điều hướng bên dưới, dưới `lg` thêm
  ☰ trước logo); giữa là ô tìm `max-w-md`; phải là nhóm nút (`Nhóm nút bên phải thanh header`).
  **Đầu sidebar bỏ logo**, không lặp logo hai chỗ; ô đổi workspace nếu có thì nằm đầu sidebar,
  ngay dưới header.
- **Tên trang chuyển vào vùng nội dung**, thành đầu trang (`Đầu trang trong vùng nội dung`), không
  nằm trong header nữa.
- **Header đổi theo vùng chứa**:

  | Vùng chứa | Header | Vùng nội dung |
  | --- | --- | --- |
  | `classic` | `--surface`, không đường kẻ dưới: header trắng liền với sidebar trắng thành một khung chữ L | nền xám, **bo góc trên trái `rounded-tl-2xl`** chỗ khung chữ L ôm vào |
  | `inset`, `canvas`, `floating` | Không thanh, nằm trên nền trang | Khối bọc, card, sidebar nổi bắt đầu ngay dưới header |
  | `unified` | `--surface`, `border-b border-border-strong` chạy hết bề ngang | Như Một mặt phẳng |
