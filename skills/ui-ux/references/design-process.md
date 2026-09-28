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
  chỉ được nhìn bố cục, không sa vào màu.
- **Nội dung thật**: chữ lấy từ dữ liệu của dự án, cả ca dài nhất và ca trống. Wireframe chữ
  "Lorem" thì không thấy được card quá tải.
- Mỗi phương án ghi **ba dòng**: việc chính giờ thấy ở đâu, đổi gì so với bản cũ, đánh đổi.
  Phương án cần dữ liệu hay logic chưa có (khoảng cách, chế độ xem mới) thì ghi rõ
  *"cần dữ liệu X, logic do bạn nối"* (`N10`).
- **Đánh dấu một phương án khuyên dùng**, kèm một câu vì sao (bám `U2`).
- Một file HTML, các phương án cạnh nhau hoặc chuyển bằng tab. Chụp bằng probe ở 1280 và
  375, gửi kèm đường dẫn ảnh. Chạy luật Cấu trúc (`V1b` trong `review.md`) lên từng phương án
  trước khi gửi: wireframe còn card quá tải hay hai chỗ một việc thì sửa trước.

Kết bằng *"Chọn A, B hay C, hoặc trộn (ví dụ `B, lấy card của A`)."* Dừng chờ.

## U4. Dựng thật ⚑

- **Dự án đã có UI:** giữ brand theo bảng vai màu (`review.md`, chế độ dựng lại giữ brand),
  dáng theo gu skill. Khung trang theo phương án đã chọn. Logic, handler, dữ liệu không đụng;
  thứ cần dữ liệu mới thì để prop và handler rỗng, lúc giao liệt kê.
- **Sản phẩm mới:** đi tiếp câu 2 và 3 của mục 0 trong `SKILL.md`, rồi dựng theo phương án đã
  chọn thay cho bố cục mặc định của câu 4.
- Ráp bằng mẫu của skill (`SKILL.md` mục 2). Chạy probe `--sweep` tới khi danh sách `P`
  trống, tối đa ba vòng.
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
