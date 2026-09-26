# Dòng trong danh sách

Nguồn: dòng nhắc việc của một dự án thật.

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
      className="pointer-events-none opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100"
    />
  </div>
</li>
```

**Vì sao ổn**

- Hover là **chìm xuống nền** (`hover:bg-background`) — được vì dòng này thụt vào, có bo góc. Dòng tràn hết bề ngang khung (bảng) thì dùng `--surface-hover`, xem `I10`, tức dòng tối nhẹ đi chứ không sáng lên, không viền, không nhấc bóng. Cảm giác như con trỏ ấn xuống mặt giấy.
- Ba tầng ưu tiên rõ rệt trong một dòng: hành động chính luôn hiện bên trái, nội dung ở giữa, hành động phụ ẩn bên phải. Không phải mọi nút đều đòi được nhìn thấy cùng lúc.
- Nút phụ ẩn bằng `opacity-0` kèm `pointer-events-none`. Thiếu vế thứ hai thì nút vô hình vẫn ăn cú bấm. **Mở lại bằng ba đường**: rê vào (`group-hover`), Tab tới (`group-focus-within`, không có thì Tab rơi vào một nút vô hình), và máy không có chuột (`[@media(hover:none)]`, kèm cả `pointer-events-auto`, không thì nút hiện ra mà chạm không ăn). Có xoá thì theo `I11`: luôn hiện.
- **Cỡ nút hiện thẳng trong dòng theo độ dày của danh sách.** Danh sách thưa (dòng có ô icon hoặc avatar `size-10`, dưới ~10 dòng: phiên đăng nhập, tích hợp, khoá API) thì nút cỡ form `h-11 md:h-10 rounded-xl`, bằng ô icon và bằng các nút khác trên trang. Bảng dày (dòng 48–56px, nhiều dòng) mới dùng nút nhỏ `h-8 rounded-lg`. Màn cảm ứng: nút 32px dưới cỡ bấm khuyến nghị 44px (đo 26/09/2026, trang bảo mật).
- `min-w-0` xuất hiện ở cả hai tầng bọc ngoài `truncate`. Thiếu nó thì flex item không chịu co, tiêu đề dài đẩy vỡ dòng. Đây là lỗi hay gặp nhất trong danh sách.
- Màu chỉ dùng để báo hạn, ba mức: **quá hạn** chữ hổ phách `text-amber-700` kèm số ngày ("quá hạn 2 ngày"), **hôm nay** chữ `text-foreground font-medium` không màu, **còn xa** `text-muted`. Quá hạn là "cần chú ý" theo `M7`, không phải đỏ: đỏ là lỗi người dùng phải sửa mới đi tiếp (`M30`). Hôm nay không phải cảnh báo nên không màu, và nhờ vậy không trùng hổ phách với quá hạn (đổi 22/09/2026, bản cũ tô đỏ quá hạn, hổ phách hôm nay). Ngoài ba chỗ đó cả dòng là đen trắng xám.
- Dòng phụ là `text-xs text-muted`, ngăn cách bằng dấu `·` chứ không phải gạch dài hay dấu gạch ngang.
- **Dòng phụ nhiều mảnh (từ 4 mảnh) thì ở màn hẹp chia hai dòng theo nghĩa**, không để trình duyệt tự ngắt. Ngắt tự do thì dấu `·` rớt lên đầu dòng sau ("· Chưa dùng lần nào"), và chỗ ngắt đổi theo độ dài từng dòng nên năm dòng năm kiểu (đã dính 26/09/2026, trang khoá API ở 375px). Gom mảnh thành hai nhóm (nhận dạng / thời gian), mỗi nhóm `block sm:inline`, dấu `·` giữa hai nhóm chỉ hiện từ `sm`:

  ```tsx
  <p className="mt-0.5 text-xs text-muted">
    <span className="block sm:inline">
      <span className="font-mono">evd_live_…a3f9</span> · Toàn quyền
    </span>
    <span aria-hidden className="hidden sm:inline"> · </span>
    <span className="block sm:inline">Dùng 2 phút trước · Không hết hạn</span>
  </p>
  ```

  Từ `sm` vẫn là một dòng như cũ. Nhóm nào vẫn quá dài ở 375px thì mỗi mảnh trong nhóm `whitespace-nowrap`, dấu cách giữa hai mảnh nằm ngoài span (không thì cả nhóm không có chỗ ngắt và tràn khung).
- Hai cỡ chữ trong một dòng, không hơn: `text-sm` cho tiêu đề, `text-xs` cho phụ và cho nhãn. Không `text-[10px]`: dấu tiếng Việt chồng hai tầng ở 10px dính vào nhau. Nhãn là pill `rounded-full` như badge (`F1`, `M7`), không `rounded` 4px.
- **Dòng bo góc xếp chồng thì chừa 2px** (`space-y-0.5` trên danh sách). Hai dòng cạnh nhau cùng sáng nền — một đang chọn, một đang rê chuột — mà dính mép thì đọc ra thành **một khối cao gấp đôi**, không phải hai dòng (đã dính 23/09/2026 ở cây thư mục). Dòng tràn hết bề ngang khung (bảng) thì không cần, vì nó không bo góc và đã có đường kẻ chia.
