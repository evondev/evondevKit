# Thiết kế từ đầu như một designer — luật U

**Nhánh mặc định** (chủ dự án chốt): mọi đề dựng hay làm lại một màn trở lên đều
vào đây, tiếng Việt hay tiếng Anh, sản phẩm mới hay màn đã có. Chỉ không vào khi đề nói rõ lối
khác (bảng câu 1 của `SKILL.md`): soi, phân tích sản phẩm chưa dựng (`U6`), giữ brand, dựng lại theo gu skill, refactor, dựng
luôn, hoặc việc nhỏ hơn một màn.

Khác nhánh `V` (`review.md`): `V` giữ khung trang, sửa lỗi và làm gọn. Kết quả là bản hi-fi
sạch hơn của **đúng wireframe cũ**. Nhánh `U` bắt đầu từ câu *"người dùng đến màn này để
làm gì"*, nên được đổi cả khung: cái gì đứng đầu, lọc nằm đâu, card nói gì, có chế độ xem
nào. Bản dựng lại theo `V` sạch hết lỗi đo được mà người xem vẫn nói
"nhìn không khác gì bản cũ, vẫn cần người làm UX".

Hai cổng chờ của nhánh này là hai chỗ duy nhất skill dừng hỏi. Đề ghi sẵn đủ cho cổng nào
(brief đã rõ, "chọn A luôn") thì qua cổng đó không dừng.

**"Dựng luôn" thì không vẽ wireframe** (vẽ wireframe tốn nhiều token, chủ dự án chốt).
Đề có "dựng luôn", "just build it", hoặc người dùng trả lời `dựng luôn` ở cổng 1: vẫn làm `U1`,
`U2` và chọn phương án `U3` sẽ khuyên dùng, **trong đầu, không gửi, không dừng**, rồi dựng thẳng
theo phương án đó (`U4`), màu theo nấc sẽ khuyên (dự án đã có UI thì màu của dự án), bộ mặt theo bộ sẽ khuyên (`P13`, màn trong app web chưa có phong cách).
**Màn đã có sẵn cũng vậy** (chủ dự án chốt): dựng lại theo phương án khuyên dùng, đổi khung được,
không chỉ rà màn cũ theo mục kiểm. Rà mà giữ khung là lối giữ brand hay soi (`review.md`), đề phải nói rõ. Lúc giao ghi một dòng: *"Bố cục: [phương án]
vì [việc chính]. Muốn xem các hướng khác thì nhắn `vẽ wireframe`."* và dòng bộ mặt theo mẫu của `P13`. Lúc gửi brief ở cổng 1, thêm một dòng cuối: *"Muốn bỏ wireframe, dựng luôn thì
trả lời `dựng luôn`."* (tiếng Anh: *"Reply `just build it` to skip the wireframes."*)

---

## Bốn bước, hai cổng

| Bước | Ra cái gì | Cổng |
| --- | --- | --- |
| `U1` Brief | Một khối ngắn: sản phẩm, người dùng, việc chính, nền tảng | Gộp với `U2`, **cổng 1** |
| `U2` Việc chính của từng màn | Bảng: đến để làm gì, so sánh bằng gì, hành động cuối, quy ước loại sản phẩm | **Cổng 1**: người dùng sửa hoặc trả lời `ok` |
| `U3` Wireframe | 2–3 phương án bố cục khác nhau thật, nội dung thật, có ảnh; một thanh công cụ: phương án, gọn chữ, bỏ lặp, màu, desktop / mobile, trạng thái, khung lý do; tự rà đủ như lối rà trước khi gửi | **Cổng 2**: người dùng chọn |
| `U4` Dựng thật | Code theo phương án đã chọn, probe tới khi danh sách `P` trống | Như cổng 3 của `checklist.md` |

Chưa qua cổng 2 thì **không đụng file nào của dự án**. Wireframe và ảnh để ở
`$TMPDIR/evon-design/`.

---

## U1. Brief: đọc trước, hỏi sau ⚑

- **Chạy audit câu 2 của `SKILL.md` trước khi viết brief**, cho mọi dự án, sản phẩm mới hay
  đã có UI: stack, component có sẵn, phong cách. Dòng `Audit:` đứng đầu tin cổng 1. Bỏ audit
  thì wireframe vẽ control mà dự án đã có kiểu khác, `U4` dựng ra app thứ hai.
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
- Cột cuối: đọc `industry-patterns.md` trước. Ngành có trong đó thì lấy quy ước của màn đó,
  ghi nguồn *"bảng ngành, 4/5"*. Màn hay ngành bảng chưa có thì **tra thật** cách vài sản phẩm
  cùng loại đang làm (tìm web nếu có công cụ), ghi thành quy ước, không ghi tên sản phẩm vào
  code hay vào file của dự án. Không tra được thì
  ghi *"theo trí nhớ, cần kiểm"*. Quy ước số đông thắng gu riêng.
- Điểm khác biệt ở `U1` phải **hiện trên màn chính**, không chỉ nằm trong bộ lọc.
- **Sản phẩm mới, hoặc các màn trong phạm vi nằm trên cùng một luồng**: thêm một dòng **Luồng**
  dưới bảng: các bước tới việc chính đầu tiên, số màn, số ô phải điền (`flows.md`, `O2`), rồi
  bản nháp **sơ đồ luồng màn** (`O7`): mỗi dòng một lần chuyển màn, gồm cả nhánh Bỏ qua, Lỗi,
  Lần sau. `U3` vẽ cả màn lần đầu chưa có dữ liệu (`O1`), `U4` dựng thêm trạng thái vừa xong
  của hành động chính (`O3`).

Gửi `U1` và `U2` trong **một** tin, kết bằng *"Đúng thì trả lời `ok`, sai dòng nào thì sửa
dòng đó."* Dừng chờ.

## U3. Wireframe: 2–3 phương án khác nhau thật ⚑

**Nằm ở `wireframe.md`**: 2–3 phương án khác nhau thật, mặc định xám, icon thật, dựng bằng chính
token và component của bản dựng, thanh công cụ, cổng 2. Mở file đó **sau cổng 1**, lúc vẽ. `U6`
không mở. Lối dựng luôn không đọc cả file: màu nhấn và bộ mặt "sẽ khuyên" thì grep đoạn nhóm
`Nhấn` và nhóm `Kiểu` của thanh công cụ trong `wireframe.md`.

---

## U4. Dựng thật ⚑

- **Dự án đã có UI:** giữ brand theo bảng vai màu (`review.md`, chế độ dựng lại giữ brand),
  dáng theo gu skill: đi hết bảng **"Dáng lấy từ skill, không từ CSS cũ"** trong `review.md`
  (dropdown, checkbox, viền, scrollbar, nút header…), lúc giao có dòng `Dáng:`. Giữ brand
  chỉ là giữ màu theo vai, logo, font. Khung trang theo phương án đã chọn. Logic, handler, dữ liệu không đụng;
  thứ cần dữ liệu mới thì để prop và handler rỗng, lúc giao liệt kê.
- **Sản phẩm mới:** audit câu 2 đã chạy ở `U1`; đi tiếp câu 3 của mục 0 trong `SKILL.md`,
  rồi dựng theo phương án đã chọn thay cho bố cục mặc định của câu 4. Chưa có logo thì dựng
  `ProductBrand` với dấu đã chọn ở nhóm Logo, kèm favicon từ cùng dấu (`components/logo.md`).
- **Ghi `DESIGN.md`** (`system.md`, `D10`) khi dựng xong: brief của `U1`, bộ mặt, màu nhấn,
  phương án đã chọn của màn này. Có file rồi thì sửa tại chỗ, thêm dòng Màn đã dựng.
- **Các màn nằm trên một luồng:** sửa sơ đồ luồng màn `O7` (`flows.md`) theo bản đã dựng (nhãn
  nút, route thật), chạy phép thử của `O7`, rồi giao sơ đồ kèm mục **Cần bạn nối** ghi số
  dòng. Ghi sơ đồ vào `DESIGN.md` mục Luồng.
- **Đề nhiều hơn một màn:** chốt hợp đồng nguyên tố `D1` (`system.md`) ở đây, trước khi dựng
  màn đầu tiên. Wireframe đã chọn nói khung, bảng `D1` nói control nào dùng kiểu nào cho cả bộ.
- Ráp bằng mẫu của skill (`SKILL.md` mục 2). Chạy probe `--sweep --wireframe "<link phương án
  đã chọn>&mau=mau"` tới khi danh sách `P` trống, tối đa ba vòng (vòng hai trở đi thêm
  `--dynamic-widths` theo dòng "Vòng sửa sau" của báo cáo, cổng 3). **Mục probe về dáng cũng sửa**, dù không nằm trong `P`: hàng nút
  header không đồng cỡ, vòng focus, control gốc, lớp nổi không chuyển động, viền trang trí
  đậm, thanh cuộn. Ở `U4` dáng là của skill, nên đó không phải "Lệch hệ để tuỳ" như lúc soi.
  **Danh sách `P` tính cả khung app trên route đó** (header, sidebar,
  thanh dưới, menu thông báo): người dùng nhìn cả màn, không chỉ phần mới dựng. Khung app lỗi
  thì sửa luôn, sửa ở component dùng chung và nói nó đổi cả các màn khác. Trang
  dựng lại đúng bố cục mà header vẫn bị bóp thì người xem vẫn chấm "xấu".
- **Wireframe vẽ khung app (header, sidebar) thì khung app cũng là phương án**: dựng lại
  component dùng chung theo wireframe (số mục, mục nào nút đặc, mục nào chỉ icon), dáng theo
  gu, màu theo vai màu. Không để nguyên header cũ rồi chỉ vá cho khỏi rớt dòng.
- **Dựng đúng wireframe đã chọn, không bịa.** Wireframe ở nấc Màu là bản đặc tả, đã dùng token
  và component của bản dựng (`U3`): bản dựng là nó viết lại bằng code dự án. **Không thêm** mục, dòng chữ, badge, nút, khối mà wireframe không có;
  **không bỏ** thứ wireframe có; không đổi thứ tự. Thấy wireframe thiếu gì thì hỏi hoặc ghi
  một dòng lúc giao, không tự chêm vào.
  **Người dùng chọn kèm Gọn chữ, Bỏ lặp** thì bản dựng là wireframe khi đã bật công tắc đó: phần
  mang `data-wf-gon`, `data-wf-lap` không dựng, link `--wireframe` giữ `&gon=1`, `&bolap=1` để probe so
  đúng bản đã chọn.
- **Khoảng cách, cỡ, màu, chữ chép nguyên từ wireframe, tới từng px** ⚑. Padding của khung trang
  và từng khối, `gap` giữa các khối và trong hàng, chiều cao header, ô tìm, nút, chip, bề rộng
  sidebar, cỡ ảnh card, cỡ, độ đậm, dòng cao của chữ, cỡ icon; màu chữ, nền, viền theo token
  wireframe đã dùng. Chữ cũng chép nguyên: tiêu đề, placeholder, câu đếm kết quả, dòng cuối danh
  sách, nhãn nút. Cách làm: mở file wireframe, **với từng khối chép chuỗi class sang bản dựng**
  (wireframe đã viết bằng class và token của dự án, `U3`), không viết lại theo trí nhớ hay theo
  thói quen của dự án.
  - **Khung trang có sẵn của dự án (container, layout, `PageShell`) padding khác wireframe thì
    wireframe thắng**: đổi padding ở khung đó (dùng chung thì nói nó đổi các màn khác, như khung
    app ở dòng trên), không để khung cũ đẩy cả trang lệch. Đây là chỗ lệch hay gặp nhất.
  - Giá trị wireframe không có trong thang spacing của dự án thì dùng đúng px đó (`pt-[18px]`),
    không làm tròn sang bậc gần nhất: làm tròn là lệch vài px ở mỗi khối, cộng dồn xuống cuối trang.
  - **Chạy probe kèm `--wireframe "<link phương án đã chọn>&mau=mau"`** (link `U3`, server đã tắt
    thì `file://$TMPDIR/evon-design/wireframe.html?v=<chữ cái>&mau=mau`). Probe mở cả hai ở 1440 và
    375, neo theo chữ, placeholder, icon, báo **đúng khoảng lệch** (*"«Phòng trọ» → ô tìm: bản dựng
    33px, wireframe 16px"*), cỡ chữ, độ đậm, cỡ icon khác, màu chữ, màu icon, nền khác (gom theo
    cặp màu, một token sai là một dòng), chữ và icon thiếu hay thêm. Thiếu `mau=mau` thì probe
    không so màu, vì nấc Xám cố ý tắt màu nhấn. Các mục đó vào danh sách
    `P`, sửa tới khi trống như mọi mục `P`. Chỉ được lệch khi người dùng dặn hoặc dữ liệu thật khác
    wireframe (chữ dài hơn nên thêm dòng); lúc giao ghi từng chỗ.

  Lệch vài px mỗi khối, đổi chữ đếm, đổi placeholder, mất dòng cuối danh sách thì kéo thanh so
  sánh wireframe với bản dựng qua lại là mọi khối nhảy.
- **Mục điều hướng trỏ tới màn ngoài đề** (sidebar có "Bệnh nhân" mà đề chỉ xin hồ sơ một người):
  màn đó chưa qua `U2`, chưa có wireframe, nên không tự nghĩ bố cục. Dựng tối giản theo khuôn mặc
  định của skill cho loại màn đó (danh sách thì "Danh sách có bộ lọc" trong `layouts/app/filtered-list.md`: ô tìm,
  dòng theo `components/list-row.md` có giá trị so sánh bên phải), rồi ghi một dòng lúc giao:
  *"Màn [X] ngoài đề, dựng tạm để menu không dẫn vào trang trống; muốn làm thật thì nhắn."* Đừng tự
  nghĩ bố cục: ra cột tên + mã rộng 1500px, nửa phải trống, không ô tìm, không giá trị so sánh.
- **Đối chiếu wireframe từng khối trước khi giao.** Mở ảnh wireframe đã chọn cạnh ảnh 1440
  của bản dựng, đi từng khối (header, sidebar, hàng lọc, danh sách, panel): số mục, thứ tự,
  mục nào nút đặc, mục nào chỉ icon, thứ gì wireframe đã bỏ. Khoảng cách và chữ thì đã có
  phần so của probe `--wireframe` (trên), mắt lo phần probe không neo được: khối không chữ, ảnh. Khác chỗ nào thì sửa, hoặc ghi
  một dòng vì sao lệch (thiếu dữ liệu, người dùng dặn). Màu thì theo "Mỗi vai đúng một mã
  màu" trong `review.md`: wireframe xám không nói màu, nhưng bản dựng phải ăn nhập từ viền
  tới brand. Tin giao có bảng *"Đối chiếu wireframe"*: khối, wireframe có gì, bản dựng có
  gì, khớp hay lý do lệch. Kèm số dòng chữ mỗi mục ở hai bên (probe "mục lặp dày chữ").
- **Dựng xong chạy một lượt làm gọn** trên các khối mới **và khung app của route**: `V1b` và `V1c` trong `review.md`
  (card cao thấp theo dòng có dòng không, link trông như chữ thường, nửa khối trống ở màn
  rộng). Sửa luôn, không đưa bảng: người dùng đã chọn phương án rồi.
- **Thứ không được tự sửa thì nêu ra, đừng giữ im lặng** ⚑ (dự án đã có UI). Lượt làm gọn chỉ
  sửa dáng và sắp lại. Các dòng `V1b` loại bỏ, ẩn, gộp thông tin, gom màu trang trí, chỗ
  vai màu tranh nhau (badge nhiều màu nặng hơn giá), và mọi chỗ **nhận diện** trông xấu theo
  `V1` trong `review.md` (màu vai, font, logo, khối màu đậm) là quyết định sản phẩm và nhận diện: bản
  dựng giữ nguyên, nhưng tin giao có mục **"Còn thấy"**, tối đa năm dòng đánh số. Mỗi dòng
  một vấn đề người dùng cuối vấp kèm hướng sửa, nói bằng thứ bậc chứ không bằng màu
  (`V1b`, "Không phải lối vòng để đổi màu"): *"1. Card nào cũng có badge, năm màu đè trên
  ảnh, mắt dừng ở badge trước giá. Chỉ giữ badge ở phòng khác đi (giảm giá, đã xác thực)."*
  Kết bằng *"Muốn sửa dòng nào thì trả lời số, ví dụ `sửa 1, 3`."* Không thấy gì thì ghi
  "Còn thấy: không". Đây không phải cổng: bản dựng đã giao xong, người dùng trả lời hay không
  tuỳ họ. **Lỗi dáng mà skill đã có luật thì sửa trước khi giao, không đẩy vào "Còn thấy"**:
  mục chỉ dành cho thứ bản dựng không được tự quyết (ví dụ hàng đếm 375px cắt mục cuối không mép
  mờ theo `R10`, email xuống dòng ở gạch nối tên miền theo `description-list.md`: sửa, không đưa
  vào "Còn thấy").
- **Tự soi bằng mắt trước khi giao, ghi ra.** Mở ảnh 375, 1440 và 1920 của probe, trả lời
  từng câu thành một dòng trong tin giao (câu nào có lỗi thì sửa trước, rồi mới ghi "không"):
  1. Card, dòng cùng loại có cao thấp khác nhau vì có dòng thiếu một mẩu không?
  2. Thứ bấm được (link "Xem thêm", nút chữ) có trông như chữ thường không?
  3. Trong một màn có bao nhiêu khung viền đứng cạnh hay lồng nhau? Gộp được khung nào?
  4. Ở 1920, chỗ nào trống mà không có lý do (nửa card, hai bên nội dung)?
  5. Thứ nặng nhất màn (đậm nhất, màu nhất) có đúng là việc chính ở `U2` không?

  Không ghi mấy dòng này thì coi như chưa soi. Người dùng tự phát hiện ra lỗi nằm trong năm
  câu này là skill chưa làm xong việc.
- **Lúc giao** nói bằng ngôn ngữ trải nghiệm, không bằng class: việc chính giờ làm trong mấy
  bước, thấy ngay ở khổ nào; ảnh trước và sau ở 1280 và 375, là link bấm được và một trang
  `so-sanh.html` như `V5` trong `review.md` (cả ảnh của mục "Còn thấy"); danh sách thứ cần bạn nối logic
  hay thêm dữ liệu. Cuối tin một dòng **Muốn chỉnh thì nhắn** với 3–4 câu ngắn chọn theo bản vừa
  dựng, như khung lý do của `U3` (*"Thêm màu ở header"*, *"Tiêu đề đậm hơn"*, *"Thoáng hơn"*,
  *"Đổi font"*). Người dùng thường chỉ thấy "chưa đã" mà không gọi được tên.

---

## U5. Không làm

- Không moodboard, không hi-fi mock riêng rồi dựng lại: với skill này code chính là hi-fi.
- Không tự thêm tính năng ngoài `U2` (chat, thông báo, đánh giá) cho "đủ bộ".
- Không đổi vai màu của dự án đã có, trừ khi người dùng nói bỏ style cũ (`review.md`, chế độ
  dựng lại theo gu skill).
- Không quay về nhánh `V` giữa chừng để "vá cho nhanh": người dùng đã xin nghĩ lại khung.

## U6. Phân tích sản phẩm, chưa dựng ⚑

Đề hỏi sản phẩm nên thiết kế ra sao mà chưa muốn dựng: "phân tích sản phẩm", "nên thiết kế ra
sao", "hướng thiết kế", "gợi ý màu, trải nghiệm cho ngành…", "analyze my product", "what design
direction". Ra **một tin báo cáo** trong chat. Không vẽ wireframe, không đụng file dự án, không
viết code. Lối này **không có cổng**: không hỏi; dòng nào không suy ra được thì ghi *đoán*,
người dùng sửa dòng đó.

Báo cáo đi đúng thứ tự dưới đây, mỗi phần ngắn, viết theo ngôn ngữ của đề:

1. **Audit** một dòng (câu 2 của `SKILL.md`), chỉ khi đã có code. Chưa có code thì ghi *"Chưa
   có code, brief theo lời bạn."*
2. **Brief** năm dòng như `U1`, mỗi dòng ghi nguồn (*đọc code*, *người dùng nói*, *đoán*).
3. **Màn chính**: bảng `U2` cho 3–6 màn sản phẩm cần nhất, kèm dòng Luồng tới việc chính đầu
   tiên (`flows.md`, `O2`). Đã có code thì lấy theo route; chưa có thì lấy những màn loại sản
   phẩm này hay có.
4. **Quy ước của loại sản phẩm này**: 5–8 dòng, mỗi dòng nói *làm gì*, *vì sao người dùng cần*,
   *nguồn*. Ngành có trong `industry-patterns.md` thì lấy từ đó trước, ghi *"bảng ngành, 4/5"*;
   chỉ tra thêm cho màn bảng chưa có. Còn lại **tra thật** khoảng năm sản phẩm cùng loại (tìm web nếu có công cụ; app có gói free
   thì xem bản free, không trả tiền). Nguồn ghi bằng số đếm: *"tra 5, 4 làm vậy"*, **không nêu
   tên sản phẩm**. Không tra được thì ghi *"theo trí nhớ, cần kiểm"*. Quy ước mà sản phẩm chưa
   có thì ghi thêm *(chưa có)*: đó là chỗ đáng giá nhất của báo cáo, nhưng chỉ ghi là gợi ý,
   không tự đưa vào brief (`U5`).
5. **Màu nhấn**: dự án có brand thì giữ brand, nói một dòng. Chưa có thì ba màu của ngành trong
   bảng "Màu nhấn gợi ý theo ngành" (`brand-tokens.md`), kèm cột *Đo được* của ngành đó; ngành
   không có trong bảng thì dòng "Ngành khác". Không chọn màu theo sáo ("học thì xanh lá cho
   tươi", "spa thì hồng").
6. **Bộ mặt**: một bộ khuyên dùng theo `P13`, đúng mẫu dòng báo của `P13` (nói bằng người dùng).
   Dự án đã có phong cách riêng (audit tầng 3) thì ghi *"giữ phong cách đang có"*, không khuyên
   bộ mới (`P1`).
7. **Điểm khác biệt hiện ở đâu**: một dòng, màn nào, chỗ nào trên màn (`U2`).

Mỗi dòng nói bằng việc của người dùng cuối, không bằng tính từ. Đúng: *"Trang đầu của người
học là nút Học tiếp bài đang dở, vì họ quay lại để học tiếp chứ không để tìm khoá mới (tra 5,
5 làm vậy)."* Sai: *"UI thân thiện, hiện đại, tối ưu trải nghiệm học tập."*

Kết tin bằng một dòng: *"Sai dòng nào thì sửa dòng đó. Muốn dựng thì nói `dựng màn …`, hoặc
`dựng luôn màn …` nếu không cần wireframe."* (tiếng Anh: *"Correct any line that's wrong. To
build, say `build the … screen`, or `just build the … screen` to skip the wireframes."*)

**`DESIGN.md` đã có** (`system.md`, `D10`): mục 5, 6 lấy theo file, ghi *"theo `DESIGN.md`"*,
không khuyên màu hay bộ mặt khác. Báo cáo không ghi vào file; lượt dựng sau mới ghi (`U4`).

**Lượt dựng sau báo cáo.** Brief và bảng `U2` người dùng đã đọc, nên đề dựng kế tiếp mà không sửa
dòng nào thì coi như **đã qua cổng 1**: đi thẳng `U3` (hay `U4` nếu "dựng luôn"). Nhóm Nhấn của
wireframe lấy đúng ba màu trong báo cáo, Kiểu mặc định là bộ mặt đã khuyên. Màn chưa có trong
bảng thì thêm dòng `U2` của màn đó vào đầu tin wireframe, không dừng.

**Không:**

- Persona, hành trình người dùng, số liệu không có nguồn ("70% người học dùng điện thoại"),
  như `U1`. Model không phỏng vấn được ai.
- Báo cáo dài như tài liệu: vừa đọc trong một lượt cuộn, không bảng lồng bảng, không mục nào
  ngoài bảy mục trên.
- Ghi báo cáo ra file trong dự án khi người dùng không xin.
