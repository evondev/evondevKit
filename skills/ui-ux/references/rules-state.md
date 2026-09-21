# Trạng thái và tương tác — luật I

Nguồn duy nhất cho nút, hover, focus, danh sách, modal. Con số ở `budgets.md`.

---

## Nút

> **⚠️ Đảo luật.** Bản cũ của skill này viết "ba variant `primary` / `ghost` /
> `danger`, không outline" và "nút mặc định không icon". **Cả hai đã bỏ.** Chủ dự
> án chốt ngược lại ở focus.camp ngày 13/09/2026. Đừng hồi sinh luật cũ.

**I1. Nút mặc định là viền + icon, không phải nền màu nhấn.**

Dựng nút mới → nút viền, icon lucide **bên trái** chữ.

*Vì sao:* nguyên lời chủ dự án — *"không nên để brand bị nhiều màu quá trong dự
án"*. Nút nền nhấn rải khắp nơi thì màu thương hiệu loang ra, tới lúc có một nút
**thật sự** cần nổi thì nó không nổi được nữa. Cùng tinh thần với `M2`.

| Loại nút | Dùng |
| --- | --- |
| Mặc định: thêm, sửa, mở, lọc, xem… | viền + icon trái + chữ |
| Hành động chính **duy nhất** của một khu, thật cần nổi | nền màu nhấn |
| Chỉ icon | nút cỡ icon, có `aria-label`, cao bằng nút chữ cạnh nó |
| Xoá | xám như nút phụ lúc thường, chỉ đỏ lên khi rê vào |

**I2. Chọn nền màu nhấn thì nói một câu lý do.** Nộp bài, thanh toán, tham gia —
những chỗ đó hợp lệ. Nhưng phải là một lựa chọn, không phải mặc định.

**I3. Trong một nhóm lựa chọn chỉ một nút được là nút chính.** Ba nút đặc màu như
nhau là chưa quyết định hộ người dùng.

**I4. Hành động nguy hiểm không đỏ đặc. Lúc thường trung tính, rê vào mới đỏ.**

Áp cho xoá, **đăng xuất**, huỷ tài khoản, rời nhóm. Nút xoá không nên hét vào mặt
người dùng suốt ngày.

Khi rê vào thì đổi **cả hai**: chữ (kèm icon) sang đỏ, nền sang đỏ rất mờ.

```html
<button class="group text-foreground hover:bg-rose-500/10 hover:text-rose-500">
  <i data-lucide="log-out" class="size-4 text-muted group-hover:text-rose-500"></i>
  Đăng xuất
</button>
```

"Trung tính" nghĩa là **trông y như các mục khác cùng chỗ** — trong menu thì chữ
`--foreground` như mọi mục, trong hàng nút thì là nút phụ. Không có nghĩa là
`text-muted`: mục đăng xuất mà nhạt hơn các mục khác thì đọc ra là đã bị khoá
(`I8`).

- **Nền đỏ ~10%**, không hơn. Đậm hơn thì nó thành một dải màu cảnh báo, không còn là trạng thái rê chuột.
- **Icon đổi màu cùng chữ.** Icon lúc thường là `text-muted`, nên phải có **`group` ở hàng** và `group-hover:text-rose-500` ở icon. Thiếu `group` thì `group-hover` im lặng không chạy — chữ đỏ mà icon còn xám, và không có lỗi nào báo.
- Chỉ mục nguy hiểm được đỏ. Các mục khác trong cùng menu vẫn hover về nền xám như `I10`.
- Mục nguy hiểm trong menu thì **tách xuống cuối**, cách bằng một đường chia.

**I5. Nút màu nhấn đang có thì KHÔNG đi quét đổi hàng loạt.** Chỉ đổi sang viền +
icon khi đang được yêu cầu sửa UI/UX ở đúng khu đó, và ghi vào nhật ký. Quét hàng
loạt là một PR không ai duyệt nổi.

**I6. Không đẻ ma trận variant nhân size.** Cần nút khác cỡ thì truyền
`className`. Một bản `Button` ở project cũ của bro đã phình lên 8 variant, 3 size
và một variant `glow` dùng ba lớp radial gradient — đó là ví dụ ngược.

**I7. "Xem tất cả", "Đọc thêm" là nút, không phải link chữ.**

Đây là hành động dẫn sang một màn khác, nên nó phải trông bấm được.

- Dùng **nút phụ**, không viền phát sáng, không icon mũi tên.
- **Căn phải.** Khối có header thì đặt ở header bên phải, cùng hàng với tiêu đề. Danh sách phải đọc hết mới bấm thì đặt cuối khối, vẫn căn phải, vẫn **trong khung** (xem `F3`).

**I8. Nút phụ không được trông như đã bị khoá.** Chữ nhạt trên nền nhạt thì người
dùng đọc ra là nút disabled. Chênh lệch nền của nút phụ với nền cha phải **thấy
được khi liếc**.

---

## Hover và focus

**I9. Mọi phần tử bấm được phải CÓ hover, và hover đó phải nhìn thấy được.**

Hai vế, hay sót vế đầu. Đổi màu xong tự hỏi: chênh lệch này có nhận ra khi liếc
không.

⚠️ **Nút `primary` là chỗ bị quên nhiều nhất.** Nó đã nổi sẵn nên nhìn tĩnh thấy
ổn, và người dựng bỏ qua. Nhưng nút chính của cả màn mà rê vào không phản hồi gì
thì nó là thứ duy nhất trong trang trông như ảnh chụp. Luôn có
`hover:bg-primary-hover` — token đã có sẵn trong `tokens.css`, không phải tự chế
màu.

**I10. Hover của một dòng là chìm xuống nền, không tô đậm lên, không phóng to.**

**I11. Hành động phụ (sửa, xoá) mờ đi lúc thường, chỉ hiện khi rê vào dòng.**

**I12. Chỉ đổi màu khi chuyển trạng thái.** Ngoại lệ duy nhất là card hover được
`transition-all`.

**I13. Focus ring xám trung tính, mảnh, chỉ hiện với `focus-visible`.**

Bấm chuột thì không thấy viền, dùng bàn phím mới thấy. Màu ring **không** phải
màu nhấn.

⚠️ Ô nhập là ca riêng: gõ chữ mà ô bị bọc một vòng dày thì rối. Với `input` /
`textarea` thì **chỉ đổi màu viền**, không thêm ring ngoài — hoặc ring rất mờ
(~10%), chọn một rồi dùng nhất quán cả app.

**I14. Bỏ hẳn dấu hiệu focus là một quyết định, không phải một mặc định.**

focus.camp đã bỏ vòng focus bàn phím (16/09/2026) và ghi rõ đánh đổi: người dùng
bàn phím không còn thấy mình đang đứng ở nút nào. Nếu làm vậy thì:

- Ghi lý do ngay tại chỗ, kèm câu **"đừng sửa lại khi thấy bấm Tab không có dấu hiệu gì"**.
- Để rule ở **đúng một chỗ**, để muốn trả lại thì sửa một dòng.

Mặc định của skill này vẫn là **có** dấu hiệu focus.

**I15. Sidebar: mục đang chọn tô nền xám, không tô màu nhấn, không viền.** Mục
chưa chọn thì không nền.

Ngoại lệ đã dính: khi mục đang chọn là **ảnh** (avatar ở thanh dưới mobile), tô
màu đè lên ảnh thì không đọc ra là "đang chọn" — dùng vòng `box-shadow` quanh ảnh.

---

## Danh sách

**I16. Dữ liệu nhiều thì phân trang, đừng đổ hết ra.**

Danh sách hay bảng quá khoảng 25 dòng thì thêm phân trang, hoặc nút tải thêm.
Kèm theo phân trang thì luôn hiện **tổng số** và **đang xem tới đâu**: "51 tới 75
trong 312 dòng". Thiếu con số đó thì phân trang chỉ là mấy cái nút vô nghĩa.

**I17. Ngưỡng giấu nội dung sau một cú bấm:** chỉ dùng accordion hay tab khi danh
sách dài hơn 6 mục, hoặc mỗi phần trả lời dài quá 3 dòng. Dưới ngưỡng đó thì
hiện hết.

**I18. Scrollbar ẩn hẳn nhưng vẫn cuộn được.**

**I19. Mọi trang có dữ liệu đều cần đủ ba trạng thái: đang tải, rỗng, lỗi.**

Khung chờ phải **đúng hình** của nội dung sẽ hiện ra, không phải một vòng xoay
giữa màn. Khung chờ sai hình thì trang nhảy một cái lúc dữ liệu về, và đó là thứ
người dùng cảm nhận được dù không gọi tên được.

Xem `components/empty-state.md`.

---

## Modal

**I20. Modal có ô nhập thì bấm ra ngoài KHÔNG được đóng.**

Popup nào chứa `input` / `textarea` / `select` / rich-text / upload ảnh thì
backdrop **không** mang handler đóng. Đang điền dở mà con chuột lỡ click một cái
ra ngoài là mất sạch — không có nháp, không undo. Đóng bằng nút ✕ / Huỷ / Esc,
tức là phải cố ý.

- `e.target === e.currentTarget` **không phải cách vá**: nó chỉ chặn click bị bubble từ bên trong, còn click thẳng vào backdrop — đúng cái tay lỡ bấm — vẫn đóng. Xoá cả prop `onClick` đi.
- Gỡ dismiss thì **phải chắc còn đường đóng khác**. Dính thật ở focus.camp: hai bottom sheet lấy backdrop làm lối ra DUY NHẤT, gỡ xong là khoá luôn người dùng trong sheet.
- **Form nhiều bước thì khoá THEO BƯỚC**, không khoá cả modal. Bước chưa gõ gì thì cho đóng; bước đang gõ dở thì khoá. Màn gõ mã OTP là thứ phải khoá: bấm nhầm là mất mã, xin lại phải đợi hết 60 giây.

**I21. Vẫn giữ dismiss cho thứ chỉ để đọc hoặc chọn.** Lightbox ảnh, xem chi
tiết đơn, roster, dropdown, menu, panel thông báo, drawer mobile. Đóng nhầm mấy
cái đó không mất gì.

**I22. Panel và dropdown phải portal ra `document.body`.**

Popup lồng trong sidebar hay thanh dưới sẽ bị clip bởi `overflow` hoặc bị nhốt
trong stacking context của cha. Portal thoát mọi thứ đó.

**I23. Dựng modal mới thì dùng khung dùng chung, đừng tự dựng backdrop bằng
`position: fixed`.** Khung dùng chung cho sẵn khoá tiêu điểm, trả tiêu điểm về
nút đã mở, khoá cuộn nền, và aria đúng chuẩn — tự dựng thì mất hết.

---

## Điều hướng

**I24. Panel thông báo mở tại chỗ, không điều hướng sang trang khác.** Điều hướng
đi mất luôn ngữ cảnh chỉ để liếc một cái thông báo.

**I25. Hành động "đánh dấu đã đọc" phải theo đúng phạm vi đang xem.** Đang lọc
còn 2 dòng mà bấm lại xoá sạch thông báo của phạm vi người dùng **không nhìn
thấy** là mất dữ liệu thầm lặng.

---

## Ô nhập

**I26. Nhãn phải gắn vào ô, có `cursor-pointer`, và chỉ rộng bằng chữ.**

Ba thứ đi liền nhau, thiếu một cái là lỗi:

```html
<label for="email" class="w-fit cursor-pointer text-sm font-medium">Email</label>
<input id="email" />
```

- **`for` / `htmlFor` khớp `id`** — bấm vào chữ là ô nhận tiêu điểm. Không có thì nhãn chỉ là chữ trang trí, và trình đọc màn hình cũng không biết ô này tên gì.
- **`cursor-pointer`** — nhãn bấm được mà con trỏ vẫn là que gõ chữ thì không ai biết để mà bấm.
- **`w-fit`** — chỗ sót nhiều nhất. `<label>` là block, không có `w-fit` thì nó chiếm trọn chiều ngang. Bấm vào khoảng trắng trống bên phải chữ, cách chữ 300px, ô vẫn sáng lên. Người dùng bấm hụt ra ngoài mà thấy ô phản hồi thì tưởng mình bấm trúng cái gì đó.

**I27. Ô mật khẩu phải có nút hiện/ẩn.** Không có thì người dùng gõ sai một ký tự
là phải xoá hết gõ lại, và đó là lý do rời form phổ biến nhất ở màn đăng nhập.

- Nút **chỉ có icon**, `absolute` trong ô, căn phải. Icon `Eye` / `EyeOff` theo `F15`.
- **`type="button"`.** Quên thì nó mặc định là `submit` — bấm xem mật khẩu hoá ra gửi form.
- `aria-label` đổi theo trạng thái: "Hiện mật khẩu" / "Ẩn mật khẩu". Không phải một nhãn cố định.
- Chừa chỗ cho nút bằng padding phải trên chính ô (`pr-11`), đừng để chữ gõ dài chui xuống dưới icon.
- Mặc định là **ẩn**. Mở sẵn thì mật khẩu phơi ra trước mặt người đứng sau lưng.

**I28. KHÔNG tắt gợi ý điền sẵn của trình duyệt. Khai báo cho nó đúng.**

Cái khung đen Chrome bật lên khi chạm vào ô email là **trình quản lý mật khẩu**,
không phải lỗi giao diện. Người dùng bấm một cái là điền xong cả form. Tắt nó đi
là ép người ta gõ tay mật khẩu 20 ký tự, và đẩy họ sang chỗ đặt mật khẩu dễ nhớ.

`autocomplete="off"` ở form đăng nhập còn bị Chrome, Safari, Firefox **cố tình
bỏ qua** — tắt không được, chỉ làm hỏng phần gợi ý chứ không tắt hẳn.

Việc phải làm là ngược lại: khai báo đủ để nó đoán đúng.

| Ô | `autocomplete` |
| --- | --- |
| Email / tên đăng nhập | `username` (hoặc `email`) |
| Mật khẩu, màn **đăng nhập** | `current-password` |
| Mật khẩu, màn **đăng ký** hoặc đổi mật khẩu | `new-password` |
| Mã OTP | `one-time-code` |

Mỗi ô cũng phải có `name`. Thiếu `name` thì trình duyệt không có gì để lưu, và
lần sau không gợi ý được.

Khung gợi ý **che mất ô ngay dưới** — đó là hành vi bình thường của trình duyệt,
nó tự đóng khi gõ hoặc khi rời ô. Đừng đẩy khoảng cách các trường ra xa để
"tránh" nó.
