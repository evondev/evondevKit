# Trang cài đặt

**A. Một cột, chia mục có tiêu đề** (mặc định, dưới 15 tuỳ chọn)

```
Tài khoản
┌─────────────────────────────────────┐
│ Tên hiển thị          [ô nhập     ] │
│ ─────────────────────────────────── │
│ Email                 name@mail.com │
└─────────────────────────────────────┘

Giao diện
┌─────────────────────────────────────┐
│ Chế độ tối                    [   ○]│
└─────────────────────────────────────┘

Vùng nguy hiểm
┌─────────────────────────────────────┐
│ Xoá tài khoản              [Xoá]    │
└─────────────────────────────────────┘
```

- Mỗi mục là **một khối chia kẻ**, không phải mỗi tuỳ chọn một card.
- Nhãn trái, điều khiển phải, cùng một hàng.
- **Nhãn thẳng hàng với ô, không với cả khối bên phải.** Hàng có chữ gợi ý hoặc lỗi dưới ô thì khối phải cao hơn ô; nhãn căn giữa cả hàng là tụt xuống lưng chừng giữa ô và dòng chữ. Grid mặc định kéo ô nhãn cao bằng cả hàng (`stretch`), nên `min-h` + `items-center` trên ô nhãn không đủ, phải có `sm:items-start` trên hàng (thiếu thì nhãn "Múi giờ" và nhãn của ô đang báo lỗi lệch xuống 11px so với ô):

  ```html
  <div class="grid gap-2 px-4 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-start sm:gap-6 sm:px-5">
    <!-- min-h bằng chiều cao ô: nhãn một dòng nằm đúng tâm ô -->
    <div class="flex min-w-0 flex-wrap items-center gap-x-2 sm:min-h-11 md:min-h-10">
      <label for="timezone" class="text-sm font-medium">Múi giờ</label>
      <!-- dấu "Đã lưu" ở đây -->
    </div>
    <div class="flex min-w-0 flex-col gap-2">
      <!-- ô, rồi chữ gợi ý hoặc lỗi -->
    </div>
  </div>
  ```

  Hàng **chữ chỉ đọc + nút** (Email, Mật khẩu) cũng `sm:items-start`: nhãn và nút nằm ở dải cao bằng ô đầu hàng, chữ giá trị `sm:py-2.5` để dòng đầu thẳng nhãn. Căn giữa thì giá trị dài bốn dòng (email xuống dòng + dòng "Đang chờ xác nhận…") làm nhãn "Email" trôi xuống giữa dòng 2 và 3. Chỉ hàng ảnh đại diện căn giữa (`sm:items-center`): avatar cao 64px, không có dòng đầu nào để thẳng theo.

  **Mục chỉ có chữ chỉ đọc (không ô, không nút) thì hàng không mượn dải cao của ô**: `min-h-11` và `sm:py-2.5` có để nhãn thẳng tâm ô, không có ô thì hàng một dòng chữ cao 72px, trống nửa hàng. Thường là dấu hiệu mấy hàng đó nên gộp thành dòng phụ của hàng trên ("Gia hạn tiếp theo", "Dùng gói này từ", xem "Trang thanh toán").
- Không viết chữ giải thích dưới mọi dòng. Chỉ giải thích thứ thật sự khó đoán.
- Vùng nguy hiểm tách xuống cuối cùng.
- **Mặc định dựng kiểu không có nút "Lưu thay đổi" tổng**: mỗi dòng chừa chỗ cho một dấu "Đã lưu" nhỏ cạnh điều khiển (hình ba trạng thái ở `../../components/loading.md`). Lưu lúc nào, gọi gì là việc của người dùng, skill chỉ để handler rỗng (`onChange`). **Toggle, select áp ngay; ô chữ thì lưu khi rời ô, hoặc có nút Lưu riêng của đúng khối đó** (mỗi card cài đặt có ô chữ thì có nút Lưu ở chân card). Cái cần tránh là **một nút Lưu tổng cho cả trang** trong khi có toggle tự áp: người dùng không biết bật xong có phải bấm Lưu không. Nút Lưu của khối khoá khi chưa có gì đổi.

- **Hàng cài đặt có mô tả thì câu lỗi và câu lý do khoá thay chỗ mô tả, giữ cỡ `text-sm` của mô tả.** `text-xs` chỉ dành cho dòng nằm dưới ô trong form, cạnh chữ gợi ý cũng `text-xs`. Trong khung chia kẻ, mô tả các hàng đều `text-sm`; câu "Bật Email ở trên để nhận bản tin." `text-xs` đứng giữa chúng thì hàng khoá trông như chữ chú thích lạc vào, và hàng cao thấp đổi theo lúc bật tắt Email.
- **Câu mô tả của công tắc mở khu phải đọc được khi khu đang đóng.** "Không gửi… trong khung giờ này" khi hai ô giờ còn giấu thì "khung giờ này" trỏ vào thứ chưa thấy. Viết cho lúc tắt: "Không gửi email và thông báo trình duyệt vào khung giờ bạn chọn."

## Khu cài đặt có nhiều trang

App có từ hai trang cài đặt trở lên (Hồ sơ, Thông báo, Bảo mật…) thì chúng là **một khu** có
điều hướng riêng, không phải mấy route rời chỉ gõ được bằng tay.

```
header h-16:  Cài đặt                           <- là <h1>, tên khu
              Hồ sơ   Thông báo   Bảo mật       <- tab underline, mỗi tab một route
              ─────── ━━━━━━━━━ ────────────
              Kênh nhận                         <- vào thẳng mục đầu, không đầu trang riêng
              ┌──────────────────────────────┐
```

- **Route gốc không bao giờ trống**: `/settings` chuyển thẳng (replace, không thêm lịch sử) tới trang con đầu. Mục "Cài đặt" ở sidebar sáng ở mọi trang con (`aria-current` theo tiền tố route).
- **Dưới 6 trang: hàng tab `underline` trên cùng vùng nội dung**, rộng bằng cột nội dung (`max-w-2xl`), chữ tab đầu thẳng cột với tiêu đề mục bên dưới. Tab là `<Link>` có `aria-current="page"`, không `role="tablist"`: mỗi tab là một trang, nút Back phải quay về tab trước. Không dùng `solid`: trang cài đặt đầy công tắc bật đã tô `--primary`, thêm viên đen ở đầu trang là hai loại khối đen tranh nhau, và chữ trong viên thụt `px-3` lệch cột với nội dung.
- **Từ 6 trang trở lên: cột nav dọc bên trái** (kiểu B), `w-48 shrink-0`, mục cùng khuôn link sidebar: `h-10 rounded-xl px-3 text-sm text-foreground/70 outline-hidden`, rê `hover:bg-item-hover hover:text-foreground`, đang chọn một bậc đậm hơn `bg-secondary font-medium text-foreground`, có `aria-current="page"`. Cột đặt trong khung trắng `bg-surface rounded-2xl p-2`: đứng thẳng trên nền trang xám thì nền rê `--background` trùng nền trang, rê không thấy gì (`I10`). Dưới `lg` cột đó thành hàng tab `underline` cuộn ngang ở trên (`../../responsive.md`).
- **Tên khu ở thanh header là `<h1>`, trang con không có đầu trang riêng.** Tab đang sáng đã nói đang ở trang nào; thêm tiêu đề "Thông báo" + một câu mô tả dưới hàng tab là ghi tên trang hai lần (luật "một trang đúng một `<h1>`" ở "Đầu trang trong vùng nội dung"). Trang trạng thái (`/settings/…/states`) giữ đường dẫn cha như cũ.
- **Hồ sơ cá nhân là tab đầu của khu**, không phải route riêng ngoài khu. Mục "Hồ sơ" trong menu tài khoản dẫn tới đúng tab đó.
- **Đường kẻ dưới hàng tab rộng đúng bằng cột nội dung**, không rộng bằng khung cuộn của hàng tab (khung này rộng hơn cột 8px mỗi bên để chữ tab đầu thẳng cột, `small-controls.md`): kẻ ở khung cuộn thì đường kẻ thò ra 8px hai bên so với mép card bên dưới. Vẽ bằng `before:absolute before:inset-x-2 before:bottom-0 before:h-px before:bg-tab-rail` (`small-controls.md`) trên khối bọc hàng tab (`relative`), số dương, không `-mx` (`N11`). Dùng `before:` chứ không `after:`: `::after` là con cuối nên vẽ đè lên vạch tab đang chọn. Tab theo mẫu `underline` (`box-content h-10 pb-px`, vạch `bottom-0`) thì khối bọc cao 41px, đường kẻ nằm đúng dòng cuối, vạch đè lên. Cột nội dung có `max-w-*` thì cộng thêm 16px cho phần hàng tab lấn ra hai bên (`max-w-2xl` thành `max-w-[43rem]`), các khối khác trong cột `mx-2` (ở 375 và 768px vị trí mọi phần tử trùng bản `-mx-2`). Màu `border-border-strong`: đường này nằm trên nền trang xám, `--border` (`#f7f7f8`) ở đó còn sáng hơn nền nên mất hẳn. Đừng tự pha `border-foreground/10` (trên nền trang ra `#e1e1e3`, đậm hơn hẳn). Vạch 2px của tab đang chọn vẫn đè lên đường kẻ này.
- Màn hẹp: hàng tab cuộn ngang theo `small-controls.md` ("Hàng chip ở màn hẹp"), không xuống dòng, không đổi thành select.

**B. Tab dọc bên trái** (từ 15 tuỳ chọn trên một trang, hoặc từ 6 trang cài đặt trở lên): xem mục "Khu cài đặt có nhiều trang" ngay trên.

## Trang tuỳ chọn thông báo

Là trang cài đặt kiểu A. Bộ mục mặc định: **Kênh nhận** (trình duyệt, email, email tổng hợp),
**Báo cho bạn khi** (mỗi loại việc một công tắc, cuối là mốc nhắc hạn chót), **Không làm phiền**
(công tắc mở khung giờ trượt ngay dưới, cùng hàng).

- **Nói rõ công tắc loại việc có áp cho chuông trong app hay không, ở MỘT chỗ.** Mục Kênh nhận ghi "Chuông luôn nhận đủ" mà mục bên dưới ghi "Áp dụng cho mọi kênh đang bật" thì tắt "Có bình luận mới" xong người dùng không biết chuông còn báo không. Mặc định: chuông nhận đủ, công tắc loại việc chỉ áp cho kênh gửi ra ngoài, và câu mô tả mục ghi đúng vậy: "Áp dụng cho trình duyệt và email."
- Nhiều loại việc × nhiều kênh mà cần chọn riêng từng ô (ví dụ bình luận chỉ qua email) thì mới dựng bảng lưới việc × kênh bằng checkbox. Quy ước chia đôi: sản phẩm có nhiều loại sự kiện và từ hai kênh gửi ra ngoài (email, đẩy) thì dùng lưới, sản phẩm ít sự kiện dùng danh sách công tắc. Mặc định của skill là ba mục trên, vì app dashboard thường ít sự kiện; dự án có trên ~6 loại việc và hai kênh gửi ra ngoài thì đề xuất lưới lúc giao.
- Hàng có ô chọn cùng khuôn hàng công tắc (nhãn trái, ô phải `sm:w-48`); dưới `sm` ô xuống dưới chữ, rộng hết hàng.
- Trình duyệt đang chặn quyền thông báo: công tắc khoá ở trạng thái tắt, câu lý do nói chỗ mở lại (biểu tượng ổ khoá cạnh địa chỉ trang). Email tắt thì email tổng hợp khoá theo, lý do "Bật Email ở trên để nhận bản tin."

---

## Kiểm trước khi giao

Chạy cùng cổng 2 của `checklist.md` khi trang có đúng thứ này.

- [ ] **Trang cài đặt / hồ sơ cá nhân**: hàng có chữ gợi ý hoặc lỗi dưới ô thì nhãn còn thẳng tâm ô, hay tụt xuống giữa ô và dòng chữ (thiếu `sm:items-start` trên hàng)? Avatar lớn trên trang cùng màu với avatar của chính người đó trên header chưa? Xoá trống ô họ tên thì avatar có thành "?" không (phải giữ chữ của tên đã lưu)? Dấu `*` ở nhãn và ở dòng chú thích cùng đỏ chưa? Hàng Email nhiều dòng: nhãn thẳng dòng đầu hay trôi xuống giữa? Có đủ trạng thái có ảnh (Đổi ảnh + Xoá ảnh, cả hai `outline`, Xoá ảnh không đỏ vì có Hoàn tác (`I4`), không ghost xám trông như khoá), đang tải ảnh, email chờ xác nhận? Email trong hộp xoá tài khoản ở 375px xuống dòng sau `@`, hay vỡ giữa tên miền (`layouts/app.md`, "Trang hồ sơ cá nhân")?
- [ ] **Khu cài đặt và trang thông báo**: bấm "Cài đặt" ở sidebar và ở đường dẫn trên header có ra trang con đầu, hay trang trắng? Có hàng tab `underline` nối các trang cài đặt (Hồ sơ, Thông báo, Bảo mật), tab là link có `aria-current`? Trang con còn đầu trang riêng lặp tên tab không? Câu lỗi, câu lý do khoá trong hàng cài đặt cùng cỡ `text-sm` với mô tả các hàng khác chưa? Mục "Báo cho bạn khi" nói rõ có áp cho chuông không, hay mâu thuẫn với câu "Chuông luôn nhận đủ"? Mô tả công tắc mở khu có trỏ vào thứ đang giấu ("khung giờ này") không (`layouts/app.md`, "Khu cài đặt có nhiều trang", "Trang tuỳ chọn thông báo")?
