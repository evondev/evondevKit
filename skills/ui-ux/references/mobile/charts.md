# App điện thoại — Biểu đồ trên điện thoại

Một mục của luật `J`. Luật nền `J1`–`J8` và bảng các mục ở `mobile.md`, mở file đó trước.

## J17. Biểu đồ trên điện thoại ⚑

Màu, cột hay đường, chuyện bỏ bớt vẫn theo `components/charts.md`. File đó viết cho màn có chuột; trên điện thoại
khác ở các chỗ dưới đây, và chỗ nào khác thì luật này thắng. Code mẫu: màn Thống kê của `mobile-app.html`.

- **Chạm thay rê.** Cả vùng vẽ là một chỗ chạm, chạm hay kéo ngang thì chọn mốc gần ngón tay nhất. 30 mốc trên 312px
  chỉ còn khoảng 10px mỗi mốc, dưới mức 44px của `J4`, nên không làm chỗ chạm riêng cho từng chấm, từng cột. Vùng vẽ
  để `touch-action: pan-y`: kéo ngang là dò số, kéo dọc vẫn cuộn màn. Kéo xong thả tay thì về mặc định của khối
  (số tổng của khối; khối không có số tổng thì mốc mới nhất), như app chứng khoán; chạm một lần thì giữ chọn tới khi chạm chỗ khác. Mũi tên trái phải dời mốc khi vùng vẽ
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
- **Vòng và cung** (cung chia khúc, vòng từng ngày đã qua test; vòng mục tiêu, donut có khe còn cờ ⚑), code chép từ `layouts/mobile-charts.html` (một hàm `drawArc()`, SVG thuần). Ngoại lệ có tên của
  "thanh, không vòng" (`charts.md`), chỉ cho **một con số so với một mục tiêu** ở app sức khoẻ, thể dục, ăn uống, giấc
  ngủ, thói quen, tiết kiệm, và cho cơ cấu tối đa 4 phần. Các app này hầu như đều dùng vòng; thanh ở đây nhìn như form.
  - **Vòng mục tiêu**: một vòng nét 14–16px trên khối 160–184px, rãnh cùng sắc nhạt (`--chart-fill` 14% pha trắng; nền
    tối `white/10`), bắt đầu ở 12 giờ, đầu bo tròn. Số ở giữa là thứ to nhất thẻ, mục tiêu nhỏ bên dưới ("/ 8.000 bước"),
    câu còn bao nhiêu ở dòng phụ. Vượt mục tiêu thì vòng đầy, số ghi thật.
  - **Cung chia khúc** (kcal, nước): cung 240° hở phía dưới cho số, 8–10 khúc bo tròn, mỗi khúc dài gấp đôi bề dày (ngắn hơn
    thì thành chấm tròn), khe 6px. Làm tròn xuống: chưa đủ một khúc thì chưa tô.
  - **Vòng từng ngày**: bảy vòng 36px nét 4px dưới tên thứ, hôm nay chữ đậm cộng chấm dưới, ngày chưa tới chỉ có rãnh.
    Chạm một ngày thì thẻ dưới đổi sang ngày đó.
  - **Donut có khe**: tối đa 4 phần cộng "Khác", khe 8px thay viền trắng, đầu bo tròn, xếp lớn tới nhỏ từ 12 giờ, số tổng
    ở giữa, bảng dưới có chấm màu, số và % (`N4`). Hợp thẻ nền tối (`J5`), thang phân loại bản tối của `charts.md`.
  - **Một thẻ một vòng.** Số phụ đi kèm (đạm, tinh bột, béo; phút, km) là thanh mảnh `h-1.5` dưới vòng, không thêm vòng
    thứ hai, thứ ba. Vòng đặt trên khối nhấn Tinted (`J15`) thì rãnh là trắng 55% (`--hero-track`).
  - Mỗi vòng `role="img"` với `aria-label` ghi số ("6.240 trên 8.000 bước, 78%"). Không hiệu ứng vẽ dần lúc vào màn,
    như `charts.md`.
- **Vẽ bằng gì.** Bản mẫu HTML thuần không có `package.json` thì vẽ SVG bằng tay theo công thức của `charts.md`. Dự án
  có thư viện thì theo "Vẽ bằng thư viện"; hàng đọc số và vạch chọn vẫn theo luật trên (Recharts: ẩn tooltip mặc định,
  đọc mốc đang chọn rồi ghi vào hàng đọc số).
