# Chip và IconButton

Nguồn: chip và nút icon của một dự án thật.

```tsx
// Chip: bộ lọc, tag chọn được. Luôn kèm aria-pressed={isActive}
"inline-flex max-w-48 cursor-pointer items-center rounded-full px-3 py-1 text-xs font-medium transition-colors"
isActive && "bg-primary text-primary-foreground"
!isActive && "bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground"

// IconButton: hành động phụ trong dòng hoặc header
"inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors"
"hover:bg-background hover:text-foreground"
"outline-hidden focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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

- **Chip chưa chọn là viên mờ `bg-foreground/5`, chữ `foreground/70`**; rê vào `foreground/10`, chọn rồi tô `bg-primary`. Lớp phủ theo màu chữ nên **mờ như nhau trên cả nền trang xám lẫn card trắng**, không phải chọn token theo nền. Đã thử và bỏ, cùng ngày 23/09/2026: (1) `bg-background` sẵn — trên card trắng thành bảy viên xám rõ, hàng lọc chưa ai dùng nặng thứ nhì màn; trên nền trang thì trùng màu nền nên rê vào không thấy gì; (2) bỏ hẳn nền, chỉ chữ `text-muted` — hàng chip đọc ra như **một hàng tab thứ hai** nằm ngay dưới hàng tab, và `--muted` trên `#f4f4f6` chỉ 3,5:1. Chip phải còn dáng viên thì mới khác tab. Không viền: mười chip mà chip nào cũng có viền thì đọc như hàng rào.
- Nền chip đang chọn là **`bg-primary text-primary-foreground`**, đúng token, không `bg-[#…]`, không `text-white`. Dùng token thì nền tối tự đảo (`--primary` thành gần trắng, chữ thành gần đen); gõ cứng thì sang nền tối thành chữ trắng trên nền trắng. Cũng đừng lấy nhầm `--primary-hover`: chip đang chọn trông nhạt hơn nút chính ngay cạnh.
- **Nhãn dài thì cắt, không để chip phình.** Chip `max-w-48`, chữ bọc trong `<span class="truncate">`, và `title` mang đủ tên để rê vào vẫn đọc được. Một chip "Hội chợ Triển lãm Quốc tế 2026" rộng gấp bốn chip "VIP" là cả hàng lệch, mắt dồn hết vào cái dài nhất.
- **Chip lọc là nút bật/tắt, phải có `aria-pressed={isActive}`.** Trạng thái chọn hiện chỉ bằng màu nền, trình đọc màn hình không thấy màu, nên thiếu `aria-pressed` thì chip nào cũng đọc ra "nút" như nhau. Chip chọn một (kiểu tab) thì dùng `role="radio"` + `aria-checked` trong `role="radiogroup"`, không dùng `aria-pressed`.
- Chip là `rounded-full`, nút là `rounded-xl` (cao dưới 40px thì `rounded-lg`, `F1`). Khác hình để mắt biết ngay cái nào chọn được nhiều cái nào là hành động.
- IconButton vuông `h-7 w-7`, chữ `text-muted` lúc thường, chỉ đen lên khi hover. Icon phụ không được đen bằng nội dung.
- Trạng thái disabled phải tắt luôn cả hover (`disabled:hover:bg-transparent`). Thiếu dòng đó thì nút chết vẫn sáng lên khi rê vào, người dùng bấm hoài không hiểu sao.
- `aria-label` và `title` luôn nhận cùng một chuỗi `label`. Nút chỉ có icon thì bắt buộc.

---

## Hàng chip ở màn hẹp

Hàng chip lọc **không bao giờ `flex-wrap`**. Bốn chip ở 375px sẽ thành ba cái
một hàng và một cái rớt xuống đứng một mình, đọc ra như lỗi chứ không như thiết
kế.

```html
<div class="scrollbar-clean -mx-1 flex items-center gap-2 overflow-x-auto px-1 py-0.5">
  <button type="button" aria-pressed="true" class="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">Tất cả</button>
  <button type="button" aria-pressed="false" class="shrink-0 rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70 hover:bg-foreground/10 hover:text-foreground">Quá hạn</button>
  <button type="button" aria-pressed="false" title="Hội chợ Triển lãm Quốc tế 2026" class="max-w-48 shrink-0 rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70 hover:bg-foreground/10 hover:text-foreground">
    <span class="block truncate">Hội chợ Triển lãm Quốc tế 2026</span>
  </button>
</div>
```

`shrink-0` để chip không bị bóp méo, `scrollbar-clean` để không lòi thanh cuộn ra.

Lề thì đặt trên **hàng bên trong**, đừng đặt trên khung cuộn: `<div class="-mx-1
overflow-x-auto"><div class="flex gap-2 px-1">`. Padding bên phải của khung cuộn
bị bỏ qua khi cuộn tới cuối, nên chip cuối sẽ dính sát mép.

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
| `underline` | Đường kẻ chạy hết hàng, **vạch 2px** dưới tab đang chọn | Chia nội dung trang chi tiết hoặc khối lớn: Tổng quan / Hoạt động / Tệp |
| `solid` | Tab đang chọn là **pill tô màu nhấn**, chữ đảo màu | Điều hướng mục con trong trang cài đặt: Chung / Thành viên / Quyền |
| `segmented` | **Rãnh chìm** nhạt, tab đang chọn là **ô trắng nổi** như phím bấm | 2–4 lựa chọn ngắn đổi cách xem: Ngày / Tuần / Tháng, Danh sách / Lưới |

- **Ngay dưới hàng tab còn một hàng chip lọc thì tab dùng `underline`, không `boxed`.** Chip là viên xám bo tròn; tab `boxed` đang chọn cũng là viên xám bo góc. Hai hàng viên xám chồng nhau thì tab đang chọn đọc ra như một cái chip nữa, không ai thấy đó là trạng thái đang xem (đã dính 23/09/2026, bảng khách hàng). Vạch dưới 2px là ngôn ngữ khác hẳn viên, hai hàng tách nhau ngay (`N5`).
- **Một trang chỉ một variant cho mỗi vai.** Tab trạng thái trên bảng đã `boxed` thì mọi bảng trong app đều `boxed`.
- **`solid` không dùng cho tab trạng thái trên bảng.** Pill tô đặc đứng đầu bảng thì kéo mắt mạnh hơn cả dữ liệu, và đọc ra như một nút bấm (đã dính 21/09/2026, bảng khách hàng). Nó hợp với menu cài đặt, nơi hàng tab CHÍNH LÀ điều hướng của trang.
- `segmented` quá 4 lựa chọn, hoặc nhãn dài hơn hai chữ, thì đổi sang `boxed` hoặc `underline`.

### Mặc định khi đề không nói: không icon, không số

Tab dựng ra khi người dùng không nhắc gì là **chữ trơn**, không icon, không số đếm.
Chỉ thêm khi:

- **Icon:** người dùng yêu cầu, hoặc dự án đã có hàng tab dùng icon (theo cái đã có).
- **Số đếm:** người dùng yêu cầu ("có số đếm từng tab"), hoặc dữ liệu thật trả về sẵn số. Không bịa số cho có.

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
- Tab chưa chọn chữ `foreground/70`. Hover dùng nền `foreground/5` (riêng `underline` thì chỉ đậm chữ, không nền, xem dưới); focus bàn phím là vòng mờ như mọi nút (`I13`), **không bao giờ là nền xám**. Không dùng `--background` làm nền hover: tab hay nằm thẳng trên nền trang xám, tô `--background` ở đó thì rê vào không thấy gì.
- Bàn phím theo WAI-ARIA: chỉ tab đang chọn nằm trong vòng Tab, mũi tên trái/phải chuyển và chọn luôn, Home/End về hai đầu.
- Số đếm là số trơn `text-muted`, không pill, không màu. Không có số thì bỏ, đừng dựng số giả.
- Hàng tab không bao giờ wrap, màn hẹp thì cuộn ngang trong khung `scrollbar-clean` (`R6`). Từ 6 tab trở lên thì gom phần dư vào tab "Thêm" mở dropdown (`R10`).

### `boxed`: tab trạng thái trên bảng

```ts
// Khung cuộn: -mx-1 py-0.5 để nền hover của tab đầu/cuối không bị cắt. Hàng: gap-1 px-1.
"h-9 rounded-lg border px-3"
isSelected && "border-transparent bg-secondary text-foreground"
!isSelected && "border-transparent text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
```

- **Mọi tab luôn có `border`**, tab chưa chọn là `border-transparent`. Không thì lúc bấm chuyển, tab đang chọn dày thêm 2px và cả hàng xô sang phải.
- **Tab đang chọn: nền `--secondary`, chữ `--foreground`, viền trong suốt.** Đây là bậc xám duy nhất chìm đủ rõ trên **cả** card trắng lẫn nền trang `#f4f4f6`.
- **Không dùng `bg-surface` (trắng) và cũng không dùng `bg-surface-hover`.** Hai bậc đó chỉ chênh nền trắng 1-3% thì liếc vào không thấy tab nào đang chọn (đã dính 21/09/2026 với `bg-surface`, và 23/09/2026 với `bg-surface-hover` — chủ dự án nhìn bảng khách hàng và nói "tab active khá mờ").
- **Ô đang chọn phải chênh với nền NẰM DƯỚI nó**, không phải chênh với mấy tab anh em. Cùng một class mà đổi chỗ đặt (card trắng ↔ nền trang xám) là đổi luôn độ rõ, nên chọn bậc xám nào cũng phải thử ở cả hai nền (`N2`).
- **Không đặt hàng `boxed` vào một khối xám riêng.** Nó nằm thẳng trên nền trang hoặc trên card. Bọc thêm khối xám là thành `segmented` hỏng: rãnh to, đậm, và ô trắng lọt thỏm.
- **`h-9 rounded-lg`**, cao dưới 40px nên bo 8px (`F1`), không ngoại lệ. Đã thử 12px và bỏ (21/09/2026): tab 36px bo 12px là quá tròn so với chiều cao. Đứng cạnh ô tìm `h-10` là lệch đúng một bậc, chấp nhận được.
- Bên phải cùng hàng: ô tìm, nút **Lọc** (mở popover cho các trường khác ngoài trạng thái), nút **Sắp xếp** nếu cần. Đều là nút viền `h-9` (`I1`).

### `underline`: chia nội dung trang chi tiết

```ts
// Hàng: đường kẻ chạy hết bề ngang, vạch của tab đang chọn đè lên nó.
"flex min-w-full gap-2 border-b border-border-strong px-2"
// Tab: vạch là ::after nên không đẩy chiều cao.
"relative h-10 rounded-xl px-2 after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:rounded-full"
isSelected && "text-foreground after:bg-foreground"
!isSelected && "text-foreground/70 after:bg-transparent hover:text-foreground"
```

- **Hàng tab nằm chung hàng với ô tìm và nút (toolbar trên bảng) thì bỏ đường kẻ hết hàng, chỉ giữ vạch 2px dưới tab đang chọn.** Đường kẻ chạy nửa hàng rồi cụt ở mép ô tìm trông dở dang, và vì khung cuộn lùi `-mx-2` nên đầu trái của nó còn thò ra ngoài mép card bên dưới 8px (đã dính 23/09/2026). Đường kẻ hết hàng chỉ dùng khi hàng tab đứng riêng một hàng, như trang chi tiết.
- **Focus bàn phím của tab `underline` là vòng quanh chữ, không quanh cả tab.** Vòng quanh cả tab `h-10` thì mép dưới vòng nằm sát vạch 2px, đọc thành hai đường gạch chồng nhau (đã dính 24/09/2026); vẽ ra ngoài tab thì khung cuộn cắt mất mép. Tab thêm `group outline-hidden`, chữ bọc trong `<span class="rounded-md px-1.5 py-0.5 group-focus-visible:ring-2 group-focus-visible:ring-foreground/50">`: span cao 24px giữa tab 40px, vòng cách vạch ~8px. Các variant có nền (`boxed`, `solid`, `segmented`) giữ vòng quanh cả tab theo `I13`.
- Vạch màu `--foreground`, không màu nhấn có sắc: nhấn đã có ở nút chính của trang (`M3`).
- Khung cuộn lùi `-mx-2` để chữ tab đầu thẳng cột với nội dung bên dưới.
- Tab đang chọn không tô nền, không đổi nền lúc hover. Vạch là tín hiệu duy nhất.
- **Không tab nào có nền, kể cả lúc focus.** Tab bàn phím tới thì vòng mờ `I13`. Tab là `Button variant="ghost"` mà `Button` dự án còn kiểu cũ "focus trông như hover" (nền xám) thì hàng tab dính theo: tab đang focus có nền xám, tab đang rê chuột đậm chữ, **hai tab cùng sáng** và không đọc ra tab nào đang chọn (đã dính 24/09/2026, panel khách hàng). Sửa ở `Button` dùng chung, không vá riêng từng tab.
- Hàng tab nằm được cả trên card trắng lẫn trên dải header xám: đường kẻ `--border-strong` đủ nhìn ở cả hai.

### `solid`: điều hướng mục cài đặt

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
- Pill `rounded-full text-xs`, chữ thường "Mới", không in hoa, không `text-[10px]` (đổi 22/09/2026): chữ hoa 10px thì dấu tiếng Việt dính nhau, và `rounded` 4px là bậc bo thứ năm (`F1`).

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
- Nền tối: bóng đen gần như vô hình (`M23`), nên ô nổi lên nhờ viền `--border-strong` và vệt sáng `inset` trên mép trên.
- Rãnh đặt trên nền trang xám (không nằm trong card) thì đổi rãnh sang `bg-foreground/5`, để rãnh vẫn chìm hơn nền quanh nó.

---

## Badge số đếm

Số việc chưa đọc, số mục trong nhóm, số thành viên. Xuất hiện ở sidebar, ở tab,
ở tiêu đề cột.

Mặc định là **pill trắng viền mảnh, chữ xám**. Muốn gọn hơn nữa thì bỏ khung,
chỉ để số trơn.

```html
<!-- Mặc định: pill trắng, viền mảnh, chữ xám. -->
<span class="ml-auto shrink-0 rounded-full border border-border-strong bg-surface px-2 py-0.5 text-xs font-medium tabular-nums text-muted">121</span>

<!-- Gọn hơn: số trơn, không khung, không nền. -->
<span class="ml-auto shrink-0 text-xs tabular-nums text-muted">4</span>
```

- **Một danh sách chỉ MỘT kiểu.** Cả sidebar dùng pill thì mọi số đều là pill, kể cả số `4`. Đừng chia kiểu theo ý nghĩa con số (chưa đọc thì pill, số đếm thường thì trơn): đặt cạnh nhau thì chỉ thấy hai hàng lệch style, không ai đọc ra được ý nghĩa (đã dính 21/09/2026).
- **Luôn căn phải**, cách nhãn bằng `ml-auto` hoặc `justify-between`.
- **Không tô màu brand, không nền đặc.** Badge brand chữ trắng trông nặng và làm màu nhấn loang khắp sidebar (đã thử và bỏ 21/09/2026). Số đếm là thông tin, không phải hành động (`M2`, `M4`). Dự án muốn badge màu thì để họ tự đổi, skill không tự đề xuất.
- **Nền pill là `--surface` (trắng)**, không phải `--secondary`. Pill trắng vẫn nổi rõ khi hàng đang hover hay đang chọn (nền `--background`), còn pill xám thì tan vào hàng.
- Chỉ tô màu khi con số là **cảnh báo thật**, kiểu số việc quá hạn: chữ hổ phách, vẫn không nền đặc.
- `tabular-nums` để các hàng thẳng cột nhau.
- Số lớn thì rút gọn: `99+`, đừng để `1.284` phá bề rộng sidebar.

---

## Phân trang

Nằm ở đáy khung bảng hoặc danh sách, cách thân bảng bằng `border-t`. Một hàng,
hai cụm: **số đếm bên trái, mọi control bên phải**.

```
1 tới 10 trong 1.284 đơn hàng          Mỗi trang [10 ▾]   ‹ 1 2 3 4 5 … 129 ›
```

```tsx
<div className="flex items-center justify-between gap-4 border-t px-4 py-3">
  <p className="text-sm tabular-nums text-muted">1 tới 10 trong 1.284 đơn hàng</p>
  <div className="flex shrink-0 items-center gap-4">
    {/* "Mỗi trang" + select h-9 */}
    <nav aria-label="Phân trang" className="flex items-center gap-1">{/* ‹ trang › */}</nav>
  </div>
</div>
```

```ts
// Nút số trang: vuông h-9, luôn có border để lúc chuyển trang không xô hàng
"inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium tabular-nums"
isCurrent && "border-transparent bg-secondary text-foreground"   // + aria-current="page"
!isCurrent && "border-transparent text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
// Mũi tên ‹ ›: IconButton h-9 w-9, có aria-label "Trang trước" / "Trang sau"
```

- **Không bao giờ wrap, không nhảy chỗ.** Nav luôn ở cụm phải, cùng hàng với số đếm, bất kể có bao nhiêu trang. Chật thì **bớt số trang trước**: bỏ `2 3 4 5`, chỉ còn `‹ 1 … 12 … 129 ›`. Màn hẹp dưới `sm` thì chỉ còn `‹ 12 / 129 ›`. Không đẩy nav xuống dòng hai (đã dính 22/09/2026: ví dụ nhiều trang thì nav rớt xuống căn trái, ví dụ ít trang lại nằm phải).
- **Trang đang chọn chép đúng class tab `boxed` đang chọn**: nền `--secondary`, viền trong suốt. **Không dùng nền trắng + viền**: đứng cạnh select `10 ▾` thì nó trông y như ô input, người dùng tưởng là ô gõ số trang để nhảy.
- **Select "Mỗi trang" nằm trong cụm phải, sát nav**, không đứng ngay sau số đếm. Số đếm dài ra theo trang ("1 tới 10" rồi "1.271 tới 1.280"), đặt select sau nó là select xê dịch mỗi lần chuyển trang.
- **Cửa sổ trang luôn đủ 7 ô** (tính cả `…`) khi tổng số trang lớn hơn 7. Ở gần hai đầu thì lấp thêm số cho đủ 7:

  | Đang xem | Hiện |
  | --- | --- |
  | Trang 1 | `1 2 3 4 5 … 129` |
  | Trang 12 | `1 … 11 12 13 … 129` |
  | Trang 129 | `1 … 125 126 127 128 129` |

  Số ô cố định thì nav rộng cố định, chuyển trang không kéo select xê dịch. `…` là chữ `text-muted`, không bấm được.
- **Số ô chọn theo bề rộng khung, một lần cho cả bảng**, không chọn riêng từng trang. Desktop đủ chỗ là 7. Chỉ khi đo thấy tràn mới hạ **cả bộ** xuống 5 (`1 2 3 … 129`, `1 … 12 … 129`, `1 … 127 128 129`), rồi mới tới dạng `‹ 12 / 129 ›`. Khung còn trống mà hiện 5 ô là sai (đã dính 22/09/2026).
- **Mũi tên ở trang đầu/cuối thì `disabled`**, giữ chỗ, không ẩn, để nav không co giãn.
- **Chỉ vừa một trang: ẩn nav.** Chỉ còn số đếm ("7 thành viên"). Select "Mỗi trang" chỉ giữ khi tổng số lớn hơn lựa chọn nhỏ nhất, không thì ẩn luôn. Hai mũi tên khoá cộng một ô `1` là nhiễu.
- **Không có dòng nào: ẩn cả footer.** Empty state của bảng đã nói hết, đừng để "0 khách hàng" cùng bốn control chết bên dưới.
- Số dùng dấu chấm hàng nghìn (`1.284`) và `tabular-nums`. Chuỗi đếm theo `I16`: "51 tới 75 trong 312 đơn hàng".
