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
  <button class="…">…</button>
</div>
```

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

Góc trên phải hoặc đáy giữa, chọn một chỗ rồi dùng suốt. Một dòng chữ, tự tắt
sau 4 giây, không nút đóng nếu tự tắt. Việc hỏng thì toast không tự tắt và có
nút thử lại.
