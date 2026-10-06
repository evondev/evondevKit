# Chín loại section — luật K

Mỗi loại 1–3 biến thể. Biến thể đầu là mặc định; mục tiêu nào lấy biến thể nào ghi ở `goals.md`.
Code viết bằng HTML + class Tailwind theo token của `ui-ux`; dự án React thì đổi `class` thành
`className`, mỗi section một component. Khung `<section>` và khung bề rộng theo `H2`, thang chữ
theo `H3`, không nhắc lại ở từng mục.

⚑ Chưa qua vòng test nào.

---

## K1. Header ⚑

```
┌──────────────────────────────────────────────────────────────────────┐
│ ◆ Tên    Tính năng  Bảng giá  FAQ               Đăng nhập  [ NÚT ]  │  h-16, dính đỉnh
└──────────────────────────────────────────────────────────────────────┘
mobile:  ◆ Tên                                       [ NÚT ]  ☰
```

```html
<header class="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
  <div class="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
    <a href="/" class="flex items-center gap-2 text-base font-semibold text-foreground">…logo + tên</a>
    <nav class="hidden items-center gap-6 text-sm text-muted md:flex">
      <a href="#features" class="hover:text-foreground">…</a>
    </nav>
    <div class="ml-auto flex items-center gap-3">
      <a href="/login" class="hidden text-sm font-medium text-muted hover:text-foreground sm:inline">Đăng nhập</a>
      <a href="…CTA" class="…nút primary của button.md…">…chữ nút chính…</a>
      <button type="button" class="…nút chỉ icon của button.md… md:hidden" aria-label="Mở menu">☰</button>
    </div>
  </div>
</header>
```

- Luật đầy đủ ở `H7`. Nút ☰ mở panel trượt từ phải theo `layouts/overlay.md` của `ui-ux`,
  trong panel: các link neo, rồi "Đăng nhập". Nút chính không vào panel.
- Danh sách chờ: không `nav`, không "Đăng nhập", chỉ logo và nút.

## K2. Hero ⚑

Thứ tự trong khối chữ, biến thể nào cũng vậy: **nhãn nhỏ → H1 → câu dẫn → hàng nút → câu nhỏ
dưới nút** (`G3`).

**Nhãn nhỏ trên H1** (17/20 trang có): một pill, nói tin mới ("Mới: đồng bộ Google Calendar →")
hay trạng thái ("Mở đợt đầu tháng 11/2026" cho danh sách chờ). Không có tin gì thật để nói thì
bỏ, đừng bịa "✨ Powered by AI".

```html
<a href="…" class="inline-flex h-7 items-center gap-1.5 rounded-full border border-border-strong bg-surface px-3 text-sm text-muted hover:text-foreground">
  <span class="font-medium text-foreground">Mới</span> Đồng bộ Google Calendar <!-- icon ChevronRight 14px -->
</a>
```

**A. Chia đôi, chữ trái, ảnh phải** (mặc định: dùng thử, đặt demo, danh sách chờ)

```
┌───────────────────────────┬────────────────────────────────┐
│ (nhãn nhỏ)                │ ┌────────────────────────────┐ │
│ H1 hai đến ba dòng        │ │  màn app giả (H6),         │ │
│ câu dẫn hai dòng          │ │  tràn ra mép phải khung    │ │
│ [ NÚT ]  [ nút viền ]     │ │                            │ │
│ câu nhỏ dưới nút          │ └────────────────────────────┘ │
└───────────────────────────┴────────────────────────────────┘
```

```html
<section class="relative isolate overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
  …lớp nền H11 (a, b), con đầu…
  <div class="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-8">
    <div class="max-w-xl">
      …nhãn nhỏ…
      <h1 class="mt-5 …H3…">…</h1>
      <p class="mt-5 …câu dẫn H3…">…</p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">…nút chính `w-full sm:w-auto`, nút viền…</div>
      <p class="mt-4 text-sm text-muted">…câu nhỏ dưới nút…</p>
    </div>
    <div class="min-w-0">…khung ảnh sản phẩm H6…</div>
  </div>
</section>
```

- Cột chữ 5 phần, cột ảnh 7 phần: ảnh là thứ chứng minh, chữ chỉ cần đủ chỗ cho H1 ba dòng.
- Mọi biến thể hero có lớp nền `H11`. Kiểu c (ảnh) chỉ đặt sau cột ảnh, không sau cột chữ.
- Danh sách chờ: hàng nút thay bằng **form email** (dưới), câu nhỏ đứng ngay dưới form.

**B. Chữ trái, ảnh rộng bên dưới** (hợp khi màn app rộng: bảng, lịch tuần, kanban)

```
(nhãn nhỏ)
H1 hai dòng, rộng tối đa max-w-3xl
câu dẫn                               [ NÚT ] [ nút viền ]
┌──────────────────────────────────────────────────────────┐
│                 màn app giả rộng hết khung               │
└──────────────────────────────────────────────────────────┘
```

Khối chữ `max-w-3xl` canh trái; ảnh `mt-12 sm:mt-16`, rộng hết khung `max-w-7xl`. Màn app chìm
dưới đáy hero (`pb-0`, `H6`) khi hero là panel.

**C. Canh giữa, ảnh bên dưới** (mặc định: mua luôn)

Như B nhưng khối chữ `mx-auto max-w-3xl text-center`, hàng nút `justify-center`. Mua luôn thì
câu nhỏ dưới nút là hàng **avatar chồng + 5 sao + số người mua**:

```html
<div class="mt-6 flex items-center justify-center gap-3">
  <div class="flex -space-x-2">…4 avatar 32px theo components/avatar.md, ring-2 ring-surface…</div>
  <div class="text-left text-sm">
    <div class="text-amber-500" aria-label="5 trên 5 sao">★★★★★</div>
    <p class="text-muted"><span class="font-medium text-foreground">2.400+</span> người đã mua</p> <!-- GIẢ: H9 -->
  </div>
</div>
```

`-space-x-2` là số âm có lý do (avatar chồng nhau là chính hình dạng của khối, `N11` của `ui-ux`).

**Form email** (danh sách chờ ở hero, đặt demo và danh sách chờ ở CTA cuối)

```html
<form class="mt-8 flex max-w-md flex-col gap-3 sm:flex-row" novalidate>
  <label for="waitlist-email" class="sr-only">Email</label>
  <input id="waitlist-email" type="email" autocomplete="email" placeholder="ban@congty.vn"
         class="…input default của input.md… h-11 md:h-11 sm:flex-1" />
  <button type="submit" class="…nút primary, min-h-11 px-5…">Đăng ký chờ</button>
</form>
```

- Ô và nút cùng `h-11` ở mọi khổ (đè `md:h-10` của `input.md`): đứng cạnh nhau phải bằng vai.
- Placeholder là ví dụ email, vì nhãn đã ẩn (`T25`). Câu lỗi `text-xs text-red-600` ngay dưới
  hàng, dòng luôn có mặt `min-h-4` để form không nhảy.
- **Đã gửi**: thay cả form bằng một dòng icon `CircleCheck` xanh + "Đã thêm bạn vào danh sách.
  Kiểm tra email để xác nhận." Không toast, không modal. Ba trạng thái (mặc định, lỗi, đã gửi)
  đều vẽ ở wireframe (`E3`). Gửi đi đâu là logic người dùng (`N10`).
- Một ô email là đủ (3/5). Cần thêm tên công ty, quy mô (đặt demo) thì đó là trang đặt lịch
  riêng, nút dẫn sang đó.

## K3. Social proof ⚑

### K3a. Dải logo ngay dưới hero

```
              Hơn 8.500 đội đang dùng [Tên]          ← GIẢ nếu người dùng chưa đưa
   Acme Co    nova    BLUEPEAK    Lumen.    orbit    Harbor
```

```html
<section class="pb-14 sm:pb-20 lg:pb-24"> <!-- nối liền hero: không py, chỉ pb -->
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <p class="text-center text-sm text-muted">…</p>
    <ul class="mt-6 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
      <li class="text-center text-lg font-semibold text-muted">…</li>
    </ul>
  </div>
</section>
```

- 6 logo (hay 5, 4 khi ít). Logo giả là chữ (`H9`). Logo thật thì SVG xám một màu, cao 24–32px.
- Dải này **liền với hero**: không padding trên, không dải nền riêng.

### K3b. Testimonial

**A. Lưới ba câu** (mặc định)

```html
<ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <li>
    <figure class="flex h-full flex-col rounded-2xl border border-border-strong p-6">
      <blockquote class="text-base/7 text-foreground">“…kết quả cụ thể…”</blockquote>
      <figcaption class="mt-auto flex items-center gap-3 pt-6">
        …avatar 40px…
        <div class="text-sm"><p class="font-medium text-foreground">Tên</p><p class="text-muted">Chức danh, Công ty</p></div>
      </figcaption>
    </figure>
  </li>
</ul>
```

- Card viền `border-border-strong` vì nền trang trắng: `border-border` gần như không thấy trên
  trắng (`pricing.md` đã dính). Tên người đáy card bằng `mt-auto`, ba card cùng cao.
- Ba câu dài ngắn khác nhau (`S8`): một câu một dòng, một câu bốn dòng.

**B. Một câu lớn** (đặt demo, hay xen giữa trang dài): canh giữa, `max-w-3xl`, câu nói
`text-2xl sm:text-3xl font-medium text-balance`, dưới là avatar 48px, tên, chức danh, logo
công ty. Đặt demo dùng cả B (sau tính năng đầu) lẫn A (trước CTA cuối): 5/5 trang có hai khối.

Không carousel (`H10`). Không tường 15 bài đăng mạng xã hội trừ khi người dùng có thật.

## K4. Tính năng ⚑

`id="features"`. Đầu section: H2 nói lợi ích chung, câu dẫn một câu.

**A. Bento: card có mảnh giao diện** (mặc định cho 3–4 tính năng chính; 8/8 trang trọn đã tra
làm vậy)

```
┌───────────────────────────────┬───────────────┐
│ ┌─────────────────┐           │ ┌───────────┐ │   mỗi card: mảnh UI trên, chữ dưới
│ │ mảnh UI rộng    │           │ │ mảnh UI   │ │   4 card: card 1 và 4 rộng gấp đôi
│ └─────────────────┘           │ └───────────┘ │
│ Tên tính năng                 │ Tên           │
│ một đến hai dòng mô tả        │ mô tả         │
├───────────────┬───────────────┴───────────────┤
│ …             │ …                             │
└───────────────┴───────────────────────────────┘
```

```html
<ul class="grid gap-4 lg:grid-cols-3">
  <li class="flex flex-col overflow-hidden rounded-2xl bg-background lg:col-span-2"> <!-- card 1 và 4 khi có 4 card -->
    <div class="relative h-56 overflow-hidden px-6 pt-6 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]" aria-hidden="true" inert>
      <div class="w-[360px] rounded-xl border border-border bg-surface p-4 shadow-[var(--elevation-popover)]">…mảnh UI…</div>
    </div>
    <div class="p-6 pt-4">
      <h3 class="text-base font-semibold text-foreground">…</h3>
      <p class="mt-2 text-base/7 text-muted">…tối đa hai dòng…</p>
    </div>
  </li>
</ul>
```

- **Mảnh UI là một góc của màn app trong hero**, cùng dữ liệu, đúng tính năng của card: tính
  năng "tự nhắc khách" thì mảnh là tin nhắn nhắc đã gửi; "xem lịch theo thợ" thì ba dòng lịch có
  avatar thợ. Dựng bằng component của `ui-ux`. Không icon to thay mảnh, không ảnh minh hoạ.
- Mảnh có **bề rộng cố định**, tràn thì cắt, đáy tan dần (`mask-image`) để card nào cũng cao
  bằng nhau mà không bóp mảnh.
- Card nền `bg-background` trên trang trắng, không viền. Card không bấm được, không hover.
- 3 card: một hàng bằng nhau (bỏ `lg:col-span-2`). 4 card: card 1 và 4 rộng gấp đôi, thành
  hai hàng so le. 5 trở lên thì 3–4 cái chính vào A, phần còn lại vào B ngay dưới.
- Dưới `lg`: một cột (dưới `sm`) rồi hai cột, bỏ `col-span`.

**B. Lưới icon** (6 tính năng ngắn; đặt demo 3 × 2; hay theo sau A cho phần còn lại)

```html
<dl class="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
  <div>
    <dt>
      <span class="grid size-10 place-items-center rounded-lg bg-background text-foreground">…icon 20px…</span>
      <span class="mt-4 block text-base font-semibold text-foreground">…</span>
    </dt>
    <dd class="mt-2 text-base/7 text-muted">…tối đa ba dòng…</dd>
  </div>
</dl>
```

- **Không bọc từng ô vào card**: sáu card viền là sáu hộp chen nhau. Khối tách bằng khoảng
  trống `gap-y-10`. Icon theo `H8`.
- Đúng 3 hoặc 6 mục (hay 4 ở lưới 2 cột). 5 mục là lưới hụt một ô.

**C. Một ảnh lớn kèm ba điểm** (dùng thử 3/5): H2 và câu dẫn, rồi màn app giả lớn (`H6`) rộng
hết khung, dưới ảnh ba điểm kiểu B một hàng `lg:grid-cols-3`. Hợp khi sản phẩm có một màn
chính nói được hết.

**D. Hàng xen kẽ** (3–4 tính năng cần giải thích kỹ): mỗi tính năng một hàng hai cột, chữ (H3,
đoạn ngắn, 2–3 gạch đầu dòng ✓) và màn app giả của đúng tính năng đó trong khối
`rounded-2xl bg-background p-6`; hàng chẵn đổi bên (`lg:[&>*:first-child]:order-last`). Các
hàng cách nhau `gap-y-16 lg:gap-y-24`. Không hợp với 6 tính năng ngắn.

## K5. Cách hoạt động ⚑

Mặc định chỉ danh sách chờ (`G1`). Đúng 3 bước (hay 4), một hàng từ `lg`.

```html
<ol class="grid gap-10 lg:grid-cols-3">
  <li>
    <span class="grid size-8 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">1</span>
    <h3 class="mt-4 text-base font-semibold text-foreground">…động từ đầu câu: "Để lại email"</h3>
    <p class="mt-2 text-base/7 text-muted">…</p>
  </li>
</ol>
```

- Bước là **việc khách làm** theo thứ tự thời gian ("Để lại email → Nhận lời mời → Kết nối
  lịch"), không phải ba tính năng đổi tên.
- Không vẽ mũi tên hay đường nối giữa các bước: thứ tự đã nằm ở số.

## K6. Pricing ⚑

Chỉ mục tiêu mua luôn (`G4`). `id="pricing"`.

- Card theo `../ui-ux/references/layouts/pricing.md` (subgrid, bảy hàng, nút đáy card), **với
  ba chỗ khác trong landing**: đầu section canh trái theo `H2` thay vì đầu trang canh giữa của
  `pricing.md`; viền card `border-border-strong` vì nền trắng; không gói nào nổi trừ khi người
  dùng nói (`G4`).
- Câu dẫn nói cách trả tiền: *"Trả một lần, dùng mãi. Cập nhật miễn phí 12 tháng."* (chữ của
  người dùng, không có thì `[cần điền]`).
- Nút trên card là nút thanh toán của gói đó. Card chính (gói người dùng muốn bán) nút `primary`,
  card khác nút viền: một nút đặc mỗi khu (`I1` của `ui-ux`).
- Dưới dãy card một dòng `text-sm text-muted` canh giữa về hoàn tiền hoặc thanh toán, chỉ khi
  người dùng đã nói.

## K7. FAQ ⚑

`id="faq"`. Hai cột từ `lg`: đầu section bên trái, danh sách bên phải (2/3 trang mua luôn có
FAQ làm vậy).

```html
<div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
  <header>…H2 "Câu hỏi thường gặp", câu dẫn có link liên hệ…</header>
  <div class="divide-y divide-border-strong border-y border-border-strong">
    …mỗi câu một AccordionItem của components/accordion.md, đè px-5 thành px-0…
  </div>
</div>
```

- Accordion của `ui-ux`, **bỏ khung**: không `rounded-2xl border bg-surface`, chỉ đường kẻ
  `border-border-strong` trên dưới và giữa các câu, nút và câu trả lời `px-0` để chữ thẳng mép
  với H2 bên trái. Chữ câu hỏi `text-base font-medium`, câu trả lời `text-base/7`.
- 5–8 câu. Mua luôn: license dùng cho mấy dự án, hoàn tiền, cách thanh toán, hoá đơn, cập nhật.
  Câu trả lời có chính sách thật thì `[cần điền]` tới khi người dùng đưa (`H9`).

## K8. CTA cuối trang ⚑

**A. Panel canh giữa** (mặc định)

```html
<section class="py-14 sm:py-20 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="relative isolate overflow-hidden rounded-3xl bg-background px-6 py-14 text-center sm:px-12 sm:py-20">
      …lớp nền H11, cùng kiểu với hero…
      <div class="mx-auto max-w-2xl">
        <h2 class="…H2 của H3…">…</h2>
        <p class="mt-4 …câu dẫn section…">…</p>
        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">…nút chính, nút viền nếu có G5…</div>
      </div>
    </div>
  </div>
</section>
```

- H2 **không chép H1** và không chỉ ghi lại chữ nút ("Đặt lịch demo ngay"). Nói điều khách được
  khi bấm: *"Thử với lịch thật của bạn trong 5 phút"*.
- Dùng thử: hai nút, nút chính + nút viền "Liên hệ tư vấn" (3/4 trang có CTA cuối làm vậy). Nút
  viền trên panel `bg-background` dùng nền `bg-surface` để không chìm.
- Panel nằm trong khung `max-w-7xl`, không tràn mép màn (`H11`).

**B. Panel có form email** (đặt demo, danh sách chờ): như A, hàng nút thay bằng form email của
`K2`, canh giữa (`mx-auto`).

## K9. Footer ⚑

**A. Cột link** (mặc định)

```
◆ Tên                 Sản phẩm      Công ty       Pháp lý
câu mô tả một dòng    Tính năng     Giới thiệu    Điều khoản
                      Bảng giá      Liên hệ       Bảo mật
───────────────────────────────────────────────────────────
© 2026 Tên công ty                              (icon mạng xã hội)
```

```html
<footer class="border-t border-border">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))] lg:px-8">
    …logo + câu mô tả…  …3 cột: tiêu đề text-sm font-semibold, link text-sm text-muted, gap-3…
  </div>
  <div class="mx-auto flex max-w-7xl flex-col gap-4 border-t border-border px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">…</div>
</footer>
```

- 3–4 cột link, chỉ link có thật hoặc chắc sẽ có (Điều khoản, Bảo mật). Không newsletter (đa số
  không có), trừ khi người dùng xin.
- Đặt demo: footer **nền tối** (`.force-dark` + `bg-background` của token tối, `H5`).
- Dưới `lg`: logo một hàng riêng, ba cột link thành lưới `grid-cols-2 sm:grid-cols-3`.

**B. Một hàng gọn** (danh sách chờ): `© 2026 Tên` bên trái, 2–3 link (Điều khoản, Bảo mật, Liên
hệ) bên phải, `py-8`, viền trên.
