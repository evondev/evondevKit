# Checklist

Ba cổng. Mỗi cổng chạy ở một thời điểm khác nhau — đừng gộp làm một lượt cuối.

Mỗi dòng ở đây là một lỗi **đã thật sự xảy ra**. Dòng nào ba vòng test liền không
bắt được lỗi nào thì xoá (luật ở `DEVELOP.md`, mục Thêm luật mới).

---

## Cổng 1 — trước khi viết dòng class đầu tiên

- [ ] **Câu 1 của `SKILL.md`** đã trả lời chưa: nhánh `U` (mặc định cho mọi đề dựng hay làm lại một màn trở lên), soi, dựng lại giữ brand, dựng lại theo gu skill, refactor, dựng luôn hay việc nhỏ hơn một màn? Chưa trả lời thì chưa được đi tiếp.
- [ ] **Đã báo dòng "Audit: …" chưa?** Không có dòng đó là chưa audit, dù có grep hay không.
- [ ] Đã grep `package.json` và `components/ui` chưa — họ dùng Tailwind? shadcn? Hay bộ khác?
- [ ] **Thứ sắp dựng đã có trong codebase chưa?** Grep tên nó (`Avatar`, `Dropdown`, `Modal`…). Có rồi thì dùng, đừng dựng cái thứ hai.
- [ ] **Đã chạy audit tầng 3 (phong cách) chưa?** Dự án có phong cách khác flat thì theo dự án, không hỏi, báo một dòng lúc giao; dự án flat mà tự đổi sang glass là sai (`P1`).
- [ ] Phong cách đã chọn không phải flat: đã mở đúng khối của nó trong `styles.md` và kiểm hết mục **Bẫy** chưa?
- [ ] **Tương phản (`P3`)**: chữ thường ≥ 4.5 : 1, đo ở **chỗ tệ nhất** — đầu nhạt của gradient, vùng sáng nhất phía sau kính. Chữ phụ `/50` là thứ trượt trước.
- [ ] Theo phong cách của dự án nhưng **không theo lỗi** của dự án: vẫn chỉ một nút chính (`I3`), vẫn một màu nhấn (`M3`).
- [ ] **Không có `package.json`?** Vậy sắp đưa code gì ra — `.tsx` hay HTML thuần? Đưa JSX cho dự án không React là hỏng.
- [ ] Đã grep token sẵn có chưa (`--primary`, `--brand`, `font-family`)? Có thì dùng, đừng hỏi.
- [ ] **Copy sắp viết bằng tiếng gì** — đã grep i18n và nhãn hiện có chưa (`T24`)? Người dùng đang viết tiếng gì, để trả lời bằng tiếng đó (`T27`)?
- [ ] Đề bài có từ nào mơ hồ không (bảng, thẻ, danh sách, khung, trang, lịch)?
- [ ] Đề để hở: đã dựng **đủ bộ khối mặc định** trong file layout chưa, hay làm mỏng dính (`S5`)? Không hỏi phạm vi.
- [ ] Nhánh `U`, wireframe: dữ liệu mẫu có mục ở trạng thái suy từ giờ (trễ, quá hạn) không; số khối có đè chữ không; sidebar, panel `sticky` còn dính khi cuộn không; thanh công cụ vừa một dòng ở 1280 không (`U3`)?
- [ ] Nhánh `U`, wireframe: đã tự rà từng phương án ở nấc Màu bằng `--sweep` và soi ảnh 375, 768, 1280 chưa (rê, lớp nổi, hàng lệch), sửa xong mới gửi, tin gửi có dòng "Tự rà" (`U3`)?
- [ ] Nhánh `U`: đã dựng đúng **phương án wireframe đã chọn** chưa, hay tự bịa (`U4`)? Lối dựng luôn: dựng theo phương án sẽ khuyên, báo một dòng "Bố cục: … vì …". Việc nhỏ hơn một màn: **bố cục mặc định** trong file layout, báo một dòng "muốn kiểu khác thì nói".
- [ ] Dự án đã có UI (nhánh `U` hay dựng lại): tin giao có dòng **`Dáng:`** đi qua bảng "Dáng lấy từ skill, không từ CSS cũ" (`review.md`) chưa? Dropdown, checkbox, viền card, thanh cuộn, nút header lấy theo mẫu của skill, hay còn CSS cũ của dự án?
- [ ] Cùng ca đó: tin giao có mục **"Còn thấy"** (`U4`) chưa? Thứ bản dựng không được tự sửa (bớt thông tin, gom màu trang trí, badge nhiều màu tranh với giá) đã nêu thành dòng đánh số, hay giữ nguyên mà im lặng?
- [ ] Đề nhiều hơn một màn? Đã chốt **hợp đồng nguyên tố** (`system.md` `D1`) ở `U4`, trước màn đầu tiên chưa?
- [ ] Người dùng nói "chưa biết muốn UI thế nào" → đã dựng hướng A và báo còn B, C chưa?

---

## Cổng 2 — dựng xong, trước khi báo

- [ ] **Mười hai phép thử `N1`–`N12`** (`principles.md`) đã chạy chưa? Thứ không có dòng riêng trong checklist này thì bám chúng.
- [ ] **Mục kiểm của màn, khối vừa dựng** đã chạy chưa? Mục riêng của app điện thoại (`mobile.md` và file mục J), khung chat, của từng màn (bảo mật, khoá API, thanh toán, thành viên, cài đặt, lịch, lỗi, báo cáo, kanban, bảng nhóm, chi tiết bản ghi, sidebar), màn xác thực, bảng giá, lớp nổi (panel, menu), khối (đường dẫn, logo, accordion, tải tệp, ô số lượng, tên sửa tại chỗ, tiêu đề cột, biểu đồ đường) nằm **cuối file của nó**, mục "Kiểm trước khi giao".

### Phạm vi

- [ ] Đối chiếu với đề bài: có section nào **mình tự thêm** không? Có thì bỏ.
- [ ] Có con số hay chính sách nào mình tự bịa mà lẽ ra phải để `[cần điền]` không?
- [ ] Có dòng nào để `[cần điền]` mà lẽ ra phải điền số giả không?
- [ ] Project có sẵn component mà mình viết lại không?

### Màu

- [ ] Đếm màu nhấn trên màn hình. Nhiều hơn một thì cắt (tag phân loại `M8` và màu nhận diện thực thể `M34` không tính). App có dự án, board, danh mục người dùng tạo mà tên vẫn xám trơn thì thêm chấm màu theo `M34`.
- [ ] **Cả màn có chỗ nào dùng màu nhấn không?** Không có là chưa quyết định, không phải tối giản (`D5`).
- [ ] Có khối nào được tô nền màu chỉ để phân loại không? Phân loại bằng icon + chữ (`M5`).
- [ ] Grep mã hex. Chỉ được có trong khối đổi thương hiệu ở đầu file.
- [ ] Mọi mã hex có đúng 6 hoặc 8 ký tự sau `#` không? Lệch là CSS chết âm thầm.
- [ ] Khối thương hiệu có khớp **từng ký tự** với `tokens.css` không?
- [ ] Có chữ `text-muted` nào nằm trên nền xám đậm hơn nền trang không (`--secondary`, lớp phủ `foreground/5`–`/8`, `--background-hover`)? Có thì đổi sang `text-foreground/70` (`styles.md`).

### Viền, bóng, khối

- [ ] Có `shadow-*` nào trên khối **nằm trong trang** không? Bóng chỉ cho modal/dropdown (`M15`), ngoại lệ trong trang chỉ có ô chọn của tab `segmented` và núm công tắc (`shadow-sm`).
- [ ] Có token viền nào tự đẻ ra ngoài `--border`, `--border-strong`, `--border-focus` không?
- [ ] **Thanh cuộn**: grep `::-webkit-scrollbar` trong CSS gốc ra khối của `tokens.css` chưa, `ScrollbarAutohide` đã mount ở gốc app chưa? Mở một vùng cuộn (trang, sidebar, dropdown dài, bảng cuộn ngang): thấy thanh xám mặc định to là thiếu khối (`I18`). Dự án có token sẵn vẫn phải chép.
- [ ] Có chỗ nào hai khối có viền đứng sát nhau, không khe, thành vạch 2px không (dòng `border-b` dòng cuối chồng viền khung, ô lưới, nhóm nút, header + thanh công cụ)? Chỉ một bên giữ đường giáp ranh: `divide-*` trên cha, lưới `gap-px bg-border`, nút sau `border-l-0` (`F26`).
- [ ] Có đường kẻ `--border` nào nằm thẳng trên nền trang xám (footer, dải tiêu đề, `<hr>`) không? `--border` nhạt hơn nền xám, ra vệt mờ căm: bỏ đường, tách bằng khoảng trắng, hoặc đổi `border-border-strong` (`M14`).
- [ ] Có chỗ nào mỗi mục một card không? Gom thành một khung chia đường kẻ (`F3`).
- [ ] Card chỉ có tiêu đề, không nút ở header: còn `min-h-10` không? Còn thì tiêu đề cách mép trên xa hơn nội dung cách mép dưới, card hẫng đầu (`components/card.md`).
- [ ] Dòng tiêu đề và nút "Xem tất cả" có nằm **trong** khung không?
- [ ] Phần tử nổi bật có mang quá một dấu hiệu không (badge + viền + to hơn)?
- [ ] Bảng có bị bọc vào card không?
- [ ] **Bảng**: rê chuột lên một dòng, nền hover có trùng màu nền trang không? Phải `--surface-hover` (`I10`). Cột trạng thái là badge màu (`M7`)? Từ 3 hành động hoặc có xoá thì đã gom vào nút ba chấm chưa (`I11`)? Tab trạng thái là ô nền `--surface-hover` viền mảnh, không chip đen?
- [ ] Bo góc có nằm trong bốn bậc không, và có bo nhầm link chữ không nền không?

### Nút và trạng thái

- [ ] Nút mặc định có phải **nút viền** không, hay đang là nền nhấn? Icon chỉ ở nút mà glyph gọi đúng hành động; nút form và nút trong modal chỉ có chữ (`I1`)
- [ ] Trong một nhóm có đúng một nút nền nhấn không?
- [ ] Nút phụ có trông như đã bị khoá không? Chữ và nền có đủ chênh không?
- [ ] "Xem tất cả" / "Đọc thêm" (sang màn khác) có đang là nút có nền khi rê không? Phải là link chữ `h-8` không padding ngang, rê vào gạch chân, chữ thẳng mép phải nội dung, không icon mũi tên (`I7`). Nạp thêm tại chỗ ("Xem hoạt động cũ hơn") mới là nút `ghost`.
- [ ] **Rê chuột lên một hàng: có phần tử con nào biến mất không?** (`M18`)
- [ ] Rê chuột lên hàng: nền hover có ôm sát chữ không? Phải có padding đủ bốn phía.
- [ ] Màn chỉ có MỘT card giữa trang trống? Vậy card phải **không viền** (`M29`), và không bao giờ có cả viền lẫn bóng.
- [ ] **Đăng xuất** ở cuối menu sau đường chia, lúc thường trung tính, **rê vào thì đỏ** như mục xoá (`I4`)?
- [ ] **Nút xoá** đứng riêng: nền `rose-500/10` + chữ `rose-700` ngay lúc thường, không viền, không đỏ đặc (`I4`)? **Mục** xoá trong menu: rê vào thì chữ, icon VÀ nền cùng đỏ lên chưa? Icon còn xám là thiếu `group`. Chữ đỏ là `rose-700` chưa, hay đang `rose-500` hồng tươi (3.2:1, trượt tương phản)? Radix thì đi bằng phím mũi tên cũng đỏ (`data-[highlighted]`)?
- [ ] **Công tắc chỉ cho việc gạt là xong.** Bật mà phải quét mã, nhập mật khẩu, xác nhận (xác thực hai lớp, tên miền riêng, gói trả phí) thì là dòng trạng thái + nút mở luồng (`components/choice-controls.md`, "Hàng cài đặt")?
- [ ] Hộp xác nhận chỉ trung tính (icon xám, nút `primary`, ngoại lệ có tên của `I2`) khi **ba câu của `I4` đều "không"** (không mất dữ liệu, không kết thúc thứ đang chạy, không cắt quyền), như gửi lại lời mời hàng loạt, gửi email hàng loạt (`layouts/overlay.md`)? "Không mất dữ liệu" thôi thì chưa đủ: đăng xuất, huỷ gói vẫn đỏ.
- [ ] **Bấm nút làm dòng của nó biến mất** (đăng xuất thiết bị, xoá dòng, gỡ hàng loạt qua hộp xác nhận): `document.activeElement` sau đó là gì? `<body>` là lỗi (`I31`).
- [ ] Đỏ đang dùng đúng sắc chưa (`M30`)? Lỗi là `red`, hành động nguy hiểm lúc rê vào là `rose`. Không có viền hay banner `rose`.
- [ ] Đường chia trong dropdown, card: có chạm hai mép khối không, hay thụt theo padding (`F25`)?
- [ ] **Bo lồng nhau (`M19`)**: bo khung ngoài = bo phần tử trong + padding khung? Dropdown mặc định `rounded-2xl` + `p-1` + mục `rounded-xl` (`layouts/overlay.md`). Command palette rộng thì `p-2` + mục `rounded-lg`. Trong bằng ngoài là góc phình.
- [ ] **Vùng cuộn trong lớp nổi** (select, dropdown dài, command palette): chưa rê chuột, mép dưới có cắt ngang một mục (lộ khoảng nửa) không? Cắt sát ranh giới hai mục là trông như đã hết. Rê chuột vào (không cuộn) thì thanh cuộn có hiện không? Chỉ hiện khi cuộn là đang dùng CSS thanh cuộn cũ (`I18`).
- [ ] **Rê chuột chậm từ mép trái sang mép phải** của từng mục menu, link sidebar, dòng bấm được: con trỏ có giữ bàn tay suốt không? Đổi một lần là vùng bấm hụt (`I29`).
- [ ] Tailwind v4: `<button>` có `cursor-pointer` chưa, hoặc base CSS đã trả lại chưa (`W7`)?
- [ ] **Bấm Tab qua các nút, tab, checkbox**: không có vòng bao ngoài nào (`I13`)? **Trong menu** thì mục đang focus đổi nền như hover.
- [ ] **Bấm Tab qua ô nhập, select**: có viền `--border-focus` **và** ring mờ `--ring-focus` `ring-2` chưa? `ring-4` là quá dày (`F20`). Select đang mở cũng giữ viền + ring.
- [ ] **Không còn control gốc của trình duyệt** (select, ô ngày / giờ, checkbox, radio, thanh trượt, ô chọn tệp), kể cả trong dialog, sheet, popover đang đóng, kể cả khi app cũ đang dùng bản gốc đã tô? Chỉ select, ô ngày chỉ hiện trên mobile mới được để gốc.
- [ ] **Checkbox / radio / công tắc** (`components/choice-controls.md`): cỡ mặc định 20px (công tắc 24×44), không phải 16px? Card chọn: đang chọn có viền + ring, Tab tới không thêm vòng? Khoá thì nhãn mờ theo? Nhóm radio có sẵn một lựa chọn và có `<legend>`? Nhóm xếp một hàng hoặc một cột, không lưới 2×2 (thang Thấp → Khẩn cấp đọc chữ Z)? Ở 375px mỗi lựa chọn là dòng cao 44px bấm được cả dòng?
- [ ] Vừa Tab vừa rê chuột trong menu: có **hai mục sáng cùng lúc** không? Chỉ được một (`data-[highlighted]`).
- [ ] Rê chuột lên **nút chính**: có đổi màu không? Nút `primary` là chỗ hay quên hover nhất (`I9`).
- [ ] **Bấm vào chữ nhãn**: ô có focus không (`for`/`htmlFor`)? Con trỏ có thành bàn tay không?
- [ ] **Bấm vào khoảng trắng bên phải chữ nhãn**: ô KHÔNG được focus. Focus là thiếu `w-fit` (`I26`).
- [ ] Form có ô mật khẩu: có nút hiện/ẩn chưa, và nó có `type="button"` không (`I27`)?
- [ ] Có placeholder nào chỉ chép lại nhãn ("Nhập email của bạn") không? Có thì bỏ (`T25`), trừ màn đăng nhập, đăng ký đứng một mình.
- [ ] Đọc từng câu lỗi: có câu nào **trùng chữ** với placeholder hay nhãn của chính ô đó không? Trùng là bỏ.
- [ ] Chữ đỏ dưới ô có thật sự là lỗi không, hay là **gợi ý bị tô đỏ**? Gợi ý thì xám và hiện sẵn.
- [ ] Form có khu "Cài đặt nâng cao" thu gọn: là dòng chữ có chevron liền sau, không khung (khung lồng trong card lúc đóng trông như ô select)? Ô bên trong cùng mép trái, cùng bề rộng với ô ngoài? Khối cắt `overflow-y-clip` (không `overflow-hidden` cắt quầng focus hai bên)? Bấm gửi khi ô trong khu sai thì khu tự mở và con trỏ vào ô đó? Lựa chọn riêng tư / công khai nằm ngoài khu? (`components/accordion.md`)
- [ ] Nút, ô sửa tại chỗ trong dòng bảng: rê vào có tách khỏi nền dòng đang rê không (`bg-foreground/8`, không `/5`, `I10`)? Cột có nút mũi tên (vai trò, trạng thái) thì các mũi tên có thẳng một cột không (nút rộng bằng nhãn dài nhất)?
- [ ] Nút viền đứng thẳng trên nền trang: rê vào có tan vào nền không? Rê chỉ đổi nền sang màu đặc `--button-hover` (`#f1f1f3`), viền giữ nguyên; `bg-background`, lớp phủ `foreground/5` là tan, viền đậm lên là nặng. Đo pixel nền nút so với nền trang, đừng nhìn class. Nút có mũi tên mở danh sách lựa chọn ("Vai trò ▾", "Mỗi trang 10 ▾") thì **không hover**, cùng class ô Select. Nút lọc dạng dropdown lúc mở có viền + ring như ô Select không (`components/button.md`)?
- [ ] Dự án có ngôn ngữ màu riêng (dòng "màu" ở tầng 3 từ 3 file, hoặc có `--chart-*`) thì màn mới có tô cùng cách không, hay rút về xám lạc giữa các màn cũ? Refactor có lỡ trung tính hoá màu của họ không? Biểu đồ phân loại từ 5 nhóm có mỗi nhóm một sắc, chấm trong bảng khớp màu thanh, tối đa 6 sắc + "Khác" (`principles.md` đầu file, `components/charts.md`)?
- [ ] Hộp xác nhận ở 375px: câu hậu quả, ô gõ lại tên và hai nút có cùng mép trái không, hay thân hộp còn thụt 56px sau icon, ô hẹp hơn nút (`layouts/overlay.md`, Hộp xác nhận)? Probe báo "Ô nhập lệch mép với nút rộng hết khung".
- [ ] Mô tả dưới tiêu đề modal / hộp xác nhận: cách tiêu đề `mt-2` và dòng `text-sm/6`, hay `mt-1` + dòng 20px làm dấu tiếng Việt chạm dòng trên (`T30`)?
- [ ] Toast có trượt vào từ mép màn và trượt ra khi hết giờ không, hay bật "phựt"? Render bằng `{toast && …}` là mất chuyển động ra. Email trong toast nằm tầng dưới, xuống dòng sau `@` (`layouts/overlay.md`, Toast)?
- [ ] Ô mật khẩu có đang lấy `••••••` làm placeholder không? Nhìn y hệt mật khẩu đã gõ (`T26`).
- [ ] Form có yêu cầu độ dài tối thiểu: đã ghi bằng chữ ở dòng gợi ý chưa, hay đợi gõ sai mới báo?
- [ ] Ô có giới hạn tối đa ("Tối đa 120 ký tự"): gõ tới ~80% có bộ đếm cùng dòng gợi ý, căn phải không? Gõ quá có đỏ lên không, hay im lặng? Có `maxlength` cắt mất đuôi câu dán vào không (`layouts/form.md`, "Ô có giới hạn ký tự")?
- [ ] Modal có ô nhập mà bấm ra ngoài vẫn đóng không? (`I20`)
- [ ] Modal đã gỡ dismiss thì **còn đường đóng khác** chưa?
- [ ] Có đủ ba trạng thái chưa: đang tải, rỗng, lỗi? Khung chờ có **đúng hình** nội dung không? Đổi lọc, đổi trang: dữ liệu cũ còn đó với thanh mảnh trên đầu, hay cả bảng thành khung chờ lần nữa? Dữ liệu về nhanh có làm khung chớp không (chờ 300ms, giữ 500ms)? Toggle, kéo thẻ có spinner không (phải đổi ngay)? Lúc chờ có chớp câu rỗng "Chưa có…" không? Tải lần hai hỏng: tab, chip có trả về khớp dữ liệu đang hiện không, hay tab mới sáng trên bảng cũ? Việc chạy nền: còn spinner trong nút song song toast tiến độ không (`components/loading.md`)?
- [ ] Danh sách quá 25 dòng đã có phân trang chưa, và có hiện tổng số không? Ở 375px số đếm có rớt chữ xuống dòng hai cạnh nav không (dưới `sm` chỉ còn tổng, `components/small-controls.md`)?
- [ ] Phân trang: nav có nằm phải cùng hàng ở mọi số trang không? Trang đang chọn có trông như ô input không? Một trang thì đã ẩn nav, 0 dòng thì đã ẩn footer chưa?
- [ ] Toast: rộng theo chữ chưa? Hành động là nút có hover, dồn phải cùng ✕ chưa? Câu dài đã tách hai tầng thay vì vỡ ba dòng chưa? (`layouts/overlay.md`)

### Chữ

- [ ] Tiêu đề khối có lớn hơn chữ bên trong **ít nhất một bậc** không?
- [ ] `body` đã có `antialiased` chưa?
- [ ] Có dòng chữ nào dài quá 75 ký tự không?
- [ ] Có tiêu đề nào rớt lại một chữ ở dòng cuối, hay bị chẻ sai nghĩa không?
- [ ] Có dòng mô tả nào đang bị `truncate` không? Mô tả thì cho xuống dòng.
- [ ] Số xếp cột đã có `tabular-nums` chưa?
- [ ] Font đã nạp chưa, hay đang rơi về `system-ui`?

### Nội dung

- [ ] Có emoji nào trong tiêu đề, câu chào, hay đang đóng vai icon không?
- [ ] Có chữ hướng dẫn thừa không ("Bấm để lưu", chữ "Có" cạnh dấu tick)?
- [ ] Có dấu gạch dài trong câu văn không, ở bất kỳ thứ tiếng nào (`T18`)?
- [ ] Copy tiếng Anh: đã sentence case chưa, số nhiều chia đúng chưa, tiền, số, ngày đã theo locale chưa, có nhãn nào dịch từng chữ từ tiếng Việt không (`T27`, `T28`, `T29`)?
- [ ] Câu giao có cùng tiếng với người dùng không, có câu mẫu tiếng Việt nào lọt vào câu trả lời tiếng Anh không (`T27`)?
- [ ] Nút đăng nhập bằng Google hay Apple đã có logo gốc chưa?
- [ ] Có tự gán mỗi mục một icon khác nhau, hay ba mục ba icon giống hệt nhau?
- [ ] **Có câu nào giống hệt nhau ở mọi ô, mọi hàng không** ("so với 2025" bốn ô, "Chưa có kỳ trước" bốn ô, `/2026` ở mọi mốc giờ)? Kéo ra ghi một lần, hoặc bỏ (`N3`, `T16b`).

### Grep một lượt

```bash
grep -nE "gradient|backdrop-blur|shadow-(xl|2xl)|scale-1|text-transparent|border-dashed|<details|<summary" <file>
grep -nE "(^|[\" '`:])-(m[trblxy]?|space-[xy]|translate-[xy]|inset|top|left|right|bottom)-" <file>
# Dự án viết CSS thuần / CSS Modules / styled: số âm nằm trong giá trị, dòng trên không bắt được
grep -nE "(margin[a-z-]*|inset[a-z-]*|top|left|right|bottom|translate|transform)\s*:[^;]*(\s|\(|:)-[0-9.]" <file.css>
```

Phải sạch, trừ ngoại lệ đã ghi trong luật. `<details>` / `<summary>` không có ngoại lệ: mở/đóng tức thì, không animate được (`I30`).
Dòng grep thứ hai và thứ ba (số âm, `N11`): mỗi kết quả phải có comment lý do ngay trên, không có thì làm lại bằng padding, `gap`, căn hàng. Chỉ grep file mình vừa viết hay sửa; số âm có sẵn của dự án không phải việc của lượt dựng.

---

## Cổng 3 — vòng tra tấn, BẮT BUỘC sau mỗi lần dựng

**Mở trang thật, không trả lời cổng này bằng cách đọc lại code.** Đọc code thì chỉ thấy
thứ mình định viết, không thấy thứ trình duyệt vẽ ra.

0. [ ] **Chạy `scripts/probe.mjs`** (nằm cạnh `SKILL.md`) trên đúng route vừa dựng:
   `node <thư mục skill>/scripts/probe.mjs http://localhost:<cổng>/<route> --sweep`.
   Script mở trang ở 375, 768, 1024, 1280, 1440, 1920px, chụp ảnh từng khổ, rồi kéo bề rộng từ
   1440 xuống 375 mỗi bước 20px để bắt lỗi nằm giữa hai khổ. Nó đo: cuộn ngang, lỗi
   console, tương phản chữ, khung giấu mất chữ, chữ trong nút xuống dòng, chữ bị cắt còn
   dưới 10 ký tự, phần tử cùng loại cao lệch nhau 1–4px, chữ cùng cột lệch mép, chỗ bấm
   dưới 32px ở màn cảm ứng, rê chuột làm nhảy bố cục, trang
   tự cuộn khi tải, dấu câu rơi xuống đầu dòng, dấu ngăn (›, /) cách hai bên không đều. Ở 375px nó tự bấm mở menu,
   hộp chọn, sheet rồi chụp và đo tràn mép, cao quá màn. Phép đo động (Tab, rê, bấm, lớp nổi)
   chỉ chạy ở 375, 768, 1280, khổ khác đo trang đứng yên: đo động ở 1024, 1440, 1920 hầu như
   không ra thêm lỗi mà kéo dài lượt chạy gấp rưỡi.
   - Dev server chưa chạy thì bật ở nền bằng lệnh dev của dự án. Chưa có playwright thì
     cài vào thư mục tạm theo lệnh script in ra, **không cài vào dự án**.
   - **Dựng theo wireframe đã chọn** (nhánh `U`) thì thêm `--wireframe "<link phương án>&mau=mau"`:
     probe so khoảng cách, cỡ và độ đậm chữ, cỡ icon, màu, chữ với wireframe ở 1440 và 375, lệch
     thì vào danh sách `P` (`design-process.md`, `U4`).
   - Trạng thái nằm ở route khác (`/states`, trang rỗng) thì chạy thêm trên route đó. Dự án
     có dark mode thì chạy thêm `--dark`.
   - **Màn có bảng, danh sách, card, ô số liệu thì chạy thêm `--stress`** (`S8`): probe bơm tên
     dài ~60 ký tự và số chín, mười chữ số vào đúng chỗ chứa dữ liệu rồi đo ở 375 và 1280.
     Mọi lỗi bơm ra là lỗi `P` như thường. Sửa bằng cắt chữ có tooltip, `min-w-0`,
     `tabular-nums`, rút gọn số theo `charts.md` (`T13`, `T14`, `T16`), **không sửa bằng cách
     làm dữ liệu mẫu ngắn lại**: khách thật không đặt tên cho vừa card.
   - **Sửa rồi chạy lại cho tới khi mục "Việc phải đối chiếu" ở cuối báo cáo trống**
     (danh sách mã `P1`, `P2`… là lỗi hạng Hỏng máy đo ra, `V1` trong `review.md`), tối đa
     **ba vòng**. Vòng hai trở đi thêm `--dynamic-widths` như dòng "Vòng sửa sau" cuối báo cáo in
     (khổ còn lỗi động, hoặc `none`): phần đứng yên và `--sweep` vẫn đo đủ, chỉ bớt đo động ở khổ
     đã sạch. Các mục khác probe in ra (theo gu của skill) cũng sửa, vì đây là bản mình
     dựng. Mã `P` nào còn lại sau ba vòng, hay để lại có chủ ý (vd chỗ bấm nhỏ trong bảng
     dày), thì lúc giao ghi từng mã và lý do. Không mã nào được biến mất im lặng.
   - **Mở từng ảnh chụp ra xem**, soi theo mười hai phép thử (`principles.md`). Script chỉ đo
     được thứ đo được: "hôm nay đậm hơn ngày đang chọn", "nút Hôm nay tách khỏi ‹ ›" chỉ
     mắt mới thấy.
   - Không mở được trang (không có dev server, không chạy được trình duyệt) thì lúc giao
     nói một dòng: *"Mình chưa mở được trang thật vì …, chưa rà ở màn hẹp."* Không im lặng
     coi như đã rà.

Rồi làm sáu việc trên trang thật (sửa tạm dữ liệu giả để thử, thử xong trả lại):

1. [ ] Thu cửa sổ xuống **375px**. **Trang cuộn ngang là hỏng.**
2. [ ] Vùng nào cuộn ngang thì **cuộn hết sang phải** — phần tử cuối có dính mép không?
   Bảng quản lý ở 768px và 1024px (sidebar mở): còn cuộn ngang không, nút ⋯ của dòng có nằm trong khung không? Khung dưới `@4xl` thì ẩn cột phụ (công ty, ngày tạo) trước khi cho cuộn (`layouts/app.md`, Bảng dữ liệu).
3. [ ] Đổi một tiêu đề thành câu dài **200 ký tự**.
4. [ ] Đổi một con số thành `0`, một con số thành `1.284.500`.
5. [ ] Xoá hết dữ liệu của một danh sách, xem trạng thái rỗng.
6. [ ] Có dark mode thì xem lại toàn bộ ở dark mode.

Kiểm thêm ở 375px:

- [ ] Flex và grid item chứa nội dung động đã có `min-w-0` chưa? (`T13` — nguyên nhân số một của cuộn ngang)
- [ ] Lưới nào còn giữ 2 cột ở mobile không? Phải xuống 1 cột, **trừ hàng ô số liệu**: 2×2 ở mobile, số nào dài quá 138px (tiền đầy đủ hàng tỷ) thì rút gọn hoặc hàng đó về 1 cột; số ô lẻ thì 1 cột (`charts.md`).
- [ ] Hàng chip có rớt xuống hàng dưới một cái lẻ không? Phải cho cuộn ngang. Trừ chip đang lọc (bấm để gỡ): từ `sm` xuống dòng, "Xoá lọc" luôn thấy.
- [ ] Ở desktop, hàng cuộn ngang ẩn thanh cuộn có nút mũi tên ở phía còn mục khuất không? Chuột thường không cuộn ngang được.
- [ ] Board hay dòng thời gian có bị wrap thành 2 hàng không? Phải cuộn ngang trong khung.
- [ ] Ở 375px, mọi hành động chính của dòng (nút trên dòng, panel chi tiết) còn lối vào không, hay bị ẩn cùng lúc (`R11`)?
- [ ] Bảng có bị bóp cột không? Từ `sm` trở lên thì cuộn ngang trong khung, có `min-w`, **cột đầu ghim**; dưới `sm` bảng quản lý thành danh sách dòng (tên + email, badge + số chính), không cuộn ngang. Hàng tab/chip cuộn ngang có mép mờ ở phía còn mục khuất (`R10`)?
- [ ] Trang có **đúng một `<h1>`** không? Trang danh sách: tên trên thanh header là `<h1>`, vùng nội dung không lặp tên. Trang có đầu trang riêng: `<h1>` ở đầu trang, thanh header chỉ ghi cấp cha.
- [ ] Ô tìm `type="search"` có còn nút × của trình duyệt (Chrome tô xanh) không? Phải tắt, và có nút `X` xám tự dựng khi ô có chữ (`components/input.md`).
- [ ] Tìm/lọc ra 0 kết quả: câu có nói đúng thứ đang lọc không, có link "Xoá tìm kiếm"/"Xoá lọc" (cùng chữ với nút cuối hàng chip) không, chỉ có từ khoá thì hàng chip có đang hiện thừa nút "Xoá lọc" không, checkbox chọn tất cả đã ẩn chưa (`components/empty-state.md`)? Ở 375px tab trạng thái có tab nào nằm hẳn ngoài khung không, phải thành dropdown có nhãn "Trạng thái:", căn trái. Hàng cuộn ngang (chip, tab, dải card) có mép mờ ở phía còn mục khuất không, lúc giao đã đề xuất một dòng vạch chỉ vị trí chưa (`R10`, không dựng sẵn)? Người dùng đã chọn vạch thì: vạch nổi, trang không nhảy lúc vạch hiện, mục đang chọn tự cuộn vào giữa.
- [ ] Card ở mobile còn `p-8` không? Phải `p-4`, tối đa `p-5`.
- [ ] Chip lọc có đứng cùng hàng với ô nhập và chênh chiều cao quá một bậc không?
- [ ] Chip lọc: đang chọn là `bg-primary text-primary-foreground` (không gõ cứng màu), trừ chip trong popover có nút Áp dụng (viền đậm, nền `foreground/10`)? Nhãn dài đã `max-w-48` + `truncate` + `title` chưa? Có `aria-pressed` chưa?
- [ ] Nhìn lại một lượt: có chỗ nào **chật dồn cục** không? Chật là chưa xong.

Nếu có dark mode:

- [ ] Có chỗ nào dùng màu nhấn làm **đường mảnh** không (viền focus, gạch chân, chỉ báo đang chọn)? (`M22`)
- [ ] Nền tối: nền trang < card < dropdown / popover có **sáng dần** không? Nền rê và mục đang chọn có **sáng hơn** card (trắng phủ mờ), đang chọn đậm hơn rê một bậc không? Grep `hover:bg-background`, `focus-visible:bg-background`, `data-[highlighted]:bg-background`, và `&& "bg-background` (điều kiện JS: mục đang trỏ, đang chọn): phải ra 0, dùng `bg-item-hover` / `bg-secondary` (`M21`, `I10`). Lớp phủ sau modal là `bg-black/…`, grep `bg-foreground/[2-6]0` trên lớp phủ (`M32`).
- [ ] Grep `text-white`. Chữ trên nền nhấn phải là `--primary-foreground`.
- [ ] `.dark` đã khai lại màu nhấn chưa? Chưa là màu nhấn tàng hình.
- [ ] Có dòng `@custom-variant dark` (Tailwind v4) chưa? Thiếu thì bấm Tối trên máy đang sáng, class `dark:` vẫn sáng (`M31`). `color-scheme` đổi theo theme chưa?
- [ ] Nút đổi theme có đủ Sáng / Tối / Hệ thống, mặc định Hệ thống, không xoay vòng? Tải lại ở chế độ tối có nháy trắng không? Lật theme có chỗ chuyển màu lệch nhịp không (`M31`)?
- [ ] Ô nhập, select ở nền tối còn viền không (`M32`)? Còn mảng nền `-50`, `-100` sáng nào giữa màn tối không (badge, avatar, banner, chip, ảnh nền trắng)? Grep `bg-[a-z]+-(50|100)\b` không kèm `dark:` (`M32`).
- [ ] Lớp nổi dùng `bg-surface-overlay` / `bg-surface` + `border border-border` + `shadow-popover` / `shadow-modal`, không `shadow-lg` trần (`M15`)? Sidebar trượt ở màn hẹp cũng là panel: có `shadow-modal` chưa? Toast, hộp thoại của thư viện có còn nền trắng ở chế độ tối không (`M33`)?
- [ ] Chạy probe thêm `--dark`: mục "DARK MODE" phải rỗng.

> **Bốn vòng test gần nhất, ba lỗi giá trị nhất đều đến từ cổng 3**, không phải
> từ lúc dựng. Không chạy cổng này thì coi như chưa test.
>
> Đây cũng là loại lỗi mà chấm bằng ảnh chụp màn rộng **không bao giờ** thấy.
