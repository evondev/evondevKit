# Màn giám sát trực tiếp ⚑

Người trực mở cả ca để biết **cái gì đang hỏng, số nào đang vượt ngưỡng**. Khác trang báo cáo
(đọc lại một khoảng đã qua). Hợp bộ mặt Midnight (`../../styles.md`).

```
thanh header:  ☰  Giám sát                                          🔔  (T)
[1 giờ qua ▾]  [Tự làm mới: 30 giây ▾]                       Cập nhật 14:32:05
┌───────────────────────────────────────────────────────────────────────┐
│ ⚠ 2 sự cố đang mở · Thanh toán chậm, Kho Bình Dương mất kết nối       │  <- dải tổng
├ Đơn/phút ─┬ Thời gian phản hồi ──┬ Tỷ lệ lỗi ──────┬ Tài xế đang chạy ┤
│ 184       │ 1.240 ms             │ 0,4%            │ 312              │
│ ↗ 6%      │ ▲ Vượt ngưỡng 800 ms │ — Trong ngưỡng  │ ↘ 12             │
└───────────┴──────────────────────┴─────────────────┴──────────────────┘
┌ Thời gian phản hồi, 1 giờ qua ─────────────┐ ┌ Sự cố ────────────────┐
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ngưỡng 800 ms    │ │ HÔM NAY               │
│        ╱╲___╱‾‾‾‾                          │ │ Thanh toán chậm 14:20 │
└────────────────────────────────────────────┘ │ ● Đang điều tra       │
┌ Hoạt động 90 ngày ─────────────────────────┐ │ HÔM QUA               │
│ Thanh toán  ▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮   99,92% │ │ Không có sự cố        │
│ Kho         ▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮   98,40% │ └───────────────────────┘
└────────────────────────────────────────────┘
```

- **Từ chung tới riêng** (2/2 nguồn): dải tổng → hàng chỉ số hiện tại → biểu đồ theo khung giờ →
  thanh hoạt động và sự cố. Dải tổng một câu: "Mọi hệ thống bình thường" (icon `circle-check`
  emerald) hay "2 sự cố đang mở · tên sự cố". Màu và icon của dải lấy theo **thành phần nặng nhất**.
- **Trạng thái luôn có màu + icon + chữ**, không bao giờ chỉ màu (2/2 nguồn). Màu theo `M4`: đỏ
  hỏng, amber cần chú ý, emerald bình thường, xám chưa có dữ liệu.
- **Số vượt ngưỡng giữ màu chữ chính** như mọi ô số (`../../components/charts.md`); dòng phụ của ô
  đó đổi thành "▲ Vượt ngưỡng 800 ms" `text-red-700` hay `text-amber-700` kèm icon. Không tô nền ô,
  không tô cả hàng. Trong ngưỡng thì dòng phụ là dòng so sánh thường. Ngưỡng và mức là của người
  dùng (`N10`), skill để prop `tone`.
- **Biểu đồ có đường ngưỡng**: một đường ngang nét đứt `stroke-red-500/60`, nhãn "ngưỡng 800 ms"
  `text-xs text-muted` ở mép phải. Đây là ngoại lệ của "Bỏ bớt đi" (`../../components/charts.md`):
  một đường, không thêm lưới.
- **Khung thời gian** là dropdown mở đầu vùng nội dung: 15 phút, 1 giờ, 6 giờ, 24 giờ, 7 ngày, 30
  ngày qua (2/2 nguồn cùng bậc thang). Cạnh đó là **Tự làm mới**: Tắt, 10 giây, 30 giây, 1 phút,
  5 phút; chu kỳ mặc định là của người dùng (các app phổ biến để tắt, hoặc giãn chu kỳ khi khung
  dài). **"Cập nhật 14:32:05"** `text-xs text-muted tabular-nums` căn phải cùng hàng để người trực biết
  số còn tươi; mất kết nối thì đổi thành "Mất kết nối · số từ 14:32" kèm icon amber.
- **Số mới thay tại chỗ**: không đếm, không nháy, không trượt (`F23`). `tabular-nums` để chữ số không
  xô nhau mỗi lần đổi.
- **Thanh hoạt động 90 ngày**, mỗi thành phần một dòng (2/2 nguồn): 90 ô đứng `h-8` chia đều, khe
  `gap-px`, bo `rounded-xs`; dưới `lg` còn 60 ô gần nhất, dưới `sm` còn 30. Ô emerald khi chạy đủ,
  amber rồi đỏ theo thời gian gián đoạn trong ngày (mốc là của người dùng), **xám** khi chưa có dữ
  liệu. Phần trăm hoạt động bên phải, `tabular-nums`. Rê hay Tab vào một ô: "12/10 · gián đoạn 42
  phút", có sự cố thì link sang sự cố đó.
- **Danh sách sự cố**: mới nhất trên, nhóm theo ngày. Mỗi sự cố: tên (link sang trang sự cố), giờ,
  badge trạng thái Đang điều tra / Đã xác định / Đang theo dõi / Đã xong (`M7`). Ngày không có sự cố
  vẫn hiện, một dòng "Không có sự cố".
- **Trạng thái**: lần tải đầu skeleton từng khối; một khối mất dữ liệu thì chỉ khối đó báo lỗi kèm
  "Thử lại", các khối khác vẫn chạy.
