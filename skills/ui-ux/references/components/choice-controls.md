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
| Select | `h-11 md:h-10`, y như ô nhập | theo ô nhập của dự án | |

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

Viền này chỉ ~1.2:1 với nền trắng, chưa đạt WCAG 1.4.11 (nhích từ 1.1:1 ngày 23/09/2026, radio chưa chọn gần như vô hình). Đã thử `--muted` (5.3:1)
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
    <input type="checkbox" class="peer size-5 cursor-pointer appearance-none rounded-md border-[1.5px] border-border-strong bg-surface outline-hidden transition-colors hover:border-foreground checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50" />
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
<input type="radio" name="shipping" class="size-5 cursor-pointer appearance-none rounded-full border-[1.5px] border-border-strong bg-surface outline-hidden transition-[border-color,border-width] hover:border-foreground checked:border-[6px] checked:border-primary focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50" />

<!-- outline: nền chỉ tô phần lõi (bg-clip-content), padding 3px là khe trắng -->
<input type="radio" name="shipping" class="size-5 cursor-pointer appearance-none rounded-full border-[1.5px] border-border-strong bg-clip-content p-[3px] outline-hidden hover:border-foreground checked:border-2 checked:border-primary checked:bg-primary focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50" />
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
  class="group inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-muted/40 p-0.5 outline-hidden transition-colors hover:bg-muted/60 aria-checked:bg-primary aria-checked:hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50">
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
  class="group flex h-11 w-full md:h-10 cursor-pointer items-center justify-between gap-2 rounded-xl border border-border-strong bg-surface px-4 text-left text-base outline-hidden transition-colors md:text-sm focus:border-focus focus:ring-2 focus:ring-focus aria-expanded:border-focus aria-expanded:ring-2 aria-expanded:ring-focus">
  <span class="truncate">An Giang</span>
  <i data-lucide="chevron-down" class="size-4 shrink-0 text-muted transition-transform group-aria-expanded:rotate-180"></i>
</button>
```

- Chưa chọn thì chữ là placeholder `text-muted`, viết theo `T25`: "Chọn tỉnh, thành phố".
- Radix / shadcn: thay `aria-expanded:` bằng `data-[state=open]:`.
- **Nút lọc dạng dropdown ngoài form** (co theo chữ, `w-fit`) cũng mượn đúng trạng thái mở này: viền `border-focus` + `ring-2`, nền giữ trắng. **Không có hover**, như ô Select trong form: mũi tên + `cursor-pointer` đã đủ báo bấm được (`button.md`). Đừng mượn hover của nút viền: đã thử tô nền xám (tan vào nền trang) rồi viền đậm lên, chủ dự án chốt bỏ hẳn 25/09/2026.
- Lỗi: y như ô nhập, `border-red-500`, quầng `ring-red-500/10` chỉ khi đang focus.

**Danh sách mở ra** theo khung dropdown ở `layouts/overlay.md` (`rounded-2xl`,
`p-1`, mục `h-10 rounded-xl`, portal ra `body` theo `I22`):

- Rộng **bằng nút mở** (Radix: `w-(--radix-select-trigger-width)`), cách nút `mt-2`.
- Cao tối đa **`max-h-76`** (304px), cuộn bên trong: lộ 7 mục rưỡi, mục thứ 8 bị cắt ngang để báo còn nữa (`I18`). `max-h-72` cũ cắt đúng sát ranh giới mục thứ 8 (chỉ lộ 4px), nhìn như danh sách hết ở mục 7. Mở ra thì cuộn sẵn tới mục đang chọn và chớp thanh cuộn một lần (`flashScrollbar`, `I18`). Danh sách chiếm cả khung `rounded-2xl` nên cả hai đầu rãnh chạm góc bo: `[&::-webkit-scrollbar-track]:my-4`, khe `p-1 pr-0 [scrollbar-gutter:stable]` (`I18`).
- **Mục có mô tả** (vai trò, gói, quyền): hai tầng, tên `text-sm font-medium` + một câu `text-sm text-muted` nói **quyền làm được gì**, mục cao theo nội dung (`py-2.5`), không ép `h-10`. Ô đã đóng chỉ hiện tên, không hiện mô tả. Chọn quyền mà không có câu này thì người mời phải đoán "Thành viên" khác "Chỉ xem" chỗ nào.
- **Mục đang chọn**: chữ `font-medium` + icon `check` `size-4` căn phải. Nền xám `bg-background` là của **mục đang sáng** (chuột hoặc phím mũi tên, `data-[highlighted]`), không phải của mục đang chọn; mở ra thì mục đang chọn sáng trước.
- Trên 8 mục: **ô tìm ở đầu danh sách**, icon `search` trái, placeholder "Tìm tỉnh, thành phố", đường chia bên dưới tràn hai mép (`F25`). Gợi ý (người dùng quyết): gõ là lọc ngay, không bấm Enter; lọc ở máy hay gọi server thì để handler rỗng. Không ra kết quả thì một dòng `text-muted` căn giữa: *Không tìm thấy tỉnh, thành phố nào*. **Không nhắc lại từ khoá**: nó nằm ngay ô tìm phía trên (`N3`), và từ khoá dài bị cắt giữa chữ thành "của phò…" (đã dính 24/09/2026 ở command palette).
- Dưới 8 mục, không cần tìm, và app chạy nhiều trên điện thoại thì `<select>` gốc là đủ: `appearance-none` + icon `chevron-down` đặt `absolute` bên phải, `pr-10`. Điện thoại mở bánh xe chọn gốc, dễ bấm hơn mọi danh sách tự dựng.

---

## Ô chọn giờ

Nút mở y như select (`h-11 md:h-10`, icon `clock` bên phải, giá trị `tabular-nums`),
bấm ra một popover có các cột cuộn.

```
┌──────────────────────────────┐
│   Giờ      Phút     Giây     │   <- nhãn cột text-xs, cột đang đứng: text-foreground
│   06        28       58      │
│   07        29       59      │
│ ┌──────────────────────────┐ │
│ │ 08        30       00    │ │   <- MỘT dải nền chạy ngang cả ba cột
│ └──────────────────────────┘ │
│   09        31       01      │
│   10        32       02      │
└──────────────────────────────┘
```

- **Giá trị đang chọn là MỘT dải ngang xuyên ba cột**, nền `bg-background` bo `rounded-xl`, số trong dải `font-semibold text-foreground`. Không tô từng ô bằng khối `primary` đặc: ba khối đen trong một popover nhỏ là thứ nặng nhất màn hình, và mắt đọc ra ba lựa chọn rời chứ không đọc ra một mốc "08:30:00" (đã dính 22/09/2026). Cùng tinh thần select: đang chọn là chữ đậm, không phải nền màu nhấn.
- **Mọi cột đều cuộn vòng, kể cả cột giây**, không có đầu cuối. Phía trên `00` là `23` (cột giờ) hay `59` (cột phút, giây), phía dưới `59` là lại `00`, như mặt đồng hồ. Nhờ vậy số đang chọn của mọi cột luôn nằm giữa, cùng một hàng, và vùng cuộn lúc nào cũng đầy số. **Không chèn đệm trống trên dưới** để đẩy `00` xuống giữa: nửa trên popover trống trơn, trông như chưa tải xong (đã dính 22/09/2026, luật cũ của skill bảo thêm đệm).
- **Dải chọn đứng yên ở giữa là cố ý** (kiểu bánh xe): số nằm trong dải là số được chọn. Nhưng **không chỉ cuộn mới chọn được**. Đủ ba đường: **bấm vào một số** thì số đó trượt vào dải và được chọn (`cursor-pointer`, hover chữ lên `text-foreground`); cuộn chuột hoặc kéo; phím mũi tên. Chỉ cho cuộn thì trên desktop rất khổ: bàn di chuột cuộn một phát trượt qua năm sáu số.
- Gợi ý (người dùng quyết): cho **gõ thẳng vào ô** theo từng đoạn `HH`, `mm` như `<input type="time">`. Người quen bàn phím gõ `0830` nhanh hơn mọi bánh xe, popover chỉ là đường phụ.
- **Cuộn vòng phải cuộn liền tay được.** Cách dựng: lặp danh sách nhiều vòng (khoảng 10 vòng: 240 ô giờ, 600 ô phút, vẫn nhẹ), mở ra đứng ở vòng giữa, và **chỉ kéo về vòng giữa khi đã dừng cuộn** (`scrollend`, hoặc 150ms không có sự kiện `scroll`), đổi `scrollTop` đúng một bội số chiều dài vòng nên mắt không thấy nhảy. Đừng chỉ lặp 3 vòng rồi kéo về giữa lúc đang cuộn: đổi `scrollTop` giữa đà cuộn là trình duyệt cắt đà, cuộn tới một điểm thì khựng lại, phải thả tay cuộn lại (đã dính 22/09/2026). Đây là lỗi của cách dựng component, skill lo, không đẩy cho người dùng.
- **Chưa chọn thì ô vẫn hiện placeholder** ("Chọn giờ gửi"). Mở popover thì bánh xe dừng sẵn ở một mốc gợi ý (giờ hiện tại làm tròn, hay mốc người dùng truyền vào, họ quyết), nhưng giá trị chỉ ghi vào ô khi người dùng cuộn, bấm, hoặc Enter. Mở ra mà ô tự điền `00:00:00` là đang chọn hộ.
- **Không số nào bị cắt nửa**: cao vùng cuộn đúng một số lẻ ô (5 ô `h-10` = `h-50`), `scroll-snap-type: y mandatory` + `snap-center` mỗi ô. Mép trên dưới làm mờ dần bằng `mask-image` (`linear-gradient` trong suốt ở hai đầu) để báo "còn nữa", thay cho chữ bị xén ngang.
- **Cột đang đứng (bàn phím)**: nhãn cột lên `text-foreground`, các cột khác `text-muted`. Không vòng viền quanh ô (`I13`).
- **Mặc định chỉ giờ và phút** (`HH:mm`). Cột giây chỉ thêm khi đề cần tới giây, người dùng quyết.
- Màn cảm ứng: gợi ý (người dùng quyết) dùng `<input type="time">` gốc, điện thoại mở bánh xe chọn giờ sẵn, dễ bấm hơn cột tự dựng. Cùng lý do với select dưới 8 mục.
- **Kiểu khác, chỉ dựng khi đề yêu cầu: cột danh sách** (kiểu Ant Design). Không có dải chung; mỗi cột tô nền `bg-background` cho đúng ô đang chọn, chữ `font-semibold`; ô đang chọn cuộn lên hàng đầu cột; cột không cuộn vòng, cuối cột có đệm để `59` lên được hàng đầu. Hợp desktop dày thông tin, nhưng mất cái lợi đọc giờ thành một hàng. Mặc định vẫn là bánh xe ở trên.
- Lỗi và khoá theo đúng ô nhập: lỗi viền `red-500` + ring đỏ mờ + câu lỗi dưới ô nói mốc cần so ("phải sau giờ bắt đầu 08:30"); khoá theo bảng dưới.

## Ô chọn ngày

> **Kiểm thư viện trước** (bảng thư viện chuyên dụng trong `SKILL.md`). Dự án có
> `react-day-picker` (shadcn `Calendar`), `@mantine/dates`, `react-datepicker`…
> thì dùng nó, chỉnh cho ra hình dưới đây. Chưa có thì dựng theo mục này; chỉ
> đề xuất thư viện khi cần thứ tự dựng sẽ tốn (nhiều múi giờ, lịch âm, nhiều
> ngôn ngữ).

Nút mở y như ô nhập (`h-11 md:h-10`, icon `calendar` bên phải, placeholder
"Chọn ngày"), bấm ra popover lịch tháng.

```
┌────────────────────────────┐
│ [Tháng 9, 2026 ▾]    ‹  ›  │   <- tiêu đề là NÚT: bấm để đổi tháng/năm
│ T2 T3 T4 T5 T6 T7 CN       │
│ 31  1  2  3  4  5  6       │   <- ngày tháng khác: text-muted
│  …                         │
│ 21 [22] 23 …               │   <- hôm nay: font-semibold + chấm dưới
└────────────────────────────┘

Bấm tiêu đề ──►  ┌────────────────────────────┐
                 │ [2026 ▾]             ‹  ›  │   <- ‹ › đổi năm
                 │ Th1  Th2  Th3  Th4         │
                 │ Th5  Th6  Th7  Th8         │   <- lưới 12 tháng
                 │ Th9  Th10 Th11 Th12        │
                 └────────────────────────────┘
Bấm năm    ──►   lưới 12 năm (2020–2031), ‹ › nhảy 12 năm
```

- **Đổi tháng, năm không bắt người dùng bấm mũi tên từng tháng.** Tiêu đề "Tháng 9, 2026" là một nút (`chevron-down` nhỏ bên cạnh): bấm vào ra **lưới 12 tháng**, bấm năm ra **lưới 12 năm**. Chọn xong thì lùi về lưới ngày của tháng đó. Muốn tới tháng 3 năm sau là hai cú bấm, không phải sáu cú mũi tên (đã dính 22/09/2026: chỉ có ‹ ›, đi xa là mỏi tay).
- Lưới tháng và năm **cùng khung, cùng cỡ** với lưới ngày: popover không co giãn khi chuyển tầng. Ô `h-10 rounded-xl`, tháng/năm đang chọn và hiện tại theo cùng quy ước với ô ngày bên dưới.
- **Ngày đang chọn**: nền `primary`, chữ `primary-foreground`. Ngoại lệ có tên của "đang chọn không tô màu nhấn" ở select: ô ngày chỉ là một con số, chữ đậm thôi không đủ tách khỏi 41 số bên cạnh, và cả lịch chỉ có đúng một ô đặc. **Hôm nay**: `font-semibold` + chấm `size-1` dưới số, không nền. Hover: `bg-background`. Hôm nay cũng là ngày đang chọn thì giữ cả hai: ô nền `primary`, chấm đổi sang màu `primary-foreground` để vẫn thấy.
- **Lưới ngày `gap-y-1`, không khe ngang**, cho mọi lịch (một ngày, khoảng ngày, ngày giờ) dùng chung một lưới. Khe dọc tách từng tuần; khe ngang thì để dải khoảng ngày chạy liền.
- **Luôn 6 hàng**, kể cả tháng chỉ cần 5: chuyển tháng thì popover không nhảy cao thấp. Ngày của tháng trước/sau `text-muted`.
- Tuần bắt đầu **thứ Hai** (`T2 … CN`), không tô màu riêng cho cuối tuần. Copy tiếng Anh thì ngày đầu tuần theo locale (`T28`).
- Gợi ý (người dùng quyết): cho **gõ thẳng vào ô** theo `dd/mm/yyyy`. Ngày xa (ngày sinh, hạn hợp đồng năm sau) gõ `15/03/1990` nhanh hơn mọi lưới. Khi cho gõ thì câu lỗi mới được kèm ví dụ định dạng; không cho gõ thì đừng ghi "ví dụ 31/12/2026", người dùng không có chỗ nào để gõ.
- Câu lỗi nói **chuyện gì sai**, không lặp lời placeholder: "Chưa chọn ngày hết hạn", "Ngày hết hạn phải sau hôm nay". Không phải "Chọn ngày hết hạn".
- **Mở từ một ô trong bảng (sửa tại chỗ, như hạn chót của công việc)** thì khác ô trong form ở ba chỗ:
  - **Bấm ngày là lưu và đóng**, không nút "Áp dụng". `Esc` hoặc bấm ra ngoài thì đóng, giữ giá trị cũ; tiêu điểm về lại ô.
  - **Có đường gỡ giá trị.** Ô đang có hạn thì dưới lưới có một hàng gỡ: đường chia `border-t` tràn hết bề ngang popover (`F25`), dưới đó `p-1` rồi một **hàng kiểu mục menu rộng hết bề ngang**: `flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm text-foreground hover:bg-background`, icon `calendar-x` `size-4 text-muted` + "Xoá hạn", căn trái. Không có hàng này thì đặt hạn một lần là không bao giờ về lại `—` được (đã dính 24/09/2026: lịch mở từ "Quá hạn 3 ngày" chỉ có lưới).
    - **Không dùng nút `ghost` co theo chữ.** Một nút nhỏ nằm một mình trong cả một hàng có đường chia trông lẻ loi, như thiếu nút còn lại (đã dính 24/09/2026). Hàng rộng hết bề ngang là ngôn ngữ của mục menu, đọc ra "một lựa chọn nữa của popover này", và mốc nhanh thêm sau này nằm cùng khuôn.
    - **Căn trái, không căn phải.** Mép phải của hàng cuối popover là chỗ của nút xác nhận ("Áp dụng"); ở đây bấm ngày là lưu nên không có nút đó, đặt "Xoá hạn" bên phải là trông như nút chính.
    - **Không đỏ, kể cả lúc rê.** Đỏ khi rê (`I4`) dành cho xoá **bản ghi**: mất một thứ. Gỡ hạn là đổi một giá trị về trống, đặt lại là có, không mất gì. Tô đỏ thì người ta ngần ngại bấm một việc vô hại, và làm nhạt nghĩa của đỏ ở mục "Xoá công việc" ngay trong menu ba chấm cùng dòng. Không hỏi xác nhận.
    - Ô chưa có hạn thì không có hàng này (không có gì để gỡ).
  - Ô mở popover giữ nền hover suốt lúc popover mở (`aria-expanded:bg-foreground/8`, không `bg-surface-hover` vì trùng nền dòng đang rê, không `/5` vì gần trùng, `I10`), để biết lịch này đang sửa ô nào.
  - **Dấu bấm được lúc đứng yên**: ô sửa tại chỗ là việc phụ (hạn chót giữa ba bốn ô sửa được của một dòng việc) thì chỉ hiện lúc rê; ô là **việc chính của trang** (vai trò ở trang thành viên) thì `ChevronDown` luôn hiện. Xem "Trang thành viên và phân quyền" trong `../layouts/app.md`.
  - Gợi ý (người dùng quyết): hàng mốc nhanh "Hôm nay · Ngày mai · Thứ Hai tới" trên lưới. Hạn chót đa phần rơi vào vài ngày tới.
- Kiểu khác, chỉ dựng khi đề yêu cầu: **hai select tháng và năm** thay cho tiêu đề (hợp ô ngày sinh, năm lùi vài chục năm). Mặc định vẫn là tiêu đề bấm được ở trên.

**Ngày bị khoá** (quá khứ, ngày nghỉ, ngoài hạn mức): **ngày nào bị khoá là
logic, người dùng quyết** (truyền vào qua prop kiểu `disabledDays`, `minDate`).
Skill chỉ lo nó trông ra sao: `text-muted opacity-50`, `cursor-not-allowed`,
không hover, không vào dải khoảng. Khác ngày của tháng bên cạnh (chỉ
`text-muted`, vẫn bấm được) đúng một nấc mờ. Khoảng có sẵn nào đè lên ngày bị
khoá thì mục đó cũng khoá theo.

### Khoảng ngày

**Kế thừa hết luật của ô chọn ngày ở trên** (tiêu đề bấm ra lưới tháng/năm, luôn
6 hàng, hôm nay chữ đậm + chấm, tuần từ thứ Hai, câu lỗi). Phần dưới chỉ là
cái thêm vào.

```
┌──────────────┬──────────────────────────────┬──────────────────────────────┐
│ [7 ngày qua] │ [Tháng 9, 2026 ▾]         ‹  │                    ›         │
│  30 ngày qua │ …                            │ Tháng 10, 2026               │
│  Tháng này   │ 14 15 (16)▓17▓18▓19▓20▓      │ …                            │
│              │ ▓21▓(22) 23 …                │                              │
│              │ 7 ngày · 16/09 – 22/09/2026  │                              │
└──────────────┴──────────────────────────────┴──────────────────────────────┘
```

- **Hai tháng cạnh nhau từ `md`**, một tháng ở màn hẹp. **Hai tháng thì bỏ ngày của tháng khác** (ô trống), không thì 30, 31 hiện hai lần ở hai lưới. Popover cao theo tháng nhiều hàng hơn. Mở ra thì **tháng chứa ngày cuối nằm bên phải**, để khoảng vừa chọn luôn thấy trọn. Khoảng vắt qua cuối tháng là ca thường gặp nhất, một tháng thì phải bấm ‹ › giữa chừng lúc đang chọn. ‹ ở mép trái tháng đầu, › ở mép phải tháng sau; tiêu đề tháng đầu bấm được như ô một ngày.
- **Ngày đầu và ngày cuối**: nền `primary` y như ngày đang chọn, hai ô **cùng đúng một class** `bg-primary text-primary-foreground`, không `bg-primary/90` hay màu hover cho một đầu. Hai đầu lệch sắc là mắt đọc ra hai loại ngày khác nhau. Rê chuột lên một đầu thì nó sang `primary-hover`, nhạt hơn một chút: đúng, nhưng lúc chụp ảnh duyệt thì bỏ chuột ra ngoài popover kẻo tưởng hai đầu khác màu. Hôm nay rơi vào đó thì chấm đổi màu `primary-foreground`.
- **Dải giữa**: nền `bg-background`, chạy liền giữa hai đầu. Dải **lót sau nửa ô** của ngày đầu (nửa phải) và ngày cuối (nửa trái), để góc bo của ô đặc nằm trên dải, không lộ khe hở ở bốn góc. Dải chạm hết hàng tuần thì **bo đầu hàng** (`rounded-l-xl` ở thứ Hai, `rounded-r-xl` ở Chủ nhật), không cắt vuông.
- **Dải liền theo chiều ngang, có khe theo chiều dọc.** Trong một tuần các ô không cách nhau, dải đọc ra là một khoảng liền; chèn khe ngang thì dải vỡ thành từng viên rời. Nhưng giữa các hàng tuần thêm `gap-y-1`: không có khe thì dải của tuần này dính sát dải tuần sau, thành một khối bậc thang, không còn thấy từng tuần.
- **Giữa hai lần bấm**: dải nhạt chạy theo con trỏ từ ngày đầu tới ngày đang rê, để thấy trước khoảng sẽ chọn.
- **Dòng dưới lịch nói bước đang làm**, đổi theo trạng thái: chưa bấm gì "Chọn ngày bắt đầu", đã bấm một ngày "Chọn ngày kết thúc", đủ hai đầu thì tóm tắt khoảng "7 ngày · 16/09 – 22/09/2026". Chọn xong mà vẫn ghi "Chọn ngày bắt đầu" là nói sai trạng thái (đã dính 22/09/2026).
- **Khoảng có sẵn bên trái**: cột `w-40`, mỗi mục `h-10 rounded-xl`, đang trùng khoảng nào thì mục đó nền `bg-background` + `font-medium`; mục chưa chọn chữ `text-foreground/70`, không mờ tới `text-muted` (trông như bị khoá, `I8`). Danh sách khoảng nào là do người dùng quyết. Màn hẹp thì cột này lên thành một hàng chip cuộn ngang trên lịch.
- Ô hiển thị `16/09/2026 – 22/09/2026`, gạch nối là `–` có dấu cách hai bên.
- Popover hai tháng rộng hơn ô: tràn mép phải màn thì **dịch ngang** vào trong (dịch ngang không che ô, được phép), không bóp lưới.

**Popover không bao giờ che chính ô mở ra nó** (áp cho mọi popover: select,
ô chọn giờ, ô chọn ngày). Dưới không đủ chỗ thì lật lên trên ô, vẫn chừa ô
nhìn thấy được; lên trên cũng không đủ thì để trang cuộn, đừng dịch popover đè
lên ô (đã dính 22/09/2026: lịch khoảng ngày cao, lật lên che mất ô của chính
nó). Radix: `side="bottom"` + `avoidCollisions`, không bật `sticky="always"`.

### Ngày và giờ chung một ô

**Kế thừa lịch của ô chọn ngày và bánh xe của ô chọn giờ.** Phần thêm:

```
┌───────────────────────────────┬──────────────┐
│ [Tháng 9, 2026 ▾]       ‹  ›  │  Giờ   Phút  │
│ lưới ngày                     │   22    04   │
│                               │ ▓ 23 ▓▓ 05 ▓ │
│                               │   00    06   │
├───────────────────────────────┴──────────────┤
│ 23/09/2026 23:05                     [Xong]  │
└──────────────────────────────────────────────┘
```

- **Lịch bên trái, bánh xe bên phải** từ `sm`, ngăn bằng `border-l`. Màn hẹp thì bánh xe xuống dưới lịch.
- **Bánh xe cao bằng vùng lịch**, dải chọn ở giữa chiều cao đó. Bánh xe ngắn hơn lịch thì dưới nó trống một khoảng, cột bên phải trông như chưa dựng xong.
- **Có nút Xong, nên giá trị chỉ ghi vào ô khi bấm Xong** (hoặc Enter). Trong lúc chọn, ô giữ nguyên giá trị cũ hoặc placeholder; mốc đang chọn hiện ở **dòng tóm tắt** bên trái footer (`text-sm text-muted tabular-nums`). Esc hay bấm ra ngoài là bỏ, ô không đổi. Đừng vừa có Xong vừa ghi vào ô ngay từng lần đổi: hai mô hình lẫn nhau, người dùng không biết Esc có hoàn lại không.
- **Xong** là nút `primary` duy nhất của popover, căn phải footer. Footer `border-t`, `px-4 py-3`.
- Icon trong ô là `calendar-clock` (lucide), không phải `calendar`: nhìn ô là biết có cả giờ.
- Ô hiển thị `23/09/2026 23:05`, ngày và giờ cách một dấu cách, `tabular-nums`. Có giây thì ô và khung rộng thêm cho cột giây.

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

**Khoá thì nói vì sao, ngay dưới ô**, bằng dòng gợi ý `text-xs text-muted`: "Liên hệ quản trị viên để đổi giờ chốt sổ". Ô mờ mà không một lời thì người dùng tưởng app lỗi, và không biết đi đâu để đổi.
