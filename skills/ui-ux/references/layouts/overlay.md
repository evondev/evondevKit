# Bố cục khối nổi

Modal, panel trượt, dropdown, toast. Không có wireframe thì dựng đúng khuôn
dưới đây, báo một dòng lúc giao. Xem câu 4 trong `../../SKILL.md`.

---

## Hộp xác nhận

```
┌──────────────────────────────────┐
│ (🗑)  Xoá dự án?                 │   <- icon cùng hàng tiêu đề
│       **Website bán hàng 2026**  │   <- tên đối tượng nổi lên
│       cùng 48 công việc sẽ bị    │
│       xoá vĩnh viễn.             │
│                                  │
│               [Huỷ] [Xoá dự án]  │
└──────────────────────────────────┘
```

```html
<div role="alertdialog" aria-labelledby="confirm-title" aria-describedby="confirm-desc" class="w-full max-w-md rounded-2xl bg-surface p-6 shadow-xl">
  <div class="flex gap-4">
    <!-- -mt-1.5: tâm icon 40px thẳng tâm dòng tiêu đề text-lg (28px) -->
    <div class="-mt-1.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-rose-500/10">
      <i data-lucide="trash-2" class="size-5 text-rose-700"></i>
    </div>
    <div class="min-w-0">
      <h2 id="confirm-title" class="text-lg font-semibold">Xoá dự án?</h2>
      <p id="confirm-desc" class="mt-1 text-sm text-muted">
        <span class="font-medium text-foreground">Website bán hàng 2026</span>
        cùng 48 công việc bên trong sẽ bị xoá vĩnh viễn, không khôi phục được.
      </p>
    </div>
  </div>
  <div class="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
    <!-- Huỷ: nút phụ nền --secondary. Xoá: nền rose mờ theo I4. Cả hai chỉ có chữ. -->
  </div>
</div>
```

- Rộng `max-w-md`, căn giữa màn, nền phủ đen mờ phía sau.
- Tiêu đề là **câu hỏi**, thân là hậu quả cụ thể có tên đối tượng.
- **Tên đối tượng `font-medium text-foreground`**, phần còn lại của câu `text-muted`. Đó là thứ người dùng cần liếc thấy để biết đang xoá đúng cái. Để cả câu cùng màu xám thì tên chìm vào câu (đã dính 22/09/2026). Tên dài thì cho xuống dòng, **không `truncate`**: xác nhận mà không đọc được hết tên thì không xác nhận được gì.
- **Icon tròn `size-10` nằm cùng hàng với tiêu đề**, bên trái, `-mt-1.5` để tâm icon thẳng tâm dòng tiêu đề. Đặt icon thành một hàng riêng phía trên thì hộp cao thêm ~60px mà không thêm thông tin.
- **Tiêu đề `text-lg font-semibold`, luôn đậm hơn tên đối tượng** (`font-medium`). Tiêu đề thiếu `font-semibold` thì tên dài hai dòng lấn át câu hỏi, mắt đọc tên trước (đã dính 22/09/2026).
- **Nút trong hộp xác nhận chỉ có chữ, không icon.** Đây là ngoại lệ có tên của `I1`: icon thùng rác đã đứng ở đầu hộp, gắn thêm vào nút là hai tín hiệu cho một ý (`M6`). Chữ trên nút lặp lại động từ và đối tượng: "Xoá dự án", không chỉ "Xoá" hay "Đồng ý".
- Nút phá huỷ nằm bên phải cùng và là nút duy nhất mang màu cảnh báo. Huỷ là nút phụ nền `--secondary`, và là nơi tiêu điểm rơi vào khi mở, để Enter không xoá nhầm.
- Màn hẹp dưới `sm`: hai nút xếp dọc, rộng hết, nút xoá ở trên (`flex-col-reverse`).
- Không dùng modal cho thứ chỉ để thông báo. Cái đó là toast.
- Duyệt thì dựng hộp ở trạng thái mở sẵn, không cần danh sách bấm được hay bộ đếm "đã xoá mấy dự án".

## Modal có nội dung

```
┌─────────────────────────────┐
│ Tiêu đề                 [×] │  <- header cố định
├─────────────────────────────┤
│ nội dung cuộn được          │
│                             │
├─────────────────────────────┤
│              [Huỷ] [LƯU]    │  <- footer cố định
└─────────────────────────────┘
```

Header và footer đứng yên, chỉ thân cuộn. Modal cao quá 80% màn thì đổi sang
panel trượt hoặc trang riêng.

**Modal có form** (mời thành viên, đổi tên, thêm nhanh):

- **Đường chia header/footer chỉ có khi thân thật sự cuộn.** Form hai ba ô không cuộn thì bỏ cả hai đường, dùng khoảng trắng (`gap-6`). Ba khối chia kẻ cho một form ngắn là nặng hơn nội dung.
- **Mô tả dưới tiêu đề chạy tới sát cột nút ✕**: chỉ header chừa `pr-10` cho nút đóng, đừng đặt `max-w` hẹp cho câu mô tả. Thêm `text-pretty` để không rớt một chữ xuống dòng cuối (đã dính 22/09/2026: "…để tham gia / nhóm.").
- Có ô nhập nên **bấm ra ngoài không đóng** (`I20`); đóng bằng ✕, Huỷ, Esc. Mở ra thì tiêu điểm vào ô đầu tiên.
- Nút chính ở footer là `primary` (một hành động duy nhất của modal, `I2`), **chỉ có chữ** theo `I1`: "Gửi lời mời", không icon. Nút Huỷ `secondary`. Cả hai `h-11 md:h-10`, cao bằng ô nhập.
- **Trạng thái đang gửi**: nút chỉ chữ thì **spinner đè lên giữa nút, chữ `invisible`** (vẫn chiếm chỗ), nút `disabled` + `aria-busy`. Chèn spinner cạnh chữ là nút rộng ra, đẩy Huỷ sang trái (đã dính 22/09/2026). Xem `../components/button.md`.
- Câu lỗi dưới ô nói **cách sửa**, theo bảng "Ô trống thì viết gì" trong `form.md` (một nguồn): "Email phải có dấu @".

## Panel trượt

Trượt từ phải, `w-full sm:w-[28rem]` (dưới `sm` phủ hết bề ngang, 448px rộng hơn điện thoại 375px), dùng khi nội dung dài hoặc người dùng
cần nhìn thấy danh sách phía sau. Không dùng panel cho một câu xác nhận.

- **Lớp phủ sau panel mờ: `bg-black/15`.** Panel tồn tại để người dùng **vẫn thấy danh sách phía sau**; lớp phủ đặc che kín danh sách là mất đúng lý do dùng panel (đã dính 23/09/2026: lớp phủ xám đục, nền trang biến thành một mảng xám chết). Modal thì `bg-black/30`, vì modal cần tách hẳn người dùng khỏi trang.
- **Ba tầng: header, thân cuộn, footer.** Header `px-6 pt-5 pb-4 border-b` gồm tiêu đề, dòng trạng thái + thời gian, nút ⋯ và ✕ cùng hàng tiêu đề. Thân `flex-1 overflow-y-auto px-6 py-6`: **luôn có `pt` riêng**, không để tiêu đề mục đầu dính sát đường kẻ header. Footer `border-t px-6 py-4`, nút căn phải, luôn đứng đáy dù thân ngắn.
- Nhãn và giá trị trong panel theo `components/description-list.md`, cột nhãn `7rem`.
- **Nút ở footer giữ kiểu theo vai, không theo số lượng.** Đơn đã huỷ mất nút chính, footer chỉ còn "In hoá đơn": nó **vẫn `secondary`** như lúc đứng cạnh nút chính. Không đẩy lên `primary` (đơn đã huỷ không còn hành động chính, tô đen là giả làm việc quan trọng) và không đổi sang `outline` (cùng một nút mà mỗi đơn một kiểu, `N5`). Nút footer chỉ có chữ (`I1`).
- Chuyển động theo mục "Chuyển động" cuối file: panel trượt từ mép phải vào.

## Dropdown

Bám mép trái của nút mở, rộng tối thiểu bằng nút. Mục nguy hiểm tách xuống cuối,
cách bằng một đường kẻ — hover của nó theo `I4`, đường kẻ tràn hết bề ngang theo
`F25`. Không quá 8 mục, hơn thì thêm ô tìm.

**Mỗi mục là một phần tử bấm được rộng hết hàng** (`I29`): `flex w-full` đặt trên
chính `<button>` hay `<a>`, không đặt trên phần tử bọc ngoài. Dùng shadcn thì
mục có link phải là `<DropdownMenuItem asChild>`.

**Gần mép thì lật, không tràn ra ngoài.** Menu mở từ dòng cuối bảng mà vẫn đổ xuống thì
nó trùm qua hàng phân trang và lòi khỏi card (đã dính 23/09/2026). Không đủ chỗ bên dưới
thì lật lên trên nút, sát mép phải thì canh phải. Dùng thư viện popover có sẵn của dự án
thì bật `collisionPadding`, tự dựng thì đo `getBoundingClientRect` trước khi mở.

**Bo góc và khoảng cách, theo `M19`:**

```html
<div class="min-w-56 rounded-2xl border border-border bg-surface p-1 shadow-lg">
  <button class="flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 text-sm outline-hidden hover:bg-background focus-visible:bg-background">…</button>
  <hr class="-mx-1 my-1 border-border" />   <!-- -mx-1 khớp p-1 của khung, F25 -->
  <!-- Mục nguy hiểm: lúc thường y như mục khác, rê vào mới đỏ (I4) -->
  <button class="group flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 text-sm text-foreground outline-hidden hover:bg-rose-500/10 hover:text-rose-700 focus-visible:bg-rose-500/10 focus-visible:text-rose-700 dark:hover:text-rose-400 dark:focus-visible:text-rose-400">
    <i data-lucide="trash-2" class="size-4 shrink-0 text-muted group-hover:text-rose-700 group-focus-visible:text-rose-700 dark:group-hover:text-rose-400 dark:group-focus-visible:text-rose-400"></i>
    Xoá
  </button>
</div>
```

Mục xoá: chữ **`rose-700`**, không `rose-500` (3.2:1 trên nền `rose-500/10`,
trượt 4.5:1). Lúc chưa rê thì chữ `--foreground`, icon `text-muted` như mọi mục,
đỏ sẵn là sai `I4`.

| Thứ | Giá trị | Vì sao |
| --- | --- | --- |
| Khung | `rounded-2xl` 16px | |
| Padding khung | `p-1` 4px | Khe hở giữa nền hover và mép khung |
| Mục | `h-10` 40px | Cùng chiều cao link sidebar, nút, ô nhập. Mục 36px trông chật |
| Nền hover của mục | `rounded-xl` 12px | **16 = 12 + 4**, hai góc đồng tâm. Mục cao 40px nên bo 12px (`F1`) |

Dùng shadcn / Radix thì thay cả `hover:` lẫn `focus-visible:` bằng
`data-[highlighted]:bg-background`, để chuột và phím mũi tên dùng chung **một**
mục sáng (`I13`).

Nền hover **thụt vào** cách mép khung, không tràn sát mép. Cái khe đó cùng với
góc đồng tâm là thứ làm menu trông mềm. **Bo mục và padding khung đi thành cặp**:
mục `rounded-xl` thì khung `p-1`; giữ `p-2` cũ mà nâng mục lên `rounded-xl` là
sai công thức, khe hở ở góc rộng ra trong khi ở cạnh vẫn 8px, góc trông phình.

Menu gọn, mục cao dưới 40px (`py-1.5`, `text-xs`) thì hạ về cặp cũ: mục
`rounded-lg`, khung `p-2`.

## Phím tắt trong menu

Mục nào có phím tắt thì hiện ở **mép phải**, `text-xs text-muted`, đừng để trong
ngoặc giữa dòng.

```html
<button class="flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm hover:bg-background">
  <i data-lucide="user" class="h-4 w-4 shrink-0 text-muted"></i>
  <span class="min-w-0 flex-1 truncate text-left">Hồ sơ của bạn</span>
  <span class="shrink-0 text-xs text-muted">⌘1</span>
</button>
```

Ký hiệu viết thẳng bằng ký tự (`⌘`, `⇧`, `⌥`), không bọc `<kbd>` có viền. Viền
quanh từng phím làm menu trông rối, và đây đúng chỗ M3d nói cần lắm mới dùng.

Chỉ hiện phím tắt cho mục **thật sự có phím tắt**. Bịa ra cho đẹp thì người dùng
bấm không ăn, mất lòng tin ngay.

## Toast

Góc trên phải hoặc đáy giữa, chọn một chỗ rồi dùng suốt.

**Vùng đọc cho trình đọc màn hình là cái khung chứa toast, có sẵn từ lúc tải trang**
(`<section aria-live="polite">`, như Sonner), không phải từng toast. Gắn `role="status"`
lên chính toast vừa chèn vào thì nhiều trình đọc màn hình không đọc. Dự án có Sonner
hay toast của shadcn thì dùng nó, nó lo sẵn.

**Màn hẹp dưới `sm` thì toast lên đỉnh màn, giữa.** Đáy màn là chỗ của nút chính của
form; toast bật ra ở đáy đúng lúc vừa bấm nút là che mất nửa nút đó trong 4 giây (đã dính
23/09/2026, form tạo công việc ở 375px).

```
[✓] Đã sao chép liên kết                                  <- xong việc: một dòng, co theo chữ

[✓] Đã xoá đơn #2041                    [Hoàn tác]        <- có hành động

[!] Không lưu được thay đổi             [Thử lại]  [✕]    <- lỗi: hai tầng
    Mất kết nối mạng
```

```html
<div role="status" class="flex w-auto min-w-72 max-w-md items-center gap-3 rounded-2xl border border-border bg-surface py-3 pl-4 pr-3 shadow-lg">
  <i data-lucide="circle-check" class="size-5 shrink-0 text-emerald-600"></i>
  <p class="min-w-0 flex-1 text-sm">Đã xoá đơn #2041</p>
  <div class="flex shrink-0 items-center gap-1">
    <!-- Hành động: nút thật, không phải chữ đậm trơn -->
    <button type="button" class="h-8 cursor-pointer rounded-lg px-3 text-sm font-medium hover:bg-background outline-hidden focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">Hoàn tác</button>
  </div>
</div>
```

- **Rộng theo nội dung**: `w-auto min-w-72 max-w-md`. Không đặt bề rộng cố định, toast ngắn sẽ trống nửa khung bên phải.
- **Thứ tự cố định `[icon] [chữ] [hành động] [✕]`**, cụm hành động và ✕ luôn dồn sát mép phải. Không toast nào để nút lùi vào giữa.
- **Hành động là nút `h-8`** kiểu ghost, có hover và focus như `I13`. Chữ đậm trơn thì không đọc ra là bấm được (tinh thần `I7`). Tối đa một hành động.
- **Chữ dài quá một dòng thì tách hai tầng**, không để một câu vỡ thành ba dòng: tầng trên `text-sm font-medium` nói chuyện gì xảy ra, tầng dưới `text-sm text-muted` nói vì sao. Cụm nút căn giữa theo chiều dọc của cả khối.
- **Chữ không lặp lại nút** (`M6`): đã có nút Thử lại thì câu không ghi "rồi thử lại".
- Viết như câu thường: không viết hoa danh từ giữa câu ("đơn #2041", không "Đơn #2041"), không dấu chấm cuối toast một dòng. Cả bộ một kiểu.
- Icon `size-5` màu theo nghĩa (`rules-color.md`): xong `emerald-600`, lỗi `red-600`. Nền toast vẫn `--surface`, không tô nền màu.
- Toast báo xong việc: **không nút đóng** (vì nó tự tắt). Toast có Hoàn tác cũng không nút đóng.
- Toast báo hỏng: **có nút Thử lại và nút đóng** (vì nó không tự tắt), `role="alert"` thay cho `role="status"`.
- Nhiều toast cùng lúc thì xếp chồng cột, `gap-2`, cái mới nhất gần mép màn nhất. Tối đa 3 cái.
- Gợi ý thời gian (người dùng quyết): tự tắt sau khoảng 4 giây, có Hoàn tác thì lâu hơn và dừng đếm khi rê chuột vào. Hoàn tác, Thử lại gọi gì là handler rỗng (`onUndo`, `onRetry`).
- Duyệt toast thì bày **từng loại một bản tĩnh** cạnh nhau, không dựng nút bấm giả lỗi (phạm vi ở `../../SKILL.md`).

---

## Chuyển động

Mọi khối nổi **có chuyển động vào và ra**, không bật "phựt" ra. Chuyển động phải nói
được **nó đến từ đâu**: dropdown mọc ra từ nút, panel trượt vào từ mép, toast trồi lên
từ mép màn. Một nguồn cho cả app: modal, dropdown, select, date picker, panel, toast đều
lấy số ở bảng này.

| Khối | Vào | Ra |
| --- | --- | --- |
| **Modal, hộp xác nhận** | `opacity 0→1` + `scale-95→100`, gốc ở tâm, **150ms `ease-out`** | ngược lại, **100ms `ease-in`** |
| **Lớp phủ** (sau modal, panel) | `opacity 0→1`, **cùng thời gian và đường cong với khối nó đi kèm** (sau modal 150ms, sau panel 500ms) | cùng thời gian với khối lúc ra |
| **Panel trượt** | **chỉ** `translate-x-full → 0`, không `scale`, không `opacity` trên panel. **500ms** `cubic-bezier(0.32,0.72,0,1)` (đường cong sheet của iOS, `vaul`) | `0 → translate-x-full`, **350ms** cùng đường cong |
| **Dropdown, popover, select, date picker** | `opacity` + `scale-95→100` + **dịch 4px từ phía nút**: mở xuống thì từ trên xuống (`-translate-y-1 → 0`), lật lên thì từ dưới lên (`translate-y-1 → 0`). Gốc biến hình ở mép gần nút. 150ms `ease-out` | `opacity` + `scale-95`, 100ms `ease-in`, không dịch |
| **Toast** | trồi từ mép gần nhất: toast ở đáy thì `translate-y-2 → 0` (dưới lên), toast ở đỉnh (màn hẹp) thì `-translate-y-2 → 0`; kèm `opacity`. 200ms `ease-out` | `opacity` + trượt tiếp 8px theo hướng ra, 150ms |
| **Tooltip** | chỉ `opacity`, trễ 300–500ms mới hiện, 100ms | 100ms |
| **Sidebar thu gọn, nhóm mở đóng** | theo `app.md`: `transition-[width]` và `grid-rows`, 200ms | như vào |

- **Ra nhanh hơn vào.** Vào `ease-out` (nhanh đầu, chậm cuối, như đồ vật đặt xuống), ra `ease-in` và ngắn hơn: người đã bấm đóng thì không muốn chờ.
- **Bẫy đã dính khi dựng panel (23/09/2026)** — panel "chạy từ trong ra, cách lề một khoảng rồi giật mạnh vào lề", tooltip nhấp nháy, cả chuyển động giật cục:
  - **Panel dính `zoom-in-95` chép từ modal.** Phóng 95% quanh tâm thì mép phải panel bắt đầu cách lề màn ~11px, chạy xong mới nhảy vào lề. Panel chỉ `translate`, **không bao giờ `scale`**: nó đến từ mép, không mọc từ tâm.
  - **Radix (Dialog, Sheet) chỉ chờ `@keyframes`, không chờ `transition`.** Presence của Radix đọc `animation-name` để biết khi nào gỡ phần tử; viết bằng `transition` thì lúc mở phần tử gắn vào đã ở vị trí cuối (không chạy), lúc đóng bị gỡ ngay (giật mất). Với Radix dùng `data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right` (`tw-animate-css`, mặc định dịch 100%). Không Radix thì dùng `transition-transform` nhưng giữ phần tử trong DOM suốt lúc đóng.
  - **Hai cơ chế chạy cùng lúc**: `transition-all` trên panel cộng thêm keyframe của `animate-in` là hai chuyển động giành nhau, ra cảnh giật. Chọn một.
  - **Tiêu điểm nhảy vào nút icon có tooltip** ngay lúc mở: Radix tự focus phần tử bấm được đầu tiên (nút ⋯), tooltip của Radix mở ngay khi focus, không chờ trễ, nên nó nhấp nháy và chạy theo panel. Mở panel thì **đưa tiêu điểm vào chính khung panel hoặc tiêu đề** (`tabIndex={-1}`, `onOpenAutoFocus={(e) => { e.preventDefault(); panelRef.current?.focus() }}`); có ô nhập thì vào ô nhập đầu tiên. Không bao giờ vào nút icon.
  - **`backdrop-blur` trên lớp phủ** bắt trình duyệt làm mờ cả trang mỗi khung hình, chuyển động rớt khung. Lớp phủ chỉ là màu đen trong suốt.
  - **Animate `right`, `left`, `width` của panel** thay vì `transform` là tính lại bố cục mỗi khung hình. Chỉ `translate`; thêm `will-change-transform` nếu vẫn rớt khung.
- **Không nảy, không lố.** Không `spring` vượt đích, không `scale` dưới 95%, dropdown không dịch quá 8px. Đồ vật trong app làm việc thì đặt xuống, không nhảy ra.
- **Chỉ `transform` và `opacity`.** Không animate `height`, `top`, `left`, `width` (trừ sidebar thu gọn, đã có lý do riêng ở `app.md`): làm trang giật và tính lại bố cục mỗi khung hình.
- **Gốc biến hình đúng mép**: dropdown mở từ nút bên phải thì `origin-top-right`. Dùng Radix thì lấy sẵn `origin-(--radix-dropdown-menu-content-transform-origin)` (popover, select có biến tương tự), nó tự đổi khi menu lật.
- **Cách viết**: có Radix/shadcn thì dùng `data-[state=open]:animate-in data-[state=closed]:animate-out fade-in-0 zoom-in-95 slide-in-from-top-1` của `tw-animate-css` (Tailwind v4; v3 là `tailwindcss-animate`). Tự dựng thì `transition` + thuộc tính `data-state`, lúc vào dùng `@starting-style`, lúc ra giữ phần tử trong DOM tới khi chạy xong (`transition-behavior: allow-discrete` hoặc chờ `transitionend`).
- **`motion-reduce:`** tắt `scale` và `translate`, chỉ giữ `opacity` (hoặc tắt hẳn): người bật giảm chuyển động bị chóng mặt vì chuyển động chứ không vì mờ dần.
- Không chuyển động khi **tải trang**: không cho cả trang hay từng card mờ dần vào.

- **Panel 500/350ms là số chủ dự án chốt** (23/09/2026) sau khi xem video ba bản: 300/200ms thì vụt qua như giật, `linear` 500ms thì cứng và chậm. Đường cong này chạy nhanh ở đầu rồi đậu êm, nên 500ms không thấy chậm. Đừng rút ngắn cho "nhanh hơn".
- **Sửa chuyển động thì duyệt bằng video, không bằng số đo**: quay tốc độ thật và bản chậm 4 lần (DevTools, Animations, 25%). Giật, lố, nhảy lề chỉ lộ ra trong bản chậm.

Đã thêm 23/09/2026 theo yêu cầu chủ dự án: trước đó các khối nổi bật ra không chuyển động.

