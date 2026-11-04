# Luồng người dùng — luật O

Skill dựng và soi **từng màn**. Luồng là chuỗi màn người dùng đi qua để xong một việc:
đăng ký rồi làm được việc đầu tiên, tạo đơn rồi thanh toán, mời đồng đội rồi người đó vào được.
Lỗi luồng không nằm trên màn nào: từng màn đúng luật mà người dùng vẫn lạc, vì màn trước hứa
một đằng màn sau nói một nẻo, hay xong việc rồi không biết đã xong chưa.

Mở file này khi:

- **Đề soi một luồng** ("soi luồng onboarding", "xem giúp luồng đăng ký", "người mới vào có bị
  lạc không", "check the onboarding flow", "walk through the signup flow"): lối soi luồng ở
  cuối file. Bảng câu 1 của `SKILL.md` đưa tới đây.
- **Nhánh `U` dựng sản phẩm mới, hoặc từ hai màn trở lên nằm trên cùng một luồng**: `U2` thêm
  dòng Luồng (`design-process.md`), `U4` dựng đủ trạng thái chuyển tiếp theo `O1`–`O6`.

**Skill lo hình, người dùng lo logic** (`N10`). Luồng có hai nửa: người dùng **thấy** gì ở mỗi
bước (màn rỗng nói gì, nút nào nổi, "đã lưu" hiện ở đâu, tên gọi có giữ không) là việc của skill.
Bấm xong **đi đâu**, dữ liệu có giữ lại không, gọi API nào là logic: skill không tự sửa, chỉ ghi
gợi ý một dòng.

Onboarding là luồng hay hỏng nhất, nên các luật dưới bắt đầu từ nó.

---

## O1. Người mới vào lần đầu thấy đúng một việc tiếp theo ⚑

Màn đầu tiên sau đăng ký là dashboard **chưa có dữ liệu**. Dựng nó như dashboard có số thì ra
năm ô số `0`, biểu đồ phẳng, bảng "Chưa có dữ liệu": người mới không biết bấm vào đâu.

- Workspace mới thì khung **Các bước bắt đầu** thay cả lưới, hay một khối chào có một nút
  `primary` dẫn tới việc chính đầu tiên (`layouts/app.md`, mục Các bước bắt đầu). Không dựng
  lại ở đây, theo đúng mẫu đó.
- Màn danh sách rỗng lần đầu (chưa từng có bản ghi) khác màn rỗng do lọc
  (`components/empty-state.md`): lần đầu thì một câu vì sao nên tạo, một nút tạo; rỗng do lọc
  thì câu nói đang lọc gì, link xoá lọc.
- **Phép thử**: che mọi thứ trên màn trừ nút `primary`. Người mới đọc nhãn nút đó có biết đó là
  bước đầu tiên của việc chính không. Không có nút `primary` nào thì màn hỏng.

## O2. Đếm bước tới việc chính đầu tiên ⚑

Từ lúc bấm Đăng ký tới lúc làm xong việc chính lần đầu (tạo được khoá học đầu tiên, gửi được
hoá đơn đầu tiên), **đếm số màn và số ô phải điền**. Đây là số người làm sản phẩm gọi là thời
gian tới giá trị (time to value): mỗi bước thêm là một chỗ người mới bỏ đi.

- Ô hỏi thứ chưa cần cho việc đầu tiên (tên công ty, số điện thoại, quy mô, mời đồng đội) thì
  dời ra sau việc đầu tiên, hoặc có nút **Bỏ qua** ngang hàng nút Tiếp. Đây là gợi ý hình: thứ
  tự bước là của người dùng quyết.
- Không dựng tour nhiều slide giới thiệu trước khi cho dùng. Hướng dẫn nằm **tại chỗ**: khung
  các bước bắt đầu, câu trong màn rỗng, gợi ý cạnh ô nhập.
- Form đăng ký, form nhiều bước theo `layouts/form.md`: thanh các bước, mỗi bước một ý.

## O3. Xong một việc thì thấy là đã xong, và thấy nó ở đâu ⚑

Mỗi hành động trong luồng có một trạng thái **vừa xong** nhìn thấy được. Thiếu nó, người dùng
bấm Lưu lần hai, tạo trùng bản ghi, hoặc không tìm thấy thứ vừa tạo.

| Hành động | Trạng thái vừa xong mà skill dựng |
| --- | --- |
| Lưu cài đặt, tự lưu | Dấu "Đang lưu… / Đã lưu" cạnh chỗ vừa đổi (`components/loading.md`, mục Tự lưu); bấm nút gửi thì spinner trong nút (`button.md`) |
| Tạo bản ghi mới | Dòng mới nằm đầu danh sách, nền nhạt vài giây (`bg-primary-light` mờ dần); hoặc mở thẳng trang chi tiết của nó |
| Xoá | Toast có Hoàn tác (`layouts/overlay.md`), dòng biến mất không nhảy cả bảng |
| Gửi, mời, thanh toán | Màn hoặc khối xác nhận nói **đã gửi cho ai, tiếp theo là gì**, có một nút đi tiếp |
| Xong bước onboarding | Bước đó được tick trong khung các bước bắt đầu, bước kế sáng lên |

Dựng trạng thái vừa xong thành **một ví dụ tĩnh** cạnh trạng thái thường (như mọi trạng thái
khác của skill). Bấm xong đi tới màn nào là logic: để handler rỗng, ghi gợi ý lúc giao.

## O4. Một tên cho một thứ, suốt luồng ⚑

Nút ghi "Tạo dự án" thì tiêu đề màn sau là "Dự án mới" hay "Tạo dự án", toast là "Đã tạo dự
án", mục sidebar là "Dự án". Không màn này "dự án", màn sau "workspace", toast "không gian làm
việc". Người dùng đọc tên khác thì tưởng là thứ khác (`D6` cho tên khu vực; luật này cho cả
động từ, tên bản ghi, nhãn nút qua nhiều màn).

- Nhãn nút mở bước sau và tiêu đề của bước sau dùng cùng động từ, cùng danh từ.
- Câu đếm tiến độ giữ một kiểu đếm: "Bước 2 / 4" ở mọi bước, không bước này "2/4" bước sau "Còn
  2 bước".

## O5. Mọi bước có lối lui ⚑

- Form nhiều bước: bước 2 trở đi có **Quay lại** cạnh nút Tiếp, nút Tiếp đứng **cùng một chỗ**
  ở mọi bước, để người dùng bấm liền không phải tìm (`layouts/form.md`).
- Bước tuỳ chọn có **Bỏ qua**; bước bắt buộc thì không.
- Modal và panel trong luồng có Huỷ và nút ✕ (`layouts/overlay.md`). Đóng giữa chừng mà đã
  nhập dở có hỏi bỏ thay đổi không là logic: ghi gợi ý.
- Dữ liệu có giữ khi quay lại không là logic: ghi gợi ý, không sửa.

## O6. Luồng lỗi cũng là luồng ⚑

Mỗi bước có chỗ hỏng được (mất mạng, nhập sai, hết phiên, thanh toán bị từ chối) thì có một
trạng thái lỗi **ngay tại bước đó**: câu nói chuyện gì xảy ra và cách sửa, nút Thử lại, những gì
đã nhập vẫn hiện (`rules-state.md`, `components/empty-state.md` mục Lỗi tải). Không đẩy người
dùng về màn đầu luồng, không trang lỗi chung cho lỗi của một ô.

---

## Lối soi luồng ⚑

Đề nhờ soi một luồng thì làm như nhánh `V` (`review.md`): **soi thì không hỏi, sửa thì hỏi**,
bảng có hạng, người dùng chọn dòng rồi mới sửa. Khác ở chỗ đơn vị là **bước**, không phải màn.

1. **Xác định luồng.** Tên luồng, bước đầu, bước cuối là việc chính. Đọc route, link, nút trong
   code để liệt kê các màn theo thứ tự. Đề không nói luồng nào thì soi onboarding: từ màn đăng
   ký tới việc chính đầu tiên.
2. **Đi từng bước.** Có link localhost thì chạy probe `--quick --widths 375,1280` trên từng
   route của luồng, mở ảnh xem theo thứ tự. Trạng thái giữa chừng (vừa lưu, lỗi, rỗng lần đầu)
   không có route riêng thì đọc code của màn đó. Chỉ có ảnh thì soi ảnh, ghi "từ ảnh".
3. **Đếm** số màn, số ô phải điền tới việc chính đầu tiên (`O2`).
4. **Lập bảng**, mỗi dòng một chỗ lạc:

| # | Bước | Người dùng thấy gì | Vì sao lạc (luật) | Hạng | Sửa |
| --- | --- | --- | --- | --- | --- |
| 1 | 2 · Dashboard lần đầu | Năm ô số `0`, không nút nào nổi | Không thấy việc tiếp theo (`O1`) | Hỏng | Khung các bước bắt đầu thay lưới |
| 2 | 3 · Tạo khoá học | Nút ghi "Tạo khoá", tiêu đề màn sau "Course mới" | Hai tên một thứ (`O4`) | Lệch hệ | Đổi tiêu đề "Khoá học mới" |

Hạng theo `V1`: thiếu đường đi tiếp, xong việc mà không có dấu hiệu gì là **Hỏng**; tên lệch,
nút Tiếp đổi chỗ giữa các bước là **Lệch hệ**; còn lại là **Gu**.

5. **Dưới bảng, một dòng đếm bước** (*"Tới việc chính đầu tiên: 4 màn, 11 ô; bỏ được 3 ô hỏi
   công ty, quy mô."*) và mục **Gợi ý logic, của bạn**: bấm xong đi đâu, giữ dữ liệu khi quay lại,
   bỏ bước. Mục này không đánh số, không sửa (`N10`).
6. Kết bằng *"Chọn dòng muốn sửa, ví dụ `sửa 1, 2`."* Dừng chờ, như `V5`.

**Không:** vẽ hành trình người dùng, bịa tỉ lệ bỏ ngang ("40% người dùng rời ở bước 3"), soi
lại lỗi từng màn đã thuộc nhánh `V` (chữ cắt, tương phản): luồng chỉ soi chỗ **giữa** các màn.
Thấy lỗi màn nặng thì ghi một dòng cuối "Lỗi trong màn, soi riêng bằng `xem giúp <route>`".
