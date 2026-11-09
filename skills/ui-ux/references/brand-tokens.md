# Token và thương hiệu

Chép `references/tokens.css` vào `globals.css` hoặc `index.css`, rồi chỉ sửa
trong các khối có comment đánh dấu:

- **Font**: một khối ở `:root`, dùng chung cho cả sáng lẫn tối.
- **Màu nhấn**: một khối ở `:root` cho nền sáng, và nếu có dark mode thì **một khối nữa ở `.dark`** cho nền tối. Phải sửa cả hai.
- Không làm dark mode thì xoá hẳn khối `.dark` đi, đừng để đó cho rối.
- Khối `@theme inline` map token sang class của Tailwind v4 (`bg-surface`, `text-muted`, `border-border-strong`, `ring-focus`…) và `--font-sans`. Chép luôn, không có nó thì các class đó không sinh ra; không dùng Tailwind thì xoá.

Màu gần đen thì bản cho nền tối là gần trắng. Màu có sắc thì lấy bản sáng hơn
chính nó khoảng hai bậc, đừng dùng nguyên màu của nền sáng.

Màu nhấn mặc định là `#181818`, gần đen. Cố ý chọn trung tính vì skill này dựng
UI cho nhiều người khác nhau, đóng sẵn màu của một thương hiệu vào là đóng nhầm.
Gần đen không bao giờ chửi nhau với brand nào, và trông cố ý chứ không trông như
chưa chọn xong.

Font: **Inter** cho toàn bộ, cả heading lẫn body. Một font, phân vai
bằng weight: heading `600`, body `400`, nhãn phụ `500` (`T2`). `tracking-tight` cho chữ có dấu chỉ từ `text-3xl` trở lên (`T2`).

Một font là lựa chọn cố ý, không phải cắt gọt cho nhanh. Ghép hai font mà chọn
sai cặp thì tệ hơn hẳn dùng một font tử tế, và phần lớn cặp đều sai. Bỏ font đi
rồi rơi về `system-ui` thì vẫn là hỏng, nên font luôn phải được nạp thật.

App có copy tiếng Việt thì trước khi chốt bất kỳ font thay thế nào, **kiểm tra
dấu tiếng Việt trước mọi tiêu chí khác** (`T5`, `T28`): rất nhiều font đẹp bị gãy ở "ữ", "ợ", "ằ" hoặc dấu chồng lên
nhau. Inter có bộ tiếng Việt đầy đủ.

Cách nạp thì tuỳ bối cảnh:

- **Project thật**: self-host qua `@fontsource`, không gọi ra Google Fonts.
- **File HTML đơn lẻ, prototype, bản demo để chấm**: `@import` thẳng Google Fonts. Dòng dùng luôn:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

`700` chỉ cho tiêu đề cấp trang và giá của trang trình diễn (`T2`); con số trong card số liệu là
`font-semibold`. Không nạp `800`: không luật nào dùng.

---

---

## Màu nhấn gợi ý theo ngành, khi dự án chưa có brand ⚑

Nhóm Nhấn của wireframe (`wireframe.md`, `U3`) và trang design system (`system.md`) gợi ý
ba màu. Trước đây ba màu cố định cho mọi dự án, nên ba dự án khác ngành ra cùng một bảng màu.
Giờ ba màu chọn theo ngành ở `U1`: **màu đầu là quy ước của ngành**, hai màu sau khác hướng để
người dùng có lựa chọn không sáo. Không chọn thì dựng màu đầu, báo một dòng. Dự án có brand
thì brand thắng, không gợi ý. **Dự án đã có UI là đã có brand**, kể cả màu nhấn gần đen: giữ màu
của dự án (chủ dự án chốt, `wireframe.md`).

**Bảng màu, chỉ lấy từ đây** (đều đạt từ 5 : 1 với chữ trắng trên nút chính, `P3`):

| Tên | `--primary` | Hướng màu | Chữ trắng |
| --- | --- | --- | --- |
| Xanh dương | `#2563eb` | 221° | 5.17 |
| Chàm | `#4f46e5` | 243° | 6.29 |
| Tím | `#7c3aed` | 262° | 5.70 |
| Hồng tím | `#a21caf` | 295° | 6.32 |
| Xanh ngọc | `#0f766e` | 175° | 5.47 |
| Xanh lá | `#15803d` | 142° | 5.02 |
| Cam | `#c2410c` | 17° | 5.18 |

`--primary-hover`, `--primary-light` và bản nền tối suy từ `--primary` như các mục bên dưới.

**Ngành → ba màu gợi ý.** Cột giữa là số đo thật: màu chính trên trang chủ (trang chặn đọc thì icon app) của
khoảng 95 sản phẩm, 14 ngành, đo 03/11/2026 (hai ngành cuối 07/11/2026), chỉ đếm những trang đọc ra màu. Đừng sửa bảng theo trí nhớ
hay theo sáo ("spa thì hồng"); muốn sửa thì đo lại.

| Ngành ở `U1` | Đo được | Ba màu, màu đầu mặc định |
| --- | --- | --- |
| Tài chính, kế toán, ngân hàng | xanh dương, chàm 5/8; cam, xanh lá lẻ | Xanh dương · Xanh lá · Cam |
| Y tế, phòng khám, nha khoa | xanh dương 2, xanh ngọc 1, vàng 1 trên 4 | Xanh ngọc · Xanh dương · Tím |
| Đồ ăn, nhà hàng, giao đồ ăn; đồ uống, cà phê, trà sữa (gộp vào đây, chưa đo riêng) | đỏ, đỏ cam 3/3 | Cam · Xanh lá · Chàm |
| Spa, làm đẹp, đặt lịch | tím 1, cam 2, vàng 1 trên 4: **không có quy ước rõ** | Tím · Cam · Xanh ngọc |
| Bán lẻ, cửa hàng, bán hàng tại quầy | xanh dương 4, xanh lá 2 trên 6 | Xanh dương · Xanh lá · Cam |
| Giáo dục, khoá học | xanh dương 3, tím vàng 1 trên 4 | Xanh dương · Tím · Cam |
| Bất động sản, cho thuê | xanh dương, xanh than 3, xanh ngọc 1 trên 4 | Xanh dương · Xanh ngọc · Cam |
| Vận tải, kho, giao hàng (phần mềm cho công ty: điều phối, kho) | xanh dương 3, hổ phách 1, xanh lá 1 trên 5 | Xanh dương · Cam · Xanh ngọc |
| Gọi xe, giao hàng, giao đồ ăn cho người dùng cuối ⚑ | xanh lá 3, vàng, xanh ngọc, đen, hồng, cam, xanh chanh mỗi màu 1 trên 9 (đếm theo màu nhận diện của app, 08/11/2026, chưa đo trang) | Xanh lá · Cam · Xanh ngọc |
| Nhân sự, chấm công | tím 2, xanh dương 1 trên 3 | Tím · Xanh dương · Xanh ngọc |
| CRM, bán hàng B2B | cam, xanh dương, xanh lá, tím rải đều: **không có quy ước** | Chàm · Cam · Xanh ngọc |
| Du lịch, khách sạn, homestay | hồng đỏ, cam, đỏ tím, xanh dương trên 4 | Cam · Hồng tím · Xanh dương |
| Sức khoẻ cá nhân, thói quen, thể dục, ăn uống lành mạnh | cam 4, xanh dương 3, xanh ngọc 2, xanh lá 2, hồng đỏ 2, đen 2, tím 1, chàm 1 trên 17: **không có quy ước rõ** | Tím · Cam · Xanh lá |
| Thiền, ngủ, sách nói, podcast | cam 3, xanh ngọc 3, xanh dương 2, xanh lá 2, hổ phách 2, đen 2, đỏ, chàm, tím mỗi màu 1 trên 17: **không có quy ước**; nhánh thiền nghiêng lạnh, nhánh sách nói nghiêng ấm | Hồng tím · Xanh ngọc · Cam |
| Ngành khác, không rõ | | Chàm · Xanh ngọc · Cam |

Xanh dương là màu chung của gần hết các ngành, nên chỉ để nó đứng đầu ở ngành mà số đo nghiêng
hẳn về nó. Ngành không có quy ước (spa, CRM) thì màu đầu là màu ít trùng với đối thủ, không bịa
một quy ước.

**Bẫy**

- **Không dùng đỏ, hồng đỏ làm màu nhấn**, kể cả ngành đồ ăn, du lịch đo ra đỏ: nút xoá là đỏ
  (`I4`, `--danger` hướng ~344°). Nút chính đỏ đứng cạnh nút Xoá đỏ thì người dùng không phân
  biệt được việc thường với việc mất dữ liệu. Ngành đo ra đỏ thì lấy Cam (cách `--danger` ~34°).
  Lý do này giống lý do loại hồng `#be185d` (cách ~9°).
- **Ba màu cách nhau từ ~40° trên vòng màu.** Xanh dương cạnh Chàm (22°) là một màu đổi sắc độ:
  người xem bấm qua lại không thấy khác, tưởng nhóm Nhấn hỏng. Sửa bảng thì đo lại khoảng cách.
- **Xanh lá, Xanh ngọc cùng họ với `--success`; Cam cùng họ với `--warning`.** Vẫn dùng được, vì
  nút đặc và badge nền nhạt khác hình. Nhưng **số liệu, chữ không tô màu nhấn**: số tô xanh lá
  cạnh badge "Hoàn thành" xanh lá thì người đọc tưởng số đó là "tốt" (`M4`). Số giữ
  `--foreground`.
- **Không thêm màu ngoài bảng màu** cho "hợp ngành hơn". Màu mới phải đo lại chữ trắng từ 4.5 : 1
  (`P3`). Hai màu cũ của nhóm Nhấn là ngọc `#0d9488` (3.74) và cam `#ea580c` (3.56) đã trượt
  chuẩn này.

---

## Gradient nhấn cho Sắc Vivid ⚑

Chỉ khi dự án chọn Sắc **Vivid** (`styles.md`, `P17`). Điểm đầu là `--primary`, điểm cuối là
`--accent-to` trong khối Sắc của `tokens.css`. **Chỉ lấy từ bảng này**: hai đầu đều đạt từ 5 : 1
với chữ trắng (`P3`, đo ở đầu nhạt nhất), cách nhau 26–41° trên vòng màu để gradient thấy được mà
không thành hai màu nhấn.

| `--primary` | `--accent-to` | Lệch | Chữ trắng trên `--accent-to` | Bản tối: `--primary` → `--accent-to` |
| --- | --- | --- | --- | --- |
| Xanh dương `#2563eb` | Tím `#7c3aed` | 41° | 5.70 | `#60a5fa` → `#a78bfa` |
| Chàm `#4f46e5` | `#9333ea` | 28° | 5.38 | `#818cf8` → `#c084fc` |
| Tím `#7c3aed` | Hồng tím `#a21caf` | 33° | 6.32 | `#a78bfa` → `#e879f9` |
| Hồng tím `#a21caf` | Tím `#7c3aed` | 33° | 5.70 | `#e879f9` → `#a78bfa` |
| Xanh ngọc `#0f766e` | `#0369a1` | 26° | 5.93 | `#2dd4bf` → `#38bdf8` |
| Xanh lá `#15803d` | Xanh ngọc `#0f766e` | 33° | 5.47 | `#4ade80` → `#2dd4bf` |
| Cam `#c2410c` | `#9a3412` | cùng sắc, đậm dần | 7.31 | `#fb923c` → `#fdba74` |

Bản tối chữ trên nút là `--primary-foreground` tối (`#05060f`), đạt từ 6.7 : 1 trên mọi ô cột tối.

**Bẫy**

- **Cam không đổi sắc**: một bên là hổ phách (`--warning`), bên kia là đỏ (`--danger`). Gradient
  cam sang hồng đi qua vùng đỏ, nút chính trông như nút xoá (`I4`). Nên Cam đậm dần trong cùng sắc.
- **Không đi về phía đỏ, xanh lá của trạng thái** dù hợp mắt: Hồng tím quay về Tím, không sang hồng.
- Màu nhấn của dự án ngoài bảng (brand riêng): lấy điểm cuối lệch 25–40° về phía **xa** đỏ, hổ phách,
  xanh lá, đo lại chữ trắng từ 4.5 : 1. Không đo được thì Vivid bỏ gradient, chỉ còn phần Tinted.

---

## `--primary-light` chỉ dùng được khi màu nhấn có sắc

Nền 5% của một màu cam hay xanh thì vẫn nhìn ra được. Nền 5% của một màu gần đen
thì chỉ là xám bẩn, badge đặt lên đó gần như biến mất.

| Màu nhấn | Nền badge, nền avatar, card accent | Chữ trên đó |
| --- | --- | --- |
| Có sắc (cam, xanh, đỏ...) | `--primary-light` | `--primary` |
| Trung tính (mặc định gần đen) | `--background` | `--foreground` |

Đang dùng bảng màu mặc định thì mặc nhiên đi theo hàng thứ hai. Thấy
`bg-brand-light` đứng cùng `text-muted` là sai chắc: nền nhạt tịt cộng chữ nhạt,
không đọc được.

---

## `--background-hover` và `--ring-focus`

Hai biến này tồn tại vì hai luật khác đòi:

- Luật `M18` bắt phần tử con trong hàng có hover không trùng nền hover của hàng. Hàng rê vào về `--background` (`I10`), nên ô ngày, ô vuông chuỗi, ô rỗng trong hàng lấy `--background-hover`, đậm hơn một nấc, không tan vào nền. Hover của nút phụ là `--secondary-hover`, hover của dòng là `--background` hay `--surface-hover`, không phải biến này.
- `--ring-focus` là ring rất mờ theo màu nhấn, tách thành biến chứ không viết `primary/10` rải khắp nơi. Dùng cho **ô điền lúc focus** (input, textarea, select) và **ô chọn dạng card đang chọn**, đi cùng viền `--border-focus` (`I13`). Nút, menu, tab không dùng.

Đổi `--primary` sang màu khác thì nhớ đổi `--ring-focus` theo, vì nó là chính
màu đó ở độ mờ 10%.

---

## `--primary-foreground`, đừng viết cứng `text-white`

Nền sáng thì màu nhấn gần đen, nên chữ trên nút là trắng. Nền tối thì màu nhấn
thành gần trắng, và `text-white` trở thành trắng trên trắng, mất sạch chữ.

Luôn dùng token cho **màu chữ đứng trên nền nhấn**:

```css
:root  { --primary: #181818; --primary-foreground: #ffffff; }
.dark  { --primary: #e9edf5; --primary-foreground: #05060f; }
```

Trong markup thì `bg-primary text-primary-foreground`, không bao giờ
`bg-primary text-white`.

Đổi `--primary` sang màu khác thì kiểm luôn `--primary-foreground`: màu nhấn
sáng thì chữ phải tối, và ngược lại.
