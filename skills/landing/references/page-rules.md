# Luật chung toàn trang — luật H

Áp cho mọi section. Luật của từng section nằm ở `sections.md`, mục tiêu ở `goals.md`.

⚑ Chưa qua vòng test nào. Số đo rút từ 20 trang đang chạy (01/10/2026): trang dài 8–12k px
(danh sách chờ 2–6k), khoảng trống giữa hai section 100–160px, nội dung rộng 1200–1300px, H1
thường 60–64px, 0–1 màu nhấn.

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
<section class="py-14 sm:py-20 lg:py-24">           <!-- mọi section, trừ hero và CTA cuối có dải nền -->
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <!-- khung chung, nội dung 1216px ở ≥1280 -->
    <header class="max-w-2xl">…H2, câu dẫn…</header>
    <div class="mt-10 sm:mt-14">…nội dung…</div>
  </div>
</section>
```

- **Nền trang là `bg-surface` (trắng)**, không phải `bg-background` xám của app: landing là
  một mặt giấy, khối tách bằng khoảng trống chứ không bằng card trên nền xám.
- **Dải nền** `bg-background` (xám nhạt) phủ hết bề ngang, tối đa **hai** dải mỗi trang: dải
  logo hoặc testimonial, và CTA cuối trang. Dải nền dùng cùng padding dọc. Hai section liền
  nhau không cùng có dải nền (thành một khối xám dài).
- **Đầu section canh trái** mặc định, trừ: hero biến thể C, testimonial một câu lớn, CTA cuối
  trang. Đầu canh trái mà lưới bên dưới canh giữa thì trang lệch một bên.
- Khoảng giữa hai section là **hai lần padding**, không thêm `mt-*` lên section: thêm một chỗ
  là nhịp lệch cả trang.
- Không đổi padding theo section "cho thoáng hơn". Muốn thoáng thì đổi cả thang ở đây.

**H3. Thang chữ landing.** ⚑ Đè thang của `../ui-ux/references/budgets.md` (trần `3xl`) chỉ
trong landing.

| Vai | Class |
| --- | --- |
| H1 hero | `text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance` |
| Câu dẫn hero | `text-lg sm:text-xl text-muted text-pretty` |
| H2 đầu section | `text-3xl sm:text-4xl font-semibold tracking-tight text-balance` |
| Câu dẫn section | `text-base sm:text-lg text-muted text-pretty` |
| Tên card, tên bước | `text-base font-semibold` |
| Chữ trong card | `text-base/7 text-muted` |
| Câu nhỏ dưới nút, chú thích | `text-sm text-muted` |

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
- **Không** chữ gradient ở H1, không đốm màu mờ (blob) sau hero, không nền lưới chấm, không
  vệt sáng. Người dùng xin phong cách gradient hay glass thì theo `../ui-ux/references/styles.md`.
- **Dải nền tối** chỉ cho footer của mục tiêu đặt demo (5/5) và CTA cuối trang khi người dùng
  muốn. Nền tối dùng token chế độ tối của `tokens.css` qua class `.force-dark` (`M33`), không tự
  đặt mã màu.
- Không làm dark mode cho cả trang trừ khi đề xin (`M20`).

**H6. Ảnh sản phẩm là màn app dựng giống thật.** ⚑

16/20 trang có màn app thật trong màn đầu. Dự án chưa có ảnh chụp thì **dựng màn app giả bằng
HTML** từ component của `ui-ux` (sidebar, bảng, card số liệu, lịch… theo
`../ui-ux/references/layouts/app.md`), với dữ liệu nói đúng sản phẩm. Không khối xám, không
minh hoạ trừu tượng, không ảnh 3D, không icon to thay ảnh.

```html
<!-- Khung "khay": phẳng, không bóng, không giả thanh trình duyệt có ba chấm màu. -->
<div class="rounded-2xl bg-background p-2 ring-1 ring-border-strong" aria-hidden="true" inert>
  <div class="overflow-hidden rounded-xl border border-border bg-surface">
    <div class="w-[1040px] origin-top-left">…màn app giả, chữ theo T24…</div>
  </div>
</div>
```

- **Bề rộng cố định bên trong, khung cắt ở màn hẹp**: màn app không co theo khung (co lại là
  bảng vỡ, chữ xuống dòng). Ở 375 khung chỉ cho thấy góc trái trên, như ảnh chụp bị cắt.
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
