# Chữ — luật T

Nguồn duy nhất cho mọi luật về chữ. Con số cỡ chữ cụ thể nằm ở `budgets.md`.

---

## Font

**T1. `antialiased` trên `body`.** Một dòng, đặt một lần, và nó đổi cảm giác của
cả trang: chữ mảnh hơn, sạch hơn, bớt cái vẻ nặng nề của font render mặc định.

```html
<body class="antialiased">
```

**T2. Một họ chữ cho cả app.** Phân vai bằng weight và cỡ, không bằng font thứ
hai: tiêu đề `600`, body `400`, nhãn phụ `500`. `700` chỉ cho tên trang của trang
trình diễn (giới thiệu, bảng giá). Các app lớn dùng 600 cho tiêu đề app;
700 nặng hơn gu mờ của dự án (hạ ngày 23/09/2026).

`tracking-tight` **cho chữ có dấu chỉ từ `text-3xl` trở lên** (nâng từ `2xl` ngày
22/09/2026: tiêu đề `2xl` "Xác thực email" vẫn đọc ra "thựcemail"). Con số không
dấu, như số liệu `text-2xl` trong card số liệu, thì khép được. Tiêu đề `lg`/`xl`/`2xl` giữ khoảng chữ mặc định: tiếng Việt dấu chồng hai tầng, khép chữ
lại ở cỡ này là dấu chạm nhau và khoảng trắng giữa từ hẹp đi, "Công ty" đọc
thành "Côngty" (đã dính 22/09/2026). Copy không dấu thì ngưỡng khác (`T28`).

Font thứ hai chỉ được dùng cho **tiêu đề của trang trình diễn** (trang giới
thiệu, bảng giá, trang pháp lý) và phải nói được nó khác font body ở chỗ nào.
Trong trang làm việc của app thì không.

**T3. Font thứ hai không bao giờ cho số.** Giá, số liệu, chỉ số luôn dùng font
body. Lỗi đã xảy ra thật: "99K" viết bằng font tiêu đề trông như bìa tạp chí.

**T4. Nạp đúng số weight cần, và biết mình đang nạp gì.**

Một dự án thật nạp 400 / 500 / 600 và **cố ý không nạp 700**: 553 chỗ trong repo khai
`font-weight: 700/800` theo luật cũ, không có face 700 thì trình duyệt vẽ bằng
face gần nhất là 600, giao diện giữ nguyên. Cái bẫy đi kèm: `.font-strong` đặt
weight 900 nhưng **không chạy**, vì không có face nào trên 600.

Nghĩa là: đọc `font-weight` trong code không nói được chữ sẽ dày bao nhiêu. Phải
biết font đã nạp những face nào.

**T5. Kiểm dấu tiếng Việt trước khi chốt font.** Font phải có subset
`vietnamese`. Dấu nặng và dấu ngã chồng lên nhau là lỗi chỉ lộ ra ở chữ thật,
không lộ ra ở "Lorem ipsum". Xem `brand-tokens.md`. App không có copy tiếng Việt
thì bỏ qua luật này (`T28`).

---

## Thang cỡ

**T6. Cỡ chữ mặc định trong app là cỡ nhỏ, không phải cỡ trang giới thiệu.**
`text-sm` là mặc định, `text-xs` cho chú thích. Con số ở `budgets.md`.

**T7. Không dùng inline pixel font-size ngoài thang token.** Thấy một
`style={{ fontSize: 13 }}` thì quy nó về bậc gần nhất, đừng để nó sống.

**T8. Tiêu đề của một khối phải lớn hơn chữ lớn nhất bên trong khối, ít nhất một bậc.**

Tiêu đề card `text-base font-semibold` thì mục bên trong tối đa `text-sm`. Bằng
nhau là mắt không đọc ra đâu là nhãn của khối, đâu là nội dung, và cả khối trông
phẳng lì.

Cùng nguyên tắc cho độ đậm: tiêu đề khối `600`, mục bên trong tối đa `500`.

Thứ bậc đầy đủ của một trang app: **tên trang > tiêu đề khối > tên thẻ**.

**T9. Trang chi tiết của nội dung lặp lại không dùng cỡ hero.**

Mở một bài viết, một khoá học, một sản phẩm thì tiêu đề nên **bằng đúng cỡ tiêu
đề của nó ở danh sách**, không nhảy lên một bậc. Nhảy size gây cảm giác "chữ bự"
so với nội dung bên dưới. Chốt 16/09/2026 sau khi hạ tên trang từ
24px về 20px.

Cỡ hero chỉ còn cho trang trình diễn thật sự.

---

## Xuống dòng

**T10. Không để chữ đơn côi ở dòng cuối.**

Một tiêu đề xuống dòng rồi còn trơ một chữ ở hàng dưới thì nhìn như lỗi. Tệ hơn
là **chẻ sai nghĩa**: "làm gì có" bị bẻ thành "làm" ở dòng trên và "gì có" ở dòng
dưới, đọc vấp.

Cách xử, theo thứ tự:

1. **`text-balance`** cho tiêu đề và câu dẫn ngắn — trình duyệt tự chia đều các dòng. Đây là lưới đỡ đúng ở **mọi** bề ngang, không phải vá cho một bề ngang. Đoạn dài thì `text-pretty`, vì Chrome bỏ qua `balance` khi quá ~6 dòng.
2. Nới `max-w-*` để câu vừa đúng một dòng ở desktop.
3. `&nbsp;` giữa hai chữ cuối — chỉ khi hai cách trên không đủ.
4. Rút gọn câu. Thường đây mới là cách đúng nhất.

Không chỉ tiêu đề: **mô tả hai ba dòng trong cột hẹp** (bước dọc, sidebar, card nhỏ,
mô tả dưới tiêu đề modal) dính nhiều nhất, vì cột cố định nên dòng nào hụt là hụt ở
mọi màn. Mọi mô tả được xuống dòng đều `text-pretty`.

Kiểm ở đúng bề rộng thật, nhất là 375px: chữ đơn côi chỉ lộ ở một vài bề rộng.

**T11. Không để dòng chữ dài quá 75 ký tự.** Mọi khối văn bản có `max-width`.
Card rộng hết khung cũng tính.

**Chữ Việt: `max-w-[55ch]` ≈ 75 ký tự**, ở mọi cỡ chữ. `ch` là bề rộng số "0" (~9,5px ở
14px), còn ký tự Việt trung bình chỉ ~6,8px, nên `max-w-prose` (65ch) chứa ~90 ký tự và
`max-w-2xl` ở `text-sm` chứa ~99. Dùng `ch` chứ không dùng `max-w-lg`: nó co giãn theo cỡ
chữ, và không dính bẫy thang `--container-*` bị ghi đè (`tailwind-v4-traps.md`). Đã dính:
mô tả việc trong dòng thời gian chạy ~90 ký tự một dòng dù đã `max-w-prose`.

**T12. Chữ dài luôn căn trái.** Không căn giữa mọi thứ.

---

## Cắt chữ

**T13. `min-w-0` cho mọi flex và grid item chứa nội dung động.**

Flex item và grid item mặc định có `min-width: auto`, tức **không chịu co nhỏ hơn
nội dung của nó**. Một con số `1.284.500`, một cái tên dài là đủ để cột nở ra,
lưới nở theo, cả trang tràn ngang.

Đây là **nguyên nhân số một của lỗi cuộn ngang**, và chỉ lộ ra ở màn hẹp.

**T14. Tiêu đề một dòng thì cắt, câu giải thích thì xuống dòng.**

Chữ trong danh sách dày dùng `truncate` kèm `min-w-0`. Nhưng dòng mô tả thì cho
xuống dòng, đừng cắt — mô tả bị cắt thì mất luôn lý do nó tồn tại.

**Tên file cắt giữa, giữ đuôi**: "Bao-cao-doanh…thu-quy-3.xlsx", vì đuôi file nói loại
file. **Phần giữ lại là vài ký tự cuối của tên (khoảng 8) cộng đuôi**, không chỉ mỗi đuôi:
cắt sát dấu chấm thì `…` dính `.xlsx` thành bốn chấm "doanh-thu….xlsx", đọc như lỗi
gõ (đã dính 24/09/2026), và mất luôn phần cuối tên, thường là chỗ phân biệt các bản
("…quy-3", "…ban-cuoi"). Trình quản lý tệp của hệ điều hành cắt kiểu này. Dấu `…` **dính liền** phần giữ lại, không chừa khoảng trắng trước đuôi (đã dính
23/09/2026: "Báo cáo doan… .xlsx" cạnh "Báo cáo tổng kết năm….pdf", hai kiểu trong
cùng một cây).

**Chỉ hiện đủ tên khi tên thật sự bị cắt.** So chiều rộng thật rồi mới gắn `title` hay tooltip. **Đo bằng `Range`, không bằng `scrollWidth > clientWidth`**: hai số đó làm tròn về số nguyên, chữ rộng 182,4px trong khung 182px thì cả hai đều ra 182, trình duyệt vẫn cắt "quý" thành "q…" mà phép so báo không cắt (đã dính 25/09/2026, sidebar). Cách đo: `range.selectNodeContents(el)`, so `range.getBoundingClientRect().width > el.getBoundingClientRect().width`;
gắn sẵn cho mọi hàng thì hàng ngắn cũng bật bong bóng, thành nhiễu (đã dính 23/09/2026:
cây thư mục hiện tooltip "Khách hàng doanh nghiệp" dù tên còn nguyên). Bong bóng đó
cũng không được che hàng kế bên (`N8`).

**T15. Nhãn nút không được `white-space: nowrap`.**

Nhãn tiếng Việt của nút khá dài ("Gia hạn / Đổi gói", "Tham gia cộng đồng"). Với
`nowrap`, chỗ chứa hẹp hơn nhãn thì nút không co được — hoặc đẩy tràn ra ngoài,
hoặc chữ trào ra khỏi viên nút khi bị `max-width` chặn.

Đo thật ở một dự án: hộp 140px, nút cũ rộng 192px, **tràn 60px**.

Công thức đúng: `white-space: normal` + `line-height: 1.25` (để hai dòng không
dính nhau) + `overflow-wrap: anywhere` (ngắt cả URL và mã dài) + `max-width: 100%`.

---

## Số

**T16. Số xếp cột dùng `tabular-nums`.** Bảng số liệu, cột tiền, cột phần trăm —
thiếu nó thì các chữ số rộng khác nhau và cột nhảy lung tung khi dữ liệu đổi.
Giờ, ngày xếp dọc một mép (cột giờ bên phải dòng thời gian, lịch sử) cũng là cột số.
**Font phải có `tnum` thì class mới có tác dụng.** Kiểm bằng cách đo "1" và "4": rộng khác
nhau là font không áp (đã dính: Be Vietnam Pro bản Google Fonts, "1" 4,6px, "4" 8,5px).
Cột căn phải lệch mép trái vài px thì chấp nhận; bảng tiền, bảng số thì báo người dùng
một dòng lúc giao, đổi font là việc của họ (`N10`).

**T16b. Thời gian tương đối luôn kèm giờ tuyệt đối.** "5 giờ trước", "28 phút trước"
dễ đọc nhưng không dùng để đối chiếu được. Bọc trong `<time datetime>` và cho `title`
là giờ đầy đủ ("14:32 · 22/09/2026"), để rê chuột là biết chính xác. Nhật ký hệ thống,
dòng thời gian đơn hàng, nhật ký thao tác thì hiện thẳng giờ tuyệt đối, không tương đối:
ở đó người ta đang đối chiếu mốc thời gian chứ không lướt.

**Trong danh sách, mốc thuộc năm hiện tại thì bỏ năm**: `08:30 · 16/09`, không
`08:30 · 16/09/2026`. Mười hàng cùng đuôi `/2026` là một ý nhắc mười lần, và cột giờ rộng
thêm gần một nửa (đã dính 24/09/2026: tab Tin nhắn, Tệp, Hoạt động của panel khách hàng).
Khác năm thì ghi đủ `16/09/2025`; `title` và `datetime` luôn đủ. Copy tiếng Anh
thì tháng viết chữ (`T28`). **Bẫy:** `Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit' })` bỏ năm thì ra `23-09` gạch ngang, không phải `23/09`; tự ghép ngày và tháng bằng `/`. Các app lớn cùng làm
vậy. Một mốc đứng riêng làm trường dữ liệu ("Ngày tạo" trong khối nhãn và giá trị) thì giữ đủ năm.

**T17. Mã và định danh dùng `font-mono`.** Mã đơn hàng, mã vận đơn, mã giảm giá, ID,
kể cả khi nằm giữa một câu mô tả. Nó nói
"đây là thứ để copy chính xác", không phải chữ để đọc.

---

## Copy

**T18. Không dấu gạch dài trong câu văn, ở mọi thứ tiếng.** Lộ ngay là AI viết (`T28`).

Luật này nói về **câu văn**. Ô không có giá trị trong bảng hay khối nhãn và giá
trị thì hiện `—` màu `text-muted`: đó là ký hiệu "trống", không phải dấu câu, và
dùng một ký hiệu cho mọi ô trống của app (đã dính 22/09/2026: né `T18` nên viết
"Chưa có", "Chưa gắn nhãn", mỗi ô một câu).

**T19. Không emoji trong tiêu đề, câu chào, hay làm icon.** Icon theo `F15`.

**T20. Không chữ hướng dẫn thừa.** Nút đã ghi "Lưu" thì đừng thêm dòng "Bấm để
lưu". Không viết chữ lặp lại thứ icon đã nói: có dấu tick rồi thì bỏ chữ "Có"
bên cạnh.

**T21. Không badge kiểu "✨ AI-powered", "🚀 Fast", "New!".**

**T22. Dòng phụ dưới nút phải mang thông tin riêng của từng mục.** Ba dòng giống
hệt nhau thì bỏ cả ba.

**T23. Nhãn : giá trị thì nhãn xám, giá trị đậm, cùng một dòng.** "Ngày đặt:
Thứ tư 14/09". Đừng xuống dòng, đừng cho nhãn cùng màu với giá trị.

---

## Ngôn ngữ

**T24. Chốt ngôn ngữ của copy TRƯỚC khi viết cái nhãn đầu tiên.** Tự tìm, chỉ hỏi
khi tìm ra mâu thuẫn:

| Tìm thấy | Theo cái gì |
| --- | --- |
| Có i18n (`locales/`, `messages/`, json có khoá `en` / `vi`) | Theo đó, và đặt chuỗi vào đúng file i18n — đừng viết cứng vào JSX |
| Không i18n nhưng đã có nhãn sẵn trong code | Đếm nhãn hiện có đang tiếng gì, theo tiếng đó |
| Dự án trống, chưa có nhãn nào | Theo ngôn ngữ người dùng đang nói với mình |
| Codebase trộn hai thứ tiếng | **Hỏi một câu.** Đây là chỗ đoán sai thì phải sửa lại toàn bộ nhãn, không phải sửa một dòng |

**Trộn hai thứ tiếng trong một màn nặng hơn chọn nhầm tiếng.** "Mật khẩu" đứng
cạnh "Sign in" đọc ra là làm dở dang. Chọn nhầm tiếng thì ít ra còn nhất quán.

**T25. Placeholder chỉ có khi nó nói thêm điều nhãn chưa nói.**

**Mặc định không có placeholder.** "Nhập email của bạn" nằm dưới nhãn "Email" là chép
lại nhãn, một ý nói hai lần (`T20`, `N3`). Các app lớn để trống.

Có placeholder trong hai ca:

| Ca | Placeholder |
| --- | --- |
| Gợi ý **nội dung** mà nhãn chưa nói | Tiêu đề → "Viết ngắn gọn việc cần làm"; Mô tả → "Ghi yêu cầu và thế nào là xong việc" |
| **Định dạng** không hiển nhiên: điện thoại, ngày, mã số thuế, biển số | Ví dụ đúng khuôn: `0901 234 567`, `31/12/2026` |

- **Không dùng ví dụ giả cho ô định dạng ai cũng biết** (email, họ tên, mật khẩu): `ten@congty.com` bị đọc nhầm thành chữ đã gõ sẵn, nhất là trên mobile.
- **Ô có ô không trong cùng form là bình thường.** Luật cũ "cả form phải thống nhất" (22/09/2026) kéo theo câu chép nhãn vào mọi ô, bỏ ngày 23/09/2026.
- Placeholder **không thay được nhãn**: gõ vào là nó biến mất.

**T26. Ô mật khẩu KHÔNG dùng dấu chấm tròn làm placeholder.**

`••••••••` nhìn **y hệt mật khẩu đã gõ**. Người dùng không phân biệt được ô đang
trống hay đang có chữ — đây là ca tệ nhất của cái lỗi `T25` cảnh báo, vì hai thứ
trông giống nhau tuyệt đối chứ không chỉ na ná.

Và đếm chấm để đoán độ dài tối thiểu thì không ai làm. Tám chấm với chín chấm
nhìn như nhau.

**Độ dài tối thiểu là GỢI Ý, viết bằng chữ**, đặt ở dòng gợi ý dưới ô (xem
`layouts/form.md`):

```
Mật khẩu
[ Nhập mật khẩu của bạn              👁 ]
Ít nhất 8 ký tự
```

Gợi ý này hiện **sẵn từ đầu**, không đợi gõ sai mới hiện. Nói trước một câu rẻ
hơn bắt người ta gõ xong rồi báo sai.

---

## Tiếng trả lời và copy không phải tiếng Việt

**T27. Nói với người dùng bằng tiếng họ đang viết. Chữ trên UI theo `T24`.**
Đây là hai thứ tiếng khác nhau, chốt riêng:

| Thứ | Theo |
| --- | --- |
| Lời phân tích, câu hỏi, câu báo lúc giao (`S15`) | Tiếng người dùng đang viết trong lượt này |
| Comment trong code | Tiếng của comment sẵn có trong dự án; dự án trống thì theo người dùng |
| Nhãn, placeholder, thông báo lỗi, dữ liệu mẫu trên UI | `T24` |

Người dùng viết tiếng Anh mà dự án đang có nhãn tiếng Việt thì trả lời bằng
tiếng Anh, nhãn vẫn tiếng Việt. Không hỏi.

**Câu mẫu trong skill là khuôn ý, không phải câu để chép.** Skill viết bằng
tiếng Việt nên các câu giao đều là tiếng Việt: *"X chưa có mẫu đã duyệt, mình
mượn khuôn của Y"*, *"muốn khác thì nói"*. Người dùng viết tiếng Anh thì dịch ý:
*"X has no approved pattern yet, so I borrowed the Y pattern"*, *"say if you want
it different"*. Một câu tiếng Việt lọt vào câu trả lời tiếng Anh thì đọc ra là
skill làm dở.

Nhãn ví dụ trong skill cũng vậy: đó là ý, không phải chữ. Copy tiếng Anh dùng
nhãn mà các app tiếng Anh đều dùng, không dịch từng chữ (cùng lý do với "Ghi nhớ
đăng nhập" không phải "Nhớ tôi" ở `layouts/form.md`):

| Trong skill | Copy tiếng Anh |
| --- | --- |
| Xoá lọc · Xoá tìm kiếm | Clear filters · Clear search |
| Xem tất cả 12 đơn | View all 12 orders |
| Trạng thái: Tất cả · 32 | Status: All · 32 |
| Ghi nhớ đăng nhập · Quên mật khẩu? | Remember me · Forgot password? |
| Đăng nhập bằng Google | Continue with Google |
| Huỷ · Hoàn tác · Đã lưu | Cancel · Undo · Saved |
| Sao chép · Đã sao chép | Copy · Copied |

**T28. Một số luật chỉ đúng với chữ tiếng Việt.** Copy không phải tiếng Việt thì
đổi theo bảng dưới. Mọi luật khác trong skill áp cho mọi thứ tiếng.

| Luật | Copy tiếng Việt | Copy tiếng Anh |
| --- | --- | --- |
| Khép chữ `tracking-tight` (`T2`) | Từ `text-3xl` | Từ `text-2xl`: không có dấu chồng hai tầng |
| Kiểm dấu font (`T5`) | Bắt buộc subset `vietnamese` | Bỏ qua, trừ khi app có cả bản tiếng Việt |
| Tiền (`components/charts.md`) | `đ` thường sau số, số format bằng `Intl.NumberFormat('vi-VN')` | `Intl.NumberFormat(locale, { style: 'currency', currency })`: `$1,280.00`, ký hiệu và vị trí theo locale |
| Dấu thập phân, dấu nghìn | `12,4%` · `1.280` | `12.4%` · `1,280` |
| Mốc giờ trong danh sách (`T16b`) | `08:30 · 16/09` | Tháng viết chữ bằng `Intl.DateTimeFormat`: `Sep 16, 8:30 AM`. Không dùng `09/16`: Mỹ và Anh đọc ngược nhau |
| Chữ cái avatar (`components/avatar.md`) | Một chữ | Hai chữ, đầu tên và đầu họ: `Jane Doe` → `JD`. App tiếng Anh đều làm vậy |
| Ngày đầu tuần trong lịch (`components/choice-controls.md`) | Thứ Hai, `T2 … CN` | Theo locale: `en-US` Chủ nhật, `en-GB` thứ Hai |
| Số nhiều | Tiếng Việt không chia | Phải chia: `1 member` · `2 members`. Dùng `Intl.PluralRules` hoặc hàm i18n, không ghép chuỗi cứng |

`T15` (nhãn nút được xuống dòng) và `T18` (không gạch dài trong câu văn) **áp cho
mọi thứ tiếng**. Nhãn tiếng Đức còn dài hơn tiếng Việt, và gạch dài trong câu
tiếng Anh cũng là dấu hiệu AI viết dễ nhận ra nhất.

**T29. Copy tiếng Anh viết sentence case.** Nút, nhãn, tiêu đề, tab, mục menu:
chỉ viết hoa chữ đầu và tên riêng. "Create project", "Billing settings", không
"Create New Project". Dự án đang dùng Title Case (đếm nhãn như ở `T24`) thì theo
dự án.

- **Một việc một cặp từ, suốt app.** "Sign in / Sign out" hoặc "Log in / Log out", không trộn. `Delete` là xoá hẳn, `Remove` là gỡ khỏi một nhóm: hai việc khác nhau thì hai từ khác nhau.
- **Không "Please", không dấu chấm than** trong thông báo thường. "Project deleted", không "Your project has been deleted successfully!".

**T30. Câu văn chạy nhiều dòng dùng `text-sm/6`, chữ một dòng trong control giữ dòng mặc định.**

Đoạn có thể chạy từ hai dòng trở lên (mô tả dưới tiêu đề modal, thân hộp xác nhận,
câu mô tả của banner, câu trên trang rỗng có mô tả) dùng `text-sm/6` (14px, dòng 24px).
Chữ tiếng Việt có dấu chồng hai tầng (`ệ`, `ở`, `ữ`): dòng 20px mặc định của `text-sm`
làm dấu dòng dưới chạm sát chân chữ dòng trên, đoạn đọc ra đặc (đã dính 25/09/2026, hộp
thu hồi lời mời). Chữ một dòng trong nút, ô nhập, dòng bảng, mục menu, badge giữ dòng
mặc định: ở đó chiều cao do control quyết, tăng dòng là nút phình. Khoảng giữa tiêu đề
và đoạn mô tả ngay dưới là `mt-2` (8px), không `mt-1`.
