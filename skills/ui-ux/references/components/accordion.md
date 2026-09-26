# Accordion

Danh sách mục mở/đóng tại chỗ: FAQ, nhóm cài đặt nâng cao, "xem chi tiết" theo từng
mục. Mỗi mục là một **nút tiêu đề** rộng hết hàng, bấm thì **nội dung** trượt ra ngay
dưới.

Khi nào dùng: danh sách dài hơn 6 mục, hoặc mỗi nội dung dài quá 3 dòng; dưới ngưỡng
đó thì hiện hết (`I17`). Ngoại lệ: FAQ trang giá luôn accordion (`../layouts/pricing.md`).
Mọi thứ mở/đóng dựng theo đúng công thức ở đây, không dùng `<details>` (`I30`).

Mẫu đã chạy thật ở FAQ trang giá, rà bằng link bảy lượt ngày 26/09/2026.

---

## Mẫu

Mỗi mục là một component con giữ `isOpen` riêng, nên mở nhiều mục cùng lúc được.

```tsx
// accordion-item.tsx
interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

export default function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div>
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen(!isOpen)}
          // py-4 CỐ ĐỊNH ở cả hai trạng thái: chữ luôn cách đều hai mép nút.
          className="group flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-pretty text-sm font-medium text-foreground outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground/50"
        >
          {title}
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted transition-[transform,color] duration-200 group-hover:text-foreground motion-reduce:transition-none",
              isOpen && "rotate-180",
            )}
            aria-hidden
          />
        </button>
      </h3>

      <div
        id={panelId}
        inert={!isOpen}
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
          isOpen && "grid-rows-[1fr]",
          !isOpen && "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          {/* px-5 bằng đúng nút ở trên, không max-w, không pr riêng: lấp kín bề ngang. */}
          <div className="px-5 pb-4 text-pretty text-sm/6 text-muted">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Khung: MỘT khung trắng, các mục chia bằng divide-y.
<div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
  {items.map((item) => (
    <AccordionItem key={item.id} title={item.title}>{item.body}</AccordionItem>
  ))}
</div>
```

`<button>` thuần cho gọn ví dụ. Dự án có `Button` dùng chung thì dùng nó, miễn giữ được
dòng tràn hết bề ngang, `rounded-none`, và **tắt nền hover của variant** (`ghost` có
`hover:bg-foreground/5`): thêm `hover:bg-transparent`.

---

## Luật

**Chuyển động**
- **Trượt bằng `grid-rows` 0fr ↔ 1fr, `duration-200 ease-out`**, chevron xoay cùng nhịp.
  Không `<details>`, không render có điều kiện, không `hidden`: đều mở đóng tức thì, bấm là
  giật (`I30`, đã dính 26/09/2026). Không đo chiều cao bằng JS.
- **Mục đóng gắn `inert`**: Tab không lọt vào nội dung đã ẩn, trình đọc màn hình không đọc.
- **`motion-reduce:transition-none`** trên cả khối trượt và chevron.

**Padding: mỗi khối tự đứng được**
- **Nút tiêu đề `px-5 py-4`, cố định ở cả lúc mở và đóng.** Đừng bớt `pb` khi mở để kéo
  nội dung lại gần: tô nền nút thì chữ cách mép trên 17px, mép dưới 7px (đã dính
  26/09/2026).
- **Nội dung `px-5 pb-4`, không `pt`**: nối tiếp padding dưới của nút. Đo 26/09/2026:
  mép trên → tiêu đề 17px, tiêu đề → nội dung 20px, nội dung → mép dưới 20px. Đã so với
  nội dung `py-3` (tô màu khối nào cũng đều, nhưng nội dung cách tiêu đề 32px mà cách vạch
  dưới 16px, trông thuộc về vạch dưới); chủ dự án chọn nối tiếp.
- **Nội dung cùng `px` với nút, không `pr` riêng, không `max-w`.** `pr-12` (để chữ không
  chạy dưới chevron) làm lề phải 48px mà lề trái 20px; `max-w-[65ch]` làm khối nội dung
  hụt 55px so với khối bọc (đã dính 26/09/2026). Bề rộng đặt ở **khung ngoài**.
- **Khung đủ rộng để tiêu đề dài nhất vừa một dòng ở desktop.** Đừng thu khung cho nội dung
  ≤ 75 ký tự: nội dung 1–2 câu đọc một hơi, không tính `T11`; khung hẹp làm tiêu đề xuống
  dòng khi hàng còn trống (đã dính 26/09/2026, FAQ `max-w-lg`). Nội dung dài từ 3 dòng trở
  lên mới xét `T11`, và khi đó thường là nên rút nội dung.
- **Không số âm** để kéo nội dung lên (`N11`): margin âm trên khối con `overflow-hidden`
  làm mục đang đóng lòi dòng đầu nội dung ra (đã thử 26/09/2026).

**Hover và focus**
- **Không nền hover. Rê vào thì chevron đậm lên** (`group-hover:text-foreground`) cộng
  con trỏ bàn tay. Ngoại lệ của `I10`. Đã thử và bỏ (26/09/2026):
  - nền `--surface-hover` (`#f8f8fa`) trên nút: gần màu nền trang `#f4f4f6` ngay ngoài mép
    khung, hàng như bị khoét; mục đang mở thì nửa trên xám nửa dưới trắng;
  - nền phủ cả mục (`has-[]`): vẫn là mảng gần màu nền trang chạm mép khung;
  - hàng thụt vào có bo góc: một ô xám gần màu nền trang nằm trong card, như lỗ khoét.
- **Vòng focus `ring-inset`**: khung `overflow-hidden` cắt mất vòng vẽ ra ngoài.

**Khung và chữ**
- **Một khung trắng, `divide-y divide-border`** (`M13`). Không để vạch kẻ thẳng trên nền
  trang xám: không khung thì vạch đọc ra như đường ngăn trang lơ lửng (đã dính 26/09/2026).
- **Tiêu đề mục `text-sm font-medium`, `text-pretty`**, không `text-balance` dù là `h3`: nó
  chung hàng với chevron, `balance` làm câu xuống dòng khi mới được nửa hàng (`T10`).
- **Nội dung `text-sm/6 text-muted`.**
- **Đóng hết lúc vào trang**, trừ khi đề nói mở sẵn mục nào.

---

## Kiểm

- Tô nền đặc khác nhau cho nút, khối bọc nội dung, nội dung, ở lúc đóng, mở và hover
  (`REVIEW.md` bước 4): chữ cách đều các mép trong từng khối, nội dung lấp kín khối bọc,
  không lòi màu khối bọc.
- Đo bằng `Range` trên chữ: mép trên → tiêu đề ≈ 17px, tiêu đề → nội dung ≈ 20px, nội dung
  → mép dưới ≈ 20px. Mục đóng giữ nguyên chiều cao khi mục khác mở.
- Chụp giữa lúc đang trượt (~90ms sau khi bấm): không lòi chữ ở mục đang đóng.
- Tab qua các nút; Enter và Space mở đóng; Tab không vào nội dung của mục đóng.
- Ở 375px, tiêu đề dài không xuống dòng khi mới được nửa hàng.
