# Danh sách UI cần làm

Làm từ nhỏ lên lớn: component riêng lẻ trước, chốt đẹp rồi mới ráp thành khối,
cuối cùng mới tới trang. Trang mà hỏng thì thường là do một component bên trong
chưa chốt, test trang trước là sửa một lúc năm chỗ.

Mỗi mục ghi **Cần có** là những component phải xong trước.

**Chốt xong một component thì ghi ngược vào skill**, không thì bậc 2, bậc 3 lại
dựng lại từ đầu và mỗi trang một kiểu:

1. Ghi công thức đã duyệt vào `skills/ui-ux/references/components/<tên>.md` (có rồi thì sửa file đó).
2. Chưa có dòng trong bảng "Mở khi dựng đúng khối đó" của `SKILL.md` thì thêm vào.
3. Rà các file `layouts/` đang nhắc tới component đó, sửa cho khớp bản mới.
4. Tick mục ở đây.

Tới bậc 2, bậc 3 thì chỉ **ráp** từ các file đó, không vẽ lại.

**Đề có ảnh tham khảo** (trang thiết kế, sản phẩm khác) thì chỉ mượn **bố cục và cách tổ
chức**, hình thức vẫn theo skill. Gửi ảnh kèm câu "ảnh này chỉ là wireframe", để skill
đọc theo `S12` nhánh wireframe, không bám màu và bóng của ảnh.

**Thứ tự lớn:** bậc 1 → 1b → 2 → 3 → dark mode → rà hết `REVIEW.md` → phase 2 refactor
(`BACKLOG.md`, mục "Phase 2") → vòng tiếng Anh.

- Dark mode đi trước phần rà còn lại: mỗi lượt rà chụp luôn cả sáng lẫn tối, rà một lần
  là xong trang. Làm sau thì trang nào cũng phải rà thêm một vòng chỉ cho nền tối.
- Refactor đợi luật đứng yên: danh sách "đề xuất sửa" của nhánh đó dựa trên luật của skill.
- Tiếng Anh sau cùng: chỉ kiểm chữ, không đổi bố cục hay màu.

## Bậc 1 — Component riêng lẻ

- ✅ **Button** — "Dựng cho tôi bộ nút: nút chính, nút viền, nút chỉ icon, nút xoá, đủ trạng thái hover, focus, đang tải, bị khoá."
- ✅ **Input** — "Dựng cho tôi ô nhập: thường, có icon, có lỗi, bị khoá, ô mật khẩu có nút hiện/ẩn, và textarea."
- ✅ **Status badge** — "Dựng cho tôi badge trạng thái cho đơn hàng: chờ xử lý, đang giao, đã giao, đã huỷ."
- ✅ **Tabs** — "Dựng cho tôi thanh tab chuyển trạng thái trên danh sách, có số đếm từng tab."
- ✅ **Filter chip** — "Dựng cho tôi hàng chip lọc theo nhãn, chọn được nhiều cái."
- ✅ **Dropdown menu** — "Dựng cho tôi nút ba chấm mở menu thao tác: sửa, nhân bản, xoá."
- ✅ **Checkbox, radio, switch** — "Dựng cho tôi checkbox, radio và công tắc bật tắt, đủ trạng thái."
- ✅ **Select** — "Dựng cho tôi ô chọn có tìm kiếm bên trong."
- ✅ **Avatar** — "Dựng cho tôi avatar: có ảnh, chữ cái đầu, và nhóm avatar chồng nhau."
- ✅ **Tooltip** — "Dựng cho tôi tooltip cho các nút chỉ có icon."
- ✅ **Pagination** — "Dựng cho tôi thanh phân trang có tổng số dòng và chọn số dòng mỗi trang."
- ✅ **Toast** — "Dựng cho tôi thông báo toast: thành công, lỗi, và có nút hoàn tác."
- ✅ **Confirm dialog** — "Dựng cho tôi hộp thoại xác nhận xoá dự án."
- ✅ **Empty / loading / error state** — "Dựng cho tôi ba trạng thái cho một danh sách: chưa có dữ liệu, đang tải, và lỗi tải dữ liệu."
- ✅ **Modal** — "Dựng cho tôi modal mời thành viên, có form bên trong và nút huỷ, gửi."
- ✅ **Card** — "Dựng cho tôi card thường có tiêu đề và nút bên phải, và card số liệu hiện doanh thu tháng này so với tháng trước."
- ✅ **Page header** — "Dựng cho tôi phần đầu trang có breadcrumb, tiêu đề, mô tả ngắn và các nút hành động bên phải."
- ✅ **Date picker** — "Dựng cho tôi ô chọn ngày, và ô chọn khoảng ngày có sẵn các mốc 7 ngày, 30 ngày, tháng này."
- ✅ **Time picker** — "Dựng cho tôi ô chọn thời gian, có giờ phút giây"
- ✅ **Alert** — "Dựng cho tôi thanh thông báo trong trang: thông tin, cảnh báo sắp hết hạn gói, và lỗi."
- ✅ **Progress bar** — "Dựng cho tôi thanh tiến độ: dung lượng đã dùng, tiến độ tải file, và tiến độ checklist."
- ✅ **Stepper** — "Dựng cho tôi thanh các bước cho form ba bước, có bước đã xong, đang làm, chưa tới."
- ✅ **OTP input** — "Dựng cho tôi ô nhập mã OTP sáu số, dán cả mã vào được."
- ✅ **Description list** — "Dựng cho tôi khối thông tin dạng nhãn và giá trị cho trang chi tiết khách hàng."
- ✅ **Chart** — "Dựng cho tôi bộ biểu đồ: đường doanh thu theo tháng, cột so sánh theo nhóm, donut tỉ lệ, và sparkline nhỏ trong card số liệu."
- ✅ **Accordion** — "Dựng cho tôi phần Cài đặt nâng cao thu gọn được trong form tạo dự án, bên trong có ô nhập và công tắc."
      Mẫu đã có (`components/accordion.md`) nhưng mới chạy ở FAQ trang giá, nội dung chỉ là chữ. Đề này thử nội dung có thứ bấm được: Tab có lọt vào mục đang đóng không, mở ra thì ô nhập có bị cắt vòng focus không.
- ✅ **Tiêu đề cột sắp xếp** — "Dựng cho tôi tiêu đề cột bảng sắp xếp được theo tên, ngày tạo và doanh thu: tăng, giảm, và chưa sắp xếp."
- ✅ **Ô nhập số** — "Dựng cho tôi ô nhập số lượng có nút tăng giảm, tối thiểu 1, tối đa 99."
- ✅ **Sửa tại chỗ** — "Dựng cho tôi tên dự án sửa tại chỗ: bấm vào để sửa, Enter lưu, Esc huỷ, để trống thì báo lỗi."

## Bậc 1b — UI chưa có mẫu (thử nguyên tắc)

Các đề này **cố ý không có file** trong `components/`. Mục đích là xem skill có
tự dựng tốt thứ nó chưa từng thấy không, bằng cách mượn khuôn gần nhất và chạy
mười phép thử `N1`–`N10` (`skills/ui-ux/references/principles.md`).

**Đừng viết spec trước khi test.** Review xong thì:

- Hỏng vì **nguyên tắc chưa đủ rõ hoặc chưa đủ chung** → sửa `principles.md`, đây là kết quả giá trị nhất của bậc này.
- Hỏng vì chi tiết riêng của component đó → lúc đó mới viết file component.
- Lúc giao, bản dựng phải có dòng _"X chưa có mẫu đã duyệt, mình mượn khuôn của Y"_. Thiếu dòng đó là skill chưa đọc `principles.md`.

- ✅ **Stepper dọc** — "Dựng cho tôi thanh các bước dạng dọc bên trái form đăng ký doanh nghiệp năm bước."
- ✅ **Dòng thời gian** — "Dựng cho tôi dòng thời gian hoạt động của một đơn hàng: tạo đơn, xác nhận, đóng gói, giao hàng, có một bước giao thất bại."
- ✅ **Cây thư mục** — "Dựng cho tôi cây thư mục tài liệu, mở đóng được từng nhánh, có thư mục rỗng và tên file rất dài."
- ✅ **Bình luận lồng nhau** — "Dựng cho tôi khu bình luận có trả lời lồng nhau, có bình luận đã xoá và bình luận đang gửi."
- ✅ **Ô nhập nhiều tag** — "Dựng cho tôi ô nhập email người nhận, gõ xong Enter thành một tag, có email sai định dạng."
- ✅ **Thanh trượt khoảng giá** — "Dựng cho tôi thanh trượt chọn khoảng giá từ 0 tới 50 triệu, có ô nhập số hai đầu."
- ✅ **Dropdown đa cấp** — "Dựng cho tôi menu tài khoản mở từ avatar trên header, có mục Chuyển tài khoản mở ra menu con danh sách tài khoản."
- ✅ **Chat UI** — "Dựng cho tôi khung chat với trợ lý AI: tin nhắn hai phía, câu trả lời đang chạy ra, bước dùng công cụ thu gọn được, gợi ý câu hỏi tiếp và ô soạn tin."

## Bậc 2 — Khối ghép

- ✅ **Data table** — "Dựng cho tôi bảng khách hàng có tìm kiếm, bộ lọc, phân trang và chọn nhiều dòng để xoá hàng loạt."
  Cần có: button, input, status badge, tabs, dropdown menu, checkbox, pagination, confirm dialog, empty / loading / error state.
- ✅ **Form validation** — "Dựng cho tôi form tạo công việc mới, có hiện lỗi khi nhập sai."
  Cần có: input, select, date picker, button, alert, toast.
- ✅ **Drawer** — "Dựng cho tôi panel bên phải xem nhanh chi tiết một đơn hàng."
  Cần có: status badge, button, dropdown menu, description list.
- ✅ **Command palette** — "Dựng cho tôi command palette mở bằng ⌘K."
  Cần có: input.
- ✅ **Notification panel** — "Dựng cho tôi panel thông báo mở từ chuông trên header."
  Cần có: avatar, tabs, empty state.
- ✅ **File upload** — "Dựng cho tôi khu tải tài liệu lên cho một dự án."
  Cần có: button, progress bar, toast.
- ✅ **Drawer phức tạp** — "Dựng cho tôi panel bên phải xem chi tiết một khách hàng: nút thao tác nhanh, các tab Chi tiết / Tin nhắn / Tệp / Hoạt động, và vài card số liệu."
  Cần có: drawer, tabs, description list, card, button, avatar.
- ✅ **Modal phức tạp** — "Dựng cho tôi modal xem chi tiết đơn hàng: mã đơn có nút sao chép, trạng thái, danh sách sản phẩm, thanh toán, và nút sang đơn trước / đơn sau."
  Cần có: modal, status badge, list row, card, button, tooltip.
- ✅ **Bảng phức tạp** — "Dựng cho tôi danh sách công việc nhóm theo trạng thái, mỗi nhóm thu gọn được, có cột ưu tiên, người phụ trách, hạn chót, và chuyển giữa các view."
  Cần có: data table, tabs, status badge, avatar, dropdown menu, date picker.
- ✅ **Popover lọc** — "Dựng cho tôi nút Lọc trên bảng công việc, mở popover chọn người phụ trách, khoảng ngày và mức ưu tiên, có Áp dụng và Xoá lọc, nút hiện số bộ lọc đang bật."
  Cần có: button, select, date picker, filter chip.

## Bậc 3 — Trang

### Ưu tiên 1

- ✅ **Khung app có sidebar** — "Dựng cho tôi khung app dashboard có sidebar, sidebar thu gọn được."
- ✅ **Trang quản lý khách hàng** — ráp data table vào khung app.
- ✅ **Trang chi tiết bản ghi** — "Dựng cho tôi trang chi tiết một khách hàng."
- ✅ **Thành viên và phân quyền** — "Dựng cho tôi trang quản lý thành viên trong workspace, có mời thành viên và đổi vai trò."
- ✅ **Hồ sơ cá nhân** — "Dựng cho tôi trang cài đặt hồ sơ cá nhân."

### Ưu tiên 2

- ✅ **Tổng quan** — "Dựng cho tôi màn hình tổng quan cho app quản lý dự án."
- ✅ **Kanban** — "Dựng cho tôi bảng kanban quản lý công việc, kéo thả giữa các cột trạng thái."
- ✅ **Bảng giá** — "Dựng cho tôi trang bảng giá."
- ✅ **Đăng nhập** — "Dựng cho tôi trang đăng nhập."
- ✅ **Đăng ký** — "Dựng cho tôi trang đăng ký tài khoản."
- ✅ **Quên / đặt lại mật khẩu** — "Dựng cho tôi luồng quên mật khẩu."
- ✅ **Nhập mã OTP** — "Dựng cho tôi màn nhập mã OTP gửi qua email."

### Ưu tiên 3

- ✅ **Form nhiều bước** — "Dựng cho tôi form tạo workspace mới gồm ba bước."
- ✅ **Tuỳ chọn thông báo** — "Dựng cho tôi trang cài đặt thông báo."
- ✅ **Bảo mật** — "Dựng cho tôi trang cài đặt bảo mật, có bật xác thực hai lớp và danh sách phiên đăng nhập."
- ✅ **API key** — "Dựng cho tôi trang quản lý API key."
- [ ] **Gói hiện tại và hoá đơn** — "Dựng cho tôi trang thanh toán, hiện gói đang dùng và lịch sử hoá đơn."
- [ ] **Báo cáo / analytics** — "Dựng cho tôi trang báo cáo doanh thu có chọn khoảng ngày."
- ✅ **Lịch** — "Dựng cho tôi trang lịch cho app quản lý công việc."
- ✅ **Onboarding** — "Dựng cho tôi màn chào mừng lần đầu vào app, có checklist các bước bắt đầu."

### Ưu tiên 4

- [ ] **404 / 403 / 500 / bảo trì** — "Dựng cho tôi bộ trang lỗi: không tìm thấy, không có quyền, lỗi máy chủ, và đang bảo trì."
- [ ] **Khu nguy hiểm** — "Dựng cho tôi phần xoá workspace trong trang cài đặt."

## Dark mode

Làm sau bậc 3, trước phần rà còn lại của `REVIEW.md`. Skill mặc định chỉ light (`M20`),
nên đây là đề **người dùng tự xin dark mode** cho dự án đang có. Dự án test chưa có
dark mode: chưa có khối `.dark`, chưa có nút đổi theme.

Mục đầu là đề thật. Các mục sau **không gõ đề**, chỉ bật nền tối trên màn đã ✅ rồi soi
cho tới khi ổn. Mỗi mục chụp cả sáng lẫn tối ở 375 và 1280px, bấm đủ trạng thái như
`REVIEW.md` bước 3.

Mỗi mục kiểm:

- Thang bề mặt `nút phụ → nền trang → card` giữ đúng thứ tự ở cả hai theme (`M21`).
- Màu nhấn gần trắng chỉ làm nền, đường mảnh (viền focus, gạch chân tab, chỉ báo đang
  chọn) hạ độ đục (`M22`).
- Không còn mảng trắng cứng (`bg-white`, `#fff`, nền `-50` của màu trạng thái), chữ đen
  trên nền tối, viền biến mất, bóng làm việc mà viền phải làm (`M23`).
- Nền hover so với nền card và nền trang tối vẫn thấy, không khuyết mảng (`REVIEW.md` bước 4).
- Chữ phụ, placeholder, chữ trạng thái đạt 4,5:1 trên nền tối; viền và vòng focus đạt 3:1.

Chốt xong thì ghi ngược vào skill như bậc 1: token vào `tokens.css`, luật chung vào
`rules-color.md` (`M20`–`M23`), chỗ riêng của component vào file `components/` của nó.

- [ ] **Bật dark mode** — "Thêm dark mode cho app, có nút đổi sáng / tối trên header, mặc định theo hệ điều hành."
      Kiểm thêm: nút đổi theme nằm đâu và nói gì, lựa chọn được nhớ sau khi tải lại, tải trang ở chế độ tối không nháy trắng.
- [ ] **Khung app + tổng quan** — sidebar, header, card số liệu, biểu đồ (`/dashboard`).
- [ ] **Bảng** — bảng khách hàng: dòng hover, dòng đang chọn, cột ghim, chip lọc, tab trạng thái (`/dashboard/customers`).
- [ ] **Lớp nổi** — modal, hộp xác nhận xoá, drawer, dropdown, popover lọc, toast, tooltip: lớp nổi phải tách khỏi nền tối bằng viền, không nhờ bóng.
- [ ] **Form** — ô nhập thường / lỗi / khoá / focus, select, date picker, checkbox, công tắc, alert (`/dashboard/tasks/new`).
- [ ] **Badge và biểu đồ** — badge trạng thái, thanh tiến độ, bốn loại biểu đồ: màu mang nghĩa vẫn phân biệt được, nền badge không thành khối sáng.
- [ ] **Màn xác thực** — đăng nhập, OTP (`/login`, `/verify-otp`): màn không có khung app bọc ngoài, card nằm thẳng trên nền trang tối.

## Vòng tiếng Anh

Làm sau cùng, sau phase 2.

Chạy lại vài đề đã ✅, lần này **gõ đề bằng tiếng Anh, dự án trống**, rồi so ảnh
với bản tiếng Việt. Bố cục, màu, khoảng thở phải y như nhau. Chỉ chữ được khác.

Mỗi đề kiểm bốn thứ:

- Câu trả lời và câu giao toàn tiếng Anh, không lọt câu mẫu tiếng Việt nào (`T27`).
- Nhãn là nhãn tiếng Anh quen dùng, sentence case, không dịch từng chữ (`T27`, `T29`).
- Tiền, số, ngày, số nhiều, chữ cái avatar theo `T28`.
- Không dấu gạch dài trong câu văn (`T18`).

Thêm một đề **trộn**: gõ tiếng Anh vào dự án đang có nhãn tiếng Việt. Đúng là trả
lời tiếng Anh, nhãn mới vẫn tiếng Việt, không hỏi.

- [ ] **Data table** — "Build me a customer table with search, filters, pagination, and multi-select for bulk delete."
- [ ] **Form validation** — "Build me a create-task form that shows errors when input is invalid."
- [ ] **Drawer** — "Build me a right-side panel for a quick look at an order's details."
- [ ] **Card số liệu** — "Build me a regular card with a title and a button on the right, and a stat card showing this month's revenue compared to last month."
- [ ] **Avatar** — "Build me avatars: with image, with initials, and an overlapping avatar group."
- [ ] **Date picker** — "Build me a date picker, and a date range picker with presets for 7 days, 30 days, and this month."
- [ ] **Trang chi tiết bản ghi** — "Build me a customer detail page."
- [ ] **Trộn** — trong một dự án đã có nhãn tiếng Việt: "Add a notification panel that opens from the bell in the header."
