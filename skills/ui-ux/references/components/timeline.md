# Dòng thời gian hoạt động (timeline)

Lịch sử của một đối tượng: đơn hàng, hồ sơ, ticket. Nằm trong card (`card.md`).
**Không dùng cho "Hoạt động gần đây" của cả workspace** (nhiều người, nhiều dự án):
ở đó câu hỏi là ai vừa đụng gì, khuôn là avatar + một câu, xem `layouts/app.md`
mục Dashboard (đã dính 26/09/2026).
Vòng và đường nối mượn thanh các bước (`layouts/form.md`), chữ mượn dòng danh
sách (`list-row.md`). Mượn là chép class, không chỉ chép dáng (`N5`).

```html
<ol class="text-sm">
  <!-- MỚI NHẤT Ở TRÊN. Hàng cuối (cũ nhất) không có đường nối -->
  <li class="relative flex gap-3 pb-6 last:pb-0">
    <span class="absolute top-10 bottom-1 left-[15px] w-0.5 bg-border" aria-hidden="true"></span>
    <span class="grid size-8 shrink-0 place-items-center rounded-full bg-red-50 text-red-600">
      <!-- icon lucide size-4, riêng cho từng loại việc -->
    </span>
    <div class="min-w-0 flex-1 pt-1.5"><!-- dòng đầu 20px nằm giữa vòng 32px -->
      <div class="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <p class="font-medium text-foreground">Giao hàng thất bại</p>
        <time class="shrink-0 text-xs whitespace-nowrap text-muted tabular-nums">11:47 · 19/09</time>
      </div>
      <p class="mt-1 max-w-[55ch] text-pretty text-muted">Shipper gọi 3 lần không liên lạc được người nhận…</p>
      <p class="mt-1 text-xs text-muted">Lê Văn Phúc · Vận chuyển Sao Việt</p>
    </div>
  </li>
</ol>
```

- **Mới nhất ở trên.** Người mở lịch sử muốn biết "giờ đang thế nào"; để cũ trên thì với lịch sử dài, việc vừa thất bại nằm tận đáy phải cuộn mới thấy (đã dính 22/09/2026). Người dùng muốn đọc xuôi thì đảo mảng, component không tự sắp xếp.
- **Vòng `size-8`, icon `size-4`, màu lấy từ bảng badge trạng thái** (`M7`, `N4`): việc thường `bg-zinc-100 text-zinc-600`, thất bại `bg-red-50 text-red-600`, xong hẳn `bg-emerald-50 text-emerald-700`. **Việc lặp lại thường ngày thì xám, kể cả khi nó là "xong"**: trong lịch sử khách hàng, mỗi đơn giao xong là việc bình thường, tô xanh cả 24 đơn thành một cột vòng xanh, mất tác dụng báo hiệu (`N3`, đã dính 24/09/2026). Xanh chỉ cho mốc kết thúc của chính đối tượng (đơn hàng đã giao trong lịch sử của đơn đó). Chỉ tô vòng; **nhãn luôn `text-foreground`**, kể cả việc thất bại (`N3`). Icon riêng cho từng loại việc, màu không đứng một mình.
- **Dòng đầu nằm giữa tâm vòng**: khối chữ `pt-1.5` (vòng 32px, dòng `text-sm` 20px). Không có thì nhãn bám mép trên vòng, lệch so với thanh các bước.
- **Hai cỡ chữ**: nhãn và mô tả `text-sm`, giờ và người làm `text-xs`. Không `text-base`.
- Mô tả `max-w-[55ch] text-pretty` (`T10`, `T11`): card rộng thì câu dài vẫn không chạy quá 75 ký tự và không chui xuống dưới cột giờ. Không `max-w-prose` (65ch ≈ 90 ký tự chữ Việt, đã dính 22/09/2026), lý do ở `T11`.
- Giờ `tabular-nums whitespace-nowrap` (`T16`), bám mép phải từ `sm`, màn hẹp xuống dưới nhãn. Mã vận đơn, mã đơn trong mô tả bọc `font-mono` (`T17`).
- Đường nối `w-0.5 bg-border`, cùng độ dày với thanh các bước (`N5`); `w-px` mờ gần như mất trên nền trắng (đã dính 22/09/2026). Hở một khoảng trên dưới, không chạm vòng. Chỉ một việc thì không có đường nối.
- **Lịch sử dài thì hiện khoảng 10 việc gần nhất, cuối danh sách là nút `ghost` "Xem hoạt động cũ hơn"** (`I7`, không icon), **chữ** trên nút thẳng cột với chữ của các hàng: `ml-8` (vòng 32px + `gap-3` = 44px, trừ `px-3` của nút ghost). Bấm thì nối thêm 10 việc ngay bên dưới, không phân trang, không mở trang khác; đang tải thì spinner đè giữa nút (`button.md`). Hết việc thì bỏ nút: hàng cũ nhất ("Tạo khách hàng", "Tạo đơn") tự là điểm kết. Không dựng cả trăm hàng một lượt, và không cắt cụt ở 5 hàng rồi nhảy thẳng về mốc tạo: người đọc thấy ô số ghi 24 đơn mà lịch sử có một đơn (đã dính 24/09/2026).
- Hàng không bấm được thì không hover. Bấm được (mở chi tiết) thì theo hover của `list-row.md`.
