# Card

```tsx
<section className="flex flex-col rounded-2xl border border-border bg-surface p-5">
  <header className="mb-4 flex items-center justify-between gap-3">
    <div className="flex items-center gap-2">
      {icon}
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
    </div>
    {action}
  </header>

  <div className="min-h-0 flex-1">{children}</div>
</section>
```

**Vì sao ổn**

- Card tách khỏi nền bằng **đường tóc 1px + bo góc**, không bằng bóng. Đây là luật `M13`, và nó là chỗ phiên bản trước của skill này đã chốt ngược.
- Dùng đúng `--border`, cùng token với ô nhập và đường chia. Một token cho mọi đường tóc (`M14`), nên trong app không có chỗ đậm chỗ nhạt.
- **Không `shadow-*`.** Bóng chỉ dành cho lớp nổi lên trên trang — modal, dropdown, popover (`M15`). Card nằm trong trang thì không.
- Tiêu đề card là `text-base font-semibold`, đúng một bậc trên chữ bên trong (`T8`). Không `text-2xl`, không uppercase, không tracking rộng.
- Header và body cách nhau `mb-4`, padding card `p-5`. Hai con số này lặp lại ở mọi card, không card nào tự chế.
- Chỗ đặt hành động là một slot `action` ở góc phải header, nên nút thêm hay nút lọc không bao giờ trôi xuống giữa nội dung.

---

## Khi nào dùng `ring` thay `border`

`border` ăn vào hộp theo `box-sizing: border-box`, nên phần tử **cỡ cố định** sẽ
co lại 1px mỗi bên khi bật viền. Với card thì không sao — card co giãn được.

Dùng `ring-1` cho thứ có kích thước cố định: avatar, ô vuông icon 28px, thumbnail.
Xem luật `M17`.

---

## Nhiều mục cùng loại thì MỘT khung, không phải nhiều card

Bốn card trắng giống hệt nhau xếp lưới thì mắt đọc ra bốn khối ngang hàng, không
đọc ra một danh sách. Gom lại:

```tsx
<section className="rounded-2xl border border-border bg-surface">
  <header className="flex items-center justify-between gap-3 px-5 py-4">
    <h2 className="text-base font-semibold text-foreground">{title}</h2>
    {action}
  </header>

  <ul className="divide-y divide-border border-t border-border">
    {items.map((item) => <ListRow key={item.id} item={item} />)}
  </ul>

  <footer className="flex justify-end border-t border-border px-5 py-3">
    <ViewAllButton />
  </footer>
</section>
```

Dòng tiêu đề và dòng hành động cuối nằm **TRONG** khung. Luật `F3`.

---

## Slot `action` ở header

Chỗ đặt hành động phụ của cả khối: "Xem tất cả", "Đọc thêm", nút lọc, nút thêm
mới. **Luôn căn phải, cùng hàng với tiêu đề.**

Đừng biến "Xem tất cả" thành một dòng chữ màu ở cuối khối. Đó là hành động dẫn
sang màn khác, nên nó phải trông bấm được: nút phụ, `h-10`, `px-3` tới `px-4`,
không icon mũi tên. Xem luật `I7`.
