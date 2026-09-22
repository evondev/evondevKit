# Biểu đồ và số liệu

Biểu đồ là chỗ luật một màu nhấn hay bị phá nhất. Bốn ô số liệu bốn màu, cột
xanh cột đỏ, biểu đồ tròn bảy múi bảy sắc. Nhìn thì tưởng nhiều thông tin, thật
ra là không quyết định được cái nào quan trọng.

---

## Màu

**Một chuỗi dữ liệu là một màu.** Tám cột của cùng một chỉ số thì cả tám cùng
`--primary`. Cột cao thấp đã nói lên khác biệt rồi, không cần màu nói lại.

**Nhiều chuỗi thì phân biệt bằng đậm nhạt, không bằng sắc.** Ba chuỗi thì dùng
`--primary` đặc, `--primary` ở 60%, và `--muted`. Đổi hue là bắt người đọc học
một bảng chú giải màu mà họ không xin.

**Màu chỉ được đổi sắc khi nó mang nghĩa trạng thái**, và phải trùng đúng bảng
trạng thái của app: đỏ là quá hạn hoặc hỏng, amber là cần chú ý, emerald là
xong. Cột "quá hạn" tô đỏ thì được. Cột "tháng 3" tô đỏ thì không.

**Ô số liệu thì con số để nguyên màu chữ chính.** Đừng tô "Đang làm" xanh,
"Quá hạn" đỏ, "Hoàn thành" xanh lá. Bốn màu trong một hàng là dấu hiệu chưa
chọn được cái nào đáng nhìn nhất. Cần nhấn một ô thì nhấn bằng vị trí hoặc bằng
dòng phụ, không bằng màu.

---

## Bỏ bớt đi

- **Không lưới, không trục Y.** Ghi thẳng con số lên đầu cột hoặc cuối dòng. Người ta muốn biết giá trị, không muốn dóng mắt sang trục.
- **Không chú giải rời** khi có thể ghi nhãn ngay cạnh dữ liệu.
- **Không biểu đồ tròn cho quá bốn phần.** Quá bốn thì mắt không so được, chuyển sang thanh ngang xếp theo thứ tự lớn dần.
- **Không hiệu ứng lúc vào trang.** Cột không mọc lên, đường không tự vẽ, số không đếm tăng dần. Xem luật `F23` trong `../rules-form.md`.
- **Không đổ bóng, không gradient, không 3D** cho cột và mảng.

---

## Công thức dùng được ngay

**Vùng vẽ giãn theo card, không đóng cứng.** Card biểu đồ thường bị lưới kéo cao
hơn nội dung. Dùng `flex-1 min-h-[14rem]` cho vùng vẽ để cột nở ra lấp đầy, cột
cao lên thì chênh lệch giữa các giá trị cũng đọc rõ hơn. Đừng đóng `h-56` rồi
`mt-auto` đẩy xuống đáy.

Giãn hết cỡ rồi mà vẫn dư nhiều thì **cho card ngắn lại** (bỏ `row-span`), đừng
tự nghĩ ra nội dung lấp vào. Lúc giao gợi ý một dòng chỗ đó có thể thêm gì, xem
luật `S5` trong `../../SKILL.md`.

**Biểu đồ cột**, dựng bằng div, không cần thư viện:

```html
<div class="flex min-h-[14rem] flex-1 items-end gap-2 sm:gap-3">
  <div class="flex h-full flex-1 flex-col justify-end gap-2">
    <p class="text-center text-xs font-medium text-muted">16</p>
    <div class="rounded-lg bg-primary" style="height: 80%"></div>
  </div>
  <!-- các cột khác, cùng bg-primary -->
</div>

<div class="mt-3 flex gap-2 border-t border-border pt-3 sm:gap-3">
  <p class="flex-1 text-center text-xs text-muted">T1</p>
  <!-- nhãn trục, cùng gap với cụm cột để thẳng hàng -->
</div>
```

Nhãn trục phải dùng **đúng `gap` với cụm cột**, lệch một bậc là cả hàng nhãn
trượt khỏi cột.

**Thanh tiến độ trong danh sách:**

```html
<li class="py-3 first:pt-0">
  <div class="flex items-baseline justify-between gap-3">
    <p class="min-w-0 flex-1 truncate text-sm font-medium text-foreground">Thiết kế giao diện</p>
    <p class="shrink-0 text-sm font-medium text-foreground">92%</p>
  </div>
  <div class="mt-2 h-2 rounded-full bg-background">
    <div class="h-2 rounded-full bg-primary" style="width: 92%"></div>
  </div>
</li>
```

Rãnh nền dùng `--background`, không dùng `--border`. Thanh `h-2`, bo `full`.
Con số phần trăm ghi ở đầu dòng, không đặt bên trong thanh.

**Thanh tiến độ đứng riêng** (dung lượng, tải file, checklist): hàng trên là
nhãn trái + số phải, thanh ở giữa, một dòng phụ `text-xs text-muted` bên dưới.

- `role="progressbar"` + `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label` bằng đúng nhãn. Trình đọc màn hình không thấy độ dài thanh.
- **Màu theo trạng thái, đúng bảng trạng thái của app**: đang chạy `bg-primary`; **xong** `bg-emerald-600` (tải xong, checklist đủ); cần chú ý `bg-amber-500`; hỏng hay đầy `bg-red-500`. Ngưỡng đổi màu (vd. dung lượng từ 80%) là của người dùng, truyền qua prop `tone`. Dòng phụ đổi màu theo (`amber-700`, `red-600`) và nói bằng chữ, vì màu thanh một mình không đủ.
- **Xong mà thanh vẫn đen đầy** thì trông y hệt "đang chạy tới 99%". Xong là emerald, dòng phụ ghi "Đã tải xong · 2,4 MB" (đã dính 22/09/2026).
- **Tải file đang chạy có nút huỷ** (`IconButton` ✕ cuối hàng, `aria-label="Huỷ tải"`). **Tải hỏng**: thanh đỏ dừng ở chỗ đang tải, dòng phụ nói lý do, và **có nút "Thử lại"** (nút viền `outline` `h-8 px-3` cuối hàng, chữ `text-foreground`). Không dùng `ghost`: ghost chữ `text-muted`, nút Thử lại trông như đang bị khoá (`I8`, đã dính 22/09/2026). Báo hỏng mà không cho làm gì là bắt người dùng xoá đi chọn lại. Bấm vào gọi gì là handler rỗng.
- **Không có gì để đếm** (checklist 0 việc): không ghi `0/0`, ô số để trống, thanh rỗng, dòng phụ "Chưa có việc nào". `0/0` đọc như lỗi chia cho 0.
- **Một kiểu viết số cho cả app**: `12,4 / 20 GB` và `4 / 6 việc`, gạch chéo có dấu cách hai bên. Chỗ có cách chỗ không là lệch (đã dính 22/09/2026). Số `tabular-nums`.
- **Cột hành động cuối hàng rộng cố định** (`w-20`, căn phải) ở mọi hàng, kể cả hàng đã xong không có nút. Nút ✕ hẹp, nút Thử lại rộng, hàng xong không nút: để cột co theo nút thì số phần trăm mỗi hàng đứng một chỗ, cột số lệch (đã dính 22/09/2026).
- Tên file dài `truncate` kèm `title`, số phần trăm `shrink-0` không bao giờ bị đẩy xuống dòng.

**Hàng ô số liệu:** một khối chia `divide-x`, không phải mấy card rời. Xem
`layouts/app.md`.

---

## Ô số liệu ở màn hẹp

Đây là chỗ vỡ nhiều nhất, và chỉ lộ ra khi thu cửa sổ xuống 375px.

- **Mobile là một cột.** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`. Hai cột ở 375px thì mỗi ô còn hơn trăm pixel, `1.284.500` ở `text-2xl` không vừa.
- **Mỗi ô phải có `min-w-0`.** Grid item mặc định không chịu co nhỏ hơn nội dung, thiếu dòng này là cả trang tràn ngang.
- **Cỡ số giảm một bậc ở mobile**: `text-xl sm:text-2xl`.
- **Dùng `tabular-nums`** cho mọi con số. Chữ số đều bề ngang thì các ô thẳng cột nhau, và số không nhảy khi đổi giá trị.

```html
<div class="grid grid-cols-1 divide-border rounded-2xl border border-border bg-surface sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
  <div class="min-w-0 p-5">
    <p class="text-xs font-medium text-muted">Đang làm</p>
    <p class="mt-1 text-xl font-bold tracking-tight tabular-nums text-foreground sm:text-2xl">1.284.500</p>
    <p class="mt-1 text-xs text-muted">Trải trên 4 dự án</p>
  </div>
</div>
```

### Dòng so sánh và đơn vị tiền

```html
<div class="min-w-0 p-5">
  <p class="text-xs font-medium text-muted">Doanh thu tháng này</p>
  <p class="mt-1 text-xl font-bold sm:text-2xl tracking-tight tabular-nums text-foreground">
    1.284.500.000<span class="ml-1 font-semibold text-muted">đ</span>
  </p>
  <p class="mt-1 flex items-center gap-1 text-xs text-muted">
    <i data-lucide="trending-up" class="size-3.5 text-emerald-700"></i>
    <span class="font-medium tabular-nums text-emerald-700">12,4%</span> so với tháng trước
  </p>
</div>
```

- **Đơn vị tiền dùng chữ `đ` thường, không dùng ký hiệu `₫`.** Chữ `₫` có sẵn một vạch dưới trong chính mặt chữ, CSS không bỏ được: ở cỡ lớn trông như link, thu nhỏ thì thành một vệt gạch lí nhí (đã dính 22/09/2026, thử cả hai). `đ` **cùng cỡ với số**, `font-semibold`, chỉ đổi sang `text-muted` và cách `ml-1`: màu mờ đã đủ tách đơn vị khỏi giá trị. Dự án đã quen dùng `₫` thì theo dự án.
- **Số quá 9 chữ số trong ô hẹp**: gợi ý (người dùng quyết) rút gọn `1,28 tỷ đ`, số đầy đủ để trong `title`. Ô số liệu để đọc xu hướng, không để đối soát từng đồng.
- **Dòng so sánh**: icon `trending-up` / `trending-down` `size-3.5` + phần trăm `font-medium` có màu + phần còn lại `text-muted`. Chỉ icon và con số mang màu, không tô cả câu.
- **Màu theo tốt/xấu, không theo lên/xuống.** Doanh thu tăng là xanh, nhưng chi phí hay số đơn huỷ tăng là đỏ. Để một prop kiểu `tone="positive" | "negative" | "neutral"` cho người dùng quyết, đừng suy màu từ dấu của con số. Xanh `emerald-700`, đỏ `red-700`: chữ `text-xs` cần 4.5:1, `emerald-600` và `red-500` không đạt.
- **Không đổi**: icon `minus`, chữ `text-muted`, không màu. **Không có kỳ trước**: một câu `text-muted` ("Chưa có số kỳ trước để so"). Hai ca này vẫn **giữ đúng một dòng**, để các ô trong hàng cao bằng nhau. Ngưỡng coi là "không đổi" do người dùng quyết.

Biểu đồ cột nhiều mốc ở màn hẹp thì cho cả cụm cuộn ngang **trong khung riêng**
bằng `overflow-x-auto` cộng một bề rộng tối thiểu cho cụm, đừng để nó đẩy cả
trang. Xem luật `R1` trong `../responsive.md`.
