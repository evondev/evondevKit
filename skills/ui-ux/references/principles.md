# Nguyên tắc chung — luật N

Mười nguyên tắc **đứng sau** các luật M, T, F, I, R và các file component. Đây
**không phải luật mới**: mỗi dòng gom từ những lỗi đã dính ở nhiều component
khác nhau, và dẫn về luật gốc. Đọc file này **trước khi dựng bất kỳ thứ gì**,
nhất là thứ chưa có file mẫu trong `components/`: không skill nào viết đủ spec
cho mọi UI, nên chỗ nào không có spec thì nguyên tắc là thứ duy nhất để bám.

Mỗi nguyên tắc có một **phép thử**: câu hỏi tự trả lời được bằng cách nhìn bản
dựng. Trả lời "không" là đang vi phạm, dù chưa có luật cụ thể nào cho component
đó.

---

**N1. Đổi trạng thái thì giao diện không nhảy chỗ, không co giãn.**

Người dùng bấm, rê chuột, chuyển trang, dữ liệu về: mọi thứ **xung quanh** chỗ vừa
đổi phải đứng yên. Hai cách giữ: chừa sẵn chỗ cho trạng thái lớn nhất, hoặc đổi
bằng màu và opacity thay vì thêm bớt phần tử. Số tự đổi (đồng hồ đếm ngược, phần trăm,
bộ đếm) luôn `tabular-nums`.

Đã dính: tab thêm viền lúc chọn làm cả hàng xô (tab luôn có `border`); nav phân
trang đổi số ô theo trang (luôn 7 ô); select "Mỗi trang" trôi theo chuỗi đếm;
spinner chèn vào nút làm nút phình (spinner thay chỗ icon); cột % lệch vì nút
cuối hàng rộng hẹp khác nhau (cột hành động `w-20`); lịch 5 hay 6 hàng (luôn 6);
khung chờ sai hình (`I19`); thanh cuộn chiếm chỗ lúc hiện (`I18`); đổi độ đậm
chữ tab lúc chọn; câu lỗi OTP chèn vào đẩy nút Xác nhận tụt khỏi con trỏ (dòng
lỗi giữ chỗ sẵn khi nó nằm giữa ô và nút bấm).

**Giữ chỗ là để khớp với phần tử bên cạnh**, không phải để giữ hình. Không có
gì bên cạnh (màn hẹp xếp một cột, cả hàng cùng thiếu) thì bỏ chỗ giữ, để không
thành khoảng trắng vô nghĩa (đã dính: sparkline tháng đầu giữ chỗ ở mobile).

**Sang hẳn màn khác thì không tính** (đổi bước form, đổi trang): cả màn đã thay,
không còn gì "bên cạnh" để giữ. Đừng `truncate` chữ cần đọc chỉ để giữ chiều cao
qua các màn (đã dính: tên bước ở thanh thu gọn bị cắt "…").

*Phép thử:* bật lần lượt từng trạng thái, nhìn **phần tử bên cạnh**, không nhìn
phần tử vừa đổi. Có cái nào xê dịch dù 1px không?

---

**N2. Mỗi trạng thái đều được dựng, và liếc là phân biệt được.**

Liệt kê trạng thái trước khi dựng: thường, rê chuột, focus bàn phím, đang chọn,
khoá, đang tải, rỗng, lỗi, xong, và **ca biên** (không có gì, một cái, rất dài,
rất nhiều). Mỗi trạng thái một ví dụ tĩnh (`SKILL.md` phạm vi). Hai trạng thái
khác nghĩa thì phải khác hình rõ ràng.

Đã dính: xong mà thanh vẫn đen đầy như đang chạy (xong là emerald); trang đang
chọn trông như ô input; nút phụ trông như bị khoá (`I8`); hôm nay và ngày đang
chọn lẫn nhau (chữ đậm + chấm, khác nền đặc); một trang và 0 dòng vẫn hiện đủ
control chết; bước lỗi không có hình riêng; thanh bước thu gọn tô đậm cả đoạn đang
làm nên "đang ở bước cuối" giống "đã xong hết", sửa thành để xám thì "Bước 2 / 3"
lại đọc như thanh thiếu (đang làm là tầng thứ ba, nửa đậm).

*Phép thử:* che chữ đi, chỉ nhìn hình. Còn nói được đây là trạng thái nào không?

---

**N3. Một tín hiệu cho một ý. Tín hiệu mạnh nhất để dành cho đúng một chỗ.**

Nền màu nhấn, khối tô đặc, màu đỏ, chữ đậm là tín hiệu **đắt**: mỗi màn tiêu một
lần. Thứ bậc đi bằng cỡ chữ, độ đậm, vị trí trước; màu và bóng sau cùng (`M13`,
`T8`). Đã có một dấu hiệu thì không thêm dấu hiệu thứ hai cho cùng ý (`M6`, `F6`).

Đã dính: ba khối đen trong ô chọn giờ (một dải nhạt); icon thùng rác ở đầu hộp
và ở nút (nút chỉ chữ); banner tô màu cả mô tả (chỉ icon và tiêu đề); câu lỗi
ghi "rồi thử lại" cạnh nút Thử lại; "Xem tất cả" muốn tô đen ở mọi card (`I1`,
`I3`); tên trang nhạt hơn tiêu đề khối bên dưới; màn OTP hết hạn có cả "Gửi mã
mới" trong câu lỗi lẫn "Gửi lại mã" bên dưới (hai nút một việc: giữ một).

*Phép thử:* đếm số chỗ tô đặc hoặc có màu trên màn. Mỗi chỗ trả lời được "nó nói
điều gì mà chỗ khác chưa nói" không?

---

**N4. Màu nói trạng thái, theo đúng một bảng cho cả app, và luôn có chữ đi kèm.**

Màu không để trang trí, không để phân loại (`M4`, `M5`). Trạng thái nào màu gì
lấy từ **một** bảng (`M7`, `D2`, `M30`): xám chờ, xanh lá xong, hổ phách cần chú
ý, đỏ hỏng. Màu theo **tốt hay xấu**, không theo lên hay xuống. Màu không bao giờ
đứng một mình: luôn có chữ hoặc icon nói cùng ý, vì người mù màu và trình đọc màn
hình không thấy màu.

Đã dính: màu tăng giảm suy từ dấu con số (chi phí tăng mà xanh); chuỗi xám
nhạt nhất của biểu đồ gần như trắng, may còn số trên đầu cột; thanh tiến độ
đổi màu mà không có dòng chữ; chỉ có đoạn đỏ trên thanh bước ở màn hẹp mà không
nói bước nào sai.

*Phép thử:* chuyển màn sang đen trắng. Mọi trạng thái còn đọc ra không?

---

**N5. Cùng vai thì cùng khuôn, cùng class.**

Thứ đã có mẫu thì chép mẫu, không nặn biến thể (`SKILL.md` mục 2 "ráp, không vẽ
lại", `D1`, `D8`). Component mới có phần giống component cũ thì mượn đúng phần
đó: ô mở popover trông y như ô nhập, nút trong form cao bằng ô nhập, lịch nào
cũng một lưới.

Đã dính: hai đầu khoảng ngày khác sắc; vòng bước lỗi khác khuôn vòng bước xong;
"Tải báo cáo" mượn nhầm khuôn "Xem tất cả" (nút theo loại hành động, không theo
chỗ đứng); `₫` chỗ này `đ` chỗ kia; `12,4 / 20` cạnh `4/6`; thang xám của cột nhóm khác thang xám của donut; `2,8 %` ở số chính cạnh `27,3%` ở dòng
so sánh; khối nhãn và
giá trị viết trạng thái, nhãn phân loại, tiền thành chữ trơn thay vì dùng badge,
pill, `đ` đã có sẵn. **Một giá trị có khuôn riêng thì ở đâu cũng dùng khuôn đó**,
kể cả khi nó nằm trong một component khác. **Mượn khuôn là mượn cả class**, không chỉ
mượn dáng (cỡ chữ, độ dày đường nối, cách căn dòng đầu với vòng).

*Phép thử:* với từng phần tử mới, trong skill đã có thứ nào **cùng vai** chưa?
Có thì class có giống không?

---

**N6. Chữ nói được việc: chuyện gì, vì sao, làm gì tiếp.**

Câu dài thì tách **hai tầng**: tầng trên chuyện gì xảy ra, tầng dưới vì sao hoặc
hệ quả, có số và mốc cụ thể. Câu lỗi nói cách sửa, không lặp lời nhãn hay
placeholder (`T20`, `T22`, `layouts/form.md`). Khoá thì nói vì sao khoá. Chỉ dẫn
sang chỗ khác thì là nút hoặc link, không phải câu chữ trơn.

Đã dính: toast lỗi vỡ ba dòng; lỗi tải chỉ một câu không lý do; "Chọn ngày hết
hạn" làm câu lỗi (đọc như hướng dẫn); "ví dụ 31/12/2026" cho ô không gõ được;
"Đổi trong Cài đặt" không bấm được; dòng dưới lịch vẫn "Chọn ngày bắt đầu" khi
đã chọn xong. Màn OTP không có "Đổi email": gõ nhầm email là kẹt, không có
đường lùi. **Mỗi bước phải có lối ra khi người dùng đi nhầm.**

**Câu lỗi không được bịa ra một luật mà hệ thống không hề kiểm.** Nó dạy sai người
dùng, và mâu thuẫn ngay với dữ liệu đang hiện trên màn (đã dính 23/09/2026: ô nhập
nhiều tag ghi "cần có dấu @ và đuôi .com" trong khi các email hợp lệ ngay trên đó là
`@saoviet.vn`). Viết đúng cái đang kiểm: "cần có dấu @ và tên miền".

*Phép thử:* người dùng đọc xong câu này, họ biết phải làm gì tiếp không?

---

**N7. Không làm hộ, không đoán hộ người dùng.**

Chưa chọn thì để trống, hiện placeholder. Gợi ý thì hiện ở chỗ gợi ý, không ghi
vào ô. Không bịa số, không tick sẵn đồng ý.

Đã dính: mở ô chọn giờ là ô tự điền `00:00:00`; bấm ngày xong ô ngày giờ tự lấy
giờ; tab có số đếm bịa cho có. Ngoại lệ có tên: nhóm radio luôn có sẵn một lựa
chọn (`components/choice-controls.md`).

*Phép thử:* có giá trị nào xuất hiện trong ô mà người dùng chưa hề chạm vào không?

---

**N8. Không che, không cắt mất thứ người dùng cần để quyết định.**

Trang không cuộn ngang (`R1`, `T13`). Lớp nổi không che chính ô mở ra nó. Thứ
dùng để xác nhận (tên đối tượng sắp xoá) không `truncate`. Mô tả xuống dòng, chỉ
tiêu đề một dòng mới cắt, cắt thì có `title` (`T14`). **Mô tả được xuống dòng thì
luôn `text-pretty`** (`T10`), nhất là trong cột hẹp: không để trơ một chữ ở dòng cuối. Không có chữ bị xén nửa.

Đã dính: lịch khoảng ngày lật lên che ô của nó; số trong bánh xe bị cắt nửa ở mép;
nửa trên popover trống trơn vì chèn đệm. Mô tả bước ở thanh các bước dọc rớt "thoại", "hệ",
"doanh" xuống một mình (cột ~200px, thiếu `text-pretty`). Link "Đổi email" bị bẻ đôi ở cuối dòng. **Link ngắn nằm
trong câu không bị bẻ giữa chừng**: `whitespace-nowrap` để nó xuống dòng nguyên
cụm. Nhãn nút thì ngược lại, được xuống dòng (`T15`).

*Phép thử:* ở 375px và với dữ liệu dài nhất, thứ người dùng cần đọc để bấm có
còn đọc được hết không?

---

**N9. Mọi thao tác đi được bằng chuột, bằng phím, và bằng tay trên điện thoại.**

Bấm được thì có hover và `cursor-pointer` trên đúng phần tử bấm, vùng bấm rộng
hết hàng (`I9`, `I29`). Tab tới được, focus trông như hover (`I13`). Không có
hover trên màn chạm thì thứ ẩn-hiện-khi-rê phải luôn hiện (`I11`). Thứ chọn được
thì chọn được bằng nhiều đường, không chỉ một cử chỉ. `aria-*` cho thứ chỉ nói
bằng hình (`aria-pressed`, `aria-current`, `role="progressbar"`).

Đã dính: bánh xe giờ chỉ cuộn mới chọn được, và cuộn khựng giữa chừng; chỉ có
mũi tên ‹ › để đổi tháng, đi xa là mỏi tay (tiêu đề bấm ra lưới tháng/năm).

*Phép thử:* rút chuột ra, dùng Tab + Enter + mũi tên đi hết màn. Rồi mở trên điện
thoại. Có chỗ nào kẹt không?

---

**N10. Skill lo hình, người dùng lo logic.**

Mọi thứ có hệ quả dữ liệu là quyết định của người dùng: lưu lúc nào, gọi gì, ngày
nào bị khoá, ngưỡng đổi màu, đóng rồi có hiện lại không. Skill để prop hoặc
handler rỗng, và chỉ quyết **mỗi lựa chọn đó trông ra sao**. Chi tiết ở phần
phạm vi đầu `SKILL.md`.

Công cụ cũng vậy: thư viện nào, bộ component nào là của dự án. **Kiểm trước
khi dựng** thứ hay có thư viện riêng (biểu đồ, lịch, bảng, danh sách ảo): có thì
dùng đúng cái đó, chỉnh cho khớp hình (tắt thứ nó bật mặc định, màu lấy từ
token), không tự vẽ lại bên cạnh. Chưa có thì không tự cài: dựng bình thường,
và chỉ đề xuất thư viện khi có nhu cầu thật mà tự dựng sẽ tốn. Chọn theo tiêu
chí (nhẹ, giải quyết đúng việc, hợp hệ sinh thái), không theo tên quen.

*Phép thử:* đoạn code vừa viết có gọi API, đặt ngưỡng, lưu trạng thái, hay hẹn
giờ mà đề không yêu cầu không?

---

## Dựng một thứ chưa có mẫu

Stepper dọc, dòng thời gian, cây thư mục, bình luận lồng nhau… không có file
trong `components/` thì:

1. **Tìm thứ gần nhất đã có mẫu và mượn khuôn** (`N5`). Stepper dọc mượn vòng,
   đường nối và bốn trạng thái của thanh các bước (`layouts/form.md`); bình luận
   lồng nhau mượn dòng danh sách (`components/list-row.md`); cây thư mục mượn link
   sidebar có menu con (`layouts/app.md`).
   **Chỉ mượn từ file trong skill**, không mượn từ bản dựng chưa duyệt trong dự án
   (đã dính: dòng thời gian ghi mượn "thanh các bước dọc", thứ cũng đang là đề
   bậc 1b). Khuôn lấy từ file thì dự án sau vẫn có, và lỗi không nhân đôi.
2. **Liệt kê trạng thái và ca biên** (`N2`), mỗi cái một ví dụ tĩnh.
3. **Chạy mười phép thử** ở trên trước khi báo xong.
4. Lúc giao nói một dòng: *"X chưa có mẫu đã duyệt, mình mượn khuôn của Y"*.
