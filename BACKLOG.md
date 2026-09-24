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

Bắt đầu khi xong bậc 2 và bậc 3 trong `TESTS.md`, tức là xong phase 1. Chưa làm.

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
- Nên đưa cách quét này ngược về nhánh dựng màn mới. Hiện nhánh đó chỉ kiểm ở
  375px trước khi báo xong.

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

- [ ] **Hai bản dark mode.** Một bản có dark mode và cài sẵn vài chỗ làm dở (mảng
      `bg-white` cứng, chữ đen trên nền tối, viền biến mất). Một bản chỉ có khối
      `.dark` thừa, không có cách bật, dùng để test xem skill có bịa dark mode không.
- [ ] **Lỗi ở từng khổ màn**, có cả lỗi chỉ xuất hiện giữa hai khổ cố định (ví dụ
      nav xuống dòng ở 900px), để test lượt quét bề rộng.
- [ ] **Đủ ba hạng lỗi**, có ghi đáp án riêng để chấm bắt sót và báo nhầm.

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
