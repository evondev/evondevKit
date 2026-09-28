# evondevKit

Skill **`ui-ux`** cho Claude Code: dựng và làm đẹp giao diện app (dashboard, danh sách,
bảng, form, cài đặt, modal) theo đúng thư viện component và màu của dự án bạn.

## Cài

```bash
/plugin marketplace add evondev/evondevKit
/plugin install evon@evondevkit
```

Gọi bằng `/evon:ui-ux`. Lấy bản mới: `/plugin marketplace update evondevkit`.

## Dùng

Gõ đúng vài chữ khoá là skill đi đúng việc:

| Bạn muốn | Gõ | Skill làm |
| --- | --- | --- |
| Dựng màn mới | `/evon:ui-ux Dựng màn danh sách đơn hàng: bảng mã đơn, khách, tổng tiền, trạng thái; lọc theo trạng thái.` | Dựng luôn, không hỏi. Lúc giao báo đã chọn gì |
| Biết UI đang sai chỗ nào | `/evon:ui-ux Xem giúp trang này chỗ nào chưa ổn: http://localhost:3000/orders` | Đưa bảng lỗi có ảnh trước/sau. Bạn trả lời `sửa 1, 3` rồi mới sửa |
| Làm đẹp lại, giữ màu brand | `/evon:ui-ux Dựng lại giao diện app này theo skill cho đẹp.` | Thay control, làm gọn card, giữ màu của bạn. Trả lời `ok` hoặc `bỏ 7` |
| Đổi hẳn sang dáng của skill | `/evon:ui-ux Dựng lại hoàn toàn theo gu skill, bỏ style cũ.` | Như trên, đổi cả màu, chỉ giữ logo và màu nhấn |
| Nghĩ lại trải nghiệm | `/evon:ui-ux Trang này vẫn chưa ổn về UX. Thiết kế lại từ đầu như một designer.` | Brief → bạn duyệt → 2–3 wireframe → bạn chọn → dựng |
| Dọn code, giữ nguyên hình | `/evon:ui-ux Refactor CSS trang /settings sang Tailwind, giữ nguyên giao diện.` | Đổi class, xoá CSS cũ, so ảnh trước và sau |

Dựng lại giữ nguyên khung trang, chỉ sạch hơn. Làm xong mà thấy "nhìn vẫn như cũ" thì
dùng **thiết kế lại từ đầu**, lối này được đổi cả khung trang.

## Mẹo

- **Đưa link localhost đang chạy.** Skill tự mở trang, đo và chụp từ 375 tới 1920px. Không
  có thì gửi ảnh chụp.
- **Mỗi lượt một trang**, ghi route cụ thể.
- **Dựng mới thì nói dữ liệu thật**: cột, trường, trạng thái rỗng, lỗi.
- **Có wireframe thì gửi kèm**, ghi "ảnh này chỉ là wireframe".
- **Muốn skill tự tìm lỗi thì đừng liệt kê lỗi.**
- **Skill lo hình, bạn lo logic**: gọi API, lưu dữ liệu, định dạng số là việc của bạn.
- **Dữ liệu mẫu nên giống thật.** Ảnh hoạt hình làm giao diện nào cũng trông như bản nháp.

## Kiểm lúc nhận bài

- Bảng lỗi có dòng **"Đối chiếu probe"** ở dưới. Không có là skill chưa chạy đo.
- Thiết kế lại từ đầu có **năm dòng tự soi** lúc giao. Thiếu thì nhắn "soi lại năm câu".

## Skill giữ gì của bạn

- **Component và thư viện của dự án** (shadcn, MUI, bộ nội bộ): dùng cái của bạn, không áp
  bộ khác lên.
- **Màu brand**: giữ, trừ khi bạn nói "bỏ style cũ".
- **Phong cách**: mặc định flat. Muốn glassmorphism, gradient, nền tối thì nói trong đề.
- Không có Tailwind, hay không có `package.json` (HTML thuần, WordPress) vẫn dùng được.

## Dùng với Codex, Antigravity

Chép thư mục `skills/ui-ux` vào `.agents/skills/` của dự án. Không có lệnh `/evon:ui-ux`,
gõ "dùng skill ui-ux" trong đề. Skill mới được test kỹ trên Claude.

---

Phát triển skill: xem [DEVELOP.md](DEVELOP.md).
