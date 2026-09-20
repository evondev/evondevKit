# Backlog

## ĐÃ LÀM: dựng nhiều màn hình trong một lượt

**Xong 20/09/2026.** Năm luật đề xuất bên dưới đã thành `references/system.md`
(nhóm `D`, 8 luật). Giữ lại phần chẩn đoán vì nó là nguồn của cả nhóm đó, và vì
vòng test `V25` trong `TESTS.md` chấm đúng theo nó.

Ánh xạ: hợp đồng nguyên tố → `D1` · bảng ánh xạ trạng thái → `D2` · CRUD một bộ
khuôn → `D3` · hỏi bố cục một lượt → `D4` · màu nhấn phải xuất hiện → `D5`.

<details>
<summary>Chẩn đoán gốc, giữ nguyên</summary>

**Nguồn:** một user thật kể lại. Họ gõ một câu "dựng UI kanban board quản lý
công việc và table quản lý project, có đủ CRUD". Ba phàn nàn:

1. Có config design system sẵn mà output vẫn không đồng bộ giữa các màn.
2. Không đẹp, và AI cứ chọn màu xám tối.
3. Phải prompt chỉnh nhiều lần.

**Chẩn:** cả 9 vòng test từ trước tới nay đều là một màn hình. Một câu đó cần
khoảng 8 bề mặt: board, thẻ, cột rỗng, table, dòng table, form tạo, form sửa,
hộp xác nhận xoá, bộ lọc. Design system quy định màu và cỡ chữ, không quy định
thẻ kanban với dòng table phải cùng ngôn ngữ. Từng màn hợp lệ, ghép lại như hai
app khác nhau.

Riêng chuyện "xám tối": mặc định của skill đúng là gần đen. Khác biệt nằm ở chỗ
xám tối có chủ ý thì màu nhấn vẫn xuất hiện ở nút chính, trạng thái đang chọn,
link. Xám tối vì chưa quyết định thì cả trang không có chỗ nào dùng màu nhấn.

**Năm luật đề xuất:**

1. **Hợp đồng nguyên tố.** Yêu cầu nhiều hơn một màn thì định nghĩa một lần cho
   cả bộ: nút, badge trạng thái, ô nhập, card, dòng, modal, danh sách rỗng. Mọi
   màn sau dùng đúng bộ đó, cấm đẻ biến thể giữa chừng. *Bổ sung luật 18.*
2. **Một bảng ánh xạ trạng thái duy nhất.** `todo/doing/done`, mức ưu tiên: khai
   một chỗ thành cặp nhãn + màu, dùng y hệt ở mọi bề mặt. Cấm board dùng badge
   nền màu còn table dùng chấm tròn. *Siết luật 5.*
3. **CRUD một bộ khuôn.** Tạo và sửa dùng cùng một form, chỉ khác tiêu đề và
   nút. Xoá luôn là hộp xác nhận theo `layouts/overlay.md`. *Mới.*
4. **Nhiều màn thì hỏi bố cục một lượt cho cả bộ**, không hỏi 8 lần. *Sửa mục 0,
   vì mục 0 đang ngầm giả định một màn hình.*
5. **Màu nhấn phải thật sự xuất hiện.** Liệt kê nó dùng ở đâu. Cả trang không có
   chỗ nào dùng màu nhấn là chưa quyết định, không phải tối giản. *Mới.*

Kèm doc mới `references/multi-screen.md`: mẫu hợp đồng nguyên tố để chép, và một
ví dụ cho đúng bộ kanban + table.

</details>

---

## Thư viện ảnh đối chiếu

Chưa dựng. Cấu trúc đã chốt:

```
ui-corpus/
├── ai-ui/            trang trông như AI đẻ
├── good-ui/          sản phẩm ship thật (Linear, Stripe, Vercel, Raycast...)
└── pretty-unusable/  Dribbble, đẹp nhưng không chạy được với dữ liệu thật
```

Trong mỗi thư mục chia theo loại màn hình: `pricing/`, `settings/`, `list/`,
`form/`, `dashboard/`.

Hai điều kiện để nó có giá trị:

- Mỗi ảnh kèm **một dòng do người viết**, nói vì sao nó nằm ở thư mục đó. Ảnh
  không tự nói được. Với web thật thì lưu kèm CSS thật từ devtools, để số liệu
  là số thật chứ không phải số đoán từ hình.
- Ưu tiên **cặp đối chiếu** cùng loại màn hình, một tốt một xấu. Luật sắc nhất
  từ trước tới nay đều sinh ra từ lúc đặt hai ảnh cạnh nhau.

**Đừng lấy Dribbble làm `good-ui`.** Đó là tranh portfolio, không có dữ liệu
dài, không có trạng thái lỗi, không có tiếng Việt làm vỡ dòng. Và nhiều mốt
Dribbble chính là thứ mục 1 đang cấm.
