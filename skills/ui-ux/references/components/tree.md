# Cây thư mục (tree)

Danh sách lồng nhau mở đóng được: thư mục tài liệu, cây trang, cây danh mục.
Mượn khuôn **menu con của sidebar** (`layouts/app.md`): cùng chiều cao hàng, cùng
nền hover, cùng đường dọc, cùng cách báo mục đang chọn (`N5`).

```html
<ul class="space-y-0.5 text-sm"><!-- 2px giữa các hàng, xem list-row.md -->
  <li>
    <button class="flex h-9 w-full items-center gap-2 rounded-xl px-2 hover:bg-background" aria-expanded="true">
      <!-- ChevronDown size-4 text-muted, xoay -rotate-90 khi đóng. Hàng file: một ô size-4 trống giữ chỗ -->
      <!-- FolderOpen / Folder / FileText size-4 shrink-0 -->
      <span class="min-w-0 truncate">Khách hàng doanh nghiệp</span>
    </button>
    <ul class="ml-4 space-y-0.5 border-l border-border-strong pl-2"><!-- đường dọc chạy ở tâm icon cha -->
      …
    </ul>
  </li>
</ul>
```

- **Hàng đang chọn**: nền `bg-background` + `font-medium` + **đoạn đường dọc của nó đậm lên `--foreground`**, y như menu con của sidebar. Không tô màu nhấn, không viền.
- **Hover và đang chọn cùng một nền.** Vì vậy hai hàng cạnh nhau cùng sáng nền là chuyện bình thường, và danh sách **phải có `space-y-0.5`**, nếu không hai hàng dính thành một khối (đã dính 23/09/2026).
- **Chevron chỉ ở hàng mở được.** Hàng file vẫn chừa đúng một ô `size-4` để chữ thẳng cột với hàng thư mục. Icon thư mục đổi theo trạng thái: `FolderOpen` khi mở, `Folder` khi đóng.
- **Thư mục rỗng có một hàng chữ xám "Thư mục trống"**, `text-muted`, **thẳng mép chữ của hàng con cùng cấp** — không thụt ít hơn, không có icon. Không có hàng này thì mở thư mục ra chẳng thấy gì đổi, người dùng tưởng bấm hụt (`N2`).
- **Tên dài cắt giữa, giữ đuôi file**, dấu `…` dính liền đuôi (`T14`). Tooltip tên đầy đủ **chỉ gắn khi tên thật sự bị cắt** (so `scrollWidth` với `clientWidth`) và không che hàng kế (`N8`).
- **Mỗi tầng thụt `ml-4`**, đường dọc `border-l border-border-strong` chạy ở tâm icon của hàng cha. Cột hẹp cỡ sidebar (288px) vẫn phải lồng được bốn tầng; sâu hơn thì thụt ít lại chứ không cho cuộn ngang (`R1`).
- Bàn phím: mũi tên lên xuống đi giữa các hàng, phải mở, trái đóng, `Enter` chọn (`N9`). Cả cây là một `<ul>` lồng, hàng mở đóng là `<button aria-expanded>`.
