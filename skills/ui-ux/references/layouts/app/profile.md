# Trang hồ sơ cá nhân

Là trang cài đặt kiểu A (`settings.md`), không phải khuôn riêng. Bộ mục mặc định:

| Mục | Hàng | Lưu |
| --- | --- | --- |
| Thông tin cá nhân | Ảnh đại diện, Họ và tên, Chức danh, Số điện thoại | Ô chữ: nút Lưu ở chân card. Ảnh: áp ngay khi tải xong |
| Đăng nhập | Email, Mật khẩu: chữ chỉ đọc + nút viền "Đổi email", "Đổi mật khẩu" | Luồng riêng (modal) |
| Tuỳ chọn | Ngôn ngữ, Múi giờ | Áp ngay, dấu "Đã lưu" cạnh nhãn |
| Vùng nguy hiểm | Xoá tài khoản | Hộp xác nhận (`overlay.md`) |

- **Avatar trên trang là cùng component, cùng seed màu với avatar ở header / chân sidebar** (`../../components/avatar.md`). Lệch thì header nền chàm, trang hồ sơ nền hổ phách, cùng chữ "T" của cùng một người: nhìn hai chỗ tưởng hai tài khoản.
- **Avatar và tên ở header vẽ theo giá trị đã lưu, không theo ô đang gõ.** Xoá trống ô họ tên thì avatar vẫn là "T", không thành "?". Lưu xong mới đổi, header và trang đổi cùng lúc.
- **Hàng ảnh đại diện có bốn trạng thái:**
  - Chưa có ảnh: chữ cái đầu, nút "Tải ảnh lên", dòng gợi ý `text-xs text-muted` "JPG hoặc PNG, tối đa 2 MB".
  - Có ảnh: "Đổi ảnh" và "Xoá ảnh" **đều là nút `outline`**. Xoá ảnh **không đỏ, không hộp xác nhận**: bấm là xoá ngay, avatar về chữ cái đầu, kèm toast "Đã xoá ảnh đại diện" có nút **Hoàn tác** (`D3`: xoá mà lấy lại được thì xoá ngay + hoàn tác). Có hoàn tác thì không mất gì, nên không phải việc phá huỷ (`rose` của `I4` dành cho thứ mất hẳn: xoá tài khoản, xoá dự án). Hai nút cùng `outline`, không để Xoá ảnh `secondary` nền xám: nó thành nút nặng hơn Đổi ảnh, trong khi đổi ảnh mới là việc người ta hay làm. **Không dùng `ghost`**: chữ `text-muted` đứng cạnh nút viền đọc ra là nút đang khoá, và lúc khoá thật (đang tải ảnh) thì gần như không khác gì (đã dính: "Xoá ảnh" `#828282` cùng xám với dòng gợi ý bên dưới).
  - Đang tải: avatar mờ `opacity-50` với spinner giữa, nút "Tải ảnh lên" khoá.
  - Lỗi: chữ đỏ **thay chỗ** dòng gợi ý, không thêm dòng. Nói số thật và cách sửa: "Ảnh nặng 4,8 MB, chọn ảnh dưới 2 MB".
- **Ảnh áp ngay khi tải xong**, như select, không tính vào nút Lưu của card. Người dùng chọn ảnh xong thấy ảnh mới trên avatar là nghĩ đã xong; bắt bấm Lưu nữa thì rời trang là mất ảnh.
- **Email và mật khẩu không sửa tại chỗ.** Đổi email phải xác nhận địa chỉ mới, đổi mật khẩu phải nhập mật khẩu cũ, nên hàng chỉ đọc + nút mở luồng riêng. Email đang chờ xác nhận thì dưới email hiện một dòng `text-sm text-muted`: "Đang chờ xác nhận **moi@…**", email cũ vẫn là email đăng nhập tới lúc xác nhận. **"Gửi lại" và "Huỷ" đứng một hàng riêng ngay dưới** (`flex gap-4 mt-1`), không nối sau email bằng dấu `·`: là nút chữ `font-medium text-foreground hover:underline underline-offset-2` (như "Thử lại" ở `../../components/file-upload.md`), vùng bấm nới bằng `relative before:absolute before:-inset-x-1.5 before:-inset-y-2` (34px, số âm giữ theo `N11` như nút sao chép ở `description-list.md`). Nối vào câu thì ở 375px email dài đẩy "· Huỷ" xuống đầu dòng mới, dấu `·` mồ côi, và hai nút chữ cao 18px nằm giữa câu, ngón tay khó trúng.
- Mật khẩu ghi mốc đổi gần nhất `text-muted` ("Đổi lần cuối 12/06/2026"), không ghi chuỗi `••••••••`: chấm tròn không nói gì mà trông như ô nhập được.
- **Trang trạng thái** (dựng tĩnh cạnh nhau) đủ các ca: chưa sửa (Lưu khoá), vừa sửa, đang lưu, vừa lưu, lỗi nhập, ảnh quá dung lượng, **có ảnh**, **đang tải ảnh**, **email chờ xác nhận**, tên và chức danh rất dài, vừa đổi múi giờ, hộp xác nhận xoá tài khoản. Hộp xác nhận xem thêm ở 375px: email dài phải xuống dòng ở sau `@` (`../../components/description-list.md`).

---

## Kiểm trước khi giao

Mục kiểm của trang hồ sơ nằm chung với trang cài đặt: "Trang cài đặt / hồ sơ cá nhân" cuối `settings.md`.
