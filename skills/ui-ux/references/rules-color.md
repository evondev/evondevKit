# Màu — luật M

Đây là **nguồn duy nhất** cho mọi luật về màu, viền và bóng. `SKILL.md` chỉ chép
một dòng tóm tắt kèm số hiệu; giải thích, ngoại lệ và bằng chứng nằm ở đây.

Luật có dấu ⚑ là chưa qua vòng test nào.

---

## Nền và thứ bậc bề mặt

**M1. Nền trang xám nhạt, không trắng tinh. Card mới trắng.**

*Gu flat — phong cách khác đã chọn theo `P1` thì xem `P2` trong `references/styles.md`.*

**M2. 95% trung tính, 5% điểm nhấn.**

*Gu flat — phong cách khác đã chọn theo `P1` thì xem `P2` trong `references/styles.md`.*

Đây là luật quan trọng nhất trong nhóm, và là thứ quyết định một màn hình trông
có chủ ý hay trông như chưa ai quyết định gì.

Bằng chứng thật (focus.camp, 11/09/2026): trang challenge tích dần tới **năm màu
nền** cho năm loại khối — vàng be cho dặn dò, đỏ hồng cho nội quy, xanh nhạt cho
quà và nhật ký, tím indigo cho chip quà, cộng xanh/vàng của trạng thái. Khối nào
cũng đòi được chú ý nên **không khối nào nổi**, và trang đọc ra như "rainbow UI".

Hệ quả ngược cũng đã dính, cùng ngày: gỡ hết màu đi thì thẻ "dặn dò" trắng nằm
giữa các thẻ task trắng, bị đọc lẫn thành một task. Nên trung tính **không phải
là không có điểm neo**:

> Nổi bằng **một điểm màu nhỏ**, không tô cả khối. Giữ thẻ trắng, đặt icon trong
> một **ô vuông nhạt 28px** kèm nhãn cùng màu.

**M3. Đúng một màu nhấn cho cả app.** Nút chính, link, control đang bật (checkbox,
switch, chip lọc đã chọn) dùng chung nó. Mục **điều hướng** đang chọn (sidebar, tab,
trang hiện tại) thì dùng nền xám hoặc vạch `--foreground`, không màu nhấn (bảng
công thức phần tử bên dưới, `small-controls.md`). Màu thứ hai phải xin phép.

---

## Màu nói gì

**M4. Màu để báo trạng thái, không để phân loại.**

Bảng màu của MỘT màn hình, không thêm:

| Màu | Chỉ dùng cho |
| --- | --- |
| Xám trung tính | Mọi thứ còn lại: khung, chữ phụ, badge, icon, viền |
| Màu nhấn | Nút hành động chính khi thật cần nổi, mục đang chọn, link. **Không** cho badge số đếm, **không** cho trạng thái |
| Xanh lá | "Đang ổn", "đã xong": badge, thanh tiến độ xong (`M7`). Cố định, không lấy màu nhấn |
| Hổ phách | "Cần chú ý": quá hạn, nộp trễ, bỏ lỡ |
| Đỏ lỗi — `red` | Lỗi thật mà người dùng phải xử lý: bài bị từ chối, lỗi form |
| Đỏ nguy hiểm — `rose` | Hành động không lấy lại được: xoá, huỷ tài khoản, rời nhóm, và mục đăng xuất trong menu. Nút đứng riêng thì nền mờ + chữ đỏ luôn hiện; mục menu thì chỉ đỏ khi rê vào (`I4`) |

Hai sắc đỏ là cố ý, không phải gõ nhầm — xem `M30`.

Cách áp: định thêm một màu nền cho một loại khối thì **dừng lại và hỏi — màu đó
báo trạng thái gì?** Không trả lời được thì nó là trang trí, dùng xám.

Nội quy không phải lỗi → không đỏ. Quà không phải trạng thái → không màu riêng.

**M5. Phân loại khối bằng icon + chữ + viền, không bằng nền màu.**

Dặn dò, nội quy, quà, nhật ký đều là thẻ trắng viền mảnh; cái gì là gì do **icon
lucide + nhãn** nói. Thứ bậc đến từ cỡ chữ, độ đậm và khoảng cách: chữ chính đen,
chữ phụ xám; giữa các khu vực thoáng, trong từng thẻ gọn.

**M6. Một tín hiệu cho một ý.** Nhãn cộng ô màu đã nói "lưu ý" thì không thêm
badge "Lưu ý" nữa. Cùng tinh thần với `F6`: phần tử nổi bật chỉ cần một dấu hiệu.

**M7. Trạng thái đứng riêng một ô thì là badge màu. Nằm lẫn trong câu thì chữ màu.**

Cột trạng thái trong bảng, góc thẻ kanban, đầu trang chi tiết: **badge pill nền
nhạt, chấm tròn + chữ cùng tông**. Liếc dọc một cột 20 dòng thì mắt bắt màu nhanh
hơn bắt chữ; chấm xám + chữ đen thì cả cột trông như nhau (đã dính 21/09/2026,
bảng khách hàng: "Đang giao dịch" với "Ngừng giao dịch" chỉ khác nhau ở độ mờ
của một chấm 4px).

```html
<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
  <span class="size-1.5 rounded-full bg-current"></span>Đang giao dịch
</span>
```

Bốn tông, không thêm. Trạng thái nào vào tông nào theo **nghĩa**, không theo sở thích:

| Tông | Nền / chữ | Token (không Tailwind) | Nghĩa | Ví dụ |
| --- | --- | --- | --- | --- |
| Xám | `bg-zinc-100 text-zinc-600` | `--neutral-bg` / `--neutral` | Chờ, nháp, chưa bắt đầu, trung lập | Tiềm năng, Nháp, Chờ duyệt |
| Xanh lá | `bg-emerald-50 text-emerald-700` | `--success-bg` / `--success` | Đang ổn, đang chạy, đã xong | Đang giao dịch, Hoạt động, Đã thanh toán, Đã giao |
| Hổ phách | `bg-amber-50 text-amber-700` | `--warning-bg` / `--warning` | Cần chú ý | Quá hạn, Sắp hết hạn, Tạm dừng |
| Đỏ | `bg-red-50 text-red-700` | `--error-bg` / `--error-strong` | Đã dừng, thất bại, bị từ chối | Ngừng giao dịch, Đã huỷ, Lỗi |

**Mọi badge có thêm `ring-1 ring-inset ring-black/5`** (nền tối `ring-white/10`). Nền badge
nhạt tới mức chỉ chênh vài phần trăm với nền dưới nó: `zinc-100` (#f4f4f5) đặt lên dòng
bảng đã chọn hay nền trang (#f4f4f6) là mất hẳn khung, "Tiềm năng" chỉ còn chấm với chữ
(đã dính 23/09/2026). Vòng trong 5% giữ khung ở mọi nền mà không nặng thêm.

**Một luồng có cả bước "đang" lẫn bước "xong" thì xanh dành cho "xong".** Đơn hàng:
Chờ xử lý → **hổ phách** (người bán phải làm gì đó), Đang giao → **xám** (đang chạy nhưng
không ai phải làm gì), Đã giao → **xanh**, Đã huỷ → **đỏ**. Để "Đang giao" cũng xanh thì
hai trạng thái khác nghĩa trùng màu (`N2`). "Đang giao dịch" của khách hàng vẫn xanh vì
luồng đó không có bước "xong".

Nền tối: class Tailwind thì thêm `dark:` (nền `-500/15`, chữ `-400`), token thì
khối `.dark` trong `tokens.css` đã đổi sẵn.

- Xanh lá là màu **cố định**, không lấy màu nhấn. Màu nhấn mặc định gần đen, badge đen đặc giữa bảng trông như nút bấm.
- Chữ `-700`, không `-500`: chữ nhỏ trên nền nhạt cần đậm để đạt tương phản (`P3`).
- Không `border`. Vòng trong `ring-black/5` ở trên là khung giữ badge không tan vào nền, không tính là tín hiệu thứ hai (`M6`).
- Cả app một bảng ánh xạ, xem `D2` trong `system.md`.

Nhãn **nằm trong dòng chữ phụ** ("Hằng tuần · quá hạn 2 ngày") thì vẫn là chữ màu,
không nền. Pill chen giữa câu làm dòng chữ gồ lên.

---

## Ngoại lệ đã duyệt

**M8. Màu mã hoá dữ liệu không tính vào ngân sách một màu nhấn.**

Tag phân loại, nhãn ngành, nhãn mô hình được phép nhiều màu, vì màu ở đó **mang
thông tin**. Bốn điều kiện, thiếu một là bỏ:

- Chỉ cho phân loại thật, thứ mà người ta cần liếc là phân biệt được.
- Luôn **pastel nhạt**: nền khoảng 10%, chữ đậm cùng tông, viền một bậc đậm hơn nền.
- **Một nhãn một màu cố định** trong cả app. "Technology" xanh dương thì ở đâu cũng xanh dương.
- Không lan sang nút, nền khối, hay đường kẻ.

Đặt tên thang màu phân loại **khác tên trạng thái**. focus.camp tách riêng
`iris` / `magenta` / `coral` thay vì dùng lại `accent` / `danger`, để badge đỏ
"B2C" không bị đọc nhầm thành lỗi.

**M9. Biểu tượng quen thuộc được giữ màu của nó, dù đó không phải trạng thái.**

Chủ dự án duyệt 11/09/2026, sau khi trung tính hoá làm mất nghĩa:

- Huy chương top 3 tô đặc vàng / bạc / đồng — màu **trên icon**, không tô thẻ.
- Thẻ hạng nhất viền vàng, **nền vẫn trắng**. Nền vàng nhạt ra màu be, đọc như thẻ cũ hoặc thẻ đã khoá. Đã thử và đã bỏ.
- Ngọn lửa chuỗi ngày tô đặc: ruột vàng, viền cam. Lửa xám nét mảnh chìm hẳn.
- Dấu `*` của trường bắt buộc tô đỏ. Không phải lỗi, nhưng "`*` đỏ = bắt buộc" là quy ước phổ biến tới mức xám lại khó đọc.

Nguyên tắc chung: khi màu trung tính làm **một biểu tượng mất nghĩa**, chọn nghĩa,
nói một câu lý do, rồi ghi ngoại lệ vào đây.

**M10. Nội dung người dùng tự viết thì không kiểm soát màu.** SOP, ghi chú có
emoji, chữ đỏ trong markdown — chỉ làm KHUNG bao quanh trung tính, đừng đi sửa
ruột.

**M11. Chữ chỉ ba sắc độ.** Chữ chính, chữ phụ, và màu nằm trên nền nhấn.

Ngoại lệ duy nhất: **mục điều hướng lúc chưa rê/chưa chọn** dùng
`foreground/70`, để hover có chỗ "sáng lên" mà lúc thường vẫn đọc rõ. Dùng
`--muted` ở đó thì tên mục mờ quá trên nền trắng (21/09/2026).

⚠️ Bẫy đã dính ở focus.camp: token tên `--text-muted` bị alias về `--text-normal`,
tức "chữ phụ" và "chữ chính" cùng một màu đen. Đừng tin tên token — mở giá trị
thật ra xem. Xem `refactor.md` luật L3.

**M12. Không gradient.** Ngoại lệ duy nhất: **ảnh đại diện và dấu hiệu nhận diện**
— avatar người dùng, icon workspace, logo tổ chức. Chúng là hình tròn hoặc vuông
nhỏ dưới 40px, và gradient ở đó đóng vai ảnh chứ không đóng vai nền.

*Gu flat — phong cách khác đã chọn theo `P1` thì xem `P2` trong `references/styles.md`.*

Không bao giờ cho nút, card, nền trang, hay chữ (`bg-clip-text text-transparent`).

---

## Viền và bóng

> **⚠️ Đảo luật.** Bản cũ của skill này cấm viền card và bắt tách khối bằng chênh
> lệch nền. **Luật đó đã bỏ.** focus.camp sống với luật cấm viền 4 tháng rồi bỏ
> nó ngày 08/09/2026, và chốt phong cách "đường tóc 1px + bo góc, không bóng"
> ngày 11/09/2026 sau khi chủ dự án đưa ba ảnh tham chiếu. Đừng hồi sinh luật cũ.

**M13. Tách khối bằng đường tóc 1px + bo góc, không bằng bóng.**

*Gu flat — phong cách khác đã chọn theo `P1` thì xem `P2` trong `references/styles.md`.*

Trang phẳng, sạch; thứ bậc đến từ cỡ chữ, độ đậm và màu chữ.

*Ngoại lệ: card đứng một mình giữa trang trống — xem `M29`.*

| Phần tử | Công thức |
| --- | --- |
| Thẻ / khung | trắng, viền 1px xám rất nhạt, bo ~12px, **không bóng** |
| Danh sách nhiều mục | MỘT khung, các dòng chia bằng `divide-y`. Dòng tiêu đề và dòng hành động cuối nằm TRONG khung |
| Khối tóm tắt phụ | nền xám nhạt + viền, bo như thẻ |
| Mục sidebar đang chọn | nền xám, **không viền**; mục chưa chọn không nền. Sidebar nền trắng: hover và đang chọn cùng nền mờ `--background` |
| Tab ngang trên bảng / danh sách | tab đang chọn **nền `--surface-hover` + viền `--border-strong`** (không nền trắng: trên card trắng nó biến mất), mục chưa chọn `border-transparent`. Xem "Thanh tab" trong `components/small-controls.md` |
| Ô nhập | viền — đây là chỗ viền đúng vai nhất, người ta phải nhìn ra ranh giới vùng gõ được |

**M14. Hai token viền, chia theo vai trò. Không có cái thứ ba.**

| Token | Cho | Vì sao |
| --- | --- | --- |
| `--border` | Viền card, khung dropdown, đường chia trong danh sách và menu | **Trang trí**: chỉ vạch ranh giới, nhạt được bao nhiêu thì nhạt |
| `--border-strong` | **Viền ô nhập**, **viền nút outline**, select, viền card khi hover, **đường kẻ trong khung app** (kẻ dọc sidebar, kẻ chia nhóm, kẻ dưới header, khung profile chân sidebar) | **Chức năng**: ô nhập và nút outline cùng nền trắng với card, viền là thứ duy nhất báo "đây là chỗ gõ", "đây là chỗ bấm" (`I8`) |

Trong mỗi nhóm thì mọi chỗ dùng chung đúng một token, để đường tóc không chỗ
đậm chỗ nhạt. Muốn viền card nhạt đi thì hạ `--border`, ô nhập không nhạt theo.

Checkbox, radio chưa chọn cũng dùng `--border-strong`, cùng độ đậm với ô nhập.

> Ngày 21/09/2026 đã thử làm đậm viền điều khiển cho đạt 3:1 (WCAG 1.4.11): ô nhập,
> select, nút outline lên `#8a8a91`; checkbox, radio lên `--muted`; track công
> tắc lên `muted/75`. Chủ dự án xem thật thấy **đậm và xấu**, trả về hết cùng
> ngày. Đừng đề xuất lại cho dự án thường; chỉ dự án bắt buộc AA (xem `P3`).

⚠️ **Đừng lấy `--border` cho ô nhập hay nút outline để "cho đồng bộ".** Hạ
`--border` cho card và dropdown nhẹ đi là ô nhập và nút tan luôn vào nền. Đã xảy
ra thật (2026-09): `--border` hạ từ `#f3f3f4` xuống `#f7f7f8` cho khung dropdown,
nút outline đang dùng chung token nên trông như đã bị khoá.

⚠️ Thiếu class màu viền thì Tailwind v4 để `border-color: currentColor` — nút chữ
đen sẽ ra **viền gần đen**. Thấy viền đậm bất thường thì kiểm chỗ này trước khi
nghi mã màu.

**M15. Bóng CHỈ cho lớp nổi.**

*Gu flat — phong cách khác đã chọn theo `P1` thì xem `P2` trong `references/styles.md`.*

Modal, command palette, dropdown, popover, toast được đổ bóng vì chúng nằm **trên**
trang. Mọi thứ nằm **trong** trang thì không.

Định thêm `shadow-*` cho khối nằm trong trang → thử viền trước, xem có đủ tách
khối không. Gần như luôn là đủ.

*Ngoại lệ: card đứng một mình giữa trang trống — xem `M29`. Ô đang chọn của tab
`segmented` (phím nổi trên rãnh chìm), dùng đúng hai token `--shadow-segment-*` —
xem "Thanh tab" trong `components/small-controls.md`.*

**M16. Không đẻ token viền mới từ màu nhấn.**

Viền tĩnh chỉ có token viền thường (và tối đa một bậc đậm hơn). Viền trạng thái
chỉ có `--border-focus`, và nó chỉ hiện lúc focus.

Thấy mình sắp viết `--primary-ring`, `--accent-border` là dấu hiệu đang muốn nhấn
một khối bằng viền — mà nhấn bằng viền là cách rẻ nhất. Đã xảy ra thật: một bản
dựng tự chế `--primary-ring: rgba(233,237,245,0.22)` rồi viền card nổi bật, trên
nền tối trông sáng chói.

**M17. `ring` khi không được đụng bố cục, `border` cho phần còn lại.**

`border` ăn vào hộp theo `box-sizing: border-box` nên phần tử cỡ cố định sẽ co
lại. Cần đường bao quanh avatar, quanh ô vuông cỡ chuẩn thì dùng `ring-1`.

**M18. Phần tử con trong hàng có hover không được trùng token với nền hover của hàng.**

Hàng hover đổi nền (luật `I10`: `--background` hoặc `--surface-hover`). Nếu ô vuông trạng thái, checkbox hay
avatar bên trong cũng dùng đúng token đó làm nền, hoặc chỉ có viền nhạt, thì rê
chuột vào là chúng **biến mất**.

*Cách kiểm:* rê chuột lên hàng, đếm xem còn nhìn thấy đủ mọi thứ không.

---

## Bo góc lồng nhau

**M19. Bo lồng nhau: ngoài = trong + khoảng cách giữa hai mép.**

```
R_ngoài = r_trong + d        d = padding của khung ngoài + độ dày viền (nếu có)
```

**Vì sao:** hai góc chỉ trông song song, khe hở đều nhau suốt đường cong, khi
chúng có **chung một tâm**. Công thức trên chính là điều kiện để hai tâm trùng
nhau. Lệch khỏi nó thì khe hở ở góc khác khe hở ở cạnh:

| Bán kính trong | Khe hở ở góc | Trông |
| --- | --- | --- |
| **Bằng** bán kính ngoài (12 trong 12) | **≈ 1.4 × d**, rộng hơn ở cạnh | Góc phình ra, như hai hình không khớp |
| **= R − d** | **= d**, bằng đúng ở cạnh | Song song, gọn |
| Nhỏ hơn nhiều, hoặc vuông | Hẹp hơn d, có thể về 0 | Góc trong bị ép sát, chọc vào đường cong ngoài |

**Các cặp hay dùng, đều nằm trên thang Tailwind:**

| Khung ngoài | Padding | Phần tử trong |
| --- | --- | --- |
| `rounded-xl` 12px | `p-1` 4px | `rounded-lg` 8px |
| `rounded-2xl` 16px | `p-1` 4px | `rounded-xl` 12px |
| `rounded-2xl` 16px | `p-2` 8px | `rounded-lg` 8px |

Cả ba cặp chỉ dùng bậc có trong thang bốn bậc của `F1`. Công thức ra một số
ngoài thang (ví dụ `p-1.5` ra 6px) thì **đổi padding cho khớp thang**, đừng đẻ
thêm bậc bo góc.

**Chỉ áp khi hai mép ở gần nhau** — khi `d` không lớn hơn `R`. Dropdown, menu,
thanh tab dạng viên thuốc, ô nhập có nút bên trong: đều là ca này, và mắt so hai
góc với nhau ngay.

**Khoảng cách lớn thì bỏ công thức.** Card `rounded-2xl` 16px với `p-5` 20px chứa
một nút: công thức ra `16 − 20 = −4`. Hai góc cách nhau quá xa để mắt so, nên dùng
bo theo vai trò (`F1`): card 16px, nút và ô nhập 12px, control nhỏ 8px. Đừng ép
công thức ra số âm hay 0.

Có viền 1px thì `d` cộng thêm 1. Lệch 1px không ai thấy, nên cứ lấy bậc gần nhất
trên thang.

Không trộn nút bo tròn hẳn với nút bo vuông trong cùng một nhóm; badge trạng thái
là ngoại lệ.

---

## Dark mode

**M20. Mặc định chỉ làm light mode.** Dark mode là việc gấp đôi và gấp đôi chỗ
phải kiểm tương phản. Chỉ làm khi người dùng nói cần, và hỏi một câu lúc giao.

*Gu flat — phong cách khác đã chọn theo `P1` thì xem `P2` trong `references/styles.md`.*

**M21. Đảo theme thì giữ nguyên QUAN HỆ giữa các bề mặt, không chỉ đảo màu.**

Thang bề mặt, từ chìm nhất lên nổi nhất:

`nút phụ / vùng chìm` → `nền trang` → `card`

Thứ tự đó phải đúng ở **cả hai theme**. Ở nền sáng nút phụ tối hơn card thì ở nền
tối nó cũng phải tối hơn card, chứ không sáng lên. Đã có bản dựng đặt nút phụ
`#1c2030` trên card `#0f111a`: cùng một nút mà light thì chìm, dark thì nổi, đọc
ra là hai thiết kế khác nhau.

*Cách kiểm:* liệt kê ba màu bề mặt của mỗi theme rồi xếp theo độ sáng. Hai danh
sách phải cùng thứ tự.

**M22. Ở nền tối, màu nhấn chỉ dùng làm nền, không dùng làm đường mảnh.**

Màu nhấn trong dark mode thường là gần trắng. Tô nền nút thì đẹp; đem làm viền ô
nhập lúc focus, gạch chân, hay chỉ báo đang chọn thì thành sợi trắng đặc một
pixel, gắt và rẻ. Đường mảnh dùng chính màu đó **hạ độ đục xuống khoảng 42%**, vừa đủ 3:1 với nền
(WCAG 1.4.11). Xuống 35% là còn 2.9:1, trượt.

**M23. Dark mode là navy rất tối, không phải xám trung tính.** Viền dark mode là
`rgba` mờ, không phải màu đặc. Ở nền tối viền **đảo vai**: nền sáng còn tách được
bằng chênh lệch nền, nền tối thì `#0f111a` với `#05060f` chênh nhau quá ít nên
viền trở thành thứ chính để tách khối, và bóng gần như vô dụng.

*Gu flat — phong cách khác đã chọn theo `P1` thì xem `P2` trong `references/styles.md`.*

---

## Token

**M24. Mọi màu đi qua token đặt tên theo vai trò.** Không rải mã hex trong markup.

**M25. Một khái niệm một token.** Mọi đường kẻ và viền dùng chung một tên. Đừng
chỗ thì `divide-border` chỗ thì `border-muted/25`.

**M26. Mọi màu và font gom vào khối đánh dấu ở đầu file.** Ngoài khối đó không
được xuất hiện mã màu. Có dark mode thì màu nhấn có **hai chỗ**: `:root` và
`.dark`. Thiếu chỗ thứ hai là màu nhấn tàng hình trên nền tối.

**M27. Khối đổi thương hiệu phải chép nguyên văn từ `tokens.css`.** Mở file ra
copy, không gõ lại từ trí nhớ, không tự nghĩ mã hex. Đã có lần AI tự chế ra
`#a99cff` tím và `#fa99cff0d` sai cú pháp. Cần màu khác thì thay đúng một dòng.

**M28. Lúc giao phải chỉ rõ chỗ đổi thương hiệu.** Một dòng: "đổi màu nhấn ở dòng
14, font ở dòng 8". Có dark mode thì nói rõ là hai chỗ.

---

## Card đứng một mình

**M29. Màn chỉ có đúng MỘT card giữa trang trống thì bỏ viền. Chìm quá thì dùng
bóng rất mờ, không phải viền đậm hơn.**

*Gu flat — phong cách khác đã chọn theo `P1` thì xem `P2` trong `references/styles.md`.*

Đăng nhập, đăng ký, quên mật khẩu, màn onboarding một khối, trang 404. Đặc điểm
chung: **không có khối thứ hai nào để mà tách khỏi.**

`M13` bắt viền vì viền là thứ phân định ranh giới giữa các khối nằm cạnh nhau.
Trên màn chỉ có một card, không còn việc đó để làm — đường viền lúc này chỉ là
một nét vẽ quanh hộp, và nó làm card trông như một cái khung chờ nội dung.

Thứ tự thử, dừng ngay khi đủ:

1. **Không viền, không bóng.** Nền trang xám (`--background`) + card trắng (`--surface`) đã đủ chênh để đọc ra ranh giới. Đây là mặc định.
2. **Chìm quá thì thêm bóng rất mờ.** Cỡ `shadow-sm` của Tailwind — mờ đến mức chỉ cảm thấy chứ không nhìn ra. Card lúc này đang **nổi trên** một trang trống, nên nó hợp tinh thần "lớp nổi" của `M15` hơn là khối nằm trong trang.
3. **Không bao giờ dùng cả viền lẫn bóng.** Hai thứ cùng làm một việc. Có bóng rồi mà vẫn thấy cần viền thì bóng đang đặt sai, không phải thiếu viền.

**Đừng chữa cháy bằng viền đậm hơn.** Thấy card chìm mà tăng độ đậm của viền là
đi ngược `M14` — viền đậm lên thì cái hộp hiện ra rõ hơn nội dung bên trong nó.

Có từ hai card trở lên trên màn thì quay về `M13` như thường.

---

## Hai sắc đỏ

**M30. Đỏ có hai sắc cho hai việc. Không dùng lẫn, không thêm sắc thứ ba.**

| | Sắc | Việc | Khi nào hiện | Ở đâu |
| --- | --- | --- | --- | --- |
| **Lỗi** | `red` | *Đã có gì đó sai*, phải sửa mới đi tiếp được | Sau khi người dùng làm sai | Ô nhập, câu lỗi, banner lỗi máy chủ |
| **Nguy hiểm** | `rose` | *Bấm vào thì không lấy lại được* | Nút: luôn hiện, nền mờ. Mục menu: chỉ lúc rê vào (`I4`) | Xoá, huỷ tài khoản, rời nhóm, đăng xuất (mục menu) |

**Vì sao tách.** Hai việc khác nhau về thời điểm và mức nặng:

- **Lỗi** là chuyện **đã xảy ra**. Nó phải nhận ra ngay, không lẫn với gì — nên dùng `red`, sắc đỏ chuẩn mà ai nhìn cũng đọc ra "sai".
- **Nguy hiểm** là **lời nhắc trước khi bấm**, hiện lên chỉ vì chuột đi ngang qua. Chưa có gì sai cả. Nếu nó đỏ y như lỗi thì mỗi lần rê chuột qua menu, người dùng thấy như vừa làm hỏng gì — nên dùng `rose`, ngả hồng hơn, mềm hơn một bậc. Cùng tinh thần `I4`: nút xoá không hét vào mặt người dùng.

**Phép thử khi phân vân:** *người dùng đã làm sai gì chưa?* Rồi → `red`. Chưa,
chỉ đang sắp bấm → `rose`.

### Bậc dùng — đừng tự chế

Mỗi ô ghi class Tailwind, token CSS trong ngoặc. Hai cách ra cùng một màu
(`tokens.css`), dự án không có Tailwind thì dùng token.

| Việc | Lỗi (`red`) | Nguy hiểm (`rose`) |
| --- | --- | --- |
| Chữ, icon | câu lỗi dưới ô: `text-red-600` (`--error-text`) — `red-500` trên nền trắng chỉ 3.8:1, trượt 4.5:1 | `text-rose-700` (`--danger`) (nút luôn hiện, mục menu lúc rê vào) — `rose-500` trên nền mờ chỉ 3.2:1 |
| Viền | `border-red-500` (`--error`) | — *(không có viền đỏ)* |
| Nền mờ | `ring-red-500/10` (`--error-ring`) quanh ô nhập lỗi **đang focus** | nút: `bg-rose-500/10` (`--danger-bg`), rê vào `/15` (`--danger-bg-hover`) · mục menu: `hover:bg-rose-500/10` |
| Banner | `bg-red-50` (`--error-bg`) · `border-red-200` (`--error-border`) · tiêu đề `red-700` (`--error-strong`), mô tả `text-foreground/80` (`components/banner.md`) | — *(không có banner)* |

Ô "—" là **cố ý trống**: hành động nguy hiểm không bao giờ có viền đỏ hay banner
đỏ. Thấy mình định viết `border-rose-*` là đang biến lời nhắc thành cảnh báo.

**Không có sắc thứ ba.** Không `pink`, không `orange-red`, không đỏ tuỳ chế
`#e53e3e` để **báo trạng thái**. Cần một kiểu "nhẹ hơn lỗi nhưng vẫn cần chú ý"
thì đó là **hổ phách** (`M4`), không phải một sắc đỏ mới.

**Phạm vi: `M30` chỉ áp cho màu mang NGHĨA.** Màu nhận diện — nền avatar chữ cái
đầu, icon workspace — không báo gì cả, nên không thuộc luật này. Cùng lý do với
ngoại lệ của `M12`: ở đó màu đóng vai ảnh, không đóng vai trạng thái. Nhưng để
không ai phải phân vân, bộ màu avatar **không dùng `red` hay `rose`** — xem
`references/components/avatar.md`.

### Đổi thương hiệu

Thương hiệu có đỏ riêng thì sửa khối `--danger*` / `--error*` trong `tokens.css`,
và đổi **cả hai nhóm cùng lúc**, giữ khoảng cách giữa chúng: lỗi đậm và chuẩn
hơn, nguy hiểm mềm hơn. Đổi một nhóm mà quên nhóm kia thì hai việc lại trông như
một. Dự án dùng class Tailwind thì phải map lại trong `@theme` hoặc thay class,
sửa token thôi không đổi được `text-rose-700` (xem `tailwind-v4-traps.md`).
Đổi xong đo lại tương phản: chữ trên nền phải từ 4.5:1.
