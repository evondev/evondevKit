# Ô nhập mã OTP

Sáu ô một số, dùng ở màn xác thực email, đăng nhập hai bước. Màn đứng riêng giữa
trang thì theo card một mình (`M29`) và chiều cao `h-12` của form xác thực
(`layouts/form.md`).

```html
<p class="text-sm text-muted">Mã gồm 6 số vừa được gửi tới</p>
<p class="text-sm font-medium">
  <!-- In email bằng EmailText (description-list.md), không wrap-anywhere trơn -->
  tran.anh.tuan@gmail.com
  <a href="#" class="ml-1 whitespace-nowrap font-normal text-muted underline underline-offset-2 hover:text-foreground">Đổi email</a>
</p>

<fieldset class="mt-6">
  <legend class="mb-2 text-sm font-medium">Mã xác thực</legend>
  <div class="grid grid-cols-6 gap-2 sm:gap-3">
    <!-- Ô đầu có autocomplete="one-time-code" và maxlength="6": iOS tự điền cả sáu số vào
         ô đầu, onInput chia lại sang năm ô sau. maxlength="1" thì tự điền bị cắt còn một số. -->
    <input inputmode="numeric" autocomplete="one-time-code" maxlength="6" aria-label="Số thứ 1 trên 6"
      class="aspect-square w-full min-w-0 rounded-xl border border-border-strong bg-surface text-center text-2xl font-semibold tabular-nums outline-hidden focus:border-focus focus:ring-2 focus:ring-focus" />
    <!-- 5 ô còn lại y hệt nhưng maxlength="1", aria-label "Số thứ n trên 6", không có autocomplete -->
  </div>
  <!-- Dòng lỗi luôn có mặt, rỗng khi chưa lỗi: giữ chỗ để nút Xác nhận không tụt xuống ngay dưới con trỏ -->
  <p aria-live="polite" class="mt-2 min-h-5 text-sm text-red-600"></p>
</fieldset>
```

- **Viền ô là `--border-strong`**, như mọi ô nhập (`M14`, `N5`), không lấy `--border` nhạt hơn của card.
- **Ô vuông `aspect-square`, sáu ô chia đều bề ngang**, `min-w-0` để không tràn ở 375px. Số `text-2xl font-semibold tabular-nums`, căn giữa.
- **Dán cả mã vào ô nào cũng được**, tách ra sáu ô (cần `onPaste` đọc clipboard; dự án có `input-otp` như InputOTP của shadcn thì dùng nó, nó là một ô thật vẽ thành sáu ô và lo sẵn tự điền, dán); gõ xong một số thì con trỏ sang ô sau; Backspace ở ô trống thì lùi về ô trước. Đây là cách ô phản hồi, skill lo (`N9`). Gõ đủ sáu số thì tự gửi hay chờ bấm Xác nhận là logic, người dùng quyết.
- **Email đích hiện đậm, đủ, không cắt** (`N8`), kèm link **"Đổi email"**: gõ nhầm email thì đây là lối ra duy nhất (`N6`). **Bấm vào thì về bước trước với dữ liệu đã gõ điền sẵn** (họ tên, email; mật khẩu thì để trống, không mang mật khẩu qua state của router), con trỏ nằm ở ô email vì đó là thứ cần sửa. Về form trống thì người dùng phải gõ lại mọi thứ chỉ để sửa một chữ trong email (đã dính 25/09/2026, `/verify-otp` → `/register`). Link `whitespace-nowrap`: email dài đẩy nó xuống dòng thì cả cụm "Đổi email" xuống cùng nhau, không bị bẻ thành "Đổi" cuối dòng trên và "email" dòng dưới (đã dính 22/09/2026, `T10`).
- Mở màn là con trỏ nằm sẵn ở ô đầu.
- **Đếm ngược gửi lại** dùng `tabular-nums`, không thì chữ số nhảy qua lại mỗi giây (`N1`). Hai trạng thái, dựng đủ cả hai (`N2`):
  - Đang đếm: "Chưa nhận được mã? Gửi lại sau 0:57", cả câu `text-muted`.
  - Hết đếm: "Chưa nhận được mã?" `text-muted` + **"Gửi lại mã"** là nút ghost chữ `text-foreground font-medium`, có hover. Đừng để nó xám như lúc đang đếm, trông như vẫn còn khoá (`I8`).
  - **Bấm "Gửi lại mã" thì báo đã gửi**: dòng đổi thành "Đã gửi mã mới · Gửi lại sau 1:00" trong một vùng `role="status"`, chữ "Đã gửi mã mới" giữ tới khi đếm xong. Xoá sáu ô, con trỏ về ô đầu. Chỉ có bộ đếm chạy lại thì người dùng không chắc bấm đã ăn chưa, và trình đọc màn hình không nghe gì (đã dính 25/09/2026).
- **Sai mã**: cả sáu ô viền `red-500` (quầng đỏ chỉ ở ô đang focus, `input.md`), câu lỗi dưới hàng ô nói cách sửa: "Mã chưa đúng, kiểm tra lại email mới nhất". **Mã hết hạn**: câu lỗi "Mã đã hết hạn, bấm Gửi lại mã để nhận mã mới", **không** thêm nút trong câu lỗi. Hai lỗi khác nhau thì hai câu khác nhau.
- **Sau sai mã hoặc mã hết hạn: xoá sáu ô, con trỏ về ô đầu**, câu lỗi và viền đỏ giữ tới khi gõ số đầu tiên. Người dùng gần như luôn gõ lại cả mã (nhìn lại email hoặc lấy mã mới), sáu số cũ còn nằm đó thì phải Backspace sáu lần trước. Cùng cách với ô mật khẩu sau khi đăng nhập sai (`layouts/form.md`). Trang `/states` vẽ trạng thái này bằng sáu ô trống viền đỏ, không phải sáu số đỏ.
- **Một việc, một nút.** Mã hết hạn thì đếm ngược cũng đã hết, dòng dưới đã có "Gửi lại mã". Thêm "Gửi mã mới" trong câu lỗi là hai nút cùng làm một việc, khác tên, người dùng phải đoán có khác nhau không (đã dính 22/09/2026, `N3`, `N5`).
- **Dòng lỗi giữ chỗ sẵn** (`min-h-5`, rỗng khi chưa lỗi). Người dùng bấm Xác nhận, lỗi hiện ra mà không giữ chỗ thì nút tụt xuống một dòng ngay dưới con trỏ (`N1`).
- **Bấm Xác nhận khi chưa đủ sáu số thì phải có phản hồi**: câu lỗi "Chưa nhập mã" (chưa gõ số nào) hoặc "Mã còn thiếu số, nhập đủ 6 số", viền đỏ ở **các ô còn trống** (số đã gõ không sai, giữ viền thường), con trỏ nhảy về ô trống đầu tiên. Bấm mà im lặng thì người dùng tưởng nút hỏng (đã dính 25/09/2026: hàng ô trống, bấm Xác nhận, không có gì xảy ra).
- Nút Xác nhận `primary` rộng hết card, `h-12`. Đang kiểm mã thì spinner thay chỗ icon hoặc thêm trước chữ, chữ giữ nguyên (`components/button.md`).
