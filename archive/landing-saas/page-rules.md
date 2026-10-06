# Luật chung toàn trang — luật H

Áp cho mọi section. Luật của từng section nằm ở `sections.md`, mục tiêu ở `goals.md`.

⚑ Chưa qua vòng test nào. Số đo rút từ 20 trang đang chạy (01/10/2026): trang dài 8–12k px
(danh sách chờ 2–6k), khoảng trống giữa hai section 100–160px, nội dung rộng 1200–1300px, H1
thường 60–64px, 0–1 màu nhấn.

Bố cục, section, CTA theo trang đang chạy (số đông). **Lớp nhìn** (`H3` độ đậm, `H6`, `H11`)
theo 21 mẫu thiết kế landing được đánh giá cao, tra 02/10/2026 (13 màn đầu, 8 trang trọn): trang
đang chạy phần lớn trơn, mẫu được khen thì có nền ở hero, ảnh sản phẩm đặt trên nền đó, tính năng
là card có mảnh giao diện.

---

**H1. Một CTA chính, cùng chữ, cùng đích ở mọi chỗ nó xuất hiện.** ⚑

- Chỗ xuất hiện mặc định: **header, hero, CTA cuối trang** (số đông). Không lặp thêm giữa trang
  trừ khi trang dài hơn 10 màn; lặp giữa trang chỉ 2/5 trang dùng thử làm.
- Cùng một đích ở mọi chỗ (20/20 trang). Cùng một chữ (khoảng 3/5): skill chọn cùng chữ, vì hai
  chữ cho một đích làm khách tưởng hai việc khác nhau.
- **Header có đúng một nút đặc**, là nút chính (5/5 trang demo). Đăng nhập là link chữ.
- Mục tiêu thứ hai (`G5`) là nút viền, không bao giờ là nút đặc thứ hai.
- Nút chính dùng biến thể `primary` của `../ui-ux/references/components/button.md`. Ở hero và
  CTA cuối trang thì to hơn một nấc: `min-h-11 px-5 text-base` (đè `min-h-10 px-4 text-sm` của
  mẫu); ở header giữ mẫu.
- Link `href` giữ chỗ (`/signup`, `#pricing`, `/demo`) khai **một lần** thành hằng số và dùng
  lại, để người dùng đổi một chỗ là đủ.

**H2. Khung và nhịp: một bề rộng, một padding dọc cho mọi section.** ⚑

```html
<section class="py-14 sm:py-20 lg:py-24">           <!-- mọi section, trừ hero (H11) -->
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <!-- khung chung, nội dung 1216px ở ≥1280 -->
    <header class="max-w-2xl">…H2, câu dẫn…</header>
    <div class="mt-10 sm:mt-14">…nội dung…</div>
  </div>
</section>
```

- **Nền trang là `bg-surface` (trắng)**, không phải `bg-background` xám của app: landing là
  một mặt giấy, khối tách bằng khoảng trống chứ không bằng card trên nền xám.
- **Dải nền** `bg-background` (xám nhạt) phủ hết bề ngang, tối đa **một** dải mỗi trang, cho
  testimonial. CTA cuối trang không còn là dải mà là panel bo góc (`H11`). Dải nền dùng cùng
  padding dọc.
- **Đầu section canh trái** mặc định, trừ: hero biến thể C, testimonial một câu lớn, CTA cuối
  trang. Đầu canh trái mà lưới bên dưới canh giữa thì trang lệch một bên.
- Khoảng giữa hai section là **hai lần padding**, không thêm `mt-*` lên section: thêm một chỗ
  là nhịp lệch cả trang.
- Không đổi padding theo section "cho thoáng hơn". Muốn thoáng thì đổi cả thang ở đây.

**H3. Thang chữ landing.** ⚑ Đè thang của `../ui-ux/references/budgets.md` (trần `3xl`) chỉ
trong landing.

| Vai | Class |
| --- | --- |
| H1 hero | `text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-balance` |
| Câu dẫn hero | `text-lg sm:text-xl text-muted text-pretty` |
| H2 đầu section | `text-3xl sm:text-4xl font-medium tracking-tight text-balance` |
| Câu dẫn section | `text-base sm:text-lg text-muted text-pretty` |
| Tên card, tên bước | `text-base font-semibold` |
| Chữ trong card | `text-base/7 text-muted` |
| Câu nhỏ dưới nút, chú thích | `text-sm text-muted` |

- **H1, H2 đậm vừa (`font-medium`), không `font-semibold`**: chữ to mà đậm nhìn nặng như
  banner (16/21 mẫu dùng đậm thường hoặc vừa). Tên card, tên bước vẫn `font-semibold` vì chữ nhỏ.
- **Tiêu đề hai tông** được dùng: vế sau của câu màu `text-muted`
  (`Lịch tự nhắc khách. <span class="text-muted">Bạn khỏi gọi từng người.</span>`). Dùng thì
  áp cho H1 và mọi H2, không chỗ có chỗ không. Không đổi vế sau sang màu nhấn hay gradient.
- Một font, theo token (`--app-font`). Không thêm font serif cho tiêu đề trừ khi người dùng
  xin (2/20 trang làm).
- **Mỗi section đúng một H2.** Không nhãn nhỏ ("TÍNH NĂNG", "FEATURES") trên mọi H2: nhãn nhỏ chỉ
  có ở hero (`K2`). Một chữ in hoa nhỏ trên mỗi section là dấu hiệu trang AI.
- H1 tối đa ba dòng ở 1280, H2 tối đa hai dòng. Dài hơn thì cắt chữ, không hạ cỡ.

**H4. H1 nói sản phẩm làm được gì cho ai, bằng chữ của chính sản phẩm.** ⚑

- Lấy từ dòng 3 của brief (`E1`). Thử: che logo đi, đọc H1, có đoán được sản phẩm làm gì không.
  Không đoán được là H1 chung chung.
- **Cấm** các câu đặt được lên bất kỳ sản phẩm nào: "Build faster with AI", "Nâng tầm doanh
  nghiệp", "Giải pháp toàn diện", "Unlock your potential", "The future of X", "Supercharge",
  "Seamless", "All-in-one platform" (đứng một mình).
- Câu dẫn nói **cách** (một câu, tối đa hai dòng): làm gì, bằng gì. Không nhắc lại H1.
- H2 của từng section cũng nói lợi ích cụ thể ("Lịch hẹn tự nhắc khách trước 2 giờ"), không
  nói tên section ("Tính năng", "Vì sao chọn chúng tôi").

**H5. Một màu nhấn, không trang trí bằng màu.** ⚑

- Màu nhấn theo token `--primary` (`../ui-ux/references/brand-tokens.md`). Dự án chưa có brand
  thì gần đen như mặc định của `ui-ux` (3/5 trang dùng thử đen trắng), wireframe có nhóm Nhấn để
  chọn.
- Màu nhấn chỉ ở: nút chính, link, icon tính năng, số bước, dấu ✓ trong card giá.
- **Trang trí nền chỉ ở hero và panel CTA cuối** (`H11`). Các section giữa nền trơn. Không chữ
  gradient ở H1, không đốm màu rải khắp trang. Người dùng xin phong cách gradient hay glass cho
  cả trang thì theo `../ui-ux/references/styles.md`.
- **Dải nền tối** chỉ cho footer của mục tiêu đặt demo (5/5) và CTA cuối trang khi người dùng
  muốn. Nền tối dùng token chế độ tối của `tokens.css` qua class `.force-dark` (`M33`), không tự
  đặt mã màu.
- Không làm dark mode cho cả trang trừ khi đề xin (`M20`).

**H6. Ảnh sản phẩm là màn app dựng giống thật, đặt trên nền của hero.** ⚑

16/20 trang có màn app thật trong màn đầu. Dự án chưa có ảnh chụp thì **dựng màn app giả bằng
HTML** từ component của `ui-ux` (sidebar, bảng, card số liệu, lịch… theo
`../ui-ux/references/layouts/app.md`), với dữ liệu nói đúng sản phẩm. Không khối xám, không
minh hoạ trừu tượng, không ảnh 3D, không icon to thay ảnh.

```html
<!-- Đặt thẳng trên lớp nền của hero (H11), không thêm khay xám bọc ngoài. -->
<div class="relative" aria-hidden="true" inert>
  <div class="overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-[var(--elevation-modal)]">
    <div class="w-[1040px] origin-top-left">…màn app giả, chữ theo T24…</div>
  </div>
  <!-- 0–2 mảnh nổi, từ sm trở lên -->
  <div class="absolute -bottom-6 -left-6 hidden w-64 rounded-xl border border-border bg-surface p-4 shadow-[var(--elevation-popover)] sm:block">…</div>
</div>
```

- **Bóng có lý do ở đây**: màn app và mảnh nổi là lớp đứng trên nền trang trí (`M15` của `ui-ux`
  cho bóng ở lớp nổi). Không có nền `H11` phía sau thì bỏ bóng, quay về viền.
- **Mảnh nổi** (7/21 mẫu): 1–2 card nhỏ trích **đúng dữ liệu của màn app** (thông báo "Đã nhắc
  chị Lan lịch 15:00", một con số, một avatar đang làm gì), chồng lên mép màn app.
  `-bottom-6 -left-6` là số âm có lý do (chồng lên mép là chính hình dạng của khối, `N11`). Ẩn
  dưới `sm`: màn hẹp không còn chỗ chồng. Không rải 6 icon app bay quanh H1.
- **Bề rộng cố định bên trong, khung cắt ở màn hẹp**: màn app không co theo khung (co lại là
  bảng vỡ, chữ xuống dòng). Ở 375 khung chỉ cho thấy góc trái trên, như ảnh chụp bị cắt.
- Hero canh giữa (`K2` B, C): màn app có thể **chìm dưới mép panel** (panel cắt đáy màn app,
  `pb-0`), mắt đọc là còn nữa ở dưới.
- `aria-hidden` và `inert`: màn giả không bấm được, trình đọc màn hình bỏ qua. Có ảnh chụp thật
  thì thay bằng `<img>` (hay `next/image`) có `alt` nói ảnh đó cho thấy gì.
- **Một màn, đúng việc chính** của sản phẩm (app đặt lịch thì là lịch, công cụ email thì là hộp
  thư). Không ghép năm màn chồng nhau.
- Dữ liệu trong màn giả theo `S6`, `S8`, `S16` của `ui-ux`: số nghe được, tên thật, avatar ảnh thật.

**H7. Header.** ⚑

- Trái: logo (chữ tên sản phẩm `text-base font-semibold`, có icon logo thì kèm). Giữa hoặc ngay
  sau logo: 3–5 link neo tới section (`#features`, `#pricing`, `#faq`) hoặc trang khác ("Bảng
  giá", "Tài liệu"). Phải: link "Đăng nhập" (chỉ khi sản phẩm có tài khoản), rồi nút chính.
- Danh sách chờ: 0–3 link, không đăng nhập (4/5).
- `sticky top-0 z-40`, nền `bg-surface/90 backdrop-blur`, viền dưới `border-b border-border`.
  Cao 64px (`h-16`).
- Dưới `md`: link vào panel trượt mở bằng ☰ (`../ui-ux/references/layouts/overlay.md`, Panel
  trượt). **Nút chính vẫn hiện trên thanh** cạnh ☰, không giấu vào panel.
- Link neo cuộn có `scroll-mt-20` trên section đích, không thì header dính che mất H2.

**H8. Icon tính năng.** ⚑

- Icon `lucide`, 20px, trong ô 40px bo `rounded-lg`, nền `bg-primary-light` hoặc `bg-background`,
  icon màu nhấn hoặc `text-foreground`. Mỗi tính năng một icon khác nhau, đúng nghĩa (`F17` của
  `ui-ux`).
- Không emoji làm icon. Không icon lấp lánh (`Sparkles`) cho mọi thứ dính tới AI.

**H9. Dữ liệu giả có hậu quả thì đánh dấu, không im lặng.** ⚑

Logo khách hàng, số khách ("8.500+ đội"), testimonial, điểm đánh giá, giá, "không cần thẻ",
"hoàn tiền" là **lời khẳng định với khách thật**. Trang lên mạng mà còn số giả là nói dối khách.

- Người dùng đã đưa thì dùng đúng. Chưa đưa thì **dùng số và tên giả nghe được để thấy bố cục**,
  nhưng:
  - mỗi chỗ có comment `GIẢ:` ngay trên (`{/* GIẢ: thay bằng logo khách thật hoặc xoá dải này */}`);
  - lúc giao liệt kê từng chỗ (`SKILL.md` mục 4);
  - giá, cam kết hoàn tiền, cam kết bảo mật thì để `[cần điền]` khi trang đi thẳng ra khách
    thật (`S7` của `ui-ux`).
- **Logo giả là chữ, không hình:** tên công ty giả viết bằng chữ xám đậm `text-lg font-semibold
  text-muted`, mỗi tên một kiểu chữ hoa thường khác nhau. Không lấy logo thương hiệu thật gắn cho
  công ty giả, không vẽ hình logo bịa.
- **Testimonial giả** dùng tên người Việt (hay tên theo ngôn ngữ copy), chức danh và công ty
  nghe được, avatar ảnh thật theo `S16`. Câu nói nói **kết quả cụ thể** ("giảm một nửa số khách
  quên lịch"), không khen chung chung ("Sản phẩm tuyệt vời!").
- Không bịa huy hiệu giải thưởng, chứng nhận (SOC 2, ISO), điểm G2 / Capterra: những thứ đó
  hoặc có thật hoặc không có.

**H10. Màn hẹp.** ⚑ Áp thêm `../ui-ux/references/responsive.md`.

- Hero chia đôi xếp chồng dưới `lg`: chữ trên, ảnh dưới. Không giấu ảnh ở mobile.
- Hàng nút hero dưới `sm`: xếp dọc, mỗi nút `w-full`. Từ `sm`: một hàng, nút rộng theo chữ.
- Lưới card: một cột dưới `sm`, hai cột `sm`, ba cột `lg`. Ba card ở hai cột thì card cuối lẻ
  một mình: được, nhưng không kéo nó rộng gấp đôi.
- Dải logo: lưới 2 cột (hay 3) dưới `sm`, không cuộn ngang, không chạy vòng.
- Form email một hàng (ô + nút) từ `sm`; dưới `sm` xếp dọc, nút `w-full`.
- Không chạy chữ, không carousel tự trượt ở mọi khổ: testimonial và logo xếp lưới.

**H11. Hero và CTA cuối có nền; CTA cuối là panel bo góc.** ⚑ Đè `M12` (không gradient) của
`ui-ux`, chỉ ở hai chỗ này.

13/21 mẫu có lớp nền ở hero; CTA cuối là panel bo góc nằm trong khung ở 6/8 trang trọn. Nền trơn
trắng từ header tới footer là thứ làm landing trông như tài liệu.

**Ba kiểu nền**, mỗi trang một kiểu, hero và CTA cuối dùng cùng kiểu. Mỗi phương án wireframe
một kiểu (`E3`):

```html
<!-- Lớp nền: con đầu của hero (hay panel CTA), section có `relative isolate overflow-hidden` -->

<!-- a. Hào quang: vầng màu nhấn mờ từ đỉnh. Màu nhấn gần đen thì vầng thành xám khói, vẫn được. -->
<div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(55%_60%_at_50%_0%,color-mix(in_srgb,var(--primary)_16%,transparent),transparent)]"></div>

<!-- b. Lưới mờ: kẻ ô màu viền, tan dần ra ngoài. -->
<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border-strong)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-strong)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"></div>

<!-- c. Ảnh: ảnh thật (S16 của ui-ux: phong cảnh, chất liệu, không người cầm điện thoại) CHỈ sau
     màn app, không sau chữ. Khối chữ đứng trên nền trơn phía trên ảnh. -->
<div class="relative isolate overflow-hidden rounded-3xl px-4 pt-10 sm:px-10 sm:pt-16">
  <img src="…" alt="" class="absolute inset-0 -z-10 size-full object-cover" />
  …màn app H6…
</div>
```

- **Panel bo góc cho hero** (6/21, phương án được): hero nằm trong
  `mx-2 sm:mx-3 rounded-3xl bg-background` cách header `mt-2`, lớp nền đặt trong panel. Không
  panel thì lớp nền trải hết bề ngang và tan vào nền trắng của trang.
- **Panel CTA cuối** thay dải nền của `H2`: trong khung `max-w-7xl`, `rounded-3xl
  bg-background px-6 py-14 sm:px-12 sm:py-20`, chữ canh giữa, cùng kiểu nền với hero. Section
  bọc ngoài vẫn padding dọc chung của `H2`.
- **Chữ đo ở chỗ nền đậm nhất** (`P3` của `ui-ux`): vầng sáng và ảnh làm `text-muted` trượt
  trước tiên. Ảnh không bao giờ nằm sau chữ; muốn chữ trên ảnh thì đó là phong cách người dùng
  xin, theo `styles.md`.
- Không thêm lớp nền thứ hai (vầng + lưới + ảnh cùng lúc), không động (`F22` của `ui-ux`), không
  đốm màu thứ hai khác sắc màu nhấn.

