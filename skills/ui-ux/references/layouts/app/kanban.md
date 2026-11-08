# Bảng kanban

```
○ Cần làm  4      ◉ Đang làm  3     ⋯ Chờ duyệt  2    ✓ Xong      3
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ tiêu đề việc │  │ tiêu đề việc │  │ tiêu đề việc │  │ tiêu đề việc │
│ dự án · hạn  │  │ dự án · hạn  │  │ dự án · hạn  │  │ dự án · xong │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
┌──────────────┐  ┌──────────────┐
│ ...          │  │ ...          │
└──────────────┘  └──────────────┘
```

- **Cột không tô màu riêng.** Đầu cột là icon trạng thái + tên + số đếm, icon và màu icon lấy đúng bảng trạng thái ở `M7` (`circle`, `circle-dot`, `circle-ellipsis`, `circle-check`), cùng hình với hàng nhóm của view danh sách (`D2`). Màu chỉ ở icon `size-4`; nền cột, viền cột, chữ tên cột không màu. Bốn cột bốn nền màu là dấu hiệu chưa quyết định được cái nào quan trọng, và nó phá luật một màu nhấn.
- **Thẻ ở cột Xong không thêm ✓ trước tiêu đề.** Đầu cột đã có `circle-check`, ✓ trên từng thẻ là nói một ý hai lần (`M6`), lại đẩy tiêu đề lệch cột so với thẻ các cột khác. Cột Xong khác ở dòng phụ: "xong 18/09" thay cho hạn chót.
- **Thẻ là card thật**, đây là ngoại lệ hợp lệ của luật `F3`: thẻ kanban là vật kéo thả được, không phải một dòng trong danh sách.
- **Thẻ `p-4`, gap giữa thẻ `gap-3`, gap giữa cột `gap-4`.** Xem `budgets.md`. Đừng hạ xuống `p-3`, chật.
- **Tiêu đề việc không `truncate`**, cho xuống tối đa hai dòng rồi mới cắt. Thẻ hẹp mà cắt một dòng thì đọc không ra việc gì.
- **Cột `w-[248px] shrink-0 grow max-w-[320px]`, hàng bên trong `flex w-max min-w-full`.** Bốn cột vừa khít ở 1366px trở lên khi sidebar mở, rộng hơn thì cột giãn đều tới 320px; hẹp hơn thì cột giữ 248px và cuộn ngang. Cột cứng `w-[280px]` cần 1216px, mà khung nội dung ở 1440px (sidebar `w-64`) chỉ có 1184px: cột Xong hụt 8px ở mép phải, ở 1366px hụt 32px, đúng hai bề rộng laptop hay gặp nhất, trông như lỗi chứ không như "còn nữa". `w-max` giữ lề phải khi cuộn, `min-w-full` cho hàng đủ rộng để cột giãn. Sidebar hoặc lề trang khác thì tính lại: 4 × bề rộng cột + 3 khe + 2 lề ≤ bề rộng khung ở 1366px.
- **Màn hẹp thì cuộn ngang trong khung**, không wrap thành hai hàng. Xem luật `R6` trong `../../responsive.md`. Lề đặt trên hàng bên trong (`flex gap-4 px-3`), không đặt trên khung cuộn, nếu không cột cuối dính sát mép. **Khung cuộn của board không `scrollbar-clean`**: dùng thanh tự ẩn (`I18`) và mép mờ (`R10`). `scrollbar-clean` chỉ dành cho hàng chip, hàng tab (`rules-state.md`); board ẩn hẳn thanh thì người dùng chuột không có bánh xe ngang (Windows) chỉ còn Shift + lăn để thấy cột bị khuất.
- **Nút ⋯ trên thẻ: hiện khi rê hoặc Tab vào thẻ**, như các app board lớn: 16 thẻ là 16 dấu ⋯ đứng yên, nhiễu hơn cả tên việc. `opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 aria-expanded:opacity-100 [@media(hover:none)]:opacity-100` trên chính nút, thẻ là `group` (chỗ vẫn giữ, avatar không nhảy). Khác bảng (`I11`): bảng dò theo cột nên nút luôn hiện, thẻ thì không có cột.
- **Nút ⋯ nằm ở hàng cuối thẻ, ngay trước avatar**, không ở góc trên phải. Hàng cuối `flex h-8 items-center justify-between`: ưu tiên bên trái, bên phải một cụm `flex items-center gap-1` gồm nút ⋯ `size-8` rồi avatar `size-6`. Hàng cuối chỉ có ưu tiên (chữ ngắn) nên dư chỗ; góc trên phải là chỗ của tên việc. Hai cách đã bỏ (cột 248px): nút ở góc trên, tiêu đề `pr-8` giữ chỗ thì 5/15 tên bị cắt "…", còn cho 3 dòng thì ra chữ mồ côi ở dòng 3 kèm một khoảng trống 32px bên phải dòng 1–2; nút đè lên chữ không giữ chỗ (kiểu nút sửa hiện lên khi rê) thì nền nút cắt đôi một chữ ("doanh thu c⋯"). Ở hàng cuối: 1/15 tên bị cắt (tên thật sự dài), thẻ chỉ cao thêm 8px. Không kéo `-my-*` để giữ hàng `h-6`: Button có `max-w-full`, margin âm làm khối bọc co và bóp nút (nút còn 24×32, `N11`).
- **Đầu cột có nút `plus` thêm việc vào cột đó**: icon button ghost `size-8` ở cuối hàng đầu cột (`ml-auto`), `aria-label="Thêm việc vào Cần làm"`, mở form tạo với trạng thái của cột. Board nào cũng có lối thêm ngay tại cột; chỉ có nút ở đầu trang thì thêm xong còn phải kéo thẻ sang cột đúng.
- **Cột rỗng vẫn phải chiếm chỗ**, xem `../../components/empty-state.md`.
- Quá năm cột thì hỏi xem có nên gộp bớt trạng thái không.

## Kéo thả thẻ

Kéo thẻ sang cột khác là đổi trạng thái. Dựng đủ ba đường vào, không chỉ chuột:

- **Chuột: nhích quá 4px mới tính là kéo**, không thì cú bấm run tay thành kéo, và bấm thẻ để mở chi tiết không được.
- **Tay: giữ yên 250ms mới nhấc**, ngón trôi quá 8px trong lúc chờ là đang cuộn, bỏ kéo. Vuốt ngay phải là cuộn board như thường. Thẻ `select-none [-webkit-touch-callout:none]`, không thì giữ lâu ra menu chép chữ của iOS.
- **Bàn phím: thẻ vào được bằng Tab**, `aria-roledescription="thẻ kéo thả được"`, `aria-describedby` trỏ tới câu hướng dẫn `sr-only`: Space nhấc, ← → đổi cột, Space hoặc Enter thả, Esc huỷ. Mỗi bước đọc qua một vùng `aria-live="polite"`: "Đã nhấc … ở cột Cần làm", "Cột Đang làm", "Đã chuyển … sang Đang làm", "Đã huỷ kéo, … vẫn ở Cần làm". Thả xong tiêu điểm vẫn ở thẻ.
- **Thẻ đang cầm là một bản sao nổi**: portal ra `body`, `fixed`, bay theo con trỏ bằng `transform` gắn thẳng vào DOM (không render lại cả board mỗi lần nhích), giữ đúng điểm đã nắm trên thẻ. Viền `--border-strong` + `shadow-lg` vì nó là lớp nổi (`M15`). Không nghiêng, không phóng to (`F22`). Bản sao `inert`, thẻ thật vẫn ở trong cột cho trình đọc màn hình. Nhấc bằng phím thì chính thẻ đó mang viền + bóng này, cùng một ý "đang cầm".
- **Chỗ thả là khung viền đứt `border-foreground/40`, cao đúng bằng thẻ**, đứng đúng vị trí thẻ sẽ nằm theo khoá sắp xếp của cột (cột xếp theo hạn chót thì khung nằm giữa 28/09 và 05/10, không nằm dưới con trỏ). Đậm hơn khung cột rỗng (`foreground/15`): cột rỗng là "chỗ trống", khung này là "rơi vào đây" (`N2`). Số đếm ở đầu hai cột đổi ngay lúc kéo.
- **Cả dải dọc của cột là vùng thả**, tính theo tọa độ ngang, không riêng phần có thẻ: cột ngắn thì thả vào khoảng trống bên dưới vẫn được.
- **Kéo tới mép khung thì board tự cuộn ngang**, nhanh dần khi càng sát mép. Không có thì cột bị khuất không bao giờ thả tới được ở 375px.
- **Nhấc bằng phím mà đổi sang cột đang khuất thì cuộn cả cột đích vào khung**, không chỉ cuộn cho có. Khung cuộn `scroll-px-8` (bằng bề rộng mép mờ `R10`), rồi **chỉ cuộn ngang** khung board: so mép `<section>` của cột với mép khung trừ `scroll-padding`, `scroller.scrollBy({ left })` phần hụt; sau đó `card.scrollIntoView({ block: "nearest", inline: "nearest" })` cho chiều dọc. Đừng `scrollIntoView` trên cả cột: cột cao hơn màn thì trình duyệt canh đỉnh cột, trang nhảy dọc mỗi lần bấm mũi tên. Chỉ cuộn cho có thì ở 1280px, sang cột Xong board dừng ở 40 trên 64px, thẻ đang cầm mất mép phải, nằm dưới mép mờ.
- **Thả xong bản sao bay về chỗ mới** 200ms, `cubic-bezier(0.32, 0.72, 0, 1)` như panel trượt (`overlay.md`), `motion-reduce` thì đặt thẳng. Kéo sang cột Xong thì dòng phụ đổi sang "xong dd/mm" ngay.

**Code mẫu đã duyệt: `app-kanban.html`.** Chép cấu trúc từ đó, đừng dịch lại từ
mấy gạch đầu dòng trên. File đó đã qua vòng tra tấn 375px, cuộn ngang có lề hai
đầu, thẻ `p-4`, chip lọc `h-9`, header `h-16` nền trắng như khung app. Ba chip vừa 375px
nên hàng chip không cuộn; nhiều chip hơn thì theo `R6`, `R10`. File tĩnh, không có menu ⋯,
kéo thả và mép mờ của board: ba thứ đó theo các gạch đầu dòng trên và mục "Kéo thả thẻ".

---

## Kiểm trước khi giao

Chạy cùng cổng 2 của `checklist.md` khi trang có đúng thứ này.

- [ ] **Cột kanban rỗng**: là viền đứt không nền, hay một mảng xám đặc nặng hơn thẻ (`components/empty-state.md`)?
- [ ] **Board kanban ở 1366 và 1440px, sidebar mở**: đủ bốn cột, hay cột cuối hụt vài px ở mép phải? Khung cuộn có `scrollbar-clean` không (không được)? Nút ⋯ nằm ở hàng cuối trước avatar, đo ra 32×32, chỉ hiện khi rê / Tab vào thẻ? Đếm tên việc bị cắt "…" ở cột 248px: quá một hai thẻ là có thứ đang giữ chỗ bên phải tên? Có nút "Thêm việc" trên trang và `plus` ở đầu cột? Kéo thử đủ ba đường: chuột (nhích 4px), giữ tay 250ms, bàn phím Space / ← → / Enter / Esc có đọc qua `aria-live`; kéo tới mép thì board tự cuộn; nhấc bằng phím sang cột cuối thì cột đó nằm trọn trong khung, không dưới mép mờ (`layouts/app.md`, "Kéo thả thẻ").
