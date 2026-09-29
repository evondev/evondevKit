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

Mặc định skill làm như một designer: **brief → bạn duyệt → 2–3 wireframe → bạn chọn → dựng**.
Viết đề tiếng Việt hay tiếng Anh đều vậy. Muốn đi lối khác thì nói rõ trong đề:

| Bạn muốn | Gõ | Skill làm |
| --- | --- | --- |
| Dựng hay làm lại một màn (mặc định) | `/evon:ui-ux Dựng màn danh sách đơn hàng: mã đơn, khách, tổng tiền, trạng thái.` hoặc `/evon:ui-ux Redesign the jobs page.` | Brief → bạn duyệt → 2–3 wireframe, kèm bản gọn chữ và bản có màu → bạn chọn (ví dụ `C + D + G`) → dựng |
| Dựng luôn, không wireframe | `/evon:ui-ux Dựng luôn màn cài đặt thông báo.` hoặc `… just build it` | Dựng một bố cục mặc định, không hỏi. Lúc giao báo đã chọn gì |
| Biết UI đang sai chỗ nào | `/evon:ui-ux Xem giúp trang này chỗ nào chưa ổn: http://localhost:3000/orders` | Đưa bảng lỗi có ảnh trước/sau. Bạn trả lời `sửa 1, 3` rồi mới sửa |
| Làm gọn, giữ brand và khung trang | `/evon:ui-ux Dựng lại trang này giữ brand.` | Thay control, làm gọn card, giữ màu của bạn. Trang lướt để chọn thì có thêm dòng bản có màu. Trả lời `ok` hoặc `bỏ 7` |
| Đổi hẳn sang dáng của skill | `/evon:ui-ux Dựng lại hoàn toàn theo gu skill, bỏ style cũ.` | Như trên, đổi cả màu, chỉ giữ logo và màu nhấn |
| Dọn code, giữ nguyên hình | `/evon:ui-ux Refactor CSS trang /settings sang Tailwind, giữ nguyên giao diện.` | Đổi class, xoá CSS cũ, so ảnh trước và sau |

Việc nhỏ hơn một màn (sửa một component, thêm một dropdown, sửa một lỗi) thì skill làm luôn,
không qua wireframe.

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
