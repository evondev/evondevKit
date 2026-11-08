# Lưới thực thể ⚑

Nhiều bản ghi cùng loại, mỗi bản ghi **nhận ra bằng hình** (chân dung nhân vật, ảnh xe, ảnh
phòng, avatar nhân viên), chỉ cần liếc 2–4 chỉ số trước khi mở. Cần so nhiều chỉ số giữa nhiều
mục thì dùng **Bảng dữ liệu**: các bộ thiết kế lớn đều đưa dữ liệu đồng dạng, nặng chữ số vào bảng.

```
thanh header:  ☰  Nhân vật                                         🔔  (T)
[🔍 Tìm nhân vật ] [Hệ ▾] [Cấp ▾]   48 nhân vật  Sắp xếp: Cấp ▾  [▦|☰] [+ Thêm]
┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│ ┌───────────────┐⋯│ │       ảnh         │ │       ảnh         │
│ │   ảnh 4:3     │ │ │                   │ │                   │
│ └───────────────┘ │ │ Lôi Vũ     Cấp 42 │ │ ...               │
│ Hoả Phượng Cấp 58 │ │ ● Đang hoạt động  │ │                   │
│ ● Đang hoạt động  │ │ HP   ▓▓▓▓▓░  8.200│ │                   │
│ HP   ▓▓▓▓▓▓░ 9.400│ │ Công ▓▓▓░░░  1.120│ │                   │
│ Công ▓▓▓▓▓░░ 1.380│ │ Thủ  ▓▓▓▓░░    960│ │                   │
│ Thủ  ▓▓▓░░░░   740│ └───────────────────┘ └───────────────────┘
└───────────────────┘
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4, gap-4
```

- **Hình đặt theo loại thực thể** (4/4 nguồn): nhân vật, xe, sản phẩm, phòng nhận ra bằng hình
  thì **ảnh trên cùng**, tỉ lệ cố định (`aspect-4/3`, `object-cover`); người trong tổ chức thì
  **avatar `size-12` bên trái** tên + dòng phụ (chức danh, email), như danh bạ (`../../components/avatar.md`).
- **Thân card** (`p-4`): tên `text-sm font-semibold truncate` + một nhãn ngắn cùng hàng bên phải
  (cấp, hạng, mã) `text-xs text-muted tabular-nums`; dòng trạng thái là badge chấm + chữ (`M7`);
  rồi **2–4 chỉ số**. Cần quá bốn là người dùng đang muốn so: đó là bảng.
- **Chỉ số có thang chung thì là thanh, không thì là cặp nhãn – số.** Thanh `h-1.5` bo `full`, rãnh
  `bg-foreground/5`, mọi thanh **cùng `bg-primary`** như "Thanh tiến độ trong danh sách"
  (`../../components/charts.md`): HP đỏ, công cam, thủ xanh là ba màu cho cùng một ý "dài bao nhiêu".
  Nhãn trái `text-xs text-muted` một bề rộng cố định (`w-10`), số phải `tabular-nums`.
  **Cả lưới chung một thang** (mức tối đa của chỉ số, hay giá trị lớn nhất trong dữ liệu), không mỗi
  card một thang: hai card cùng thanh đầy mà số khác nhau là thanh nói dối. Chỉ số không có thang
  (ngày tham gia, lần hoạt động cuối) là hai cột nhãn – số trong một dải `border-t` cuối card.
- **Hạng, độ hiếm, phe** là badge nhỏ cạnh tên hoặc góc ảnh, một màu nhấn cho cả bộ (`M4`). Dữ liệu
  đã có màu hạng người dùng quen (trò chơi tự định màu độ hiếm) thì dùng đúng màu đó, **chỉ trên
  badge**, không tô viền hay nền cả card.
- **Bấm cả card mở trang chi tiết**: link phủ cả card (`after:absolute after:inset-0` trên link ở
  tên), menu `⋯` **góc trên phải** đứng trên lớp phủ (`relative z-10`); 4/4 nguồn đặt menu ở đó.
  Mục có hành động chính riêng (Kích hoạt, Kết nối) thì nút ở đáy card. Việc chính là xử lý lần
  lượt từng mục thì không phải lưới mà là **Danh sách + chi tiết**.
- **Thanh công cụ trên lưới**: tìm, các nút lọc, số kết quả, sắp xếp, **`segmented` hai ô icon Lưới |
  Bảng** (`layout-grid` / `list`, mỗi ô `aria-label`, `../../components/small-controls.md`), nút tạo `primary` ngoài cùng phải.
  Màn này mặc định Lưới; đổi sang Bảng giữ nguyên bộ lọc. Nhớ lựa chọn theo người dùng là logic
  (`N10`). Nhiều trang thì phân trang cuối lưới như "Bảng dữ liệu".
- **Card cùng hàng cao bằng nhau** (mặc định của grid). Thiếu một chỉ số thì ghi `—` (`T18`), không để
  card đó ngắn hơn hay thanh biến mất.
- **Trang chi tiết thực thể** theo `Trang chi tiết bản ghi`: ảnh lớn thay avatar ở đầu trang, đủ bộ
  chỉ số là danh sách thanh cùng khuôn trên, tab đầu là bản ghi con chính (trang bị, kỹ năng; ca làm;
  chuyến xe).
- **Trạng thái**: đang tải là 6 card skeleton đúng hình (khối ảnh, hai dòng, ba thanh,
  `../../components/loading.md`); chưa có mục nào theo `../../components/empty-state.md`, có nút tạo; lọc
  không ra gì thì một câu + "Xoá bộ lọc". Ảnh hỏng hay chưa có thì khối `bg-foreground/5` với chữ cái
  đầu tên, không icon ảnh vỡ.
