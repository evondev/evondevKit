# App điện thoại — App quản lý, nhập liệu

Một mục của luật `J`. Luật nền `J1`–`J8` và bảng các mục ở `mobile.md`, mở file đó trước.

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
