# Bố cục khối nổi

Modal, panel trượt, dropdown, toast. Chưa có skeleton thì đưa 2-3 phương án cho
chọn.

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

## Phím tắt trong menu

Mục nào có phím tắt thì hiện ở **mép phải**, `text-xs text-muted`, đừng để trong
ngoặc giữa dòng.

```html
<button class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm hover:bg-secondary">
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
