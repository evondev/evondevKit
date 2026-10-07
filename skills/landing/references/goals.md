# Loại trang và cách khách liên hệ — luật G

Landing của skill này chỉ có **một mục tiêu: khách để lại liên hệ**. Cái khác nhau giữa các trang
là **loại doanh nghiệp** (quyết section nào bật, xếp ra sao) và **kiểu liên hệ** (quyết chữ nút
chính, form có những ô nào).

⚑ Bảng dưới đếm từ 21 trang thu lead nước ngoài được đánh giá cao, 7 trang mỗi loại, tra
06/10/2026. Số trong ngoặc là số trang trên 7 có làm vậy. Trang VN cùng loại không dùng làm mẫu
vì lớp nhìn kém. Hai thứ **không đếm từ trang nào** mà theo thói quen khách VN: nút Zalo / gọi nổi
và form liên hệ ngay trên trang (`G3`, `H13`).

---

## G1. Bốn loại trang ⚑

| Loại | Gồm | Nhận ra khi đề nói |
| --- | --- | --- |
| **Dịch vụ đặt lịch** | spa, thẩm mỹ, da liễu, salon tóc, nail, nha khoa, vật lý trị liệu, phòng khám nhỏ | đặt lịch, liệu trình, khách tới làm dịch vụ |
| **Cửa hàng, quán** | showroom nội thất, bếp, xe; tiệm hoa, tiệm bánh; quán cà phê, nhà hàng | cửa hàng, showroom, quán, ghé, đặt bàn, xem hàng tận nơi |
| **Doanh nghiệp B2B** | sản xuất, bao bì, in ấn, đồng phục, cơ khí, nhựa, thiết bị, gia công | công ty, nhà máy, xưởng, báo giá, đơn hàng số lượng, khách doanh nghiệp |
| **Sản phẩm phần mềm** | SaaS, app, công cụ cho dev, sản phẩm AI, template, bộ code | đăng ký, dùng thử, cài, npm, tải app, gói tháng, demo, waitlist |

**Sản phẩm phần mềm đi theo `references/saas.md` (luật `A`)**, không theo `G2`–`G7`: khách vào để
dùng thử, cài, mua, không để lại số điện thoại; không form liên hệ, không nút Zalo / gọi nổi.

Đề không nói rõ thì **đoán theo bảng**, ghi vào brief kèm chữ *đoán*. Loại không nằm trong bốn nhóm
(công ty luật, trung tâm tiếng Anh, khách sạn…) thì lấy loại gần nhất theo cách khách liên hệ:
hẹn một buổi là dịch vụ đặt lịch, ghé xem là cửa hàng, xin báo giá là B2B. Báo một dòng *"X chưa
có mẫu riêng, mình theo khung Y"*.

## G2. Bảng bật section theo loại ⚑

`✓` bật mặc định. `–` tắt. Tắt không có nghĩa là cấm: người dùng nêu trong đề thì bật (`E2`).

| # | Section (`sections.md`) | Dịch vụ đặt lịch | Cửa hàng, quán | B2B |
| --- | --- | --- | --- | --- |
| 1 | Header | ✓ (7/7 dính đỉnh) | ✓ | ✓ |
| 2 | Hero | ✓ ảnh tràn hay panel | ✓ ảnh tràn (6/7 ảnh lớn) | ✓ ảnh/video tràn hay chia đôi |
| 3 | Dải logo khách | – (2/7) | – (1/7) | ✓ ngay dưới hero (5/7) |
| 4 | Giới thiệu | ✓ (7/7) | ✓ (7/7) | ✓ "vì sao chọn" kèm con số (7/7, số 4/7) |
| 5 | Dịch vụ / sản phẩm | ✓ (6/7) | ✓ (7/7) | ✓ năng lực, sản phẩm (6/7) |
| 6 | Không gian, đội ngũ | ✓ (không gian 4/7, đội ngũ 4/7) | ✓ (6/7) | ✓ xưởng, máy móc (3/7, +1 nói bằng chữ) |
| 7 | Quy trình | – (1/7) | – | ✓ cách đặt hàng (5/7) |
| 8 | Đánh giá | ✓ 2–3 câu (4/7) | – (3/7) | ✓ (6/7) |
| 9 | Chứng nhận | – | – | ✓ chỉ khi có thật (4/7) |
| 10 | FAQ | – (1/7) | – (0/7) | – (2/7) |
| 11 | Liên hệ (form + địa chỉ) | ✓ | ✓ | ✓ |
| 12 | Footer | ✓ nền tối (5/7) | ✓ | ✓ nền tối (5/7) |
| – | Nút Zalo / gọi nổi | ✓ | ✓ | ✓ |

**Thứ tự mặc định** (số là cột `#`):

| Loại | Thứ tự |
| --- | --- |
| Dịch vụ đặt lịch | 1 · 2 · 4 · 5 · 6 · 8 · 11 · 12 |
| Cửa hàng, quán | 1 · 2 · 4 · 5 · 6 · 11 · 12 |
| B2B | 1 · 2 · 3 · 5 · 4 · 6 · 7 · 8 · 9 · 11 · 12 |

- Cửa hàng có đánh giá thật (điểm Google, câu khách viết) thì bật 8 sau 6.
- B2B: năng lực đứng trước giới thiệu (khách B2B tới để xem làm được gì), giới thiệu kèm con số
  đứng sau làm bằng chứng.
- Ưu đãi, gói thành viên (dịch vụ đặt lịch 4/7): không thành section riêng. Có ưu đãi thật thì
  thành một dòng ở hero (`K2`) hay một card trong khối dịch vụ.
- Không có trong bộ nền: bảng giá đầy đủ, đếm ngược khuyến mãi, tin tức, Instagram, bản đồ nhúng
  (0–1/7 mọi loại). Người dùng xin thì mượn khuôn gần nhất trong `sections.md`, báo một dòng.

## G3. Kiểu liên hệ, chữ nút chính, form ⚑

Nút chính gọi **đúng việc khách sắp làm**. Không "Liên hệ ngay", "Tìm hiểu thêm", "Xem thêm"
làm nút chính.

| Loại | Kiểu liên hệ | Nút chính | Nút phụ ở hero |
| --- | --- | --- | --- |
| Dịch vụ đặt lịch | đặt một buổi | **Đặt lịch** (7/7 bắt đầu bằng "Book") | không |
| Quán | đặt bàn | **Đặt bàn** | viền "Xem thực đơn", cuộn tới khối 5 |
| Showroom, cửa hàng | hẹn ghé, nhờ tư vấn | **Hẹn ghé showroom** (showroom), **Nhắn tư vấn** (tiệm nhỏ) | viền "Xem sản phẩm" |
| B2B | xin báo giá | **Nhận báo giá** (4/7 có chữ "quote") | viền "Xem năng lực sản xuất" (6/7 có hai nút) |

- Showroom: khách tới để ngồi thử, sờ tận tay, nên nút gọi đúng việc đó ("Hẹn ghé showroom",
  đúng chữ các showroom đã tra). "Đặt lịch tư vấn" không nói tư vấn ở đâu, khách
  tưởng ngồi nhà chờ gọi.
- B2B gia công theo bản vẽ, cơ khí: "Liên hệ tư vấn" được (3/7 dùng "Contact"), vì khách chưa
  biết cần báo giá món gì.
- **Đích của nút chính là form ở khối Liên hệ** (`#lien-he`), cùng một đích ở mọi chỗ. Người
  dùng đã có trang đặt lịch hay hệ thống đặt bàn riêng thì nút dẫn thẳng sang đó (4/7 trang dịch
  vụ làm vậy), form vẫn giữ cho ai muốn được gọi lại.

**Form liên hệ** (theo thói quen VN: trang nước ngoài gần như không đặt form ngay trên trang, 0–2/7,
mà dẫn sang trang riêng; landing một trang của khách VN thì form phải nằm trên trang):

| Loại | Ô (theo thứ tự) | Nút gửi |
| --- | --- | --- |
| Dịch vụ đặt lịch | Họ tên · Số điện thoại · Dịch vụ quan tâm (select, không bắt buộc, mục cuối "Chưa biết, cần tư vấn") · Ngày muốn đến (không bắt buộc) | Đặt lịch |
| Quán | Họ tên · Số điện thoại · Ngày · Giờ · Số người · Ghi chú (không bắt buộc) | Đặt bàn |
| Cửa hàng, showroom | Họ tên · Số điện thoại · Cần tư vấn gì (không bắt buộc) | Hẹn ghé showroom / Nhắn tư vấn |
| B2B | Họ tên · Công ty · Số điện thoại · Email · Sản phẩm cần · Số lượng dự kiến (không bắt buộc) · Ghi chú (không bắt buộc) | Nhận báo giá |

- **Nút gửi cùng chữ nút chính** (`H1`): khách bấm "Hẹn ghé showroom" ở hero, cuộn tới form thì
  nút cuối form cũng là "Hẹn ghé showroom", không đổi thành "Gửi yêu cầu" (wireframe Gỗ Tâm An
  06/10/2026: ba chữ cho một việc).
- **Số điện thoại bắt buộc ở mọi loại**: khách VN được gọi lại hoặc nhắn Zalo, không qua email.
  Email chỉ bắt buộc ở B2B (form B2B nước ngoài 7/7 có email).
- **Ô nào không ghi "(không bắt buộc)" thì phải chặn khi trống.** Nhãn nói bắt buộc mà bỏ trống vẫn
  gửi được là khách không biết tin chữ nào. Khách mới chưa biết chọn dịch vụ gì là chuyện thường:
  để select không bắt buộc, đừng bắt họ đoán.
- Ô tối đa như bảng (form B2B nước ngoài 5–8 ô, chỉ 1/7 có ô số lượng, 1/7 có tải file). Không
  thêm ô "Bạn biết chúng tôi qua đâu", không thêm captcha nhìn thấy.
- Chữ nút gửi theo việc, không "Gửi", không "Submit" (6/7 trang nước ngoài ghi "Submit", nhưng
  chữ chung chung làm khách không chắc vừa đăng ký cái gì).
- Gửi đi đâu (Google Sheet, email, CRM) là logic người dùng: handler để trống, báo lúc giao
  (`N10` của `ui-ux`).

## G4. Giá và ưu đãi ⚑

- **Không bảng giá đầy đủ trên trang** (dịch vụ đặt lịch 0/7, B2B 0/7: giá nằm ở trang dịch vụ
  hay báo giá riêng).
- Dịch vụ đặt lịch, quán: card dịch vụ / món **được ghi giá "từ …"** khi người dùng đưa giá
  (quán 3/7 có giá). Không đưa thì card không có dòng giá, không để `[cần điền]` ở từng card.
- B2B: không giá. Dòng nhỏ dưới nút "Báo giá trong 24 giờ làm việc" chỉ khi người dùng hứa vậy.
- Ưu đãi (giảm giá lần đầu, quà) chỉ khi người dùng đưa: một dòng dưới H1 hay trên nút hero,
  không popup. Định vị Ưu đãi (`G6`) thì ưu đãi thành khối riêng ở hero.

## G5. Thứ người dùng phải đưa thật ⚑

Landing doanh nghiệp là **lời khẳng định với khách thật về một nơi có thật**. Những thứ sau, người
dùng chưa đưa thì dựng bằng dữ liệu giả để thấy bố cục, đánh dấu `GIẢ:` (`H9`), liệt kê lúc giao:

- Địa chỉ, số điện thoại, số Zalo, giờ mở cửa, email.
- Ảnh tiệm, xưởng, đội ngũ, sản phẩm (ảnh mẫu Unsplash không phải nơi của họ).
- Đánh giá khách, điểm Google, logo khách hàng, con số (năm kinh nghiệm, số khách, công suất).
- Chứng nhận (ISO, FSC…), giấy phép, mã số thuế: **không bịa**, chưa có thì bỏ khối.
- Giá, ưu đãi.

## G6. Định vị của dịch vụ đặt lịch ⚑

Cùng một ngành mà định vị khác thì **niềm tin đến từ thứ khác**, nên bộ section, nút chính, lớp
nhìn đều khác, không chỉ màu. Đếm từ 15 trang spa, phòng khám thẩm mỹ, da liễu (5 mỗi định vị),
tra 06/10/2026. Mẫu Ưu đãi phần lớn là trang ưu đãi chạy quảng cáo, không phải trang chủ. **Chỉ có
cho dịch vụ đặt lịch**; cửa hàng và B2B chưa tra, vẫn theo `G2`.

| | **Chuyên môn** | **Trải nghiệm** (mặc định) | **Ưu đãi** |
| --- | --- | --- | --- |
| Nhận ra khi đề nói | bác sĩ, phòng khám, da liễu, điều trị, chứng chỉ | spa, thư giãn, không gian, cao cấp, liệu trình | giảm giá, khuyến mãi, khách mới, combo, gói, chạy quảng cáo |
| Niềm tin đến từ | bác sĩ có tên và bằng cấp (4/5), hiệp hội, báo chí (3/5) | ảnh không gian, báo chí, giải thưởng (3/5) | ưu đãi và giá (5/5), trước/sau (2/5) |
| Đổi so với `G2` | Đội ngũ (`K6` B) **bắt buộc**, kèm bằng cấp, ngay sau giới thiệu; dải chứng nhận (`K9`) khi có thật | Không gian (`K6` A) lớn, được lên ngay sau hero; thẻ quà tặng khi người dùng có (3/5) | **Khối ưu đãi ở hero** (`K2`); form ngay sau hero (form trên trang 3/5); trước/sau khi có ảnh thật; giá dịch vụ hiện rõ; header gọn, được bỏ link neo (2/5) |
| Nút chính | Đặt lịch tư vấn | Đặt lịch | ưu đãi nằm trong chữ nút: "Đặt lịch – giảm 30%" (3/5) |
| Nút lặp | ~4 lần | 2–3 lần (header, hero, Liên hệ) | ~5 lần (thêm sau trước/sau, sau đánh giá) |
| Giá | không | không, hay "từ …" | giá ưu đãi số to, giá cũ gạch ở khối ưu đãi; card dịch vụ ghi "từ …" khi người dùng đưa giá |
| Lớp nhìn (`H3`, `H5`) | sạch, tin cậy: trắng, navy, **sans** (4/5) | ấm thanh lịch hay tối sang: kem hoặc đen, **serif** mảnh (3/5) | sạch, nền trắng, **sans đậm**, số giá to; vẫn một màu nhấn |

- **Đoán theo bảng**, ghi dòng 8 của brief kèm *đoán*. Không rõ thì Trải nghiệm.
- **Giống ở cả ba:** lưới dịch vụ, đánh giá ngắn 2–3 câu, địa chỉ và giờ. Không FAQ (0/15),
  quy trình hiếm (1/15). Ưu đãi định vị nào cũng có thể có (A, B đều có trang để dải "ưu đãi tháng
  này"); định vị chỉ quyết nó to hay nhỏ.
- **Chưa có giá thì `[cần điền]` chỉ nằm ở khối ưu đãi**, card dịch vụ không có dòng giá (`G4`).
  Ba card cùng ghi "Từ [cần điền]" cộng khối ưu đãi ba chỗ `[cần điền]` là trang nhìn như bản nháp
  hỏng, người dùng không thấy được trang thật trông ra sao.
- **Ưu đãi phải là ưu đãi thật người dùng đưa.** Đề nói "đang giảm giá" mà không nói bao nhiêu,
  tới khi nào thì khối ưu đãi để `[cần điền]` ở mức giảm và hạn, không tự đặt "giảm 30%".
- **Hạn và đếm ngược chỉ khi có hạn thật** (4/5 trang Ưu đãi có hạn, 1/5 có đếm ngược). Không bịa
  "chỉ còn 3 suất", không đếm ngược tự quay lại từ đầu khi hết (`H9`).
- Định vị Chuyên môn mà người dùng chưa đưa tên, bằng cấp bác sĩ thì khối đội ngũ dựng tên, ảnh
  giả có `GIẢ:`, còn dòng bằng cấp để `[cần điền]`: **không bịa bằng cấp** (`H9`).

## G7. Định vị của showroom nội thất ⚑

Như `G6`, cho **showroom nội thất, tủ bếp, đồ gỗ, thiết kế và thi công nội thất** (khách mua món
lớn, cần xem tận nơi hay khảo sát). Đếm từ 15 trang chủ (5 mỗi định vị), tra 06/10/2026. Quán, tiệm
hoa, tiệm bánh chưa tra định vị, vẫn theo `G2`.

| | **Đóng theo yêu cầu** | **Showroom thương hiệu** (mặc định) | **Giá xưởng, ưu đãi** |
| --- | --- | --- | --- |
| Nhận ra khi đề nói | đóng theo kích thước, thiết kế riêng, thi công trọn gói, gỗ tự nhiên cao cấp | showroom, bộ sưu tập, thương hiệu, mẫu mới | giá xưởng, giá gốc, khuyến mãi, trả góp, giá rẻ, combo |
| Niềm tin đến từ | công trình đã làm (4/5), tay nghề và chất liệu (4/5), chuyện người sáng lập (3/5); không điểm đánh giá (0/5) | bộ sưu tập, nhà thiết kế (3/5), **địa chỉ showroom có ảnh** (5/5) | điểm đánh giá có số (4/5), báo chí (3/5), năm bảo hành, "làm tại xưởng" |
| Đổi so với `G2` | **Công trình đã làm** thay khối không gian (`K6` A: tên công trình, khu vực); khối tay nghề, xưởng; quy trình khi người dùng có (1/5 ghi bước, 2/5 dẫn link) | Bộ sưu tập (`K5` A); **mỗi showroom một card** ở khối Liên hệ (`K11`) | **Thanh ưu đãi trên header** (5/5); form ngay hero (3/5); trước/sau khi có ảnh thật (2/5); quy trình 3–4 bước (2/5); số điện thoại trên header (3/5) |
| Nút chính | Đặt lịch tư vấn; hero được chỉ có ảnh và một câu (3/5), nút đặc ở header và Liên hệ | Hẹn ghé showroom | Nhận báo giá miễn phí / Đặt lịch khảo sát miễn phí |
| Nút lặp | 1–3 lần | 2–3 lần | 4–6 lần |
| Form | thêm ô không bắt buộc: Ngân sách dự kiến, Khi nào muốn làm, Ảnh mặt bằng (1/5 có form dài kiểu này) | theo `G3` | theo `G3`, đặt ở hero |
| Giá | không (0/5) | không, hay "từ …" (1/5) | mức giảm, trả góp 0% (3/5), có hạn (3/5) |
| Lớp nhìn (`H3`, `H5`) | trắng hay ngà, **serif** hay sans mảnh chữ hoa giãn, ảnh phòng tràn | sans trung tính, ảnh phòng lẫn ảnh sản phẩm tách nền | thanh ưu đãi màu nhấn, **sans đậm**, ảnh người trong phòng |
| Chuyển động (`H12`) | êm; cuộn kể chuyện chỉ khi xin | video hero khi có (3/5) | thanh dính, kéo so sánh trước/sau |

- **Đoán theo bảng**, ghi dòng 8 của brief kèm *đoán*. Không rõ thì Showroom thương hiệu. Đề nói
  cả "showroom" lẫn "đóng theo kích thước" thì Đóng theo yêu cầu: khách mua đồ đóng riêng tới
  showroom để tư vấn, không để chọn món có sẵn.
- **Giống ở cả ba:** ảnh phòng là thứ bán hàng chính; lưới theo phòng (bếp, phòng ngủ, phòng làm
  việc); một câu về tay nghề hay sản xuất. FAQ hiếm (1/15).
- **Công trình đã làm phải là công trình thật.** Chưa có thì ảnh mẫu kèm `GIẢ:`, chú thích chỉ ghi
  loại nhà và món ("Nhà phố · Tủ bếp chữ L"), bỏ dòng khu vực thay vì `[cần điền]` từng card; không
  bịa "Biệt thự anh Minh, Thảo Điền" (`H9`).
- Thanh ưu đãi, trả góp, hạn: chỉ khi người dùng đưa, như `G6`. Popup ưu đãi không dùng (1/15).
