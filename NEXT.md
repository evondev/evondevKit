# Việc tiếp theo

Danh sách việc theo thứ tự, cập nhật 29/09/2026. Xong bước nào thì tick, gửi link cho Claude rà
rồi sửa thẳng vào skill. Chi tiết từng đợt test ở `TESTS.md` và `BACKLOG.md`.

Mọi đề test ở dự án khác đều mở đầu bằng: `Đọc ~/dev/evondevKit/skills/ui-ux/SKILL.md rồi …`

## Đang làm: test nhánh U (làm như một designer)

- [ ] **1. `tim-phong-sua`, đề 1.** Bố cục đã dựng xong, giờ soi để làm gọn:

  ```
  Đọc ~/dev/evondevKit/skills/ui-ux/SKILL.md rồi xem giúp trang phòng trọ chỗ nào chưa ổn: http://localhost:5174/phong-tro
  ```

  Chọn dòng (`sửa 1, 3`), sửa xong gửi link rà lại.

- [ ] **2. Dự án trống, đề 2.** Tạo thư mục mới. **Viết đáp án ra giấy trước**: người dùng đến
  màn đó làm gì, bố cục tốt phải có gì. Rồi gõ:

  ```
  Dựng app quản lý lịch hẹn cho phòng khám nha khoa: màn lịch trong ngày và màn hồ sơ bệnh nhân.
  ```

  Không ghi "như một designer". Soi: có dừng đúng hai cổng (brief, wireframe) không, 2–3
  phương án có khác nhau thật không, bản dựng có đúng phương án đã chọn không, có tự thêm thứ
  ngoài đề không. So wireframe với đáp án.

- [ ] **3. Lượt "dựng luôn".** Một thư mục trống khác, cùng đề trên, thêm "Dựng luôn" vào đầu.
  Soi: có bỏ wireframe, dựng thẳng đúng hướng, lúc giao có báo bố cục nào và vì sao không.

## Tiếp theo

- [ ] **4. Test design system trước (`D9`).**
  - Dự án trống: `Dựng design system cho app quản lý phòng khám trước, chưa cần màn nào.`
  - Dự án có shadcn: phải xếp lại bộ đang có, không đẻ bộ thứ hai.
  - Soi: có vào `D9` không, trang `/design-system` dùng chính component hay vẽ lại, có dựng
    thừa mẫu không, có dừng ở cổng duyệt không.
- [ ] **5. Nhánh soi, hai dự án mồi còn lại** (`BACKLOG.md`, Phase 2):
  - Next + shadcn, **ít lỗi**: skill có dám nói "gần như ổn" không, hay bịa cho đủ bảng.
  - Không Tailwind (CSS thuần hoặc CSS Module), glass hoặc nền tối.
- [ ] **6. Dark mode:** 0/7 mục (`TESTS.md`, mục Dark mode).
- [ ] **7. Vòng tiếng Anh:** 0/8 đề (`TESTS.md`, mục Vòng tiếng Anh).
- [ ] **8. Test trên Codex và Antigravity.**
- [ ] **9. Sau cùng:** skill landing page riêng (`evon:landing`), nếu vẫn muốn làm. Không gộp
  vào `ui-ux`.

## Việc lặt vặt, lúc nào rảnh

- [ ] Sửa chữ trên landing page (`~/dev/evondev-kit-landingpage`):
  - "Quét năm khổ màn … từ 1920 xuống 375px": probe đo 6 khổ (có 1024), `--sweep` quét
    1440 → 375.
  - Thẻ luật "Một màu nhấn, một nút chính" ghi `M3 · I1 · I3`, không chỉ `M3`.
  - "Mỗi luật … sinh ra từ một lỗi đã thật sự xảy ra" → "nhiều luật sinh ra từ lỗi đã gặp".
  - U4 "chạy probe tới khi danh sách lỗi trống" → thêm "tối đa ba vòng".
  - Gom 7 lối vào thành 3 nhóm: Dựng mới / Làm lại UI đang có / Dọn code.
  - Xác nhận câu "Không chỉnh tay sau khi dựng" ở showcase, và đường dẫn cài trên Codex,
    Antigravity.
- [ ] Thêm file `LICENSE` (MIT) vào repo, hiện chỉ khai trong `plugin.json`.
- [ ] `ui-ux-dashboard`: khung Select chưa có chuyển động mở đóng (probe báo, `overlay.md`
  bắt có).
- [ ] Xong một đợt test ổn thì tăng `version` trong `.claude-plugin/plugin.json` rồi push, để
  người đã cài nhận bản mới (`DEVELOP.md`, "Ra bản mới").
