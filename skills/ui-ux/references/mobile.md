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

## Mục J khác: mở đúng file

File này giữ luật nền cho mọi màn điện thoại (`J1`–`J8`). Các mục sau mỗi mục một file trong
`mobile/`, chỉ mở mục đề cần. Thấy chỗ nào trỏ `J9`–`J19` thì tra bảng này.

| Mục | File | Mở khi |
| --- | --- | --- |
| `J9` | `mobile/native-code.md` | chuyển bản mẫu sang React Native, Flutter |
| `J10` | `mobile/motion.md` | màn có chuyển động: chuyển màn, sheet, nhấn |
| `J11` | `mobile/ordering.md` | app đặt món, đồ uống, bán hàng |
| `J12` | `mobile/onboarding.md` | mở app lần đầu, đăng nhập, xin quyền, màn rỗng |
| `J13` | `mobile/inputs.md` | màn có ô nhập, bàn phím |
| `J14` | `mobile/data-entry.md` | app quản lý, nhập liệu: bảng thành danh sách, số lượng và đơn vị, chi tiết phiếu |
| `J15` | `mobile/faces.md` | **mọi lần dựng**: chọn bộ mặt, token của từng bộ (mặc định Clean) |
| `J16` | `mobile/characters.md` | màn có nhân vật, minh hoạ |
| `J17` | `mobile/charts.md` | màn có biểu đồ |
| `J18` | `mobile/showcase.md` | bật lối trình diễn, hay ảnh mẫu kiểu trình diễn |
| `J19` | `mobile/maps.md` | màn có bản đồ |

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
  **Bản mẫu tiếng Anh** (`T27`) dịch luôn chữ cứng của khối bảng, các file mẫu viết tiếng Việt: "Bản mẫu app điện
  thoại" → "Mobile app prototype", "N màn" → "N screens", "Bấm một màn để chạy thử từ đó" → "Click a screen to try it from
  there", "Cuộn sang trái / phải" → "Scroll left / right", "Chạy luồng" → "Play flow", "Chạy thử từ màn đang phát" → "Try
  from this screen", "Dừng / Phát" → "Pause / Play". Comment trong code giữ nguyên được.
- **Nút chính của luồng dẫn tới kết quả thấy được.** Bấm "Lưu", "Tạo", "Đặt" trong wireframe hay bản mẫu thì về
  màn trước **đã đổi**: dòng mới ở đầu danh sách (nhãn "Mới"), số đếm và số dư cộng thêm, thông báo ngắn `J7`
  ("Đã thêm Ăn tối", có Hoàn tác). Quay về màn cũ y nguyên thì người duyệt không thấy lưu xong ra sao, nên không
  góp ý được bước cuối của luồng, là bước họ làm nhiều nhất. **Dòng mới không nằm dưới thông báo hay thanh tab**: gắn
  `data-reveal` lên dòng mới, hàm `revealNewRows()` của `mobile-app.html` cuộn vùng cuộn **vừa đủ** cho dòng nằm trên
  thông báo (dòng đã thấy thì không cuộn, khối số ở đầu màn còn nguyên), và `buildBoard` gọi lại nó trên bản chép vì
  `cloneNode` không giữ vị trí cuộn. Không `scrollIntoView`: nó cuộn cả khung máy, lộ sheet đang giấu ở đáy. Trên bảng,
  thông báo đứng yên mãi, đè đúng thứ người duyệt cần xem.
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
  thanh hay gặp ở ảnh mẫu: dùng nút tròn đứng riêng cạnh thanh (`J5`). Ngoại lệ duy nhất là kiểu Center dưới đây.
- **Sáu kiểu thanh tab** (Float, Dark, Glass đã qua test; Center, Pill, Bubbles còn cờ ⚑), code chép từ `layouts/mobile-tabbars.html`. Mặc định Float; năm kiểu kia chọn trên wireframe
  (nhóm Tab, `?tab=`) hay khi đề nêu ("thanh tab tối", "nút giữa"). Kiểu chỉ đổi hình thanh, không đổi mục, không đổi icon.

  | Kiểu | Hình | Dùng khi | Ràng buộc |
  | --- | --- | --- | --- |
  | `float` | Viên nổi sáng, chữ dưới icon, nút + tròn đứng riêng | Mặc định, mọi app | Như các dòng trên |
  | `center` | Nút hành động 56px nằm giữa thanh, nhô lên | App có **một** hành động làm hằng ngày: ghi khoản chi, quét món, chuyển tiền, đăng bài | Đúng 4 mục, hai trái hai phải; nút không mang `aria-current` |
  | `pill` | Chỉ icon, mục đang chọn là viên màu nhấn có chữ | App nội dung, mua bán, du lịch muốn thanh gọn | 3–5 mục |
  | `dark` | Thanh gần đen `#18181b` cao 64 trên màn sáng, mục chọn là viên tròn trắng 48 **đồng tâm với đầu bo** (`justify-between px-2`: cách mép trái phải bằng cách mép trên dưới, 8px; chia đều thì viên đầu trôi vào giữa, đầu bo trống), bóng nhẹ `0 8px 20px -12px` | Màn sáng hay nền màu cả app (kem, be), muốn thanh là điểm nhấn | Chỉ icon: tối đa 4 mục |
  | `bubbles` | Mỗi mục một nút tròn rời 52px, mục chọn đặc màu nhấn, hành động tách ra mép phải | App học, app nội dung ít mục | Chỉ icon: tối đa 4 mục |
  | `glass` | Thanh kính `bg-white/12 backdrop-blur-2xl`, chữ trắng 70%, mục chọn viên `bg-white/18` chữ trắng (thanh đã sáng hơn nền nên viên cần 18%; thanh đặc của Immersive dùng 12%) | Phía sau là ảnh, nền tối, quầng màu (Immersive) | Không dùng trên nền sáng trơn (`F19`); đo tương phản chữ ở chỗ nền sau sáng nhất |

  Thanh khai kiểu trên `nav`: `data-tab-style="dark"` (probe đọc thuộc tính này, thiếu thì báo "không có chữ"). Màn gốc
  có việc thêm (`J5`) mà chọn `pill`, `dark`, `glass`: thanh thu lại `right-[92px]`, cao 64px bằng nút, nút thêm màu nhấn
  đứng riêng bên phải (mục 4b của file mẫu); `center` thì nút nằm trong thanh, không thêm nút riêng.

  **Kiểu chỉ icon** (`pill` với mục chưa chọn, `dark`, `bubbles`) là ngoại lệ có tên của luật "mục nào cũng có chữ": icon
  phải quen ai cũng đoán được (nhà, tìm, tim, người, lịch, biểu đồ, cài đặt), mỗi mục `aria-label`, mục đang chọn đổi
  hình rõ (viên tròn, nền đặc), không chỉ đổi màu nét. Mục mà icon phải đoán (ví, phiếu, kho) thì dùng `float` hay `pill`.
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
- **Màn chi tiết một mục mở đầu bằng ảnh tràn mép cũng ẩn thanh tab** (điểm đến, chỗ ở, món, sản phẩm: ảnh lớn chạy
  qua tai thỏ, tấm nội dung trượt lên), dù chưa có thanh hành động. Ảnh là chủ thể của màn, giống xem ảnh toàn màn; thanh
  tab nổi đè lên thẻ ảnh ngay màn đầu làm đáy màn nặng hơn đỉnh. Đường về là nút tròn quay lại trên ảnh và vuốt mép trái.
  Vùng cuộn chừa đáy `inset-bottom + 24px`, không `.pad-tabbar`. Màn con mở đầu bằng chữ (chi tiết giao dịch, hồ sơ,
  bài viết) vẫn giữ thanh như trên.
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
- **Chuyển cách xem** (thẻ / danh sách, danh sách / bản đồ): hai cách thì **một nút icon** đổi qua lại (icon là cách
  sẽ chuyển tới, `aria-label` "Xem dạng danh sách"), như `mobile-photo.html`; ảnh mẫu vẽ cặp icon cạnh nhau thì dựng
  **một điều khiển phân đoạn chỉ icon** (rãnh 52 `p-1`, hai nút 44, `J4`) và tính là **một** nút phải của thanh trên.
  Khi đó tiêu đề canh trái ngay sau nút quay lại (giữa thì đụng điều khiển rộng 96px), vẫn 17–22px.
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
- **Thông báo ngắn**: viên tròn nền tối giữa màn (app nền tối: viên sáng `bg-white` chữ tối, viên tối chìm vào nền), **ngay
  trên thanh tab**, màn không có thanh tab thì ngay trên thanh dính đáy hay ô soạn, tự đi sau 4 giây; có "Hoàn tác"
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
- **Lối tắt dịch vụ trên trang chủ** (thanh toán, tải sao kê, nạp tiền, tìm bệnh viện, tư vấn từ xa: app ngân hàng, bảo hiểm,
  ví, viễn thông) ⚑. Mặc định **lưới 4 cột**: ô icon 52 bo 16 nền nhạt, nhãn 13 dưới ô tối đa hai dòng, tối đa 8 mục (hai
  hàng), mục thứ 8 là "Tất cả" mở danh sách đủ. Ảnh mẫu vẽ viên chip (icon + nhãn) thì dựng viên cao 44–48, **hai hàng cuộn
  ngang chung** (`grid grid-flow-col grid-rows-2 w-max`), và hàng phải **lộ 30–50% cột kế tiếp** ở cả 390 lẫn 360: cột cuối
  vừa khít mép thì người dùng không biết còn mục, ba lối tắt sau mất hẳn (6 mục chỉ thấy 4).
  Không đủ lộ thì đổi thứ tự cho nhãn dài nằm cột cuối, hay về lưới 4 cột.
- **Chấm sao** (đánh giá tài xế, món, người làm, chỗ ở): sao đặc vàng `#fbbf24`, sao chưa chọn xám `#d4d4d8`, cỡ 40–44 khi là
  chỗ bấm, 14–16 khi chỉ hiện điểm cạnh chữ. Hầu hết app vẽ sao vàng, người dùng nhận ra ngay; sao nâu, cam đậm hay màu brand
  trông như icon thường. Vàng trên trắng chỉ 1.7:1 nên **trạng thái phải có chữ đi kèm**: dòng dưới hàng sao đổi theo số sao
  ("Tệ" … "Tuyệt vời"), hay điểm số cạnh sao ("4,9"); mỗi sao là `role="radio"` có `aria-label` "4 sao".
- **Hàng cuộn ngang cắt luôn chiều dọc.** `overflow-x: auto` buộc chiều dọc cũng bị cắt, nên vòng đang chọn (`ring`), tick
  lố góc, bóng, phóng to khi nhấn của mục trong hàng mất phần nhô ra trên và dưới (vòng lời khen bị cắt đỉnh). Hàng chừa
  `py` bằng phần nhô ra nhiều nhất (vòng 3px và tick lố 4px: `py-2`), tick đặt trong lòng vòng (`top-0 right-0`), không lố
  bằng toạ độ âm (`N11`).
- **Hàng cuộn ngang có `scroll-snap`** (rail thẻ, carousel trên bản đồ): thêm `scroll-px-4` bằng lề 16, không thì thẻ hít
  sát mép màn, mất lề trái.

Không dùng (đẹp trong ảnh, hỏng trên máy thật):
- Chữ 9–10px, chữ pastel trên nền pastel (dưới 4.5:1).
- Minh hoạ 3D, nhân vật trang trí chiếm nửa màn ở màn làm việc. Nhân vật và minh hoạ chỉ ở các chỗ của `J16`. Bộ Brand dùng đồ vật 3D cho dịch vụ, loại xe, lời khen (`J15`).
- Nhiều màu nhấn trên một màn; thanh tab không có chữ; nút "+" nằm giữa thanh tab.
- Dải đầu màn tô màu nhấn, nút gradient, bóng đậm: kiểu cũ, ảnh mẫu được khen không còn dùng. Trừ khi người dùng gửi ảnh
  có chúng (mục dưới), và trừ bộ **Brand** (`J15`): app dịch vụ của một thương hiệu (gọi xe, giao hàng) tô khối đầu màn gốc
  bằng màu brand là quy ước của cả loại.

**Ảnh mẫu là bản trình diễn** (ảnh kiểu Dribbble người dùng gửi kèm "như này", "like this") ⚑. Nhận ra: quầng hay
gradient đầu màn, bóng mềm thay viền, nút tròn trắng nổi, bo 24 trở lên, nền xám hay kem nhạt. Ảnh là design ref (`S12`,
bám cả màu) nên **bật luôn `J18`** dù đề không có từ "đẹp", "trình diễn": `J18` là công thức gần ảnh nhất, phần ảnh khác
công thức thì ảnh thắng. Ảnh đè được gì:

| Loại | Luật | Ảnh đè không |
| --- | --- | --- |
| **Gu** | `J1` nền trắng (ảnh nền xám thì theo ảnh, gắn `data-ref-bg` lên `.device` để probe không bắt) · `J3` canh lề, cỡ tiêu đề · `J8` "không dùng" dải đầu màn màu, gradient · `J15` bộ mặt khuyên dùng · `J18` chữ tối trên quầng, cỡ điểm nhìn, font · kiểu thanh tab `J2` (thanh dính đáy của ảnh dựng bằng `float`, kiểu gần nhất có code) | **Được**, theo ảnh |
| **Nguyên tắc** | `J2` mục có chữ, **không mục "More"/"Thêm"** (đổi thành mục có tên: "Account", "Tài khoản", báo một dòng), giữ hay ẩn thanh tab ở màn con theo các ca của `J2` (ảnh vẽ khác thì theo `J2`) · `J4` kích cỡ, chữ từ 11 · `J5` một hành động chính · tương phản `P3` (đo ở chỗ chữ nằm) | **Không**, ảnh vẽ khác thì sửa theo luật, báo một dòng lúc giao |

**Màu lấy đúng ảnh.** Đọc hex ở ba chỗ của ảnh (phần đậm nhất của quầng, chỗ chuyển, nền) và dùng chúng cho quầng, nền;
không thay bằng màu trong bảng ngành của `brand-tokens.md` rồi pha đậm thêm. Bẫy "không đỏ" (`I4`) chỉ áp cho `--primary`
của nút: ảnh có nút cam kết màu đen thì màu cam đỏ của ảnh chỉ nằm ở quầng, badge, ghim, không cần đổi. Chụp xong đặt ảnh cạnh
ảnh mẫu, so tông, độ đậm, chỗ quầng mờ về nền; đậm hơn hay gắt hơn ảnh thì chỉnh trước khi giao
(đừng để đầu màn đỏ cam đậm gắt khi ảnh là cam nhạt chuyển dần sang xám). Chữ trắng trên quầng màu ảnh chưa đủ
`P3` thì đậm riêng phần quầng ngay sau chữ (một lớp `radial-gradient` nhỏ sau dòng chữ), hay đẩy dòng chữ nhỏ lên 19px đậm
700 để thành chữ lớn (ngưỡng 3:1); không đậm cả dải. Probe chấm chữ trên gradient bằng pixel thật dưới chữ.

## Kiểm trước khi giao

- [ ] **App điện thoại (`J`)**: dựng trong khung của `mobile-app.html` chưa (mép chừa bằng `--inset-top` / `--inset-bottom`)? Thanh tab 3–5 mục có chữ, không nút "+" trong thanh; màn con để xem giữ thanh và sáng tab cha, form / giỏ / thanh toán ẩn thanh? Dòng, nút, thẻ có chữ dùng `min-h-*` để chữ to lên không tràn? Chữ thân 16, không chữ dưới 11, mọi chỗ bấm ≥ 44px? Hành động chính không nổi đè lên nội dung? Cuộn màn gốc lên, chữ có lướt dưới dải nền `.status-cover` chứ không đè giờ và pin? Tên trong dòng danh sách có bị cắt `…` không? Hàng chữ trái, giá phải (`justify-between`): giá có `shrink-0 whitespace-nowrap` chưa, ở 360 chữ `₫` có rơi xuống dòng riêng không (`rules-type.md`, số tiền là một khối)? Đã chạy `probe.mjs --mobile --widths 390,1280` (đi qua từng màn, ở 390 và khung máy tính) và xem ảnh `mobile-*.png` chưa?
