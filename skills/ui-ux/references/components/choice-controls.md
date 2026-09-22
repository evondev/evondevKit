# Checkbox, radio, công tắc, select

Bốn ô **chọn** (khác ô gõ ở `input.md`). Dự án đã có component thì dùng của họ,
chỉ chỉnh cho khớp cỡ, màu và focus dưới đây.

Chủ dự án chốt 21/09/2026. Mọi con số dưới là **mặc định**: dự án có nhịp riêng
(form dày, bảng dày) thì đổi cỡ theo dự án, nhưng giữ tỉ lệ và giữ đủ trạng thái.

---

## Cỡ

| | Mặc định | Nhỏ | Nhỏ dùng khi |
| --- | --- | --- | --- |
| Checkbox | `size-5` 20px, bo `rounded-md` 6px, tick `size-3.5` | `size-4` 16px, bo `rounded` 4px, tick `size-3` | Trong bảng, trong menu, dòng `text-xs` |
| Radio | `size-5` 20px | `size-4` 16px | Như trên |
| Công tắc | track `h-6 w-11` (24×44), núm `size-5`, chạy `translate-x-5` | track `h-5 w-9` (20×36), núm `size-4`, chạy `translate-x-4` | Dòng dày, card nhỏ |
| Select | `h-12`, y như ô nhập | theo ô nhập của dự án | |

Công thức công tắc: `rộng track = 2 × núm + 4px` (đệm `p-0.5` hai bên), khoảng
chạy = cỡ núm. Đổi cỡ thì giữ công thức đó, núm không chạm mép track.

16px là cỡ **nhỏ**, không phải mặc định: cạnh chữ `text-sm` thì ô 16px trông
teo, và vùng bấm quá nhỏ trên điện thoại. Vùng bấm thật là cả nhãn (`I26`), nên
luôn bọc ô trong `<label>`.

---

## Viền ô chưa chọn

Ô chưa chọn dùng **`border-[1.5px] border-border-strong`**, cùng token với viền ô
nhập (`M14`), để cả form một độ đậm viền. Rê vào thì viền đậm lên
`hover:border-foreground`.

Viền này chỉ 1.1:1 với nền trắng, chưa đạt WCAG 1.4.11. Đã thử `--muted` (5.3:1)
ngày 21/09/2026, chủ dự án thấy **đậm và xấu**, trả về. Đánh đổi có chủ ý như viền
ô nhập, xem `P3` trong `styles.md`. Bù lại: radio luôn đi kèm nhãn, nhóm radio
luôn có sẵn một lựa chọn đã tô đặc, nên người dùng vẫn đọc ra đây là nhóm lựa
chọn.

---

## Kiểu, chọn theo chỗ đứng

**Ô** có hai kiểu tô:

| Kiểu | Checkbox đã chọn | Radio đã chọn | Hợp khi |
| --- | --- | --- | --- |
| `filled` (mặc định) | nền nhấn, tick `--primary-foreground` | nền nhấn đặc, chấm trắng ở giữa | Mọi chỗ |
| `outline` | viền nhấn, nền trắng, tick màu nhấn | vòng nhấn, khe trắng, chấm nhấn | Trang đã nhiều khối tô đặc, cần nhẹ tay (`M2`) |

Một app chọn **một** kiểu tô, dùng khắp nơi (`D1`).

**Bố cục** có bốn loại:

| Bố cục | Hình | Dùng khi |
| --- | --- | --- |
| Hàng | ô + nhãn một dòng | Lựa chọn tự giải thích: "Nhớ đăng nhập" |
| Hàng có mô tả | ô + nhãn đậm + một câu phụ `text-muted` | Lựa chọn cần một câu hệ quả |
| Card | cả khung viền là vùng bấm, ô ở góc trái trên | 2–4 lựa chọn **quan trọng**, mỗi cái có hệ quả khác nhau: quyền đăng bài, gói cước, phương thức giao hàng |
| Card có icon | như card, thêm icon lucide trong ô vuông `size-10 rounded-lg bg-background` bên trái chữ | Như card, khi các lựa chọn khác nhau về **loại**: giao tiêu chuẩn / giao nhanh / nhận tại cửa hàng |

Công tắc có thêm bố cục **hàng cài đặt**: nhãn + mô tả bên trái, công tắc căn
phải, xem cuối file.

---

## Checkbox

```html
<label class="inline-flex w-fit cursor-pointer items-center gap-3 text-sm">
  <span class="relative inline-flex shrink-0">
    <input type="checkbox" class="peer size-5 cursor-pointer appearance-none rounded-md border-[1.5px] border-border-strong bg-surface outline-hidden transition-colors hover:border-foreground checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:ring-2 focus-visible:ring-focus disabled:cursor-not-allowed disabled:opacity-50" />
    <i data-lucide="check" class="pointer-events-none absolute inset-0 m-auto size-3.5 stroke-[3] text-primary-foreground opacity-0 peer-checked:opacity-100"></i>
    <i data-lucide="minus" class="pointer-events-none absolute inset-0 m-auto size-3.5 stroke-[3] text-primary-foreground opacity-0 peer-indeterminate:opacity-100"></i>
  </span>
  Nhận email thông báo
</label>
```

- **Dựng trên `<input type="checkbox">` thật** + `appearance-none`, không dựng bằng `<div>`. Phím Space, form submit, trình đọc màn hình đều có sẵn.
- `outline`: đổi `checked:bg-primary` thành `checked:bg-surface`, icon `text-primary`.
- **Ba trạng thái** (checkbox tiêu đề bảng: không / một phần / tất cả) đặt bằng JS `input.indeterminate = true`, không có thuộc tính HTML. Icon `minus` thay cho `check`.
- Lỗi (bắt buộc tick mà chưa tick): `border-red-500`, câu lỗi dưới nhãn theo `input.md`.
- Tick "Đồng ý điều khoản" **không bao giờ tick sẵn**.

## Radio

```html
<!-- filled: viền dày 6px màu nhấn, lõi trắng 8px chính là chấm -->
<input type="radio" name="shipping" class="size-5 cursor-pointer appearance-none rounded-full border-[1.5px] border-border-strong bg-surface outline-hidden transition-[border-color,border-width] hover:border-foreground checked:border-[6px] checked:border-primary focus-visible:ring-2 focus-visible:ring-focus disabled:cursor-not-allowed disabled:opacity-50" />

<!-- outline: nền chỉ tô phần lõi (bg-clip-content), padding 3px là khe trắng -->
<input type="radio" name="shipping" class="size-5 cursor-pointer appearance-none rounded-full border-[1.5px] border-border-strong bg-clip-content p-[3px] outline-hidden hover:border-foreground checked:border-2 checked:border-primary checked:bg-primary focus-visible:ring-2 focus-visible:ring-focus disabled:cursor-not-allowed disabled:opacity-50" />
```

Cả hai không cần phần tử phụ, không cần icon. Cỡ nhỏ `size-4`: `filled` dùng
`checked:border-[5px]`, `outline` dùng `p-[2px]`.

- **Nhóm radio luôn có sẵn một lựa chọn** (thường là cái phổ biến nhất). Radio không bỏ chọn được, nên nhóm trắng từ đầu là người dùng không quay lại được trạng thái "chưa chọn". Ngoại lệ: chọn sai gây hậu quả tiền bạc (gói trả phí) thì để trống và bắt chọn.
- Bọc nhóm trong `<fieldset>` + `<legend>` là câu hỏi. Không có legend thì trình đọc màn hình đọc "Giao tiêu chuẩn, nút radio" mà không biết đang hỏi gì.
- Từ 5 lựa chọn trở lên thì dùng select.

## Card chọn

Đang chọn: **viền `--border-focus` + ring `--ring-focus`**, y như ô nhập đang
focus (`I13`). Chỉ viền mà không ring thì hai card cạnh nhau khó thấy cái nào đang
chọn; chỉ tô nền thì cả card đổi màu, quá nặng.

```html
<fieldset class="space-y-3">
  <legend class="mb-3 text-sm font-medium">Ai được đăng bài</legend>

  <label class="flex cursor-pointer items-start gap-3 rounded-xl border border-border-strong bg-surface p-4 transition-colors hover:bg-surface-hover has-checked:border-focus has-checked:ring-2 has-checked:ring-focus has-focus-visible:border-focus has-focus-visible:ring-2 has-focus-visible:ring-focus">
    <input type="radio" name="post" checked class="mt-0.5 size-5 shrink-0 cursor-pointer appearance-none rounded-full border-[1.5px] border-border-strong bg-surface outline-hidden checked:border-[6px] checked:border-primary" />
    <span class="min-w-0">
      <span class="block text-sm font-medium">Mọi thành viên</span>
      <span class="mt-1 block text-sm text-muted">Ai đã tham gia cộng đồng đều đăng được bài.</span>
    </span>
  </label>
  <!-- card thứ hai y hệt, không có `checked` -->
</fieldset>
```

- **Ring đặt trên card, không đặt trên ô tròn.** Ô bên trong không có `focus-visible:ring`: Tab tới thì card sáng lên, hai vòng ring lồng nhau là thừa.
- `has-checked:` là Tailwind v4. Tailwind v3.4 viết `has-[:checked]:`.
- `mt-0.5` để ô 20px thẳng hàng với dòng đầu `text-sm`, không căn giữa cả card.
- Card chưa chọn viền `--border-strong` như ô nhập.
- Checkbox dạng card dùng y hệt, đổi `type="checkbox"`.

---

## Công tắc

Công tắc = **có hiệu lực ngay**, không chờ nút Lưu (`layouts/app.md`, trang cài
đặt). Cần bấm Lưu mới có hiệu lực thì dùng checkbox.

```html
<button type="button" role="switch" aria-checked="false" aria-labelledby="notify-label"
  class="group inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-muted/40 p-0.5 outline-hidden transition-colors hover:bg-muted/60 aria-checked:bg-primary aria-checked:hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-focus disabled:cursor-not-allowed disabled:opacity-50">
  <span class="size-5 rounded-full bg-surface shadow-sm transition-transform group-aria-checked:translate-x-5 group-aria-checked:bg-primary-foreground motion-reduce:transition-none"></span>
</button>
```

- `role="switch"` + `aria-checked`, JS đảo `aria-checked` khi bấm. Có nhãn qua `aria-labelledby`.
- Track tắt `bg-muted/40`, không dùng `--background-hover`: track xám quá nhạt trên card trắng thì trông như công tắc bị khoá (`I8`).
- **Núm trượt là ngoại lệ của `I12`** (chỉ đổi màu khi chuyển trạng thái): vị trí núm là thông tin, nhảy cụp một cái thì mắt không kịp thấy đã đổi. Kèm `motion-reduce:transition-none`.
- `shadow-sm` trên núm là ngoại lệ có tên của `M15`, như ô nổi của tab segmented. Không đổ bóng track.
- Không ghi chữ "Bật / Tắt" trong track. Cần chữ thì đặt cạnh, và chữ đó mô tả **việc**, không mô tả trạng thái.

**Hàng cài đặt:**

```html
<div class="flex items-center justify-between gap-4 py-4">
  <div class="min-w-0">
    <p id="notify-label" class="text-sm font-medium">Thông báo qua email</p>
    <p class="mt-1 text-sm text-muted">Gửi khi có người nhắc tới bạn.</p>
  </div>
  <!-- công tắc ở trên -->
</div>
```

---

## Select

**Nút mở trông y như ô nhập**: cùng cao, cùng viền, cùng bo, cùng focus. Đang
mở cũng giữ viền + ring như đang focus, vì người dùng vẫn đang "ở trong" ô đó.

```html
<button type="button" role="combobox" aria-haspopup="listbox" aria-expanded="false"
  class="group flex h-12 w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-border-strong bg-surface px-4 text-left text-base outline-hidden transition-colors md:text-sm focus:border-focus focus:ring-2 focus:ring-focus aria-expanded:border-focus aria-expanded:ring-2 aria-expanded:ring-focus">
  <span class="truncate">An Giang</span>
  <i data-lucide="chevron-down" class="size-4 shrink-0 text-muted transition-transform group-aria-expanded:rotate-180"></i>
</button>
```

- Chưa chọn thì chữ là placeholder `text-muted`, viết theo `T25`: "Chọn tỉnh, thành phố".
- Radix / shadcn: thay `aria-expanded:` bằng `data-[state=open]:`.
- Lỗi: y như ô nhập, `border-red-500 ring-2 ring-red-500/10`.

**Danh sách mở ra** theo khung dropdown ở `layouts/overlay.md` (`rounded-2xl`,
`p-1`, mục `h-10 rounded-xl`, portal ra `body` theo `I22`):

- Rộng **bằng nút mở** (Radix: `w-(--radix-select-trigger-width)`), cách nút `mt-2`.
- Cao tối đa `max-h-72`, cuộn bên trong. Mở ra thì cuộn sẵn tới mục đang chọn.
- **Mục đang chọn**: chữ `font-medium` + icon `check` `size-4` căn phải. Nền xám `bg-background` là của **mục đang sáng** (chuột hoặc phím mũi tên, `data-[highlighted]`), không phải của mục đang chọn; mở ra thì mục đang chọn sáng trước.
- Trên 8 mục: **ô tìm ở đầu danh sách**, icon `search` trái, placeholder "Tìm tỉnh, thành phố", đường chia bên dưới tràn hai mép (`F25`). Gợi ý (người dùng quyết): gõ là lọc ngay, không bấm Enter; lọc ở máy hay gọi server thì để handler rỗng. Không ra kết quả thì một dòng `text-muted` căn giữa: *Không tìm thấy "xyz"*.
- Dưới 8 mục, không cần tìm, và app chạy nhiều trên điện thoại thì `<select>` gốc là đủ: `appearance-none` + icon `chevron-down` đặt `absolute` bên phải, `pr-10`. Điện thoại mở bánh xe chọn gốc, dễ bấm hơn mọi danh sách tự dựng.

---

## Đủ trạng thái chưa

| Trạng thái | Checkbox / radio | Công tắc | Select |
| --- | --- | --- | --- |
| Thường | viền `--border-strong` | track `muted/40` | viền `--border-strong` |
| Rê vào | viền `--foreground` | track `muted/60` / `--primary-hover` | giữ nguyên, `cursor-pointer` |
| Tab tới | ring `--ring-focus` quanh ô (card: quanh card) | ring quanh track | viền `--border-focus` + ring |
| Đã chọn / bật / đang mở | tô nhấn theo kiểu | track nhấn, núm sang phải | viền + ring, chevron xoay |
| Một phần | icon `minus` (chỉ checkbox) | — | — |
| Lỗi | viền `red-500` + câu lỗi | — | viền `red-500` + ring đỏ |
| Khoá | `opacity-50`, `cursor-not-allowed`, **cả nhãn** | như trái | như trái |

Khoá thì mờ cả nhãn đi cùng ô (`peer-disabled:` hoặc `has-disabled:` trên
`<label>`). Ô mờ mà nhãn vẫn đen thì người dùng bấm vào nhãn, không có gì xảy ra.
