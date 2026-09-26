# Bảng giá

> ⚑ Rút ra từ một lượt dựng thật (trang giá khoá học 3 gói), rà bằng link bảy lượt
> ngày 25 và 26/09/2026.

**Một bố cục mặc định, dựng luôn.** Người dùng muốn kiểu khác (gộp một khối,
nút lên trên, bảng so sánh, gói nổi bật chỉ viền thay vì đảo màu…) thì họ nói, mình sửa theo. Đừng bày
phương án.

Đây là trang trình diễn, **giá luôn là font body** (`T3`).

---

## Đầu trang

**Căn giữa**, tên trang cỡ hero, câu dẫn một câu. Gần như mọi trang bảng giá đứng
riêng đều làm vậy: ba card đối xứng bên dưới, đầu trang lệch trái thì cả trang
nghiêng một bên. Đây là ngoại lệ của `T12`, chỉ vì chữ ngắn (tên một dòng, câu dẫn
tối đa hai dòng).

```html
<header class="text-center">
  <h1 class="text-balance font-heading text-2xl font-bold text-foreground sm:text-3xl">…</h1>
  <p class="mx-auto mt-3 max-w-[55ch] text-balance text-sm/6 text-muted sm:text-base/7">…</p>
</header>
<div class="mt-8 sm:mt-12 …"><!-- dãy gói --></div>
```

- **Tên trang `sm:text-3xl`, không phải `2xl`.** Giá là `3xl`; tên trang `2xl`
  (24px) nằm trên ba con số 30px thì trang không có đầu, mắt nhảy thẳng vào giá
  mà không biết đang xem gì (đã dính 25/09/2026). Tên trang bằng cỡ giá là đủ: nó
  đứng một mình, căn giữa, font tiêu đề, không cần to hơn nữa.
- Trang bảng giá **nằm trong khung app** (Cài đặt → Gói cước) thì không theo mục
  này: tên trang `xl` căn trái như mọi trang app (`budgets.md`).

---

## Bố cục

```
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Tên      │ │ Tên [bdg]│ │ Tên      │  1 tên, badge nổi bật bên phải
│ mô tả    │ │ mô tả    │ │ mô tả    │  2 đúng 1 câu
│ GIÁ /th  │ │ GIÁ /th  │ │ GIÁ /th  │  3 giá + đơn vị cùng dòng
│ dòng phụ │ │ dòng phụ │ │ dòng phụ │  4 điều kiện của giá
├──────────┤ ├──────────┤ ├──────────┤    đường chia tràn mép card (F25)
│ Bao gồm: │ │ Mọi thứ… │ │ Mọi thứ… │  5 tiêu đề danh sách
│ ✓ ...    │ │ ✓ ...    │ │ ✓ ...    │  6 tính năng
│ – ...    │ │ ✓ ...    │ │ ✓ ...    │
│ [ nút  ] │ │ [ NÚT  ] │ │ [ nút  ] │  7 nút, luôn đáy card
└──────────┘ └──────────┘ └──────────┘
```

Các card rộng bằng nhau, cao bằng nhau. Hàng giữa các card căn bằng `subgrid`,
không chừa `min-h-*` (đoán độ dài chữ là sai ngay ở ca `S8`):

```html
<div class="grid gap-4 lg:grid-cols-3">
  <!-- row-span-7 = số hàng trong sơ đồ. Thêm hàng thì đổi cả hai số. -->
  <!-- Card chỉ padding DỌC, từng hàng tự px-7: vạch dưới giá tự tràn mép, không margin âm (N11). -->
  <article class="row-span-7 grid grid-rows-subgrid gap-y-0 rounded-2xl border border-border bg-surface py-7 *:px-7">
    …
  </article>
</div>
```

Gói nào cũng đủ 7 hàng. Thiếu dòng phụ thì để phần tử rỗng, đừng bỏ.

**Vạch giữa phần giá và phần tính năng kẻ bằng `--border-strong`**, tràn mép card
(`F25`): `border-t border-border-strong` trên hàng tiêu đề danh sách. Card chỉ có
padding dọc (`py-7`), padding ngang nằm ở từng hàng (`*:px-7`), nên vạch tự chạm hai
mép card; không `-mx-7` (`N11`). Đã đo 26/09/2026: vị trí chữ, nút, chiều cao card y hệt
bản cũ dùng margin âm.
Cùng lý do với đường chia "hoặc" ở `form.md`: `--border` (`#f7f7f8`) đứng một mình
trên card trắng chỉ 1.06 : 1, vạch biến mất, card đọc thành một khối chữ liền (đã
dính 25/09/2026). Viền ngoài card vẫn `--border`: card trắng trên nền trang xám đã
tự tách.

Màn hẹp: một cột dưới `lg`, giữ thứ tự rẻ đến đắt, và **chặn bề rộng khi xếp
chồng**: `mx-auto max-w-lg lg:max-w-none`. Không chặn thì ở 768px mỗi card rộng
650px: danh sách tính năng chiếm một phần ba bên trái, còn lại trống, nút dài
615px trông như thanh ngang (đã dính 25/09/2026). Card gói là thứ đọc dọc, rộng
~500px là vừa, như khi đứng cạnh nhau ở màn rộng.

```html
<div class="mx-auto mt-8 grid max-w-lg grid-cols-1 gap-4 sm:mt-12 lg:max-w-none lg:grid-cols-3">
```

---

## Từng hàng

| Hàng | Làm | Đừng |
| --- | --- | --- |
| Tên | `text-lg font-semibold`, tối đa khoảng 3 từ | To bằng giá. Đây là **ngoại lệ có chủ ý của `T8`**: giá là thứ đọc đầu tiên |
| Mô tả | Đúng 1 câu, gói nào cũng có | Gói có gói không |
| Giá | `text-3xl font-bold tabular-nums`, đơn vị `/tháng` cùng dòng, căn `baseline`. Gói miễn phí ghi "Miễn phí" | "0đ" |
| Dòng phụ | Điều kiện riêng của gói (`T22`), **vừa một dòng**: "Trả theo năm: 990.000đ/tháng" | Câu dài bị chẻ giữa con số (`T10`) |
| Tiêu đề danh sách | "Bao gồm:" ở gói thấp nhất, "Mọi thứ trong Pro, thêm:" ở gói trên. `text-sm text-muted` | "Toàn bộ quyền lợi của gói Pro" viết thành một mục có dấu check |
| Tính năng | Check nét `Check` lucide `size-4`. Mục không có: `Minus` + chữ `--muted`. Con số đứng đầu: "4 buổi kèm 1-1 mỗi tháng" | Check tròn tô đặc, check mờ cho mục không có |
| Nút | Rộng hết card, **`h-12`** ở mọi bề rộng, chữ `text-sm font-medium`. Chữ là động từ + gói: "Đăng ký gói Pro" | Ba nút cùng chữ "Chọn gói". Nút `h-10` của app |

**Nút `h-12`, không `h-10`.** Đây là hành động chính của cả trang, nằm đáy một card
cao ~520px dưới con số 30px: nút 40px trông mỏng, như nút phụ trong toolbar (chủ dự
án thấy "hơi thấp" 26/09/2026). Cùng ngoại lệ với form đăng nhập đứng riêng
(`form.md`): màn chỉ có một việc thì nút của việc đó to hơn một bậc.

---

## Gói nổi bật: card đảo màu + badge

1. **Card nền tối**: `bg-primary`, chữ `text-primary-foreground`. Tính năng, tên,
   giá, check đều `text-primary-foreground`; chữ phụ (mô tả, `/tháng`, dòng phụ,
   tiêu đề danh sách) `text-primary-foreground/70`; vạch dưới giá
   `border-primary-foreground/15`. Viền card cùng màu nền.
2. **Badge** góc phải hàng tên: `rounded-full px-2.5 py-1 text-xs font-medium
   bg-primary-foreground/15 text-primary-foreground`, chữ nói lý do ("Phổ biến nhất").
   Không emoji, không ngôi sao (`T21`).
3. **Nút đảo theo card**: nền trắng chữ tối,
   `bg-surface text-foreground hover:bg-surface/90`, vòng focus
   `focus-visible:ring-primary-foreground/60 focus-visible:ring-offset-primary`
   (offset mặc định là màu `--surface`, trên card tối thành một viền trắng thừa).

```html
<article class="… rounded-2xl border border-primary bg-primary py-7 text-primary-foreground *:px-7">
  <div class="flex items-center justify-between gap-3">
    <h2 class="text-lg font-semibold">Pro</h2>
    <span class="rounded-full bg-primary-foreground/15 px-2.5 py-1 text-xs font-medium">Phổ biến nhất</span>
  </div>
  <p class="mt-2 text-sm/6 text-primary-foreground/70">…</p>
  …
  <button class="h-12 w-full rounded-xl bg-surface text-sm font-medium text-foreground hover:bg-surface/90">Đăng ký gói Pro</button>
</article>
```

**Vì sao đảo màu.** Bản trước chỉ có badge + nút primary: ba card trắng giống hệt,
mắt không có chỗ dừng, chủ dự án thấy "chưa wow" (26/09/2026). Đã so trên trang
thật ba cách: chỉ badge + nút (phẳng, không gói nào nổi), viền 1px `--primary` quanh
card (có nổi nhưng phải nhìn kỹ mới thấy), card đảo màu (thấy ngay từ xa, vẫn phẳng:
không bóng, không phóng to). Card đảo màu là cách phổ biến nhất ở các trang giá dùng
màu trung tính. Chữ phụ `/70` trên `#181818` đo ~8:1; `--primary` có sắc thì đo lại,
dưới 4.5:1 thì lên `/80`.

Không làm card cao hơn, to hơn, vòng sáng, bóng, `scale-105` (`F20`, `F22`): màu nền
đã đủ. Đề không có gói nào cần đẩy thì ba card cùng trắng, không badge.

Nút các gói khác: **nền `--secondary`**, không viền
— variant `secondary` ở `../components/button.md`. Nút rộng hết card mà chỉ có
viền mảnh thì trông rỗng.

---

## Màu thương hiệu

Màu nhấn chỉ nằm ở **card của gói nổi bật**. Còn lại trung tính (`M2`, `M3`).

| Thứ | Theo `--primary`? |
| --- | --- |
| Nền card gói nổi bật | Có. Cả badge và nút bên trong đi theo card (mục trên) |
| Check, giá, tên gói ở card trắng | Không. Check tô màu ở cả dãy là gói nổi bật hết nổi; giá màu nhấn đọc ra là link, màu sáng còn không đạt tương phản (`P3`) |
| Nút các gói khác | Không |

---

## Những thứ không dựng nếu đề không nhắc

- **Nút chuyển tháng/năm.** Có giá năm thì ghi ở dòng phụ dưới giá. Đề nhắc giảm giá trả năm mà không đưa số thì hỏi số, không bịa (`S7`).
- **FAQ** (`S1`). Có thì dựng theo mục "Câu hỏi thường gặp" dưới đây.
- **Bảng so sánh** (`S1`).

---

## Câu hỏi thường gặp

**Accordion trong MỘT khung trắng, đóng hết lúc vào trang**, một cột giữa trang.
Người ta đến trang giá để chọn gói; FAQ là chỗ tra khi còn vướng, nên chỉ cần thấy
danh sách câu hỏi, bấm câu nào mở câu đó. Bung hết thì FAQ dài gần bằng dãy gói
(chủ dự án thấy "bung ra hết" 26/09/2026). Hầu hết trang giá đều dùng accordion ở
đây. Đây là ngoại lệ của `I17`: FAQ ở trang giá luôn accordion, dù dưới 6 câu.

Mỗi câu là một mục accordion, dựng đúng theo `../components/accordion.md` (padding,
chuyển động, hover, khung, cách kiểm đều nằm ở đó). Phần riêng của trang giá:

```tsx
// faq-section.tsx
<section className="mx-auto mt-16 max-w-3xl sm:mt-20">
  <h2 className="text-center font-heading text-xl font-bold text-foreground">Câu hỏi thường gặp</h2>

  <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
    {faqItems.map((item) => (
      <AccordionItem key={item.question} title={item.question}>{item.answer}</AccordionItem>
    ))}
  </div>
</section>
```

- **Khung `max-w-3xl` giữa trang**, đủ để câu hỏi dài nhất vừa một dòng ở desktop. Bản
  `max-w-lg` (512px, chọn để câu trả lời ≤ 75 ký tự) làm câu hỏi "Đang học gói Tự học,
  muốn lên gói Pro thì phần đã học có mất không?" xuống dòng khi hàng còn trống, và khung
  chỉ rộng nửa dãy card (chủ dự án hỏi "sao không làm full chữ dài ra", 26/09/2026). Đo:
  `max-w-2xl` câu hỏi một dòng, câu trả lời 2 dòng ~89 ký tự; `max-w-3xl` cả hai một dòng.
  Câu trả lời FAQ là 1–2 câu, đọc một hơi, không phải đoạn văn nên không tính trần `T11`.
- **Tiêu đề `font-heading font-bold`, căn giữa, cùng họ chữ với tên trang.** Trang trình
  diễn có font tiêu đề thì mọi tiêu đề cấp trang (`h1`, `h2` của từng phần) dùng chung nó;
  để `h2` font body thì trang có hai tiêu đề lớn hai kiểu chữ (đã dính 26/09/2026). Tên
  gói, câu hỏi vẫn font body (`T2`).
- **Cách dãy gói `mt-16 sm:mt-20`**: phần khác của trang, không phải card thứ tư.
- **Đóng hết lúc vào trang.**
