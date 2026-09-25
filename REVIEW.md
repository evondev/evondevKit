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
   `getComputedStyle` / `getBoundingClientRect`, không đoán bằng mắt. Rê chuột, mở menu xong thì **chờ ~300ms cho `transition` chạy hết** rồi mới đo hay chụp: đo giữa chừng ra màu sai. Đề xuất đổi class thì thử ngay trên trang (gán `style` vào phần tử rồi chụp lại) trước khi ghi vào skill.
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
7. **Quay lại trang đã rà thì đo lại từ đầu.** Người dùng nói "quay lại trang X" hoặc gửi
   lại link sau khi sửa dự án: chạy lại đủ bước 2–5 trên bản mới, kể cả chỗ lần trước đã
   ổn. Bản sửa hay đẻ lỗi mới (vd thêm mũi tên cho ô vai trò thì mũi tên lệch cột, nền ô
   trùng nền dòng). Không trả lời từ trí nhớ của lượt trước.
8. **Báo lại**: danh sách lỗi xếp theo mức nặng, mỗi lỗi kèm chỗ đã sửa trong skill;
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
| 5 | Thành viên và phân quyền | `/dashboard/members` | 25/09/2026 (sáu lượt; `/register`, `/login` đã theo kịp) |
| 6 | Hồ sơ cá nhân | `/dashboard/profile`, `/profile/states` | |
| 7 | Đăng nhập, đăng ký, quên mật khẩu, OTP | `/login`, `/register`, `/forgot-password`, `/forgot-password/verify`, `/forgot-password/new-password`, `/forgot-password/states`, `/verify-otp`, `/verify-otp/states` | 25/09/2026 (sáu lượt; `/register`, `/login` đã theo kịp) |
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
- Màn xác thực (`/login`, `/register`, `/forgot-password`, `/verify-otp`): chưa có logo
  sản phẩm, placeholder, nút Google; `/register` và bước đặt mật khẩu mới còn ô "Nhập lại
  mật khẩu". Luồng quên mật khẩu: phiên hết hạn vẫn để ô mật khẩu và nút Lưu dưới khối lỗi;
  link cuối card nên là "Quay lại đăng nhập".
- `/verify-otp`: bấm Xác nhận khi hàng ô trống thì im lặng. Ô đầu `maxlength="1"` nên tự
  điền mã trên iOS bị cắt còn một số (điền "482917" ra "4"), skill ghi `maxlength="6"`.
- `--color-muted: #828282` trong `src/index.css` chỉ 3,8:1 trên nền trắng (3,5:1 trên nền
  trang), dưới 4,5:1. Kéo theo câu dẫn, "Đổi email", đếm ngược, "Chưa có tài khoản?",
  placeholder ở mọi màn. Đổi sang `#707070` như token của skill.
- `/forgot-password/verify`: chưa gõ số nào mà bấm Xác nhận thì ra "Mã còn thiếu số",
  skill ghi "Chưa nhập mã"; gõ thiếu thì cả sáu ô đỏ, kể cả ô đã có số (skill: chỉ ô trống).
- `/forgot-password/new-password`: chưa có ô `username` ẩn, chưa nói đang đổi cho tài
  khoản nào, con trỏ không nằm sẵn ở ô đầu (`/login`, `/register` cũng vậy).
