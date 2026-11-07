# App mobile — luật J

Màn của **app điện thoại**: đề nói "app mobile", "app điện thoại", "iOS", "Android", "React Native",
"Flutter", hay gửi ảnh màn điện thoại. Đầu ra là **bản mẫu HTML trong khung điện thoại**, mỗi màn một
đường dẫn, bấm qua lại được: để xem, duyệt, rồi người dùng tự chuyển sang code của nền tảng họ chọn.

Mọi luật khác của skill vẫn áp (màu, token, chữ tiếng Việt, trạng thái, dữ liệu giả, `I4`), file này
chỉ nói chỗ **khác web**: khung máy, điều hướng, kích cỡ cho ngón tay, sheet, hành động chính, app quản lý
nhiều dữ liệu (`J14`), bộ mặt riêng của app điện thoại (`J15`).

**Code mẫu đã duyệt: `layouts/mobile-app.html`** (app ghi chi tiêu, 5 màn: tổng quan, chi tiết, sheet
thêm, thống kê, cài đặt). Chép khung và công thức từ đó, thay nội dung theo đề. App đặt món, đồ uống, bán hàng
thì chép từ `layouts/mobile-order.html` (`J11`, `J12`: thêm đăng nhập, nhập mã, xin quyền,
rỗng, tài khoản). Bộ mặt Playful chép từ `layouts/mobile-playful.html` (app luyện nói, 16 màn: màn chào có nhân vật,
năm câu hỏi onboarding, bàn phím vẽ, tạo tài khoản, xin thông báo, bài tập chọn câu và luyện nói có phản hồi đúng sai).
Bộ mặt Photo chép từ `layouts/mobile-photo.html` (app đặt homestay: khám phá theo điểm đến, tìm ba bước, lịch khoảng
ngày, kết quả có lọc, bản đồ ghim giá, chi tiết ảnh tràn đầu và thanh giá dính đáy, đặt và thanh toán, chuyến đi, đã
lưu). Bộ mặt Immersive chép từ `layouts/mobile-immersive.html` (app thiền và sách nói: onboarding, trang chủ có trình phát
thu nhỏ trên thanh tab, chi tiết sách có chương đang tải, trình phát toàn màn, sheet hẹn giờ và tốc độ, thư viện).

⚑ Số đo lấy từ tài liệu thiết kế chính thức của iOS và Android (đọc tận nguồn), cộng 96 ảnh mẫu app được
khen ở 8 loại (tài chính, ngân hàng, việc cần làm, thói quen, thể dục, giao đồ ăn, mạng xã hội, cài đặt).
Bản iOS hiện hành không còn công bố chiều cao thanh tiêu đề, thanh tab: số đó ghi "cách làm phổ biến".

## J1. Khung và nền tảng

- **Mặc định một giao diện chung cho cả hai nền tảng**, dựng trong khung **390×844** (iPhone 12–14):
  đa số app thật dùng chung một giao diện cho iOS và Android. Đề nói rõ "Android" thì khung **412×915**,
  mép trên 24 và mép dưới 24, theo số Android ở `J4`.
- **Khung theo `mobile-app.html`**: từ 500px trở lên vẽ thân máy bo 48px, **thanh trạng thái giả 47px**
  (giờ 9:41, sóng, pin) và **thanh home 34px**; dưới 500px (mở trên điện thoại thật) màn tràn hết, không vẽ
  thanh trạng thái, chừa tai thỏ bằng `env(safe-area-inset-*)` với `viewport-fit=cover`. Hai mép chừa này
  là biến `--inset-top`, `--inset-bottom`, mọi vùng dính mép dùng chúng, không viết cứng 47. Vùng cuộn trong khung
  (`.scroll`) ẩn hẳn thanh cuộn như điện thoại thật (ngoại lệ có tên của luật chốt 13 trong `locked-rules.md`).
- **Dải nền dưới thanh trạng thái** (`.status-cover`, cao `--inset-top`, `bg-background/85 backdrop-blur-xl`,
  nằm trên vùng cuộn, dưới lớp phủ của sheet), có ở cả khung lẫn máy thật. Màn gốc cuộn từ đỉnh nên nội dung
  chạy dưới tai thỏ. Đừng bỏ dải này: chữ cuộn lên đè thẳng lên giờ và pin.
- **Nền màn trắng** (`--screen-bg` = `--surface`), nội dung nằm thẳng trên nền, tách bằng khoảng trống và vạch
  mảnh. **Nền xám `--background` chỉ cho màn danh sách nhóm** (cài đặt, tài khoản, form chia nhóm): thêm
  `.is-grouped` vào màn, các dòng trong thẻ trắng (`J4`). Đây là quy ước của iOS (nền grouped chỉ cho bảng
  nhóm, còn lại là nền hệ thống trắng) và của app thật: màn chọn giờ, lịch hẹn, trang chủ của các app đặt lịch
  lớn đều nền trắng. Trên nền trắng, thẻ và ô chọn có viền mảnh `ring-1 ring-inset ring-border-strong`. Đừng để
  nền xám thẻ trắng ở mọi màn như dashboard: màn nhạt, thiếu sức sống, trông như trang quản trị.
- Mỗi màn là một `section[data-screen]`, chuyển màn bằng hash (`#home`, `#detail`); màn rộng có danh sách
  màn bên trái (`nav.wf-screens`, probe không đo phần này) để người duyệt nhảy thẳng tới. Wireframe phương án (`U4`) cũng trong khung này, ba phương án
  khác nhau ở điều hướng và màn gốc.
- **Bảng luồng là cửa vào của người duyệt** ⚑: mở link trên màn rộng (từ 900px) mà không có `#màn` thì ra bảng, nền
  tối, **mỗi luồng một hàng** (onboarding, bài đầu tiên, thanh toán…), các màn xếp cạnh nhau theo thứ tự đi, cuộn
  ngang, nhãn số và tên dưới mỗi màn; bấm một màn là chạy thử từ màn đó trong khung máy. Có `#màn` thì vào thẳng khung
  máy như cũ. Chép nguyên khối Bảng luồng của `mobile-app.html` (CSS, `<main class="flow-board">`, hàm `buildBoard`),
  kể cả bản mẫu dựng theo `mobile-order.html`: mỗi `<ol data-flow>` trong danh sách màn là một hàng, mỗi trạng thái
  đáng xem (chưa chọn, đúng, sai, rỗng) là một mục của hàng. Script tách `renderScreen(name)` khỏi `route()`; bảng gọi
  `renderScreen` cho từng màn rồi chép cả khung máy (thanh tab, nút thêm, sheet đúng trạng thái), không vẽ lại màn nào. Bản
  chép giữ mọi `data-*` (CSS ẩn hiện theo chúng, như nút phát / dừng) và chỉ gỡ `data-screen`, `name`, `id`, `for`; vì vậy
  **script của app tìm phần tử trong máy thật** (`liveDevice.querySelectorAll(...)`, `liveDevice` là `.device` đầu tiên),
  không `document.querySelectorAll`, kẻo đổi tab, mở sheet đổi nhầm cả bản chép trên bảng.
  Thiếu bảng thì người duyệt phải bấm qua từng màn mới thấy cả luồng, không so được hai màn cạnh nhau. Probe gặp
  bảng thì tự đo màn đầu trong khung máy. **App có phần tử vẽ bằng JS mà đo bề rộng** (biểu đồ `J17`) thì gọi
  `buildBoard` sau `load` và `document.fonts.ready`, không ở cuối body: lúc đó Tailwind bản trình duyệt chưa sinh
  class, font chưa nạp, biểu đồ đo sai bề rộng rồi bị chép nguyên vào bảng. **Wireframe (`U3`) gọi lại
  `placeBlockNumbers()` sau `buildBoard`**, trên cả trang chứ không chỉ máy thật (ngoại lệ duy nhất của luật tìm trong
  máy thật): lúc chép, máy thật đang ẩn sau bảng nên hàm đo ra "không đè", số khối trên bảng nằm đè lên chữ đầu khối.
- **Nút chính của luồng dẫn tới kết quả thấy được.** Bấm "Lưu", "Tạo", "Đặt" trong wireframe hay bản mẫu thì về
  màn trước **đã đổi**: dòng mới ở đầu danh sách (nhãn "Mới"), số đếm và số dư cộng thêm, thông báo ngắn `J7`
  ("Đã thêm Ăn tối", có Hoàn tác). Quay về màn cũ y nguyên thì người duyệt không thấy lưu xong ra sao, nên không
  góp ý được bước cuối của luồng, là bước họ làm nhiều nhất. **Dòng mới không nằm dưới thông báo hay thanh tab**: dòng
  mới ở thấp (dưới thẻ số chính và một khối khác) thì màn cuộn tới nó (`scrollIntoView({ block: "center" })`) trước khi
  bảng chép. Trên bảng, thông báo đứng yên mãi, đè đúng thứ người duyệt cần xem.
- **Không hover**: màn chạm không có rê chuột. Phản hồi là lúc nhấn (`J7`).
- **Kiểm bằng probe chế độ mobile** trước khi giao: `node scripts/probe.mjs <file hay link> --mobile --widths 390,1280`
  (thay cho `--sweep`, `--wireframe` của màn web; thêm một lượt `--stress` khi có danh sách).
  Nó mở từng màn (mỗi `data-screen` và hash dẫn tới sheet) ở 390×844 và 360×640 (Android giá rẻ, máy cũ) giả lập chạm và ở khung 1280, chụp từng
  màn, đo các luật `J` đo được: chữ dưới 11px, chữ ô nhập dưới 16px, chỗ bấm dưới 44px, thanh tab, nút nổi đè
  chữ, dòng cuối kẹt dưới thanh tab, chữ chui vào vùng tai thỏ / thanh home.

## J2. Điều hướng chính: thanh tab

- **Thanh tab 3–5 mục, mục nào cũng có chữ** (11px, `font-medium`) dưới icon 24px. Không menu ba gạch thay
  thanh tab, không mục "Thêm" chứa phần còn lại, không tab chỉ có icon. Mục đang chọn `text-foreground`,
  còn lại `text-muted`. Mục đang chọn **được** tô đặc icon (`fill="currentColor"`) như thanh tab iOS, chỉ khi icon là
  hình kín (nhà, chuông, người); cả thanh một kiểu, icon nét hở (biểu đồ, lưới) thì giữ nét cho mọi mục.
- **Thanh tab nổi**: cao 64px, cách hai mép và thanh home 16px / 8px, `rounded-full`, nền `bg-surface/90`
  `backdrop-blur-xl`, viền 4% và bóng mềm. Kiểu thanh nổi là kiểu của iOS hiện hành và phần lớn ảnh mẫu.
- **Thanh tab chỉ để đi lại.** Hành động (thêm, quét, đăng) không nằm trong thanh tab, kể cả nút "+" giữa
  thanh hay gặp ở ảnh mẫu: dùng nút tròn đứng riêng cạnh thanh (`J5`).
- **Nhãn mỗi mục có chỗ thở**: hai nhãn kề nhau cách từ 8px, nhãn đầu và cuối cách mép bo của thanh từ 8px.
  Thanh rộng 358px chứa vừa 5 nhãn hai chữ ("Tổng quan", "Nhân viên"); thanh thu lại cho nút tròn chỉ còn
  282px, 5 nhãn dính nhau thành một dải và nhãn đầu lấn vào chỗ bo.
- **Màn con để xem giữ thanh tab** (chi tiết giao dịch, hồ sơ, bài viết, trang món): mục của tab cha vẫn sáng,
  quay lại bằng nút trái ở thanh trên (`J3`). Ẩn thanh tab làm người dùng quên mình đang ở mục nào, và iOS mặc định
  giữ thanh khi đẩy màn con vào (tài liệu thanh tab của iOS: chỉ ẩn khi có lớp phủ tạm). Bấm mục đang sáng thì về
  màn gốc của tab đó.
- **Ẩn thanh tab khi màn là một việc phải làm cho xong**: form thêm, sửa; giỏ hàng, thanh toán; luồng nhiều bước; màn
  chọn một thứ rồi quay về (chọn quán, chọn địa chỉ giao, chọn phiếu ưu đãi).
  Các màn này có nút chính dính đáy (`J5`), thanh tab nằm cạnh nút đó thì hai dải đáy chồng nhau, và bấm nhầm tab là
  bỏ dở việc. Sheet và hộp hỏi phủ lên thanh tab.
- **Màn xem có thanh hành động dính đáy cũng ẩn thanh tab** (trang chỗ ở, sản phẩm có "giá · Đặt", "Thêm vào giỏ"): thanh
  hành động là việc chính của màn, hai dải đáy chồng nhau thì nút chính bị đẩy lên giữa màn.
- **Chấm đỏ có số trên mục** chỉ cho việc người dùng phải xử lý (tin nhắn chưa đọc, đơn cần xác nhận), không cho
  khuyến mãi hay mục mới: chấm đỏ ở mọi tab thì không ai nhìn nữa. Viên `bg-danger` chữ trắng 11px, cao 16, góc phải
  trên icon; trên 99 ghi "99+".
- Vùng cuộn của màn có thanh tab chừa đáy `inset-bottom + 96px` (`.pad-tabbar`): dòng cuối cuộn lên được
  hết, không nằm mãi dưới thanh.

## J3. Đầu màn

- **Màn gốc của tab: tiêu đề lớn canh trái** `text-[32px]/[38px] font-semibold tracking-tight`, ngắn (≤ 15
  ký tự: "Thống kê", "Cài đặt", "Tháng 10"). Trên nó được một dòng nhỏ `text-sm text-muted` (lời chào, ngày).
  Phải là avatar 44px dẫn tới tài khoản hay một nút icon, không hơn hai thứ.
- **Màn con: thanh trên 44px**: trái là nút quay lại, giữa là tiêu đề 17px `font-semibold`, phải tối đa **một**
  nút icon 44px; màn có ảnh tràn đầu (chỗ ở, sản phẩm) được **hai** nút tròn, chia sẻ và lưu, như số đông app đặt phòng,
  mua sắm. Nút quay lại một trong hai kiểu, cả app một kiểu: chevron 24px + tên màn cha (cao 44px; tên dài quá
  12 ký tự thì chỉ chevron), hoặc **chỉ chevron trong nút tròn 44px** `rounded-full bg-secondary` như iOS hiện hành và
  phần lớn ảnh mẫu mới. Nút tròn hợp màn có ảnh tràn đầu (nền ảnh nào cũng thấy nút).
- **Luồng nhiều bước** (đặt lịch, thanh toán): thanh bước mảnh ngay dưới thanh trên, tiêu đề là tên bước. Không
  thêm dòng "Bước 2/3 · Thợ và giờ": tiêu đề, thanh bước và dòng này nói cùng một ý ba lần.
- Vào màn con **trượt từ phải** 300ms (`push-in`); giảm chuyển động thì mờ dần 200ms thay cho trượt (`J10`).

## J4. Kích cỡ cho ngón tay

| Thứ | Số | Ghi chú |
| --- | --- | --- |
| Vùng chạm | **≥ 44×44px** (Android 48) | nút chỉ icon `size-11`; link chữ trong hàng cũng cao 44 |
| Lề hai bên | **16px** | thẻ, danh sách, nút chính cùng lề |
| Tiêu đề lớn màn gốc | 32/38, 600 | iOS 34, Android 32 |
| Tiêu đề thanh trên, sheet | 17, 600 | |
| Tiêu đề khối | 20/25, 600 | |
| Chữ thân, tên dòng | **16** | không dùng 14 làm chữ thân như web: 14 trên điện thoại là chữ phụ |
| Chữ phụ | 13–14 | giờ, danh mục, chú thích |
| Nhãn thanh tab, chữ nhỏ nhất | 11 | **không chữ nào dưới 11** |
| Số lớn của thẻ số chính | 36/42, 600, `tabular-nums` | |
| Dòng danh sách | **56** một dòng, **64** hai dòng | icon tròn 40px, số tiền phải `tabular-nums`. Tên xuống dòng hết, không `line-clamp`, mô tả cũng vậy (`T14`): màn chạm không rê chuột để đọc `title`, tên dịch vụ đang chọn để trả tiền mà cụt thì không biết mình mua gì |
| Danh sách nhóm | màn `.is-grouped` (nền xám), các dòng trong **một thẻ** `rounded-[20px] bg-surface`, `divide-y` | tiêu đề nhóm 13px `text-muted` viết hoa, thụt 32px |
| Thẻ | `rounded-[20px]`, đệm 16–20 | |
| Ô nhập | cao **52**, `rounded-2xl`, chữ 16 | chữ 16 để trình duyệt di động không tự phóng to khi focus |
| Nút chính | cao **52**, `rounded-2xl`, chữ 16 `font-semibold` | |
| Điều khiển phân đoạn | rãnh 44 `bg-secondary`, **nút cao trọn 44** (`p-1`), viên chọn 36 nằm trong nút; tối đa 5 mục | chữ hoặc icon, không cả hai; chữ mục chưa chọn vẫn `--foreground` (`--muted` trên rãnh chỉ 4.04:1), mục chọn nền trắng |
| Công tắc | 51×31 | bật là màu thành công hay `--primary` |
| Sheet | bo 28 hai góc trên, thanh kéo 36×5 | `J6` |

**Mẫu trong `components/` viết cho web** (chữ thân `text-sm`, dòng 40–48px). Chép khuôn sang app điện thoại thì cỡ chữ,
chiều cao theo bảng trên: dòng thời gian, mô tả, danh sách lên chữ 16, chỗ bấm 44.

**Cao trong bảng là cao tối thiểu**: thứ có chữ (dòng, nút, ô chọn, thẻ) dùng `min-h-*`, không `h-*`; chữ xuống dòng,
không cắt. Người dùng bật chữ to trong máy (iOS khuyên app chịu được chữ to gấp đôi) thì dòng cao lên theo, không
tràn chữ ra ngoài. Hàng có tên trái, số phải mà chật thì số xuống dòng dưới tên (`flex-wrap`), không đè nhau. Riêng
thanh tab và thanh trên giữ `h-*` cố định: nền tảng cũng giữ cỡ hai thanh này khi chữ to.

## J5. Hành động chính và thẻ số chính

- **Mỗi màn một hành động chính** (`I2`).
  - Ở **màn gốc có việc thêm**: nút tròn 64px `bg-primary` **đứng riêng bên phải thanh tab, cùng hàng**;
    thanh tab thu lại (`right-[92px]`). **Chỉ khi thanh có tối đa 4 mục.** Thanh 5 mục giữ rộng hết, nút thêm
    là nút icon `plus` 44px bên phải tiêu đề lớn của màn gốc đó (`J3`). Nút nổi đè lên danh sách (góc phải trên thanh tab) che mất số tiền
    của dòng cuối.
  - Ở **form, sheet, màn xác nhận**: nút 52px **dính đáy**, cách hai mép 16px, đáy chừa thanh home, có vạch
    ngăn trên. Không tràn sát hai mép màn. Bàn phím mở thì nút nằm ngay trên bàn phím (`J13`). Trừ sheet nhiều ô bật
    bàn phím sẵn: "Lưu" chữ ở góc phải hàng đầu (`J6`), và màn sửa các trường của một bản ghi (`J14`).
- **Việc nguy hiểm** (xoá, đăng xuất) đứng riêng ở cuối màn, đỏ nhạt `bg-danger-bg text-danger` hay chữ đỏ
  trong thẻ riêng (`I4`), không cạnh nút chính.
- **Thẻ số chính** cho màn có một con số quan trọng (đã chi, số dư, số bước): một thẻ ở đầu màn, con số lớn
  nhất màn (`J4`), kèm một thanh tiến độ hay một dòng so sánh. Một thẻ như vậy mỗi màn.
  - **Nền tối trung tính `--hero-bg` (#1c1c1e), chữ trắng, không tô bằng màu nhấn** (chủ dự án chọn). Màu nhấn
    rực (tím, hồng, cam) làm nền thì thẻ thành mảng màu lớn nhất màn, nhìn thô; màu nhấn chỉ ở thanh tiến độ
    trong thẻ (`--hero-accent`: trắng khi màu nhấn trung tính, `color-mix(in oklab, var(--primary) 70%, white)`
    khi màu nhấn rực, để thanh đủ sáng trên nền tối).
  - **Lãi lỗ, tăng giảm trong thẻ** dùng bản sáng của hai màu: tăng tốt `#5fd99a`, giảm xấu `#ff9aab` (đạt 4.5:1 trên
    `#1c1c1e`); `--success`, `--danger` của nền sáng chìm trên nền tối. Kèm mũi tên hay dấu `+` để màu không là thứ duy
    nhất mang nghĩa (`N4`).

## J6. Sheet

- Trượt từ đáy 320ms, lớp phủ `bg-black/40`; bấm lớp phủ hay "Huỷ" thì đóng. **Một sheet một lúc.**
- Thanh kéo 36×5 giữa mép trên; hàng đầu 44px: "Huỷ" trái, tiêu đề giữa 17px. Nút chính đặt theo bàn phím,
  **một chỗ duy nhất**, không vừa trên đầu vừa dưới đáy:
  - **Sheet chọn một** (sắp xếp, chọn đơn vị, đổi trạng thái): hàng đầu là tiêu đề trái 17px, nút X 44px phải, không
    "Huỷ". Các dòng 56px, dòng đang chọn có ✓ phải; **bấm dòng là áp dụng và đóng**, không nút. Mục cần giải thích
    thì dòng hai tầng (tên, một câu `text-muted`).
  - **Menu ⋯** cũng là sheet chọn một: dòng icon 24px + nhãn, việc nguy hiểm chữ đỏ **đứng cuối** (`I4`).
  - **Sheet chọn nhiều, lọc, xác nhận** (không gõ): ô tick mỗi dòng, nút "Xong" / "Áp dụng" dính đáy sheet (`J5`).
  - **Sheet một ô** (số điện thoại, mã): nút ngay dưới ô (`J12`).
  - **Sheet nhiều ô mà ô đầu bật bàn phím sẵn** (thêm khoản chi, thêm giao dịch, thêm việc): nút chữ "Lưu" ở
    **góc phải hàng đầu**, đối xứng với "Huỷ": `h-11 px-3 text-base font-semibold text-primary`, mờ `opacity-40`
    khi chưa đủ để lưu (số tiền trống). Không thêm nút to dưới đáy. Đây là quy ước của cả hai nền tảng: sheet iOS đặt
    Huỷ trái, Xong phải trên thanh đầu; màn nhập toàn màn của Android đặt X trái, Lưu phải. Bàn phím ăn gần nửa
    màn: nút dính đáy phải đẩy lên theo bàn phím mà vẫn chiếm thêm 76px của phần form còn thấy; nút trên đầu lúc
    nào cũng thấy, gõ xong số tiền là lưu được ngay.
- Cao tối đa 92% màn, phần giữa cuộn riêng; sheet ngắn thì cao theo nội dung.
- Sheet cho việc ngắn trên màn đang xem (thêm, lọc, chọn); việc dài nhiều bước thì là màn con.
- **Đóng khi đã gõ thì hỏi.** Sheet có ô đã nhập (số tiền, mô tả) mà bấm "Huỷ", vuốt xuống hay chạm lớp phủ thì không
  đóng ngay: hiện hộp hỏi (`J7`) "Bỏ khoản chi này?", hai nút **"Bỏ"** chữ đỏ (`I4`: mất thứ vừa gõ) và **"Tiếp tục
  nhập"**. Chưa gõ gì thì đóng luôn, không hỏi. Cả hai nền tảng làm vậy (iOS chặn vuốt đóng sheet đang có thay đổi;
  Android hỏi bỏ bản nháp khi đóng màn nhập). Gõ xong số tiền mà lỡ tay chạm lớp phủ là mất trắng, người dùng
  phải nhớ lại và gõ từ đầu.

## J7. Phản hồi

- **Nhấn**: mọi thứ bấm được co `scale(0.97)` 120ms (`.press`), dòng danh sách thêm nền `active:bg-background`.
  Bỏ ô sáng mặc định khi chạm (`-webkit-tap-highlight-color: transparent`).
- **Thông báo ngắn**: viên tròn nền tối giữa màn, **ngay trên thanh tab**, tự đi sau 4 giây; có "Hoàn tác"
  thì một nút chữ trong viên. Không đặt ở đỉnh màn (dưới tai thỏ, ngoài tầm mắt khi đang thao tác đáy).
- Hộp hỏi (alert) chỉ cho việc không lấy lại được, tối đa 3 nút, nút huỷ là "Huỷ".

## J8. Gu lấy từ ảnh mẫu

Dùng (gặp ở phần lớn ảnh mẫu, hợp quy ước):
- Dòng chào nhỏ trên tiêu đề lớn, avatar góc phải ở màn đầu tiên.
- Thẻ số chính nền tối ở đầu màn (`J5`).
- **Dải ngày trong tuần** (7 ô cao 64 bo 16, hôm nay nền `--primary`, ngày có dữ liệu có chấm, ngày tương lai
  mờ và khoá) cho app theo ngày: thói quen, việc cần làm, chi tiêu, thể dục. Bảy ô là `grid grid-cols-7`
  không gap, mỗi ô viền trong suốt 3px `bg-clip-padding` (như `mobile-app.html`): khe giữa ô vẫn 6px mà cả cột
  là chỗ bấm, ở khổ 360 mỗi cột 47px. Đừng xếp `flex` cuộn ngang: ở 360 hàng lố 16px, ô cuối dính mép như bị
  cắt; `gap-1.5` thì ô còn 42px, dưới 44.
- **Chọn giờ** (đặt lịch, đặt bàn, đặt sân): dải ngày trong tuần ở trên, dưới là **chỉ giờ còn trống**, ô viền bo
  tròn 3–4 cột, giờ đang chọn tô đặc `--primary`. Giờ đã kín thì giấu, không gạch ngang hay làm mờ (phần lớn app
  đặt lịch thật và ảnh mẫu): gạch ngang lẫn giữa giờ trống làm màn nhiễu, mắt phải lọc. Luật giấu này chỉ cho **giờ**;
  ngày đã kín trong lịch tháng (đêm đã có khách đặt) vẫn giữ ô, mờ và khoá, vì lưới lịch phải đủ ngày. Nhiều giờ thì chia
  sáng / chiều / tối; buổi hết giờ là một hàng "Sáng · Đã kín" (tên buổi và chữ `text-muted` cùng hàng), không để
  tên buổi một dòng rồi "Đã kín" lơ lửng dòng dưới. Ngày kín cả ngày thì ô ngày mờ kèm chữ "Kín".
- **Ảnh thật dùng to**: app có hình (tiệm, món, phòng, người làm) thì trang chủ có ảnh tiệm hay ưu đãi cao
  140–180px, thẻ dịch vụ và người làm có ảnh, không chỉ avatar 40px. Ảnh lớn là thứ làm app trông "muốn dùng";
  màu nhấn thì chỉ ở nút và chỗ đang chọn.
- Icon danh mục trong vòng tròn 40px nền nhạt của một sắc riêng, chữ icon đậm cùng sắc (đạt 4.5:1).

Không dùng (đẹp trong ảnh, hỏng trên máy thật):
- Chữ 9–10px, chữ pastel trên nền pastel (dưới 4.5:1).
- Minh hoạ 3D, nhân vật trang trí chiếm nửa màn ở màn làm việc. Nhân vật và minh hoạ chỉ ở các chỗ của `J16`.
- Nhiều màu nhấn trên một màn; thanh tab không có chữ; nút "+" nằm giữa thanh tab.
- Dải đầu màn tô màu nhấn, nút gradient, bóng đậm: kiểu cũ, ảnh mẫu được khen không còn dùng.

## J9. Chuyển sang code React Native, Flutter ⚑

Audit câu 2 thấy dự án là app điện thoại (`react-native` / `expo` trong `package.json`, hay có `pubspec.yaml`):

- **Báo một dòng** ("Audit: Flutter 3, có `go_router`, theme ở `lib/theme.dart`") và **không viết HTML, Tailwind
  vào dự án của họ**. Bản mẫu HTML (wireframe, bộ màn duyệt) để ở `$TMPDIR/evon-design/` như mọi wireframe.
- **HTML là bản chốt hình.** Người dùng duyệt bộ màn xong mới chuyển sang code của dự án, màn nào khớp màn đó.
- **Số giữ nguyên**: 1px trong khung 390 là 1pt iOS, 1dp Flutter và React Native. Chữ 16, chỗ bấm 44, lề 16, bo 20
  sang code vẫn là 16, 44, 16, 20.
- **Chữ theo cỡ chữ của máy**: không tắt phóng chữ cho cả app (`allowFontScaling={false}` của React Native,
  `TextScaler.noScaling` của Flutter). Chỉ thanh tab, thanh trên được chặn trần (`maxFontSizeMultiplier` ~1.3,
  `MediaQuery.withClampedTextScaling`). Chiều cao `min-h` của bản HTML sang code là `minHeight`, không `height`. Kiểm
  ở cỡ chữ lớn nhất của máy ảo trước khi giao (`J4`).
- **Token gom về một chỗ** (object theme của React Native, `ThemeData` / `ColorScheme` của Flutter), đặt tên như
  `tokens.css` (`primary`, `background`, `surface`, `muted`, `border`…). Không chép mã màu rải ở từng màn.
- **Dùng khối có sẵn của nền tảng, không tự dựng lại** (tự dựng thì mất vuốt đóng sheet, nút quay lại của Android,
  trình đọc màn hình):

| Trong HTML mẫu | React Native | Flutter |
| --- | --- | --- |
| `--inset-top`, `--inset-bottom` | `react-native-safe-area-context` (`useSafeAreaInsets`) | `SafeArea`, `MediaQuery.paddingOf` |
| thanh tab (`J2`) | thư viện điều hướng dự án đang dùng (bottom tabs), thanh nổi bằng `tabBarStyle` | `NavigationBar` / `BottomNavigationBar` trong `Scaffold` |
| màn con đẩy vào (`J3`) | stack navigator, `headerBackTitle` = tên màn cha | `Navigator.push` / router của dự án, `AppBar` |
| sheet (`J6`) | thư viện bottom sheet dự án có, chưa có thì `Modal` với `presentationStyle="pageSheet"` | `showModalBottomSheet(showDragHandle: true)` |
| nhấn co 0.97 (`J7`) | `Pressable` + `transform: [{ scale }]` | `InkWell` / `GestureDetector` + `AnimatedScale` |
| thông báo ngắn (`J7`) | thư viện toast dự án có | `SnackBar` (`behavior: floating`) |
| icon `lucide` | `lucide-react-native` | `lucide_icons` hay bộ icon dự án đang dùng |

- Khối chưa có tương ứng (dải ngày, thẻ số chính) thì dựng component riêng trong thư mục component của dự án,
  theo đúng số của bản HTML.


## J10. Chuyển động ⚑

Lấy từ tài liệu thiết kế chính thức: trang Motion và Accessibility của iOS (không cho số ms, chỉ cho nguyên
tắc), token motion của Material 3 (thời lượng, đường cong, spring ba tốc độ).

- **Chuyển động phải có việc**: cho thấy màn từ đâu tới, thứ gì vừa đổi, cử chỉ có ăn không. Không thêm cho
  đẹp. Thao tác lặp nhiều lần (bấm dòng, đổi tab, tick) chỉ có phản hồi nhấn `J7`; **đổi tab thì đổi ngay**,
  không trượt ngang giữa các tab.
- **Thời lượng theo diện tích**: vùng chuyển động càng lớn càng lâu, **ra nhanh hơn vào**. Thao tác thường không
  quá 400ms; từ 500ms trở lên chỉ cho màn chào lần đầu.

| Thứ | Vào | Ra | Tốc độ spring khi sang code |
| --- | --- | --- | --- |
| Nhấn co 0.97 (`J7`), công tắc, ô chọn | 120ms | 120ms | fast |
| Đổi màu, độ mờ trong một khối | 150ms | 150ms | fast (effects) |
| Lớp phủ sau sheet | 240ms | 200ms | default (effects) |
| Sheet (`J6`), thông báo ngắn | 320ms | 250ms | default |
| Màn con đẩy vào (`J3`) | 300ms | 250ms | slow |

- **Đường cong**: thứ đi vào dùng đường giảm tốc `cubic-bezier(0.2, 0.8, 0.2, 1)` (như `mobile-app.html`), thứ
  đi ra dùng đường tăng tốc `cubic-bezier(0.3, 0, 1, 1)`. Không `linear` cho thứ di chuyển; `ease` chỉ cho độ mờ.
- **Đi theo tay, ngắt được**: mở từ đáy thì kéo xuống để đóng, không vuốt ngang; màn con vuốt từ mép trái để
  quay lại. Đang chạy mà người dùng bấm tiếp thì đổi hướng ngay từ chỗ đang dở, không bắt chờ chạy xong. Trong
  HTML mẫu, thứ mở / đóng (sheet, lớp phủ) dùng `transition` (đảo được giữa chừng), không dùng `@keyframes`.
- **Giảm chuyển động** (`prefers-reduced-motion`, Reduce Motion của iOS, tắt animation của Android): **không tắt
  sạch**. Trượt, phóng to đổi thành mờ dần 200ms; bỏ co khi nhấn, bỏ nảy; không làm mờ nền (blur) bằng chuyển
  động. Thứ chỉ có độ mờ (lớp phủ) giữ nguyên.
- **Nảy**: mặc định gần như không nảy (Material chuẩn: damping 0.9). Nảy rõ (damping 0.6–0.8, bộ Expressive) chỉ
  khi đề nói app vui tươi (trẻ em, game, mạng xã hội), và chỉ ở nút, icon nhỏ, không ở sheet hay chuyển màn.
- **Hình động minh hoạ** (Lottie, Rive): chỉ ở màn chào lần đầu, trạng thái rỗng, màn thành công (`J8`), chạy một
  lần rồi dừng ở khung cuối, không lặp mãi ở màn làm việc. Giảm chuyển động thì hiện ngay khung cuối. Bản HTML
  mẫu để hình tĩnh cùng kích cỡ, không nhúng file động.

**Sang code** (`J9`): thư viện sheet, điều hướng có sẵn đã có spring riêng của nền tảng, giữ nguyên, không
chỉnh lại. Bảng dưới cho chuyển động tự dựng. Spring theo số Material (mass 1):

| Thứ | React Native | Flutter |
| --- | --- | --- |
| Thư viện | `react-native-reanimated` + `react-native-gesture-handler` (có sẵn trong Expo) | animation có sẵn (`AnimatedScale`, `AnimatedOpacity`, `AnimatedContainer`); `flutter_animate` nếu dự án đã có |
| Spring fast | `withSpring(v, { stiffness: 1400, damping: 67, mass: 1 })` | `SpringDescription.withDampingRatio(mass: 1, stiffness: 1400, ratio: 0.9)` |
| Spring default | `{ stiffness: 700, damping: 48, mass: 1 }` | `stiffness: 700, ratio: 0.9` |
| Spring slow | `{ stiffness: 300, damping: 31, mass: 1 }` | `stiffness: 300, ratio: 0.9` |
| Độ mờ, màu (không nảy) | `withTiming(v, { duration: 150 })` | `Curves.easeOut`, 150ms |
| Giảm chuyển động | `useReducedMotion()` của Reanimated | `MediaQuery.disableAnimationsOf(context)` |
| Hình động minh hoạ | `lottie-react-native` | `lottie` |

`damping` của React Native là `ratio × 2 × √stiffness` (mass 1), tính sẵn từ ratio 0.9 của Material.

## J11. App đặt món, đồ uống, bán hàng ⚑

Đối chiếu ảnh màn thật của 12 app đặt món, đồ uống, giao đồ ăn trong và ngoài nước. **Code mẫu đã duyệt:
`layouts/mobile-order.html`** (đặt món, sheet chọn món, giỏ hàng, ưu đãi, đơn hàng; các màn của `J12`). Thanh tab 3–4
mục (Đặt món, Ưu đãi, Đơn hàng, Tài khoản), không mục "Khác" ba gạch (`J2`).

**Màn đặt món (màn gốc)**
- **Đầu màn là một hàng chọn cách nhận và nơi nhận**, thay tiêu đề lớn của `J3`: "Giao đến · Nhà ▾" 13px
  `text-muted` trên, tên đường 16px dưới, icon tròn 40px trái, nút tìm 44px phải. Hàng này cuộn đi cùng nội dung,
  không dính, không hai thẻ chồng nhau: đầu màn dính cố định ăn mất 1/4 màn ở mọi lần cuộn.
- **Một ảnh ưu đãi** cao 160px (`J8`), chữ là HTML trên lớp tối của ảnh, không chữ in sẵn trong ảnh. Không băng
  chuyền nhiều banner, không năm sáu khối khuyến mãi chồng nhau trước khi tới menu.
- **Danh mục**: ảnh tròn 56px, tên 13px dưới; đến 5 mục thì `grid-cols-5` vừa khung, nhiều hơn thì hàng cuộn lộ
  nửa ô (`J8`). Bấm thì cuộn tới mục đó trong menu.
- **Dòng món**: ảnh 88px bo 16 trái; tên 16 và mô tả 13 đủ chữ (`J4`); giá 16 đậm, giá gốc gạch ngang 13px cạnh nếu
  đang giảm; nút "+" tròn 44px cuối dòng. Bấm dòng mở sheet chọn món. Nút "+" của món có lựa chọn bắt buộc cũng mở
  sheet; món không có lựa chọn (bánh, nước chai) thì thêm thẳng, báo bằng thông báo ngắn (`J7`).
- **Hết hàng**: dòng giữ chỗ cũ, ảnh mờ xám, chữ "Hết hôm nay · có lại 7:00 sáng mai", không nút "+".
- **Thanh giỏ hàng**: giỏ có món thì một thanh 56px `bg-primary` bo tròn nằm ngay trên thanh tab (cách 8px, cùng
  lề 16px): số món trái, "Xem giỏ hàng", tổng tiền phải; bấm mở giỏ. Chỉ ở màn đặt món; vùng cuộn chừa
  `.pad-cartbar` (inset + 160px). Ngoài thanh này, không thẻ nổi nào khác ở đáy (thẻ mời đánh giá đơn, banner):
  chúng đè lên menu, lên nút "Chọn" ở mọi màn.

**Sheet chọn món**
- Sheet cao 92% (`J6`), đóng bằng nút X 44px góc phải, không "Huỷ" (đây là xem món, chưa phải form). Ảnh món 256px
  trên đầu; cuộn qua ảnh thì hiện thanh 56px có tên món, nút X gắn vào sheet nên luôn trong tầm.
- **Thứ tự**: tên 24px, giá gốc, mô tả → các nhóm bắt buộc → nhóm thêm (topping) → số lượng → ghi chú cho quán
  cuối cùng. Gợi ý dùng kèm không chen trước lựa chọn bắt buộc: để ở giỏ hàng.
- **Mọi nhóm là dòng 56px**: nút chọn tròn (chọn 1) hay vuông (chọn nhiều) trái, tên giữa, phần cộng thêm
  "+6.000đ" phải `text-muted`. Không cộng thêm thì để trống, không ghi "0đ"; giá gốc là lựa chọn rẻ nhất nên
  không có số âm. Không dùng viên chip cho lựa chọn: chip có giá thành chuỗi dài "Sữa yến mạch: 5.000đ", bốn chip
  rớt một chip xuống dòng ở khổ 360.
- **Tiêu đề nhóm** 17px đậm, cùng hàng bên phải "Bắt buộc · chọn 1" hay "Không bắt buộc · tối đa 2" 13px
  `text-muted`. Không dấu sao đỏ. Chọn đủ giới hạn thì các dòng còn lại mờ và khoá.
- **Chọn sẵn**: app của một quán chọn sẵn lựa chọn phổ biến (cỡ vừa, đá bình thường) để thêm được ngay. App sàn
  nhiều quán không chọn sẵn; nút ghi "Còn 2 mục bắt buộc" và khoá tới khi chọn đủ.
- **Đáy**: một nút 52px giãn hết bề ngang (`J5`), "Thêm vào giỏ · 55.000đ", giá đổi ngay theo lựa chọn × số lượng.
  Bộ đếm số lượng nằm trong nội dung (hàng "Số lượng"), không chen cạnh nút ở đáy.

**Giỏ hàng** (màn con, `J3`)
- **Một trang cuộn, không chia bước.** Thứ tự: cách nhận (điều khiển phân đoạn "Giao tận nơi | Tự đến lấy") →
  thẻ dòng địa chỉ đủ chữ, giờ nhận, lời nhắn cho tài xế → món đã chọn với nút "Thêm món" → gợi ý dùng kèm (hàng
  thẻ nhỏ cuộn ngang) → ưu đãi, thanh toán (dòng có chevron) → tóm tắt tiền.
- **Dòng món**: ảnh 56px, tên, giá bên phải; lựa chọn ghi đủ dưới tên, 13px `text-muted`; "Sửa" mở lại sheet; bộ
  đếm trên dòng, số lượng 1 thì nút trừ thành thùng rác. Không cần nút "Xoá cả giỏ"; có thì ở cuối màn, chữ đỏ, hỏi
  lại (`J7`). Đừng đặt ở góc trái thanh trên, chỗ ngón tay quen bấm để quay lại.
- **Tóm tắt tiền**: tạm tính, phí giao, ưu đãi (dấu − màu thành công), rồi tổng cộng 17px đậm sau vạch. Tổng trên
  nút phải khớp dòng tổng, không có khoản nào ẩn.
- Nút "Đặt hàng · 135.300đ" dính đáy, cách hai mép 16px (`J5`). Không thanh màu tràn sát mép, không chữ in hoa.

**Ưu đãi, thành viên**
- **Thẻ thành viên** là thẻ số chính (`J5`), nền tối: hạng, điểm là số lớn nhất màn, thanh tiến độ tới hạng sau.
  Mã quét ở quầy (mã vạch hay QR) nằm trong ô **trắng** riêng, vì máy quét cần nền sáng; dưới mã là số mã chữ to.
- **Phiếu ưu đãi**: thẻ có cuống trái 96px nền nhạt một sắc ghi mức giảm to ("15%"); thân phải ghi tên phiếu đủ
  chữ, điều kiện 13px `text-muted`, hạn. Hạn dưới 24 giờ thì chữ đỏ, còn lại `text-muted`. Bấm phiếu là áp vào giỏ.

**Đơn hàng**
- Đơn đang làm ở đầu màn: trạng thái bằng chữ, thanh bước 3 đoạn, giờ dự kiến là chữ lớn nhất thẻ. Đơn cũ là dòng
  có nút "Đặt lại" 44px, bỏ nguyên món và lựa chọn cũ vào giỏ.

## J12. Mở app lần đầu, đăng nhập, xin quyền, rỗng ⚑

Lấy từ tài liệu chính thức (trang Onboarding, Managing accounts, Privacy của iOS; quyền thông báo của Android; mục
4.8 và 5.1.1(v) của luật duyệt App Store) cộng ảnh màn thật của các app đặt món, ví, mạng xã hội, học, nghe nhạc.
Code mẫu: các màn đăng nhập, nhập mã, bật thông báo, đơn hàng trống, tài khoản trong `layouts/mobile-order.html`.

**Mở app lần đầu**
- **App mua bán, đặt món, đặt lịch: vào thẳng app**, xem menu, thêm giỏ không cần tài khoản; chỉ hỏi đăng nhập ở
  bước cần biết ai làm (bấm "Đặt hàng", "Đặt lịch"). Bắt đăng nhập trước khi cho xem là mất người chưa kịp thấy gì.
- **App phải có tài khoản mới dùng được** (ví, mạng xã hội, học): **một màn chào**, không băng chuyền 3–4 trang.
  Màn chào: logo, một ảnh hay hình lớn, tiêu đề ngắn nói app làm gì, nút chính "Bắt đầu" 52px, nút phụ "Tôi đã có
  tài khoản" 44px dưới, cả hai dính đáy. Đề đòi giới thiệu nhiều trang thì tối đa 3, "Bỏ qua" góc phải mọi trang,
  nút chính luôn ở đáy; chỉ hiện một lần.

**Đăng nhập**
- **App cho người Việt: số điện thoại + mã 6 số là cách chính.** Ô số điện thoại 52px, mã vùng "+84" là nút đổi nước
  nằm trong cùng khung bên trái, `type="tel"` `autocomplete="tel-national"`, chữ 16. Dưới là nút "Tiếp tục".
  App cho người nước ngoài thì email hay số điện thoại, theo đề.
- **Mạng xã hội là đường phụ**: sau vạch "hoặc", nút viền 52px xếp dọc đủ chữ "Tiếp tục với Apple", "Tiếp tục với
  Google", logo gốc (`F16`). **Có Google, Facebook thì có Apple**, cùng cỡ, không phải cuộn mới thấy (luật duyệt App
  Store 4.8: app dùng đăng nhập bên thứ ba phải có thêm một lối đăng nhập giữ kín email; Apple là lối đó). Chỉ số
  điện thoại thì không cần.
- **Câu điều khoản** 13px `text-muted` dưới các nút: "Bằng việc tiếp tục, bạn đồng ý với Điều khoản và Chính sách
  quyền riêng tư", hai link gạch chân. Không ô tick bắt buộc.
- **Mở từ một việc thì là sheet** (`J6`) trên màn đang làm, câu dẫn nói vì sao ("Đăng nhập để đặt hàng", "Giỏ hàng
  giữ nguyên"), đăng nhập xong làm tiếp đúng việc đó. Màn đăng nhập đứng riêng chỉ cho app phải có tài khoản, sau
  màn chào. Trong sheet không cần logo (người dùng đã ở trong app); màn đứng riêng thì có (`layouts/form.md`).
- **Nhập mã** là bước sau trong cùng sheet, nút trái là chevron quay lại bước số. Theo `components/otp-input.md`
  (6 ô, ô đầu `autocomplete="one-time-code"` để iOS gợi ý mã từ SMS trên bàn phím, "Đổi số", đếm ngược), khác web
  hai chỗ: ô cao 56px, và hết đếm thì ngoài "Gửi lại mã" có thêm **"Gọi điện đọc mã"** (SMS hay trễ, phần lớn app
  Việt có lối này). Nút chính nói việc sẽ xảy ra: "Xác nhận và đặt hàng", không chỉ "Xác nhận".
- Sheet một ô nhập: nút chính nằm ngay dưới ô, không dính đáy sheet, vì bàn phím che đáy (nhiều ô thì `J6`). Sang code thì sheet đẩy
  lên theo bàn phím (`KeyboardAvoidingView`, `viewInsets`).

**Xin quyền** (vị trí, thông báo, máy ảnh, danh bạ)
- **Không xin lúc mở app.** Xin đúng lúc dùng tính năng cần nó: vị trí khi bấm "Quán gần tôi" hay chọn địa chỉ,
  thông báo **ngay sau khi đặt đơn xong** ("Báo khi đơn đang tới?"), máy ảnh khi bấm quét mã.
- **Màn mồi trước hộp của hệ thống**: sheet ngắn, icon 28px trong vòng 64px, tiêu đề 20px nói lợi ích cho người
  dùng, một câu nói sẽ báo gì và không báo gì, nút chính **"Tiếp tục"** (mở hộp của hệ thống; không ghi "Cho phép"
  vì hộp hệ thống mới là chỗ cho phép), nút chữ "Để sau". Bấm "Để sau" thì không hỏi lại ở lần đặt sau.
- **Xin đánh giá app** (hộp sao của hệ thống) chỉ sau khi người dùng làm xong một việc có ích (nhận đơn, xong buổi
  tập), không lúc mở app, không giữa luồng, không đặt nút "Đánh giá 5 sao" tự vẽ. Hệ thống tự giới hạn số lần hiện.
- **Đã từ chối thì không hỏi lại bằng hộp**: dòng trong Tài khoản › Cài đặt ghi trạng thái ("Thông báo · Đang tắt"),
  bấm thì mở Cài đặt của máy. Ở chỗ tính năng cần quyền (bản đồ quán), một dòng nhắc kèm nút "Mở Cài đặt".

**Rỗng**
- **Màn gốc của tab chưa có gì** (chưa có đơn, chưa lưu món, chưa có thông báo) là ngoại lệ "màn chính chưa có gì"
  của `components/empty-state.md`: khối giữa vùng trống, hình theo `J16` (nhân vật rộng 35–50% màn; app không dùng
  nhân vật thì icon 36px trong vòng tròn 80px nền `--background`), tiêu đề
  20px "Chưa có đơn nào", một câu `text-muted` nói thứ gì sẽ hiện ở đây, **một** nút chính dẫn tới việc làm nó đầy
  ("Xem menu"), nút rộng theo chữ, không giãn hết. Tiêu đề lớn của màn và thanh tab giữ nguyên chỗ.
- **Hình**: phần lớn app dùng hình minh hoạ của thương hiệu, rộng 35–50% màn, ở chỗ này (11/24 màn rỗng đếm được,
  icon trần chỉ 1). Hình lấy theo `J16`: bộ hình của dự án, chưa có thì nhân vật free sinh tại chỗ.
- Rỗng trong một khối, một mục, kết quả tìm, lọc: vẫn một dòng chữ mờ theo `components/empty-state.md`. Tìm không
  ra món thì dưới dòng đó gợi ý vài món bán chạy, không để trắng.
- Giỏ trống: thanh giỏ hàng ẩn (`J11`); vào giỏ bằng link thì giỏ là màn rỗng như trên, nút "Xem menu".

**Tài khoản, xoá tài khoản**
- App cho tạo tài khoản thì **phải có "Xoá tài khoản" ngay trong app** (luật duyệt App Store 5.1.1(v)), không bắt
  gọi tổng đài hay gửi email. Đặt ở cuối màn Tài khoản (màn nhóm `.is-grouped`), cùng thẻ với "Đăng xuất", cả hai chữ
  đỏ (`I4`: đăng xuất câu 3, xoá tài khoản câu 1). Bấm thì sang màn nói rõ mất gì (điểm, phiếu, lịch sử đơn), rồi xác
  nhận lại bằng mã OTP.

## J13. Ô nhập và bàn phím ⚑

Lấy từ trang Virtual keyboards, Accessibility của iOS. Bàn phím ăn gần nửa màn, nên ô sai loại hay nút bị che là lỗi
người dùng gặp ngay lần gõ đầu.

- **Mỗi ô đúng loại bàn phím**, ghi trong HTML mẫu để người chuyển sang code chép theo:

| Ô | HTML | Sang code |
| --- | --- | --- |
| Số tiền, số lượng | `inputmode="numeric"` (có lẻ thì `decimal`) | `keyboardType="number-pad"` / `TextInputType.number` |
| Số điện thoại | `type="tel"` `autocomplete="tel-national"` | `phone-pad`, `textContentType="telephoneNumber"` |
| Email | `type="email"` `autocomplete="email"` | `email-address`, `autoCapitalize="none"` |
| Mật khẩu | `type="password"`, `autocomplete="current-password"` (đăng ký: `new-password`) | `secureTextEntry`, `textContentType="password"` |
| Mã OTP | `inputmode="numeric"` `autocomplete="one-time-code"` | `textContentType="oneTimeCode"` / `AutofillHints.oneTimeCode` |
| Tên, địa chỉ | `autocomplete="name"`, `street-address` | `textContentType="name"`, `fullStreetAddress` |
| Tìm kiếm | `type="search"` `enterkeyhint="search"` | `returnKeyType="search"` |

- Email, mã, tên đăng nhập tắt tự viết hoa, tự sửa chữ (`autocapitalize="off"` `autocorrect="off"` `spellcheck="false"`).
- **Phím Enter nói việc tiếp theo**: form nhiều ô thì `enterkeyhint="next"` nhảy sang ô sau, ô cuối `done` hay
  `send`; Enter ở ô cuối làm đúng việc của nút chính.
- **Bàn phím mở thì ô đang gõ và nút chính vẫn thấy.** Nút dính đáy của form (`J5`) đẩy lên nằm ngay trên bàn phím,
  vùng cuộn co lại để ô đang gõ không chui dưới bàn phím. Sheet có ô nhập theo `J6` (một ô: nút ngay dưới ô; nhiều
  ô bật bàn phím sẵn: "Lưu" góc phải hàng đầu). Sang code:
  `KeyboardAvoidingView` hay `react-native-keyboard-controller`; Flutter giữ `resizeToAvoidBottomInset` mặc định.
- **Màn hay sheet chỉ có một ô chính** (tìm kiếm, số tiền ở sheet thêm, mã OTP) thì focus sẵn, bàn phím lên luôn.
  Form nhiều ô không tự bật bàn phím: người dùng cần nhìn hết form trước.
- Cuộn danh sách hay bấm ra ngoài ô thì cụp bàn phím (`keyboardDismissMode="on-drag"`, `onTapOutside`).
- **Ô số tiền to giữa sheet co theo chữ** (`[field-sizing:content] min-w-8 text-center`, như `mobile-app.html`), đơn vị
  "đ" cách số 4px (`gap-1`). Ô rộng cố định thì số căn giữa trong ô, "đ" đứng trơ cách xa 20–40px tuỳ số dài ngắn.
  Trình duyệt chưa có `field-sizing` thì đo chữ và đặt `width` bằng JS mỗi lần gõ. Probe báo "cách "đ" …px".
- **Wireframe và bản mẫu vẽ bàn phím** ở màn hay sheet bật bàn phím sẵn: khối `bg-[#d1d3d9]` dính đáy khung, cao
  khoảng 290px (bàn phím số ở khung 390×844; bàn phím chữ có hàng gợi ý khoảng 335px), che phần dưới như máy thật;
  bấm ra ngoài ô thì cụp. Màn có nút dính đáy thì nút nằm ngay trên khối đó. Không vẽ thì người duyệt thấy cả form,
  chọn phương án mà không biết lúc gõ số tiền chỉ còn thấy nửa trên, hàng chọn người nằm dưới bàn phím. Code bàn phím
  chữ và bàn phím số chép từ `layouts/mobile-playful.html` (màn Tên gọi, màn Nhập mã), không vẽ lại.

## J14. App quản lý, nhập liệu ⚑

Kho, sổ sách, chấm công, ghi chép theo ngày: dữ liệu nhiều trường, người dùng nhập số liên tục. Đối chiếu khoảng
450 màn đọc được của năm app được khen (ghi chép theo ngày, quản lý cửa hàng, ngân hàng, mạng xã hội, hẹn hò); chỉ
ghi chỗ từ hai app trở lên làm giống nhau hay khớp quy ước iOS / Android. Mọi số đo vẫn theo `J4`.

**Dời app web sang điện thoại**
- **Sidebar thành thanh tab** (`J2`): 3–5 mục dùng hằng ngày lên thanh, mục còn lại vào tab cuối (Tài khoản, màn
  nhóm `.is-grouped`). Không giữ cột icon dọc bên trái, càng không hai cột chồng nhau: ở khổ 390 hai cột ăn 1/3 màn,
  nội dung còn lại bóp chữ dựng đứng từng ký tự.
- **Tab con của một mục** (Kho / Xuất / Nhật ký / Nhà cung cấp) là điều khiển phân đoạn ngay dưới tiêu đề (`J4`,
  tối đa 4 mục chữ ngắn), nhiều hơn hay chữ dài thì hàng chip cuộn ngang. Không xếp dọc thành khối nút chiếm nửa màn.
- **Lọc** là hàng chip cuộn ngang dưới ô tìm, mỗi chip một điều kiện ("Loại ▾", "Tháng 10 ▾"), bấm mở sheet chọn
  (`J6`); chip chưa lọc chỉ viền, chip đang lọc tô đặc. **Đầu hàng là nút icon lọc** 44px mở màn lọc đủ mọi điều kiện,
  có số điều kiện đang áp. Sắp xếp là một chip "Mới nhất ⇕" mở sheet chọn một. Không thanh công cụ nhiều nút icon
  không chữ.
- **Bộ lọc dùng hằng ngày thành tab** ngay trên danh sách (Tất cả / Chưa xuất / Sắp hết), điều khiển phân đoạn hay
  hàng chữ cuộn ngang; người dùng mở app là một chạm tới đúng việc, không phải dựng lọc mỗi lần.
- **Điều kiện đang áp hiện thành chip có ⊗** dưới hàng lọc ("Cát ⊗", "Tháng 10 ⊗"), bấm ⊗ bỏ đúng điều kiện đó.

**Tìm**
- Ô tìm trống thì hiện "Tìm gần đây" (mỗi dòng có ⊗ xoá, đầu khối "Xoá hết") rồi gợi ý, không để trắng. Đang gõ thì
  kết quả chia khối theo loại, mỗi khối tiêu đề kèm "Xem tất cả ›"; nhiều loại thì chip phạm vi có số đếm ("Vật tư 7",
  "Phiếu 3").
- **Tìm hay tạo trong một ô** (chọn loại, nhà cung cấp, nhãn): gõ tên chưa có thì dòng đầu kết quả là
  "+ Thêm "Cát vàng"", bấm là tạo và chọn luôn. Không bắt rời màn sang form tạo riêng.

**Dữ liệu nhiều cột: danh sách dòng, không bảng**
- Bảng 6–8 cột của web thành **dòng hai tầng** (`J4`, 64px): tên 16px trên, dòng phụ 13px `text-muted` ghép
  2–3 trường bằng "·" ("Xi măng PCB40 · Tấn"), **số quan trọng nhất** bên phải 16px `font-semibold tabular-nums`, số
  thứ hai ngay dưới 13px nếu cần ("Tồn 2.690" / "Xuất 100"). Bấm dòng mở màn chi tiết có đủ mọi trường.
- **Chọn một hai số cho dòng**, không nhồi cả bảng: số người dùng nhìn để quyết (tồn hiện tại, số tiền, trạng thái).
  Các cột còn lại (nhập, xuất, ghi chú, đơn vị) ở chi tiết. Cột STT bỏ: danh sách đã có thứ tự.
- **Nhóm có tổng** (theo loại, theo ngày): tiêu đề nhóm 13px `text-muted` kèm tổng nhóm cùng hàng bên phải, các dòng
  bên dưới. Không dòng "Tổng …" lặp tên nhóm lẫn giữa các dòng thường.
- Bảng cuộn ngang (`R9`) chỉ khi người dùng thật sự so cột với cột (bảng giá, bảng chấm công cả tháng); khi đó cột
  tên ghim trái và đầu bảng dính trên.

**Chọn từ danh sách để thêm** (thêm vật tư vào phiếu, món vào bữa, sản phẩm vào đơn)
- Màn con: tab nhóm trên đầu (Tất cả / Hay dùng / Đã lưu), ô tìm, rồi các dòng hai tầng có nút `+` 44px cuối dòng
  **thêm thẳng** với số lượng mặc định, báo bằng thông báo ngắn (`J7`). Bấm vào dòng thì mở chi tiết để chỉnh số lượng,
  đơn vị trước khi thêm. Giống dòng món của `J11`.
- **Thêm nhiều mục một lần** (chọn vật tư cho phiếu): ô tick mỗi dòng thay nút `+`, mục cha có biến thể thì ô tick ba
  trạng thái, biến thể thụt vào dưới; mỗi dòng ghi số còn ("99 còn", hết thì "⚠ 0 còn" chữ cảnh báo). Đáy ghi "Đã chọn
  3" kèm nút "Thêm", hay "Xong" góc phải hàng đầu.
- Chưa gõ tìm thì hiện "Gợi ý" hay "Dùng gần đây", không để trắng. Đáy màn có lối phụ khi không tìm thấy: nút viền
  "Thêm thủ công" (và "Quét mã" nếu app có), hai nút chia đôi hàng.

**Số lượng, đơn vị, ngày**
- **Đơn vị** chọn bằng điều khiển phân đoạn ngay trên hàng số lượng (Tấn / m³ / Bao), chọn sẵn đơn vị hay dùng nhất của
  mục đó. Đổi đơn vị thì số quy đổi ngay, không xoá số đã nhập.
- **Số lượng là một hàng**: nhãn trái, giá trị phải dạng nút viền "1 ✎" 44px. Bấm thì bàn phím số bật lên (`J13`,
  `decimal` khi có lẻ), phía trên bàn phím có "Hoàn tác" và "Xong". Các số tính từ số lượng (thành tiền, tồn sau xuất)
  đổi ngay theo từng phím gõ.
- **Bộ đếm "− 3 +"** (nút 44px hai bên, số giữa `tabular-nums`) thay ô gõ khi số nhỏ và đổi từng đơn vị: số cái, số
  thùng, điều chỉnh tồn vài đơn vị. Số lớn hay có lẻ (tấn, m³, tiền) thì gõ: bấm cộng 200 lần không ai làm. Sửa tồn
  nhiều biến thể là danh sách mỗi biến thể một hàng có bộ đếm, sửa hết rồi "Lưu" một lần, cạnh số mới ghi "Cũ: 100
  (+1)".
- **Ngày là một hàng** "Ngày · Hôm nay ›", mặc định hôm nay, bấm mở sheet lịch tháng (`J6`), ngày đang chọn tô đặc,
  nút "Lưu" dính đáy sheet. Phần lớn lần nhập là hôm nay, nên không bắt chọn ngày mỗi lần.

**Chi tiết và sửa bản ghi** (phiếu nhập, phiếu xuất, vật tư, món)
- Tên lớn đầu màn kèm nút bút 44px để đổi tên (mở màn một ô, `J12`), bản ghi mới chưa đặt tên thì "Chạm để đặt tên".
- Số chính trong thẻ số chính (`J5`); dưới là **2–4 số phụ trong các ô bằng nhau** `grid grid-cols-3 gap-2`, mỗi ô nhãn
  13px trên, số 17px dưới. Nhiều hơn 4 số phụ thì phần ít dùng gấp vào một dòng "Thông tin khác ›".
- Danh sách mục con (vật tư trong phiếu): dòng hai tầng có nút thùng rác 44px cuối dòng, xoá có Hoàn tác (`J7`); dòng
  cuối danh sách là "+ Thêm mục" viền đứt. Màn tạo có một việc cuối thì nút chính dính đáy ("Tạo phiếu", "Thu tiền"),
  **mờ và khoá khi chưa đủ** (phiếu chưa có mục nào), không báo lỗi sau khi bấm.
- **Chi tiết chia khối**, mỗi khối tiêu đề 17px trái, việc của khối là link chữ phải ("Sửa", "Xem tất cả") hay nút ⋯.
  Việc chính của một khối (đánh dấu đã giao, duyệt phiếu) là nút nằm trong khối đó, không dính đáy cả màn.
- **Dòng giá trị**: nhãn trái, giá trị hiện tại `text-muted` phải. Cuối dòng là › khi bấm sang màn khác, ⇕ khi bấm
  mở sheet chọn một tại chỗ (`J6`): người dùng biết trước mình sẽ rời màn hay không. Trạng thái (Đang dùng / Nháp /
  Ngưng) là dòng giá trị với badge, bấm mở sheet chọn một, mỗi trạng thái một câu nói rõ nghĩa.
- **Màn sửa các trường của một bản ghi** (sửa vật tư, sửa nhà cung cấp, nhiều khối): "Huỷ" trái, "Lưu" phải ở thanh
  trên, "Lưu" mờ khi chưa đổi gì; **không nút dính đáy và ẩn thanh tab** (`J2`). Form dài cuộn tới đâu cũng lưu được
  ngay, đáy không có dải nút che khối cuối. Thoát khi có thay đổi chưa lưu thì hộp hỏi (`J7`).

**Nút thêm có nhiều loại** (nhập kho, xuất kho, kiểm kê)
- Một loại thì nút tròn (`J5`) mở thẳng form. Hai đến bốn loại thì nút tròn mở sheet ngắn có lưới `grid-cols-2` các ô
  96px bo 20: icon 24px trên, nhãn 16px dưới, mỗi ô một loại. Không menu dọc chữ nhỏ bật ra từ nút, không nút tròn
  bung thành chùm nút nhỏ.

## J15. Bộ mặt app điện thoại — sáu bộ có tên

Lý do giống `P13`: khung app điện thoại chỗ nào cũng như nhau (thanh tab, đầu màn, danh sách, sheet), nên ba app khác
ngành dựng cùng một gu thì ra cùng một mặt. Thứ làm hai app khác nhau là **bộ mặt**: nền, màu nhấn dùng tới đâu,
ảnh to hay chữ là chính, font, hình khối. Bộ mặt không đổi luồng, không đổi màn, không đổi chỗ đặt nút (`J1`–`J14`
vẫn áp nguyên).

⚑ Rút từ khoảng 300 màn của 10 app phổ biến ở 10 loại (đặt phòng, lưu ảnh ý tưởng, mạng xã hội chữ, bản tin, học
ngôn ngữ, thiền và ngủ, sách tóm tắt, hẹn hò, đi bộ đường dài, việc cần làm). Sáu bộ dưới đây là
các kiểu lặp lại ở nhiều app, không chép mặt riêng của app nào.

| Bộ mặt | Nền, bề mặt | Màu nhấn tới đâu | Chữ, font | Hình khối | Hợp khi người dùng là |
| --- | --- | --- | --- | --- | --- |
| **Clean** | Trắng; màn danh sách nhóm nền xám, thẻ trắng (`J1`) | Nút chính, mục đang chọn, icon danh mục trong vòng nhạt (`J8`) | Inter | Bo 12–16, thẻ số chính nền tối (`J5`) | Người ghi chép, quản lý, theo dõi số mỗi ngày: chi tiêu, việc cần làm, kho, đặt lịch (`J14`). Code mẫu `mobile-app.html` |
| **Mono** ⚑ | Trắng tinh, ngăn bằng đường kẻ, gần như không thẻ | Không có màu nhấn: nút chính đen bo tròn hết, màu duy nhất trên màn là ảnh và avatar người dùng đăng | Inter, tên người đậm 15, nội dung 15–16 | Nút viên thuốc đen hay viền, icon nét mảnh, dòng nội dung chạy hết bề ngang | Người đọc và đăng nội dung của người khác: mạng xã hội, cộng đồng, bình luận, nhắn tin nhóm |
| **Photo** | Trắng, ảnh thật là chủ thể | **Chỉ nút chính** của luồng (Đặt, Mua, Lưu); việc phụ là nút đen hay viền | Inter, tên mục 15–16 đậm dưới ảnh | Ảnh bo 12–16 tỉ lệ 4:3 hay 1:1, chữ nằm dưới ảnh không bọc thẻ; lưới 2 cột so le khi lướt ý tưởng | Người lướt để chọn bằng mắt: đặt phòng, du lịch, bất động sản, món ăn, thời trang, nội thất, đường đi. Code mẫu `mobile-photo.html` |
| **Playful** | Trắng, phản hồi tô cả dải đáy | Một màu thương hiệu bão hoà cho nút chính và thanh tiến độ; thêm tối đa hai màu **có nghĩa** (đúng, sai, chuỗi ngày) | Nunito 700–800, nút chữ đậm | Thẻ chọn viền 2px có viền đáy 4px (trông bấm được), bo 16; thanh tiến độ cao 12–16 bo tròn; nhân vật đổi nét mặt theo đúng sai (`J16`) | Người cần động lực quay lại mỗi ngày: học, thói quen, thể dục cho người dùng phổ thông, trẻ. Code mẫu `mobile-playful.html` |
| **Immersive** | Nền tối có sắc (xanh đêm, tím than) cả app, chuyển dọc nhẹ hai tông gần nhau | Nút chính trắng chữ tối, không màu nhấn rực | Inter, tiêu đề lớn trắng, chữ phụ trắng 72% | Ảnh lớn bo 12–16 làm điểm nhìn, thẻ là lớp trắng 8–10% trên nền | Người dùng để thư giãn, nghe, xem, thường buổi tối: thiền, ngủ, nhạc, podcast, sách nói, video. Code mẫu `mobile-immersive.html` |
| **Editorial** ⚑ | Trắng hay kem ấm `#fbf8f3`, gần như không thẻ | Một sắc nhỏ cho link, nút theo dõi; nút chính đen hay màu đó | Tiêu đề bài và thân bài **Lora** (serif), thân 18/1.6; khung app (tab, nút, nhãn) vẫn Inter | Dòng bài: chữ trái, ảnh vuông 64 phải; trang đọc lề 20, không khung | Người **đọc** dài: bản tin, báo, sách, khoá học dạng đọc, công thức nấu ăn |

**Token đổi theo bộ** (khối đổi thương hiệu của `mobile-app.html`, tương phản đã đo):

| Bộ | Đổi gì |
| --- | --- |
| Mono | `--primary: #111111`; nền màn trắng cả màn danh sách nhóm (nhóm tách bằng tiêu đề và đường kẻ `--border-strong`); bỏ thẻ số chính nền tối, số chính chỉ là chữ lớn |
| Photo | `--primary` lấy trong bảng màu theo ngành của `brand-tokens.md` (không đỏ, không hồng: lẫn với nút xoá đỏ, `I4`); màu nhấn chỉ ở nút **cam kết** của luồng (Tìm, Đặt, Thanh toán, Mua; ở app đặt món: Thêm vào giỏ trong sheet món, thanh giỏ hàng `J11`, Đặt hàng, Thử lại thanh toán, Đổi điểm). Nút chính khác (Tiếp ở bước chọn, Áp dụng lọc, Xem chuyến đi) là nút đen `bg-foreground text-surface`; trạng thái đang chọn (ngày, chip lọc, card chọn, công tắc, tim đã lưu) và nút "+" thêm nhanh ở dòng món tô `--foreground`; thanh tiến độ trong thẻ thành viên (`J5`) trắng |
| Playful | `--app-font: "Nunito"`; `--primary` đậm đủ cho chữ trắng: xanh lá `#2f7d00` 5.18:1. **Xanh lá rực `#58cc02` chữ trắng chỉ 2.09:1**: muốn màu rực thì nút rực chữ tối, hay chữ trắng trên nền đậm. Dải đúng `#d7ffb8` chữ `#2f7d00` (4.66:1), dải sai `--danger-bg` chữ `--danger` |
| Immersive | Cả khung mang `force-dark` (`M33`), chép khối `.force-dark` của `tokens.css` rồi đè các token sau. **Nền là màu nhấn của ngành hay brand pha tối**: `--background` = 30% `--primary` trên `#0b0d18` (`color-mix(in oklab, var(--primary) 30%, #0b0d18)`: Chàm ra `#1f1e56`, Cam ra `#421d14`, Xanh ngọc ra `#0c2c32`), chuyển dọc xuống tông tối hơn 15%; không dùng một màu navy cho mọi app. `--surface` trắng 10% trên nền (chữ trắng từ 10.9:1), sheet và hộp hỏi trắng 14%; `--muted` trắng 72% (từ 8.3:1 trên nền, 6.5:1 trên thẻ); `--danger: #ff9aab` (từ 5.4:1 trên thẻ; `#ff637e` của `.force-dark` chỉ 3.9:1), `--success: #5fd99a`; nút chính `bg-white` chữ màu nền |
| Editorial | Nạp thêm Lora 400, 700 (có bộ `vietnamese`, đã kiểm); `--background: #fbf8f3`, `--muted: #6b6459` (5.5:1 trên kem), sắc nhấn cam `#c2410c` (4.9:1 trên kem) |

**Chọn bộ nào.** Bộ mặt bám **người dùng và việc chính** ở `U1`, `U2`, không bám ngành: app spa mà người mở là kế toán
đối soát thì Clean, không phải Photo. Người dùng nêu tên một bộ (kể cả bộ còn cờ) thì dựng bộ đó, không hỏi lại (`P1`).
Skill **tự khuyên một bộ** trong bốn bộ đã qua test (Clean, Photo, Playful, Immersive), không hỏi, theo câu đầu tiên
khớp:

1. Người dùng lướt và chọn bằng ảnh (đặt phòng, đặt món, mua sắm, nội thất) → **Photo**.
2. Người dùng nghe, xem, thư giãn, thường buổi tối (thiền, ngủ, sách nói, nhạc, video) → **Immersive**.
3. Một người tự làm việc của mình mỗi ngày và cần động lực quay lại (học, thói quen, thể dục) → **Playful**.
4. Còn lại, nhất là ghi chép, quản lý, tài chính, app cho cửa hàng hay công ty → **Clean**.

Mono, Editorial còn cờ ⚑ (chưa qua test): không tự khuyên; đề hợp rõ thì báo một dòng lúc giao. Mẫu dòng báo, nói bằng
người dùng: *"Bộ mặt: **Playful** (nút đậm, thẻ bấm được, phản hồi tô cả dải đáy) vì người học cần quay lại mỗi ngày.
Muốn kiểu khác thì nói: Clean, Photo, Immersive, Mono, Editorial."* Wireframe app điện thoại có nhóm Kiểu liệt kê sáu bộ
(`design-process.md`, `U3`), mặc định là bộ khuyên dùng. Bộ nào qua test thì gỡ cờ ⚑ ở bảng trên.

**Ghi lại bộ đã chọn** như `P13`: dòng Bộ mặt trong `DESIGN.md` và comment `/* Bộ mặt: Playful (J15) */` trên khối
font, để màn sau theo đúng bộ đó, không khuyên lại.

**Được đè, chỉ trong bộ đó:**
- Playful đè dòng "nhiều màu nhấn trên một màn" của `J8`: thêm tối đa hai màu, mỗi màu một nghĩa cố định. Nhân vật
  (`J16`) có mặt ở mọi khoảnh khắc phản hồi và ở bài tập (người nói câu mẫu), không chỉ màn chào và rỗng.
- Immersive đè nền trắng của `J1` và dòng "gradient" của `J8` cho **nền**: chuyển dọc hai tông gần nhau. Nút vẫn
  không gradient. Đè thẻ số chính nền `#1c1c1e` của `J5`: thẻ là lớp trắng 10% như mọi thẻ. Đè ô hôm nay tô đặc
  `--primary` của dải ngày (`J8`): ô hôm nay nền trắng 14% viền trắng 2px, vì trắng đặc thành khối sáng nhất màn, nặng
  hơn cả nút chính. Thanh tab: mục đang chọn có viên nền trắng 12% sau icon, vì trắng 100% với trắng 72% trên nền tối
  gần như không phân biệt được (`J2`).
- Mono đè thẻ số chính nền tối của `J5`.
- Photo đè "ngày đang chọn tô `primary`" của `components/choice-controls.md` và "công tắc bật là `--primary`" của `J4`:
  đang chọn tô `--foreground`, để màu nhấn chỉ còn ở nút cam kết.

**Không đè:** `J2` thanh tab có chữ, `J4` chỗ bấm 44px, chữ tối thiểu 11px, tương phản 4.5:1, một hành động chính
mỗi màn.

**Bẫy**
- **Mono, Photo hay thấy thanh tab chỉ icon** trong app mẫu (app quen thuộc, người dùng đã thuộc icon). App mới vẫn
  giữ chữ (`J2`).
- **Photo không có ảnh thật thì đừng chọn.** Cả app toàn ô xám thay ảnh trông như app hỏng; dữ liệu giả dùng ảnh thật
  có quyền dùng, không vẽ minh hoạ thay ảnh. Một mục thiếu ảnh để thử ca biên (`S16`) thì vẫn có: khung nền
  `--background`, icon và chữ "Chưa có ảnh", không phải ô xám trơn.
- **Playful: gờ đáy 4px là `box-shadow` đặc, không phải `border-bottom`.** Chưa bấm `box-shadow: 0 4px 0 <màu gờ>`; nhấn
  thì `translate: 0 2px` và gờ còn `0 2px 0`: mép dưới đứng yên, bố cục không đổi. Đừng đổi `border-bottom-width` rồi bù
  `margin`: thẻ có `min-height` không thấp đi, phần bù dư ra, mọi thẻ bên dưới giật xuống mỗi lần nhấn. Gờ nằm ngoài
  khối nên vùng cuộn chừa đáy 8px, thẻ cuối không mất gờ. Thẻ đang chọn đổi nền nhạt, viền và gờ theo `--primary`.
  Không vòng focus (`I13`).
- **Playful: không IN HOA chữ tiếng Việt trên nút.** IN HOA kèm dấu chồng lên nhau ("TIẾP TỤC" cao hơn hàng), đọc chậm.
  Dùng chữ thường đậm 800.
- **Immersive: đi hết bẫy `P10`**: tiêu đề, icon, chữ trong ô nhập đổi theo nền; sheet và hộp hỏi trên nền tối cũng
  tối, không bật ra một tấm trắng. Ảnh tối trên nền tối thì thêm viền trắng 10%. Bàn phím vẽ (`J13`) cũng bản tối:
  khối `#1f1f22`, phím `#4a4a4d` chữ trắng, phím chức năng `#323235`.
- **Editorial: serif chỉ cho nội dung đọc.** Lora cho nhãn tab, nút, ô nhập thì khung app thành giả cổ, chữ nhỏ 11–13
  khó đọc. Nạp Lora mà quên bộ `vietnamese` thì "ữ", "ợ" rơi về font máy (`T5`).

## J16. Nhân vật và minh hoạ ⚑

**App nào dùng nhân vật**: app cho một người tự làm việc của mình mỗi ngày, không lấy ảnh chụp làm chủ: học, thói quen,
sức khoẻ cá nhân, ghi chép, tiết kiệm cá nhân; theo người dùng và việc, không theo bộ mặt (Clean cũng dùng). Không dùng
ở app làm việc cho cửa hàng, công ty, quản lý (`J14`), và app lấy ảnh làm chủ (dưới).

App vui, app học, app sức khoẻ trông "có hồn" nhờ nhân vật: màn chào có người chào, bài tập có người nói câu mẫu,
đúng sai có nét mặt. Thay bằng icon trong vòng tròn thì luồng đúng luật mà trống, nhất là màn chào, màn luyện nói,
màn xong.

**Nguồn, theo thứ tự:**
1. **Dự án có bộ hình** (grep `illustration`, `mascot`, `character`, thư mục `public/illustrations`, `assets/images`,
   file Lottie `.json`, `.riv`): dùng của họ, không trộn bộ khác.
2. **Chưa có**: nhân vật **CC0** (công cộng, dùng thương mại, không cần ghi nguồn) sinh tại chỗ bằng DiceBear, kiểu
   **Open Peeps** (người vẽ tay, có nét mặt). Bản mẫu HTML nạp `@dicebear/core` và `@dicebear/open-peeps` bản 9 qua
   jsDelivr `+esm` rồi `createAvatar(...).toDataUri()` gán vào `img[data-art]`; dự án thật cài hai gói đó bằng npm.
   App cần dáng khác thì Notionists hay Lorelei, cùng CC0.
   - **Không gọi `api.dicebear.com`**: API công khai chỉ cho phi thương mại.
   - **Không lấy unDraw**: giấy phép cấm nhúng, tích hợp, thu thập tự động khi chưa xin phép, đúng việc skill làm.
   - **Không lấy kiểu CC BY** (Adventurer, Micah, Fun Emoji…): phải ghi công, người dùng dễ quên khi ra bản thật.
   - Không tự vẽ SVG nhân vật hay minh hoạ (`J8`).

**Một nhân vật cho cả app**: giữ cố định `seed`, tóc (`head`), màu áo (`clothingColor`) là màu nhấn; tắt kính, khẩu
trang (`*Probability: 0`). Chỉ **nét mặt** (`face`) đổi theo khoảnh khắc: chào, rỗng `smile` · đúng, xong `lovingGrin1` · nói, hướng dẫn
`explaining` · đang nghe, chờ `calm` · sai, lỡ chuỗi `concerned`. Đừng dùng `smileBig`, `smileTeethGap` (nhe răng, nhìn
như nhăn), `smileLOL` (có nước mắt), `awe`: tên là cười mà hình thì không. Bạn hội thoại trong bài tập là nhân vật thứ hai cùng kiểu.
Hai kiểu vẽ trong một app (người vẽ tay cạnh ảnh chụp) thì trông ghép.

**Chỗ dùng và cỡ:**

| Chỗ | Cỡ |
| --- | --- |
| Màn chào (`J12`), kèm bong bóng một câu chào | 160–176px |
| Bài tập: người nói câu mẫu, bong bóng ở trên đầu nhân vật | 140–160px, giữa màn |
| Màn xong, màn kết quả onboarding (`O8`), trạng thái rỗng (`J12`) | 35–50% bề ngang màn |
| Bạn hội thoại cạnh bong bóng tin nhắn | 56px |
| Sheet báo một khoảnh khắc (lỡ chuỗi, lên hạng) | 144px, trên tiêu đề sheet |
| Khối chúc mừng đầu một màn danh sách (xong hết việc hôm nay) | 144px trong khối, danh sách vẫn ở dưới |

Avatar của người dùng trong app có nhân vật là ô chữ cái (`components/avatar.md`), không ảnh chụp (`S16`): ảnh chân dung
thật cạnh người vẽ tay là hai kiểu vẽ.

Không ở màn làm việc lặp lại (danh sách, form, cài đặt, giỏ hàng) và không ở màn câu hỏi của onboarding: câu hỏi là
tiêu đề lớn (`O8`).

**App lấy ảnh chụp làm chủ thì không dùng nhân vật vẽ tay**: bộ mặt Photo, Immersive (`J15`), app đặt món, bán hàng
(`J11`), đặt phòng. Nhân vật Open Peeps nét đen cũng chìm trên nền tối. Màn xong, rỗng của các app này dùng icon trong vòng tròn 80px (`J12`) hay ảnh thật của món, của phòng. Người vẽ
tay đứng giữa toàn ảnh đồ uống chụp thật là hai kiểu vẽ trong một app, trông như ghép từ hai nơi.

**Lúc giao** nói một dòng: nhân vật là bộ free giữ chỗ (CC0); có bộ hình thương hiệu thì thay ở một chỗ, đoạn script
gán `img[data-art]` theo tên nhân vật và nét mặt. Bảng luồng (`J1`) giữ móc `data-art` khi chép màn.

## J17. Biểu đồ trên điện thoại ⚑

Màu, cột hay đường, chuyện bỏ bớt vẫn theo `components/charts.md`. File đó viết cho màn có chuột; trên điện thoại
khác ở các chỗ dưới đây, và chỗ nào khác thì luật này thắng. Code mẫu: màn Thống kê của `mobile-app.html`.

- **Chạm thay rê.** Cả vùng vẽ là một chỗ chạm, chạm hay kéo ngang thì chọn mốc gần ngón tay nhất. 30 mốc trên 312px
  chỉ còn khoảng 10px mỗi mốc, dưới mức 44px của `J4`, nên không làm chỗ chạm riêng cho từng chấm, từng cột. Vùng vẽ
  để `touch-action: pan-y`: kéo ngang là dò số, kéo dọc vẫn cuộn màn. Kéo xong thả tay thì về mặc định (mốc mới
  nhất), như app chứng khoán; chạm một lần thì giữ chọn tới khi chạm chỗ khác. Mũi tên trái phải dời mốc khi vùng vẽ
  đang focus.
- **Số đọc ở chỗ cố định, không nhãn bay theo ngón tay.** Ngón tay che đúng chỗ đang chạm, còn nhãn rộng chừng 120px
  trên khung 358px thì gần như luôn trùm qua đường, bị đẩy lên đỉnh vùng vẽ, xa chấm. Hai cách, theo số đông app tài
  chính:
  - Khối có **con số to ở đầu** (tổng chi, giá trị danh mục): con số đó đổi thành số của mốc đang chọn, dòng dưới đổi
    thành mốc ("29/10 · Thứ năm"). Bỏ chọn thì về số tổng.
  - Không có số to thì **một hàng đọc số** cao cố định ngay trên vùng vẽ ("Tuần này, 02–07/11 · 5.462.000 đ"). Hàng
    giữ chỗ cả khi chưa chọn (hiện mốc mới nhất), để biểu đồ không nhảy.

  Mốc đang chọn trên đường là một **vạch dọc** mảnh `stroke-border-strong` hết chiều cao vùng vẽ, cộng chấm 8px viền
  trắng. Luật "nhãn đặt về phía không có đường" của `charts.md` chỉ dùng từ 600px.
- **Hai đường trên một biểu đồ** (thu với chi, tháng này với tháng trước): hàng đọc số ghi cả hai, mỗi số có mẫu nét
  đứng trước ("— Tháng này 6,8 tr · - - Tháng trước 7,1 tr"). Đường so sánh nét đứt hay bậc `/45` theo bảng đậm nhạt
  của `charts.md`, đường chính vẽ đè lên. Điện thoại tối đa hai đường; nhiều hơn thì tách biểu đồ hay cho nút chọn
  chuỗi.
- **Đáy trục.** Lượng đếm hay cộng dồn (chi theo ngày, chi cộng dồn tháng): đáy là 0. **Giá trị và giá** (danh mục đầu
  tư, giá vàng, tỷ giá): trục co theo dữ liệu, chừa khoảng 10% trên dưới, ba nhãn mức số tròn. Đáy 0 thì dao động
  350–415 tr thành một đường gần thẳng. Có vốn thì thêm đường vốn nét đứt, ghi chú "- - Vốn" ở đầu.
- **Lưới.** Biểu đồ là thứ chính của màn (tab Phân tích, màn chi tiết một tài sản) thì theo "biểu đồ chính của trang
  báo cáo" trong `charts.md`: ba vạch ngang, nhưng **nhãn mức nằm trong vùng vẽ**, ngay trên vạch ở mép trái, không
  chiếm cột 44px riêng. Bước mức theo dãy 1, 2, 5 (1 tr, 2 tr, 5 tr) cho vừa số chi tiêu cá nhân; "làm tròn lên 10 tr"
  của `app.md` viết cho doanh thu. Biểu đồ nằm trong thẻ ở màn tổng quan thì không lưới, như `charts.md`.
- **Cột đang chọn không đổi màu** (cả chuỗi một màu, `charts.md`): số trên đầu cột đó và nhãn trục của nó đậm lên, số
  đầy đủ hiện ở hàng đọc số. Kỳ đang chạy vẫn nhạt hơn như `charts.md`.
- **Nhãn trục ở khổ hẹp.** Nhãn rộng hơn khe cột (ngày "21/09" ở 8 cột khổ 360, khe khoảng 34px) thì cách một, luôn giữ
  nhãn cột cuối; nhãn ngắn vừa khe ("T5") thì ghi đủ. Nhãn kỳ đang chạy ("Tuần này", "Tháng này") được tràn sang trái,
  canh theo mép phải cột cuối, cột để `min-w-0` cho khỏi phình theo nhãn; đè lên nhãn bên cạnh thì bỏ nhãn bên cạnh.
  Biểu đồ đường ghi 4–5 nhãn mốc.
- **Chọn khoảng.** Điều khiển phân đoạn Ngày · Tuần · Tháng chọn độ hạt, mỗi độ có cửa sổ mặc định (30 ngày, 8 tuần,
  6 tháng). Một chip "30 ngày qua ⌄" mở sheet đổi khoảng (7 ngày, 30 ngày, tháng này, tháng trước, tự chọn). Tự chọn
  mở lịch khoảng ngày như màn chọn ngày của `mobile-photo.html`. Biểu đồ giá trị dùng hàng nút 1T · 3T · 6T · 1N · Tất
  cả sát biểu đồ. Khoảng không có dữ liệu thì vùng vẽ giữ chiều cao, một câu ở giữa, không vẽ trục rỗng.
- **Màu danh mục: một thang cho cả icon lẫn biểu đồ** (`M8`). Danh mục chi tiêu hiện ở biểu đồ cơ cấu thì icon của nó
  trong danh sách giao dịch, ngân sách lấy đúng sắc của mảng đó. App tiền đã dùng đỏ, hổ phách, xanh lá cho trạng thái
  (vượt ngân sách, lãi lỗ, tiền vào), nên thang danh mục là thang mặc định của `charts.md` (hay khối Sắc `--cat-*` của
  `tokens.css` nếu dự án có), đủ sáu sắc theo thứ tự nhóm lớn tới nhỏ. Sắc đầu trùng màu nhấn (ngành tài chính là
  Xanh dương) thì vẫn giữ: bỏ ba sắc gần xanh dương thì chỉ còn ba sắc cho sáu nhóm, và danh mục luôn có tên, có số đi
  kèm nên không bị đọc thành nút. Ô icon nền sắc đó `/10`, icon bậc 600–700 cho đủ 4.5:1. Danh mục thứ bảy trở đi gộp "Khác" `slate-300` trên
  biểu đồ, icon trong danh sách là ô `bg-secondary text-muted`. Sáu sắc avatar của `M34` (có emerald, amber) chỉ cho
  thực thể không lên biểu đồ.
- **Vẽ bằng gì.** Bản mẫu HTML thuần không có `package.json` thì vẽ SVG bằng tay theo công thức của `charts.md`. Dự án
  có thư viện thì theo "Vẽ bằng thư viện"; hàng đọc số và vạch chọn vẫn theo luật trên (Recharts: ẩn tooltip mặc định,
  đọc mốc đang chọn rồi ghi vào hàng đọc số).
