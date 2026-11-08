# App điện thoại — Chuyển sang code React Native, Flutter

Một mục của luật `J`. Luật nền `J1`–`J8` và bảng các mục ở `mobile.md`, mở file đó trước.

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
- **Hiệu ứng nặng: chỉ vẽ cái code được, mượt trên máy tầm trung.** Kính mờ (`backdrop-filter`), làm mờ nền khi
  chuyển động, bóng nhiều lớp, shader / WebGL chạy mượt trên trình duyệt máy dev nhưng sang native thì tốn: React
  Native cần `expo-blur` (Android còn là tuỳ chọn thử nghiệm), Flutter `BackdropFilter` tốn GPU, shader phải qua
  `react-native-skia` / `FragmentProgram`. Nên:
  - Kính mờ chỉ ở **một lớp cố định** (thanh tab, thanh trên, sheet), không đặt trong dòng của danh sách cuộn, không
    chồng hai lớp kính lên nhau.
  - Luôn có **bản nền đặc** thay thế (như `bg-white/90` ở `styles.md`); Android, máy yếu, giảm chuyển động dùng bản
    này.
  - Shader, WebGL, 3D chạy thật không dùng trong bản mẫu app điện thoại. Đề muốn hiệu ứng kiểu đó thì làm ảnh tĩnh
    hay Lottie / Rive ở chỗ của `J10`.
  - Bộ màn có kính mờ thì lúc giao báo một câu: "Kính mờ ở thanh tab tốn pin, có thể giật trên Android đời cũ; đã để
    sẵn bản nền đặc, giữ kính hay đổi nền đặc tuỳ bác."
