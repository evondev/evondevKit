# Thanh thông báo (banner)

Nằm **trong trang**, ngay dưới đầu trang hoặc đầu form. Không nổi, không bóng,
không tự tắt. Khác toast (`../layouts/overlay.md`): toast báo một việc vừa xong
rồi đi; banner báo một **tình trạng** còn kéo dài tới khi được xử lý.

```html
<div role="status" class="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
  <i data-lucide="triangle-alert" class="mt-0.5 size-5 shrink-0 text-amber-700"></i>
  <div class="min-w-0 flex-1">
    <p class="text-sm font-medium text-amber-800">Gói Pro hết hạn sau 3 ngày</p>
    <p class="mt-0.5 text-sm text-foreground/80">Sau 25/09/2026, tài khoản về gói Miễn phí và chỉ giữ 3 thành viên</p>
  </div>
  <!-- Nút và ✕ chung một cụm, căn giữa theo chiều dọc với khối chữ -->
  <div class="flex shrink-0 items-center gap-1 self-center">
    <!-- nút viền nền trắng h-9, chỉ chữ: "Gia hạn gói" -->
    <!-- IconButton ✕, aria-label "Đóng thông báo" -->
  </div>
</div>
```

## Ba tông

| Tông | Khi nào | Nền · viền | Icon | Tiêu đề | ✕ |
| --- | --- | --- | --- | --- | --- |
| Thông tin | Không ai làm sai gì, chỉ cần biết | `bg-background` · `border-border` | `info` `text-muted` | `text-foreground` | Có |
| Cần chú ý | Sắp thành chuyện nếu không làm gì | `bg-amber-50` · `border-amber-200` | `triangle-alert` `text-amber-700` | `text-amber-800` | Có |
| Lỗi | Đã hỏng, phải xử lý | `bg-red-50` · `border-red-200` (`M30`) | `circle-alert` `text-red-600` | `text-red-700` | **Không** |

Không có banner `rose`: nguy hiểm là lời nhắc trước khi bấm, không phải một
tình trạng (`M30`). Không có banner xanh lá "thành công": xong việc thì là toast.

## Luật

- **Chỉ icon và tiêu đề mang màu. Mô tả `text-foreground/80`**, không tô cả đoạn. Hai dòng cùng hổ phách, cùng đỏ thì cả khối hét lên, và câu mô tả dài đọc mỏi hơn chữ tối.
- **Hai tầng**: tiêu đề `font-medium` nói chuyện gì; mô tả nói hệ quả hoặc vì sao, có số, có mốc thời gian. Một câu đủ thì bỏ tầng dưới.
- **Nút và ✕ chung một cụm, `self-center`** theo khối chữ. Đừng để nút căn giữa còn ✕ bám góc trên: hai thứ cùng hàng mà lệch cao là lỗi thấy ngay (đã dính 22/09/2026).
- **Nút trong banner chỉ có chữ, không icon**, nền trắng viền mảnh (`outline`), `h-9`. Cùng ngoại lệ với hộp xác nhận: icon đã đứng ở đầu khối. Tối đa một nút. Không nút `primary` trong banner: màu tông đã đủ gọi mắt.
- **Chỉ dẫn tới một chỗ khác thì là link hoặc nút**, không để thành câu chữ trơn. "Đổi địa chỉ nhận trong Cài đặt, mục Thanh toán" thì "Cài đặt" là link, hoặc thêm nút "Mở cài đặt".
- **Lỗi không có ✕**: đứng đó tới khi xử lý xong. Thông tin và cần chú ý có ✕. Đóng rồi có hiện lại không, bao lâu hiện lại là logic, người dùng quyết.
- **Rộng bằng vùng nội dung**, bo `rounded-2xl`, `p-4`. Không bóng (`M15`). Tối đa hai banner chồng nhau một lúc; nhiều hơn là trang đang có vấn đề khác cần gom lại.
- **`role`**: lỗi `role="alert"`, còn lại `role="status"`.
- Tiền trong câu dùng `đ`, không `₫` (`charts.md`).
