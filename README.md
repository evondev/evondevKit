# evondevKit

Skill **`ui-ux`** cho Claude Code: dựng và làm đẹp giao diện app (dashboard, danh sách,
bảng, form, cài đặt, modal) theo đúng thư viện component và màu của dự án bạn.

Xem giới thiệu: [evondev-uiux.vercel.app/ui-ux](https://evondev-uiux.vercel.app/ui-ux)

> **Bản beta.** Dùng tốt cho giao diện app nền sáng, đề tiếng Việt: đã qua 70 đề test trên dự
> án thật. Đang test: thêm dark mode cho app đang có, đề tiếng Anh, Codex và Antigravity.
> Skill còn được sửa liên tục từ các lượt test, lấy bản mới bằng
> `/plugin marketplace update evondevkit`.
>
> Skill không hoàn hảo, nó làm tốt nhất có thể theo bộ luật của nó. Gu mỗi người một khác, dự án
> nào cũng có cái riêng: dựng xong bạn chỉnh tay hay nhắn AI sửa đều được.
>
> Gặp chỗ chưa ổn thì [mở issue](https://github.com/evondev/evondevKit/issues), kèm link
> hoặc ảnh màn đó và câu đề bạn đã gõ.

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
| Dựng hay làm lại một màn (mặc định) | `/evon:ui-ux Dựng màn danh sách đơn hàng: mã đơn, khách, tổng tiền, trạng thái.` hoặc `/evon:ui-ux Redesign the jobs page.` | Brief → bạn duyệt → 2–3 wireframe → bạn chọn (ví dụ `C + D`) → dựng. Wireframe có thanh trên cùng: bật màu, thử màu nhấn, xem mobile (bấm ☰ được, có thanh dưới nếu ít mục), xem màn rỗng / lỗi, đọc ưu nhược, chép câu góp ý. Trả lời `ok` là dựng phương án khuyên dùng |
| Dựng luôn, không wireframe | `/evon:ui-ux Dựng luôn màn cài đặt thông báo.` hoặc `… just build it` | Không vẽ wireframe (đỡ tốn token): skill tự chọn phương án nó sẽ khuyên rồi dựng luôn. Lúc giao báo đã chọn bố cục nào, vì sao |
| Chốt design system trước khi dựng nhiều màn | `/evon:ui-ux Dựng design system cho app quản lý phòng khám trước, chưa cần màn nào.` hoặc `… build a design system first` | Token và bảy component nền (nút, badge, ô nhập, card, dòng danh sách, modal, trạng thái rỗng) trên một trang `/design-system`. Không vẽ wireframe, dừng một lần để bạn duyệt. Dự án có shadcn hay bộ riêng thì chỉnh bộ đó. Màn dựng sau ráp từ đúng bộ này |
| Biết UI đang sai chỗ nào | `/evon:ui-ux Xem giúp trang này chỗ nào chưa ổn: http://localhost:3000/orders` | Đưa bảng lỗi có ảnh trước/sau. Bạn trả lời `sửa 1, 3` rồi mới sửa |
| Làm gọn, giữ brand và khung trang | `/evon:ui-ux Dựng lại trang này giữ brand.` | Thay control, làm gọn card, giữ màu của bạn. Trang lướt để chọn hoặc dashboard (công thức B của `P12`) thì có thêm dòng bản có màu. Trả lời `ok` hoặc `bỏ 7` |
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
- **Góp ý wireframe theo số khối**: mỗi khối có số nhỏ ở góc, nhắn "bỏ khối 3", "đưa khối 2 lên đầu".
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

Phát triển skill: xem [DEVELOP.md](DEVELOP.md). Giấy phép [MIT](LICENSE).
