# Dòng trong danh sách

Nguồn: `new-tab-todo/src/features/reminders/components/reminder-item.tsx`

```tsx
<li className="group flex items-center gap-3 rounded-xl px-1 py-2 hover:bg-background">
  <IconButton ... />                          {/* hành động chính, luôn hiện */}

  <div className="min-w-0 flex-1">
    <div className="flex min-w-0 items-center gap-2">
      <span className="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium">
        {person.label}
      </span>
      <p className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
        {reminder.title}
      </p>
    </div>
    <p className="mt-0.5 text-xs text-muted">
      {cadence} · <span className={DUE_TONE_CLASS[tone]}>{dueLabel}</span>
    </p>
  </div>

  <div className="flex items-center gap-0.5">
    <IconButton                                {/* hành động phụ, ẩn */}
      className="pointer-events-none opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100"
    />
  </div>
</li>
```

**Vì sao ổn**

- Hover là **chìm xuống nền** (`hover:bg-background`) — được vì dòng này thụt vào, có bo góc. Dòng tràn hết bề ngang khung (bảng) thì dùng `--surface-hover`, xem `I10`, tức dòng tối nhẹ đi chứ không sáng lên, không viền, không nhấc bóng. Cảm giác như con trỏ ấn xuống mặt giấy.
- Ba tầng ưu tiên rõ rệt trong một dòng: hành động chính luôn hiện bên trái, nội dung ở giữa, hành động phụ ẩn bên phải. Không phải mọi nút đều đòi được nhìn thấy cùng lúc.
- Nút phụ ẩn bằng `opacity-0` kèm `pointer-events-none`. Thiếu vế thứ hai thì nút vô hình vẫn ăn cú bấm.
- `min-w-0` xuất hiện ở cả hai tầng bọc ngoài `truncate`. Thiếu nó thì flex item không chịu co, tiêu đề dài đẩy vỡ dòng. Đây là lỗi hay gặp nhất trong danh sách.
- Màu chỉ dùng để báo hạn, ba mức: **quá hạn** chữ hổ phách `text-amber-700` kèm số ngày ("quá hạn 2 ngày"), **hôm nay** chữ `text-foreground font-medium` không màu, **còn xa** `text-muted`. Quá hạn là "cần chú ý" theo `M7`, không phải đỏ: đỏ là lỗi người dùng phải sửa mới đi tiếp (`M30`). Hôm nay không phải cảnh báo nên không màu, và nhờ vậy không trùng hổ phách với quá hạn (đổi 22/09/2026, bản cũ tô đỏ quá hạn, hổ phách hôm nay). Ngoài ba chỗ đó cả dòng là đen trắng xám.
- Dòng phụ là `text-xs text-muted`, ngăn cách bằng dấu `·` chứ không phải gạch dài hay dấu gạch ngang.
- Hai cỡ chữ trong một dòng, không hơn: `text-sm` cho tiêu đề, `text-xs` cho phụ và cho nhãn. Không `text-[10px]`: dấu tiếng Việt chồng hai tầng ở 10px dính vào nhau. Nhãn là pill `rounded-full` như badge (`F1`, `M7`), không `rounded` 4px.
