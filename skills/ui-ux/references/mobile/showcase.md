# App điện thoại — Lối trình diễn

Một mục của luật `J`. Luật nền `J1`–`J8` và bảng các mục ở `mobile.md`, mở file đó trước.

## J18. Lối trình diễn

Bản thực dụng (`J1`–`J17`) đúng luật nhưng phẳng và dày: người xem bản mẫu thấy "đúng" mà không thấy "muốn dùng". Lối
trình diễn giữ nguyên luồng, màn, nội dung, chỉ đổi cách trình bày theo công thức chung của các bản mẫu app được khen
nhiều. Code mẫu: `layouts/mobile-showcase.html` (ba màn app đếm kcal).

**Khi nào:** đề nói "đẹp", "gây ấn tượng", "trình bày khách", "như Dribbble", "nhìn sang", hay người dùng bật công tắc
**Trình diễn** trên wireframe (`?show=1`, đứng sau nhóm Tab), hay gửi **ảnh mẫu là bản trình diễn** (`J8`: màu, vị trí
theo ảnh, ảnh thắng công thức ở các luật gu). Không tự bật: app quản lý, nhập liệu dày (`J14`) và
app cho cửa hàng, công ty giữ bản thực dụng vì cần nhiều thông tin trên một màn. Ghép được với mọi bộ mặt `J15`. Đề
trình diễn mà chưa nêu bộ mặt thì lấy, không hỏi: **Tinted** cho app một người tự chăm mình (ăn uống, sức khoẻ, chi tiêu,
thói quen), **Glow** cho AI, sáng tạo, âm nhạc, **Photo** cho lướt chọn bằng ảnh, còn lại **Clean**; báo một dòng lúc giao.

**Công thức** (làm đủ, thiếu một hai thứ là về lại bản phẳng):
- **Quầng màu đầu màn:** 2–3 `radial-gradient` từ màu nhấn và một sắc phụ cách 60–150° (`--accent`, chỉ dùng trong quầng;
  tím với đào, xanh dương với hồng, xanh lá với vàng), mờ dần xuống nền ở 55–60% chiều cao (`mask-image`). Nền dưới quầng là
  nền Tinted khi bộ mặt là Tinted, không thì kem ấm `#f5f1ec`. Chữ trên quầng là chữ tối. Màn danh sách thuần không cần quầng.
- **Tấm trắng trượt lên:** vùng "nhìn" (số chính, hình) nằm trên quầng; vùng "làm" (danh sách, form, nút) là tấm trắng bo
  36 hai góc trên, bóng ngược mềm. Thay cho thẻ số chính nền đen của `J5`.
- **Một điểm nhìn mỗi màn, cỡ lớn:** số chính của màn 56–64px `font-extrabold tracking-[-0.04em]` (số nằm trong khối màu
  40–48px); app không có số đáng nhìn (trợ lý AI, viết, tìm kiếm) thì điểm nhìn là **khối hỏi lớn** trên quầng: câu hỏi
  26–30px đậm **thay luôn tiêu đề màn** ("Hôm nay viết gì?", đến 20 ký tự, ngoại lệ có tên của 15 ký tự ở `J3`), ô gõ,
  nút mic tròn màu nhấn 56px. Đây là màn gốc của app; màn cuộc trò chuyện mới bên trong chat vẫn theo `components/chat.md`
  (không câu chào to); hay hình chính 180–200px (đồ vật
  3D `J16`, ảnh cắt nền) có quầng trắng mờ phía sau và bóng bầu dục dưới đáy để vật đứng trên mặt.
- **Font hình học có tiếng Việt:** Plus Jakarta Sans (mặc định), Lexend, Manrope, Be Vietnam Pro (đã kiểm có bộ
  `vietnamese`). Tiêu đề màn 30–36 `font-extrabold`, chữ phụ 13. **Plus Jakarta Sans có dấu cách hẹp**: đậm 800 cộng
  `tracking-tight` thì "Chọn xe", "Tài xế" dính thành "Chọnxe", "Tàixế". Tiêu đề bằng font này luôn thêm
  `word-spacing: 0.08em`, và chỉ khép chữ từ 30px (`T2`); tiêu đề mục 18–26 để `tracking-normal`.
- **Bo to, không viền, bóng mềm ngả màu nhấn:** thẻ, dòng bo 20–24; khối nhấn bo 32. Tách khối bằng nền (`--soft`: 7% màu
  nhấn pha xám nhạt) hay bóng `--shadow-card` lan rộng, không viền 1px, không vạch ngăn giữa các dòng.
- **Nút tròn trắng nổi 44px** cho quay lại, thông báo, lưu, bớt thêm; nhãn nhỏ trên quầng là viên kính trắng 70%. Nút cam
  kết là viên đen hay màu nhấn cao 56 hết bề ngang, số tiền hay số kcal trong nút.
- **Ô icon pastel chuyển nhẹ** (`bg-linear-to-br from-amber-100 to-orange-50`) 52px bo 18 chứa đồ vật 3D 34px; mỗi danh mục
  một cặp sắc cố định (`M8`). Ô số phụ (đạm, tinh bột, béo) nền pastel một sắc, nhãn bậc 700–800 cho đủ 4.5:1.
- **Biểu đồ trong khối màu:** cột bo tròn hết `rounded-full`, cột chưa chọn trắng 60% (45% chìm vào khối), cột đang chọn
  trắng đặc có số trên đầu và chấm màu nhấn, kỳ đang chạy viền đứt. **Mặc định chọn kỳ trọn gần nhất** (hôm qua): không có
  cột trắng thì khối nhạt nhoà, mất điểm nhìn. Số to giữ số của cả khối (trung bình tuần) vì đó là câu trả lời của màn; số
  của cột đang chọn nằm trên đầu cột, chạm cột khác thì cột trắng và số dời theo. Đây là ngoại lệ có tên của "số to đổi theo
  mốc" và "cột đang chọn không đổi màu" (`J17`): trong khối màu các cột kia là nền, không phải chuỗi.
- **Thanh tab** `dark`, `pill` hay `glass` (`J2`). Ngoại lệ có tên của nút thêm nổi (`J5`): tab danh sách mà việc tạo mới
  đi từ màn gốc khác (bản nháp tạo từ Trang chủ) thì không có nút thêm; màn gốc mà hành động chính đã nằm trên màn (nút + tròn màu nhấn ở bữa chưa ghi, mục chưa có; khối hỏi có ô gõ và nút mic) thì không thêm nút nổi. Thanh `dark` 3 mục thì co theo nội
  dung, nằm giữa (`inset-x-0 mx-auto w-fit gap-6 px-2`), không giãn hết bề ngang cho thưa.
- **Bớt chữ:** mỗi dòng một tên đậm và một dòng phụ, bỏ nhãn lặp, bỏ câu giải thích; khoảng trắng tách khối thay tiêu đề nhỏ.
- **Nhịp và độ đậm.** Màn trình diễn mà "chật" thường không do thiếu chỗ, mà do chữ nào cũng đậm và các tầng chữ dính nhau
  (app AI: tên dòng 700 dài 3 dòng, giờ 800, tiêu đề nhóm 700, tên dính dòng phụ 0px):
  - Chỉ điểm nhìn và tiêu đề màn đậm 800. Tiêu đề khối và chữ trên nút cam kết 700. Tên dòng 600 (cả dòng-thẻ lẫn dòng
    trong danh sách), giờ và số phụ 600, dòng phụ 400. File mẫu `mobile-showcase.html` theo đúng các bậc này.
  - Tên dòng ở dữ liệu mẫu 1–2 dòng (khoảng 40 ký tự trở xuống); ba dòng đậm làm danh sách thành bức tường chữ. Ca tên dài
    để thử (`S16`) vẫn giữ một mục, xuống dòng đủ, không cắt.
  - Tên cách dòng phụ 4px (`mt-1`), thẻ đệm 18–20 (dòng-thẻ có ô icon 52px đệm 12), thẻ và dòng cách nhau 12, giữa các khối
    32–40, tiêu đề khối cách thẻ đầu 12–14.
  - **Màn có số chính thì tiêu đề màn 26–30** (probe đo): tiêu đề 36 chồng trên số 60 là hai điểm nhìn. Đầu màn trên quầng
    tối đa ba tầng chữ: dòng nhỏ, tiêu đề hay số, một dòng phụ.
  - Hàng chip lọc chọn một không xuống dòng (`R6`, probe đo): cuộn ngang, mép mờ.
- **Màn rỗng trình diễn:** nhân vật hay đồ vật 3D (đồ vật 96–120px, có quầng trắng mờ sau lưng) cạnh câu chào và nút, **cộng một hàng gợi ý nhanh** 3 mục có nút + (gợi ý
  bữa sáng, mẫu ngân sách): nửa dưới trống trơn trông như lỗi tải.
- **Ráp vào khung `J1`:** quầng là khối đầu của vùng cuộn (cuộn cùng nội dung), tấm trắng là khối kế tiếp trong luồng cuộn
  (`rounded-t-[36px]`, `min-h` tới đáy), không `absolute` (dòng cuối lọt dưới thanh tab). Dải che tai thỏ (`.status-cover`)
  trong suốt lúc chưa cuộn để không che quầng, có nền khi đã cuộn. Nút cam kết dính đáy trên tấm trắng không có vạch ngăn
  (`J5`), chừa khoảng trắng 16px phía trên. Màn nhóm (Tài khoản, cài đặt) giữ thẻ nhóm có vạch nhạt `divide-y` như `J4`:
  đó là màn thực dụng, không cần quầng.

**Bản tối** (Glow, Immersive): chữ trên quầng là chữ trắng; tấm trượt lên là mảng tối `#141419` bo 36 thay tấm trắng; nút
tròn nổi là trắng 10% viền trắng 12%; viên nhãn trên quầng trắng 12%; nút cam kết là màu nhấn chữ tối (viên đen tàng hình
trên nền tối); ô icon là sắc của danh mục 25% chuyển xuống 10% thay pastel sáng; khối màu chứa biểu đồ là trắng 8%. Thẻ nằm
trên quầng có viền trắng 10% (kính cần mép), dòng trong mảng tối không viền, nền dòng (thay `--soft`) trắng 6%. Sheet
`#1c1c22` bo 28; viên chọn của điều khiển phân đoạn trắng 16%; chip đang chọn màu nhấn chữ tối; dải che tai thỏ khi đã cuộn
là màu nền 80% cộng `backdrop-blur-xl`, lúc chưa cuộn trong suốt (script: lắng nghe `scroll` của vùng cuộn, gắn
`data-scrolled` khi `scrollTop > 8`). Chữ cuộn lên dưới thanh trên trong suốt thì vùng cuộn mờ mép trên 24px (`mask-image`).

**Vẫn giữ:** tương phản 4.5:1 (đo ở chỗ chữ nằm, không ở chỗ quầng đậm nhất hay nhạt nhất), chỗ bấm 44px (điều khiển phân đoạn rãnh 52 `p-1` cho nút 44),
chữ nội dung chính 16px và không cắt chữ (`J4`), tiêu đề lớn ở màn gốc (`J3`, lời chào nhỏ đứng trên), kính `backdrop-blur`
chỉ cho lớp cố định (thanh tab, đầu màn), `J2` ẩn thanh tab ở màn phải làm cho xong, một hành động chính mỗi màn. Logo app:
đầu bảng luồng, favicon, màn chào và đăng nhập (`J12`), không trên mọi màn.
