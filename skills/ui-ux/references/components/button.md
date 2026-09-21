# Button

> ⚠️ Bản trước của file này dạy ba variant `primary` / `ghost` / `danger` và
> "nút mặc định không icon". **Cả hai đã đảo** — xem luật `I1`. Chủ dự án chốt
> 13/09/2026: nút mặc định là **viền + icon lucide bên trái chữ**.

---

## Ba dạng, hết

```tsx
type ButtonVariant = "outline" | "primary" | "ghost";

function getVariantClasses(variant: ButtonVariant): string {
  return cn(
    // MẶC ĐỊNH. Dựng nút mới thì dùng cái này.
    variant === "outline" &&
      "border border-border bg-surface text-foreground hover:bg-background focus-visible:bg-background",
    // Hành động chính DUY NHẤT của một khu, khi thật cần nổi.
    variant === "primary" &&
      "bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:bg-primary-hover",
    // Hành động phụ nằm trong hàng, mờ đi lúc thường.
    variant === "ghost" &&
      "bg-transparent text-muted hover:bg-background hover:text-foreground focus-visible:bg-background focus-visible:text-foreground",
  );
}

<button
  className={cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl",
    "px-4 py-2.5 text-sm font-medium transition-colors",
    // Nhãn tiếng Việt dài thì cho xuống dòng, đừng để tràn. Luật T15.
    "max-w-full text-center leading-tight [overflow-wrap:anywhere]",
    // Focus bàn phím trông giống hover, không ring (I13)
    "focus-visible:outline-hidden",
    "disabled:cursor-not-allowed disabled:opacity-50",
    getVariantClasses(variant),
  )}
>
  {Icon ? <Icon className="size-4 shrink-0" aria-hidden /> : null}
  {children}
</button>
```

**Vì sao ổn**

- **`outline` là mặc định**, không phải `primary`. Nút nền nhấn rải khắp nơi thì màu thương hiệu loang ra, tới lúc có một nút thật sự cần nổi thì nó không nổi được nữa (`I1`, `M2`).
- Icon lucide **bên trái chữ**, `size-4`, `shrink-0` để nó không bị bóp khi nhãn dài. `aria-hidden` vì chữ đã nói rồi.
- **Không `white-space: nowrap`.** Đo thật ở focus.camp: hộp 140px, nút nowrap rộng 192px, tràn 60px ra ngoài. `leading-tight` để hai dòng không dính nhau. Luật `T15`.
- **Không `shadow`.** Nút nằm trong trang (`M15`).
- Chỉ `transition-colors`. Nút không phóng to, không nhấc lên, không đổ bóng thêm khi hover (`F22`).
- **Không ring khi focus.** Bàn phím Tab tới thì nút đổi nền y như lúc hover, bấm chuột thì không hiện gì (`focus-visible`). `outline-hidden` giữ outline trong suốt để chế độ tương phản cao của Windows vẫn thấy (`I13`).
- Không có prop `size`. Cần nút khác cỡ thì truyền `className` — đỡ đẻ ra ma trận variant nhân size (`I6`).
- Logic class nằm trong `getVariantClasses()` ngoài JSX, không nhét ternary vào giữa markup.

---

## Nút xoá

Không phải một variant riêng. Nó là `ghost` cộng một màu chữ lúc hover:

```tsx
<Button variant="ghost" className="hover:text-rose-500">
```

Lúc thường nó xám như mọi hành động phụ, chỉ đỏ lên khi rê vào. Nút xoá không nên
hét vào mặt người dùng suốt ngày (`I4`).

---

## Nút chỉ có icon

Vuông, cao **bằng đúng** nút chữ đứng cạnh nó, và luôn có `aria-label`:

```tsx
<button
  aria-label="Lọc danh sách"
  className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface text-muted outline-hidden hover:bg-background hover:text-foreground focus-visible:bg-background focus-visible:text-foreground"
>
  <SlidersHorizontal className="size-4" aria-hidden />
</button>
```

Chênh chiều cao với ô nhập hay nút chữ bên cạnh dù chỉ một bậc là nhìn ra ngay —
đây là lỗi đã dính ở vòng test kanban.

---

## Cảnh báo

Một bản `Button` ở project cũ đã phình lên **8 variant, 3 size** và một variant
`glow` dùng ba lớp radial gradient. Đó là ví dụ ngược. Muốn thêm variant thứ tư
thì phải trả lời được: nó khác ba cái kia ở chỗ nào, và vì sao ba cái kia không
làm được việc đó.
