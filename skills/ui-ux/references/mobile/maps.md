# App điện thoại — Bản đồ

Một mục của luật `J`. Luật nền `J1`–`J8` và bảng các mục ở `mobile.md`, mở file đó trước.

## J19. Bản đồ ⚑

Màn tìm chỗ gần (bệnh viện trong mạng lưới, cửa hàng, chỗ ở, trạm sạc). Code bản đồ chép từ màn `map` của
`layouts/mobile-photo.html`; luật dưới đây rút từ lần dựng app bảo hiểm (08/11/2026), chưa qua vòng test riêng.

- **Lớp bản đồ:** tile `World_Light_Gray_Base` của Esri (như file mẫu), xám nhạt để ghim và thẻ nổi lên. Tile của thành
  phố khác tính theo `z` (14–15 cho khu phố): `x = floor((lon + 180) / 360 · 2^z)`,
  `y = floor((1 − ln(tan(lat) + 1 / cos(lat)) / π) / 2 · 2^z)` (lat đổi ra radian); lưới 3×4 tile quanh điểm đó phủ đủ
  khung 390×844. Bản đồ phủ cả màn dưới thanh trên; thanh trên có nền mờ dần (nền màn → trong suốt) để tiêu đề đọc được.
- **Ghim:** vùng bấm 44 dù ghim vẽ nhỏ hơn; ghim đang chọn đổi hình rõ (nền `--foreground` hay màu nhấn, to hơn), các ghim
  khác trắng có bóng. **Chấm "vị trí của bạn"**: chấm màu nhấn 16 viền trắng 3px, quầng cùng màu 20% đường kính 64, không
  bấm được. Ghim không lố mép màn (probe bắt cuộn ngang) và không đè dòng ghi công.
- **Ghi công bản đồ** ("Map: Esri, OpenStreetMap") chữ 11 ở góc không có ghim, nằm trên thẻ hay danh sách nổi, không bị
  chúng che.
- **Thẻ trên bản đồ:** hàng thẻ cuộn ngang có snap (`scroll-px-4`, `J8`), lộ mép thẻ sau 16–24px; thẻ đang thấy ứng với ghim
  đang chọn. Thẻ có ảnh, badge loại, tên, địa chỉ kèm khoảng cách, giờ mở cửa, nút chính (Chỉ đường) và hai nút tròn 44 (gọi,
  ⋯). **Ở 360×640** ảnh thẻ co (tỉ lệ 16:9 xuống 21:9 hay bỏ ảnh) để bản đồ còn ít nhất một phần ba chiều cao màn; thẻ
  ăn hết màn thì không còn là màn bản đồ.
- **Danh sách trên bản đồ:** vùng cuộn phủ cả màn, đầu vùng là khoảng đệm trong suốt (~40% chiều cao) để bản đồ lộ phía
  trên; cuộn lên thì danh sách che dần bản đồ. Dòng là thẻ ngang: ảnh trái 96–108 bo theo thẻ, badge, tên (xuống dòng đủ,
  `J4`), địa chỉ kèm khoảng cách. Cuối danh sách chừa đáy cho thanh tab (`J2`).
- Chuyển thẻ / danh sách bằng nút trên thanh trên (`J3` "Chuyển cách xem"). Màn bản đồ là màn con để xem: giữ thanh tab
  (`J2`). Lần đầu mở màn bản đồ cần màn mồi xin vị trí (`J12`); bản mẫu chưa dựng thì báo một dòng lúc giao.
