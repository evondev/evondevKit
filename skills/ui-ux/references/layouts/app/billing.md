# Trang thanh toán

Là trang cài đặt kiểu A, bốn mục theo thứ tự: **Gói đang dùng**, **Phương thức thanh toán**,
**Lịch sử hoá đơn**, **Vùng nguy hiểm** (huỷ gói, chỉ ở gói trả phí chưa huỷ). App xuất hoá đơn cho công ty thì thêm mục **Thông tin xuất hoá đơn** (email
nhận hoá đơn, tên công ty, mã số thuế; nút "Sửa" mở hộp một form) giữa phương thức và lịch sử.
Năm trang thanh toán của các sản phẩm lớn đều có mục phương thức thanh toán
(thẻ che số, nút đổi) và lịch sử hoá đơn tải được; ba có email hoặc thông tin xuất hoá đơn; các
trang đều báo lần trừ tiền lỗi ngay trên trang, kèm lối trả lại hoặc đổi thẻ.

```
[!] Chưa trừ được 1.290.000 đ kỳ 12/09                     [Cập nhật thẻ]   <- chỉ khi trừ lỗi
    Thẻ Visa •••• 4242 bị từ chối. Cập nhật thẻ trước 19/09 để giữ gói Pro.

Gói đang dùng
┌──────────────────────────────────────────────────────────────┐
│ Pro                                                 [Đổi gói] │  <- tên 16px 600
│ 1.290.000 đ mỗi tháng                                         │
│ Gia hạn ngày 12/10/2026                                       │  <- bỏ khi đang trừ lỗi
└──────────────────────────────────────────────────────────────┘
Phương thức thanh toán
┌──────────────────────────────────────────────────────────────┐
│ Visa •••• 4242                                     [Đổi thẻ]  │
│ Hết hạn 08/2027                                               │
└──────────────────────────────────────────────────────────────┘
Lịch sử hoá đơn
┌──────────────────────────────────────────────────────────────┐
│ Ngày    Mã hoá đơn          Trạng thái        Số tiền         │
│ 12/09   HD-2026-0008        • Đã thanh toán   1.290.000 đ  ⤓  │
└──────────────────────────────────────────────────────────────┘
Vùng nguy hiểm
┌──────────────────────────────────────────────────────────────┐
│ Huỷ gói Pro: bạn vẫn dùng tới hết 12/10/2026,      [Huỷ gói]  │  <- nền đỏ mờ (I4)
│ sau đó cả workspace về gói Miễn phí.                          │
└──────────────────────────────────────────────────────────────┘
```

- **Gói là một hàng, không tách thành các hàng nhãn–ngày.** Tên gói `text-base font-semibold`,
  thứ nặng nhất khối. Dưới tên là hai dòng `text-sm text-muted`: giá (số `text-foreground`) kèm
  chu kỳ ("mỗi tháng", "mỗi năm"), rồi "Gia hạn ngày 12/10/2026" (mốc đứng riêng thì ghi đủ năm,
  `T16b`). Giá và ngày là **hai dòng riêng**, không nối bằng `·`: ở 375px dòng nối gãy ngay giữa
  "Gia hạn ngày" và "12/10/2026". **Không hàng "Dùng gói này từ"**:
  không ai vào trang này để làm gì với ngày đó, kỳ đầu đã nằm ở cuối lịch sử hoá đơn.
  Tách gói, "Gia hạn tiếp theo", "Dùng gói này từ" thành ba hàng thì cao 77, 73, 72px
  (hàng ngày mượn dải cao của ô nhập), tên gói 14px 500 giống hệt hai nhãn ngày, nhìn không ra
  đâu là tên gói. Một hàng thì khối còn khoảng 80px, tên gói đọc ra ngay.
- **Nút của mục gói theo loại gói:**
  - Trả phí: chỉ "Đổi gói" `outline`, là link sang bảng giá (`pricing.md`).
  - **"Huỷ gói" nằm ở Vùng nguy hiểm cuối trang, không cạnh "Đổi gói"** (luật kiểu A: vùng nguy
    hiểm tách xuống cuối cùng, như "Xoá workspace"). Một hàng như hàng vùng nguy hiểm của trang
    workspace: câu hậu quả `text-sm text-muted` trái ("Huỷ gói Pro: bạn vẫn dùng tới hết
    12/10/2026, sau đó cả workspace về gói Miễn phí."), nút "Huỷ gói" phải, **nút nguy hiểm đứng
    riêng** (`I4`: nền `rose-500/10`, chữ `rose-700`). Tiêu đề mục "Vùng nguy hiểm", không đặt
    "Huỷ gói" (tiêu đề và nút cùng chữ). Vẫn thấy ngay khi cuộn, một lần bấm là mở hộp xác nhận:
    không giấu vào trang khác hay sau nhiều bước. Huỷ gói cùng họ với huỷ tài khoản, rời nhóm,
    đăng xuất (`I4`, câu 2: kết thúc thứ đang chạy).
    Nút đỏ đứng cạnh "Đổi gói" ngay đầu trang là khối nặng nhất trang, trên một tài khoản
    đang ổn mắt rơi vào nút huỷ trước tiên. Dời xuống cuối thì khối gói chỉ còn "Đổi gói", nút
    huỷ vẫn đỏ, vẫn một lần bấm.
  - **Hộp xác nhận huỷ gói đỏ như hộp xoá** (`I4`, `overlay.md`): icon `calendar-x` nền `rose-500/10`
    glyph `rose-700`, nút xác nhận "Huỷ gói" nền `rose-500/10` chữ `rose-700`, nút "Giữ gói"
    `--secondary` nhận focus khi mở. Câu hậu quả nói ngày kết thúc thật ("Bạn vẫn dùng gói Pro tới
    hết 12/10/2026, sau đó về gói Miễn phí"). Không dùng khuôn "hộp xác nhận cho việc không mất
    dữ liệu" (icon xám, nút `primary` đen).
    Đừng dùng lại lý lẽ "Huỷ gói không đỏ, vì không mất gì" (nút viền trung tính, hộp icon xám,
    nút xác nhận đen): cùng lý lẽ "không mất dữ liệu" mà chủ dự án đã bác ở đăng xuất hàng loạt.
  - Miễn phí: dòng dưới tên chỉ "Miễn phí", không dòng gia hạn, một nút `primary` "Nâng cấp gói"
    (`I2`: việc trang muốn người dùng làm). Mục phương thức thanh toán ẩn khi chưa có thẻ.
  - Đã huỷ, còn hạn: dòng ngày đổi thành `text-amber-700` "Kết thúc ngày 12/10/2026, sau đó về
    gói Miễn phí"; "Tiếp tục gói" (`outline`) đứng cạnh "Đổi gói" trong khối gói, **Vùng nguy
    hiểm ẩn** (không còn gì để huỷ).
  - **Đang trừ lỗi: bỏ dòng "Gia hạn ngày …"** khỏi khối gói. Kỳ này chưa trả thì ngày gia hạn
    kế không còn đúng, để nguyên là nói ngược banner ngay trên (`S6`). Không thêm badge "Quá hạn"
    cạnh tên: banner đã nói (`N3`).
    **Câu hậu quả ở Vùng nguy hiểm và hộp xác nhận huỷ cũng không dùng ngày đó**: "bạn vẫn dùng
    tới hết 12/10/2026" là hứa một kỳ chưa trả. Huỷ lúc đang trừ lỗi thì hậu quả thật (về gói
    Miễn phí ngay, hay còn hạn tới đâu) là logic của người dùng (`N10`); câu lấy từ dữ liệu, mẫu
    mặc định "Huỷ gói Pro: workspace về gói Miễn phí ngay." Khối gói đã bỏ ngày gia hạn mà cuối
    trang vẫn "bạn vẫn dùng tới hết 12/10/2026" là hai câu ngược nhau.
  - Dưới `sm` các nút xuống dưới chữ, căn trái, như mọi hàng cài đặt.
- **Phương thức thanh toán là một hàng**: "Visa •••• 4242" `text-sm font-medium` (tên hãng bằng
  chữ, bốn số cuối; không vẽ logo hãng thẻ), dòng dưới `text-sm text-muted` "Hết hạn 08/2027",
  nút `outline` "Đổi thẻ". Thẻ hết hạn trước kỳ gia hạn tới thì dòng dưới `text-amber-700` "Hết
  hạn 10/2026, trước kỳ gia hạn 12/10"; đã hết hạn thì `text-red-600` "Đã hết hạn 08/2026".
  Luồng đổi thẻ là của người dùng (`N10`), skill để handler rỗng.
  **Nút đứng một mình trên hàng không vì thế mà thành `primary`** (`I1`, `I2`): "Đổi thẻ" là
  việc thỉnh thoảng mới làm, cùng loại "Đổi email", "Đổi mật khẩu" ở trang hồ sơ, nên là nút
  viền. Cả trang chỉ một nút `primary` là "Nâng cấp gói" ở gói miễn phí (`I3`). Nút nào đứng
  một mình cũng tô đen thì trang trả phí có ba khối đen ("Đổi gói", "Đổi thẻ", "Cập nhật thẻ")
  và không khối nào còn nổi.
- **Trừ tiền thất bại: banner tông lỗi đầu trang, trên mục gói** (`../../components/banner.md`,
  không ✕, `role="alert"`). Tiêu đề nói số tiền và kỳ, mô tả nói vì sao và hạn chót, **một** nút
  `outline` "Cập nhật thẻ" mở đúng luồng của "Đổi thẻ". Dòng hoá đơn đó vẫn badge đỏ "Thất bại".
  **Nút đứng một mình trong banner vẫn là `outline` nền trắng, không `primary`** (luật của
  `banner.md`): nền đỏ nhạt và icon đỏ đã kéo mắt tới khối, nút trắng là mảng sáng nhất trong khối
  nên vẫn thấy ngay. Nút đen đặt trong khối đỏ là hai tín hiệu mạnh nhất trang chồng lên nhau.
  Hai hệ thiết kế lớn chia đôi, một hệ chỉ cho nút ghost trong thông báo nằm
  trong trang, một hệ cho chọn nút chính hay nút phụ tuỳ độ nhấn. Không có số đông đòi nút đặc,
  nên giữ luật của `banner.md` (`I2`: màu nhấn phải có lý do, ở đây tông đỏ đã làm việc đó).
  Đừng để ca trừ lỗi chỉ có badge đỏ ở dòng hoá đơn: mục gói vẫn ghi "Gia hạn tiếp
  theo" như chưa có gì, và cả trang không có chỗ nào đổi thẻ để sửa.
- **Lịch sử hoá đơn**: bảng năm cột Ngày, Mã hoá đơn (`font-mono text-muted`), Trạng thái
  (badge), Số tiền (bám phải), nút tải. Mới nhất ở trên. **Không cột "Gói"**: mọi dòng cùng một
  gói là một ý nói tám lần (`N3`). Dòng không bấm được nên không hover; nút tải chỉ icon
  `download`, `ghost`, **luôn hiện** (`I11`: một việc, không nguy hiểm), tooltip "Tải PDF",
  `aria-label` có mã hoá đơn. Ngày theo `T16b` (năm nay bỏ năm, `title` đủ ngày).
  **Bảng hay danh sách chọn theo bề rộng khung (`@container`)**, không theo viewport: có cột nav
  dọc thì ở 1024px cột nội dung chỉ còn ~490px. Hẹp thì mỗi hoá đơn một dòng hai tầng: ngày +
  mã, rồi badge trái số tiền phải; nút tải `size-10` ở mép phải.
- **Trang trạng thái** đủ các ca: đang tải (khung chờ đúng hình từng mục), lỗi tải từng mục, gói
  miễn phí (chưa có hoá đơn), trả theo năm (hoá đơn năm trước ghi đủ năm), trừ tiền thất bại
  (banner + badge), thẻ sắp hết hạn, thẻ đã hết hạn, gói đã huỷ còn hạn, hộp xác nhận huỷ gói.

---

## Kiểm trước khi giao

Chạy cùng cổng 2 của `checklist.md` khi trang có đúng thứ này.

- [ ] **Trang thanh toán** (`layouts/app.md`): gói là một hàng (tên gói `text-base font-semibold`, giá và "Gia hạn ngày …" là hai dòng phụ riêng), không tách thành các hàng nhãn–ngày cao như hàng có ô? Có mục phương thức thanh toán (thẻ che số, hạn thẻ, "Đổi thẻ")? "Huỷ gói" nằm ở Vùng nguy hiểm cuối trang, nền đỏ mờ (`I4`, nút đứng riêng), không đứng cạnh "Đổi gói"? Hộp xác nhận huỷ đỏ như hộp xoá (không icon xám, nút đen)? Đang trừ lỗi thì khối gói đã bỏ dòng "Gia hạn ngày …" chưa, và câu ở Vùng nguy hiểm, hộp huỷ có còn hứa "dùng tới hết <ngày gia hạn>" không? Nút "Cập nhật thẻ" trong banner là nút viền trắng, không `primary`? Ca trừ tiền thất bại có banner lỗi đầu trang với nút "Cập nhật thẻ", không chỉ badge đỏ ở dòng hoá đơn?
