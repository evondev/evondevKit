# Button

> ⚠️ Bản trước của file này dạy ba variant `primary` / `ghost` / `danger` và
> "nút mặc định không icon". **Cả hai đã đảo** — xem luật `I1`. Chủ dự án chốt
> 13/09/2026: nút mặc định là **nút viền**. Icon lucide bên trái chữ chỉ khi glyph gọi đúng
> hành động; nút form và nút trong modal chỉ có chữ (nới ngày 23/09/2026, xem `I1`).

---

## Bốn dạng, hết

```tsx
type ButtonVariant = "outline" | "primary" | "secondary" | "ghost";

function getVariantClasses(variant: ButtonVariant): string {
  return cn(
    // MẶC ĐỊNH. Dựng nút mới thì dùng cái này.
    // Hover: CHỈ đổi nền sang --button-hover (màu đặc), viền giữ nguyên.
    variant === "outline" &&
      "border border-border-strong bg-surface text-foreground hover:bg-button-hover",
    // Hành động chính DUY NHẤT của một khu, khi thật cần nổi.
    variant === "primary" &&
      "bg-primary text-primary-foreground hover:bg-primary-hover",
    // Nút phụ cần nhỉnh hơn ghost mà không tranh chỗ nút chính. Không viền.
    variant === "secondary" &&
      "bg-secondary text-foreground hover:bg-secondary-hover",
    // Hành động phụ nằm trong hàng, mờ đi lúc thường.
    // Hover foreground/5, KHÔNG bg-background: ghost hay đứng thẳng trên nền trang
    // xám (header, toolbar), tô --background ở đó thì rê vào không thấy gì.
    variant === "ghost" &&
      "bg-transparent text-muted hover:bg-foreground/5 hover:text-foreground",
  );
}

<button
  className={cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl",
    "px-4 py-2.5 text-sm font-medium transition-colors",
    // Nhãn tiếng Việt dài thì cho xuống dòng, đừng để tràn. Luật T15.
    "max-w-full text-center leading-tight [overflow-wrap:anywhere]",
    // Focus bàn phím: vòng mờ, chỉ hiện khi Tab tới, bấm chuột không thấy (I13)
    "outline-hidden focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
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
<Button variant="primary" aria-disabled={isSending || undefined} aria-busy={isSending || undefined}
  onClick={(event) => { if (isSending) event.preventDefault(); }}>
  {isSending ? <LoaderCircle className="size-4 shrink-0 animate-spin motion-reduce:animate-none" aria-hidden /> : <Send className="size-4 shrink-0" aria-hidden />}
  Gửi lời mời
</Button>
```

- Spinner **thế chỗ icon**, cùng `size-4`, chữ giữ nguyên. Nút không đổi bề rộng, hàng nút không xô. **Nút chỉ chữ** (không icon để thế chỗ): nút `relative`, chữ thêm `invisible` để vẫn giữ bề rộng, spinner `absolute inset-0 m-auto` nằm giữa.
- Không đổi chữ sang "Đang gửi…": chữ dài ngắn khác nhau là nút co giãn. Đổi thì phải giữ `min-w` bằng bản cũ.
- **Đang xử lý thì chặn bấm bằng `aria-disabled` + `preventDefault` trong `onClick`, KHÔNG đặt `disabled`.** Nút `disabled` bị trình duyệt tước tiêu điểm: người dùng bàn phím bấm Enter xong rơi về `<body>`, lúc xong việc phải Tab lại từ đầu trang (đã dính 24/09/2026 ở nút "Xem hoạt động cũ hơn", và 25/09/2026 ở trang đăng ký khi skill còn ghi `disabled`). Chặn ở `onClick` là chặn luôn Enter trong ô nhập, vì submit ngầm của form cũng đi qua cú click của nút submit. Nên cài một lần trong component `Button` (prop `isLoading`), đừng viết lại ở từng trang.
- Nút đang xử lý **không mờ** như nút khoá thường, chỉ spinner nói đang chạy, con trỏ `cursor-progress`. Mờ đi thì đọc ra là "bấm không được vì sai gì đó". Class gốc vẫn giữ `disabled:not-aria-busy:opacity-50` cho dự án nào lỡ đặt `disabled` lúc đang xử lý.

**Vì sao ổn**

- **`outline` là mặc định**, không phải `primary`. Nút nền nhấn rải khắp nơi thì màu thương hiệu loang ra, tới lúc có một nút thật sự cần nổi thì nó không nổi được nữa (`I1`, `M2`).
- **Nút viền rê vào thì chỉ đổi nền, viền giữ nguyên** (`hover:bg-button-hover`, `#f1f1f3`), như phần lớn các bộ component. Nền hover phải là **màu đặc nằm giữa nền trang và màu viền**, vì nút viền đứng trên card trắng hay thẳng trên nền trang xám thì không biết trước. Ba cách đã hỏng: `hover:bg-background` ra đúng `#f4f4f6` của nền trang, nút tan vào trang; lớp phủ `foreground/5` trong suốt nên lấy màu nền phía sau, trên nền trang ra `#e9e9eb` **trùng màu viền** `#eaeaea`, nút thành mảng xám không viền (hai lần 25/09/2026, nút lọc "Vai trò"); `--surface-hover` `#f8f8fa` thì trên card gần như không đổi. Cách chữa tạm "viền đậm lên `foreground/20`" thấy được ở đâu cũng được nhưng nặng, trông như nút đang bấm giữ hoặc đang chọn (bỏ 26/09/2026, chủ dự án chốt chỉ đổi nền). Đo 26/09/2026 ở trang lịch: `#f1f1f3` trên card trắng thấy rõ, trên nền trang nút chìm nhẹ mà viền vẫn còn. Nút có mũi tên mở danh sách lựa chọn thì không theo mục này mà theo ô Select (xem dưới).
- **`ghost` rê vào `hover:bg-foreground/5`**, không `bg-background` (ghost trong suốt, không có viền để đậm lên, nên phải là lớp phủ). Nút ghost nằm **trong dòng bảng / danh sách có nền rê** (⋯, icon button, ô sửa tại chỗ) thì `/8`, vì nó chồng lên nền dòng đang rê (`I10`).
- **Nút mở danh sách lựa chọn** (nút lọc "Vai trò ▾", "Trạng thái: Tất cả ▾", "Mỗi trang 10 ▾") **là ô Select, không phải nút viền**: dùng đúng class của ô Select (`choice-controls.md`), tức **không có hover**, chỉ `cursor-pointer`; lúc mở `aria-expanded:border-focus aria-expanded:ring-2 aria-expanded:ring-focus`, nền giữ `bg-surface`, mũi tên xoay. Mũi tên + con trỏ đã nói "bấm được", như ô Select trong form và ô nhập vốn không có hover; thêm hover nữa là tín hiệu thứ hai cho một ý (`N3`), và lệch khuôn với ô Select ngay trong modal (`N5`). Chủ dự án chốt 25/09/2026, sau hai lần hover làm nút tan vào nền trang. Nút mở **menu thao tác** (⋯, "Xuất ▾") thì không phải ô chọn: lúc mở giữ nền rê `aria-expanded:bg-foreground/5`.
- **`secondary` (nền xám, không viền)** dùng khi nút phụ cần có mặt rõ hơn `ghost` nhưng viền mảnh trông rỗng: nút rộng hết card (các gói thường trong bảng giá, `layouts/pricing.md`), hoặc nút phụ đứng cạnh nút `primary` trong footer. Không thay `outline` làm mặc định (chủ dự án chốt 21/09/2026).
- **`ghost` đứng đầu hàng, thẳng cột với chữ phía trên** thì thêm `-ml-4` bù đúng `px-4`. Nền trong suốt nên mắt thấy mép của chữ chứ không thấy mép nút, không bù thì cả hàng trông lệch vào 16px so với tiêu đề và nhãn bên dưới. Nền hover lấn ra lề trái là đúng ý. Nút có nền hoặc viền thì không bù. **Cuối hàng bên phải cũng vậy**, bù bằng `-mr` đúng `px` của nút (`h-8` là `-mr-3`): chữ "Đánh dấu đã đọc" ở header panel thông báo thẳng cột với chấm chưa đọc bên dưới, lúc rê vào nền xám sát mép panel hơn tiêu đề bên trái là đúng ý, không phải lệch.
- Icon lucide **bên trái chữ**, `size-4`, `shrink-0` để nó không bị bóp khi nhãn dài. `aria-hidden` vì chữ đã nói rồi.
- **Không `white-space: nowrap`.** Đo thật ở một dự án: hộp 140px, nút nowrap rộng 192px, tràn 60px ra ngoài. `leading-tight` để hai dòng không dính nhau. Luật `T15`.
- **Không `shadow`.** Nút nằm trong trang (`M15`).
- Chỉ `transition-colors`. Nút không phóng to, không nhấc lên, không đổ bóng thêm khi hover (`F22`).
- **Focus bàn phím là vòng `ring-foreground/50` cách nút 2px**, chỉ hiện khi Tab tới (`focus-visible`), bấm chuột không bao giờ thấy. Mức thấp nhất đạt 3:1 (`I13`). Bản cũ "focus y như hover" gần như không thấy trên nút `primary` (1,28:1).
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
  className="bg-rose-500/10 text-rose-700 hover:bg-rose-500/15 hover:text-rose-700 dark:text-rose-400"
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
- Chỉ áp cho **nút đứng riêng**: hàng nút, hộp xác nhận, khu nguy hiểm trong cài đặt. **Mục trong menu** (dropdown, sidebar) vẫn trung tính lúc thường, rê vào mới đỏ — xem `I4`.

> Chủ dự án chốt 21/09/2026: nút xoá là nền danger 10% + chữ danger. Bản trước
> (xám lúc thường, rê vào mới đỏ) đã bỏ cho nút; vẫn giữ cho mục menu.

---

## Nút chỉ có icon

Vuông, cao **bằng đúng** nút chữ đứng cạnh nó, và luôn có `aria-label`:

```tsx
<button
  aria-label="Lọc danh sách"
  className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl border border-border-strong bg-surface text-muted outline-hidden hover:bg-button-hover hover:text-foreground"
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
