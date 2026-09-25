# Rà lại UI bằng link

Khi người dùng nói "đọc REVIEW.md rồi rà" (có thể kèm tên trang), làm theo file này.
Mục đích: rà lại các màn đã dựng ở dự án test bằng cách **tự mở trang thật**, không
review qua ảnh chụp. Ảnh chỉ thấy một bề rộng và một trạng thái đứng yên, nên lỗi về
tương tác và màn hẹp lọt hết (vd ô vai trò bấm được mà không có dấu gì, chỉ lộ khi rê
chuột).

Dự án test: `~/dev/ui-ux-dashboard`, dev server `http://localhost:5173`. Chỉ **đọc**
dự án, không sửa. Mọi thay đổi ghi vào skill (`skills/ui-ux/`).

## Mỗi lượt rà một trang

Mỗi lượt đúng một mục trong bảng dưới: mục người dùng chỉ định, không chỉ định thì mục
chưa tick đầu tiên. Nhiều trang cùng lúc thì lỗi bị lướt và các chỗ sửa skill đè nhau.

1. **Công cụ.** Cài `playwright` vào scratchpad của phiên (`npm i playwright@1.63`),
   không cài vào dự án. Chromium có sẵn ở `~/Library/Caches/ms-playwright`, không cần
   `playwright install`. Dev server không chạy (curl không ra 200) thì dừng lại, nhờ
   người dùng bật.
2. **Chụp ở 375, 768, 1280px** (`deviceScaleFactor: 2`, `fullPage`). Ghi lại
   `scrollWidth` để bắt cuộn ngang, và lỗi console.
3. **Bấm hết các trạng thái**: rê chuột lên dòng và các ô, mở từng menu ⋯, dropdown,
   modal, hộp xác nhận, bấm lọc, chọn nhiều dòng, gửi form rỗng và form sai, chờ toast
   vào và ra, Tab qua các nút xem tiêu điểm. Trang có route `/states` thì mở luôn.
4. **Đo trước khi nói.** Khoảng cách, cỡ chữ, dòng cao, màu viền thì đọc
   `getComputedStyle` / `getBoundingClientRect`, không đoán bằng mắt.
5. **Chấm theo `review-by-eye-first`**: thứ nặng nhất màn có đáng nặng vậy không, một ý
   nói mấy lần, việc chính của trang có thấy ngay không. So với cách hầu hết app làm
   (luật "theo quy ước số đông" trong `principles.md`). Chỗ xấu mà khớp spec thì spec sai.
6. **Tách hai loại lỗi:**
   - **Lỗi của skill** (skill thiếu, sai, hoặc mơ hồ nên bản dựng làm sai): sửa skill
     ngay trong lượt. Sửa spec của component/layout, xem bài học có chung cho nhiều chỗ
     không thì thêm vào `principles.md` hoặc `rules-*.md`, thêm câu hỏi vào
     `checklist.md`. Ghi "đã dính <ngày>" kèm ví dụ thật như các mục khác.
   - **Dự án chưa theo kịp** (skill đã đúng, dự án dựng bằng bản skill cũ hoặc bỏ sót):
     chỉ liệt kê, không sửa dự án.
7. **Báo lại**: danh sách lỗi xếp theo mức nặng, mỗi lỗi kèm chỗ đã sửa trong skill;
   rồi danh sách "dự án chưa theo kịp"; rồi một dòng những gì đã đúng. Tick mục trong
   bảng dưới, ghi ngày. Không commit khi người dùng chưa bảo.

## Thứ tự rà

Trang dùng nhiều và nhiều tương tác đi trước.

| # | Trang | Route | Rà ngày |
| --- | --- | --- | --- |
| 1 | Khung app + tổng quan | `/dashboard` | |
| 2 | Công việc: bảng nhóm, kanban, tạo mới | `/dashboard/tasks`, `/tasks/new`, `/tasks/states` | |
| 3 | Khách hàng: danh sách, xem nhanh, chi tiết | `/dashboard/customers`, `/customers/quick-view`, `/customers/c-030`, `/customers/khong-co`, `/customers/states` | |
| 4 | Đơn hàng: chi tiết, xem nhanh | `/dashboard/orders/detail`, `/orders/quick-view` | |
| 5 | Thành viên và phân quyền | `/dashboard/members` | 25/09/2026 (lượt đầu) |
| 6 | Hồ sơ cá nhân | `/dashboard/profile`, `/profile/states` | |
| 7 | Đăng nhập, đăng ký, OTP | `/login`, `/register`, `/verify-otp`, `/verify-otp/states` | |
| 8 | Bảng giá | `/pricing`, `/pricing/joined` | |
| 9 | Form đăng ký doanh nghiệp | `/business-registration` | |
| 10 | Trợ lý AI | `/dashboard/assistant`, `/assistant/states` | |
| 11 | Tài liệu (cây thư mục) | `/dashboard/projects/documents`, `/documents/states` | |
| 12 | Thông báo | `/dashboard/notifications/states` | |
| 13 | Thư viện component | `/components` | |

Route mới xuất hiện trong dự án thì thêm dòng vào bảng (`grep -rhoE "path: ?['\"][^'\"]+" src`).

## Dự án chưa theo kịp

Ghi dồn ở đây qua các lượt, để người dùng sửa dự án một lần.

- `/dashboard/members`: hộp "Thu hồi lời mời" chưa bọc email bằng `EmailText`, email
  vỡ giữa tên miền ("…hcm@co" / "ngtyminhphat.com.vn"). Toast không có chuyển động vào
  ra (render bằng điều kiện), và khối chữ toast dùng `wrap-anywhere` nên email vỡ giữa
  tên miền.
