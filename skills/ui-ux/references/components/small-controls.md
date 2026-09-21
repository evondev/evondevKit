# Chip và IconButton

Nguồn: `new-tab-todo/src/components/chip/chip.tsx`, `.../icon-button/icon-button.tsx`

```tsx
// Chip: bộ lọc, tag chọn được
"inline-flex cursor-pointer items-center rounded-full px-3 py-1 text-xs font-medium transition-colors"
isActive && "bg-brand text-white"
!isActive && "bg-background text-muted hover:text-foreground"

// IconButton: hành động phụ trong dòng hoặc header
"inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors"
"hover:bg-background hover:text-foreground"
"outline-hidden focus-visible:bg-background focus-visible:text-foreground"
"disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted"
```

## Chip có hai cỡ, chọn theo vai trò

Đây là chỗ hay sai: lấy cỡ chip trong widget đem ra làm bộ lọc chính của cả màn,
rồi hàng đó trông teo lại.

| Vai trò | Cỡ | Đi cạnh cái gì |
| --- | --- | --- |
| **Chip phụ trong widget**, tag, nhãn trạng thái | `px-3 py-1 text-xs` (cao ~26px) | Nằm trong card nhỏ, cạnh chữ `text-xs` |
| **Chip lọc chính của cả màn** | `h-9 px-3.5 text-sm` | Nằm cạnh ô tìm `h-10`, cạnh nút `h-10` |

Nguyên tắc chung: **chip đứng cùng hàng với ô nhập hay nút thì phải gần bằng
chiều cao của chúng**, lệch quá một bậc là hàng đó trông hỏng. Chip cao 26px
đứng cạnh input cao 40px thì mắt đọc ra cụm chip là thứ yếu, dù nó là bộ lọc
chính.

---

**Vì sao ổn**

- Chip đang chọn thì tô nền brand đặc, không chọn thì gần như tàng hình trên nền xám. Không viền, không nền nhạt màu brand. Một bộ lọc mười chip mà chip nào cũng có viền thì đọc như hàng rào.
- Chip là `rounded-full`, nút là `rounded-xl` (cao dưới 40px thì `rounded-lg`, `F1`). Khác hình để mắt biết ngay cái nào chọn được nhiều cái nào là hành động.
- IconButton vuông `h-7 w-7`, chữ `text-muted` lúc thường, chỉ đen lên khi hover. Icon phụ không được đen bằng nội dung.
- Trạng thái disabled phải tắt luôn cả hover (`disabled:hover:bg-transparent`). Thiếu dòng đó thì nút chết vẫn sáng lên khi rê vào, người dùng bấm hoài không hiểu sao.
- `aria-label` và `title` luôn nhận cùng một chuỗi `label`. Nút chỉ có icon thì bắt buộc.

---

## Hàng chip ở màn hẹp

Hàng chip lọc **không bao giờ `flex-wrap`**. Bốn chip ở 375px sẽ thành ba cái
một hàng và một cái rớt xuống đứng một mình, đọc ra như lỗi chứ không như thiết
kế.

```html
<div class="scrollbar-clean -mx-1 flex items-center gap-2 overflow-x-auto px-1 py-0.5">
  <button type="button" class="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">Tất cả</button>
  <button type="button" class="shrink-0 rounded-full bg-background px-3 py-1 text-xs font-medium text-muted hover:bg-background-hover hover:text-foreground">Quá hạn</button>
</div>
```

`shrink-0` để chip không bị bóp méo, `scrollbar-clean` để không lòi thanh cuộn ra.

Lề thì đặt trên **hàng bên trong**, đừng đặt trên khung cuộn: `<div class="-mx-1
overflow-x-auto"><div class="flex gap-2 px-1">`. Padding bên phải của khung cuộn
bị bỏ qua khi cuộn tới cuối, nên chip cuối sẽ dính sát mép.

---

## Badge số đếm

Số việc chưa đọc, số mục trong nhóm, số thành viên. Xuất hiện ở sidebar, ở tab,
ở tiêu đề cột.

Mặc định là **pill trắng viền mảnh, chữ xám**. Muốn gọn hơn nữa thì bỏ khung,
chỉ để số trơn.

```html
<!-- Mặc định: pill trắng, viền mảnh, chữ xám. -->
<span class="ml-auto shrink-0 rounded-full border border-border-strong bg-surface px-2 py-0.5 text-xs font-medium tabular-nums text-muted">121</span>

<!-- Gọn hơn: số trơn, không khung, không nền. -->
<span class="ml-auto shrink-0 text-xs tabular-nums text-muted">4</span>
```

- **Một danh sách chỉ MỘT kiểu.** Cả sidebar dùng pill thì mọi số đều là pill, kể cả số `4`. Đừng chia kiểu theo ý nghĩa con số (chưa đọc thì pill, số đếm thường thì trơn): đặt cạnh nhau thì chỉ thấy hai hàng lệch style, không ai đọc ra được ý nghĩa (đã dính 21/09/2026).
- **Luôn căn phải**, cách nhãn bằng `ml-auto` hoặc `justify-between`.
- **Không tô màu brand, không nền đặc.** Badge brand chữ trắng trông nặng và làm màu nhấn loang khắp sidebar (đã thử và bỏ 21/09/2026). Số đếm là thông tin, không phải hành động (`M2`, `M4`). Dự án muốn badge màu thì để họ tự đổi, skill không tự đề xuất.
- **Nền pill là `--surface` (trắng)**, không phải `--secondary`. Pill trắng vẫn nổi rõ khi hàng đang hover hay đang chọn (nền `--background`), còn pill xám thì tan vào hàng.
- Chỉ tô màu khi con số là **cảnh báo thật**, kiểu số việc quá hạn: chữ hổ phách, vẫn không nền đặc.
- `tabular-nums` để các hàng thẳng cột nhau.
- Số lớn thì rút gọn: `99+`, đừng để `1.284` phá bề rộng sidebar.
