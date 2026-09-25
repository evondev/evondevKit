# Nhiều màn hình — luật D

Mở file này khi đề bài **nhiều hơn một bề mặt**. Một câu như *"dựng kanban board
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
  phẩm, không phải mặc định). Khi có ô gõ đó thì không cho bấm ra ngoài để đóng (`I20`).

---

## D4. Nhiều màn thì báo bố cục MỘT LẦN cho cả bộ

`SKILL.md` mục 0 ngầm giả định một màn hình. Với đề nhiều màn, dựng cả bộ theo
bố cục mặc định của từng loại màn, rồi báo **một** đoạn lúc giao: liệt kê các bề
mặt đã dựng, màn chính theo bố cục nào, bề mặt phụ (form, hộp xác nhận, trạng
thái rỗng) theo khuôn chung nào. Muốn đổi thì người dùng nói.

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
