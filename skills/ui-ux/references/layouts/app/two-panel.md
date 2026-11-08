# Hai panel làm việc ⚑

Một bên là chỗ làm (nhập, soạn, cấu hình các bước), bên kia là kết quả (bản chép, xem trước,
chạy thử) hiện ngay khi làm. Khác Danh sách + chi tiết: không có danh sách để chọn, cả hai bên là
chỗ làm việc.

```
┌ Nhập ─────────────── [Gợi ý AI] ⋯ ┐ ┌ Kết quả ────────── ✎ [Xuất ⌄] ┐
│ Cách nhập   [ Ghi âm | Tải lên ]  │ │ Kết quả sẽ hiện ở đây.         │  <- panel kết quả rỗng: một câu
│                                    │ │                                │
│          00:00:15                  │ │                                │
│                                    │ │                                │
│ [Tạm dừng]          [Dừng]         │ │                                │  <- hành động của panel ghim đáy panel
└────────────────────────────────────┘ └────────────────────────────────┘
```

- **Mỗi panel một card, cao hết vùng nội dung**, đầu panel có tên và hành động của riêng panel ở
  bên phải, nội dung cuộn trong panel, hành động cuối việc (Dừng, Gửi) ghim đáy panel.
- **Trong khối bọc (`inset`) hay mặt phẳng trắng (`unified`)**: hai panel là hai cột của **một** bề
  mặt, ngăn bằng `border-r border-border`, không card. Card trên nền xám bên trong khối trắng là ba
  tầng chồng nhau cho một việc chia đôi. Card rời chỉ khi vùng chứa là `classic`, `floating`,
  `canvas` (nội dung nằm trên nền xám).
- **Tỉ lệ**: 1 : 1 khi hai bên ngang việc (nhập ↔ kết quả), `lg:grid-cols-2`; 3 : 2 khi một bên là
  chỗ làm chính (soạn ↔ xem trước), `lg:grid-cols-[3fr_2fr]`. Khoảng giữa hai panel `gap-4`.
- **Cả màn một nút đặc tại một thời điểm** (`I2`): nút chính của bước đang làm. Nút chính của panel
  kết quả ("Gửi", "Xuất") ẩn hay để dạng viền cho tới khi có kết quả, rồi mới thành nút đặc. Hai nút
  đặc ở hai panel cùng lúc là hai việc tranh nhau. Nút Dừng (ghi âm, chạy thử) **kết thúc một thứ
  đang chạy**, câu 2 của `I4`: là nút nguy hiểm theo `I4`, nền mờ `rose-500/10`, chữ `rose-700`,
  không đỏ đặc (`locked-rules.md`, dòng 1, 2).
- **Panel kết quả rỗng là một câu**, có thể kèm icon nhỏ (`components/empty-state.md`), không
  thanh nút xám bị khoá chạy ngang panel: nút chưa bấm được thì ẩn, đừng bày một nút khoá to nhất
  panel.
- **Dưới `lg`: tab "Nhập · Kết quả"** ở đầu vùng nội dung, mỗi lúc một panel. Xếp chồng hai panel
  cao hết màn thì kết quả nằm tận dưới, người dùng không biết đã có. Có kết quả mới mà đang ở tab
  Nhập thì tab Kết quả có chấm.
- Kéo đổi tỉ lệ hai panel là logic, không tự thêm (`N10`).
