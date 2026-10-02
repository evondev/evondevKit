# Nguyên tắc chung — luật N

Mười hai nguyên tắc **đứng sau** các luật M, T, F, I, R và các file component. Đây
**không phải luật mới**: mỗi dòng gom từ những lỗi đã dính ở nhiều component
khác nhau, và dẫn về luật gốc. Đọc file này **trước khi dựng bất kỳ thứ gì**,
nhất là thứ chưa có file mẫu trong `components/`: không skill nào viết đủ spec
cho mọi UI, nên chỗ nào không có spec thì nguyên tắc là thứ duy nhất để bám.

Mỗi nguyên tắc có một **phép thử**: câu hỏi tự trả lời được bằng cách nhìn bản
dựng. Trả lời "không" là đang vi phạm, dù chưa có luật cụ thể nào cho component
đó.

**Đứng trên cả mười hai nguyên tắc: theo quy ước số đông.** Chỗ nào đã có một cách làm
mà hầu hết app đều làm và người dùng đã quen (dấu `*` đỏ cho trường bắt buộc, logo
góc trái về trang chủ, ✕ góc phải để đóng, Huỷ bên trái nút chính), thì làm đúng
như thế, **kể cả khi một cách khác trông gọn hơn**. Người dùng không nên phải dừng lại
tự hỏi. Gu của skill (nhạt, ít tín hiệu) chỉ quyết những chỗ chưa có quy ước. Chủ
dự án chốt.

*Phép thử:* người dùng lần đầu mở màn này có chỗ nào phải hỏi "cái này nghĩa là
gì" hay "bấm đâu để…" không? Có thì đang phá cách ở đó.

**Cũng đứng trên mười hai nguyên tắc: dự án đã có ngôn ngữ màu thì theo dự án.** Gu ít
màu của skill (xám + một màu nhấn, `M4`, `M5`, biểu đồ đậm nhạt một màu) là **mặc
định cho dự án trống**, không phải bộ lọc để chạy qua dự án có sẵn. Dự án đã tô chip
bằng màu nhấn nhạt, khối bước nền xanh nhạt, nhãn nhỏ đầu mục dạng pill tím, nút chính
có quầng sáng, biểu đồ mỗi loại một màu, thì màn mới dựng **cùng cách đó** (`N5`), và
refactor **không trung tính hoá** màu của họ. Vào dự án nhiều màu mà rút về xám là làm
hỏng nhận diện của họ, không phải làm đẹp (chủ dự án chốt). Cách nhận ra: đếm như phong
cách, `P4` trong `styles.md` (dòng "màu" ở tầng 3, `SKILL.md` câu 2).

Theo dự án là theo **cách dùng màu**, còn **luật về nghĩa và về đọc được** thì giữ ở
mọi dự án, vì đó là đúng sai chứ không phải gu:
- Đỏ chỉ cho lỗi và việc không lấy lại được (`M30`). Màu thương hiệu đỏ trong nội dung
  (logo, ảnh) không tính.
- Một bảng trạng thái cho cả app: "xong" ở đâu cũng một màu (`M7`).
- Màu không bao giờ là thứ duy nhất mang nghĩa hay giá trị: luôn có chữ, số, icon đi kèm (`N4`).
- Chữ đạt tương phản 4.5:1, kể cả chữ màu trên nền màu nhạt.
- Một màu thương hiệu dùng cho một vai: màu nhấn của dự án là xanh thì nút chính, tab
  đang chọn, link cùng xanh đó, không thêm màu nhấn thứ hai.

Dự án dùng màu lung tung, không ra quy luật (mỗi màn một kiểu) thì theo phần **mới nhất**
như `P5`, và báo một dòng lúc giao.

*Phép thử:* đặt màn mới cạnh màn cũ của dự án. Nhìn có như cùng một sản phẩm không, hay
màn mới xám nhạt lạc giữa các màn có màu?

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
lỗi giữ chỗ sẵn khi nó nằm giữa ô và nút bấm); câu lỗi hay lý do khoá thay chỗ mô tả
`text-sm` mà xuống `text-xs`, hàng cài đặt co lại lúc bật tắt (câu thay chỗ giữ cỡ của câu nó thay).

**Giữ chỗ là để khớp với phần tử bên cạnh**, không phải để giữ hình. Không có
gì bên cạnh (màn hẹp xếp một cột, cả hàng cùng thiếu) thì bỏ chỗ giữ, để không
thành khoảng trắng vô nghĩa (đã dính: sparkline tháng đầu giữ chỗ ở mobile).

**Sang hẳn màn khác thì không tính** (đổi bước form, đổi trang): cả màn đã thay,
không còn gì "bên cạnh" để giữ. Đừng `truncate` chữ cần đọc chỉ để giữ chiều cao
qua các màn (đã dính: tên bước ở thanh thu gọn bị cắt "…").

**Mở/đóng có chủ ý đẩy phần bên dưới** (accordion, nhóm thu gọn) thì không giữ chỗ
được, nên phải **trượt**, không giật: `grid-rows` 0fr ↔ 1fr, không `<details>`, không
render có điều kiện (`I30`).

*Phép thử:* bật lần lượt từng trạng thái, nhìn **phần tử bên cạnh**, không nhìn
phần tử vừa đổi. Có cái nào xê dịch dù 1px không?

---

**N2. Mỗi trạng thái đều được dựng, và liếc là phân biệt được.**

Liệt kê trạng thái trước khi dựng: thường, rê chuột, focus bàn phím (chỉ ô nhập và
mục menu; phần còn lại không vẽ vòng focus theo `I13`), đang chọn, khoá, đang tải,
rỗng, lỗi, xong, và **ca biên** (không có gì, một cái, rất dài, rất nhiều). Mỗi trạng
thái một ví dụ tĩnh (`SKILL.md` phạm vi). Hai trạng thái khác nghĩa thì phải khác hình rõ
ràng.

Đã dính: xong mà thanh vẫn đen đầy như đang chạy (xong là emerald); trang đang
chọn trông như ô input; nút phụ trông như bị khoá (`I8`); hôm nay và ngày đang
chọn lẫn nhau (chữ đậm + chấm, khác nền đặc); một trang và 0 dòng vẫn hiện đủ
control chết; bước lỗi không có hình riêng; tệp bị từ chối vì quá cỡ vẫn có rãnh thanh tiến độ rỗng, đọc như "đang chờ chạy"; khung tải tệp bị khoá cùng nền với lúc đang kéo tệp vào; thanh bước thu gọn tô đậm cả đoạn đang
làm nên "đang ở bước cuối" giống "đã xong hết", sửa thành để xám thì "Bước 2 / 3"
lại đọc như thanh thiếu (đang làm là tầng thứ ba, nửa đậm).

Ngoại lệ có tên: dòng bảng **đã chọn** và dòng **đang rê chuột** cùng một nền mờ, vì
hai trạng thái đã tách bằng checkbox đã tick (chủ dự án chốt, `I10`). Hình
khác nhau không nhất thiết phải là nền khác nhau. Ngoại lệ này **chỉ cho dòng bảng tick
checkbox**. Sidebar và cây thư mục không có checkbox nên đang chọn đậm hơn rê một bậc: rê
`hover:bg-item-hover`, đang chọn `bg-secondary` + `font-medium`, không màu nhấn, không viền
(chủ dự án chốt).

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
mới" trong câu lỗi lẫn "Gửi lại mã" bên dưới (hai nút một việc: giữ một); tệp tải xong có
thanh xanh lá đầy + `100%` + "Đã tải xong" (ba tín hiệu một ý: bỏ thanh và số, giữ chữ).

**Cùng một câu ở mọi ô, mọi hàng cũng là một ý nói nhiều lần**: kéo ra ghi một lần
ở đầu nhóm. Đã dính: "so với 2025" ở cả bốn ô số liệu
(chính cái đuôi đó làm ô hẹp vỡ dòng; đừng chữa bằng cách xếp một cột thay vì
bỏ đuôi); khách mới thì "Chưa có kỳ trước" bốn lần; `/2026` ở mọi mốc giờ; cột Trạng
thái badge xanh "Đang hoạt động" trên 14/18 dòng. **Trạng thái thường không cần dấu, chỉ ngoại lệ mới có** (lời mời "Chờ chấp nhận"). Số
liệu `text-3xl` to hơn tên khách cũng sai: thứ nặng nhất phải là thứ trả lời "đang xem
cái gì".

**Thứ vừa bấm để mở cũng là một lần nói.** Đã dính: bấm
avatar ra menu, đầu menu lại một avatar 40px to hơn chính nút vừa bấm; header có avatar
mà chân sidebar vẫn còn hàng profile mở cùng menu đó (hai lối vào một chỗ); màn hẹp xổ
danh sách tài khoản ngay dưới đầu menu, tài khoản đang dùng hiện hai lần liền nhau.

**Đã nói bằng vị trí thì không nói thêm bằng hình. Một việc đang chạy, một spinner.**
Đã dính ở khung chat: bong bóng căn phải đã nói "ai đang nói" mà mỗi câu trả
lời vẫn có một vòng robot; mở danh sách công cụ ra thấy spinner ở cả hàng đầu lẫn hàng
bước; một công cụ lỗi mà câu trả lời đã giải thích vẫn có "1 lỗi" đỏ, icon đỏ, dòng mô
tả, bốn lần một ý (`components/chat.md`). Cùng màn đó, tên bước công cụ nặng ngang câu
trả lời: **quá trình luôn nhẹ hơn kết quả**, và không nói trước kết quả (mô tả bước
"tổng 409.000.000 đ" ngay trên câu trả lời mở đầu bằng đúng con số đó).

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
pill, `đ` đã có sẵn; avatar cỡ to trên trang hồ sơ dựng riêng nên khác màu
avatar của cùng người ấy trên header; email trong hộp xác nhận không dùng cách bẻ
dòng đã có ở khối nhãn và giá trị. **Một giá trị có khuôn riêng thì ở đâu cũng dùng khuôn đó**,
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
đường lùi. **Mỗi bước phải có lối ra khi người dùng đi nhầm.** Tự tay dừng cũng là
đi nhầm được: câu trả lời bị dừng mà không có Tạo lại thì phải gõ lại cả câu hỏi
(`components/chat.md`).

**Câu lỗi không được bịa ra một luật mà hệ thống không hề kiểm.** Nó dạy sai người
dùng, và mâu thuẫn ngay với dữ liệu đang hiện trên màn (ô nhập
nhiều tag ghi "cần có dấu @ và đuôi .com" trong khi các email hợp lệ ngay trên đó là
`@saoviet.vn`). Viết đúng cái đang kiểm: "cần có dấu @ và tên miền".

**Rỗng mà người dùng là người phải mở đầu thì trạng thái rỗng là việc bấm được ngay**,
không phải câu báo "chưa có". Đã dính: khung chat mới chỉ có "Chưa có tin
nhắn nào" giữa màn (thay bằng 2–3 gợi ý mở đầu, `components/chat.md`). Danh sách do hệ
thống đổ về (đơn hàng, thông báo) thì vẫn một dòng chữ mờ (`components/empty-state.md`).

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
cụm. Nhãn nút thì ngược lại, được xuống dòng (`T15`). **Chữ ghi đè lên hình (số trên
biểu đồ) đặt về phía trống**, không đặt cố định một phía: số "44,4 tr đ" đặt trên chấm
nằm đúng trên đoạn nối đi lên, nền sau chữ cắt đôi đường. Một con số không
kèm mốc khi trục chỉ ghi vài nhãn cũng là thiếu thứ cần đọc: không biết số của ngày nào.

**Phải cắt thì cắt phần giống nhau, giữ phần phân biệt.** Cắt ở cuối không phải cách
duy nhất, và xuống dòng không phải cách thay duy nhất. Email giữ tên miền, cắt phần
trước `@` (`layouts/overlay.md`, "Cắt email"); tên tệp giữ đuôi `.pdf`. Đã dính:
sợ cắt mất tên miền nên cho email xuống dòng, mỗi hàng
thành ba dòng, danh sách con nặng hơn menu cha. Trong menu, hàng chọn, ô hẹp: mỗi
trường một dòng.

*Phép thử:* ở 375px và với dữ liệu dài nhất, thứ người dùng cần đọc để bấm có
còn đọc được hết không?

---

**N9. Mọi thao tác đi được bằng chuột, bằng phím, và bằng tay trên điện thoại.**

Bấm được thì có hover và `cursor-pointer` trên đúng phần tử bấm, vùng bấm rộng
hết hàng (`I9`, `I29`). Tab tới được; không vẽ vòng focus (`I13`, chủ dự án chốt). Không có
hover trên màn chạm thì thứ ẩn-hiện-khi-rê phải luôn hiện (`I11`). Thứ chọn được
thì chọn được bằng nhiều đường, không chỉ một cử chỉ. `aria-*` cho thứ chỉ nói
bằng hình (`aria-pressed`, `aria-current`, `role="progressbar"`).

**Thứ bấm được mà hình nhỏ hơn 32px** (nút chữ giữa câu "Thử lại", "Gửi lại", nút icon `size-7`
cạnh một giá trị) **giữ hình, nới vùng bấm bằng `relative before:absolute before:-inset-*`** cho
tới ~32–40px, không phóng to hình: to hình thì đẩy lệch hàng và nặng hơn việc của nó. Số âm ở đây
buộc phải giữ (`N11`). Nếu hai vùng nới chạm nhau thì tách thứ đó ra hàng riêng trước. Đã dính:
nút sao chép 28px, "Gửi lại · Huỷ" 18px, "Thử lại" 16px; công thức
từng chỗ ở `components/description-list.md`, `layouts/app.md` (Hồ sơ), `components/file-upload.md`.

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

**N11. Không dùng số âm cho khoảng cách và vị trí, trừ khi không còn cách nào khác.**

Margin âm (`-mt-*`, `-mx-*`), `-space-*`, `-translate-*`, `-inset-*`, `top-[-…]`: số âm
kéo phần tử ra khỏi chỗ của nó, nên khung bao không còn nói thật kích thước bên trong.
Sửa padding một chỗ là chỗ khác lệch theo, và hay lộ lỗi ở trạng thái khác (margin
âm trong accordion làm câu đang đóng lòi dòng đầu câu trả lời; nút ⋯
`size-8` trên thẻ kanban kéo `-mr-2` thì khối bọc co còn 24px, `max-w-full` của Button bóp
nút theo thành 24×32). Chủ
dự án chốt: ưu tiên mọi giá là không dùng.

Làm theo thứ tự:

1. **Đặt padding ở đúng phần tử cần nó.** Đường chia muốn tràn mép thì khung không có
   padding ngang, từng hàng tự có `px`: vạch tự chạm mép, không phải kéo ra.
2. **Chấp nhận khoảng cách mà padding cố định cho ra**, thay vì kéo cho sát hơn. Đừng
   đổi padding của một khối theo trạng thái để bù cho khối bên cạnh: tô nền khối đó là
   chữ lệch về một mép (accordion bớt `pb` của nút khi mở, `I30`).
3. **`gap`, căn `items-*`, đổi `leading`** để thẳng hàng, thay vì nhích bằng `translate`.
   **Căn giữa quanh một điểm** (chấm trên biểu đồ, nhãn trên tay cầm): đặt khối `absolute
   w-0 flex justify-center` đúng tại điểm, phần tử nằm trong nó, không `-translate-x-1/2`.
4. Không cách nào ở trên làm được: dùng số âm, và **ghi comment lý do ngay trên dòng đó**, như
   `eslint-disable`. Các chỗ đã thử và giữ: avatar xếp chồng (`avatar.md`); vùng
   bấm nở ra ngoài một phần tử nhỏ (`before:-inset-*`, `N9`); khung tên sửa tại chỗ tràn ra
   ngoài chữ để chữ thẳng cột (`inline-edit.md`); hàng icon có nền rê nằm giữa một cột chữ
   (`button.md`, mục `ghost`); đoạn đậm của đường dọc cây thư mục (`tree.md`).

**Không tính là số âm của `N11`**: điểm xuất phát của chuyển động (`-translate-y-1 → 0` của
dropdown, `-translate-y-full → 0` của toast ở đỉnh). Đó là hướng trượt vào, không phải khoảng cách
hay vị trí đứng yên; phần tử đứng yên luôn ở `translate-0`.

*Phép thử:* grep `-m[trblxy]?-|-space-|-translate-|-inset-` trong file vừa dựng. Mỗi kết
quả phải có comment giải thích vì sao không làm bằng cách 1–3 được (trừ điểm xuất phát chuyển động).

---

**N12. Chữ trong một khối có thứ bậc, có nhịp, và tên không bị cắt cụt** ⚑.

Áp cho **mọi khối lặp**: card tin đăng, card việc làm, card sản phẩm, dòng danh sách, ô
lưới, kể cả kiểu chưa có mẫu. Không cần mẫu riêng cho từng kiểu, ba câu này là đủ:

1. **Thang chữ trong khối chênh nhau một bậc.** Tối đa ba cỡ chữ, thứ to nhất chỉ hơn tên
   mục một bậc của thang (`budgets.md`): tên `text-sm` thì giá, số chính `text-base`
   `font-semibold`, không nhảy lên `text-lg`, `text-xl`. Thứ bậc còn lại nói bằng độ đậm
   và màu. Giá to gấp rưỡi tên thì card đọc như bảng giá, tên thành chữ phụ. Ngoại lệ: card
   số liệu, nơi con số chính là cả khối (`components/charts.md`).
2. **Nhịp theo nhóm: trong nhóm gần, giữa nhóm xa.** Gom chữ thành nhóm theo nghĩa (giá +
   tên; diện tích · khu vực · mốc gần; thời gian đăng). Dòng trong một nhóm cách **4px
   (`gap-1`)**, không `gap-0.5`: 2px thì hai dòng dính nhau, nhất là dòng có dấu tiếng Việt
   (chủ dự án chốt). Giữa các nhóm 8–12px, khoảng từ chữ tới mép khối không nhỏ
   hơn khoảng giữa nhóm. Mọi dòng cách đều nhau là không có nhóm, mắt đọc thành một cục chữ.
3. **Tên để nhận ra mục không cắt cụt.** Khối lặp mà mỗi mục là một khối riêng (card trong
   lưới) thì tên `line-clamp-2`; `truncate` một dòng chỉ cho danh sách dày (dòng bảng,
   sidebar, `T14`). Tên cắt sau hai mươi mấy ký tự ("Cho thuê phòng trọ khép kín …") là
   mất đúng thứ người dùng đọc để chọn (`N8`).

Chủ dự án chốt: đừng viết thêm mẫu cho từng kiểu, viết phép thử chung.

*Phép thử:* probe mục "KHỐI LẶP" (card có ảnh: chữ to nhất so với tên, khoảng giữa các dòng,
tên cắt một dòng). Khối không ảnh thì tự soi ba câu trên bằng ảnh chụp.

---

## Dựng một thứ chưa có mẫu

Stepper dọc, dòng thời gian, cây thư mục, bình luận lồng nhau… không có file
trong `components/` thì:

1. **Tìm thứ gần nhất đã có mẫu và mượn khuôn** (`N5`). Stepper dọc mượn vòng,
   đường nối và bốn trạng thái của thanh các bước (`layouts/form.md`); bình luận
   lồng nhau mượn dòng danh sách (`components/list-row.md`); cây thư mục mượn link
   sidebar có menu con (`layouts/app.md`); khung chat mượn cây thư mục, nút viền và
   "Lỗi tải" (`components/chat.md`).
   **Chỉ mượn từ file trong skill**, không mượn từ bản dựng chưa duyệt trong dự án.
   Khuôn lấy từ file thì dự án sau vẫn có, và lỗi không nhân đôi.
   **Mượn khuôn, không mượn nội dung.** Khung mới làm việc khác thì chọn lại nội dung
   theo việc của nó: trang chi tiết mượn hàng tên, ô số của panel xem nhanh, nhưng bộ
   tab phải có bản ghi con chính (trang khách chép nguyên tab
   Tin nhắn / Tệp / Hoạt động của panel thì 24 đơn không có chỗ xem, `layouts/app.md`).
2. **Dựng luôn các ca biên vào trang**, không chỉ ca đẹp (`N2`, `S8`). Khối lặp (card,
   dòng, ô) thì mỗi bản sao một ca: tên một dòng và tên rất dài, số `0` và số rất lớn,
   thiếu ảnh, thiếu mô tả, một mục và nhiều mục. Không lặp được (một form, một panel)
   thì mỗi trạng thái một ví dụ tĩnh cạnh nhau.
3. **Chạy probe và tự sửa** như cổng 3 (`checklist.md`): `--sweep`, sửa tới khi danh
   sách `P` trống, tối đa ba vòng.
4. **Soi bằng mắt năm câu mà máy không đo được** ⚑. Mở ảnh 375px và một ảnh desktop,
   nhìn đúng các ca biên vừa dựng:
   - **Ca biên có trông cố ý không?** Số đếm bằng `0` ("0 ảnh", "0 bình luận") thì ẩn,
     hoặc nói bằng chữ ("Chưa có ảnh"). Ảnh thiếu thì là trạng thái "chưa có ảnh", không
     để badge đếm nằm trên ảnh giữ chỗ. Mô tả thiếu thì khối co lại, không để dòng trống.
   - **Có khoảng trống nào chỉ để giữ chỗ không?** Giữ chỗ được khi nó làm thứ quan
     trọng thẳng hàng trong lưới (giá, nút ở cùng độ cao giữa các card). Khi đó nói một
     dòng lúc giao. Không làm được việc đó thì bỏ.
   - **Các bản sao của khối lặp có cùng một cách viết không?** Cùng kiểu số và đơn vị
     trong một danh sách ("4,5 triệu" với "0,85 triệu", không lẫn "850.000 đ"), cùng
     thứ tự các dòng, cùng nhãn (`N5`).
   - **Một vùng có bị đè quá nhiều thứ không?** Trên ảnh, trên header, trong một góc:
     quá ba thứ chồng lên nhau thì gom hay dời bớt ra khỏi vùng đó (`N3`).
   - **Thứ cần để quyết định còn nguyên ở ca dài nhất không?** Tên dài nhất, giá lớn
     nhất, ở 375px (`N8`).

   Câu nào ra "không" thì sửa, rồi quay lại bước 3.
5. **Chạy mười hai phép thử** ở trên trước khi báo xong.
6. Lúc giao nói một dòng: *"X chưa có mẫu đã duyệt, mình mượn khuôn của Y"*, cộng mỗi
   lựa chọn đánh đổi một dòng (vd *"tên giữ chỗ hai dòng để giá thẳng hàng giữa các
   card"*).

Luồng này dùng cho cả dựng mới lẫn chế độ dựng lại của nhánh `V` (`review.md`). Phần tử
lạ không có trong skill là chuyện thường, nên không cần mẫu cho mọi thứ: mượn khuôn gần
nhất, dựng cả ca biên, để máy đo, rồi mắt soi năm câu trên.
