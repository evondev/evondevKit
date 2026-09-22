# Bố cục khối nổi

Modal, panel trượt, dropdown, toast. Không có wireframe thì dựng đúng khuôn
dưới đây, báo một dòng lúc giao. Xem câu 4 trong `../../SKILL.md`.

---

## Hộp xác nhận

```
        ┌───────────────────────┐
        │ ⬤  icon tròn          │
        │ Xoá đơn hàng?         │
        │ Đơn ABC sẽ bị xoá     │
        │ vĩnh viễn.            │
        │                       │
        │        [Huỷ] [XOÁ]    │
        └───────────────────────┘
```

- Rộng `max-w-sm`, căn giữa màn, nền phủ đen mờ phía sau.
- Tiêu đề là **câu hỏi**, thân là hậu quả cụ thể có tên đối tượng.
- Nút phá huỷ nằm bên phải cùng và là nút duy nhất mang màu cảnh báo.
- Không dùng modal cho thứ chỉ để thông báo. Cái đó là toast.

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
