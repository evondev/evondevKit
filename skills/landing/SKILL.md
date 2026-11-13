---
name: landing
description: Dựng landing page kiểu Blueprint cho sản phẩm dành cho dev - công cụ dev, API, SDK, CLI, hạ tầng, database, sản phẩm AI cho dev - và trang cá nhân / portfolio của dev; kiểu Dark glow (nền tối, đèn chiếu, chữ chuyển màu) cho trang bán khoá học lập trình, cộng đồng dev. Khung có đường kẻ lộ, ô lưới chung đường kẻ, nhãn mono, một màu nhấn, hero cho thấy sản phẩm chạy thật (khung thử, terminal, code, sơ đồ), lệnh cài copy được, benchmark có số. Mặc định như một designer - brief, 2–3 wireframe, người dùng chọn rồi mới dựng; "dựng luôn" thì dựng thẳng. Nền sáng, kem hay tối. Đi cùng skill ui-ux (token, nút, probe). Loại landing khác (spa, cửa hàng, trang bán khoá học, trang thu lead) chưa được dạy - vẫn làm, báo trước. Dùng khi dựng, làm lại hay xem giúp landing page, trang chủ sản phẩm cho dev, khi người dùng nhắc "landing page", "landing", "trang chủ sản phẩm", "homepage", "landing SaaS", "dev tool", "developer tool", "API landing", "blueprint", "portfolio", "trang cá nhân", "dark glow", "glow", "evon".
---

# Landing page Blueprint cho sản phẩm dành cho dev

> **Chưa đi hết mục 0 thì KHÔNG viết một dòng code nào trong lượt này.**
> Mặc định làm như một designer: brief, 2–3 wireframe, người dùng chọn rồi mới dựng. Hai cổng
> chờ (duyệt brief, chọn wireframe) là hai chỗ duy nhất được dừng hỏi. Ngoài hai cổng đó thì
> **không hỏi**: lấy mặc định, báo lúc giao.

**Skill này đi cùng `ui-ux`** (thư mục anh em `../ui-ux/`). Nút, ô nhập, accordion, tab, thanh cuộn,
quy trình wireframe (`U3`) và probe lấy từ đó, không chép lại ở đây. Không thấy `../ui-ux/` thì báo
một dòng *"thiếu skill ui-ux đi kèm, cài lại cả bộ evondevKit"* rồi dừng.

**Phạm vi: landing một trang cho sản phẩm người dùng là dev** (công cụ dev, API, SDK, CLI, framework,
database, hạ tầng, sản phẩm AI cho dev), dẫn khách **cài, dùng thử, lấy API key, đọc docs, đặt demo**;
và **trang cá nhân / portfolio của dev** (`B42`), dẫn khách theo dõi kênh, xem dự án.
Lớp nhìn là **Blueprint**: khung trang có đường kẻ lộ, section là các ô lưới chung đường kẻ, nhãn mono,
một màu nhấn, sản phẩm thật ở hero, một món ký tên (`B41`). Đẹp nhờ bố cục, sản phẩm thật và một món
hình nhớ được, dựng bằng code thuần là ra. Kiểu thứ hai là **Dark glow** (`references/dark-glow.md`, `B44`): nền
tối, đèn chiếu rọi vào sản phẩm, chữ chuyển màu, nút có quầng; dùng khi đề gọi tên, và cho trang bán
khoá học lập trình, cộng đồng dev (trang bán khoá học đi theo `B44` thay vì báo "chưa dạy").

**Loại landing khác chưa được dạy** (spa, cửa hàng, nhà hàng, B2B sản xuất, workshop / thu lead không
phải lập trình, portfolio không phải dev, trang sự kiện). Đầu câu trả lời đầu tiên báo một dòng theo ngôn ngữ
của đề: *"Lưu ý: skill landing mới dạy kiểu Blueprint cho sản phẩm dành cho dev; trang này mình làm
theo luật chung của ui-ux, kết quả có thể chưa đẹp bằng."* rồi đi theo `../ui-ux/SKILL.md` như đề
loại chưa được dạy. Trang loại khác cần ảnh vẽ riêng để tạo không khí (nền hero, ảnh từng mục) thì
theo `references/ai-images.md` (`B31`): viết danh sách ảnh kèm prompt, người dùng sinh ảnh, skill
dựng trang quanh ảnh và rà từng ảnh. Đề loại khác mà **gọi tên** kiểu ("kiểu blueprint", "có lưới kẻ") thì vẫn làm
Blueprint, bỏ khối chỉ hợp dev (lệnh cài, code, benchmark).

Skill lo **giao diện**. Form gửi đi đâu, nút copy prompt copy câu gì, số sao GitHub lấy từ đâu là
logic của người dùng: dữ liệu mẫu đúng sản phẩm, handler rỗng, `href` giữ chỗ, báo lúc giao (`N10`
của `ui-ux`).

⚑ **Luật chưa qua vòng test nào.** Rút từ 56 landing sản phẩm cho dev đang chạy (chụp màn đầu ở
1440 và 390), trong đó 20 trang Blueprint rõ được chụp cả trang và đo (11/11/2026), một khảo sát
100+ landing công cụ dev, và các shot được xem nhiều nhất trên gallery thiết kế. Số trong ngoặc
`(n/20)` là số trang trên 20 trang đo kỹ.

---

## 0. Bốn câu hỏi, đúng thứ tự này

### Câu 1 — Đề đi lối nào?

| Đề nói | Đi đâu |
| --- | --- |
| **Xem giúp landing đang có** ("xem giúp", "review", "chỗ nào chưa ổn", gửi link) | `../ui-ux/references/review.md` chế độ soi; thước đo là luật `B` của skill này. Bảng trước/sau, người dùng chọn dòng rồi mới sửa |
| **Dựng luôn** ("dựng luôn", "không cần wireframe", "just build it") | Câu 2, câu 3, brief trong đầu (`B0`), chọn phương án sẽ khuyên, dựng thẳng. Lúc giao: *"Muốn xem các hướng khác thì nhắn `vẽ wireframe`."* |
| **Sửa một khối** (đổi hero, thêm benchmark, thêm FAQ) | Câu 2, rồi dựng thẳng khối đó theo `references/sections.md`, không hỏi |
| **Mọi đề dựng hay làm lại cả trang** | **Mặc định.** Câu 2, câu 3, rồi bốn bước ở mục 1 |

### Câu 2 — Dự án đang dùng gì? (TỰ TÌM, ĐỪNG HỎI)

Chạy **khối audit câu 2 của `../ui-ux/SKILL.md`** (`audit.sh`: stack, component có sẵn, phong cách).
Báo một dòng `Audit:` trước khi đi tiếp. Dự án có `Button`, `Input`, `Tabs` thì dùng của họ.

- **Thư mục trống / không `package.json`**: một file `index.html`, Tailwind v4 bản trình duyệt
  (`@tailwindcss/browser@4` từ `cdn.jsdelivr.net`), font Google Fonts, icon `lucide` từ
  `cdn.jsdelivr.net`. Token đặt trong `<style type="text/tailwindcss">` như khung wireframe của `U3`.
- **Ngôn ngữ copy theo đề** ("landing tiếng Anh" thì mọi chữ tiếng Anh, kể cả nhãn mono và FAQ).
  Đề không nói thì theo ngôn ngữ của đề. Sản phẩm cho dev phần lớn viết tiếng Anh; copy tiếng Anh thì
  mở `T28`, `T29` của `ui-ux`.

### Câu 3 — Sản phẩm thuộc kiểu nào? (TỰ SUY TỪ ĐỀ)

Câu này quyết **món chính ở hero** (`B14`) và khối nào bật:

| Kiểu sản phẩm | Món chính hero | Khối nên có |
| --- | --- | --- |
| Có đầu vào thử được ngay (công cụ phân tích code, API nhận URL / văn bản / ảnh, AI dev tool) | **Khung thử** chạy được, tự chạy một lần | Benchmark nếu có số, code, FAQ |
| Thư viện, SDK, framework, CLI | **Code → kết quả** hoặc **terminal** chạy lệnh thật | Lệnh cài, các bước bắt đầu, code theo tab |
| Có giao diện (dashboard, editor, app quản lý) | **Mảnh giao diện thật** trong khung | Tính năng theo ô có mảnh giao diện |
| Hạ tầng không có UI (database, queue, sandbox, mạng) | **Sơ đồ kỹ thuật vẽ nét** (`B15`) hoặc code | Benchmark, hàng số, kiến trúc |
| Trang cá nhân / portfolio của dev | **Khối code tự mô tả** cạnh ảnh thật (`B42`, `B43`) | Hành trình theo năm, dự án, sản phẩm, cảm nhận |
| Khoá học lập trình, cộng đồng dev | Khung code có lỗi được bắt dưới đèn chiếu (`B44`) | Video, thẻ khoá học, người dạy, các bước, FAQ |

### Câu 4 — Nền nào?

Ba nền, cùng khung và cùng luật, chỉ khác token (`references/blueprint.md`, `B2`): **Sáng** (15/20),
**Kem** ấm (4/20), **Tối** (5/20). Đề nói thì theo đề. Đề không nói: wireframe cho mỗi phương án một
nền khác nhau, dựng luôn thì Sáng.

---

## 1. Bốn bước, hai cổng

### B0. Brief (cổng 1)

Một tin ngắn, không hỏi câu nào ngoài cổng:

- **Người đọc** và họ đang dùng gì thay thế (đối thủ, cách làm tay).
- **Một việc chính** sau 10 giây: cài, dùng thử, lấy key, đọc docs, đặt demo. Một việc, một chữ nút
  (`B16`).
- **Bằng chứng có gì**: số đo (nhanh hơn bao nhiêu, rẻ hơn bao nhiêu), sao GitHub, lượt tải, khách
  dùng, lời dev. Đề không cho số thì dựng số mẫu đúng cỡ, đánh dấu để người dùng thay (`B30`).
- **Kiểu sản phẩm** (câu 3) → món chính hero; **ngôn ngữ copy**; **danh sách khối** theo thứ tự
  (`references/sections.md`, `B12`).

Kết bằng một dòng: *"Duyệt brief thì mình vẽ 2–3 wireframe."* Rồi dừng.

### B1. Wireframe (cổng 2)

Theo `U3` của `../ui-ux/references/wireframe.md` (file HTML, chữ thật, token thật, thanh công cụ
Xám / Màu), cộng luật riêng:

- **2–3 phương án khác nhau thật** ở ít nhất hai trong ba trục: **bố cục hero** (canh giữa, canh trái
  chữ lớn, chia đôi; `B13`), **nền** (Sáng, Kem, Tối), **món chính hero** (khung thử, terminal / code,
  mảnh giao diện, sơ đồ). Ba bản cùng hero canh giữa khác mỗi màu là **một** phương án.
- Mỗi phương án **một món ký tên khác nhau** ở màn đầu (`B41`); ít nhất một phương án nền Tối, ít nhất
  một phương án dùng font tiêu đề có cá tính (`B3`).
- Mỗi phương án vẽ **cả trang**, đủ các khối của brief, không chỉ hero.
- Mỗi phương án ghi một dòng đầu: hợp khi nào, đổi lại cái gì.

Kết bằng: *"Chọn phương án nào (hay ghép phần nào của bản nào) thì mình dựng."* Rồi dừng.

### B2. Dựng

Chép nguyên phương án đã chọn (`U4` của `ui-ux`), theo `references/blueprint.md` và
`references/sections.md`. Mở hai file này **trước** khi viết khối đầu tiên. Tới phần chuyển động
(màn mở, hiện khi cuộn, demo tự chạy, sơ đồ, dải logo, đếm số) thì mở `references/motion.md`.

### B3. Tự rà rồi giao

1. Chạy probe của `ui-ux` ở `--widths 375,768,1280,1440`, sửa hết lỗi Hỏng.
2. Tự mở trang, cuộn hết ở 1440 và 375, đối chiếu **danh sách soát cuối `references/blueprint.md`**.
3. Lúc giao (`S15` của `ui-ux`): link, các mặc định đã chọn (nền, màu nhấn, font), mục **Cần bạn nối**
   (nút copy prompt copy câu gì, form, số liệu mẫu cần thay, link docs / GitHub, domain cho
   `og:image` của `B32`; trang có ảnh vẽ
   riêng thì thêm dòng sinh ảnh theo `image-prompts.md` của `B31`).
