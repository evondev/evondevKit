# Card

```tsx
<section className="flex flex-col rounded-2xl border border-border bg-surface p-5">
  <header className="mb-4 flex items-start justify-between gap-3">
    {/* min-h-10 = cao bằng nút action: một dòng thì tiêu đề nằm giữa nút, nhiều dòng thì nút bám góc trên */}
    <div className="flex min-h-10 min-w-0 items-center gap-2">
      {icon}
      <h2 className="text-base font-semibold text-balance text-foreground">{title}</h2>
    </div>
    <div className="shrink-0">{action}</div>
  </header>

  <div className="min-h-0 flex-1">{children}</div>
</section>
```

**Vì sao ổn**

- Card tách khỏi nền bằng **đường tóc 1px + bo góc**, không bằng bóng. Đây là luật `M13`, và nó là chỗ phiên bản trước của skill này đã chốt ngược.
- Dùng đúng `--border`, cùng token với đường chia và khung dropdown, nên trong app không có chỗ đậm chỗ nhạt. Ô nhập thì dùng `--border-strong`, đậm hơn một bậc (`M14`).
- **Không `shadow-*`.** Bóng chỉ dành cho lớp nổi lên trên trang — modal, dropdown, popover (`M15`). Card nằm trong trang thì không.
- Tiêu đề card là `text-base font-semibold`, đúng một bậc trên chữ bên trong (`T8`). Không `text-2xl`, không uppercase, không tracking rộng.
- Header và body cách nhau `mb-4`, padding card `p-5`. Hai con số này lặp lại ở mọi card, không card nào tự chế.
- Chỗ đặt hành động là một slot `action` ở góc phải header, nên nút thêm hay nút lọc không bao giờ trôi xuống giữa nội dung.
- **Header `items-start`, không `items-center`.** Tiêu đề dài xuống hai dòng thì nút vẫn bám góc trên phải, không trôi xuống giữa. Khối tiêu đề `min-h-10` bằng chiều cao nút nên lúc chỉ một dòng, chữ vẫn nằm giữa nút. Tiêu đề `min-w-0 text-balance` để xuống dòng đều, nút `shrink-0` để không bị bóp.

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

**Kiểu nút theo loại hành động**, không dùng chung một kiểu cho mọi action:

| Hành động | Nút |
| --- | --- |
| Dẫn sang màn khác: "Xem tất cả", "Đọc thêm" | nút phụ `secondary`, **không icon** (`I7`) |
| Làm một việc: tải, xuất, thêm, lọc | nút viền `outline` **có icon trái** (`I1`): `download`, `plus`, `filter` |

Đã dính 22/09/2026: "Tải báo cáo" dựng y như "Xem tất cả" (nền xám không icon), đọc ra là link sang trang khác chứ không phải nút tải.

Đừng biến "Xem tất cả" thành một dòng chữ màu ở cuối khối. Đó là hành động dẫn
sang màn khác, nên nó phải trông bấm được: nút phụ, `h-10`, `px-3` tới `px-4`,
không icon mũi tên. Xem luật `I7`.
