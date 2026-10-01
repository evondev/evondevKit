# Bẫy Tailwind v4 — luật W

Mở file này khi dự án dùng **Tailwind v4** và **có sẵn CSS cũ**. Đây là loại lỗi
không báo build, không cảnh báo, không gạch đỏ trong IDE — và không grep ra được
nếu không biết trước phải grep cái gì.

---

## W1. Tailwind v4 phát TOÀN BỘ theme mặc định vào `:root`

**Không phải** chỉ khi bro dùng utility. CSS build ra đã có sẵn khoảng 140 biến
`--color-*`, `--spacing`, `--blur-*`, **và `--text-*`, `--shadow-*`**.

Nếu CSS cũ của dự án dùng **trùng tên biến** — rất thường gặp, `--text-sm` là tên
ai cũng đặt — thì **hai hệ tranh nhau một không gian tên**.

Hệ quả: xoá một override trong `@theme` không chỉ đổi code mới, mà đổi luôn **mọi
chỗ CSS cũ đang đọc biến đó**. Ở một dự án thật con số là **3.419 chỗ**.

**Luật: trước khi thêm hoặc bớt bất kỳ khai báo nào trong `@theme`, đếm xem có
bao nhiêu chỗ đang đọc tên biến đó.**

```bash
for v in text-xs text-sm text-base text-lg text-xl; do
  echo "$v: $(grep -rho "var(--$v)" --include='*.css' --include='*.tsx' . | wc -l)"
done
```

---

## W2. `@theme` không tự trỏ vào chính nó được

```css
/* SAI — @theme cũng phát ra --text-sm, thành vòng lặp */
@theme { --text-sm: var(--text-sm); }

/* ĐÚNG — tên trùng thì ghi GIÁ TRỊ THẬT */
@theme { --text-sm: 15px; }

/* ĐÚNG — tên khác thì trỏ thoải mái */
@theme { --color-brand: var(--brand-green); }
```

**Hệ quả thiết kế:** với nhóm tên trùng, `@theme` **phải** là nơi định nghĩa duy
nhất. Gỡ khối đó khỏi file token cũ, không để hai nơi — hai nguồn thì lệch nhau
lúc nào không hay.

---

## W3. Biến CSS cũ trùng namespace Tailwind = utility hỏng câm

Nối tiếp `W2`, nhưng nguy hiểm hơn vì **không hề báo lỗi**.

Ở một dự án thật, file token cũ có:

```css
:root { --container-md: 720px; --container-lg: 1040px; --container-xl: 1200px; }
```

`--container-*` đúng là namespace Tailwind v4 dùng cho thang `max-w-*`. Token cũ
nạp trong `layer(base)`, `@theme` phát vào layer `theme` — **base thắng theme**.
Kết quả: **mọi `max-w-md/lg/xl` trong cả dự án chạy sai giá trị**, không ai biết:

| Class | Đáng ra | Thực tế |
| --- | ---: | ---: |
| `max-w-md` | 448px | 720px |
| `max-w-lg` | 512px | 1040px |
| `max-w-xl` | 576px | **1200px** |

Chỉ lộ ra khi chủ dự án nhìn ảnh chụp và hỏi *"sao ô nhập không ngắn lại?"* —
code có `max-w-xl`, DOM có `max-w-xl`, mà ô vẫn full width.

Kết cục: xoá luôn 3 token + 3 class đi kèm, vì grep ra **0 chỗ dùng** trong toàn
bộ dự án. **Code chết mà vẫn kịp phá cả thang `max-w-*`.**

### Cách phát hiện

Grep file CSS **đã build**, tìm biến khai báo hai lần:

```bash
curl -s "<url-css-bundle>" | grep -o -- "--container-xl:[^;]*;"
# ra 2 dòng = có kẻ đè
```

### Danh sách namespace phải né khi đặt tên biến trong CSS cũ

```
--color-*  --font-*  --text-*  --spacing-*  --breakpoint-*  --container-*
--radius-*  --shadow-*  --tracking-*  --leading-*  --ease-*  --animate-*
--blur-*  --aspect-*
```

⚠️ Phân biệt hai ca:

- Trùng tên **đã có sẵn** của Tailwind (`--container-xl`) → **đè, hỏng câm**.
- Chỉ **thêm** tên mới trong namespace đó (`--font-heading`, `--shadow-focus`) → vô hại, nó chỉ sinh thêm utility mới.

Quét một lần và phân loại từng cái, đừng đổi tên hàng loạt.

---

## W4. Thiếu class màu viền thì Tailwind v4 để `border-color: currentColor`

Nút chữ đen mà quên khai màu viền sẽ ra **viền gần đen**, không phải viền nhạt.

Thấy một cái viền đậm bất thường thì kiểm chỗ này trước, đừng đi sửa mã hex của
token viền.

---

## W5. Radius phải nằm đúng trên bậc của thang đang chạy

Nếu không ghi đè `--radius-*` thì `rounded-*` chạy thang gốc: 4 / 6 / 8 / 12 / 16
/ 24. Token bo góc của dự án **phải nằm đúng trên các bậc đó**, nếu không thì mỗi
khối refactor sang utility lại đổi hình một chút mà không ai chủ ý.

Ở một dự án thật đã phải sửa: `9px → 8px`, thêm bậc `4px`, và **xoá bậc `22px`** vì
không bậc Tailwind nào bằng.

Cùng đợt: mọi `border-radius` chôn cứng trong CSS cũ quy về token — không còn
1 / 3 / 5 / 7 / 9 / 10 / 14 / 18 / 20 / 22px rải rác.

---

## W6. iOS Safari tự phóng to ô nhập có `font-size` dưới 16px

Và **không bao giờ thu lại**. Ép 16px ở màn hẹp để chặn:

```css
@media (max-width: 768px) {
  input, textarea, select { font-size: 16px !important; }
}
```

`!important` ở đây là cần thật: nó phải thắng được cả `style={{ fontSize }}` inline
rải trong các composer và trình soạn thảo. Đây là một trong số rất ít chỗ
`!important` có lý do chính đáng — và lý do đó phải được ghi ngay trên nó.

## W7. Tailwind v4 cho `<button>` con trỏ mũi tên, không phải bàn tay

v3 để `<button>` hiện bàn tay. **v4 đổi preflight về `cursor: default`**, theo
đúng hành vi gốc của trình duyệt. `<a href>` thì vẫn là bàn tay.

Nên trong **cùng một menu**, mục là `<a>` hiện bàn tay còn mục là `<button>`
(ví dụ "Đăng xuất") hiện mũi tên. Người dùng rê chuột dọc menu thấy con trỏ đổi
qua đổi lại, trong khi code trông không sai chỗ nào.

Hai cách, chọn một cho cả dự án:

```css
/* Cách 1: trả lại hành vi v3 cho toàn app — một chỗ, không sót */
@layer base {
  button:not(:disabled),
  [role="button"]:not([aria-disabled="true"]) {
    cursor: pointer;
  }
}
```

```html
<!-- Cách 2: ghi tường minh trên từng nút -->
<button class="cursor-pointer">…</button>
```

**Cách 1 an toàn hơn khi refactor**, vì không phải đi sót từng nút. Cách 2 hợp
khi dự án đã quen ghi `cursor-pointer` khắp nơi. Đừng trộn hai cách: nửa dự án dựa
vào base, nửa ghi tay, thì lúc bỏ một trong hai sẽ không biết chỗ nào còn phụ
thuộc.

**Cách phát hiện:** trong `package.json` có `"tailwindcss": "^4`, và grep ra
`<button` không kèm `cursor-pointer` mà trong CSS base cũng không có dòng
`cursor: pointer` nào.

---

## W8. `ring-*` chỉ có một lớp bóng

`ring-1`, `ring-2`, `ring-inset` cùng ghi vào **một** lớp bóng (`--tw-ring-shadow`). Skill
không vẽ vòng focus (`I13`) nên thường không đụng nhau. Dự án trả vòng focus lại (`I14`) thì
viền trạng thái (đang chọn, đang bật) vẽ bằng `inset-ring-*` (lớp bóng riêng của v4) hoặc
`border`, không `ring-*`; `ring-*` để dành cho vòng focus của `I14`. Viền chọn bằng `ring-*` thì
Tab tới là vòng focus **thay** viền chọn, không cộng vào (đã dính 26/09/2026: chip mức ưu tiên
`ring-1 ring-inset`, Tab tới chip đang chọn là mất viền chọn).

## W9. Dự án không nạp preflight thì control nào cũng giữ kiểu của trình duyệt ⚑

Preflight là phần reset của Tailwind, đi kèm `@import "tailwindcss"`. Có dự án chỉ nạp
`tailwindcss/theme.css` và `tailwindcss/utilities.css` (thường để khỏi đè CSS cũ). Khi
đó ô nhập vẫn viền 2px inset, nút viền nổi nền xám, `<select>` là ô chọn gốc của trình
duyệt, `ul` có chấm, `h1`, `p` có margin mặc định.

**Cách phát hiện** (chạy ở audit, `SKILL.md` câu 2):

```bash
grep -rn '@import "tailwindcss' --include='*.css' . 2>/dev/null | grep -v node_modules
# chỉ ra theme.css / utilities.css, không có dòng `@import "tailwindcss";` hay preflight.css = không có reset
```

**Làm gì:**

- Ghi vào dòng `Audit:` "không có preflight".
- **Không tự bật preflight cho cả app**: nó đổi hình mọi trang cùng lúc, và dự án tắt
  nó là có lý do.
- Mỗi control mình dựng hay sửa **tự reset đủ**: ô nhập, textarea có viền token (hoặc
  `border-0` nếu khung ngoài đã có viền), nền, `[font:inherit]`; nút `border-0` và nền
  của nó; select `appearance-none` cộng chevron của mình. Thiếu một cái là chính nó mang
  kiểu trình duyệt, giữa một trang đã có kiểu.
- Probe báo "Control còn kiểu mặc định của trình duyệt" (viền inset / outset, viền xám
  `#767676`, select `appearance: auto`).

Đã dính 27/09/2026 ở bản dựng lại của dự án mồi phase 2: bản dựng tự thêm reset cho nút
và danh sách, quên ô nhập của khung chat, ô đó mang nguyên viền đen của trình duyệt. Ô
nằm dưới mép khung cuộn nên ảnh chụp cũng không thấy (probe giờ kéo cửa sổ cao bằng khung
cuộn trước khi chụp).

## W10. `scale-*`, `translate-*`, `rotate-*` không chạy theo `transition-[transform]` ⚑

Tailwind v4 ghi `scale-95`, `-translate-y-1`, `rotate-180` vào thuộc tính CSS **riêng**
`scale`, `translate`, `rotate`, không vào `transform`. Viết `transition-[opacity,transform]`
hay `transition-[transform,color]` thì ba thuộc tính đó **nhảy thẳng**, chỉ `opacity` và màu
chạy: menu co lại 95% và nhích lên 4px ngay khung đầu rồi mới mờ, nhìn như giật; mũi tên
accordion lật ngược tức thì (đã dính 28/09/2026, menu tài khoản, select, drawer, hộp thoại của
một dự án, và chính mẫu `components/accordion.md`).

- Dùng `transition-transform` (v4 gồm `transform, translate, scale, rotate`), hoặc ghi đúng tên:
  `transition-[opacity,scale,translate]`, `transition-[rotate,color]`.
- Probe báo mục "Scale / translate / rotate không chạy chuyển động" (hạng Hỏng).


## W11. `not-sr-only` trả `white-space` về `normal`, nuốt `whitespace-nowrap` cùng thẻ

`not-sr-only` không chỉ gỡ `sr-only`: nó ghi lại `position`, `width`, `height`, `padding`,
`margin`, `overflow`, `clip-path` **và `white-space: normal`**. Viết
`sr-only whitespace-nowrap @4xl:not-sr-only` thì từ `@4xl` utility có variant đứng sau trong
CSS, `normal` thắng, chữ lại xuống dòng. Đặt `nowrap` ở ô cha cũng vô ích: thẻ con đã khai
`normal` thì không kế thừa nữa (đã dính 01/10/2026: cột người phụ trách co còn 126px, "Nguyễn /
Anh / Tuấn" ba dòng, dòng bảng cao thấp lởm chởm).

- Ẩn theo chiều ngược lại: `whitespace-nowrap @max-4xl:sr-only` (bề rộng nào không ẩn thì không
  cần `not-sr-only`). Cùng lý do, padding / margin khai trên thẻ đó cũng bị `not-sr-only` xoá.
- Probe báo mục "Cột chữ của bảng bị ép xuống dòng".
