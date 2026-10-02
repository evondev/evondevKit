# Chip và IconButton

Nguồn: chip và nút icon của một dự án thật.

```tsx
// Chip: bộ lọc, tag chọn được. Luôn kèm aria-pressed={isActive}
"inline-flex max-w-48 cursor-pointer items-center rounded-full px-3 py-1 text-xs font-medium outline-hidden transition-colors"
isActive && "bg-primary text-primary-foreground"
!isActive && "bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground"

// IconButton: hành động phụ trong dòng hoặc header
"inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors"
"hover:bg-foreground/5 hover:text-foreground"   // nằm trong dòng có nền rê: hover:bg-foreground/8
"outline-hidden"
"disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted"
```

## Chip có hai cỡ, chọn theo vai trò

Đây là chỗ hay sai: lấy cỡ chip trong widget đem ra làm bộ lọc chính của cả màn,
rồi hàng đó trông teo lại.

| Vai trò | Cỡ | Đi cạnh cái gì |
| --- | --- | --- |
| **Chip phụ trong widget**, tag, nhãn trạng thái | `px-3 py-1 text-xs` (cao ~26px) | Nằm trong card nhỏ, cạnh chữ `text-xs` |
| **Chip lọc chính của cả màn** | `h-9 px-3.5 text-sm` | Nằm cạnh ô tìm `h-10`, cạnh nút `h-10` |

Nguyên tắc chung: **chip đứng cùng hàng với ô nhập hay nút thì phải gần bằng
chiều cao của chúng**, lệch quá một bậc là hàng đó trông hỏng. Chip cao 26px
đứng cạnh input cao 40px thì mắt đọc ra cụm chip là thứ yếu, dù nó là bộ lọc
chính.

---

**Vì sao ổn**

- **Chip chưa chọn là viên mờ `bg-foreground/5`, chữ `foreground/70`**; rê vào `foreground/10`, chọn rồi tô `bg-primary`. Lớp phủ theo màu chữ nên **mờ như nhau trên cả nền trang xám lẫn card trắng**, không phải chọn token theo nền. Đừng `bg-background`: trên card trắng thành bảy viên xám rõ, hàng lọc chưa ai dùng nặng thứ nhì màn; trên nền trang thì trùng màu nền nên rê vào không thấy gì. Đừng bỏ hẳn nền, chỉ chữ `text-muted`: hàng chip đọc ra như **một hàng tab thứ hai** nằm ngay dưới hàng tab, và `--muted` trên `#f4f4f6` chỉ 3,5:1. Chip phải còn dáng viên thì mới khác tab. Không viền: mười chip mà chip nào cũng có viền thì đọc như hàng rào.
- Chip nằm **trong popover có nút xác nhận** (popover Lọc) thì đang chọn không tô `bg-primary`, xem "Popover lọc" trong `../layouts/overlay.md`: chip đen đứng cạnh nút Áp dụng đen là hai khối nặng ngang nhau.
- Nền chip đang chọn là **`bg-primary text-primary-foreground`**, đúng token, không `bg-[#…]`, không `text-white`. Dùng token thì nền tối tự đảo (`--primary` thành gần trắng, chữ thành gần đen); gõ cứng thì sang nền tối thành chữ trắng trên nền trắng. Cũng đừng lấy nhầm `--primary-hover`: chip đang chọn trông nhạt hơn nút chính ngay cạnh.
- **Nhãn dài thì cắt, không để chip phình.** Chip `max-w-48`, chữ bọc trong `<span class="truncate">`, và `title` mang đủ tên để rê vào vẫn đọc được. Một chip "Hội chợ Triển lãm Quốc tế 2026" rộng gấp bốn chip "VIP" là cả hàng lệch, mắt dồn hết vào cái dài nhất.
- **Chip lọc là nút bật/tắt, phải có `aria-pressed={isActive}`.** Trạng thái chọn hiện chỉ bằng màu nền, trình đọc màn hình không thấy màu, nên thiếu `aria-pressed` thì chip nào cũng đọc ra "nút" như nhau. Chip chọn một (kiểu tab) thì dùng `role="radio"` + `aria-checked` trong `role="radiogroup"`, không dùng `aria-pressed`.
- Chip là `rounded-full`, nút là `rounded-xl` (cao dưới 40px thì `rounded-lg`, `F1`). Khác hình để mắt biết ngay cái nào chọn được nhiều cái nào là hành động.
- IconButton vuông `size-8`, chữ `text-muted` lúc thường, chỉ đen lên khi hover. Icon phụ không được đen bằng nội dung.
- **Nền rê của IconButton là lớp phủ `bg-foreground/5`, không `bg-background`.** Nút hay nằm trong dòng rê `hover:bg-item-hover` (`list-row.md`): rê vào nút thì nền nút trùng nền dòng, nút mất hẳn. Lớp phủ lấy màu nền phía sau nên đậm hơn nền quanh nó ở mọi chỗ. **Nằm trong dòng có nền rê thì lên `hover:bg-foreground/8`** (`I10`): `/5` chồng lên nền dòng đang rê gần như trùng.
- Trạng thái disabled phải tắt luôn cả hover (`disabled:hover:bg-transparent`). Thiếu dòng đó thì nút chết vẫn sáng lên khi rê vào, người dùng bấm hoài không hiểu sao.
- `aria-label` và `title` luôn nhận cùng một chuỗi `label`. Nút chỉ có icon thì bắt buộc.

---

## Chip lọc đang áp dụng (có ×) ⚑

Hàng tóm tắt lọc cạnh số kết quả (*8 kết quả · [Gần bệnh viện ×] [Gần cao đẳng ×] Xoá lọc*)
là **nút bỏ lọc**, không phải nút bật / tắt như chip lọc. Khác vai thì khác hình:

```html
<button type="button" aria-label="Bỏ lọc Gần bệnh viện"
  class="inline-flex h-8 shrink-0 cursor-pointer items-center gap-1 rounded-full border border-border-strong bg-surface pr-2 pl-3 text-sm text-foreground outline-hidden transition-colors hover:bg-button-hover">
  Gần bệnh viện <i data-lucide="x" class="size-3.5 text-muted"></i>
</button>
```

- **Viền, không nền xám, không tô màu nhấn.** Nền `bg-foreground/5` là hình của chip **chưa
  chọn** ở hàng lọc: hàng tóm tắt dùng nền đó thì đọc thành "chưa chọn", ngược nghĩa. Tô
  `bg-primary` thì thành khối màu thứ ba, thứ tư cạnh chip đang chọn phía trên (`N3`). Viền
  `--border-strong` như nút viền (`M14`): đọc ra "bấm được, bấm là bỏ".
- **Cả chip là nút bỏ lọc**, không chỉ dấu ×; `aria-label` nói rõ bỏ lọc gì.
- Nhãn ghi đủ nghĩa khi đứng một mình ("Gần bệnh viện", "Dưới 8 triệu"), không chỉ "Bệnh viện".
- **Chỉ hiện lọc không nhìn thấy từ ngoài**: lọc chọn trong dropdown, popover, panel (khu vực,
  giá thuê, dạng phòng). Lọc là chip hiện sẵn trên trang thì chip đang chọn đã nói rồi, không
  lặp ở hàng tóm tắt ("Hai chỗ một việc", `V1b`; chủ dự án chốt).
- **"Xoá lọc"** là nút ghost chữ cuối hàng, hiện khi có ít nhất một lọc, **kể cả lọc là chip**
  ở trên: nó bỏ hết một lần. Không có lọc ẩn nào thì hàng chỉ còn số kết quả và "Xoá lọc".

## Hàng chip ở màn hẹp

Hàng chip lọc **không bao giờ `flex-wrap`**. Bốn chip ở 375px sẽ thành ba cái
một hàng và một cái rớt xuống đứng một mình, đọc ra như lỗi chứ không như thiết
kế.

```html
<!-- Khối bọc hàng có lề ngang ít hơn 4px so với các khối khác (card px-5 thì khối này px-4, R6):
     hàng bên trong px-1 đưa chip đầu về thẳng cột. -->
<div class="scrollbar-clean overflow-x-auto py-0.5">
  <div class="flex items-center gap-2 px-1">
    <button type="button" aria-pressed="true" class="shrink-0 cursor-pointer rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground outline-hidden">Tất cả</button>
    <button type="button" aria-pressed="false" class="shrink-0 cursor-pointer rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70 outline-hidden hover:bg-foreground/10 hover:text-foreground">Quá hạn</button>
    <button type="button" aria-pressed="false" title="Hội chợ Triển lãm Quốc tế 2026" class="max-w-48 shrink-0 cursor-pointer rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70 outline-hidden hover:bg-foreground/10 hover:text-foreground">
      <span class="block truncate">Hội chợ Triển lãm Quốc tế 2026</span>
    </button>
  </div>
</div>
```

`shrink-0` để chip không bị bóp méo, `scrollbar-clean` để không lòi thanh cuộn ra. Ẩn thanh thì ở máy có chuột phải có nút mũi tên ở phía còn chip khuất (`responsive.md`, sau `R10`). Chip **đang lọc** (bấm để gỡ) thì khác: từ `sm` xuống dòng, "Xoá lọc" luôn thấy (`responsive.md`, sau `R6`).

Lề thì đặt trên **hàng bên trong**, đừng đặt trên khung cuộn: `<div class="overflow-x-auto"><div
class="flex gap-2 px-1">`. Padding bên phải của khung cuộn bị bỏ qua khi cuộn tới cuối, nên chip
cuối sẽ dính sát mép. **Khung cuộn không kéo ra bằng `-mx-1`** (`N11`): khối bọc nó lùi lề ít hơn
4px, các khối anh em giữ lề đủ (cách của `R6`).

---

## Thanh tab: bốn variant, chọn theo chỗ đứng

Tab và chip trông na ná nhưng là hai thứ khác nhau:

| | Tab | Chip lọc |
| --- | --- | --- |
| Chọn | **Đúng một**, luôn có một cái đang chọn | Không, một, hoặc nhiều |
| Ví dụ | Tất cả / Đang giao dịch / Tiềm năng / Ngừng | Nhãn, người phụ trách, khoảng giá |
| Hình | Theo variant bên dưới | Pill `rounded-full`, đang chọn tô đặc |

### Chọn variant

| Variant | Hình | Đặt ở đâu |
| --- | --- | --- |
| `boxed` (mặc định) | Chữ trơn, tab đang chọn là **ô nền nhạt viền mảnh** | Trên bảng / danh sách, chuyển trạng thái: Tất cả / Chờ xử lý / Đã giao |
| `underline` | Đường kẻ chạy hết hàng, **vạch 2px** dưới tab đang chọn | Chia nội dung trang chi tiết hoặc khối lớn: Tổng quan / Hoạt động / Tệp. **Điều hướng giữa các trang cài đặt**: Hồ sơ / Thông báo / Bảo mật (`../layouts/app.md`, "Khu cài đặt có nhiều trang") |
| `solid` | Tab đang chọn là **pill tô màu nhấn**, chữ đảo màu | Chỉ khi người dùng chọn. Không cho khu cài đặt: trang đầy công tắc bật đã tô `--primary`, viên đen ở đầu trang tranh với chúng |
| `segmented` | **Rãnh chìm** nhạt, tab đang chọn là **ô trắng nổi** như phím bấm | 2–4 lựa chọn ngắn đổi cách xem: Ngày / Tuần / Tháng, Danh sách / Lưới |

- **Ngay dưới hàng tab còn một hàng chip lọc thì tab dùng `underline`, không `boxed`.** Chip là viên xám bo tròn; tab `boxed` đang chọn cũng là viên xám bo góc. Hai hàng viên xám chồng nhau thì tab đang chọn đọc ra như một cái chip nữa, không ai thấy đó là trạng thái đang xem. Vạch dưới 2px là ngôn ngữ khác hẳn viên, hai hàng tách nhau ngay (`N5`).
- **Một trang chỉ một variant cho mỗi vai.** Tab trạng thái trên bảng đã `boxed` thì mọi bảng trong app đều `boxed`.
- **`solid` không dùng cho tab trạng thái trên bảng.** Pill tô đặc đứng đầu bảng thì kéo mắt mạnh hơn cả dữ liệu, và đọc ra như một nút bấm. Đừng dùng cho khu cài đặt: viên đen đứng trên sáu công tắc bật cũng đen, chữ trong viên thụt `px-3` lệch cột với tiêu đề mục bên dưới. Khu cài đặt dùng `underline`.
- `segmented` quá 4 lựa chọn, hoặc nhãn dài hơn hai chữ, thì đổi sang `boxed` hoặc `underline`.

### Mặc định khi đề không nói: không icon, không số

Tab dựng ra khi người dùng không nhắc gì là **chữ trơn**, không icon, không số đếm.
Chỉ thêm khi:

- **Icon:** người dùng yêu cầu, hoặc dự án đã có hàng tab dùng icon (theo cái đã có).
- **Số đếm:** người dùng yêu cầu ("có số đếm từng tab"), hoặc dữ liệu thật trả về sẵn số. Không bịa số cho có. Ca hay gặp: tab bản ghi con ở trang chi tiết ("Đơn hàng 24", "Tệp 4"); tab dòng chảy (Tin nhắn, Hoạt động) vẫn chữ trơn (`layouts/app.md`).

### Icon: khi có thì theo ba luật

Icon trước chữ **không bắt buộc**, xem mặc định ở trên. Có thì:

- **Có thì mọi tab trong hàng đều có**, không tab có tab không.
- Icon `size-4 shrink-0`, lấy từ thư viện icon của dự án, **màu ăn theo chữ** (`currentColor`): tab chưa chọn icon xám cùng chữ, tab đang chọn icon đậm cùng chữ. Không tô icon màu riêng.
- `segmented` chỉ có icon, không chữ, thì mỗi tab phải có `aria-label` và tooltip.

### Chung cho mọi variant

```tsx
<div role="tablist" aria-label="Lọc theo trạng thái" className={getTabListClasses(variant)}>
  {views.map((view) => {
    const isSelected = view.value === activeView;

    return (
      <Button
        key={view.value}
        variant="ghost"
        role="tab"
        aria-selected={isSelected}
        tabIndex={isSelected ? 0 : -1}
        onClick={() => onChange(view.value)}
        className={getTabClasses(variant, isSelected)}
      >
        {view.icon && <view.icon className="size-4 shrink-0" />}
        {view.label}
        {view.count !== undefined && <span className="text-xs font-normal tabular-nums text-muted">{view.count}</span>}
        {view.isNew && <span className={getNewBadgeClasses(isSelected)}>Mới</span>}
      </Button>
    );
  })}
</div>
```

- **Mọi tab cùng `font-medium`**, kể cả tab chưa chọn. Đổi độ đậm lúc chọn làm chữ nở ra và cả hàng xô ngang.
- Tab chưa chọn chữ `foreground/70`. Hover dùng nền `foreground/5` (riêng `underline` thì chỉ đậm chữ, không nền, xem dưới); focus bàn phím không vòng (`I13`), **không bao giờ là nền xám**. Không dùng `--background` làm nền hover: tab hay nằm thẳng trên nền trang xám, tô `--background` ở đó thì rê vào không thấy gì.
- Bàn phím theo WAI-ARIA: chỉ tab đang chọn nằm trong vòng Tab, mũi tên trái/phải chuyển và chọn luôn, Home/End về hai đầu.
- Số đếm là số trơn `text-foreground/70`, không pill, không màu. **Không `text-muted`**: tab `boxed` đang chọn có nền `--secondary`, `--muted` trên đó chỉ 4.04 : 1 (`styles.md`). Trên tab đang chọn (chữ `--foreground`) số vẫn nhạt hơn nhãn một bậc; trên tab chưa chọn thì số và nhãn cùng màu, vậy là đủ. Không có số thì bỏ, đừng dựng số giả.
- Hàng tab không bao giờ wrap, màn hẹp thì cuộn ngang trong khung `scrollbar-clean` (`R6`). Từ 6 tab trở lên thì gom phần dư vào tab "Thêm" mở dropdown (`R10`).

### `boxed`: tab trạng thái trên bảng

```ts
// Khung cuộn py-0.5, khối bọc lề ít hơn 4px (R6, không -mx-1): nền hover tab đầu/cuối không bị cắt. Hàng: gap-1 px-1.
"h-9 rounded-lg border px-3"
isSelected && "border-transparent bg-secondary text-foreground"
!isSelected && "border-transparent text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
```

- **Mọi tab luôn có `border`**, tab chưa chọn là `border-transparent`. Không thì lúc bấm chuyển, tab đang chọn dày thêm 2px và cả hàng xô sang phải.
- **Tab đang chọn: nền `--secondary`, chữ `--foreground`, viền trong suốt.** Đây là bậc xám duy nhất chìm đủ rõ trên **cả** card trắng lẫn nền trang `#f4f4f6`. Nền tối thì `--secondary` là trắng phủ 8%, sáng lên thay vì chìm, cùng độ chênh (`M21`).
- **Không dùng `bg-surface` (trắng) và cũng không dùng `bg-surface-hover`.** Hai bậc đó chỉ chênh nền trắng 1-3% thì liếc vào không thấy tab nào đang chọn.
- **Ô đang chọn phải chênh với nền NẰM DƯỚI nó**, không phải chênh với mấy tab anh em. Cùng một class mà đổi chỗ đặt (card trắng ↔ nền trang xám) là đổi luôn độ rõ, nên chọn bậc xám nào cũng phải thử ở cả hai nền (`N2`).
- **Không đặt hàng `boxed` vào một khối xám riêng.** Nó nằm thẳng trên nền trang hoặc trên card. Bọc thêm khối xám là thành `segmented` hỏng: rãnh to, đậm, và ô trắng lọt thỏm.
- **`h-9 rounded-lg`**, cao dưới 40px nên bo 8px (`F1`), không ngoại lệ. Đừng bo 12px: tab 36px bo 12px là quá tròn so với chiều cao. Đứng cạnh ô tìm `h-10` là lệch đúng một bậc, chấp nhận được.
- Bên phải cùng hàng: ô tìm, nút **Lọc** (mở popover cho các trường khác ngoài trạng thái), nút **Sắp xếp** nếu cần. Đều là nút viền `h-10 rounded-xl` (`I1`), **cao bằng ô tìm `h-10`**: cả hàng công cụ một chiều cao, như bảng cỡ ở đầu file. Nút `h-9` đứng sát ô tìm `h-10` thì đáy lệch 4px, trông như hàng bị hỏng.

### `underline`: chia nội dung trang chi tiết

```ts
// Hàng: đường kẻ chạy hết bề ngang, vẽ bên trong hàng (bóng inset 1px ở đáy), vạch của tab đang chọn đè lên nó.
"flex min-w-full gap-2 px-2 shadow-[inset_0_-1px_0_var(--border-strong)]"
// Tab: vạch là ::after nên không đẩy chiều cao. box-content h-10 pb-px: tab cao 41px phủ cả dòng kẻ, vạch bottom-0 đè đúng lên nó.
"relative box-content h-10 rounded-xl px-2 pb-px after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full"
isSelected && "text-foreground after:bg-foreground"
!isSelected && "text-foreground/70 after:bg-transparent hover:text-foreground"
```

- **Hàng tab nằm chung hàng với ô tìm và nút (toolbar trên bảng) thì bỏ đường kẻ hết hàng, chỉ giữ vạch 2px dưới tab đang chọn.** Đường kẻ chạy nửa hàng rồi cụt ở mép ô tìm trông dở dang, và vì khung cuộn rộng hơn cột nội dung 8px mỗi bên (để chữ tab đầu thẳng cột) nên đầu trái của nó còn thò ra ngoài mép card bên dưới 8px. Đường kẻ hết hàng chỉ dùng khi hàng tab đứng riêng một hàng, như trang chi tiết.
- Vạch màu `--foreground`, không màu nhấn có sắc: nhấn đã có ở nút chính của trang (`M3`).
- **Vạch không kéo xuống bằng `after:-bottom-px`** đè lên `border-b` của hàng (`N11`). Khung cuộn `overflow-x-auto` cũng cắt theo chiều dọc, nên khi đường kẻ nằm ở khối bọc ngoài khung cuộn (khu cài đặt) thì mép dưới vạch bị cắt, vạch chỉ còn 1px trên đường kẻ. Bản `box-content pb-px` + `bottom-0` nhìn y hệt bản số âm ở hàng tab đứng riêng (trang chi tiết, panel), và ở khu cài đặt thì vạch hiện đủ 2px.
- Khối bọc hàng tab lùi lề ít hơn 8px (`R6`), khung cuộn không `-mx-2` (`N11`): chữ tab đầu thẳng cột với nội dung bên dưới.
- Tab đang chọn không tô nền, không đổi nền lúc hover. Vạch là tín hiệu duy nhất.
- **Không tab nào có nền, kể cả lúc focus.** Tab bàn phím tới thì không đổi gì (`I13`). Tab là `Button variant="ghost"` mà `Button` dự án còn kiểu cũ "focus trông như hover" (nền xám) thì hàng tab dính theo: tab đang focus có nền xám, tab đang rê chuột đậm chữ, **hai tab cùng sáng** và không đọc ra tab nào đang chọn. Sửa ở `Button` dùng chung, không vá riêng từng tab.
- Hàng tab nằm được cả trên card trắng lẫn trên dải header xám: đường kẻ `--border-strong` đủ nhìn ở cả hai.

### `solid`: pill tô đặc (chỉ khi người dùng chọn)

```ts
"h-9 rounded-lg px-3"
isSelected && "bg-primary text-primary-foreground hover:bg-primary"
!isSelected && "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"

// Badge "Mới" cạnh nhãn: pill như mọi badge, đảo màu theo tab.
function getNewBadgeClasses(isSelected: boolean) {
  return cn(
    "rounded-full px-2 py-0.5 text-xs font-medium",
    isSelected && "bg-primary-foreground text-primary",
    !isSelected && "bg-emerald-500/10 text-emerald-700",
  );
}
```

- Màu tô là `--primary` và `--primary-foreground`, không viết cứng `bg-black text-white`: ở nền tối màu nhấn đảo thành gần trắng.
- **Chỉ một chỗ tô đặc trên màn.** Trang đã có nút chính tô `--primary` ngay cạnh thì cân nhắc `boxed`, hai khối tô đặc tranh nhau (`M2`).
- Badge "Mới" là thông tin trạng thái nên dùng màu xanh báo trạng thái (`M4`), trên tab đang chọn thì đảo sang nền `--primary-foreground`. Mỗi hàng tối đa hai badge, nhiều hơn là mất tác dụng.
- Pill `rounded-full text-xs`, chữ thường "Mới", không in hoa, không `text-[10px]`: chữ hoa 10px thì dấu tiếng Việt dính nhau, và `rounded` 4px là bậc bo thứ năm (`F1`).

### `segmented`: chuyển cách xem, dạng phím nổi

Rãnh **chìm** vào mặt (bóng trong), ô đang chọn **nổi** lên (bóng ngoài rất mờ + viền tóc). Hai lớp bóng ngược chiều mới ra cảm giác 3D, chỉ ô nổi thôi thì trông như dán giấy.

```ts
// Rãnh: nền nhạt --background, KHÔNG dùng --secondary (đậm quá, ô trắng lọt thỏm).
// Bo 12px, cách 4px, ô bên trong bo 8px: hai góc đồng tâm (M19).
"inline-flex w-fit max-w-full gap-1 rounded-xl bg-background p-1 shadow-(--shadow-segment-track)"
// Ô
"h-8 rounded-lg px-3 transition-[color,background-color,box-shadow] duration-150"
isSelected && "bg-surface text-foreground shadow-(--shadow-segment-thumb)"
!isSelected && "text-foreground/60 hover:text-foreground"
```

Hai token bóng khai trong `tokens.css`, có bản nền tối riêng:

```css
:root {
  --shadow-segment-track: inset 0 0 0 1px rgb(0 0 0 / 0.05), inset 0 1px 2px rgb(0 0 0 / 0.04);
  --shadow-segment-thumb: 0 0 0 1px rgb(0 0 0 / 0.04), 0 1px 2px rgb(0 0 0 / 0.06), 0 2px 6px -2px rgb(0 0 0 / 0.08);
}
.dark {
  --shadow-segment-track: inset 0 0 0 1px var(--border), inset 0 1px 2px rgb(0 0 0 / 0.4);
  --shadow-segment-thumb: 0 0 0 1px var(--border-strong), inset 0 1px 0 rgb(255 255 255 / 0.06), 0 1px 2px rgb(0 0 0 / 0.5);
}
```

- **Rãnh nhạt, không đậm.** `--background` trên card trắng là vừa đủ thấy rãnh; `--secondary` thì rãnh thành mảng xám nặng, kéo mắt hơn cả nội dung widget.
- Ô chưa chọn **không có nền hover**, chỉ đổi màu chữ. Nền hover xám trong rãnh xám thì thành ba sắc xám chồng nhau.
- Bóng ở đây là **ngoại lệ có tên của `M15`**: ô đang chọn là một phím vật lý, bóng nói "đang nhấn nó". Không nhân rộng sang `boxed`, `underline`, `solid`, hay khối khác trong trang.
- Nền tối: bóng đen khó thấy (`M23`), nên ô nổi lên nhờ viền `--border-strong` và vệt sáng `inset` trên mép trên.
- Rãnh đặt trên nền trang xám (không nằm trong card) thì đổi rãnh sang `bg-foreground/5`, để rãnh vẫn chìm hơn nền quanh nó.

---

## Badge số đếm

Số việc chưa đọc, số mục trong nhóm, số thành viên. Xuất hiện ở sidebar, ở tab,
ở tiêu đề cột.

Mặc định là **số trơn, chữ xám**, không khung, không nền. Pill trắng viền mảnh chỉ
khi người dùng chọn. Năm pill viền cạnh nhau trên một cột là năm khung nhỏ kéo mắt
(sidebar cũng vậy, `../layouts/app.md`).

```html
<!-- Mặc định: số trơn. Dòng đang chọn thì số lên text-foreground cùng chữ. -->
<span class="ml-auto shrink-0 text-xs tabular-nums text-muted">4</span>

<!-- Chỉ khi người dùng chọn: pill trắng, viền mảnh, chữ xám. -->
<span class="ml-auto shrink-0 rounded-full border border-border-strong bg-surface px-2 py-0.5 text-xs font-medium tabular-nums text-muted">121</span>
```

- **Một danh sách chỉ MỘT kiểu.** Người dùng chọn pill thì mọi số đều là pill, kể cả số `4`. Đừng chia kiểu theo ý nghĩa con số (chưa đọc thì pill, số đếm thường thì trơn): đặt cạnh nhau thì chỉ thấy hai hàng lệch style, không ai đọc ra được ý nghĩa.
- **Luôn căn phải**, cách nhãn bằng `ml-auto` hoặc `justify-between`.
- **Không tô màu brand, không nền đặc.** Badge brand chữ trắng trông nặng và làm màu nhấn loang khắp sidebar. Số đếm là thông tin, không phải hành động (`M2`, `M4`). Dự án muốn badge màu thì để họ tự đổi, skill không tự đề xuất.
- **Có pill thì nền pill là `--surface` (trắng)**, không phải `--secondary`. Pill trắng vẫn nổi rõ trên hàng đang rê (`--background`) và hàng đang chọn (`--secondary`), còn pill xám thì tan vào hàng.
- Chỉ tô màu khi con số là **cảnh báo thật**, kiểu số việc quá hạn: chữ hổ phách, vẫn không nền đặc.
- `tabular-nums` để các hàng thẳng cột nhau.
- Số lớn thì rút gọn: `99+`, đừng để `1.284` phá bề rộng sidebar.

---

## Phân trang

Nằm ở đáy khung bảng hoặc danh sách, cách thân bảng bằng `border-t border-border`. Một hàng,
hai cụm: **số đếm bên trái, mọi control bên phải**.

```
1 tới 10 trong 1.284 đơn hàng          Mỗi trang [10 ▾]   ‹ 1 2 3 4 5 … 129 ›
```

```tsx
<div className="flex items-center justify-between gap-4 border-t border-border px-4 py-3">
  <p className="text-sm tabular-nums text-muted">1 tới 10 trong 1.284 đơn hàng</p>
  <div className="flex shrink-0 items-center gap-4">
    {/* "Mỗi trang" + select h-9 */}
    <nav aria-label="Phân trang" className="flex items-center gap-1">{/* ‹ trang › */}</nav>
  </div>
</div>
```

```ts
// Nút số trang: vuông h-9, luôn có border để lúc chuyển trang không xô hàng
"inline-flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg border px-2 text-sm font-medium tabular-nums outline-hidden"
isCurrent && "border-transparent bg-secondary text-foreground"   // + aria-current="page"
!isCurrent && "border-transparent text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
// Mũi tên ‹ ›: IconButton h-9 w-9, có aria-label "Trang trước" / "Trang sau"
```

- **Không bao giờ wrap, không nhảy chỗ.** Nav luôn ở cụm phải, cùng hàng với số đếm, bất kể có bao nhiêu trang. Chật thì **bớt số trang trước**: bỏ `2 3 4 5`, chỉ còn `‹ 1 … 12 … 129 ›`. Màn hẹp dưới `sm` thì chỉ còn `‹ 12 / 129 ›`. Không đẩy nav xuống dòng hai (nhiều trang thì nav rớt xuống căn trái, ít trang lại nằm phải).
- **Dưới `sm` số đếm chỉ còn tổng**: "32 khách hàng", phần "1 tới 10 trong" bọc `<span class="hidden sm:inline">`. Nav `‹ 1 / 4 ›` đã nói đang ở đâu (`I16` vẫn đủ: tổng số bên trái, vị trí bên phải). Để nguyên câu thì ở 375px nó chỉ còn ~168px cạnh nav, rớt một chữ xuống dòng hai ("1 tới 10 trong 32 khách / hàng"), chân bảng cao gấp đôi.
- **Trang đang chọn chép đúng class tab `boxed` đang chọn**: nền `--secondary`, viền trong suốt. **Không dùng nền trắng + viền**: đứng cạnh select `10 ▾` thì nó trông y như ô input, người dùng tưởng là ô gõ số trang để nhảy.
- **Select "Mỗi trang" nằm trong cụm phải, sát nav**, không đứng ngay sau số đếm. Số đếm dài ra theo trang ("1 tới 10" rồi "1.271 tới 1.280"), đặt select sau nó là select xê dịch mỗi lần chuyển trang.
- **Cửa sổ trang luôn đủ 7 ô** (tính cả `…`) khi tổng số trang lớn hơn 7. Ở gần hai đầu thì lấp thêm số cho đủ 7:

  | Đang xem | Hiện |
  | --- | --- |
  | Trang 1 | `1 2 3 4 5 … 129` |
  | Trang 12 | `1 … 11 12 13 … 129` |
  | Trang 129 | `1 … 125 126 127 128 129` |

  Số ô cố định thì nav rộng cố định, chuyển trang không kéo select xê dịch. `…` là chữ `text-muted`, không bấm được.
- **Số ô chọn theo bề rộng khung, một lần cho cả bảng**, không chọn riêng từng trang. Desktop đủ chỗ là 7. Chỉ khi đo thấy tràn mới hạ **cả bộ** xuống 5 (`1 2 3 … 129`, `1 … 12 … 129`, `1 … 127 128 129`), rồi mới tới dạng `‹ 12 / 129 ›`. Khung còn trống mà hiện 5 ô là sai.
- **Mũi tên ở trang đầu/cuối thì `disabled`**, giữ chỗ, không ẩn, để nav không co giãn.
- **Chỉ vừa một trang: ẩn nav.** Chỉ còn số đếm ("7 thành viên"). Select "Mỗi trang" chỉ giữ khi tổng số lớn hơn lựa chọn nhỏ nhất, không thì ẩn luôn. Hai mũi tên khoá cộng một ô `1` là nhiễu.
- **Không có dòng nào: ẩn cả footer.** Empty state của bảng đã nói hết, đừng để "0 khách hàng" cùng bốn control chết bên dưới.
- Số dùng dấu chấm hàng nghìn (`1.284`) và `tabular-nums`. Chuỗi đếm theo `I16`: "51 tới 75 trong 312 đơn hàng".
