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
2. **Chạy `skills/ui-ux/scripts/probe.mjs <url> --dpr 2 --pw <thư mục playwright>`
   trước**, giống bản dựng chạy ở cổng 3. Script chụp 375, 768, 1024, 1280px (`fullPage`),
   ghi cuộn ngang, lỗi console và các lỗi đo được. **Lượt rà tìm ra một lỗi đo được mà
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
| 2 | Công việc: bảng nhóm, kanban, tạo mới | `/dashboard/tasks`, `/tasks/new`, `/tasks/states` | 26/09/2026 (kanban, ba lượt, đã theo kịp; popover Lọc, ba lượt, đã theo kịp; còn bảng nhóm, tạo mới, `/states`) |
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
| 15 | Form tạo workspace ba bước | `/workspaces/new` | 26/09/2026 (ba lượt, đã theo kịp) |
| 16 | Cài đặt thông báo (và hàng tab khu cài đặt) | `/dashboard/settings`, `/settings/notifications`, `/settings/notifications/states` | 26/09/2026 (hai lượt, đã theo kịp trừ màu đường kẻ hàng tab) |
| 17 | Bảo mật: xác thực hai lớp, phiên đăng nhập | `/dashboard/settings/security`, `/security/states` | 26/09/2026 (ba lượt; lượt ba đổi màu nút theo chủ dự án, dự án chưa theo kịp) |
| 18 | Các bước bắt đầu (onboarding), nay nằm đầu tổng quan | `/dashboard/overview/states` (trang `/dashboard/welcome` đã bỏ) | 26/09/2026 (ba lượt, đã theo kịp) |
| 19 | Lịch công việc (lưới tháng, lịch gọn) | `/dashboard/calendar`, `/calendar/states` | 26/09/2026 (ba lượt, đã theo kịp; nút viền còn hover cũ, nằm trong mục "Nút viền" bên dưới) |
| 20 | Khoá API | `/dashboard/settings/api-keys`, `/api-keys/states` | 26/09/2026 (hai lượt; lượt hai đã theo kịp) |

Route mới xuất hiện trong dự án thì thêm dòng vào bảng (`grep -rhoE "path: ?['\"][^'\"]+" src`).

Dark mode làm sau bậc 3 (`TESTS.md`, mục "Dark mode"). Các lượt rà trước đó chỉ soi nền
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
| B. Form, xác thực | `layouts/form.md:62` màn đăng nhập có nút Google; `:65` bỏ ô "Nhập lại mật khẩu"; `:171` lối ra "Quay lại đăng nhập"; `:361` chỉ lỗi tại chỗ, không banner tóm tắt. `components/inline-edit.md:10` bấm ra ngoài thì lưu. `components/accordion.md:136` "Cài đặt nâng cao" là dòng chữ có chevron; `:235` riêng tư / công khai để ngoài khu thu gọn | | |
| C. Chữ, số, hộp thoại | `rules-type.md:18` tiêu đề app weight 600; `:195` ngày `23/09`; `:247` mặc định không placeholder (đối chiếu: "Dự án chưa theo kịp" đang ghi màn xác thực thiếu placeholder). `layouts/overlay.md:46` tiêu đề hộp thoại cách thân 8px. `components/sortable-header.md:44` tiêu đề cột chỉ đổi màu chữ khi rê | | |
| D. Trang, dữ liệu | `layouts/app.md:494` bảng 7–9 cột cuộn ngang; `:629` cài đặt thông báo ba mục, không lưới việc × kênh; `:770` ô vai trò luôn có mũi tên; `:775` lọc vai trò bằng dropdown; `:779` mời nhiều email một lần. `components/charts.md:32` mỗi nhóm một sắc; `:167` kỳ đang chạy vẽ nhạt; `:248` ô số 2×2 trên điện thoại. `components/chat.md:41` câu trả lời AI không avatar | | |
| E. Độ nặng nút ở trang đã rà | Mỗi trang: việc nên làm nhất có là nút đặc không (`I2`), việc nguy hiểm có đỏ không (`I4`), có nút nào nặng hơn việc của nó không. Trang: thành viên, xác thực, bảng giá, hồ sơ, tổng quan, công việc, cài đặt thông báo, tạo workspace, tạo dự án | | |

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
| `components/button.md` | 1 (hover nút viền) | 1: chỉ đổi nền `--button-hover`, 26/09/2026 | | |

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
- **Bấm chuột xong rồi đứng yên**: phần tử vừa bấm còn nền hover chồng lên nền chọn không.

Mỗi phép đo thêm vào phải bắt lại được đúng ca đã dính (nút "Thêm" ở `/dashboard/calendar` bản cũ,
ô ngày lịch gọn bản lượt hai) trước khi coi là xong.

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

- Nút viền (skill đổi 26/09/2026, chủ dự án chốt): `src/components/button/button.tsx` bỏ
  `hover:border-foreground/20`, nền hover sang màu đặc `hover:bg-button-hover`; thêm
  `--button-hover: #f1f1f3` vào `src/index.css` (và ánh xạ `--color-button-hover`). Kiểm cả nút chỉ
  icon viền (`iconOnlyOutlineClasses`).
- `/dashboard/settings/api-keys/states` (lượt hai, 26/09/2026): nút `⋯` ở ca "menu đang mở" chưa có
  nền của trạng thái mở như menu thật, và menu cách dòng 16px thay vì 8px dưới nút.
- `/dashboard/settings/security` (skill sửa lượt ba, 26/09/2026): "Bật xác thực hai lớp" sang
  `primary`; "Đăng xuất 4 thiết bị khác" trả lại `isDestructive`; nút dòng và nút hàng loạt lên cỡ nút form
  `h-11 md:h-10 rounded-xl` (bỏ `sessionActionButtonClass` `h-8`, dùng như nút 2FA); nút
  "Đăng xuất" trong dòng rê vào / Tab tới thì đỏ (`I4`, dạng nút lặp trên từng dòng); hộp xác
  nhận đăng xuất hàng loạt về `tone` đỏ như hộp xoá.
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
- Khu cài đặt (`src/features/settings/components/settings-tabs.tsx`): đường kẻ dưới hàng tab
  `border-foreground/10` ra `#e1e1e3`, đậm hơn đường header `#eaeaea`; đổi `border-border-strong`.
  Các lỗi khác của lượt 1 (trang trắng, thiếu hàng tab, focus công tắc, cỡ câu lỗi, câu chữ) đã theo kịp.
