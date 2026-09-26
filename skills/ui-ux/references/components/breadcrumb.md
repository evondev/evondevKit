# Đường dẫn (breadcrumb)

Dòng các cấp cha của trang đang xem, mỗi cấp là link. Nằm ở một trong hai chỗ: thanh header
`h-16` của khung app, hoặc trên tên trang trong đầu trang (`../layouts/app.md`, "Đầu trang trong
vùng nội dung"). Không bao giờ cả hai.

## Khi nào có

- **Trang nằm sâu hơn mục sidebar đang sáng**: chi tiết bản ghi, form tạo, trang con của một
  bản ghi. Trang danh sách cấp một thì mục sidebar đã nói đủ, không đường dẫn; tên trang trên
  thanh header là `<h1>`.
- **Không dùng cho luồng nhiều bước** (đó là thanh các bước, `../layouts/form.md`) và **không
  phải lịch sử duyệt**: đường dẫn ghi cây trang, vào từ đâu cũng ra một dòng như nhau.

## Hình

```
Khách hàng  ›  Công ty TNHH Minh Phát  ›  Đơn hàng       <- chỉ các cấp CHA, đều là link
Đơn DH-10412                                             <- <h1>, không có trong đường dẫn
```

- **Chỉ ghi các cấp cha, không ghi trang đang đứng.** Tên trang là `<h1>` ngay dưới (hoặc
  ngay cạnh trên thanh header), ghi lại là lặp. Nhiều bộ thiết kế thêm trang hiện tại làm mục
  cuối, nhưng các bộ đặt đường dẫn ngay trên tên trang thì bỏ nó đi, và skill luôn ở ca đó.
  Ca hiếm đường dẫn là chỗ **duy nhất** ghi tên trang (trình duyệt tệp, không có tiêu đề
  nào khác): mục cuối là chữ trơn `font-medium text-foreground` có `aria-current="page"`,
  không phải link.
- **Chữ mỗi mục đúng bằng `<h1>` của trang đích.** Bấm "Công ty TNHH Minh Phát" mà ra trang
  tên "Hồ sơ khách hàng" thì người đọc không biết mình vừa đi đâu.
- **`text-sm text-muted`, rê vào `hover:text-foreground`, không gạch chân, không nền.** Cùng
  cách rê của link sidebar: đường dẫn là thanh điều hướng, không phải link trong câu văn.
- **Dấu ngăn `ChevronRight` `size-4` `text-muted`, `aria-hidden`**, `gap-2` cả ở `<ol>` lẫn
  trong `<li>`. Nét dấu › chỉ rộng 4px giữa hộp 16px, nên nét chữ tới nét dấu là 14px mỗi bên.
  Dấu "/" cũng phổ biến ngang, skill chọn một kiểu cho cả app (`D1`), đừng trộn.
- **Mỗi mục `inline-flex h-8 items-center`**: chữ 20px nhưng vùng bấm 32px dọc. Ở đầu trang,
  tên trang ngay dưới **không `mt`**: hàng 32px đã chừa 6px dưới chữ.
- **Tên dài: `max-w-48 truncate` kèm `title`**, cắt từng mục, không cắt cả dòng. 192px ở
  `text-sm` là khoảng 28 ký tự.
- **Không xuống dòng** (`R6`): đường dẫn đọc theo một chiều, rớt nửa sau xuống hàng hai thì dấu
  › đầu hàng đọc như mục mới. Chật thì cắt tên và thu gọn theo mục dưới.
- **Focus bàn phím: vòng bọc chữ, không bọc cả link.** Link cao 32px mà chữ 20px, vòng
  `ring-offset-2` quanh link thì chữ cách vòng 2px hai bên, 8px trên dưới. Đặt vòng lên
  `<span>` chữ (`group-focus-visible:`), `ring-offset-4`: chữ cách vòng đều 4px bốn phía, vòng
  cao đúng 32px, không lấn xuống tên trang. Kèm `underline` theo `I13`. `ring-offset` theo màu
  nền nơi đặt: `ring-offset-surface` trên thanh header, `ring-offset-background` ở đầu trang
  trên nền xám. Đã dính 26/09/2026.

## Đường dài

```
Tài liệu  ›  …  ›  Hợp đồng 2026  ›  Quý 3                <- 5 cấp cha, giữa gom vào "…"
            └ Dự án Minh Phát
              Pháp lý
```

- **Tới 3 cấp cha thì hiện hết.** Từ 4 cấp: giữ **cấp đầu** và **hai cấp gần nhất**, các cấp
  giữa gom vào một nút "…". Cấp đầu cho biết đang ở khu nào, hai cấp gần là chỗ hay quay về
  nhất.
- **Nút "…" mở dropdown menu**, không bung tại chỗ: bung ra là dòng dài lại và phải xuống
  dòng. `aria-label="Hiện các cấp bị ẩn"`, `aria-haspopup="menu"`. Menu liệt kê các cấp ẩn
  theo thứ tự từ trên xuống, mỗi mục là link, khuôn mục menu ở `../layouts/overlay.md`.
- **Nút "…" trông như một mục chữ, không phải icon button.** Hộp ôm sát icon (`h-5 w-4 p-0`,
  icon `MoreHorizontal size-4`), không nền, `text-muted` rê vào `text-foreground`, đang mở giữ
  `text-foreground`. Vùng bấm nới bằng `before:` (`before:absolute before:-inset-x-1.5
  before:-inset-y-1.5`, 28×32px, cùng cách tay cầm ở `range-slider.md`). Vòng focus như chữ:
  `ring-offset-4`. Đã dính 26/09/2026: nút `ghost size-8` có padding 8px mỗi bên, nét "…"
  cách dấu › 22px trong khi chữ cách dấu 12px, và rê vào hiện một ô nền xám giữa hàng chữ
  chỉ đổi màu.

## Màn hẹp (dưới `sm`)

```
☰  ‹ Khách hàng                                  🔔  (T)
```

- **Chỉ còn cấp cha gần nhất, có `ChevronLeft` đứng trước**: một link "quay về", không phải
  đường dẫn thu nhỏ. 375px không đủ chỗ cho ba mục cắt còn "Khách…", "Công t…". Các cấp xa
  hơn vẫn tới được qua sidebar.
- **Vùng bấm `h-10`** (`h-10 sm:h-8`): trên điện thoại đây là nút quay lại, bấm bằng ngón cái.
- **Vòng focus bọc cả ‹ lẫn chữ**: cả cụm là một link. Icon vào trong `<span>` mang vòng
  (`inline-flex items-center gap-1 pr-1.5`), chữ nằm ở `<span>` con `truncate`. `pr-1.5` bù
  6px trống bên trái nét ‹ trong hộp icon, nên nét ‹ và cuối chữ cách vòng bằng nhau. Đã dính
  26/09/2026: vòng chỉ bọc "Bảo mật", dấu ‹ đứng ngoài vòng, cách vòng chưa tới 4px.
- Tên cấp cha vẫn `max-w-48 truncate`, không bị ép chung hàng với mục khác nên hiếm khi cắt.
- Tên bị cắt có dấu "…" thì khe tới dấu › có thể rộng hơn vài px: trình duyệt cắt ở ký tự cuối
  còn vừa, phần thừa để trống. Không sửa được bằng CSS, đừng đuổi theo.

## Khung

```tsx
interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  // Chỉ các cấp cha, từ xa tới gần. Không đưa trang đang đứng vào đây.
  items: BreadcrumbItem[];
  className?: string;
}

// Link cao 32px để dễ bấm; vòng focus nằm trên <span> chữ bên trong (breadcrumbTextClass).
const breadcrumbLinkClass =
  "group inline-flex h-8 max-w-48 items-center text-muted outline-hidden transition-colors hover:text-foreground";

const breadcrumbTextClass = cn(
  "truncate rounded-sm",
  "group-focus-visible:underline group-focus-visible:ring-2 group-focus-visible:ring-foreground/50",
  "group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-background",
);

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  const nearestParent = items.at(-1);
  if (!nearestParent) return null;

  // Từ 4 cấp: giữ cấp đầu và hai cấp gần nhất, cấp giữa vào menu "…".
  const isCollapsed = items.length > 3;
  const leadingItems = isCollapsed ? items.slice(0, 1) : [];
  const hiddenItems = isCollapsed ? items.slice(1, -2) : [];
  const trailingItems = isCollapsed ? items.slice(-2) : items;

  return (
    <nav aria-label="Đường dẫn" className={cn("min-w-0", className)}>
      {/* Màn hẹp: một link quay về cấp cha gần nhất. */}
      <Link
        href={nearestParent.href}
        title={nearestParent.label}
        className={cn(breadcrumbLinkClass, "h-10 gap-1 text-sm sm:hidden")}
      >
        {/* Vòng bọc cả ‹ lẫn chữ; pr-1.5 bù khoảng trống bên trái nét ‹ trong hộp icon. */}
        <span className={cn(breadcrumbTextClass, "inline-flex min-w-0 items-center gap-1 pr-1.5")}>
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
          <span className="truncate">{nearestParent.label}</span>
        </span>
      </Link>

      <ol className="hidden min-w-0 items-center gap-2 text-sm sm:flex">
        {leadingItems.map((item) => (
          <BreadcrumbCrumb key={item.href} item={item} hasSeparator={false} />
        ))}

        {hiddenItems.length > 0 ? (
          <li className="flex shrink-0 items-center gap-2">
            <ChevronRight className="size-4 text-muted" aria-hidden />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* Trông như một mục chữ: hộp ôm sát icon, không nền. Vùng bấm nới ra 28×32px
                    bằng before: (số âm có chủ ý, N11: nới vùng bấm mà không đẩy hình). */}
                <Button
                  variant="ghost"
                  aria-label="Hiện các cấp bị ẩn"
                  className={cn(
                    "group relative h-5 w-4 rounded-sm p-0 text-muted hover:bg-transparent hover:text-foreground",
                    "before:absolute before:-inset-x-1.5 before:-inset-y-1.5",
                    "focus-visible:ring-offset-4 focus-visible:ring-offset-background",
                    "aria-expanded:text-foreground",
                  )}
                >
                  <MoreHorizontal className="size-4" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {hiddenItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ) : null}

        {trailingItems.map((item, index) => (
          <BreadcrumbCrumb key={item.href} item={item} hasSeparator={isCollapsed || index > 0} />
        ))}
      </ol>
    </nav>
  );
}

// breadcrumb-crumb.tsx: một mục, dấu › đứng trước trong cùng <li>.
export default function BreadcrumbCrumb({ item, hasSeparator }: BreadcrumbCrumbProps) {
  return (
    <li className="flex min-w-0 items-center gap-2">
      {hasSeparator ? <ChevronRight className="size-4 shrink-0 text-muted" aria-hidden /> : null}
      <Link href={item.href} title={item.label} className={breadcrumbLinkClass}>
        <span className={breadcrumbTextClass}>{item.label}</span>
      </Link>
    </li>
  );
}
```

`Link` là link của router dự án (`next/link`, `react-router`). Dự án đã có `ActionMenu` hay
`DropdownMenu` bọc sẵn thì dùng cái đó cho nút "…", đừng dựng menu thứ hai.

## Không làm

- **Không dropdown trên từng mục để chuyển sang bản ghi cùng cấp** (bấm "Dự án A ⌄" ra danh
  sách dự án). Đường dẫn để đi lên; đổi workspace, đổi dự án là việc của sidebar
  (`../layouts/app.md`). Hai việc chung một chỗ thì bấm vào tên không biết sẽ đi hay mở menu.
- Không icon nhà ở mục đầu, không in đậm mục nào: mục nào cũng là cấp cha ngang nhau.
- Không ghi lại đường dẫn ở đầu trang khi thanh header đã có.

## Kiểm

- Đường dẫn có trùng chữ với `<h1>` ngay dưới không? Có thì đang ghi trang hiện tại.
- Bấm từng mục: tên trang đích có đúng chữ trên mục không?
- Ở 1280px với 5 cấp cha: một hàng, có "…" mở menu, Tab tới "…" rồi Enter mở được?
- Nét dấu › tới nét chữ hai bên bằng nhau, kể cả quanh "…" (probe đo: "dấu ngăn cách không đều").
- Ở 375px: chỉ còn "‹ Cấp cha", cao 40px, không có mục nào bị cắt còn vài chữ. Tab tới: vòng
  bọc cả dấu ‹, nét ‹ và cuối chữ cách vòng bằng nhau.
- Rê vào mục và vào "…": chỉ đổi màu, không hiện ô nền. Tab tới: vòng bọc chữ cách đều 4px, có
  gạch chân, không đè dấu ›.
- Trình đọc màn hình: `nav` có tên "Đường dẫn", mục trong `ol`, dấu › không bị đọc.
