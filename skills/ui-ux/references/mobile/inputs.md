# App điện thoại — Ô nhập và bàn phím

Một mục của luật `J`. Luật nền `J1`–`J8` và bảng các mục ở `mobile.md`, mở file đó trước.

## J13. Ô nhập và bàn phím ⚑

Lấy từ trang Virtual keyboards, Accessibility của iOS. Bàn phím ăn gần nửa màn, nên ô sai loại hay nút bị che là lỗi
người dùng gặp ngay lần gõ đầu.

- **Mỗi ô đúng loại bàn phím**, ghi trong HTML mẫu để người chuyển sang code chép theo:

| Ô | HTML | Sang code |
| --- | --- | --- |
| Số tiền, số lượng | `inputmode="numeric"` (có lẻ thì `decimal`) | `keyboardType="number-pad"` / `TextInputType.number` |
| Số điện thoại | `type="tel"` `autocomplete="tel-national"` | `phone-pad`, `textContentType="telephoneNumber"` |
| Email | `type="email"` `autocomplete="email"` | `email-address`, `autoCapitalize="none"` |
| Mật khẩu | `type="password"`, `autocomplete="current-password"` (đăng ký: `new-password`) | `secureTextEntry`, `textContentType="password"` |
| Mã OTP | `inputmode="numeric"` `autocomplete="one-time-code"` | `textContentType="oneTimeCode"` / `AutofillHints.oneTimeCode` |
| Tên, địa chỉ | `autocomplete="name"`, `street-address` | `textContentType="name"`, `fullStreetAddress` |
| Tìm kiếm | `type="search"` `enterkeyhint="search"` | `returnKeyType="search"` |

- `type="search"` tự vẽ nút × xanh của Chrome. Ô có nút xoá tự dựng thì tắt nút đó
  (`[&::-webkit-search-cancel-button]:appearance-none`, `components/input.md`), không thì ô có hai nút xoá.

- Email, mã, tên đăng nhập tắt tự viết hoa, tự sửa chữ (`autocapitalize="off"` `autocorrect="off"` `spellcheck="false"`).
- **Phím Enter nói việc tiếp theo**: form nhiều ô thì `enterkeyhint="next"` nhảy sang ô sau, ô cuối `done` hay
  `send`; Enter ở ô cuối làm đúng việc của nút chính.
- **Bàn phím mở thì ô đang gõ và nút chính vẫn thấy.** Nút dính đáy của form (`J5`) đẩy lên nằm ngay trên bàn phím,
  vùng cuộn co lại để ô đang gõ không chui dưới bàn phím. Sheet có ô nhập theo `J6` (một ô: nút ngay dưới ô; nhiều
  ô bật bàn phím sẵn: "Lưu" góc phải hàng đầu). Sang code:
  `KeyboardAvoidingView` hay `react-native-keyboard-controller`; Flutter giữ `resizeToAvoidBottomInset` mặc định.
- **Màn hay sheet chỉ có một ô chính** (tìm kiếm, số tiền ở sheet thêm, mã OTP) thì focus sẵn, bàn phím lên luôn.
  Form nhiều ô không tự bật bàn phím: người dùng cần nhìn hết form trước.
- Cuộn danh sách hay bấm ra ngoài ô thì cụp bàn phím (`keyboardDismissMode="on-drag"`, `onTapOutside`).
- **Ô số tiền to giữa sheet co theo chữ** (`[field-sizing:content] min-w-8 text-center`, như `mobile-app.html`), đơn vị
  "đ" cách số 4px (`gap-1`). Ô rộng cố định thì số căn giữa trong ô, "đ" đứng trơ cách xa 20–40px tuỳ số dài ngắn.
  Trình duyệt chưa có `field-sizing` thì đo chữ và đặt `width` bằng JS mỗi lần gõ. Probe báo "cách "đ" …px".
- **Wireframe và bản mẫu vẽ bàn phím** ở màn hay sheet bật bàn phím sẵn: khối `bg-[#d1d3d9]` dính đáy khung, cao
  khoảng 290px (bàn phím số ở khung 390×844; bàn phím chữ có hàng gợi ý khoảng 335px), che phần dưới như máy thật;
  bấm ra ngoài ô thì cụp. Màn có nút dính đáy thì nút nằm ngay trên khối đó. Không vẽ thì người duyệt thấy cả form,
  chọn phương án mà không biết lúc gõ số tiền chỉ còn thấy nửa trên, hàng chọn người nằm dưới bàn phím. Code bàn phím
  chữ và bàn phím số chép từ `layouts/mobile-playful.html` (màn Tên gọi, màn Nhập mã), không vẽ lại.

## Kiểm trước khi giao

- [ ] **Ô nhập và bàn phím (`J13`)**: mỗi ô đúng `type` / `inputmode` / `autocomplete` (số tiền, số điện thoại, email, OTP, tìm kiếm)? Phím Enter nói việc tiếp theo? Màn một ô chính focus sẵn, form nhiều ô thì không? Nút dính đáy không bị bàn phím che?
