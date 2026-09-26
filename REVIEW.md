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
| 1 | Khung app + tổng quan | `/dashboard`, `/dashboard/overview/states` | 26/09/2026 (tổng quan, ba lượt) |
| 2 | Công việc: bảng nhóm, kanban, tạo mới | `/dashboard/tasks`, `/tasks/new`, `/tasks/states` | 26/09/2026 (kanban, ba lượt, đã theo kịp; còn bảng nhóm, tạo mới, `/states`) |
| 3 | Khách hàng: danh sách, xem nhanh, chi tiết | `/dashboard/customers`, `/customers/quick-view`, `/customers/c-030`, `/customers/khong-co`, `/customers/states` | |
| 4 | Đơn hàng: chi tiết, xem nhanh | `/dashboard/orders/detail`, `/orders/quick-view` | |
| 5 | Thành viên và phân quyền | `/dashboard/members` | 25/09/2026 (chín lượt; cả luồng xác thực đã theo kịp) |
| 6 | Hồ sơ cá nhân | `/dashboard/profile`, `/profile/states` | |
| 7 | Đăng nhập, đăng ký, quên mật khẩu, OTP | `/login`, `/register`, `/forgot-password`, `/forgot-password/verify`, `/forgot-password/new-password`, `/forgot-password/states`, `/verify-otp`, `/verify-otp/states` | 25/09/2026 (chín lượt; cả luồng xác thực đã theo kịp) |
| 8 | Bảng giá | `/pricing`, `/pricing/joined` | 26/09/2026 (bảy lượt) |
| 9 | Form đăng ký doanh nghiệp | `/business-registration` | |
| 10 | Trợ lý AI | `/dashboard/assistant`, `/assistant/states` | |
| 11 | Tài liệu (cây thư mục) | `/dashboard/projects/documents`, `/documents/states` | |
| 12 | Thông báo | `/dashboard/notifications/states` | |
| 13 | Thư viện component | `/components` | 26/09/2026 (ô số lượng, ba lượt; tên sửa tại chỗ, hai lượt, đã theo kịp; tiêu đề cột sắp xếp, hai lượt, đã theo kịp) |
| 14 | Tạo dự án (khu "Cài đặt nâng cao" thu gọn) | `/dashboard/projects/new` | 26/09/2026 (hai lượt, đã theo kịp) |

Route mới xuất hiện trong dự án thì thêm dòng vào bảng (`grep -rhoE "path: ?['\"][^'\"]+" src`).

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
| 1 | Căn giữa dọc icon/nút trong ô nhập bằng `top-1/2 -translate-y-1/2` | `components/input.md:72, 92, 127`; `rules-state.md:404` (nút mắt `I27`) | Khối bọc `absolute inset-y-0 flex items-center` rồi đặt icon/nút bên trong | `/login`, `/register` (ô email, nút mắt), ô tìm ở `/dashboard/customers` | Bỏ được | |
| 2 | Đường chia trong menu/dropdown kéo ra bằng `-mx-*` (luật `F25` cách 1) | `rules-form.md:195` (mẫu `F25`); `layouts/overlay.md:160` | Khung chỉ padding dọc, padding ngang dời xuống nhóm mục (`px-1`/`px-2`), `<hr>` nằm giữa hai nhóm tự chạm mép. Viết lại `F25` cách 1 | Menu ⋯ ở `/dashboard/members`, menu tài khoản trong khung app | Bỏ được | |
| 3 | Nền hover tràn ra ngoài chữ bằng `-mx-* px-*` | `rules-form.md:108`; `layouts/app.md:492, 603` (ô hạn chót, ô vai trò) | Cho tiêu đề cột và các khối cùng cột một lớp `px` bằng nhau, nút ô không cần kéo ra | `/dashboard/tasks` (ô hạn chót), `/dashboard/members` (ô vai trò). Việc hôm nay ở `/dashboard`: dự án đã bỏ `-mx-2` của dòng, ô tick giờ thụt 8px so với tiêu đề card (309 so với 301, đo 26/09/2026) | Bỏ được, phải đo thẳng cột với tiêu đề | |
| 4 | Vùng cuộn ngang tràn ra mép màn bằng `-mx-*` | `responsive.md:43, 67` (`R6`, `R9`); `layouts/app-kanban.html:143` | Padding ngang của trang dời xuống từng khối con, khối cuộn không có padding cha nên tự chạm mép; lề nằm ở hàng bên trong như `R6` đã ghi | Kanban `/dashboard/tasks`, bảng khách hàng ở 375px | Có thể buộc phải giữ nếu trang dùng `p-4` chung | |
| 5 | Khung cuộn tab/chip lùi `-mx-1`/`-mx-2` để nền hover tab đầu/cuối không bị cắt, chữ thẳng cột | `components/small-controls.md:55, 66, 148, 176`; `layouts/app-kanban.html:110` | Khung cuộn không lùi, hàng bên trong `px-1`; kiểm chữ tab đầu còn thẳng cột với nội dung bên dưới không | Hàng chip lọc, hàng tab ở `/dashboard/customers` | Phải thử | |
| 6 | Nút `ghost` đầu hàng lùi `-ml-*` để chữ thẳng cột với chữ phía trên | `components/button.md:75`; `components/chat.md:17, 65` | Thụt khối chữ phía trên bằng đúng `px` của nút, hoặc nút đầu hàng dùng `px-0` và nền hover thụt vào | `/dashboard/assistant` (nút "Đã dùng 3 công cụ", hàng Sao chép / Tạo lại). (Mép phải của "Xem tất cả" đã xong 26/09/2026: `I7` đổi sang link chữ không padding ngang, chữ thẳng mép) | Phải thử | |
| 7 | Nhích quang học `-mt-1.5` cho icon tròn thẳng tâm dòng tiêu đề | `layouts/overlay.md:24, 25, 45` | Tiêu đề bọc `min-h-10 flex items-center` (bằng cao icon), hàng `items-start` | Hộp "Thu hồi lời mời" ở `/dashboard/members` | Bỏ được | |
| 8 | Vạch tab đang chọn đè lên đường kẻ đáy bằng `after:-bottom-px` | `components/small-controls.md:168` | Đường kẻ đáy vẽ bằng `box-shadow: inset 0 -1px` trên hàng, vạch tab `after:bottom-0` | Hàng tab gạch chân | Phải thử | |
| 9 | Nở vùng bấm tay cầm 44×44 bằng `before:-inset-3.5` | `components/range-slider.md:9` | Không có cách không âm mà giữ được tay cầm 20px nhìn thấy | Thanh trượt giá ở `/components` | **Giữ**, thêm comment lý do vào mẫu | |
| 10 | Avatar xếp chồng `-space-x-2` | `components/avatar.md:124, 132` | Không có: chồng lên nhau là bản chất của nó | Nhóm avatar ở `/dashboard/tasks` | **Giữ**, thêm comment lý do vào mẫu | |
| 11 | Điểm xuất phát của chuyển động `-translate-y-1 → 0`, `-translate-y-full → 0` | `layouts/overlay.md:429, 430` | Số âm ở đây là hướng chuyển động (từ trên xuống), không phải khoảng cách | Dropdown, toast | **Giữ**, ghi rõ trong `N11` là ngoại lệ | |

Đã đúng `N11`, không cần làm: `layouts/app.md:90` (dặn "đừng vá bằng `-mx-3`"),
`layouts/pricing.md:72` (vạch dưới giá đã chuyển sang `py-7 *:px-7`).

Dự án còn những kiểu **không có trong 38 chỗ trên**, có thể do skill tả bằng lời mà
không ghi class. Rà xong 11 nhóm thì xem skill có nói gì về chúng không:
- nút ✕ góc phải lùi `-mr-3` (`modal-panel`, `drawer-panel`, `notification-panel`);
- `-mt-1.5` ở `page-header`, `drawer-panel` (cùng kiểu nhóm 7);
- `-my-1`, `-my-1.5`, `-my-2` ở `alert-banner`, `detail-list`, `modal-panel`,
  `date-range-preset-list`;
- căn giữa bằng `-translate-x-1/2` ở `calendar`, `line-chart`, `range-slider-thumb`;
- `-left-[5px]` ở `file-tree` (vạch dọc của cây).

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
