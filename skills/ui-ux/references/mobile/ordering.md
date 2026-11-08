# App điện thoại — App đặt món, đồ uống, bán hàng

Một mục của luật `J`. Luật nền `J1`–`J8` và bảng các mục ở `mobile.md`, mở file đó trước.

## J11. App đặt món, đồ uống, bán hàng ⚑

Đối chiếu ảnh màn thật của 12 app đặt món, đồ uống, giao đồ ăn trong và ngoài nước. **Code mẫu đã duyệt:
`layouts/mobile-order.html`** (đặt món, sheet chọn món, giỏ hàng, ưu đãi, đơn hàng; các màn của `J12`). Thanh tab 3–4
mục (Đặt món, Ưu đãi, Đơn hàng, Tài khoản), không mục "Khác" ba gạch (`J2`).

**Màn đặt món (màn gốc)**
- **Đầu màn là một hàng chọn cách nhận và nơi nhận**, thay tiêu đề lớn của `J3`: "Giao đến · Nhà ▾" 13px
  `text-muted` trên, tên đường 16px dưới, icon tròn 40px trái, nút tìm 44px phải. Hàng này cuộn đi cùng nội dung,
  không dính, không hai thẻ chồng nhau: đầu màn dính cố định ăn mất 1/4 màn ở mọi lần cuộn.
- **Một ảnh ưu đãi** cao 160px (`J8`), chữ là HTML trên lớp tối của ảnh, không chữ in sẵn trong ảnh. Không băng
  chuyền nhiều banner, không năm sáu khối khuyến mãi chồng nhau trước khi tới menu.
- **Danh mục**: ảnh tròn 56px, tên 13px dưới; đến 5 mục thì `grid-cols-5` vừa khung, nhiều hơn thì hàng cuộn lộ
  nửa ô (`J8`). Bấm thì cuộn tới mục đó trong menu.
- **Dòng món**: ảnh 88px bo 16 trái; tên 16 và mô tả 13 đủ chữ (`J4`); giá 16 đậm, giá gốc gạch ngang 13px cạnh nếu
  đang giảm; nút "+" tròn 44px cuối dòng. Bấm dòng mở sheet chọn món. Nút "+" của món có lựa chọn bắt buộc cũng mở
  sheet; món không có lựa chọn (bánh, nước chai) thì thêm thẳng, báo bằng thông báo ngắn (`J7`).
- **Hết hàng**: dòng giữ chỗ cũ, ảnh mờ xám, chữ "Hết hôm nay · có lại 7:00 sáng mai", không nút "+".
- **Thanh giỏ hàng**: giỏ có món thì một thanh 56px `bg-primary` bo tròn nằm ngay trên thanh tab (cách 8px, cùng
  lề 16px): số món trái, "Xem giỏ hàng", tổng tiền phải; bấm mở giỏ. Chỉ ở màn đặt món; vùng cuộn chừa
  `.pad-cartbar` (inset + 160px). Ngoài thanh này, không thẻ nổi nào khác ở đáy (thẻ mời đánh giá đơn, banner):
  chúng đè lên menu, lên nút "Chọn" ở mọi màn.

**Sheet chọn món**
- Sheet cao 92% (`J6`), đóng bằng nút X 44px góc phải, không "Huỷ" (đây là xem món, chưa phải form). Ảnh món 256px
  trên đầu; cuộn qua ảnh thì hiện thanh 56px có tên món, nút X gắn vào sheet nên luôn trong tầm.
- **Thứ tự**: tên 24px, giá gốc, mô tả → các nhóm bắt buộc → nhóm thêm (topping) → số lượng → ghi chú cho quán
  cuối cùng. Gợi ý dùng kèm không chen trước lựa chọn bắt buộc: để ở giỏ hàng.
- **Mọi nhóm là dòng 56px**: nút chọn tròn (chọn 1) hay vuông (chọn nhiều) trái, tên giữa, phần cộng thêm
  "+6.000đ" phải `text-muted`. Không cộng thêm thì để trống, không ghi "0đ"; giá gốc là lựa chọn rẻ nhất nên
  không có số âm. Không dùng viên chip cho lựa chọn: chip có giá thành chuỗi dài "Sữa yến mạch: 5.000đ", bốn chip
  rớt một chip xuống dòng ở khổ 360.
- **Tiêu đề nhóm** 17px đậm, cùng hàng bên phải "Bắt buộc · chọn 1" hay "Không bắt buộc · tối đa 2" 13px
  `text-muted`. Không dấu sao đỏ. Chọn đủ giới hạn thì các dòng còn lại mờ và khoá.
- **Chọn sẵn**: app của một quán chọn sẵn lựa chọn phổ biến (cỡ vừa, đá bình thường) để thêm được ngay. App sàn
  nhiều quán không chọn sẵn; nút ghi "Còn 2 mục bắt buộc" và khoá tới khi chọn đủ.
- **Đáy**: một nút 52px giãn hết bề ngang (`J5`), "Thêm vào giỏ · 55.000đ", giá đổi ngay theo lựa chọn × số lượng.
  Bộ đếm số lượng nằm trong nội dung (hàng "Số lượng"), không chen cạnh nút ở đáy.

**Giỏ hàng** (màn con, `J3`)
- **Một trang cuộn, không chia bước.** Thứ tự: cách nhận (điều khiển phân đoạn "Giao tận nơi | Tự đến lấy") →
  thẻ dòng địa chỉ đủ chữ, giờ nhận, lời nhắn cho tài xế → món đã chọn với nút "Thêm món" → gợi ý dùng kèm (hàng
  thẻ nhỏ cuộn ngang) → ưu đãi, thanh toán (dòng có chevron) → tóm tắt tiền.
- **Dòng món**: ảnh 56px, tên, giá bên phải; lựa chọn ghi đủ dưới tên, 13px `text-muted`; "Sửa" mở lại sheet; bộ
  đếm trên dòng, số lượng 1 thì nút trừ thành thùng rác. Không cần nút "Xoá cả giỏ"; có thì ở cuối màn, chữ đỏ, hỏi
  lại (`J7`). Đừng đặt ở góc trái thanh trên, chỗ ngón tay quen bấm để quay lại.
- **Tóm tắt tiền**: tạm tính, phí giao, ưu đãi (dấu − màu thành công), rồi tổng cộng 17px đậm sau vạch. Tổng trên
  nút phải khớp dòng tổng, không có khoản nào ẩn.
- Nút "Đặt hàng · 135.300đ" dính đáy, cách hai mép 16px (`J5`). Không thanh màu tràn sát mép, không chữ in hoa.

**Ưu đãi, thành viên**
- **Thẻ thành viên** là thẻ số chính (`J5`), nền tối: hạng, điểm là số lớn nhất màn, thanh tiến độ tới hạng sau.
  Mã quét ở quầy (mã vạch hay QR) nằm trong ô **trắng** riêng, vì máy quét cần nền sáng; dưới mã là số mã chữ to.
- **Phiếu ưu đãi**: thẻ có cuống trái 96px nền nhạt một sắc ghi mức giảm to ("15%"); thân phải ghi tên phiếu đủ
  chữ, điều kiện 13px `text-muted`, hạn. Hạn dưới 24 giờ thì chữ đỏ, còn lại `text-muted`. Bấm phiếu là áp vào giỏ.

**Đơn hàng**
- Đơn đang làm ở đầu màn: trạng thái bằng chữ, thanh bước 3 đoạn, giờ dự kiến là chữ lớn nhất thẻ. Đơn cũ là dòng
  có nút "Đặt lại" 44px, bỏ nguyên món và lựa chọn cũ vào giỏ.

## Kiểm trước khi giao

- [ ] **App đặt món (`J11`)**: đầu màn là một hàng "Giao đến" cuộn đi, không hai thẻ dính? Thanh giỏ hàng nằm ngay trên thanh tab, không thẻ nổi nào khác ở đáy? Sheet chọn món: mọi nhóm là dòng có "+giá" phải, "Bắt buộc · chọn 1" bằng chữ, không chip, không dấu sao; nút X còn trong tầm khi cuộn; nút đáy giãn hết ghi tổng tiền? Giỏ là một trang cuộn, tóm tắt tiền khớp nút, không "Xoá" ở góc trái thanh trên?
