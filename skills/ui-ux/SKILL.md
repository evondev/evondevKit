---
name: ui-ux
description: Gu UI/UX cho hệ thống dashboard — dashboard, danh sách, bảng, form, cài đặt, modal. Hai nhánh - dựng màn mới, và refactor codebase đã có mà không vỡ giao diện. Bám theo thư viện component và token sẵn có của dự án. Mặc định flat, làm được glassmorphism, gradient, nổi, nền tối khi được chọn. Dùng khi dựng hoặc sửa bất kỳ giao diện app nào, khi refactor CSS, hoặc khi người dùng nhắc "làm UI cho đẹp", "đừng làm kiểu AI", "theo gu của mình", "ui-ux", "evon".
---

# UI/UX cho hệ thống dashboard

> **Chưa đi hết mục 0 thì KHÔNG viết một dòng code nào trong lượt này.**
> Mục 0 là bốn câu, tự trả lời được hết. **Không dừng lại hỏi trước khi dựng.**
> Skill là bộ tiêu chí để làm trước: chỗ nào đề chưa rõ thì lấy mặc định, dựng
> xong rồi **báo lúc giao** mình đã chọn gì. Người dùng muốn khác thì họ nói sau.

Skill này không dạy "thế nào là đẹp" bằng tính từ. Nó làm ba việc: **đi đúng thứ
tự** trước khi dựng, **cấm** những thói quen làm giao diện lộ ngay ra là AI dựng,
và **ràng buộc bằng con số** để phần còn lại tự sạch.

Phạm vi: **màn hình trong app**. Dashboard, danh sách, bảng, form, cài đặt,
modal. Không lo trang bán hàng, trừ bảng giá (`references/layouts/pricing.md`).

Skill lo **giao diện**: bố cục, style, và **mỗi trạng thái trông ra sao** (đang
chọn, khoá, rỗng, đang tải, lỗi, một trang, không dòng nào). **Không tự viết
logic xử lý**: bấm trang thì gọi gì, đổi số dòng thì nhảy về đâu, lưu vào URL
hay không, gọi API nào. Chỗ đó để prop hoặc handler rỗng (`onPageChange`,
`onConfirm`) cho người dùng tự nối. Cần xem nhiều trạng thái thì dựng **mỗi
trạng thái một ví dụ tĩnh** cạnh nhau, không dựng bản bấm được để xem.

---

## 0. Bốn câu hỏi, đúng thứ tự này

### Câu 1 — Đã có UI rồi, hay dựng mới?

Đây là câu **đầu tiên**, trước mọi thứ khác. Hai nhánh này khác nhau về rủi ro,
về thứ tự các bước, và về người phải duyệt.

| Trả lời | Đi đâu |
| --- | --- |
| **Đã có UI, muốn refactor / dọn lại** | Mở `references/refactor.md` và đi theo nhánh `L`. **Dừng mục 0 tại đây** — nhánh đó có bộ mặc định riêng, bắt đầu bằng "đo trước khi kết luận" |
| **Dựng mới** | Đi tiếp câu 2 |

Đề bài không nói rõ thì **nhìn vào thư mục** để tự quyết, không hỏi: có `app/`,
`components/`, có file CSS nào trên 500 dòng không. Có là đang ở nhánh refactor,
dù người dùng gọi nó là "làm lại giao diện".

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
grep -rn "@theme\|--primary\|--brand\|font-family" \
  app/globals.css src/index.css tailwind.config.* 2>/dev/null | head

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
| **Chưa có component nào** | Gợi ý code từ `references/components/`. Nói rõ đây là gợi ý để họ đặt vào đâu thì đặt |
| **Không có `package.json`** | HTML/CSS thuần, hoặc WordPress, PHP, Rails, Django. Mẫu trong `references/components/` viết bằng `.tsx` — **dịch sang thẻ HTML + class rồi mới đưa**, đừng dán JSX vào dự án không có React. `references/tokens.css` thì dán thẳng được, nó là CSS thuần |

**Ngôn ngữ của copy cũng tự tìm ở bước này** — grep i18n và nhãn hiện có, luật
`T24`. Chốt trước khi viết cái nhãn đầu tiên, vì đoán sai thì phải sửa lại toàn
bộ nhãn chứ không phải một dòng.

**Có token sẵn thì dùng, không hỏi.** Chỉ khi grep ra rỗng mới lấy
`references/tokens.css` và dựng luôn, kể cả khi khách có thể đã có bộ nhận diện:
màu nhấn và font chỉ nằm ở một chỗ, lúc giao chỉ ra chỗ đó (`S15`) là họ tự thay.
**Không bao giờ hỏi số lượng font.**

Dùng thư viện của họ thì cách áp skill là **chỉnh token cho khớp**, cộng vài mặc
định trái luật. Với shadcn thường là ba chỗ:

- `Input` mặc định `bg-transparent` → đổi thành nền surface. Ô nhập trong suốt trên nền trang thì người dùng không thấy nó là ô nhập.
- `Button` mặc định có nhiều variant và size → không xoá bớt của thư viện, chỉ **tự giới hạn mình** dùng bốn dạng ở luật `I1`.
- Kiểm bóng: nhiều bộ cho card `shadow-sm` mặc định, mà luật `M15` chỉ cho bóng ở lớp nổi.

### Câu 3 — Muốn UI trông như thế nào?

**Phong cách mặc định là flat**, theo `P1` trong `references/styles.md`:

- **Người dùng tự nêu phong cách** ("kiểu glassmorphism", "gradient như Stripe") → làm theo, không hỏi lại. Mở `references/styles.md` lấy khối của phong cách đó.
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

⚠️ **Luật cũ đã bỏ (21/09/2026), đừng hồi sinh:** "đưa 2–3 phương án bố cục
rồi DỪNG HẲN chờ chọn". Bỏ vì bắt người dùng chọn trước khi thấy gì, và buộc mỗi
file layout phải nuôi nhiều phương án cho mọi loại màn. Bố cục mặc định cố định
chặn được đúng lỗi bố cục bịa mà luật cũ nhắm tới.

| Loại màn hình | Mở |
| --- | --- |
| Dashboard, danh sách, bảng, danh sách rỗng, cài đặt, đầu trang (đường dẫn + tên + nút) | `references/layouts/app.md` |
| Đăng nhập, đăng ký, form nhiều trường, trạng thái lỗi | `references/layouts/form.md` |
| Modal, panel trượt, dropdown, toast | `references/layouts/overlay.md` |
| Bảng giá, trang chọn gói | `references/layouts/pricing.md` |
| **Nhiều hơn một màn trong cùng một đề** | `references/system.md` — chốt hợp đồng nguyên tố trước, rồi dựng cả bộ theo bố cục mặc định |

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
"Quên mật khẩu" thì dựng luôn; ghi nhớ đăng nhập và đăng nhập mạng xã hội thì
không, vì cả hai cần backend. **Báo một dòng** về những lựa chọn đó lúc giao — đừng
biến nó thành một bảng câu hỏi.

**S4. Không hỏi lại nội dung.** Người dùng đã liệt kê rõ màn hình có những gì
thì giữ nguyên đúng danh sách đó, và bày ra theo bố cục mặc định (câu 4).

Ví dụ: đề ghi "trang đăng nhập có ô email, ô mật khẩu, link quên mật khẩu, nút
đăng nhập, nút đăng nhập bằng Google". Nội dung thế là chốt cứng, dựng luôn
một cột giữa màn. Đừng hỏi lại có cần nút Google không.

**S5. Đề để hở phạm vi thì dựng phạm vi mặc định, không hỏi.**

- **Đề có liệt kê** ("trang đăng nhập gồm ô email, ô mật khẩu, nút…"): phạm vi đã chốt, dựng luôn.
- **Đề để hở** ("dựng màn hình tổng quan"): lấy **bộ khối mặc định** của loại màn đó trong file layout (màn tổng quan: bảng khối trong `references/layouts/app.md`), dựng **đủ** bộ đó. Đừng để `S1` hoá thành "làm ít nhất có thể" rồi ra một màn mỏng dính 3 khối (đã dính ở vòng test 11).
- **Lúc giao, câu đầu tiên** liệt kê các khối đã dựng, và khối nào trong bảng đã bỏ ra. Muốn thêm bớt thì người dùng nói.

**S6. Dựng mockup thì điền dữ liệu giả hợp lý, đừng để chỗ trống.** Một trang đầy
`[cần điền]` không nhìn ra được thiết kế, nó thành cái biểu mẫu. Điền số nghe
được, rồi **báo một dòng lúc giao**: số liệu trong bản này là giả.

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
từng bị hiểu thành kanban mà không ai nói ra, cả vòng test coi như bỏ (vòng 18).
Lỗi lúc đó là **im lặng chọn nghĩa hiếm**, không phải chuyện không hỏi.

**S11. Code mẫu trong `layouts/` chỉ mở SAU khi đã chốt loại màn hình.** Nó trả
lời câu "dựng thế nào", không trả lời câu "đề bài muốn gì". Có sẵn một file
kanban mẫu thì rất dễ đọc mọi thứ mơ hồ thành kanban.

**S12. Người dùng đưa ảnh thì tự nhận ảnh đó là gì, không hỏi.**

- **Mặc định là design ref**: bám bố cục, bảng màu, kiểu dáng.
- **Là wireframe** khi đề gọi nó là wireframe / phác thảo / khung, hoặc ảnh chỉ có đen trắng xám, khối chữ nhật, chữ giả: chỉ lấy bố cục, màu và kiểu dáng theo skill.
- Lúc giao nói một dòng: *"Mình dùng ảnh làm design ref (bám cả màu)"*, hoặc *"…làm wireframe (chỉ lấy bố cục)"*.

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

---

## 2. Mở doc nào khi nào

`SKILL.md` chỉ giữ phần luôn luôn cần. Mở đúng file cần rồi làm, đừng nạp hết.

**Nguyên tắc một nguồn:** mỗi luật sống ở **đúng một file**. `SKILL.md` chỉ được
trỏ số hiệu, không được chép lại nội dung luật. Thấy hai chỗ cùng nói một luật
thì một trong hai chỗ là sai.

| Nhóm | File | Dùng cho |
| --- | --- | --- |
| **S** | `SKILL.md` mục 1 | Phạm vi: được làm gì, không được tự thêm gì |
| **M** | `references/rules-color.md` | Màu, viền, bóng, dark mode, token |
| **T** | `references/rules-type.md` | Chữ, font, xuống dòng, cắt chữ, copy |
| **F** | `references/rules-form.md` | Khối, lưới, bo góc, khoảng thở, icon, hiệu ứng |
| **I** | `references/rules-state.md` | Nút, hover, focus, danh sách, modal |
| **R** | `references/responsive.md` | **Mọi luật về màn hẹp, ngưỡng kiểm 375px** |
| **D** | `references/system.md` | Đề nhiều hơn một màn: hợp đồng nguyên tố |
| **L** | `references/refactor.md` | Refactor codebase đã có |
| **W** | `references/tailwind-v4-traps.md` | Bẫy Tailwind v4 khi có CSS cũ |
| **P** | `references/styles.md` | Phong cách thị giác: flat, nổi, glass, gradient, tối. Luật nào được đè, bẫy riêng, **tương phản** |

**Luôn mở, mọi task:**

| Cần | Mở |
| --- | --- |
| Ngân sách, nhịp, thang cỡ chữ | `references/budgets.md` |
| Bảng màu, font, cách đổi thương hiệu | `references/brand-tokens.md` + `references/tokens.css` |
| Kiểm trước khi báo xong | `references/checklist.md` |

**Mở khi dựng đúng khối đó:**

| Cần dựng | Mở |
| --- | --- |
| Card, widget, panel | `references/components/card.md` |
| Nút | `references/components/button.md` |
| Ô nhập, form field | `references/components/input.md` |
| Checkbox, radio, công tắc, select, ô chọn giờ, ô chọn ngày, lựa chọn dạng card | `references/components/choice-controls.md` |
| Dòng trong danh sách | `references/components/list-row.md` |
| Danh sách rỗng, đang tải (chữ hoặc khung chờ), lỗi tải | `references/components/empty-state.md` |
| Chip lọc, nút chỉ có icon, thanh tab (4 variant), phân trang | `references/components/small-controls.md` |
| Avatar, nhóm avatar chồng nhau | `references/components/avatar.md` |
| Biểu đồ, số liệu, thanh tiến độ | `references/components/charts.md` |

**Dựng một trang là RÁP, không phải vẽ lại.** Trên trang có phần tử nào nằm
trong bảng trên thì mở đúng file đó và chép công thức, kể cả khi nó chỉ là một
nút nhỏ ở góc. Không tự nặn biến thể "cho hợp trang này": cùng một badge mà bảng
một kiểu, drawer một kiểu là hai app ghép lại (`D1`, `D2`). Trang cần một phần
tử chưa có file thì dựng theo luật chung, lúc giao nói một dòng *"X chưa có mẫu
đã duyệt"*.

**Code mẫu đã duyệt** (chỉ mở sau khi chốt loại màn hình, luật `S11`):
`references/layouts/app-kanban.html`

---

## 3. Năm thứ không được quên

Rút gọn từ `references/checklist.md`. Chạy hết checklist đầy đủ trước khi báo xong.

- [ ] Câu 1 của mục 0 đã trả lời chưa — đây là **refactor** hay **dựng mới**.
- [ ] Đã grep codebase xem họ dùng Tailwind / shadcn / gì chưa, hay đang tự áp bộ của mình lên.
- [ ] Đã dựng đúng **bố cục mặc định** trong file layout chưa, hay tự bịa. Lúc giao đã báo một dòng "muốn kiểu khác thì nói" chưa.
- [ ] Có section nào tự thêm ngoài đề bài không.
- [ ] **Kiểm ở 375px. Trang cuộn ngang là hỏng.** Cuộn hết sang phải, phần tử cuối phải còn lề.

---

## 4. Thêm luật mới thì theo quy tắc này

Skill này đã có lần **tệ đi vì thêm luật**. Luật viết để chữa một triệu chứng
thường đẻ ra triệu chứng khác ở lần dựng sau.

- Mỗi đợt tối đa **5 luật mới**.
- Mỗi luật mới phải nói rõ nó **thay thế** hay **mâu thuẫn** với luật nào đang có. Đảo một luật cũ thì để lại một khối ⚠️ ghi rõ "luật cũ đã bỏ, đừng hồi sinh", kèm ngày.
- Luật phải kèm **điều kiện áp dụng**. "Trong app thì X, khi refactor thì Y" chứ không phải "luôn luôn X".
- Luật nào chưa từng bắt được lỗi thật sau 3 vòng test thì bỏ.
- **Một luật một chỗ.** Thêm luật vào đúng file của nhóm nó. `SKILL.md` chỉ được trỏ số hiệu.
- **Thêm luật xong thì rà lại file mẫu trong `layouts/` và `components/`** xem chúng có vi phạm luật vừa thêm không. Code mẫu được chép nguyên, nên một lỗi nằm trong đó sẽ đi khắp nơi. Đã xảy ra thật hai lần.
- **Đánh số liền mạch trong nhóm.** Đừng đẻ `15b`, `15c`, `17d` chen vào giữa.
- **Luật chưa qua vòng test nào thì gắn dấu ⚑**, để người dùng biết đang dùng thứ chưa ai thử.
