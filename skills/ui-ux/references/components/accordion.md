# Accordion

Danh sách mục mở/đóng tại chỗ: FAQ, "xem chi tiết" theo từng mục. Mỗi mục là một
**nút tiêu đề** rộng hết hàng, bấm thì **nội dung** trượt ra ngay dưới.

Nhóm ô tuỳ chọn thu gọn **trong form** ("Cài đặt nâng cao") không dùng khung accordion
này: xem "Khu thu gọn trong form" ở cuối file.

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

## Khu thu gọn trong form

"Cài đặt nâng cao", "Tuỳ chọn khác": một nhóm ô mà đa số người dùng bỏ qua, nằm giữa
các ô của form. Dựng thành **một dòng chữ có chevron liền sau**, không khung, bấm thì các
ô trượt ra **thẳng cột và rộng bằng các ô khác của form**. Đây là cách hầu hết app làm với
tuỳ chọn phụ trong form tạo mới.

Cùng cơ chế trượt, `inert`, chevron với accordion ở trên; khác ở chỗ không khung, nút
không `px`, và khối cắt chỉ cắt dọc.

```tsx
// form-disclosure.tsx
interface FormDisclosureProps {
  title: string;
  // Cha giữ trạng thái: bấm gửi mà ô bên trong bị sai thì cha phải tự mở khu ra.
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children: ReactNode;
}

export default function FormDisclosure({ title, isOpen, onOpenChange, children }: FormDisclosureProps) {
  const panelId = useId();

  return (
    <div>
      {/* h2 khi form nằm ngay dưới h1 của trang. */}
      <h2>
        <Button
          type="button"
          variant="ghost"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onOpenChange(!isOpen)}
          // px-0: chữ thẳng mép trái với nhãn các ô. w-fit: vùng bấm là chữ + chevron,
          // không phải cả hàng. Không nền hover, rê vào thì chevron đậm lên như accordion.
          // Vòng focus vẽ ra ngoài (nút không nằm trong khối cắt), rounded-md ring-offset-4
          // như link không padding ngang (rules-state.md): offset 2px của Button thì vòng ôm
          // sát chữ và chevron hai bên.
          className="group h-11 w-fit gap-1.5 rounded-md px-0 py-0 text-sm font-medium text-foreground hover:bg-transparent focus-visible:ring-offset-4 md:h-10"
        >
          {title}
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted transition-[transform,color] duration-200 group-hover:text-foreground motion-reduce:transition-none",
              isOpen && "rotate-180",
            )}
            aria-hidden
          />
        </Button>
      </h2>

      <div
        id={panelId}
        inert={!isOpen}
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
          isOpen && "grid-rows-[1fr]",
          !isOpen && "grid-rows-[0fr]",
        )}
      >
        {/* overflow-y-clip, KHÔNG overflow-hidden: chỉ cắt dọc cho lúc trượt. Ô nhập rộng
            bằng khối này, overflow-hidden cắt mất quầng focus 2px ở hai bên ô. */}
        <div className="min-h-0 overflow-y-clip">
          {/* pt-2.5 cộng khoảng dưới chữ của nút = 20px, bằng gap giữa các ô. */}
          <div className="flex flex-col gap-5 pt-2.5">{children}</div>
        </div>
      </div>
    </div>
  );
}
```

Ô sai nằm trong khu đang đóng: bấm gửi thì mở khu rồi đưa con trỏ vào ô đó.

```tsx
// Khu đang đóng mang inert, focus() vào ô bên trong không ăn: gỡ inert ngay trong lượt này.
flushSync(() => setIsAdvancedOpen(true));

// Focus ngay nhưng chưa cuộn: khu còn đang trượt, scrollIntoView lúc này cuộn lệch.
// Trượt xong (200ms) mới cuộn ô vào giữa màn.
document.getElementById(fieldId)?.focus({ preventScroll: true });
window.setTimeout(() => focusFieldById(fieldId), accordionDurationMs);
```

**Luật**
- **Không khung, không vạch kẻ trên dưới khu.** Đã dính 26/09/2026 ở form tạo dự án: dựng
  bằng khung accordion (viền `--border`, `rounded-xl`) lồng trong card form trắng thì
  - lúc đóng, hàng có viền bo góc, rộng bằng ô nhập, chevron ở mép phải: nhìn y một ô
    select tên "Cài đặt nâng cao";
  - ô bên trong thụt 21px, hẹp hơn ô "Tên dự án" 42px (580 so với 622px ở 1280px): form
    có hai mép trái;
  - mở ra thì đáy khung và vạch trên hàng nút là hai đường kẻ cách nhau 24px;
  - vòng focus `ring-inset` của nút bị góc bo của khung cắt vuông.
- **Chevron liền sau chữ (`gap-1.5`)**, không đẩy ra mép phải. Chevron ở mép phải của một
  hàng rộng bằng ô nhập là dấu hiệu của select.
- **Các ô bên trong như mọi ô khác của form**: cùng mép trái, cùng bề rộng, cùng `gap-5`.
  Đo lại bằng `getBoundingClientRect`: nhãn ô đầu trong khu và nhãn ô phía trên cùng `left`.
- **`overflow-y-clip` trên khối cắt.** Đo 26/09/2026 ở 375 và 1280px: quầng focus đủ bốn
  phía, giữa lúc trượt không lòi chữ, không cuộn ngang. Ô cuối khu là ô nhập không có
  dòng gợi ý thì thêm `pb-1` vào khối nội dung cho quầng dưới.
- **Khoảng cách tự ra từ `h-10` của nút**: gợi ý của ô trên → tiêu đề 32px, tiêu đề → nhãn
  ô đầu 22px (đo 26/09/2026). Tiêu đề gần nhóm của nó hơn, không cần kẻ thêm.
- **Chỉ giấu thứ có mặc định dùng được.** Lựa chọn quyết định ai thấy dữ liệu (riêng tư /
  công khai) thì đưa ra ngoài khu: hầu hết app để nó ngay trên form tạo, người tạo phải thấy
  nó trước khi bấm. Khu này không tính theo ngưỡng `I17`: nó giấu để đường chính ngắn, không
  phải vì dài.
- **Đóng lúc vào trang.** Bấm gửi mà ô trong khu sai thì mở ra như mẫu trên.

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
- Khu thu gọn trong form: lúc đóng có trông như ô select không; mở ra thì nhãn và ô bên trong
  có cùng `left` và bề rộng với ô phía trên không; focus ô nhập trong khu, chụp cận mép trái
  mép phải xem quầng có bị cắt không; bấm gửi khi ô trong khu sai và khu đang đóng.
