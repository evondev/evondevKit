# Một mặt phẳng (Unified) ⚑

Khung app của bộ mặt **Paper** (`styles.md`, `P13`). Sidebar, header, nội dung chung một nền
`--surface`; ranh giới là đường kẻ. Luật sidebar trong `shell.md` vẫn đúng (rộng, cao link, nền rê, nền
đang chọn như sidebar trắng), chỉ đổi nền trang và đường kẻ:

```
 cả màn nền trắng --surface
┌──────────────┬───────────────────────────────────────┐
│ ◐ Tổ chức    │ ▤ Việc                       [chuông] │
├──────────────┼───────────────────────────────────────┤  <- một đường kẻ ngang chạy liền qua hai cột
│ [tìm     ⌘K] │ Tên việc        Người làm   Hạn   Trạng thái │
│ ⌂ Tổng quan  │ ─────────────────────────────────────── │  <- bảng chạy hết bề ngang, không bọc card
│ ☑ Việc       │ Sửa trang thanh toán  An    12/11   Đang làm │
│              │ ─────────────────────────────────────── │
│              │                                       │
└──────────────┴───────────────────────────────────────┘
               ↑ đường kẻ dọc border-r: không còn chênh nền nào làm ranh giới
```

- **Nền trang `--surface`**, không phải `--background`. Đổi ở khung ngoài cùng (`body` hay khung
  app), **không đè biến `--background`**: ô nền nhạt bên trong (đầu cột board, chip, ô ngày) vẫn
  cần màu xám đó để tách khỏi nền trắng.
- **Đường kẻ khung là `--border-strong`**: `border-r` của sidebar, `border-b` của header và của
  đầu sidebar, chạy liền thành một đường. `--border` (`#f7f7f8`) trên nền trắng gần như không
  thấy, khung app mất ranh giới. Đây là ngoại lệ có tên của dòng "chỉ một màu đường kẻ
  `--border`" trong `shell.md`: khung Paper không có chênh nền nào khác để dựa vào.
- **Khối nội dung không bọc card trắng.** Trắng trên trắng chỉ còn cái viền, mười card là mười
  khung kẻ. Tách nhóm bằng tiêu đề khối (`T8`), khoảng trắng và một đường kẻ `border-border-strong`
  giữa các phần; bảng chạy hết bề ngang vùng nội dung, dòng ngăn bằng `divide-y`. Chỗ buộc phải
  là card (thẻ kanban, ô số liệu) thì viền `border-border-strong`, không bóng (`M15`).
- **Dòng bảng rê `hover:bg-surface-hover`** như bảng trong khung trắng (`I10`), không
  `--item-hover`: dòng chạm hai mép vùng nội dung mà tô đúng màu nền xám là trông như thủng.
- **Dưới `lg`**: như khung thường, sidebar thành panel trượt có `shadow-modal`; header giữ
  `border-b border-border-strong`.

```tsx
<div className="flex min-h-dvh bg-surface">
  <aside className="hidden w-60 shrink-0 flex-col border-r border-border-strong lg:flex">
    <div className="flex h-14 items-center gap-2 border-b border-border-strong px-4">…tên tổ chức…</div>
    <nav className="flex flex-col gap-1 p-3">…link như sidebar trắng…</nav>
  </aside>
  <div className="flex min-w-0 flex-1 flex-col">
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border-strong px-4 sm:px-6">…</header>
    <main className="min-w-0 flex-1">…</main>
  </div>
</div>
```
