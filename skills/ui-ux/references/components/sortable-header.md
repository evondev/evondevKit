# Tiêu đề cột sắp xếp

Ô tiêu đề cột bảng bấm được để sắp xếp dòng. Bảng quanh nó (tab, lọc, chọn nhiều dòng,
phân trang) xem "Bảng dữ liệu" trong `../layouts/app.md`. Dự án có `@tanstack/react-table`
thì để nó giữ trạng thái sắp, skill chỉ lo hình ô (`N10`).

## Ba trạng thái

```
Khách hàng ⇅        Ngày tạo ⇅        ⇅ Doanh thu     chưa sắp: chữ và mũi tên hai chiều text-muted
Khách hàng ↑        Ngày tạo ⇅        ⇅ Doanh thu     tên A → Z: cột đang sắp chữ và mũi tên text-foreground
Khách hàng ⇅        Ngày tạo ↓        ⇅ Doanh thu     mới nhất trên cùng
```

- **Cột nào sắp được cũng có mũi tên, kể cả khi chưa bấm**: `arrow-up-down` → `arrow-up` /
  `arrow-down`, `size-3.5`, cách chữ `gap-1`. Màn chạm không có hover, thiếu mũi tên thì không
  biết cột nào bấm được. Cột không sắp được thì không mũi tên, không phải nút.
- **Cột đang sắp chỉ đổi màu chữ** `text-muted` → `text-foreground`, giữ cỡ và độ đậm
  (`font-medium`) để hàng tiêu đề không xô (`N1`). Mỗi lúc chỉ một cột đang sắp.
- **Mũi tên lên là tăng dần** (A → Z, cũ → mới, nhỏ → lớn), xuống là giảm dần.
- **Cột số căn phải thì mũi tên đứng trước chữ** (`flex-row-reverse`), để chữ chạm mép phải
  thẳng với con số bên dưới. Mũi tên sau chữ thì chữ thụt vào 18px so với số.
- **`aria-sort="ascending" | "descending"` chỉ trên `<th>` đang sắp**, cột khác không gắn.

## Bấm thế nào (mặc định cho người nối logic)

Thứ tự vòng bấm là logic, component chỉ gọi `onSort` (`N10`). Khi đề không nói, ghi chú mặc
định này cạnh handler:

- Bấm lần một: **cột chữ tăng dần** (A → Z), **cột số và ngày giảm dần** (lớn nhất, mới nhất
  trước: người bấm "Doanh thu" muốn xem ai cao nhất). Đây cũng là mặc định của TanStack Table.
- Bấm lần hai đảo chiều, **lần ba về chưa sắp** (thứ tự dữ liệu trả về). Không có lần ba thì
  "chưa sắp xếp" chỉ thấy lúc mới vào trang, không quay lại được.
- Bấm cột khác: cột cũ về chưa sắp, cột mới bắt đầu lại từ lần một.

## Ô và hover

- **Nút phủ kín ô, padding ngang nằm trong nút**, bằng đúng padding của ô dữ liệu cùng cột:
  chữ tiêu đề thẳng cột với dữ liệu mà không kéo lề bằng số âm (`N11`). `h-11`, `text-xs
  font-medium`, `whitespace-nowrap`, `cursor-pointer`.
- **Không nền hover. Rê vào thì chữ và mũi tên đậm lên** (`hover:text-foreground`). Ngoại lệ
  của `I10`, cùng lý do với accordion (`accordion.md`). Đã dính 26/09/2026: nút phủ ô tô
  `--surface-hover` lúc rê thành một mảng `#f8f8fa` rộng 505px cho một nhãn 12px, và ô cột đầu,
  cột cuối chạm mép card, sát màu nền trang `#f4f4f6`, card như bị khoét một góc. Các app lớn
  đều chỉ đổi màu chữ ở tiêu đề cột.
- **Vòng focus `ring-inset`**: ô chạm ô bên cạnh và mép khung cuộn, vòng vẽ ra ngoài bị cắt.

```tsx
<th scope="col" aria-sort={direction ?? undefined} className="p-0">
  <Button
    variant="ghost"
    onClick={onSort}
    className={cn(
      "h-11 w-full justify-start gap-1 rounded-none px-4 py-0 text-xs whitespace-nowrap",
      // Không nền hover: ô cột đầu, cột cuối chạm mép card, --surface-hover sát màu nền trang.
      "text-muted hover:bg-transparent hover:text-foreground",
      "focus-visible:ring-inset focus-visible:ring-offset-0",
      align === "right" && "flex-row-reverse",
      isSorted && "text-foreground",
    )}
  >
    {label}
    <SortIcon direction={direction} />
  </Button>
</th>
```

## Màn hẹp

- **Dưới `sm` bảng quản lý thành danh sách dòng** (`../layouts/app.md`), hàng tiêu đề mất theo,
  nên **sắp xếp chuyển thành một nút dropdown** cạnh nút Lọc: nút viền `h-10`, nhãn
  "Sắp xếp:" `text-muted` rồi lựa chọn đang dùng ("Sắp xếp: Doanh thu cao nhất"), `ChevronDown`,
  `w-fit`, cùng khuôn nút "Trạng thái:" của bảng. Mở ra là danh sách mỗi mục một **cột + chiều
  nói bằng chữ**: "Tên A → Z", "Tên Z → A", "Mới nhất", "Cũ nhất", "Doanh thu cao nhất", "Doanh
  thu thấp nhất", cộng "Mặc định" cho chưa sắp; mục đang chọn có dấu check (khuôn Select ở
  `choice-controls.md`). Chữ thay mũi tên vì không còn tên cột đứng cạnh để mũi tên bám vào.
- **Bảng vẫn giữ dạng bảng ở màn hẹp thì mọi cột sắp được phải thấy mà không cuộn.** Đã dính
  26/09/2026: bảng ba cột `min-w-[28rem]` cuộn ngang trong khung 341px, cột Doanh thu nằm hẳn
  ngoài khung ở cả năm ví dụ, ví dụ "Doanh thu tăng dần" ở 375px không thấy cột doanh thu nào.
  Không vừa thì theo gạch trên, đừng để tiêu đề sắp xếp trôi khỏi màn.

## Kiểm

- Rê lên tiêu đề cột đầu và cột cuối ở 1280px: có mảng nền nào chạm mép card không?
- Mép trái chữ tiêu đề bằng mép trái chữ dữ liệu cột đó; cột số: mép phải chữ tiêu đề bằng mép
  phải con số (đo bằng `Range`).
- Ở 375px: còn thấy tiêu đề (hoặc nút "Sắp xếp:") cho từng cột sắp được không?
- Tab tới từng tiêu đề: vòng focus đủ bốn cạnh, không bị khung cuộn cắt.
