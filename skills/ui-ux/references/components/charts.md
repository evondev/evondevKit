# Biểu đồ và số liệu

Biểu đồ là chỗ luật một màu nhấn hay bị phá nhất. Bốn ô số liệu bốn màu, cột
xanh cột đỏ, biểu đồ tròn bảy múi bảy sắc. Nhìn thì tưởng nhiều thông tin, thật
ra là không quyết định được cái nào quan trọng.

---

## Màu

**Một chuỗi dữ liệu là một màu.** Tám cột của cùng một chỉ số thì cả tám cùng
`--primary`. Cột cao thấp đã nói lên khác biệt rồi, không cần màu nói lại.

**Nhiều chuỗi thì phân biệt bằng đậm nhạt, không bằng sắc.** Đổi hue là bắt
người đọc học một bảng chú giải màu mà họ không xin. Một thang cho cả app, biểu
đồ cột nhóm và phần donut dùng chung (`N5`):

| Số chuỗi / phần | Bậc |
| --- | --- |
| 2 | `bg-primary` · `bg-primary/45` |
| 3 | `bg-primary` · `bg-primary/45` · `bg-primary/15` |
| 4 | `bg-primary` · `bg-primary/65` · `bg-primary/35` · `bg-primary/15` |

Không dùng `--muted` làm một bậc: nó gần bằng `primary/60`, hai chuỗi trông như
một (bản cũ của skill ghi thế, đã sai). Bậc `/15` và `/35` dưới 3:1 trên nền
trắng, nên **mỗi cột, mỗi phần phải có con số đi kèm** (số trên đầu cột, số
trong bảng chú giải donut); màu nhạt không bao giờ là thứ duy nhất mang giá trị
(`N4`). Chấm chú giải dùng đúng class của cột.

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

## Vẽ bằng thư viện, skill lo hình

Biểu đồ đường, cột, donut ở dự án thật hầu như luôn vẽ bằng thư viện: nó lo tỉ
lệ trục, co giãn theo khung, rê chuột, bàn phím. Nên (`N10`, bảng thư viện
chuyên dụng trong `SKILL.md`):

1. **Dự án đã có** thư viện biểu đồ (Recharts, shadcn chart, Chart.js, ECharts,
   Tremor…) thì **dùng đúng cái đó**, cấu hình theo bảng dưới. Audit grep
   `package.json` trước khi viết một dòng.
2. **Chưa có thì không tự cài.** Dựng như bình thường theo các mẫu ở mục "Công
   thức dùng được ngay". Hình của skill đã bỏ gần hết thứ thư viện bán (lưới,
   trục Y, tooltip, chú giải, hiệu ứng), nên vài biểu đồ tĩnh trên một trang
   dashboard thường **không cần thư viện nào**: `<svg>` và div là đủ, nhẹ nhất.
3. **Chỉ đề xuất thư viện khi có nhu cầu mà tự dựng sẽ tốn**, và lúc giao nói
   rõ nhu cầu đó: nhiều loại biểu đồ khắp app, dữ liệu hàng nghìn điểm, phóng to
   hay kéo chọn vùng, cập nhật theo thời gian thực, trục thời gian có khoảng
   trống. Không có nhu cầu nào như vậy thì không đề xuất.
4. **Chọn thư viện theo tiêu chí, không theo tên quen**: nhẹ (xem kích thước
   thật trên bundlephobia lúc đề xuất, đừng nhớ số), làm được đúng các loại
   biểu đồ đang cần, tô được bằng token CSS, còn được bảo trì, chạy được với
   SSR nếu dự án có. Hợp với hệ sinh thái sẵn có cũng là một tiêu chí: dự án
   dùng shadcn thì shadcn chart nhất quán với phần còn lại, dù Recharts bên dưới
   không phải thư viện nhẹ. Đề xuất ghi một dòng, có lý do: "Nếu sau này cần
   phóng to biểu đồ 10.000 điểm, cân nhắc X vì Y".

Thanh tiến độ, thanh ngang trong danh sách thì luôn dựng bằng div, kể cả khi
có thư viện: chúng chỉ là một thanh có `width`. **Sparkline** cũng không cần thư
viện: một `<svg>` với `<polyline>`, không trục, không rê chuột, không cần đề
xuất thư viện chỉ vì nó. Dự án đã có Recharts thì dùng `<LineChart>` trơn cũng
được, nhưng bốn `ResponsiveContainer` trong một hàng là nặng hơn cần thiết.

**Skill chỉ quy định hình.** Mọi thư viện bật sẵn thứ skill cấm, phải tắt tay.
Ví dụ với Recharts / shadcn chart (vì hay gặp nhất, không phải vì được chọn):

| Luật hình | Cấu hình |
| --- | --- |
| Không lưới | bỏ `<CartesianGrid>` |
| Không trục Y | `<YAxis hide domain={[0, "auto"]} />` (đáy luôn 0) |
| Trục X chỉ nhãn, đáy một đường mảnh | `<XAxis tickLine={false} axisLine={{ stroke: "var(--border)" }} tick={{ fill: "var(--muted)", fontSize: 12 }} />` |
| Không hiệu ứng vào trang (`F23`) | `isAnimationActive={false}` trên mọi `<Line>`, `<Bar>`, `<Pie>` |
| Số ghi trên đầu cột | `<LabelList position="top" />`, cùng màu `--muted`, `text-xs` |
| Đường: chỉ chấm và số ở điểm cuối (hoặc điểm đang rê) | `dot={false}`, `activeDot` tắt, tự vẽ chấm + nhãn bằng `<ReferenceDot>` hoặc `label` theo chỉ số điểm đang chọn |
| Không tooltip nổi cho đường | bỏ `<Tooltip>`, đọc điểm đang rê qua `onMouseMove` để dời chấm và số |
| Cột bo góc | `radius={[8, 8, 0, 0]}` (cột nhóm hẹp: `[6, 6, 0, 0]`) |
| Màu từ token, đúng thang đậm nhạt | `fill="var(--primary)"` + `fillOpacity` theo bảng ở mục Màu, không để bảng màu mặc định của thư viện |
| Donut | `<Pie innerRadius="72%" startAngle={90} endAngle={-270} paddingAngle={1} stroke="var(--surface)">`, dữ liệu đã xếp lớn dần |
| Chưa có số (khác 0) | giá trị `null` + `connectNulls={false}` để đường đứt |
| Chú giải | bỏ `<Legend>` của thư viện, dựng chú giải bằng HTML theo spec (chấm cùng class cột) |

Thư viện khác thì tìm đúng các tuỳ chọn tương ứng; hình cuối cùng phải y như
bảng trên. Các mẫu HTML bên dưới là **hình cần đạt**: có thư viện thì để so,
chưa có thư viện thì dựng theo đúng mẫu đó.

## Công thức dùng được ngay

**Vùng vẽ giãn theo card, không đóng cứng.** Card biểu đồ thường bị lưới kéo cao
hơn nội dung. Dùng `flex-1 min-h-[14rem]` cho vùng vẽ để cột nở ra lấp đầy, cột
cao lên thì chênh lệch giữa các giá trị cũng đọc rõ hơn. Đừng đóng `h-56` rồi
`mt-auto` đẩy xuống đáy.

Giãn hết cỡ rồi mà vẫn dư nhiều thì **cho card ngắn lại** (bỏ `row-span`), đừng
tự nghĩ ra nội dung lấp vào. Lúc giao gợi ý một dòng chỗ đó có thể thêm gì, xem
luật `S5` trong `../../SKILL.md`.

**Biểu đồ cột**, hình cần đạt (có thư viện thì dựng bằng thư viện, xem mục trên):

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

**Biểu đồ cột nhóm** (hai, ba kỳ cạnh nhau):

- Cột trong một nhóm cách nhau `gap-1.5`, nhóm cách nhau rộng hơn hẳn (`gap-6` trở lên), để mắt gom đúng nhóm.
- **Thời gian đi từ trái sang phải**, như trục của biểu đồ đường: kỳ cũ bên trái, **kỳ mới nhất bên phải và đậm nhất**. Chú giải xếp cùng thứ tự. Để 2026 đứng trái 2024 thì nhóm tăng trưởng nhìn như đi xuống (đã dính 22/09/2026).
- Tối đa ba chuỗi. Nhiều hơn thì tách biểu đồ hoặc chuyển bảng.
- **Bằng 0 khác chưa có số**, như biểu đồ đường: bằng 0 thì không có cột, ghi `0` sát đáy; chưa có số (kênh chưa mở năm đó) thì ghi `—` sát đáy, đừng ghi `0`.
- Tên nhóm dài `truncate` kèm `title`, một dòng. Màn hẹp không đủ chỗ thì cụm cột cuộn ngang **trong khung** (`overflow-x-auto`), trang không cuộn (`R1`).
- Đơn vị ghi một lần ở mô tả hoặc tiêu đề card ("triệu đồng"), không lặp trên từng cột.

**Donut** (tỷ lệ trên tổng, tối đa bốn phần):

- Vòng bên trái, bảng chú giải bên phải (màn hẹp: vòng trên, bảng dưới). Giữa vòng là tổng `text-2xl font-semibold tabular-nums` + nhãn `text-sm text-muted`.
- **Xếp lớn xuống nhỏ**, bắt đầu từ 12 giờ đi theo chiều kim đồng hồ, phần lớn nhất đậm nhất theo thang ở trên. Giữa các phần một khe trắng mảnh.
- Bảng chú giải là danh sách chia dòng: chấm · tên (`min-w-0 flex-1 truncate` + `title`) · số (`font-medium tabular-nums`) · phần trăm (`text-muted tabular-nums`, cột rộng cố định). Số và phần trăm không bao giờ bị đẩy xuống dòng.
- Phần dưới 1% vẫn vẽ một vệt tối thiểu để thấy được. **Phần trăm cùng số chữ số lẻ trong một biểu đồ**: có phần dưới 1% thì cả bảng một chữ số lẻ, không thì số nguyên. Tổng các dòng làm tròn phải ra 100.
- **Tổng bằng 0**: chỉ còn rãnh `bg-background`, giữa vòng ghi `0`, cột phần trăm để trống (không `0%`, như `0/0`).
- Quá bốn phần thì dùng danh sách thanh tiến độ ở dưới, xếp lớn dần.

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

**Biểu đồ đường** (xu hướng theo tháng, theo ngày):

- Có thư viện thì cấu hình theo bảng ở mục "Vẽ bằng thư viện"; chưa có thì một `<svg>` với `<polyline>` là đủ; chỉ đề xuất thư viện khi có nhu cầu ở mục 3 phía trên.
- Một đường `stroke-2` màu `--primary`, không tô vùng dưới, không bo cong làm sai giá trị (`monotone` thì được, `basis`/`cardinal` vọt quá điểm thật thì không).
- **Chỉ một chấm và một con số, ở điểm cuối** (`size-2.5`, số `text-xs font-semibold tabular-nums` ngay trên chấm). Rê chuột hay dùng mũi tên thì chấm và số dời sang tháng đó, **không mở thêm tooltip nổi**: cùng một chỗ, chỉ đổi vị trí (`N1`, `N3`). Dựng một ví dụ tĩnh cho trạng thái đang rê (`N2`).
- **Đáy là 0**, đường kẻ đáy `border-border`, nhãn tháng `text-xs text-muted` bên dưới. Tháng bằng 0 thì chạm đáy.
- **Không có số khác với bằng 0.** Tháng chưa có dữ liệu (chưa tới, chưa ghi nhận) thì **đứt đường** ở đó, không kéo xuống đáy: kéo xuống 0 là nói dối "tháng đó không bán được gì".
- **Màn hẹp**: 12 nhãn tháng ở 375px sát vào nhau. Dưới `sm` chỉ ghi nhãn tháng lẻ (T1, T3…) và tháng cuối; đường vẫn đủ 12 điểm.
- **Mới một điểm thì chưa phải biểu đồ.** Một chấm lơ lửng giữa khung trống trông như vẽ lỗi. Thay vùng vẽ bằng khối chữ, **giữ nguyên chiều cao**: con số `text-2xl font-semibold tabular-nums` + dòng `text-sm text-muted` "Số của tháng 9. Từ tháng sau sẽ thấy xu hướng" (`N6`).
- **Rỗng**: giữ chiều cao, câu nói vì sao và bao giờ có: "Chưa có doanh thu. Số liệu hiện sau đơn hàng đầu tiên" (`components/empty-state.md`). Bỏ luôn đường đáy: đáy không nhãn đứng một mình trông như đường kẻ lạc.
- `role="img"` + `aria-label` tóm tắt bằng chữ ("Doanh thu 12 tháng, tăng từ 0,9 tỷ lên 1,46 tỷ"); điểm nhận focus thì mỗi điểm có `aria-label` tháng + số.

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

- **Đừng format tiền bằng `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })`**: nó tự sinh ra `₫`. Format số bằng `Intl.NumberFormat('vi-VN')` rồi tự gắn `đ` (22/09/2026: sửa luật rồi mà bản dựng vẫn ra `₫`, nghi do hàm format tiền kiểu này). Grep `currency: 'VND'` trước khi đổ lỗi cho chỗ khác.
- **Đơn vị tiền dùng chữ `đ` thường, không dùng ký hiệu `₫`.** Chữ `₫` có sẵn một vạch dưới trong chính mặt chữ, CSS không bỏ được: ở cỡ lớn trông như link, thu nhỏ thì thành một vệt gạch lí nhí (đã dính 22/09/2026, thử cả hai). `đ` **cùng cỡ với số**, `font-semibold`, chỉ đổi sang `text-muted` và cách `ml-1`: màu mờ đã đủ tách đơn vị khỏi giá trị. Dự án đã quen dùng `₫` thì theo dự án.
- **Số quá 9 chữ số trong ô hẹp**: gợi ý (người dùng quyết) rút gọn `1,28 tỷ đ`, số đầy đủ để trong `title`. Ô số liệu để đọc xu hướng, không để đối soát từng đồng.
- **Dòng so sánh**: icon `trending-up` / `trending-down` `size-3.5` + phần trăm `font-medium` có màu + phần còn lại `text-muted`. Chỉ icon và con số mang màu, không tô cả câu.
- **Màu theo tốt/xấu, không theo lên/xuống.** Doanh thu tăng là xanh, nhưng chi phí hay số đơn huỷ tăng là đỏ. Để một prop kiểu `tone="positive" | "negative" | "neutral"` cho người dùng quyết, đừng suy màu từ dấu của con số. Xanh `emerald-700`, đỏ `red-700`: chữ `text-xs` cần 4.5:1, `emerald-600` và `red-500` không đạt.
- **Không đổi**: icon `minus`, chữ `text-muted`, không màu. **Không có kỳ trước**: một câu `text-muted` ngắn ("Chưa có kỳ trước"). Hai ca này vẫn **giữ đúng một dòng**, để các ô trong hàng cao bằng nhau. Ngưỡng coi là "không đổi" do người dùng quyết.
- **Dòng so sánh luôn một dòng, `text-xs`**, kể cả ca có số. Đừng để icon và phần trăm ở dòng trên, "so với tháng trước" rớt xuống dòng dưới: đọc thành hai ý rời, và ô cao thêm một dòng (đã dính 22/09/2026). Ô hẹp không đủ chỗ thì rút đuôi câu ("so với T8", "so với kỳ trước"), không xuống dòng. Câu ca không có kỳ trước cũng vậy: "Chưa có số kỳ trước để so" vỡ thành hai dòng, chữ "so" nằm một mình, nên dùng "Chưa có kỳ trước".
- **`%` dính vào số, không cách**: `2,8%`, `12,4%`, cùng một kiểu ở số chính lẫn dòng so sánh (`N5`). Khác `đ` và `đơn`: đơn vị là chữ thì cách `ml-1`, ký hiệu `%` thì không. Số chính có `%` thì `%` `text-muted` như `đ`.
- **Chỉ số đã là tỷ lệ thì so bằng điểm phần trăm, không bằng phần trăm của phần trăm.** Tỷ lệ huỷ từ 2,2% lên 2,8% ghi "↗ 0,6 điểm", không ghi "↗ 27,3%": 27,3% đọc như tỷ lệ huỷ tăng vọt thêm 27 điểm. Cách tính là logic người dùng; skill chỉ để chỗ và nhãn "điểm".

### Sparkline trong ô số liệu

```tsx
// Cả hàng dùng chung một cờ: có ít nhất một ô vẽ được thì mới giữ chỗ
const rowHasSparkline = tiles.some((tile) => tile.points.length >= 2);

<div className="flex min-w-0 flex-col p-5">
  {/* nhãn, số, dòng so sánh */}
  {tile.points.length >= 2 ? (
    <svg aria-hidden="true" className="mt-auto h-10 w-full pt-4">{/* polyline + chấm cuối */}</svg>
  ) : rowHasSparkline ? (
    // Giữ chỗ chỉ để cao bằng ô bên cạnh; màn một cột không có ô bên cạnh
    <div aria-hidden="true" className="mt-auto h-10 pt-4 max-sm:hidden" />
  ) : null}
</div>
```

Không đặt `min-h` cố định cho ô: chiều cao ô phải đến từ nội dung, để cả hàng
chưa có sparkline thì ô tự ngắn lại (đã dính 22/09/2026: sửa luật rồi mà
desktop vẫn trống, vì ô giữ `min-h` hoặc chỗ giữ không phụ thuộc cả hàng).

- Một đường `stroke-[1.5]` `--primary`, cao `h-10` đến `h-12`, rộng hết ô, dính đáy ô (`mt-auto`). Chấm `size-1.5` ở điểm cuối. Không trục, không nhãn, không rê chuột: ô là để liếc hình dáng.
- **Không lấy đáy 0**, khác biểu đồ đường: kéo giãn theo min–max của chuỗi để thấy được dáng. Biểu đồ đường thì có số để đọc, sparkline chỉ có dáng.
- **Đường luôn một màu `--primary`**, kể cả khi dòng so sánh đỏ. Màu tốt/xấu đã nói ở dòng so sánh; tô đường đỏ nữa là hai tín hiệu cho một ý (`N3`).
- Mọi ô trong hàng cùng số điểm, cùng khoảng thời gian, sparkline cùng chiều cao.
- **Chưa đủ hai điểm** (tháng đầu tiên): không vẽ, không chấm lẻ, không đường ngang giả. **Giữ chỗ chỉ khi có ô bên cạnh để khớp** (`N1`):
  - Cùng hàng có ô **có** sparkline: ô thiếu giữ chỗ bằng đúng chiều cao sparkline, để các ô cao bằng nhau.
  - **Màn hẹp một cột** (`max-sm`): các ô xếp dọc, không có ô nào bên cạnh, giữ chỗ chỉ là một khoảng trắng lớn dưới mỗi ô. Chỗ giữ `max-sm:hidden` (đã dính 22/09/2026).
  - **Cả hàng đều chưa có** sparkline: bỏ hẳn chỗ giữ ở mọi cỡ màn, ô chỉ cao đến dòng so sánh.
- `aria-hidden="true"` trên `<svg>`: xu hướng đã nói bằng chữ ở dòng so sánh.

Biểu đồ cột nhiều mốc ở màn hẹp thì cho cả cụm cuộn ngang **trong khung riêng**
bằng `overflow-x-auto` cộng một bề rộng tối thiểu cho cụm, đừng để nó đẩy cả
trang. Xem luật `R1` trong `../responsive.md`.
