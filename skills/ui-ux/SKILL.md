---
name: ui-ux
description: Gu UI/UX cho app — dashboard, danh sách, bảng, form, cài đặt, modal, trang lướt để chọn. Mặc định như một designer - brief, 2–3 wireframe, người dùng chọn rồi mới dựng. Lối khác khi đề nói rõ - soi UI đang có ("xem giúp", "review"), dựng lại giữ brand ("giữ brand", "keep the brand") hay theo gu skill ("bỏ style cũ"), refactor giữ nguyên hình, dựng luôn ("dựng luôn", "just build it"), design system trước ("UI kit", "component library"), logo đơn giản ("làm logo"), sửa một component. Mặc định flat; làm được glass, gradient, nổi, nền tối. Landing page sang skill landing; cửa hàng online, blog chưa được dạy - vẫn làm, báo trước. Dùng khi dựng, làm lại, sửa giao diện app, xem ảnh hay link app, hoặc nhắc "làm UI cho đẹp", "dựng màn", "thiết kế", "làm lại UX", "nhìn rối", "build a page", "design this screen", "redesign", "make it look good", "ecommerce", "ui-ux", "evon".
---

# UI/UX cho hệ thống dashboard

> **Chưa đi hết mục 0 thì KHÔNG viết một dòng code nào trong lượt này.**
> **Mặc định là làm như một designer** (`references/design-process.md`, nhánh `U`): brief,
> việc chính của từng màn, 2–3 wireframe, người dùng chọn rồi mới dựng. Đề viết tiếng Việt
> hay tiếng Anh đều vậy. Hai cổng chờ của nhánh đó (duyệt brief, chọn wireframe) là hai chỗ
> duy nhất được dừng hỏi (lối design system có một cổng riêng, `D9`; lối làm logo có một cổng
> chọn logo, `components/logo.md`). Ngoài các cổng đó thì **không hỏi**: chỗ nào đề chưa rõ thì lấy mặc
> định, **báo lúc giao** mình đã chọn gì.
> Các nhánh khác chỉ khi đề nói rõ (câu 1): **soi UI đang có** (`references/review.md`) thì
> soi luôn, **sửa thì hỏi**; dựng lại giữ brand; dựng lại theo gu skill; refactor; dựng luôn
> không wireframe; dựng design system trước; sửa một component nhỏ.

Skill này không dạy "thế nào là đẹp" bằng tính từ. Nó làm ba việc: **đi đúng thứ
tự** trước khi dựng, **cấm** những thói quen làm giao diện lộ ngay ra là AI dựng,
và **ràng buộc bằng con số** để phần còn lại tự sạch.

Phạm vi: **màn hình trong app**. Dashboard, danh sách, bảng, form, cài đặt,
modal. Không lo trang bán hàng, trừ bảng giá (`references/layouts/pricing.md`).

**Landing page, trang giới thiệu doanh nghiệp hay cửa hàng (spa, quán, showroom, công ty sản
xuất) thì mở skill `landing`** (`../landing/SKILL.md`, gọi bằng `/evon:landing`) và đi theo nó
từ mục 0 của nó, không theo file này. Landing cho phần mềm (SaaS, app, công cụ dev) cũng sang đó.
Không thấy thư mục đó thì xếp vào nhóm chưa được dạy dưới đây. ⚑

**Đề là loại UI skill chưa được dạy thì báo trước một dòng, rồi vẫn làm.** Gồm: cửa hàng
online phía người mua (trang chủ shop, trang sản phẩm, giỏ hàng, thanh toán); blog (trang chủ
blog, trang đọc bài); và loại tương tự (portfolio, trang sự kiện). Phía quản trị của chúng (quản lý đơn, sản phẩm, bài viết) là
màn trong app, không thuộc nhóm này. Câu báo nằm **đầu câu trả lời đầu tiên**, trước dòng
audit, theo ngôn ngữ của đề:

> Lưu ý: skill chưa được dạy cho cửa hàng online / blog / trang chủ website, nên mình vẫn làm được
> nhưng kết quả có thể chưa đẹp bằng màn trong app. Phần nào trùng màn app (bảng giá, danh
> sách lướt để chọn, form) thì vẫn theo mẫu đã duyệt.

Chỉ báo, **không phải cổng**: không dừng hỏi có làm tiếp không, đi tiếp câu 1 như mọi đề.
Phần trang không có mẫu thì theo luồng "Dựng một thứ chưa có mẫu" (cuối
`references/principles.md`). ⚑

Skill lo **giao diện**: bố cục, style, và **mỗi trạng thái trông ra sao** (đang
chọn, khoá, rỗng, đang tải, lỗi, một trang, không dòng nào). **Không tự viết
logic xử lý**: bấm trang thì gọi gì, đổi số dòng thì nhảy về đâu, lưu vào URL
hay không, gọi API nào. Chỗ đó để prop hoặc handler rỗng (`onPageChange`,
`onConfirm`) cho người dùng tự nối. Cần xem nhiều trạng thái thì dựng **mỗi
trạng thái một ví dụ tĩnh** cạnh nhau, không dựng bản bấm được để xem.

---

## 0. Bốn câu hỏi, đúng thứ tự này

### Câu 1 — Đề đi lối nào? Mặc định là như một designer

Đây là câu **đầu tiên**, trước mọi thứ khác. Các lối khác nhau về rủi ro, về thứ tự
các bước, và về người phải duyệt.

Đọc đề theo thứ tự bảng, gặp dòng đầu tiên khớp thì dừng. Chủ dự án chốt: **dòng
cuối là mặc định**, tám dòng trên chỉ khi đề nói rõ (tiếng Việt hay tiếng Anh).

| Đề nói | Đi đâu |
| --- | --- |
| **Muốn biết UI đang có chỗ nào chưa ổn** ("xem giúp", "review", "chỗ nào chưa ổn", "nhìn rối", "check this UI", "what's wrong with", gửi ảnh hay link app của họ nhờ xem) | Mở `references/review.md`, nhánh `V` **chế độ soi**: lập bảng trước/sau, người dùng chọn dòng rồi mới sửa. **Dừng mục 0 tại đây**, lúc giao theo `V5` chứ không theo `S15` ⚑ |
| **Làm lại mà giữ brand / giữ giao diện** ("giữ brand", "giữ màu", "giữ giao diện hiện tại", "chỉ làm gọn", "keep the brand", "keep the current look") | `references/review.md`, **chế độ dựng lại giữ brand**: giữ khung trang, thay control gốc bằng component của skill, giữ vai màu. Đề nói bỏ style cũ thì không phải dòng này, xem dòng dựng lại theo gu skill. **Dừng mục 0 tại đây** ⚑ |
| **Refactor / dọn code mà giữ nguyên hình** ("refactor", "chuyển sang Tailwind", "dọn CSS") | Mở `references/refactor.md`, nhánh `L`. **Dừng mục 0 tại đây** — nhánh đó có bộ mặc định riêng, bắt đầu bằng "đo trước khi kết luận" |
| **Làm logo** ("làm logo", "dựng logo", "thay logo", "design a logo") | Mở `references/components/logo.md`: audit câu 2, rồi **trang chọn logo** ba hướng đặt trong sidebar, màn đăng nhập, tab trình duyệt. **Một cổng**: người dùng chọn hướng; đề có "luôn" thì dựng thẳng hướng khuyên dùng. **Dừng mục 0 tại đây** ⚑ |
| **Dựng luôn, không wireframe** ("dựng luôn", "không cần wireframe", "just build it", "skip the wireframe") | Nhánh `U` **không vẽ wireframe**: làm `U1`, `U2`, chọn phương án sẽ khuyên dùng trong đầu, rồi dựng thẳng theo nó (`design-process.md`, đầu file). Không hỏi. Audit câu 2 vẫn chạy, ở `U1`. **Dừng mục 0 tại đây** |
| **Dựng design system trước** ("design system", "dựng component trước", "UI kit", "chốt token / spacing / typography trước", "build a design system", "component library first") | Mở `references/system.md`, `D9`: token, bảy nguyên tố của `D1` cộng thứ đề nêu tên, một trang xem design system. Không vẽ wireframe. **Một cổng**: duyệt trang đó; màn dựng sau đi lối bình thường. **Dừng mục 0 tại đây**, trừ audit câu 2 ⚑ |
| **Việc nhỏ hơn một màn**: sửa một component, thêm một dropdown, sửa một lỗi, đổi một màu | Đi tiếp câu 2, dựng theo bố cục mặc định (câu 4), không hỏi |
| **Dựng lại theo gu skill, bỏ style cũ** ("hoàn toàn theo gu skill", "bỏ style cũ", "đổi sang gu của skill", "không cần giữ style cũ") | `references/review.md`, **chế độ dựng lại theo gu skill**: giữ khung trang, đổi cả dáng lẫn vai màu theo gu skill. **Dừng mục 0 tại đây** ⚑ |
| **Mọi đề dựng hay làm lại một màn trở lên** ("dựng màn danh sách đơn hàng", "làm lại trang này cho đẹp", "dựng lại theo skill", "thiết kế từ đầu", "build a settings page", "redesign this screen"), sản phẩm mới hay màn đã có | **Mặc định.** Mở `references/design-process.md`, nhánh `U`: brief và việc chính của từng màn, rồi 2–3 wireframe, người dùng chọn rồi mới dựng. **Dừng mục 0 tại đây**, trừ audit câu 2: vẫn chạy ở `U1`, trước khi viết brief, cho cả dự án đã có UI ⚑ |

Đề có ảnh wireframe của chính họ thì đó đã là bước wireframe: vào nhánh `U` từ `U4`, dựng
theo ảnh (`S13`–`S15`). Đề vừa muốn dọn code vừa muốn đổi hình thì đi `U` trước, dọn theo
`L` sau. Đề nói soi hay giữ brand thì `V` thay chỗ `U`, `L` vẫn sau.

### Câu 2 — Dự án đang dùng gì? (TỰ TÌM, ĐỪNG HỎI)

> **Audit là CỔNG CHẶN, không phải bước tham khảo.** Chưa chạy xong khối lệnh
> dưới đây thì chưa được mở file layout, chưa được đề xuất bố cục, chưa được
> viết dòng code nào — kể cả khi đề bài nhỏ như "thêm một cái dropdown".

Skill này **bám theo codebase**, không áp bộ công cụ của mình lên dự án người ta.
Audit ba tầng: **stack** (dự án dùng gì), **component** (thứ sắp dựng đã có
chưa), và **phong cách** (dự án đang flat, glass, gradient hay tối).

```bash
# Tầng 1 — stack
ls package.json 2>/dev/null || echo "KHÔNG CÓ package.json — xem dòng cuối bảng"
cat package.json 2>/dev/null | grep -E '"(tailwindcss|@radix-ui|@mui|antd|@chakra|bootstrap)"'
ls components/ui src/components/ui 2>/dev/null          # dấu hiệu shadcn
# thư viện chuyên dụng: biểu đồ, lịch/ngày, bảng, danh sách ảo
cat package.json 2>/dev/null | grep -E '"(recharts|chart\.js|react-chartjs-2|echarts[a-z-]*|@tremor/react|@nivo/[a-z]+|victory|react-apexcharts|react-day-picker|react-datepicker|@mantine/dates|@fullcalendar/[a-z]+|react-big-calendar|date-fns|dayjs|@tanstack/react-table|@tanstack/react-virtual|react-window|react-virtuoso|ag-grid-react)"'
grep -rn "@import\|@theme\|--primary\|--brand\|font-family" \
  app/globals.css src/index.css tailwind.config.* 2>/dev/null | head   # không có `@import "tailwindcss"` = không preflight, W9

# Tầng 2 — thứ sắp dựng đã có chưa. Thay TÊN bằng thứ đang dựng:
# avatar, dropdown, menu, modal, dialog, button, input, badge, toast...
find . -path ./node_modules -prune -o -iname "*TÊN*" -print 2>/dev/null | head
grep -rliE "function TÊN|const TÊN|export.*TÊN" --include="*.tsx" --include="*.jsx" \
  --include="*.vue" --include="*.svelte" . 2>/dev/null | grep -v node_modules | head
```

**Tầng 2 là tầng hay bị bỏ.** Dự án có sẵn `Avatar` mà dựng thêm một cái nữa thì
app có hai kiểu avatar, và cái mới dựng lệch với mọi chỗ khác. Đã có thì **dùng
cái của họ**, chỉ chỉnh token nếu nó trái luật.

**Báo kết quả audit một dòng trước khi đi tiếp**, kể cả khi không tìm thấy gì:

> Audit: Next + Tailwind v4, có shadcn, token ở `globals.css`. Đã có `Avatar` ở
> `components/ui/avatar.tsx` — dùng cái đó. Chưa có dropdown — dựng mới.

Dòng này làm cho việc bỏ audit **nhìn thấy được**. Không có dòng này thì người
dùng không biết AI đã kiểm hay đoán.

**Tầng 3 — phong cách.** Đếm **số file** có tín hiệu, không đếm số dòng:

```bash
count_files() {
  grep -rlE "$1" --include='*.tsx' --include='*.jsx' --include='*.vue' --include='*.svelte' \
    --include='*.html' --include='*.css' --include='*.scss' . 2>/dev/null \
    | grep -viE 'node_modules|dialog|modal|popover|dropdown|menu|select|toast|tooltip|sheet|drawer|command' \
    | wc -l | tr -d ' '
}
echo "glass:    $(count_files 'backdrop-blur|backdrop-filter')"
echo "gradient: $(count_files 'bg-gradient-|bg-linear-|bg-radial-|linear-gradient\(|radial-gradient\(')"
echo "nổi:      $(count_files 'shadow-(md|lg|xl|2xl)')"
# Màu: nền / viền / chữ có sắc dùng làm trang trí hay phân vai, không phải trạng thái
echo "màu:      $(count_files '(bg|border|ring)-(blue|sky|indigo|violet|purple|fuchsia|pink|cyan|teal)-(50|100|200)|bg-primary/(5|10|15|20)|bg-(accent|brand)')"
# Thang màu biểu đồ có sẵn (shadcn sinh --chart-1..5)
grep -rhoE -- '--(chart|categorical|category)-[a-z0-9-]*' --include='*.css' . 2>/dev/null | grep -v node_modules | sort -u | head
# Tối: chỉ cần MỘT file, là layout gốc
grep -rlE '<(body|html)[^>]*(bg-black|bg-(zinc|neutral|slate|gray|stone)-9[0-9]{2})|color-scheme: *dark' \
  --include='*.tsx' --include='*.jsx' --include='*.html' --include='*.css' . 2>/dev/null | grep -v node_modules | head -3
# Token phong cách: có là có chủ đích, dù đếm file ra ít
grep -rhoE -- '--(glass|gradient|shadow|blur)[a-z0-9-]*' --include='*.css' . 2>/dev/null | grep -v node_modules | sort -u | head
```

Lệnh **cố ý bỏ qua** file dialog, dropdown, toast... vì `M15` cho lớp nổi có
bóng và blur. Không bỏ qua thì dự án flat nào dùng shadcn cũng bị đếm thành "nổi".

Đọc số theo `P4` trong `references/styles.md`. Dự án không có phong cách riêng
thì flat. Có phong cách riêng thì **theo phong cách dự án**, báo lúc giao (`P1`).

Dòng `Audit:` thêm phần phong cách:

> Audit: Next + Tailwind v4, có shadcn. Đã có `Avatar`. **Phong cách: glass ở 7
> file** (card, sidebar, header) — màn này làm glass cho khớp.

Rồi áp theo bảng này:

| Tìm thấy | Làm gì |
| --- | --- |
| **Tailwind** (mặc định của skill) | Dùng utility bình thường. Tailwind v4 thì đọc `references/tailwind-v4-traps.md` trước khi đụng `@theme` |
| **Không có Tailwind** | **Theo quy ước của họ** — CSS Module, styled-components, SCSS, gì cũng được. Skill này chi phối *token, nhịp, bố cục, phạm vi*, không chi phối cách bro viết style. Luật trong skill ghi class Tailwind; **màu thì dịch sang biến trong `references/tokens.css`**, đừng tự chọn mã: `text-rose-700` → `var(--danger)`, badge `bg-emerald-50 text-emerald-700` → `--success-bg` / `--success`. Bảng đối chiếu ở `M7`, `M30`; màu avatar ở `components/avatar.md` |
| **shadcn / Radix / MUI / Ant / bộ nội bộ** | **Dùng component của họ.** Viết lại một cái `Button` trong project đã có shadcn là làm hỏng tính nhất quán, không phải làm đẹp thêm |
| **Thư viện chuyên dụng** (biểu đồ, lịch, bảng, danh sách ảo) | **Có thì dùng đúng nó**, chỉnh cho ra hình của skill (tắt thứ nó bật sẵn, màu lấy token). **Chưa có thì không tự cài**: dựng như bình thường theo mẫu trong `references/components/`, và **chỉ đề xuất khi có nhu cầu tự dựng sẽ tốn** (dữ liệu lớn, phóng to, thời gian thực, nhiều loại biểu đồ). Chọn theo tiêu chí: nhẹ, giải quyết đúng nhu cầu, tô được bằng token, còn bảo trì, hợp hệ sinh thái sẵn có. Đề xuất một dòng kèm lý do; cài hay không là người dùng quyết (`N10`). Bảng cấu hình cho biểu đồ ở `components/charts.md` |
| **Chưa có component nào** | Gợi ý code từ `references/components/`. Nói rõ đây là gợi ý để họ đặt vào đâu thì đặt |
| **Không có `package.json`** | HTML/CSS thuần, hoặc WordPress, PHP, Rails, Django. Mẫu trong `references/components/` viết bằng `.tsx` — **dịch sang thẻ HTML + class rồi mới đưa**, đừng dán JSX vào dự án không có React. `references/tokens.css` thì dán thẳng được, nó là CSS thuần |

**Ngôn ngữ của copy cũng tự tìm ở bước này** — grep i18n và nhãn hiện có, luật
`T24`. Chốt trước khi viết cái nhãn đầu tiên, vì đoán sai thì phải sửa lại toàn
bộ nhãn chứ không phải một dòng. Copy không phải tiếng Việt thì mở `T28`, `T29`.

**Có token sẵn thì dùng, không hỏi.** Chỉ khi grep ra rỗng mới lấy
`references/tokens.css` và dựng luôn, kể cả khi khách có thể đã có bộ nhận diện:
màu nhấn và font chỉ nằm ở một chỗ, lúc giao chỉ ra chỗ đó (`S15`) là họ tự thay.
**Không bao giờ hỏi số lượng font.**

**Thanh cuộn thì luôn chép, kể cả dự án có token sẵn.** "Dùng token của họ" chỉ áp
cho màu và font. Khối thanh cuộn trong `tokens.css` (từ `* { --scrollbar-thumb` tới hết
`.scrollbar-clean`) và component `ScrollbarAutohide` (`I18`) là dáng, không phải brand:
grep `::-webkit-scrollbar` trong CSS gốc, chưa có hay đang là bản khác thì chép vào.
Thiếu khối này là trình duyệt vẽ thanh mặc định, to và thô, ở mọi vùng cuộn: trang,
sidebar, bảng cuộn ngang, dropdown. Trang HTML thuần, wireframe cũng chép.

Dùng thư viện của họ thì cách áp skill là **chỉnh token cho khớp**, cộng vài mặc
định trái luật. Với shadcn thường là ba chỗ:

- `Input` mặc định `bg-transparent` → đổi thành nền surface. Ô nhập trong suốt trên nền trang thì người dùng không thấy nó là ô nhập.
- `Button` mặc định có nhiều variant và size → không xoá bớt của thư viện, chỉ **tự giới hạn mình** dùng bốn dạng ở luật `I1`.
- Kiểm bóng: nhiều bộ cho card `shadow-sm` mặc định, mà luật `M15` chỉ cho bóng ở lớp nổi.

### Câu 3 — Muốn UI trông như thế nào?

**Phong cách mặc định là flat**, theo `P1` trong `references/styles.md`:

- **Người dùng tự nêu phong cách** ("kiểu glassmorphism", "gradient kiểu landing SaaS") → làm theo, không hỏi lại. Mở `references/styles.md` lấy khối của phong cách đó.
- **Audit tầng 3 thấy dự án có phong cách khác flat** → **theo phong cách dự án**, dựng luôn. Lúc giao báo một dòng: đã theo phong cách gì, thấy ở đâu, muốn flat thì nói. Mẫu ở `P1`.
- **Còn lại** → flat, không hỏi về phong cách.

Chọn phong cách nào thì mở khối của nó trong `references/styles.md`: khối đó nói
luật gu flat nào được đè, và bẫy riêng của phong cách đó. **Nguyên tắc thì không
phong cách nào đè** (`P2`).

Có ảnh tham chiếu, có mô tả, có sản phẩm muốn giống → **bám theo cái đó**, bỏ
qua phần còn lại của câu này.

**Họ nói "chưa biết", "tuỳ bro", "làm sao đẹp thì làm" → dựng hướng A, báo một
dòng lúc giao** rằng còn hướng B và C, muốn thì nói. Không hỏi trước.

| Hướng | Hình thức | Hợp khi |
| --- | --- | --- |
| **A. Đường tóc phẳng** *(mặc định của skill)* | Nền xám nhạt, card trắng, viền 1px rất nhạt, bo ~12px, **không bóng**. Thứ bậc bằng cỡ chữ và độ đậm | Hầu hết dashboard. Nhiều khối nhỏ cạnh nhau vẫn đọc ra ranh giới. Đây là hướng mọi luật trong skill viết theo |
| **B. Khối chìm** | Không viền. Tách khối bằng **chênh lệch nền + khoảng trắng**, card trắng nổi trên nền xám. Bo góc lớn hơn | Màn ít khối, mỗi khối lớn. Trông thoáng và mềm hơn A. Trả giá: khối nhỏ cạnh nhau thì ranh giới mờ |
| **C. Dày đặc dữ liệu** | Bảng là nhân vật chính. Chữ nhỏ, hàng sát, bo góc nhỏ, đường kẻ rõ, ưu tiên nhìn được nhiều dòng một lúc | Màn hình người ta ngồi cả ngày: bảng vận hành, sổ giao dịch, log. Trả giá: nhìn "dày", không hợp màn tổng quan |

Chọn **B** hoặc **C** thì nói rõ nó **đè lên luật nào**: B đè `M13` (tách bằng
viền) và `M15`; C đè phần nhịp trong `references/budgets.md`. Ghi một dòng lúc
giao, để lượt sau không có ai "sửa lại cho đúng luật".

Chọn xong thì trả lời luôn câu này: **có cần dark mode không.** Mặc định là
không — xem `M20`.

**Đề có form: ô nhập mặc định KHÔNG có icon trái.** Đừng hỏi, cứ dựng không icon
rồi **báo một dòng** lúc giao: *"ô nhập đang để trơn, muốn có icon
trái thì nói."* Họ muốn thì dựng theo `references/components/input.md`, lấy icon
theo `F15`.

Cùng cách làm với bộ mặc định của màn xác thực trong
`references/layouts/form.md`: **mặc định + một dòng báo**, không phải một bảng
câu hỏi.

### Câu 4 — Bố cục: dựng bố cục mặc định, báo một dòng

Người dùng đưa ảnh wireframe thì AI dựng ra đồ tử tế. Người dùng chỉ mô tả bằng
lời thì AI vẽ tùm lum, kể cả khi đã có đủ bảng màu, cỡ chữ, thang khoảng cách.
Lý do: **design system nói màu gì cỡ nào cách nhau bao nhiêu, nó không nói cái gì
nằm ở đâu.** Bố cục mới là thứ quyết định trang đẹp hay xấu, và không luật màu
nào bù được cho một bố cục bịa.

Cách chặn: **mỗi loại màn hình có đúng một bố cục mặc định**, nằm trong file
layout. Không bịa, cũng không bày phương án.

1. **Nhận loại màn hình.** Nói thẳng ra đây là loại gì: màn hình trong app, form, khối nổi, hay bảng giá. Loại màn hình quyết định luôn file layout phải mở.
2. **Mở file layout, lấy bố cục mặc định.** File có ghi điều kiện ("từ 8 trường trở lên thì B") thì theo điều kiện đó, vì nó suy ra từ đề chứ không phải khẩu vị.
3. **Dựng luôn, rồi báo một dòng** lúc giao: đã dựng bố cục nào, muốn kiểu khác thì nói.

> Mình dựng bảng giá ba card ngang, gói Pro nổi bật. Muốn gộp một khối hay đưa
> nút lên trên thì nói.

Skill lo **cái mặc định đơn giản, chuẩn nhất**. Biến thể là việc của người dùng:
họ nói thì sửa theo, không hỏi lại.

Câu 4 chỉ chạy ở lối việc nhỏ hơn một màn (câu 1). Mặc định là nhánh `U`,
nơi bố cục mặc định ở đây là **một trong các phương án wireframe**, thường là phương án khuyên
dùng.

⚠️ **Luật cũ đã bỏ, đừng hồi sinh:** "đưa 2–3 phương án bố cục bằng lời
rồi DỪNG HẲN chờ chọn". Bỏ vì bắt người dùng chọn trước khi thấy gì, và buộc mỗi file layout
nuôi nhiều phương án cho mọi loại màn. Nhánh `U` mặc định (chủ dự án chốt) không
phải luật đó sống lại: người dùng chọn sau khi **đã thấy** wireframe có nội dung thật, đã
probe, bấm mở được; mỗi file layout vẫn chỉ nuôi một bố cục mặc định.

| Loại màn hình | Mở |
| --- | --- |
| Dashboard, các bước bắt đầu (onboarding checklist), danh sách, bảng, danh sách rỗng, cài đặt, hồ sơ cá nhân, bảo mật (xác thực hai lớp, phiên đăng nhập), khoá API, thành viên và phân quyền, trang lịch (lịch tháng), trang lỗi (404, 403, 500, bảo trì), trang báo cáo (doanh thu, phân tích theo khoảng ngày), đầu trang (đường dẫn + tên + nút), trang chi tiết bản ghi | `references/layouts/app.md` |
| Đăng nhập, đăng ký, quên mật khẩu, form nhiều trường, form nhiều bước (thanh các bước), trạng thái lỗi | `references/layouts/form.md` |
| Modal, panel trượt, dropdown, command palette, panel thông báo, toast, **chuyển động mở đóng của mọi khối nổi** (cả select, date picker), **đề yêu cầu animation mà không nói thư viện** (mục "Đề yêu cầu animation mà không nói thư viện") | `references/layouts/overlay.md` |
| Bảng giá, trang chọn gói | `references/layouts/pricing.md` |
| **Nhiều hơn một màn trong cùng một đề** | Vào nhánh `U` như mọi đề dựng; `references/system.md` — hợp đồng nguyên tố chốt ở `U4`, trước màn đầu tiên. Bố cục mặc định chỉ dùng thẳng ở lối dựng luôn hoặc việc nhỏ |

**Có wireframe rồi thì bỏ qua câu 4**, đi thẳng xuống mục 1 và bám ảnh theo luật
`S13`, `S14`, `S15`.

---

## 1. Phạm vi — luật S

Phần này ở lại `SKILL.md` vì nó cần cho **mọi** task. Luật về hình thức nằm trong
`references/`, xem mục 2.

**S1. Không tự đẻ thêm section.** Đề bài có mấy khối thì dựng đúng mấy khối.
Skeleton vẽ ba card thì giao ba card, không tự thêm header, bảng so sánh, câu
hỏi thường gặp, footer.

**S2. Chữ "làm cho hoàn chỉnh" không phải giấy phép thêm nội dung.** Nó chỉ có
nghĩa là dựng xong phần được giao.

**S3. Tiêu đề màn hình không tính là nội dung thêm.** Người dùng liệt kê phần tử
mà quên tiêu đề thì cứ đặt, vì nó là cấu trúc chứ không phải nội dung. Cùng loại:
nhãn ô nhập, chữ trên nút, câu lỗi. Còn lại thì không — không thêm logo, không
thêm câu quảng cáo, không thêm ô "ghi nhớ đăng nhập", không thêm nhà cung cấp
đăng nhập thứ hai.

⚠️ **Màn xác thực có bộ mặc định riêng, xem `references/layouts/form.md`.**
Logo sản phẩm, "Quên mật khẩu", một nút Google và placeholder thì dựng luôn; ghi
nhớ đăng nhập thì không vì cần backend. **Báo một dòng** về những lựa chọn đó lúc
giao — đừng biến nó thành một bảng câu hỏi.

**S4. Không hỏi lại nội dung.** Người dùng đã liệt kê rõ màn hình có những gì
thì giữ nguyên đúng danh sách đó, và bày ra theo phương án wireframe đã chọn (bố cục mặc
định của câu 4 ở việc nhỏ hoặc lối dựng luôn).

Ví dụ: đề ghi "trang đăng nhập có ô email, ô mật khẩu, link quên mật khẩu, nút
đăng nhập, nút đăng nhập bằng Google". Nội dung thế là chốt cứng: brief ở `U1` ghi
đúng năm thứ đó, mọi phương án wireframe đều có đủ năm thứ đó (lối dựng luôn thì dựng
thẳng một cột giữa màn). Đừng hỏi lại có cần nút Google không.

**S5. Đề để hở phạm vi thì dựng phạm vi mặc định, không hỏi.**

- **Đề có liệt kê** ("trang đăng nhập gồm ô email, ô mật khẩu, nút…"): phạm vi đã chốt, dựng luôn.
- **Đề để hở** ("dựng màn hình tổng quan"): lấy **bộ khối mặc định** của loại màn đó trong file layout (màn tổng quan: bảng khối trong `references/layouts/app.md`), dựng **đủ** bộ đó. Đừng để `S1` hoá thành "làm ít nhất có thể" rồi ra một màn mỏng dính 3 khối.
- **Lúc giao, câu đầu tiên** liệt kê các khối đã dựng, và khối nào trong bảng đã bỏ ra. Muốn thêm bớt thì người dùng nói.

**S6. Dựng mockup thì điền dữ liệu giả hợp lý, đừng để chỗ trống.** Một trang đầy
`[cần điền]` không nhìn ra được thiết kế, nó thành cái biểu mẫu. Điền số nghe
được, rồi **báo một dòng lúc giao**: số liệu trong bản này là giả.
**Các khối của cùng một bản ghi phải khớp nhau**: tab Hoạt động có một đơn đã huỷ
thì ô số liệu không ghi 3 đơn, 12,3 tr đ. Số giả lệch nhau giữa hai
tab làm người duyệt tưởng giao diện tính sai. Sửa dữ liệu giả cho khớp (lùi ngày tạo, thêm đơn vào lịch sử)
là việc của bản dựng, tự làm, không hỏi: nó không đụng logic hay dữ liệu thật.

**S7. Chỉ để `[cần điền]`** khi bản dựng đi thẳng ra người dùng thật, và chỉ cho
thứ có hậu quả pháp lý hoặc tài chính: giá bán, mức hoàn tiền, cam kết uptime,
điều khoản.

**S8. Dữ liệu giả phải phủ ca biên, không phải dữ liệu đẹp.** Tên tràn hai dòng,
số chín chữ số, số `0`, thiếu ảnh, thiếu mô tả, danh sách rỗng. Dữ liệu đẹp làm
giao diện trông ổn cho tới lúc gặp khách thật.

**S9. Dùng thư viện component sẵn có của dự án.** Xem câu 2 ở mục 0. Người dùng
nói rõ dùng thư viện nào thì **theo họ, đừng cãi**.

**S10. Gặp từ mơ hồ trong đề thì lấy nghĩa mặc định, và NÓI RA lúc giao.**

| Từ | Nghĩa mặc định | Nghĩa kia, chỉ khi đề nói rõ |
| --- | --- | --- |
| bảng | **table dữ liệu** | board kiểu kanban ("kéo thả", "cột trạng thái", "board") |
| thẻ | **card** | tab |
| danh sách | **list dọc** | dropdown |
| khung | **vùng bố cục** | modal ("bật lên", "popup") |
| trang | **một route** | một tờ trong nhiều bước ("bước 2") |
| lịch | **lịch tháng** | dòng thời gian ("timeline") |

**Câu đầu tiên lúc giao** nói thẳng cách hiểu: *"Mình hiểu **bảng** là table dữ
liệu. Nếu ý bạn là board kanban thì nói, mình đổi."* Hiểu sai thì người dùng thấy
ngay ở câu đầu, không phải tới lúc test mới lộ. Bài học gốc: "bảng quản lý dự án"
từng bị hiểu thành kanban mà không ai nói ra, cả vòng test coi như bỏ.
Lỗi lúc đó là **im lặng chọn nghĩa hiếm**, không phải chuyện không hỏi.

**S11. Code mẫu trong `layouts/` chỉ mở SAU khi đã chốt loại màn hình.** Nó trả
lời câu "dựng thế nào", không trả lời câu "đề bài muốn gì". Có sẵn một file
kanban mẫu thì rất dễ đọc mọi thứ mơ hồ thành kanban.

**S12. Người dùng đưa ảnh thì tự nhận ảnh đó là gì, không hỏi.**

- **Mặc định là design ref**: bám bố cục, bảng màu, kiểu dáng.
- **Là wireframe** khi đề gọi nó là wireframe / phác thảo / khung, hoặc ảnh chỉ có đen trắng xám, khối chữ nhật, chữ giả: chỉ lấy bố cục, màu và kiểu dáng theo skill.
- **Là ảnh hiện trạng** khi đó là ảnh app của chính người dùng mà họ nhờ xem: đề có "xem giúp", "review", "chỗ nào chưa ổn", "sao trông kỳ", "nhìn rối". Ảnh này là **thứ để soi lỗi, không phải mẫu để bám**. Đi nhánh `V` (`references/review.md`). Ảnh khớp một route trong repo mà đề không có từ soi, chỉ bảo dựng hay làm lại, thì đó là **ảnh "trước" của nhánh `U`**: đọc ở `U1`, đặt cạnh ảnh sau lúc giao, không xếp `V`. ⚑
- Lúc giao nói một dòng: *"Mình dùng ảnh làm design ref (bám cả màu)"*, *"…làm wireframe (chỉ lấy bố cục)"*, hoặc *"…là ảnh hiện trạng app của bạn (soi lỗi)"*.

**S13. Bố cục gồm cả vị trí, không chỉ danh sách phần tử.** Badge nằm giữa mép
trên card thì để giữa. Ô icon đứng cạnh giá thì giữ đúng chỗ. Thứ tự các khối giữ
nguyên. Thay màu và kiểu dáng thì được, xê dịch vị trí thì không.

**S14. Icon trong wireframe cứ giữ, kể cả icon trang trí.** Xem luật `F17` về
việc mỗi mục được phép một icon khác nhau.

**S15. Lúc giao phải nói bốn thứ**: **các mặc định đã chọn thay người dùng**
(cách hiểu từ mơ hồ `S10`, bộ khối `S5`, loại ảnh `S12`, phong cách `P1`, bố cục
câu 4; mỗi thứ một dòng, kèm "muốn khác thì nói"), chỗ đổi thương hiệu (dòng nào
chứa màu nhấn, dòng nào chứa font), số liệu nào là giả, và có làm dark mode hay
không. Mặc định đặt **lên đầu**, vì đó là chỗ duy nhất có thể đã đoán sai.
Nói bằng tiếng người dùng đang viết, kể cả khi skill và nhãn trên UI là tiếng
Việt (`T27`).

**S16. Dữ liệu giả có ảnh thì dùng ảnh chụp thật, không khối xám hay hình vẽ** ⚑. Mục mà
sản phẩm thật sẽ có ảnh (phòng, sản phẩm, bài viết, ảnh bìa công ty, avatar người) thì
mockup và wireframe dùng ảnh thật, trang mới trông như sản phẩm đang chạy:

- **Ảnh cảnh, vật**: Unsplash, dạng
  `https://images.unsplash.com/photo-<id>?w=800&q=80&auto=format&fit=crop`, đúng chủ đề của
  mục (phòng trọ là nội thất phòng, tin tuyển dụng là văn phòng). Không tự bịa `<id>`: tìm
  trên Unsplash, rồi `curl -sI` từng link, không ra 200 thì thay. Mỗi mục một ảnh khác nhau.
- **Avatar người**: ảnh chân dung (`https://randomuser.me/api/portraits/women/<0-99>.jpg`,
  `.../men/<0-99>.jpg`), khớp giới của tên giả. Ảnh vẫn theo khuôn của `components/avatar.md`.
- **Logo công ty giả**: ô chữ cái theo `components/avatar.md` (hình vuông bo góc), không lấy
  logo thương hiệu thật gắn cho công ty giả.
- **Vẫn giữ ca biên của `S8`**: ít nhất một mục không ảnh, một người không avatar, để thấy
  chỗ rơi về chữ cái hay khung "Chưa có ảnh".
- Next.js thì thêm hai host vào `images.remotePatterns` trong `next.config`; dự án có ảnh
  riêng (thư mục `public/`, CDN của họ) thì dùng ảnh của họ trước.
- Lúc giao, dòng "số liệu giả" của `S15` nói luôn: ảnh từ Unsplash và randomuser là ảnh
  mẫu, thay bằng ảnh thật trước khi chạy thật.

Tám hình vẽ gần giống nhau cho tám mục thì trang trông "nhìn chán" dù bố cục đã đúng.

---

## 2. Mở doc nào khi nào

`SKILL.md` chỉ giữ phần luôn luôn cần. Mở đúng file cần rồi làm, đừng nạp hết.

**Nguyên tắc một nguồn:** mỗi luật sống ở **đúng một file**. `SKILL.md` chỉ được
trỏ số hiệu, không được chép lại nội dung luật. Thấy hai chỗ cùng nói một luật
thì một trong hai chỗ là sai.

| Nhóm | File | Dùng cho |
| --- | --- | --- |
| **S** | `SKILL.md` mục 1 | Phạm vi: được làm gì, không được tự thêm gì |
| **N** | `references/principles.md` | **Mười hai nguyên tắc đứng sau mọi luật khác**, mỗi cái một phép thử. Chỗ nào không có spec thì bám nó |
| **M** | `references/rules-color.md` | Màu, viền, bóng, dark mode, token |
| **T** | `references/rules-type.md` | Chữ, font, xuống dòng, cắt chữ, copy, ngôn ngữ trả lời và copy tiếng Anh |
| **F** | `references/rules-form.md` | Khối, lưới, bo góc, khoảng thở, icon, hiệu ứng |
| **I** | `references/rules-state.md` | Nút, hover, focus, danh sách, modal |
| **R** | `references/responsive.md` | **Mọi luật về màn hẹp, ngưỡng kiểm 375px** |
| **D** | `references/system.md` | Đề nhiều hơn một màn: hợp đồng nguyên tố; dựng design system trước (`D9`) |
| **V** | `references/review.md` | Soi UI đang có: ba hạng lỗi, quét bề rộng, dark mode của dự án, bảng trước/sau |
| **L** | `references/refactor.md` | Refactor codebase đã có |
| **U** | `references/design-process.md` | Thiết kế từ đầu: brief, việc chính của từng màn, wireframe phương án, dựng |
| **W** | `references/tailwind-v4-traps.md` | Bẫy Tailwind v4 khi có CSS cũ |
| **P** | `references/styles.md` | Phong cách thị giác: flat, nổi, glass, gradient, tối. Luật nào được đè, bẫy riêng, **tương phản** |

**Luôn mở, mọi task:**

| Cần | Mở |
| --- | --- |
| Nguyên tắc chung, phép thử cho UI chưa có mẫu | `references/principles.md` |
| Ngân sách, nhịp, thang cỡ chữ | `references/budgets.md` |
| Bảng màu, font, cách đổi thương hiệu | `references/brand-tokens.md` + `references/tokens.css` |
| Kiểm trước khi báo xong | `references/checklist.md` |
| Luật chủ dự án đã chốt và lý lẽ đã bị bác: mở trước khi chọn màu, mức nặng của nút (đỏ hay trung tính, `primary` hay viền) | `references/locked-rules.md` |

**Mở khi dựng đúng khối đó:**

| Cần dựng | Mở |
| --- | --- |
| Card, widget, panel | `references/components/card.md` |
| Khối nhãn và giá trị của trang chi tiết | `references/components/description-list.md` |
| Nút | `references/components/button.md` |
| Ô nhập, form field | `references/components/input.md` |
| Ô nhập mã OTP | `references/components/otp-input.md` |
| Ô nhập số lượng có nút − + | `references/components/quantity-input.md` |
| Tên sửa tại chỗ ở đầu trang (tên dự án, tài liệu) | `references/components/inline-edit.md` |
| Đường dẫn (breadcrumb) trên thanh header hoặc trên tên trang | `references/components/breadcrumb.md` |
| Tiêu đề cột bảng bấm để sắp xếp | `references/components/sortable-header.md` |
| Checkbox, radio, công tắc, select, ô chọn giờ, ô chọn ngày, khoảng ngày, ngày giờ, lựa chọn dạng card | `references/components/choice-controls.md` |
| Dòng trong danh sách | `references/components/list-row.md` |
| Dòng thời gian, lịch sử hoạt động | `references/components/timeline.md` |
| Cây thư mục, cây lồng nhau mở đóng được | `references/components/tree.md` |
| Accordion, FAQ, mục mở/đóng tại chỗ | `references/components/accordion.md` |
| Khu bình luận, trả lời lồng nhau | `references/components/comment-thread.md` |
| Khung chat với trợ lý AI: tin nhắn hai phía, bước dùng công cụ, gợi ý hỏi tiếp, ô soạn tin | `references/components/chat.md` |
| Thanh trượt chọn khoảng số, khoảng giá | `references/components/range-slider.md` |
| Ô nhập nhiều tag (email người nhận, nhãn) | `references/components/tag-input.md` |
| Danh sách rỗng, lỗi tải | `references/components/empty-state.md` |
| Đang tải: khung chờ, tải lần hai, đổi ngay trên màn, "Đang lưu… / Đã lưu", việc chạy lâu | `references/components/loading.md` |
| Thanh thông báo trong trang (thông tin, cần chú ý, lỗi) | `references/components/banner.md` |
| Chip lọc, chip lọc đang áp dụng (có ×), nút chỉ có icon, thanh tab (4 variant), phân trang | `references/components/small-controls.md` |
| Avatar, nhóm avatar chồng nhau | `references/components/avatar.md` |
| Logo sản phẩm (đầu sidebar, màn xác thực, trang lỗi đứng riêng) và favicon, khi dự án chưa có logo | `references/components/logo.md` |
| Biểu đồ cột, biểu đồ đường, số liệu, thanh tiến độ | `references/components/charts.md` |
| Khung kéo thả tệp, danh sách tệp đang tải lên | `references/components/file-upload.md` |

**Dựng một trang là RÁP, không phải vẽ lại.** Trên trang có phần tử nào nằm
trong bảng trên thì mở đúng file đó và chép công thức, kể cả khi nó chỉ là một
nút nhỏ ở góc. Không tự nặn biến thể "cho hợp trang này": cùng một badge mà bảng
một kiểu, drawer một kiểu là hai app ghép lại (`D1`, `D2`). Trang cần một phần
tử chưa có file thì theo luồng **"Dựng một thứ chưa có mẫu"** ở cuối
`references/principles.md`: mượn khuôn gần nhất, dựng cả ca biên, probe tự sửa, soi
năm câu bằng mắt, lúc giao nói một dòng *"X chưa có mẫu đã duyệt, mình mượn khuôn của Y"*.

**Code mẫu đã duyệt** (chỉ mở sau khi chốt loại màn hình, luật `S11`):
`references/layouts/app-kanban.html`

---

## 3. Sáu thứ không được quên

Rút gọn từ `references/checklist.md`. Chạy hết checklist đầy đủ trước khi báo xong.

- [ ] Câu 1 của mục 0 đã trả lời chưa — **như một designer** (mặc định), **soi UI**, **dựng lại giữ brand**, **dựng lại theo gu skill**, **refactor**, **dựng luôn** hay **dựng design system trước**. Đề không nói rõ lối khác mà đã dựng thẳng, bỏ qua brief và wireframe, là sai câu 1.
- [ ] Đã grep codebase xem họ dùng Tailwind / shadcn / gì chưa, hay đang tự áp bộ của mình lên.
- [ ] Đã dựng đúng **phương án wireframe đã chọn** chưa (nhánh `U`), hay tự bịa. Việc nhỏ hoặc lối dựng luôn thì đúng bố cục mặc định trong file layout, lúc giao báo một dòng "muốn kiểu khác thì nói".
- [ ] Có section nào tự thêm ngoài đề bài không.
- [ ] **Đã mở trang thật bằng `scripts/probe.mjs` và xem ảnh chụp chưa** (cổng 3), hay trả lời checklist bằng đọc lại code. Trang cuộn ngang ở 375px là hỏng.
- [ ] Đã chạy **mười hai phép thử** trong `references/principles.md` chưa, nhất là với thứ chưa có mẫu.

---

## 4. Thêm luật mới thì theo quy tắc này

Skill này đã có lần **tệ đi vì thêm luật**. Luật viết để chữa một triệu chứng
thường đẻ ra triệu chứng khác ở lần dựng sau.

- Mỗi đợt tối đa **5 luật mới**.
- Mỗi luật mới phải nói rõ nó **thay thế** hay **mâu thuẫn** với luật nào đang có. Đảo một luật cũ thì để lại một khối ⚠️ ghi rõ "luật cũ đã bỏ, đừng hồi sinh" và vì sao.
- Luật phải kèm **điều kiện áp dụng**. "Trong app thì X, khi refactor thì Y" chứ không phải "luôn luôn X".
- Luật nào chưa từng bắt được lỗi thật sau 3 vòng test thì bỏ.
- **Một luật một chỗ.** Thêm luật vào đúng file của nhóm nó. `SKILL.md` chỉ được trỏ số hiệu.
- **Thêm luật xong thì rà lại file mẫu trong `layouts/` và `components/`** xem chúng có vi phạm luật vừa thêm không. Code mẫu được chép nguyên, nên một lỗi nằm trong đó sẽ đi khắp nơi. Đã xảy ra thật hai lần.
- **Skill ghi luật và lý do, không ghi lịch sử.** Không ngày tháng, không tên trang hay dự án test, không "lượt hai", không kể các bản đã thử. Bản sai mà AI dễ tự làm lại thì một câu "Đừng X: hậu quả". Ngày và chỗ dính ghi trong commit message. Quyết định của chủ dự án giữ đúng động từ gốc ("chốt", "bỏ", "chọn"…), không kèm ngày, không tự nâng thành "chốt". Ngày tháng duy nhất được ghi trong skill là cột "Chốt ngày" của `locked-rules.md`.
- **Đánh số liền mạch trong nhóm.** Đừng đẻ `15b`, `15c`, `17d` chen vào giữa.
- **Luật chưa qua vòng test nào thì gắn dấu ⚑**, để người dùng biết đang dùng thứ chưa ai thử.
