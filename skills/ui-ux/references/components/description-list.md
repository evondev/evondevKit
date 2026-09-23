# Nhãn và giá trị (description list)

Khối thông tin của trang chi tiết: email, số điện thoại, trạng thái, ngày tạo.
Nằm trong card (`card.md`), mỗi hàng một cặp nhãn và giá trị, theo `T23`.

```html
<dl class="space-y-3 text-sm">
  <!-- Mỗi cặp một khối: màn hẹp nhãn trên giá trị dưới, từ sm hai cột -->
  <div class="grid gap-1 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-baseline sm:gap-6">
    <dt class="text-muted">Email</dt>
    <dd class="min-w-0 font-medium text-foreground [overflow-wrap:anywhere]">minhanh.nguyen@lumen.vn</dd>
  </div>
  <div class="grid gap-1 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-baseline sm:gap-6">
    <dt class="text-muted">Trạng thái</dt>
    <dd><!-- badge M7, KHÔNG phải chữ trơn "Đang giao dịch" -->
      <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-black/5">
        <span class="size-1.5 rounded-full bg-current"></span>Đang giao dịch
      </span>
    </dd>
  </div>
  <div class="grid gap-1 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-baseline sm:gap-6">
    <dt class="text-muted">Nhãn</dt>
    <dd class="flex flex-wrap gap-1.5"><!-- mỗi nhãn một pill, KHÔNG nối bằng dấu phẩy -->
      <span class="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">VIP</span>
      <span class="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">Khách quen</span>
    </dd>
  </div>
  <div class="grid gap-1 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-baseline sm:gap-6">
    <dt class="text-muted">Tổng doanh thu</dt>
    <dd class="font-medium tabular-nums text-foreground">1.284.500.000<span class="ml-1 text-muted">đ</span></dd>
  </div>
  <div class="grid gap-1 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-baseline sm:gap-6">
    <dt class="text-muted">Số điện thoại</dt>
    <dd class="text-muted">—</dd>
  </div>
</dl>
```

- **`<dl>` / `<dt>` / `<dd>`**, không dựng bằng `<div>`: trình đọc màn hình đọc ra đúng cặp nhãn và giá trị.
- **`sm:items-baseline`** để chữ nhãn thẳng dòng chữ trong badge hay pill: badge có `py-1` nên cao hơn dòng chữ thường, căn đỉnh thì nhãn lệch lên vài px so với chữ trong badge.
- **Cột nhãn rộng cố định** (`10rem`) để mọi giá trị thẳng một mép. Nhãn dài hơn cột thì cho xuống dòng trong cột, không nới cột theo nhãn dài nhất.
- **Trong panel trượt hay cột hẹp (dưới ~480px) thì cột nhãn `7rem`**, không `10rem`. Panel 448px trừ lề chỉ còn ~400px: nhãn `10rem` chiếm gần nửa, nhãn dài nhất ("Số điện thoại") chỉ cần ~100px, còn giá trị bị ép xuống 3–4 dòng (đã dính 23/09/2026, địa chỉ giao trong panel xem nhanh đơn hàng).
- **Màn hẹp dưới `sm` thì xếp chồng**: nhãn trên, giá trị ngay dưới (`gap-1`), giữa các cặp `space-y-3`. Khe trong cặp nhỏ hơn khe giữa các cặp thì mắt mới gom đúng nhãn với giá trị của nó. Hai cột ở 375px thì giá trị còn chưa tới 200px, email dài vỡ vụn.
- **Giá trị `font-medium text-foreground`, nhãn `text-muted`** (`T23`). Giá trị dài xuống dòng, bám mép trên cùng nhãn (`items-start`), không `truncate`: đây là chỗ để đọc đủ.
- **`[overflow-wrap:anywhere]` cho giá trị**: email, URL, mã dài không có dấu cách nên không tự xuống dòng, sẽ đẩy tràn card ở màn hẹp.
- **Giá trị trống là `—` `text-muted`**, một ký hiệu cho mọi ô trống, giống ô trống trong bảng (`layouts/app.md`, `T18`). Không viết "Chưa có", "Chưa gắn nhãn", mỗi dòng một câu.
- **Giá trị có khuôn riêng thì dùng đúng component của nó**, không viết chữ trơn: trạng thái là badge màu (`M7`), nhãn phân loại là pill (`M8`, `list-row.md`), tiền dùng `đ` không `₫` (`charts.md`), số `tabular-nums`, mã và ID `font-mono` (`T17`).
- Gợi ý (người dùng quyết): email là link `mailto:`, số điện thoại là link `tel:`, hover gạch chân. Có nút sao chép thì là icon button `copy` `h-7` hiện khi rê vào hàng, luôn hiện trên màn chạm (`I11`).
- Không kẻ đường chia giữa các hàng khi dưới 8 hàng: khoảng trắng đủ tách. Nhiều hơn thì chia nhóm có tiêu đề nhỏ, không kẻ từng hàng.
