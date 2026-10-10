# App mobile — luật J

Màn của **app điện thoại**: đề nói "app mobile", "app điện thoại", "iOS", "Android", "React Native",
"Flutter", hay gửi ảnh màn điện thoại. Đầu ra là **bản mẫu HTML trong khung điện thoại**, mỗi màn một
đường dẫn, bấm qua lại được: để xem, duyệt, rồi người dùng tự chuyển sang code của nền tảng họ chọn.

Mọi luật khác của skill vẫn áp (màu, token, chữ tiếng Việt, trạng thái, dữ liệu giả, `I4`), file này
chỉ nói chỗ **khác web**: khung máy, điều hướng, kích cỡ cho ngón tay, sheet, hành động chính.

**Code mẫu đã duyệt: `layouts/mobile-app.html`** (app ghi chi tiêu, 5 màn: tổng quan, chi tiết, sheet
thêm, thống kê, cài đặt). Chép khung và công thức từ đó, thay nội dung theo đề.

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
- **Không hover**: màn chạm không có rê chuột. Phản hồi là lúc nhấn (`J7`).
- **Kiểm bằng probe chế độ mobile** trước khi giao: `node scripts/probe.mjs <file hay link> --mobile --widths 390,1280`.
  Nó mở từng màn (mỗi `data-screen` và hash dẫn tới sheet) ở 390×844 giả lập chạm và ở khung 1280, chụp từng
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
- **Chỉ màn gốc của tab có thanh tab.** Màn con (chi tiết, sửa) ẩn thanh tab, quay lại bằng nút trái ở thanh
  trên (`J3`). Sheet phủ lên thanh tab.
- Vùng cuộn của màn có thanh tab chừa đáy `inset-bottom + 96px` (`.pad-tabbar`): dòng cuối cuộn lên được
  hết, không nằm mãi dưới thanh.

## J3. Đầu màn

- **Màn gốc của tab: tiêu đề lớn canh trái** `text-[32px]/[38px] font-semibold tracking-tight`, ngắn (≤ 15
  ký tự: "Thống kê", "Cài đặt", "Tháng 10"). Trên nó được một dòng nhỏ `text-sm text-muted` (lời chào, ngày).
  Phải là avatar 44px dẫn tới tài khoản hay một nút icon, không hơn hai thứ.
- **Màn con: thanh trên 44px**: trái là nút quay lại (chevron 24px + tên màn cha, cao 44px), giữa là tiêu đề
  17px `font-semibold`, phải tối đa **một** nút icon 44px. Tên màn cha dài quá 12 ký tự thì chỉ để chevron.
- Vào màn con **trượt từ phải** 300ms (`push-in`); giảm chuyển động thì hiện ngay.

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

## J5. Hành động chính và thẻ số chính

- **Mỗi màn một hành động chính** (`I2`).
  - Ở **màn gốc có việc thêm**: nút tròn 64px `bg-primary` **đứng riêng bên phải thanh tab, cùng hàng**;
    thanh tab thu lại (`right-[92px]`). **Chỉ khi thanh có tối đa 4 mục.** Thanh 5 mục giữ rộng hết, nút thêm
    là nút icon `plus` 44px bên phải tiêu đề lớn của màn gốc đó (`J3`). Nút nổi đè lên danh sách (góc phải trên thanh tab) che mất số tiền
    của dòng cuối.
  - Ở **form, sheet, màn xác nhận**: nút 52px **dính đáy**, cách hai mép 16px, đáy chừa thanh home, có vạch
    ngăn trên. Không tràn sát hai mép màn.
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
- Thanh kéo 36×5 giữa mép trên; hàng đầu 44px: "Huỷ" trái, tiêu đề giữa 17px; nút chính dính đáy sheet
  (`J5`), không đặt "Xong" trên đầu cùng lúc.
- Cao tối đa 92% màn, phần giữa cuộn riêng; sheet ngắn thì cao theo nội dung.
- Sheet cho việc ngắn trên màn đang xem (thêm, lọc, chọn); việc dài nhiều bước thì là màn con.

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
  mờ và khoá) cho app theo ngày: thói quen, việc cần làm, chi tiêu, thể dục.
- **Chọn giờ** (đặt lịch, đặt bàn, đặt sân): dải ngày trong tuần ở trên, dưới là **chỉ giờ còn trống**, ô viền bo
  tròn 3–4 cột, giờ đang chọn tô đặc `--primary`. Giờ đã kín thì giấu, không gạch ngang hay làm mờ (phần lớn app
  đặt lịch thật và ảnh mẫu): gạch ngang lẫn giữa giờ trống làm màn nhiễu, mắt phải lọc. Nhiều giờ thì chia
  sáng / chiều / tối; buổi hết giờ ghi một dòng "Đã kín". Ngày kín cả ngày thì ô ngày mờ kèm chữ "Kín".
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

