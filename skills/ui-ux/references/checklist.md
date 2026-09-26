# Checklist

Ba cổng. Mỗi cổng chạy ở một thời điểm khác nhau — đừng gộp làm một lượt cuối.

Mỗi dòng ở đây là một lỗi **đã thật sự xảy ra**. Dòng nào ba vòng test liền không
bắt được lỗi nào thì xoá (luật ở `SKILL.md` mục 4).

---

## Cổng 1 — trước khi viết dòng class đầu tiên

- [ ] Đây là **refactor** hay **dựng mới**? Chưa trả lời thì chưa được đi tiếp.
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
- [ ] Không có wireframe thì đã dựng **bố cục mặc định** trong file layout chưa, hay tự bịa? Đã báo một dòng "muốn kiểu khác thì nói" chưa?
- [ ] Đề nhiều hơn một màn? Đã chốt **hợp đồng nguyên tố** (`system.md` `D1`) chưa?
- [ ] Người dùng nói "chưa biết muốn UI thế nào" → đã dựng hướng A và báo còn B, C chưa?

---

## Cổng 2 — dựng xong, trước khi báo

- [ ] **Mười phép thử `N1`–`N10`** (`principles.md`) đã chạy chưa? Thứ không có dòng riêng trong checklist này thì bám chúng.

### Phạm vi

- [ ] Đối chiếu với đề bài: có section nào **mình tự thêm** không? Có thì bỏ.
- [ ] Có con số hay chính sách nào mình tự bịa mà lẽ ra phải để `[cần điền]` không?
- [ ] Có dòng nào để `[cần điền]` mà lẽ ra phải điền số giả không?
- [ ] Project có sẵn component mà mình viết lại không?

### Màu

- [ ] Đếm màu nhấn trên màn hình. Nhiều hơn một thì cắt (tag phân loại không tính, `M8`).
- [ ] **Cả màn có chỗ nào dùng màu nhấn không?** Không có là chưa quyết định, không phải tối giản (`D5`).
- [ ] Có khối nào được tô nền màu chỉ để phân loại không? Phân loại bằng icon + chữ (`M5`).
- [ ] Grep mã hex. Chỉ được có trong khối đổi thương hiệu ở đầu file.
- [ ] Mọi mã hex có đúng 6 hoặc 8 ký tự sau `#` không? Lệch là CSS chết âm thầm.
- [ ] Khối thương hiệu có khớp **từng ký tự** với `tokens.css` không?
- [ ] Có chữ `text-muted` nào nằm trên nền xám đậm hơn nền trang không (`--secondary`, lớp phủ `foreground/5`–`/8`, `--background-hover`)? Có thì đổi sang `text-foreground/70` (`styles.md`).

### Viền, bóng, khối

- [ ] Có `shadow-*` nào trên khối **nằm trong trang** không? Bóng chỉ cho modal/dropdown (`M15`), ngoại lệ trong trang chỉ có ô chọn của tab `segmented` và núm công tắc (`shadow-sm`).
- [ ] Có token viền nào tự đẻ ra ngoài `--border`, `--border-strong`, `--border-focus` không?
- [ ] Có chỗ nào mỗi mục một card không? Gom thành một khung chia đường kẻ (`F3`).
- [ ] Card chỉ có tiêu đề, không nút ở header: còn `min-h-10` không? Còn thì tiêu đề cách mép trên xa hơn nội dung cách mép dưới, card hẫng đầu (`components/card.md`).
- [ ] Dòng tiêu đề và nút "Xem tất cả" có nằm **trong** khung không?
- [ ] Phần tử nổi bật có mang quá một dấu hiệu không (badge + viền + to hơn)?
- [ ] Bảng có bị bọc vào card không?
- [ ] **Bảng**: rê chuột lên một dòng, nền hover có trùng màu nền trang không? Phải `--surface-hover` (`I10`). Cột trạng thái là badge màu (`M7`)? Từ 3 hành động hoặc có xoá thì đã gom vào nút ba chấm chưa (`I11`)? Tab trạng thái là ô nền `--surface-hover` viền mảnh, không chip đen?
- [ ] **Bảng nhóm theo trạng thái**: liếc hàng nhóm có tách được nhóm nào với nhóm nào không, hay ba nhóm cùng pill xám? Hàng nhóm và đầu cột kanban cùng icon + tên + số (`M7`, `D2`)? Trong nhóm có xếp theo một khoá, tiêu đề cột đang sắp có mũi tên? Tên người có bị cắt mất tên gọi trong khi cột tiêu đề còn dư? Cột ngắn nào bị bóp còn một chữ (thiếu `whitespace-nowrap`)? Thu nhóm có bọc `<tr>` trong `<div>` trượt không? Rê lên ô sửa tại chỗ của dòng đang rê: ô có nổi lên không, hay nền ô trùng nền dòng? Ô trống mọi cột cùng `—`? Lịch mở từ ô hạn chót có "Xoá hạn" không, hay đặt rồi là hết đường gỡ? "Xoá hạn" là hàng rộng hết bề ngang kiểu mục menu, căn trái, không đỏ, hay một nút nhỏ lẻ loi? Khung chờ có hàng nhóm? View kanban có bị ghi "Bảng" không (`layouts/app.md`)?
- [ ] **Cột kanban rỗng**: là viền đứt không nền, hay một mảng xám đặc nặng hơn thẻ (`components/empty-state.md`)?
- [ ] Bo góc có nằm trong bốn bậc không, và có bo nhầm link chữ không nền không?

### Nút và trạng thái

- [ ] Nút mặc định có phải **nút viền** không, hay đang là nền nhấn? Icon chỉ ở nút mà glyph gọi đúng hành động; nút form và nút trong modal chỉ có chữ (`I1`)
- [ ] Trong một nhóm có đúng một nút nền nhấn không?
- [ ] Nút phụ có trông như đã bị khoá không? Chữ và nền có đủ chênh không?
- [ ] "Xem tất cả" / "Đọc thêm" có đang là nút nền xám hay link chữ trơn không? Phải là nút `ghost` `h-8`, căn phải, không icon mũi tên (`I7`).
- [ ] **Rê chuột lên một hàng: có phần tử con nào biến mất không?** (`M18`)
- [ ] Rê chuột lên hàng: nền hover có ôm sát chữ không? Phải có padding đủ bốn phía.
- [ ] Màn chỉ có MỘT card giữa trang trống? Vậy card phải **không viền** (`M29`), và không bao giờ có cả viền lẫn bóng.
- [ ] **Đăng xuất** ở cuối menu sau đường chia, lúc thường trung tính, **rê vào thì đỏ** như mục xoá (`I4`)?
- [ ] **Nút xoá** đứng riêng: nền `rose-500/10` + chữ `rose-700` ngay lúc thường, không viền, không đỏ đặc (`I4`)? **Mục** xoá trong menu: rê vào thì chữ, icon VÀ nền cùng đỏ lên chưa? Icon còn xám là thiếu `group`. Chữ đỏ là `rose-700` chưa, hay đang `rose-500` hồng tươi (3.2:1, trượt tương phản)? Radix thì đi bằng phím mũi tên cũng đỏ (`data-[highlighted]`)?
- [ ] Đỏ đang dùng đúng sắc chưa (`M30`)? Lỗi là `red`, hành động nguy hiểm lúc rê vào là `rose`. Không có viền hay banner `rose`.
- [ ] Đường chia trong dropdown, card: có chạm hai mép khối không, hay thụt theo padding (`F25`)?
- [ ] **Bo lồng nhau (`M19`)**: bo khung ngoài = bo phần tử trong + padding khung? Dropdown mặc định `rounded-2xl` + `p-1` + mục `rounded-xl` (`layouts/overlay.md`). Command palette rộng thì `p-2` + mục `rounded-lg`. Trong bằng ngoài là góc phình.
- [ ] **Panel thông báo**: có nút "Đánh dấu đã đọc" ở header không? Mục đã đọc có nhạt hơn mục chưa đọc (không chỉ thiếu chấm) không? Bấm sang tab rỗng thì panel có sụp chiều cao không? Tiêu đề dài có bị cắt ở 2 dòng không? Mép trên panel có cách đường kẻ header 8px, hay đường kẻ chọc vào góc bo (`layouts/overlay.md`)?
- [ ] **Panel xem bản ghi có tab** (khách hàng, dự án): cuộn thân thì chỉ hàng tên + ✕ đứng yên, tab dính đỉnh, còn trạng thái và hàng nút cuộn đi chưa? Tên có phải chữ nặng nhất panel, hay số liệu to hơn tên? Ô số liệu là **một khung 2×2** số `text-lg`, hay bốn card rời số `text-3xl`? Kỳ so sánh ghi một lần hay lặp ở từng ô? Khách chưa có đơn nào thì còn lưới số 0 không? Tab tới hàng tab: vòng mờ, hay nền xám (`layouts/overlay.md`, `components/charts.md`, `components/small-controls.md`)?
- [ ] **Trang chi tiết bản ghi**: tab đầu có phải bản ghi con chính (Đơn hàng của khách, Công việc của dự án), là bảng gọn có link sang từng bản ghi, hay phải lội tab Hoạt động mới thấy? Tab bản ghi con có số đếm, tab Tin nhắn / Hoạt động chữ trơn? Email, số điện thoại bấm được và có nút sao chép cạnh giá trị, hay "Gọi điện", "Sao chép email" nằm trong menu ⋯? Mã đơn nhắc tới ở đâu cũng là link? Ô "Đơn đã giao" (12 tháng) và tab "Đơn hàng" (trọn đời) khác số thì nhãn ô đã ghi "· 12 tháng" chưa? Email dài xuống dòng ở sau `@` hay vỡ giữa chữ? "Xem tất cả" cuối bảng căn trái cùng phía "Xem hoạt động cũ hơn"? Khách chưa có đơn thì hàng số liệu đã bỏ chưa, hay còn khung "Chưa có đơn nào" nói trùng tab rỗng? Dòng hoạt động "Đơn đã giao" vòng xám, không phải một cột vòng xanh (`timeline.md`)? Id sai thì có trang "Không tìm thấy" với `<h1>` và lối về danh sách (`layouts/app.md`)?
- [ ] **Trang cài đặt / hồ sơ cá nhân**: hàng có chữ gợi ý hoặc lỗi dưới ô thì nhãn còn thẳng tâm ô, hay tụt xuống giữa ô và dòng chữ (thiếu `sm:items-start` trên hàng)? Avatar lớn trên trang cùng màu với avatar của chính người đó trên header chưa? Xoá trống ô họ tên thì avatar có thành "?" không (phải giữ chữ của tên đã lưu)? Dấu `*` ở nhãn và ở dòng chú thích cùng đỏ chưa? Hàng Email nhiều dòng: nhãn thẳng dòng đầu hay trôi xuống giữa? Có đủ trạng thái có ảnh (Đổi ảnh + Xoá ảnh, cả hai `outline`, Xoá ảnh không đỏ, không ghost xám trông như khoá), đang tải ảnh, email chờ xác nhận? Email trong hộp xoá tài khoản ở 375px xuống dòng sau `@`, hay vỡ giữa tên miền (`layouts/app.md`, "Trang hồ sơ cá nhân")?
- [ ] **Trang thành viên**: ô vai trò đổi được có `ChevronDown` luôn hiện, dòng khoá (chủ sở hữu, chính mình) là chữ trơn không mũi tên, hay phải rê chuột mới biết đổi được? Có cột Trạng thái lặp "Đang hoạt động" trên gần hết các dòng không (chỉ lời mời mới có badge "Chờ chấp nhận" cạnh email)? Lọc vai trò là một dropdown cạnh ô tìm, hay thêm một hàng chip dưới hàng tab? Email của lời mời bị cắt mất tên miền không? Modal mời nhận nhiều email (tag input), email trùng phân biệt "Đã là thành viên" với "Đã mời …, chưa chấp nhận"? Thanh hàng loạt có "Đổi vai trò" (`layouts/app.md`, "Trang thành viên và phân quyền")?
- [ ] **Modal xem bản ghi có nút trước / sau** (chi tiết đơn): modal neo đỉnh hay căn giữa dọc? Bấm Đơn sau sang đơn cao thấp khác thì nút ‹ › có đứng yên dưới con trỏ không? Tới đầu, cuối thì nút mờ nhưng vẫn giữ chỗ, tiêu điểm chuyển sang nút còn lại chưa? Chỉ phần mã `font-mono`? Tiền bám một mép phải, tạm tính đếm theo số lượng, các số cộng trừ có khớp không (`layouts/overlay.md`)?
- [ ] **Vùng cuộn trong lớp nổi** (select, dropdown dài, command palette): chưa rê chuột, mép dưới có cắt ngang một mục (lộ khoảng nửa) không? Cắt sát ranh giới hai mục là trông như đã hết. Rê chuột vào (không cuộn) thì thanh cuộn có hiện không? Chỉ hiện khi cuộn là đang dùng CSS thanh cuộn cũ (`I18`).
- [ ] **Sidebar**: nền trắng chứ không trùng nền trang; vùng nội dung nền xám thì **không `border-r`** giữa sidebar và nội dung; hover và mục đang chọn cùng nền mờ `--background`, không `--secondary`; hover vào thì icon và chữ cùng đậm lên; số đếm là số trơn `text-muted`, không pill, không badge màu brand (`I15`); nhãn nhóm IN HOA, giữa các nhóm không kẻ đường chia (chỉ khoảng trắng + nhãn), profile là hàng không viền có icon `ChevronsUpDown`, nhiều nhóm thì thu gọn được; thanh cuộn tự ẩn (`I18`); tên dài bị cắt thì rê vào có tooltip đủ tên, cả lúc sidebar mở; dưới `lg` sidebar là panel trượt trái, lớp phủ `bg-black/15`, 500/350ms đường cong sheet.
- [ ] **Thu gọn sidebar**: thu về dải icon `w-16`; **mục nào đang hiện lúc mở thì lúc thu vẫn hiện**, nhóm đang đóng vẫn đóng; nhãn nhóm chỉ `opacity-0` + `inert`, giữ chiều cao hàng, **thay bằng gạch ngắn `w-4` thẳng tâm icon**; màn thấp thì mép vùng nav mờ dần ở phía còn mục bị khuất; chấm góc icon chỉ cho số cần xử lý, cùng độ đậm với số lúc mở; mục đang chọn vẫn sáng và được cuộn vào tầm nhìn; lúc thu ẩn thanh cuộn (vẫn cuộn được); bấm mở/thu thì icon, logo, avatar ĐỨNG YÊN (không `justify-center`, không đổi padding), chữ không gỡ khỏi DOM mà bị cắt dần và mờ đi; mỗi icon có tooltip kèm số đếm; focus theo `I13` (`layouts/app.md`).
- [ ] **Chân sidebar**: profile là một hàng `h-10` **không viền**, avatar không viền, icon `ChevronsUpDown` ở mép phải, cả hàng là nút mở menu; lúc thu rê vào thì vòng quanh avatar, không tô ô vuông; email ở đầu menu một dòng, chỉ cắt phần trước `@`, tên miền còn nguyên; menu rộng bằng hàng; Đăng xuất cuối menu, đỏ khi rê (`layouts/app.md`). **Tải lại trang rồi bấm mở ngay lần đầu**, và thu/mở sidebar rồi bấm lại: menu có nằm sát nút không, hay trôi lên đầu sidebar? Menu tự dựng đo chiều cao trước khi có bề rộng là dính lỗi này (`layouts/overlay.md`).
- [ ] **Menu con / menu tài khoản** (`layouts/overlay.md`): bay ra thì hàng đầu thẳng mục cha, mục cha giữ nền sáng, đi chéo chuột sang không tắt? Ở 375px menu con **thay chỗ** menu cha có nút `‹` lùi, hay đang xổ ra bên dưới mục cha? Hàng tài khoản có hàng nào quá hai dòng không (email phải một dòng, cắt phần trước `@`)? Đầu menu mở từ avatar có lặp lại avatar không? Header có avatar mà chân sidebar vẫn còn hàng profile là hai lối vào một menu.
- [ ] **Khung chat** (`components/chat.md`): câu trả lời có vòng avatar robot không (bỏ)? Tên bước công cụ có nhỏ hơn và nhạt hơn câu trả lời không? Mở danh sách công cụ đang chạy: còn hai spinner không? Công cụ lỗi mà vẫn trả lời: có tự mở, có "1 lỗi" đỏ ở hàng đầu không? Mô tả bước có lặp con số câu trả lời sắp nói không? Câu bị dừng có hàng Sao chép / Tạo lại chưa? Gợi ý là nút viền chữ đậm, hay nền xám chữ xám trông như bị khoá? Gợi ý có dài quá một dòng, rộng quá cột câu trả lời không? Chat mới là gợi ý mở đầu, hay "Chưa có tin nhắn nào"? Ô soạn trống: nút gửi mờ `opacity-30`, góc nút song song góc ô (`M19`)?
- [ ] **Rê chuột chậm từ mép trái sang mép phải** của từng mục menu, link sidebar, dòng bấm được: con trỏ có giữ bàn tay suốt không? Đổi một lần là vùng bấm hụt (`I29`).
- [ ] Tailwind v4: `<button>` có `cursor-pointer` chưa, hoặc base CSS đã trả lại chưa (`W7`)?
- [ ] **Bấm Tab qua các nút, tab, checkbox**: có vòng mờ `ring-foreground/50` cách 2px không? Bấm chuột thì không được hiện. **Trong menu** thì mục đang focus đổi nền như hover, không vòng (`I13`).
- [ ] **Bấm Tab qua ô nhập, select**: có viền `--border-focus` **và** ring mờ `--ring-focus` `ring-2` chưa? `ring-4` là quá dày (`F20`). Select đang mở cũng giữ viền + ring (`I13`).
- [ ] **Checkbox / radio / công tắc** (`components/choice-controls.md`): cỡ mặc định 20px (công tắc 24×44), không phải 16px? Card chọn: đang chọn có viền + ring? Khoá thì nhãn mờ theo? Nhóm radio có sẵn một lựa chọn và có `<legend>`?
- [ ] Vừa Tab vừa rê chuột trong menu: có **hai mục sáng cùng lúc** không? Chỉ được một (`data-[highlighted]`).
- [ ] Rê chuột lên **nút chính**: có đổi màu không? Nút `primary` là chỗ hay quên hover nhất (`I9`).
- [ ] **Bấm vào chữ nhãn**: ô có focus không (`for`/`htmlFor`)? Con trỏ có thành bàn tay không?
- [ ] **Bấm vào khoảng trắng bên phải chữ nhãn**: ô KHÔNG được focus. Focus là thiếu `w-fit` (`I26`).
- [ ] Form có ô mật khẩu: có nút hiện/ẩn chưa, và nó có `type="button"` không (`I27`)?
- [ ] Có placeholder nào chỉ chép lại nhãn ("Nhập email của bạn") không? Có thì bỏ (`T25`), trừ màn đăng nhập, đăng ký đứng một mình.
- [ ] Đọc từng câu lỗi: có câu nào **trùng chữ** với placeholder hay nhãn của chính ô đó không? Trùng là bỏ.
- [ ] Chữ đỏ dưới ô có thật sự là lỗi không, hay là **gợi ý bị tô đỏ**? Gợi ý thì xám và hiện sẵn.
- [ ] **Màn xác thực: đã báo một dòng** về "quên mật khẩu" / ghi nhớ đăng nhập / mạng xã hội chưa? Dựng theo mặc định thì được, dựng xong im lặng thì không.
- [ ] Màn đăng nhập, đăng ký có đủ logo sản phẩm, nút Google, placeholder chưa? Đăng ký có đang thừa ô "Nhập lại mật khẩu" không? (`layouts/form.md`)
- [ ] Luồng quên mật khẩu: bước nhập mã có đang xác nhận email có tài khoản không? Phiên hết hạn có còn để ô mật khẩu và nút Lưu dưới khối lỗi không? (`layouts/form.md`)
- [ ] Màn OTP: bấm Xác nhận khi chưa đủ sáu số có ra câu lỗi không, hay im lặng?
- [ ] Màn OTP: "Đổi email" có về form với dữ liệu điền sẵn không? Bấm "Gửi lại mã" có câu "Đã gửi mã mới" (`role="status"`) không? Sai mã, hết hạn có xoá sáu ô và đưa con trỏ về ô đầu không?
- [ ] Trang bảng giá đứng riêng: đầu trang căn giữa, tên trang `sm:text-3xl` (không nhỏ hơn giá)? Dãy gói xếp chồng có `max-w-lg` không (mở ở 768px xem card có kéo dài 650px không)? FAQ là accordion (`components/accordion.md`) trong khung `max-w-3xl`, câu hỏi dài nhất một dòng ở desktop? `h2` cùng font với `h1`? Vạch dưới giá kẻ `--border-strong`? Gói nổi bật là card nền `--primary` với nút trắng, vòng focus có `ring-offset-primary`? Nút gói `h-12`?
- [ ] Có accordion: trượt bằng `grid-rows` (không `<details>`), mục đóng có `inert`? Rê vào tiêu đề: không nền xám, chỉ chevron đậm lên? Tô màu nút, khối bọc, nội dung: nút đều hai mép cả lúc mở, nội dung cùng `px` với nút và lấp kín khối bọc (không `max-w`, không `pr` riêng)? Mục đóng không lòi chữ lúc đang trượt? Tiêu đề `text-pretty`? (`components/accordion.md`)
- [ ] Đường chia "hoặc" kẻ bằng `--border-strong` chưa (`--border` tan trên card trắng)? Nút mắt `size-10` chưa? Form đúng mà bấm gửi có đi tiếp không, hay im lặng? Bước sau có hiện đúng email vừa gõ không?
- [ ] Mọi màn trong luồng xác thực mở ra con trỏ đã nằm ở ô đầu chưa? Form đặt mật khẩu mới có ô `username` ẩn chưa (`I28`)?
- [ ] "Quên mật khẩu?" có nằm cùng hàng với nhãn không? Dưới ô nhập là **tranh chỗ với câu lỗi**.
- [ ] "Quên mật khẩu?" có bị làm mờ không? Mờ là đọc ra disabled (`I8`).
- [ ] Từ ô email bấm Tab có vào thẳng ô mật khẩu không, hay rơi vào "Quên mật khẩu?" trước? Link phải đứng sau ô trong DOM.
- [ ] Sai email hoặc mật khẩu: ô mật khẩu đã xoá và con trỏ nằm trong đó chưa? Khối lỗi có `role="alert"` không?
- [ ] Nút, ô sửa tại chỗ trong dòng bảng: rê vào có tách khỏi nền dòng đang rê không (`bg-foreground/8`, không `/5`, `I10`)? Cột có nút mũi tên (vai trò, trạng thái) thì các mũi tên có thẳng một cột không (nút rộng bằng nhãn dài nhất)?
- [ ] Nút viền đứng thẳng trên nền trang: rê vào có tan vào nền không? Rê phải giữ nền trắng + viền đậm lên (`hover:border-foreground/20`); tô xám nền (`bg-background`, cả lớp phủ `foreground/5`) là tan. Đo pixel nền nút so với nền trang, đừng nhìn class. Nút có mũi tên mở danh sách lựa chọn ("Vai trò ▾", "Mỗi trang 10 ▾") thì **không hover**, cùng class ô Select. Nút lọc dạng dropdown lúc mở có viền + ring như ô Select không (`components/button.md`)?
- [ ] Dự án có ngôn ngữ màu riêng (dòng "màu" ở tầng 3 từ 3 file, hoặc có `--chart-*`) thì màn mới có tô cùng cách không, hay rút về xám lạc giữa các màn cũ? Refactor có lỡ trung tính hoá màu của họ không? Biểu đồ phân loại từ 5 nhóm có mỗi nhóm một sắc, chấm trong bảng khớp màu thanh, tối đa 6 sắc + "Khác" (`principles.md` đầu file, `components/charts.md`)?
- [ ] Mô tả dưới tiêu đề modal / hộp xác nhận: cách tiêu đề `mt-2` và dòng `text-sm/6`, hay `mt-1` + dòng 20px làm dấu tiếng Việt chạm dòng trên (`T30`)?
- [ ] Toast có trượt vào từ mép màn và trượt ra khi hết giờ không, hay bật "phựt"? Render bằng `{toast && …}` là mất chuyển động ra. Email trong toast nằm tầng dưới, xuống dòng sau `@` (`layouts/overlay.md`, Toast)?
- [ ] Ô mật khẩu có đang lấy `••••••` làm placeholder không? Nhìn y hệt mật khẩu đã gõ (`T26`).
- [ ] Form có yêu cầu độ dài tối thiểu: đã ghi bằng chữ ở dòng gợi ý chưa, hay đợi gõ sai mới báo?
- [ ] Modal có ô nhập mà bấm ra ngoài vẫn đóng không? (`I20`)
- [ ] Modal đã gỡ dismiss thì **còn đường đóng khác** chưa?
- [ ] Có đủ ba trạng thái chưa: đang tải, rỗng, lỗi? Khung chờ có **đúng hình** nội dung không?
- [ ] Danh sách quá 25 dòng đã có phân trang chưa, và có hiện tổng số không?
- [ ] Phân trang: nav có nằm phải cùng hàng ở mọi số trang không? Trang đang chọn có trông như ô input không? Một trang thì đã ẩn nav, 0 dòng thì đã ẩn footer chưa?
- [ ] **Tải tệp lên** (`components/file-upload.md`): chỉ tệp đang tải có thanh (`h-1`), tệp xong và tệp hỏng không còn thanh, không còn số %? Tệp hỏng có cả Thử lại lẫn ✕? Đang kéo tệp vào thì viền đậm lên vừa phải, không nét đứt đen? Dòng đổi trạng thái thì các dòng dưới có nhảy không? Tên dài cắt giữa còn đuôi `.pdf` không? Tên cắt giữa có giữ vài ký tự cuối, không thành bốn chấm "….docx"? Icon tệp cùng dáng tờ giấy, viền không bị hình tròn cắt góc? Không có quyền thì ẩn cả khu tải, không dựng khung khoá? Khung bị khoá: tiêu đề là lý do, nền khác lúc kéo vào, có nút lối ra thay cho nút mờ chưa?
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
```

Phải sạch, trừ ngoại lệ đã ghi trong luật. `<details>` / `<summary>` không có ngoại lệ: mở/đóng tức thì, không animate được (`I30`).
Dòng grep thứ hai (số âm, `N11`): mỗi kết quả phải có comment lý do ngay trên, không có thì làm lại bằng padding, `gap`, căn hàng.

---

## Cổng 3 — vòng tra tấn, BẮT BUỘC sau mỗi lần dựng

Không cần dựng file mới. Mở lại file đã có rồi làm sáu việc:

1. [ ] Thu cửa sổ xuống **375px**. **Trang cuộn ngang là hỏng.**
2. [ ] Vùng nào cuộn ngang thì **cuộn hết sang phải** — phần tử cuối có dính mép không?
3. [ ] Đổi một tiêu đề thành câu dài **200 ký tự**.
4. [ ] Đổi một con số thành `0`, một con số thành `1.284.500`.
5. [ ] Xoá hết dữ liệu của một danh sách, xem trạng thái rỗng.
6. [ ] Có dark mode thì xem lại toàn bộ ở dark mode.

Kiểm thêm ở 375px:

- [ ] Flex và grid item chứa nội dung động đã có `min-w-0` chưa? (`T13` — nguyên nhân số một của cuộn ngang)
- [ ] Lưới nào còn giữ 2 cột ở mobile không? Ô số liệu phải xuống 1 cột.
- [ ] Hàng chip có rớt xuống hàng dưới một cái lẻ không? Phải cho cuộn ngang.
- [ ] Board hay dòng thời gian có bị wrap thành 2 hàng không? Phải cuộn ngang trong khung.
- [ ] Bảng có bị bóp cột không? Từ `sm` trở lên thì cuộn ngang trong khung, có `min-w`, **cột đầu ghim**; dưới `sm` bảng quản lý thành danh sách dòng (tên + email, badge + số chính), không cuộn ngang. Hàng tab/chip cuộn ngang có mép mờ ở phía còn mục khuất (`R10`)?
- [ ] Trang có **đúng một `<h1>`** không? Trang danh sách: tên trên thanh header là `<h1>`, vùng nội dung không lặp tên. Trang có đầu trang riêng: `<h1>` ở đầu trang, thanh header chỉ ghi cấp cha.
- [ ] Ô tìm `type="search"` có còn nút × của trình duyệt (Chrome tô xanh) không? Phải tắt, và có nút `X` xám tự dựng khi ô có chữ (`components/input.md`).
- [ ] Tìm/lọc ra 0 kết quả: câu có nói đúng thứ đang lọc không, có link "Xoá tìm kiếm"/"Xoá lọc" (cùng chữ với nút cuối hàng chip) không, chỉ có từ khoá thì hàng chip có đang hiện thừa nút "Xoá lọc" không, checkbox chọn tất cả đã ẩn chưa (`components/empty-state.md`)? Ở 375px tab trạng thái có tab nào nằm hẳn ngoài khung không, phải thành dropdown có nhãn "Trạng thái:", căn trái. Hàng cuộn ngang (chip, tab, dải card) có mép mờ ở phía còn mục khuất không, lúc giao đã đề xuất một dòng vạch chỉ vị trí chưa (`R10`, không dựng sẵn)? Người dùng đã chọn vạch thì: vạch nổi, trang không nhảy lúc vạch hiện, mục đang chọn tự cuộn vào giữa.
- [ ] Card ở mobile còn `p-8` không? Phải `p-4`, tối đa `p-5`.
- [ ] Chip lọc có đứng cùng hàng với ô nhập và chênh chiều cao quá một bậc không?
- [ ] Chip lọc: đang chọn là `bg-primary text-primary-foreground` (không gõ cứng màu)? Nhãn dài đã `max-w-48` + `truncate` + `title` chưa? Có `aria-pressed` chưa?
- [ ] Nhìn lại một lượt: có chỗ nào **chật dồn cục** không? Chật là chưa xong.

Nếu có dark mode:

- [ ] Có chỗ nào dùng màu nhấn làm **đường mảnh** không (viền focus, gạch chân, chỉ báo đang chọn)? (`M22`)
- [ ] Nút phụ có **chìm hơn** card không, hay đang nổi lên? Thang bề mặt phải cùng thứ tự ở cả hai theme (`M21`).
- [ ] Grep `text-white`. Chữ trên nền nhấn phải là `--primary-foreground`.
- [ ] `.dark` đã khai lại màu nhấn chưa? Chưa là màu nhấn tàng hình.

> **Bốn vòng test gần nhất, ba lỗi giá trị nhất đều đến từ cổng 3**, không phải
> từ lúc dựng. Không chạy cổng này thì coi như chưa test.
>
> Đây cũng là loại lỗi mà chấm bằng ảnh chụp màn rộng **không bao giờ** thấy.
