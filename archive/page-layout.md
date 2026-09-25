# Khung trang

Nguồn: trang dashboard của một dự án thật.

```tsx
<div className="flex min-h-screen w-full flex-col p-4 sm:p-6">
  <div className={cn(
    "flex flex-1 flex-col rounded-3xl p-3 ring-1 ring-border-card backdrop-blur-xl sm:p-4",
    isPlainBackground ? "bg-surface/90" : "bg-surface/55",
  )}>
    <header className="mb-3 flex items-center justify-between rounded-full bg-surface p-2 px-4 ring-1 ring-border-card">
      <GreetingHeader name={settings.boardName} />
      <Button variant="primary" className="rounded-full">…</Button>
    </header>

    <div className="grid flex-1 gap-3 lg:grid-cols-3">
      <div className="flex h-full flex-col lg:col-span-2"><TodoWidget /></div>
      <AlertsWidget />
      <RemindersWidget />
      <HabitsWidget />
      <BookmarksWidget />
    </div>
  </div>
</div>
```

**Vì sao ổn**

- Đúng hai tầng lồng: vỏ trang bo `rounded-3xl`, rồi tới card widget bo `rounded-2xl`. Bậc bo góc giảm dần theo độ sâu, nên mắt đọc được thứ bậc mà không cần viền.
- Header là một pill `rounded-full` chứ không phải thanh ngang kẻ viền dưới. Nó nổi như một vật đặt trên mặt bàn, cùng ngôn ngữ với các card bên dưới.
- Lưới không chia đều. Widget quan trọng nhất chiếm `lg:col-span-2`, phần còn lại xếp theo. Ba cột đều nhau là dấu hiệu chưa quyết định cái gì quan trọng hơn cái gì.
- `gap-3` dùng suốt, cả cột lẫn hàng lẫn khoảng cách header. Một con số cho cả trang.
- `backdrop-blur` ở đây có lý do chức năng: người dùng đặt được ảnh nền, nên độ trong của vỏ đổi theo (`/90` khi nền trơn, `/55` khi có ảnh) để chữ vẫn đọc được. Không có ảnh nền thì không blur.
- Không hero, không banner, không dòng chào mừng chiếm chỗ. Vào là thấy việc.

---

## Lưu ý khi mượn khung này

Bản gốc dùng `p-3` vì đó là **trang tab mới của trình
duyệt**, cố ý sát mép để tận dụng hết màn hình. Trang app bình thường thì đó là
chật: dùng `p-4 sm:p-6`, xem `budgets.md`.
