# Trang lịch (lịch tháng)

Lịch việc theo hạn chót (hoặc lịch hẹn): lưới tháng đủ khi khung rộng, lịch gọn + danh
sách việc của ngày đang chọn khi khung hẹp.

```
Tháng 9, 2026 ⌄   [Hôm nay] ‹ ›                          [+ Thêm việc]
┌──────┬──────┬──────┬──────┬──────┬──────┬──────┐
│ T2   │ T3   │ T4   │ T5   │ T6   │ T7   │ CN   │
├──────┼──────┼──────┼──────┼──────┼──────┼──────┤
│ 31   │ 1    │ 2    │ …    │      │ (26) │ 27   │   <- lưới: hôm nay vòng đặc
│ ○ Họp│      │ ✓ Gửi│      │      │ ◉ Viế│ ⋯ Bản│
│      │      │      │      │      │ ○ Đặt│      │
│      │      │      │      │      │ 2 việc khác │
```

- **Hàng công cụ: "Hôm nay" liền ‹ ›, một cụm điều hướng.** Tên tháng (nút mở lưới 12 tháng)
  bên trái, rồi `[Hôm nay] ‹ ›`, nút chính "Thêm việc" `ml-auto` ở cuối. Bộ lịch phổ biến
  nhất đặt `today prev,next` liền nhau làm mặc định, các app lịch lớn cũng vậy: cả ba đều là
  "đi tới ngày khác". Để ‹ › cạnh tên tháng còn "Hôm nay" dạt sang phải cạnh nút chính là tách
  một việc làm hai chỗ, và "Hôm nay" viền đứng sát nút đặc trông như cặp hành động. **‹ › là nút `ghost` chỉ icon** `size-10`, không viền; chỉ "Hôm nay" là nút
  viền: ba ô viền cạnh nhau là ba khối nặng ngang nhau cho một việc phụ. "Hôm nay"
  `whitespace-nowrap shrink-0` (375px: tên tháng + cụm vừa 343px).
- **Chọn khuôn theo bề rộng khung lịch, không theo viewport.** Ô lưới cần **≥ 128px** mới đọc
  được tên việc (~12 ký tự sau icon). Sidebar mở: 1280px ô 139px ("Họp tổng
  kết s…"), 1024px ô 102px và 768px ô 103px chỉ còn một chữ ("Chuẩn …", "Viết tài …"): lưới
  đủ mà không đọc được việc nào là trang hỏng việc chính. Khung lịch là `@container`: từ
  `@4xl` (896px, = 7 × 128) lưới tháng đủ; hẹp hơn là khuôn gọn, và từ `@2xl` (672px) lịch gọn
  (`w-80`) với danh sách ngày đứng cạnh nhau thay vì chồng dọc. Đừng `useMediaQuery` theo
  viewport: sidebar mở hay thu đổi bề rộng khung 200px+ mà viewport không đổi.
- **Ô lưới cao cố định, tính ra chứ không đoán.** Cao = `p` hai đầu + hàng số + N dòng việc +
  khe; ghi phép tính vào comment. Mỗi `<li>` bọc nút dòng việc phải `flex` (hoặc nút `flex`):
  nút `inline-flex` trong khối thường dư khe baseline 1px mỗi dòng, ô ba việc cao 122–123px
  thay vì 120px, lưới co giãn theo tháng (`min-h-30` mà hàng 4, 5 cao
  hơn). Ngày quá N việc: hiện N−1 việc + "K việc khác" (chữ "khác", không "+K": dấu cộng dưới
  tên việc đọc thành "thêm việc"), bấm ra khung liệt kê đủ việc ngày đó.
- **Tên thứ, số ngày, icon dòng việc thẳng một mép.** Số ngày bọc vòng `size-7` căn giữa thì
  chữ số trôi theo số chữ số: "1" lệch 5px, "31" lệch 1px so với tên thứ và icon (tên thứ
  12px, số 11–17px, icon 12px). Chọn một: số và tên thứ **cùng căn giữa** cột (dòng việc
  vẫn căn trái), hoặc cùng căn trái: số `px-1.5` không vòng, chữ số đúng mép tên thứ; hôm
  nay thêm `min-w-7 justify-center` + nền, mép trái vòng trùng mép nền dòng việc. Hôm nay có
  hai chữ số thì chữ vẫn đúng mép; một chữ số ("5") thì chữ nằm giữa vòng, lệch
  3px. Chấp nhận: vòng méo thành viên thuốc để giữ 3px thì xấu hơn.
- **Hôm nay và ngày đang chọn: vòng đặc chỉ cho một thứ.** Lưới tháng đủ không có ngày đang
  chọn, nên hôm nay là vòng đặc `bg-primary`. **Lịch gọn có ngày đang chọn** (danh sách bên
  dưới là của ngày đó), nên theo đúng ô chọn ngày (`../../components/choice-controls.md`): **ngày
  đang chọn là vòng đặc**; hôm nay là vòng viền `inset-ring-1 inset-ring-foreground` +
  `font-semibold` (chấm dưới số đã là "có việc", không dùng chấm cho hôm nay như ô chọn ngày).
  Hôm nay cũng là ngày đang chọn thì chỉ vòng đặc. Đừng để ngày chọn là nền ô vuông xám còn
  hôm nay vẫn vòng đen: chọn 28 mà 26 vẫn là khối đậm nhất lịch, mắt đọc danh sách bên dưới
  thành việc của 26. Hai ô chọn ngày của hệ thống thiết kế lớn cũng vậy:
  hôm nay vòng viền, đang chọn vòng đặc.
- **Lịch gọn: mọi trạng thái vẽ trên vòng quanh số, không trên cả ô.** Khác ô chọn ngày
  (`choice-controls.md` tô cả ô `rounded-xl`): ở đây chấm "có việc" nằm dưới số, ngoài vòng, như
  lịch điện thoại. Nút ngày `h-12 w-full` chỉ là vùng bấm, `hover:bg-transparent` và không ring;
  số là `group-hover:bg-foreground/5` (ngày chưa chọn), Tab tới không vòng (`I13`). Thiếu thì rê ra nền ô vuông 46×48 cạnh
  vòng chọn 32px, bấm chuột xong ô vừa chọn giữ nền vuông chồng lên vòng đen: hai hình cho một ô ngày.
- **Dòng việc trong ô**: `h-6` icon trạng thái `size-3.5` (bảng `M7`) + tên `text-xs truncate`
  + `title` đủ tên; không nền màu, không viền (30 việc mỗi việc một khối màu là lịch loang).
  Xong: chữ `muted`. Quá hạn: chữ hổ phách như hạn chót quá hạn ở danh sách, không đỏ.
- **Tháng không có việc nào: không cần khối rỗng**, lưới trống là đủ rõ, như các app lịch.
  Lỗi tải: thanh lỗi trên lưới, lưới vẫn giữ để còn đổi tháng. Đang tải: thanh chờ trong ô.
- **Màn hẹp, nút thêm nằm ở đầu danh sách ngày đang chọn** (nút viền "+ Thêm" trong slot
  action của card), mở form với hạn chót là ngày đó.

## Lưới giờ trong ngày (cột theo người, ghế, phòng)

Lịch hẹn trong ngày của phòng khám, salon, phòng họp: giờ là trục dọc, mỗi bác sĩ (ghế, phòng)
một cột, ô hẹn cao theo thời lượng.

- **Hàng tên cột dính đầu khung khi cuộn dọc** (`sticky top-0` trong khung lưới), cột nhãn giờ
  dính trái khi cuộn ngang. Lưới 08:00–17:00 cao hơn một màn: hàng tên trôi đi thì cuộn tới
  buổi chiều là không biết cột nào của ai.
- **Mở ra cuộn sẵn tới giờ hiện tại**, vạch "bây giờ" nằm khoảng một phần ba từ trên. Vạch mang
  `data-now`: probe thấy vạch trong phần đang hiện của khung thì hiểu là cuộn có chủ ý, không báo
  "trang tự cuộn".
- **Vạch "bây giờ" vẽ trên ô hẹn** (`z-index` cao hơn ô), mảnh 1px, chấm tròn ở đầu; chấp nhận vạch
  cắt ngang chữ trong ô. Vạch nằm dưới ô thì đúng lúc đông lịch nhất nó chỉ lộ ở khe giữa các ô:
  vạch hiện 2% bề ngang, không còn là mốc để đọc ai trễ, ai
  sắp tới. Probe đo phần thấy được của `[data-now]`.
- **Số đếm trạng thái cần xử lý bấm được.** "Trễ 1" trong hàng đếm là nút: bấm thì cuộn tới ô đó
  và mở chi tiết; màn hẹp chỉ hiện một cột thì chuyển sang cột của người đó trước. Ô trễ nằm ở cột
  đang ẩn mà số đếm không bấm được thì lễ tân cầm điện thoại không thấy ai trễ.
- **Trạng thái suy từ giờ phải có mặt**: quá giờ hẹn mà chưa đến là "Trễ N phút", hổ phách
  như việc quá hạn (`M4`), đứng đầu hàng đếm trạng thái; quá lâu thì lễ tân tự chuyển "Không
  đến". Dữ liệu chỉ lưu "Đã xác nhận", nên phải tính ra, và wireframe phải có ít nhất một ca
  (`wireframe.md`, U3). Không ca nào trễ thì việc chính của lễ tân vắng mặt.
- **Nút đổi trạng thái trên ô hay dòng là động từ** ("Tiếp đón", "Bắt đầu khám", "Hoàn tất"),
  không phải tên trạng thái đích (`rules-state.md`, bảng nút).
- **Ô ngắn 30 phút chỉ giữ ba dòng**: giờ + trạng thái, tên, dịch vụ. Ghi chú để panel hay hồ sơ.
- **Hiện hết các cột khi khung đủ, tính theo số cột, không theo một mốc cố định.** Cột cần **≥ 160px**
  (giờ + "Trễ 25 phút" một dòng, tên đọc được). Khung lưới ≥ cột giờ + N × 160 thì hiện đủ N cột; không đủ
  mới về một cột + hàng tab chọn người. Tính trong code (`ResizeObserver` trên khung, hoặc `@container` với
  mốc ghi ra từ phép tính N × 160 + cột giờ, kèm comment), không khoá `@3xl` cho mọi phòng khám: bốn bác sĩ
  cần 700px, sáu bác sĩ cần 1020px. Khung 720px mà mốc `@3xl` (768px)
  thì chỉ hiện một cột rộng 650px, hai người trễ nằm ở hai cột đang ẩn; bốn cột 166px đọc đủ tên, trạng thái,
  "Trễ 25 phút". Cột hẹp dưới ~200px thì tên đầu cột dùng tên ngắn ("BS. Khoa", như hàng tab) thay vì cắt
  "BS. Nguyễn …".

---

## Kiểm trước khi giao

Chạy cùng cổng 2 của `checklist.md` khi trang có đúng thứ này.

- [ ] **Trang lịch**: đọc được tên việc trong ô ở 1024px khi sidebar mở không, hay chỉ còn một chữ ("Chuẩn …")? Khuôn đổi theo bề rộng khung (`@container`), không theo viewport. Ở lịch gọn, chọn một ngày khác hôm nay: vòng đặc có nằm ở ngày đang chọn không, hay hôm nay vẫn là khối đậm nhất? Rê chuột, bấm chuột một ngày: nền là vòng quanh số, hay ô vuông cả ô chồng lên vòng? "Hôm nay" có đứng liền ‹ › không? Chuyển qua vài tháng: lưới có cao thấp không (đo cao hàng có 3 việc)? Chữ số "1" và "31" có thẳng mép tên thứ không (`layouts/app.md`, "Trang lịch")?
