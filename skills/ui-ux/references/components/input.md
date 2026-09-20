# Input

Nguồn: `speak-now/src/components/input/input.tsx`

```tsx
const baseClasses = "outline-none transition-all text-foreground placeholder-muted";

const variantClasses = {
  default: "w-full h-12 bg-surface dark:bg-white/4 border rounded-xl text-base px-4 md:text-sm",
  ghost: "bg-transparent border-0 p-0",
};

const stateClasses = error
  ? "border-red-500 ring-2 ring-red-500/10"
  : "border-border dark:border-transparent focus:ring-2 focus:ring-primary/10 focus:border-primary";
```

**Vì sao ổn**

- Input luôn `bg-surface`, không bao giờ trong suốt. Ô nhập trong suốt trên nền trang thì người dùng không thấy nó là ô nhập. Đây là luật cứng, kể cả khi thư viện gốc mặc định `bg-transparent`.
- Ring khi focus mờ đến mức gần như chỉ cảm thấy: `ring-primary/10`. Kèm `focus:border-primary` để viền đậm lên. Hai thứ cộng lại đủ rõ mà không loè.
- Trạng thái lỗi cũng theo đúng công thức đó, chỉ đổi màu: viền đỏ đặc, ring `red-500/10`.
- Cao `h-12`, bo `rounded-xl`, cùng bậc với nút `lg`, nên input và nút đứng cạnh nhau bằng vai.
- **`text-base` trên mobile rồi thu về `md:text-sm`.** Dưới 16px thì iOS tự zoom trang khi chạm vào ô nhập. Đây là **ngoại lệ của R7 trong `responsive.md`**: chữ hiển thị trong card thì hạ xuống `text-sm` ở mobile, còn chữ **gõ được** thì luôn giữ 16px. Áp dụng cho cả `textarea` và `select`.

---

## Viền lúc focus ở dark mode

Đừng dùng `focus:border-primary` chung cho cả hai theme. Ở nền tối, `--primary`
là gần trắng nên viền hoá thành sợi trắng đặc, gắt.

Dùng `--border-focus` thay vì `--primary`:

```html
<input class="... border border-border focus:border-focus focus:ring-2 focus:ring-focus" />
```

```js
// tailwind.config
borderColor: { focus: "var(--border-focus)" },
ringColor:   { focus: "var(--ring-focus)" },
```

Nền sáng thì `--border-focus` chính là màu nhấn, giữ nguyên như cũ. Nền tối thì
nó là màu nhấn ở độ đục 35%. Xem luật `M22` trong `../rules-color.md`.
