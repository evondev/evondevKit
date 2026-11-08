# App điện thoại — Chuyển động

Một mục của luật `J`. Luật nền `J1`–`J8` và bảng các mục ở `mobile.md`, mở file đó trước.

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
