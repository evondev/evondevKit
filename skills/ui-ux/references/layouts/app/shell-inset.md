# Khung bọc (Inset) ⚑

Khung app của bộ mặt **Inset** (`styles.md`, `P13`). Mọi luật sidebar trong `shell.md` vẫn đúng (rộng,
cao link, nhãn nhóm, số đếm, thu gọn), chỉ đổi chỗ đặt nền:

```
 nền xám --background, cả màn
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░ ◐ Tổ chức     ░ ┌──────────────────────────────────────┐ ░   <- khối bọc cách mép 8px
░ [tìm     ⌘K]  ░ │ ▤ Hoá đơn ⋯                [chuông] │ ░   <- header của trang nằm TRONG khối
░               ░ ├──────────────────────────────────────┤ ░
░ ⌂ Tổng quan   ░ │ Board  Tổng quan  Danh sách          │ ░
░ ▤ Hoá đơn     ░ │                                      │ ░   <- mục đang chọn: nền xám đậm hơn nền trang
░ ☑ Việc        ░ │                                      │ ░
░               ░ │         nội dung cuộn trong khối      │ ░
░ ⚙ Cài đặt     ░ │                                      │ ░
░ ◐ Tên người ⇕ ░ └──────────────────────────────────────┘ ░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  ↑ sidebar KHÔNG có nền riêng, không viền, không đường kẻ dưới đầu sidebar
```

- **Sidebar trong suốt, nằm thẳng trên `--background`**. Đây là ngoại lệ có tên của dòng "đừng
  để sidebar trong suốt" trong `shell.md`: ở đây ranh giới là mép khối bọc trắng, không phải mép sidebar.
  Bỏ luôn đường kẻ dưới đầu sidebar: đường kẻ trên nền xám không nối với gì.
- **Nền rê và nền đang chọn đổi theo nền xám**: rê `hover:bg-foreground/4`, đang chọn
  `bg-secondary-hover` + `font-medium`. `--item-hover` trùng đúng màu nền trang, giữ nguyên là rê
  vào không thấy gì. Rê bằng `--background-hover` thì chỉ chênh nền đang chọn ~12 bậc, rê qua mục
  nào cũng trông như đang chọn (`I10`; đo trên trang mẫu); `foreground/4` chênh ~17
  bậc và tự đảo ở nền tối. Ô tìm, hàng profile giữ nền `--surface` như cũ.
- **Khối bọc** (từ `lg`): `my-2 mr-2`, `rounded-xl`, `bg-surface`, `border border-border`, **không
  bóng** (`M15`: bóng chỉ cho lớp nổi). Ở nền sáng viền gần như không thấy, trắng cạnh xám đã là
  ranh giới; ở nền tối viền token tối giữ mép khối. Khối cao hết màn trừ hai mép
  (`h-[calc(100dvh-1rem)]`), **nội dung cuộn trong khối**, trang không cuộn. Thanh cuộn trong
  khối tự ẩn (`I18`).
- **Header của trang nằm trong khối**, dính đầu khối khi cuộn, `border-b border-border` chạy hết
  bề ngang khối. Đầu sidebar (tên tổ chức) cao bằng header và cùng hàng, để chữ tên tổ chức thẳng
  hàng chữ tên trang.
- **Dưới `lg`**: sidebar thành panel trượt trái như khung thường (nền `--surface`, bóng
  `shadow-modal`); khối bọc trải hết màn, `m-0 rounded-none border-0`. Màn hẹp mà vẫn cách mép
  8px là mất 16px bề ngang cho một đường viền không ai cần.
- **Thu gọn sidebar** như mục dưới: khối bọc giãn ra theo, mép trái khối sát cột icon (cột icon
  đã có lề riêng).
- **Khối con trong khối bọc đọc bề mặt trắng**: đầu cột board, ô nền nhạt dùng `--tab-selected`
  hay `--secondary`, không dùng `--background`. Ở nền tối `--background` tối hơn khối bọc, đầu cột
  trông như bị khoét lõm (`P10`: bề mặt sáng dần theo tầng).

```tsx
<div className="flex h-dvh overflow-hidden bg-background">
  <aside className="hidden w-60 shrink-0 flex-col lg:flex">
    {/* Đầu sidebar cao bằng header của khối: mt-2 + h-14 */}
    <div className="mt-2 flex h-14 items-center gap-2 px-4">…tên tổ chức…</div>
    <nav className="flex flex-col gap-1 px-3">
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex h-10 items-center gap-3 rounded-xl px-3 text-sm text-foreground/70 hover:bg-foreground/4 hover:text-foreground",
          isActive && "bg-secondary-hover font-medium text-foreground hover:bg-secondary-hover",
        )}
      >
        …
      </Link>
    </nav>
  </aside>
  <div className="flex min-w-0 flex-1 flex-col bg-surface lg:my-2 lg:mr-2 lg:h-[calc(100dvh-1rem)] lg:overflow-hidden lg:rounded-xl lg:border lg:border-border">
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4 sm:px-6">…</header>
    <main className="scrollbar-clean min-h-0 flex-1 overflow-y-auto">…</main>
  </div>
</div>
```
