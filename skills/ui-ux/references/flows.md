# Luồng người dùng — luật O

Skill dựng và soi **từng màn**. Luồng là chuỗi màn người dùng đi qua để xong một việc:
đăng ký rồi làm được việc đầu tiên, tạo đơn rồi thanh toán, mời đồng đội rồi người đó vào được.
Lỗi luồng không nằm trên màn nào: từng màn đúng luật mà người dùng vẫn lạc, vì màn trước hứa
một đằng màn sau nói một nẻo, hay xong việc rồi không biết đã xong chưa.

Mở file này khi:

- **Đề soi một luồng** ("soi luồng onboarding", "xem giúp luồng đăng ký", "người mới vào có bị
  lạc không", "check the onboarding flow", "walk through the signup flow"): lối soi luồng ở
  cuối file. Bảng câu 1 của `SKILL.md` đưa tới đây.
- **Nhánh `U` dựng sản phẩm mới, hoặc từ hai màn trở lên nằm trên cùng một luồng** (kể cả đề
  "dựng luồng onboarding"): `U2` thêm dòng Luồng và bản nháp sơ đồ luồng màn `O7`
  (`design-process.md`), `U4` dựng đủ trạng thái chuyển tiếp theo `O1`–`O6` rồi giao sơ đồ.

**Skill lo hình, người dùng lo logic** (`N10`). Luồng có hai nửa: người dùng **thấy** gì ở mỗi
bước (màn rỗng nói gì, nút nào nổi, "đã lưu" hiện ở đâu, tên gọi có giữ không) là việc của skill.
Bấm xong **đi đâu**, dữ liệu có giữ lại không, gọi API nào là logic: skill không tự sửa, chỉ ghi
gợi ý một dòng.

Onboarding là luồng hay hỏng nhất, nên các luật dưới bắt đầu từ nó.

### Onboarding là hai thứ khác nhau ⚑

| | Loại 1: hướng dẫn **trong** app | Loại 2: chuỗi màn **vào lần đầu** |
| --- | --- | --- |
| Là gì | Người dùng đã ở trong app (dashboard, danh sách); app chỉ chỗ bắt đầu | Các màn riêng chạy một lần, **trước** khi vào app: xin quyền, đồng ý điều khoản, hỏi tên, mục tiêu, sở thích để cá nhân hoá |
| Hay gặp ở | App web, SaaS, dashboard | App mobile, app cá nhân hoá (học, sức khoẻ, tài chính, nội dung) |
| Dựng bằng | Khung **Các bước bắt đầu**, màn rỗng lần đầu, gợi ý tại chỗ (`O1`–`O3`, `layouts/app/dashboard.md`) | Chuỗi màn một câu hỏi một màn (`O8`) |
| Kết thúc khi | Xong hay ẩn khung các bước | Màn cuối dẫn thẳng vào việc chính đầu tiên |

Hai loại **nối nhau**: loại 2 xong thì người dùng rơi vào app, và loại 1 tiếp quản. Đề "dựng
onboarding" không nói loại nào thì `U1` tự chọn theo nền tảng và ghi một dòng trong brief để
người dùng sửa ở cổng 1, không thêm cổng hỏi: app mobile hoặc sản phẩm có cá nhân hoá thì dựng
loại 2 rồi loại 1, **trừ app mua bán, đặt món, đặt lịch**: vào thẳng app, chỉ hỏi đăng nhập lúc cần biết ai đặt
(`J12`), nên không có chuỗi màn vào lần đầu, kể cả khi đề gọi là "onboarding" (khi đó là chọn cách nhận, nơi nhận,
xin vị trí đúng lúc); app web làm việc (SaaS, quản lý) thì đăng ký gọn rồi dựng loại 1. Đề nói "xin
quyền", "hỏi sở thích", "màn chào", "welcome screens" là loại 2. Đề nói "checklist", "hướng dẫn
trong app", "người mới vào dashboard" là loại 1.

---

## O1. Người mới vào lần đầu thấy đúng một việc tiếp theo ⚑

Màn đầu tiên sau đăng ký là dashboard **chưa có dữ liệu**. Dựng nó như dashboard có số thì ra
năm ô số `0`, biểu đồ phẳng, bảng "Chưa có dữ liệu": người mới không biết bấm vào đâu.

- Workspace mới thì khung **Các bước bắt đầu** thay cả lưới, hay một khối chào có một nút
  `primary` dẫn tới việc chính đầu tiên (`layouts/app/dashboard.md`, mục Các bước bắt đầu). Không dựng
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
- Không dựng tour nhiều slide **giới thiệu tính năng** trước khi cho dùng. Hướng dẫn nằm **tại
  chỗ**: khung các bước bắt đầu, câu trong màn rỗng, gợi ý cạnh ô nhập. Chuỗi màn **hỏi** để cá
  nhân hoá (loại 2) thì khác: được dựng, theo `O8`, vì câu trả lời đổi thứ người dùng thấy đầu tiên.
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

## O7. Sơ đồ luồng màn: nút nào dẫn tới màn nào ⚑

Từng màn dựng đúng mà người nối logic không biết màn A bấm nút nào thì sang màn B, bỏ qua thì
về đâu, lỗi thì ở lại hay lui. Họ tự đoán, và luồng trên code lệch luồng đã duyệt. Sơ đồ luồng
màn là bản giao cho người phát triển: **skill vẽ đường đi, người dùng nối** (`N10`).

**Khi nào ra:** dựng từ hai màn trở lên trên cùng một luồng (nhánh `U`), hay đề "dựng luồng
onboarding". Bản nháp đi cùng `U2` ở **cổng 1**, không thêm cổng. Sửa theo bản đã dựng rồi
giao kèm ở `U4` và ghi vào `DESIGN.md` mục Luồng (`system.md`, `D10`). Lối dựng luôn thì không
gửi bản nháp, chỉ giao bản cuối.

**Dạng:** một dòng đường chính, rồi bảng, mỗi dòng là một lần chuyển màn:

> Đường chính (onboarding): Đăng ký → Tạo workspace → Dashboard lần đầu → Tạo khoá học → Khoá học vừa tạo. 4 màn, 6 ô.

| # | Từ màn (route) | Người dùng làm gì | Tới | Loại |
| --- | --- | --- | --- | --- |
| 1 | Đăng ký `/signup` | Bấm "Tạo tài khoản" | Tạo workspace `/onboarding` | Chính |
| 2 | Tạo workspace `/onboarding` | Bấm "Bỏ qua" ở ô Mời đồng đội | Dashboard lần đầu `/` | Bỏ qua (`O5`) |
| 3 | Tạo workspace `/onboarding` | Tên đã có người dùng | Ở lại, lỗi dưới ô, giữ chữ đã nhập | Lỗi (`O6`) |
| 4 | Dashboard lần đầu `/` | Bấm "Tạo khoá học đầu tiên" | Tạo khoá học `/courses/new` | Chính |
| 5 | Tạo khoá học `/courses/new` | Bấm "Tạo khoá học" | Chi tiết khoá học, toast "Đã tạo khoá học" | Chính, vừa xong (`O3`) |
| 6 | Đăng nhập `/login` | Người cũ đăng nhập | Dashboard có dữ liệu `/` | Lần sau |

- **Nhãn chép đúng chữ trên nút** (`O4`): bảng ghi "Tạo khoá học" thì nút ghi đúng vậy.
- Route lấy từ code. Chưa có route thì ghi route sẽ dùng kèm *(đề xuất)*.
- Loại có năm giá trị: **Chính**, **Bỏ qua**, **Quay lại**, **Lỗi**, **Lần sau**. Mọi bước
  tuỳ chọn có một dòng Bỏ qua, mọi bước hỏng được có một dòng Lỗi, và có một dòng cho người cũ
  quay lại: lần sau họ vào thẳng đâu, không đi lại onboarding.
- **Phép thử:** mọi nút `primary` và mọi nút Bỏ qua trên các màn của luồng có đúng một dòng.
  Nút có trên màn mà không có dòng thì sơ đồ thiếu. Dòng có mà không màn nào có nút đó thì
  bản dựng thiếu.

**Lúc giao:** link điều hướng thuần tới route đã có (không lưu, không gọi gì) thì skill đặt
`href` theo sơ đồ. Chuyển màn sau một hành động (lưu, gửi, thanh toán, chọn bỏ qua) là logic:
để handler rỗng, mục **Cần bạn nối** trong tin giao ghi số dòng sơ đồ (*"Nối dòng 1, 2, 5:
lưu xong thì chuyển màn"*).

**Không:** vẽ hành trình cảm xúc, persona, tỉ lệ bỏ ngang; thêm màn ngoài `U2` cho sơ đồ "đủ
bộ"; xuất ảnh hay file thiết kế riêng. Sơ đồ là chữ, nằm trong tin giao và `DESIGN.md`.

## O8. Chuỗi màn vào lần đầu (onboarding loại 2) ⚑

Quy ước số đông của app mobile: một câu hỏi một màn, thanh tiến độ, câu không bắt buộc thì bỏ qua
được, quyền hệ thống xin qua một màn mồi chứ không bật hộp hệ thống ngay khi mở app.

**Chọn câu hỏi trước khi vẽ.** Mỗi màn phải đổi được thứ người dùng thấy ở màn đầu tiên trong app
(mục tiêu đổi lộ trình, trình độ đổi bài đầu, sở thích đổi bảng tin). Câu không đổi gì (nghề, quy
mô công ty, "bạn biết tới app qua đâu") thì bỏ, hoặc dời vào cài đặt. Đếm màn theo `O2`, thường
3–7 màn. Dài hơn thì `U2` ghi lý do.

**Khung mỗi màn** (mobile toàn màn, có safe-area; web là một card `max-w-md` giữa trang, không form
rộng hết màn):

- **Đầu màn**: nút lui `←` bên trái từ màn 2, thanh tiến độ mảnh ở giữa, **Bỏ qua** bên phải chỉ
  trên câu không bắt buộc (`O5`). Thanh tiến độ cùng một kiểu suốt chuỗi (`O4`).
- **Câu hỏi** là tiêu đề lớn của màn (`text-2xl font-semibold`), dưới là một dòng `text-muted` nói
  vì sao hỏi ("Để chọn bài vừa sức bạn"). Không chêm thêm ảnh minh hoạ cho có.
- **Lựa chọn**: chọn một thì mỗi lựa chọn là một hàng bấm được cả hàng, chọn rồi viền và nền
  `primary-light`. Chọn nhiều thì chip hay card có dấu tick, câu dưới tiêu đề nói "Chọn một hay
  nhiều". Lựa chọn có icon thì icon cùng một bộ, cùng cỡ.
- **Ô nhập** (tên): một ô, tự focus, bàn phím bật sẵn. Nút Tiếp nằm ngay trên bàn phím, không bị
  bàn phím che.
- **Nút Tiếp** `primary` rộng hết bề ngang, **ghim đáy ở cùng một chỗ trên mọi màn**. Chưa chọn thì
  nút mờ (quy ước số đông ở màn hỏi), chọn xong sáng lên.
- **Thông tin riêng tư** (giới tính, tuổi, cân nặng, thu nhập): chỉ hỏi khi app dùng nó để làm gì
  đó cụ thể, dòng vì sao nói rõ dùng để làm gì. Luôn có lựa chọn "Không muốn nói" hoặc Bỏ qua. Giới
  tính có thêm lựa chọn "Khác".
- **Điều khoản**: không chiếm một màn với ô tick dài. Đặt một dòng `text-xs` dưới nút tạo tài
  khoản, kiểu "Tiếp tục là bạn đồng ý với Điều khoản và Chính sách", hai chữ đó là link. Ô tick
  riêng chỉ khi phải xin đồng ý riêng (nhận email quảng cáo, xác nhận đủ tuổi), và ô đó bỏ trống
  sẵn.
- **Xin quyền** (thông báo, vị trí, camera): một **màn mồi** trước hộp hệ thống, minh hoạ đúng cái
  người dùng sẽ nhận (một thông báo mẫu "Tới giờ học 15 phút rồi"), nút `primary` và nút ghost "Để
  sau"; chữ trên nút chính theo `J12` ở app điện thoại ("Tiếp tục": hộp hệ thống mới là chỗ cho
  phép). Chỉ nút chính mới gọi hộp hệ thống (logic, ghi gợi ý). Đặt ở **cuối chuỗi**
  hay lúc cần tới quyền đó, không đặt ở màn đầu. Quyền chưa cần ngay thì không xin trong chuỗi.
- **Màn cuối** nói kết quả của các câu trả lời ("Lộ trình 15 phút mỗi ngày, bắt đầu từ bài 1") và
  một nút đi thẳng vào **việc chính đầu tiên**. Không đưa người dùng vào một dashboard rỗng.
- **Slide giới thiệu tính năng** trước khi đăng ký: tránh (`O2`). Người dùng vẫn xin thì tối đa ba
  slide, có Bỏ qua ngay từ slide đầu.

Bấm Tiếp có lưu ngay không, quay lại có giữ lựa chọn không, câu nào bắt buộc: logic, ghi gợi ý
(`N10`). Mỗi màn của chuỗi là một dòng trong sơ đồ `O7`, mỗi nút Bỏ qua và Để sau cũng là một dòng.
Trang `/states` có đủ: chưa chọn, đã chọn, đã chọn nhiều, ô tên có bàn phím, màn xin quyền,
màn cuối.

---

## Lối soi luồng ⚑

Đề nhờ soi một luồng thì làm như nhánh `V` (`review.md`): **soi thì không hỏi, sửa thì hỏi**,
bảng có hạng, người dùng chọn dòng rồi mới sửa. Khác ở chỗ đơn vị là **bước**, không phải màn.

1. **Xác định luồng.** Tên luồng, bước đầu, bước cuối là việc chính. Đọc route, link, nút trong
   code để liệt kê các màn theo thứ tự. Đề không nói luồng nào thì soi onboarding: từ màn đăng
   ký tới việc chính đầu tiên. Ghi các màn thành sơ đồ hiện tại theo `O7` để bảng lỗi trỏ vào
   dòng. Nút dẫn sai chỗ hay dẫn vào ngõ cụt cũng là một dòng lỗi.
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
