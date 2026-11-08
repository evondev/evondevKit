# Trang báo cáo (doanh thu, phân tích)

Trang để **đọc số theo một khoảng ngày**, khác màn tổng quan (vào để bắt tay làm).

```
thanh header:  ☰  Báo cáo doanh thu                           🔔  (T)
┌──────────────────────────────┐
│ 29/08/2026 – 27/09/2026   📅 │   <- ô khoảng ngày, căn trái, mở đầu vùng nội dung
└──────────────────────────────┘
So với 30 ngày liền trước, 30/07/2026 – 28/08/2026           <- kỳ so, ghi MỘT lần
┌ Doanh thu ─┬ Số đơn ─┬ Giá trị đơn TB ─┬ Tỷ lệ hoàn tiền ┐
│ 1,62 tỷ đ  │ 2.571   │ 632.000 đ       │ 2,1%            │
│ ↗ 4,4%     │ ↗ 4,6%  │ — Không đổi     │ ↘ 0,1 điểm      │
└────────────┴─────────┴─────────────────┴─────────────────┘
┌ Doanh thu theo ngày ──────────────────────────────────────┐
│ 60 tr ─────────────────────────────────────────────────── │   <- lưới ngang + nhãn mức
│ 40 tr ───────╱╲──────╱╲─────── 13/09 · 70,9 tr đ ──────── │
│ 20 tr ─────────────────────────────────────────────────── │
│ 0 ─────────────────────────────────────────────────────── │
│        02/09   07/09   12/09   17/09   22/09   27/09      │
└───────────────────────────────────────────────────────────┘
┌ Doanh thu theo kênh ────────┐ ┌ Sản phẩm bán chạy ────────┐
│ Website   636,4 tr đ    39% │ │ Tai nghe…   123 đơn  232 tr│
│ ▓▓▓▓▓▓▓▓░░░░░░░░            │ │ …                          │
└─────────────────────────────┘ └────────────────────────────┘
```

- **Ô khoảng ngày là bộ lọc của cả trang**, mở đầu vùng nội dung, căn trái, `sm:w-72`. Tên trang đã nằm trên thanh header thì không dựng thêm đầu trang. Ô theo "Khoảng ngày" trong `../../components/choice-controls.md`; trường nhìn lùi nên **ngày sau hôm nay khoá** (gợi ý mặc định, danh sách ngày khoá là của người dùng) và mở ra với tháng hiện tại bên phải.
- **Kỳ so ghi một lần** ở dòng `text-xs text-muted` ngay trên hàng ô số (`../../components/charts.md`, "Dòng so sánh"), không lặp trong từng ô. Chưa có kỳ trước (tháng mở bán đầu tiên) thì dòng đó ghi "Chưa có kỳ trước để so" và các ô bỏ dòng so sánh.
- **Kỳ so theo kiểu khoảng**, như các công cụ phân tích phổ biến:
  - Khoảng trượt ("7 ngày qua", "30 ngày qua", khoảng tự chọn): **cùng số ngày liền trước**. "So với 30 ngày liền trước, 30/07 – 28/08/2026".
  - Khoảng theo lịch ("Tháng này", "Quý này", "Năm nay", cả một tháng): **cùng kỳ của đơn vị trước**, tính tới cùng ngày. Tháng này tới 26/09 thì so 01/08 – 26/08 ("So với cùng kỳ tháng trước"); năm nay thì so 01/01 – 26/09/2025 ("So với cùng kỳ năm trước"). Lùi đúng số ngày ra những khoảng không ai nghĩ tới: "Từ đầu năm" ghi "So với 269 ngày liền trước, 07/04/2025 – 31/12/2025", "Cả tháng 9" ghi "so với 26 ngày liền trước, 06/08 – 31/08".
  Chọn kỳ nào là logic của người dùng (`N10`); skill lo câu chữ và mặc định khi đề để hở.
- **Mỗi mốc của biểu đồ theo độ dài khoảng**, như trang doanh thu của các cổng thanh toán lớn: **1 ngày → theo giờ** (24 mốc), tới ~31 ngày → ngày, tới ~92 ngày → tuần, dài hơn → tháng. Tên card đổi theo: "Doanh thu theo giờ / ngày / tuần / tháng". Khoảng một ngày mà thay biểu đồ bằng khối chữ "87,6 tr đ · Chọn từ hai ngày trở lên để thấy xu hướng" là lặp đúng số ở ô "Doanh thu" ngay trên (`N3`) và bắt người dùng đổi khoảng mới thấy gì. Khối chữ "một điểm" chỉ dùng khi dữ liệu thật sự mới có một mốc.
- **Biểu đồ chính có lưới ngang và nhãn mức** (ngoại lệ trong "Bỏ bớt đi" của `../../components/charts.md`), số ở điểm đang xem **kèm mốc** ("13/09 · 70,9 tr đ", "Hôm nay · 44,4 tr đ"), đặt về phía không có đường, và Tab vào thì số của mốc đó hiện ra. Kỳ chưa trọn (hôm nay, tuần này) nét đứt.
- **Nhãn mức là số tròn do mình tính, không để thư viện tự chọn**: bước = trần(giá trị lớn nhất / 4) làm
  tròn lên 10 tr (hay 100 tr khi theo tuần), truyền `ticks` 0…4 bước và `domain` khớp. Để Recharts
  `tickCount={4}` thì ra "0, 30 tr, 80 tr", khoảng không đều, đường lưới giữa mất (bản dựng thử).
- **Cột theo tuần mà tuần đầu hay tuần cuối chưa trọn thì nhãn nói rõ**: "09–11/10" (ba ngày),
  "Tuần này" (đang chạy). Ghi ngày đầu tuần như mọi cột khác thì cột ba ngày thấp hẳn, đọc ra "tuần đó
  tụt doanh thu" (bản dựng thử, khoảng 30 ngày bắt đầu thứ Sáu).
- **Hai khối phân tích dưới biểu đồ**, hai cột từ `lg`, một cột ở màn hẹp: phần chia theo nhóm (kênh, khu vực) là danh sách thanh xếp lớn dần, mỗi dòng số + phần trăm (`../../components/charts.md`, "Thanh tiến độ trong danh sách"); top mục (sản phẩm, khách hàng) là danh sách dòng tên + dòng phụ bên trái, số bên phải `tabular-nums`, 5 dòng.
- **Trạng thái**: đang tải giữ khung từng khối với skeleton đúng chiều cao (ô khoảng ngày vẫn dùng được); tải hỏng một khung `ListError` thay phần dưới ô khoảng ngày; khoảng không có đơn nào thì một khung câu "Không có đơn nào từ … tới …" + link về khoảng mặc định. Khoảng ở tương lai không có ca rỗng riêng: ngày sau hôm nay đã khoá trong lịch.

---

## Kiểm trước khi giao

Chạy cùng cổng 2 của `checklist.md` khi trang có đúng thứ này.

- [ ] **Trang báo cáo** (`layouts/app/report.md`): chọn "Tháng này" và "Năm nay": dòng "So với…" ra cùng kỳ tháng trước / năm trước, hay "269 ngày liền trước" lùi tới một ngày lẻ? Chọn một ngày: biểu đồ chia theo giờ, hay thành khối chữ lặp số ở ô Doanh thu? Biểu đồ chính có lưới ngang và nhãn mức không? Lịch có cho chọn ngày sau hôm nay không?
