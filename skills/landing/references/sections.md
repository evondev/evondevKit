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
  `--border` + `mask-image` radial), hoặc trơn. Không ảnh.
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

## B31. Ảnh vẽ riêng (không dùng cho Blueprint)

Blueprint không dùng ảnh vẽ tạo không khí (`B11`). Trang loại khác cần ảnh như vậy thì theo
`ai-images.md`.

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
