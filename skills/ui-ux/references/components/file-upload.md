# Khu tải tệp lên (file upload)

Một khung kéo thả ở trên, danh sách tệp ở dưới, cả hai nằm trong một card. Toast
chỉ báo khi cả lượt tải kết thúc (xem mục Toast). Nút theo `button.md`, thanh tiến
độ mượn rãnh và màu của `charts.md`, nhưng **dòng tệp có khuôn riêng** ở đây.

```
┌ Tải tài liệu lên ─────────────────────────────────────────────┐
│ ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐ │
│ ╎             Kéo thả tài liệu vào đây                     ╎ │
│ ╎       PDF, Word, Excel, ảnh. Tối đa 25 MB mỗi tệp        ╎ │
│ ╎                    [ ⤒ Chọn tệp ]                        ╎ │
│ └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘ │
│ ▯ bien-ban-hop-khoi-dong-du-an-website-ban-hang…     71%   ✕ │  <- đang tải: thanh mảnh
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━───────────────                │
│ ─────────────────────────────────────────────────────────────  │
│ ▯ bao-cao-khao-sat-hien-trang.pdf                          ✕ │  <- chờ: chữ, không thanh
│   Đang chờ · 6,8 MB                                            │
│ ─────────────────────────────────────────────────────────────  │
│ ▯ bang-du-toan-chi-phi.xlsx                                ✕ │  <- hỏng: chữ đỏ + Thử lại
│   Mất kết nối mạng · Thử lại                                   │
│ ─────────────────────────────────────────────────────────────  │
│ ▯ logo-sao-viet.png                                            │  <- xong: chữ, không thanh
│   ✓ Đã tải xong · 2,4 MB                                       │
└───────────────────────────────────────────────────────────────┘
```

## Khung kéo thả

```html
<label class="flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-border-strong bg-background/60 px-6 py-8 text-center transition-colors hover:bg-background has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-foreground/50 has-[:focus-visible]:ring-offset-2">
  <input type="file" multiple class="sr-only" />
  <!-- Máy cảm ứng không kéo thả được: ẩn câu này, còn dòng gợi ý và nút -->
  <p class="text-sm font-medium text-foreground [@media(hover:none)]:hidden">Kéo thả tài liệu vào đây</p>
  <p class="mt-1 text-pretty text-sm text-muted">PDF, Word, Excel, PowerPoint, ảnh JPG hoặc PNG. Tối đa 25 MB mỗi tệp</p>
  <!-- Trông như nút viền h-9 có icon upload, nhưng là <span>: cả khung đã là chỗ bấm -->
  <span class="mt-4 inline-flex h-9 items-center gap-2 rounded-lg border border-border-strong bg-surface px-3 text-sm font-medium">…Chọn tệp</span>
</label>
```

- **Cả khung là chỗ bấm** (`<label>` bọc `input type="file"` ẩn), không chỉ cái nút. "Chọn tệp" là `<span>` mang hình nút viền: lồng một `<button>` thật vào `<label>` thì bấm nút mở hộp chọn tệp hai lần. Tab tới ô `input` ẩn thì cả khung hiện vòng focus (`has-[:focus-visible]`, `I13`).
- **Viền đứt `border-border-strong`** (`F21` cho phép), nền `bg-background/60`, rê chuột thì nền đậm lên `bg-background`. Nền và viền đều nhạt: khung là chỗ chờ, không phải thứ nặng nhất màn.
- **Đang kéo tệp vào**: viền đậm lên `border-foreground/40`, nền `bg-background`, tiêu đề đổi thành "Thả tệp để tải lên". **Không viền đen đặc** (`border-foreground`): một vòng nét đứt đen chạy quanh cả khung là thứ đậm nhất màn, chỉ để báo "thả được" (đã dính 24/09/2026). Nội dung giữ nguyên chỗ, chỉ đổi chữ tiêu đề (`N1`).
- **Dòng gợi ý nói luật trước khi người dùng chọn**: loại tệp, cỡ tối đa. Đây là thứ họ chưa biết, không phải chữ thừa (`T20`).
- Khung **giữ nguyên cỡ** khi danh sách có tệp. Thu nhỏ khung lúc tệp đầu tiên vào là cả card nhảy (`N1`).
- **Máy cảm ứng ẩn câu "Kéo thả tài liệu vào đây"** (`[@media(hover:none)]:hidden`): điện thoại không kéo tệp vào được, câu đó là chỉ dẫn sai. Còn dòng gợi ý và nút "Chọn tệp".
- **Khoá** (hết dung lượng, không có quyền): khung thôi là chỗ bấm (`<div>` thay `<label>`, `input` `disabled`, bỏ hover, con trỏ thường). **Nền giữ `bg-background/60` như lúc thường**, không chìm xuống `bg-background`: đó là nền của lúc đang kéo tệp vào, khoá mà cùng nền thì hai trạng thái trái nghĩa trông như nhau (đã dính 24/09/2026).
  - **Tiêu đề đổi thành lý do**, giữ `text-foreground font-medium`: "Dự án đã dùng hết 5 GB". Để nguyên "Kéo thả tài liệu vào đây" là mời người dùng làm đúng việc đang bị cấm. **Không làm mờ cả khối**: lý do là thứ duy nhất người dùng cần đọc ở trạng thái này (`N6`, `N8`).
  - **Dòng dưới nói lối ra**, `text-muted`: "Xoá bớt tệp cũ hoặc nâng gói để tải thêm".
  - **Nút "Chọn tệp" mờ bị bỏ, thay bằng nút dẫn tới lối ra** nếu có ("Nâng gói", nút viền `h-9`, bấm được). Nút khoá nằm giữa khung chỉ nói lại điều tiêu đề đã nói (`N2`, `N3`). Khoá tạm mà người dùng không tự gỡ được (dự án đã lưu trữ) thì không nút, dòng dưới nói ai gỡ được.
- **Không có quyền tải lên thì ẩn cả khu tải**, không dựng khung khoá. Người chỉ được xem mà thấy một khung lớn ghi "Bạn chưa có quyền tải tệp lên" ở mỗi lần mở trang là nhận một lời từ chối cho việc họ không định làm; các kho tệp lớn đều ẩn nút tải khi không có quyền. Khung khoá chỉ dành cho khoá **tạm** (hết dung lượng, dự án đã lưu trữ), thứ người đang được phép tải cần biết. Bản cũ còn lặp một ý hai tầng: "Bạn chưa có quyền tải tệp lên" / "Chỉ quản trị dự án tải tệp lên được" (đã dính 24/09/2026).

## Dòng tệp

```html
<ul class="mt-4 divide-y divide-border">
  <li class="flex items-center gap-3 py-3">
    <i data-lucide="file-text" class="size-5 shrink-0 text-muted"></i>
    <div class="min-w-0 flex-1">
      <div class="flex items-baseline gap-3">
        <!-- Tên cắt GIỮA (T14): phần đầu truncate, phần giữ lại = ~8 ký tự cuối của tên + đuôi, shrink-0 -->
        <p class="flex min-w-0 flex-1 text-sm font-medium text-foreground" title="bien-ban-hop-khoi-dong-du-an-website-ban-hang.pdf"><span class="truncate">bien-ban-hop-khoi-dong-du-an-website-</span><span class="shrink-0">ban-hang.pdf</span></p>
        <p class="shrink-0 text-sm text-muted tabular-nums">71%</p>        <!-- chỉ khi đang tải -->
      </div>
      <!-- Tầng dưới: cao cố định, chứa THANH hoặc MỘT DÒNG CHỮ, không bao giờ cả hai -->
      <div class="mt-1 flex min-h-5 items-center">
        <div role="progressbar" aria-valuenow="71" aria-valuemin="0" aria-valuemax="100" aria-label="Đang tải bien-ban-hop-khoi-dong….pdf" class="h-1 w-full rounded-full bg-background">
          <div class="h-1 rounded-full bg-primary" style="width: 71%"></div>
        </div>
      </div>
    </div>
    <div class="flex w-8 shrink-0 justify-end">
      <!-- IconButton ✕ size-8, aria-label="Huỷ tải bien-ban-hop-khoi-dong….pdf" -->
    </div>
  </li>
</ul>
```

| Trạng thái | Góc phải dòng trên | Tầng dưới | Cột ✕ |
| --- | --- | --- | --- |
| Đang chờ | trống | `text-xs text-muted` "Đang chờ · 6,8 MB" | ✕ "Bỏ tệp …" |
| Đang tải | `71%` `text-muted tabular-nums` | thanh `h-1`, rãnh `bg-background`, thanh `bg-primary` | ✕ "Huỷ tải …" |
| Xong | trống | icon `circle-check` `size-3.5 text-emerald-600` + `text-xs text-muted` "Đã tải xong · 2,4 MB" | trống, giữ `w-8` |
| Hỏng khi tải | trống | `text-xs text-red-600` "Mất kết nối mạng" · nút chữ **Thử lại** | ✕ "Bỏ tệp …" |
| Bị từ chối (quá cỡ, sai loại) | trống | `text-xs text-red-600` "Quá 25 MB (tệp nặng 48 MB)" / "Không nhận tệp .zip" | ✕ "Bỏ tệp …" |

- **Chỉ tệp đang tải mới có thanh.** Chờ là chưa bắt đầu, rãnh rỗng không nói gì. Bị từ chối là không bao giờ bắt đầu: rãnh xám rỗng đọc như "sắp chạy". Xong thì **thanh biến mất**: thanh xanh lá đầy + `100%` + "Đã tải xong" là ba tín hiệu cho một ý, và một cột thanh xanh đỏ đen là thứ nặng nhất màn (`N3`, đã dính 24/09/2026). Các kho tệp lớn đều bỏ thanh khi xong.
- **Hỏng thì bỏ thanh và bỏ số %.** "54%" trên một tệp đã hỏng là con số chết: bấm Thử lại là chạy lại từ đầu. Thanh đỏ dừng giữa chừng thêm một khối đỏ đặc cho điều câu chữ đã nói.
- **Tầng dưới cao cố định** (`min-h-5`), chứa thanh hoặc chữ. Dòng đổi trạng thái (chờ → tải → xong) thì cao không đổi, các dòng bên dưới không nhảy (`N1`). Chữ lỗi dài hơn một dòng ở màn hẹp thì được xuống dòng (`min-h`, không `h`), không `truncate` lý do (`N8`).
- **Thanh `h-1`**, không `h-2` như thanh đứng riêng: nhiều tệp tải cùng lúc là nhiều thanh xếp chồng, thanh dày thì cả danh sách thành một dàn sọc đen.
- **Thử lại là nút chữ nằm ngay sau lý do**, `text-xs font-medium text-foreground hover:underline underline-offset-2`, `whitespace-nowrap`, cách lý do bằng ` · `. Không phải nút viền cuối hàng: nút viền đứng cạnh các ✕ làm cột hành động lệch (nút rộng, ✕ hẹp) và nặng hơn cả tên tệp. Hỏng thì **vẫn có ✕ để bỏ tệp**: chỉ có Thử lại là tệp hỏng kẹt lại mãi (đã dính 24/09/2026).
- **Cột ✕ rộng cố định `w-8`** ở mọi dòng, kể cả dòng xong không có nút. Số % và mép phải thanh đứng thẳng một cột (`N1`).
- **✕ nói đúng việc trong `aria-label`, kèm tên tệp**: đang tải là "Huỷ tải …", còn lại là "Bỏ tệp …". Tệp đã tải xong không có ✕ ở đây: xoá tài liệu đã lên là việc của danh sách tài liệu, có hộp xác nhận.
- **Icon theo loại tệp**, `size-5 text-muted`, một màu, **cùng một dáng tờ giấy** (họ `file-*` của lucide): `file-text` (PDF, Word), `file-spreadsheet` (Excel), `file-chart-column` (PowerPoint), `file-image` (ảnh), `file` cho phần còn lại kể cả zip. **Viền tờ giấy phải liền**: không dùng `presentation` (cái bảng, không phải tờ giấy), `file-chart-pie`, `file-archive`, `file-box`, `file-lock`… — nhóm này vẽ một hình tròn, hình hộp đè lên góc dưới trái và cắt mất viền, ở `size-5` trông như icon vỡ (đã dính 24/09/2026 cả hai lần; lucide không có `file-presentation`). Chọn icon mới thì mở SVG xem đường viền ngoài có khép kín không. Không tô màu theo loại (`M5`). **Bảng này là nguồn chung** cho mọi chỗ hiện tệp (cây thư mục, danh sách tài liệu): dự án nên có một hàm chọn icon theo đuôi, không mỗi component một bảng.
- **Tên tệp một dòng, cắt giữa, giữ đuôi** (`T14`, như `tree.md`): "bien-ban-hop-khoi…ban-hang.pdf": không "bien-ban-hop-khoi-dong-du-an-web…" (cắt cuối, mất đúng phần nói loại tệp), cũng không "bien-ban-hop-khoi….docx" (chỉ giữ đuôi, `…` dính `.docx` thành bốn chấm). Cả hai đã dính 24/09/2026. `title` tên đầy đủ **chỉ gắn khi tên thật sự bị cắt** (`T14`), không gắn sẵn cho mọi dòng. Số % `shrink-0`, không bao giờ bị đẩy xuống dòng.
- Danh sách chia `divide-y divide-border` (`F3`), không mỗi tệp một card. Thứ tự là thứ tự thêm vào, tệp mới ở dưới; không tự xếp lỗi lên đầu.
- Số theo một kiểu cả app: `6,8 MB`, `1,1 / 1,5 MB` (gạch chéo có cách, `charts.md`).

## Toast

- **Xong cả lượt**: một toast "Đã tải lên 3 tài liệu", không toast cho từng tệp. Lượt có tệp hỏng thì **không** bắn toast xong.
- **Có tệp hỏng**: danh sách đang hiện trên màn thì **không bắn toast lỗi**, dòng tệp đã nói và đã có Thử lại (`N3`). Toast lỗi chỉ dành cho lúc khu tải không còn trên màn (modal đã đóng, đã sang trang khác): hai tầng "1 tệp chưa tải lên được" / "Mất kết nối mạng", nút Thử lại + ✕ theo `../layouts/overlay.md`. Lúc nào bắn là logic (`N10`); skill chỉ dựng hai bản tĩnh để duyệt.

## Ví dụ tĩnh cần dựng

Chưa có tệp · đang kéo vào khung · danh sách đủ năm trạng thái (có một tên rất dài) ·
khung bị khoá vì hết dung lượng · hai toast. Ở 375px: tên dài cắt giữa vẫn còn đuôi, % và ✕ không bị đẩy xuống, câu "Kéo thả…" đã ẩn.
