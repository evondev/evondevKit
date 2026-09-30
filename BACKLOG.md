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

## Phase 2: soi UI đang có, đề xuất trước/sau, hỏi rồi mới sửa

Bắt đầu khi xong bậc 2 và bậc 3 trong `TESTS.md`, tức là xong phase 1.

**Đang làm (27/09/2026).** Đã vào skill, chưa qua vòng test nào (⚑): nhánh `V` ở
`skills/ui-ux/references/review.md` (bốn mặc định, `V1`–`V5`), loại "ảnh hiện trạng"
trong `S12`, câu 1 của mục 0 có ba nhánh. `probe.mjs` đo thêm tương phản chữ, khung giấu
mất chữ, chữ trong nút xuống dòng, hàng header / nav rớt dòng, và có `--sweep` quét bề
rộng. Dự án mồi đầu tiên đã dựng (repo riêng, đáp án để ngoài mọi repo). Lượt quét
đã đưa về nhánh dựng mới (27/09/2026): cổng 3 chạy `--sweep`, đủ 5 khổ, sửa tới khi danh
sách `P` trống (tối đa ba vòng). Nhánh `V` có ba chế độ (28/09/2026): soi (mặc định, thận
trọng), dựng lại giữ brand (đề có "dựng lại", "theo skill"; Gu chọn sẵn, được thay control
gốc bằng component của skill, giữ vai màu theo bảng ghi trước khi dựng), và dựng lại theo gu
skill (đề có "hoàn toàn theo gu skill", "bỏ style cũ"; chỉ giữ logo và màu nhấn chính). Control gốc chưa có kiểu là Lệch hệ ở mọi chế
độ. Chưa test chế độ dựng lại bằng đáp án: thử trên bản sao `tim-phong-sua`. probe đo thêm (28/09/2026): đường ngăn hai cột kề nhau lệch, khối khai chiều cao mà bị bóp (bắt được header bị bóp, lỗi sót ở mọi vòng), chữ dưới 12px. Hai chế độ dựng lại có thêm hạng Cấu trúc (`V1b`, 28/09/2026): tín hiệu tranh nhau, hai chỗ một việc, thông tin không phân biệt được gì, khối quá tải, control sai loại, đặt sai chỗ; sắp lại thì chọn sẵn, bỏ thông tin thì không.

**Ý của chủ dự án:** skill tự chụp ảnh hoặc quay video UI hiện tại của dự án,
chỉ ra lỗi, đưa bảng trước/sau rồi hỏi có muốn sửa không. User không tin phần tự
chụp thì tự chụp gửi vào, skill vẫn đọc ảnh và làm y như vậy. Skill chỉ là tham
khảo: dự án có màu và style riêng thì phải tôn trọng.

### Đụng luật đang có

- **`S12` đang đọc mọi ảnh thành design ref hoặc wireframe.** Ảnh chụp app của
  chính user sẽ bị đọc thành "bám theo cái này", đúng ngược với ý muốn soi lỗi.
  Cần loại ảnh thứ ba: **ảnh hiện trạng**. Nhận ra khi đề có chữ "xem giúp",
  "review", "chỗ nào chưa ổn", "sao trông kỳ", hoặc ảnh khớp với route trong repo.
- **Mặc định "không hỏi" (memory skill-default-over-ask) không áp dụng ở đây.**
  Dựng màn mới thì không hỏi, còn sửa sản phẩm đang chạy thì hỏi. Khớp mặc định
  2 của `refactor.md`: thấy chỗ trái luật thì ghi vào đề xuất, không tự sửa.

### Ba hạng lỗi, để "tham khảo chứ không tuyệt đối" có chỗ đứng

Mỗi dòng trong bảng phải gắn một hạng. Thiếu cách chia này thì skill sẽ báo
"màu nút của bạn không phải màu skill" là lỗi.

| Hạng | Căn cứ | Ví dụ | Mặc định |
| --- | --- | --- | --- |
| **Hỏng** | Đúng với mọi brand | Tương phản dưới 4.5:1, tràn ngang ở 375px, chữ bị cắt mất nghĩa, focus không thấy, vùng bấm dưới 24px | Đề xuất sửa |
| **Lệch chính hệ của dự án** | Token và component của dự án | Ba kiểu bo góc nút, hai màu cho cùng trạng thái, khoảng cách lẻ ngoài thang của họ | Đề xuất sửa, theo hệ của họ |
| **Gu của skill** | `principles.md`, luật skill | Sidebar có viền phải, badge nền đậm | Chỉ nêu, ghi rõ "gu, tuỳ bạn", mặc định không tick |

Hạng thứ hai đo theo **hệ của dự án, không theo token của skill**. Đọc
`tokens.css`, `tailwind.config`, `globals.css` của họ trước khi chấm.

### Nguồn ảnh và độ tin

- **Tự chụp:** Playwright qua Bash, hoặc Chrome DevTools MCP nếu có. Chụp đủ các
  khổ trong mục "Responsive" bên dưới, chờ theo `L4`. Vướng đăng nhập, cần dữ liệu thật hoặc dev server
  không chạy thì nói thẳng, xin ảnh, không đoán.
- **User gửi ảnh:** ảnh user thắng khi khác ảnh tự chụp. Đó là thứ họ thật sự
  thấy (đã đăng nhập, dữ liệu thật). Khác nhau thì nói ra một dòng.
- **Video:** model không xem video trực tiếp. Tách khung bằng ffmpeg, chọn khung
  quanh lúc chuyển động (cách đã dùng khi duyệt Drawer bằng video chậm 4 lần).
- **Mỗi lỗi ghi nguồn:** *thấy trong ảnh*, *đọc từ code*, hay *đoán*. Ảnh tĩnh
  không cho thấy hover, focus, chuyển động, cấu trúc a11y, nên không được khẳng
  định những thứ đó chỉ từ ảnh.

### Responsive: soi đủ khổ màn, không chỉ 375px

Phase 1 chỉ kiểm ở 375px (`responsive.md`). Lỗi hay nằm ở khoảng giữa: tablet
và laptop nhỏ, lúc sidebar còn mở mà bảng đã hết chỗ (bảng trong khung app chỉ
còn khoảng 970px ở 1280px).

| Khổ | Bề rộng | Hay vỡ ở đâu |
| --- | --- | --- |
| Mobile | 375 | Tràn ngang, lề `p-8` ăn mất bề ngang, hàng chip hay tab rớt dòng |
| Tablet dọc | 768 | Lưới hai cột bị bóp, sidebar chưa thu mà nội dung đã chật |
| Tablet ngang | 1024 | Ngưỡng thu sidebar, drawer đè lên gần hết nội dung |
| Laptop nhỏ | 1280 | Bảng nhiều cột bên cạnh sidebar, toolbar xuống dòng |
| Desktop | 1440 | Nội dung kéo quá dài, dòng chữ quá rộng |

- **Chụp ở từng khổ cố định chưa đủ.** Lỗi nằm giữa hai khổ (ví dụ nav xuống dòng
  ở 900px) sẽ lọt. Cần thêm một lượt **quét bề rộng**: kéo từ 1440 xuống 375, mỗi
  bước khoảng 20 đến 40px, chụp ảnh ở từng bước. Cách này đáng tin hơn quay
  video, vì video vẫn phải tách ra thành khung ảnh. Chỉ đưa lên bảng những khung
  có lỗi.
- **Tràn ngang thì đo, không chỉ nhìn.** Ở mỗi bề rộng chạy
  `scrollWidth > clientWidth` trên `documentElement`, lỗi thì tìm ra phần tử nào
  rộng hơn màn và ghi selector của nó vào bảng. Lỗi đo được xếp hạng Hỏng, nguồn
  ghi *đo*.
- **Mở cả phần tương tác ở màn hẹp:** menu, drawer, dialog, dropdown. Mở ra ở 375px
  mới thấy menu tràn khỏi mép hay dialog cao quá màn hình. Ảnh trang đóng không
  cho thấy mấy lỗi này.
- Mỗi dòng lỗi trong bảng ghi thêm **khổ màn** bị lỗi (hoặc khoảng bề rộng, ví dụ
  "860 tới 1020px").
- **Dự án mồi phải cài lỗi ở từng khổ**, nhất là lỗi chỉ xuất hiện giữa hai khổ
  cố định, để biết lượt quét bề rộng có bắt được không.
- ~~Nên đưa cách quét này ngược về nhánh dựng màn mới.~~ Đã làm 27/09/2026 (cổng 3 trong
  `checklist.md`).

### Dark mode: dự án có thì soi cả hai, chưa có thì không bịa

Cùng tinh thần `M20` (mặc định chỉ light), nhưng ở đây dự án đã có sẵn, nên theo
dự án.

- **Có dark mode thì soi đủ hai chế độ.** Mỗi khổ màn chụp cả light lẫn dark, ảnh
  "sau" cũng làm đủ hai bản. Màu dark lấy đúng token dark của họ (khối `.dark`,
  `[data-theme="dark"]`, biến CSS riêng), không lấy navy của skill (`M23`).
- **Chưa có thì không làm.** Không chụp dark, không đề xuất dark, không thêm class
  `dark:` vào code sửa. Có thể ghi một dòng "dự án chưa có dark mode", không hơn.
- **Chỉ làm dark mode mới khi user tự yêu cầu.** Lúc đó bảng màu dark cho dự án
  chưa có sẵn sẽ test riêng sau, chưa chốt trong phase 2.
- **Nhận biết "có dark mode" phải thấy nó bật được, không chỉ thấy khai báo.**
  Dự án dựng từ shadcn thường có sẵn khối `.dark` trong `globals.css` mà sản phẩm
  chưa bao giờ dùng. Coi là có khi thấy cách bật: nút đổi theme, `next-themes` /
  `ThemeProvider`, hoặc đi theo `prefers-color-scheme`. Rồi kiểm chứng bằng cách
  chụp (giả lập `colorScheme: 'dark'` hoặc gắn class `dark` lên `<html>`) xem màn có
  đổi màu thật không.
- **Dark mode làm dở là lỗi hạng Hỏng.** Có nút bật mà còn mảng nền trắng cứng
  (`bg-white`), chữ đen trên nền tối, viền biến mất, logo tối trên nền tối, bóng
  không thấy. Sửa bằng token dark của họ.
- **Sửa một chế độ thì chụp lại cả hai.** Sửa cho light đẹp rồi làm vỡ dark là lỗi
  hay gặp nhất khi dự án có hai chế độ.
- Dự án mồi cho dark mode: xem checklist ở mục "Test cho phase 2".

### Ảnh "sau" phải là render thật, không phải mô tả

- **Có app chạy:** chèn CSS tạm vào trang (`page.addStyleTag`) rồi chụp. Chưa đụng
  file nào của dự án cho tới khi user chọn.
- **Chỉ có ảnh:** dựng lại vùng bị lỗi thành HTML tĩnh bằng màu hút từ ảnh của họ,
  không dùng màu skill. Ghi rõ đây là mô phỏng.
- **Bảng giao là bảng markdown trong chat**, không dựng trang HTML. Mỗi dòng có
  số thứ tự, hạng, vị trí, lỗi, đề xuất sửa, và đường dẫn ảnh trước/sau. User
  trả lời bằng số dòng muốn sửa ("sửa 1, 3, 4"). Chỉ sửa code những dòng đó,
  sửa xong chụp lại để đối chiếu.

### Test cho phase 2

Không test được bằng đề "dựng cho tôi…". Cần **dự án mồi**, là repo riêng nằm
cùng cấp với `evondevKit` (chủ dự án tự tạo sau), không đặt trong repo này. Dự án
mồi là một app nhỏ có brand riêng khác hẳn skill (ví dụ màu cam, bo `rounded-2xl`,
font khác), cài sẵn danh sách lỗi đã biết, chia đủ ba hạng. Chấm hai chiều:

- **Bắt sót:** tìm ra bao nhiêu lỗi hạng Hỏng và hạng Lệch hệ đã cài.
- **Báo nhầm:** có coi màu cam hay bo góc của brand là lỗi không. Chiều này quan
  trọng hơn, vì một lần báo nhầm là user hết tin cả bảng.

Chạy mỗi dự án mồi hai lượt: một lượt skill tự chụp, một lượt chỉ đưa ảnh.

**Việc cần làm khi dựng dự án mồi:**

- [x] **Hai bản dark mode.** Một bản có dark mode và cài sẵn vài chỗ làm dở (mảng
      `bg-white` cứng, chữ đen trên nền tối, viền biến mất). Một bản chỉ có khối
      `.dark` thừa, không có cách bật, dùng để test xem skill có bịa dark mode không.
- [x] **Lỗi ở từng khổ màn**, có cả lỗi chỉ xuất hiện giữa hai khổ cố định (ví dụ
      nav xuống dòng ở 900px), để test lượt quét bề rộng.
- [x] **Đủ ba hạng lỗi**, có ghi đáp án riêng để chấm bắt sót và báo nhầm.

**Các dự án mồi.** Một dự án thì skill sửa vài vòng sẽ giỏi đúng dự án đó. Cần ba
dự án khác nhau ở chỗ dễ làm skill sai. **Làm lần lượt:** xong dự án trước (chấm đạt)
mới dựng dự án sau, và dự án mới **chạy đúng một lần trước khi sửa skill**, để biết
mấy chỗ sửa trước đó có dùng được ở chỗ khác không.

| # | Dự án | Khác ở đâu | Test gì | Trạng thái |
| --- | --- | --- | --- | --- |
| 1 | `tim-phong` | Vite + React + Tailwind v4, chép từ một trang thật đang xấu, brand riêng, nhiều lỗi | Bắt lỗi, không báo nhầm brand, quét bề rộng, hai bản dark | Vòng 1 (27/09/2026, `master`, tự chụp): bắt 19/34, báo nhầm 1 (gom bo góc brand về thang), 1 lần đưa khối brand vào Gu. Probe đo ra mà model bỏ: nút 20px, nút bị card cắt. Probe không mở được lớp nổi mở bằng nút thường. Vòng 2: 16/37, không báo nhầm; probe vẫn đo ra mà bảng bỏ, vẫn chưa mở được lớp nổi (nút chỉ có icon, `div` bấm được). Đã sửa: probe in danh sách mã `P` phải đối chiếu, mở lớp nổi rộng hơn, đo trang tự cuộn, bỏ lớp che khi đo tương phản. Vòng 3: 26/37, không báo nhầm, không đưa brand vào Gu. Đã sửa tiếp: Tab không dừng ở body, lướt qua phần tử cùng kiểu; lệnh grep tìm Lệch hệ trong code; lỗi thật mà sửa rộng vẫn lên bảng. Vòng 4: 27/37, không báo nhầm, 77/77 mã P lên bảng. `master` dừng chỉnh ở đây (sửa tiếp dễ thành học thuộc riêng nó), chuyển sang `chore/ui-setup`, `feat/theme`. `chore/ui-setup` vòng 1: 28/37, không báo nhầm, qua bẫy dark (không bịa dark mode). `feat/theme` vòng 1: 33/43, đủ 6 lỗi dark, báo nhầm 1 (gom bo góc card khác loại). Đã sửa: lượt tối có danh sách `P` riêng phải đối chiếu, chạy đủ 5 khổ; "cùng vai" là cùng loại khối, không phải cùng là card. `feat/theme` vòng 2: 34/43, không báo nhầm, đủ 6 lỗi dark, đối chiếu cả P sáng (78) lẫn tối (93). Xong `tim-phong`, chuyển sang dự án 2. Luôn sót ở mọi vòng (máy chưa đo được): header bị bóp chiều cao, ảnh không phủ hết card, lệch mép ở ≥1400px, nút trong suốt không nhãn, focus ở mobile, vài lệch token lẻ. Chưa đo được: ảnh không phủ hết card, lệch mép ở ≥1400px, focus ở mobile |
| 2 | `lich-kham` | Next + shadcn, hệ token gọn, **ít lỗi** (8 chỗ: 5 Hỏng, 3 Lệch hệ) | Skill có dám nói "gần như ổn, chỉ có N chỗ" không, hay bịa cho đủ bảng. Quan trọng nhất | Vòng 1 (30/09/2026, `main`). Tự mở trang: bắt 5/8 (H4, H5, L1, L2, L3), báo nhầm 3 (Select không có nền rê trái luật khoá 6, nền rê nút ghost, dòng bảng rê: cả ba xếp Hỏng). Chỉ đưa ảnh: 6/6, báo nhầm 1 (checkbox shadcn ô vẽ 18px xếp Hỏng, vùng bấm thật 24px). Ba chỗ sót của lượt tự mở trang đều do probe: lượt quét bề rộng không gom chữ cắt vào danh sách `P` (H1, số "1.284.500.…" ở 820–980 và 1100–1240px); sheet cao hết màn mà rộng hơn màn bị coi là lớp phủ toàn màn nên không đo tràn (H2); vòng focus màu `oklab()` không đọc được, lại so cả `outline-width` khi `outline-style: none`, nên không thấy link sidebar Tab tới trống (H3). Đã sửa cả ba, thêm phép đo badge đè mất icon (chuông: lượt ảnh bắt, lượt tự mở trang sót), bỏ `dark:hover:` khỏi phép khai nền rê, bỏ nút `disabled` khỏi phép đo rê; review.md: checkbox, radio vẽ 16–20px trên ảnh không lên bảng. Chạy lại probe: ra đủ H1, H2, H3. Nền rê yếu hạ xuống Gu ở chế độ soi (chốt 30/09, bỏ luật "Nền rê Hỏng" 28/09); probe vẫn đưa vào `P` cho cổng 3 lúc dựng, nhãn "soi: Gu". Lỗi thật ngoài đáp án ghi ở mục 1f của đáp án (X1–X5, không trừ): badge chuông đè icon, hai kiểu chân form ở 375, ô ngày gốc, email menu tài khoản gãy giữa chữ, trang cài đặt căn giữa. Cả hai lượt không nói "gần như ổn" nhưng không bịa: Hỏng / Lệch hệ ngoài đáp án phần lớn là lỗi thật |
| 3 | `audit-skills/kho-hang` | Vite + React + CSS Modules, không Tailwind, nền tối kiểu kính, 9 lỗi (6 Hỏng, 3 Lệch hệ) + 2 Gu + 10 bẫy | Chấm Lệch hệ khi không có utility, không kéo về flat, dark làm mặc định | Vòng 1 (30/09/2026): tự mở trang bắt 5/9, chỉ đưa ảnh 6/7. Không lượt nào báo nhầm bẫy, không đòi chế độ sáng; cả hai xếp hai nút chính (G2) vào Lệch hệ. Tự mở trang sót H1 (probe gặp `body` có gradient là bỏ đo tương phản cả app), L1, L2 (lệnh grep Lệch hệ chỉ cho Tailwind), H5 (luật khoá 16 cấm báo thiếu focus). Chỉ đưa ảnh sót H3 (không đo cỡ công tắc trên ảnh). Đã sửa: probe chấm tương phản qua cha gradient theo điểm dừng tệ nhất, đo khối cùng component bo góc khác nhau, bỏ báo phân trang "rớt dòng" khi chỉ dòng chữ tách, đo "Tab tới không thấy gì" khi dự án tự vẽ vòng focus ở chỗ khác (ngoại lệ mới của luật khoá 16, chủ dự án chốt 30/09/2026); `review.md` thêm grep CSS / TS, thứ bậc nút là Gu, đo vùng bấm trên ảnh 1x. Lỗi thật ngoài đáp án: rê vào tab đang chọn thì nền tối đi (`.ghost:hover` đè `.tab[aria-selected]`) |

Sau ba dự án mồi: chạy trên **một app thật** của chủ dự án, không có đáp án, chủ dự
án tự đọc bảng. Đừng dùng dự án đã dựng bằng chính skill này, vì nó không lộ ra gì.

**Vệ sinh khi dựng dự án mồi** (đã dính ở dự án 1):

- Đáp án và bộ ảnh để ở `~/dev/phase2-dapan/<tên>/`, **ngoài mọi repo**. Skill đọc
  từ `~/dev/evondevKit`, để đáp án trong đó là nó có thể grep trúng.
- Tắt skill bằng `.claude/settings.local.json` lúc dựng, và **không commit file đó**
  (thêm vào `.gitignore` trước lần commit đầu). Test thì xoá file đi.
- Không commit ảnh so sánh với trang gốc. Commit message, tên branch, tên repo phải
  trung tính: không có chữ "mồi", "lỗi", "refactor", "test".
- Tên brand giả phải khác hẳn tên thật, không chỉ đổi vài chữ.
- Lượt "chỉ đưa ảnh" chạy trong một thư mục trống. Phiên test luôn là phiên mới, không
  dùng lại phiên đã cài lỗi.

---

## Phase 3: thiết kế từ đầu, như một designer

Ý của chủ dự án (28/09/2026): có một nhánh làm việc như designer thật. Hiểu sản phẩm là
gì, cho ai, đăng ký thế nào, rồi tới wireframe, rồi mới dựng thật. Bắt đầu sau phase 2,
vì bước dựng thật dựa trên chính các luật đang chốt ở phase 2.

**Đang làm (28/09/2026).** Kéo lên trước dark mode. Đã vào skill, chưa qua vòng test nào
(⚑): nhánh `U` ở `skills/ui-ux/references/design-process.md` (`U1`–`U5`), câu 1 của mục 0
có thêm dòng, câu 4 ghi vì sao wireframe phương án ở `U` không phải luật cũ sống lại. Hai
cổng: duyệt brief cùng việc chính (`U1` + `U2`), chọn wireframe (`U3`). Đề test đầu tiên:
trang danh sách của `tim-phong-sua`, sau khi bản dựng lại theo `V` bị chê "không khác gì".

**Vì sao cần.** Qua các vòng phase 2, phần xấu nặng nhất là cấu trúc (card quá tải,
điều hướng lặp hai lần, control sai loại, control đặt xa thứ nó điều khiển), không phải
màu. Designer bắt mấy thứ này ở wireframe, lúc sửa gần như không tốn gì. Skill hiện chỉ
bắt được sau khi đã có code (`V1b` trong `review.md`), lúc sửa đã đắt.

**Không phải mặc định.** Chỉ bật khi dựng sản phẩm hay luồng mới, hoặc khi người dùng
tự xin ("thiết kế từ đầu", "phân tích trước rồi mới dựng"). Một màn lẻ vẫn dựng luôn,
không hỏi (mục 0 của `SKILL.md`).

| Bước | Ra cái gì | Chặn |
| --- | --- | --- |
| 1. Brief | Một đoạn: sản phẩm gì, cho ai, việc chính, nền tảng. Đọc repo, README, route trước; chỉ hỏi phần không suy ra được, tối đa năm câu | Người dùng xác nhận |
| 2. Luồng và sơ đồ màn | Danh sách màn, luồng chính: vào lần đầu (đăng ký, đăng nhập), việc chính, lỗi, trống | Người dùng xác nhận |
| 3. Wireframe | HTML xám chỉ có bố cục, chạy qua luật Cấu trúc (`V1b`) trước khi đưa | Người dùng duyệt bố cục |
| 4. Dựng thật | Code theo skill, probe tới khi danh sách `P` trống | Cổng 3 trong `checklist.md` |

**Đã chốt khi bàn:**

- Không bịa nghiên cứu người dùng. Model không phỏng vấn được ai, nên không viết persona
  hay hành trình người dùng dài. Brief chỉ ghi điều đọc được từ code hoặc người dùng đã nói.
- Không có bước hi-fi mock riêng: với skill này code là hi-fi. Mock rồi dựng lại là làm
  hai lần.
- Wireframe xám để người dùng chỉ nhìn bố cục, không sa vào màu.

**Chưa chốt:** câu hỏi brief cụ thể; wireframe là một trang HTML nhiều màn hay mỗi màn một
file; test bằng đề gì (cần đề "sản phẩm mới" có đáp án bố cục để chấm).

**Lối dựng design system trước (`D9` trong `system.md`, 29/09/2026).** Người dùng hỏi "muốn
xây design system trước (component, spacing, typography) thì skill làm được không": nguyên
liệu đã có (`tokens.css`, `budgets.md`, mẫu component, `D1`) nhưng câu 1 không có dòng nào
cho đề đó, nên nó rơi vào nhánh `U` và bị ép vẽ wireframe. Test cùng đợt với nhánh `U`: một
dự án trống ("Dựng design system cho app quản lý phòng khám trước, chưa cần màn nào") và một
dự án có shadcn (phải xếp lại bộ đang có, không đẻ bộ thứ hai). Soi: có vào `D9` không, trang
`/design-system` dùng chính component hay vẽ lại, có dựng thừa mẫu không, cổng có dừng.

---

## Thư viện ảnh đối chiếu

Chưa dựng. Cấu trúc đã chốt:

```
ui-corpus/
├── ai-ui/            trang trông như AI đẻ
├── good-ui/          sản phẩm ship thật, có dữ liệu thật
└── pretty-unusable/  ảnh portfolio thiết kế, đẹp nhưng không chạy được với dữ liệu thật
```

Trong mỗi thư mục chia theo loại màn hình: `pricing/`, `settings/`, `list/`,
`form/`, `dashboard/`.

Hai điều kiện để nó có giá trị:

- Mỗi ảnh kèm **một dòng do người viết**, nói vì sao nó nằm ở thư mục đó. Ảnh
  không tự nói được. Với web thật thì lưu kèm CSS thật từ devtools, để số liệu
  là số thật chứ không phải số đoán từ hình.
- Ưu tiên **cặp đối chiếu** cùng loại màn hình, một tốt một xấu. Luật sắc nhất
  từ trước tới nay đều sinh ra từ lúc đặt hai ảnh cạnh nhau.

**Đừng lấy ảnh portfolio thiết kế làm `good-ui`.** Đó là tranh trưng bày, không có dữ liệu
dài, không có trạng thái lỗi, không có tiếng Việt làm vỡ dòng. Và nhiều mốt
trên các trang portfolio chính là thứ mục 1 đang cấm.
