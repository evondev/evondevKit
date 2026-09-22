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
- Nút chính ở footer là `primary` (một hành động duy nhất của modal, `I2`), **có icon trái** theo `I1` (mời thì `send` hoặc `user-plus`). Nút Huỷ `secondary`. Cả hai `h-11 md:h-10`, cao bằng ô nhập.
- **Trạng thái đang gửi**: spinner (`loader-circle animate-spin`) **thay đúng chỗ icon**, chữ giữ nguyên, nút `disabled` + `aria-busy`. Nút không có icon mà chèn spinner vào là nút rộng ra, đẩy Huỷ sang trái (đã dính 22/09/2026). Xem `../components/button.md`.
- Câu lỗi dưới ô nói **cách sửa kèm ví dụ đúng**: "Email chưa đúng định dạng, ví dụ ten@congty.vn".

## Panel trượt

Trượt từ phải, rộng cố định `w-[28rem]`, dùng khi nội dung dài hoặc người dùng
cần nhìn thấy danh sách phía sau. Không dùng panel cho một câu xác nhận.

## Dropdown

Bám mép trái của nút mở, rộng tối thiểu bằng nút. Mục nguy hiểm tách xuống cuối,
cách bằng một đường kẻ — hover của nó theo `I4`, đường kẻ tràn hết bề ngang theo
`F25`. Không quá 8 mục, hơn thì thêm ô tìm.

**Mỗi mục là một phần tử bấm được rộng hết hàng** (`I29`): `flex w-full` đặt trên
chính `<button>` hay `<a>`, không đặt trên phần tử bọc ngoài. Dùng shadcn thì
mục có link phải là `<DropdownMenuItem asChild>`.

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
    <button type="button" class="h-8 cursor-pointer rounded-lg px-3 text-sm font-medium hover:bg-background focus-visible:bg-background outline-hidden">Hoàn tác</button>
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
