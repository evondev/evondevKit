# Button

> ⚠️ Bản trước của file này dạy ba variant `primary` / `ghost` / `danger` và
> "nút mặc định không icon". **Cả hai đã đảo** — xem luật `I1`. Chủ dự án chốt
> 13/09/2026: nút mặc định là **viền + icon lucide bên trái chữ**.

---

## Bốn dạng, hết

```tsx
type ButtonVariant = "outline" | "primary" | "secondary" | "ghost";

function getVariantClasses(variant: ButtonVariant): string {
  return cn(
    // MẶC ĐỊNH. Dựng nút mới thì dùng cái này.
    variant === "outline" &&
      "border border-border-strong bg-surface text-foreground hover:bg-background focus-visible:bg-background",
    // Hành động chính DUY NHẤT của một khu, khi thật cần nổi.
    variant === "primary" &&
      "bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:bg-primary-hover",
    // Nút phụ cần nhỉnh hơn ghost mà không tranh chỗ nút chính. Không viền.
    variant === "secondary" &&
      "bg-secondary text-foreground hover:bg-secondary-hover focus-visible:bg-secondary-hover",
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
    "disabled:cursor-not-allowed disabled:not-aria-busy:opacity-50",
    getVariantClasses(variant),
  )}
>
  {Icon ? <Icon className="size-4 shrink-0" aria-hidden /> : null}
  {children}
</button>
```

**Đang xử lý (loading)**

```tsx
<Button variant="primary" disabled={isSending} aria-busy={isSending}>
  {isSending ? <LoaderCircle className="size-4 shrink-0 animate-spin motion-reduce:animate-none" aria-hidden /> : <Send className="size-4 shrink-0" aria-hidden />}
  Gửi lời mời
</Button>
```

- Spinner **thế chỗ icon**, cùng `size-4`, chữ giữ nguyên. Nút không đổi bề rộng, hàng nút không xô.
- Không đổi chữ sang "Đang gửi…": chữ dài ngắn khác nhau là nút co giãn. Đổi thì phải giữ `min-w` bằng bản cũ.
- `disabled` khi đang xử lý nhưng **không mờ `opacity-50`** như nút khoá thường: vì vậy class gốc ghi `disabled:not-aria-busy:opacity-50` (Tailwind v4), nút đang xử lý vẫn đậm, chỉ spinner nói đang chạy. Mờ đi thì đọc ra là "bấm không được vì sai gì đó".

**Vì sao ổn**

- **`outline` là mặc định**, không phải `primary`. Nút nền nhấn rải khắp nơi thì màu thương hiệu loang ra, tới lúc có một nút thật sự cần nổi thì nó không nổi được nữa (`I1`, `M2`).
- **`secondary` (nền xám, không viền)** dùng khi nút phụ cần có mặt rõ hơn `ghost` nhưng viền mảnh trông rỗng: nút rộng hết card (các gói thường trong bảng giá, `layouts/pricing.md`), hoặc nút phụ đứng cạnh nút `primary` trong footer. Không thay `outline` làm mặc định (chủ dự án chốt 21/09/2026).
- **`ghost` đứng đầu hàng, thẳng cột với chữ phía trên** thì thêm `-ml-4` bù đúng `px-4`. Nền trong suốt nên mắt thấy mép của chữ chứ không thấy mép nút, không bù thì cả hàng trông lệch vào 16px so với tiêu đề và nhãn bên dưới. Nền hover lấn ra lề trái là đúng ý. Nút có nền hoặc viền thì không bù.
- Icon lucide **bên trái chữ**, `size-4`, `shrink-0` để nó không bị bóp khi nhãn dài. `aria-hidden` vì chữ đã nói rồi.
- **Không `white-space: nowrap`.** Đo thật ở focus.camp: hộp 140px, nút nowrap rộng 192px, tràn 60px ra ngoài. `leading-tight` để hai dòng không dính nhau. Luật `T15`.
- **Không `shadow`.** Nút nằm trong trang (`M15`).
- Chỉ `transition-colors`. Nút không phóng to, không nhấc lên, không đổ bóng thêm khi hover (`F22`).
- **Không ring khi focus.** Bàn phím Tab tới thì nút đổi nền y như lúc hover, bấm chuột thì không hiện gì (`focus-visible`). `outline-hidden` giữ outline trong suốt để chế độ tương phản cao của Windows vẫn thấy (`I13`).
- **Nút trong form hoặc footer modal** thêm `h-11 md:h-10` để cao đúng bằng ô nhập (`budgets.md`). Nút thường để `py-2.5` tự lo.
- Không có prop `size`. Cần nút khác cỡ thì truyền `className` — đỡ đẻ ra ma trận variant nhân size (`I6`).
- Logic class nằm trong `getVariantClasses()` ngoài JSX, không nhét ternary vào giữa markup.

---

## Nút xoá

Nền đỏ mờ 10% và chữ đỏ, **lúc nào cũng vậy**, không đợi rê vào. Rê vào hoặc Tab
tới thì nền đậm lên một bậc:

```tsx
<Button
  variant="ghost"
  className="bg-rose-500/10 text-rose-700 hover:bg-rose-500/15 hover:text-rose-700 focus-visible:bg-rose-500/15 focus-visible:text-rose-700 dark:text-rose-400"
>
  <Trash2 className="size-4 shrink-0" aria-hidden />
  Xoá
</Button>
```

- **Chữ `rose-700`, không `rose-500`.** Đo trên nền `rose-500/10` phủ trắng: `rose-500` chỉ 3.2:1, `rose-600` 3.9:1, đều trượt mức 4.5:1 của chữ 14px. `rose-700` được 5.2:1 mà vẫn đọc ra là đỏ. Nền tối thì ngược lại, chữ sáng lên `rose-400`.
- **Không dùng Tailwind** thì: nền `var(--danger-bg)`, rê vào `var(--danger-bg-hover)`, chữ + icon `var(--danger)`. Khối `.dark` trong `tokens.css` đã đổi sẵn sang `rose-400`.
- **Nền mờ, không đỏ đặc.** Nhận ra ngay là nút nguy hiểm nhưng không hét như nút `bg-rose-500 text-white` (`I4`).
- **Không viền đỏ** (`M30`). Nền mờ đã đủ tách nút khỏi nền trang.
- Icon cùng màu chữ — không để icon `text-muted` riêng.
- Bị khoá thì vẫn `opacity-50` như mọi nút.
- Chỉ áp cho **nút đứng riêng**: hàng nút, hộp xác nhận, khu nguy hiểm trong cài đặt. **Mục trong menu** (dropdown, sidebar, đăng xuất) vẫn trung tính lúc thường, rê vào mới đỏ — xem `I4`.

> Chủ dự án chốt 21/09/2026: nút xoá là nền danger 10% + chữ danger. Bản trước
> (xám lúc thường, rê vào mới đỏ) đã bỏ cho nút; vẫn giữ cho mục menu.

---

## Nút chỉ có icon

Vuông, cao **bằng đúng** nút chữ đứng cạnh nó, và luôn có `aria-label`:

```tsx
<button
  aria-label="Lọc danh sách"
  className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl border border-border-strong bg-surface text-muted outline-hidden hover:bg-background hover:text-foreground focus-visible:bg-background focus-visible:text-foreground"
>
  <SlidersHorizontal className="size-4" aria-hidden />
</button>
```

Chênh chiều cao với ô nhập hay nút chữ bên cạnh dù chỉ một bậc là nhìn ra ngay —
đây là lỗi đã dính ở vòng test kanban.

---

## Cảnh báo

Một bản `Button` ở project cũ đã phình lên **8 variant, 3 size** và một variant
`glow` dùng ba lớp radial gradient. Đó là ví dụ ngược. Muốn thêm variant thứ năm
thì phải trả lời được: nó khác bốn cái kia ở chỗ nào, và vì sao bốn cái kia không
làm được việc đó.
