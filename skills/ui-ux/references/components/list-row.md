# Dòng trong danh sách

Nguồn: `new-tab-todo/src/features/reminders/components/reminder-item.tsx`

```tsx
<li className="group flex items-center gap-3 rounded-lg px-1 py-2 hover:bg-background">
  <IconButton ... />                          {/* hành động chính, luôn hiện */}

  <div className="min-w-0 flex-1">
    <div className="flex min-w-0 items-center gap-2">
      <span className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold">
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

- Hover là **chìm xuống nền** (`hover:bg-background`), tức dòng tối nhẹ đi chứ không sáng lên, không viền, không nhấc bóng. Cảm giác như con trỏ ấn xuống mặt giấy.
- Ba tầng ưu tiên rõ rệt trong một dòng: hành động chính luôn hiện bên trái, nội dung ở giữa, hành động phụ ẩn bên phải. Không phải mọi nút đều đòi được nhìn thấy cùng lúc.
- Nút phụ ẩn bằng `opacity-0` kèm `pointer-events-none`. Thiếu vế thứ hai thì nút vô hình vẫn ăn cú bấm.
- `min-w-0` xuất hiện ở cả hai tầng bọc ngoài `truncate`. Thiếu nó thì flex item không chịu co, tiêu đề dài đẩy vỡ dòng. Đây là lỗi hay gặp nhất trong danh sách.
- Màu chỉ dùng để báo hạn: đỏ quá hạn, amber hôm nay, muted còn xa. Ngoài ba chỗ đó cả dòng là đen trắng xám.
- Dòng phụ là `text-xs text-muted`, ngăn cách bằng dấu `·` chứ không phải gạch dài hay dấu gạch ngang.
- Hai cỡ chữ trong một dòng, không hơn: `text-sm` cho tiêu đề, `text-xs` cho phụ. Nhãn bé xíu `text-[10px]` chỉ dành cho chip.
