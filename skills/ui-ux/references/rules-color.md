# Màu — luật M

Đây là **nguồn duy nhất** cho mọi luật về màu, viền và bóng. `SKILL.md` chỉ chép
một dòng tóm tắt kèm số hiệu; giải thích, ngoại lệ và bằng chứng nằm ở đây.

Luật có dấu ⚑ là chưa qua vòng test nào.

---

## Nền và thứ bậc bề mặt

**M1. Nền trang xám nhạt, không trắng tinh. Card mới trắng.**

**M2. 95% trung tính, 5% điểm nhấn.**

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

**M3. Đúng một màu nhấn cho cả app.** Nút chính, link, trạng thái đang chọn dùng
chung nó. Màu thứ hai phải xin phép.

---

## Màu nói gì

**M4. Màu để báo trạng thái, không để phân loại.**

Bảng màu của MỘT màn hình, không thêm:

| Màu | Chỉ dùng cho |
| --- | --- |
| Xám trung tính | Mọi thứ còn lại: khung, chữ phụ, badge, icon, viền |
| Màu nhấn | Trạng thái "đã xong", và nút hành động chính khi thật cần nổi |
| Hổ phách | "Cần chú ý": quá hạn, nộp trễ, bỏ lỡ |
| Đỏ | CHỈ lỗi thật mà người dùng phải xử lý: bài bị từ chối, lỗi form |

Cách áp: định thêm một màu nền cho một loại khối thì **dừng lại và hỏi — màu đó
báo trạng thái gì?** Không trả lời được thì nó là trang trí, dùng xám.

Nội quy không phải lỗi → không đỏ. Quà không phải trạng thái → không màu riêng.

**M5. Phân loại khối bằng icon + chữ + viền, không bằng nền màu.**

Dặn dò, nội quy, quà, nhật ký đều là thẻ trắng viền mảnh; cái gì là gì do **icon
lucide + nhãn** nói. Thứ bậc đến từ cỡ chữ, độ đậm và khoảng cách: chữ chính đen,
chữ phụ xám; giữa các khu vực thoáng, trong từng thẻ gọn.

**M6. Một tín hiệu cho một ý.** Nhãn cộng ô màu đã nói "lưu ý" thì không thêm
badge "Lưu ý" nữa. Cùng tinh thần với `F6`: phần tử nổi bật chỉ cần một dấu hiệu.

**M7. Nhãn trạng thái nhỏ thì chữ màu, không nền.** Không pill màu cho mọi nhãn.

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

⚠️ Bẫy đã dính ở focus.camp: token tên `--text-muted` bị alias về `--text-normal`,
tức "chữ phụ" và "chữ chính" cùng một màu đen. Đừng tin tên token — mở giá trị
thật ra xem. Xem `refactor.md` luật L3.

**M12. Không gradient.** Ngoại lệ duy nhất: **ảnh đại diện và dấu hiệu nhận diện**
— avatar người dùng, icon workspace, logo tổ chức. Chúng là hình tròn hoặc vuông
nhỏ dưới 40px, và gradient ở đó đóng vai ảnh chứ không đóng vai nền.

Không bao giờ cho nút, card, nền trang, hay chữ (`bg-clip-text text-transparent`).

---

## Viền và bóng

> **⚠️ Đảo luật.** Bản cũ của skill này cấm viền card và bắt tách khối bằng chênh
> lệch nền. **Luật đó đã bỏ.** focus.camp sống với luật cấm viền 4 tháng rồi bỏ
> nó ngày 08/09/2026, và chốt phong cách "đường tóc 1px + bo góc, không bóng"
> ngày 11/09/2026 sau khi chủ dự án đưa ba ảnh tham chiếu. Đừng hồi sinh luật cũ.

**M13. Tách khối bằng đường tóc 1px + bo góc, không bằng bóng.**

Trang phẳng, sạch; thứ bậc đến từ cỡ chữ, độ đậm và màu chữ.

| Phần tử | Công thức |
| --- | --- |
| Thẻ / khung | trắng, viền 1px xám rất nhạt, bo ~12px, **không bóng** |
| Danh sách nhiều mục | MỘT khung, các dòng chia bằng `divide-y`. Dòng tiêu đề và dòng hành động cuối nằm TRONG khung |
| Khối tóm tắt phụ | nền xám nhạt + viền, bo như thẻ |
| Tab / mục sidebar đang chọn | nền xám, **không viền**; mục chưa chọn không nền |
| Ô nhập | viền — đây là chỗ viền đúng vai nhất, người ta phải nhìn ra ranh giới vùng gõ được |

**M14. Một token cho mọi đường tóc.**

Thẻ, ô nhập, đường chia đều dùng chung một token viền. Một token duy nhất để
đường tóc trong app không chỗ đậm chỗ nhạt. Cần đậm hơn một bậc cho một chỗ cụ
thể thì thêm đúng một token thứ hai, đặt tên theo vai trò, và ghi lý do.

⚠️ Thiếu class màu viền thì Tailwind v4 để `border-color: currentColor` — nút chữ
đen sẽ ra **viền gần đen**. Thấy viền đậm bất thường thì kiểm chỗ này trước khi
nghi mã màu.

**M15. Bóng CHỈ cho lớp nổi.**

Modal, command palette, dropdown, popover, toast được đổ bóng vì chúng nằm **trên**
trang. Mọi thứ nằm **trong** trang thì không.

Định thêm `shadow-*` cho khối nằm trong trang → thử viền trước, xem có đủ tách
khối không. Gần như luôn là đủ.

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

Hàng hover chìm về nền trang (luật `I6`). Nếu ô vuông trạng thái, checkbox hay
avatar bên trong cũng dùng đúng token đó làm nền, hoặc chỉ có viền nhạt, thì rê
chuột vào là chúng **biến mất**.

*Cách kiểm:* rê chuột lên hàng, đếm xem còn nhìn thấy đủ mọi thứ không.

---

## Bo góc lồng nhau

**M19. Khung ngoài bo lớn hơn thứ bên trong.** Thẻ ~12px → nút trong thẻ ~8px →
badge ~6px. Không trộn nút bo tròn hẳn với nút bo vuông trong cùng một nhóm;
badge trạng thái là ngoại lệ.

---

## Dark mode

**M20. Mặc định chỉ làm light mode.** Dark mode là việc gấp đôi và gấp đôi chỗ
phải kiểm tương phản. Chỉ làm khi người dùng nói cần, và hỏi một câu lúc giao.

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
pixel, gắt và rẻ. Đường mảnh dùng chính màu đó **hạ độ đục xuống khoảng 35%**.

**M23. Dark mode là navy rất tối, không phải xám trung tính.** Viền dark mode là
`rgba` mờ, không phải màu đặc. Ở nền tối viền **đảo vai**: nền sáng còn tách được
bằng chênh lệch nền, nền tối thì `#0f111a` với `#05060f` chênh nhau quá ít nên
viền trở thành thứ chính để tách khối, và bóng gần như vô dụng.

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
