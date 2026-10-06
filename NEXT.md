# Việc tiếp theo

Danh sách việc theo thứ tự, cập nhật 29/09/2026. Làm từ trên xuống, xong bước nào tick bước đó.
Chi tiết từng đợt test ở `TESTS.md` và `BACKLOG.md`.

**Hai quy ước dùng cho mọi bước:**

- Test ở dự án khác thì **mở phiên Claude Code mới** trong thư mục dự án đó. Đề luôn mở đầu
  bằng `Đọc ~/dev/evondevKit/skills/ui-ux/SKILL.md rồi …` để skill đọc thẳng từ repo này.
- Xong mỗi lượt test, mở Claude Code **trong `~/dev/evondevKit`** và gửi link để rà, sửa
  thẳng vào skill:

  ```
  Đọc REVIEW.md rồi rà <link localhost của trang vừa dựng>
  ```

---

## Đang làm: test nhánh U (làm như một designer)

### [x] 1. `tim-phong-sua`: soi bản vừa dựng lại

Bố cục theo wireframe C đã xong. Bước này làm gọn phần còn chưa đẹp (badge…).

1. Mở terminal ở `~/dev/audit-skills/tim-phong-sua`. Dev server chưa chạy thì `npm run dev`
   (trang ở `http://localhost:5174/phong-tro`).
2. Mở phiên Claude Code mới ở thư mục đó, gõ:

   ```
   Đọc ~/dev/evondevKit/skills/ui-ux/SKILL.md rồi xem giúp trang phòng trọ chỗ nào chưa ổn: http://localhost:5174/phong-tro
   ```

3. Chờ bảng lỗi có ảnh trước / sau. Đọc từng dòng, trả lời số dòng muốn sửa, ví dụ
   `sửa 1, 3, 5`. Dòng về badge nên nằm trong bảng; không có thì ghi lại, đó là lỗi của skill.
4. Nó sửa xong thì mở trang tự xem ở desktop và thu cửa sổ về cỡ điện thoại.
5. Gửi link cho Claude ở evondevKit rà (quy ước ở đầu file).

### [x] 2. Dự án trống: đề phòng khám nha khoa

Xong 30/09/2026 ở `~/dev/audit-skills/quan-ly-lich-hen`: lịch khớp 4/4 (wireframe thiếu "trễ", dặn thêm ở cổng 2), hồ sơ 2/3. Kết quả ở `~/dev/phase2-dapan/nha-khoa/dap-an.md`.

Test skill tự nghĩ bố cục cho sản phẩm mới, không có UI cũ để bám.

1. Tạo dự án:

   ```bash
   cd ~/dev/audit-skills
   npx create-next-app@latest nha-khoa --ts --tailwind --app --eslint --use-npm --yes
   cd nha-khoa && npm run dev
   ```

2. **Viết đáp án TRƯỚC khi gõ đề**, lưu ở `~/dev/phase2-dapan/nha-khoa/dap-an.md` (ngoài
   mọi repo, để skill không đọc trúng). Mẫu:

   ```markdown
   ## Màn lịch trong ngày
   - Ai dùng, để làm gì: lễ tân xem giờ nào ai đến, ghế nào trống.
   - Phải thấy ngay: giờ, tên bệnh nhân, bác sĩ / ghế, trạng thái (đã đến, trễ, chưa đến).
   - Nổi bật: lịch hẹn trễ, chưa đến.
   - Nút chính: Thêm lịch hẹn.

   ## Màn hồ sơ bệnh nhân
   - Ai dùng, để làm gì: bác sĩ xem trước khi khám.
   - Trên cùng: dị ứng, tiền sử, lưu ý.
   - Dưới: lịch sử điều trị theo thời gian.
   ```

3. Mở phiên Claude Code mới trong `nha-khoa`, gõ (**không** ghi "như một designer"):

   ```
   Đọc ~/dev/evondevKit/skills/ui-ux/SKILL.md rồi dựng app quản lý lịch hẹn cho phòng khám nha khoa: màn lịch trong ngày và màn hồ sơ bệnh nhân.
   ```

4. **Cổng 1, brief:** skill gửi brief và việc chính của từng màn rồi dừng. So với đáp án:
   đúng thì trả lời `ok`, sai chỗ nào thì sửa trong câu trả lời.
5. **Cổng 2, wireframe:** skill gửi 2–3 link wireframe rồi dừng. Mở từng link, thử thanh
   trên cùng: đổi A / B / C, bật Màu, xem Mobile, xem Rỗng / Lỗi, đọc Ưu nhược. Soi:
   - 2–3 phương án có khác nhau thật về bố cục không, hay chỉ khác màu.
   - Có phương án nào khớp đáp án không.

   Chọn một phương án, ví dụ `B + D` hoặc `A + E + có màu`.
6. **Bản dựng:** soi tin giao có đủ không: dòng `Audit:`, bảng "Đối chiếu wireframe",
   các dòng tự soi năm câu, "Muốn chỉnh thì nhắn". Mở localhost xem bản dựng có đúng
   phương án đã chọn, có tự thêm thứ ngoài đề không.
7. Ghi kết quả ngắn vào đáp án (khớp mấy ý, thiếu ý nào), rồi gửi link cho Claude rà.

### [x] 3. Lượt "dựng luôn"

Xong 30/09/2026 ở `~/dev/audit-skills/nha-khoa-dung-luon` (cổng 3003): không wireframe, không dừng hỏi, tin
giao có "Muốn xem hướng khác thì nhắn `vẽ wireframe`". Lịch ra đúng lưới giờ theo bác sĩ như phương án A bước 2;
hồ sơ theo khuôn trang chi tiết. Rà ra bốn lỗi skill (đã sửa): cột phải trang chi tiết mở theo `xl:` làm cột
chính còn 616px ở 1280px; nhãn–giá trị hai cột trong cột phải 310px; card Liên hệ đứng trước Y tế; lưới giờ
khoá một cột dưới `@3xl` dù bốn cột vừa ở 768px. Thêm: lỗi dáng có luật không được đẩy vào "Còn thấy".

Test nhánh bỏ wireframe.

1. Tạo dự án như bước 2, tên `nha-khoa-dung-luon`.
2. Phiên Claude Code mới, gõ:

   ```
   Đọc ~/dev/evondevKit/skills/ui-ux/SKILL.md rồi dựng luôn app quản lý lịch hẹn cho phòng khám nha khoa: màn lịch trong ngày và màn hồ sơ bệnh nhân.
   ```

3. Soi:
   - **Không** vẽ wireframe, **không** dừng hỏi.
   - Tin giao có dòng *"Bố cục: … vì …. Muốn xem các hướng khác thì nhắn `vẽ wireframe`."*
   - Bố cục có giống phương án skill khuyên ở bước 2 không.
4. Gửi link cho Claude rà.

---

## Tiếp theo

### [x] 4. Design system trước (`D9`)

Xong 30/09/2026. 4a (`phong-kham-ds`, cổng 3002) và 4b (`phong-kham-shadcn`, cổng 3005) đều dừng đúng một lần,
không wireframe. 4b không dựng `Button` thứ hai, `Audit:` có shadcn. 4a đổi màu nhấn sang xanh ngọc chỉ sửa khối
"MÀU NHẤN", mọi component đổi theo; màn lịch hẹn sau đó đi nhánh U (brief, wireframe, chọn B) và ráp từ đúng
component đã duyệt. Sửa skill: card chứa dòng có nền rê (`isFlushList`), nhãn trạng thái một chỗ, bảng tương phản
chỉ đánh dấu cặp trượt, ví dụ ép trạng thái bọc `inert data-demo-state`, shadcn `--muted` là nền; nút viền rê theo
nền phía sau (card `#f1f1f3`, nền trang `#e4e4e7`, chủ dự án chỉ ra), nút chính lên cuối hàng trên khi hàng công
cụ tách hai, ‹ › ghost, badge có màu sắc cách ~45°; probe bắt nền rê gần bằng nền phía sau, bỏ bốn kiểu báo nhầm.

**4a. Dự án trống**

1. Tạo dự án như bước 2, tên `phong-kham-ds`.
2. Phiên mới, gõ:

   ```
   Đọc ~/dev/evondevKit/skills/ui-ux/SKILL.md rồi dựng design system cho app quản lý phòng khám trước, chưa cần màn nào.
   ```

3. Soi:
   - Brief một khối, **không** dừng hỏi. **Không** vẽ wireframe.
   - Token nằm trong `globals.css`, có đủ bảy component: nút, badge, ô nhập, card, dòng
     danh sách, modal, trạng thái rỗng. **Không** dựng thừa mọi mẫu.
   - Có trang `/design-system`: màu, chữ, khoảng cách, bo góc, rồi từng component với đủ
     trạng thái đặt cạnh nhau.
   - Dừng đúng một lần, chờ duyệt.
4. Thử đổi token: trả lời `đổi màu nhấn sang xanh ngọc`. Xem mọi component có đổi theo không.
5. Trả lời `ok`, rồi gõ tiếp để xem màn sau có ráp từ design system không:

   ```
   Giờ dựng màn lịch hẹn trong ngày.
   ```

   Đúng là đi nhánh U (brief, wireframe), và bản dựng dùng lại đúng component đã duyệt.

**4b. Dự án có shadcn**

1. Tạo dự án rồi cài shadcn:

   ```bash
   cd ~/dev/audit-skills
   npx create-next-app@latest phong-kham-shadcn --ts --tailwind --app --eslint --use-npm --yes
   cd phong-kham-shadcn
   npx shadcn@latest init
   npx shadcn@latest add button input card badge dialog checkbox select
   ```

2. Phiên mới, gõ cùng đề như 4a.
3. Soi: **không** tạo `Button` thứ hai cạnh `components/ui/button.tsx`, mà chỉnh token và
   component shadcn đang có. Dòng `Audit:` có nói đã thấy shadcn.
4. Gửi link cho Claude rà.

### [ ] 5. Nhánh soi: hai dự án mồi còn lại

Quy tắc chung ở `BACKLOG.md`, mục "Test cho phase 2". Cả hai dự án đã xong vòng 1 (hai lượt:
tự mở trang và chỉ đưa ảnh) và đã sửa skill theo kết quả. Còn **vòng 2, chỉ lượt tự mở trang**,
để xem probe và luật mới có ăn không. Kết quả, chỗ đã sửa ở dòng dự án 2, 3 trong `BACKLOG.md`.

Cả hai repo đang sạch, không có file tắt skill. Nếu phiên soi lỡ sửa code thì
`git checkout .` trong repo đó trước khi chạy lại.

**5a. `~/dev/audit-skills/lich-kham`** (Next + shadcn, 8 lỗi: 5 Hỏng, 3 Lệch hệ)

Vòng 2 xong (30/09/2026): 8/8, không báo nhầm. Không cần chạy thêm.

Vòng 1: tự mở trang 5/8 (báo nhầm 3), chỉ đưa ảnh 6/6 (báo nhầm 1). Test chính: skill có dám
nói "gần như ổn, chỉ có N chỗ" không, hay bịa lỗi cho đủ bảng.

1. `cd ~/dev/audit-skills/lich-kham && npm run dev`, xem cổng in ra (thường là 3000).
2. Phiên Claude Code mới trong `lich-kham`, gõ (đổi cổng nếu khác):

   ```
   Đọc ~/dev/evondevKit/skills/ui-ux/SKILL.md rồi xem giúp app này chỗ nào chưa ổn: http://localhost:3000/, http://localhost:3000/lich-hen, http://localhost:3000/benh-nhan/bn-00123, http://localhost:3000/cai-dat
   ```

   **Không** trả lời số dòng, chỉ lấy bảng. Chép bảng ra
   `~/dev/phase2-dapan/lich-kham/ket-qua-vong-2.md`.
3. Mở Claude Code ở evondevKit, gõ:

   ```
   Chấm bảng soi vòng 2 của lich-kham: đáp án ~/dev/phase2-dapan/lich-kham/dap-an.md, kết quả ket-qua-vong-2.md cùng thư mục, so với vòng 1. Đếm bắt sót, báo nhầm, rồi sửa skill.
   ```

**5b. `~/dev/audit-skills/kho-hang`** (Vite + React + CSS Modules, nền tối kiểu kính, 9 lỗi: 6 Hỏng, 3 Lệch hệ)

Vòng 1: tự mở trang 5/9, chỉ đưa ảnh 6/7, báo nhầm 1 mỗi lượt (hai nút chính xếp Lệch hệ).
Test chính: chấm Lệch hệ khi không có utility, không kéo về flat, giữ nền tối.

Vòng 2 xong (30/09/2026): 8/9, không báo nhầm. Sót H4 (dialog "Tạo phiếu" ở 375), đã sửa probe.
Muốn kiểm bản sửa thì chạy vòng 3 y như 5a bước 1–3, đổi tên dự án, cổng 5173, route
`/`, `/san-pham`, `/nhap-xuat`, `/cai-dat`.

**5c. Làm lại có wireframe trên dự án có sẵn: `kho-hang`, trang `/nhap-xuat`**

Xong 30/09/2026 (nhánh `lam-lai`): đạt cả năm ý soi. Wireframe và bản dựng giữ nền tối, kính, màu
chanh; chỉ CSS Modules + token (thêm một token `--surface-hover-strong`), dùng lại `GlassCard`,
`StatusBadge`, `SegmentedTabs`, `Dialog`; H4, H5, L3, G2 sạch; không đề xuất chế độ sáng; probe
không ra mục Hỏng nào. Sót một chỗ: thêm ba số âm không comment (`N11`) vì lệnh grep ở cổng 3 chỉ
bắt class Tailwind, đã thêm dòng grep cho CSS vào `checklist.md`.

Nhánh `U` trên app đã có UI mới chạy ở `tim-phong-sua` (Tailwind, nền sáng). Ở đây app nền tối kiểu
kính, CSS Modules, không Tailwind: xem wireframe và bản dựng có bám hệ của app không, hay kéo về flat
nền sáng, chèn class Tailwind. Đề **không** ghi "giữ brand" (chữ đó đi chế độ dựng lại giữ brand, không
có wireframe).

1. `cd ~/dev/audit-skills/kho-hang && git checkout -b lam-lai`, rồi `npm run dev`.
2. Phiên Claude Code mới trong `kho-hang`, gõ:

   ```
   Đọc ~/dev/evondevKit/skills/ui-ux/SKILL.md rồi làm lại trang nhập – xuất cho đẹp: http://localhost:5173/nhap-xuat
   ```

   Qua hai cổng như thường: duyệt brief, chọn wireframe.
3. Soi:
   - Wireframe dùng nền tối, kính, màu chanh và font của app, không phải xám trắng flat.
   - Bản dựng viết bằng CSS Modules và token ở `src/styles/tokens.css`, không thêm Tailwind hay
     hex viết cứng; dùng lại `Button`, `StatusBadge`, `GlassCard`, `SegmentedTabs`, `Dialog`.
   - Bốn lỗi đáp án của trang này sạch: dialog "Tạo phiếu" vừa màn 375 (H4), Tab tới tab đang chọn
     thấy vòng focus (H5), badge bảng phiếu dùng `StatusBadge` (L3), chỉ một nút chính (G2).
   - Không đề xuất chế độ sáng.
4. Gửi link cho Claude ở evondevKit rà. Xong thì `git checkout main` để bản soi còn nguyên.

**5d. Dựng mới có wireframe, người dùng chọn phong cách shadow (`P7`)**

Rà 01/10/2026 (`lop-hoc`, cổng 3456, chỉ trang tổng quan; Học viên, Lớp học chưa dựng nên link
sidebar 404). Đạt: card không viền, bóng mềm, không phóng to; token bóng riêng; dropdown tài khoản
nổi hơn card. Trượt: bộ token chỉ ba bậc (card, card rê, popover), **sidebar trượt dưới `lg` không
bóng**, thấp hơn cả card phía sau; dòng "Lớp hôm nay" có nền rê mà không bấm được. Đã sửa skill:
`P7` thang bóng ghi sidebar trượt là tầng modal và đủ bốn bậc dù chưa có modal, `layouts/app.md`
ghi `shadow-modal` cho sidebar trượt, `I9` thêm vế ngược, `list-row.md`, `checklist.md`; probe đo bóng
panel / modal mở bằng nút và nền rê trên khối không bấm được. Dự án còn: thêm `--shadow-modal` cho
sidebar trượt, bỏ hover dòng "Lớp hôm nay", nhãn ô số "Học viên đang học" trơ một chữ (`T10`).
Chưa soi được ý 1–2 (hỏi lại phong cách, wireframe) vì không có phiên dựng.

Một lượt, không dự án mồi, không đáp án. Test: người dùng tự nêu phong cách thì skill theo luôn
(`P1`), từ wireframe tới bản dựng, không kéo về flat.

1. Tạo dự án:

   ```bash
   cd ~/dev/audit-skills
   npx create-next-app@latest lop-hoc --ts --tailwind --app --eslint --use-npm --yes
   cd lop-hoc && npm run dev
   ```

2. Phiên Claude Code mới trong `lop-hoc`, gõ:

   ```
   Đọc ~/dev/evondevKit/skills/ui-ux/SKILL.md rồi dựng dashboard quản lý trung tâm ngoại ngữ: tổng quan, danh sách học viên, lớp học. Phong cách shadow: card nổi bằng bóng, không viền.
   ```

   Qua hai cổng như thường: duyệt brief, chọn wireframe.
3. Soi:
   - Không hỏi lại phong cách.
   - Wireframe đã là card nổi bằng bóng, không phải card viền flat.
   - Bản dựng có thang bóng tăng dần: card < card khi rê < dropdown < modal. Dialog nổi hơn card.
   - Card không viền (được có `ring-1 ring-black/5`), rê chuột thì tăng bóng, không phóng to.
4. Gửi link cho Claude ở evondevKit rà.

### [x] 6. Dark mode (7/7)

Chạy trên `~/dev/ui-ux-dashboard`. Danh sách mục ở `TESTS.md`, mục "Dark mode".

Luật đã vào skill 01/10/2026 (`DARKMODE.md` Phần 3, `M21`, `M23`, `M31`–`M33`), nên chạy được.
Xong 01/10/2026: bật dark mode (nhánh `dark-mode`, cổng 5173), bảng khách hàng, khung app + tổng quan, lớp nổi, form, badge và biểu đồ, màn xác thực. Dự án còn các mục chưa theo kịp ở `REVIEW.md`.

1. Tạo nhánh riêng để bản sáng không bị đụng: `git checkout -b dark-mode`.
2. Phiên Claude Code mới trong `ui-ux-dashboard`, gõ:

   ```
   Đọc ~/dev/evondevKit/skills/ui-ux/SKILL.md rồi thêm dark mode cho app, có nút đổi sáng / tối trên header, mặc định theo hệ điều hành.
   ```

3. Soi: nút đổi theme nằm đâu, nói gì; tải lại vẫn nhớ lựa chọn; tải trang ở chế độ tối
   không nháy trắng. Thêm theo luật mới: icon button mở menu ba mục Sáng / Tối / Hệ thống
   (không xoay vòng); máy đang sáng mà bấm Tối thì cả trang tối, không nửa nọ nửa kia
   (`@custom-variant dark`); nền rê, mục đang chọn sáng hơn card; dropdown sáng hơn card một
   bậc, có viền; ô nhập còn viền; không còn mảng `-50` sáng (badge, avatar).
4. Sáu mục còn lại **không gõ đề mới**. Mỗi mục mở Claude Code ở evondevKit, gõ:

   ```
   Đọc REVIEW.md rồi rà dark mode trang http://localhost:5199/dashboard/customers
   ```

   Lần lượt: `/dashboard` (khung app, tổng quan), `/dashboard/customers` (bảng), lớp nổi
   (modal, dropdown, toast…), `/dashboard/tasks/new` (form), badge và biểu đồ, `/login` và
   `/verify-otp`.
5. Tick từng mục trong `TESTS.md`.

### [-] 7. Vòng tiếng Anh: bỏ

Bỏ 01/10/2026. Đề thường bằng tiếng Anh đã test tay thấy đúng; còn lại chờ người dùng thật
báo lỗi rồi sửa, không chạy vòng test riêng.

### [-] 8. Codex và Antigravity: bỏ

Bỏ 01/10/2026. Không tự test, người dùng các công cụ đó gặp lỗi thì báo qua issue GitHub rồi
sửa. Trang landing đã ghi rõ là chưa tự test.

### [ ] 9. Skill landing page riêng (làm ngay sau bước 5)

Làm ngay khi bước 5 xong. Làm thành **skill thứ hai** (`evon:landing`),
không gộp vào `ui-ux` vì luật hai bên đá nhau. Cách thêm plugin thứ hai ở cuối `DEVELOP.md`.

**Đổi hướng 06/10/2026 (chủ dự án chốt sau khi hỏi user):** user cần landing **thu lead giới
thiệu doanh nghiệp, cửa hàng**: spa, store, doanh nghiệp bao bì… Làm một hướng này trước, không
gộp SaaS hay trang quảng cáo chung.

- **Một mục tiêu: khách để lại liên hệ.** Chỉ khác kiểu liên hệ: đặt lịch (spa), ghé tiệm hay
  nhắn (store), nhận báo giá (B2B). Câu đầu của brief thành "khách để lại gì".
- **Hai nhánh con:** tiệm cho khách lẻ (spa, store) và doanh nghiệp B2B (bao bì, sản xuất).
  Section từng nhánh chốt theo kết quả tra, không đoán.
- **Giữ:** luật chung `H` (`page-rules.md`), quy trình brief → wireframe → dựng, probe.
  **Viết lại:** `goals.md` (`G`) và `sections.md` (`K`), vốn đếm từ 20 trang SaaS.
- Phần SaaS dưới đây (tra 20 trang, 21 mẫu, ba đề test) gác lại, giữ để tham khảo. Lớp nhìn
  (`H11`, `H12`, `K4`) xem lại sau khi tra.

**Việc tiếp:**

1. [x] Tra 15–20 landing thu lead **nước ngoài** (trang VN cùng loại nhìn xấu, chủ dự án bỏ
   06/10/2026; lấy từ các gallery landing tuyển chọn, ưu tiên site doanh nghiệp thật), chia đều spa, store, B2B. Đếm như lần trước:
   section, thứ tự, form (mấy ô, ở đâu), nút gọi / Zalo nổi, ảnh thật, bản đồ, chữ nút chính.
   **Kết quả (06/10/2026):** 21 trang, 7 mỗi nhánh (spa 6 thật + 1 template, store 5 + 2,
   B2B 5 + 2), chụp 1440 và 390. Gallery tuyển chọn gần như không có B2B, phần lớn tìm qua search.

   | Thấy gì | Spa | Store | B2B |
   | --- | --- | --- | --- |
   | Ảnh thật ở hero (không minh hoạ, không 3D) | 7 | 6 | 7 (video nền 4) |
   | H1 nói việc cụ thể (+ nơi) | 4 | 0 (tên / câu cảm xúc, câu "làm gì ở đâu" ngay dưới 7/7) | 4 |
   | Nút ở hero | 5 | 2 (chỉ template) | 6 (hai nút đặc + viền) |
   | Chữ nút chính | "Book…" 7/7 | đặt bàn / hẹn ghé showroom | "…Quote" 4, "Contact" 3 |
   | CTA lặp | ~4 lần | ≥3 lần chỉ 3/7 | 3–4 lần |
   | Form ngay trên trang | 0 (dẫn sang trang đặt lịch) | 2 (4–7 ô) | 1 + 1 modal (form ở trang riêng, 5–8 ô) |
   | SĐT trên header | 2 | 0 | 1 |
   | Nút gọi / Zalo nổi, thanh dính đáy mobile | 0 | 0 | 0 (chat nổi 2) |
   | Bản đồ nhúng | 0 | 1 | 0 |
   | Địa chỉ trên trang (đa số ở footer) | 5 | 6 | 4 |
   | Giới thiệu / câu chuyện | 7 | 7 | 7 |
   | Dịch vụ / sản phẩm | 6 (không bảng giá) | 7 | 6 |
   | Đánh giá khách | 4 | 3 | 6 |
   | Dải logo khách / đối tác | 2 | 1 | 5 |
   | Quy trình | 1 | 3 | 5 |
   | Con số | 2 | 1 | 4 |
   | FAQ | 1 | 0 | 2 |
   | CTA cuối trước footer | 3 | 3 | 5 |
   | Ảnh không gian / đội ngũ / xưởng thật | 4–4 | 6 | 3 |
   | Nền | kem ấm 6 | ngà / tint 5, trắng tinh 0 | sáng 4, tối 3 |
   | Tiêu đề | serif mảnh 6 | serif mảnh–vừa 5 | sans 600–700, 5 |
   | Một màu nhấn | 6 | 6 | 7 |
   | Góc | chia đôi: bo 10px / vuông | vuông ≤4px 5 | nút 0–6px 5 |
   | Footer tối | 5 | – | 5 |

   Trang dài ~7–10k px ở 1440. Lệch lớn với trang VN: trang nước ngoài không đẩy liên hệ (không
   Zalo nổi, không form ở hero, ít SĐT trên header), liên hệ là nút dẫn sang trang đặt lịch /
   báo giá.

2. [x] Viết lại skill theo kết quả tra (06/10/2026): `G` ba loại trang (dịch vụ đặt lịch, cửa
   hàng và quán, B2B) × kiểu liên hệ, `K` mười ba section (thêm Liên hệ có form, nút Zalo / gọi
   nổi), `H` sửa nền ngà, tiêu đề serif, ảnh thật, chữ trên ảnh ở hero; thêm `H12` chuyển động
   (chốt 02/10 nhưng chưa ghi vào skill) và `H13` liên hệ kiểu VN. Bản SaaS cất ở
   `archive/landing-saas/`.
3. [ ] Test ba đề trên dự án trống. Cách chạy như "Test bản đầu" dưới: mỗi đề một dự án Next
   trống trong `~/dev/audit-skills/`, đáp án viết trước ở `~/dev/phase2-dapan/landing/<ten>.md`
   (loại trang, section phải có / không có theo `G2`, chữ nút chính, ô form, hero kiểu gì), phiên
   Claude Code mới. Đề **không** nói loại trang hay chữ nút, để xem câu 3 đoán đúng không:

   ```
   Đọc ~/dev/evondevKit/skills/landing/SKILL.md rồi dựng landing page cho Mộc Spa, spa chăm sóc da nhỏ ở Quận 3, TP.HCM: năm phòng riêng, chuyên da mụn, da nhạy cảm và massage mặt. Khách đa số là dân văn phòng quanh đó.
   ```

   ```
   Đọc ~/dev/evondevKit/skills/landing/SKILL.md rồi dựng landing page cho Gỗ Tâm An, showroom bàn ghế gỗ tự nhiên ở Thủ Đức, nhận đóng theo kích thước. Khách thường ghé xem tận nơi rồi mới đặt.
   ```

   ```
   Đọc ~/dev/evondevKit/skills/landing/SKILL.md rồi dựng landing page cho Bao Bì Phú Thành, xưởng in thùng carton và hộp giấy ở Long An, nhận đơn từ 500 cái cho shop online và nhà máy thực phẩm.
   ```

   **Đề thứ tư, soi "đại trà"** (user chê theme sẵn nhìn đại trà, 06/10/2026): chạy thêm một spa
   khác, đặt cạnh trang Mộc Spa. Hai trang trông như một theme đổi chữ là phải sửa skill (dòng
   cảm giác, phương án wireframe, chữ lấy từ chuyện thật chưa đủ tạo khác biệt):

   ```
   Đọc ~/dev/evondevKit/skills/landing/SKILL.md rồi dựng landing page cho Lá Thông, tiệm massage và xông thảo dược ở Đà Lạt, mở trong một căn nhà gỗ cũ, khách phần lớn là khách du lịch ở vài ngày.
   ```

   Đáp án loại trang: dịch vụ đặt lịch, cửa hàng, B2B. Soi:
   - **Cổng 1:** đoán đúng loại, bảng section đúng cột `G2`, nút "Đặt lịch" / "Đặt lịch tư vấn" /
     "Nhận báo giá" (`G3`), dòng 6 liệt kê thứ giả (địa chỉ, số, ảnh, đánh giá), dòng 7 cảm giác.
   - **Cổng 2:** A, B, C khác nhau ở kiểu hero (`K2`) và thứ tự; ảnh thật, không khối xám; có nhóm
     Trạng thái của form; khung 375 đứng đầu.
   - **Bản dựng:** một nút chính cùng chữ cùng đích ở header, hero, Liên hệ (`H1`); H1 nói làm gì
     ở đâu (`H4`); spa và showroom tiêu đề serif có dấu đúng (`H3`); form đúng ô `G3`; nút Zalo /
     gọi nổi gọn, không nhấp nháy (`H13`); `GIẢ:` trên mọi chỗ giả, số `0900 000 000` (`H9`); probe
     sạch ở 375; tin giao có ba dòng của mục 4 `SKILL.md`.
4. [ ] **Lối "theo mẫu này"** (làm sau khi test xong bước 3). User đang làm landing bằng cách gõ
   tên ngành, tìm trang đẹp rồi chép theo, nhưng chưa tìm được trang nào ổn. Thêm một lối ở câu 1:
   người dùng gửi link trang họ thích kèm "theo mẫu này", skill lấy bố cục và gu của trang đó,
   còn nội dung, ảnh, form, nút nổi và luật `H9` vẫn theo skill. Chưa viết luật trước khi bản hiện
   tại qua test.

**Hướng SaaS (gác 06/10/2026)** — hướng chốt 01/10/2026: không cố phủ mọi kiểu SaaS. Nội dung landing page muôn kiểu nhưng
khung gần như giống nhau, nên skill chốt một bộ section cố định và chọn section theo mục tiêu
của trang.

1. **Tra trước khi viết luật.** Mở 15–20 landing page SaaS đang chạy thật, đủ bốn mục tiêu ở
   bước 2. Ghi lại: có section nào, theo thứ tự nào, CTA chính lặp mấy lần, pricing dạng gì.
   Luật lấy theo cách số đông làm, không viết theo trí nhớ.
2. **Brief hỏi một câu: khách vào trang cần làm gì?** Bốn mục tiêu:
   - Đăng ký dùng thử: đủ bộ, pricing nếu có gói trả phí.
   - Mua luôn: pricing lên sớm, thêm FAQ về thanh toán, hoàn tiền.
   - Đặt lịch demo: nhiều social proof, không pricing hoặc chỉ ghi "liên hệ".
   - Vào danh sách chờ: hero, tính năng, CTA. Không pricing, không testimonial.

   Mục tiêu quyết định bật section nào và xếp ra sao, giống "việc chính của từng màn" bên `ui-ux`.
3. **Bộ section nền (chín loại):** header, hero, social proof (logo, con số, testimonial),
   tính năng, cách hoạt động, pricing, FAQ, CTA cuối trang, footer. Mỗi loại có 2–3 biến thể,
   không hơn. Bảng so sánh, video demo, integrations, changelog để bản sau.
4. ~~**Pricing chỉ ba dạng**~~ — bỏ sau khi tra (dưới): pricing đi theo mục tiêu, `G4` trong
   `skills/landing/references/goals.md`.
5. **Luật chung cho mọi section:**
   - Một CTA chính, lặp lại dọc trang (hero, giữa trang, cuối trang), cùng chữ cùng đích.
   - Một màu nhấn.
   - Nhịp đều giữa các section: khoảng cách dọc theo một thang, không mỗi khối một kiểu.
   - Chữ ở hero là nội dung thật của sản phẩm: nói làm được gì cho ai. Không câu chung
     chung kiểu "Build faster with AI".
   - Ảnh hero là ảnh sản phẩm thật hoặc dựng giống thật, không minh hoạ trừu tượng.
6. **Quy trình như nhánh U của `ui-ux`:** brief → duyệt → 2–3 wireframe (khác nhau ở thứ tự
   section và kiểu hero) → chọn → dựng. Dùng lại probe để đo 375 tới 1920px.
7. **Test ba đề trên dự án trống**, mỗi đề một mục tiêu khác nhau (đăng ký dùng thử, đặt lịch
   demo, danh sách chờ). Soi: section bật đúng theo mục tiêu, CTA chính thống nhất, hero có
   chữ thật, pricing đúng `G4`. Ghi vào `TESTS.md`. Cách chạy ở mục "Test bản đầu" dưới.

**Bản đầu đã viết (01/10/2026):** `skills/landing/` gồm `SKILL.md` (lối, ba câu hỏi, bốn bước
`E1`–`E4`), `references/goals.md` (`G`), `sections.md` (`K`), `page-rules.md` (`H`). Dùng chung
token, component, probe, thanh wireframe với `ui-ux` qua `../ui-ux/`. `ui-ux` chuyển đề landing
sang skill này. Mọi luật gắn ⚑.

**Kết quả tra bước 1 (01/10/2026):** 20 trang đang chạy, 5 mỗi mục tiêu, chụp ở 1440px. Mẫu
"dùng thử" nghiêng về công cụ cho dev. Bảng đếm số trang có section đó:

| Section | Dùng thử | Mua luôn | Đặt demo | Danh sách chờ |
| --- | --- | --- | --- | --- |
| Nhãn nhỏ trên H1 (tin mới, "chưa mở") | 5 | 4 | 3 (thanh trên header) | 5 |
| Hero chữ canh trái, đa số chia đôi | 4 | 2 (3 canh giữa) | 4 | 5 |
| Ảnh sản phẩm thật trong màn đầu | 4 | 4 | 4 | 4 |
| Dải logo ngay dưới hero | 5 | 2 (4 ghi số người dùng ngay hero) | 4 | 0 |
| Tính năng dạng lưới card | 5 | 2 (mỗi trang một kiểu) | 4 (3 × 2) | 2 |
| Cách hoạt động, bước đánh số | 1 | 0 | 1 | 3 |
| Testimonial (tên, chức danh, đa số có ảnh) | 5 | 5 | 5 | 0 |
| Pricing ngay trên landing | 0 (5 để trang riêng) | 4 | 0 | 0 |
| FAQ trên landing | 1 | 3 (cạnh pricing) | 0 | 2 |
| CTA cuối trang (tiêu đề + nút, canh giữa) | 4 | 3 | 5 | 3 |

Lệch so với hướng chốt ở trên:

- **Pricing ba dạng không khớp số đông.** Gói giữa nổi: 1/5 trang giá dùng thử, 0/5 mua luôn,
  2/5 demo. Trang giá dùng thử là 4 gói (Free, hai gói trả phí, Enterprise "liên hệ") kèm bảng
  so sánh, 0/5 có nút tháng / năm chung. Mua luôn: 2–4 card, ghi rõ "trả một lần", nút ở hero
  dẫn xuống pricing chứ không thẳng tới thanh toán, testimonial ngay sau pricing (4/4).
- **CTA chính lặp giữa trang hiếm** (dùng thử 2/5). Số đông: header + hero + cuối trang. Cùng
  một đích 5/5, cùng một chữ khoảng 3/5.
- **Cách hoạt động gần như chỉ ở danh sách chờ** (3/5), các mục tiêu khác 0–1/5.
- **Danh sách chờ:** chữ trên nút gọi đúng việc ("Join the waitlist", 5/5, không "Get
  started"), một dòng nhỏ dưới nút (4/5), form một ô email ngay hero (3/5). Không có số liệu
  hay testimonial thật.
- **Đặt demo:** header đúng một nút đặc là nút demo (5/5), footer nền tối (5/5), testimonial
  hai khối mỗi trang.
- Số đo chung: trang dài 8–12k px (danh sách chờ 2–6k), khoảng giữa các section 100–160px,
  nội dung rộng 1200–1300px, H1 thường 64px, 0–1 màu nhấn.

**Tra lớp nhìn (02/10/2026):** chủ dự án chấm landing theo các mẫu thiết kế được khen, không theo
trang đang chạy. Tra 21 mẫu (13 màn đầu, 8 trang trọn), giữ bố cục và section theo 20 trang đang
chạy, chỉ đổi lớp nhìn. Đếm được:

| Thấy gì | Số mẫu | Đã ghi vào |
| --- | --- | --- |
| Card tính năng có mảnh giao diện (bento) | 8/8 trang trọn | `K4` A, lưới icon xuống B |
| H1, H2 đậm thường hoặc vừa, không đậm | ~16/21 | `H3` |
| Hero có lớp nền: vầng màu, lưới mờ, ảnh | 13/21 | `H11` (đè `M12` chỉ ở hero, CTA cuối) |
| CTA cuối là panel bo góc trong khung | 6/8 | `H11`, `K8` |
| Mảnh UI nổi chồng lên màn app | 7/21 | `H6` |
| Hero nằm trong panel bo góc cách mép màn | 6/21 | `H11`, phương án được |
| Tiêu đề hai tông (vế sau màu nhạt) hay có từ nhấn | ~9/21 | `H3`, được dùng, không mặc định |

Để đợt sau (đã đủ 5 luật đợt này): nút bo tròn hẳn (5/8), câu FAQ mỗi câu một card (5/7), hero
canh giữa nhiều hơn chia đôi (14/21, ngược với trang đang chạy), nền trang trắng ngà hay tối thay
trắng (5/8), nhãn nhỏ trên mỗi H2 (4/7, `H3` đang cấm). Chờ test xem bản dựng còn thiếu gì rồi mới
chọn.

**Đợt luật sau test (chủ dự án chốt 02/10/2026):**

- Brief thêm dòng 7 **cảm giác của trang** (gọn chuyên nghiệp, ấm thân thiện, kỹ thuật nền tối…):
  quyết kiểu nền `H11`, sáng hay tối, mức chuyển động.
- **`H12` chuyển động, ba mức, mặc định Nhẹ.** Tĩnh; **Nhẹ**: section hiện dần khi cuộn tới (một
  lần), hover nút và card, bằng Motion (`motion`) hoặc CSS; **Nổi bật** chỉ khi người dùng xin:
  nền động, cuộn ghim cảnh GSAP ScrollTrigger, 3D three.js. Mức nào cũng: `prefers-reduced-motion`,
  chữ hero không ẩn chờ animation, không chiếm cuộn, 3D tải sau và tắt trên điện thoại. Đè `F22`
  của `ui-ux` chỉ trong landing.

**Test bản đầu** (cách chạy như bước 2: dự án trống, đáp án viết trước, phiên Claude Code mới):

1. Mỗi đề một dự án Next trống trong `~/dev/audit-skills/`:

   ```bash
   cd ~/dev/audit-skills
   npx create-next-app@latest landing-<ten> --ts --tailwind --app --eslint --use-npm --yes
   ```

2. Viết đáp án trước ở `~/dev/phase2-dapan/landing/<ten>.md`: mục tiêu, section phải có và phải
   không có (theo `G1`), chữ nút chính, hero kiểu gì.
3. Ba đề, **không** nói mục tiêu, để xem câu 3 đoán đúng không:

   ```
   Đọc ~/dev/evondevKit/skills/landing/SKILL.md rồi dựng landing page cho Lịch Hẹn, app đặt lịch cho tiệm làm tóc và spa nhỏ: khách tự đặt qua link, chủ tiệm xem lịch theo thợ, tự nhắn nhắc khách trước giờ hẹn. Có gói miễn phí cho 1 thợ.
   ```

   ```
   Đọc ~/dev/evondevKit/skills/landing/SKILL.md rồi dựng landing page cho Sổ Công, phần mềm chấm công và tính lương cho nhà máy 200–2000 công nhân, bán cho phòng nhân sự. Đội sales tư vấn và báo giá theo từng nhà máy.
   ```

   ```
   Đọc ~/dev/evondevKit/skills/landing/SKILL.md rồi dựng landing page cho Ghi Chép, app ghi âm cuộc họp rồi tự tóm tắt bằng tiếng Việt. Chưa ra mắt, đang gom người dùng thử đợt đầu tháng 11.
   ```

   Đáp án mục tiêu: dùng thử, đặt demo, danh sách chờ.
4. Soi ở mỗi cổng:
   - **Cổng 1:** đoán đúng mục tiêu chưa, bảng section đúng cột `G1` chưa, chữ nút chính theo
     `G2`, dòng 6 của brief có liệt kê thứ giả (logo, số khách, testimonial).
   - **Cổng 2:** A, B, C khác nhau ở hero và thứ tự section; ảnh hero là màn app dựng thật, không
     khối xám; đề danh sách chờ có nhóm Trạng thái (Mặc định, Đã gửi, Lỗi).
   - **Bản dựng:** một nút chính cùng chữ cùng đích ở header, hero, CTA cuối (`H1`); H1 nói việc
     cụ thể (`H4`); padding các section bằng nhau (`H2`); comment `GIẢ:` trên mọi chỗ giả
     (`H9`); probe sạch ở 375; tin giao có ba dòng của mục 4 `SKILL.md`.
5. Ghi kết quả vào đáp án, gửi link localhost cho Claude rà theo `REVIEW.md`.

---

## Việc lặt vặt, lúc nào rảnh

### [x] Sửa chữ trên landing page

Mở Claude Code ở `~/dev/evondev-kit-landingpage`, gõ:

```
Sửa trang /ui-ux cho khớp skill ở ~/dev/evondevKit:
- Mục Probe: probe đo 6 khổ (375, 768, 1024, 1280, 1440, 1920), --sweep quét 1440 xuống 375. Sửa câu "Quét năm khổ màn, từ 1920 xuống 375px" và bảng khổ.
- Thẻ luật "Một màu nhấn, một nút chính" ghi M3 · I1 · I3.
- Câu "Mỗi luật … sinh ra từ một lỗi đã thật sự xảy ra" đổi thành "nhiều luật sinh ra từ lỗi đã gặp".
- Bước U4: thêm "tối đa ba vòng" sau "chạy probe tới khi danh sách lỗi trống".
- Gom 7 lối vào thành 3 nhóm: Dựng mới (designer, dựng luôn, việc nhỏ, design system), Làm lại UI đang có (soi, giữ brand, gu skill), Dọn code (refactor).
Sửa cả bản tiếng Anh.
```

Xong 30/09/2026: các mục trên đã có trên trang; thêm lối design system (D9), roadmap tiếng Anh 0/2, menu header hiện từ 1280px (bản tiếng Anh gãy chữ ở 1024). Còn tự xác nhận hai chỗ: câu "Không chỉnh tay sau khi dựng" ở showcase có đúng không, và
đường dẫn cài trên Codex / Antigravity (bước 8).

### [ ] Gỡ card "Thêm ca trước / sau từ dự án thật" trên landing page

Chốt 01/10/2026: bỏ card "Sắp có" ở roadmap. Card chỉ báo là chưa có ("Đã có 1 dự án",
ngay dưới ca 68Lane), lại hứa "kèm số đo code trước và sau" thì ca nào cũng phải đo. Bro tự
sửa ở `~/dev/evondev-kit-landingpage`, gỡ cả bản tiếng Anh và đếm lại số mục roadmap.

Không lên kế hoạch làm thêm ca. Sau này tình cờ có ca đẹp thì đưa thẳng lên cạnh 68Lane, không
báo "sắp có". Ca đó phải là dự án đang chạy thật (không lấy đề ở `audit-skills`), hai ảnh cùng route, cùng dữ liệu, cùng
bề rộng, ghi câu đề và chỗ đã chỉnh tay; ca của người khác thì xin phép và che dữ liệu thật.
Hiện bằng hai tab Trước / Sau, không làm thanh kéo vì dễ đụng cuộn trang trên điện thoại.

### [x] Thêm file `LICENSE`

Xong 30/09/2026: `LICENSE` MIT, Tuấn Trần, 2026; README có link và khối "Bản beta".

### [ ] `ui-ux-dashboard`: Select chưa có chuyển động

Probe báo khung Select mở ra tức thì, trong khi `layouts/overlay.md` bắt có chuyển động. Mở
Claude Code ở `ui-ux-dashboard`, gõ:

```
Đọc ~/dev/evondevKit/skills/ui-ux/SKILL.md rồi thêm chuyển động mở đóng cho khung Select theo mục Chuyển động của layouts/overlay.md, giống menu tài khoản.
```

### [ ] Ra bản mới cho người đã cài

30/09/2026: lên `0.2.0` (thêm D9) trước đợt quảng bá.

Khi một đợt test ổn (chạy lại vài đề ✅ không vỡ):

1. Tăng `version` trong `.claude-plugin/plugin.json` (sửa luật: `0.1.x → 0.1.x+1`; thêm
   nhánh mới như `D9`: `0.1.x → 0.2.0`).
2. Commit riêng, push.
3. Người dùng lấy bản mới bằng `/plugin marketplace update evondevkit`.
