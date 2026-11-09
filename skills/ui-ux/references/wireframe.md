# Wireframe — luật U3

Bước thứ ba của nhánh `U` (`design-process.md`): mở file này **sau cổng 1** (brief và việc chính
đã duyệt), lúc vẽ 2–3 phương án. Lối "dựng luôn" và phân tích sản phẩm (`U6`) không vẽ wireframe,
không mở file này.

## U3. Wireframe: 2–3 phương án khác nhau thật ⚑

- **Khác ở chiến lược bố cục, không khác ở trang trí.** Ví dụ cho một trang danh sách:
  A giữ lưới card với thanh lọc gọn dính đầu trang; B chia đôi danh sách và panel chi tiết;
  C đặt ô tìm lên trước, lọc sau. Ba phương án chỉ khác bo góc hay màu là **một** phương án.
  Lấy chiến lược từ bảng **Bố cục nội dung** đầu `layouts/app.md`, theo việc chính ở `U2`; không
  phương án nào mặc nhiên là "hàng ô số + biểu đồ + bảng" nếu việc chính không phải nhìn tổng quan.
- **Mặc định xám.** Ảnh là khối xám có tỉ lệ thật. Mở ra người dùng nhìn bố cục trước, không
  sa vào màu; màu nhấn chỉ bật bằng nút Màu trên thanh công cụ (dưới). Xám chỉ là tắt màu nhấn,
  còn lại vẫn là token và component thật (dòng "Wireframe dựng bằng chính token…" dưới).
- **Icon lucide thật ở đúng chỗ các app đều đặt**, không vẽ ô vuông giữ chỗ (ô vuông cạnh mục
  sidebar đọc ra checkbox). Nạp `lucide` từ `cdn.jsdelivr.net`, gọi
  `lucide.createIcons()`. **Mỗi lần ghi lại `innerHTML` là phải vẽ lại icon**: `createIcons()`
  chỉ thay các `<i data-lucide>` có lúc gọi, thẻ mới ghi sau đó nằm trống. Gắn một lần ở đầu
  script `new MutationObserver(() => { if (document.querySelector("i[data-lucide]")) lucide.createIcons(); }).observe(document.body, { childList: true, subtree: true })`
  thay vì gọi tay sau từng lần render. **Phải có điều kiện `i[data-lucide]`**: svg vẽ xong vẫn mang
  `data-lucide`, gọi thẳng `createIcons()` trong observer thì nó thay svg mãi, trang treo. Không gắn
  observer thì chọn xong một mục là ô select và ô ngày mất icon (svg thành `<i data-lucide>` trống),
  phải mở lại mới thấy. Ba chỗ: **mỗi mục sidebar**; **ô icon 32px nền nhạt ở góc mỗi card số
  liệu**; **ô icon hay avatar đầu dòng** khi dòng thuộc một loại (bộ phận, nhà cung cấp, loại
  giao dịch). Tiêu đề khối, dòng meta thì không icon (`V1c`). Nấc Xám thì icon xám; ba icon
  giống hệt nhau cho ba mục là thà bỏ (`F17`). Dashboard không icon trông "chán", người xem
  nói ngay. **Xám vẫn có mức nhấn**: nút chính tô xám đậm chữ
  trắng, nút phụ viền. Hai nút cùng một kiểu trong wireframe là chưa quyết thứ bậc, lúc dựng
  thật sẽ lại thành hai nút tranh nhau (`V1b`).
- **Wireframe dựng bằng chính token, font, component mà bản dựng sẽ dùng** ⚑, vì `U4` chép
  nguyên. Nấc Màu của wireframe phải **là** bản dựng, chỉ khác là file HTML: người dùng chọn thứ
  họ thấy, dựng ra y hệt thì họ hài lòng; dựng ra khác là chọn nhầm.
  - **Khung file như `layouts/app-kanban.html`**: nạp font, Tailwind v4 bản trình duyệt
    (`@tailwindcss/browser@4`), rồi dán **nguyên** khối token vào `<style type="text/tailwindcss">`
    (`:root` và `@theme inline`). Sản phẩm mới: `references/tokens.css`, màu nhấn theo nhóm Nhấn
    (dưới). Dự án đã có UI: **file token của dự án** (`globals.css`, `index.css`, config theme),
    màu xếp theo vai như `U4` sẽ làm (`review.md`, bảng vai màu), dáng theo bảng "Dáng lấy từ
    skill". Không tự đặt mã màu, bo góc, bóng nào ngoài khối token.
    **Dự án đã qua `D9`** (có trang `/design-system` hay story design system, file token đã sửa)
    tính là **dự án đã có UI** dù chưa có màn nào: dán file token của dự án, không dán
    `tokens.css` của skill, không thì mất font và màu nhấn vừa duyệt.
  - **Component viết đúng class bản dựng sẽ dùng**: dự án có thư viện component (shadcn, bộ nội
    bộ) thì mở source `Button`, `Input`, `Badge`, `Card`… của dự án, chép chuỗi class của biến
    thể sẽ dùng; chưa có thì chép công thức trong `components/*.md`. Không vẽ lại "cho giống".
  - **Khoảng cách, cỡ viết thẳng bằng class** ở từng khối (padding khung trang, `gap`, chiều cao
    control, cỡ chữ, cỡ icon), theo thang của dự án hay của skill, không để trình duyệt tự canh.
    Người dùng chọn wireframe là chọn luôn độ thoáng.
  - **Nấc Xám chỉ đổi màu nhấn và màu trạng thái sang xám** (ghi đè `--primary` và các token
    trạng thái trên `:root[data-mau="xam"]`); nền, viền, chữ, bo góc, bóng, font giữ nguyên token.
    Bật Màu lên là thấy đúng bản dựng.
  - **Đổi màu nhấn trên `:root`, không trên `body`, và kéo theo mọi token suy từ nó.** Biến
    `--border-focus: var(--primary)` khai ở `:root` được tính xong ngay tại `:root` rồi mới truyền
    xuống: đổi `--primary` ở `body` thì nút chính đổi màu mà viền focus vẫn màu cũ. Token viết cứng
    theo màu nhấn (`--ring-focus`, `--primary-hover`, `--primary-light`) cũng phải suy lại ở từng nấc,
    như `brand-tokens.md` dặn khi đổi `--primary`. Không suy lại thì chọn
    xanh ngọc, nút xanh ngọc, nhưng ô tìm và select focus vẫn viền và ring màu chàm ở mọi nấc,
    cả nấc Xám. Probe báo "Token focus không theo màu nhấn".
- **Nội dung thật**: chữ lấy từ dữ liệu của dự án, cả ca dài nhất và ca trống. Wireframe chữ
  "Lorem" thì không thấy được card quá tải.
- **Dữ liệu mẫu có đủ mọi trạng thái, nhất là trạng thái suy từ giờ.** Màn có mốc "bây giờ"
  (lịch hẹn, hạn chót, đơn đang giao) thì thứ người dùng cần thấy nhất thường là thứ **đã quá
  mốc mà chưa xong**: khách trễ giờ hẹn chưa đến, việc quá hạn, đơn giao chậm. Nó không nằm
  trong danh sách trạng thái lưu trong dữ liệu (chỉ có "Đã xác nhận"), mà tính từ giờ, nên
  hay bị quên. Đặt giờ "bây giờ" của wireframe sao cho có ít nhất một mục như vậy, vẽ nó thành
  trạng thái riêng (`M4`: hổ phách hay đỏ ở nấc Màu), và ghi vào `U2` là thứ phải nổi. Ví dụ lịch
  hẹn lúc 10:40 mà mọi lịch trước đó đều đã đến, đang khám hoặc không đến, không có ai "trễ": việc
  chính của lễ tân lúc đó (gọi người trễ) không có trên wireframe.
- **Đúng hình dạng dữ liệu**: mỗi mục có mấy ảnh, trường nào hay trống, danh sách dài bao
  nhiêu. Dữ liệu chỉ có một ảnh mỗi tin mà wireframe vẽ lưới ba ảnh là hứa thứ dữ liệu
  không có: người dùng chọn vì lưới ảnh, bản dựng ra một ảnh to quá khổ. Muốn phương án cần thêm dữ liệu thì vẽ đúng cái đang có và ghi *"đẹp hơn khi
  có X"* ở dòng đánh đổi.
- Mỗi phương án ghi **ba dòng**: việc chính giờ thấy ở đâu, đổi gì so với bản cũ, đánh đổi.
  Ba dòng đó cũng là nội dung khung lý do trên trang wireframe (dưới), hai chỗ cùng một chữ.
  Phương án cần dữ liệu hay logic chưa có (khoảng cách, chế độ xem mới) thì ghi rõ
  *"cần dữ liệu X, logic do bạn nối"* (`N10`).
- **Tính cả khung app vào bề ngang.** App đã có sidebar điều hướng mà phương án thêm một cột
  lọc bên trái thì ghi rõ ở dòng đánh đổi: hai cột trái, nội dung còn lại bao nhiêu px ở 1280.
- **Đánh dấu một phương án khuyên dùng**, kèm một câu vì sao (bám `U2`).
  Không có phương án không nhược điểm: khuyên dùng là phương án có nhược điểm rơi vào việc
  người dùng ít làm nhất, không phải phương án ít nhược điểm nhất trên giấy.
  **Nhược điểm là đánh đổi của bố cục, không phải lỗi một luật đã có.** "Đang gõ thì bàn phím che nút Lưu", "chữ
  nhỏ khó đọc", "nút sát mép" là lỗi phải sửa trong phương án trước khi gửi (`J6`, `J4`), không ghi vào cột Nhược
  để người dùng tự chọn có chịu lỗi hay không.
- **Ghép khi hai cái hay không đụng nhau.** Hai phương án hay ở hai chỗ khác nhau (A có bố cục
  tốt, B có thanh lọc tốt) và ghép lại không thêm khối, không chật thêm thì ghi thêm một dòng
  lúc gửi wireframe: *"Ghép A + B: bố cục của A, thanh lọc của B. Mất: …"*. Không vẽ thành
  phương án thứ tư; người dùng chọn dòng ghép thì dựng theo nó. Hai cái hay giành cùng một chỗ,
  hay ghép vào thì thêm cột, thêm khối, thì không ghép: gom hết cái hay vào một màn là rối,
  rối là nhược điểm nặng nhất. Không có cặp nào ghép được thì bỏ dòng này, không ép.
- Một file HTML, mọi lựa chọn nằm trên tham số (`?v=a&mau=xam&kho=desktop&tt=du-lieu`) để probe
  mở được từng cái, và người dùng chép link gửi đi thì mở ra đúng cái đang xem.
- **Đánh số từng khối chính** (header, hàng lọc, danh sách, panel, chân trang…): `data-wf-block="1"`,
  số hiện nhỏ ở góc trên trái khối. Người dùng góp ý bằng số (*"bỏ khối 3"*, *"đưa khối 2 lên
  đầu"*), không phải tả "cái thanh chữ nhỏ ở trên bảng". Cùng một khối ở các phương án giữ cùng
  số; khối chỉ phương án đó có thì số mới.
  **Số không được đè chữ hay icon của khối.** Khối không có padding (hàng công cụ, hàng chữ đếm
  trạng thái) có chữ ngay góc trên trái: số đè thành "ThBa". Sau mỗi lần vẽ, `placeBlockNumbers()`
  (mẫu dưới) đo chữ và icon dưới số, đè thì gắn `data-wf-block-out` để số lên ngay trên mép khối.
  **`data-wf-block` đặt trên khối bọc không cuộn**: khối `overflow-x-auto` (hàng chip) cắt mất số
  nằm ngoài mép, bọc thêm một `div` rồi đánh số lên đó.
- **Khối nào skill đã có mẫu thì wireframe vẽ đúng hình mẫu đó**, vì `U4` dựng đúng wireframe:
  vẽ sai là bản dựng chép sai theo. Trước khi vẽ, liệt kê các khối của phương án rồi mở mẫu
  tương ứng ở bảng mục 2 của `SKILL.md` (`components/`, `layouts/`): nút, ô nhập, select, ô
  chọn ngày, checkbox, công tắc, tab, chip, phân trang, badge, avatar, dòng danh sách, card, card
  số liệu, biểu đồ, khối rỗng, đường dẫn, header, sidebar, bảng. Chép **hình và class**: cỡ, số phần tử,
  cách xếp, chữ nằm đâu, chuỗi class của mẫu; không cần chép code React. Control là thẻ thật (`<input>`, `<button>`,
  `<select>` nếu mẫu dùng), không `div` giả. Khối chưa có mẫu mới tự vẽ. Hai
  lỗi hay gặp: phân trang vẽ hai nút chữ "Trước / Sau" rộng khác nhau thay cho
  `‹ 1 2 3 … ›`; ô tìm là `div` nên placeholder dài rớt xuống dòng hai.
  **App đang có mà dùng control gốc của trình duyệt thì wireframe không chép theo**, kể cả khi
  app đã tô viền, bo góc: `<select>`, ô ngày / giờ bấm vào vẫn bung menu và lịch của hệ điều hành;
  checkbox, radio, thanh trượt, ô chọn tệp gốc lạc dáng giữa app. Vẽ theo mẫu tương ứng của skill
  (`components/choice-controls.md`, `range-slider.md`, `file-upload.md`), tô bằng token của app. Chỉ giữ control gốc khi nó chỉ hiện trên mobile (luật `<select>` gốc cho màn
  cảm ứng ở đó); ô nằm trong dialog dùng cho cả hai khổ thì dựng. Khối trong lớp nổi (dialog,
  sheet, popover) cũng đối chiếu mẫu, mở ra rồi xem, không chỉ phần trang đang hiện.
- **Tự đối chiếu trước khi probe**: mỗi khối có mẫu, so wireframe với mẫu một dòng ("phân trang:
  khớp", "ô tìm: `<input>`, placeholder vừa"). Probe bắt được một phần (placeholder dài hơn ô,
  khối trông như ô nhập mà chữ xuống dòng, phân trang chỉ có nút chữ, hàng control lệch), phần
  còn lại là mắt.
- **Đủ bốn trạng thái của `I19`**: có dữ liệu, đang tải, rỗng, lỗi, chuyển bằng nút Trạng thái.
  Màn rỗng có câu và nút của `components/empty-state.md`, đang tải là khung chờ đúng hình dòng
  thật. Người dùng góp ý màn rỗng từ lúc wireframe, không đợi dựng xong mới thấy.
- **Wireframe có đủ trạng thái như bản thật**: một mục đang chọn đánh dấu `aria-current` (hay
  `aria-selected`), có nền rê. Wireframe tĩnh không có rê thì không ai thấy
  "rê trùng nền đang chọn" cho tới khi đã dựng xong.
- **Probe nhanh từng phương án trước khi gửi**: `probe.mjs "<link phương án>&mau=mau" --quick
  --widths 1280,375`, ~6 giây mỗi phương án. Sửa tới khi sạch các mục: danh sách `P`, vạch trái bị
  bo góc cắt, mục lặp dày chữ, cột dính cuộn riêng, nội dung trôi giữa màn rộng, hàng nút rớt một
  nút lẻ (`R3`), select và ô ngày gốc (kể cả trong dialog đang đóng), "khung wireframe làm hỏng
  bản thiết kế" (số đè chữ, `sticky` mất, thanh tràn), **cuộn ngang ở 375** (người dùng bấm Mobile
  là thấy trang trượt ngang trong khung; lỗi hay gặp nhất là `grid` trơn thiếu `grid-cols-1`, luật
  `R2`). Link có `kho=mobile` thì probe tự đo `kho=desktop`, vì khung Mobile là iframe. Đó là lỗi của chính bố cục: để tới `U4`
  mới sửa thì bản dựng lệch khỏi cái người dùng đã chọn. Người dùng không tự thấy "card chữ quá
  trời" hay "vạch bị cắt" trên wireframe xám, họ chọn theo bố cục rồi vấp lỗi ở bản dựng (probe
  đo ra cả hai trên chính file wireframe). Rồi chạy luật Cấu trúc (`V1b` trong `review.md`) bằng
  mắt. Không probe nấc Xám: cùng bố cục, chỉ khác màu.
- **Tự rà trước cổng 2, như lúc người dùng gõ "rà lại wireframe"** ⚑. Probe nhanh xong, mỗi
  phương án ở nấc Màu đi đúng lối rà của `review.md` `V3`: `probe.mjs "<link phương án>&mau=mau"
  --sweep` (đủ Tab, rê, bấm, mở lớp nổi, quét 1440→375), mở ảnh 375, 768, 1280 và các khung
  sweep báo lỗi ra soi bằng mắt: hàng lệch, khối vỡ giữa hai khổ, nền rê trùng nền đang chọn
  hay trùng nền card, lớp nổi tràn mép. Chỉ probe nhanh thì người dùng mở wireframe ra vẫn thấy
  ngay mấy lỗi đó, phải gõ thêm một lệnh rà mới ra hết, và mỗi lần rà lại ra thêm một mớ.
  - **Có công cụ Agent thì giao mỗi phương án cho một subagent mới, chạy song song**: đưa link,
    đường dẫn skill, dặn làm theo `V3` và `V1b`, chỉ báo lỗi kèm khổ màn và cách sửa, không sửa
    file. Mắt mới không bênh cái vừa vẽ, và ba phương án song song không cộng dồn thời gian.
    Không có Agent thì tự rà từng phương án.
  - Sửa hết lỗi được báo rồi rà lại, **tối đa hai vòng**. Vòng hai còn lỗi thì ghi vào khung lý do
    của phương án đó, không giấu.
  - Lỗi mắt thấy mà probe không báo (lệch px, nền rê trùng, cắt chữ) thì thêm phép đo vào
    `probe.mjs`, để lần sau probe nhanh bắt luôn.
  - Ghi một dòng khi gửi: *"Tự rà: A sạch, B sửa 2 chỗ (hàng lọc lệch ở 768, rê trùng nền mục
    đang chọn), C sạch"*.
- **Hai công tắc nội dung, Gọn chữ và Bỏ lặp, áp cho mọi phương án** (`?gon=1`, `?bolap=1`,
  bật cả hai cùng lúc được). Cùng bố cục, chỉ bớt nội dung, để người dùng bật lên là thấy cái họ
  không tự nghĩ ra, trên đúng phương án họ đang xem:
  - **Gọn chữ:** mỗi mục chỉ giữ thứ dùng để chọn ở cột "so sánh bằng gì" của `U2`, tối
    đa ba dòng. Phần còn lại để trang hay panel chi tiết.
  - **Bỏ lặp:** mỗi thông tin một chỗ trên màn: không lặp giữa mục và panel chi tiết, giữa
    header và sidebar, giữa tên trang và mục đang chọn (`V1b`, "Hai chỗ một việc").

  **Không vẽ bản riêng.** Mỗi phương án vẽ đủ nội dung một lần, gắn `data-wf-gon` lên phần ẩn khi
  gọn chữ, `data-wf-lap` lên chỗ lặp; CSS ẩn theo `body[data-gon="1"]`, `body[data-bolap="1"]`
  (mẫu dưới). Bản trước là hai phương án D, E chỉ vẽ trên phương án khuyên dùng: người chọn C phải
  tự hình dung "C gọn chữ", và không xem được cả hai cùng bật. Phương án nào không có gì để gọn
  hay bỏ lặp thì khung lý do ghi một câu (*"B đã gọn sẵn: mỗi dòng ba thông tin"*): bật mà không
  đổi gì thì người dùng tưởng công tắc hỏng. Công tắc chỉ ẩn bớt nên không cần probe riêng.

- **Công tắc Màu** (tắt là Xám, bật là Màu), áp cho mọi phương án, không phải bản riêng:
  - **Tắt, Xám:** mặc định lúc mở, chỉ xem bố cục.
  - **Bật, Màu:** như bản dựng sẽ ra theo mặc định (`P6`): màu nhấn ở nút chính, mục đang chọn, link,
    biểu đồ; **và màu trạng thái của `M4` trên mọi dữ liệu có trạng thái**: vượt ngân sách,
    quá hạn đỏ hay hổ phách, đã xong xanh, thanh tiến độ tô theo ngưỡng. Nấc Màu mà thanh 103%
    vẫn đen thì người xem hỏi *"chọn màu mà sao vẫn trắng đen"*. Dự án đã
    có phong cách khác flat (`P4`) thì Màu là phong cách đó.

  ⚠️ **Nấc thứ ba "Có màu" đã bỏ khỏi wireframe (chủ dự án: thêm vào cũng không
  khác gì mấy).** Màu brand người dùng cần thấy nằm ở chỗ tương tác (control bấm được, dưới),
  không ở dải màu trang trí. Người dùng tự xin "có màu" trong đề thì theo `P12` ở `styles.md`
  (trang lướt để chọn) hay Sắc Tinted, Vivid của `P17` (màn trong app) lúc dựng, không vẽ thành nấc.
  Màn trong app web thì chọn Sắc ngay trong menu Kiểu (dưới).

  **Dự án đã có UI thì màu là của dự án** (chủ dự án chốt): đã có token màu trong code, kể cả màu
  nhấn gần đen, là đã có brand. Giữ vai màu của dự án, **không thêm nhóm Nhấn, không gợi ý màu theo
  ngành**; lối dựng luôn cũng vậy. Đừng suy "màu nhấn gần đen là mặc định của skill nên dự án chưa có
  brand": dự án đã chạy với màu đó.
  **Dự án chưa có màu brand** (sản phẩm mới, chưa có token màu nào trong code; dự án đã qua
  `D9` thì màu nhấn đã chốt ở cổng đó, kể cả khi chốt gần đen, không tính là chưa có) thì thêm nhóm
  **Nhấn: ● ● ●** gồm ba màu gợi ý **theo ngành ở `U1`**, lấy từ bảng "Màu nhấn gợi ý theo
  ngành" của `brand-tokens.md` (màu đầu là quy ước của ngành; ngành khác thì chàm, xanh ngọc,
  cam), đổi `--primary` tại chỗ. Đổi `data-value`, `aria-label` và mã màu trong mẫu dưới theo
  ba màu đó. Không có nhóm này thì nấc Màu của dự án mới vẫn đen trắng. Màu người dùng
  chọn thành màu nhấn lúc dựng (`brand-tokens.md`); không chọn thì dựng màu đầu, báo một dòng.
  Đổi màu bằng biến CSS trên `:root[data-mau]`, `:root[data-nhan]` (không trên `body`, xem trên), không vẽ lại. Probe nhanh ở
  nấc Màu đo tương phản chữ trắng trên nút chính, trên mục đang chọn, với màu nhấn đầu; hai màu còn lại
  tự so bằng mắt trên ảnh. Bảng màu đã đo sẵn chữ trắng từ 5 : 1, nên trượt là do tự lấy màu ngoài bảng.

  **Dự án chưa có logo** thì thêm nhóm **Logo: 1 · 2 · 3** (`?logo=`): ba dấu theo ba hướng của
  `components/logo.md`, đã kiểm ở 16px, đổi ở mọi chỗ có logo trên trang. Khung lý do có một dòng
  vì sao cho từng dấu. Không có nhóm này thì đầu sidebar là ô chữ cái, người dùng duyệt xong vẫn
  chưa thấy sản phẩm mình trông ra sao. Logo người dùng chọn thành logo lúc dựng; không chọn thì
  dựng hướng khuyên dùng, báo một dòng.

  **Dự án chưa có phong cách riêng** (audit tầng 3 ra flat hoặc trống, `P4`) và đề không nêu
  phong cách thì thêm nhóm **Kiểu** (`?kieu=`). **Màn trong app web**: mười bộ mặt của `P13`
  (`clean`, `dark-sidebar`, `soft`, `midnight`, `inset`, `paper`, `float`, `rail`, `topbar`,
  `editorial`: Clean, Dark Sidebar, Soft, Midnight, Inset, Paper, Float, Rail, Topbar, Editorial; tên tiếng Anh cả khi đề
  viết tiếng Việt; Rail, Topbar chỉ liệt kê khi số mục chính nằm dưới trần của chúng, `P13`), **mặc định là bộ khuyên dùng**
  theo người dùng ở `U1`, có nhãn nhỏ "khuyên dùng" sau tên trong menu, không trên nút. Bộ khuyên
  dùng luôn là một trong bốn bộ không cờ (Clean, Dark Sidebar, Soft, Midnight); bộ còn cờ ⚑ đứng
  sau, không bao giờ mang nhãn "khuyên dùng", không là mặc định, người dùng tự chọn thì dựng theo. **App điện thoại** ⚑:
  chín bộ mặt của `J15` (`mobile/faces.md`: `clean`, `mono`, `photo`, `playful`, `immersive`, `editorial`, `glow`, `tinted`, `brand`), mặc định là bộ
  khuyên dùng theo `J15` (Clean, Photo, Playful hay Immersive; Brand cho app gọi xe, giao hàng, vé; Tinted, Glow khi bật Trình diễn (app tự chăm mình, app AI và sáng tạo); Mono, Editorial còn cờ, đứng sau), nạp sẵn Nunito
  và Lora trong link font. Màn khác (trang
  lướt để chọn, trang giá): Flat (`P6`) cùng hai khối hợp sản phẩm nhất trong `P7`–`P10` (`flat`,
  `toi`, `noi`; Glass chỉ khi phía sau có ảnh hay gradient, `F19`), mặc định Flat (`P1`). Không có
  nhóm này thì người dùng chỉ thấy bố cục xám rồi bản dựng flat, muốn xem bản tối hay bản nổi
  phải nhắn vẽ lại cả trang; có nhóm mà mặc định luôn Clean thì dự án nào cũng ra cùng một mặt.
  - **App điện thoại có thêm nhóm Tab** (`?tab=`) ⚑, đứng sau Kiểu: sáu kiểu thanh tab của `J2` (`float`, `center`, `pill`,
    `dark`, `bubbles`, `glass`), vẽ theo `layouts/mobile-tabbars.html`, mặc định `float`. Chỉ liệt kê kiểu hợp ràng buộc
    của `J2`: `center` khi luồng có một hành động hằng ngày và thanh có 4 mục; `dark`, `bubbles` khi tối đa 4 mục; `glass`
    khi Kiểu là Immersive hay màn có ảnh, nền tối phía sau. Cùng mục, cùng icon ở mọi kiểu; người dùng chọn kiểu nào thì `U4`
    dựng đúng kiểu đó. Thiếu nhóm này thì app nào cũng ra một thanh viên nổi, người dùng không biết còn cách khác.
  - **Kiểu chỉ đổi bộ mặt, không đổi bố cục** ⚑: cùng khối, cùng dữ liệu, cùng chỗ đặt. Bố cục
    là việc của Phương án. Kiểu Tối mà thêm hàng KPI, biểu đồ thì người xem không biết mình
    đang chọn bố cục hay chọn màu, chọn xong `U4` không biết dựng theo cái nào.
  - Đổi bằng biến CSS và rule dưới `:root[data-kieu]` (nền, bề mặt, viền, bóng, blur, `--app-font`), không vẽ
    lại khối. Bộ mặt đổi font thì nạp đủ font của mười bộ ngay từ đầu (một link Google Fonts),
    không thì đổi sang Soft vẫn ra Inter. Khung sidebar của bản thiết kế mang class `wf-sidebar`,
    vùng bên phải (header của trang cộng nội dung) mang class `wf-main`. Dark Sidebar: rule
    `[data-kieu="dark-sidebar"] .wf-sidebar` chép nguyên khối token `.force-dark` của `tokens.css`
    (`P13`), không tô riêng nền. Inset: `.wf-sidebar` trong suốt trên nền trang, `.wf-main` thành
    khối trắng bo góc cách mép, nền rê và nền đang chọn của sidebar đổi theo mục Khung bọc của
    `layouts/app.md`; ở khổ Mobile khối bọc trải hết màn, không bo, không cách mép. Paper: nền
    trang, `.wf-sidebar`, `.wf-main` cùng `--surface`, sidebar có `border-right`, header có
    `border-bottom`, cả hai `--border-strong` (mục Một mặt phẳng của `layouts/app/shell-unified.md`). Float:
    `.wf-sidebar` thành khối trắng bo góc cách mép, header của `.wf-main` bỏ nền. Rail: nhãn chữ
    trong sidebar bọc `<span class="wf-label">`; kiểu Rail vẽ đúng biến thể sẽ khuyên (`P13`):
    chỉ icon thì ẩn nhãn, bóp sidebar về 64px, giữ icon đứng yên; có nhãn thì sidebar 80px, mục
    xếp icon trên chữ dưới, nền đang chọn chỉ tô ô icon (mục Dải icon). Khung lý do ghi biến thể
    và vì sao. Paper, Inset cũng vẽ đúng biến thể sẽ khuyên (Paper kẻ hay không viền `P14`, Inset viền hay
    xếp lớp `P15`). Editorial: chữ tiêu đề và số lớn, nhãn IN HOA, đường kẻ đậm đầu mỗi phần, bỏ
    nền và viền card (`P16`). Soft cũng vẽ đúng biến thể sẽ khuyên: `classic`, hay mở (`canvas`: `.wf-sidebar` và
    header trong suốt, mục đang chọn là viên trắng, mục Mặt nền mở). Bộ khuyên dùng có header
    `full` (`P13`) thì wireframe vẽ header toàn màn ở mọi kiểu, ghi vào khung lý do. Topbar: wireframe có sẵn một hàng link `.wf-topnav` trong header
    (ẩn ở kiểu khác), kiểu Topbar ẩn `.wf-sidebar` và hiện hàng đó; nội dung giữa màn `max-width`
    1152px. Mỗi kiểu theo đủ khối `P` của nó, **cả phần bẫy**: Tối có bề mặt sáng dần theo tầng
    và viền `white/10` (`P10`), Glass có lớp gradient phía sau (`P8`), Nổi đủ bốn bậc bóng (`P7`).
  - Chọn một kiểu khác Flat, Clean và các kiểu đổi khung (Inset, Paper, Float, Rail, Topbar) là bật
    luôn nấc Màu (link mang `mau=mau`): kiểu ở nấc Xám không thấy gì khác, người xem tưởng nút
    hỏng. Kiểu đổi khung thì nấc Xám vẫn thấy khác, không cần bật. Mở đầu vẫn ở nấc Xám để duyệt bố cục; bật Màu là thấy ngay bộ khuyên dùng,
    không phải Clean.
  - **Probe nhanh phương án khuyên dùng ở từng kiểu** (`&mau=mau&kieu=toi`…). Chỗ hay hụt: kiểu
    Tối đổi nền mà quên đổi màu tiêu đề, tên sản phẩm chìm vào nền (`P3`). Kiểu nào trượt tương
    phản là lỗi phải sửa trước khi gửi, không phải nhược điểm của kiểu.
  - Khung lý do thêm một dòng vì sao cho từng kiểu, bám người dùng ở `U1`: *"Tối: người trực
    theo dõi số cả ca, nền tối đỡ chói"*, không viết "hiện đại, sang".
  - **Nhóm Sắc nằm trong menu Kiểu** ⚑ (`?sac=`), chỉ ở màn trong app web: một phần thứ hai của
    menu, tiêu đề nhỏ "Sắc", ba mục Neutral · Tinted · Vivid (`P17`). **Mặc định Neutral**, không mục
    nào mang nhãn "khuyên dùng" (Tinted, Vivid còn cờ); đề đã xin màu thì mặc định là nấc đề xin.
    Không thêm nhóm riêng trên thanh: thanh đã sát 1280. Nút menu chỉ ghi thêm "· Tinted" khi khác
    Neutral. Chọn Tinted, Vivid là bật luôn nấc Màu như Kiểu.
    - Bản thiết kế **luôn gắn sẵn hook**, CSS tô theo nấc, không vẽ lại khối: `data-cat="1"`…`"4"` trên
      ô icon card số liệu, ô icon đầu dòng theo loại, ô agent; `data-level="high"`, `"mid"` trên ô
      icon đầu dòng theo mức độ (dòng đã xong không gắn); `data-alert` trên đúng một số liệu đang
      báo động; `<i class="wf-dot">` đầu chữ trong badge; `data-now` trên mục đang diễn ra;
      `data-wf-cta` trên nút chính; `data-hero` trên một khối tổng kết; `data-wash` trên tối đa hai
      khối cột phụ; `data-peak` trên một cột biểu đồ. Ở Neutral mọi hook về xám hoặc ẩn, nên cùng
      một bản thiết kế cho ra ba nấc. Dữ liệu không có loại, không có mức thì không gắn: wireframe
      không bịa loại để có màu.
    - Khung lý do thêm một dòng cho Sắc, nói bằng dữ liệu: *"Tinted: bốn loại việc mỗi loại một
      màu, sự cố còn mở có màu riêng, liếc là thấy còn bao nhiêu"*.
    - Probe nhanh phương án khuyên dùng ở `&mau=mau&sac=vivid`: viền hero, nút gradient phải thấy;
      chữ trên nút gradient đạt 4.5 : 1 ở đầu nhạt nhất (`P3`).
  - Kiểu người dùng chọn thành phong cách lúc dựng (`U4` mở khối `P` đó) và giữ cho các màn sau
    của dự án (`P1`); bộ mặt thì ghi dòng comment ở khối font (`P13`). Không chọn thì màn trong
    app web dựng bộ khuyên dùng, báo một dòng theo mẫu `P13`; màn khác Flat, không cần báo.

- **Control trong wireframe bấm được và hiện trạng thái như bản thật** ⚑: ô nhập, ô tìm focus
  thì viền và ring màu nhấn (`I13`: `--border-focus`, `--ring-focus`); select, dropdown, nút lọc
  bấm là xổ ra danh sách mục thật theo `layouts/overlay.md` (khung, chuyển động), bấm ngoài hay
  Esc thì đóng. Mục đang chọn có badge thì badge đảo màu như bản dựng (`layouts/app.md`,
  Sidebar). Bật Màu lên là người dùng thấy màu brand đúng ở chỗ họ sẽ bấm (chủ dự án chốt:
  "cho user thấy còn hay hơn" nấc Có màu).

- **Nút Khổ: Desktop · Mobile.** Mobile hiện chính trang đó trong một khung 375 × 812 giữa màn
  (iframe cùng link, thêm `frame=1` để trong khung không có thanh công cụ), nên media query chạy
  thật. Người dùng hầu như không tự thu cửa sổ, nên không thấy bảng thành danh sách, lọc thành
  nút ra sao ở điện thoại.
  - **Nút ☰ trong khung mobile bấm được**: mở panel trượt từ trái theo `layouts/app.md` (lớp
    phủ, bấm ngoài hay Esc thì đóng, không nút ✕), để người dùng thấy menu có bao nhiêu mục, mục nào đang
    chọn. ☰ không bấm được thì mobile chỉ là ảnh chụp.
  - **App có từ 5 mục điều hướng chính trở xuống** thì thêm nhóm **Nav: ☰ · Thanh dưới** (chỉ
    hiện khi Khổ là Mobile), vẽ thêm thanh điều hướng dưới theo `layouts/app.md`, và ghi trong
    khung lý do nên dùng cái nào: app dùng hằng ngày, chuyển mục liên tục thì thanh dưới; app
    quản trị ít mở trên điện thoại thì ☰. Từ 6 mục thì chỉ ☰.

- **Thanh công cụ ở đỉnh trang, bắt buộc, một dòng**, nằm ngoài bản thiết kế: dải **sáng** cao
  56px, nền trắng, viền dưới xám nhạt, chữ 14px, **không dính đỉnh**: thanh dính đè lên sidebar,
  header, panel `sticky top-0` của chính bản thiết kế, người xem thấy sidebar mất logo khi cuộn và
  tưởng bản dựng sẽ vậy. Các nhóm xếp liền từ trái, cách nhau
  24px, theo thứ tự: Màn (đề nhiều màn) · **Phương án** · **Gọn chữ · Bỏ lặp** · **Màu** (công tắc) · Kiểu (dự án chưa có phong cách) · Tab (app điện thoại) · Trình diễn (app điện thoại, công tắc `?show=1`, `J18`) · Nhấn (dự án chưa có brand) · Logo (dự án chưa có logo) · Khổ · Nav (mobile, ít mục)
  · **Trạng thái**.
  - **Đề nhiều màn** (lịch và hồ sơ, danh sách và chi tiết) thì một file, nhóm **Màn** đứng đầu
    (`?man=`), nhãn một hai chữ ("Lịch", "Hồ sơ"); mỗi màn có A, B, C riêng. **Ở 1280 thanh phải
    vừa một dòng không cuộn** (probe đo): nhãn dài như "Lịch trong ngày", "Hồ sơ bệnh
    nhân" đẩy thanh tràn, "Trạng thái" bị cắt mất.
  - **Mỗi nhóm là một segmented control**: rãnh xám nhạt bo 10px, nút trong rãnh không nền, nút
    đang bật (`aria-current="page"`) nền trắng, bóng mảnh, chữ đậm đen; nút khác chữ xám. Không
    dải tối, không nút chữ trắng rời rạc: dải tối nặng hơn chính bản thiết kế, kéo mắt khỏi thứ
    cần xem, và mười mấy nút cùng hình đọc không ra nhóm nào.
  - **Phương án chỉ ghi chữ cái** `A B C`, có nhãn "Phương án" xám đứng trước; tên đầy đủ ở
    `title` và ở đầu khung lý do. Phương án khuyên dùng có chấm nhỏ màu nhấn cạnh chữ cái. Tên
    dài trên thanh ("A · Báo cáo một trang (khuyên dùng)") đẩy cả thanh phải cuộn ngang ở 1280.
  - **Khổ có icon**: màn hình trước Desktop, điện thoại trước Mobile (icon 16px, nét 2).
  - **Trạng thái là menu thả**, nhãn xám "Trạng thái:" kèm giá trị đang xem đậm và mũi tên nhỏ;
    bấm thì ra bốn link. Bốn trạng thái ít đổi, không đáng chiếm bốn nút trên thanh. **Kiểu cũng
    là menu thả** ("Kiểu: Flat ⌄"), cùng lý do, và để thanh có đủ Nhấn, Logo vẫn vừa 1280.
  - **Nút trong rãnh và mục trong menu Trạng thái cách nhau 4px** (luật chốt 19): hai nút cùng nền
    trắng (Gọn chữ, Bỏ lặp cùng bật) hay mục rê cạnh mục đang xem mà dính sát thì đọc thành một khối.
  - **Màu là công tắc** có nhãn "Màu" đứng trước, không phải segmented: chỉ còn hai nấc.
    Nhóm Nhấn, Nav không cần nhãn: chữ trong nút đã tự nói.
  - **Gọn chữ, Bỏ lặp là hai nút bật tắt chung một rãnh**, mỗi nút có ô vuông nhỏ trước chữ, bật
    thì ô có dấu ✓ và nút nền trắng (`aria-pressed`). Không dùng hai công tắc như Màu (thêm gần
    100px, thanh không vừa 1280 khi có cả Nhấn và Logo); không dùng segmented trơn (trông như
    chọn một trong hai, trong khi bật cùng lúc được).
  - **Chữ trên thanh và khung lý do theo tiếng người dùng đang viết (`T27`)**, không theo
    `T24`: đó là lời skill nói với người dùng, không phải chữ của sản phẩm. Mẫu HTML dưới viết
    tiếng Việt; đề tiếng Anh thì đổi hết: Phương án → Option, Màu → Color, Kiểu → Style, Sắc → Tone (tên mười bộ mặt và Neutral, Tinted, Vivid giữ nguyên, khuyên dùng → recommended; Flat,
    Nổi, Glass, Gradient, Tối → Flat, Elevated, Glass, Gradient, Dark), Nhấn (`aria-label`
    Chàm, Xanh ngọc, Cam; các màu khác của bảng: Xanh dương, Tím, Hồng tím, Xanh lá) → Indigo, Teal, Orange; Blue, Violet, Fuchsia, Green, Thanh dưới → Bottom bar, Trạng thái → State
    (Có dữ liệu, Đang tải, Rỗng, Lỗi → Data, Loading, Empty, Error), Khuyên dùng → Recommended,
    Gọn chữ, Bỏ lặp → Concise, No repeats, Ưu, nhược → Pros, cons, Ưu / Nhược / Hợp khi → Pros / Cons / Best when, Gợi ý góp ý →
    Feedback ideas, tên phương án, câu lý do, câu gợi ý cũng tiếng Anh. Tham số URL (`v`, `gon`, `bolap`,
    `mau`, `kho`, `tt`…) giữ nguyên. Chữ **trong** bản thiết kế vẫn theo `T24`: dự án đang có nhãn tiếng
    Việt thì wireframe tiếng Việt dù đề tiếng Anh. Thanh tiếng Việt trên đề tiếng Anh thì người
    dùng không đọc được nút nào, mà thanh là chỗ duy nhất để chọn.

  Mỗi nút là link giữ nguyên các lựa chọn khác, chỉ đổi đúng tham số của nó, **kể cả thứ người
  dùng đã mở trên khung wireframe**: khung lý do đang mở thì đổi phương án, màu, khổ vẫn mở
  (`?uu=1`). Người dùng mở Ưu, nhược để so A với B; bấm sang B mà khung đóng lại thì lần nào cũng
  phải bấm mở lại. Thứ mở thêm sau này (bảng so sánh, ghi chú) cũng giữ theo cách đó. Màn hẹp thì thanh
  cuộn ngang, không xuống dòng. Mở không tham số thì: phương án khuyên dùng, Gọn chữ và Bỏ lặp tắt,
  Màu tắt, Kiểu khuyên dùng, Sắc Neutral (hay nấc đề xin), Desktop, Có dữ liệu. Thiếu thanh thì người dùng phải tự gõ `?v=`.

- **Khung lý do ngay dưới thanh**, không modal (modal che mất bản thiết kế đúng lúc cần nhìn),
  nền xám rất nhạt. **Dòng đóng**: tên phương án đậm đen, nhãn "Khuyên dùng" (chỉ phương án khuyên
  dùng), một câu lý do chữ `#525252` cắt một dòng, nút "Ưu, nhược ⌄" dạt phải: *"**A · Lưới card**
  [Khuyên dùng] Người dùng đến để so lương, nên lương đứng đầu mỗi dòng"* (bám việc chính ở `U2`,
  không viết "gọn gàng, hiện đại"). Dưới 768px câu lý do xuống dòng riêng, nút chỉ còn mũi tên để
  tên và nhãn giữ một dòng. Bấm mở ra đủ:
  - **Ba cột** Ưu (chấm xanh), Nhược (chấm hổ phách), Hợp khi (chấm xám): tiêu đề 12px đậm đen,
    Ưu 2–3 gạch đầu dòng, Nhược 1–2, Hợp khi một câu, chữ `#404040`. Màn hẹp xếp chồng. Đổi theo
    phương án đang xem.
  - **Gợi ý góp ý**: hàng riêng dưới đường kẻ, 3–4 câu ngắn người dùng chép gửi lại cho AI, **mỗi
    câu là một nút** (chữ cả câu kèm icon chép, không xuống dòng, bấm xong icon thành dấu ✓ xanh
    1,5 giây). Chọn
    theo chính trang này, bằng ngôn ngữ của đề: trang đang Xám nhạt thì *"Thêm màu brand ở header
    và hàng lọc"*; tiêu đề mảnh thì *"Tiêu đề đậm hơn"*; khối sát nhau thì *"Thoáng hơn, tăng
    khoảng cách giữa các khối"*; *"Font khác hợp sản phẩm hơn"*; *"Bỏ khối 3"*. Không gợi ý
    thứ trang đã có (đã nhiều màu thì không "thêm màu").

  Đừng viết mọi thứ thành chữ 13px xám `#737373` liền một khối (Ưu, Nhược, Hợp khi nối đuôi, nút
  Chép chen giữa câu, một câu gợi ý gãy làm hai dòng): người xem thấy "màu chìm, cấu trúc loạn xạ".

  ```html
  <nav class="wf-bar" aria-label="Wireframe">
    <div class="wf-group">
      <span class="wf-label">Phương án</span>
      <span class="wf-set" data-wf-param="v">
        <a data-value="a" title="A · Lưới card (khuyên dùng)" data-recommended>A</a><a data-value="b" title="B · Danh sách + chi tiết">B</a><a data-value="c" title="C · Bảng">C</a>
      </span>
    </div>
    <span class="wf-set wf-flags"><a data-wf-toggle="gon" data-on="1" data-off="0">Gọn chữ</a><a data-wf-toggle="bolap" data-on="1" data-off="0">Bỏ lặp</a></span>
    <a class="wf-switch" data-wf-toggle="mau" data-on="mau" data-off="xam" role="switch">Màu <i></i></a>
    <details class="wf-menu">
      <summary><span>Kiểu:</span><b data-wf-current="kieu"></b><b data-wf-current="sac"></b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary>
      <!-- Màn trong app web: mười bộ mặt P13, bộ khuyên dùng có nhãn nhỏ "khuyên dùng" trong menu. Màn khác: flat, toi, noi. -->
      <!-- Phần Sắc (P17) chỉ ở màn trong app web; màn khác bỏ cả div data-wf-param="sac". -->
      <div class="wf-popover">
        <div class="wf-popover-set" data-wf-param="kieu"><a data-value="clean">Clean</a><a data-value="dark-sidebar">Dark Sidebar</a><a data-value="soft">Soft <small>khuyên dùng</small></a><a data-value="midnight">Midnight</a><a data-value="inset">Inset</a><a data-value="paper">Paper</a><a data-value="float">Float</a><a data-value="rail">Rail</a><a data-value="topbar">Topbar</a><a data-value="editorial">Editorial</a></div>
        <div class="wf-popover-set" data-wf-param="sac"><h4>Sắc</h4><a data-value="neutral">Neutral</a><a data-value="tinted">Tinted</a><a data-value="vivid">Vivid</a></div>
      </div>
    </details>
    <span class="wf-set" data-wf-param="nhan"><a data-value="cham" aria-label="Chàm"><i></i></a><a data-value="ngoc" aria-label="Xanh ngọc"><i></i></a><a data-value="cam" aria-label="Cam"><i></i></a></span>
    <span class="wf-set" data-wf-param="kho">
      <a data-value="desktop"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/></svg>Desktop</a>
      <a data-value="mobile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg>Mobile</a>
    </span>
    <span class="wf-set" data-wf-param="nav"><a data-value="menu">☰ Menu</a><a data-value="duoi">Thanh dưới</a></span>
    <details class="wf-menu">
      <summary><span>Trạng thái:</span><b data-wf-current="tt"></b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary>
      <div class="wf-popover" data-wf-param="tt"><a data-value="du-lieu">Có dữ liệu</a><a data-value="dang-tai">Đang tải</a><a data-value="rong">Rỗng</a><a data-value="loi">Lỗi</a></div>
    </details>
  </nav>
  <details class="wf-reason" data-wf-reason>
    <summary>
      <span class="wf-reason-name">A · Lưới card</span>
      <span class="wf-reason-tag">Khuyên dùng</span>
      <span class="wf-reason-why">Người dùng đến để so lương, nên lương đứng đầu mỗi dòng.</span>
      <span class="wf-reason-toggle"><span>Ưu, nhược</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span>
    </summary>
    <div class="wf-reason-body">
      <div class="wf-reason-cols">
        <section><h3><i data-tone="uu"></i>Ưu</h3><ul><li>…</li><li>…</li></ul></section>
        <section><h3><i data-tone="nhuoc"></i>Nhược</h3><ul><li>…</li></ul></section>
        <section><h3><i></i>Hợp khi</h3><p>…</p></section>
      </div>
      <div class="wf-reason-tips">
        <h3>Gợi ý góp ý</h3>
        <button type="button" data-copy="Tiêu đề đậm hơn">Tiêu đề đậm hơn<svg data-icon="chep" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg><svg data-icon="da-chep" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></button>
        …mỗi câu gợi ý một nút như trên…
      </div>
    </div>
  </details>
  <main id="wf-design">…khối có data-wf-block="1", "2"…</main>
  <style>
    .wf-bar { position: relative; z-index: 50; display: flex; align-items: center; gap: 24px; height: 56px;
      padding: 0 16px; overflow-x: auto; white-space: nowrap; background: #fff; border-bottom: 1px solid #e5e5e5;
      color: #737373; font: 14px/1 system-ui, -apple-system, sans-serif; }
    /* Màn hẹp thanh cuộn ngang: mép phải mờ để người duyệt biết còn nhóm (responsive.md, hàng cuộn ngang). */
    @media (max-width: 1279px) { .wf-bar { mask-image: linear-gradient(to right, #000 calc(100% - 32px), transparent); } }
    .wf-bar *, .wf-reason * { box-sizing: border-box; }
    .wf-group { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .wf-set { display: flex; align-items: center; gap: 4px; flex-shrink: 0; padding: 3px; border-radius: 10px; background: #f4f4f5; }
    .wf-set a { position: relative; display: inline-flex; align-items: center; gap: 6px; height: 30px; padding: 0 12px;
      border-radius: 7px; color: #737373; text-decoration: none; }
    .wf-set a:hover { color: #171717; }
    .wf-switch { display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0; color: #737373; text-decoration: none; }
    .wf-switch i { position: relative; width: 36px; height: 20px; border-radius: 10px; background: #e4e4e7; transition: background .15s; }
    .wf-switch i::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%;
      background: #fff; box-shadow: 0 1px 2px rgb(0 0 0 / .2); transition: translate .15s; }
    .wf-switch[aria-checked="true"] i { background: #171717; }
    .wf-switch[aria-checked="true"] i::after { translate: 16px 0; }
    .wf-set a[aria-current="page"], .wf-flags a[aria-pressed="true"] { background: #fff; color: #171717; font-weight: 500;
      box-shadow: 0 1px 2px rgb(0 0 0 / .08), 0 0 0 1px rgb(0 0 0 / .04); }
    .wf-bar svg { width: 16px; height: 16px; flex-shrink: 0; }
    /* Ô vuông trước chữ: hai nút bật tắt riêng, không phải chọn một trong hai. */
    .wf-flags a::before { content: ""; width: 12px; height: 12px; border: 1.5px solid #a3a3a3; border-radius: 3px; }
    .wf-flags a[aria-pressed="true"]::before { border-color: #171717; background: #171717 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E") center / 10px no-repeat; }
    body[data-gon="1"] [data-wf-gon], body[data-bolap="1"] [data-wf-lap] { display: none; }
    [data-wf-param="v"] a { justify-content: center; min-width: 32px; padding: 0 10px; }
    [data-wf-param="v"] a[data-recommended]::after { content: ""; position: absolute; top: 5px; right: 5px;
      width: 5px; height: 5px; border-radius: 50%; background: #4f46e5; }
    [data-wf-param="nhan"] a { padding: 0 8px; }
    [data-wf-param="nhan"] i { width: 14px; height: 14px; border-radius: 50%; background: currentColor; }
    /* Ba màu theo ngành, bảng ở brand-tokens.md. Mẫu là bộ "ngành khác". */
    [data-wf-param="nhan"] a[data-value="cham"] { color: #4f46e5; } [data-wf-param="nhan"] a[data-value="ngoc"] { color: #0f766e; }
    [data-wf-param="nhan"] a[data-value="cam"] { color: #c2410c; }
    .wf-menu { flex-shrink: 0; }
    .wf-menu summary { display: flex; align-items: center; gap: 6px; height: 36px; padding: 0 10px; border-radius: 8px;
      cursor: pointer; list-style: none; }
    .wf-menu summary::-webkit-details-marker { display: none; }
    .wf-menu summary:hover, .wf-menu[open] summary { background: #f4f4f5; }
    .wf-menu b { color: #171717; font-weight: 500; }
    .wf-popover { position: fixed; z-index: 60; display: grid; gap: 4px; min-width: 168px; padding: 4px; background: #fff;
      border: 1px solid #e5e5e5; border-radius: 10px; box-shadow: 0 8px 24px rgb(0 0 0 / .08); }
    .wf-popover a { display: flex; align-items: center; height: 34px; padding: 0 10px; border-radius: 6px; color: #404040; text-decoration: none; }
    .wf-popover a:hover, .wf-popover a[aria-current="page"] { background: #f4f4f5; color: #171717; }
    .wf-popover a[aria-current="page"] { font-weight: 500; }
    .wf-popover-set { display: grid; gap: 4px; }
    .wf-popover-set + .wf-popover-set { margin-top: 4px; padding-top: 4px; border-top: 1px solid #f0f0f0; }
    .wf-popover h4 { margin: 0; padding: 8px 10px 4px; color: #737373; font: 500 12px/1 system-ui, -apple-system, sans-serif; }
    [data-wf-current="sac"]::before { content: "· "; }
    :root[data-sac="neutral"] [data-wf-current="sac"] { display: none; }
    .wf-reason { border-bottom: 1px solid #e5e5e5; background: #fafafa; color: #404040; font: 13px/1.5 system-ui, -apple-system, sans-serif; }
    .wf-reason summary { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px; min-height: 44px; padding: 8px 16px;
      cursor: pointer; list-style: none; }
    .wf-reason summary::-webkit-details-marker { display: none; }
    .wf-reason-name { min-width: 0; overflow: hidden; color: #171717; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
    .wf-reason-tag { flex-shrink: 0; height: 20px; padding: 0 8px; border-radius: 10px; background: #eef2ff; color: #4338ca;
      font-size: 12px; font-weight: 500; line-height: 20px; }
    .wf-reason-why { flex: 1; min-width: 0; overflow: hidden; color: #525252; text-overflow: ellipsis; white-space: nowrap; }
    .wf-reason[open] .wf-reason-why { white-space: normal; }
    .wf-reason-toggle { display: inline-flex; flex-shrink: 0; align-items: center; gap: 4px; height: 28px; margin-left: auto;
      padding: 0 8px; border-radius: 6px; color: #171717; font-weight: 500; }
    .wf-reason summary:hover .wf-reason-toggle { background: #f0f0f0; }
    .wf-reason-toggle svg { width: 16px; height: 16px; transition: rotate .15s; }
    .wf-reason[open] .wf-reason-toggle svg { rotate: 180deg; }
    /* minmax(0, 1fr) và min(240px, 100%): thiếu thì ở 375 lưới cột tính theo max-width, tràn ngang. */
    .wf-reason-body { display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px; padding: 4px 16px 16px; }
    .wf-reason-cols { display: grid; max-width: 1120px; grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr)); gap: 16px 32px; }
    .wf-reason h3 { display: flex; align-items: center; gap: 6px; margin: 0 0 4px; color: #171717; font-size: 12px; font-weight: 600; }
    .wf-reason h3 i { width: 6px; height: 6px; border-radius: 50%; background: #a3a3a3; }
    .wf-reason h3 i[data-tone="uu"] { background: #16a34a; }
    .wf-reason h3 i[data-tone="nhuoc"] { background: #d97706; }
    .wf-reason ul { display: grid; gap: 2px; margin: 0; padding-left: 16px; }
    .wf-reason li::marker { color: #a3a3a3; }
    .wf-reason p { margin: 0; }
    .wf-reason-tips { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding-top: 12px; border-top: 1px solid #ebebeb; }
    .wf-reason-tips h3 { margin: 0 4px 0 0; }
    .wf-reason-tips button { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid #e5e5e5;
      border-radius: 8px; background: #fff; color: #262626; font: inherit; white-space: nowrap; cursor: pointer; }
    .wf-reason-tips button:hover { border-color: #d4d4d4; background: #f5f5f5; }
    .wf-reason-tips button svg { width: 14px; height: 14px; color: #737373; }
    .wf-reason-tips button [data-icon="da-chep"], .wf-reason-tips button[data-copied] [data-icon="chep"] { display: none; }
    .wf-reason-tips button[data-copied] [data-icon="da-chep"] { display: block; color: #16a34a; }
    .wf-reason :focus-visible { outline: 2px solid #4f46e5; outline-offset: 2px; }
    @media (max-width: 767px) {
      .wf-reason-why { order: 1; flex-basis: 100%; }
      /* Chỉ còn mũi tên để tên và nhãn giữ một dòng; chữ vẫn còn cho trình đọc màn hình. */
      .wf-reason-toggle span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
      .wf-reason-tips h3 { flex-basis: 100%; }
    }
    /* Trong layer: rule ngoài layer thắng mọi utility Tailwind, `sticky` của sidebar thành `relative`, sidebar
       trôi khi cuộn. Không Tailwind thì class `sticky` của dự án vẫn thắng rule trong layer. */
    @layer base { [data-wf-block] { position: relative; } }
    [data-wf-block]::before { content: attr(data-wf-block); position: absolute; top: 4px; left: 4px; z-index: 5;
      display: grid; place-items: center; width: 18px; height: 18px; border-radius: 9px; background: #1f1f1f; color: #fff; font-size: 11px; }
    [data-wf-block][data-wf-block-out]::before { top: auto; bottom: 100%; } /* số đè chữ thì lên trên mép khối */
    body[data-frame] .wf-bar, body[data-frame] .wf-reason { display: none; }
    body:not([data-kho="mobile"]) [data-wf-param="nav"] { display: none; }
    /* Màu nhấn đổi trên :root, cùng chỗ khai token: var(--primary) khai ở :root đã tính xong tại :root, đổi ở
       body thì viền focus, ring, hover vẫn màu cũ. */
    :root[data-mau="xam"] { --primary: #2c2c2c; } /* nấc Xám: bỏ màu nhấn, cả màu trạng thái */
    :root:not([data-mau="xam"])[data-nhan="cham"] { --primary: #4f46e5; } /* …ngoc #0f766e, cam #c2410c tương tự */
    /* Kiểu: đổi token và rule bề mặt theo khối P, không vẽ lại khối. Đổi nền thì đổi cả chữ (P3, P10). */
    :root:not([data-mau="xam"]):is([data-kieu="toi"], [data-kieu="midnight"]) { color-scheme: dark; --background: #09090b; --surface: #18181b;
      --foreground: #f4f4f5; --muted: #a1a1aa; --border: rgb(255 255 255 / .1); }
    :root:not([data-mau="xam"]):is([data-kieu="noi"], [data-kieu="soft"]) { --border: transparent; } /* …kèm thang bóng bốn bậc của P7 */
    /* Bộ mặt P13: font đổi theo bộ, nạp sẵn cả ba font. Dark Sidebar chép khối .force-dark của tokens.css vào .wf-sidebar. */
    :root:not([data-mau="xam"])[data-kieu="soft"] { --app-font: "Be Vietnam Pro", ui-sans-serif, system-ui, sans-serif; }
    :root:not([data-mau="xam"])[data-kieu="midnight"] { --app-font: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif; }
    :root:not([data-mau="xam"])[data-kieu="dark-sidebar"] .wf-sidebar { color-scheme: dark; /* …nguyên khối token .force-dark */ }
    /* Inset đổi khung, chạy cả ở nấc Xám. Số đo theo mục Khung bọc của layouts/app/shell-inset.md. */
    :root[data-kieu="inset"] .wf-sidebar { background: transparent; border: 0; }
    :root[data-kieu="inset"] .wf-sidebar a:hover { background: color-mix(in srgb, var(--foreground) 4%, transparent); }
    :root[data-kieu="inset"] .wf-sidebar a[aria-current="page"] { background: var(--secondary-hover); }
    @media (min-width: 1024px) {
      :root[data-kieu="inset"] .wf-main { margin: 8px 8px 8px 0; border: 1px solid var(--border); border-radius: 12px;
        background: var(--surface); overflow: hidden; }
    }
    /* Paper đổi khung, chạy cả ở nấc Xám: một nền trắng, ranh giới bằng đường kẻ đậm hơn --border. */
    :root[data-kieu="paper"] body, :root[data-kieu="paper"] .wf-main { background: var(--surface); } /* không đè --background: ô nền nhạt bên trong sẽ tan vào trắng */
    :root[data-kieu="paper"] .wf-sidebar { border-right: 1px solid var(--border-strong); }
    :root[data-kieu="paper"] .wf-main > header { border-bottom-color: var(--border-strong); }
    /* Float, Rail, Topbar đổi khung. Số đo theo mục Sidebar nổi, Dải icon, Menu ngang của layouts/app.md. */
    @media (min-width: 1024px) {
      :root[data-kieu="float"] .wf-sidebar { margin: 8px 0 8px 8px; height: calc(100dvh - 16px); border: 1px solid var(--border);
        border-radius: 12px; background: var(--surface); }
      :root[data-kieu="float"] .wf-main > header { margin-top: 8px; background: transparent; border-bottom: 0; }
      :root[data-kieu="rail"] .wf-sidebar { width: 64px; }
      :root[data-kieu="rail"] .wf-sidebar .wf-label { opacity: 0; } /* biến thể có nhãn: width 80px, a { flex-direction: column }, nền chọn trên ô icon */
    }
    /* Soft mở (canvas): .wf-sidebar, header trong suốt; a[aria-current] nền --surface + bóng nhẹ nhất của P7. */
    .wf-topnav { display: none; }
    :root[data-kieu="topbar"] .wf-sidebar { display: none; }
    @media (min-width: 768px) { :root[data-kieu="topbar"] .wf-topnav { display: flex; } }
    /* Sắc (P17): bản thiết kế gắn hook, CSS tô theo nấc, chỉ ở nấc Màu. :root của wireframe khai sẵn khối Sắc
       của tokens.css (--cat-1…6, --accent-to); --accent-to đổi theo nhóm Nhấn, đúng bảng Gradient nhấn. */
    :root[data-nhan="cham"] { --accent-to: #9333ea; } /* …mỗi màu của nhóm Nhấn một dòng, theo brand-tokens.md */
    [data-cat], [data-level] { background: var(--background); color: var(--muted); } /* Neutral: ô xám */
    .wf-dot { display: none; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
    :root:not([data-mau="xam"]):is([data-sac="tinted"], [data-sac="vivid"]) {
      & [data-cat="1"] { background: color-mix(in srgb, var(--cat-1) 10%, var(--surface)); color: var(--cat-1); } /* …2, 3, 4 tương tự */
      & [data-level="high"] { background: var(--error-bg); color: var(--error-strong); }
      & [data-level="mid"] { background: var(--warning-bg); color: var(--warning); }
      & [data-alert] { color: var(--error-strong); }
      & .wf-dot { display: inline-block; }
      & [data-now] { box-shadow: inset 2px 0 0 var(--primary); }
    }
    :root:not([data-mau="xam"])[data-sac="vivid"] {
      & [data-wf-cta] { background-image: linear-gradient(to right, var(--primary), var(--accent-to)); }
      & [data-hero] { border: 1px solid transparent;
        background: linear-gradient(var(--surface), var(--surface)) padding-box, linear-gradient(to right, var(--primary), var(--accent-to)) border-box; }
      & [data-wash] { background-image: linear-gradient(to bottom, color-mix(in srgb, var(--primary) 8%, transparent), transparent 96px); }
      & [data-peak] { background-image: linear-gradient(to top, var(--primary), var(--accent-to)); }
    }
    /* Token suy từ màu nhấn, tính lại theo nấc (brand-tokens.md). Chỉ ở nấc Xám hoặc khi có nhóm Nhấn: dự án đã có
       brand thì ở nấc Màu giữ nguyên token của dự án. */
    :root[data-mau="xam"], :root:has([data-wf-param="nhan"]) {
      --primary-hover: color-mix(in oklab, var(--primary) 85%, var(--background)); /* lệch về phía nền */
      --primary-light: color-mix(in srgb, var(--primary) 5%, transparent);
      --ring-focus: color-mix(in srgb, var(--primary) 10%, transparent);
      --border-focus: var(--primary);
      --chart-fill: var(--primary);
    }
    .wf-drawer { position: fixed; inset: 0 auto 0 0; width: 280px; translate: -100% 0; transition: translate .35s; }
    body[data-menu-open] .wf-drawer { translate: 0 0; }
  </style>
  <script>
    const params = new URLSearchParams(location.search);
    // Mặc định: phương án khuyên dùng, đủ nội dung, Xám, kiểu khuyên dùng (màn app: bộ mặt P13; màn khác: flat),
    // màu nhấn gợi ý đầu, Desktop, ☰, Có dữ liệu.
    const state = { v: "a", gon: "0", bolap: "0", mau: "xam", kieu: "soft", sac: "neutral", nhan: "cham", kho: "desktop", nav: "menu", tt: "du-lieu", uu: "0" };
    for (const key of Object.keys(state)) state[key] = params.get(key) || state[key];
    Object.assign(document.body.dataset, state);
    Object.assign(document.documentElement.dataset, { mau: state.mau, kieu: state.kieu, sac: state.sac, nhan: state.nhan }); // token đổi trên :root
    if (params.has("frame")) document.body.dataset.frame = "1";
    const linkTo = (changes) => `?${new URLSearchParams({ ...state, ...changes })}`;
    // Gọi lại mỗi khi state đổi tại chỗ (khung lý do mở, đóng), để link nào cũng mang state mới.
    function updateLinks() {
      for (const set of document.querySelectorAll("[data-wf-param]")) {
        for (const link of set.querySelectorAll("a")) {
          // Kiểu khác Flat, Clean và các kiểu đổi khung bật luôn nấc Màu: ở nấc Xám kiểu không hiện gì khác.
          const isStyleLink = (set.dataset.wfParam === "kieu" && !["flat", "clean", "inset", "paper", "float", "rail", "topbar", "editorial"].includes(link.dataset.value))
            || (set.dataset.wfParam === "sac" && link.dataset.value !== "neutral"); // Sắc cũng chỉ hiện ở nấc Màu
          link.href = linkTo({ [set.dataset.wfParam]: link.dataset.value, ...(isStyleLink && { mau: "mau" }) });
          if (state[set.dataset.wfParam] !== link.dataset.value) continue;
          link.setAttribute("aria-current", "page");
          const currentLabel = document.querySelector(`[data-wf-current="${set.dataset.wfParam}"]`);
          // Chỉ lấy tên, bỏ nhãn nhỏ "khuyên dùng" trong menu Kiểu.
          if (currentLabel) currentLabel.textContent = link.firstChild.textContent.trim();
        }
      }
      // Công tắc Màu, nút Gọn chữ, Bỏ lặp: một link, bấm là sang nấc kia.
      for (const toggle of document.querySelectorAll("[data-wf-toggle]")) {
        const param = toggle.dataset.wfToggle;
        const isOn = state[param] === toggle.dataset.on;
        toggle.setAttribute(toggle.getAttribute("role") === "switch" ? "aria-checked" : "aria-pressed", String(isOn));
        toggle.href = linkTo({ [param]: isOn ? toggle.dataset.off : toggle.dataset.on });
      }
    }
    updateLinks();
    // Khung lý do giữ đóng mở khi đổi lựa chọn: ghi vào URL (người dùng chép link cũng giữ), dựng lại link.
    const reasonBox = document.querySelector("[data-wf-reason]");
    if (reasonBox) {
      reasonBox.open = state.uu === "1";
      reasonBox.addEventListener("toggle", () => {
        state.uu = reasonBox.open ? "1" : "0";
        history.replaceState(null, "", linkTo({}));
        updateLinks();
      });
    }
    // Menu Kiểu, Trạng thái: thanh cuộn ngang cắt mất khối absolute, nên menu là fixed, đặt ngay dưới nút.
    const barMenus = [...document.querySelectorAll(".wf-menu")];
    for (const barMenu of barMenus) {
      barMenu.addEventListener("toggle", () => {
        const summaryRect = barMenu.querySelector("summary").getBoundingClientRect();
        Object.assign(barMenu.querySelector(".wf-popover").style, { top: `${summaryRect.bottom + 6}px`, left: `${summaryRect.left}px` });
      });
    }
    document.addEventListener("click", (event) => {
      for (const barMenu of barMenus) if (!barMenu.contains(event.target)) barMenu.open = false;
    });
    if (state.kho === "mobile" && !params.has("frame")) {
      const frameSource = `?${new URLSearchParams({ ...state, kho: "desktop", frame: "1" })}`;
      document.getElementById("wf-design").innerHTML =
        `<div style="display:grid;place-items:center;padding:24px"><iframe src="${frameSource}" title="Mobile" style="width:375px;max-width:100%;height:812px;border:1px solid #ddd;border-radius:24px;background:#fff"></iframe></div>`;
    }
    // ☰ trong khung mobile mở panel trượt; bấm lớp phủ hay Esc thì đóng.
    for (const toggle of document.querySelectorAll("[data-wf-menu]")) {
      toggle.addEventListener("click", () => document.body.toggleAttribute("data-menu-open"));
    }
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      document.body.removeAttribute("data-menu-open");
      for (const barMenu of barMenus) barMenu.open = false;
    });
    for (const button of document.querySelectorAll("[data-copy]")) {
      button.addEventListener("click", async () => {
        await navigator.clipboard.writeText(button.dataset.copy);
        button.setAttribute("data-copied", "");
        setTimeout(() => button.removeAttribute("data-copied"), 1500);
      });
    }
    // Số khối đè chữ hay icon thì lên trên mép khối. Gọi sau mỗi lần vẽ lại, sau hai khung hình: Tailwind bản
    // trình duyệt dựng CSS sau khi HTML vào trang, đo ngay thì mọi khối chưa có layout, số nào cũng "đè".
    function placeBlockNumbers() {
      const isOverlap = (first, second) => first.left < second.right && first.right > second.left && first.top < second.bottom && first.bottom > second.top;
      for (const block of document.querySelectorAll("[data-wf-block]")) {
        const blockRect = block.getBoundingClientRect();
        if (!blockRect.width) continue;
        // Bản chép trên bảng luồng thu nhỏ (zoom 0.7, J1): số và chữ cùng nhỏ theo, nên đo theo tỉ lệ thật của khối.
        const scale = blockRect.width / block.offsetWidth;
        const numberRect = { left: blockRect.left + 4 * scale, top: blockRect.top + 4 * scale, right: blockRect.left + 22 * scale, bottom: blockRect.top + 22 * scale };
        const contentRects = [...block.querySelectorAll("svg, img")].map((node) => node.getBoundingClientRect());
        const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          if (!node.textContent.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(node);
          contentRects.push(...range.getClientRects());
        }
        block.toggleAttribute("data-wf-block-out", contentRects.some((rect) => rect.width > 0 && isOverlap(rect, numberRect)));
      }
    }
    requestAnimationFrame(() => requestAnimationFrame(placeBlockNumbers));
    addEventListener("resize", placeBlockNumbers);
    // Wireframe app điện thoại: gọi lại sau buildBoard, đo cả các bản chép trên bảng luồng (J1).
  </script>
  ```

  Dự án đã có màu brand thì bỏ nhóm Nhấn; đã có logo thì bỏ nhóm Logo; app từ 6 mục chính thì bỏ nhóm Nav. Thanh dưới vẽ
  sẵn trong trang, chỉ hiện khi `body[data-kho="mobile"][data-nav="duoi"]` (trong khung là
  `frame=1` kèm `nav=duoi`).

- **Gửi link bấm được cho từng phương án**, không chỉ đường dẫn ảnh. Chạy một server tĩnh nền
  trên thư mục wireframe (`python3 -m http.server <cổng> -d "$TMPDIR/evon-design"`, chạy nền),
  rồi liệt kê mỗi phương án một dòng dạng link đầy đủ, người dùng bấm hoặc chép vào trình
  duyệt được ngay:

  ```
  - A · Lưới card + hàng lọc gọn (khuyên dùng): http://localhost:<cổng>/wireframe.html?v=a
  - B · Danh sách + bản đồ: http://localhost:<cổng>/wireframe.html?v=b
  - C · Bảng: http://localhost:<cổng>/wireframe.html?v=c
  ```

  Kèm một dòng: *"Mỗi trang có thanh trên cùng: bật Gọn chữ, Bỏ lặp, bật Màu, xem Mobile, xem
  Rỗng / Lỗi, và khung lý do có sẵn câu góp ý để chép."*

  Mở thử từng link (probe đã mở là được) trước khi gửi. Không chạy được server thì ghi đường
  dẫn tệp `file://…/wireframe.html` và nói tham số `?v=` chọn phương án.

Kết bằng *"Chọn A, B hay C, kèm Gọn chữ, Bỏ lặp nếu muốn (gửi lại link đang xem là đủ). Góp ý
theo số khối cũng được."* Bản dựng theo nấc Màu. Dừng chờ.

Người dùng trả lời `ok`, `dựng luôn` mà không ghi chữ cái nào thì dựng **phương án khuyên dùng**,
màu và nhấn theo mức đã khuyên, không hỏi lại.
