# App điện thoại — Bộ mặt app điện thoại — chín bộ có tên

Một mục của luật `J`. Luật nền `J1`–`J8` và bảng các mục ở `mobile.md`, mở file đó trước.

## J15. Bộ mặt app điện thoại — chín bộ có tên

Lý do giống `P13`: khung app điện thoại chỗ nào cũng như nhau (thanh tab, đầu màn, danh sách, sheet), nên ba app khác
ngành dựng cùng một gu thì ra cùng một mặt. Thứ làm hai app khác nhau là **bộ mặt**: nền, màu nhấn dùng tới đâu,
ảnh to hay chữ là chính, font, hình khối. Bộ mặt không đổi luồng, không đổi màn, không đổi chỗ đặt nút (`J1`–`J14`
vẫn áp nguyên).

⚑ Rút từ khoảng 300 màn của 10 app phổ biến ở 10 loại (đặt phòng, lưu ảnh ý tưởng, mạng xã hội chữ, bản tin, học
ngôn ngữ, thiền và ngủ, sách tóm tắt, hẹn hò, đi bộ đường dài, việc cần làm). Sáu bộ đầu là
các kiểu lặp lại ở nhiều app, không chép mặt riêng của app nào. Glow và Tinted thêm sau, cho bản mẫu cần gây ấn tượng
lúc trình bày (app AI, sáng tạo; sức khoẻ, ăn uống, phong cách sống). Brand thêm sau cùng ⚑, cho app dịch vụ của một
thương hiệu mà người dùng mở ra để gọi, đặt, trả tiền ngay: dựng bằng Clean thì đúng mà xám, không ai muốn bấm đặt.

| Bộ mặt | Nền, bề mặt | Màu nhấn tới đâu | Chữ, font | Hình khối | Hợp khi người dùng là |
| --- | --- | --- | --- | --- | --- |
| **Clean** | Trắng; màn danh sách nhóm nền xám, thẻ trắng (`J1`) | Nút chính, mục đang chọn, icon danh mục trong vòng nhạt (`J8`) | Inter | Bo 12–16, thẻ số chính nền tối (`J5`) | Người ghi chép, quản lý, theo dõi số mỗi ngày: chi tiêu, việc cần làm, kho, đặt lịch (`J14`). Code mẫu `mobile-app.html` |
| **Mono** ⚑ | Trắng tinh, ngăn bằng đường kẻ, gần như không thẻ | Không có màu nhấn: nút chính đen bo tròn hết, màu duy nhất trên màn là ảnh và avatar người dùng đăng | Inter, tên người đậm 15, nội dung 15–16 | Nút viên thuốc đen hay viền, icon nét mảnh, dòng nội dung chạy hết bề ngang | Người đọc và đăng nội dung của người khác: mạng xã hội, cộng đồng, bình luận, nhắn tin nhóm |
| **Photo** | Trắng, ảnh thật là chủ thể | **Chỉ nút chính** của luồng (Đặt, Mua, Lưu); việc phụ là nút đen hay viền | Inter, tên mục 15–16 đậm dưới ảnh | Ảnh bo 12–16 tỉ lệ 4:3 hay 1:1, chữ nằm dưới ảnh không bọc thẻ; lưới 2 cột so le khi lướt ý tưởng | Người lướt để chọn bằng mắt: đặt phòng, du lịch, bất động sản, món ăn, thời trang, nội thất, đường đi. Code mẫu `mobile-photo.html` |
| **Playful** | Trắng, phản hồi tô cả dải đáy | Một màu thương hiệu bão hoà cho nút chính và thanh tiến độ; thêm tối đa hai màu **có nghĩa** (đúng, sai, chuỗi ngày) | Nunito 700–800, nút chữ đậm | Thẻ chọn viền 2px có viền đáy 4px (trông bấm được), bo 16; nút tròn, ô vuông, lục giác không gờ; đồ vật 3D ở bộ đếm, lộ trình, huy hiệu (`J16`); thanh tiến độ cao 12–16 bo tròn; nhân vật đổi cử chỉ theo đúng sai (`J16`) | Người cần động lực quay lại mỗi ngày: học, thói quen, thể dục cho người dùng phổ thông, trẻ. Code mẫu `mobile-playful.html` |
| **Immersive** | Nền tối có sắc (xanh đêm, tím than) cả app, chuyển dọc nhẹ hai tông gần nhau | Nút chính trắng chữ tối, không màu nhấn rực | Inter, tiêu đề lớn trắng, chữ phụ trắng 72% | Ảnh lớn bo 12–16 làm điểm nhìn, thẻ là lớp trắng 8–10% trên nền | Người dùng để thư giãn, nghe, xem, thường buổi tối: thiền, ngủ, nhạc, podcast, sách nói, video. Code mẫu `mobile-immersive.html` |
| **Editorial** ⚑ | Trắng hay kem ấm `#fbf8f3`, gần như không thẻ | Một sắc nhỏ cho link, nút theo dõi; nút chính đen hay màu đó | Tiêu đề bài và thân bài **Lora** (serif), thân 18/1.6; khung app (tab, nút, nhãn) vẫn Inter | Dòng bài: chữ trái, ảnh vuông 64 phải; trang đọc lề 20, không khung | Người **đọc** dài: bản tin, báo, sách, khoá học dạng đọc, công thức nấu ăn |
| **Glow** | Gần đen `#0b0b0f` cả app, hai ba **quầng màu mờ** lớn (màu nhấn và một sắc kề) ở đầu màn và sau khối chính | Nút chính màu nhấn rực **chữ tối**, mic, nút gửi; quầng màu là chỗ màu nhiều nhất | Inter (lối trình diễn: font hình học của `J18`), tiêu đề màn 32–36 `tracking-tight`, chữ phụ trắng 65% | Thẻ trắng 8% viền trắng 10%, bo 20–24, **không blur** (kính chỉ cho lớp cố định: thanh tab, ô soạn, thanh trên); thanh tab `glass` (`J2`) | Người dùng app AI, sáng tạo, âm nhạc, đầu tư trẻ, học kỹ năng sáng tạo: cần cảm giác mới, năng lượng |
| **Tinted** | **Cả app một màu nền nhạt** pha từ màu nhấn (tím nhạt, kem đào, bạc hà) thay trắng và xám; thẻ trắng nổi trên nền màu | Nút chính đen hay màu nhấn đậm; khối nhấn đầu màn là cùng sắc đậm hơn | Inter hay font tròn hơn, số lớn đậm | Bo 20–28, thẻ trắng không viền, bóng rất nhẹ; thanh tab `dark` hay `pill` (`J2`); hợp vòng và cung (`J17`), đồ vật 3D cho món, danh mục (`J16`) | Người tự chăm mình mỗi ngày mà không cần gamification: ăn uống, kcal, sức khoẻ, chi tiêu cá nhân nhẹ nhàng, du lịch, phong cách sống |
| **Brand** ⚑ | Trắng; **màn gốc có khối đầu màn tô đặc `--primary`** chứa thanh trên, ô tìm trắng và một dòng ưu đãi; màn con trắng trơn | Màu brand ở **mọi chỗ có trạng thái**: nút chính đặc, nút phụ nền nhạt cùng sắc, thẻ và tab đang chọn, ô đang nhập, icon đầu dòng, đường đi trên bản đồ. Thêm một sắc ấm nhạt chỉ cho dải ưu đãi | Tiêu đề mục 20–22 đậm 800 font hình học (Plus Jakarta Sans, `J18`: thêm `word-spacing`, không khép chữ), thân Inter | Bo 16–24; dịch vụ, loại xe, lời khen là **đồ vật 3D** (`J16`), không icon nét trong vòng xám; nút bo tròn hết cao 52–56 | Người mở app để mua ngay một dịch vụ: gọi xe, giao hàng, giao đồ ăn nhiều quán, vé xe, vé xem phim, siêu app |

**Token đổi theo bộ** (khối đổi thương hiệu của `mobile-app.html`, tương phản đã đo):

| Bộ | Đổi gì |
| --- | --- |
| Mono | `--primary: #111111`; nền màn trắng cả màn danh sách nhóm (nhóm tách bằng tiêu đề và đường kẻ `--border-strong`); bỏ thẻ số chính nền tối, số chính chỉ là chữ lớn |
| Photo | `--primary` lấy trong bảng màu theo ngành của `brand-tokens.md` (không đỏ, không hồng: lẫn với nút xoá đỏ, `I4`); màu nhấn chỉ ở nút **cam kết** của luồng (Tìm, Đặt, Thanh toán, Mua; ở app đặt món: Thêm vào giỏ trong sheet món, thanh giỏ hàng `J11`, Đặt hàng, Thử lại thanh toán, Đổi điểm). Nút chính khác (Tiếp ở bước chọn, Áp dụng lọc, Xem chuyến đi) là nút đen `bg-foreground text-surface`; trạng thái đang chọn (ngày, chip lọc, card chọn, công tắc, tim đã lưu) và nút "+" thêm nhanh ở dòng món tô `--foreground`; thanh tiến độ trong thẻ thành viên (`J5`) trắng |
| Playful | `--app-font: "Nunito"`; `--primary` đậm đủ cho chữ trắng: xanh lá `#2f7d00` 5.18:1. **Xanh lá rực `#58cc02` chữ trắng chỉ 2.09:1**: muốn màu rực thì nút rực chữ tối, hay chữ trắng trên nền đậm. Dải đúng `#d7ffb8` chữ `#2f7d00` (4.66:1), dải sai `--danger-bg` chữ `--danger` |
| Immersive | Cả khung mang `force-dark` (`M33`), chép khối `.force-dark` của `tokens.css` rồi đè các token sau. **Nền là màu nhấn của ngành hay brand pha tối**: `--background` = 30% `--primary` trên `#0b0d18` (`color-mix(in oklab, var(--primary) 30%, #0b0d18)`: Chàm ra `#1f1e56`, Cam ra `#421d14`, Xanh ngọc ra `#0c2c32`), chuyển dọc xuống tông tối hơn 15%; không dùng một màu navy cho mọi app. `--surface` trắng 10% trên nền (chữ trắng từ 10.9:1), sheet và hộp hỏi trắng 14%; `--muted` trắng 72% (từ 8.3:1 trên nền, 6.5:1 trên thẻ); `--danger: #ff9aab` (từ 5.4:1 trên thẻ; `#ff637e` của `.force-dark` chỉ 3.9:1), `--success: #5fd99a`; nút chính `bg-white` chữ màu nền |
| Editorial | Nạp thêm Lora 400, 700 (có bộ `vietnamese`, đã kiểm); `--background: #fbf8f3`, `--muted: #6b6459` (5.5:1 trên kem), sắc nhấn cam `#c2410c` (4.9:1 trên kem) |
| Glow | Cả khung `force-dark` như Immersive. `--background: #0b0b0f`; quầng: `radial-gradient` 2–3 lớp từ `--primary` và một sắc cách nó 60–150° (như `J18`; cam với hồng tím, tím với xanh ngọc), độ phủ 45–60%, nằm ở đỉnh màn và sau khối chính, không sau chữ nhỏ; `--surface` trắng 8%, viền trắng 10%, không `backdrop-blur` trên thẻ trong vùng cuộn; `--muted` trắng 65% (từ 6.6:1 trên thẻ). Ngành AI, sáng tạo chưa có dòng đo thật trong `brand-tokens.md`: tạm dùng cam `#f97316` hay tím `#a78bfa` và báo một dòng lúc giao. `--primary` rực thì **chữ trên nút là `#111`** (6.7:1, 6.9:1); chữ trắng trên cam rực chỉ 2.8:1. Chữ, link màu nhấn trên nền tối là bản sáng hơn của nó (cam `#ffa45c`, tím `#c4b5fd`, từ 4.5:1 trên thẻ). Bong bóng tin nhắn của người dùng được tô màu nhấn chữ tối (đè `components/chat.md` "không màu nhấn", chỉ trong Glow) |
| Tinted | Nền theo màu nhấn: `--background` = `color-mix(in oklab, var(--primary) 10%, #f6f3ee)` (tím ra tím nhạt `#eae1ee`, cam ra kem đào, xanh lá ra bạc hà, xanh dương ra xám xanh); muốn kem trung tính thì pha từ một `--tint` riêng thay `--primary`. `--surface: #fff`. Chữ phụ cùng sắc: `--muted` = `color-mix(in oklab, var(--primary) 15%, #4a4640)` (~7:1 trên nền, ~8.9:1 trên trắng); `--secondary` (rãnh điều khiển phân đoạn, nút phụ, ô nhập) = `color-mix(in oklab, var(--primary) 6%, #efeef1)`: xám nhạt ngả theo màu nhấn, nhẹ cả trên nền màu lẫn trên sheet trắng; xám `#e7e8ec` của `J4` lệch tông trên nền màu, còn pha từ nền màn thì trên sheet trắng thành một dải tím xám nặng. Khối nhấn (thẻ số chính, đầu màn có biểu đồ) = 30–35% `--primary` pha kem, **chữ tối** `--foreground`; chữ phụ trên khối `--hero-muted` = `color-mix(in oklab, var(--primary) 18%, #2c2c2c)` (~6.6:1); rãnh vòng và cung trên khối trắng 55% (`--hero-track`). Chữ trắng trên khối nhạt chỉ 1.6:1. Nút chính màu nhấn khi chữ trắng trên nó từ 4.5:1, không thì đen. Đè thẻ số chính `#1c1c1e` của `J5` |
| Brand | `--primary` theo dòng ngành ở `brand-tokens.md` (gọi xe, giao hàng: Xanh lá `#15803d`, chữ trắng 5.02:1), dự án có màu brand thì dùng màu đó, đo chữ trắng từ 4.5:1 (màu brand rực như xanh lá `#00b14f` chỉ 2.84:1: khối đầu màn và nút lấy bản đậm hơn cùng sắc, giữ bản rực cho đồ hoạ). Thêm `--primary-soft` = `color-mix(in oklab, var(--primary) 10%, #fff)` (nền nút phụ, thẻ và tab đang chọn, quầng ô đang nhập) và `--primary-strong` = `color-mix(in oklab, var(--primary) 80%, #000)` (chữ, icon trên nền soft, icon đầu dòng; từ 6:1). Khối đầu màn: nền `--primary`, chữ trắng, giờ và pin trắng; mép dưới bo `0 0 50% 50% / 0 0 28px 28px` hay cong nhẹ, không đổ bóng. Sắc ưu đãi: nền `#fff4e8` viền `#fbd9b5`, chữ `--foreground`. Sao đánh giá vàng `#fbbf24` (`J8`) |

**Chọn bộ nào.** Bộ mặt bám **người dùng và việc chính** ở `U1`, `U2`, không bám ngành: app spa mà người mở là kế toán
đối soát thì Clean, không phải Photo. Người dùng nêu tên một bộ (kể cả bộ còn cờ) thì dựng bộ đó, không hỏi lại (`P1`).
Skill **tự khuyên một bộ** trong bốn bộ đã qua test (Clean, Photo, Playful, Immersive; ngoại lệ Brand ở câu 2), không hỏi, theo câu đầu tiên
khớp:

1. Người dùng lướt và chọn bằng ảnh (đặt phòng, đặt món ở một quán, mua sắm, nội thất) → **Photo**.
2. Người dùng cuối mở app của một thương hiệu để mua ngay một dịch vụ (gọi xe, giao hàng, giao đồ ăn nhiều quán, vé, siêu
   app) → **Brand** ⚑. Đây là ngoại lệ duy nhất của luật "chỉ tự khuyên bộ đã qua test": app loại này dựng bằng Clean
   ra một màn xám chỉ có nút màu, khác hẳn mọi app thật cùng loại. Báo một dòng lúc giao rằng bộ còn cờ.
3. Người dùng nghe, xem, thư giãn, thường buổi tối (thiền, ngủ, sách nói, nhạc, video) → **Immersive**.
4. Một người tự làm việc của mình mỗi ngày và cần động lực quay lại (học, thói quen, thể dục) → **Playful**.
5. Còn lại, nhất là ghi chép, quản lý, tài chính, app cho cửa hàng hay công ty → **Clean**.

Tinted, Glow đã qua test: tự khuyên ở lối trình diễn (`J18`), Tinted cho app một người tự chăm mình, Glow cho AI, sáng tạo,
âm nhạc; đề thường vẫn theo bốn câu trên, hợp rõ thì báo một dòng. Mono, Editorial còn cờ ⚑ (chưa qua test): không tự khuyên; đề hợp rõ thì báo một dòng lúc giao. Mẫu dòng báo, nói bằng
người dùng: *"Bộ mặt: **Playful** (nút đậm, thẻ bấm được, phản hồi tô cả dải đáy) vì người học cần quay lại mỗi ngày.
Muốn kiểu khác thì nói: Clean, Photo, Immersive, Mono, Editorial, Glow, Tinted, Brand."* Wireframe app điện thoại có nhóm Kiểu liệt kê chín bộ
(`wireframe.md`, `U3`), mặc định là bộ khuyên dùng. Bộ nào qua test thì gỡ cờ ⚑ ở bảng trên.

**Ghi lại bộ đã chọn** như `P13`: dòng Bộ mặt trong `DESIGN.md` và comment `/* Bộ mặt: Playful (J15) */` trên khối
font, để màn sau theo đúng bộ đó, không khuyên lại.

**Được đè, chỉ trong bộ đó:**
- Playful đè dòng "nhiều màu nhấn trên một màn" của `J8`: thêm tối đa hai màu, mỗi màu một nghĩa cố định. Nhân vật
  (`J16`) có mặt ở mọi khoảnh khắc phản hồi và ở bài tập (người nói câu mẫu), không chỉ màn chào và rỗng.
- Immersive đè nền trắng của `J1` và dòng "gradient" của `J8` cho **nền**: chuyển dọc hai tông gần nhau. Nút vẫn
  không gradient. Đè thẻ số chính nền `#1c1c1e` của `J5`: thẻ là lớp trắng 10% như mọi thẻ. Đè ô hôm nay tô đặc
  `--primary` của dải ngày (`J8`): ô hôm nay nền trắng 14% viền trắng 2px, vì trắng đặc thành khối sáng nhất màn, nặng
  hơn cả nút chính. Thanh tab: mục đang chọn có viên nền trắng 12% sau icon, vì trắng 100% với trắng 72% trên nền tối
  gần như không phân biệt được (`J2`).
- Mono đè thẻ số chính nền tối của `J5`.
- Brand đè dòng "dải đầu màn tô màu nhấn" của `J8` (chỉ màn gốc), "nhiều màu nhấn" (thêm đúng một sắc ấm nhạt cho ưu đãi),
  "minh hoạ 3D ở màn làm việc" (đồ vật 3D cho dịch vụ, loại xe, lời khen, không nhân vật chiếm nửa màn), nền trắng của
  `J1` ở khối đầu màn, và tile xám của `J19` (bản đồ màu nhạt).
- Photo đè "ngày đang chọn tô `primary`" của `components/choice-controls.md` và "công tắc bật là `--primary`" của `J4`:
  đang chọn tô `--foreground`, để màu nhấn chỉ còn ở nút cam kết.

**Không đè:** `J2` thanh tab có chữ (trừ các kiểu chỉ icon có tên của `J2`), `J4` chỗ bấm 44px, chữ tối thiểu 11px, tương phản 4.5:1, một hành động chính
mỗi màn.

**Bẫy**
- **Mono, Photo hay thấy thanh tab chỉ icon** trong app mẫu (app quen thuộc, người dùng đã thuộc icon). App mới giữ chữ,
  trừ khi chọn kiểu chỉ icon của `J2` và icon đủ quen.
- **Photo không có ảnh thật thì đừng chọn.** Cả app toàn ô xám thay ảnh trông như app hỏng; dữ liệu giả dùng ảnh thật
  có quyền dùng, không vẽ minh hoạ thay ảnh. Một mục thiếu ảnh để thử ca biên (`S16`) thì vẫn có: khung nền
  `--background`, icon và chữ "Chưa có ảnh", không phải ô xám trơn.
- **Chữ đè lên ảnh (thẻ nổi bật, ảnh đầu màn) cần lớp tối riêng dưới chữ**, không trông vào phần tối của ảnh: đổi ảnh khác
  (trời sáng, cát trắng) là chữ trắng tan. Một `span` `absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/85
  via-black/45 to-transparent` nằm giữa ảnh và chữ; dòng nhỏ (quốc gia, số đánh giá) trắng đặc, không `text-white/85`.
  Probe chụp nền thật dưới từng chữ trên ảnh rồi chấm 4.5:1 (chữ lớn 3:1).
- **Ảnh lớn đầu màn chi tiết với tấm nội dung trượt lên:** ảnh là khối đầu của vùng cuộn như quầng của `J18`, tấm trắng
  bo 28–36 là khối kế tiếp trong luồng. Đừng đẩy tấm xuống bằng `mt-[300px]` trong khối bọc không có padding: lề trên
  dồn ra khối bọc (margin collapse), ảnh mất và nút quay lại rơi đè tiêu đề. Đặt ảnh `absolute` cao cố định trong khối
  bọc `relative pt-[300px]` (hay khối bọc `flow-root`), tấm bắt đầu ngay dưới. Tấm không kéo được thì không vẽ thanh kéo
  (thanh kéo chỉ cho sheet `J6`), dù ảnh mẫu có vẽ.
- **Thanh trạng thái trên ảnh đầu màn:** dải che tai thỏ trong suốt lúc chưa cuộn (`J18`), giờ và pin chữ trắng, thêm
  một lớp tối mỏng ở đỉnh ảnh (`h-24 bg-linear-to-b from-black/45 to-transparent`) để giờ trắng không tan vào trời nhạt.
  Cuộn qua ảnh thì dải có nền, chữ về màu tối như mọi màn.
- **Hàng cuộn ngang trong khung máy không có nút mũi tên.** Người dùng vuốt bằng ngón tay; nút mũi tên tròn kiểu desktop
  đè lên chip cuối và chữ của thẻ kế bên. Mép mờ phía còn mục khuất là đủ (`R10`); probe không bắt hàng cuộn trong `.device`.
- **Playful: gờ đáy 4px là `box-shadow` đặc, không phải `border-bottom`.** Chưa bấm `box-shadow: 0 4px 0 <màu gờ>`; nhấn
  thì `translate: 0 2px` và gờ còn `0 2px 0`: mép dưới đứng yên, bố cục không đổi. Đừng đổi `border-bottom-width` rồi bù
  `margin`: thẻ có `min-height` không thấp đi, phần bù dư ra, mọi thẻ bên dưới giật xuống mỗi lần nhấn. Gờ nằm ngoài
  khối nên vùng cuộn chừa đáy 8px, thẻ cuối không mất gờ. Thẻ đang chọn đổi nền nhạt, viền và gờ theo `--primary`.
  Không vòng focus (`I13`).
- **Playful: gờ đáy chỉ cho khối nằm ngang** (nút rộng, thẻ chọn, dải tên cấp). Gờ cộng 4–6px vào chiều cao: nút tròn
  thành quả trứng, ô vuông thành chữ nhật đứng, lục giác thành hình đứng, trông méo và thô. Nút tròn (mic, nút bài trên
  lộ trình), ô vuông (ô hình trong sheet), huy hiệu lục giác giữ đúng hình: không gờ, nhấn thì `scale: 0.95`; cần nổi thì
  viền 4px hay quầng nhạt `0 0 0 8px`, đều quanh hình. Lục giác đều: rộng = cao × 0.866 (`aspect-ratio: 0.866`, clip-path
  chạm 0 và 100%, chỉ đặt chiều cao), viền là lục giác đậm bọc lục giác nhạt vì clip-path cắt mất `border`. Nút mic là
  hình tròn 88px có quầng nhạt; đang nghe thì giãn thành viên dài có sóng âm, nút tròn cuối viên thành nút dừng. Không
  làm mic thành khối chữ nhật bo góc. Code mẫu: màn luyện nói của `mobile-playful.html`.
- **Playful: không IN HOA chữ tiếng Việt trên nút.** IN HOA kèm dấu chồng lên nhau ("TIẾP TỤC" cao hơn hàng), đọc chậm.
  Dùng chữ thường đậm 800.
- **Immersive: đi hết bẫy `P10`**: tiêu đề, icon, chữ trong ô nhập đổi theo nền; sheet và hộp hỏi trên nền tối cũng
  tối, không bật ra một tấm trắng. Ảnh tối trên nền tối thì thêm viền trắng 10%. Bàn phím vẽ (`J13`) cũng bản tối,
  cho mọi bộ mặt nền tối (Immersive, Glow): khối `#2b2b30`, phím `#6b6b70` chữ trắng, phím chức năng `#46464b` (đúng như
  `mobile-immersive.html`).
- **Glow: quầng màu là nền, không phải nội dung.** Quầng sau chữ nhỏ làm chữ chỗ sáng chỗ tối, đo tương phản ở chỗ quầng
  sáng nhất. Không thêm quầng vào từng thẻ: mỗi màn hai ba quầng. Màn gốc cuộn được thì quầng là khối đầu của vùng cuộn,
  cuộn cùng nội dung (`J18`); màn có thanh trên cố định (chat, bản nháp) thì quầng nằm ở lớp nền của màn, ngoài vùng cuộn,
  đứng yên sau cả thanh trên, để mép thanh không cắt ngang quầng. Thẻ kính trên nền đen trơn (không quầng phía sau) chỉ là thẻ xám, kính chỉ thấy khi có quầng. Thanh tab `glass` cũng vậy: màn không có quầng đầu (Tài khoản, danh sách) thì thêm một quầng nhỏ mờ ở đáy
  màn, ngay sau thanh tab (`radial-gradient` màu nhấn 25%, cao 160px), để thanh kính không thành viên xám.
- **Tinted: một sắc nền cho cả app, không đổi theo màn.** Sheet, hộp hỏi, bàn phím vẽ vẫn trắng. Màu trạng thái (đỏ
  vượt, xanh đạt) đo lại trên nền màu; ảnh món, ảnh phòng trên nền be thì thêm viền trắng 2px cho khỏi lẫn.
- **Brand: màu ở chỗ có trạng thái, không rải lên chữ.** Thẻ chọn xe đang chọn viền 2px `--primary` nền `--primary-soft`;
  tab phân đoạn (Gần đây · Gợi ý · Đã lưu), chip (Bây giờ · Hẹn giờ) đang chọn là viên `--primary-soft` chữ
  `--primary-strong` đậm, mục khác chữ `--muted`; ô đang nhập viền `--primary` 2px quầng `--primary-soft` 3px. Hai nút đáy
  cạnh nhau: nút chính đặc, nút phụ nền `--primary-soft` chữ `--primary-strong`, không nút viền xám. Icon đầu dòng (nhà,
  công ty, lịch sử) `--primary-strong` không vòng nền, hay đồ vật 3D. Giá, tên, địa chỉ vẫn `--foreground` / `--muted`
  (`M4`). Màn dựng xong mà chỗ màu duy nhất là nút đáy thì chưa phải Brand.
- **Brand: dịch vụ và loại xe là hình, không là icon nét.** Lưới dịch vụ trang chủ 2 cột (chữ đậm 16 trái, đồ vật 3D 48–56
  phải, cao 72–80, không viền thẻ) hay 4 cột (ô hình 56 trên, nhãn 13 dưới). Ô 2 cột chỉ có **tên dịch vụ**, tối đa hai dòng:
  ở 360 mỗi ô còn ~155px, thêm dòng phụ ("Đón trong 2 phút") cạnh hình 48 thì dòng phụ gãy ba dòng; thời gian đón để ở màn
  chọn xe; dòng chọn loại xe có hình xe 3D 56–72 bên
  trái (Fluent: `Motor scooter`, `Automobile`, `Taxi`, `Minibus`, `Delivery truck`). Icon Lucide 20px trong vòng xám ở các
  chỗ này là lý do bản dựng trông như bản nháp.
- **Brand: màn đánh giá sau chuyến** (ride, giao hàng, dịch vụ tại nhà). Thanh trên: ✕ trái, "Đã xong chuyến" và địa chỉ một
  dòng `truncate`, nút hỗ trợ phải. Giữa màn: tiêu đề hỏi 24–28 đậm 800 canh giữa, avatar 88–96 tròn, tên và điểm của người
  làm, **năm sao 40–44 vàng** (`J8`) với dòng chữ dưới đổi theo số sao ("Tuyệt vời"). Chọn sao xong hiện "Điều gì làm bạn
  hài lòng?" và **hàng lời khen là đồ vật 3D** trong vòng 64 nền nhạt mỗi vòng một sắc, nhãn 13–14 dưới tối đa hai dòng, hàng
  cuộn ngang lộ nửa mục cuối (`J8`); đang chọn thì vòng viền `--primary` 3px và tick nhỏ ở góc. Sao thấp (1–3) thì đổi thành
  "Điều gì chưa ổn?" với các mục chưa ổn. Ô góp ý, khối tiền tip (viên bo tròn hết, đang chọn viền `--primary` nền soft, mục
  cuối "Số khác" có icon bút) rồi nút Gửi dính đáy. Không gói sao và lời khen vào một thẻ viền: màn này chỉ có một việc.
- **Editorial: serif chỉ cho nội dung đọc.** Lora cho nhãn tab, nút, ô nhập thì khung app thành giả cổ, chữ nhỏ 11–13
  khó đọc. Nạp Lora mà quên bộ `vietnamese` thì "ữ", "ợ" rơi về font máy (`T5`).
