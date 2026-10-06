# Luật chung toàn trang — luật H

Áp cho mọi section. Luật của từng section nằm ở `sections.md`, loại trang ở `goals.md`.

⚑ Chưa qua vòng test nào. Rút từ 21 trang thu lead nước ngoài (7 dịch vụ đặt lịch, 7 cửa hàng
và quán, 7 B2B), tra 06/10/2026, chụp 1440 và 390. Số đo chung: trang dài 7–10k px ở 1440, ảnh
thật ở hero 20/21, một màu nhấn 19/21, không trang nào có nút gọi nổi hay thanh dính đáy.
`H13` theo thói quen khách VN, không đếm từ trang nào.

---

**H1. Một CTA chính, cùng chữ, cùng đích ở mọi chỗ nó xuất hiện.** ⚑

- Chỗ xuất hiện mặc định: **header, hero, khối Liên hệ** (nút gửi form cùng chữ). Dịch vụ đặt
  lịch và B2B thêm một chỗ giữa trang, cuối khối dịch vụ / năng lực (cả hai loại lặp 3–4 lần).
- Chữ theo `G3`, đích là `#lien-he` hay trang đặt lịch của người dùng (`G3`).
- **Header có đúng một nút đặc**, là nút chính. Nút phụ của hero là nút viền, không lên header.
- Nút chính dùng biến thể `primary` của `../ui-ux/references/components/button.md`. Ở hero và
  khối Liên hệ thì to hơn: `min-h-12 px-6 text-base` (nút ở các trang đã tra cao 48–58px); ở
  header giữ mẫu.
- Link `href` giữ chỗ (`#lien-he`, link đặt lịch, `tel:`, `https://zalo.me/…`) khai **một lần**
  thành hằng số và dùng lại.

**H2. Khung và nhịp: một bề rộng, một padding dọc cho mọi section.** ⚑

```html
<div class="landing bg-background text-foreground">      <!-- bọc cả trang, đặt token trang (H5) -->
  <section class="py-16 sm:py-24 lg:py-28">              <!-- mọi section, trừ hero (K2) -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <!-- khung chung -->
      <header class="max-w-2xl">…nhãn nhỏ (H3), H2, câu dẫn…</header>
      <div class="mt-10 sm:mt-14">…nội dung…</div>
    </div>
  </section>
</div>
```

- **Nền trang là `bg-background` của trang**, không phải xám của app: `H5` đặt lại token này
  thành trắng ngà ấm hay trắng theo loại trang. Card, form đứng trên nền đó là `bg-surface`.
- **Dải nền**: tối đa **hai** dải phủ hết bề ngang mỗi trang, màu `bg-primary-light` (tint nhạt
  của màu nhấn) hay tối (`.force-dark`). Dải dùng cùng padding dọc. Dịch vụ đặt lịch hay đặt dải
  tint cho đánh giá; B2B đặt dải tối cho quy trình hay con số.
- **Thoáng hơn trang app**: padding dọc lớn hơn thang của `ui-ux` (các trang đã tra đều nhiều
  khoảng trắng). Khoảng giữa hai section là hai lần padding, không thêm `mt-*` lên section.
- Đầu section canh trái mặc định, trừ: hero canh giữa, câu đánh giá lớn, đầu khối Liên hệ khi
  form canh giữa.

**H3. Thang chữ và font tiêu đề.** ⚑ Đè thang của `../ui-ux/references/budgets.md` (trần `3xl`)
chỉ trong landing.

| Vai | Dịch vụ đặt lịch, cửa hàng (serif) | B2B (sans) |
| --- | --- | --- |
| H1 hero | `font-heading text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-balance` | `text-4xl sm:text-5xl font-semibold tracking-tight text-balance` |
| H2 đầu section | `font-heading text-3xl sm:text-4xl font-normal tracking-tight text-balance` | `text-3xl sm:text-4xl font-semibold tracking-tight text-balance` |
| Nhãn nhỏ trên H2 | `text-xs font-medium uppercase tracking-[0.18em] text-muted` | như bên trái, hay bỏ |
| Câu dẫn | `text-base sm:text-lg text-muted text-pretty` | như bên trái |
| Tên card | `text-lg font-medium` (serif được) | `text-base font-semibold` |
| Chữ trong card | `text-base/7 text-muted` | như bên trái |
| Chú thích, câu nhỏ dưới nút | `text-sm text-muted` | như bên trái |

- **Dịch vụ đặt lịch, cửa hàng: tiêu đề serif nét thường** (6/7 và 5/7), thân chữ sans theo token
  (`--app-font`). B2B: một font sans, tiêu đề đậm 600 (5/7).
- Font serif khai thành `--font-heading` trong `@theme` (Tailwind v4) để có class `font-heading`;
  Next.js thì nạp qua `next/font/google` với `subsets: ["vietnamese"]`. Font **phải có subset
  tiếng Việt** (`T5` của `ui-ux`): Lora, Playfair Display, Cormorant Garamond, Noto Serif đều có;
  kiểm dấu "Ưu đãi tháng mười" trước khi chốt.
- **Nhãn nhỏ trên H2** được dùng (dịch vụ đặt lịch 5/7). Dùng thì mọi H2 đều có, không chỗ có
  chỗ không. Nhãn nói nơi chốn hay nhóm ("Spa da · Quận 3", "Dịch vụ"), không trang trí ("✦").
- Mỗi section đúng một H2. H1 tối đa ba dòng ở 1280, H2 tối đa hai dòng. Dài hơn thì cắt chữ.

**H4. H1 nói làm gì, ở đâu.** ⚑

- Dịch vụ đặt lịch và B2B: H1 nói **dịch vụ hay sản phẩm cụ thể** (4/7 mỗi loại), có nơi chốn
  thì càng tốt ("Chăm sóc da chuyên sâu ở Quận 3", "In hộp carton theo đơn từ 500 chiếc").
- Cửa hàng, quán: H1 được là **tên tiệm hay một câu ngắn có cảm xúc** (7/7 làm vậy), nhưng câu
  dẫn **ngay dưới** phải nói làm gì, ở đâu (7/7): *"Tiệm hoa nhỏ ở Đà Lạt, cắm hoa theo mùa và
  giao trong ngày."*
- Thử: che logo đi, đọc H1 và câu dẫn, có biết nơi này bán gì, ở đâu không.
- **Cấm** câu đặt được lên bất kỳ doanh nghiệp nào: "Nâng tầm vẻ đẹp Việt", "Giải pháp toàn
  diện", "Uy tín – Chất lượng – Giá tốt", "Đối tác tin cậy hàng đầu", "Đẳng cấp khác biệt".
- H2 của từng section cũng nói điều cụ thể ("Ba phòng trị liệu riêng, mỗi phòng một khách"),
  không gọi tên section ("Về chúng tôi", "Dịch vụ của chúng tôi").

**H5. Nền, màu nhấn, cảm giác của trang.** ⚑

Dòng 7 của brief (cảm giác) quyết ba thứ: nền trang, màu nhấn, font tiêu đề.

| Cảm giác | Nền trang `--background` | Màu nhấn `--primary` gợi ý | Hợp với |
| --- | --- | --- | --- |
| Ấm, thanh lịch (mặc định dịch vụ đặt lịch, cửa hàng) | trắng ngà `#fbf8f3` | nâu `#6b4e3d`, xanh rừng `#2f4a3c` | spa, tiệm hoa, tiệm bánh, nội thất |
| Sạch, tin cậy | trắng `#ffffff`, dải `#f5f7f7` | xanh navy `#1f3a5f`, xanh lá đậm `#24614a` | nha khoa, phòng khám, B2B |
| Mạnh, kỹ thuật | trắng, hero và dải tối | một màu sáng trên tối (cam, xanh chanh) | cơ khí, gia công, thiết bị |
| Tối, sang | tối cả trang (`.force-dark`) | vàng đồng `#b08d57` | nhà hàng, bar |

- Đặt token trên `.landing` (bọc trang, `H2`), không sửa `:root` của app nếu dự án còn có app:

  ```css
  .landing { --background: #fbf8f3; --primary: #2f4a3c; --primary-hover: #263d31; --primary-light: #e9efe9; }
  ```

  Dự án đã có brand thì dùng brand (`../ui-ux/references/brand-tokens.md`), chỉ đổi nền.
- **Một màu nhấn** (19/21). Màu nhấn ở: nút chính, link, số bước, icon. Không chữ gradient, không
  đốm màu trang trí, không nền gradient (`M12` của `ui-ux` giữ nguyên).
- **Không trắng tinh cho cửa hàng, dịch vụ đặt lịch** (0/7 cửa hàng dùng trắng tinh).
- **Footer tối** cho dịch vụ đặt lịch và B2B (5/7 mỗi loại) **lấy sắc màu nhấn**: `bg-primary
  text-primary-foreground`, chữ phụ `text-primary-foreground/70`, đường kẻ
  `border-primary-foreground/15`. Không `.force-dark`: token tối của `ui-ux` ngả xanh lạnh
  (`#05060f`), đứng dưới trang ngà ấm thành một khối đen lạnh tách khỏi trang. Màu nhấn gần đen
  (B2B mạnh, wireframe chưa bật Màu) thì nền đó cũng chính là footer tối.
- Chữ `text-muted` đo tương phản trên nền ngà và dải tint, không chỉ trên trắng (`P3`).

**H6. Ảnh thật làm phần bán hàng.** ⚑

20/21 trang mở bằng ảnh thật lớn: không gian, sản phẩm, người làm việc, xưởng. Không minh hoạ
(chỉ 1/21), không 3D, không icon to thay ảnh, không ảnh chụp màn hình app.

- **Đúng loại ảnh theo loại trang:** dịch vụ đặt lịch: phòng trị liệu, cận cảnh làn da, người
  thật đang làm; cửa hàng: sản phẩm, mặt tiền, không gian bên trong; B2B: máy móc đang chạy,
  người đứng máy, thành phẩm xếp kho. Ảnh xưởng B2B hay tối và ngả xám; ảnh spa sáng, ấm.
- Dự án chưa có ảnh thì lấy ảnh mẫu Unsplash theo `S16` của `ui-ux` (tìm thật, `curl -sI` từng
  link), mỗi chỗ một ảnh khác nhau, **comment `GIẢ:` trên từng ảnh** (`H9`): ảnh mẫu không phải
  nơi của khách.
- **Người trong ảnh mẫu giống khách của trang**: tiệm ở VN thì người châu Á (tìm Unsplash với
  "asian", "vietnamese"). Trang tên tiếng Việt, đánh giá tên Việt mà mọi khuôn mặt là người mẫu
  phương Tây thì nhìn ra ngay là ảnh kho, trang thành theme.
- **Ảnh nói đúng chữ bên cạnh.** Khối nói "năm phòng riêng" thì ảnh là phòng, góc phòng; không
  tĩnh vật kho ảnh (nến, khăn cuộn, chai lọ, cành lá, hoa đặt trên khăn). Tĩnh vật chỉ được ở card
  sản phẩm bán kèm. Lưới tĩnh vật spa là thứ làm mọi landing spa giống hệt nhau.
- **Vật lớn nhất trong ảnh là thứ chữ nói**, đúng chất liệu, đúng quy mô. Soi từng ảnh mẫu: che
  chữ đi, nhìn ảnh có đoán ra chữ không. Đã dính ở wireframe showroom gỗ (06/10/2026): H1 "Bàn ghế
  gỗ tự nhiên" trên ảnh mà vật lớn nhất là sofa nỉ xám; card "Ghế ăn" là ghế bọc nỉ; "xưởng mộc
  nhỏ" là nhà máy rộng có thợ đội mũ bảo hộ; "Showroom" là phòng khách nhà ở; lưới không gian lấp
  bằng ảnh món đồ chụp nền trơn. Không tìm được ảnh mẫu đúng thì dùng ảnh gần nhất **và ghi lệch ở
  comment `GIẢ:`** ("GIẢ: ảnh phòng khách, thay bằng ảnh showroom thật"), đừng chọn ảnh đẹp mà
  sai chủ thể.
- `next/image` (hay `<img>` có `width`, `height`) với `alt` nói ảnh cho thấy gì ("Phòng trị liệu
  có giường đôi và cửa sổ ra vườn"). Ảnh hero `priority`, còn lại lazy.
- **Bo góc ảnh nhỏ** (`rounded-lg` trở xuống) mặc định: cửa hàng và B2B góc gần vuông (5/7 mỗi
  loại). Dịch vụ đặt lịch được **cắt hình vòm** (`rounded-t-full`, 3/7) cho một hai ảnh dọc, không
  cho mọi ảnh.
- Tỉ lệ ảnh thống nhất trong một lưới (`aspect-4/5` cho ảnh dọc, `aspect-3/2` cho ảnh ngang),
  `object-cover`.

**H7. Header.** ⚑

- Trái: logo (chữ tên `text-lg` theo font tiêu đề, có logo hình thì kèm). Giữa hay phải: 3–5 link
  neo (`#dich-vu`, `#gioi-thieu`, `#danh-gia`, `#lien-he`). Phải cùng: nút chính.
- **Không số điện thoại trên header** mặc định (2/7, 0/7, 1/7): số nằm ở khối Liên hệ, footer và
  nút gọi nổi (`H13`). B2B được thêm **thanh mảnh trên header** (3/7) cho hotline, email hay một
  tin thật, `h-9 text-sm`, nền tối hay `bg-primary-light`.
- `sticky top-0 z-40`, nền `bg-background/90 backdrop-blur`, viền dưới `border-b border-border`
  khi đã cuộn (hay luôn có). Cao 64–72px.
- Hero ảnh tràn (`K2` A): header trong suốt chữ trắng nằm đè lên ảnh khi ở đỉnh trang, cuộn qua
  hero thì về nền đặc. Không làm được trơn tru thì header nền đặc ngay từ đầu.
- Dưới `md`: link vào panel trượt mở bằng ☰ (7/7, `../ui-ux/references/layouts/overlay.md`).
  Nút chính vẫn hiện trên thanh cạnh ☰.
- Section đích của link neo có `scroll-mt-20`.

**H8. Icon.** ⚑ Icon `lucide`, 20px, ít thôi: trang loại này nói bằng ảnh. Icon chỉ ở dòng thông
tin liên hệ (`MapPin`, `Clock`, `Phone`, `Mail`), bước quy trình B2B, điểm "vì sao chọn". Không
emoji, không icon trong mọi card dịch vụ khi card đã có ảnh.

**H9. Dữ liệu giả có hậu quả thì đánh dấu, không im lặng.** ⚑

Mọi thứ trong `G5` là lời khẳng định với khách thật. Trang lên mạng mà còn địa chỉ giả, số điện
thoại giả, đánh giá giả là nói dối khách, và khách gọi nhầm số.

- Người dùng đã đưa thì dùng đúng. Chưa đưa thì dùng **dữ liệu giả nghe được** để thấy bố cục:
  - mỗi chỗ có comment `GIẢ:` ngay trên (`{/* GIẢ: thay bằng ảnh phòng trị liệu thật */}`);
  - số điện thoại giả là `0900 000 000`, Zalo giả trỏ `https://zalo.me/0900000000`: nhìn là biết
    giả, lỡ quên thay cũng không ai gọi trúng người lạ;
  - lúc giao liệt kê từng chỗ (`SKILL.md` mục 4).
- **Đánh giá giả** dùng tên người Việt, avatar ảnh thật theo `S16`, câu nói một trải nghiệm cụ thể
  ("Làm xong da đỡ khô hẳn, chị kỹ thuật viên dặn kỹ cách dưỡng ở nhà"), không khen chung chung.
- **Logo khách giả** (B2B) là chữ tên công ty `text-lg font-semibold text-muted`, không lấy logo
  thương hiệu thật, không vẽ logo bịa.
- **Không bịa** chứng nhận, giấy phép, giải thưởng, điểm Google, mã số thuế: chưa có thì bỏ khối
  đó, không dựng giả.

**H10. Màn hẹp.** ⚑ Áp thêm `../ui-ux/references/responsive.md`. Khách của loại trang này phần
lớn vào từ điện thoại (link quảng cáo, Zalo, Facebook): soi 375 trước 1440.

- Hero ảnh tràn: ở 375 ảnh vẫn tràn, chữ đặt ở nửa dưới ảnh, lớp phủ tối đủ cho chữ trắng (`K2`).
  Hero chia đôi xếp chồng: chữ trên, ảnh dưới. Không giấu ảnh ở mobile.
- Hàng nút hero dưới `sm`: xếp dọc, mỗi nút `w-full`.
- Lưới card dịch vụ: một cột dưới `sm`, hai cột `sm`, ba cột `lg`.
- Form: một cột ở mọi khổ dưới `md`; ô `h-12`, chữ `text-base` (dưới 16px thì iOS phóng to trang
  khi chạm ô).
- **Không thanh nút dính đáy màn hình** (0/21): nút nổi `H13` đã làm việc đó.
- Không carousel tự trượt, không chạy chữ. Nhiều ảnh thì lưới, hay cuộn ngang bằng tay có
  `snap-x` và mép ảnh kế lộ ra.

**H11. Hero là ảnh thật; khối Liên hệ là chỗ chốt.** ⚑

- Hero có **một ảnh thật lớn** (hay video ngắn, `H12`) theo một trong ba kiểu của `K2`: ảnh tràn
  có lớp phủ (cửa hàng 6/7, dịch vụ 3/7, B2B video 4/7), chia đôi (dịch vụ 2/7, B2B 3/7), panel bo
  góc cách mép màn (dịch vụ 2/7).
- **Chữ trên ảnh** được, chỉ ở hero, với lớp phủ tối đo được: chữ trắng, lớp phủ
  `bg-linear-to-t from-black/70 via-black/30 to-transparent` từ phía chữ, đo tương phản ở chỗ
  ảnh sáng nhất sau chữ (`P3`). Không đặt chữ giữa vùng ảnh nhiều chi tiết.
- Không nền trang trí (vầng màu, lưới mờ) như landing phần mềm: ảnh đã là lớp nền.
- Trang **không có dải CTA cuối riêng**: khối Liên hệ (`K11`) đứng cuối, trước footer, làm việc
  đó (dải CTA cuối chỉ 3/7, 3/7, 5/7; form và địa chỉ là thứ khách cần ở cuối trang).

**H12. Chuyển động: ba mức, mặc định Nhẹ.** ⚑ Đè `F22` của `ui-ux` chỉ trong landing.

| Mức | Gồm | Khi nào |
| --- | --- | --- |
| Tĩnh | hover nút, link | người dùng xin, hay cảm giác "sạch, tin cậy" cho phòng khám |
| **Nhẹ** (mặc định) | section hiện dần khi cuộn tới (mờ → rõ, dịch 16px, 400–600ms, một lần); hover card ảnh phóng nhẹ `scale-[1.03]` trong khung `overflow-hidden` | mọi trang |
| Nổi bật | video nền hero (B2B 4/7), ảnh trôi chậm khi cuộn, cuộn ghim cảnh (GSAP ScrollTrigger) | chỉ khi người dùng xin, hay có video thật |

- CSS trước; cần điều khiển theo cuộn thì gói `motion` hay GSAP, gọn nhẹ.
- Mức nào cũng: tôn trọng `prefers-reduced-motion` (tắt hết, hiện ngay); **chữ hero không ẩn chờ
  animation** (hero hiện ngay, chỉ section bên dưới mới hiện dần); không chiếm cuộn; video nền tắt
  tiếng, `playsinline`, có ảnh `poster`, không tải trên kết nối tiết kiệm dữ liệu.
- Không nút nhấp nháy, không rung, không vòng sóng quanh nút gọi (`H13`).

**H13. Liên hệ theo thói quen khách VN: nút nổi và form trên trang.** ⚑ Không đếm từ trang nào:
21/21 trang nước ngoài không có nút gọi / chat nổi kiểu này và 19/21 không đặt form trên trang.
Chủ dự án chốt giữ vì khách VN quen nhắn Zalo, gọi điện, và landing một trang không có trang liên
hệ riêng để dẫn sang.

- **Nút nổi** góc phải dưới (`fixed bottom-4 right-4 z-30`, `sm:bottom-6 sm:right-6`), xếp dọc
  `gap-3`, tối đa hai nút: **Zalo** (`https://zalo.me/<số>`) và **Gọi** (`tel:`, chỉ dưới `md`:
  trên máy tính bấm gọi không ra gì). Người dùng không có Zalo thì chỉ nút Gọi.
- Hình: tròn 48px (`size-12 rounded-full`), nền `bg-surface`, viền `border-border-strong`, bóng
  `shadow-popover`; Gọi dùng icon `Phone` màu nhấn; Zalo là chữ "Zalo"
  `text-xs font-semibold` màu nhấn (không chép logo thương hiệu vào code). `aria-label` đủ câu
  ("Nhắn Zalo cho Tên tiệm", "Gọi 0900 000 000").
- **Cùng tông với trang**, không màu xanh Zalo, đỏ, không nhấp nháy, không vòng sóng, không bong
  bóng chữ bật ra tự động. Footer có `pb-24` dưới `md` để nút nổi không che dòng cuối.
- **Ẩn khi hero còn trong màn**, hiện khi cuộn qua hero (`IntersectionObserver` trên hero, mờ
  dần). Hàng nút hero `w-full` dưới `sm` nằm sát đáy màn đầu, đúng chỗ nút nổi: wireframe Gỗ Tâm An
  (06/10/2026) cả ba phương án nút Zalo / Gọi đè lên "Hẹn ghé showroom" ở 375×667 và 375×812.
  Hero đã có nút chính, nút nổi chưa cần. Probe báo "Nút nổi đè nút khác".
- **Form ở khối Liên hệ** (`K11`), ô theo `G3`. Không popup form khi vào trang hay khi định thoát
  (0/21 popup đặt lịch; 1/7 popup giảm giá lấy email).
