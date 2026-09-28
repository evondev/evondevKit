# Thiết kế từ đầu như một designer — luật U

Mở file này khi người dùng muốn **nghĩ lại trải nghiệm**, không chỉ làm đẹp: đề có "thiết
kế từ đầu", "làm lại UX", "như một designer", "phân tích rồi mới dựng", "trang này vẫn
chưa ổn về UX", "cần người làm UX". Áp được cho sản phẩm mới lẫn một màn đã có.

Khác nhánh `V` (`review.md`): `V` giữ khung trang, sửa lỗi và làm gọn. Kết quả là bản hi-fi
sạch hơn của **đúng wireframe cũ**. Nhánh `U` bắt đầu từ câu *"người dùng đến màn này để
làm gì"*, nên được đổi cả khung: cái gì đứng đầu, lọc nằm đâu, card nói gì, có chế độ xem
nào. Đã dính 28/09/2026: bản dựng lại theo `V` sạch hết lỗi đo được, người xem vẫn nói
"nhìn không khác gì bản cũ, vẫn cần người làm UX".

**Không phải mặc định.** Đề chỉ nói "dựng màn X" thì vẫn đi mục 0 bình thường, một bố cục
mặc định, không hỏi (câu 4 của `SKILL.md`). Nhánh này có hai lần dừng chờ người dùng, nên
chỉ vào khi họ tự xin.

---

## Bốn bước, hai cổng

| Bước | Ra cái gì | Cổng |
| --- | --- | --- |
| `U1` Brief | Một khối ngắn: sản phẩm, người dùng, việc chính, nền tảng | Gộp với `U2`, **cổng 1** |
| `U2` Việc chính của từng màn | Bảng: đến để làm gì, so sánh bằng gì, hành động cuối, quy ước loại sản phẩm | **Cổng 1**: người dùng sửa hoặc trả lời `ok` |
| `U3` Wireframe | 2–3 phương án bố cục khác nhau thật, xám, nội dung thật, có ảnh | **Cổng 2**: người dùng chọn |
| `U4` Dựng thật | Code theo phương án đã chọn, probe tới khi danh sách `P` trống | Như cổng 3 của `checklist.md` |

Chưa qua cổng 2 thì **không đụng file nào của dự án**. Wireframe và ảnh để ở
`$TMPDIR/evon-design/`.

---

## U1. Brief: đọc trước, hỏi sau ⚑

- Đọc README, file route, kiểu dữ liệu (type, mock), chữ trên các màn đang có. Từ đó ghi
  một khối năm dòng: **sản phẩm gì**, **cho ai**, **một đến ba việc chính**, **nền tảng
  dùng nhiều** (điện thoại hay máy tính), **điểm khác biệt** (thứ sản phẩm bán mà nơi khác
  không có).
- Dòng nào không suy ra được thì hỏi, **tối đa năm câu, gửi một lần**, mỗi câu kèm câu trả
  lời đoán sẵn để người dùng chỉ cần gõ `ok`.
- **Không viết persona, không vẽ hành trình người dùng, không bịa số liệu nghiên cứu.**
  Model không phỏng vấn được ai. Brief chỉ ghi điều đọc được từ code hoặc người dùng đã nói,
  mỗi dòng ghi nguồn: *đọc code*, *người dùng nói*, *đoán*.

## U2. Việc chính của từng màn ⚑

Mỗi màn trong phạm vi một dòng:

| Màn | Đến để làm gì | So sánh, quyết định bằng gì | Hành động cuối | Loại sản phẩm này thường làm |
| --- | --- | --- | --- | --- |
| Danh sách khoá học | Tìm khoá hợp trình độ, trong ngân sách | Giá, thời lượng, trình độ, đánh giá | Mở chi tiết, lưu | Lọc dính đầu trang, card nói giá và trình độ trước, có sắp xếp cạnh số kết quả |

- Cột "so sánh bằng gì" quyết định card và bảng: thứ người dùng dùng để chọn giữa các mục
  phải **nổi nhất và đứng đầu**. Thứ không giúp chọn thì lùi xuống hoặc để trang chi tiết.
- Cột cuối: **tra thật** cách vài sản phẩm cùng loại đang làm (tìm web nếu có công cụ), ghi
  thành quy ước, không ghi tên sản phẩm vào code hay vào file của dự án. Không tra được thì
  ghi *"theo trí nhớ, cần kiểm"*. Quy ước số đông thắng gu riêng.
- Điểm khác biệt ở `U1` phải **hiện trên màn chính**, không chỉ nằm trong bộ lọc.

Gửi `U1` và `U2` trong **một** tin, kết bằng *"Đúng thì trả lời `ok`, sai dòng nào thì sửa
dòng đó."* Dừng chờ.

## U3. Wireframe: 2–3 phương án khác nhau thật ⚑

- **Khác ở chiến lược bố cục, không khác ở trang trí.** Ví dụ cho một trang danh sách:
  A giữ lưới card với thanh lọc gọn dính đầu trang; B chia đôi danh sách và panel chi tiết;
  C đặt ô tìm lên trước, lọc sau. Ba phương án chỉ khác bo góc hay màu là **một** phương án.
- **Xám, không màu brand, không icon trang trí.** Ảnh là khối xám có tỉ lệ thật. Người dùng
  chỉ được nhìn bố cục, không sa vào màu. **Xám vẫn có mức nhấn**: nút chính tô xám đậm chữ
  trắng, nút phụ viền. Hai nút cùng một kiểu trong wireframe là chưa quyết thứ bậc, lúc dựng
  thật sẽ lại thành hai nút tranh nhau (`V1b`).
- **Nội dung thật**: chữ lấy từ dữ liệu của dự án, cả ca dài nhất và ca trống. Wireframe chữ
  "Lorem" thì không thấy được card quá tải.
- **Đúng hình dạng dữ liệu**: mỗi mục có mấy ảnh, trường nào hay trống, danh sách dài bao
  nhiêu. Dữ liệu chỉ có một ảnh mỗi tin mà wireframe vẽ lưới ba ảnh là hứa thứ dữ liệu
  không có: người dùng chọn vì lưới ảnh, bản dựng ra một ảnh to quá khổ (đã dính
  28/09/2026). Muốn phương án cần thêm dữ liệu thì vẽ đúng cái đang có và ghi *"đẹp hơn khi
  có X"* ở dòng đánh đổi.
- Mỗi phương án ghi **ba dòng**: việc chính giờ thấy ở đâu, đổi gì so với bản cũ, đánh đổi.
  Phương án cần dữ liệu hay logic chưa có (khoảng cách, chế độ xem mới) thì ghi rõ
  *"cần dữ liệu X, logic do bạn nối"* (`N10`).
- **Tính cả khung app vào bề ngang.** App đã có sidebar điều hướng mà phương án thêm một cột
  lọc bên trái thì ghi rõ ở dòng đánh đổi: hai cột trái, nội dung còn lại bao nhiêu px ở 1280.
- **Đánh dấu một phương án khuyên dùng**, kèm một câu vì sao (bám `U2`).
- Một file HTML, các phương án chuyển bằng tham số (`?v=a`, `?v=b`…) để probe mở được từng cái.
- **Wireframe có đủ trạng thái như bản thật**: một mục đang chọn đánh dấu `aria-current` (hay
  `aria-selected`), có nền rê, có vòng focus. Wireframe tĩnh không có rê thì không ai thấy
  "rê trùng nền đang chọn" cho tới khi đã dựng xong.
- **Probe từng phương án trước khi gửi**, ở 1280 và 375, sửa tới khi sạch các mục: danh sách
  `P`, rê ra đúng màu mục đang chọn, vạch trái bị bo góc cắt, mục lặp dày chữ, cột dính cuộn
  riêng, nội dung trôi giữa màn rộng. Rồi chạy luật Cấu trúc (`V1b` trong `review.md`) bằng
  mắt. Người dùng không tự thấy "card chữ quá trời" hay "vạch bị cắt" trên wireframe xám, họ
  chọn theo bố cục rồi vấp lỗi ở bản dựng (đã dính 28/09/2026: wireframe C năm dòng mỗi mục,
  vạch trái bị bo cắt, đang chọn và rê cùng một xám; probe đo ra cả hai lỗi đầu trên chính
  file wireframe). Ghi một dòng khi gửi: *"Probe wireframe: A sạch, B sạch, C sạch"*.
- **Hai biến thể nội dung, D và E, trên phương án khuyên dùng.** Cùng bố cục, chỉ khác nội
  dung, để người dùng thấy cạnh nhau cái họ không tự nghĩ ra:
  - **D, gọn chữ:** mỗi mục chỉ giữ thứ dùng để chọn ở cột "so sánh bằng gì" của `U2`, tối
    đa ba dòng. Phần còn lại để trang hay panel chi tiết.
  - **E, bỏ lặp:** mỗi thông tin một chỗ trên màn: không lặp giữa mục và panel chi tiết, giữa
    header và sidebar, giữa tên trang và mục đang chọn (`V1b`, "Hai chỗ một việc").

  D và E cũng qua probe như các phương án bố cục.

- **Gửi link bấm được cho từng phương án**, không chỉ đường dẫn ảnh. Chạy một server tĩnh nền
  trên thư mục wireframe (`python3 -m http.server <cổng> -d "$TMPDIR/evon-design"`, chạy nền),
  rồi liệt kê mỗi phương án một dòng dạng link đầy đủ, người dùng bấm hoặc chép vào trình
  duyệt được ngay:

  ```
  - A · Lưới card + hàng lọc gọn (khuyên dùng): http://localhost:<cổng>/wireframe.html?v=a
  - B · Danh sách + bản đồ: http://localhost:<cổng>/wireframe.html?v=b
  - D · A gọn chữ: http://localhost:<cổng>/wireframe.html?v=d
  ```

  Mở thử từng link (probe đã mở là được) trước khi gửi. Không chạy được server thì ghi đường
  dẫn tệp `file://…/wireframe.html` và nói tham số `?v=` chọn phương án.

Kết bằng *"Chọn A, B hay C, kèm D, E nếu muốn (ví dụ `C + D`, `B + D + E`)."* Dừng chờ.

## U4. Dựng thật ⚑

- **Dự án đã có UI:** giữ brand theo bảng vai màu (`review.md`, chế độ dựng lại giữ brand),
  dáng theo gu skill. Khung trang theo phương án đã chọn. Logic, handler, dữ liệu không đụng;
  thứ cần dữ liệu mới thì để prop và handler rỗng, lúc giao liệt kê.
- **Sản phẩm mới:** đi tiếp câu 2 và 3 của mục 0 trong `SKILL.md`, rồi dựng theo phương án đã
  chọn thay cho bố cục mặc định của câu 4.
- Ráp bằng mẫu của skill (`SKILL.md` mục 2). Chạy probe `--sweep` tới khi danh sách `P`
  trống, tối đa ba vòng. **Danh sách `P` tính cả khung app trên route đó** (header, sidebar,
  thanh dưới, menu thông báo): người dùng nhìn cả màn, không chỉ phần mới dựng. Khung app lỗi
  thì sửa luôn, sửa ở component dùng chung và nói nó đổi cả các màn khác. Đã dính 28/09/2026:
  trang dựng lại đúng bố cục mà header vẫn bị bóp, người xem vẫn chấm "xấu".
- **Wireframe vẽ khung app (header, sidebar) thì khung app cũng là phương án**: dựng lại
  component dùng chung theo wireframe (số mục, mục nào nút đặc, mục nào chỉ icon), dáng theo
  gu, màu theo vai màu. Không để nguyên header cũ rồi chỉ vá cho khỏi rớt dòng. Đã dính
  28/09/2026: wireframe header năm mục một nút đặc, bản dựng giữ sáu mục cũ lệch cỡ; chủ dự
  án hỏi "wireframe vẽ chuẩn rồi mà sao không ai sửa".
- **Dựng đúng wireframe đã chọn, không bịa.** Wireframe là bản đặc tả: bản dựng chỉ được
  thêm màu và dáng. **Không thêm** mục, dòng chữ, badge, nút, khối mà wireframe không có;
  **không bỏ** thứ wireframe có; không đổi thứ tự. Thấy wireframe thiếu gì thì hỏi hoặc ghi
  một dòng lúc giao, không tự chêm vào.
- **Đối chiếu wireframe từng khối trước khi giao.** Mở ảnh wireframe đã chọn cạnh ảnh 1440
  của bản dựng, đi từng khối (header, sidebar, hàng lọc, danh sách, panel): số mục, thứ tự,
  mục nào nút đặc, mục nào chỉ icon, thứ gì wireframe đã bỏ. Khác chỗ nào thì sửa, hoặc ghi
  một dòng vì sao lệch (thiếu dữ liệu, người dùng dặn). Màu thì theo "Mỗi vai đúng một mã
  màu" trong `review.md`: wireframe xám không nói màu, nhưng bản dựng phải ăn nhập từ viền
  tới brand. Tin giao có bảng *"Đối chiếu wireframe"*: khối, wireframe có gì, bản dựng có
  gì, khớp hay lý do lệch. Kèm số dòng chữ mỗi mục ở hai bên (probe "mục lặp dày chữ").
- **Dựng xong chạy một lượt làm gọn** trên các khối mới **và khung app của route**: `V1b` và `V1c` trong `review.md`
  (card cao thấp theo dòng có dòng không, link trông như chữ thường, nửa khối trống ở màn
  rộng). Sửa luôn, không đưa bảng: người dùng đã chọn phương án rồi.
- **Tự soi bằng mắt trước khi giao, ghi ra.** Mở ảnh 375, 1440 và 1920 của probe, trả lời
  từng câu thành một dòng trong tin giao (câu nào có lỗi thì sửa trước, rồi mới ghi "không"):
  1. Card, dòng cùng loại có cao thấp khác nhau vì có dòng thiếu một mẩu không?
  2. Thứ bấm được (link "Xem thêm", nút chữ) có trông như chữ thường không?
  3. Trong một màn có bao nhiêu khung viền đứng cạnh hay lồng nhau? Gộp được khung nào?
  4. Ở 1920, chỗ nào trống mà không có lý do (nửa card, hai bên nội dung)?
  5. Thứ nặng nhất màn (đậm nhất, màu nhất) có đúng là việc chính ở `U2` không?

  Không ghi mấy dòng này thì coi như chưa soi. Người dùng tự phát hiện ra lỗi nằm trong năm
  câu này là skill chưa làm xong việc (28/09/2026: thanh cuộn thường trực, chữ cắt nuốt diện
  tích, nội dung trôi giữa màn rộng, đường kẻ header lệch, đều do chủ dự án tự thấy; bốn
  thứ đó nay probe đo).
- **Lúc giao** nói bằng ngôn ngữ trải nghiệm, không bằng class: việc chính giờ làm trong mấy
  bước, thấy ngay ở khổ nào; ảnh trước và sau ở 1280 và 375; danh sách thứ cần bạn nối logic
  hay thêm dữ liệu.

---

## U5. Không làm

- Không moodboard, không hi-fi mock riêng rồi dựng lại: với skill này code chính là hi-fi.
- Không tự thêm tính năng ngoài `U2` (chat, thông báo, đánh giá) cho "đủ bộ".
- Không đổi vai màu của dự án đã có, trừ khi người dùng nói bỏ style cũ (`review.md`, chế độ
  dựng lại theo gu skill).
- Không quay về nhánh `V` giữa chừng để "vá cho nhanh": người dùng đã xin nghĩ lại khung.
