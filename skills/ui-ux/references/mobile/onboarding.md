# App điện thoại — Mở app lần đầu, đăng nhập, xin quyền, rỗng

Một mục của luật `J`. Luật nền `J1`–`J8` và bảng các mục ở `mobile.md`, mở file đó trước.

## J12. Mở app lần đầu, đăng nhập, xin quyền, rỗng ⚑

Lấy từ tài liệu chính thức (trang Onboarding, Managing accounts, Privacy của iOS; quyền thông báo của Android; mục
4.8 và 5.1.1(v) của luật duyệt App Store) cộng ảnh màn thật của các app đặt món, ví, mạng xã hội, học, nghe nhạc.
Code mẫu: các màn đăng nhập, nhập mã, bật thông báo, đơn hàng trống, tài khoản trong `layouts/mobile-order.html`.

**Mở app lần đầu**
- **App mua bán, đặt món, đặt lịch: vào thẳng app**, xem menu, thêm giỏ không cần tài khoản; chỉ hỏi đăng nhập ở
  bước cần biết ai làm (bấm "Đặt hàng", "Đặt lịch"). Bắt đăng nhập trước khi cho xem là mất người chưa kịp thấy gì.
- **App phải có tài khoản mới dùng được** (ví, mạng xã hội, học): **một màn chào**, không băng chuyền 3–4 trang.
  Màn chào: logo, một ảnh hay hình lớn, tiêu đề ngắn nói app làm gì, nút chính "Bắt đầu" 52px, nút phụ "Tôi đã có
  tài khoản" 44px dưới, cả hai dính đáy. Đề đòi giới thiệu nhiều trang thì tối đa 3, "Bỏ qua" góc phải mọi trang,
  nút chính luôn ở đáy; chỉ hiện một lần.

**Đăng nhập**
- **App cho người Việt: số điện thoại + mã 6 số là cách chính.** Ô số điện thoại 52px, mã vùng "+84" là nút đổi nước
  nằm trong cùng khung bên trái, `type="tel"` `autocomplete="tel-national"`, chữ 16. Dưới là nút "Tiếp tục".
  App cho người nước ngoài thì email hay số điện thoại, theo đề.
- **Mạng xã hội là đường phụ**: sau vạch "hoặc", nút viền 52px xếp dọc đủ chữ "Tiếp tục với Apple", "Tiếp tục với
  Google", logo gốc (`F16`). **Có Google, Facebook thì có Apple**, cùng cỡ, không phải cuộn mới thấy (luật duyệt App
  Store 4.8: app dùng đăng nhập bên thứ ba phải có thêm một lối đăng nhập giữ kín email; Apple là lối đó). Chỉ số
  điện thoại thì không cần.
- **Câu điều khoản** 13px `text-muted` dưới các nút: "Bằng việc tiếp tục, bạn đồng ý với Điều khoản và Chính sách
  quyền riêng tư", hai link gạch chân. Không ô tick bắt buộc.
- **Mở từ một việc thì là sheet** (`J6`) trên màn đang làm, câu dẫn nói vì sao ("Đăng nhập để đặt hàng", "Giỏ hàng
  giữ nguyên"), đăng nhập xong làm tiếp đúng việc đó. Màn đăng nhập đứng riêng chỉ cho app phải có tài khoản, sau
  màn chào. Trong sheet không cần logo (người dùng đã ở trong app); màn đứng riêng thì có (`layouts/form.md`).
- **Nhập mã** là bước sau trong cùng sheet, nút trái là chevron quay lại bước số. Theo `components/otp-input.md`
  (6 ô, ô đầu `autocomplete="one-time-code"` để iOS gợi ý mã từ SMS trên bàn phím, "Đổi số", đếm ngược), khác web
  hai chỗ: ô cao 56px, và hết đếm thì ngoài "Gửi lại mã" có thêm **"Gọi điện đọc mã"** (SMS hay trễ, phần lớn app
  Việt có lối này). Nút chính nói việc sẽ xảy ra: "Xác nhận và đặt hàng", không chỉ "Xác nhận".
- Sheet một ô nhập: nút chính nằm ngay dưới ô, không dính đáy sheet, vì bàn phím che đáy (nhiều ô thì `J6`). Sang code thì sheet đẩy
  lên theo bàn phím (`KeyboardAvoidingView`, `viewInsets`).

**Xin quyền** (vị trí, thông báo, máy ảnh, danh bạ)
- **Không xin lúc mở app.** Xin đúng lúc dùng tính năng cần nó: vị trí khi bấm "Quán gần tôi" hay chọn địa chỉ,
  thông báo **ngay sau khi đặt đơn xong** ("Báo khi đơn đang tới?"), máy ảnh khi bấm quét mã.
- **Màn mồi trước hộp của hệ thống**: sheet ngắn, icon 28px trong vòng 64px, tiêu đề 20px nói lợi ích cho người
  dùng, một câu nói sẽ báo gì và không báo gì, nút chính **"Tiếp tục"** (mở hộp của hệ thống; không ghi "Cho phép"
  vì hộp hệ thống mới là chỗ cho phép), nút chữ "Để sau". Bấm "Để sau" thì không hỏi lại ở lần đặt sau.
- **Xin đánh giá app** (hộp sao của hệ thống) chỉ sau khi người dùng làm xong một việc có ích (nhận đơn, xong buổi
  tập), không lúc mở app, không giữa luồng, không đặt nút "Đánh giá 5 sao" tự vẽ. Hệ thống tự giới hạn số lần hiện.
- **Đã từ chối thì không hỏi lại bằng hộp**: dòng trong Tài khoản › Cài đặt ghi trạng thái ("Thông báo · Đang tắt"),
  bấm thì mở Cài đặt của máy. Ở chỗ tính năng cần quyền (bản đồ quán), một dòng nhắc kèm nút "Mở Cài đặt".

**Rỗng**
- **Màn gốc của tab chưa có gì** (chưa có đơn, chưa lưu món, chưa có thông báo) là ngoại lệ "màn chính chưa có gì"
  của `components/empty-state.md`: khối giữa vùng trống, hình theo `J16` (nhân vật rộng 35–50% màn; app không dùng
  nhân vật thì icon 36px trong vòng tròn 80px nền `--background`), tiêu đề
  20px "Chưa có đơn nào", một câu `text-muted` nói thứ gì sẽ hiện ở đây, **một** nút chính dẫn tới việc làm nó đầy
  ("Xem menu"), nút rộng theo chữ, không giãn hết. Tiêu đề lớn của màn và thanh tab giữ nguyên chỗ.
- **Hình**: phần lớn app dùng hình minh hoạ của thương hiệu, rộng 35–50% màn, ở chỗ này (11/24 màn rỗng đếm được,
  icon trần chỉ 1). Hình lấy theo `J16`: bộ hình của dự án, chưa có thì nhân vật free sinh tại chỗ.
- Rỗng trong một khối, một mục, kết quả tìm, lọc: vẫn một dòng chữ mờ theo `components/empty-state.md`. Tìm không
  ra món thì dưới dòng đó gợi ý vài món bán chạy, không để trắng.
- Giỏ trống: thanh giỏ hàng ẩn (`J11`); vào giỏ bằng link thì giỏ là màn rỗng như trên, nút "Xem menu".

**Tài khoản, xoá tài khoản**
- App cho tạo tài khoản thì **phải có "Xoá tài khoản" ngay trong app** (luật duyệt App Store 5.1.1(v)), không bắt
  gọi tổng đài hay gửi email. Đặt ở cuối màn Tài khoản (màn nhóm `.is-grouped`), cùng thẻ với "Đăng xuất", cả hai chữ
  đỏ (`I4`: đăng xuất câu 3, xoá tài khoản câu 1). Bấm thì sang màn nói rõ mất gì (điểm, phiếu, lịch sử đơn), rồi xác
  nhận lại bằng mã OTP.

## Kiểm trước khi giao

- [ ] **Mở app, đăng nhập, quyền, rỗng (`J12`)**: app mua bán cho xem trước, chỉ hỏi đăng nhập ở bước đặt? Số điện thoại + mã 6 số là chính, có Google thì có Apple cùng cỡ? Không xin quyền lúc mở app, có màn mồi nút "Tiếp tục" / "Để sau"? Tab chưa có gì có icon, tiêu đề, một câu, một nút? Có "Xoá tài khoản" trong app, chữ đỏ?
