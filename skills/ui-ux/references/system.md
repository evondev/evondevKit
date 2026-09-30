# Nhiều màn hình — luật D

Mở file này khi đề bài **nhiều hơn một bề mặt**, hoặc đề đòi dựng design system trước
(`D9`). Một câu như *"dựng kanban board
quản lý công việc và table quản lý project, có đủ CRUD"* không phải hai màn, mà
là khoảng **tám bề mặt**: board, thẻ, cột rỗng, bảng, dòng bảng, form tạo, form
sửa, hộp xác nhận xoá, bộ lọc.

**Chẩn đoán gốc:** design system quy định màu và cỡ chữ. Nó **không** quy định
rằng thẻ kanban và dòng bảng phải nói cùng một ngôn ngữ. Từng màn đều hợp lệ,
ghép lại thành hai app khác nhau.

Phàn nàn thật từ một người dùng: *có config design system sẵn mà output vẫn không
đồng bộ giữa các màn · không đẹp, AI cứ chọn màu xám tối · phải prompt chỉnh
nhiều lần.*

---

## D1. Định nghĩa hợp đồng nguyên tố TRƯỚC, một lần, cho cả bộ

Trước khi dựng màn đầu tiên, khai ra bảy nguyên tố dưới đây. Mọi màn sau dùng
đúng bộ đó. **Cấm đẻ biến thể giữa chừng.**

| Nguyên tố | Phải chốt |
| --- | --- |
| Nút | bốn dạng ở `I1`, cỡ, có icon hay không |
| Badge trạng thái | hình dạng, nền hay chỉ chữ màu, cỡ chữ |
| Ô nhập | chiều cao, viền, hành vi lúc focus |
| Card | padding, bo góc, có viền hay không |
| Dòng danh sách | chiều cao, padding, hành vi hover |
| Modal | bề rộng, chỗ đặt nút, có cho bấm ra ngoài không |
| Trạng thái rỗng | icon, tiêu đề, câu phụ, có nút không |

Viết bảy dòng này ra **trong lượt trả lời**, trước khi viết HTML. Nó dài chưa tới
mười lăm dòng và nó cứu cả đợt dựng.

Project đã có thư viện component thì bảng này chính là **danh sách component
phải đi tìm**, không phải danh sách phải viết. Xem `S9`.

---

## D2. Một bảng ánh xạ trạng thái duy nhất

`todo` / `doing` / `done`, mức ưu tiên, vai trò — khai **một chỗ** thành cặp
*nhãn + màu*, dùng y hệt ở mọi bề mặt.

Cấm board dùng badge nền màu còn bảng dùng chấm tròn. Cùng một trạng thái mà hai
hình dạng thì người dùng phải học hai lần.

```
STATUS = {
  todo:   { nhãn: "Cần làm",   màu: xám,      icon: "circle" },
  doing:  { nhãn: "Đang làm",  màu: xám,      icon: "circle-dot" },
  review: { nhãn: "Chờ duyệt", màu: hổ phách, icon: "circle-ellipsis" },
  done:   { nhãn: "Xong",      màu: xanh lá,  icon: "circle-check" },
}
```

Màu vẫn theo `M4`: đây là trạng thái thật, nên được dùng màu. Bốn tông và hình
badge lấy đúng bảng trong `M7`; "Đang làm" xám chứ không hổ phách, vì hổ phách là
"cần chú ý" và xanh để dành cho "xong" (bản cũ ghi hổ phách, lệch `M7`). Hai trạng
thái cùng tông thì tách bằng icon, bảng icon cũng ở `M7`.

**Trạng thái làm tiêu đề thì cùng một hình ở mọi view.** Hàng nhóm của bảng và đầu
cột kanban là **icon + tên + số đếm**, không pill; trạng thái làm giá trị một ô thì
mới là pill. Bảng nhóm dùng pill còn kanban chỉ chữ trơn là cùng một trạng thái hai
hình (đã dính 24/09/2026).

---

## D3. CRUD dùng một bộ khuôn

- **Tạo và sửa dùng CÙNG một form.** Chỉ khác tiêu đề và chữ trên nút. Hai form
  riêng là hai chỗ để lệch nhau.
- **Xoá mà khôi phục được** (thùng rác, xoá mềm) thì **xoá ngay + toast "Hoàn tác"**, như
  Các app lớn: hộp xác nhận cho mọi thùng rác dạy người ta bấm "Đồng ý" không
  đọc. **Hộp xác nhận** chỉ khi không lấy lại được, hoặc xoá nhiều dòng một lúc. Khôi
  phục được hay không là logic, người dùng quyết (`N10`); đề không nói thì hỏi một dòng
  lúc giao. Xem `layouts/overlay.md`.
- Hộp xác nhận bắt **gõ lại một cụm từ** chỉ dựng khi đề yêu cầu (quyết định sản
  phẩm, không phải mặc định), **trừ việc xoá cả không gian** (workspace, tổ chức): việc đó
  mất dữ liệu của mọi thành viên, nên mặc định bắt gõ lại tên, nút xoá mở khoá khi khớp.
  Tra 26/09/2026: các sản phẩm lớn đều thêm một bước ngoài hộp hỏi thường cho việc này (gõ
  tên là cách hay gặp nhất; có nơi gửi mã qua email hoặc hỏi mật khẩu). Khi có ô gõ đó thì
  không cho bấm ra ngoài để đóng (`I20`). Khuôn hộp và ô ở `layouts/overlay.md`.

---

## D4. Nhiều màn thì báo bố cục MỘT LẦN cho cả bộ

Đề nhiều màn vào nhánh `U` như mọi đề dựng (`SKILL.md` câu 1): `U2` mỗi màn một dòng,
wireframe cho cả bộ, rồi hợp đồng nguyên tố `D1` chốt ở `U4` trước khi dựng màn đầu tiên.
Bố cục mặc định của từng loại màn chỉ dùng thẳng ở lối "dựng luôn" hoặc việc nhỏ hơn một
màn. Lúc giao báo **một** đoạn: liệt kê các bề mặt đã dựng, màn chính theo phương án nào,
bề mặt phụ (form, hộp xác nhận, trạng thái rỗng) theo khuôn chung nào. Muốn đổi thì người
dùng nói.

---

## D5. Màu nhấn phải thật sự xuất hiện

Liệt kê ra nó được dùng ở đâu. Cả bộ màn không có chỗ nào dùng màu nhấn thì đó
là **chưa quyết định**, không phải tối giản.

Khác biệt nằm đúng ở đây: xám tối **có chủ ý** thì màu nhấn vẫn xuất hiện ở nút
chính, ở trạng thái đang chọn, ở link. Xám tối **vì chưa quyết định** thì cả
trang không có chỗ nào dùng màu nhấn, và nó đọc ra là một bản nháp.

`M2` nói 5% điểm nhấn. **5% không phải 0%.**

---

## D6. Đặt tên khu vực rồi dùng đúng tên đó suốt

Hệ thống nhiều màn luôn có một khung chung: cột trái, vùng nội dung, cột phải,
thanh trên mobile, thanh dưới mobile. Đặt tên một lần, ghi ra, rồi dùng đúng tên
đó trong mọi câu trả lời sau.

Nghe như chuyện nhỏ, nhưng ở một dự án thật đây là mục **đầu tiên** của `AGENTS.md`,
vì không có nó thì mỗi lượt lại phải mô tả lại "cái cột bên trái ấy" và mỗi lần
mô tả lại lệch một chút.

Kèm theo tên thì ghi luôn **code chết**: component nào không được import ở đâu
nữa, để lượt sau không hồi sinh nó.

---

## D7. Khung chung thì sửa sau cùng, hoặc không sửa

Thứ tự đụng vào, từ ít liên đới nhất tới nhiều nhất:

1. Khối đã tự gom theo feature
2. Trang có ít selector
3. Trang lớn
4. Thứ dùng chung khắp nơi — shell, sidebar, modal

Xem `refactor.md` luật `L8` để biết cách đếm quy mô trước khi chọn.

---

## D8. Nội dung lặp lại ở nhiều màn phải có một component

Dấu hiệu: cùng một "thẻ khoá học" xuất hiện ở trang danh sách, trang tìm kiếm,
và cột phải. Ba chỗ đó mà ba lần viết thì chắc chắn ba lần lệch.

Tách thành một component nhận prop, rồi mỗi chỗ chỉ đổi kích thước qua
`className`. Cỡ chữ tên thẻ phải **giống nhau ở mọi breakpoint và mọi chỗ đặt** —
xem `T8`, vì tiêu đề khối được tính theo nó.

---

## D9. Đề "dựng design system trước": nền trước, màn sau ⚑

Đề nói **"design system"**, "dựng component trước", "UI kit", "chốt token, spacing,
typography rồi mới dựng màn", "build a design system", "component library first" thì vào
đây (`SKILL.md` câu 1), **không vào nhánh `U`**: design system không có bố cục để vẽ
wireframe, thứ cần duyệt là hình của từng nguyên tố. Hợp đồng `D1` ở lối này không còn là
bảy dòng chữ trong lượt trả lời, mà thành code thật và một trang xem được.

1. **Audit câu 2 như mọi lối.** Dự án đã có token hay thư viện component (shadcn, MUI, bộ
   nội bộ) thì design system là **xếp lại cái đang có**: token của họ vào hai vai viền
   `M14`, component của họ chỉnh token cho khớp (`S9`). Không dựng bộ thứ hai cạnh bộ cũ.
2. **Brief một khối, không dừng**: sản phẩm, người dùng, màu nhấn, font, phong cách (`P1`),
   chỉ sáng hay có tối (`M20`), ngôn ngữ của copy (`T24`). Đề không nói thì lấy mặc định
   của `brand-tokens.md` (gần đen, Inter, flat, chỉ sáng) và ghi vào brief. Dự án chưa có
   màu brand thì trang design system có nhóm ba màu gợi ý, như nhóm Nhấn trên thanh
   wireframe (`design-process.md`, `U3`).
3. **Token**: chép `tokens.css` vào file token của dự án theo `brand-tokens.md`, chỉ sửa
   khối font và màu nhấn. Thang cỡ chữ, nhịp, chiều cao control lấy từ `budgets.md`; bo
   góc theo `F1`, `M19`. **Không đẻ thang hay token mới** (`M14`, `M16`): bộ của skill đã
   qua test, nghĩ lại từ đầu là mất phần đó.
4. **Component: bảy nguyên tố của `D1`** (nút, badge trạng thái, ô nhập, card, dòng danh
   sách, modal, trạng thái rỗng), **cộng những gì đề nêu tên**. Mỗi cái chép công thức từ
   file mẫu của nó (bảng "Mở khi dựng đúng khối đó", mục 2 của `SKILL.md`), đặt theo quy
   ước thư mục của dự án. Không dựng hết các mẫu cho "đủ bộ" (`S1`); lúc giao liệt kê
   những mẫu còn sẵn, cần cái nào thì gọi tên.
5. **Một trang xem design system**: route `/design-system` (dự án có Storybook thì viết
   story thay cho trang; không có app thì một file HTML). Thứ tự khối:
   - **Màu**: ô màu kèm tên token và mã; cặp chữ trên nền chính kèm tỉ lệ tương phản. Cột
     tỉ lệ chỉ ghi số; **chỉ cặp trượt mới có nhãn** ("Dưới 4.5:1", màu cảnh báo), cặp đạt
     để trống. Mười một dòng "Đạt AA" xanh giống nhau là một ý nói mười một lần, mắt phải dò
     hết cột mới biết có cặp nào trượt không (đã dính 30/09/2026, trang design system phòng
     khám).
   - **Chữ**: từng bậc của thang cỡ chữ, viết bằng câu thật theo ngôn ngữ của dự án (tiếng
     Việt thì có đủ dấu, `T5`), ghi cỡ và độ đậm.
   - **Khoảng cách, bo góc, viền, bóng**: các bậc đang dùng, hai vai viền đặt cạnh nhau,
     bóng của lớp nổi.
   - **Từng component**, mỗi trạng thái một ví dụ tĩnh đặt cạnh nhau (thường, rê, focus,
     khoá, đang tải, lỗi), không bắt bấm mới thấy. Trang dùng **chính component vừa
     dựng**, không vẽ lại cho đẹp: trang đẹp mà component lệch thì duyệt nhầm.
     **Nhãn trạng thái ("Thường", "Rê", "Đang gõ", "Lỗi", "Khoá") nằm cùng một chỗ ở mọi
     khối**: chữ nhỏ `text-xs text-muted` ngay trên ví dụ. Không đặt nhãn vào chỗ câu gợi ý
     hay câu lỗi dưới ô nhập: "Đang gõ" nằm dưới ô trông y như câu gợi ý thật của ô đó. Ô
     nhập bày cạnh nhau thì cách nhau như trong form thật (`gap-y-5` trở lên), không `gap-y-2`:
     câu gợi ý của ô trên chỉ cách nhãn ô dưới 10px, đọc ra là nhãn của ô dưới (đã dính
     30/09/2026, khối Ô nhập: nút có nhãn trạng thái ở trên, ô nhập thì nhãn nằm dưới ô,
     hàng cách nhau 10px).

   Trang là công cụ để duyệt: flat như gu skill, không hero, không lời quảng cáo.
6. **Probe trang đó** (`--sweep`) tới khi danh sách `P` trống, tối đa ba vòng.
7. **Cổng duy nhất của lối này**: gửi link, kèm một dòng *"Duyệt thì trả lời `ok`. Muốn đổi
   màu nhấn, font, bo góc thì nói: đổi ở token, mọi component đổi theo."* Dừng chờ.

Duyệt xong thì màn sau đi lối bình thường (mặc định nhánh `U`). `U4` ráp từ đúng các
component đã duyệt; bảng `D1` coi như đã chốt, không khai lại. Đề vừa đòi design system vừa
đòi màn ("dựng design system rồi dựng màn đơn hàng") thì làm hết lối này, qua cổng, rồi mới
vào `U1` cho màn.
