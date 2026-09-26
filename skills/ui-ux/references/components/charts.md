# Biểu đồ và số liệu

Biểu đồ là chỗ luật một màu nhấn hay bị phá nhất. Bốn ô số liệu bốn màu, cột
xanh cột đỏ, biểu đồ tròn bảy múi bảy sắc. Nhìn thì tưởng nhiều thông tin, thật
ra là không quyết định được cái nào quan trọng.

---

## Màu

**Một chuỗi dữ liệu là một màu.** Tám cột của cùng một chỉ số thì cả tám cùng
`--primary`. Cột cao thấp đã nói lên khác biệt rồi, không cần màu nói lại.

**Hai tới bốn chuỗi thì phân biệt bằng đậm nhạt, không bằng sắc** (dự án chưa có thang màu biểu đồ). Đổi hue là bắt
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

**Phân loại từ 5 nhóm trở lên thì mỗi nhóm một sắc.** Ngành, kênh, quốc gia, loại
khách: năm bậc đậm nhạt của một màu thì bậc 4 và bậc 5 mắt không tách được nữa, chấm
màu trong bảng không còn chỉ về đúng thanh nào. Các app phân tích phổ biến đều tô mỗi
nhóm một sắc ở đây (thanh chia phần, donut, cột chồng). Cách làm:

- **Dự án có thang màu biểu đồ** (`--chart-1`…`--chart-5` của shadcn, hay thang riêng) thì
  dùng đúng thang đó theo thứ tự. Dự án có ngôn ngữ màu riêng (`P4`) thì thang theo dự
  án kể cả khi dưới 5 nhóm.
- **Chưa có** thì dùng thang mặc định, xếp theo thứ tự nhóm lớn tới nhỏ: `blue-500` ·
  `sky-400` · `violet-500` · `fuchsia-400` · `teal-500` · `indigo-300`. Tránh sắc trùng
  bảng trạng thái (`red`, `rose`, `amber`, `emerald`) khi cùng màn có badge trạng thái,
  để một nhóm không bị đọc thành "lỗi" hay "xong".
- **Tối đa 6 sắc**, nhóm thứ 7 trở đi gộp thành "Khác" màu `slate-300`. Bảy tám sắc
  thì lại thành cầu vồng không ai nhớ.
- **Một nhóm một màu cố định trong cả app** (như `M8`): "Media" tím ở thanh chia phần
  thì tím ở donut, ở chấm trong bảng.
- **Chấm màu trong bảng dùng đúng màu của thanh**, và mỗi nhóm luôn có số và phần trăm
  bằng chữ: màu chỉ giúp nối bảng với biểu đồ, không mang giá trị (`N4`).

**Màu chỉ được đổi sắc khi nó mang nghĩa trạng thái** (ngoài ca phân loại từ 5 nhóm ở trên), và phải trùng đúng bảng
trạng thái của app: đỏ là hỏng hoặc thất bại, amber là quá hạn hoặc cần chú ý,
emerald là xong. Cột "quá hạn" tô amber thì được (`M7`, `list-row.md`). Cột "tháng 3" tô đỏ thì không.

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

## Cột hay đường

| Dữ liệu | Loại | Vì sao |
| --- | --- | --- |
| **Số đếm của từng kỳ**, tới ~12 kỳ: việc xong mỗi tuần, đơn mỗi ngày, khách mới mỗi tháng | **Cột**, số trên đầu mỗi cột | Mỗi kỳ là một con số rời người ta muốn đọc; cột ghi đủ số, không phải rê chuột |
| Mức tại từng thời điểm hoặc tỷ lệ: số người dùng đang hoạt động, tỷ lệ huỷ, số dư, luỹ kế. Doanh thu theo tháng khi cái cần đọc là xu hướng | Đường | Giá trị chảy liền, cái cần thấy là dáng lên xuống |
| Số đếm từng kỳ nhưng quá ~12 kỳ (30 ngày, 52 tuần) | Đường | Cột mảnh quá, số trên đầu cột chồng nhau |

Các công cụ quản lý dự án phổ biến vẽ "việc xong mỗi tuần" bằng cột. Đã dính
26/09/2026: màn tổng quan vẽ 8 tuần bằng đường, chỉ đọc được số tuần cuối.

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
    <!-- mx-auto w-full max-w-8: cột tối đa 32px, nằm giữa khe của nó -->
    <div class="mx-auto w-full max-w-8 rounded-t-md bg-primary" style="height: 80%"></div>
  </div>
  <!-- các cột khác, cùng bg-primary; kỳ đang chạy (cột cuối) bg-primary/35 -->
</div>

<div class="mt-3 flex gap-2 border-t border-border pt-3 sm:gap-3">
  <p class="flex-1 text-center text-xs text-muted">T1</p>
  <!-- nhãn trục, cùng gap với cụm cột để thẳng hàng -->
</div>
```

Nhãn trục phải dùng **đúng `gap` với cụm cột**, lệch một bậc là cả hàng nhãn
trượt khỏi cột.

- **Cột tối đa 32px** (`max-w-8`), khe còn lại để trống. Để `flex-1` giãn hết thì 8 cột trong card rộng thành 8 khối đen 56px, cả biểu đồ là một mảng đen nặng nhất màn, nặng hơn tên trang và hàng số (đã dính 26/09/2026, thử 32px ngay trên trang thì mảng đen mất, số trên đầu cột vẫn đọc như cũ). Màn hẹp cột tự co theo khe.
- **Kỳ đang chạy (tuần này, tháng này) là cột nhạt `bg-primary/35`, nhãn trục ghi "Tuần này"**, số trên đầu vẫn ghi. Kỳ chưa hết mà vẽ cùng màu với các kỳ đủ thì cột thấp đọc ra "tuần này tụt", cột cao đọc ra "đã vượt" trong khi tuần còn hai ngày. Hàng số liệu đã so "cùng thời điểm tuần trước", biểu đồ cũng phải nói tuần này chưa xong. Các công cụ phân tích phổ biến đều vẽ kỳ đang chạy khác đi (nhạt hoặc nét đứt).
- **Mới một kỳ thì chưa phải biểu đồ**, như biểu đồ đường: một cột đứng giữa khung trống là một cột đen không so với gì. Thay vùng vẽ bằng khối chữ, giữ chiều cao: số `text-2xl font-semibold tabular-nums` + "Việc xong tuần này. Từ tuần sau sẽ thấy xu hướng" (đã dính 26/09/2026, ca tuần đầu).

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

**Thanh trong danh sách luôn `bg-primary`**, kể cả khi mục đó có chuyện cần chú ý
(dự án có việc quá hạn). Thanh nói đúng một điều là đã xong bao nhiêu; chuyện cần
chú ý nói bằng chữ ở dòng phụ, và **chỉ cụm đó** `text-amber-700`, phần còn lại
xám: `112 / 120 việc · <span class="text-amber-700">2 việc quá hạn</span>`, cùng
cách tô với hạn trong `list-row.md`. Tô cả thanh hổ phách thì dự án 93% đọc ra
"tiến độ có vấn đề", vài thanh cam thành thứ nặng nhất màn (đã dính 26/09/2026).
Màu theo trạng thái (dưới đây) chỉ cho **thanh đứng riêng**, nơi màu nói về chính
đại lượng thanh đo (dung lượng gần đầy). Mục xong 100% thì thanh emerald như
thanh đứng riêng.

**Thanh tiến độ đứng riêng** (dung lượng, checklist): hàng trên là
nhãn trái + số phải, thanh ở giữa, một dòng phụ `text-xs text-muted` bên dưới.

- `role="progressbar"` + `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label` bằng đúng nhãn. Trình đọc màn hình không thấy độ dài thanh.
- **Màu theo trạng thái, đúng bảng trạng thái của app**: đang chạy `bg-primary`; **xong** `bg-emerald-600` (checklist đủ); cần chú ý `bg-amber-500`; hỏng hay đầy `bg-red-500`. Ngưỡng đổi màu (vd. dung lượng từ 80%) là của người dùng, truyền qua prop `tone`. Dòng phụ đổi màu theo (`amber-700`, `red-600`) và nói bằng chữ, vì màu thanh một mình không đủ.
- **Xong mà thanh vẫn đen đầy** thì trông y hệt "đang chạy tới 99%". Thanh đứng riêng (dung lượng, checklist) xong là emerald (đã dính 22/09/2026).
- **Tải tệp** (một hay nhiều tệp) không dùng khuôn này: theo `file-upload.md`. **Hai độ dày là cố ý, đừng gộp**: thanh ở đây (`h-2`) là **con số chính** của khối, người ta đọc nó để so; thanh tải tệp (`h-1`) chỉ là **trạng thái tạm** của một dòng mà nội dung chính là tên tệp, xong là biến mất. Demo "tiến độ tải file" trong bộ progress bar cũng dựng theo khuôn tải tệp. Thanh mảnh `h-1`, chỉ tệp đang tải mới có thanh; xong và hỏng thì bỏ thanh, bỏ số %, chỉ còn một dòng chữ; Thử lại là nút chữ sau lý do.
- **Không có gì để đếm** (checklist 0 việc): không ghi `0/0`, ô số để trống, thanh rỗng, dòng phụ "Chưa có việc nào". `0/0` đọc như lỗi chia cho 0.
- **Một kiểu viết số cho cả app**: `12,4 / 20 GB` và `4 / 6 việc`, gạch chéo có dấu cách hai bên. Chỗ có cách chỗ không là lệch (đã dính 22/09/2026). Số `tabular-nums`.

⚠️ **Luật cũ đã bỏ (24/09/2026), đừng hồi sinh:** tải hỏng giữ thanh đỏ dừng giữa chừng kèm số %, nút viền "Thử lại" cuối hàng, cột hành động `w-20`; tải xong giữ thanh xanh lá đầy + `100%`. Lên danh sách nhiều tệp thì thành một dàn sọc đen đỏ xanh, và tệp hỏng không còn ✕ để bỏ. Khuôn mới ở `file-upload.md`.

**Biểu đồ đường** (xu hướng theo tháng, theo ngày):

- Có thư viện thì cấu hình theo bảng ở mục "Vẽ bằng thư viện"; chưa có thì một `<svg>` với `<polyline>` là đủ; chỉ đề xuất thư viện khi có nhu cầu ở mục 3 phía trên.
- Một đường `stroke-2` màu `--primary`, không tô vùng dưới, không bo cong làm sai giá trị (`monotone` thì được, `basis`/`cardinal` vọt quá điểm thật thì không).
- **Chỉ một chấm và một con số, ở điểm cuối** (`size-2.5`, số `text-xs font-semibold tabular-nums` ngay trên chấm). Rê chuột hay dùng mũi tên thì chấm và số dời sang tháng đó, **không mở thêm tooltip nổi**: cùng một chỗ, chỉ đổi vị trí (`N1`, `N3`). Dựng một ví dụ tĩnh cho trạng thái đang rê (`N2`).
- **Đáy là 0**, đường kẻ đáy `border-border`, nhãn tháng `text-xs text-muted` bên dưới. Tháng bằng 0 thì chạm đáy.
- **Không có số khác với bằng 0.** Tháng chưa có dữ liệu (chưa tới, chưa ghi nhận) thì **đứt đường** ở đó, không kéo xuống đáy: kéo xuống 0 là nói dối "tháng đó không bán được gì".
- **Màn hẹp**: 12 nhãn tháng ở 375px sát vào nhau. Dưới `sm` ghi **cách một nhãn, đếm ngược từ nhãn cuối** (nhãn cuối, cuối − 2, cuối − 4…); đường vẫn đủ 12 điểm. Đừng đếm xuôi "nhãn lẻ + nhãn cuối": số điểm chẵn thì nhãn cuối đứng sát nhãn lẻ cuối cùng, "14/09 21/09" dính nhau ở 375px (đã dính 26/09/2026, 8 tuần). Cột cũng theo luật này.
- **Mới một điểm thì chưa phải biểu đồ.** Một chấm lơ lửng giữa khung trống trông như vẽ lỗi. Thay vùng vẽ bằng khối chữ, **giữ nguyên chiều cao**: con số `text-2xl font-semibold tabular-nums` + dòng `text-sm text-muted` "Số của tháng 9. Từ tháng sau sẽ thấy xu hướng" (`N6`).
- **Rỗng**: giữ chiều cao, câu nói vì sao và bao giờ có: "Chưa có doanh thu. Số liệu hiện sau đơn hàng đầu tiên" (`components/empty-state.md`). Bỏ luôn đường đáy: đáy không nhãn đứng một mình trông như đường kẻ lạc.
- `role="img"` + `aria-label` tóm tắt bằng chữ ("Doanh thu 12 tháng, tăng từ 0,9 tỷ lên 1,46 tỷ"); điểm nhận focus thì mỗi điểm có `aria-label` tháng + số.

**Hàng ô số liệu:** một khối chia `divide-x`, không phải mấy card rời. Xem
`layouts/app.md`.

---

## Ô số liệu ở màn hẹp

Đây là chỗ vỡ nhiều nhất, và chỉ lộ ra khi thu cửa sổ xuống 375px.

- **Mobile là 2×2**: `grid-cols-2 lg:grid-cols-4`, như hầu hết app trên điện thoại. Một cột thì bốn ô số ngắn (4, 140, 5, 23) xếp dọc cao 417px, chiếm gần hết màn đầu ở 375px, biểu đồ và việc hôm nay bị đẩy khỏi tầm nhìn; 2×2 còn 209px (đo 26/09/2026, chủ dự án duyệt). Ở 375px mỗi ô còn **138px cho chữ số** (`text-xl`, ô `p-4`): vừa `1.284.500` (98px), `184,5 tr đ` (91px), `1,28 tỷ đ` (80px); không vừa `1.284.500.000 đ` (161px).
  - **Có số không vừa 138px** (tiền đầy đủ tới hàng tỷ): gợi ý rút gọn theo "Số quá 9 chữ số" bên dưới. Người dùng muốn giữ số đầy đủ thì hàng đó về `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, không để số xuống dòng hay tràn.
  - **Số ô lẻ** (3, 5): 2 cột là một ô đứng lẻ ở hàng dưới (`R3`), nên đi thẳng `grid-cols-1 sm:grid-cols-3`. 6 ô thì 2 cột được.
  - Luật cũ (bỏ 26/09/2026): "Mobile là một cột" cho mọi hàng số, vì sợ số dài; phần lớn hàng số trên màn tổng quan là số đếm ngắn.
  - Ô trong panel trượt: xem mục dưới.
- **Trong panel trượt hay cột hẹp: lưới 2×2 cố định, một khung, số nhỏ hơn tên.** Panel 448px không phải trang tổng quan: số ở đây là thông tin phụ của một bản ghi, không phải nhân vật chính. Bốn card rời `rounded-2xl p-5` với số `text-3xl` là thứ nặng nhất panel, nặng hơn cả tên khách (đã dính 24/09/2026; các CRM lớn để số của khách ở cỡ chữ thường). Dựng một khung, kẻ chia bằng khe 1px, số `text-lg font-semibold`, không bao giờ lớn hơn cỡ tên ở header panel. Dòng so sánh chỉ còn icon + số (kỳ ghi một lần, xem "Dòng so sánh") nên 2 cột ở 375px vẫn vừa, không phải xếp thành bốn ô dọc dài.

```html
<p class="mb-2 text-xs text-muted">12 tháng gần nhất, so với 12 tháng trước</p>
<div class="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
  <div class="min-w-0 bg-surface p-4">
    <p class="text-xs font-medium text-muted">Doanh thu</p>
    <p class="mt-1 text-lg font-semibold tabular-nums text-foreground">184,5<span class="ml-1 text-muted">tr đ</span></p>
    <p class="mt-0.5 flex items-center gap-1 text-xs font-medium tabular-nums text-emerald-700">
      <i data-lucide="trending-up" class="size-3.5"></i>12,4%
    </p>
  </div>
  <!-- 3 ô còn lại cùng khuôn -->
</div>
```
- **Mỗi ô phải có `min-w-0`.** Grid item mặc định không chịu co nhỏ hơn nội dung, thiếu dòng này là cả trang tràn ngang.
- **Cỡ số giảm một bậc ở mobile**: `text-xl sm:text-2xl`.
- **Dùng `tabular-nums`** cho mọi con số. Chữ số đều bề ngang thì các ô thẳng cột nhau, và số không nhảy khi đổi giá trị.

```html
<!-- Kẻ chia bằng khe 1px lộ nền --border (như lưới trong panel): divide-x không kẻ được đường ngang giữa hai hàng của 2×2 -->
<div class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
  <div class="min-w-0 bg-surface p-4 sm:p-5">
    <p class="text-xs font-medium text-muted">Đang làm</p>
    <p class="mt-1 text-xl font-semibold tracking-tight tabular-nums text-foreground sm:text-2xl">1.284.500</p>
    <p class="mt-1 text-xs text-muted">Trải trên 4 dự án</p>
  </div>
</div>
```

### Dòng so sánh và đơn vị tiền

```html
<div class="min-w-0 p-5">
  <p class="text-xs font-medium text-muted">Doanh thu tháng này</p>
  <p class="mt-1 text-xl font-semibold sm:text-2xl tracking-tight tabular-nums text-foreground">
    1.284.500.000<span class="ml-1 font-semibold text-muted">đ</span>
  </p>
  <p class="mt-1 flex items-center gap-1 text-xs text-muted">
    <i data-lucide="trending-up" class="size-3.5 text-emerald-700"></i>
    <span class="font-medium tabular-nums text-emerald-700">12,4%</span> so với tháng trước
  </p>
</div>
```

- **Hai luật tiền dưới đây cho tiền VND trong copy tiếng Việt.** Tiền tệ khác hoặc copy tiếng Anh thì format theo locale (`T28`).
- **Đừng format tiền bằng `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })`**: nó tự sinh ra `₫`. Format số bằng `Intl.NumberFormat('vi-VN')` rồi tự gắn `đ` (22/09/2026: sửa luật rồi mà bản dựng vẫn ra `₫`, nghi do hàm format tiền kiểu này). Grep `currency: 'VND'` trước khi đổ lỗi cho chỗ khác.
- **Đơn vị tiền dùng chữ `đ` thường, không dùng ký hiệu `₫`.** Chữ `₫` có sẵn một vạch dưới trong chính mặt chữ, CSS không bỏ được: ở cỡ lớn trông như link, thu nhỏ thì thành một vệt gạch lí nhí (đã dính 22/09/2026, thử cả hai). `đ` **cùng cỡ với số**, `font-semibold`, chỉ đổi sang `text-muted` và cách `ml-1`: màu mờ đã đủ tách đơn vị khỏi giá trị. Dự án đã quen dùng `₫` thì theo dự án.
- **Số quá 9 chữ số trong ô hẹp**: gợi ý (người dùng quyết) rút gọn `1,28 tỷ đ`, số đầy đủ để trong `title`. Ô số liệu để đọc xu hướng, không để đối soát từng đồng.
- **Dòng so sánh**: icon `trending-up` / `trending-down` `size-3.5` + phần trăm `font-medium` có màu + phần còn lại `text-muted`. Chỉ icon và con số mang màu, không tô cả câu.
- **Màu theo tốt/xấu, không theo lên/xuống.** Doanh thu tăng là xanh, nhưng chi phí hay số đơn huỷ tăng là đỏ. Để một prop kiểu `tone="positive" | "negative" | "neutral"` cho người dùng quyết, đừng suy màu từ dấu của con số. Xanh `emerald-700`, đỏ `red-700`: chữ `text-xs` cần 4.5:1, `emerald-600` và `red-500` không đạt.
- **Không đổi**: icon `minus`, chữ `text-muted`, không màu. **Một ô không có kỳ trước** (các ô khác có): một câu `text-muted` ngắn ("Chưa có kỳ trước"). Hai ca này vẫn **giữ đúng một dòng**, để các ô trong hàng cao bằng nhau. Ngưỡng coi là "không đổi" do người dùng quyết.
- **Kỳ so sánh ghi MỘT lần cho cả hàng, không lặp ở từng ô.** Bốn ô cùng đuôi "so với 2025" là một ý nói bốn lần (`N3`), và chính cái đuôi đó làm ô hẹp vỡ dòng. Ghi kỳ một lần ở tiêu đề mục hoặc dòng `text-xs text-muted` trên hàng ô ("12 tháng gần nhất, so với 12 tháng trước"), mỗi ô chỉ còn icon + số ("↗ 12,4%", "↗ 0,6 điểm"). Nhãn ô cũng bỏ kỳ: "Doanh thu", không "Doanh thu 12 tháng" khi ô bên cạnh là "Số đơn" trơn, vì đọc ra hai ô hai kỳ khác nhau. **Kỳ so phải cùng loại với kỳ đo**: đo 12 tháng gần nhất thì so với 12 tháng trước đó, không so với "năm 2025" (đã dính 24/09/2026, panel khách hàng: "Doanh thu 12 tháng … so với 2025" ở cả bốn ô).
- **Cả hàng không có kỳ trước thì cũng nói một lần**, ở đúng chỗ ghi kỳ ("Khách mới, chưa có kỳ trước để so"), các ô bỏ hẳn dòng so sánh. Bốn ô cùng dòng "Chưa có kỳ trước" là cùng lỗi lặp ở trên. Ngoại lệ: trên cùng màn có số khác kỳ đếm cùng thứ (tab "Đơn hàng 42" trọn đời) thì riêng ô đó ghi kỳ trong nhãn, "Đơn đã giao · 12 tháng" (`layouts/app.md`, "Trang chi tiết bản ghi").
- **Cả hàng rỗng (khách chưa có đơn nào) thì không dựng lưới số 0.** Bốn ô "0 đ", "0 đơn", "—", "—" là bốn khung chỉ để nói một ý "chưa có gì". Thay cả hàng bằng một khung gọn cùng viền và **cùng nền `bg-surface`** với các card (khung trong suốt nằm trên nền trang thì chỉ còn một dòng chữ xám lơ lửng, viền `--border` gần như không thấy; đã dính 26/09/2026), một câu `text-sm text-muted` nói vì sao và bao giờ có: "Chưa có đơn nào. Số liệu hiện sau đơn đầu tiên" (`components/empty-state.md`, `N6`). Có nút tạo đơn ở chỗ khác trên màn thì không lặp nút ở đây. **Trang chi tiết có tab Đơn hàng thì bỏ hẳn hàng số**, không dựng cả khung gọn: tab rỗng đã nói câu đó (`layouts/app.md`, "Trang chi tiết bản ghi").
- **`—` chỉ khi không tính được** (mẫu số bằng 0: chưa có đơn nào thì chưa có tỷ lệ hoàn). Có 3 đơn, không đơn nào hoàn thì là `0%`, không phải `—`: `—` ở đó đọc ra "thiếu dữ liệu" trong khi số đã rõ (đã dính 24/09/2026).
- **Ô không có giá trị thì `—` `text-muted font-normal`**, cùng ký hiệu với ô trống trong bảng (`T18`). `—` tô `text-foreground font-semibold` ở `text-2xl` thành một vạch đen dày, đọc như con số chứ không như "trống" (đã dính 24/09/2026).
- **Nhãn đã nói đơn vị thì số không lặp đơn vị.** Nhãn "Số đơn" thì số là `24`, không `24 đơn`; nhãn "Khách hàng" thì `1.204`, không `1.204 khách`. Đơn vị chữ chỉ gắn khi nhãn chưa nói (nhãn "Đơn hàng" có thể `24 đơn`, nhưng thường thừa).
- **Số rút gọn thì hậu tố đi cùng đơn vị, cùng một span mờ**: `184,5` rồi `tr đ` `text-muted`, không để `tr` đen mà `đ` xám (đọc thành "184,5 tr" là số, "đ" là đơn vị, trong khi "tr" cũng là đơn vị). Chữ rút gọn: `nghìn`, `tr`, `tỷ`.
- **Dòng so sánh luôn một dòng, `text-xs`**, kể cả ca có số. Đừng để icon và phần trăm ở dòng trên, "so với tháng trước" rớt xuống dòng dưới: đọc thành hai ý rời, và ô cao thêm một dòng (đã dính 22/09/2026). Ô hẹp không đủ chỗ thì rút đuôi câu ("so với T8", "so với kỳ trước"), không xuống dòng. Câu ca không có kỳ trước cũng vậy: "Chưa có số kỳ trước để so" vỡ thành hai dòng, chữ "so" nằm một mình, nên dùng "Chưa có kỳ trước".
- **`%` dính vào số, không cách**: `2,8%`, `12,4%`, cùng một kiểu ở số chính lẫn dòng so sánh (`N5`). Khác `đ` và `đơn`: đơn vị là chữ thì cách `ml-1`, ký hiệu `%` thì không. Số chính có `%` thì `%` `text-muted` như `đ`.
- **Số đếm nhỏ thì so bằng chênh lệch, không bằng phần trăm.** Kỳ trước dưới 20 (việc quá hạn, dự án đang chạy) thì ghi "↗ 2", không "↗ 66,7%": từ 3 lên 5 việc quá hạn mà đọc 66,7% thì tưởng cháy nhà (đã dính 26/09/2026). Nhãn ô đã nói đơn vị nên số trơn, không "2 việc". Các ô trong một hàng được phép khác kiểu (ô 140 việc đang mở vẫn ghi %).
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
    // Giữ chỗ chỉ để cao bằng ô bên cạnh. Hàng 2×2 ở mobile vẫn có ô bên cạnh nên giữ;
    // chỉ hàng về một cột ở mobile (số dài, số ô lẻ) mới thêm max-sm:hidden
    <div aria-hidden="true" className={cn("mt-auto h-10 pt-4", isSingleColumnOnMobile && "max-sm:hidden")} />
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
  - **Hàng về một cột ở mobile** (số dài không rút gọn, số ô lẻ; mặc định là 2×2, xem "Ô số liệu ở màn hẹp"): các ô xếp dọc, không có ô nào bên cạnh, giữ chỗ chỉ là một khoảng trắng lớn dưới mỗi ô. Chỗ giữ `max-sm:hidden` (đã dính 22/09/2026). Hàng 2×2 thì giữ chỗ cả ở mobile, vì ô cạnh bên vẫn cần cao bằng.
  - **Cả hàng đều chưa có** sparkline: bỏ hẳn chỗ giữ ở mọi cỡ màn, ô chỉ cao đến dòng so sánh.
- `aria-hidden="true"` trên `<svg>`: xu hướng đã nói bằng chữ ở dòng so sánh.

Biểu đồ cột nhiều mốc ở màn hẹp thì cho cả cụm cuộn ngang **trong khung riêng**
bằng `overflow-x-auto` cộng một bề rộng tối thiểu cho cụm, đừng để nó đẩy cả
trang. Xem luật `R1` trong `../responsive.md`.
