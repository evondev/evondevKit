---
name: ui-taste
description: Gu thiết kế UI của Tuấn: bảng màu trung tính một màu nhấn, card nền trắng trên nền xám, chữ ba sắc độ, bo góc theo vai trò, trạng thái điềm đạm. Dùng khi dựng hoặc sửa bất kỳ giao diện nào (landing, dashboard, form, modal, danh sách, bảng giá, empty state), hoặc khi người dùng nhắc "làm UI cho đẹp", "đừng làm kiểu AI", "theo gu của mình", "ui-taste".
---

# UI taste

> **Chưa có ảnh wireframe thì KHÔNG viết một dòng code nào trong lượt này.**
> Đọc mục 0, đưa phương án bố cục ra, rồi kết thúc lượt và chờ người dùng chọn.


Skill này không dạy "thế nào là đẹp" bằng tính từ. Nó làm hai việc: **cấm** những
thói quen làm giao diện lộ ngay ra là AI dựng, và **ràng buộc** bằng con số cụ
thể để phần còn lại tự sạch.

Áp dụng cho mọi project, không riêng project nào. Bảng màu trong `references/brand-tokens.md`
là điểm khởi đầu, đổi được. Mục 0 và mục 1 thì không đổi.

---

## 0. Chưa có skeleton thì dựng skeleton trước

Đây là bước quan trọng nhất trong cả skill, và là bước hay bị bỏ qua nhất.

Người dùng đưa ảnh wireframe thì AI dựng ra đồ tử tế. Người dùng chỉ mô tả bằng
lời thì AI vẽ tùm lum, kể cả khi đã có đủ bảng màu, cỡ chữ, thang khoảng cách.
Lý do: **design system nói màu gì cỡ nào cách nhau bao nhiêu, nó không nói cái
gì nằm ở đâu.** Bố cục mới là thứ quyết định trang đẹp hay xấu, và không luật
màu nào bù được cho một bố cục bịa.

Nên khi không có skeleton, việc đầu tiên là **tự tạo ra một cái**, không phải
lao vào viết class.

**Quy trình bắt buộc, ba bước:**

1. **Nhận loại màn hình.** Nói thẳng ra đây là loại gì và thuộc nhóm nào: trang bán hàng, form, màn hình trong app, hay khối nổi. Loại màn hình quyết định luôn cả nhịp và shadow trong `references/budgets.md`, nên khai sai là hỏng từ gốc.
2. **Đưa 2-3 bố cục cho chọn, rồi DỪNG HẲN.** Mở file layout tương ứng, lấy ra 2-3 phương án, vẽ khung bằng ASCII, mỗi phương án một câu nói nó hợp khi nào. Nói rõ mình nghiêng về cái nào và vì sao.

   Sau đó **kết thúc lượt ngay tại đó**. Không viết HTML, không tạo file, không "mình chọn A rồi dựng luôn cho nhanh". Có công cụ hỏi người dùng trong môi trường thì dùng nó. Người dùng chưa gõ tên phương án ra thì coi như chưa chọn.

   Tự chọn hộ rồi dựng tiếp là **vi phạm nặng nhất** của skill này. Nó biến một câu hỏi rẻ thành một lượt dựng sai phải làm lại.
3. **Dựng theo phương án đã chọn**, chép cấu trúc từ code mẫu nếu file layout có kèm.

Đừng gộp bước 2 vào bước 3. Dựng xong rồi mới hỏi thì người ta ngại đổi, và
mình vừa đốt một lượt vào bố cục sai.

| Loại màn hình | Mở file |
| --- | --- |
| Landing, bảng giá, khối tính năng, câu hỏi thường gặp | `references/layouts/sales.md` |
| Đăng nhập, đăng ký, form nhiều trường, trạng thái lỗi | `references/layouts/form.md` |
| Dashboard, danh sách, danh sách rỗng, cài đặt | `references/layouts/app.md` |
| Modal, panel trượt, dropdown, toast | `references/layouts/overlay.md` |

**Đề để hở thì hỏi phạm vi trước, bố cục sau.** Có hai kiểu đề, xử khác nhau:

- **Đề có liệt kê** ("trang login gồm ô email, ô mật khẩu, nút..."): phạm vi đã chốt, chỉ hỏi bố cục.
- **Đề để hở** ("dựng màn hình tổng quan", "dựng trang giới thiệu"): chưa có danh sách nào để bám. Luật 0 lúc này dễ hoá thành "làm ít nhất có thể", ra một màn mỏng dính. Phải hỏi thêm một câu trước: **màn này gồm những khối nào**, đưa 2-3 phương án phạm vi lấy từ file layout tương ứng, rồi mới tới câu hỏi bố cục. Gộp hai câu vào cùng một lượt, đừng bắt người ta trả lời hai lần.

**Chỉ hỏi về bố cục, không hỏi lại nội dung.** Người dùng đã liệt kê rõ màn hình
có những gì thì giữ nguyên đúng danh sách đó, không thêm không bớt, không đề
xuất "hay là thêm phần này". Câu hỏi duy nhất được phép đặt là **bày những thứ
đó ra sao**.

Ví dụ, người dùng ghi "trang login có ô email, ô mật khẩu, link quên mật khẩu,
nút đăng nhập, nút đăng nhập bằng Google". Nội dung thế là xong, chốt cứng. Việc
còn lại chỉ là chọn giữa một cột giữa màn hay hai cột có ảnh bên phải. Đưa hai
khung đó ra, đừng hỏi lại có cần nút Google không.

Nội dung càng rõ thì câu hỏi bố cục càng ngắn, nhưng vẫn phải hỏi. Danh sách
phần tử không quyết định được thứ tự, tỉ lệ và mức quan trọng.

**Có skeleton rồi thì bỏ qua mục này**, đi thẳng xuống mục 1 và bám ảnh theo
luật `P6`, `P7`, `P8` ở mục 1.

---

## 1. Cấm, đọc trước khi viết dòng class đầu tiên

Hai phần: **P** là luật về phạm vi, tức được làm gì và không được tự thêm gì.
**C** là luật cấm về hình thức. Phần P quan trọng hơn, đọc trước.

### P. Phạm vi

**P1. Không tự đẻ thêm section.** Đề bài có mấy khối thì dựng đúng mấy khối. Skeleton vẽ ba card thì giao ba card, không tự thêm header, bảng so sánh, câu hỏi thường gặp, footer.

**P2.** Chữ "làm cho hoàn chỉnh" trong đề bài **không** phải giấy phép thêm nội dung. Nó chỉ có nghĩa là dựng xong phần được giao.

**P3. Tiêu đề màn hình không tính là nội dung thêm.** Người dùng liệt kê phần tử mà quên tiêu đề thì cứ đặt, vì nó là cấu trúc chứ không phải nội dung. Cùng loại: nhãn ô nhập, chữ trên nút, câu lỗi. Còn lại thì không: không thêm logo, không thêm câu quảng cáo, không thêm ô "ghi nhớ đăng nhập", không thêm nhà cung cấp đăng nhập thứ hai.

**P4. Dựng mockup thì điền dữ liệu giả hợp lý, đừng để chỗ trống.** Một trang đầy `[cần điền]` không nhìn ra được thiết kế, nó thành cái biểu mẫu. Cứ điền số nghe được, rồi **báo một dòng lúc giao**: số liệu trong bản này là giả.

**P5.** Chỉ để `[cần điền]` khi bản dựng đi thẳng ra người dùng thật, và chỉ cho thứ có hậu quả pháp lý hoặc tài chính: giá bán, mức hoàn tiền, cam kết uptime, điều khoản.

**P6. Người dùng đưa ảnh thì hỏi ảnh đó là gì.** Wireframe thì chỉ lấy bố cục, thay sạch màu và kiểu dáng. Design ref thì bám cả bảng màu. Đoán sai là dựng lại từ đầu.

**P7. Bố cục gồm cả vị trí, không chỉ danh sách phần tử.** Badge nằm giữa mép trên card thì để giữa. Ô icon đứng cạnh giá thì giữ đúng chỗ. Thứ tự các khối giữ nguyên. Thay màu và kiểu dáng thì được, xê dịch vị trí thì không.

**P8. Icon trong wireframe cứ giữ, kể cả icon trang trí.** Ngôi sao trong badge để nguyên. Ô icon cạnh giá thì mỗi mục **được phép một icon khác nhau**, miễn cùng bộ, cùng độ dày nét, cùng màu, cùng kiểu hộp. Ba icon giống hệt nhau cho ba mục thì ô icon mất sạch ý nghĩa, thà bỏ hẳn.

**P14. Gặp từ mơ hồ trong đề thì hỏi trước, hỏi trước cả câu hỏi bố cục.** Tiếng Việt có mấy từ mà trong ngữ cảnh UI mang hai nghĩa hoàn toàn khác nhau:

| Từ | Hai cách hiểu |
| --- | --- |
| bảng | table dữ liệu, hay board kiểu kanban |
| thẻ | card, hay tab |
| danh sách | list dọc, hay dropdown |
| khung | vùng bố cục, hay modal |
| trang | một route, hay một tờ trong nhiều bước |
| lịch | lịch tháng, hay dòng thời gian |

Hỏi một câu là xong. Đoán sai là dựng lại cả màn hình, và tệ hơn là người dùng
tưởng đã test xong một thứ mà thật ra chưa test. Chuyện này đã xảy ra thật:
"bảng quản lý dự án" bị hiểu thành kanban board, cả vòng test coi như bỏ.

**P15. Code mẫu trong `layouts/` chỉ dùng sau khi đã chốt loại màn hình.** Nó trả lời câu "dựng thế nào", không trả lời câu "đề bài muốn gì". Có sẵn một file kanban mẫu thì rất dễ đọc mọi thứ mơ hồ thành kanban. Chốt loại màn hình trước, mở code mẫu sau.

**P9. Token thì tìm trước, mặc định sau, hỏi sau cùng.** Grep `globals.css`, `index.css`, `tailwind.config` cho `--primary`, `--brand`, `font-family`. Có thì dùng, không hỏi. Không có thì lấy `references/tokens.css` và dựng luôn. Chỉ hỏi trước khi biết chắc đang làm cho khách đã có bộ nhận diện. **Không bao giờ hỏi số lượng font.**

**P9b. Project đã có thư viện component thì dùng của họ, đừng viết lại.** shadcn, Radix, MUI, Ant, hay bộ component nội bộ: cứ dùng đúng component của họ. Skill này chi phối **token, nhịp, bố cục, và luật phạm vi**, không chi phối việc bro lấy `<Button>` ở đâu. Viết lại một cái Button trong project đã có shadcn là làm hỏng tính nhất quán chứ không phải làm đẹp thêm.

Cách áp: chỉnh **token** của thư viện cho khớp `references/tokens.css`, rồi chỉnh vài mặc định trái luật. Với shadcn thì thường là ba chỗ:
- `Input` mặc định `bg-transparent`, đổi thành `bg-surface`. Ô nhập trong suốt trên nền trang thì người dùng không thấy nó là ô nhập.
- Nhiều component mặc định có `border` thấy rõ, trong khi luật M2 và M3 muốn tách khối bằng nền trước.
- `Button` mặc định có nhiều variant và size, luật T1 chỉ giữ ba variant. Không xoá bớt của thư viện, chỉ tự giới hạn mình dùng ba cái.

Người dùng nói rõ dùng thư viện nào thì **theo họ**, đừng cãi. Họ không nói mà project đã cài sẵn thì grep `components/ui` hoặc `package.json` để biết.

**P10. Khối đổi thương hiệu phải chép nguyên văn từ `references/tokens.css`.** Mở file ra copy, không gõ lại từ trí nhớ, không tự nghĩ mã hex. Đã có lần AI tự chế ra `#a99cff` tím và `#fa99cff0d` sai cú pháp. Cần màu khác thì thay đúng một dòng `--primary`.

**P11. Mọi màu và font gom vào khối đánh dấu ở đầu file.** Ngoài khối đó không được xuất hiện mã màu. Font khai một lần. Màu nhấn có **hai chỗ** nếu có dark mode: `:root` và `.dark`. Thiếu chỗ thứ hai là màu nhấn tàng hình trên nền tối.

**P12. Mặc định chỉ làm light mode.** Dark mode là việc gấp đôi và gấp đôi chỗ phải kiểm tương phản, nên chỉ làm khi người dùng nói cần. Lúc giao thì hỏi một câu.

**P13. Lúc giao phải chỉ rõ chỗ đổi thương hiệu.** Một dòng, ví dụ "đổi màu nhấn ở dòng 14, font ở dòng 8". Có dark mode thì nói rõ là hai chỗ.

### C. Cấm về hình thức

**Màu**

**C1.** Không gradient. Không `bg-gradient-to-*`, không `from-purple-500 to-pink-500`. Ngoại lệ duy nhất là ảnh đại diện và icon workspace, xem M7 trong `rules.md`.
**C2.** Không chữ gradient. Không `bg-clip-text text-transparent`.
**C3.** Không tím và tím-xanh làm màu chủ đạo. Đây là màu mặc định của AI.
**C4.** Không quá một màu nhấn trong cùng một màn hình. Tag phân loại dữ liệu là ngoại lệ, xem M4b trong `rules.md`.
**C5.** Không dùng màu để trang trí. Màu chỉ để báo trạng thái hoặc chỉ hành động chính.
**C6.** Không nền trang màu trắng tinh. Nền xám nhạt, card mới trắng.

**Hiệu ứng**

**C7.** Không glassmorphism. `backdrop-blur` chỉ khi phía sau thật sự có ảnh.
**C8.** Không `shadow-2xl`, không `shadow-xl`.
**C9.** Không viền phát sáng, không `ring-4`, không shadow màu neon.
**C10.** Không `border-dashed`. Hai ngoại lệ: khung kéo thả tệp, và ô rỗng trong board hay lịch.
**C11.** Không `scale-105` khi hover. Không animate hình khối.
**C12.** Không hiệu ứng xuất hiện cho nội dung tĩnh. Không fade-in cả trang. Không cho biểu đồ tự vẽ, cột tự mọc, số tự đếm lên.
**C13.** Không `transition-all` trừ đúng một chỗ: card hover.

**Bố cục**

**C14.** Không hero chiếm nguyên màn hình.
**C15.** Không căn giữa mọi thứ. Chữ dài luôn căn trái.
**C16.** Không card lồng card lồng card. Tối đa hai tầng.
**C17.** Không chia đều ba cột chỉ vì có ba mục. Bố cục theo mức quan trọng.
**C18.** Không để dòng chữ dài quá 75 ký tự. Mọi khối văn bản có `max-width`.
**C19. Không mỗi mục một card.** Nhiều mục cùng loại thì gom vào một khối, chia bằng đường kẻ. Bốn card trắng giống hệt nhau xếp lưới thì mắt đọc ra bốn khối ngang hàng, không đọc ra một danh sách. **Ngoại lệ: thẻ kanban**, vì nó là vật kéo thả được.
**C20.** Không bọc bảng vào card. Bảng đã tự có khung bằng đường kẻ rồi.

**Nội dung**

**C21.** Không emoji làm icon, và không emoji trong tiêu đề hay câu chào. Icon lấy từ `lucide-react`.
**C22. Ngoại lệ của C21 và C25: logo thương hiệu bên thứ ba.** Nút đăng nhập bằng Google, Apple, GitHub phải có đúng logo của họ, giữ nguyên màu gốc, dán SVG thẳng vào. Lucide không có, và đây là dấu hiệu nhận diện mang chức năng.
**C23.** Không badge kiểu "✨ AI-powered", "🚀 Fast", "New!".
**C24.** Không chữ hướng dẫn thừa. Nút đã ghi "Lưu" thì đừng thêm dòng "Bấm để lưu". Không viết chữ lặp lại thứ icon đã nói: có dấu tick rồi thì bỏ chữ "Có" bên cạnh.
**C25.** Không nhồi icon vào nút. Nút mặc định chỉ có chữ.
**C26. Dòng phụ dưới nút phải mang thông tin riêng của từng mục.** Ba dòng giống hệt nhau thì bỏ cả ba.
**C27. Danh sách tính năng dùng dấu tick, không dùng chấm tròn.** Tick nói "gói này có cái đó", chấm tròn không nói gì.
**C28.** Không dấu gạch dài trong copy tiếng Việt. Lộ ngay là AI viết.

**Kỹ thuật**

**C29.** Không rải mã hex trong markup. Mọi màu đi qua token đặt tên theo vai trò.
**C30. Một khái niệm một token.** Mọi đường kẻ và viền đều dùng `--border`. Đừng chỗ thì `divide-border` chỗ thì `border-muted/25`.
**C31.** Không spacing tuỳ hứng, không bo góc tuỳ hứng. Lấy từ `references/budgets.md`.

---

## 2. Mở doc nào khi nào

`SKILL.md` chỉ giữ phần luôn luôn cần. Phần chi tiết nằm trong `references/`,
mở đúng file cần rồi làm, đừng nạp hết.

**Luôn mở, mọi task:**

| Cần | Mở |
| --- | --- |
| Ngân sách và nhịp app khác nhịp trang bán hàng | `references/budgets.md` |
| 25 luật chi tiết về màu, chữ, hình khối, trạng thái | `references/rules.md` |
| **Mọi luật về màn hẹp, 375px** | `references/responsive.md` |
| Bảng màu, font, cách đổi thương hiệu | `references/brand-tokens.md` + `references/tokens.css` |
| Kiểm trước khi báo xong | `references/checklist.md` |

**Mở khi dựng đúng khối đó:**

| Cần dựng | Mở |
| --- | --- |
| Card, widget, panel | `references/card.md` |
| Nút | `references/button.md` |
| Ô nhập, form field | `references/input.md` |
| Dòng trong danh sách | `references/list-row.md` |
| Danh sách rỗng, đang tải | `references/empty-state.md` |
| Chip lọc, nút chỉ có icon | `references/small-controls.md` |
| Khung trang, lưới dashboard | `references/page-layout.md` |
| Biểu đồ, số liệu, thanh tiến độ | `references/charts.md` |

**Mở khi chưa có skeleton, xem mục 0:**

| Loại màn hình | Mở |
| --- | --- |
| Landing, bảng giá, khối tính năng, câu hỏi thường gặp | `references/layouts/sales.md` |
| Đăng nhập, đăng ký, form nhiều trường, trạng thái lỗi | `references/layouts/form.md` |
| Dashboard, danh sách, danh sách rỗng, cài đặt | `references/layouts/app.md` |
| Modal, panel trượt, dropdown, toast | `references/layouts/overlay.md` |
| Bảng giá 3 cột, code mẫu đã duyệt | `references/layouts/sales-pricing-3-cot.html` |
| Bảng kanban, code mẫu đã duyệt | `references/layouts/app-kanban.html` |

---

## 3. Bốn thứ không được quên

Rút gọn từ `references/checklist.md`. Chạy hết checklist đầy đủ trước khi báo xong.

- [ ] Chưa có skeleton mà đã đưa bố cục rồi **chờ** người dùng chọn chưa.
- [ ] Có section nào tự thêm ngoài đề bài không.
- [ ] Grep `gradient`, `backdrop-blur`, `shadow-xl`, `scale-1`, `text-transparent`. Phải sạch.
- [ ] **Kiểm ở 375px. Trang cuộn ngang là hỏng.** Cuộn hết sang phải, phần tử cuối phải còn lề.
- [ ] Khối thương hiệu có chép đúng từng ký tự từ `references/tokens.css` không.

---

## 4. Thêm luật mới thì theo quy tắc này

Skill này đã có lần **tệ đi vì thêm luật**. Luật viết để chữa một triệu chứng
thường đẻ ra triệu chứng khác ở lần dựng sau.

- Mỗi đợt tối đa **5 luật mới**.
- Mỗi luật mới phải nói rõ nó **thay thế** hay **mâu thuẫn** với luật nào đang có.
- Luật phải kèm **điều kiện áp dụng**, không viết luật tuyệt đối. "Trong app thì X, trang bán hàng thì Y" chứ không phải "luôn luôn X".
- Luật nào chưa từng bắt được lỗi thật sau 3 vòng test thì bỏ.
- **Thêm luật xong thì rà lại cả hai file mẫu trong `layouts/`** xem chúng có vi phạm luật vừa thêm không. Code mẫu được chép nguyên, nên một lỗi nằm trong đó sẽ đi khắp nơi. Đã xảy ra thật: `sales-pricing-3-cot.html` mang một viền thừa qua vài vòng mới bị phát hiện.
- **Đánh số liền mạch trong nhóm.** Đừng đẻ `15b`, `15c`, `17d` chen vào giữa. Luật mới thì đánh số tiếp theo trong nhóm của nó, và khi có dịp dọn thì đánh lại cả nhóm.
- **Luật chưa qua vòng test nào thì gắn dấu ⚑** trong `rules.md`, để người dùng biết đang dùng thứ chưa ai thử.
