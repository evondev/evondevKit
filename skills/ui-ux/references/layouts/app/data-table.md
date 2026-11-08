# Bảng dữ liệu

> **Kiểm thư viện trước.** Dự án có `@tanstack/react-table`, `ag-grid`, danh
> sách ảo (`@tanstack/react-virtual`, `react-window`, `react-virtuoso`) thì dùng
> nó cho phần sắp xếp, chọn dòng, cuộn ảo; skill chỉ lo hình. Chưa có thì dựng
> theo mục này, lúc giao đề xuất một dòng nếu bảng cần cuộn nhiều nghìn dòng.

Bảng quản lý (khách hàng, đơn hàng, thành viên…) có tìm, lọc, phân trang, chọn
nhiều dòng. Bộ mặc định, dựng đủ không hỏi:

```
(tên trang "Khách hàng" là <h1> trên thanh header, không lặp ở đây)
[Tất cả 32] Đang giao dịch 18  Tiềm năng 9  Ngừng 5  [tìm…] [Lọc] [+ Thêm khách hàng]
┌──────────────────────────────────────────────────────────────────┐
│ ☐  Khách hàng ↕     Công ty      Trạng thái      Doanh thu ↕   ⋯ │
├──────────────────────────────────────────────────────────────────┤
│ ☐  ⬤ Tên            Công ty      (● Đang GD)     184.500.000 đ  ⋯ │
│ ☐  ⬤ Tên            Công ty      (● Tiềm năng)             0 đ  ⋯ │
├──────────────────────────────────────────────────────────────────┤
│ 1 tới 10 trong 32 khách hàng        Mỗi trang [10▾]  ‹ 1 2 3 4 › │
└──────────────────────────────────────────────────────────────────┘

Khi có dòng được chọn, hàng tab + tìm + nút thêm được THAY bằng:
[Đã chọn 3 · Bỏ chọn]                                     [Xoá 3 dòng]
```

- **Tab trạng thái** ở trên bảng theo "Thanh tab" trong `../../components/small-controls.md` — mở file đó lấy variant và class, đừng chép lại ở đây. Bảng này thường có thêm hàng chip lọc ngay dưới hàng tab, và khi đó tab dùng `underline`. "Bộ lọc" trong đề không chỉ là hàng tab: các trường khác (công ty, người phụ trách, khoảng ngày) vào nút **Lọc** mở popover, dựng theo "Popover lọc" trong `overlay.md`.
- **Dưới `sm`, tab trạng thái không vừa một hàng thì thành một nút dropdown**, không cuộn ngang: nút viền `h-10` ghi **nhãn "Trạng thái:" (`text-muted`) rồi trạng thái đang chọn kèm số** ("Trạng thái: Tất cả · 32") và `ChevronDown`; thiếu nhãn thì nút "Tất cả · 32" đứng một mình trông như ô nhập hay nút lạ, không biết đang lọc theo gì (chủ dự án chốt). Nút mở ra là danh sách đủ các trạng thái, mỗi mục kèm số, mục đang chọn có dấu check (khuôn Select ở `../../components/choice-controls.md`, danh sách mở ra theo Dropdown ở `overlay.md`). Đây là bước 3 của `R10`: hàng tab cuộn ngang làm tab cuối nằm **hẳn** ngoài khung ("Ngừng giao dịch 6" bắt đầu ở 370px trong khung 367px), mép mờ không có gì để mờ, người dùng tưởng chỉ có ba trạng thái. Rút chữ ("Đang GD") thì mất nghĩa. Nút **căn trái, rộng theo nội dung** (`w-fit`), đứng riêng một hàng: nó là bộ lọc, đọc từ trái như hàng chip bên dưới và ô tìm bên trên; căn phải thì một nút lẻ trôi giữa khoảng trống, tách khỏi hàng chip nó đi cùng. Không kéo rộng hết hàng: trông như ô nhập. Hàng chip vẫn cuộn ngang, có mép mờ (`R10`; vạch chỉ vị trí chỉ khi người dùng chọn): chip là lọc thêm, thấy một phần là đủ biết còn.
- **Hover dòng `hover:bg-surface-hover`**, không `hover:bg-item-hover` (`I10`). Dòng chạm hai mép khung trắng mà tô màu nền trang là trông như thủng.
- **Cột trạng thái là badge màu** theo `M7`, không chấm xám + chữ đen. **Trạng thái mà gần hết các dòng giống nhau thì không làm cột**: dòng thường không có dấu, chỉ dòng ngoại lệ có badge cạnh tên (thành viên "Đang hoạt động" / lời mời "Chờ chấp nhận", xem "Trang thành viên và phân quyền").
- **Nút gỡ lọc ghi "Xoá lọc", không ghi "Bỏ chọn".** Khi đang chọn dòng, thanh trên cùng đã có "Bỏ chọn" (bỏ tick dòng); cuối hàng chip mà cũng "Bỏ chọn" thì một màn có hai nút cùng chữ khác việc (`N6`). **"Xoá lọc" cuối hàng chip chỉ hiện khi có chip đang chọn** (bấm là gỡ hết: chip, từ khoá, tab về Tất cả). Chỉ có từ khoá thì không hiện: ô tìm đã có nút `X` riêng, khối rỗng đã có "Xoá tìm kiếm"; thêm nút này là **ba nút cùng gỡ một từ khoá** trên một màn, và ở 375px nó chiếm một phần ba hàng chip.
- **Cột chữ tự co giãn, đừng khoá `max-w` khi bảng còn dư chỗ.** Cột tên và cột công ty để co theo bảng, `truncate` chỉ bật khi thật sự hết chỗ. Khoá cứng thì ra cảnh tên bị cắt "Tôn Nữ Thị Phương Thảo N…" trong khi giữa bảng còn một mảng trắng.
- **Đếm cột trước khi dựng**: khung còn ~970px ở 1280px khi sidebar mở, quá ~6 cột là bắt đầu chật. Thử theo thứ tự: gộp cột (email xuống dưới tên), ẩn cột ít dùng sau nút "Hiển thị cột", rồi mới cho cuộn ngang trong khung với cột đầu ghim `sticky left-0` (`R9`). Bảng 7–9 cột cuộn ngang ở các sản phẩm lớn vẫn có, cuộn không sai; sai là cuộn khi chưa thử gộp.
- **Cột tiền là đúng ca cần `tabular-nums`** (`T16`). Font không có bảng `tnum` thì class chỉ là chữ chết, các mốc nghìn không thẳng cột: báo người dùng một dòng lúc giao, đổi font là việc của họ (`N10`).
- **Hành động dòng** theo `I11`: 1–2 cái thì icon button luôn hiện ở cột cuối; từ 3 cái hoặc có xoá thì một nút `MoreHorizontal` ra dropdown. Cột cuối hẹp `w-12`, căn phải, không tiêu đề (có `<span class="sr-only">Thao tác</span>`).
- **Chọn nhiều dòng:** checkbox đầu dòng, checkbox tiêu đề có ba trạng thái (không / một phần / tất cả trong trang). Không có dòng nào (rỗng, rỗng do lọc, đang tải, lỗi) thì **ẩn checkbox tiêu đề**, giữ chỗ để cột không xê dịch. Có dòng được chọn thì **thanh hành động hàng loạt thay chỗ** hàng tab, cùng chiều cao để bảng không nhảy. Xoá hàng loạt luôn qua hộp xác nhận (`../../layouts/overlay.md`), nói rõ số dòng.
- **Mỗi ô một dòng.** Tên công ty dài thì `truncate` (`min-w-0`) và `title` đầy đủ, bề rộng do bảng chia chứ không khoá `max-w`, không cho xuống ba dòng: một dòng cao gấp ba làm cả bảng mất nhịp. Ô hai tầng (tên + email) là ngoại lệ duy nhất, và mọi dòng đều hai tầng như nhau.
- **Giá trị trống thống nhất một kiểu**: `—` màu `text-muted`. Không chỗ "Chưa có", chỗ "Khách lẻ", chỗ để trống.
- **Số căn phải, `tabular-nums`**, tiêu đề cột số cũng căn phải. Cột số, ngày có sắp xếp thì tiêu đề là nút có icon mũi tên, dựng theo `../../components/sortable-header.md` (không nền hover, dưới `sm` thành nút "Sắp xếp:").
- **Dòng tiêu đề bảng** `text-xs font-medium text-muted`, nền `--surface`, chia với thân bằng `--border`.
- Phân trang có tổng số và vị trí đang xem (`I16`), dựng theo "Phân trang" trong `../../components/small-controls.md`: một trang thì ẩn nav, không có dòng thì ẩn cả footer. Màn hẹp xem gạch dưới.
- **Dưới `sm`, bảng quản lý thành danh sách dòng, không cuộn ngang.** Mỗi dòng theo `../../components/list-row.md`: checkbox · avatar · tên (`font-medium truncate`) trên email (`text-xs text-muted truncate`) · nút ⋯ ở mép phải; hàng dưới cùng thụt thẳng mép chữ tên là **badge trạng thái** bên trái, **số chính** (doanh thu) căn phải `tabular-nums`. Cột phụ (công ty, ngày tạo) không hiện, xem ở trang/drawer chi tiết. Hàng tab, chip, thanh hàng loạt, phân trang giữ nguyên. Bảng 6 cột ở 375px mà cuộn ngang thì cột tên (271px trong khung 341px) trôi mất ngay nhịp cuộn đầu, còn lại "Công ty —, Đang giao dịch" không biết của ai; ghim cột tên cũng chỉ chừa ~70px để cuộn. Các app quản lý lớn trên điện thoại đều đổi sang dòng.
- **Khung vừa thì ẩn cột phụ, không cuộn.** Card bảng là `@container`; dưới `@4xl` (56rem, ~896px) ẩn đúng các cột mà danh sách dòng dưới `sm` cũng bỏ (công ty, ngày tạo): `hidden @4xl:table-cell` trên cả `<th>` lẫn `<td>`. Khung 718px (768px, hoặc 1024px khi sidebar mở) thì bảng 7 cột 960px cuộn ngang, nút ⋯ của mọi dòng nằm ngoài khung tới khi cuộn; ẩn hai cột phụ là vừa khít, cột tên rộng từ 208 lên 264px. Dữ liệu cột phụ vẫn xem được ở drawer / trang chi tiết.
- **Từ `sm` tới hết bề rộng mà bảng vẫn phải cuộn ngang thì bắt buộc ghim cột đầu** `sticky left-0 bg-surface` (dòng hover/đang chọn thì ô ghim đổi nền theo), cột ghim không quá ~40% khung, mép phải cột ghim có mép mờ theo `R10` khi đang cuộn.


## Bảng nhóm theo trạng thái (danh sách công việc)

```
[Danh sách] Kanban                                        [+ Thêm việc]
┌──────────────────────────────────────────────────────────────────────┐
│ Công việc                     Ưu tiên    Người phụ trách   Hạn chót ↑ │
├──────────────────────────────────────────────────────────────────────┤
│ ⌄ ○ Cần làm  5                                                        │  <- hàng nhóm: nút rộng hết hàng
├──────────────────────────────────────────────────────────────────────┤
│ Tiêu đề việc                  ! Khẩn cấp  ⬤ Trần Nguyễn Anh Tuấn  Quá hạn 3 ngày ⋯ │
│ Dự án                                                                 │
│ Tiêu đề việc                  ▂▄ Cao      ⬤ Đỗ Khánh Linh   Hôm nay  ⋯ │
│ Tiêu đề việc                  ▂ Thấp      —                 —        ⋯ │
├──────────────────────────────────────────────────────────────────────┤
│ › ◉ Đang làm  4                                                       │  <- đang thu
│ ⌄ ⋯ Chờ duyệt  0                                                      │
│   Chưa có việc nào ở nhóm này                                         │
└──────────────────────────────────────────────────────────────────────┘
```

- **Hàng nhóm là icon trạng thái + tên + số, không pill** (`D2`, `M7`). Ba nhóm pill xám một nhóm pill xanh thì liếc không biết mình đang ở nhóm nào. Tên `text-sm font-medium`, số `text-muted`. Cả hàng là một `<button aria-expanded>` rộng hết hàng (`I29`), chevron `size-4` đầu hàng, xoay `-rotate-90` khi thu.
- **Trong nhóm phải xếp theo một khoá, và khoá đó hiện ở tiêu đề cột.** Mặc định hạn chót tăng dần: quá hạn lên đầu, hôm nay, rồi ngày xa, không có hạn xuống cuối. Nhóm Xong xếp ngày xong giảm dần. Tiêu đề cột đang sắp có mũi tên (`arrow-up` `size-3.5`, `../../components/sortable-header.md`). Để thứ tự dữ liệu mẫu thì ra "Hôm nay" nằm dưới "28/09" và dưới một việc không hạn, người đọc tưởng bảng xếp theo thứ gì đó mà dò không ra.
- **Mọi cột ngắn co theo nội dung dài nhất, cột tiêu đề nhận phần dư.** Ưu tiên, người phụ trách, hạn chót, cột ⋯: `<th class="w-px">` và ô `whitespace-nowrap`; ô tiêu đề `w-full`. Chỉ `w-px` mà quên `nowrap` ở một cột thì cột đó bị bóp tới chữ đầu tiên ("Trung", "Trần N…"). Tên tiếng Việt cắt đuôi là mất **tên gọi**, phần duy nhất phân biệt người này với người kia: "Trần Nguyễn Anh Tuấ…", "Nguyễn Thị Phương T…" trong khi cột công việc bên trái dư cả nửa bảng (`N8`). Chỉ cắt khi cả bảng hết chỗ, lúc đó rút cột tiêu đề trước: tiêu đề `min-w-0` + `truncate` (hoặc `line-clamp-1`) bên trong ô, không để tràn đè sang cột bên.
- **Khuôn đổi theo bề rộng khung bảng (`@container` trên card), không khoá `min-w` cho bảng rồi cuộn ngang.** Ba bậc:
  - **Khung từ `@4xl` (56rem, ~896px):** đủ cột, người phụ trách avatar + tên.
  - **Từ `@2xl` (42rem) tới dưới `@4xl`:** cột người phụ trách **chỉ còn avatar**, tên vào `title` và `sr-only` cạnh avatar (`whitespace-nowrap @max-4xl:sr-only`, không `sr-only … @4xl:not-sr-only`: `not-sr-only` trả `white-space` về `normal`, tên bốn chữ lại xuống ba dòng, `tailwind-v4-traps.md` W11), tiêu đề cột rút thành "Phụ trách". Cột này là cột ngốn chỗ nhất (~260px với tên bốn chữ), bỏ tên trả lại ~200px cho tiêu đề việc. Ở 1024px khi sidebar mở (khung 718px) tiêu đề việc từ ~190px lên 253px, không cuộn.
  - **Dưới `@2xl`: danh sách dòng**, cùng tinh thần bảng quản lý dưới `sm` (mục Bảng dữ liệu). Giữ hàng nhóm, ẩn `<thead>` (vẫn là `<table>`, các `<tr>` hiển thị `grid`). Mỗi việc: tên `text-sm font-medium` **`line-clamp-2 text-pretty`** cùng hàng với nút ⋯ (nút canh đầu tên, không canh giữa cả dòng); dự án `text-xs text-muted truncate`; hàng cuối là ưu tiên (icon + chữ) rồi hạn chót, `text-xs`, và avatar người phụ trách **thẳng cột với nút ⋯**. Tên việc hai dòng là ngoại lệ của "mỗi ô một dòng": ở dòng hẹp, tên là thứ duy nhất nhận ra việc, một dòng ở 375px chỉ còn ~20 ký tự ("Đặt lịch phỏng vấn hai ứn…"). Thiếu `text-pretty` thì dòng hai trơ một chữ ("CRM", "mới", "nhánh"; `T10`).
    **Mảnh trống thì bỏ hẳn, không ghi `—`.** Không còn tiêu đề cột, `—` không biết là của cột nào: hàng cuối ra "Thấp — —". Không có hạn thì không hiện gì ở chỗ hạn (đặt hạn ở trang chi tiết), chưa giao ai thì không avatar.
  Đừng khoá bảng `min-w-[52rem]` rồi cuộn ngang trong khung: ở 375px cuộn một nhịp là mất cả tên nhóm lẫn tên việc; ở 768 và 1024px nút ⋯ nằm hẳn ngoài khung, "Quá hạn 3 ng" bị mép card cắt ngang, còn cột đang sắp xếp thì đứt đôi. `probe.mjs` báo "bảng cuộn ngang mà cột đầu trôi theo".
- **Thu nhóm trong `<table>`: mỗi nhóm một `<tbody>`, thu thì ẩn `<tr>`, không khối trượt.** Hàng nhóm là `<tr>` đầu `<tbody>`, trong đó `<th scope="rowgroup" colSpan={số cột}>` chứa nút `aria-expanded`; thu thì các `<tr>` dòng việc `hidden`. Khối trượt `grid-rows` của sidebar (`I29`, mục thu nhóm sidebar ở trên) **không** dùng được trong bảng: `<div>` bọc quanh `<tr>` là HTML sai, trình duyệt đẩy nó ra khỏi bảng hoặc tính lại bề rộng cột theo khối đó, cột giữa bị bóp và tên việc dài tràn đè sang cột bên. Bảng không trượt chiều cao; muốn có chuyển động thì chỉ xoay chevron.
- **Ô trống một kiểu `—` ở mọi cột, kể cả hạn chót.** Người phụ trách trống ghi `—` mà hạn chót trống ghi "Đặt hạn" là hai kiểu trống trên một hàng; "Đặt hạn" xám còn trông như một giá trị. Ô sửa được tại chỗ thì cả ô là nút mở date picker / chọn người (dấu bấm được chỉ hiện lúc rê vì đây là ô phụ; ô là việc chính của trang thì dấu luôn hiện, xem "Trang thành viên và phân quyền"): lúc thường `—`, rê vào hoặc Tab tới thì nền `bg-foreground/8 rounded-lg` và đổi thành icon `calendar-plus` + "Đặt hạn". **Không `bg-surface-hover`**: đó cũng là nền của cả dòng lúc rê, ô nằm trên dòng đang rê thì nền ô trùng nền dòng, không nổi lên. `foreground/8` chồng lên nền dòng đang rê vẫn đậm hơn rõ một bậc (`I10`; `/5` gần trùng nền dòng). Ô có giá trị ("Hôm nay", "28/09") cùng công thức; lúc lịch đang mở giữ nền này (`aria-expanded:bg-foreground/8`). Ô `px-2` (các ô khác `px-4`), nút ô `px-2`: chữ thẳng cột với tiêu đề cột mà không kéo nút ra bằng `-mx-2` (`N11`, `F13`). Máy không có chuột thì `—` vẫn bấm được. Lịch mở từ ô theo mục "mở từ một ô trong bảng" trong `../../components/choice-controls.md`: bấm ngày là lưu, có "Xoá hạn" khi ô đang có hạn.
- **Nhóm rỗng** mở ra là một dòng `text-sm text-muted` "Chưa có việc nào ở nhóm này", thụt thẳng cột tiêu đề (`../../components/empty-state.md`). Cả bảng rỗng thì giữ hàng tiêu đề cột, một dòng chữ mờ căn giữa.
- **Khung chờ có cả hàng nhóm.** Dòng đầu của bảng thật là hàng nhóm; khung chờ bắt đầu thẳng bằng dòng việc thì lúc dữ liệu về cả bảng tụt xuống một hàng (`I19`). Khung chờ: một hàng nhóm (chevron + thanh `w-24`), rồi các dòng việc. **Cột co theo nội dung thì ô chờ dùng đúng class bề rộng của ô thật** (`min-w-32` ưu tiên, `min-w-40` hạn chót…), và thanh chờ ở cột tên người dài cỡ một tên bốn chữ (avatar + thanh `w-44`). Cột co theo nội dung dài nhất nên thanh ngắn là cột hẹp lại, dữ liệu về thì cả ba cột nhảy ngang (thanh tên `w-24` thì cột người phụ trách 176px lúc chờ, 262px lúc có dữ liệu, cột Ưu tiên nhảy 86px).
- **Nút "Thêm việc" nằm cuối hàng chuyển view**, căn phải, cả hai view dùng chung (`primary`, icon `plus`). Trang không có nút nào dẫn tới form tạo việc là trang chỉ xem được, không làm được.
- **Tên view: "Danh sách" / "Kanban", không "Bảng".** Theo `S10` "bảng" là table, mà view danh sách ở đây chính là table: ghi "Bảng" cho view kanban là một chữ hai nghĩa trên cùng một màn. Chuyển view là `segmented` trong "Thanh tab" (`../../components/small-controls.md`), mỗi view kèm icon `list` / `square-kanban` được.
- Hành động dòng, hover, badge ưu tiên, màu hạn chót theo các mục trên và `../../components/list-row.md`. Menu dòng đang mở thì dòng giữ nền hover.

---

## Kiểm trước khi giao

Chạy cùng cổng 2 của `checklist.md` khi trang có đúng thứ này.

- [ ] **Bảng nhóm theo trạng thái**: liếc hàng nhóm có tách được nhóm nào với nhóm nào không, hay ba nhóm cùng pill xám? Hàng nhóm và đầu cột kanban cùng icon + tên + số (`M7`, `D2`)? Trong nhóm có xếp theo một khoá, tiêu đề cột đang sắp có mũi tên? Tên người có bị cắt mất tên gọi trong khi cột tiêu đề còn dư? Cột ngắn nào bị bóp còn một chữ (thiếu `whitespace-nowrap`)? Thu nhóm có bọc `<tr>` trong `<div>` trượt không? Rê lên ô sửa tại chỗ của dòng đang rê: ô có nổi lên không, hay nền ô trùng nền dòng? Ô trống mọi cột cùng `—`? Lịch mở từ ô hạn chót có "Xoá hạn" không, hay đặt rồi là hết đường gỡ? "Xoá hạn" là hàng rộng hết bề ngang kiểu mục menu, căn trái, không đỏ (`I4`: gỡ hạn không mất bản ghi), hay một nút nhỏ lẻ loi? Khung chờ có hàng nhóm? View kanban có bị ghi "Bảng" không? Ở 375, 768 và 1024px (sidebar mở) bảng có cuộn ngang không, nút ⋯ và cột hạn chót có nằm trong khung không? Khung hẹp thì người phụ trách chỉ còn avatar, dưới `@2xl` thành dòng với tên việc hai dòng `text-pretty` (dòng hai không trơ một chữ), mảnh trống bỏ hẳn chứ không còn "— —" (`layouts/app.md`)?
