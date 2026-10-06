# Mười ba loại section — luật K

Số `K` khớp cột `#` của bảng `G2`. Mỗi loại 1–3 biến thể, biến thể đầu là mặc định; loại trang
nào lấy biến thể nào ghi ngay trong mục. Code viết bằng HTML + class Tailwind theo token của
`ui-ux`; dự án React thì đổi `class` thành `className`, `<img>` thành `next/image`, mỗi section
một component. Khung `<section>` theo `H2`, thang chữ và font theo `H3`, không nhắc lại ở từng mục.

⚑ Chưa qua vòng test nào.

---

## K1. Header ⚑

```
┌──────────────────────────────────────────────────────────────────────┐
│ Tên tiệm        Dịch vụ  Giới thiệu  Đánh giá  Liên hệ    [ NÚT ]   │  sticky, h-16/h-18
└──────────────────────────────────────────────────────────────────────┘
mobile:  Tên tiệm                                    [ NÚT ]  ☰
```

```html
<header class="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
  <div class="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:h-18 lg:px-8">
    <a href="#" class="font-heading text-lg text-foreground">…logo + tên</a>
    <nav class="ml-auto hidden items-center gap-7 text-sm text-muted md:flex">
      <a href="#dich-vu" class="hover:text-foreground">Dịch vụ</a>
    </nav>
    <div class="ml-auto flex items-center gap-3 md:ml-0">
      <a href="…CTA" class="…nút primary của button.md…">…chữ nút chính G3…</a>
      <button type="button" class="…nút chỉ icon của button.md… md:hidden" aria-label="Mở menu">…Menu 20px…</button>
    </div>
  </div>
</header>
```

- Luật đầy đủ ở `H7`. Link neo bên phải, sát nút (trang loại này ít link, gom một cụm).
- B2B có thanh mảnh phía trên (`H7`): `h-9`, `text-sm`, trái một tin thật hay câu ngắn, phải
  hotline và email có icon 16px.

## K2. Hero ⚑

Thứ tự khối chữ: **nhãn nơi chốn → H1 → câu dẫn → (dòng ưu đãi) → hàng nút**. Nhãn nơi chốn
`text-xs uppercase tracking-[0.18em]` nói loại và nơi ("Spa da · Quận 3, TP.HCM", "Xưởng in bao
bì · KCN Tân Tạo"); dịch vụ đặt lịch 4/7 có. Dòng ưu đãi chỉ khi người dùng đưa (`G4`).

**A. Ảnh tràn, chữ trên ảnh** (mặc định cửa hàng; B2B khi có video hay ảnh xưởng đẹp)

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │  ảnh thật phủ hết,
│                    ẢNH / VIDEO                               │  min-h-[88svh] desktop,
│ (nhãn nơi chốn)                                              │  min-h-[80svh] mobile
│ H1 hai dòng, chữ trắng                                       │
│ câu dẫn                                                      │
│ [ NÚT ]  [ nút viền trắng ]                                  │
└──────────────────────────────────────────────────────────────┘
```

```html
<section class="relative isolate flex min-h-[80svh] items-end overflow-hidden lg:min-h-[88svh]">
  <!-- GIẢ: ảnh mẫu, thay bằng ảnh không gian thật của tiệm -->
  <img src="…" alt="…" class="absolute inset-0 -z-20 size-full object-cover" fetchpriority="high" />
  <div aria-hidden="true" class="absolute inset-0 -z-10 bg-linear-to-t from-black/75 via-black/35 to-black/10"></div>
  <div class="mx-auto w-full max-w-7xl px-4 pt-32 pb-14 text-white sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
    <div class="max-w-2xl">
      <p class="text-xs font-medium uppercase tracking-[0.18em] text-white/80">…</p>
      <h1 class="mt-4 …H1 của H3…">…</h1>
      <p class="mt-5 text-lg text-white/85 text-pretty">…</p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">…nút chính `w-full sm:w-auto`, nút viền trắng…</div>
    </div>
  </div>
</section>
```

- Lớp phủ đậm phía chữ (dưới), nhạt phía trên để ảnh còn thấy. Chữ đo trên chỗ ảnh sáng nhất
  (`H11`). Nút viền trên ảnh: `border-white/60 text-white hover:bg-white/10`.
- Header đè lên ảnh khi ở đỉnh (`H7`): `pt-32` chừa chỗ.
- Video (`H12` mức Nổi bật): `<video autoplay muted loop playsinline poster="…">` thay `<img>`.

**B. Chia đôi, chữ trái, ảnh phải** (dịch vụ đặt lịch, B2B có ảnh sản phẩm)

```html
<section class="pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28">
  <div class="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
    <div class="max-w-xl">…khối chữ, chữ màu thường…</div>
    <!-- GIẢ: ảnh mẫu -->
    <img src="…" alt="…" class="aspect-4/5 w-full rounded-lg object-cover lg:aspect-auto lg:h-[640px]" />
  </div>
</section>
```

- Dịch vụ đặt lịch được cắt ảnh hình vòm `rounded-t-full` thay `rounded-lg` (`H6`).
- B2B: dưới hàng nút một hàng 3 con số nhỏ (năm, khách, công suất) chỉ khi có thật (`H9`).

**C. Panel ảnh cách mép màn** (dịch vụ đặt lịch, cảm giác thanh lịch)

Như A nhưng ảnh nằm trong panel `mx-2 mt-2 rounded-2xl overflow-hidden sm:mx-3` (2/7), chữ trắng
trên ảnh hay khối chữ đặt trong ô `bg-background` ở góc trái dưới của panel
(`max-w-lg rounded-xl p-6 sm:p-8`), chữ màu thường. Hero không có header đè (header nằm trên
panel).

## K3. Dải logo khách ⚑

Chỉ B2B (5/7), ngay dưới hero.

```html
<section class="py-10 sm:py-12 border-b border-border">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <p class="text-center text-sm text-muted">Đang sản xuất bao bì cho hơn 300 doanh nghiệp</p> <!-- GIẢ: H9 -->
    <ul class="mt-6 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
      <li class="text-center text-lg font-semibold text-muted">…</li>
    </ul>
  </div>
</section>
```

- 6 logo (5, 4 khi ít). Logo giả là chữ (`H9`); logo thật SVG xám một màu, cao 24–32px.
- Dải liền hero: padding nhỏ hơn section thường. Không chạy vòng, dưới `sm` lưới 2 cột.

## K4. Giới thiệu ⚑

`id="gioi-thieu"`. Có ở 21/21 trang.

**A. Ảnh và câu chuyện** (dịch vụ đặt lịch, cửa hàng)

```
┌──────────────────────┬──────────────────────────────────┐
│                      │ (nhãn nhỏ)                       │
│   ảnh dọc 4/5        │ H2 nói một điều cụ thể           │
│   (người, không gian)│ hai đoạn ngắn: ai mở, từ năm nào,│
│                      │ làm khác chỗ khác ở đâu          │
│                      │ — Tên, chủ tiệm                  │
└──────────────────────┴──────────────────────────────────┘
```

- Lưới `lg:grid-cols-2 gap-10 lg:gap-16 items-center`. Ảnh trái, chữ phải; dưới `lg` ảnh trên.
- Đoạn văn tối đa ~90 chữ mỗi đoạn, `text-base/7 text-muted`, `max-w-prose`.
- Ký tên chủ tiệm hay năm thành lập ở cuối (cửa hàng hay làm vậy): `text-sm text-foreground`.
  Chưa có thì đánh dấu `GIẢ:`.

**B. Vì sao chọn, kèm con số** (B2B)

H2 và câu dẫn bên trái (`lg:col-span-5`); bên phải (`lg:col-span-7`) 3–4 điểm dạng lưới 2 cột:
icon 20px (`H8`), tên điểm `font-semibold`, hai dòng mô tả. Dưới cả khối, một hàng 3–4 con số
cách bằng đường kẻ:

```html
<dl class="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border lg:grid-cols-4">
  <div class="bg-background p-6"><dt class="text-sm text-muted">Năm sản xuất</dt><dd class="mt-2 text-3xl font-semibold">18</dd></div>
</dl>
```

Con số chỉ khi có thật hay đánh dấu `GIẢ:` (`H9`). Không số tròn kiểu "1000+ khách hài lòng".

## K5. Dịch vụ / sản phẩm ⚑

`id="dich-vu"` (hay `id="san-pham"`). Đầu section: nhãn nhỏ, H2, câu dẫn.

**A. Card ảnh** (mặc định mọi loại; 3–6 mục)

```html
<ul class="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
  <li class="group flex flex-col">
    <div class="overflow-hidden rounded-lg">
      <!-- GIẢ: ảnh mẫu -->
      <img src="…" alt="…" class="aspect-3/2 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:aspect-4/5" />
    </div>
    <h3 class="mt-5 …tên card H3…">…</h3>
    <p class="mt-2 text-base/7 text-muted">…tối đa hai dòng…</p>
    <div class="mt-auto flex items-center justify-between gap-4 pt-4 text-sm">
      <span class="text-foreground">Từ 450.000đ · 60 phút</span> <!-- giá chỉ khi người dùng đưa, G4 -->
      <a href="#lien-he" class="…">Đặt lịch dịch vụ này →</a>
    </div>
  </li>
</ul>
```

- **Hàng cuối card (giá, thời lượng, link) dính đáy** bằng `flex flex-col` + `mt-auto`: mô tả dài
  ngắn khác nhau thì hàng cuối các card trong một hàng vẫn thẳng nhau, không lệch bậc thang.
- **Dưới `sm` ảnh `aspect-3/2`**, từ `sm` mới `4/5`: bốn card một cột với ảnh dọc là gần 3.000px
  cuộn ở 375 chỉ để đọc bốn tên dịch vụ.
- Card không viền, không nền: ảnh và chữ đứng thẳng trên nền trang. Cả card không bấm được; muốn
  đặt dịch vụ thì một link chữ "Đặt lịch dịch vụ này →" dẫn `#lien-he` và chọn sẵn dịch vụ trong
  form.
- 4 hay 5 mục: lưới `lg:grid-cols-4` hay 3 + 2 lệch; không kéo card lẻ rộng gấp đôi.
- Cuối khối (dịch vụ đặt lịch, B2B): nút chính lặp lần giữa trang (`H1`), canh trái.

**B. Danh sách thực đơn** (quán; spa có bảng dịch vụ dài)

```html
<div class="grid gap-x-16 gap-y-10 lg:grid-cols-2">
  <div>
    <h3 class="…tên nhóm…">Chăm sóc da</h3>
    <ul class="mt-4 divide-y divide-border">
      <li class="flex items-baseline gap-4 py-4">
        <div class="min-w-0"><p class="text-base text-foreground">…tên món</p><p class="text-sm text-muted">…mô tả một dòng</p></div>
        <p class="ml-auto shrink-0 text-base tabular-nums">…giá</p>
      </li>
    </ul>
  </div>
</div>
```

Có thể đặt một ảnh dọc cạnh danh sách. Giá theo `G4`.

**C. Lưới năng lực** (B2B): như A nhưng ảnh `aspect-3/2`, tên là loại sản phẩm hay năng lực ("Hộp
carton 3–5 lớp", "In offset 4 màu"), dưới mô tả một dòng thông số nhỏ `text-sm text-muted`
("Đơn tối thiểu 500 chiếc · Giao 7–10 ngày") khi người dùng đưa.

## K6. Không gian, đội ngũ ⚑

**A. Lưới ảnh không gian** (mọi loại; B2B là xưởng, máy móc)

```html
<div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
  <img class="col-span-2 row-span-2 aspect-square size-full rounded-lg object-cover" …/>  <!-- ảnh lớn -->
  <img class="aspect-square size-full rounded-lg object-cover" …/>                         <!-- 4 ảnh nhỏ -->
</div>
```

- 5 ảnh: một lớn, bốn nhỏ. Đầu section H2 nói điều cụ thể ("Năm phòng riêng, không ai đi ngang
  lúc bạn nằm"). Mỗi ảnh `GIẢ:` nếu là ảnh mẫu.
- **Cả năm ảnh là không gian thật** (phòng, quầy, lối vào, góc chờ; B2B là xưởng, máy, kho), không
  tĩnh vật nến, khăn, chai lọ (`H6`). Không tìm đủ năm ảnh không gian thì lưới ba ảnh (một lớn,
  hai nhỏ), đừng lấp bằng tĩnh vật.
- Không lightbox, không carousel tự trượt (`H10`).

**B. Đội ngũ** (dịch vụ đặt lịch 4/7): 3–4 người, ảnh chân dung `aspect-4/5 rounded-lg`, tên
`text-lg`, vai trò và một dòng kinh nghiệm `text-sm text-muted`. Ảnh người từ randomuser theo `S16`
chỉ khi tạm, tên giả theo giới. Đặt sau A hay thay A.

## K7. Quy trình ⚑

B2B (5/7): cách đặt hàng, 4 bước (hay 3). Dải tối được (`H2`).

```html
<ol class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
  <li class="border-t border-border-strong pt-6">
    <p class="text-sm font-semibold text-primary tabular-nums">01</p>
    <h3 class="mt-3 text-base font-semibold">Gửi yêu cầu</h3>
    <p class="mt-2 text-base/7 text-muted">…</p>
  </li>
</ol>
```

- Bước là **việc khách và xưởng làm theo thứ tự** ("Gửi yêu cầu → Nhận báo giá và mẫu → Duyệt
  mẫu → Sản xuất và giao"), có thời gian nếu người dùng đưa.
- Không mũi tên nối giữa các bước: thứ tự đã nằm ở số.

## K8. Đánh giá ⚑

`id="danh-gia"`. 2–3 câu (dịch vụ đặt lịch 4/7 làm 2–3 câu).

**A. Hai ba câu** (mặc định)

```html
<ul class="grid gap-6 lg:grid-cols-3">
  <li>
    <figure class="flex h-full flex-col rounded-lg bg-surface p-8">
      <blockquote class="font-heading text-xl/8 text-foreground">“…một trải nghiệm cụ thể…”</blockquote>
      <figcaption class="mt-auto flex items-center gap-3 pt-8">…avatar 40px… <span class="text-sm"><span class="font-medium">Tên</span><span class="text-muted"> · khách từ 2023</span></span></figcaption>
    </figure>
  </li>
</ul>
```

- **Avatar cùng một kiểu cho cả hàng**: hoặc ảnh cả ba, hoặc chữ cái đầu cả ba. Đánh giá giả tên
  Việt thì dùng chữ cái đầu (`components/avatar.md`), vì ảnh randomuser là người phương Tây, ghép
  với tên Việt nhìn ra ngay là giả (`H6`). Người dùng đưa ảnh khách thật thì dùng ảnh.
- Card `bg-surface` trên nền ngà hay dải tint, không viền. Câu nói theo font tiêu đề (dịch vụ,
  cửa hàng); B2B dùng sans, kèm chức danh và công ty.
- Điểm Google (2/7): một dòng trên lưới "4,9 ★ trên Google · 320 đánh giá" **chỉ khi có thật**,
  không dựng giả (`H9`).

**B. Một câu lớn** (khi chỉ có một đánh giá tốt): canh giữa `max-w-3xl`, `font-heading text-2xl
sm:text-3xl`, dưới là avatar 48px và tên.

## K9. Chứng nhận ⚑

B2B, chỉ khi người dùng đưa chứng nhận thật (4/7). Một hàng gọn, không section to:

```html
<ul class="flex flex-wrap items-center gap-x-10 gap-y-4">
  <li class="flex items-center gap-3 text-sm"><span class="…ảnh dấu chứng nhận 40px…"></span><span><span class="font-medium">ISO 9001:2015</span><br class="hidden sm:block"><span class="text-muted">Quản lý chất lượng</span></span></li>
</ul>
```

Đặt cuối khối Giới thiệu (`K4` B) hay đầu khối Liên hệ. Không có thì bỏ, không dựng giả.

## K10. FAQ ⚑

Tắt mặc định (0–2/7). Người dùng xin thì theo accordion của `../ui-ux/references/components/accordion.md`,
bỏ khung, chỉ đường kẻ `border-border-strong`, hai cột từ `lg` (đầu section trái, câu hỏi phải),
5–7 câu. Câu có chính sách (hoàn tiền, bảo hành) để `[cần điền]` tới khi người dùng đưa.

## K11. Liên hệ ⚑

`id="lien-he"`. Khối cuối trước footer (`H11`): thông tin bên trái, form bên phải.

```
┌──────────────────────────────┬────────────────────────────────┐
│ (nhãn nhỏ)                   │ ┌────────────────────────────┐ │
│ H2: Đặt lịch, chúng tôi gọi  │ │ Họ tên                     │ │
│     lại trong 15 phút        │ │ Số điện thoại              │ │
│ câu dẫn                      │ │ Dịch vụ quan tâm      ▾    │ │
│ ⌖ 12 Nguyễn Văn A, Q.3  Chỉ đường │ │ Ngày muốn đến         │ │
│ ◷ 9:00–20:00, cả tuần        │ │ [        Đặt lịch        ] │ │
│ ✆ 0900 000 000   Zalo        │ └────────────────────────────┘ │
└──────────────────────────────┴────────────────────────────────┘
```

```html
<section id="lien-he" class="scroll-mt-20 py-16 sm:py-24 lg:py-28">
  <div class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
    <div>
      …nhãn nhỏ, H2, câu dẫn…
      <dl class="mt-10 space-y-5 text-base">
        <div class="flex gap-3"><dt class="sr-only">Địa chỉ</dt><!-- MapPin 20px text-muted -->
          <dd>12 Nguyễn Văn A, Quận 3, TP.HCM · <a href="https://maps.google.com/?q=…" class="underline underline-offset-4">Chỉ đường</a></dd></div> <!-- GIẢ: H9 -->
        …Giờ mở cửa (Clock), Điện thoại (Phone, tel:), Zalo, Email…
      </dl>
    </div>
    <form class="rounded-xl bg-surface p-6 sm:p-8" novalidate>
      …ô theo G3, mỗi ô theo components/input.md: nhãn trên ô, h-12, text-base…
      <button type="submit" class="…nút primary, min-h-12 w-full…">Đặt lịch</button>
      <p class="mt-3 text-sm text-muted">Chúng tôi chỉ dùng số điện thoại để xác nhận lịch.</p>
    </form>
  </div>
</section>
```

- **Khoảng cách field to hơn form trong app**, vì ô cao 48px và chữ `text-base`. Giữ `space-y-1.5`
  của `input.md` thì nhãn dính sát ô, câu lỗi dính sát nhãn của ô kế, ba field đọc như một khối:

  ```html
  <div class="space-y-4">                                  <!-- giữa hai field -->
    <div class="flex flex-col">
      <label for="…" class="mb-2 w-fit text-sm font-medium">Họ tên</label>
      <input id="…" class="…input.md, h-12 text-base…" />
      <p class="mt-1.5 min-h-5 text-sm text-red-600">…câu lỗi, dòng luôn giữ chỗ…</p>
    </div>
  </div>
  ```

  Nhãn cách ô 8px, ô cách field kế ~42px khi không lỗi: mắt gom nhãn với ô của nó. Nút gửi cách
  field cuối `mt-4`.
- **Nhãn hiện trên ô** (`components/input.md`), không chỉ placeholder. Ô bắt buộc không gắn `*`
  khi mọi ô đều bắt buộc; có ô không bắt buộc thì ghi "(không bắt buộc)" sau nhãn của ô đó.
- Số điện thoại: `type="tel" inputmode="tel" autocomplete="tel"`; họ tên `autocomplete="name"`.
- Select dịch vụ lấy đúng tên các card ở `K5`. Bấm "Đặt lịch dịch vụ này" ở card thì select chọn
  sẵn mục đó.
- **Ba trạng thái**, đều vẽ ở wireframe (`E3`): mặc định; lỗi (câu lỗi `text-sm` ngay dưới ô sai,
  dòng lỗi luôn giữ chỗ để form không nhảy); **đã gửi**: thay cả form bằng khối icon `CircleCheck`
  + "Đã nhận lịch của bạn. Chúng tôi sẽ gọi lại trong giờ làm việc." + nút viền "Nhắn Zalo" nếu có.
  Không toast, không modal.
- Bản đồ nhúng tắt mặc định (1/21): link "Chỉ đường" mở Google Maps là đủ. Nhiều chi nhánh thì
  thay danh sách bên trái bằng mỗi chi nhánh một card nhỏ (ảnh mặt tiền, địa chỉ, giờ, "Chỉ đường").
- Dưới `lg`: thông tin trên, form dưới. Form `p-5` ở 375.

## K12. Footer ⚑

```
Tên tiệm                     Liên hệ                Theo dõi
câu mô tả một dòng           12 Nguyễn Văn A, Q.3    Facebook
                             0900 000 000            Instagram
                             9:00–20:00              Zalo
──────────────────────────────────────────────────────────────
© 2026 Tên công ty · MST 0123456789 (B2B, khi có)
```

```html
<footer class="bg-primary pb-24 text-primary-foreground md:pb-0"> <!-- dịch vụ đặt lịch, B2B: nền tối lấy sắc màu nhấn, H5 -->
  <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,2fr)_repeat(2,minmax(0,1fr))] lg:px-8">…</div>
  <div class="mx-auto max-w-7xl border-t border-primary-foreground/15 px-4 py-6 text-sm text-primary-foreground/70 sm:px-6 lg:px-8">…</div>
</footer>
```

- Lặp lại địa chỉ, điện thoại, giờ (khách cuộn xuống đáy tìm, 5/7 dịch vụ đặt lịch để ở footer).
- Link mạng xã hội chỉ khi người dùng đưa. B2B: tên công ty đầy đủ, mã số thuế khi người dùng đưa
  (không bịa, `H9`).
- `pb-24` dưới `md` chừa chỗ cho nút nổi (`H13`). Cửa hàng được footer sáng cùng nền trang, viền
  trên `border-t border-border`.

## K13. Nút liên hệ nổi ⚑

Luật ở `H13`. Mọi loại trang.

```html
<!-- GIẢ: H9, số Zalo và số gọi -->
<div class="fixed right-4 bottom-4 z-30 flex flex-col gap-3 sm:right-6 sm:bottom-6">
  <a href="https://zalo.me/0900000000" target="_blank" rel="noopener" aria-label="Nhắn Zalo cho Tên tiệm"
     class="grid size-12 place-items-center rounded-full border border-border-strong bg-surface text-xs font-semibold text-primary shadow-popover hover:bg-surface-hover">Zalo</a>
  <a href="tel:0900000000" aria-label="Gọi 0900 000 000"
     class="grid size-12 place-items-center rounded-full border border-border-strong bg-surface text-primary shadow-popover hover:bg-surface-hover md:hidden"><!-- Phone 20px --></a>
</div>
```

- Ẩn khi khối Liên hệ đang trong màn hình được (đã có cả form lẫn số ở đó), không bắt buộc.
- Không tooltip bật tự động, không chấm đỏ thông báo, không vòng sóng (`H12`).
