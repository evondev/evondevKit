# Token và thương hiệu

Chép `references/tokens.css` vào `globals.css` hoặc `index.css`, rồi chỉ sửa
trong các khối có comment đánh dấu:

- **Font**: một khối ở `:root`, dùng chung cho cả sáng lẫn tối.
- **Màu nhấn**: một khối ở `:root` cho nền sáng, và nếu có dark mode thì **một khối nữa ở `.dark`** cho nền tối. Phải sửa cả hai.
- Không làm dark mode thì xoá hẳn khối `.dark` đi, đừng để đó cho rối.

Màu gần đen thì bản cho nền tối là gần trắng. Màu có sắc thì lấy bản sáng hơn
chính nó khoảng hai bậc, đừng dùng nguyên màu của nền sáng.

Màu nhấn mặc định là `#1a1d29`, gần đen. Cố ý chọn trung tính vì skill này dựng
UI cho nhiều người khác nhau, đóng sẵn màu của một thương hiệu vào là đóng nhầm.
Gần đen không bao giờ chửi nhau với brand nào, và trông cố ý chứ không trông như
chưa chọn xong.

Font: **Inter** cho toàn bộ, cả heading lẫn body. Một font, phân vai
bằng weight: heading `600`, body `400`, nhãn phụ `500` (`T2`). `tracking-tight` cho chữ có dấu chỉ từ `text-3xl` trở lên (`T2`).

Một font là lựa chọn cố ý, không phải cắt gọt cho nhanh. Ghép hai font mà chọn
sai cặp thì tệ hơn hẳn dùng một font tử tế, và phần lớn cặp đều sai. Bỏ font đi
rồi rơi về `system-ui` thì vẫn là hỏng, nên font luôn phải được nạp thật.

Trước khi chốt bất kỳ font thay thế nào, **kiểm tra dấu tiếng Việt trước mọi
tiêu chí khác**: rất nhiều font đẹp bị gãy ở "ữ", "ợ", "ằ" hoặc dấu chồng lên
nhau. Inter có bộ tiếng Việt đầy đủ.

Cách nạp thì tuỳ bối cảnh:

- **Project thật**: self-host qua `@fontsource`, không gọi ra Google Fonts.
- **File HTML đơn lẻ, prototype, bản demo để chấm**: `@import` thẳng Google Fonts. Dòng dùng luôn:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

`700` chỉ để cho con số lớn (card số liệu, giá) và tên trang của trang trình diễn. Không
nạp `800`: không luật nào dùng.

---

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

- Luật `I8` bắt nút phụ phải chênh đủ với nền cha, luật `I9` bắt hover phải nhìn thấy được. Mà `--border` còn nhạt hơn cả `--background`, hover bằng `--border` thì như không hover. Nên có `--background-hover` là một bậc xám thật.
- `--ring-focus` là ring rất mờ theo màu nhấn, tách thành biến chứ không viết `primary/10` rải khắp nơi. Dùng cho **ô điền lúc focus** (input, textarea, select) và **ô chọn dạng card đang chọn**, đi cùng viền `--border-focus` (`I13`). Nút, menu, tab không dùng.

Đổi `--primary` sang màu khác thì nhớ đổi `--ring-focus` theo, vì nó là chính
màu đó ở độ mờ 10%.

---

## `--primary-foreground`, đừng viết cứng `text-white`

Nền sáng thì màu nhấn gần đen, nên chữ trên nút là trắng. Nền tối thì màu nhấn
thành gần trắng, và `text-white` trở thành trắng trên trắng, mất sạch chữ.

Luôn dùng token cho **màu chữ đứng trên nền nhấn**:

```css
:root  { --primary: #1a1d29; --primary-foreground: #ffffff; }
.dark  { --primary: #e9edf5; --primary-foreground: #05060f; }
```

Trong markup thì `bg-primary text-primary-foreground`, không bao giờ
`bg-primary text-white`.

Đổi `--primary` sang màu khác thì kiểm luôn `--primary-foreground`: màu nhấn
sáng thì chữ phải tối, và ngược lại.
