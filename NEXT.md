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

### [ ] 6. Dark mode (0/7)

Chạy trên `~/dev/ui-ux-dashboard`. Danh sách mục ở `TESTS.md`, mục "Dark mode".

1. Tạo nhánh riêng để bản sáng không bị đụng: `git checkout -b dark-mode`.
2. Phiên Claude Code mới trong `ui-ux-dashboard`, gõ:

   ```
   Đọc ~/dev/evondevKit/skills/ui-ux/SKILL.md rồi thêm dark mode cho app, có nút đổi sáng / tối trên header, mặc định theo hệ điều hành.
   ```

3. Soi: nút đổi theme nằm đâu, nói gì; tải lại vẫn nhớ lựa chọn; tải trang ở chế độ tối
   không nháy trắng.
4. Sáu mục còn lại **không gõ đề mới**. Mỗi mục mở Claude Code ở evondevKit, gõ:

   ```
   Đọc REVIEW.md rồi rà dark mode trang http://localhost:5199/dashboard/customers
   ```

   Lần lượt: `/dashboard` (khung app, tổng quan), `/dashboard/customers` (bảng), lớp nổi
   (modal, dropdown, toast…), `/dashboard/tasks/new` (form), badge và biểu đồ, `/login` và
   `/verify-otp`.
5. Tick từng mục trong `TESTS.md`.

### [ ] 7. Vòng tiếng Anh (0/2)

Chỉ hai đề nhắm lỗi hay gặp: bảng (số, ngày, số nhiều, chữ cái avatar) và đề trộn. Đề
thường đã test tay thấy đúng nên không chạy đủ.

1. Đề, mỗi đề một phiên (thêm `Read ~/dev/evondevKit/skills/ui-ux/SKILL.md, then` ở đầu):
   - Dự án trống mới (tạo như bước 2): `Build me a customer table with search, filters, pagination, and multi-select for bulk delete.`
     So ảnh với bản tiếng Việt đã ✅: bố cục, màu, khoảng thở y hệt, chỉ chữ khác.
   - **Trộn**, chạy trong `ui-ux-dashboard` (nhãn tiếng Việt): `Add a notification panel that opens from the bell in the header.`
2. Đề bảng soi bốn thứ: câu trả lời toàn tiếng Anh; nhãn tiếng Anh quen dùng, viết hoa chữ
   đầu câu; tiền, số, ngày theo kiểu tiếng Anh; không có dấu gạch dài trong câu. Đề trộn:
   trả lời tiếng Anh nhưng nhãn mới vẫn tiếng Việt, không hỏi.
3. Tick trong `TESTS.md`, gửi link cho Claude rà.

### [ ] 8. Codex và Antigravity

1. Cài skill theo hướng dẫn trên landing page (tab Codex / Antigravity): chép thư mục
   `skills/ui-ux` vào `.agents/skills/` của dự án, hoặc `~/.codex/skills/` để dùng chung.
   **Kiểm lại đường dẫn theo tài liệu chính thức** của từng công cụ trước, trang chưa test.
2. Trong một dự án trống, chạy lại hai đề đã chạy ở Claude: đề bộ nút
   (`Dựng cho tôi bộ nút: nút chính, nút viền, nút chỉ icon, nút xoá, đủ trạng thái hover, focus, đang tải, bị khoá.`)
   và đề nha khoa ở bước 2.
3. Soi: skill có tự bật không; có chạy được `probe.mjs` không (cần Node và Playwright); kết
   quả có giống bản Claude không.
4. Ghi kết quả vào `DEVELOP.md` mục "Còn thiếu" và sửa tab cài đặt trên landing page cho đúng.

### [ ] 9. Sau cùng: skill landing page riêng

Chỉ làm nếu vẫn muốn, sau khi các bước trên ổn. Làm thành **skill thứ hai** (`evon:landing`),
không gộp vào `ui-ux` vì luật hai bên đá nhau. Cách thêm plugin thứ hai ở cuối `DEVELOP.md`.

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
