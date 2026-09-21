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
chỗ CSS cũ đang đọc biến đó**. Ở focus.camp con số là **3.419 chỗ**.

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

Ở focus.camp, file token cũ có:

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

Ở focus.camp đã phải sửa: `9px → 8px`, thêm bậc `4px`, và **xoá bậc `22px`** vì
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
