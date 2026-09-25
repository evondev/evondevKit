# Input

Nguồn: `speak-now/src/components/input/input.tsx`

```tsx
const baseClasses = "outline-hidden transition-colors text-foreground placeholder-muted";

const variantClasses = {
  // Viền và MÀU viền viết cùng một chỗ, đúng như nút outline: `border border-border-strong`.
  default: "w-full h-11 md:h-10 bg-surface dark:bg-white/4 border border-border-strong rounded-xl text-base px-4 md:text-sm",
  ghost: "bg-transparent border-0 p-0",
};

const stateClasses = error
  ? "border-red-500 focus:ring-2 focus:ring-red-500/10"   // lúc thường chỉ viền đỏ, quầng chỉ khi đang gõ
  : "dark:border-transparent focus:border-focus focus:ring-2 focus:ring-focus";
```

**Vì sao ổn**

- Input luôn `bg-surface`, không bao giờ trong suốt. Ô nhập trong suốt trên nền trang thì người dùng không thấy nó là ô nhập. Đây là luật cứng, kể cả khi thư viện gốc mặc định `bg-transparent`.
- **Focus = viền `--border-focus` + ring mờ `--ring-focus` dày 2px (`ring-2`)** (`I13`, chủ dự án chốt 21/09/2026). Ring phải mờ tới mức là vầng sáng, không thành vòng viền thứ hai: đừng tăng độ đậm của `--ring-focus`. Ô lỗi cùng công thức, đổi sang đỏ. **Select, combobox dùng y hệt**, kể cả lúc đang mở (`components/choice-controls.md`).
- **Viền dùng `--border-strong`, không phải `--border`.** Ô nhập cùng nền trắng với card, nên viền là thứ duy nhất báo "đây là chỗ gõ". Viền card và đường chia thì là trang trí, nhạt được; viền ô nhập thì không (`M14`). Viền này chỉ ~1.27:1, chưa đạt WCAG 1.4.11: đánh đổi có chủ ý, xem `P3` trong `styles.md`.
- **Viền ô nhập và viền nút outline phải là CÙNG một class**, `border-border-strong`. Đặt ô nhập cạnh nút mà viền ô mờ hơn là đã lấy nhầm `border-border`. Đã dính 21/09/2026: helper chung cho ô nhập và textarea viết `border-border`, ô trông nhạt hơn hẳn nút đứng bên. Dựng xong thì grep `border-border\b` trong file ô nhập, textarea, select: phải ra 0.
- Trạng thái lỗi cũng theo đúng công thức đó, chỉ đổi màu: viền đỏ đặc `red-500`, **quầng `red-500/10` chỉ khi ô đang focus**. Quầng cả lúc nghỉ thì mỗi ô lỗi mang ba tín hiệu đỏ (viền, quầng, câu), form có bốn ô lỗi là đỏ loang cả màn (sửa 23/09/2026). **Câu lỗi thì `red-600`**, không `red-500`: viền chỉ cần 3:1 nhưng chữ 14px cần 4.5:1, `red-500` trên nền trắng chỉ 3.8:1. Không Tailwind thì `--error`, `--error-ring`, `--error-text` trong `tokens.css`.
- Bo `rounded-xl`, cùng bậc với nút, nên input và nút đứng cạnh nhau bằng vai.
- **`text-base` trên mobile rồi thu về `md:text-sm`** — luật `R8`, áp cho cả `textarea` và `select`.
- **`h-11 md:h-10`**: 40px trên desktop, bằng link sidebar và mục menu; 44px ở màn hẹp cho vừa ngón tay. Nút trong cùng form đổi theo y hệt (`budgets.md`). Form đăng nhập/đăng ký đứng riêng được lên `h-12`. Không dùng `h-12` làm mặc định trong app: thô, và lệch bậc với mọi thứ khác (đảo 22/09/2026).

---

## Một field đầy đủ

Nhãn, ô, câu lỗi. Ba phần, và nhãn phải gắn vào ô theo `I26`:

```tsx
<div className="space-y-1.5">
  {/* w-fit: không có nó thì bấm vào khoảng trắng bên phải chữ cũng focus ô */}
  <label htmlFor={id} className="w-fit cursor-pointer text-sm font-medium">
    {label}
  </label>
  <input id={id} className={...} />
  {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
</div>
```

`id` phải là duy nhất trong trang. Hai field cùng `id` thì bấm nhãn nào cũng
focus về ô đầu tiên. Dựng nhiều field thì dùng `useId()`.

Placeholder theo `T25`: mặc định không có, chỉ thêm khi nó nói điều nhãn chưa nói. Đúng
ngôn ngữ đã chốt ở `T24`.

---

## Ô mật khẩu

Luật ở `I27`. Ô bọc `relative`, nút `absolute` bên phải, và ô chừa `pr-11`:

```tsx
const [isPasswordVisible, setIsPasswordVisible] = useState(false);

<div className="relative">
  <input
    id={id}
    type={isPasswordVisible ? "text" : "password"}
    className="... w-full pr-11"
  />
  <button
    type="button"
    onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
    aria-label={isPasswordVisible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
  >
    {isPasswordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
  </button>
</div>
```

- `type="button"`, không phải mặc định `submit`.
- Nút nằm **trong** ô, không phải chữ "Hiện" nằm ngoài bên cạnh — chữ ngoài làm hàng bị lệch so với các field khác.
- Nút không có nền, không viền. Nó là hành động phụ trong ô, hiện lên bằng màu chữ khi rê vào.

---

## Icon trái trong ô — tuỳ chọn, mặc định không có

**Không tự thêm, cũng không hỏi trước.** Dựng ô trơn rồi báo một dòng lúc giao
(`SKILL.md` câu 3). Người dùng muốn có icon thì:

```tsx
<div className="relative">
  <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
  <input className="... w-full pl-11" />
</div>
```

- Icon **xám** (`text-muted`), không phải màu nhấn. Nó là chỉ dấu, không phải nội dung.
- Ô phải chừa `pl-11`. Quên là chữ gõ đè lên icon.
- `aria-hidden` — nhãn đã nói ô này là gì rồi.
- Thêm thì **thêm cho cả form**, không phải chỉ ô email. Một ô có icon một ô không thì hai ô lệch lề chữ.
- Nguồn icon theo `F15`: dự án dùng gì thì lấy ở đó — `lucide-react`, Heroicons, hay SVG thuần.

Ô mật khẩu có cả icon trái lẫn nút mắt thì cần **cả** `pl-11` và `pr-11`.

---

## Ô tìm (`type="search"`)

**Tắt nút × có sẵn của trình duyệt, dựng nút xoá riêng.** `type="search"` tự vẽ một
nút × theo màu của trình duyệt: Chrome tô **xanh dương** theo accent hệ điều hành khi
ô đang focus, Safari vẽ vòng tròn xám kiểu khác. Một chấm xanh lạc giữa app đen trắng,
không theo token nào (đã dính 25/09/2026, bảng khách hàng). Lỗi là **màu và hình** của
nút trình duyệt, không phải việc có nút: bản bỏ hẳn nút × (25/09/2026) làm người gõ
một câu dài ở 375px không có cách xoá nhanh, chữ trôi khuất bên trái (chủ dự án:
"tìm kiếm mà không có clear cũng kì"). Ô tìm của các app lớn đều có nút xoá.

```tsx
<div className="relative">
  <input
    ref={inputRef}
    type="search"
    className="... w-full pr-10 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
  />
  {query ? (
    <Button variant="ghost" icon={X} aria-label="Xoá từ khoá"
      onClick={() => { clearQuery(); inputRef.current?.focus(); }}
      className="absolute right-1 top-1/2 size-8 -translate-y-1/2 rounded-lg p-0 text-muted hover:text-foreground" />
  ) : null}
</div>
```

- Nút xoá **chỉ hiện khi ô có chữ**, icon `X` `size-4` xám, rê vào đậm lên. Bấm xong **trả tiêu điểm về ô** để gõ lại ngay.
- Giữ `type="search"`: bàn phím điện thoại hiện nút Tìm, Escape vẫn xoá từ khoá.
- Ô chừa `pr-10` để chữ dài không chui dưới nút.
- Tìm ra 0 kết quả thì khối rỗng có thêm lối "Xoá tìm kiếm" (`empty-state.md`, "Rỗng do lọc").

---

## Viền lúc focus ở dark mode

Đừng dùng `focus:border-primary` chung cho cả hai theme. Ở nền tối, `--primary`
là gần trắng nên viền hoá thành sợi trắng đặc, gắt.

Dùng `--border-focus` thay vì `--primary`:

```html
<input class="... border border-border-strong focus:border-focus focus:ring-2 focus:ring-focus" />
```

```js
// tailwind.config
borderColor: { focus: "var(--border-focus)" },
ringColor:   { focus: "var(--ring-focus)" },
```

Nền sáng thì `--border-focus` chính là màu nhấn, giữ nguyên như cũ. Nền tối thì
nó là màu nhấn ở độ đục 42% (3.6:1, đạt WCAG 3:1). Xem luật `M22` trong `../rules-color.md`.
