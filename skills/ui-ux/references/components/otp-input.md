# Ô nhập mã OTP

Sáu ô một số, dùng ở màn xác thực email, đăng nhập hai bước. Màn đứng riêng giữa
trang thì theo card một mình (`M29`) và chiều cao `h-12` của form xác thực
(`layouts/form.md`).

```html
<p class="text-sm text-muted">Mã gồm 6 số vừa được gửi tới</p>
<p class="text-sm font-medium [overflow-wrap:anywhere]">
  tran.anh.tuan@gmail.com
  <a href="#" class="ml-1 whitespace-nowrap font-normal text-muted underline underline-offset-2 hover:text-foreground">Đổi email</a>
</p>

<fieldset class="mt-6">
  <legend class="mb-2 text-sm font-medium">Mã xác thực</legend>
  <div class="grid grid-cols-6 gap-2 sm:gap-3">
    <!-- Ô đầu có autocomplete="one-time-code" để điện thoại tự điền từ tin nhắn -->
    <input inputmode="numeric" autocomplete="one-time-code" maxlength="1" aria-label="Số thứ 1 trên 6"
      class="aspect-square w-full min-w-0 rounded-xl border border-border-strong bg-surface text-center text-2xl font-semibold tabular-nums outline-hidden focus:border-focus focus:ring-2 focus:ring-focus" />
    <!-- 5 ô còn lại y hệt, aria-label "Số thứ n trên 6", không có autocomplete -->
  </div>
</fieldset>
```

- **Viền ô là `--border-strong`**, như mọi ô nhập (`M14`, `N5`), không lấy `--border` nhạt hơn của card.
- **Ô vuông `aspect-square`, sáu ô chia đều bề ngang**, `min-w-0` để không tràn ở 375px. Số `text-2xl font-semibold tabular-nums`, căn giữa.
- **Dán cả mã vào ô nào cũng được**, tách ra sáu ô; gõ xong một số thì con trỏ sang ô sau; Backspace ở ô trống thì lùi về ô trước. Đây là cách ô phản hồi, skill lo (`N9`). Gõ đủ sáu số thì tự gửi hay chờ bấm Xác nhận là logic, người dùng quyết.
- **Email đích hiện đậm, đủ, không cắt** (`N8`), kèm link **"Đổi email"**: gõ nhầm email thì đây là lối ra duy nhất (`N6`). Link `whitespace-nowrap`: email dài đẩy nó xuống dòng thì cả cụm "Đổi email" xuống cùng nhau, không bị bẻ thành "Đổi" cuối dòng trên và "email" dòng dưới (đã dính 22/09/2026, `T10`).
- Mở màn là con trỏ nằm sẵn ở ô đầu.
- **Đếm ngược gửi lại** dùng `tabular-nums`, không thì chữ số nhảy qua lại mỗi giây (`N1`). Hai trạng thái, dựng đủ cả hai (`N2`):
  - Đang đếm: "Chưa nhận được mã? Gửi lại sau 0:57", cả câu `text-muted`.
  - Hết đếm: "Chưa nhận được mã?" `text-muted` + **"Gửi lại mã"** là nút ghost chữ `text-foreground font-medium`, có hover. Đừng để nó xám như lúc đang đếm, trông như vẫn còn khoá (`I8`).
- **Sai mã**: cả sáu ô viền `red-500` + ring đỏ mờ, câu lỗi dưới hàng ô nói cách sửa: "Mã chưa đúng, kiểm tra lại email mới nhất". **Mã hết hạn**: câu lỗi "Mã đã hết hạn" kèm nút "Gửi mã mới" ngay trong câu lỗi. Hai lỗi khác nhau thì hai câu khác nhau.
- Nút Xác nhận `primary` rộng hết card, `h-12`. Đang kiểm mã thì spinner thay chỗ icon hoặc thêm trước chữ, chữ giữ nguyên (`components/button.md`).
