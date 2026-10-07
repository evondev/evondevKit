# Landing sản phẩm phần mềm — luật A

Loại trang thứ tư (`G1`): **SaaS, app, công cụ cho dev, sản phẩm AI, template, bộ code**. Khách vào
để **dùng thử, cài, mua hay đặt demo**, không để lại số điện thoại. File này thay `G2`–`G7` và các
khối chỉ dành cho thu lead (`K4` giới thiệu tiệm, `K6` không gian, `K11` form liên hệ, `K13` nút
Zalo / gọi nổi, `H13`). Luật chung còn lại của `H` vẫn áp: một CTA chính (`H1`), nhịp đều (`H2`),
H1 nói cụ thể (`H4`), dữ liệu giả (`H9`), màn hẹp (`H10`), chuyển động (`H12`, `motion.md`).

⚑ Bố cục và mục tiêu rút từ 20 landing sản phẩm đang chạy (tra 01/10/2026). Lớp nhìn và chuyển
động rút từ 18 landing sản phẩm được khen, trong đó có hai trang gốc mà landing evondevKit trộn lối
(tra 07/10/2026), cùng code landing evondevKit. Số trong ngoặc là số trang trên tổng của đợt tra đó.

**Độ dày trang và chuyển động theo gu chủ dự án, không theo số đông** (chốt 07/10/2026). Số đông
cho ra trang sạch mà không ai nhớ: bản dựng theo số đông dài 4,5k px, 4 section, 12 hiệu ứng, chủ dự
án thấy "chưa wow". Landing evondevKit và trang cá nhân evondev dài ~14k px, 8–10 section, 60–120
hiệu ứng, và được khen. Thứ làm hai trang đó khác không phải số lượng mà bốn món: chữ màu nhấn
trong H1 (`A4`), demo bấm được ở hero (`A3`), lớp chi tiết nền thủ công (`A4`), và các khối cho xem
sản phẩm đang làm việc (`A2`).

---

## A1. Mục tiêu và nút chính ⚑

| Mục tiêu | Nhận ra khi đề nói | Nút chính | Nút phụ ở hero |
| --- | --- | --- | --- |
| **Cài, dùng miễn phí** (mặc định công cụ cho dev, mã nguồn mở) | cài, npm, CLI, plugin, extension, mã nguồn mở, miễn phí | khối lệnh cài có nút copy, hay "Cài [Tên]" | viền "Xem tài liệu" / "GitHub" |
| **Dùng thử** (mặc định SaaS) | đăng ký, free trial, có gói free, sign up | Dùng thử miễn phí | viền "Xem demo" hay "Liên hệ tư vấn" (3/5) |
| **Mua luôn** | mua, trả một lần, license, lifetime, template | Mua [Tên] → cuộn `#pricing` (4/4) | viền "Xem cách hoạt động" |
| **Đặt demo** | B2B, doanh nghiệp, đội sales, báo giá | Đặt lịch demo | không (3/5) |
| **Danh sách chờ** | chưa ra mắt, early access, beta | Đăng ký chờ (form một ô email ở hero, 3/5) | không |

- Hai nút ở hero (11/18): nút đặc là mục tiêu, nút viền là bước nhẹ hơn. Header **một nút đặc**.
- Khối lệnh cài: `font-mono`, nền `bg-surface` viền, nút copy chỉ icon bên phải (`components/button.md`),
  copy xong đổi icon `Check` 1,5 giây. Nhiều công cụ cài (npm, pnpm, brew…) thì tab nhỏ phía trên.
- CTA cuối lặp đúng nút chính (14/18). Không lặp giữa trang trừ khi trang dài hơn 12 màn.

## A2. Bộ section và thứ tự ⚑

**Thứ tự mặc định:** header → hero (demo bấm được) → dải bằng chứng → **cách làm việc** (cuộn ghim
hay hàng bước) → **trước / sau** → tính năng bento → **kết quả thật** (showcase có tab) → (đánh
giá) → cài đặt từng bước (công cụ cho dev) → FAQ → CTA cuối → footer.

**Trang 7–9 section giữa hero và footer, dài 8–12 màn ở 1440** (~7–11k px). Ba khối in đậm là "cho
xem sản phẩm làm việc", bắt buộc ít nhất hai: mỗi khối một góc của cùng sản phẩm, không ba khối
kể cùng một ý. Trang dưới 6 màn đọc như trang tạm dựng cho có.

| Section | Bật khi | Số đếm |
| --- | --- | --- |
| Thanh tin mới trên header, hay nhãn "Mới:" trên H1 | có tin thật để nói | 5/18 thanh, 6/18 nhãn |
| Dải logo khách | người dùng có khách để kể; tĩnh mặc định, chạy (`C5`) khi trên 8 logo | tĩnh 7, chạy 3, không có 8 |
| Tính năng dạng bento (card có mảnh giao diện) | mặc định 3–4 tính năng chính | 9/18 |
| Hàng xen kẽ chữ / giao diện | 3–4 tính năng cần giải thích kỹ | 6/18 |
| Tab đổi màn sản phẩm | một màn sản phẩm có nhiều chế độ | 5/18 |
| Cuộn ghim kể chuyện (`C7`), hay hàng bước 1-2-3 có mảnh giao diện | sản phẩm có quy trình nhiều bước | 6/18 |
| **Trước / sau**: thanh kéo (`C11`) khi hai bên cùng bố cục (màn cũ → màn mới, ảnh gốc → ảnh đã xử lý); hai cột có mũi tên khi khác cấu trúc (commit → changelog, ghi âm → biên bản) | sản phẩm biến A thành B | landing evondevKit |
| **Kết quả thật** có tab (showcase, mẫu đầu ra theo loại đầu vào) | sản phẩm ra sản phẩm (trang, tài liệu, ảnh, báo cáo) | landing evondevKit |
| Cài đặt từng bước (tab theo công cụ, 2–4 bước, mỗi bước khối lệnh copy) | công cụ cho dev | landing evondevKit |
| Khối code, terminal | công cụ cho dev | 6/18 (đều là công cụ dev) |
| Đánh giá | người dùng có câu thật; lưới hay một câu lớn, chạy (`C5`) khi trên 6 câu | 12/18 |
| Pricing ngay trên trang | chỉ mục tiêu Mua luôn | 4/18; trang riêng 14/18 |
| FAQ | mua luôn, cài (câu hỏi kỹ thuật), danh sách chờ | 7/18 |
| CTA cuối | luôn | 14/18 |

- **Một bộ dữ liệu, mỗi khối một góc.** Mảnh ở section dưới lấy cùng dữ liệu với hero (`A5`) nhưng
  cho thấy thứ hero chưa cho. Hero đã hiện kết quả (bản changelog, bản tóm tắt, bảng đã lọc) thì
  section dưới không đặt lại nguyên khối kết quả đó: hiện đầu vào, một chi tiết phóng to, hay tính
  năng khác. Khối "trước / sau" chỉ một chỗ mỗi trang. Cùng một danh sách đọc lại ở màn thứ hai
  là trang dài thêm mà khách không biết thêm gì.
- Không có trong bộ nền: bảng so sánh đối thủ, changelog, blog. Người dùng xin thì mượn khuôn gần nhất.
- Footer chữ khổng lồ (tên sản phẩm cỡ màn hình, 7/18) là kiểu đang bị dùng quá tay: chỉ khi người
  dùng xin.

## A3. Hero ⚑

**Thứ tự khối chữ:** (nhãn tin mới) → H1 → câu dẫn → hàng hai nút → (câu nhỏ dưới nút hay khối
lệnh cài). Canh trái hay canh giữa ngang nhau (9/9).

**Dưới chữ là sản phẩm** (10/18): màn app, video quay màn hình, hay **demo dùng được** (ô prompt
gõ câu mẫu, terminal, khung kéo được; 4/18). Demo dùng được là thứ làm trang "sống" nhất (`C4`).

**Mặc định hero có demo bấm được**, không chỉ màn để xem: hàng tab câu mẫu hay loại đầu vào ngay
dưới khung (`segmented control`), bấm là khung đổi đầu ra, chữ gõ lại (`C4`), nút copy copy đúng
câu đang hiện. Công cụ dòng lệnh: tab loại dự án (cửa hàng, thư viện, monorepo) đổi lệnh và kết quả
trong terminal. App AI: tab câu mẫu đổi prompt và câu trả lời. Màn app: tab đổi chế độ xem. Màn
tĩnh chỉ khi sản phẩm không có đầu vào để đổi (hạ tầng, thư viện UI thì khoe component).

- **Hàng tab nằm ở đầu khung demo** (ngay trên khung, hay trong thanh tiêu đề của khung) và **thấy
  được ở màn đầu 1440×900 không cuộn**. Tab đặt dưới một terminal cao 500px thì rơi xuống dưới màn
  đầu, khách không biết demo bấm được; cuộn xuống bấm thì chỗ đổi lại nằm khuất phía trên.
- Hàng tab là tab thật theo `../ui-ux/references/components/small-controls.md`: `role="tablist"`,
  phím ← → chuyển và chọn luôn, Home / End về hai đầu. Tab tự xoay (`C4`) dừng hẳn khi khách bấm
  hay focus vào tab.
- Khung demo ở hero cao vừa đủ đầu ra ngắn nhất của các tab, dài hơn thì cuộn trong khung hay
  tan đáy, không đẩy tab đi.

- Dự án chưa có ảnh chụp thì **dựng màn app giả bằng HTML** từ component của `ui-ux` (sidebar,
  bảng, card số, lịch… theo `../ui-ux/references/layouts/app.md`), dữ liệu đúng sản phẩm. Không khối
  xám, không minh hoạ trừu tượng (minh hoạ 5/18, chỉ khi sản phẩm không có màn để khoe, như hạ tầng).
- Màn giả có **bề rộng cố định bên trong** (`w-[1040px]`), khung ngoài cắt ở màn hẹp: co màn app lại
  là bảng vỡ, chữ xuống dòng. Phần chỉ để xem `aria-hidden` và `inert`; hàng tab và nút copy của
  demo nằm ngoài vùng đó, bấm và Tab tới được.
- Một màn, đúng việc chính của sản phẩm. 0–2 mảnh nổi chồng mép (thông báo, một con số) lấy đúng
  dữ liệu của màn, ẩn dưới `sm`.

```html
<section class="relative isolate overflow-hidden pt-16 pb-16 sm:pt-24 lg:pt-28">
  …lớp nền A4…
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl">…khối chữ, H1 theo A4…</div>
    <div class="relative mt-12 sm:mt-16" aria-hidden="true" inert>
      <div class="overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-modal">
        <div class="w-[1040px] origin-top-left">…màn app giả hay demo…</div>
      </div>
    </div>
  </div>
</section>
```

- H1 nói **sản phẩm làm gì cho ai** (`H4`). Cấm câu đặt được lên bất kỳ sản phẩm nào: "Build faster
  with AI", "The future of X", "Supercharge your workflow", "All-in-one platform" đứng một mình.

## A4. Lớp nhìn ⚑

| Thứ | Số đông | Ghi chú |
| --- | --- | --- |
| Nền | sáng (16/18), nửa là trắng ngà hay xám rất nhạt (9/18) | dải tối xen giữa được (7/18), tối cả trang chỉ khi người dùng xin |
| Màu nhấn | một màu hay đen trắng (14/18) | màu nhấn ở nút chính, link, icon, và **một cụm chữ trong H1** (mặc định) |
| Chữ | một font sans, H1 nét 400–500, giãn chữ âm (15/18) | `font-medium tracking-tight` |
| Cỡ H1 ở 1440 | ~64px (10/18 trong 48–72); trang của chủ dự án 72px | `text-4xl sm:text-6xl lg:text-7xl`; H2 `text-3xl sm:text-4xl lg:text-5xl` |
| Serif tiêu đề | 6/18, đa số sản phẩm AI muốn ấm | được, theo cảm giác (`H5`) |
| Nhãn chữ mono (`[01 / 08]`, `FEATURES`) | 7/18, cả hai trang gốc | dùng thì mọi H2 đều có |

**Chữ màu nhấn trong H1** (mặc định): cụm nói lời hứa, thường là dòng sau, `text-primary`; H2 được
một cụm tương tự, tối đa nửa số H2. Một cụm mỗi tiêu đề, không tô cả câu, không gradient chữ.

```html
<h1 class="text-4xl font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl">
  Changelog tiếng Việt, <span class="text-primary">viết từ commit git</span>
</h1>
```

**Khung lộ ra có chủ ý** (6/18, cả hai trang gốc, và landing evondevKit): một biến thể lớp nhìn
đáng chọn cho công cụ cho dev, không phải mặc định cho mọi trang.

- Nội dung trong khung cố định (~1112px) có **hai đường kẻ dọc hai bên** suốt trang, dấu `+` ở góc
  mỗi section, đường kẻ ngang ngăn section thay khoảng trắng to.
- Nền hero là **lưới ô** màu viền, tan dần ra mép (`mask-image`), có thể có chấm trong ô.
- Mỗi section mở bằng nhãn mono đánh số.
- Màu đường kẻ là `--border` (đường tóc), không đậm hơn.
- **Mỗi chỗ chỉ một đường.** Lưới kẻ đường ở **cuối ô**, không ở đầu ô: khung lưới nằm sát viền dưới
  header và đường ray trái, đường đầu ô chồng lên viền thành vạch 2px đậm hơn mọi đường khác.

```html
<!-- -z-10 để lưới nằm sau chữ; section hero có isolate nên không lọt ra sau nền trang -->
<div class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,transparent_calc(100%-1px),var(--border)_calc(100%-1px)),linear-gradient(to_bottom,transparent_calc(100%-1px),var(--border)_calc(100%-1px))] bg-size-[48px_48px] mask-[radial-gradient(ellipse_70%_60%_at_30%_0%,black_20%,transparent_75%)]" aria-hidden="true"></div>
```

  Cùng lý với đường ngăn section: section có `border-t` thì section trên không thêm `border-b`.
- **Dấu `+` nằm đúng giao điểm** đường ray và đường ngăn: icon `Plus` (lucide) đặt ở góc rồi căn
  tâm bằng `-translate-1/2`. Không dùng ký tự "+" với độ lệch đoán (`-top-[7px] -left-[7px]`): bề
  ngang chữ theo font, dấu lệch 2–3px khỏi đường, nhìn ra ngay khi đường tóc chạy qua.

```html
<div class="relative border-t border-border">
  <!-- -translate-1/2 để tâm dấu nằm trên góc -->
  <Plus class="pointer-events-none absolute top-0 left-0 hidden size-3 -translate-1/2 text-muted xl:block" aria-hidden="true" />
  <Plus class="pointer-events-none absolute top-0 right-0 hidden size-3 translate-x-1/2 -translate-y-1/2 text-muted xl:block" aria-hidden="true" />
  …section…
</div>
```

**Lớp nền hero** (lưới mờ 6/18, vầng màu nhấn 5/18): một kiểu mỗi trang, hero và CTA cuối cùng kiểu.
Không vầng + lưới + ảnh cùng lúc, không đốm màu thứ hai.

**Lớp chi tiết thủ công trên lưới** (mặc định, chỉ từ `lg`): thứ không nói gì về sản phẩm nhưng
cho thấy có người chăm trang. Chọn 2–3 món, đặt ở **hai bên khối chữ**, không sau chữ (`C8`):

- 2–4 **hình pixel** 4×4 ô 6px nằm giữa ô lưới, ô màu nhấn và ô xám nhấp nháy lệch nhịp (`C10`);
  hình gợi đúng sản phẩm (con trỏ, cửa sổ, bậc thang, nhánh git).
- 2 **đám ký tự ASCII** trôi chậm trên canvas hai bên hero, đối xứng (`C10`).
- 2 **vòng tròn có icon** (`size-11 rounded-full border bg-background`, icon màu nhấn quay chậm)
  ở giao điểm lưới, đối xứng hai bên H1.
- Nhãn mono của section nhảy ký tự một lần khi cuộn tới (`C10`).

Mọi món `aria-hidden`, `pointer-events-none`, ẩn dưới `lg`. Lớp này thay cho vầng màu, không chồng
thêm vầng.

## A5. Tính năng dạng bento ⚑

Card có **mảnh giao diện** trên, chữ dưới; mảnh là một góc của màn app ở hero, đúng tính năng của
card (tính năng "tự nhắc lịch" thì mảnh là tin nhắc đã gửi). Không icon to thay mảnh.

```html
<ul class="grid gap-4 lg:grid-cols-3">
  <li class="flex flex-col overflow-hidden rounded-2xl bg-background lg:col-span-2"> <!-- card 1 và 4 rộng gấp đôi khi có 4 card -->
    <div class="relative max-h-56 overflow-hidden px-6 pt-6 pb-8 mask-[linear-gradient(to_bottom,black_calc(100%-2rem),transparent)] lg:h-56 lg:pb-0" aria-hidden="true" inert>
      <div class="w-[360px] rounded-xl border border-border bg-surface p-4 shadow-popover">…mảnh UI…</div>
    </div>
    <div class="p-6 pt-4">
      <h3 class="text-base font-semibold">…</h3>
      <p class="mt-2 text-base/7 text-muted">…tối đa hai dòng…</p>
    </div>
  </li>
</ul>
```

- 3 card một hàng bằng nhau; 4 card: card 1 và 4 rộng gấp đôi, so le. 5 trở lên: 3–4 vào bento,
  còn lại lưới icon ngắn bên dưới (icon 20px trong ô 40px, không bọc từng ô vào card).
- Mảnh có bề rộng cố định, tràn thì cắt, đáy tan dần 2rem. **Cao cố định (`h-56`) chỉ từ `lg`**, khi
  card đứng cạnh nhau cần bằng đầu; dưới `lg` mỗi card một cột thì ô mảnh cao theo mảnh (`max-h-56`),
  không thì mảnh ba dòng chừa khoảng trống 100px trên tiêu đề.

## A6. Chuyển động cho trang sản phẩm ⚑

Mặc định **dày hơn mức Nhẹ của `H12`, vẫn chỉ CSS và JavaScript thuần**, làm theo `motion.md`:

- Hero hiện dần (`C2`), khối hiện khi cuộn tới (`C3`).
- **Demo bấm được ở hero** (`A3`, `C4`): ưu tiên hơn mọi hiệu ứng trang trí.
- Lớp chi tiết thủ công (`A4`, `C10`): pixel nhấp nháy, ASCII trôi, icon quay chậm, nhãn nhảy ký tự.
- Thanh kéo trước / sau (`C11`), một khối cuộn ghim (`C7`), một dải chạy (`C5`).
- Tối đa 8 vòng lặp nền đếm theo loại (`C8`).
- Đếm số (`C6`) chỉ với số thật.
- Cuộn mượt, GSAP, 3D (`C9`) chỉ khi người dùng xin.
- Trang 8–12 màn ở 1440 (`A2`). Trang 20k px toàn khối ghim và dải chạy là trang khách bỏ giữa chừng.
- Người dùng nói "tối giản", "sạch", "nghiêm túc" (tài chính, y tế, doanh nghiệp lớn) thì về mức
  Nhẹ: bỏ lớp chi tiết thủ công, giữ demo bấm được.

## A7. Dữ liệu giả của trang sản phẩm ⚑

Theo `H9`, thêm:

- **Logo khách giả là chữ**, tên công ty giả `text-lg font-semibold text-muted`; không gắn logo
  thương hiệu thật cho công ty giả.
- **Số người dùng, số sao GitHub, lượt tải, uptime**: thật hay `GIẢ:`. Đếm số (`C6`) trên số giả
  vẫn là số giả.
- Lệnh cài, tên gói npm, link GitHub: người dùng chưa đưa thì `[cần điền]`, không bịa tên gói (khách
  copy chạy là cài nhầm gói người khác).
- "Không cần thẻ", "Huỷ lúc nào cũng được", "Hoàn tiền 30 ngày": chỉ khi người dùng nói.
