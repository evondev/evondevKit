---
name: ui-ux
description: Gu UI/UX cho hệ thống dashboard — dashboard, danh sách, bảng, form, cài đặt, modal. Hai nhánh - dựng màn mới, và refactor codebase đã có mà không vỡ giao diện. Bám theo thư viện component và token sẵn có của dự án. Dùng khi dựng hoặc sửa bất kỳ giao diện app nào, khi refactor CSS, hoặc khi người dùng nhắc "làm UI cho đẹp", "đừng làm kiểu AI", "theo gu của mình", "ui-ux", "evon".
---

# UI/UX cho hệ thống dashboard

> **Chưa đi hết mục 0 thì KHÔNG viết một dòng code nào trong lượt này.**
> Mục 0 là bốn câu hỏi. Ba câu đầu tự trả lời được; câu cuối phải chờ người dùng.

Skill này không dạy "thế nào là đẹp" bằng tính từ. Nó làm ba việc: **hỏi đúng thứ
tự** trước khi dựng, **cấm** những thói quen làm giao diện lộ ngay ra là AI dựng,
và **ràng buộc bằng con số** để phần còn lại tự sạch.

Phạm vi: **màn hình trong app**. Dashboard, danh sách, bảng, form, cài đặt,
modal. Không lo trang bán hàng.

---

## 0. Bốn câu hỏi, đúng thứ tự này

### Câu 1 — Đã có UI rồi, hay dựng mới?

Đây là câu **đầu tiên**, trước mọi thứ khác. Hai nhánh này khác nhau về rủi ro,
về thứ tự các bước, và về người phải duyệt.

| Trả lời | Đi đâu |
| --- | --- |
| **Đã có UI, muốn refactor / dọn lại** | Mở `references/refactor.md` và đi theo nhánh `L`. **Dừng mục 0 tại đây** — nhánh đó có bộ câu hỏi riêng, bắt đầu bằng "đo trước khi kết luận" |
| **Dựng mới** | Đi tiếp câu 2 |

Đề bài không nói rõ thì **nhìn vào thư mục** trước khi hỏi: có `app/`,
`components/`, có file CSS nào trên 500 dòng không. Có là đang ở nhánh refactor,
dù người dùng gọi nó là "làm lại giao diện".

### Câu 2 — Dự án đang dùng gì? (TỰ TÌM, ĐỪNG HỎI)

Skill này **bám theo codebase**, không áp bộ công cụ của mình lên dự án người ta.
Grep trước, rồi mới quyết:

```bash
cat package.json 2>/dev/null | grep -E '"(tailwindcss|@radix-ui|@mui|antd|@chakra|bootstrap)"'
ls components/ui src/components/ui 2>/dev/null          # dấu hiệu shadcn
grep -rn "@theme\|--primary\|--brand\|font-family" \
  app/globals.css src/index.css tailwind.config.* 2>/dev/null | head
```

Rồi áp theo bảng này:

| Tìm thấy | Làm gì |
| --- | --- |
| **Tailwind** (mặc định của skill) | Dùng utility bình thường. Tailwind v4 thì đọc `references/tailwind-v4-traps.md` trước khi đụng `@theme` |
| **Không có Tailwind** | **Theo quy ước của họ** — CSS Module, styled-components, SCSS, gì cũng được. Skill này chi phối *token, nhịp, bố cục, phạm vi*, không chi phối cách bro viết style |
| **shadcn / Radix / MUI / Ant / bộ nội bộ** | **Dùng component của họ.** Viết lại một cái `Button` trong project đã có shadcn là làm hỏng tính nhất quán, không phải làm đẹp thêm |
| **Chưa có component nào** | Gợi ý code từ `references/components/`. Nói rõ đây là gợi ý để họ đặt vào đâu thì đặt |

**Có token sẵn thì dùng, không hỏi.** Chỉ khi grep ra rỗng mới lấy
`references/tokens.css` và dựng luôn. Chỉ hỏi trước khi biết chắc đang làm cho
khách đã có bộ nhận diện. **Không bao giờ hỏi số lượng font.**

Dùng thư viện của họ thì cách áp skill là **chỉnh token cho khớp**, cộng vài mặc
định trái luật. Với shadcn thường là ba chỗ:

- `Input` mặc định `bg-transparent` → đổi thành nền surface. Ô nhập trong suốt trên nền trang thì người dùng không thấy nó là ô nhập.
- `Button` mặc định có nhiều variant và size → không xoá bớt của thư viện, chỉ **tự giới hạn mình** dùng ba dạng ở luật `I1`.
- Kiểm bóng: nhiều bộ cho card `shadow-sm` mặc định, mà luật `M15` chỉ cho bóng ở lớp nổi.

### Câu 3 — Muốn UI trông như thế nào?

Có ảnh tham chiếu, có mô tả, có sản phẩm muốn giống → **bám theo cái đó**, bỏ
qua phần còn lại của câu này.

**Họ nói "chưa biết", "tuỳ bro", "làm sao đẹp thì làm" → đưa ba hướng ra, mỗi
hướng một câu nói nó hợp khi nào, rồi CHỜ.** Đừng tự chọn.

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

### Câu 4 — Bố cục: đưa 2–3 phương án rồi DỪNG HẲN

Đây là bước quan trọng nhất trong cả skill, và là bước hay bị bỏ qua nhất.

Người dùng đưa ảnh wireframe thì AI dựng ra đồ tử tế. Người dùng chỉ mô tả bằng
lời thì AI vẽ tùm lum, kể cả khi đã có đủ bảng màu, cỡ chữ, thang khoảng cách.
Lý do: **design system nói màu gì cỡ nào cách nhau bao nhiêu, nó không nói cái gì
nằm ở đâu.** Bố cục mới là thứ quyết định trang đẹp hay xấu, và không luật màu
nào bù được cho một bố cục bịa.

1. **Nhận loại màn hình.** Nói thẳng ra đây là loại gì: màn hình trong app, form, hay khối nổi. Loại màn hình quyết định luôn file mẫu phải mở.
2. **Mở file layout tương ứng**, lấy ra 2–3 phương án, vẽ khung bằng **ASCII**, mỗi phương án một câu nói nó hợp khi nào. Nói rõ mình nghiêng về cái nào và vì sao.
3. **Kết thúc lượt ngay tại đó.** Không viết HTML, không tạo file, không "mình chọn A rồi dựng luôn cho nhanh". Có công cụ hỏi người dùng thì dùng nó. Người dùng chưa gõ tên phương án ra thì coi như chưa chọn.

Tự chọn hộ rồi dựng tiếp là **vi phạm nặng nhất** của skill này. Nó biến một câu
hỏi rẻ thành một lượt dựng sai phải làm lại.

| Loại màn hình | Mở |
| --- | --- |
| Dashboard, danh sách, bảng, danh sách rỗng, cài đặt | `references/layouts/app.md` |
| Đăng nhập, đăng ký, form nhiều trường, trạng thái lỗi | `references/layouts/form.md` |
| Modal, panel trượt, dropdown, toast | `references/layouts/overlay.md` |
| **Nhiều hơn một màn trong cùng một đề** | `references/system.md` — hỏi bố cục MỘT lượt cho cả bộ, và chốt hợp đồng nguyên tố trước |

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

**S4. Chỉ hỏi về bố cục, không hỏi lại nội dung.** Người dùng đã liệt kê rõ màn
hình có những gì thì giữ nguyên đúng danh sách đó. Câu hỏi duy nhất được phép đặt
là **bày những thứ đó ra sao**.

Ví dụ: đề ghi "trang đăng nhập có ô email, ô mật khẩu, link quên mật khẩu, nút
đăng nhập, nút đăng nhập bằng Google". Nội dung thế là chốt cứng. Việc còn lại
chỉ là chọn giữa một cột giữa màn hay hai cột có ảnh bên phải. Đừng hỏi lại có
cần nút Google không.

**S5. Đề để hở thì hỏi phạm vi TRƯỚC, bố cục sau.**

- **Đề có liệt kê** ("trang đăng nhập gồm ô email, ô mật khẩu, nút…"): phạm vi đã chốt, chỉ hỏi bố cục.
- **Đề để hở** ("dựng màn hình tổng quan"): chưa có danh sách nào để bám. Luật `S1` lúc này dễ hoá thành "làm ít nhất có thể", ra một màn mỏng dính. Phải hỏi thêm: **màn này gồm những khối nào**, đưa 2–3 phương án phạm vi, rồi mới tới câu hỏi bố cục. Gộp hai câu vào cùng một lượt, đừng bắt người ta trả lời hai lần.

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

**S10. Gặp từ mơ hồ trong đề thì hỏi trước, hỏi trước cả câu hỏi bố cục.**

| Từ | Hai cách hiểu |
| --- | --- |
| bảng | table dữ liệu, hay board kiểu kanban |
| thẻ | card, hay tab |
| danh sách | list dọc, hay dropdown |
| khung | vùng bố cục, hay modal |
| trang | một route, hay một tờ trong nhiều bước |
| lịch | lịch tháng, hay dòng thời gian |

Hỏi một câu là xong. Đoán sai là dựng lại cả màn hình, và tệ hơn là người dùng
tưởng đã test xong một thứ mà thật ra chưa. Chuyện này đã xảy ra thật: "bảng
quản lý dự án" bị hiểu thành kanban board, cả vòng test coi như bỏ.

**S11. Code mẫu trong `layouts/` chỉ mở SAU khi đã chốt loại màn hình.** Nó trả
lời câu "dựng thế nào", không trả lời câu "đề bài muốn gì". Có sẵn một file
kanban mẫu thì rất dễ đọc mọi thứ mơ hồ thành kanban.

**S12. Người dùng đưa ảnh thì hỏi ảnh đó là gì.** Wireframe thì chỉ lấy bố cục,
thay sạch màu và kiểu dáng. Design ref thì bám cả bảng màu. Đoán sai là dựng lại
từ đầu.

**S13. Bố cục gồm cả vị trí, không chỉ danh sách phần tử.** Badge nằm giữa mép
trên card thì để giữa. Ô icon đứng cạnh giá thì giữ đúng chỗ. Thứ tự các khối giữ
nguyên. Thay màu và kiểu dáng thì được, xê dịch vị trí thì không.

**S14. Icon trong wireframe cứ giữ, kể cả icon trang trí.** Xem luật `F17` về
việc mỗi mục được phép một icon khác nhau.

**S15. Lúc giao phải nói ba thứ**: chỗ đổi thương hiệu (dòng nào chứa màu nhấn,
dòng nào chứa font), số liệu nào là giả, và có làm dark mode hay không.

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
| Dòng trong danh sách | `references/components/list-row.md` |
| Danh sách rỗng, đang tải | `references/components/empty-state.md` |
| Chip lọc, nút chỉ có icon | `references/components/small-controls.md` |
| Biểu đồ, số liệu, thanh tiến độ | `references/components/charts.md` |

**Code mẫu đã duyệt** (chỉ mở sau khi chốt loại màn hình, luật `S11`):
`references/layouts/app-kanban.html`

---

## 3. Năm thứ không được quên

Rút gọn từ `references/checklist.md`. Chạy hết checklist đầy đủ trước khi báo xong.

- [ ] Câu 1 của mục 0 đã trả lời chưa — đây là **refactor** hay **dựng mới**.
- [ ] Đã grep codebase xem họ dùng Tailwind / shadcn / gì chưa, hay đang tự áp bộ của mình lên.
- [ ] Chưa có skeleton mà đã đưa bố cục rồi **chờ** người dùng chọn chưa.
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
