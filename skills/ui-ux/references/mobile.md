# App mobile — luật J

Màn của **app điện thoại**: đề nói "app mobile", "app điện thoại", "iOS", "Android", "React Native",
"Flutter", hay gửi ảnh màn điện thoại. Đầu ra là **bản mẫu HTML trong khung điện thoại**, mỗi màn một
đường dẫn, bấm qua lại được: để xem, duyệt, rồi người dùng tự chuyển sang code của nền tảng họ chọn.

Mọi luật khác của skill vẫn áp (màu, token, chữ tiếng Việt, trạng thái, dữ liệu giả, `I4`), file này
chỉ nói chỗ **khác web**: khung máy, điều hướng, kích cỡ cho ngón tay, sheet, hành động chính.

**Code mẫu đã duyệt: `layouts/mobile-app.html`** (app ghi chi tiêu, 5 màn: tổng quan, chi tiết, sheet
thêm, thống kê, cài đặt). Chép khung và công thức từ đó, thay nội dung theo đề. App đặt món, đồ uống, bán hàng
thì chép từ `layouts/mobile-order.html` (`J11`, `J12`: thêm đăng nhập, nhập mã, xin quyền,
rỗng, tài khoản).

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
  là biến `--inset-top`, `--inset-bottom`, mọi vùng dính mép dùng chúng, không viết cứng 47.
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
- **Nút chính của luồng dẫn tới kết quả thấy được.** Bấm "Lưu", "Tạo", "Đặt" trong wireframe hay bản mẫu thì về
  màn trước **đã đổi**: dòng mới ở đầu danh sách (nhãn "Mới"), số đếm và số dư cộng thêm, thông báo ngắn `J7`
  ("Đã thêm Ăn tối", có Hoàn tác). Quay về màn cũ y nguyên thì người duyệt không thấy lưu xong ra sao, nên không
  góp ý được bước cuối của luồng, là bước họ làm nhiều nhất.
- **Không hover**: màn chạm không có rê chuột. Phản hồi là lúc nhấn (`J7`).
- **Kiểm bằng probe chế độ mobile** trước khi giao: `node scripts/probe.mjs <file hay link> --mobile --widths 390,1280`.
  Nó mở từng màn (mỗi `data-screen` và hash dẫn tới sheet) ở 390×844 và 360×640 (Android giá rẻ, máy cũ) giả lập chạm và ở khung 1280, chụp từng
  màn, đo các luật `J` đo được: chữ dưới 11px, chữ ô nhập dưới 16px, chỗ bấm dưới 44px, thanh tab, nút nổi đè
  chữ, dòng cuối kẹt dưới thanh tab, chữ chui vào vùng tai thỏ / thanh home.

## J2. Điều hướng chính: thanh tab

- **Thanh tab 3–5 mục, mục nào cũng có chữ** (11px, `font-medium`) dưới icon 24px. Không menu ba gạch thay
  thanh tab, không mục "Thêm" chứa phần còn lại, không tab chỉ có icon. Mục đang chọn `text-foreground`,
  còn lại `text-muted`; không đổi icon sang bản tô đặc kiểu riêng từng mục.
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
- **Ẩn thanh tab khi màn là một việc phải làm cho xong**: form thêm, sửa; giỏ hàng, thanh toán; luồng nhiều bước.
  Các màn này có nút chính dính đáy (`J5`), thanh tab nằm cạnh nút đó thì hai dải đáy chồng nhau, và bấm nhầm tab là
  bỏ dở việc. Sheet và hộp hỏi phủ lên thanh tab.
- **Chấm đỏ có số trên mục** chỉ cho việc người dùng phải xử lý (tin nhắn chưa đọc, đơn cần xác nhận), không cho
  khuyến mãi hay mục mới: chấm đỏ ở mọi tab thì không ai nhìn nữa. Viên `bg-danger` chữ trắng 11px, cao 16, góc phải
  trên icon; trên 99 ghi "99+".
- Vùng cuộn của màn có thanh tab chừa đáy `inset-bottom + 96px` (`.pad-tabbar`): dòng cuối cuộn lên được
  hết, không nằm mãi dưới thanh.

## J3. Đầu màn

- **Màn gốc của tab: tiêu đề lớn canh trái** `text-[32px]/[38px] font-semibold tracking-tight`, ngắn (≤ 15
  ký tự: "Thống kê", "Cài đặt", "Tháng 10"). Trên nó được một dòng nhỏ `text-sm text-muted` (lời chào, ngày).
  Phải là avatar 44px dẫn tới tài khoản hay một nút icon, không hơn hai thứ.
- **Màn con: thanh trên 44px**: trái là nút quay lại (chevron 24px + tên màn cha, cao 44px), giữa là tiêu đề
  17px `font-semibold`, phải tối đa **một** nút icon 44px. Tên màn cha dài quá 12 ký tự thì chỉ để chevron.
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
    bàn phím sẵn: "Lưu" chữ ở góc phải hàng đầu (`J6`).
- **Việc nguy hiểm** (xoá, đăng xuất) đứng riêng ở cuối màn, đỏ nhạt `bg-danger-bg text-danger` hay chữ đỏ
  trong thẻ riêng (`I4`), không cạnh nút chính.
- **Thẻ số chính** cho màn có một con số quan trọng (đã chi, số dư, số bước): một thẻ ở đầu màn, con số lớn
  nhất màn (`J4`), kèm một thanh tiến độ hay một dòng so sánh. Một thẻ như vậy mỗi màn.
  - **Nền tối trung tính `--hero-bg` (#1c1c1e), chữ trắng, không tô bằng màu nhấn** (chủ dự án chọn). Màu nhấn
    rực (tím, hồng, cam) làm nền thì thẻ thành mảng màu lớn nhất màn, nhìn thô; màu nhấn chỉ ở thanh tiến độ
    trong thẻ (`--hero-accent`: trắng khi màu nhấn trung tính, `color-mix(in oklab, var(--primary) 70%, white)`
    khi màu nhấn rực, để thanh đủ sáng trên nền tối).

## J6. Sheet

- Trượt từ đáy 320ms, lớp phủ `bg-black/40`; bấm lớp phủ hay "Huỷ" thì đóng. **Một sheet một lúc.**
- Thanh kéo 36×5 giữa mép trên; hàng đầu 44px: "Huỷ" trái, tiêu đề giữa 17px. Nút chính đặt theo bàn phím,
  **một chỗ duy nhất**, không vừa trên đầu vừa dưới đáy:
  - **Sheet không gõ** (chọn, lọc, xác nhận): nút dính đáy sheet (`J5`).
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
  đặt lịch thật và ảnh mẫu): gạch ngang lẫn giữa giờ trống làm màn nhiễu, mắt phải lọc. Nhiều giờ thì chia
  sáng / chiều / tối; buổi hết giờ là một hàng "Sáng · Đã kín" (tên buổi và chữ `text-muted` cùng hàng), không để
  tên buổi một dòng rồi "Đã kín" lơ lửng dòng dưới. Ngày kín cả ngày thì ô ngày mờ kèm chữ "Kín".
- **Ảnh thật dùng to**: app có hình (tiệm, món, phòng, người làm) thì trang chủ có ảnh tiệm hay ưu đãi cao
  140–180px, thẻ dịch vụ và người làm có ảnh, không chỉ avatar 40px. Ảnh lớn là thứ làm app trông "muốn dùng";
  màu nhấn thì chỉ ở nút và chỗ đang chọn.
- Icon danh mục trong vòng tròn 40px nền nhạt của một sắc riêng, chữ icon đậm cùng sắc (đạt 4.5:1).

Không dùng (đẹp trong ảnh, hỏng trên máy thật):
- Chữ 9–10px, chữ pastel trên nền pastel (dưới 4.5:1).
- Minh hoạ 3D, nhân vật trang trí chiếm nửa màn ở màn làm việc. Chỉ ở màn chào lần đầu, trạng thái rỗng.
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
  của `components/empty-state.md`: khối giữa vùng trống, icon 36px trong vòng tròn 80px nền `--background`, tiêu đề
  20px "Chưa có đơn nào", một câu `text-muted` nói thứ gì sẽ hiện ở đây, **một** nút chính dẫn tới việc làm nó đầy
  ("Xem menu"), nút rộng theo chữ, không giãn hết. Tiêu đề lớn của màn và thanh tab giữ nguyên chỗ.
- **Hình**: phần lớn app dùng hình minh hoạ của thương hiệu, rộng 35–50% màn, ở chỗ này (11/24 màn rỗng đếm được,
  icon trần chỉ 1). Bản mẫu chưa có bộ hình thì icon trong vòng tròn 80px giữ chỗ, báo lúc giao là chỗ để hình của
  thương hiệu; không tự vẽ minh hoạ (`J8`).
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
- **Wireframe và bản mẫu vẽ bàn phím** ở màn hay sheet bật bàn phím sẵn: khối `bg-[#d1d3d9]` dính đáy khung, cao
- **Ô số tiền to giữa sheet co theo chữ** (`[field-sizing:content] min-w-8 text-center`, như `mobile-app.html`), đơn vị
  "đ" cách số 4px (`gap-1`). Ô rộng cố định thì số căn giữa trong ô, "đ" đứng trơ cách xa 20–40px tuỳ số dài ngắn.
  Trình duyệt chưa có `field-sizing` thì đo chữ và đặt `width` bằng JS mỗi lần gõ. Probe báo "cách "đ" …px".
  khoảng 290px (bàn phím số ở khung 390×844; bàn phím chữ có hàng gợi ý khoảng 335px), che phần dưới như máy thật;
  bấm ra ngoài ô thì cụp. Màn có nút dính đáy thì nút nằm ngay trên khối đó. Không vẽ thì người duyệt thấy cả form,
  chọn phương án mà không biết lúc gõ số tiền chỉ còn thấy nửa trên, hàng chọn người nằm dưới bàn phím.
