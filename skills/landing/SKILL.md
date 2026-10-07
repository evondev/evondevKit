---
name: landing
description: Dựng landing page như một designer, hai nhóm - thu lead giới thiệu doanh nghiệp, cửa hàng (spa, thẩm mỹ, nha khoa, salon, showroom, tiệm hoa, tiệm bánh, quán, nhà hàng, công ty sản xuất, bao bì, in ấn, cơ khí) và landing sản phẩm phần mềm (SaaS, app, công cụ cho dev, sản phẩm AI). Hỏi loại trang (dịch vụ đặt lịch, cửa hàng và quán, doanh nghiệp B2B, sản phẩm phần mềm) và khách làm gì (đặt lịch, đặt bàn, nhờ tư vấn, nhận báo giá, dùng thử, cài, mua, đặt demo), bật section theo loại đó, 2–3 wireframe có chữ thật và ảnh thật, người dùng chọn rồi mới dựng. Ảnh thật làm phần bán hàng, một nút chính cùng chữ cùng đích, form liên hệ ngắn và nút Zalo / gọi nổi theo thói quen khách VN, địa chỉ giờ mở cửa rõ ràng; trang sản phẩm có giao diện sản phẩm hay demo dùng được ở hero, chuyển động nhẹ bằng CSS và tắt hết khi giảm chuyển động. Dùng khi dựng, làm lại hay xem giúp landing page, trang giới thiệu doanh nghiệp, trang giới thiệu cửa hàng, website một trang cho spa, quán, công ty, khi người dùng nhắc "landing page", "trang giới thiệu", "trang thu lead", "website cho tiệm", "website công ty", "trang đặt lịch", "trang báo giá", "landing SaaS", "trang chủ sản phẩm", "waitlist", "homepage", "landing", "evon".
---

# Landing page: thu lead cho doanh nghiệp, cửa hàng; trang sản phẩm phần mềm

> **Chưa đi hết mục 0 thì KHÔNG viết một dòng code nào trong lượt này.**
> Mặc định làm như một designer: brief kèm **loại trang và cách khách liên hệ**, 2–3 wireframe,
> người dùng chọn rồi mới dựng. Hai cổng chờ (duyệt brief, chọn wireframe) là hai chỗ duy nhất
> được dừng hỏi. Ngoài hai cổng đó thì **không hỏi**: lấy mặc định, báo lúc giao.

**Skill này đi cùng `ui-ux`** (thư mục anh em `../ui-ux/`). Token, màu, nút, ô nhập, select,
accordion, avatar, panel trượt, probe và quy trình wireframe đều lấy từ đó, không chép lại ở
đây. Cài qua `npx skills` thì phải cài cả hai. Không thấy `../ui-ux/` thì báo một dòng *"thiếu
skill ui-ux đi kèm, cài lại cả bộ evondevKit"* rồi dừng.

Phạm vi: **landing một trang giới thiệu một doanh nghiệp hay cửa hàng có thật, dẫn khách để lại
liên hệ** (đặt lịch, đặt bàn, nhờ tư vấn, nhận báo giá), và **landing sản phẩm phần mềm** dẫn khách
dùng thử, cài, mua, đặt demo (`references/saas.md`). Không gồm: trang bán hàng chạy quảng cáo một
sản phẩm, cửa hàng online có giỏ hàng, blog, trang sự kiện, site agency, portfolio.
Những đề đó báo trước một dòng *"loại trang này skill chưa được dạy, mình vẫn làm theo luật chung
`H`"*, rồi làm.

Skill lo **giao diện**. Form gửi đi đâu (Google Sheet, email, CRM), nối hệ thống đặt lịch nào là
logic của người dùng: để handler rỗng (`onSubmit`) và `href` giữ chỗ, báo lúc giao (`N10` của
`ui-ux`).

⚑ **Mọi luật trong skill này chưa qua vòng test nào.** Bố cục, section và lớp nhìn rút từ 21
trang thu lead nước ngoài được đánh giá cao (7 dịch vụ đặt lịch, 7 cửa hàng và quán, 7 B2B), tra
06/10/2026. Nút Zalo / gọi nổi và form trên trang theo thói quen khách VN (`H13`). Trang sản phẩm
phần mềm rút từ 20 trang đang chạy và 18 trang được khen (tra 01 và 07/10/2026).

---

## 0. Ba câu hỏi, đúng thứ tự này

### Câu 1 — Đề đi lối nào?

| Đề nói | Đi đâu |
| --- | --- |
| **Xem giúp landing đang có** ("xem giúp", "review", "chỗ nào chưa ổn", gửi link hay ảnh trang của họ) | Soi theo `ui-ux` nhánh `V` chế độ soi (`../ui-ux/references/review.md`), thước đo là luật `G`, `K`, `H` của skill này, probe kèm `--landing`. Lập bảng trước/sau, người dùng chọn dòng rồi mới sửa |
| **Dựng luôn, không wireframe** ("dựng luôn", "just build it") | Làm `E1`, `E2`, chọn phương án sẽ khuyên trong đầu, dựng thẳng (`E4`). Lúc giao ghi một dòng: *"Muốn xem các hướng khác thì nhắn `vẽ wireframe`."* |
| **Sửa một khối** (đổi hero, thêm đánh giá, sửa form) | Câu 2, rồi dựng thẳng khối đó theo `references/sections.md`, không hỏi |
| **Mọi đề dựng hay làm lại cả trang** | **Mặc định.** Bốn bước `E1`–`E4` dưới |

### Câu 2 — Dự án đang dùng gì? (TỰ TÌM, ĐỪNG HỎI)

Chạy **đúng khối audit câu 2 của `../ui-ux/SKILL.md`** (stack, component có sẵn, phong cách,
ngôn ngữ copy `T24`). Báo một dòng `Audit:` trước khi đi tiếp. Dự án đã có `Button`, `Input`,
`Select` thì dùng của họ.

### Câu 3 — Loại trang nào, khách để lại gì?

Câu này **quyết định cả trang**: section nào bật, xếp ra sao, nút chính ghi gì, form có ô nào.
Chi tiết ở `references/goals.md`:

| Loại (`G1`) | Khách để lại gì (`G3`) | Nút chính |
| --- | --- | --- |
| **Dịch vụ đặt lịch**: spa, thẩm mỹ, salon, nail, nha khoa, phòng khám | hẹn một buổi | Đặt lịch |
| **Cửa hàng, quán**: showroom, tiệm hoa, tiệm bánh, quán, nhà hàng | đặt bàn, hẹn ghé, nhờ tư vấn | Đặt bàn / Hẹn ghé showroom / Nhắn tư vấn |
| **Doanh nghiệp B2B**: sản xuất, bao bì, in ấn, đồng phục, cơ khí | xin báo giá | Nhận báo giá |
| **Sản phẩm phần mềm**: SaaS, app, công cụ cho dev, AI, template | cài, dùng thử, mua, đặt demo, chờ (`A1`) | lệnh cài / Dùng thử miễn phí / Mua / Đặt lịch demo / Đăng ký chờ |

**Sản phẩm phần mềm mở `references/saas.md` (luật `A`)** thay `G2`–`G7`: bỏ form liên hệ, nút Zalo
nổi, định vị; còn lại đi đúng bốn bước dưới.

Đề không nói thì **đoán theo bảng**, ghi vào brief kèm chữ *đoán* để người dùng sửa ở cổng 1.

---

## 1. Bốn bước, hai cổng

| Bước | Ra cái gì | Cổng |
| --- | --- | --- |
| `E1` Brief | Doanh nghiệp, khách, dịch vụ, điểm khác biệt, **loại trang và kiểu liên hệ**, thứ phải có thật, cảm giác | Gộp với `E2`, **cổng 1** |
| `E2` Danh sách section | Bảng section theo loại (`G2`), mỗi section một dòng nói nó trả lời câu hỏi gì của khách | **Cổng 1**: người dùng sửa hoặc trả lời `ok` |
| `E3` Wireframe | 2–3 phương án, khác ở **kiểu hero và thứ tự section**, chữ thật, ảnh thật | **Cổng 2**: người dùng chọn |
| `E4` Dựng thật | Code theo phương án đã chọn, probe 375 tới 1920 tới khi sạch | Cổng 3 của `../ui-ux/references/checklist.md` |

Chưa qua cổng 2 thì **không đụng file nào của dự án**. Wireframe để ở `$TMPDIR/evon-design/`.

### E1. Brief ⚑

Đọc README, mô tả người dùng gửi, chữ đang có trong dự án. Ghi bảy dòng (tám với dịch vụ đặt
lịch và showroom nội thất), mỗi dòng ghi nguồn (*đọc code*, *người dùng nói*, *đoán*). Sản phẩm
phần mềm: dòng 1 là sản phẩm gì, dòng 3 là 3–4 tính năng chính, dòng 5 là mục tiêu và nút theo
`A1`, dòng 6 theo `A7` (số người dùng, logo khách, lệnh cài), không có dòng 8.

1. **Doanh nghiệp gì, ở đâu**, một câu ("Spa chăm sóc da ở Quận 3", "Xưởng in bao bì carton ở
   Long An").
2. **Khách là ai**: người đi làm gần đó, cô dâu sắp cưới, phòng thu mua của nhà máy…
3. **Dịch vụ hay sản phẩm chính**: 3–6 mục, đây là nguyên liệu của `K5`.
4. **Vì sao chọn nơi này**: thứ chỗ khác không có (phòng riêng, làm tại xưởng không qua trung
   gian, giao trong ngày). Phải hiện ở hero hoặc khối giới thiệu.
5. **Loại trang, kiểu liên hệ, chữ nút chính** (câu 3, `G3`), **kênh liên hệ**: form, Zalo, gọi.
6. **Thứ phải có thật** (`G5`): địa chỉ, số điện thoại, Zalo, giờ mở cửa, ảnh, đánh giá, giá,
   chứng nhận. Người dùng chưa đưa thì ghi *chưa có, sẽ dùng dữ liệu giả và đánh dấu* (`H9`).
7. **Cảm giác của trang**: ấm thanh lịch, sạch tin cậy, mạnh kỹ thuật, tối sang (`H5`). Quyết nền,
   màu nhấn, font tiêu đề. Mức chuyển động mặc định Nhẹ (`H12`).
8. **Định vị** (dịch vụ đặt lịch `G6`: Chuyên môn, Trải nghiệm, Ưu đãi; showroom nội thất `G7`:
   Đóng theo yêu cầu, Showroom thương hiệu, Giá xưởng). Quyết niềm tin đến từ đâu, section thêm
   bớt, chữ nút chính, và đè dòng 7 về lớp nhìn khi hai dòng lệch nhau.

Dòng nào không suy ra được thì hỏi, **tối đa năm câu, gửi một lần**, mỗi câu kèm câu trả lời
đoán sẵn. Không viết persona, không bịa số liệu.

### E2. Danh sách section ⚑

Lấy cột của loại trang trong `G2`, mỗi section một dòng:

| # | Section | Trả lời câu gì của khách | Ghi chú |
| --- | --- | --- | --- |
| 2 | Hero | Nơi này làm gì, ở đâu, bấm đâu | Ảnh tràn, ảnh phòng trị liệu |
| 11 | Liên hệ | Đặt thế nào, ở đâu, mấy giờ mở | Form 4 ô, địa chỉ giả, thay trước khi chạy |

Section người dùng tự nêu trong đề thì giữ, kể cả khi bảng tắt nó. Section bảng tắt mà mình thấy
nên có thì ghi ở cột ghi chú, không tự thêm.

Gửi `E1` và `E2` trong **một** tin, kết bằng *"Đúng thì trả lời `ok`, sai dòng nào thì sửa
dòng đó. Muốn bỏ wireframe, dựng luôn thì trả lời `dựng luôn`."* Dừng chờ.

### E3. Wireframe ⚑

Làm đúng như `U3` của `../ui-ux/references/design-process.md`: một file HTML, token và
component thật, thanh công cụ (Phương án, Màu, Nhấn, Khổ), khung lý do, số khối
`data-wf-block`, link bấm được qua server tĩnh, probe từng phương án trước khi gửi (`--quick --landing`). Khác ở:

- **Phương án khác nhau ở kiểu hero (`K2` A ảnh tràn, B chia đôi, C panel) và thứ tự section**,
  không ở màu hay bo góc. Ví dụ dịch vụ đặt lịch: A ảnh tràn, đội ngũ sau dịch vụ; B chia đôi ảnh
  vòm, đánh giá lên ngay sau giới thiệu; C panel, thực đơn dịch vụ dạng danh sách (`K5` B). Phương
  án khuyên dùng theo cột mặc định của `G2`.
- **Dịch vụ đặt lịch hay showroom nội thất mà đề chưa rõ định vị** (`G6`, `G7`): ba phương án là
  **ba định vị**, mỗi cái đúng section và lớp nhìn của nó, để người dùng chọn bằng mắt. Đề
  đã rõ định vị thì ba phương án nằm trong định vị đó, khác ở hero và thứ tự như trên.
- **D, E của `U3` thành:** D **trang ngắn**: chỉ hero, dịch vụ, liên hệ, footer; E **bỏ lặp**:
  mỗi ý một chỗ (hero và giới thiệu không nói cùng một câu).
- **Sản phẩm phần mềm:** phương án khác ở cách hero khoe sản phẩm (màn app dưới chữ, demo dùng
  được, chữ trái màn app phải), cách xếp tính năng (bento, hàng xen kẽ, cuộn ghim) và lớp nhìn có
  khung lộ (`A4`) hay không. Không nút nổi.
- **Nhóm Trạng thái** cho form liên hệ: Mặc định, Lỗi, Đã gửi (`K11`); trang sản phẩm chỉ khi có
  form email (danh sách chờ).
- **Không vẽ khối xám cho ảnh.** Ảnh mẫu thật theo `S16` của `ui-ux` ngay từ wireframe: người
  dùng chọn hero vì nhìn thấy không gian, không vì khối xám.
- **Mỗi phương án là cả trang**, từ header tới footer, có nút nổi (`K13`).
- **Khổ 375 là khổ chính** (`H10`): ảnh khung 375 nằm đầu khung lý do.

Kết bằng *"Chọn A, B hay C, kèm D, E nếu muốn. Góp ý theo số khối."* Dừng chờ.

### E4. Dựng thật ⚑

- Ráp từ `references/sections.md`, mỗi section một component (`hero.tsx`, `contact.tsx`…), trang
  chỉ xếp chúng theo thứ tự đã chọn. Bọc trang trong `.landing` đặt token trang (`H5`).
- Phần tử có mẫu ở `ui-ux` thì mở đúng file đó và chép công thức (bảng mục 2 của
  `../ui-ux/SKILL.md`): nút, ô nhập, select, accordion, avatar, panel trượt mobile.
- Font tiêu đề serif (dịch vụ, cửa hàng) nạp có subset tiếng Việt (`H3`).
- Chạy `../ui-ux/scripts/probe.mjs <url> --sweep --landing` và soi ảnh 375, 1280, 1920 như cổng 3.
  **Luôn kèm `--landing`**: bỏ các phép đo chỉ đúng cho màn app, thêm phép đo nút chính cùng chữ cùng
  đích (`H1`), padding section đều (`H2`), nút nổi đè nút hay ô form khi cuộn (`H13`). Sửa
  tới khi danh sách `P` trống, tối đa ba vòng.
- Chạy mục 3 dưới trước khi báo xong.

---

## 2. Mở doc nào khi nào

**Một luật một chỗ.** File này chỉ trỏ số hiệu.

| Nhóm | File | Dùng cho |
| --- | --- | --- |
| **G** | `references/goals.md` | Loại trang → bật section nào, thứ tự, chữ nút chính, ô form, giá, thứ phải có thật, định vị (`G6`) |
| **K** | `references/sections.md` | Mười ba loại section, mỗi loại 1–3 biến thể có code |
| **H** | `references/page-rules.md` | Luật chung toàn trang: CTA, nhịp, thang chữ và font, chữ hero, nền và màu, ảnh, header, dữ liệu giả, màn hẹp, chuyển động, nút nổi |
| **A** | `references/saas.md` | Trang sản phẩm phần mềm: mục tiêu và nút, bộ section, hero có sản phẩm, lớp nhìn, bento, chuyển động, dữ liệu giả |
| **C** | `references/motion.md` | Cách làm từng hiệu ứng: hero hiện dần, hiện khi cuộn, gõ chữ, dải chạy, đếm số, cuộn ghim, vòng lặp nền, cuộn mượt |

**Lấy từ `ui-ux`, không chép:**

| Cần | Mở |
| --- | --- |
| Token, màu nhấn, font, đổi thương hiệu | `../ui-ux/references/tokens.css`, `brand-tokens.md` |
| Màu, viền, bóng (`M`), chữ và ngôn ngữ copy (`T`), phong cách (`P`) | `../ui-ux/references/rules-color.md`, `rules-type.md`, `styles.md` |
| Nút | `../ui-ux/references/components/button.md` |
| Ô nhập, form liên hệ | `../ui-ux/references/components/input.md`, `rules-form.md` |
| Select dịch vụ (ô chọn và danh sách thả) | `../ui-ux/references/components/input.md`, `layouts/overlay.md` |
| FAQ | `../ui-ux/references/components/accordion.md` |
| Avatar trong đánh giá | `../ui-ux/references/components/avatar.md` |
| Menu ☰ mobile mở panel trượt | `../ui-ux/references/layouts/overlay.md`, mục Panel trượt |
| Ảnh mẫu thật (Unsplash, randomuser) | `S16` trong `../ui-ux/SKILL.md` |
| Nguyên tắc, mười hai phép thử | `../ui-ux/references/principles.md` |

**Đè lên luật nào của `ui-ux`** (chỉ trong landing, trong app vẫn theo `ui-ux`):

- **Thang chữ** của `budgets.md` (trần `3xl`) → thang landing và font tiêu đề serif ở `H3`.
- **Nhịp và khung trang** của `budgets.md` (nền xám, card trắng, `p-6`) → `H2`, nền trang theo `H5`.
- **`S1`, `S5` (không tự thêm section)** → bộ section lấy theo loại trang (`G2`), người dùng
  duyệt ở cổng 1.
- **Nút cao 40px (`button.md`)** → nút ở hero và khối Liên hệ cao 48px (`H1`).
- **Chữ không đặt trên ảnh** → được ở hero, có lớp phủ đo tương phản (`H11`).
- **`F22` (không chuyển động trang trí)** → ba mức, mặc định Nhẹ (`H12`), cách làm ở `motion.md`.

---

## 3. Tám thứ không được quên

- [ ] Đã hỏi (hoặc đoán và ghi *đoán*) **loại trang và kiểu liên hệ**. Section bật đúng cột của
  loại đó (`G2`).
- [ ] **Một CTA chính**: cùng chữ, cùng đích ở header, hero, khối Liên hệ (`H1`). Header chỉ một
  nút đặc.
- [ ] **H1 và câu dẫn nói làm gì, ở đâu**, không câu chung chung (`H4`).
- [ ] **Ảnh thật** ở hero và các khối, không khối xám, không minh hoạ (`H6`). Ảnh mẫu đã `GIẢ:`.
- [ ] Thu lead: **form liên hệ** đúng ô của `G3`, số điện thoại bắt buộc, ba trạng thái (`K11`);
  **nút Zalo / gọi nổi** cùng tông, không nhấp nháy (`H13`); **địa chỉ, giờ, số điện thoại** ở khối
  Liên hệ và footer, giả thì đánh dấu (`H9`).
- [ ] Sản phẩm phần mềm: **hero có sản phẩm** (màn app dựng giống thật hay demo dùng được, `A3`);
  bật giảm chuyển động thì trang đứng yên (`C1`).
- [ ] **Nhịp đều**: mọi section cùng padding dọc, cùng khung bề rộng (`H2`).
- [ ] Đã probe 375 tới 1920 và xem ảnh, **375 trước**. Trang cuộn ngang ở 375 là hỏng (`H10`).

## 4. Lúc giao nói gì

Theo `S15` của `ui-ux`, cộng ba dòng riêng của landing, đặt **lên đầu**:

1. *"Loại trang: [dịch vụ đặt lịch]. Nút chính: [Đặt lịch] ở header, hero, khối Liên hệ. Nút
   Zalo / gọi nổi góc phải dưới."* Trang sản phẩm: *"Loại trang: sản phẩm phần mềm, mục tiêu
   [dùng thử]. Nút chính: [Dùng thử miễn phí] ở header, hero, CTA cuối. Chuyển động: [Nhẹ], tắt hết
   khi bật giảm chuyển động."*
2. *"Section đã dựng: …; đã bỏ: … (theo loại trang). Muốn thêm thì nói."*
3. *"Dữ liệu giả cần thay trước khi chạy thật: [địa chỉ, số điện thoại, Zalo, giờ, ảnh, đánh
   giá, giá]. Đã đánh dấu `GIẢ:` trong code."* (`H9`)

Rồi các dòng của `S15`: chỗ đổi màu nhấn, nền và font, dark mode có hay không, form và link nào
đang để trống cho người dùng nối (`N10`).

## 5. Thêm luật mới

Theo mục 4 của `../ui-ux/SKILL.md`: tối đa 5 luật mỗi đợt, nói rõ thay hay mâu thuẫn luật nào,
có điều kiện áp dụng, đánh số liền mạch, luật chưa qua test gắn ⚑. Luật về tỉ lệ ("4/7 trang
làm vậy") **tra lại trang thật** trước khi đổi, không sửa theo trí nhớ.
