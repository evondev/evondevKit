---
name: landing
description: Dựng landing page cho sản phẩm phần mềm (SaaS, app, công cụ, template) như một designer - hỏi một câu khách vào trang cần làm gì (dùng thử, mua luôn, đặt lịch demo, vào danh sách chờ), bật section theo mục tiêu đó, 2–3 wireframe có chữ thật và ảnh sản phẩm dựng giống thật, người dùng chọn rồi mới dựng. Bộ section cố định - header, hero, social proof, tính năng, cách hoạt động, pricing, FAQ, CTA cuối trang, footer. Một CTA chính cùng chữ cùng đích dọc trang, một màu nhấn, nhịp section đều. Dùng khi dựng, làm lại hay xem giúp landing page, trang giới thiệu sản phẩm, trang chủ website của sản phẩm, trang danh sách chờ, khi người dùng nhắc "landing page", "trang giới thiệu", "trang chủ sản phẩm", "waitlist", "early access", "trang bán hàng", "homepage", "marketing site", "landing", "evon".
---

# Landing page cho sản phẩm phần mềm

> **Chưa đi hết mục 0 thì KHÔNG viết một dòng code nào trong lượt này.**
> Mặc định làm như một designer: brief kèm **mục tiêu của trang**, 2–3 wireframe, người dùng
> chọn rồi mới dựng. Hai cổng chờ (duyệt brief, chọn wireframe) là hai chỗ duy nhất được dừng
> hỏi. Ngoài hai cổng đó thì **không hỏi**: lấy mặc định, báo lúc giao.

**Skill này đi cùng `ui-ux`** (thư mục anh em `../ui-ux/`). Token, màu, nút, ô nhập, accordion,
avatar, bảng giá, panel trượt, probe và quy trình wireframe đều lấy từ đó, không chép lại ở
đây. Cài qua `npx skills` thì phải cài cả hai. Không thấy `../ui-ux/` thì báo một dòng *"thiếu
skill ui-ux đi kèm, cài lại cả bộ evondevKit"* rồi dừng.

Phạm vi: **landing page của sản phẩm phần mềm**, một trang dài đọc dọc, dẫn tới một hành động.
Không gồm: cửa hàng nhiều sản phẩm, blog, portfolio, trang sự kiện (vẫn theo câu báo "chưa
được dạy" của `ui-ux`). Trang giá đứng riêng (`/pricing`) và màn trong app thì về `ui-ux`.

Skill lo **giao diện**. Gửi form đi đâu, nối mailing list nào, mở checkout nào là logic của
người dùng: để handler rỗng (`onSubmit`) và `href` giữ chỗ, báo lúc giao (`N10` của `ui-ux`).

⚑ **Mọi luật trong skill này chưa qua vòng test nào.** Bố cục và section rút từ 20 landing page
đang chạy (5 mỗi mục tiêu), tra 01/10/2026. Lớp nhìn (nền hero, ảnh sản phẩm, card tính năng, độ
đậm tiêu đề) rút từ 21 mẫu thiết kế landing được đánh giá cao, tra 02/10/2026.

---

## 0. Ba câu hỏi, đúng thứ tự này

### Câu 1 — Đề đi lối nào?

| Đề nói | Đi đâu |
| --- | --- |
| **Xem giúp landing đang có** ("xem giúp", "review", "chỗ nào chưa ổn", gửi link hay ảnh trang của họ) | Soi theo `ui-ux` nhánh `V` chế độ soi (`../ui-ux/references/review.md`), thước đo là luật `G`, `K`, `H` của skill này. Lập bảng trước/sau, người dùng chọn dòng rồi mới sửa |
| **Dựng luôn, không wireframe** ("dựng luôn", "just build it") | Làm `E1`, `E2`, chọn phương án sẽ khuyên trong đầu, dựng thẳng (`E4`). Lúc giao ghi một dòng: *"Muốn xem các hướng khác thì nhắn `vẽ wireframe`."* |
| **Sửa một khối** (đổi hero, thêm FAQ, sửa footer) | Câu 2, rồi dựng thẳng khối đó theo `references/sections.md`, không hỏi |
| **Mọi đề dựng hay làm lại cả trang** | **Mặc định.** Bốn bước `E1`–`E4` dưới |

### Câu 2 — Dự án đang dùng gì? (TỰ TÌM, ĐỪNG HỎI)

Chạy **đúng khối audit câu 2 của `../ui-ux/SKILL.md`** (stack, component có sẵn, phong cách,
ngôn ngữ copy `T24`). Báo một dòng `Audit:` trước khi đi tiếp. Dự án đã có `Button`, `Input`,
`Accordion` thì dùng của họ.

### Câu 3 — Khách vào trang cần làm gì?

Đây là câu **quyết định cả trang**: section nào bật, xếp ra sao, nút chính ghi gì. Bốn mục
tiêu, chi tiết ở `references/goals.md`:

| Mục tiêu | Nhận ra khi đề nói |
| --- | --- |
| **Dùng thử** | đăng ký, dùng miễn phí, free trial, sign up, có gói free |
| **Mua luôn** | mua, trả một lần, license, lifetime, template, bộ code bán sẵn |
| **Đặt lịch demo** | B2B, doanh nghiệp, đội sales, "liên hệ", báo giá, demo |
| **Danh sách chờ** | chưa ra mắt, sắp ra mắt, early access, waitlist, beta kín |

Đề không nói thì **đoán theo bảng**, ghi vào brief kèm chữ *đoán* để người dùng sửa ở cổng 1.
Không đoán được thì mặc định **dùng thử**.

---

## 1. Bốn bước, hai cổng

| Bước | Ra cái gì | Cổng |
| --- | --- | --- |
| `E1` Brief | Sản phẩm, cho ai, làm được gì, điểm khác biệt, **mục tiêu**, chữ nút chính | Gộp với `E2`, **cổng 1** |
| `E2` Danh sách section | Bảng section theo mục tiêu (`goals.md`), mỗi section một dòng nói nó trả lời câu hỏi gì của khách | **Cổng 1**: người dùng sửa hoặc trả lời `ok` |
| `E3` Wireframe | 2–3 phương án, khác ở **kiểu hero và thứ tự section**, chữ thật, ảnh sản phẩm dựng giống thật | **Cổng 2**: người dùng chọn |
| `E4` Dựng thật | Code theo phương án đã chọn, probe 375 tới 1920 tới khi sạch | Cổng 3 của `../ui-ux/references/checklist.md` |

Chưa qua cổng 2 thì **không đụng file nào của dự án**. Wireframe để ở `$TMPDIR/evon-design/`.

### E1. Brief ⚑

Đọc README, mô tả người dùng gửi, chữ đang có trong dự án. Ghi sáu dòng, mỗi dòng ghi nguồn
(*đọc code*, *người dùng nói*, *đoán*):

1. **Sản phẩm gì**, một câu.
2. **Cho ai**: nghề, quy mô (dev một mình, đội 10 người, phòng kế toán).
3. **Làm được gì cho họ**: kết quả cụ thể, đây là nguyên liệu của H1 (`H4`).
4. **Điểm khác biệt**: thứ chỗ khác không có. Phải hiện ở hero hoặc khối tính năng đầu.
5. **Mục tiêu** (câu 3) và **chữ nút chính** (`goals.md`).
6. **Thứ có hậu quả nếu sai**: giá, chính sách hoàn tiền, "không cần thẻ", số khách, tên khách
   hàng. Người dùng chưa đưa thì ghi *chưa có, sẽ dùng số giả và đánh dấu* (`H9`).

Dòng nào không suy ra được thì hỏi, **tối đa năm câu, gửi một lần**, mỗi câu kèm câu trả lời
đoán sẵn. Không viết persona, không bịa số liệu nghiên cứu.

### E2. Danh sách section ⚑

Lấy cột của mục tiêu trong `goals.md`, mỗi section một dòng:

| # | Section | Trả lời câu gì của khách | Ghi chú |
| --- | --- | --- | --- |
| 2 | Hero | Cái này là gì, cho ai, bấm đâu | Chia đôi, ảnh app bên phải |
| 3 | Dải logo | Ai đang dùng | Logo giả, thay trước khi chạy |

Section người dùng tự nêu trong đề thì giữ, kể cả khi bảng mục tiêu tắt nó. Section bảng tắt
mà mình thấy nên có thì ghi ở cột ghi chú, không tự thêm.

Gửi `E1` và `E2` trong **một** tin, kết bằng *"Đúng thì trả lời `ok`, sai dòng nào thì sửa
dòng đó. Muốn bỏ wireframe, dựng luôn thì trả lời `dựng luôn`."* Dừng chờ.

### E3. Wireframe ⚑

Làm đúng như `U3` của `../ui-ux/references/design-process.md`: một file HTML, token và
component thật, thanh công cụ (Phương án, Màu, Nhấn, Khổ), khung lý do, số khối
`data-wf-block`, link bấm được qua server tĩnh, probe từng phương án trước khi gửi. Khác ở:

- **Phương án khác nhau ở kiểu hero, kiểu nền hero (`H11`: hào quang, lưới mờ, ảnh) và thứ tự
  section**, không ở màu hay bo góc. Ví dụ: A hero
  chia đôi, tính năng lưới card; B hero chữ trái ảnh rộng bên dưới, tính năng một ảnh lớn kèm
  ba điểm; C hero canh giữa, testimonial lên ngay sau hero. Phương án khuyên dùng theo cột
  mặc định của `goals.md`.
- **D, E của `U3` thành:** D **trang ngắn**: chỉ giữ section bắt buộc của mục tiêu; E **bỏ
  lặp**: mỗi ý một chỗ (hero và tính năng đầu không nói cùng một câu, CTA cuối không chép H1).
- **Nhóm Trạng thái chỉ có khi trang có form** (danh sách chờ, demo có ô email): Mặc định,
  Đã gửi, Lỗi. Không có form thì bỏ nhóm.
- **Không vẽ khối xám cho ảnh sản phẩm.** Dựng màn app giả bằng component của `ui-ux` (`H6`),
  ngay từ wireframe: người dùng chọn hero vì nhìn thấy sản phẩm, không vì khối xám.
- **Mỗi phương án là cả trang**, từ header tới footer: landing được chọn theo nhịp cả trang,
  không theo màn đầu.

Kết bằng *"Chọn A, B hay C, kèm D, E nếu muốn. Góp ý theo số khối."* Dừng chờ.

### E4. Dựng thật ⚑

- Ráp từ `references/sections.md`, mỗi section một component (`hero.tsx`, `faq.tsx`…), trang
  chỉ xếp chúng theo thứ tự đã chọn.
- Phần tử có mẫu ở `ui-ux` thì mở đúng file đó và chép công thức (bảng mục 2 của
  `../ui-ux/SKILL.md`): nút, ô nhập, accordion, avatar, card bảng giá, panel trượt mobile.
- Chạy `../ui-ux/scripts/probe.mjs <url> --sweep` và soi ảnh 375, 1280, 1920 như cổng 3. Sửa
  tới khi danh sách `P` trống, tối đa ba vòng.
- Chạy mục 3 dưới trước khi báo xong.

---

## 2. Mở doc nào khi nào

**Một luật một chỗ.** File này chỉ trỏ số hiệu.

| Nhóm | File | Dùng cho |
| --- | --- | --- |
| **G** | `references/goals.md` | Mục tiêu → bật section nào, thứ tự mặc định, chữ nút chính, pricing dạng gì |
| **K** | `references/sections.md` | Chín loại section, mỗi loại 1–3 biến thể có code |
| **H** | `references/page-rules.md` | Luật chung toàn trang: CTA, thang chữ, nhịp, bề rộng, màu, chữ hero, ảnh sản phẩm, dữ liệu giả, màn hẹp |

**Lấy từ `ui-ux`, không chép:**

| Cần | Mở |
| --- | --- |
| Token, màu nhấn, font, đổi thương hiệu | `../ui-ux/references/tokens.css`, `brand-tokens.md` |
| Màu, viền, bóng (`M`), chữ và ngôn ngữ copy (`T`), phong cách (`P`) | `../ui-ux/references/rules-color.md`, `rules-type.md`, `styles.md` |
| Nút | `../ui-ux/references/components/button.md` |
| Ô nhập (form email) | `../ui-ux/references/components/input.md` |
| FAQ | `../ui-ux/references/components/accordion.md` |
| Avatar người trong testimonial | `../ui-ux/references/components/avatar.md` |
| Card bảng giá | `../ui-ux/references/layouts/pricing.md` |
| Menu ☰ mobile mở panel trượt | `../ui-ux/references/layouts/overlay.md`, mục Panel trượt |
| Màn app giả trong ảnh hero | `../ui-ux/references/layouts/app.md` và `components/` |
| Ảnh mẫu thật (Unsplash, randomuser) | `S16` trong `../ui-ux/SKILL.md` |
| Nguyên tắc, mười hai phép thử | `../ui-ux/references/principles.md` |

**Đè lên luật nào của `ui-ux`** (chỉ trong landing, trong app vẫn theo `ui-ux`):

- **Thang chữ** của `budgets.md` (trần `3xl`) → thang landing ở `H3`.
- **Nhịp và khung trang** của `budgets.md` (nền xám, card trắng, `p-6`) → `H2`.
- **`S1`, `S5` (không tự thêm section)** → bộ section lấy theo mục tiêu (`G1`), người dùng
  duyệt ở cổng 1.
- **Nút cao 40px (`button.md`)** → nút ở hero và CTA cuối trang cao 44px (`H1`).
- **`M12` không gradient** → được ở nền hero và panel CTA cuối (`H11`), chỗ khác vẫn không.
- **Bóng chỉ cho lớp nổi (`M15`)** → màn app và mảnh nổi trên nền hero có bóng (`H6`).

---

## 3. Bảy thứ không được quên

- [ ] Đã hỏi (hoặc đoán và ghi *đoán*) **mục tiêu của trang** chưa. Section bật đúng cột của
  mục tiêu đó (`G1`).
- [ ] **Một CTA chính**: cùng chữ, cùng đích ở header, hero, CTA cuối trang (`H1`). Header chỉ
  một nút đặc.
- [ ] **H1 nói làm được gì cho ai**, không câu chung chung (`H4`).
- [ ] **Ảnh sản phẩm là màn app dựng giống thật** đặt trên nền hero, không minh hoạ trừu
  tượng, không khối xám (`H6`, `H11`). Card tính năng có mảnh giao diện, không chỉ icon (`K4`).
- [ ] **Nhịp đều**: mọi section cùng một padding dọc, cùng một khung bề rộng (`H2`).
- [ ] **Số, logo, testimonial, giá giả đã đánh dấu** trong code và nói lúc giao (`H9`).
- [ ] Đã probe 375 tới 1920 và xem ảnh. Trang cuộn ngang ở 375 là hỏng (`H10`).

## 4. Lúc giao nói gì

Theo `S15` của `ui-ux`, cộng ba dòng riêng của landing, đặt **lên đầu**:

1. *"Mục tiêu trang: [dùng thử]. Nút chính: [Dùng thử miễn phí] ở header, hero, cuối trang."*
2. *"Section đã dựng: …; đã bỏ: … (theo mục tiêu). Muốn thêm thì nói."*
3. *"Dữ liệu giả cần thay trước khi chạy thật: [logo, số khách, testimonial, giá]. Đã đánh dấu
   `GIẢ:` trong code."* (`H9`)

Rồi các dòng của `S15`: chỗ đổi màu nhấn và font, dark mode có hay không, link và form nào
đang để trống cho người dùng nối (`N10`).

## 5. Thêm luật mới

Theo mục 4 của `../ui-ux/SKILL.md`: tối đa 5 luật mỗi đợt, nói rõ thay hay mâu thuẫn luật nào,
có điều kiện áp dụng, đánh số liền mạch, luật chưa qua test gắn ⚑. Luật về tỉ lệ ("4/5 trang
làm vậy") **tra lại trang thật** trước khi đổi, không sửa theo trí nhớ.
