# Danh sách có bộ lọc

```
┌─────────────────────────────────────┐
│ tab  [tab]  tab   [tìm    ] [+ Thêm]│  <- chọn một: tab; chọn nhiều: chip
│                                     │     tên trang là <h1> trên thanh header, không lặp ở đây
├─────────────────────────────────────┤
│ ⬤ nội dung dòng      giá trị  ⋯ ⋯  │  <- hành động phụ ẩn, hiện khi hover
│ ⬤ nội dung dòng      giá trị       │
│ ⬤ nội dung dòng      giá trị       │
└─────────────────────────────────────┘
```

Xem `../../components/list-row.md` cho công thức từng dòng. Danh sách là **một khối
chia đường kẻ**, không phải mỗi dòng một card.

## Danh sách + chi tiết ⚑

```
┌ danh sách w-80–w-96 ─┬ chi tiết flex-1 ─────────────────────┐
│ [tìm        ] [lọc]  │ HD-0030 · Chưa thu        [Ghi thu] │  <- đầu chi tiết: tên + hành động chính
│ 36 hoá đơn           │                                      │
│▌Công ty Bảo Ngọc     │  nội dung bản ghi                    │
│  124.450.000 ₫ · 3/3 │                                      │
│  Phòng khám Nha Việt │                                      │
│  12.500.000 ₫ · 25/1 │                                      │
└──────────────────────┴──────────────────────────────────────┘
   ↑ mỗi cột cuộn riêng      ↑ đứng yên khi lướt danh sách
```

- **Một bề mặt, hai cột**: cả khối là một card trắng (hay nằm trong khối bọc, mặt phẳng trắng),
  hai cột ngăn bằng `border-r border-border`. Không làm hai card rời có khe ở giữa: danh sách và
  chi tiết là một việc, khe chia làm chúng trông như hai khối không liên quan.
- **Cột danh sách cố định** `w-80` (320px) tới `w-96`, ở khổ 1024–1279 thì `w-72`. Chi tiết
  `min-w-0 flex-1`.
- **Mục trái chỉ mang thứ để chọn**: một ảnh nhỏ, dòng giá hay trạng thái, tên, **một** dòng phụ.
  Tối đa ba dòng chữ. Mọi thứ khác (địa chỉ đầy đủ, xác thực, ngày đăng, thông số) đã có ở cột chi
  tiết, lặp lại ở trái chỉ làm cột chật (năm dòng mỗi mục đọc như một bức tường chữ). Mục đang mở
  và mục đang rê khác nền (`I10`, đoạn "Mục đang mở").
- **Mỗi cột cuộn riêng**, khối cao hết màn trừ header (`h-[calc(100dvh-…)]`, mỗi cột `overflow-y-auto`,
  thanh cuộn tự ẩn `I18`). Đây là ngoại lệ có tên của luật "cột lọc không cuộn riêng" bên dưới:
  lướt danh sách dài mà cột chi tiết trôi theo thì mất bản ghi đang đọc. Đầu cột danh sách (ô tìm,
  lọc, số đếm) dính đầu cột.
- **Chưa chọn mục nào**: cột chi tiết là trạng thái rỗng nhẹ giữa cột, một icon nhỏ và một câu
  "Chọn một hoá đơn để xem" (`components/empty-state.md`), không hình minh hoạ lớn. Màn kiểu hàng
  đợi (hộp thư, duyệt đơn) thì nên mở sẵn mục đầu; mở mục nào là logic, skill dựng cả hai trạng thái.
- **Ảnh ở cột chi tiết có trần cao** (`max-h-[420px]`, `object-cover`): dữ liệu chỉ có một ảnh thì
  không để nó phủ hết khung rộng 1400px.
- **Dưới `lg`: một cột mỗi lúc.** Danh sách rộng hết màn; bấm mục thì chi tiết thay chỗ, đầu chi
  tiết có nút `‹` quay lại danh sách. Không ép hai cột vào màn hẹp. Mở bằng route riêng hay bằng
  state là logic (`N10`).
- **Đầu chi tiết ở màn hẹp hai hàng**: hàng một là `‹` + tên bản ghi (cắt chữ, `T14`) + nhãn trạng
  thái; hàng hai là các nút hành động, nút phụ gom vào `⋯`. Một hàng 375px không chứa nổi nút quay
  lại, tên, nhãn và hai nút: tên bị bóp về 0 chữ, nút tràn mép (đo trên trang mẫu).
- **Không dùng với vùng chứa `canvas`**: danh sách đặt thẳng trên nền xám không có mép để dòng rê
  dựa vào (`P13`, Mặt nền mở).

**Đếm cột trước khi thêm cột lọc.** Sidebar app + cột lọc + danh sách + chi tiết là bốn cột:
ở 1440px vùng nội dung chỉ còn khoảng 1190px, danh sách bị ép còn khoảng 320px, tiêu đề
cụt sau hai ba chữ. Ba cột nội dung chỉ khi vùng nội dung từ khoảng
1600px; hẹp hơn thì lọc thành nút "Bộ lọc" mở panel, như bản 1024px.

**Cột lọc bên trái dính theo khi cuộn, không cuộn riêng.** `sticky top-*` chỉ khi cột thấp
hơn màn. Cột dài hơn màn thì để nó cuộn theo trang, đừng bó `max-h-[calc(100vh-…)]
overflow-y-auto`: thanh cuộn riêng hiện thường trực, dài gần hết cột, dính sát viền khung.
Nhóm dài (khu vực, tỉnh) thì hiện năm sáu mục kèm "Xem thêm N" dạng
link, đừng cho cả cột thành khung cuộn.

---

## Kiểm trước khi giao

Chạy cùng cổng 2 của `checklist.md` khi trang có đúng thứ này.

- [ ] **Popover Lọc**: chọn một người trong ô select bằng chuột rồi nhìn lại, ô còn viền đen + ring như đang mở không (phải `focus-visible:`)? Chữ "Xoá lọc" có thẳng mép trái các nhãn không, hay thụt 16px vì là nút `ghost`? Khung có mấy khối đen (chip chọn, nút Áp dụng): chỉ Áp dụng được đặc. Chọn đủ bốn mức: hàng chip có thành bốn vòng đen dày không (viền chip chọn `inset-ring-1`, không `ring-1 ring-inset`; chỉ khi bật `I14`: Tab tới chip đang chọn phải thấy cả viền chọn lẫn vòng focus)? Mở ô khoảng ngày ở 375px: hàng mốc nhanh có mốc nào bị cắt không (phải xuống dòng)? Ở 1280px: lịch có bung hai tháng tràn khỏi khung không, lọc hạn chót có mở ra tháng trước không (`layouts/overlay.md`, "Popover lọc")?
