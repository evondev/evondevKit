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
- [ ] **OTP input** — "Dựng cho tôi ô nhập mã OTP sáu số, dán cả mã vào được."
- [ ] **Description list** — "Dựng cho tôi khối thông tin dạng nhãn và giá trị cho trang chi tiết khách hàng."
- [ ] **Chart** — "Dựng cho tôi bộ biểu đồ: đường doanh thu theo tháng, cột so sánh theo nhóm, donut tỉ lệ, và sparkline nhỏ trong card số liệu."

## Bậc 1b — UI chưa có mẫu (thử nguyên tắc)

Các đề này **cố ý không có file** trong `components/`. Mục đích là xem skill có
tự dựng tốt thứ nó chưa từng thấy không, bằng cách mượn khuôn gần nhất và chạy
mười phép thử `N1`–`N10` (`skills/ui-ux/references/principles.md`).

**Đừng viết spec trước khi test.** Review xong thì:

- Hỏng vì **nguyên tắc chưa đủ rõ hoặc chưa đủ chung** → sửa `principles.md`, đây là kết quả giá trị nhất của bậc này.
- Hỏng vì chi tiết riêng của component đó → lúc đó mới viết file component.
- Lúc giao, bản dựng phải có dòng *"X chưa có mẫu đã duyệt, mình mượn khuôn của Y"*. Thiếu dòng đó là skill chưa đọc `principles.md`.

- [ ] **Stepper dọc** — "Dựng cho tôi thanh các bước dạng dọc bên trái form đăng ký doanh nghiệp năm bước."
- [ ] **Dòng thời gian** — "Dựng cho tôi dòng thời gian hoạt động của một đơn hàng: tạo đơn, xác nhận, đóng gói, giao hàng, có một bước giao thất bại."
- [ ] **Cây thư mục** — "Dựng cho tôi cây thư mục tài liệu, mở đóng được từng nhánh, có thư mục rỗng và tên file rất dài."
- [ ] **Bình luận lồng nhau** — "Dựng cho tôi khu bình luận có trả lời lồng nhau, có bình luận đã xoá và bình luận đang gửi."
- [ ] **Ô nhập nhiều tag** — "Dựng cho tôi ô nhập email người nhận, gõ xong Enter thành một tag, có email sai định dạng."
- [ ] **Thanh trượt khoảng giá** — "Dựng cho tôi thanh trượt chọn khoảng giá từ 0 tới 50 triệu, có ô nhập số hai đầu."

## Bậc 2 — Khối ghép

- [ ] **Data table** — "Dựng cho tôi bảng khách hàng có tìm kiếm, bộ lọc, phân trang và chọn nhiều dòng để xoá hàng loạt."
      Cần có: button, input, status badge, tabs, dropdown menu, checkbox, pagination, confirm dialog, empty / loading / error state.
- [ ] **Form validation** — "Dựng cho tôi form tạo công việc mới, có hiện lỗi khi nhập sai."
      Cần có: input, select, date picker, button, alert, toast.
- [ ] **Drawer** — "Dựng cho tôi panel bên phải xem nhanh chi tiết một đơn hàng."
      Cần có: status badge, button, dropdown menu, description list.
- [ ] **Command palette** — "Dựng cho tôi command palette mở bằng ⌘K."
      Cần có: input.
- [ ] **Notification panel** — "Dựng cho tôi panel thông báo mở từ chuông trên header."
      Cần có: avatar, tabs, empty state.
- [ ] **File upload** — "Dựng cho tôi khu tải tài liệu lên cho một dự án."
      Cần có: button, progress bar, toast.

## Bậc 3 — Trang

### Ưu tiên 1

- [ ] **Khung app có sidebar** — "Dựng cho tôi khung app dashboard có sidebar, sidebar thu gọn được."
- [ ] **Trang quản lý khách hàng** — ráp data table vào khung app.
- [ ] **Trang chi tiết bản ghi** — "Dựng cho tôi trang chi tiết một khách hàng."
- [ ] **Thành viên và phân quyền** — "Dựng cho tôi trang quản lý thành viên trong workspace, có mời thành viên và đổi vai trò."
- [ ] **Hồ sơ cá nhân** — "Dựng cho tôi trang cài đặt hồ sơ cá nhân."

### Ưu tiên 2

- [ ] **Tổng quan** — "Dựng cho tôi màn hình tổng quan cho app quản lý dự án."
- [ ] **Kanban** — "Dựng cho tôi bảng kanban quản lý công việc, kéo thả giữa các cột trạng thái."
- [ ] **Bảng giá** — "Dựng cho tôi trang bảng giá."
- [ ] **Đăng nhập** — "Dựng cho tôi trang đăng nhập."
- [ ] **Đăng ký** — "Dựng cho tôi trang đăng ký tài khoản."
- [ ] **Quên / đặt lại mật khẩu** — "Dựng cho tôi luồng quên mật khẩu."
- [ ] **Nhập mã OTP** — "Dựng cho tôi màn nhập mã OTP gửi qua email."

### Ưu tiên 3

- [ ] **Form nhiều bước** — "Dựng cho tôi form tạo workspace mới gồm ba bước."
- [ ] **Tuỳ chọn thông báo** — "Dựng cho tôi trang cài đặt thông báo."
- [ ] **Bảo mật** — "Dựng cho tôi trang cài đặt bảo mật, có bật xác thực hai lớp và danh sách phiên đăng nhập."
- [ ] **API key** — "Dựng cho tôi trang quản lý API key."
- [ ] **Gói hiện tại và hoá đơn** — "Dựng cho tôi trang thanh toán, hiện gói đang dùng và lịch sử hoá đơn."
- [ ] **Báo cáo / analytics** — "Dựng cho tôi trang báo cáo doanh thu có chọn khoảng ngày."
- [ ] **Lịch** — "Dựng cho tôi trang lịch cho app quản lý công việc."
- [ ] **Onboarding** — "Dựng cho tôi màn chào mừng lần đầu vào app, có checklist các bước bắt đầu."

### Ưu tiên 4

- [ ] **404 / 403 / 500 / bảo trì** — "Dựng cho tôi bộ trang lỗi: không tìm thấy, không có quyền, lỗi máy chủ, và đang bảo trì."
- [ ] **Khu nguy hiểm** — "Dựng cho tôi phần xoá workspace trong trang cài đặt."
