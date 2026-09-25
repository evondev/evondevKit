# Bố cục khối nổi

Modal, panel trượt, dropdown, command palette, panel thông báo, toast. Không có wireframe thì dựng đúng khuôn
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
- **Tên đối tượng `font-medium text-foreground`**, phần còn lại của câu `text-muted`. Đó là thứ người dùng cần liếc thấy để biết đang xoá đúng cái. Để cả câu cùng màu xám thì tên chìm vào câu (đã dính 22/09/2026). Tên dài thì cho xuống dòng, **không `truncate`**: xác nhận mà không đọc được hết tên thì không xác nhận được gì. Tên đối tượng là email (xoá tài khoản, gỡ thành viên) thì xuống dòng ở sau `@`, không vỡ giữa tên miền (`EmailText` ở `../components/description-list.md`).
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

**Modal xem bản ghi có nút trước / sau** (chi tiết đơn hàng, hoá đơn, phiếu nhập):

```
┌──────────────────────────────────────────┐
│ Đơn #10248 [⧉]              ‹  ›  │  ✕   │  <- header trắng, đứng yên
│ (● Chờ xử lý)  Đặt lúc 14:32 · 22/09/2026 │
├──────────────────────────────────────────┤
│ ┌ Sản phẩm ─────────────────────────────┐ │  <- thân bg-background, card trắng
│ │ Áo sơ mi linen tay dài     900.000 đ  │ │
│ │ Màu be · Size M        2 × 450.000 đ  │ │
│ └───────────────────────────────────────┘ │
│ ┌ Thanh toán ───────────────────────────┐ │
│ │ Tạm tính · 3 sản phẩm    2.500.000 đ  │ │
│ │ Tổng cộng                2.450.000 đ  │ │
│ └───────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

- **Neo đỉnh, không căn giữa dọc**: khung ngoài `items-start`, modal cách đỉnh một khoảng cố định (`mt-16 sm:mt-[8vh]`). Mỗi bản ghi cao một khác (một sản phẩm, hay bốn sản phẩm tên dài ba dòng); căn giữa thì mỗi lần bấm Đơn sau cả header trượt lên xuống, nút ‹ › chạy khỏi con trỏ, bấm liền hai lần là trúng nền (`N1`). Bản dựng 24/09/2026 neo đỉnh, đổi đơn thì header đứng yên dù modal cao 600px hay 820px.
- **Chiều cao theo dữ liệu nên luôn có trần**: `max-h-[calc(100dvh-8vh-1rem)]`, header đứng yên, chỉ thân cuộn. Câu "cao quá 80% màn thì đổi sang panel" ở trên là lúc chọn khuôn; một đơn có 20 sản phẩm thì thân cuộn, không đổi khuôn giữa chừng.
- **Header hai dòng**: dòng một là tiêu đề `text-lg font-semibold` "Đơn #10248", **chỉ phần mã `font-mono`** (`T17`), chữ "Đơn" giữ font thường; nút `copy` là icon button ngay sau mã. Cụm phải `‹ › │ ✕`: ‹ › là icon button ghost có tooltip "Đơn trước", "Đơn sau"; vạch đứng `h-5 w-px bg-border` tách ✕ ra vì đóng khác loại với đi tiếp. Dòng hai là badge trạng thái đơn và mốc đặt đủ năm (mốc đứng riêng, `T16b`).
- **Tới đầu hoặc cuối danh sách thì nút đó `disabled`**, mờ nhưng vẫn chiếm chỗ, không ẩn (`N1`: ẩn thì › trượt sang chỗ của ‹). Tiêu điểm đang nằm trên nút vừa thành `disabled` thì **chuyển sang nút còn lại**, không để rơi về `body`; người dùng bàn phím vẫn đứng trong cụm điều hướng.
- **Thân `bg-background p-6`, mỗi khối một card trắng** (`card.md`), cách nhau `gap-4`. Header trắng, thân xám là đủ tách, không kẻ thêm đường dưới header. Card chỉ có tiêu đề thì **không `min-h-10`** (xem `card.md`).
- **Hàng sản phẩm**: trái là tên `font-medium` và phân loại `text-sm text-muted` ("Màu be · Size M"); phải là thành tiền `font-medium tabular-nums` và "2 × 450.000 đ" `text-sm text-muted`. Tên dài xuống dòng, không `truncate` (`N8`); cột tiền `shrink-0 text-right` bám đỉnh hàng. Không có phân loại thì bỏ hẳn dòng phụ, không ghi `—`. Đường kẻ giữa các hàng theo `F25`.
- **Khối thanh toán là biên lai**: nhãn trái, số tiền **bám mép phải** (`justify-between`), không dùng cột nhãn `7rem` của `description-list.md`: tiền phải thẳng một mép phải để cộng trừ bằng mắt. "Tạm tính · 24 sản phẩm" đếm theo **số lượng**, không theo số dòng. Giảm giá ghi kèm mã `font-mono` và số âm. Tổng cộng có đường kẻ trên, `text-lg font-semibold`, là con số nặng nhất khối. Phương thức và trạng thái thanh toán (badge) nằm sau một đường kẻ nữa; hàng có badge thì `items-baseline` để nhãn thẳng dòng chữ trong badge.
- **Số liệu giữa các khối phải khớp** (`S6`): tạm tính bằng tổng thành tiền, tổng cộng bằng tạm tính cộng phí trừ giảm giá, trạng thái thanh toán hợp với trạng thái đơn (đơn huỷ đã trả thì "Đã hoàn tiền", thanh toán khi nhận hàng đang giao thì "Chưa thanh toán").
- Mở modal thì tiêu điểm vào khung hoặc tiêu đề, **không vào nút ‹ đầu tiên** (tooltip bật ngay lúc mở, xem bẫy ở mục "Chuyển động").
- Đề không nói tới thao tác trên đơn (xác nhận, huỷ, in) thì không dựng footer; báo một dòng lúc giao. Có thì footer theo khuôn footer của panel trượt: nút giữ kiểu theo vai, không theo số lượng.

## Panel trượt

Trượt từ phải, `w-full sm:w-[28rem]` (dưới `sm` phủ hết bề ngang, 448px rộng hơn điện thoại 375px), dùng khi nội dung dài hoặc người dùng
cần nhìn thấy danh sách phía sau. Không dùng panel cho một câu xác nhận.

- **Lớp phủ sau panel mờ: `bg-black/15`.** Panel tồn tại để người dùng **vẫn thấy danh sách phía sau**; lớp phủ đặc che kín danh sách là mất đúng lý do dùng panel (đã dính 23/09/2026: lớp phủ xám đục, nền trang biến thành một mảng xám chết). Modal thì `bg-black/30`, vì modal cần tách hẳn người dùng khỏi trang.
- **Ba tầng: header, thân cuộn, footer.** Header `px-6 pt-5 pb-4 border-b` gồm tiêu đề, dòng trạng thái + thời gian, nút ⋯ và ✕ cùng hàng tiêu đề. Thân `flex-1 overflow-y-auto px-6 py-6`: **luôn có `pt` riêng**, không để tiêu đề mục đầu dính sát đường kẻ header. Footer `border-t px-6 py-4`, nút căn phải, luôn đứng đáy dù thân ngắn.
- Nhãn và giá trị trong panel theo `components/description-list.md`, cột nhãn `7rem`.
- **Nút ở footer giữ kiểu theo vai, không theo số lượng.** Đơn đã huỷ mất nút chính, footer chỉ còn "In hoá đơn": nó **vẫn `secondary`** như lúc đứng cạnh nút chính. Không đẩy lên `primary` (đơn đã huỷ không còn hành động chính, tô đen là giả làm việc quan trọng) và không đổi sang `outline` (cùng một nút mà mỗi đơn một kiểu, `N5`). Nút footer chỉ có chữ (`I1`).
- Chuyển động theo mục "Chuyển động" cuối file: panel trượt từ mép phải vào.

**Panel xem bản ghi có tab** (khách hàng, dự án, ticket: tên, trạng thái, nút thao tác nhanh, hàng tab):

- **Phần cố định chỉ là hàng tên**: avatar, tên, nút ⋯ và ✕. Trạng thái, dòng phụ (công ty), hàng nút thao tác nhanh nằm đầu thân cuộn và **cuộn đi**; hàng tab `sticky top-0 z-10 bg-surface` trong thân cuộn, đường kẻ dưới tab tràn hai mép panel (`-mx-6 px-6`). Giữ cố định cả khối thì với tên hai dòng và tên công ty dài, phần đứng yên cao ~240px: laptop 800px mất gần một phần ba, điện thoại mất gần nửa, vùng đọc tab Tin nhắn còn một mẩu (đã dính 24/09/2026). Cuộn xuống thì còn lại tên + ✕ + tab, đủ biết đang xem ai và đang ở tab nào.
- **Tên là chữ nặng nhất panel** (`text-lg font-semibold`). Số liệu, tiêu đề mục, không thứ gì trong thân to hơn tên. Ô số liệu trong panel theo mục "Trong panel trượt hay cột hẹp" ở `../components/charts.md`: một khung 2×2, số `text-lg`, không phải bốn card rời số `text-3xl` (đã dính 24/09/2026: bốn card số to nhất panel, tên khách đứng hàng hai).
- **Đổi tab thì hàng tab đứng yên dưới con trỏ** (`N1`): đang dính đỉnh thì cuộn về ngay dưới hàng tab, không về 0; chưa dính thì giữ nguyên chỗ cuộn. Về 0 lúc đang dính là hàng tab tụt xuống dưới khối trạng thái, trượt khỏi chỗ vừa bấm. Muốn vậy thì nội dung tab `min-h` bằng vùng cuộn trừ hàng tab, để tab ngắn (tin nhắn trống) không kéo hàng tab xuống. Trang phía sau đứng yên. Mũi tên trái/phải chuyển tab (`../components/small-controls.md`). (Sửa 24/09/2026: bản trước ghi "cuộn về đầu", bản dựng làm khác và đúng hơn.)
- Danh sách trong tab (tin nhắn, tệp, hoạt động) ghi giờ theo `T16b`: năm hiện tại thì bỏ năm.

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

**Tự dựng: có đủ bề rộng rồi mới đo chiều cao, và menu đổi cỡ thì đo lại.** Menu
mở lên (`top = đỉnh nút − chiều cao menu`) mà rộng theo nút đọc từ state thì lần mở
đầu state còn `width: 0`. Menu rộng 0 nên chữ xuống dòng từng từ, cao hàng trăm px,
`top` âm bị kẹp về mép trên màn. Render lại thì bề rộng đúng nhưng `top` không tính lại:
menu tài khoản chân sidebar trôi lên tận đầu sidebar, đè lên nav, cách nút mở cả màn
(đã dính 24/09/2026). Chỉ bị **lần mở đầu sau khi tải trang, hoặc sau khi thu/mở
sidebar** (bề rộng cũ còn trong state), nên trông như lỗi "lúc có lúc không". Cách làm:
gán bề rộng thẳng vào DOM từ `triggerRect.width` **trước khi** đọc `offsetHeight`, hoặc
đo lại bằng `ResizeObserver` trên menu. Kiểm tra: tải lại trang, bấm mở ngay lần đầu;
thu rồi mở sidebar, bấm mở lại. Menu phải nằm sát nút cả hai lần. Radix, Floating UI
đã lo việc này, lỗi chỉ có ở menu tự dựng.

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

**Khe 4px là cho khối hẹp, đừng nâng lên 8px.** Dropdown, select, popover dạng
danh sách rộng 224–320px: khe `p-1` là chuẩn chung của các thư viện menu (Radix, shadcn;
menu macOS 5px). Nâng lên `p-2` thì mỗi bên mất thêm 4px bề ngang cho chữ, và nền
sáng trông như lơ lửng giữa khung. **Khối rộng từ ~480px (command palette) thì
khe `p-2`**: ở bề ngang đó khe 4px làm nền sáng thành một thanh chạy gần hết khung,
góc nền sáng gần chạm góc khung (đã dính 24/09/2026). Xem "Command palette" bên dưới.

**Dropdown dài phải cuộn** thì `max-h-76` và chớp thanh cuộn lúc mở, như select
(`I18`): mục cuối bị cắt ngang là tín hiệu duy nhất lúc đứng yên.

### Menu con (dropdown đa cấp)

Mục cha: icon + chữ + `ChevronRight` `size-4 text-muted` ở mép phải. Menu con **cùng
khung** với menu cha (`rounded-2xl p-1`, viền, `shadow-lg`, mục `h-10 rounded-xl`).

**Màn đủ chỗ cho hai khung cạnh nhau: bay ra cạnh menu cha.**

- Cách mép menu cha 4px. **Hàng đầu thẳng hàng mục cha** (kéo khung lên đúng viền + `p-1`). Thiếu chỗ bên dưới thì đẩy lên cho đáy cách mép màn 8px, không lật.
- Bên phải hết chỗ thì bay sang trái (avatar góc phải header). Mũi tên mở / lùi đổi chiều theo phía bay.
- Rê vào mục cha chờ ~100ms mới mở (lướt ngang qua không bật). Rời đi chờ ~250ms mới đóng, để đi chéo sang menu con không tắt giữa chừng. Radix có sẵn cả hai.
- Menu con đang mở thì **mục cha giữ nền sáng**, để biết menu con thuộc mục nào khi con trỏ đã sang bên kia.
- Phím: `→` mở và sáng mục đầu, `←` / `Esc` đóng và trả tiêu điểm về mục cha, `↑↓` đi trong menu con.

**Màn hẹp (hai khung không đứng cạnh nhau được): đổi tại chỗ, không xổ ra trong menu cha.**
Bấm mục cha thì **cả nội dung menu thay bằng menu con**, hàng đầu là nút lùi
`‹ Chuyển tài khoản` (`ChevronLeft` + tên mục cha, `h-10`, cùng khuôn mục), rồi một
đường chia. Bề rộng giữ nguyên, chiều cao theo nội dung mới. Tiêu điểm sang mục đầu,
`←` / `Esc` lùi về menu cha và sáng lại mục cha. YouTube, Facebook làm menu tài khoản
đúng kiểu này.

Đừng xổ danh sách ngay dưới mục cha (chevron xoay xuống như nhóm sidebar). Đã dính
24/09/2026, menu tài khoản ở 375px: menu cao gần 600px, bốn tài khoản xổ ra thẳng
mép với các mục thường nên không đọc ra là con của mục nào, và tài khoản đang dùng
hiện **hai lần liền nhau** (đầu menu, rồi hàng đầu danh sách).

**Hàng trong menu con không cao hơn mục thường quá một bậc.** Mục một dòng `h-10`;
hàng hai dòng (tên + dòng phụ) `h-12`, avatar `size-8`. Mỗi trường **một dòng**,
không trường nào xuống dòng. Đã dính 24/09/2026: email xuống dòng trước `@` làm mỗi
hàng tài khoản ba dòng, cao ~68px, menu con nặng hơn hẳn menu cha. Chữ dài thì cắt
theo "Cắt email" bên dưới, không bẻ dòng.

### Menu tài khoản

Mở từ avatar trên header, hoặc từ hàng profile chân sidebar (`app.md`).

- **Tài khoản chỉ có một lối vào.** Đề bảo đặt avatar trên header mà chân sidebar đã có hàng profile thì chuyển hẳn lên header, bỏ hàng profile, báo một dòng lúc giao. Hai chỗ mở cùng một menu là một ý nói hai lần (`N3`); các app lớn đều chỉ có một.
- **Đầu menu mở từ avatar: tên + email, không avatar.** Avatar vừa bấm nằm ngay bên trên; lặp lại một avatar 40px ở đầu menu thì nó thành thứ nặng nhất menu (đã dính 24/09/2026). Tên `text-sm font-medium truncate`, email `text-xs text-muted` một dòng, khối `px-3 py-2`. Mở từ chân sidebar thì chỉ email, vì tên đã ở hàng profile.
- Thứ tự: đầu menu, đường chia, Hồ sơ / Trợ giúp…, **Chuyển tài khoản** (chỉ khi có từ 2 tài khoản), đường chia, Đăng xuất (`I4`).
- **Hàng tài khoản trong menu con**: avatar `size-8` (màu theo `avatar.md`), tên `text-sm font-medium truncate`, email một dòng, và ô `size-4` luôn giữ chỗ ở mép phải cho dấu `Check` của tài khoản đang dùng. Chỉ dấu tick, không tô nền, không chữ đậm thêm. Hàng `role="menuitemradio"`. Bấm tài khoản đang dùng thì chỉ đóng menu.
- Menu con rộng `w-72`. Menu cha từ avatar header cũng `w-72` cho hai khung cân nhau.

**Cắt email: cắt phần trước `@`, giữ nguyên tên miền.** Hai tài khoản của một người
thường cùng phần trước `@`, chỉ khác tên miền, nên cắt ở cuối
(`tran.nguyen.anh.tuan.khang@ev…`) là mất đúng phần để phân biệt. Xuống dòng thì
giữ được chữ nhưng hàng cao gấp rưỡi. Tách hai `span`, phần trước `@` co lại, gói
thành một component (vd `AccountEmail`) dùng chung:

```tsx
<span className="flex min-w-0 text-xs text-muted" title={email}>
  <span className="min-w-0 truncate">{localPart}</span>
  {/* shrink-0: tên miền không co. max-w-full: tên miền dài hơn cả hàng (hiếm) thì nó cắt, không tràn. */}
  <span className="max-w-full shrink-0 truncate">{domainPart}</span>
</span>
```

Ra `tran.ngu…@evondev-studio.com` cạnh `tran.nguyen.an…@gmail.com`: mỗi hàng một
dòng, vẫn phân biệt được. Email đầy đủ ở `title`. Dùng khuôn này ở mọi chỗ hiện
email trong menu: đầu menu, hàng tài khoản, đầu menu chân sidebar.

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

## Command palette

```
┌────────────────────────────────────────┐
│ 🔍 Tìm trang                           │  <- ô tìm h-14 px-5, không viền
├────────────────────────────────────────┤  <- đường chia tràn hai mép (F25)
│ ▓▓ 🏠 Tổng quan ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  <- mục đầu sáng sẵn, khe 8px tới mép
│    📥 Hộp thư                          │
│                                        │
│    CÔNG VIỆC                           │  <- nhãn gần nhóm của nó
│    📁 Dự án                            │
│    📄 Tài liệu                         │
│    👥 Khách hàng                       │
│    📝 Hợp đồng                         │  <- mục cuối lộ nửa, mép dưới cắt ngang
└────────────────────────────────────────┘
```

```html
<!-- Ghim từ trên, không căn giữa dọc -->
<div role="dialog" aria-label="Tìm trang" class="fixed inset-x-4 top-4 mx-auto w-auto max-w-xl overflow-hidden rounded-2xl bg-surface shadow-xl sm:top-[15vh]">
  <div class="flex h-14 items-center gap-3 border-b border-border px-5">
    <i data-lucide="search" class="size-4 shrink-0 text-muted"></i>
    <input class="min-w-0 flex-1 bg-transparent text-base outline-hidden placeholder:text-muted md:text-sm" placeholder="Tìm trang" />
  </div>
  <!-- pr-1 + gutter stable: khe phải = 4px + thanh 4px = 8px, bằng khe trái, dù có cuộn hay không -->
  <div role="listbox" class="max-h-[min(22rem,60vh)] overflow-y-auto p-2 pr-1 [scrollbar-gutter:stable] [&::-webkit-scrollbar-track]:mt-2 [&::-webkit-scrollbar-track]:mb-4">
    <button role="option" class="flex h-10 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-sm outline-hidden data-[selected=true]:bg-background">
      <i data-lucide="house" class="size-4 shrink-0 text-muted"></i>
      <span class="min-w-0 flex-1 truncate text-left">Tổng quan</span>
    </button>
    <!-- Nhãn nhóm: trên rộng, dưới hẹp. Nhóm đầu tiên có nhãn thì pt-2. -->
    <div class="px-3 pt-5 pb-1 text-xs font-medium uppercase tracking-wide text-muted">Công việc</div>
    …
  </div>
</div>
```

- **Ghim từ trên (`sm:top-[15vh]`), không căn giữa dọc.** Gõ để lọc thì danh sách co lại; khung căn giữa thì ô tìm nhảy lên xuống theo từng phím gõ, ngay dưới con trỏ (`N1`). Ghim từ trên thì ô tìm đứng yên, chỉ đáy khung co. Các bảng lệnh phổ biến đều ghim.
- **Khe `p-2`, mục `rounded-lg`**: khung 16 = 8 + 8 (`M19`). Palette rộng 576px, khe `p-1` của dropdown ở bề ngang này thì nền sáng thành một thanh gần hết khung (lý do ở "Dropdown" bên trên). Mục `h-10`, icon `size-4 text-muted`, chữ `text-sm`.
- **Icon ô tìm thẳng cột icon mục**: ô tìm `px-5` = khe `p-2` + mục `px-3`. Đổi một bên thì đổi cả hai.
- **Nhãn nhóm gần nhóm của nó**: `pt-5 pb-1`. **Đo từ chữ tới chữ, không từ mép hàng**: mục `h-10` đã có sẵn 10px khoảng thở trên và dưới chữ, nên `pt-4 pb-1.5` nhìn bằng mắt chỉ còn 26px trên, 16px dưới, nhãn vẫn lơ lửng giữa hai nhóm (đã dính 2 lần 24/09/2026). `pt-5 pb-1` ra 30px trên, 14px dưới, khoảng gấp đôi, mắt gắn nhãn với nhóm bên dưới. Kiểu chữ như nhãn nhóm sidebar (`app.md`): IN HOA bằng CSS, xám. Không kẻ đường giữa các nhóm.
- **Chiều cao theo `I18`**: đo ở trạng thái chưa gõ, xê `max-h` từng bậc 4px tới khi mục cuối lộ khoảng một nửa. Mở palette thì chớp thanh cuộn một lần (`flashScrollbar`).
- **Khe hai bên bằng nhau dù có cuộn hay không**: thanh cuộn 4px chiếm chỗ bên phải, nên khung danh sách `p-2` thì khe phải thành 12px, khe trái 8px, lệch 4px mỗi khi danh sách dài (đã dính 24/09/2026, đo lại bằng Chrome). Sửa bằng `pr-1` + `[scrollbar-gutter:stable]`: luôn giữ chỗ 4px cho thanh, nên lọc còn một kết quả thì khe vẫn y như lúc cuộn.
- **Rãnh thanh cuộn lùi `mt-2 mb-4`** (`[&::-webkit-scrollbar-track]:mt-2 [&::-webkit-scrollbar-track]:mb-4`). Đầu trên nằm dưới đường kẻ thẳng của ô tìm, lùi 8px để thanh không dính đường kẻ. Đầu dưới chạm góc bo 16px, **lùi bằng bán kính góc bo**: đầu tròn của thanh 4px sát mép chỉ nằm trọn trong góc bo khi cách đáy từ 14px (16 − 2). `my-2` cũ để đuôi bị vát mép phải khoảng 2px, thấy rõ khi phóng to 4 lần (đã dính 24/09/2026, dự án test đo ra và sửa trước skill).
- **Mục sáng là một**: mở ra thì mục đầu sáng sẵn, Enter chạy nó; chuột và phím mũi tên dời cùng một chỗ sáng (`I13`). cmdk dùng `data-[selected=true]:`, Radix dùng `data-[highlighted]:`. Phím mũi tên đi tới mục khuất thì cuộn nó vào tầm nhìn (`block: "nearest"`).
- **Lọc không phân biệt dấu** ("tai" ra "Tài liệu"). **Chỉ khớp theo tên mục và từ khoá riêng của mục** (từ đồng nghĩa, tên tiếng Anh), không khớp theo tên nhóm: gõ "tai" mà cả nhóm TÀI KHOẢN hiện ra thì "Cài đặt", "Hồ sơ của bạn" nằm trong kết quả không rõ vì sao (đã dính 24/09/2026). Khớp đầu từ xếp trước. Nhóm không còn mục nào thì ẩn luôn nhãn.
- **Tên dài `truncate` kèm `title`** (`T14`).
- **Không có kết quả**: một dòng `py-10 text-center text-sm text-muted`, "Không có trang nào khớp. Thử gõ ngắn hơn." **Không nhắc lại từ khoá**: nó nằm ngay ô tìm phía trên (`N3`), và từ khoá dài bị cắt giữa chữ thành "của phò…" (đã dính 24/09/2026).
- **Esc đóng, bấm ra ngoài cũng đóng.** Ngoại lệ có tên của `I20`: ô duy nhất là ô tìm, đóng lỡ tay không mất gì.
- Chuyển động như modal (bảng "Chuyển động"). Không dựng hàng gợi ý phím (↑↓ ↵ Esc) ở đáy khi chưa được yêu cầu.

## Panel thông báo

Mở tại chỗ từ nút chuông trên header (`I24`), đóng bằng bấm ra ngoài hay Esc (`I21`).

```
            [🔔•]                      <- nút chuông: lúc mở có nền như hover
┌─────────────────────────────────┐    <- mép trên cách đường kẻ header 8px
│ Thông báo      Đánh dấu đã đọc  │    <- hành động duy nhất, ghost h-8
│ [Tất cả] Chưa đọc  Nhắc đến bạn │
├─────────────────────────────────┤
│ (L) **Lan Anh** đã nhắc đến   • │    <- chưa đọc: chữ đậm màu, chấm phải
│     bạn trong **Website…**      │    <- tiêu đề tối đa 2 dòng
│     Anh xem lại giúp em…        │
│     3 giờ trước                 │
│ (H) Hoàng Minh Đức đã giao…     │    <- đã đọc: tiêu đề foreground/70
└─────────────────────────────────┘
```

- **Khung**: popover `w-96 max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-surface shadow-lg`, neo mép phải nút chuông, portal ra `body` (`I22`).
- **Mép trên không đứng sát đường kẻ header.** Panel neo theo nút với khoảng cách mặc định thì mép trên thường rơi cách đường kẻ header vài px, đường kẻ chọc vào góc bo của panel như hai thứ suýt khớp (đã dính 24/09/2026: lệch 3px). Chỉnh khoảng cách (`sideOffset`) cho mép trên panel nằm **dưới đường kẻ 8px**. Luật chung cho mọi khối nổi mở từ header.
- **Header: tiêu đề bên trái, "Đánh dấu đã đọc" bên phải**, nút `ghost h-8`, chỉ chữ (`I1`). Mọi panel thông báo thật đều có nút này; thiếu nó thì muốn dọn bốn chấm người dùng phải bấm vào bốn thông báo (đã dính 24/09/2026). Không còn gì chưa đọc thì ẩn nút. Đánh dấu cả danh sách hay chỉ tab đang xem là logic của dự án, handler để rỗng (`I25`). Không thêm icon bánh răng hay nút ⋯ khi chưa được yêu cầu.
- **Tab `boxed`** như tab trạng thái trên bảng (`components/small-controls.md`): chữ trơn, không số đếm (chấm trên chuông đã báo có chưa đọc).
- **Chiều cao danh sách = chiều cao của tab Tất cả**, chặn trên `max-h-[min(28rem,calc(100dvh-13rem))]`, cuộn trong khung theo `I18` (đầu dưới rãnh chạm góc bo: `mb-4`). Tab Tất cả chứa mọi thứ nên luôn cao nhất; panel mở ở tab đó, đo chiều cao danh sách một lần rồi đặt làm `min-height` cho các tab còn lại: bấm sang tab rỗng hay tab ít mục thì mép dưới đứng yên (`N1`). Không có thông báo nào thì panel gọn theo câu rỗng (`py-10`). Chiều cao đo ở tab Tất cả là chiều cao **đã hạ cho mục cuối lộ nửa** (`getPeekListHeight`, `I18`): thông báo cao thấp khác nhau nên không chốt được một con số.
  Đã thử hai cách và bỏ (24/09/2026): `min-h-72` thì sang tab rỗng vẫn sụp 448 → 288px; **cao cố định** thì hết sụp, nhưng lúc chưa có thông báo nào panel là một khối trắng 563px với một dòng chữ xám giữa lòng, trông như tải chưa xong.
- **Mỗi thông báo là một link rộng hết hàng** (`I29`): `flex gap-3 rounded-lg px-3 py-3 hover:bg-background`, khung danh sách `p-2` (`M19`: 16 = 8 + 8). Mục nhiều dòng nên khe 8px như command palette, không 4px như menu. Bấm thì mở đối tượng và đánh dấu đã đọc, handler rỗng.
- **Dòng tiêu đề**: tên người và tên đối tượng `font-medium`, động từ thường ("**Lan Anh** đã nhắc đến bạn trong **Website bán hàng 2026**"). **Tối đa 2 dòng** (`line-clamp-2` + `title`): tên hợp đồng dài làm tiêu đề ba dòng, cộng hai dòng trích thì một thông báo cao bằng ba cái khác, panel mất tác dụng liếc (đã dính 24/09/2026). Câu trích `text-sm text-muted line-clamp-2`, thời gian `text-xs text-muted`.
- **Chưa đọc và đã đọc liếc là phân biệt được** (`N2`): chưa đọc thì chấm `size-2 rounded-full bg-foreground` bên phải (**không `bg-primary`**, xem ngay dưới), thẳng tâm dòng đầu; đã đọc thì không chấm **và tiêu đề `text-foreground/70`**. Chỉ có chấm thì trong danh sách lẫn lộn, hai mục trông y hệt nhau trừ một chấm 8px ở tận mép phải, nơi mắt đọc tới cuối cùng (đã dính 24/09/2026, tab Nhắc đến bạn). Không tô nền cho mục chưa đọc: mười mục chưa đọc thành mười dải xám.
- **Chấm chưa đọc, tên người, tên đối tượng không đổi theo màu thương hiệu.** Dự án brand xanh lá thì chấm vẫn `--foreground` (đen, nền tối thì trắng), tên vẫn `--foreground font-medium`. Màu nhấn để dành cho nút chính của màn (`M3`): mười thông báo chưa đọc là mười chấm xanh rải dọc panel, đúng cái đã bỏ ở badge sidebar (`I15`). Tên tô màu nhấn thì đọc ra là link, trong khi cả hàng mới là chỗ bấm. Chấm cũng không đỏ: đỏ dành cho lỗi (`M30`).
- **Avatar `size-8`** theo `components/avatar.md`, thẳng dòng đầu tiêu đề, không căn giữa cả mục.
- **Rỗng**: một dòng `text-sm text-muted` theo `components/empty-state.md`. Tab Chưa đọc rỗng: "Bạn đã đọc hết thông báo". Chưa có gì: "Chưa có thông báo nào".
- **Nút chuông**: icon `BellDot` của lucide khi có chưa đọc, **tô đặc chấm bằng `[&_circle]:fill-current`**, `Bell` khi không. `BellDot` gốc vẽ chấm bằng nét viền, không tô: ở `size-5` nó chỉ là một vòng tròn rỗng 6px, trông như chữ o lạc vào icon (đã dính 24/09/2026). Chuông đã khoét sẵn khe quanh chấm, đừng tự đè thêm chấm `absolute`. `aria-label` kèm số: "Thông báo, 4 chưa đọc". **Lúc panel mở, nút có nền như hover** (`aria-expanded:bg-foreground/5`), để biết panel mọc ra từ đâu.
- Chuyển động như dropdown (bảng "Chuyển động").

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

