# Blueprint: từng khối và chữ viết — luật B12–B30

Mở cùng `blueprint.md` ở bước dựng. Khối nào cũng nằm trong khung (`B5`) và chia ô theo `B6`.
Số trong ngoặc là số trang trên 20 landing Blueprint đo kỹ (11/11/2026).

## B12. Thứ tự khối, độ dài

Thứ tự gần như cố định trên landing cho dev: **hero → bằng chứng tin cậy → tính năng → lời khách →
khối phụ → CTA cuối**. Cụ thể:

1. Header (`B17`)
2. Hero (`B13`–`B16`)
3. Dải logo / "dùng bởi" (`B18`)
4. Tính năng (`B20`)
5. Code theo tab / cách bắt đầu (`B21`)
6. Benchmark (`B22`) — chỉ khi có số so với cách khác
7. Hàng số (`B23`)
8. Lời dev (`B24`)
9. Bảng giá (`B25`) — tuỳ (5/20)
10. FAQ (`B26`) — gần như luôn có (6/20 đo được rõ, khảo sát khuyên chỉ cần FAQ là đủ khối phụ)
11. CTA cuối (`B27`), footer (`B28`)

- **Độ dài 8–12 màn ở 1440×900.** Đo được 3,7–20 màn, trung vị 11. Dưới 6 màn là thiếu bằng chứng;
  trên 15 là đang độn. Thêm khối theo nội dung thật của sản phẩm, không thêm khối rỗng cho đủ.
- Bỏ khối được (sản phẩm chưa có khách thì bỏ dải logo, dùng một lời dev thay). Thêm khối thì dùng một
  khuôn ô có sẵn ở dưới, không khuôn lạ.

## B13. Hero: ba bố cục

| Bố cục | Hình | Hợp khi |
| --- | --- | --- |
| **Canh giữa** | nhãn tin mới → H1 → câu dẫn → hàng nút + chip lệnh → món chính full khung bên dưới | khung thử, mảnh giao diện rộng |
| **Canh trái, chữ lớn** | H1 canh trái `lg:text-7xl`, câu dẫn, hàng nút **ngay dưới câu dẫn cùng cột trái**; món chính bên dưới chia hai ô (code trái, kết quả phải) | thư viện, CSS, SDK: code → kết quả |
| **Chia đôi** | lưới hai ô `lg:grid-cols-2` chung đường kẻ: chữ trái, món chính phải | terminal, sơ đồ, code ngắn |

Trang đo được nghiêng về canh trái (14/20); khảo sát lớn thì nghiêng về canh giữa. Cả hai đều số đông:
**wireframe phải có ít nhất một bản canh giữa và một bản canh trái / chia đôi.**

- Nền hero: lưới ô vuông 64px nhạt tan dần ra mép (`background-image` hai `linear-gradient` 1px màu
  `--border` + `mask-image` radial), hoặc trơn. Không ảnh. **Đường lưới trùng đường kẻ có sẵn**: một lớp
  lưới cho cả hero, `background-position` neo vào đường chia cột (chia đôi: `center top`) và mép khung, để
  đường lưới rơi đúng lên `border-r` của cột trái. Lưới lệch thì một đường lưới chạy song song cách đường chia
  cột 20–30px, thành đôi đường (`B5`), ở 1440 lẫn 1024.
- **Nhãn tin mới** trên H1 (tuỳ): pill nhỏ `font-mono text-xs`, "v2.0 is out →", dẫn tới changelog.
- Hai góc trên của hero (từ `lg`) có thể đặt nhãn mono nói về sản phẩm (`[ v2.4.0 ]`, `[ MIT ]`), **chỉ khi
  hero chưa nói điều đó**: nhãn tin mới đã có phiên bản, dòng dưới nút đã có "MIT" thì góc bỏ hay đổi
  sang thứ khác (`[ 312 rules ]`). Một ý nói ba lần trong một màn là nhiễu.
- Bố cục canh trái: **không đẩy hàng nút sang cột phải** để lấp chỗ trống cạnh câu dẫn. Nút tách khỏi
  H1 và câu dẫn thì mắt phải đi chéo cả màn mới tới việc chính; chỗ trống bên phải là của món chính bên dưới.
- Món chính **thấy được ở màn đầu 1440×900**: ít nhất mép trên của nó lọt trong 900px.

## B14. Món chính hero

Hero phải cho thấy **sản phẩm chạy thật**, không tả bằng tính từ. Chọn theo câu 3 của `SKILL.md`:

**Khung thử** (sản phẩm có đầu vào thử được): `form` nền `--surface`, viền `--border`, `rounded-xl`,
`max-w-3xl`.
- Ô nhập thật có giá trị mẫu (đoạn code, URL, câu prompt), placeholder viết thường nói việc ("Paste
  some TypeScript"), không viết kiểu nhãn trang trí `[ input ]`. Nút chạy cùng hàng ô nhập.
- Vùng đầu ra cao cố định (để khung không giật khi kết quả in dần), `aria-live="polite"`, **cao đủ chứa
  hết kết quả mẫu tự chạy** kể cả dòng tổng kết (`✖ 7 problems`, `Done in 38ms`): đo `scrollHeight` của
  kết quả mẫu rồi đặt chiều cao, hoặc rút kết quả mẫu cho vừa. Cuộn trong khung chỉ cho kết quả khách tự
  dán vào; kết quả mẫu bị cắt ngang ở mép dưới thì đọc thành khung hỏng. Kết quả **đúng sản phẩm**:
  công cụ phân tích ra dòng `src/app.ts:12:5  warning  …` có vị trí và tên luật, API ra JSON thật.
- **Tự chạy một lần sau 1,2 giây**: nút chạy nhấn xuống, dòng "Running…" kèm thời gian, kết quả hiện
  từng dòng 120ms một, cuối có thời gian chạy mono (`Done in 38ms`). Khách đã đụng vào khung thì bỏ lượt.

**Terminal / code → kết quả** (thư viện, CLI): khung `--surface` (tối kể cả trên nền sáng là được),
hàng đầu ba chấm hay tên file mono, lệnh có dấu `$`, đầu ra in dần một lần. Có nút "replay" nhỏ góc
dưới. Code chữ `font-mono text-[13px]/6`, tô màu cú pháp tối đa ba màu.

**Mảnh giao diện** (sản phẩm có UI): ảnh chụp hay dựng HTML của màn thật trong khung `--surface`
`rounded-xl`, thẳng (không nghiêng), có thể chia tab theo tính năng. Dữ liệu trong mảnh đúng sản phẩm.

## B41. Món ký tên ở hero ⚑

Mỗi trang Blueprint có **đúng một món hình riêng, cỡ lớn**, ở màn đầu, để người xem nhớ trang. Tra 24
landing dev được nhắc nhiều nhất: trang nào gây ấn tượng cũng có một món như vậy (logo phát sáng, khối
3D bằng chấm sáng, lưới chấm chạy, tường code nghiêng, sóng nét, vạch sáng); giữa trang thì tĩnh như
nhau. Hero chỉ có sản phẩm trong khung thì gọn, đúng, mà phẳng: không ai nhớ.

- **Sống cùng món chính** (`B14`): sản phẩm thật vẫn nằm trong màn đầu. Món ký tên đặt một trong hai
  chỗ: **nền sau H1** (chữ đè lên vẫn đạt 4.5:1, món mờ dần quanh vùng chữ bằng `mask-image`), hoặc
  **khối lớn** ở cột phải hero chia đôi / giữa H1 và món chính.
- **Chọn theo việc sản phẩm làm**, không chọn vì đẹp:

| Sản phẩm | Món ký tên |
| --- | --- |
| Hàng đợi, workflow, agent, tác vụ song song | Lưới chấm lớn sáng theo trạng thái (`B38`), phủ cả khung |
| Database, storage, cache | Khối 3D dựng bằng chấm sáng (canvas, xoay chậm) hay tấm xếp tầng (`B38`) |
| Compiler, linter, CLI, SDK | Tường chữ code nghiêng phủ nền, mờ dần; hoặc dòng log trôi |
| API, mạng, edge, CDN | Bản đồ chấm, đường cong nối điểm có gói tin chạy |
| AI, dữ liệu, tìm kiếm | Trường hạt hay sóng nét mảnh nhiều đường song song, chuyển nhẹ |
| Logo là hình khối đơn giản | Logo cỡ lớn, quầng sáng màu nhấn phía sau |
| Trang cá nhân của dev (`B42`) | **Chú thích như devtools**: nhãn mono 11px `--muted` ghi thẻ và class của phần tử ngay dưới (`h1 · text-7xl font-semibold tracking-tighter`), `aria-hidden`. Cách đặt và chọn class ở `B42` mục 1 |
| Dạy code, khoá học lập trình | Đèn chiếu từ trên rọi xuống khung code, một dòng lỗi được tô và gắn nhãn ("Phát hiện lỗi") |

- **Nguồn**: mặc định **dựng bằng code** (CSS, SVG, canvas 2D), người dùng không phải làm gì. Muốn
  vật thể render 3D hay minh hoạ (khối thuỷ tinh, icon 3D, cảnh vẽ) thì theo `B31`
  (`ai-images.md`): prompt một vật thể, nền đúng mã màu nền trang, màu nhấn của trang; chưa có ảnh thì
  hiện bản dựng bằng code.
- **Màu**: món ký tên là chỗ duy nhất màu nhấn được thành **mảng**: quầng sáng (`radial-gradient` màu
  nhấn, đậm tối đa 30%), chuyển từ màu nhấn về nền, chấm sáng. Vẫn một màu nhấn (`B4`), không thêm màu thứ hai.
- **Cỡ**: ở 1440 chiếm từ 40% bề ngang hero, hoặc phủ cả nền. Nhỏ hơn thì thành icon trang trí.
- **Chuyển động** (`B33`): chậm, lặp, dừng khi ra khỏi khung nhìn (`IntersectionObserver`), đứng yên ở
  khung đẹp nhất khi giảm chuyển động. Canvas giới hạn 30 khung/giây, `devicePixelRatio` tối đa 2.
- **Lấy từ thư viện component** được (nền động, quả cầu chấm, trường hạt): xem `motion.md` `B40`, mục
  "Món ký tên lấy từ thư viện". Dự án `index.html` thuần thì viết tay bằng canvas 2D.
- **375**: bản thu gọn hay đứng yên, không đè lên chữ, không đẩy nút chính xuống dưới màn đầu.
- **Wireframe**: mỗi phương án một món ký tên khác nhau (cùng một món khác màu là một phương án).

## B42. Trang cá nhân của dev ⚑

Portfolio, trang giới thiệu bản thân của dev, người làm nội dung lập trình. Khung Blueprint giữ nguyên
(`B5`, `B6`); việc chính là **theo dõi kênh**, xem dự án, liên hệ. Thứ tự khối:

1. Hero canh trái: nhãn tin mới (sản phẩm mới nhất), H1 xưng tên kiểu nói chuyện ("Xin chào, mình là …,
   mọi người hay gọi là …", cụm sau màu nhấn), câu dẫn 3–4 dòng kể nghề và việc đang làm, nút chính theo
   dõi kênh + nút viền xem hành trình, nhãn mono mấy chủ đề. Dưới: **khối code tự mô tả** (`const tên =
   { role, since, stack, loves, building }`, tô màu như `B14`) cạnh **ảnh thật** của người đó (`B43`).
   Món ký tên là chú thích devtools (`B41`), làm đủ năm điều thì mới thành món ký tên, thiếu thì thành chữ rác:
   - **Mỗi phần tử hero một hàng riêng**: nhãn tin mới, H1, câu dẫn, hàng nút (kèm nhãn chủ đề) xếp dọc, mỗi
     hàng kẹp giữa hai **đường kẻ ngang tràn mép màn** (`B5`); nhãn chú thích nằm trong khoảng trống 32–40px
     ngay trên phần tử, không đè lên đường kẻ, không lơ lửng giữa khung.
   - **Ghi 2–5 class về hình** lấy từ class thật: cỡ chữ, nét, màu, khoảng chữ, khoảng cách (`text-7xl
     font-semibold tracking-tighter text-balance`, `p · text-lg text-muted`, `div · flex gap-3`). Bỏ tiền tố
     responsive (`sm:`, `lg:`) và class bố cục (`relative`, `mt-*`, `max-w-*`, `grid-cols-*`, `bg-border`):
     nhãn dài cả dòng class là nhiễu.
   - **Chỗ có nhãn**: các hàng hero, khối code, ô ảnh; 5–8 nhãn cả trang. Không gắn lên tiêu đề section (đã
     có nhãn section `B19`, hai dòng mono chồng nhau thành nhiễu), lưới thẻ, FAQ, footer.
   - **375 vẫn hiện**, một dòng, cắt bằng `truncate` (`text-…`).
   - **Chữ phải xứng với nhãn**: nhãn khoe `text-7xl font-semibold` thì H1 phải đúng cỡ đó.
   **Cỡ chữ**: H1 `text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter text-balance
   leading-[1.05]`; cỡ tuỳ ý (`text-[min(3rem,12.8vw)]`) thì **phải kèm `leading-*`**, lớp tuỳ ý không mang
   khoảng dòng, H1 ăn 1.5 của thân, ba dòng rời nhau (probe báo `TIÊU ĐỀ LỚN DÒNG THƯA`); cả cụm sau tên
   màu nhấn (một hai dòng chữ cam, không chỉ một chữ). H2 section `text-4xl lg:text-5xl font-semibold
   tracking-tighter`. Nét `font-medium` cỡ `text-6xl` là chữ
   trang SaaS, không ra chất trang cá nhân. Chữ tiêu đề dùng font có cá tính (`B3`) có subset `vietnamese`.
   **Khối code tự mô tả nền tối** (đảo màu) cả khi trang nền Sáng / Kem: là mảng đậm nhất màn đầu, kéo mắt;
   có số dòng, tô màu cú pháp. Ở 375 không dòng nào tràn khung (probe báo `KHỐI CODE TRÀN NGANG`, áp cho mọi
   khối code trên trang, kể cả đoạn diff ở khối sản phẩm) và **tối đa 14 dòng**: mảng ngắn giữ một dòng,
   mảng dài rút còn 2 phần tử; xuống dòng mỗi phần tử một dòng cho cả object thành 22 dòng, dài hơn hero.
   **Ảnh thật** tràn ô (không khung lồng trong ô, không padding), cao bằng khối code.
2. Hàng số kênh (người theo dõi, lượt xem, video): số `text-4xl lg:text-5xl font-semibold` **màu nhấn**, dưới
   là nhãn thường và nguồn mono nhỏ (`@tenkenh`); ô đầu có thể là nhãn mono màu nhấn ("ĐANG THEO DÕI").
3. Dải stack chạy: **icon logo + tên** (SVG logo có sẵn trong dự án, hay `simple-icons` từ `cdn.jsdelivr.net`),
   không chỉ chữ mono ngăn bằng chấm; nhãn mono màu nhấn đứng đầu dải (`B36`).
4. **Hành trình theo năm**: mỗi năm một hàng lưới `[năm | mốc + đoạn văn | ảnh]`; năm mono cỡ H3, chấm
   mốc trên một đường dọc, ảnh thật bo `rounded-xl` viền `--border`; mốc hiện tại chữ màu nhấn, chấm đặc.
   Cuối có hàng "Còn tiếp…" dẫn về kênh.
5. Khoá học / bài viết / dự án đã làm: lưới 4 cột thẻ có ảnh bìa, số học viên / lượt xem mono.
6. Sản phẩm đang làm: tab dọc bên trái (tên, mô tả một dòng, badge trạng thái), bên phải màn sản phẩm.
7. Đồ đã làm cho cộng đồng (theme, extension, thư viện): thẻ có ảnh, số lượt cài, nút xem.
8. **Chữ chạy cỡ lớn** hai hàng ngược chiều: hàng trên chữ đặc, hàng dưới chữ viền (`-webkit-text-stroke:
   1px var(--border-strong)`, chữ trong suốt), cỡ `text-7xl`, các chủ đề ngăn bằng dấu `·`. Một lần mỗi
   trang, `aria-hidden`, nội dung thật có ở chỗ khác.
9. Sở thích (ô lưới icon), cảm nhận, FAQ, CTA cuối "Cảm ơn bạn đã cuộn tới đây".

Chữ xưng hô theo người đó (mình / tôi / I), giọng kể chuyện, không viết như CV.

## B43. Ảnh thật của người dùng ⚑

Trang có người thật (chân dung, ảnh làm việc, ảnh sự kiện, ảnh đội) **không dùng ảnh kho hay ảnh AI thay
người thật**: ảnh người lạ gắn tên thật là giả mạo.

- Tìm trước trong dự án: `public/`, `assets/`, `images/`, thư mục người dùng chỉ trong đề. Có thì dùng,
  đặt theo nội dung tên file (`2019-ktcity.jpg` vào mốc 2019).
- Thiếu thì dựng khung giữ chỗ đúng tỉ lệ (nền `--surface`, viền `--border`, chữ mono "ảnh 2019 · 4:3")
  và viết **`photos-needed.md`** ở gốc dự án: mỗi ảnh một dòng với tên file, chỗ đặt, tỉ lệ, cỡ xuất
  (chân dung 4:5 900px, ảnh mốc 4:3 1200px), gợi ý nên chụp gì ("ảnh đang đứng lớp", "màn hình sản phẩm
  năm đó"). Lúc giao ghi vào mục **Cần bạn làm**.
- Người dùng bỏ ảnh vào thì mở xem từng ảnh: mặt không bị cắt (`object-position` theo chỗ có mặt), cùng
  tông, nén `webp`. Ảnh minh hoạ không phải người (bìa khoá học, cảnh) thì được sinh theo `B31`.

## B15. Sơ đồ kỹ thuật vẽ nét

Cho sản phẩm không có UI (hạ tầng, queue, sandbox) hoặc khối "cách hoạt động". Là kiểu được xem nhiều
nhất trên gallery thiết kế cho dev tool, và **dựng được bằng code** (SVG / HTML), không cần người vẽ.

- Các **nút** là ô `--surface` viền `--border` có nhãn mono và icon lucide 16px; nối bằng **đường 1px**
  `--border-strong` (thẳng hay gãy góc vuông), giao điểm chấm 4px.
- **Một đường đi chính tô màu nhấn**, có chấm chạy dọc theo nó một lần (hay lặp chậm 4 giây; giảm chuyển
  động thì đứng yên). Còn lại xám.
- **Vẽ dần khi hiện** (tuỳ): đường nối tự vẽ ra một lần bằng `stroke-dasharray` + `stroke-dashoffset`
  (1,2 giây, nút hiện trước, đường sau), như bản vẽ đang được kẻ. Giảm chuyển động thì vẽ sẵn.
- Có thể thêm vòng tròn đồng tâm nét mảnh, thước đo mono ở mép: ngôn ngữ bản vẽ kỹ thuật.
- Nhãn trên sơ đồ là tên thật (`your app`, `queue`, `worker`, `Postgres`), không `Node 1`.
- Ở 375: sơ đồ xếp dọc hay thu gọn còn 3–4 nút, không thu nhỏ cả hình tới chữ dưới 12px.

## B16. Chữ hero và nút

- **H1 nói sản phẩm là gì và hơn ở đâu**, chữ thường, thường dưới 10 từ: "Webhooks you can replay",
  "Feature flags in one line of code", "Background jobs for TypeScript". Không "Supercharge your
  workflow", không "Build the future".
- **Câu dẫn có một con số hay một chi tiết kiểm được** (nhanh hơn bao nhiêu lần, chạy trên cái gì, thay
  cho cái gì), tối đa hai dòng ở 1440.
- **Hai nút**: nút chính đặc, chữ là **động từ cụ thể** theo việc chính của brief ("Get API key",
  "Install Hookline", "Start building", "Deploy now"); nút phụ viền là bước nhẹ hơn ("Read the docs",
  "View on GitHub", "Talk to an engineer"). Hai nút cùng kiểu là chưa quyết thứ bậc.
- **Chip lệnh cài** (thứ cài được qua npm / pip / brew / curl) đặt cạnh hay dưới hàng nút (`B9`).
- **Nút cho agent** (6/20 trang, xu hướng mới): nút phụ thứ ba nhỏ, dạng chữ có icon copy, "Copy prompt
  for your agent" / "Set up with AI". Bấm là copy một đoạn hướng dẫn cài vào clipboard, đổi chữ "Copied"
  1,5 giây. Nội dung đoạn copy là việc của người dùng (để mẫu, báo ở Cần bạn nối).
- Dòng nhỏ dưới nút (tuỳ): "Free and open source · MIT" hay "No credit card required", `text-xs --muted`.

## B17. Header

Dính đỉnh, `h-14`, nền `--background` hơi trong (`/90` + `backdrop-blur`), đường kẻ dưới tràn hết bề
ngang; nội dung trong `.frame` nên hai đường dọc chạy xuyên qua.

- Trái: logo. Giữa: 3–5 link `text-sm --muted` (Docs, Pricing, Blog, Changelog). Phải: **số sao GitHub
  mono** (sản phẩm mã nguồn mở: icon GitHub + `12.4k`), "Log in" chữ, và **một** nút đặc cùng chữ nút
  chính hero.
- Link giữa chỉ hiện từ `lg`; dưới đó nút menu mở panel. Probe báo header xuống dòng ở 768.
- Dải thông báo trên header (tuỳ): một dòng `text-xs` có link, đóng được.

## B18. Dải logo / dùng bởi

Một câu `text-sm --muted` canh giữa ("Trusted by 2,000+ teams"), dưới là lưới ô `grid-cols-2
sm:grid-cols-3 lg:grid-cols-6`, ô `h-20`, logo xám cao 20–28px. Logo giả thì logo chữ (tên công ty
mẫu, font khác nhau nhẹ), không vẽ biểu tượng giả.

- Sản phẩm mã nguồn mở chưa có khách lớn: thay bằng hàng số (sao, lượt tải, người đóng góp) hay một
  lời dev có tên. Người dùng mã nguồn mở cũng là người dùng.

## B19. Tiêu đề section

Nhãn mono (`B7`) → H2 → câu dẫn tuỳ chọn `--muted` `max-w-2xl`. Canh giữa hay canh trái theo hero (cả
trang một kiểu). Đệm `pt-16 sm:pt-24`, đáy `pb-10 sm:pb-12`, rồi lưới ô bắt đầu bằng `border-t` hay khối mở.
**Tiêu đề gần nội dung của nó hơn gần section trên**: đệm đáy bằng đệm đỉnh (`py-24`) thì tiêu đề trôi
giữa hai khoảng trống bằng nhau, không thuộc về khối nào, cả trang trông rời rạc.

- Cụm màu nhấn trong H2: tối đa nửa số H2 của trang; còn lại có thể làm câu hai `--muted` cùng dòng
  ("Retries in 40ms. **Without writing a queue.**" kiểu chữ đậm + chữ nhạt).

## B20. Tính năng

Ô lưới 3 cột (`lg:grid-cols-3`), hoặc bento: lưới 6 cột, ô chiếm 2–4 cột, hai hàng.

- Mỗi ô: icon lucide 20px trong ô vuông 40px viền `--border` nền `--surface` → H3 → đoạn hai dòng →
  **mảnh sản phẩm** (dòng code, dòng log, cấu hình, mini output) nền `--surface` dưới đáy ô
  (`mt-auto`), cao bằng nhau giữa các ô cùng hàng.
- Kể theo **vấn đề người dùng gặp**, không liệt kê chức năng: "Replay any failed webhook" hơn
  "Event replay support".
- Mảnh trong ô không cắt "…" ở 1280 trở lên: rút dữ liệu cho vừa.

## B21. Code theo tab, cách bắt đầu

Cho thứ cài và dùng bằng code.

- Hàng tab cách dùng (`CLI`, `VS Code`, `CI`, `Config`) cao `h-12`, tab ngăn `border-r`, nút Copy ở
  cuối hàng ngăn `border-l`. Dưới: lưới hai ô chung đường kẻ, code trái `--surface`, đầu ra phải có nhãn
  mono `OUTPUT`.
- **Hai khung đặt cạnh nhau cao bằng nhau** (code trái / đầu ra phải, ở đây và ở hero canh trái): ô
  `flex flex-col`, khung `flex-1` (hay `h-full`), không để mỗi khung cao theo nội dung. Một khung hụt 70px
  chừa mảng trống dưới đáy, hai đáy lệch nhau trên một đường ngang là chỗ mắt bắt lỗi đầu tiên.
- Hoặc **các bước đánh số** (`01 Install`, `02 Run`, `03 Fix`), mỗi bước một lệnh có copy, terminal bên
  cạnh chạy theo bước đang chọn. **Cột bước cao bằng terminal**: cột `flex flex-col`, mỗi bước `flex-1`
  (chia đều phần dư), terminal không đặt `min-h` cao hơn cột bước. Cột bước ngắn hơn thì đường kẻ của cột
  nút copy dừng lửng giữa khung, dưới là mảng trống.
- Code thật chạy được, đúng tên gói của sản phẩm. Code dài cuộn ngang trong khung, không gãy dòng.

## B22. Benchmark

Khối mạnh nhất của sản phẩm nhanh hơn / rẻ hơn (5/20). Dev tin số đo, nhất là số kèm cách đo lại.

- Mỗi hàng: tên công cụ (mono) → thanh ngang → số (mono, canh phải). Thanh của sản phẩm mình **màu
  nhấn**, còn lại `--border-strong`. Sắp từ nhanh tới chậm. Thanh dài nhất chiếm hết bề ngang ô.
- Dưới thanh: dòng nhỏ **đo trên gì** (repo, số file, máy, phiên bản) và link "Reproduce" / "Methodology".
- Có thể chia tab theo phép đo (cold run, warm run, CI) hay hai ô cạnh nhau.
- Thanh mọc từ 0 một lần khi cuộn tới (600ms); giảm chuyển động thì đứng sẵn.
- Không có số thật thì dựng số mẫu đúng cỡ và đánh dấu (`B30`), không bỏ khối khi sản phẩm sinh ra để nhanh.

## B23. Hàng số

`grid-cols-2 lg:grid-cols-4`, nhãn trên `text-sm --muted`, số dưới `font-mono text-3xl
whitespace-nowrap`. Số có đơn vị rõ: `12.4k` stars, `3M` weekly downloads, `350+` rules, `99.99%` uptime.

## B24. Lời dev

Lưới 3 ô, ô `flex flex-col`: câu trích `text-base/7` (một hai câu, có chi tiết: "we deleted 2k lines of retry
code"), dưới cùng (`mt-auto`) avatar chữ cái 32px, tên, vai trò, công ty. Không carousel, không nhúng
tweet. Một lời đặt ngay dưới tính năng nó nói tới cũng được.

## B25. Bảng giá (tuỳ)

Phần lớn landing dev để bảng giá ở trang riêng. Có thì theo `../../ui-ux/references/layouts/pricing.md`,
đặt trong lưới ô chung đường kẻ (không card bo tròn có bóng), gói đề xuất viền màu nhấn.

## B26. FAQ

Lưới `lg:grid-cols-[2fr_3fr]`: trái nhãn mono, H2 canh trái, câu dẫn, `lg:border-r`; phải accordion
ngăn `divide-y`, câu đầu mở sẵn, trượt `grid-rows` 0fr ↔ 1fr 250ms (không `<details>`: mở tức thì nhìn giật).
**Cột trái canh trên**, nhãn mono ngang hàng câu hỏi đầu (cùng đệm đỉnh), không `justify-center` /
`items-center` dọc: canh giữa thì tiêu đề trôi giữa cột, lệch hàng với câu đầu, và nhảy mỗi lần mở đóng một câu.

- 4–6 câu **dev thật hỏi**: thay được cái đang dùng không, giữ config cũ được không, giá / giấy phép,
  chạy ở đâu (CI, editor), dữ liệu đi đâu. Không câu hỏi tự khen.

## B27. CTA cuối

Khối tách khỏi phần còn lại: **nền đảo** (`--foreground` làm nền, chữ `--background`) hay lưới nền của
hero. H2 ngắn, câu dẫn một dòng, nút chính **đúng chữ nút chính hero**, nút phụ viền, chip lệnh cài lặp
lại. Đệm `py-20 sm:py-28`. Là lưới an toàn cho người cuộn hết trang chưa bấm gì.

## B28. Footer

Trong khung: cột thương hiệu (logo, một câu, icon GitHub / X / Discord) + 3–4 cột link `text-sm`;
dòng bản quyền và trạng thái hệ thống (chấm xanh "All systems normal", tuỳ) ngăn bằng `border-t`.

## B29. Chữ viết cho dev

Áp cho mọi chữ trên trang, mọi ngôn ngữ.

- **Cụ thể thay vì tính từ**: "Delivers 50k events/s at p99 40ms" thay "Blazing fast"; "Drop-in for
  your existing Express routes" thay "Seamless integration"; "Used by 2,000 teams" thay "Loved by developers".
- **Cấm**: blazing fast, seamless, next-generation, revolutionary, supercharge, unleash, empower,
  game-changing, cutting-edge, world-class (và bản tiếng Việt: "đột phá", "vượt trội", "tối ưu hoá
  toàn diện", "giải pháp hàng đầu").
- Mỗi khối có **ít nhất một con số hay một mảnh sản phẩm** (code, output, sơ đồ). Khối chỉ có chữ là
  khối quảng cáo.
- CTA là động từ + vật: "Install Hookline", "Get API key". "Get started" chỉ khi không có chữ cụ thể hơn.
- Không nói thay người đọc ("You'll love it"). Không chấm than.

## B30. Dữ liệu mẫu

Đề không cho số liệu, khách hàng, lời dev thì **dựng mẫu đúng cỡ và đúng sản phẩm**, không để trống,
không "Lorem ipsum":

- Số benchmark hợp lý cho loại sản phẩm (công cụ chạy trên code: giây trên số file cụ thể; API: ms p50 / p99; hạ tầng: request/giây).
- Tên công ty mẫu trung tính (`Northwind`, `Acme`, `Globex`), tên người đa dạng, vai trò thật
  ("Staff engineer").
- Lúc giao, mục **Cần bạn nối** liệt kê từng chỗ là số / tên mẫu cần thay. Không ghi chữ "GIẢ" lên trang.

## B31. Ảnh vẽ riêng

Blueprint không dùng ảnh vẽ tạo không khí (`B11`), trừ món ký tên dạng vật thể render (`B41`). Trang
loại khác cần ảnh như vậy thì theo `ai-images.md`.

## B32. Ảnh share link

Dán link vào X, Slack, Discord, Zalo là hiện thẻ có ảnh 1200×630. Thiếu ảnh thì thẻ chỉ còn một
dòng chữ xám, người xem lướt qua. **Mọi trang Blueprint đều có ảnh này**, dựng bằng code từ token
của trang, không dùng ảnh AI: ảnh share cần chữ đọc rõ, mà ảnh sinh ra thường làm méo chữ.

**Nội dung**: nền `--bg` với lưới kẻ nhạt (như nền hero) và hai đường kẻ dọc của khung (`B5`); trên
trái là logo và tên sản phẩm; giữa là câu H1 (rút còn 60 ký tự trở xuống, cỡ 56–72px, font tiêu đề);
dưới là **một** mảnh sản phẩm: chip lệnh cài, hoặc một con số benchmark có nhãn mono. Đúng một màu
nhấn. Chữ nằm trong vùng an toàn 1080×510 ở giữa, vì có nền tảng cắt mép ảnh. Không chữ nào dưới 28px,
vì thẻ chỉ hiện rộng khoảng 500px.

**Cách dựng**:

- **Next.js App Router**: `app/opengraph-image.tsx` dùng `ImageResponse` của `next/og`, `size =
  { width: 1200, height: 630 }`. Chỉ được dùng flexbox (không grid), font tải bằng `fetch` thành
  ArrayBuffer. Lưới kẻ vẽ bằng `backgroundImage` hai `linear-gradient`. Thêm `twitter-image.tsx`
  export lại cùng ảnh.
- **HTML thuần**: viết `og.html` 1200×630 cùng token, chụp bằng Playwright (thứ probe của `ui-ux`
  đang dùng) ra `og.png`, rồi đặt vào `<head>`:

```html
<meta property="og:title" content="…" />
<meta property="og:description" content="…" />
<meta property="og:image" content="https://<domain>/og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
```

`og:image` phải là link đầy đủ có domain. Chưa có domain thì để `<domain>` và ghi vào mục **Cần bạn
nối**. Favicon lấy từ cùng dấu logo (`../ui-ux/references/components/logo.md`).

**Rà**: mở `og.png` (hay route `/opengraph-image`) xem ở cỡ thật, rồi thu còn 500px rộng: H1 vẫn đọc
được, mảnh sản phẩm không bị cắt, không có chữ nào sát mép.
