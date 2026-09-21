# Input

Nguồn: `speak-now/src/components/input/input.tsx`

```tsx
const baseClasses = "outline-hidden transition-colors text-foreground placeholder-muted";

const variantClasses = {
  // Viền và MÀU viền viết cùng một chỗ, đúng như nút outline: `border border-border-strong`.
  default: "w-full h-12 bg-surface dark:bg-white/4 border border-border-strong rounded-xl text-base px-4 md:text-sm",
  ghost: "bg-transparent border-0 p-0",
};

const stateClasses = error
  ? "border-red-500 ring-2 ring-red-500/10"
  : "dark:border-transparent focus:border-focus";
```

**Vì sao ổn**

- Input luôn `bg-surface`, không bao giờ trong suốt. Ô nhập trong suốt trên nền trang thì người dùng không thấy nó là ô nhập. Đây là luật cứng, kể cả khi thư viện gốc mặc định `bg-transparent`.
- **Focus chỉ đổi màu viền**, `focus:border-focus`, không ring (`I13`), kể cả ring mờ `ring-focus/10`. Gõ chữ mà ô bị bọc thêm một vòng thì rối. Riêng trạng thái lỗi được giữ ring đỏ mờ.
- **Viền dùng `--border-strong`, không phải `--border`.** Ô nhập cùng nền trắng với card, nên viền là thứ duy nhất báo "đây là chỗ gõ". Viền card và đường chia thì là trang trí, nhạt được; viền ô nhập thì không (`M14`).
- **Viền ô nhập và viền nút outline phải là CÙNG một class**, `border-border-strong`. Đặt ô nhập cạnh nút mà viền ô mờ hơn là đã lấy nhầm `border-border`. Đã dính 21/09/2026: helper chung cho ô nhập và textarea viết `border-border`, ô trông nhạt hơn hẳn nút đứng bên. Dựng xong thì grep `border-border\b` trong file ô nhập, textarea, select: phải ra 0.
- Trạng thái lỗi cũng theo đúng công thức đó, chỉ đổi màu: viền đỏ đặc, ring `red-500/10`.
- Bo `rounded-xl`, cùng bậc với nút, nên input và nút đứng cạnh nhau bằng vai.
- **`text-base` trên mobile rồi thu về `md:text-sm`** — luật `R8`, áp cho cả `textarea` và `select`.
- **`h-12` ở mọi bề rộng màn.** Ô nhập không thu nhỏ theo màn, và nút trong cùng form cũng phải giữ `h-12` theo nó (`budgets.md`). Hạ nút mà giữ ô là lệch ngay.

---

## Một field đầy đủ

Nhãn, ô, câu lỗi. Ba phần, và nhãn phải gắn vào ô theo `I26`:

```tsx
<div className="space-y-1.5">
  {/* w-fit: không có nó thì bấm vào khoảng trắng bên phải chữ cũng focus ô */}
  <label htmlFor={id} className="w-fit cursor-pointer text-sm font-medium">
    {label}
  </label>
  <input id={id} placeholder="Nhập email của bạn" className={...} />
  {error ? <p className="text-sm text-red-500">{error}</p> : null}
</div>
```

`id` phải là duy nhất trong trang. Hai field cùng `id` thì bấm nhãn nào cũng
focus về ô đầu tiên. Dựng nhiều field thì dùng `useId()`.

Placeholder viết theo `T25` — câu hướng dẫn, không phải ví dụ giả, và đúng ngôn
ngữ đã chốt ở `T24`.

---

## Ô mật khẩu

Luật ở `I27`. Ô bọc `relative`, nút `absolute` bên phải, và ô chừa `pr-11`:

```tsx
const [isPasswordVisible, setIsPasswordVisible] = useState(false);

<div className="relative">
  <input
    id={id}
    type={isPasswordVisible ? "text" : "password"}
    placeholder="Nhập mật khẩu của bạn"
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

## Icon trái trong ô — tuỳ chọn, phải hỏi

**Không tự thêm.** Đây là câu hỏi ở mục 0 của `SKILL.md`, không phải mặc định.
Người dùng đồng ý rồi thì:

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

## Viền lúc focus ở dark mode

Đừng dùng `focus:border-primary` chung cho cả hai theme. Ở nền tối, `--primary`
là gần trắng nên viền hoá thành sợi trắng đặc, gắt.

Dùng `--border-focus` thay vì `--primary`:

```html
<input class="... border border-border-strong focus:border-focus" />
```

```js
// tailwind.config
borderColor: { focus: "var(--border-focus)" },
ringColor:   { focus: "var(--ring-focus)" },
```

Nền sáng thì `--border-focus` chính là màu nhấn, giữ nguyên như cũ. Nền tối thì
nó là màu nhấn ở độ đục 35%. Xem luật `M22` trong `../rules-color.md`.
