# Bố cục màn hình trong app — mục lục

> **File này là mục lục.** Mỗi loại màn nằm ở một file trong `app/`, chỉ mở file của màn
> đang dựng. Luật, tài liệu khác trỏ "`layouts/app.md`, mục X" thì tra X ở bảng cuối file này.
>
> **Chốt loại màn hình trước, mở file này sau.** Có sẵn code mẫu kanban thì rất
> dễ đọc mọi đề mơ hồ thành kanban. Xem luật `S10` và `S11` trong `../../SKILL.md`.


Không có wireframe thì dựng bố cục mặc định (hoặc cái mà điều kiện trong đề
chọn), báo một dòng lúc giao. Xem câu 4 trong `../../SKILL.md`. Nhịp ở đây là nhịp app:
`p-5`, `gap-3`, `text-sm`, viền mảnh, bóng gần như không.

## Bố cục nội dung: chọn theo việc chính ⚑

Bố cục nội dung là thứ lấp vùng chứa (`styles.md`, `P13`), chọn theo cột "Đến để làm gì" của
`U2`, **không mặc định "hàng ô số + biểu đồ + bảng"**. Dashboard tổng quan chỉ đúng khi việc chính
là nhìn nhanh nhiều thứ rồi đi tiếp chỗ khác; màn để xử lý lead, ticket, đơn thì bố cục khác.
Các phương án wireframe (`U3`) lấy từ bảng này: hai phương án cùng một dòng là một phương án.

| Bố cục | Việc chính của màn | Ví dụ | Mục |
| --- | --- | --- | --- |
| **Tổng quan khối** | Nhìn nhanh nhiều thứ, mỗi khối dẫn đi chỗ khác | Trang chủ, tổng quan workspace | Dashboard (`app/dashboard.md`) |
| **Bảng trước** | Dò, so, sửa nhiều bản ghi theo cột | Danh sách khách, kho hàng, CRM dạng bảng | Bảng dữ liệu (`app/data-table.md`) |
| **Lưới thực thể** | Nhận ra từng mục bằng hình, liếc vài chỉ số rồi mở một mục | Nhân vật game, nhân sự, xe, sản phẩm, phòng | Lưới thực thể (`app/entity-grid.md`) |
| **Giám sát trực tiếp** | Biết ngay cái gì đang hỏng, số nào đang vượt ngưỡng | Vận hành ca trực, hệ thống, điều phối giao hàng | Màn giám sát trực tiếp (`app/live-monitor.md`) |
| **Danh sách + chi tiết** | Xử lý lần lượt từng mục trong hàng đợi | Hộp thư, ticket hỗ trợ, duyệt đơn, lead mới | Danh sách + chi tiết (`app/filtered-list.md`) |
| **Kanban** | Việc đi qua các trạng thái, kéo sang bước sau | Việc, pipeline bán hàng, tuyển dụng | Bảng kanban (`app/kanban.md`) |
| **Lịch, lưới giờ** | Việc gắn với ngày giờ, người, phòng | Lịch hẹn, ca làm, đặt phòng | Trang lịch (`app/calendar.md`) |
| **Biểu đồ trước** | Hiểu xu hướng, so kỳ, tìm chỗ bất thường | Báo cáo doanh thu, giám sát | Trang báo cáo (`app/report.md`) |
| **Kể bằng số** | Đọc báo cáo từ trên xuống: số chính → xu hướng → chia nhóm → chi tiết | Báo cáo tuần cho lãnh đạo | Trang báo cáo (`app/report.md`), bề mặt Editorial (`P16`) |
| **Hai panel làm việc** | Làm ở một bên, xem kết quả ngay bên kia | Nhập ↔ kết quả, soạn ↔ xem trước, các bước ↔ chạy thử | Hai panel làm việc (`app/two-panel.md`) |
| **Dòng hoạt động** | Ai vừa làm gì, kiểm lại một thay đổi | Nhật ký workspace, lịch sử thay đổi | Trang hoạt động (`app/activity.md`) |
| **Form trước** | Cấu hình, điền thông tin | Cài đặt, hồ sơ, tạo mới | Trang cài đặt (`app/settings.md`), `form.md` |

**Không có trong bảng, không tự làm:** dashboard kéo thả tuỳ biến khối (logic lưu bố cục là của
người dùng, `N10`) và màn canvas dựng luồng, trình vẽ (công cụ riêng, ngoài phạm vi màn app).

---

| Loại màn | File |
| --- | --- |
| Dashboard, các bước bắt đầu (onboarding checklist) | `app/dashboard.md` |
| Khung app: sidebar, header, thu gọn, chân sidebar, nhóm nút header, đầu trang. **Mọi màn trong app** | `app/shell.md` |
| Kiểu khung khác: Inset, Paper, Float, Rail, Topbar, Canvas, header toàn màn | `app/shell-*.md`, chọn theo bảng trong `shell.md` |
| Trang báo cáo (doanh thu, phân tích theo khoảng ngày) | `app/report.md` |
| Lưới thực thể (thẻ có ảnh, chỉ số) | `app/entity-grid.md` |
| Màn giám sát trực tiếp | `app/live-monitor.md` |
| Trang chi tiết bản ghi | `app/record-detail.md` |
| Bảng kanban, kéo thả thẻ | `app/kanban.md` |
| Trang lịch (lịch tháng, lưới giờ trong ngày) | `app/calendar.md` |
| Danh sách có bộ lọc, danh sách + chi tiết | `app/filtered-list.md` |
| Hai panel làm việc | `app/two-panel.md` |
| Trang hoạt động (nhật ký) | `app/activity.md` |
| Bảng dữ liệu, bảng nhóm theo trạng thái | `app/data-table.md` |
| Trang lỗi (404, 403, 500, bảo trì) | `app/error-pages.md` |
| Trang cài đặt, khu cài đặt nhiều trang, tuỳ chọn thông báo | `app/settings.md` |
| Trang hồ sơ cá nhân | `app/profile.md` |
| Trang bảo mật (xác thực hai lớp, phiên đăng nhập) | `app/security.md` |
| Trang khoá API | `app/api-keys.md` |
| Trang thanh toán | `app/billing.md` |
| Trang thành viên và phân quyền | `app/members.md` |

Dựng một màn trong app thì mở `app/shell.md` (khung) cộng file của loại màn đó.

---

## Danh sách rỗng

Một dòng chữ mờ, `py-6`, không hình, không nút. Xem `../components/empty-state.md`.

Chỉ dựng empty state có hình và CTA khi đó là màn hình chính của cả app và người
dùng lần đầu vào chưa có gì để làm.

---

## Tra mục theo tên

Tài liệu khác trỏ "`layouts/app.md`, mục X" hay "`app.md`, X": tìm X ở bảng này rồi mở đúng file.
X không có trong bảng (là tên một dòng in đậm, không phải mục, như "Khung vừa thì ẩn cột phụ") thì
`grep -rln "X" <thư mục này>/app/` ra file chứa nó.

| Mục | File |
| --- | --- |
| Trang hoạt động (nhật ký) | `app/activity.md` |
| Trang khoá API | `app/api-keys.md` |
| Trang thanh toán | `app/billing.md` |
| Trang lịch (lịch tháng) | `app/calendar.md` |
| · Lưới giờ trong ngày (cột theo người, ghế, phòng) | `app/calendar.md` |
| Dashboard | `app/dashboard.md` |
| · Các bước bắt đầu (onboarding) | `app/dashboard.md` |
| Bảng dữ liệu | `app/data-table.md` |
| · Bảng nhóm theo trạng thái (danh sách công việc) | `app/data-table.md` |
| Lưới thực thể | `app/entity-grid.md` |
| Trang lỗi (404, 403, 500, bảo trì) | `app/error-pages.md` |
| Danh sách có bộ lọc | `app/filtered-list.md` |
| · Danh sách + chi tiết | `app/filtered-list.md` |
| Bảng kanban | `app/kanban.md` |
| · Kéo thả thẻ | `app/kanban.md` |
| Màn giám sát trực tiếp | `app/live-monitor.md` |
| Trang thành viên và phân quyền | `app/members.md` |
| Trang hồ sơ cá nhân | `app/profile.md` |
| Trang chi tiết bản ghi | `app/record-detail.md` |
| Trang báo cáo (doanh thu, phân tích) | `app/report.md` |
| Trang bảo mật | `app/security.md` |
| Trang cài đặt | `app/settings.md` |
| · Khu cài đặt có nhiều trang | `app/settings.md` |
| · Trang tuỳ chọn thông báo | `app/settings.md` |
| Mặt nền mở (Canvas) | `app/shell-canvas.md` |
| Sidebar nổi (Floating) | `app/shell-floating.md` |
| Header toàn màn (`full`) | `app/shell-full.md` |
| Khung bọc (Inset) | `app/shell-inset.md` |
| Dải icon (Rail) | `app/shell-rail.md` |
| Menu ngang (Top navigation) | `app/shell-topnav.md` |
| Một mặt phẳng (Unified) | `app/shell-unified.md` |
| Khung app có sidebar | `app/shell.md` |
| · Kiểu khung khác mặc định: mở đúng một file | `app/shell.md` |
| · Ghép điều hướng với vùng chứa | `app/shell.md` |
| · Thu gọn sidebar (từ `lg` trở lên) | `app/shell.md` |
| · Chân sidebar | `app/shell.md` |
| · Nhóm nút bên phải thanh header | `app/shell.md` |
| · Đầu trang trong vùng nội dung | `app/shell.md` |
| Hai panel làm việc | `app/two-panel.md` |
