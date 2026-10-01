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
2. **Chạy `skills/ui-ux/scripts/probe.mjs <url> --sweep --dpr 2 --pw <thư mục playwright>`
   trước**, giống bản dựng chạy ở cổng 3. Script chụp 375, 768, 1024, 1280, 1440px (`fullPage`),
   quét bề rộng 1440→375, ghi cuộn ngang, lỗi console và các lỗi đo được. **Lượt rà tìm ra một lỗi đo được mà
   probe không báo** (lệch px, tràn, cắt chữ, thiếu dấu focus…) **thì thêm phép đo vào
   probe**, thử lại trên trang đó cho tới khi nó bắt được: bản dựng sau tự bắt lỗi đó
   trước khi giao.
   **Dự án có dark mode thì mỗi khổ chụp cả sáng lẫn tối** (`colorScheme: 'dark'` khi
   tạo context, hoặc gắn class `dark` lên `<html>`, theo cách dự án bật). Bước 3 và 4 cũng
   làm ở cả hai: nền hover, màu viền, tương phản chữ đo riêng từng chế độ. Sửa skill cho
   một chế độ thì chụp lại cả hai.
3. **Bấm hết các trạng thái**: rê chuột lên dòng và các ô, mở từng menu ⋯, dropdown,
   modal, hộp xác nhận, bấm lọc, chọn nhiều dòng, gửi form rỗng và form sai, chờ toast
   vào và ra, Tab qua các nút xem tiêu điểm. Trang có route `/states` thì mở luôn.
4. **Đo trước khi nói.** Khoảng cách, cỡ chữ, dòng cao, màu viền thì đọc
   `getComputedStyle` / `getBoundingClientRect`, không đoán bằng mắt. Rê chuột, mở menu xong thì **chờ ~300ms cho `transition` chạy hết** rồi mới đo hay chụp: đo giữa chừng ra màu sai. Đề xuất đổi class thì thử ngay trên trang (gán `style` vào phần tử rồi chụp lại) trước khi ghi vào skill.
   **Mỗi vùng nền hover (và nền đang chọn) đo hai thứ**, ở từng tổ hợp trạng thái
   (hover × đang mở/đóng × dòng đầu/giữa/cuối):
   - **Màu nền hover so với cả nền card LẪN nền trang ngay ngoài mép card.** Vùng hover
     chạm mép card mà gần màu nền trang thì card như bị khuyết một mảng (đã dính
     26/09/2026: hover `#f8f8fa` của FAQ sát nền trang `#f4f4f6`, người dùng thấy, mình
     không).
   - **Khoảng từ chữ tới mép trên và mép dưới của chính vùng nền đó**, đo bằng `Range`
     trên chữ, không bằng padding của phần tử. Hai khoảng lệch nhau, hoặc chữ ngay bên
     ngoài dính sát mép vùng nền, là lỗi (đã dính 26/09/2026: câu trả lời FAQ dính sát
     mép dưới nền hover của câu hỏi).
   Chụp cận cảnh từng tổ hợp đó rồi mới kết luận, đừng suy từ trạng thái đứng yên.
   **Tô màu từng khối** (cách chủ dự án test, 26/09/2026): gắn một `<style>` cho mỗi khối
   con một nền đặc khác nhau (vd nút đỏ, khối bọc xanh dương, chữ nội dung cam), ở mọi
   trạng thái (đóng, mở, hover). Người dùng dự án có thể tự thêm nền cho bất kỳ khối nào,
   nên mỗi khối phải tự đứng được:
   - chữ cách đều hai mép trên dưới, và trái phải bằng nhau, **trong chính khối đó**;
   - khối con lấp kín khối bọc, không lòi mảng màu của khối bọc (thường do `max-w` hoặc
     `pr-*` riêng đặt trên khối con);
   - padding của khối không đổi theo trạng thái để bù cho khối bên cạnh.
   Đã dính 26/09/2026 ở FAQ trang giá: nút bớt `pb` khi mở (chữ 17px trên, 7px dưới), câu
   trả lời `max-w-[65ch]` hụt 55px so với khối bọc, `pr-12` làm lề phải 48px mà lề trái 20px.
5. **Chấm theo `review-by-eye-first`**: thứ nặng nhất màn có đáng nặng vậy không, một ý
   nói mấy lần, việc chính của trang có thấy ngay không. So với cách hầu hết app làm
   (luật "theo quy ước số đông" trong `principles.md`). Chỗ xấu mà khớp spec thì spec sai.
   **Màn skill chưa có mẫu thì tra thật** (WebSearch / WebFetch trang tài liệu, ảnh chụp
   của các sản phẩm lớn) trước khi viết luật, không nói "số đông làm X" theo trí nhớ. Và
   trước khi đổi màu hay mức nặng của nút, đọc lại luật chủ dự án đã chốt (vd `I4`: đăng
   xuất là nguy hiểm). Đã dính 26/09/2026, trang bảo mật: đổi nút đăng xuất hàng loạt sang
   trung tính và để nút bật xác thực hai lớp là nút viền, không tra gì, sai cả hai.
6. **Tách hai loại lỗi:**
   - **Lỗi của skill** (skill thiếu, sai, hoặc mơ hồ nên bản dựng làm sai): sửa skill
     ngay trong lượt. Sửa spec của component/layout, xem bài học có chung cho nhiều chỗ
     không thì thêm vào `principles.md` hoặc `rules-*.md`, thêm câu hỏi vào
     `checklist.md`. Ghi "đã dính <ngày>" kèm ví dụ thật như các mục khác.
     **Sửa skill xong chạy `node skills/ui-ux/scripts/lint-skill.mjs`** (soát các dòng vừa
     sửa): câu nói màu nút phải ghi mã luật gốc (`I4`, `I2`), và lý lẽ đã bị bác
     (`references/locked-rules.md`) không được quay lại. Viết **mục mới** cho một trang cũng
     chạy, không riêng lúc rà. Đã dính 27/09/2026: mục "Trang thanh toán" ghi "Huỷ gói không
     đỏ, vì không mất gì", lặp đúng lý lẽ chủ dự án đã bác ở trang bảo mật hôm trước.
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
| 1 | Khung app + tổng quan | `/dashboard`, `/dashboard/overview/states` | tối: 01/10/2026 (`/dashboard`, một lượt: cột biểu đồ màu nhấn 100% chói nhất màn, thêm `--chart-fill` 70% ở nền tối, chủ dự án chọn sau khi xem ba bản; probe bắt, và đo dark mode dời lên ngay sau khi chụp); 26/09/2026 (tổng quan, ba lượt) |
| 2 | Công việc: bảng nhóm, kanban, tạo mới | `/dashboard/tasks`, `/tasks/new`, `/tasks/states` | 26/09/2026 (kanban, ba lượt, đã theo kịp; popover Lọc, ba lượt, đã theo kịp); 27/09/2026 (bảng nhóm, một lượt: khuôn theo bề rộng khung, đã theo kịp; tạo mới, một lượt: nhóm radio, bộ đếm ký tự, đã theo kịp; `/states`, một lượt: khung chờ cột nhảy ngang, đã theo kịp) |
| 3 | Khách hàng: danh sách, xem nhanh, chi tiết | `/dashboard/customers`, `/customers/quick-view`, `/customers/c-030`, `/customers/khong-co`, `/customers/states` | tối: 01/10/2026 (danh sách, một lượt: `--primary-hover` tối `#ffffff` đổi `#cfd5e0`, probe bắt; sidebar đang chọn chưa theo kịp); 27/09/2026 (danh sách, một lượt: ẩn cột phụ ở khung vừa, số đếm phân trang ở 375px; xem nhanh, một lượt: vùng bấm nút sao chép, hàng có avatar lệch baseline; chi tiết, một lượt: số ô số liệu lệch hàng khi nhãn xuống dòng; `khong-co`, một lượt: gộp về khuôn 404 trong khung; `/states`, một lượt: không lỗi mới; đã theo kịp cả bốn trang) |
| 4 | Đơn hàng: chi tiết, xem nhanh | `/dashboard/orders/detail`, `/orders/quick-view` | 27/09/2026 (modal chi tiết, một lượt: số tiền ngắt dòng ở 375px; xem nhanh, một lượt: không lỗi skill mới; đã theo kịp cả hai) |
| 5 | Thành viên và phân quyền | `/dashboard/members` | 25/09/2026 (chín lượt; cả luồng xác thực đã theo kịp) |
| 6 | Hồ sơ cá nhân | `/dashboard/profile`, `/profile/states` | 27/09/2026 (một lượt: "Gửi lại · Huỷ" của email chờ xác nhận, đã theo kịp) |
| 7 | Đăng nhập, đăng ký, quên mật khẩu, OTP | `/login`, `/register`, `/forgot-password`, `/forgot-password/verify`, `/forgot-password/new-password`, `/forgot-password/states`, `/verify-otp`, `/verify-otp/states` | 25/09/2026 (chín lượt; cả luồng xác thực đã theo kịp) |
| 8 | Bảng giá | `/pricing`, `/pricing/joined` | 26/09/2026 (bảy lượt) |
| 9 | Form đăng ký doanh nghiệp | `/business-registration` | 27/09/2026 (một lượt: không lỗi hình; Tiếp / Quay lại chưa nối xử lý, là logic dự án, `N10`) |
| 10 | Trợ lý AI | `/dashboard/assistant`, `/assistant/states` | 27/09/2026 (một lượt: không lỗi skill mới, đã theo kịp; sửa báo nhầm dấu câu sau `<code>` của probe) |
| 11 | Tài liệu (cây thư mục) | `/dashboard/projects/documents`, `/documents/states` | 27/09/2026 (một lượt: vùng bấm "Thử lại", gộp luật chung vào `N9`; sửa báo nhầm focus ô file ẩn; route này là khu tải tệp, cây thư mục nằm ở `/components`: tooltip tên dài tràn màn ở 375px; đã theo kịp) |
| 12 | Thông báo | `/dashboard/notifications/states` | 27/09/2026 (một lượt: không lỗi hình; "Đánh dấu đã đọc" chưa nối xử lý, là logic dự án, `N10`) |
| 13 | Thư viện component | `/components` | 26/09/2026 (ô số lượng, ba lượt; tên sửa tại chỗ, hai lượt, đã theo kịp; tiêu đề cột sắp xếp, hai lượt, đã theo kịp) |
| 14 | Tạo dự án (khu "Cài đặt nâng cao" thu gọn) | `/dashboard/projects/new` | 26/09/2026 (hai lượt, đã theo kịp) |
| 15 | Form tạo workspace ba bước | `/workspaces/new` | 26/09/2026 (ba lượt, đã theo kịp) |
| 16 | Cài đặt thông báo (và hàng tab khu cài đặt) | `/dashboard/settings`, `/settings/notifications`, `/settings/notifications/states` | 26/09/2026 (hai lượt, đã theo kịp; 27/09/2026 công tắc chưa nới vùng bấm, dự án chưa theo kịp) |
| 17 | Bảo mật: xác thực hai lớp, phiên đăng nhập | `/dashboard/settings/security`, `/security/states` | 26/09/2026 (ba lượt; lượt ba đổi màu nút theo chủ dự án, đã theo kịp) |
| 18 | Các bước bắt đầu (onboarding), nay nằm đầu tổng quan | `/dashboard/overview/states` (trang `/dashboard/welcome` đã bỏ) | 26/09/2026 (ba lượt, đã theo kịp) |
| 19 | Lịch công việc (lưới tháng, lịch gọn) | `/dashboard/calendar`, `/calendar/states` | 26/09/2026 (ba lượt, đã theo kịp; nút viền đã theo kịp) |
| 20 | Khoá API | `/dashboard/settings/api-keys`, `/api-keys/states` | 26/09/2026 (hai lượt; lượt hai đã theo kịp); 27/09/2026 (đo lại: card "Quyền" trong hộp tạo khoá, Tab tới card đang chọn không đổi gì, lỗi skill đã sửa, dự án chưa theo kịp) |
| 21 | Trang lỗi: 404, 403, 500, bảo trì | `/errors/states`, `/403`, `/500`, `/maintenance`, `/khong-co`, `/dashboard/khong-co` | 26/09/2026 (năm lượt; lượt năm đã theo kịp) |
| 22 | Xoá workspace (vùng nguy hiểm, hộp gõ lại tên) | `/dashboard/settings/workspace`, `/workspace/states` | 26/09/2026 (hai lượt, đã theo kịp) |
| 23 | Báo cáo doanh thu (khoảng ngày, biểu đồ đường) | `/dashboard/revenue`, `/revenue/states` | 27/09/2026 (ba lượt, đã theo kịp) |
| 24 | Thanh toán: gói đang dùng, lịch sử hoá đơn | `/dashboard/settings/billing`, `/billing/states` | 27/09/2026 (bốn lượt; lượt ba đã theo kịp, lượt bốn đã theo kịp) |

Route mới xuất hiện trong dự án thì thêm dòng vào bảng (`grep -rhoE "path: ?['\"][^'\"]+" src`).

Dark mode làm sau phase 2 (`TESTS.md`, mục "Dark mode"). Các lượt rà trước đó chỉ soi nền
sáng. Khi dự án đã có dark mode, trang đã rà cần thêm một lượt chỉ soi nền tối; xong thì ghi
"tối: <ngày>" vào cột "Rà ngày". Trang chưa rà thì rà một lần cả hai chế độ.

## Việc để sau: kiểm chứng quy ước

26/09/2026: skill có những câu "các app lớn đều…", "hầu hết app…", "các … phổ biến đều…"
viết theo trí nhớ, chưa ai tra. Trang bảo mật đã dính vì vậy (bước 5). Mỗi lượt một nhóm:
tra thật từng câu (WebSearch / WebFetch trang tài liệu, bài hướng dẫn, ảnh chụp của các sản
phẩm lớn), ghi kết quả vào cột "Kết quả".
- **Đúng**: giữ luật, câu trong skill giữ nguyên (không ghi tên sản phẩm, xem memory "giấu
  nguồn tham khảo").
- **Sai hoặc chia đôi**: sửa luật theo số đông; chia đôi thì ghi rõ là chia đôi và lý do chọn
  bên nào. Trang nào bị ảnh hưởng thì thêm vào "Dự án chưa theo kịp".
- **Không tra được**: bỏ câu "số đông làm X", giữ lý do riêng của luật nếu còn đứng được.
Luật chủ dự án đã chốt (vd `I4` đăng xuất đỏ, `*` đỏ) không lật, chỉ ghi thêm nếu số đông khác.

Lệnh tìm: `grep -rniE "hầu hết (app|sản phẩm)|số đông|app lớn|phổ biến|mọi app|sản phẩm lớn|các app" skills/ui-ux`

| Nhóm | Câu cần tra | Kết quả | Xong |
| --- | --- | --- | --- |
| A. Nút, trạng thái | `rules-state.md` `I7` "Xem tất cả" là link chữ nhẹ ở góc header; `I13` vòng focus chỉ khi dùng bàn phím; `I18` thanh cuộn tự ẩn, mục cuối bị cắt nửa báo còn nữa. `system.md:75` xoá khôi phục được thì xoá ngay + toast Hoàn tác, không hộp xác nhận. `components/input.md:115` ô tìm có nút xoá. `layouts/overlay.md:249` tài khoản chỉ một lối vào; `:356` bảng lệnh ghim từ trên, không căn giữa dọc | 26/09/2026: **đúng 6, sửa câu 1.** `I7`: bộ component thương mại lớn để hành động ở đầu card là nút dạng link. `I13`: `:focus-visible` là chuẩn của trình duyệt, chuột không hiện vòng. Xoá + Hoàn tác: nghiên cứu khả dụng khuyên hoàn tác cho việc lấy lại được, hộp xác nhận chỉ cho việc mất hẳn. Nút xoá ô tìm: có sẵn trong ba bộ thiết kế lớn và ô tìm gốc của iOS. Bảng lệnh: trình soạn code phổ biến nhất đặt ở trên, có người xin thêm tuỳ chọn căn giữa (tức mặc định không căn giữa). Một lối vào tài khoản: bằng chứng mỏng (bài phân tích SaaS gom về avatar góc phải), giữ vì lý do `N3`. `I18`: đúng là nội dung cắt ngang báo còn nữa, nhưng câu "không ai để thanh cuộn đứng sẵn" sai (Windows hiện sẵn), đã sửa | ✅ |
| B. Form, xác thực | `layouts/form.md:62` màn đăng nhập có nút Google; `:65` bỏ ô "Nhập lại mật khẩu"; `:171` lối ra "Quay lại đăng nhập"; `:361` chỉ lỗi tại chỗ, không banner tóm tắt. `components/inline-edit.md:10` bấm ra ngoài thì lưu. `components/accordion.md:136` "Cài đặt nâng cao" là dòng chữ có chevron; `:235` riêng tư / công khai để ngoài khu thu gọn | 27/09/2026: **đúng 6, chia đôi 1, thêm 1 ý.** Bỏ "Nhập lại mật khẩu": nghiên cứu chuyển đổi cho thấy ô này gây bỏ form, thay bằng nút hiện mật khẩu. "Quay lại đăng nhập": các bộ mẫu đăng nhập lớn đều có. Nút Google: bài phân tích ghi gần như mọi form đăng ký có (bằng chứng vừa). "Cài đặt nâng cao" dòng chữ + chevron, riêng tư / công khai trên form chính: đúng (form tạo repo của nền tảng code lớn). Bấm ra ngoài thì lưu: đúng cho tên một dòng; vùng chữ dài thì giữ ô mở, đã thêm vào `inline-edit.md`. Chỉ lỗi tại chỗ: **chia đôi**, hệ thiết kế dịch vụ công thêm hộp tóm tắt đầu trang, sản phẩm SaaS chỉ lỗi tại chỗ; giữ luật (chủ dự án chốt), sửa câu "sản phẩm lớn đều làm vậy" | ✅ |
| C. Chữ, số, hộp thoại | `rules-type.md:18` tiêu đề app weight 600; `:195` ngày `23/09`; `:247` mặc định không placeholder (đối chiếu: "Dự án chưa theo kịp" đang ghi màn xác thực thiếu placeholder). `layouts/overlay.md:46` tiêu đề hộp thoại cách thân 8px. `components/sortable-header.md:44` tiêu đề cột chỉ đổi màu chữ khi rê | 27/09/2026: **đúng 2, gần đúng 1, chia đôi 2.** Không placeholder mặc định: đúng (nghiên cứu khả dụng, hệ thiết kế công). Bỏ năm với mốc năm nay: đúng (thành phần hiển thị thời gian phổ biến: "Sat, 31 Dec" / "Wed, 26 Aug 2021"). Tiêu đề 600: phần lớn hệ sản phẩm, có hệ 650–700; sửa câu. Tiêu đề hộp thoại cách thân 8px: chia đôi (bộ React phổ biến 8px, Material 16px), giữ 8px, ghi lý do. Tiêu đề cột không nền khi rê: chia đôi (hệ doanh nghiệp tô nền ô, hệ khác chỉ mũi tên + đậm chữ), giữ vì ca đã dính. Placeholder màn xác thực: `T25` đã có ngoại lệ, khớp "Dự án chưa theo kịp" | ✅ |
| D. Trang, dữ liệu | `layouts/app.md:494` bảng 7–9 cột cuộn ngang; `:629` cài đặt thông báo ba mục, không lưới việc × kênh; `:770` ô vai trò luôn có mũi tên; `:775` lọc vai trò bằng dropdown; `:779` mời nhiều email một lần. `components/charts.md:32` mỗi nhóm một sắc; `:167` kỳ đang chạy vẽ nhạt; `:248` ô số 2×2 trên điện thoại. `components/chat.md:41` câu trả lời AI không avatar | 27/09/2026: **đúng 7, chia đôi 1, ghi rõ 1.** Kỳ đang chạy nét đứt / nhạt: đúng (các công cụ phân tích lớn cùng làm). Mời nhiều email một lần: đúng (mẫu mời thành viên SaaS phổ biến: email thành chip). Ô vai trò luôn có mũi tên: đúng (dấu sửa được phải hiện, dấu ẩn khó thấy). Chat không avatar: đúng cho khung chính; khung nhúng hẹp cần tách hai bên bằng thứ khác ngoài căn lề, skill đã có nền bong bóng, sửa câu. Bảng 7–9 cột cuộn ngang, lọc vai trò bằng dropdown, mỗi nhóm một sắc, ô số 2×2 (chủ dự án duyệt): giữ. Cài đặt thông báo: **chia đôi** (nhiều sự kiện + nhiều kênh thì lưới, ít thì danh sách công tắc), giữ mặc định ba mục, ghi tiêu chí đề xuất lưới | ✅ |
| E. Độ nặng nút ở trang đã rà | Mỗi trang: việc nên làm nhất có là nút đặc không (`I2`), việc nguy hiểm có đỏ không (`I4`), có nút nào nặng hơn việc của nó không. Trang: thành viên, xác thực, bảng giá, hồ sơ, tổng quan, công việc, cài đặt thông báo, tạo workspace, tạo dự án | 27/09/2026: **không trang nào lệch.** Đọc màu thật của mọi nút ở 1280px: mỗi trang tối đa một nút đặc cho việc chính (Mời thành viên, Đăng nhập, Đăng ký, Lưu thay đổi, Thêm việc, Tiếp, Tạo dự án; tổng quan là bước đang làm "Bật xác thực hai lớp"); nút phụ viền; "Xoá tài khoản" đỏ nhạt (`I4`); cài đặt thông báo không nút đặc vì công tắc lưu ngay; bảng giá hai gói thường `secondary`, gói Pro nút trắng đảo màu trên card tối. Bảo mật đã soát ở lượt ba (REVIEW dòng 17) | ✅ |

## Việc để sau: rà các luật vá tạm

26/09/2026: nút viền rê vào "viền đậm lên" là một luật vá sau sự cố (hover tan vào nền trang,
25/09/2026). Nó chữa đúng triệu chứng nhưng lệch cách số đông làm và trông nặng; chủ dự án phát
hiện, không phải lượt rà. Skill còn nhiều luật sinh cùng kiểu: một sự cố, chọn một cách lạ, ghi
"đã dính … nên làm X", không ai tra lại. Loại này dễ lệch quy ước nhất.

**Cách làm:** lọc các đoạn có "đã dính" / "chủ dự án chốt" mà cách chữa **khác cách thông thường**
của thứ đó (thêm viền, đổi hình, bỏ hover, đổi màu mang nghĩa, số lẻ kiểu `pb-3.5`…). Mỗi luật:
tra số đông làm thế nào (như "Kiểm chứng quy ước"), rồi thử cách thông thường trên trang dự án
với đúng ca đã dính (gán `style`, đo như bước 4). Cách thông thường cũng tránh được sự cố thì
đổi luật theo số đông, giữ lại câu "đã dính" để ghi vì sao; không tránh được thì giữ luật, ghi rõ
số đông làm khác và vì sao mình khác. Luật chủ dự án chốt thì hỏi trước khi lật.

Lệnh lọc gợi ý: `grep -rnE "đã dính|chủ dự án chốt|bỏ [0-9]{2}/09" skills/ui-ux/references | wc -l`
rồi đọc theo file, mỗi lượt một file.

| File | Số luật đã xét | Đổi | Giữ | Xong |
| --- | --- | --- | --- | --- |
| `components/button.md` | 4 | 1: hover nút viền chỉ đổi nền `--button-hover`, 26/09/2026 | 3 (27/09/2026): đang xử lý `aria-disabled` giữ focus (khớp trạng thái chờ của thư viện component chú trọng trợ năng: nút chờ vẫn focus được); nút chỉ icon cao bằng ô nhập cạnh nó (quy ước thường); `secondary` không thay `outline` (chủ dự án chốt) | ✅ |
| `rules-state.md` | 15 | | 15 (27/09/2026): 4 là luật chủ dự án chốt hoặc câu bác lý lẽ cũ (đăng xuất đỏ, nền đỏ nhạt luôn hiện, `/8` cho nút trong dòng); còn lại trùng quy ước thường: ô `username` ẩn cho trình quản lý mật khẩu, vòng quanh avatar đang chọn, accordion không nền hover (như bộ component phổ biến), danh sách cắt ngang một mục, nút mắt 40px, link `ring-offset-4` (đo), thumb thanh cuộn qua biến (lỗi trình duyệt) | ✅ |
| `components/choice-controls.md` | 15 | | 15 (27/09/2026): nút lọc dropdown không hover (chủ dự án chốt 25/09) thử lại với `--button-hover` trên nền trang: chỉ đậm hơn nền 3 mức, vẫn tan, giữ và ghi lần thử; bộ chọn giờ cuộn vòng khác số đông (bộ component web: không vòng, số chọn lên đầu cột), giữ vì dải chọn cố định ở giữa đã duyệt, ghi rõ; còn lại là cách chữa thường (lưới tháng/năm, hàng gỡ giá trị kiểu mục menu, dòng nói bước đang làm, không đệm trống, xếp nhóm radio) | ✅ |
| `components/small-controls.md` | 11 | | 11 (27/09/2026): vòng focus tab `underline` quanh chữ (cách khác thường) thử lại hai cách thường trên hàng tab khách hàng: vòng vẽ vào trong thì mép dưới đè vạch 2px thành một đường, vòng vẽ ra ngoài thì khung cuộn cắt mép, giữ; còn lại là cách thường (tab `underline` khi có hàng chip, không `solid`, không nền tab, badge một kiểu, phân trang không wrap) | ✅ |
| `rules-type.md` | 15 | | 15 (27/09/2026): đều là sự thật đo được hoặc cách thường: cắt giữa tên tệp như trình quản lý tệp của hệ điều hành, đo cắt chữ bằng `Range`, font thiếu `tnum`, `text-pretty` cho chữ chung hàng với icon, `max-w` ở khung ngoài, dòng 24px cho đoạn tiếng Việt có dấu chồng, số tiền không ngắt, placeholder màn xác thực (ngoại lệ đã duyệt) | ✅ |
| `layouts/form.md` | 17 | | 17 (27/09/2026): cách thường hoặc đã tra ở nhóm B: con trỏ sẵn ở ô đầu mọi bước xác thực, giữ chỗ câu lỗi tới lần gửi sau (kỹ thuật tránh nhảy form quen thuộc, `N1`), vòng lỗi đặc có `!`, phần chưa tới `--secondary` (đo), bước cuối `flex-none`, bước xác nhận có "Sửa" từng nhóm, dấu `*` chú thích cùng màu nhãn, bộ đếm ký tự | ✅ |
| `components/charts.md` | 21 | | 21 (27/09/2026): chữ `đ` thay `₫` là luật khác thường nhất, lý do đo được giữ (glyph `₫` có vạch dưới sẵn trong mặt chữ, CSS không bỏ được), chưa tra số đông nên không ghi "số đông"; còn lại là thực hành biểu đồ phổ biến (cột tối đa 32px, thời gian trái sang phải, số kèm mốc khi trục thưa, số nhỏ so bằng chênh lệch, kỳ so sánh ghi một lần, `—` chỉ khi không tính được) | ✅ |
| `layouts/overlay.md` | 34 | | 34 (27/09/2026): lớp phủ sau panel `black/15` (bộ component hay dùng ~50%) giữ có chủ ý: panel để vẫn thấy danh sách; chuyển động panel 500/350ms chủ dự án chốt sau video ba bản; còn lại là cách thường (tên đối tượng đậm trong hộp xác nhận, spinner đè giữa nút, header panel cố định chỉ hàng tên, "Xoá lọc" là link chữ, lọc không phân biệt dấu, nút "Đánh dấu đã đọc", toast giữ trong DOM để có chuyển động ra) | ✅ |
| `layouts/app.md` | 72 | | 72 (27/09/2026): sidebar rê và đang chọn cùng một nền, đang chọn thêm `font-medium` (đúng cách sidebar của bộ component React phổ biến nhất); nút ⋯ ở hàng cuối thẻ kanban khác chỗ thường gặp (góc trên phải) nhưng có số đo (cột 248px: góc trên cắt 5/15 tên, hàng cuối 1/15), giữ; các luật trang còn lại đã rà trực tiếp trên trang ở lượt 26–27/09/2026 | ✅ |
| 15 file nhỏ (`principles.md`, `file-upload.md`, `description-list.md`, `timeline.md`, `rules-color.md`, `empty-state.md`, `accordion.md`, `responsive.md`, `otp-input.md`, `layouts/pricing.md`, `quantity-input.md`, `chat.md`, `budgets.md`, `tree.md`, `list-row.md`) | 69 | | 69 (27/09/2026): luật khác thường đều là luật chủ dự án chốt: dòng bảng đã chọn cùng nền dòng rê (`I10`; bảng dữ liệu của các hệ lớn hay tô dòng chọn một sắc riêng, mình tách bằng checkbox đã tick), `N11`, tên trang `xl`, nội dung accordion nối tiếp padding nút; còn lại là cách thường hoặc lỗi đo được: mới nhất ở trên, đường nối 2px, bỏ thanh tiến độ khi tải xong, ẩn khu tải khi không có quyền, cắt giữa tên tệp, vòng trong 5% của badge, mép mờ hàng cuộn ngang, nút gửi khoá `opacity-30`, `space-y-0.5` giữa dòng bo góc | ✅ |

## Việc để sau: câu cũ thiếu mã luật

27/09/2026: `node skills/ui-ux/scripts/lint-skill.mjs --all` báo 23 chỗ trong các file cũ, phần
lớn là câu quyết màu đỏ hay `primary` mà không ghi `I4` / `I2` trong cùng khối. Mỗi lượt một
file: đọc từng chỗ, câu đúng luật thì thêm mã; câu lệch luật (nhất là hạ việc nguy hiểm xuống
trung tính) thì sửa theo `I4` và ghi vào "Dự án chưa theo kịp". Báo nhầm thì sửa script cho
hết nhầm, đừng thêm mã cho qua. Xong khi `--all` sạch.

**Xong 27/09/2026.** Còn 20 chỗ khi làm (một số đã sửa trong các lượt rà cùng ngày):
- 13 câu đúng luật thiếu mã: thêm `I2` / `I3` / `I4` kèm lý do ngắn, hoặc `M30` cho "không đỏ" của thứ không phải hành động.
- 2 báo nhầm của lint: câu mô tả ("đứng cạnh nút `primary`", "nút `primary` đổi sang `primary-hover`") bị coi là quyết định
  chọn nút. Mẫu nhận diện nay chỉ bắt câu gán vai ("là `primary`", "một nút `primary`", nút `primary` "Nhãn").
- 5 chỗ lint chỉ nhận `I4`: câu "không đỏ" về màu mang nghĩa (tiêu đề lỗi, chấm chưa đọc, ô lịch quá hạn) đã ghi `M30`
  / `M7`. Lint nay nhận `M4`, `M7`, `M30` làm luật gốc cho câu đó.
- 1 câu lệch luật lint không bắt: `rules-color.md` định nghĩa đỏ nguy hiểm là "hành động không lấy lại được", trái `I4`
  ("lấy lại được không làm việc đó hết nguy hiểm"). Viết lại theo ba câu của `I4`.
Thử lint trên câu mẫu sai: vẫn bắt "không đỏ vì không mất gì" và "là nút `primary`" thiếu lý do.

## Việc để sau: probe đo cả trạng thái động

`probe.mjs` đo trang đứng yên và Tab. Hai lỗi 26/09/2026 lọt vì chỉ lộ khi rê chuột hoặc bấm:
nút viền rê vào đổi nền `#fff → #f8f8fa` (gần như không thấy trên card), và ô ngày lịch gọn rê ra
nền vuông 46×48 cạnh vòng chọn tròn 32px. Thêm vào probe:

- **Rê chuột lên từng phần tử bấm được** (nút, link, dòng, ô có `role`), chờ 300ms, đọc nền,
  viền, `border-radius`, kích thước của phần tử và của con mang nền:
  - nền hover so với nền phía sau (card hoặc nền trang, lấy màu đặc của tổ tiên gần nhất): chênh
    quá ít (vd dưới ~8 mức mỗi kênh) là "hover gần như không thấy";
  - nền hover trùng (chênh ≤3) màu viền của chính nó hoặc nền trang ngoài card: "tan vào nền";
  - viền đổi màu lúc hover ở nút viền: báo để soi (skill chỉ đổi nền).
- **Hình của các trạng thái trên cùng một phần tử**: rê, đang chọn (`aria-pressed`,
  `aria-selected`, `aria-current`), focus, vẽ ở phần tử nào và `border-radius` bao nhiêu. Hai trạng
  thái khác hình (vuông với tròn) hoặc khác phần tử vẽ (cả ô với con bên trong) là lỗi.
- **Mở các khối đang đóng trước khi đo** (accordion, mục thu gọn): 26/09/2026 lỗi khe quanh nút
  "…" của đường dẫn nằm trong mục accordion đóng sẵn ở `/components`, probe không thấy. Chỉ bấm
  nút `aria-expanded="false"` có `aria-controls` mà không có `aria-haspopup`, và bỏ nút mở
  sidebar ở màn hẹp (mở ra là che cả trang).
- **Bấm chuột xong rồi đứng yên**: phần tử vừa bấm còn nền hover chồng lên nền chọn không.
- **Lớp nổi mở ra nằm trong màn**: chạm / rê từng phần tử có tooltip, mở từng popover, đo khung `fixed` vừa hiện có
  lòi khỏi viewport không (27/09/2026: tooltip tên tệp ở cây thư mục 375px rộng 765px, tràn gần 400px, probe không thấy vì chỉ
  đo trang đứng yên).

Mỗi phép đo thêm vào phải bắt lại được đúng ca đã dính (nút "Thêm" ở `/dashboard/calendar` bản cũ,
ô ngày lịch gọn bản lượt hai) trước khi coi là xong.

**Làm 27/09/2026** (`probe.mjs`, phần "Trạng thái động"; mỗi trang chạy thêm ~10–15 giây mỗi khổ desktop):
- ✅ Rê chuột từng loại phần tử bấm được (gộp theo thẻ + class, tối đa 80), đọc màu thật qua canvas (oklab / oklch):
  "nền rê gần như không thấy" (chênh dưới 8 mức, chỉ phần tử cỡ nút: dòng bảng rộng thì `#f8f8fa` vẫn thấy), "tan vào
  nền khác" (chạm mép card mà gần nền ngoài card; trùng màu viền), "viền đổi màu lúc rê".
- ✅ Lớp nổi phải nằm trong màn: sau mỗi lần rê, mở từng nút `aria-haspopup`, và ở khổ chạm thì chạm chữ bị cắt
  (chỗ hay gắn tooltip tên đầy đủ). Chỉ xét khung tự định vị, còn một phần trong màn; tràn đáy chỉ tính khung `fixed`.
- ✅ Mở khối đang đóng (`aria-expanded="false"` + `aria-controls`, không popup, bỏ nút mở sidebar / menu) rồi đo lại, trước
  khi rê và chạm.
- Kiểm bằng trang HTML thử dựng lại đúng các ca đã dính (nút viền `#fff → #f8f8fa`, dòng rê trùng nền trang, nút rê trùng
  viền, viền đậm lên, menu tràn phải, tooltip tên tệp tràn ở 375px, khối 700px trong accordion): bắt đủ; không báo nhầm ở
  khách hàng, thành viên, công việc, thanh toán, lịch, bảng giá, `/components`.
- Báo nhầm đã sửa trong lúc làm: sidebar đang đóng nằm ngoài màn tính là lớp nổi; bảng lệnh dựng tĩnh làm mẫu tính là
  lớp nổi tràn đáy; ô nhập nhiều email (input không viền trong khung viền) và hàng ô OTP bị báo lệch mép nút.
- ✅ Hình của các trạng thái: mỗi nhóm có mục đang chọn (`aria-pressed` / `aria-selected` / `aria-current`, trừ
  `aria-current="date"`), lấy một mục chưa chọn cùng loại, rê rồi Tab tới; nền rê và vòng focus phải phủ cùng phần
  (so tỉ lệ phủ trên phần tử, không so số px: tab "Tuần" với "Tháng" rộng khác nhau vẫn cùng phủ kín) và cùng tròn
  hay vuông với nền mục đang chọn.
- ✅ Bấm xong đứng yên (chỉ nút đổi lựa chọn tại chỗ, không link, không nút submit): nền ngoài không được chồng lên
  nền con khác hình, và không hiện vòng focus vì là chuột (`I13`).
- Kiểm bằng trang thử dựng lại lịch gọn bản lượt hai (rê ra nền vuông 46×48, focus vòng vuông cả ô, bấm xong nền vuông
  chồng vòng đen, bấm chuột hiện vòng): bắt đủ bốn; bản đúng (mọi trạng thái trên vòng quanh số), tab segmented,
  sidebar `aria-current` không bị báo. Không báo nhầm ở 10 trang dự án (1–15 nhóm mỗi trang); báo cáo ghi "Đã thử rê,
  Tab, bấm N nhóm" để biết phép đo có chạy.

Đã sửa báo nhầm (27/09/2026): "Chữ cùng cột lệch mép" ở lịch tháng: hôm nay 27 là Chủ nhật, số trong vòng `min-w-7`
thẳng đúng mép chữ "CN" nhưng probe đo mép vòng (quy tắc chip bên dưới). Nay chữ trong khối có nền lấy mép khối
hoặc mép chữ, bên nào gần mép các ô chữ trơn cùng cột hơn; thử lại pill "VIP", vòng "27", ô lệch 4px: chỉ báo ô lệch.

Đã sửa báo nhầm (27/09/2026): "Dấu câu rơi xuống đầu dòng" bắt vòng "!" của bước lỗi (`flex size-8`) ở `/components`.
Ký tự đứng một mình trong khối riêng là hình, không xét; dấu " · " inline vẫn bắt.

Đã sửa báo nhầm (27/09/2026): "Tab tới mà không thấy gì đổi" chụp đúng ô `input type=file` `sr-only` 1px, không thấy vòng
focus vẽ trên `<label>` khung thả tệp (`/dashboard/projects/documents`). Nay phần tử ≤2px thì chụp theo `<label>` bọc ngoài;
thử trên trang HTML hai khung (có vòng, không vòng) chỉ báo khung không vòng.

Đã sửa báo nhầm (27/09/2026): "Dấu câu rơi xuống đầu dòng" bỏ qua hẳn chữ trong `<code>`, nên dấu phẩy sau
`DH-2026-004821` bị so với dòng trên (trợ lý AI 375px). Nay chữ trong code / pre không xét nhưng vẫn làm mốc chữ đứng trước;
vẫn bắt được "· Huỷ" ở `/dashboard/profile/states`.

Đã sửa báo nhầm (27/09/2026): "Chữ cùng cột lệch mép" đo chữ trong chip ("VIP" thụt 8px trong pill) như chữ trơn, báo ở
panel xem nhanh khách hàng. Nay chữ nằm trong khối có nền hoặc viền thì đo mép khối; thử lại bằng cách đẩy một ô
giá trị lệch 4px, vẫn bắt được.

Đã sửa báo nhầm (27/09/2026): "Dấu ngăn cách không đều" coi icon ưu tiên trong thẻ kanban (svg trong `<ul>`) là dấu ›, ra
khe 150–178px ở `/dashboard/tasks/states` 375px. Nay chỉ đo icon `chevron-right/left`, `slash`; thử lại bằng cách làm
lệch một dấu › trên đường dẫn ở `/components`, vẫn bắt được.

Đã sửa báo nhầm (27/09/2026): "Cao gần bằng mà không bằng" gom các `section` khác loại ở
`/dashboard/settings/billing/states` (mục gói 118px vì tên gói 16px, mục thẻ 114px vì tên thẻ 14px), và ở `/components`
hàng mô tả có badge `py-1` (24px) với hàng chữ trơn (20px). Nay chỉ so khối cùng cấu trúc con (tập thẻ + class ba tầng,
bỏ class màu, không tính số lượng); thử ô lịch ba việc cao hơn ô một, hai việc 2px vẫn bắt.

Đã sửa 27/09/2026 (bỏ qua hàng nhiều ô cùng cỡ): "Ô nhập lệch mép với nút rộng hết khung" báo hàng ô OTP (sáu ô
40–57px) ở `/forgot-password/states`, `/verify-otp/states`: nên bỏ qua ô nằm trong một hàng nhiều ô
cùng cỡ.

## Việc để sau: bỏ số âm trong skill (`N11`)

Luật `N11` (26/09/2026): không dùng số âm cho khoảng cách và vị trí, trừ khi không còn
cách nào; chỗ buộc phải giữ thì có comment lý do ngay trên. Rà ngày 26/09/2026: skill
còn **38 chỗ ở 12 file**, dự án test còn **114 dòng ở 55 file** (phần lớn chép từ skill).

**Cách làm mỗi nhóm:** tìm trang trong dự án có thứ đó, đo vị trí chữ, icon, nền hover,
vạch kẻ bằng `getBoundingClientRect` / `Range` trước và sau khi thay (gán `style` trên
trang như bước 4), ở 375 và 1280px, cả lúc hover, mở, cuộn tới cuối. Giống hệt từng
pixel thì sửa skill; lệch thì thử cách khác; hết cách thì giữ và thêm comment lý do vào
code mẫu trong skill. Xong nhóm nào tick nhóm đó. Sửa skill xong mới ghi phần dự án vào
"Dự án chưa theo kịp".

Lệnh tìm: `grep -rnE "(^|[\"' :\`(])-(m[trblxy]?|inset|top|left|right|bottom|translate-[xy]|space-[xy])-" skills/ui-ux`

| # | Nhóm | Chỗ trong skill | Cách thay dự kiến | Thử ở | Dự đoán | Xong |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Căn giữa dọc icon/nút trong ô nhập bằng `top-1/2 -translate-y-1/2` | `components/input.md:72, 92, 127`; `rules-state.md:404` (nút mắt `I27`) | Khối bọc `absolute inset-y-0 flex items-center` rồi đặt icon/nút bên trong | `/login`, `/register` (ô email, nút mắt), ô tìm ở `/dashboard/customers` | Bỏ được: `inset-y-0 my-auto` + cỡ cố định, 14 chỗ ở `/login`, `/register`, đặt mật khẩu mới, ô tìm khách hàng trùng từng pixel; thiếu cỡ thì khối giãn cao bằng ô (40 → 48px). Sửa luôn mẫu nút mắt `input.md` theo `I27` (`size-10 right-1`) | ✅ 27/09/2026 |
| 2 | Đường chia trong menu/dropdown kéo ra bằng `-mx-*` (luật `F25` cách 1) | `rules-form.md:195` (mẫu `F25`); `layouts/overlay.md:160` | Khung chỉ padding dọc, padding ngang dời xuống nhóm mục (`px-1`/`px-2`), `<hr>` nằm giữa hai nhóm tự chạm mép. Viết lại `F25` cách 1 | Menu ⋯ ở `/dashboard/members`, menu tài khoản trong khung app | Bỏ được: khung `py-*`, nhóm mục `px-*`, vạch không margin ngang; 12 menu (tài khoản, ⋯ thành viên, ⋯ khoá API) trùng từng pixel | ✅ 27/09/2026 |
| 3 | Nền hover tràn ra ngoài chữ bằng `-mx-* px-*` | `rules-form.md:108`; `layouts/app.md:492, 603` (ô hạn chót, ô vai trò) | Cho tiêu đề cột và các khối cùng cột một lớp `px` bằng nhau, nút ô không cần kéo ra | `/dashboard/tasks` (ô hạn chót), `/dashboard/members` (ô vai trò). Việc hôm nay ở `/dashboard`: dự án đã bỏ `-mx-2` của dòng, ô tick giờ thụt 8px so với tiêu đề card (309 so với 301, đo 26/09/2026) | Bỏ được: card không `px`, mỗi khối tự `px` (card "Việc hôm nay"), ô bảng bớt padding bằng `px` của nút (ô vai trò, 768 và 1280px), panel xem nhanh thân cuộn không `px` + hàng tab dính `px-6` (thêm `overlay.md` "Phần cố định", không có trong bảng); đều trùng từng pixel | ✅ 27/09/2026 |
| 4 | Vùng cuộn ngang tràn ra mép màn bằng `-mx-*` | `responsive.md:43, 67` (`R6`, `R9`); `layouts/app-kanban.html:143` | Padding ngang của trang dời xuống từng khối con, khối cuộn không có padding cha nên tự chạm mép; lề nằm ở hàng bên trong như `R6` đã ghi | Kanban `/dashboard/tasks`, bảng khách hàng ở 375px | Bỏ được: khung trang chỉ padding dọc, khối khác tự `px` / `mx` dương, khung cuộn không kéo ra. Board kanban `/dashboard/tasks` 375 và 1280px, cuộn đầu và cuối: trùng từng pixel; mẫu `app-kanban.html` cũ và mới trùng từng pixel | ✅ 27/09/2026 |
| 5 | Khung cuộn tab/chip lùi `-mx-1`/`-mx-2` để nền hover tab đầu/cuối không bị cắt, chữ thẳng cột | `components/small-controls.md:55, 66, 148, 176`; `layouts/app-kanban.html:110` | Khung cuộn không lùi, hàng bên trong `px-1`; kiểm chữ tab đầu còn thẳng cột với nội dung bên dưới không | Hàng chip lọc, hàng tab ở `/dashboard/customers` | Bỏ được: khối bọc lùi lề ít hơn 4 / 8px, anh em giữ lề, hàng bên trong `px-1` / `px-2`. Hàng chip, hàng tab `/dashboard/customers` trùng từng pixel. Đường kẻ dưới hàng tab khu cài đặt phải vẽ bằng `after:inset-x-2` (dương) trên khối bọc, vì khung cuộn rộng hơn cột 8px mỗi bên | ✅ 27/09/2026 |
| 6 | Nút `ghost` đầu hàng lùi `-ml-*` để chữ thẳng cột với chữ phía trên | `components/button.md:75`; `components/chat.md:17, 65` | Thụt khối chữ phía trên bằng đúng `px` của nút, hoặc nút đầu hàng dùng `px-0` và nền hover thụt vào | `/dashboard/assistant` (nút "Đã dùng 3 công cụ", hàng Sao chép / Tạo lại). (Mép phải của "Xem tất cả" đã xong 26/09/2026: `I7` đổi sang link chữ không padding ngang, chữ thẳng mép) | **Bỏ hai, giữ một.** Nút ở đầu / cuối hàng riêng: hàng bớt padding phía đó (header tổng quan, dòng khách hàng và thành viên 375px: trùng từng pixel). Nút chỉ đổi màu chữ (bước công cụ chat): bỏ `px`, vòng focus như link. Hàng icon Sao chép / Tạo lại có nền rê giữa cột chữ: chia padding từng khối làm lệch bong bóng `max-w-[80%]` và cột `55ch`, **giữ `-ml-2` kèm comment** | ✅ 27/09/2026 |
| 7 | Nhích quang học `-mt-1.5` cho icon tròn thẳng tâm dòng tiêu đề | `layouts/overlay.md:24, 25, 45` | Hàng đầu là lưới `grid-cols-[auto_minmax(0,1fr)] items-center` (icon + tiêu đề), thân `sm:mt-0.5` | Hộp xoá workspace ở `/dashboard/settings/workspace`, 375 và 1280px | Bỏ được: 1280px chữ tiêu đề tới chữ thân vẫn 14px, icon cách mép trên 24px (trước 18px) | ✅ 26/09/2026 |
| 8 | Vạch tab đang chọn đè lên đường kẻ đáy bằng `after:-bottom-px` | `components/small-controls.md:168` | Đường kẻ đáy vẽ bằng `box-shadow: inset 0 -1px` trên hàng, vạch tab `after:bottom-0` | Hàng tab gạch chân | Bỏ được: hàng `shadow-[inset_0_-1px_0_…]`, tab `box-content h-10 pb-px`, vạch `after:bottom-0`. So ảnh (DPR 2) hàng tab chi tiết khách và panel xem nhanh: trùng từng điểm ảnh; thử nhích vạch 1px thì phép so bắt được. Khu cài đặt: bản cũ bị khung cuộn cắt mất 1px dưới của vạch (đường kẻ nằm ngoài khung cuộn), bản mới hiện đủ 2px; đường kẻ ở khối bọc vẽ bằng `before:` (không `after:`, sẽ đè vạch) | ✅ 27/09/2026 |
| 9 | Nở vùng bấm tay cầm 44×44 bằng `before:-inset-3.5` | `components/range-slider.md:9` | Không có cách không âm mà giữ được tay cầm 20px nhìn thấy | Thanh trượt giá ở `/components` | Giữ, ghi lý do vào `range-slider.md`; mọi vùng bấm `before:-inset-*` khác (sao chép, Thử lại, công tắc, đường dẫn) đã ghi `N11` bước 4 | ✅ 27/09/2026 |
| 10 | Avatar xếp chồng `-space-x-2` | `components/avatar.md:124, 132` | Không có: chồng lên nhau là bản chất của nó | Nhóm avatar ở `/dashboard/tasks` | Giữ, comment trong mẫu `avatar.md` | ✅ 27/09/2026 |
| 11 | Điểm xuất phát của chuyển động `-translate-y-1 → 0`, `-translate-y-full → 0` | `layouts/overlay.md:429, 430` | Số âm ở đây là hướng chuyển động (từ trên xuống), không phải khoảng cách | Dropdown, toast | Ghi vào `N11`: không tính là số âm, không cần comment | ✅ 27/09/2026 |

Đã đúng `N11`, không cần làm: `layouts/app.md:90` (dặn "đừng vá bằng `-mx-3`"),
`layouts/pricing.md:72` (vạch dưới giá đã chuyển sang `py-7 *:px-7`).

**Xong 27/09/2026.** Skill còn số âm ở đúng các chỗ giữ có chủ ý, mỗi chỗ có lý do và comment:
vùng bấm `before:-inset-*`, avatar xếp chồng, khung tên sửa tại chỗ, hàng icon Sao chép / Tạo lại
trong chat, đoạn đậm đường dọc cây thư mục; cộng điểm xuất phát chuyển động (không tính).

Dự án còn những kiểu **không có trong 38 chỗ trên**, có thể do skill tả bằng lời mà
không ghi class. Đã xem (27/09/2026): nút ✕ góc phải `-mr-3` theo `button.md` mục `ghost` cách 1
(header bớt padding); `-mt-1.5` cùng cách nhóm 7; `-my-*` theo `N11` bước 1–3 (không mẫu riêng);
căn giữa `-translate-x-1/2` nay có cách trong `N11` bước 3 (khối `w-0 flex justify-center`, đo ở
chấm biểu đồ doanh thu); `-left-[5px]` của cây thư mục là chỗ giữ có chủ ý (`tree.md`). Danh sách cũ:
- nút ✕ góc phải lùi `-mr-3` (`modal-panel`, `drawer-panel`, `notification-panel`);
- `-mt-1.5` ở `page-header`, `drawer-panel` (cùng kiểu nhóm 7);
- `-my-1`, `-my-1.5`, `-my-2` ở `alert-banner`, `detail-list`, `modal-panel`,
  `date-range-preset-list`;
- căn giữa bằng `-translate-x-1/2` ở `calendar`, `line-chart`, `range-slider-thumb`;
- `-left-[5px]` ở `file-tree` (vạch dọc của cây).

## Dự án chưa theo kịp

Ghi dồn ở đây qua các lượt, để người dùng sửa dự án một lần. Đo lại trên trang thật khi người
dùng báo đã sửa (bước 7); mục nào đã theo kịp thì xoá khỏi danh sách, ghi vào cột "Rà ngày".
Lần đo lại 27/09/2026: 29 route, 25 mục đã theo kịp, còn công tắc và bỏ số âm (`N11`).

- Công tắc ở `/dashboard/settings/notifications` (27/09/2026, probe 375px; đo lại cùng ngày vẫn còn): bảy công
  tắc 44×24 không có vùng bấm nới ra. Skill ghi `relative before:absolute before:-inset-2` trên nút
  `role="switch"`; dự án đang dùng `<input type="checkbox">` `appearance-none` (`src/components/switch/switch.tsx`),
  ô nhập không có `::before`, nên đổi sang nút như skill, đặt `before:` trên `<span>` bọc ngoài, hoặc bọc cả hàng
  trong `<label>`.
- Card chọn (`src/components/choice-card/choice-card.tsx`, skill sửa 27/09/2026): bỏ
  `has-focus-visible:border-focus has-focus-visible:ring-2 has-focus-visible:ring-focus/10`, thay bằng
  `has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-foreground/50`. Hiện Tab vào
  nhóm "Quyền" ở hộp tạo khoá API (`/dashboard/settings/api-keys/states`) rơi đúng card đang chọn, trông y như lúc
  không focus. Kiểm cả `radio-group-showcase-row.tsx` ở `/components`.
- Trang chi tiết khách (`customer-detail-view.tsx`, skill sửa 30/09/2026): cột phải đang mở theo
  `xl:grid-cols-[minmax(0,1fr)_22rem]`; đổi sang `@container` trên khung trang và `@[70rem]:grid-cols-[…]`
  (`layouts/app.md`, "Trang chi tiết bản ghi"): ở 1280px một cột. `detail-list.tsx` bỏ prop `isStacked` /
  `isNarrow`, `<dl>` là `@container`, hàng `@sm:grid-cols-[7rem_…] @xl:grid-cols-[10rem_…]`
  (`description-list.md`).
- Sidebar mục đang chọn (`sidebar-nav-link.tsx`, `sidebar-nav-item-classes.ts`; đo 01/10/2026 ở `/dashboard/customers`):
  đang chọn là `bg-background` cùng màu nền rê nên rê qua mục nào cũng như vừa chọn (bản sáng); bản tối vá
  `dark:bg-secondary` nhưng `hover:bg-item-hover` vẫn ăn lên mục đang chọn, rê vào mục đang chọn thì nền nhạt đi.
  Theo `layouts/app.md`: đang chọn `bg-secondary font-medium` ở cả hai theme, `hover:` chỉ khi `!isActive`.
  Kèm theo `index.css` tối: `--primary-hover: #cfd5e0`, `--border-strong: rgba(160, 180, 220, 0.16)` (skill sửa 01/10/2026; đã theo kịp cùng ngày).
- Biểu đồ "Việc xong mỗi tuần" ở `/dashboard` (01/10/2026): cột `bg-primary` → `bg-chart-fill`, cột kỳ đang chạy `bg-chart-fill/…`;
  `index.css` thêm `--chart-fill: var(--primary)` ở `:root`, `color-mix(in srgb, var(--primary) 70%, transparent)` ở `.dark`, map
  `--color-chart-fill` (`tokens.css`, `components/charts.md`). Thanh tiến độ giữ `bg-primary`.
- Bỏ số âm (`N11`, skill xong 27/09/2026): dự án còn ~114 dòng (đo lại 27/09/2026 chiều: còn 108, chưa sửa). Theo `principles.md` `N11` và từng file:
  icon / nút trong ô nhập `inset-y-0 my-auto` + cỡ cố định (khối bọc nút mắt thêm `size-10`); vạch chia menu
  (`action-menu-items`, `account-dropdown`, `select`, `date-picker-panel`, `date-time-picker-panel`,
  `date-range-preset-list`) theo `F25` cách 1 mới; ô vai trò, ô hạn chót bớt padding ô thay `-ml-2`; board kanban
  `task-board.tsx` bỏ `-mx-4 sm:-mx-6`, khung trang chỉ padding dọc; hàng chip / tab (`filter-chip-group`,
  `get-tab-classes`, `settings-tabs`) khối bọc lùi lề ít hơn; hàng tab `underline` `box-content h-10 pb-px` + vạch
  `bottom-0`, đường kẻ khu cài đặt `before:inset-x-2` (sẽ hiện đủ vạch 2px, hiện bị cắt còn 1px); tab dính trong
  `drawer-panel` bỏ `-mx-6`; header và dòng danh sách (`dashboard-page`, `customer-list-row`, `member-list-row`)
  bớt padding hàng thay `-ml-2` / `-mr-*`; nút bước công cụ chat bỏ `px-2` và `-ml-2`. Giữ có comment: hàng icon
  `chat-answer-actions`, `before:-left-*` của cây thư mục, vùng bấm `before:-inset-*`, avatar xếp chồng.
