# Soi UI đang có — luật V

Mở file này khi người dùng muốn biết **UI đang có trông ổn chưa**: đề có chữ "xem
giúp", "review", "chỗ nào chưa ổn", "sao trông kỳ", "nhìn rối", "cho đẹp hơn", họ gửi
ảnh chụp app của chính họ, hoặc gửi link localhost của một app đang chạy.

Khác nhánh `L` (`refactor.md`): `L` dọn code và **giữ nguyên hình**. `V` soi hình,
**đề xuất đổi hình**, người dùng chọn dòng rồi mới sửa. Đề vừa muốn dọn code vừa muốn
đẹp hơn thì soi theo `V` trước, dọn theo `L` sau.

Khác nhánh `U` (`design-process.md`): cả ba chế độ của `V` giữ **khung trang**, chỉ sửa và
làm gọn. Người dùng muốn nghĩ lại cái gì đứng đầu, lọc nằm đâu, có chế độ xem nào ("vẫn
chưa ổn về UX", "thiết kế lại từ đầu") thì đi `U`.

Ở nhánh này **skill chỉ là tham khảo**. Dự án có màu, bo góc, font riêng là hệ của
họ, không phải lỗi.

## Ba chế độ ⚑

Nhận chế độ từ đề, không hỏi, rồi nói một dòng ở phần mở đầu lúc giao.

| | **Soi** (mặc định) | **Dựng lại, giữ brand** | **Dựng lại theo gu skill** |
| --- | --- | --- | --- |
| Nhận ra khi | "xem giúp", "review", "chỗ nào chưa ổn", "nhìn rối", gửi ảnh hay link nhờ xem | "dựng lại", "làm lại giao diện", "theo skill", "cho đẹp theo skill" | "**hoàn toàn** theo gu skill", "bỏ style cũ", "đổi sang gu của skill", "không cần giữ style cũ" |
| Dòng Gu | chỉ nêu, mặc định không chọn | **chọn sẵn**, người dùng bỏ dòng nào thì bỏ | chọn sẵn |
| Dòng Cấu trúc (`V1b`) | không có | có: sắp lại thì chọn sẵn, bỏ bớt thông tin thì không | như cột giữa |
| Dòng Gọn (`V1c`) | không có | **có, chọn sẵn**: mỗi khối chính một dòng, làm gọn theo gu skill, giữ màu | như cột giữa |
| Dáng: bóng, viền, nhịp, cỡ chữ, nhãn, lớp phủ trên ảnh | giữ | **theo gu skill** | theo gu skill |
| Màu theo vai, logo, font | giữ | **giữ** | chỉ giữ logo và màu nhấn chính |
| Component | không viết lại, sửa đúng chỗ lỗi | được thay control gốc và khối tự chế bằng mẫu của skill (bảng dưới) | như cột giữa |
| Brand | giữ | **giữ theo bảng vai màu** (dưới): dựng theo cách làm của skill, tô bằng token và vai màu của dự án | **bỏ bảng vai màu**, dùng token và gu của skill (`tokens.css`, `principles.md`): nền trang xám nhạt, card trắng viền mảnh, mục chọn nền nhạt, badge nhạt. Chỉ giữ **logo** và **màu nhấn chính** của dự án làm màu nhấn duy nhất (`brand-tokens.md`). Lúc giao nói một dòng *"giữ đỏ làm màu nhấn, muốn đổi thì nói"* |
| Logic, handler, dữ liệu, câu chữ | không đụng (`N10`) | không đụng: component mới nhận đúng props và state của cái cũ. **Không thêm field vào type hay dữ liệu mẫu, không viết câu chữ mới** (khẩu hiệu, số %, số tiền, nhãn nút mới). Bố cục mới cần chữ chưa có thì dựng bằng chữ đang có, hoặc đưa lên bảng thành một dòng để người dùng tự viết | như cột giữa |
| Hỏi trước khi sửa | có | có: bảng trước, người dùng trả lời rồi mới sửa | có |
| Sửa xong | chụp lại, chạy lại probe route đó | chạy lại probe **tới khi danh sách `P` trống**, tối đa ba vòng, như cổng 3 (`checklist.md`) | như cột giữa |

Đề chỉ nói "dựng lại theo skill" là **giữ brand**: đổi nhận diện của một sản phẩm đang
chạy phải là người dùng tự nói ra, không suy từ chữ "theo skill".

**Bảng vai màu, ghi trước khi dựng lại** ⚑. Brand không chỉ là màu nút chính mà là
**cách dự án dùng màu cho từng vai**. Mở ảnh "trước" và code, ghi một bảng ngắn:

| Vai | Dự án đang làm |
| --- | --- |
| Nút chính | ví dụ: nền đỏ đặc, chữ trắng |
| Mục đang chọn (sidebar, tab, chip) | ví dụ: nền đỏ đặc, chữ trắng |
| Badge, nhãn nhỏ ("Mới", số đếm) | ví dụ: nền đỏ, chữ trắng |
| Link, hành động phụ | ví dụ: chữ xanh, không viền |
| Giá, số nổi bật | ví dụ: chữ đỏ đậm |
| Khối màu đậm, gradient | ví dụ: thẻ ví gradient navy |

Chế độ giữ brand được đổi **bố cục, nhịp, cấu trúc component, cỡ chữ, bóng, viền, cách đè
lên ảnh**: nói gọn là số 2 = gu của số 3 trừ màu. Giữ màu mà giữ luôn mọi cái rườm của
bản cũ thì bản dựng lại vẫn xấu y như cũ (đã dính 28/09/2026: card dựng lại đúng màu nhưng
còn nhãn tiền tố, chân card hai tầng, bốn lớp phủ trên ảnh).
Không được đổi **vai màu**: mục đang chọn đỏ đặc thì bản mới vẫn đỏ đặc, dù gu skill là nền
xám nhạt. Dựng xong, đặt ảnh trước và sau cạnh nhau, đi lại từng dòng của bảng. Dòng nào
đổi vai thì sửa lại cho khớp. Lúc giao ghi một dòng *"Vai màu giữ nguyên: …"*.

**Mỗi vai đúng một mã màu, cả trang ăn nhập** ⚑. Trước khi dựng, `grep` các mã viết cứng
(`-[#…]`, `red-500`, `slate-…`) trong những file sẽ đụng. Mã nào gần một màu trong bảng vai
màu (đỏ khác sắc, xanh khác sắc) là cùng vai viết lệch: gom về đúng token đó. Xám (chữ phụ,
viền, nền) về token xám của dự án, một họ xám, viền xếp theo `M14` trong `rules-color.md`.
Mã không khớp vai nào (tím, cam trang trí) thì theo dòng "Màu trang trí tranh với màu vai"
ở `V1b`. Đã dính 28/09/2026, tim-phong-sua: ba sắc đỏ (`#e61e25` token, `#ef4444`,
`#dc2626`), bốn sắc xanh (`#0068ff` token, `#2563eb`, `#3b82f6`, `#4f46e5`), viền card đậm
hơn đường kẻ sidebar; từng khối đúng brand mà ghép lại không ăn nhập.

Đã dính 28/09/2026 ở lần dựng lại đầu tiên của dự án mồi: mục đang chọn ở sidebar từ đỏ
đặc thành viền xám, badge "Mới" từ nền đỏ thành chữ xám, link đăng nhập xanh thành nút
viền. Bản mới gọn hơn, nhưng mất nhận diện.

Khối không có mẫu trong skill (card tin đăng, card sản phẩm, khối lạ của dự án) thì dựng
lại theo luồng "Dựng một thứ chưa có mẫu" ở cuối `principles.md`: mượn khuôn gần nhất,
dựng cả ca biên, probe tự sửa, rồi soi năm câu bằng mắt.

Mẫu để thay ở chế độ dựng lại (dự án đã có component riêng cho thứ đó thì dùng cái của
họ, chỉ sửa nó cho hết lỗi):

| Thứ đang có | Thay theo |
| --- | --- |
| `<select>` gốc, select tự chế | `components/choice-controls.md` (Select; từ khoảng 8 mục thì có ô tìm) |
| `<input type="range">` gốc, thanh trượt giá | `components/range-slider.md` |
| Menu, dropdown, popover tự chế | `layouts/overlay.md` |
| Checkbox, radio, công tắc, ô chọn ngày | `components/choice-controls.md` |
| Tab, chip lọc, phân trang | `components/small-controls.md` |
| Ô nhập, ô tìm | `components/input.md` |
| Nút | `components/button.md` |

---

## Bốn mặc định

1. **Soi thì không hỏi, sửa thì hỏi.** Chụp, đo, lập bảng luôn. Nhưng **không đụng
   file nào của dự án** cho tới khi người dùng chọn dòng. Đây là ngoại lệ duy nhất
   của "mặc định hơn hỏi" ở đầu `SKILL.md`: dựng màn mới thì làm luôn, còn sửa sản
   phẩm đang chạy thì hỏi.
2. **Đọc hệ của dự án trước khi chấm.** Chạy audit câu 2 và tầng 3 trong `SKILL.md`,
   đọc `tailwind.config`, `globals.css` / `index.css`, file token, component dùng
   chung. Chấm theo hệ đó, **không theo `tokens.css` của skill**.
3. **Báo nhầm tệ hơn bỏ sót.** Chỉ một dòng gọi màu brand là lỗi là người dùng hết
   tin cả bảng. Phân vân giữa hai hạng thì chọn hạng nhẹ hơn. Phân vân có phải lỗi
   không thì bỏ dòng đó.
4. **Không làm thêm việc.** Không đề xuất dark mode khi dự án chưa có (`V4`). Chế độ soi
   không đề xuất đổi phong cách; hai chế độ dựng lại thì có, qua dòng Gọn (`V1c`). Ở chế độ soi thì không viết lại component, mỗi dòng sửa đúng
   chỗ lỗi. Hai chế độ dựng lại được thay component, theo bảng ở trên.

---

## V1. Mỗi dòng một hạng ⚑

| Hạng | Căn cứ | Ví dụ | Mặc định |
| --- | --- | --- | --- |
| **Hỏng** | Sai với mọi brand | Tương phản dưới 4.5:1 (chữ lớn 3:1), trang cuộn ngang, chữ bị cắt hay bị giấu mất nghĩa, focus không thấy, vùng bấm dưới 24px, lớp nổi lòi khỏi màn, dialog cao quá màn mà không cuộn, rê chuột làm nhảy bố cục | Đề xuất sửa |
| **Lệch hệ** | Token và component **của chính dự án** | Ba kiểu bo góc nút, hai màu cho cùng một trạng thái, khoảng cách lẻ ngoài thang của họ, mã hex viết cứng gần giống token | Đề xuất sửa, theo hệ của họ |
| **Gu** | `principles.md` và luật skill | Sidebar có viền phải, badge nền đậm, nền rê đậm nhạt | Chỉ nêu, ghi "gu, tuỳ bạn", mặc định không chọn |

- **Lệch hệ phải chỉ ra được chỗ đúng trong dự án.** "Nút này bo 6px, bốn nút khác
  cùng loại bo 12px (`button.tsx:14`)" là Lệch hệ. Chỉ nói "nên bo 12px" mà không có
  chỗ nào của dự án làm thế thì đó là Gu.
- **Đếm giá trị ngoài thang không phải là Lệch hệ.** "Có 17 kiểu bo góc, gom về
  `sm` / `md` / `lg`" là đang áp thang lên dự án. Chỉ lệch khi **cùng vai mà khác
  nhau**: hai nút cùng loại đứng cạnh nhau, hai card trong cùng một lưới. Card khác loại
  (panel, thẻ số liệu, thẻ quảng bá) không cùng vai chỉ vì cùng là card, nên bo góc
  khác nhau giữa chúng không phải lỗi. Một giá trị ngoài token mà dùng đều cho một vai
  (mọi dialog bo 20px, mọi thẻ nổi bật bo 28px) là hệ của họ, dù file token không khai. Tìm mã hex viết cứng thì mỗi dòng ghi đúng vai và `file:line`: "xanh
  `#3b82f6` ở badge số đếm, trong khi xanh của hệ là token `primary` `#2563eb`".
- **Control gốc của trình duyệt chưa có kiểu là Lệch hệ ở mọi chế độ**, không cần trên
  màn có một bản đã có kiểu để so: `<select>` còn góc vuông, viền xám của trình duyệt,
  `<input type="range">` mặc định, ô nhập viền inset. Giữa một app đã có kiểu, chúng đọc
  ra là chỗ bị bỏ quên. Cột Sửa: dự án có component riêng thì dùng cái đó; chưa có thì
  dựng theo mẫu của skill (bảng "Ba chế độ"), tô bằng token của dự án. Select gốc đã
  được tô (bo góc, viền token, `appearance-none` với chevron riêng) thì ở chế độ soi không
  phải lỗi. Ở hai chế độ dựng lại, select gốc đã tô mà **hiện trên desktop** vẫn phải thay:
  bấm vào vẫn bung menu của hệ điều hành (`choice-controls.md`, Select). Probe liệt kê
  chúng ở dòng "Select gốc đã tô trên desktop".
- **Tìm Lệch hệ trong code bằng lệnh, đừng chỉ nhìn ảnh.** Hai màu đỏ gần giống nhau,
  bóng tự chế, bo góc lẻ trong một hộp thoại thì ảnh không cho thấy. Đọc token trong
  `@theme` hoặc `tailwind.config` trước, rồi grep:

  ```bash
  # màu bảng mặc định của Tailwind dùng cho vai đã có token (đỏ, xanh, xám chữ…)
  grep -rnoE "\b(bg|text|border|ring|from|to|fill|stroke)-(red|rose|blue|sky|green|emerald|amber|orange|slate|gray|zinc)-[0-9]{2,3}\b" \
    src app components --include='*.tsx' --include='*.jsx' 2>/dev/null | head -40
  # mã màu, bóng, bo góc viết cứng
  grep -rnoE "\[(#[0-9a-fA-F]{3,8}|rgba?\([^]]*\))\]|shadow-\[[^]]*\]|rounded-\[[^]]*\]" \
    src app components --include='*.tsx' --include='*.jsx' 2>/dev/null | head -60
  ```

  Kết quả trùng giá trị token (viết cứng `#2563eb` khi đã có token đó), hay lệch token
  một chút cho cùng vai (`#3b82f6` cạnh token xanh `#2563eb`), là Lệch hệ. Ghi vai và
  `file:line`, cùng gốc thì gộp. Giá trị lạ mà dùng đều cho một vai thì không (mục
  trên).
- **Không bao giờ là lỗi**, trừ khi phạm luật đọc được ở hạng Hỏng: màu nhấn và màu
  brand, bo góc lớn hay nhỏ, font, bóng / gradient / glass dùng đều khắp dự án, mật
  độ dày hay thoáng, dự án nhiều màu hơn gu skill (đầu `principles.md`), khối màu đậm
  hay gradient của brand (thẻ ví, banner), icon và badge mỗi loại một màu. Mấy thứ này
  **cũng không đưa vào hạng Gu**: "thẻ ví navy nặng quá, đổi sang card trắng" hay "icon
  danh mục gom về một màu xám, badge còn hai tông" là đòi đổi nhận diện, không phải gu
  (dính cả hai vòng đầu của dự án mồi, 27/09/2026). Ngoại lệ ở hai chế độ dựng lại:
  màu **trang trí** theo `V1b`, và dáng (bóng, mật độ, viền) theo dòng Gọn `V1c`. Màu vai và
  khối màu đậm của brand thì vẫn không.
- **Gu tối đa năm dòng** ở chế độ soi, xếp cuối bảng. Hai chế độ dựng lại không giới hạn,
  nhưng Gu của một khối chính thì gom vào dòng Gọn của khối đó (`V1c`).

Probe báo không có nghĩa là lỗi Hỏng. Nhiều mục của probe đo theo gu skill, nên đổi
sang hạng theo bảng này. Những mục xếp Hỏng thì probe đã tự gom thành danh sách `P1`,
`P2`… ở cuối báo cáo (xem `V5`).

| Mục probe | Hạng |
| --- | --- |
| Trang tự cuộn khi vừa tải, cuộn ngang, lớp nổi lòi khỏi màn, lớp nổi mở bằng nút bị vỡ, rê chuột làm nhảy bố cục, tab tới mà không thấy gì đổi, tương phản chữ dưới ngưỡng, khung giấu mất chữ, chữ cắt còn quá ngắn, chữ trong nút xuống dòng, nhãn số đè lên đường biểu đồ, khối bị bóp chiều cao, chữ cắt nuốt mất số, rê ra đúng màu mục đang chọn, rê vào ô đã chọn làm mất màu nhấn, scale / translate / rotate không chạy chuyển động (`W10`), đường ngăn thẳng hàng mà khác màu (một đường nửa nhạt nửa đậm, sai với mọi brand) | Hỏng |
| Chỗ bấm dưới 32px | Mục có ghi "(dưới 24px)" là Hỏng, còn lại (24 tới 31px) là Gu |
| Hàng trong header / nav rớt dòng | Hỏng khi đè hay đẩy lệch khối khác, không thì Lệch hệ (so với cách hàng đó ở khổ khác). Xem ảnh mới quyết |
| Hàng nút trên header không đồng cỡ | Lệch hệ. Chế độ dựng lại thì vào dòng Gọn của header (`V1c`), theo "Nhóm nút bên phải thanh header" trong `layouts/app.md` |
| Vạch chia trong menu đậm hơn viền khung, vạch trái bị bo góc khung cắt, khung hộp thoại mờ lồng trong lớp nền mờ, cao gần bằng mà không bằng, đường ngăn hai cột kề nhau lệch, chữ cùng cột lệch mép, dấu ngăn cách không đều, control còn kiểu mặc định của trình duyệt, khung khai viền mà viền không thấy, khối con biến mất lúc rê, lớp nổi có dải trống | Lệch hệ |
| Nền rê gần như không thấy, nền rê tan vào nền khác, viền đổi màu lúc rê, rê / focus khác hình mục đang chọn, bấm xong còn dấu thừa, vòng focus không bọc hết link, bảng cuộn ngang mất cột, nhóm lựa chọn xếp lưới, số tiền ngắt dòng, số không thẳng hàng, nhãn số lòi ra ngoài vùng vẽ, dấu câu rơi xuống đầu dòng, chữ dưới 12px (gộp một dòng, ghi cỡ nhỏ nhất và chỗ; sửa lên ít nhất 12px), cột dính mà cuộn riêng, nội dung trôi giữa màn rộng (`layouts/app.md`), mục lặp dày chữ | Gu |
| Select gốc đã tô trên desktop | Chế độ soi: không vào bảng. Hai chế độ dựng lại: Lệch hệ, thay bằng Select dựng (từ 8 mục có ô tìm) |
| Lỗi console | Không vào bảng. Ghi một dòng dưới bảng |

---

## V1b. Hạng Cấu trúc, chỉ ở hai chế độ dựng lại ⚑

Chế độ soi không có hạng này. Người dùng đã nói "dựng lại" thì ngoài control gốc, họ
muốn biết màn **sắp xếp** có ổn không: khối nào quá tải, chỗ nào tranh nhau, control nào
sai loại. Probe không đo được mấy thứ này, phải soi ảnh và đọc code.

| Loại | Dấu hiệu | Sửa theo hướng |
| --- | --- | --- |
| Tín hiệu tranh nhau (`N3`) | Trong một khối có từ ba thứ cùng dùng tín hiệu đắt (màu nhấn, tô đặc, chữ lớn đậm), hoặc hai nút cùng mức nhấn đứng cạnh nhau | Giữ một thứ nổi nhất. Hai nút thì một nút chính, một nút phụ (`I1`). **Hạ mức nhấn, không đổi màu** |
| Hai chỗ một việc | Hai nút dẫn tới cùng một việc, một thông tin hiện hai lần trong cùng khối. Ở mức cả màn: cùng một bộ điều hướng hiện hai lần (menu bên và lưới ô danh mục), tên trang lặp ở header, tiêu đề và mục đang chọn, cùng một lời mời ở hai chỗ | Giữ một |
| Thông tin không phân biệt được gì | Mọi mục trong danh sách mang cùng một nhãn, số 0 hiện ra như một thông tin, giá trị thiếu in thành chữ ("Chưa rõ ngày đăng", "Không có mô tả") | Chỉ hiện ở mục khác đi. Số 0 ẩn hoặc nói bằng chữ. Giá trị thiếu thì ẩn cả mẩu đó |
| Khối quá tải | Card trong lưới có hơn khoảng sáu mẩu thông tin, dòng phụ bị cắt "…" ngay ở khổ thường | Giữ thứ dùng để chọn giữa các mục. Phần còn lại để trang chi tiết |
| Control sai loại | Ô to cho lựa chọn nhanh, select cho hai lựa chọn, control tự chế có phần không làm gì | Theo bảng mẫu ở "Ba chế độ" (chip, segmented, `range-slider`…) |
| Đặt sai chỗ | Control nằm xa thứ nó điều khiển (sắp xếp, lọc tách khỏi danh sách), nhãn cùng hàng lệch cao, một khung trộn nhiều kiểu bố trí | Đặt sát thứ nó điều khiển. Cùng hàng thì cùng mép trên |
| Màu trang trí tranh với màu vai | Icon, hình minh hoạ, nền ô icon mỗi cái một màu, nhiều tới mức nút chính và giá không còn là thứ nổi nhất | Gom màu trang trí về một hoặc hai tông của brand. **Chỉ màu ngoài bảng vai màu**, màu trong bảng giữ nguyên |
| Khối quảng bá lấn nội dung | Banner chiếm quá nửa màn đầu, nói một ý hai lần (con số ở tiêu đề và trong hình), nhiều hơn một nút, chữ trong hình minh hoạ bị cắt | Thu chiều cao, một tiêu đề một nút, bỏ chỗ lặp. Hình minh hoạ là của họ: không vẽ lại, chỉ đổi khung và chữ quanh nó |

- Mỗi dòng chỉ đúng chỗ (route, khối, `file:line`) và nói bằng cái người dùng cuối vấp.
  "Card nhìn rối" chưa phải một dòng.
- **Không phải lối vòng để đổi màu.** "Badge nhiều màu quá", "đổi đỏ sang xám" vẫn thuộc
  "Không bao giờ là lỗi" (`V1`). Màu nhiều thì nói bằng thứ bậc: cái gì đang tranh nhau,
  hạ cái nào xuống, màu giữ nguyên theo bảng vai màu.
- **Chọn sẵn hay không.** Dòng chỉ sắp lại (hạ mức nhấn, đổi loại control, dời chỗ) thì
  chọn sẵn ✓. Dòng bỏ, ẩn hay gộp thông tin, và dòng gom màu trang trí, thì **không chọn
  sẵn**: đó là quyết định sản phẩm và nhận diện, người dùng tự thêm. Luật này chỉ cho
  dòng Cấu trúc: dòng Gu ở chế độ dựng lại vẫn **chọn sẵn** như bảng "Ba chế độ".
- **Một dòng một quyết định.** "Bỏ tên trang trên header, và đổi màu chip đang chọn" là hai
  dòng: người dùng có thể muốn cái này mà không muốn cái kia.
- **Đi đủ các loại trong bảng trên từng route đã soi**, không chỉ route nhiều control. Khối quảng bá
  và điều hướng lặp hay nằm ở trang chủ, nơi probe ít đo ra gì.
- Tối đa mười dòng, xếp sau Lệch hệ, trước Gu.
- Định dạng dữ liệu (số lẻ dài, đơn vị lẫn lộn) nằm ở hàm của họ (`N10`): không lên bảng,
  nhắc một dòng dưới bảng.

---

## V1c. Dòng Gọn, chỉ ở hai chế độ dựng lại ⚑

Người dùng nói "dựng lại cho đẹp" là muốn **bản sau trông khác hẳn bản trước**, không phải
bản cũ vá vài lỗi. Nên mỗi khối chính (card lặp trong lưới, khối lọc, header, panel bên,
khối quảng bá) có **một dòng Gọn**: đặt khối đó cạnh mẫu gần nhất của skill (`card.md`,
`list-row.md`, `input.md`, `small-controls.md`, `layouts/app.md`…) rồi ghi mọi chỗ khác,
**trừ màu trong bảng vai màu, logo, font**. Chế độ 3 thì đổi cả màu.

Hay gặp:

| Rườm | Gọn theo hướng |
| --- | --- |
| Nhãn tiền tố trước giá trị tự hiểu ("Ngày: 12/09", "Tổng: 1.200.000đ") | Bỏ nhãn, thứ bậc bằng cỡ chữ và vị trí |
| Chừa chỗ cho hai dòng tiêu đề, tiêu đề một dòng để lại khoảng trống | Chiều cao theo nội dung, chân card đẩy xuống đáy bằng flex |
| Từ ba lớp phủ trên ảnh trở lên (badge, nhãn, số đếm, nút) | Tối đa hai: một badge và một nút. Còn lại xuống phần chữ |
| Chân card hai tầng (dòng thời gian riêng, hàng nút riêng), nền khác màu thân card | Một hàng. Thời gian lên dòng meta |
| Icon trước mỗi dòng meta | Chỉ giữ icon mang nghĩa (vị trí). Meta gom một dòng, ngăn bằng `·` |
| Viền cộng bóng cộng nền khác, hai ba lần tách một ranh giới | Một cách tách: viền mảnh hoặc nền, bóng chỉ cho lớp nổi (`budgets.md`) |
| Ô nhập mang viền màu nhấn khi chưa focus | Viền token thường, màu nhấn chỉ lúc focus |
| Ba bốn sắc độ chữ phụ trong một khối | Hai: chữ chính và `text-muted` |
| Khoảng cách lẻ, mỗi khối một nhịp | Thang của skill (`budgets.md`, Nhịp) |

- Một dòng Gọn gom nhiều thay đổi của **cùng một khối**, cột Sửa liệt kê ngắn, và **bắt buộc
  có ảnh trước / sau** (chèn CSS tạm, `V5`). Không có ảnh thì người dùng không hình dung
  được "gọn" là gì.
- Chọn sẵn ✓. Dòng Gọn không bỏ thông tin: bỏ nhãn tiền tố thì giá trị vẫn còn. Thứ phải
  bỏ hẳn (một mẩu thông tin, một nút) thì tách ra thành dòng Cấu trúc, không chọn sẵn
  (`V1b`).
- Đường giữ brand: màu của nút, mục đang chọn, badge, giá không đổi. Bo góc giữ họ bo góc
  của dự án (tròn vẫn tròn, vuông vẫn vuông), chỉ gom về một cỡ cho cùng vai.
- Xếp sau Cấu trúc, trước Gu.

---

## V2. Nguồn ảnh và độ tin ⚑

- **Có app chạy** (link localhost hay URL, hoặc chạy được dev server): tự chụp bằng
  probe (`V3`). Danh sách route lấy từ file router. Vướng đăng nhập, cần dữ liệu
  thật, hay server không chạy thì nói thẳng một dòng rồi xin ảnh, không đoán.
- **Người dùng gửi ảnh**: ảnh của họ thắng ảnh tự chụp khi hai bên khác nhau, vì đó
  là thứ họ thật sự thấy (đã đăng nhập, dữ liệu thật). Khác nhau thì nói ra một dòng.
- **Chỉ có ảnh, không có code**: vẫn làm. Hạng Lệch hệ chỉ dựa trên cái thấy trong ảnh
  (hai nút cùng loại hai kiểu bo góc), không nói tới token.
- **Video**: model không xem video được. Tách khung ra rồi chọn các khung quanh lúc
  chuyển động: `ffmpeg -i quay.mp4 -vf fps=4 "$TMPDIR/evon-review/khung/%03d.png"`.
- **Mỗi dòng ghi nguồn**: *đo*, *thấy trong ảnh*, *đọc code*, hay *đoán*. Ảnh tĩnh
  không cho thấy hover, focus, chuyển động, cấu trúc a11y hay bề rộng khác, nên
  **không khẳng định những thứ đó chỉ từ ảnh**. Hoặc ghi "cần kiểm khi chạy", hoặc bỏ
  dòng đó. Tương phản đọc từ ảnh là màu hút từ pixel, ảnh nén lệch vài mức, nên chỉ
  báo khi thấp rõ (dưới khoảng 4:1).
- **Lỗi tương tác phải đã thử.** Rê chuột, Tab, tải trang, mở lớp nổi: ghi *đo* khi
  probe hay chính mình đã làm thao tác đó và thấy lỗi. Chỉ đọc code mà suy ra ("có
  `group-hover:flex` nên chắc card giật") thì ghi *đọc code, chưa thử*.

---

## V3. Soi đủ khổ, quét bề rộng, mở lớp nổi ⚑

Mỗi route một lượt:

```bash
node <thư mục skill>/scripts/probe.mjs http://localhost:5173/<route> \
  --sweep --out "$TMPDIR/evon-review/<route>"
```

| Khổ | Bề rộng | Hay vỡ ở đâu |
| --- | --- | --- |
| Mobile | 375 | Tràn ngang, lề rộng ăn mất bề ngang, hàng chip hay tab rớt dòng |
| Tablet dọc | 768 | Lưới hai cột bị bóp, sidebar chưa thu mà nội dung đã chật |
| Tablet ngang | 1024 | Ngưỡng thu sidebar, drawer đè gần hết nội dung |
| Laptop nhỏ | 1280 | Bảng nhiều cột cạnh sidebar, toolbar xuống dòng |
| Desktop | 1440 | Nội dung kéo quá dài, dòng chữ quá rộng |
| Màn rộng | 1920 | Nội dung căn giữa trôi khỏi sidebar, card kéo dài nửa trống |

- **Chụp ở khổ cố định chưa đủ.** `--sweep` kéo bề rộng từ 1440 xuống 375, mỗi bước
  20px, rồi báo **khoảng bề rộng** có lỗi. Mở các ảnh ở mục "Khung đáng xem", và thêm
  vài ảnh quanh ngưỡng sidebar thu và ngưỡng lưới đổi cột: chồng lấn hay lệch hàng
  thì máy không đo được. Chỉ khung có lỗi mới lên bảng.
- **Tràn ngang thì đo, không chỉ nhìn.** Probe ghi phần tử lòi ra. Chép selector đó
  vào bảng, hạng Hỏng, nguồn *đo*.
- **Mở cả lớp nổi ở 375.** Probe tự mở nút có `aria-haspopup`, và ở màn hẹp còn bấm
  thử thứ **trông như nút mở**: có `aria-expanded`, nhãn "menu", "lọc", "thông báo",
  "chọn"…, icon chuông, ba chấm, chevron, kể cả nút chỉ có icon và dòng `div` bấm được.
  Nó chụp từng lớp vừa mở (`<khổ>-mo-<n>.png`) và đo tràn mép, cao quá màn. Thứ có
  nhãn hay icon hành động (xoá, lưu, tim, gửi, thanh toán) thì không bấm. Mở từng
  ảnh ra xem. Lớp nổi nào probe không mở tới thì tự bấm bằng Playwright rồi chụp, hoặc
  ghi rõ "chưa soi được X". Ảnh trang đang đóng không cho thấy menu tràn mép hay
  dialog cao quá màn.
- **Mỗi dòng ghi khổ màn hay khoảng bề rộng bị lỗi**, ví dụ "375px" hoặc "860–1000px".

---

## V4. Dark mode: có thì soi cả hai, chưa có thì không bịa ⚑

Cùng tinh thần `M20` (mặc định chỉ light), nhưng dự án đã có sẵn thì theo dự án.

- **"Có dark mode" nghĩa là bật được, không phải chỉ có khai báo.** Dự án dựng từ
  shadcn thường có khối `.dark` trong `globals.css` mà chưa bao giờ dùng. Chỉ coi là
  có khi thấy **cách bật**:

  ```bash
  grep -rlE "next-themes|ThemeProvider|setTheme|classList\.(add|toggle)\(['\"]dark|prefers-color-scheme|data-theme" \
    --include='*.tsx' --include='*.ts' --include='*.jsx' --include='*.js' --include='*.css' . | grep -v node_modules
  ```

  Rồi chụp lại bằng `--dark` và so với ảnh light. Màn không đổi màu thì dark chỉ có
  khai báo. Probe gắn class `dark` lên `<html>` và giả lập `prefers-color-scheme`;
  dự án bật bằng `data-theme` thì gắn thuộc tính đó rồi tự chụp.
- **Chưa có (hoặc chỉ khai báo) thì không làm**: không chụp dark, không đề xuất dark,
  không thêm class `dark:` vào code sửa. Ghi tối đa một dòng "dự án chưa bật dark
  mode" ở phần mở đầu, không vào bảng.
- **Có thì soi đủ hai chế độ.** Chạy probe thêm một lượt `--dark` ở đủ các khổ mặc định (không cần
  `--sweep`), ảnh "sau" cũng đủ hai bản. **Lượt tối có danh sách `P` riêng** và phải đối
  chiếu như lượt sáng (`V5`): màu nhấn giữ nguyên trên nền tối hay tụt dưới 4.5:1, và chỉ
  lượt tối đo ra điều đó. Dòng đếm tách hai phần: "sáng 78 mã, tối 41 mã". Màu dark lấy đúng token dark của dự án (khối `.dark`,
  `[data-theme="dark"]`), không lấy navy của skill (`M23`).
- **Dark mode làm dở là Hỏng**: có nút bật mà còn mảng nền trắng cứng, chữ đen trên
  nền tối, viền biến mất, logo tối trên nền tối, bóng không thấy.
- **Sửa một chế độ thì chụp lại cả hai.** Sửa cho light đẹp mà làm vỡ dark là lỗi hay
  gặp nhất ở dự án có hai chế độ.

---

## V5. Bảng giao, ảnh "sau", và sửa dòng đã chọn ⚑

**Ảnh "sau" phải là render thật, không phải lời mô tả.**

- Có app chạy: chèn CSS tạm vào trang (`page.addStyleTag`) rồi chụp đúng khổ đó.
  Chưa đụng file nào của dự án.
- Chỉ có ảnh: dựng lại vùng bị lỗi thành HTML tĩnh, dùng màu hút từ ảnh của họ,
  không dùng màu skill. Ghi rõ "mô phỏng".
- Dòng Gu không cần ảnh "sau".

**Bảng giao là bảng markdown trong chat**, không dựng trang HTML. Thứ tự:

1. **Mở đầu**, mỗi thứ một dòng: dòng `Audit:` (stack, hệ token ở đâu, phong cách,
   dark mode: có / chỉ khai báo / không), đã soi route nào ở khổ nào, chỗ nào chưa soi
   được và vì sao.
2. **Bảng**: xếp Hỏng trước, rồi Lệch hệ, Cấu trúc và Gọn (chỉ ở chế độ dựng lại, `V1b`,
   `V1c`), Gu cuối.

   | # | Hạng | Chỗ | Lỗi | Sửa | Nguồn | Ảnh |
   | --- | --- | --- | --- | --- | --- | --- |
   | 1 | Hỏng | `/orders`, 860–1000px, `nav` trong header | Menu trên đầu xuống hai dòng, đẩy tiêu đề trang lệch xuống | Chuyển sang nút menu từ 1000px thay vì 860px | đo | [trước](…) · [sau](…) |
   | 7 | Gu | Sidebar | Viền phải cộng nền khác màu, hai lần tách một ranh giới. Gu, tuỳ bạn | Bỏ viền | đọc code | |

   - Cột **Lỗi** nói bằng cái người dùng cuối thấy ("menu xuống hai dòng, đẩy ô tìm
     kiếm lệch"), không nói bằng tên luật.
   - Cột **Sửa** nói theo hệ của dự án: token nào, component nào, file nào.
   - Lỗi lặp ở nhiều màn mà cùng một gốc (component dùng chung) thì gộp làm một dòng,
     ghi các màn bị ảnh hưởng.
3. **Đối chiếu danh sách `P` của probe trước khi giao.** Cuối báo cáo probe có mục
   "Việc phải đối chiếu": mọi thứ máy đo ra mà `V1` xếp Hỏng, đánh mã `P1`, `P2`…, kèm
   khoảng bề rộng. Mỗi mã phải **lên bảng** (cột Nguồn ghi `đo P3`, soi nhiều route thì
   ghi kèm route: `đo /orders P3`; cùng gốc thì gộp nhiều mã một dòng) **hoặc có lý
   do loại** ở dưới bảng. Dưới bảng luôn có một dòng đếm:

   > Đối chiếu probe: 19 mã, 17 lên bảng, 2 loại: `/orders P7` (khung giấu chữ là
   > carousel cố ý trượt, đã xem ảnh), `/orders P12` (thanh dưới đáy che chữ lúc chụp).

   **Loại chỉ khi mã đó không phải lỗi** (đo nhầm, cố ý, đã xem ảnh không thấy). Lỗi thật
   mà sửa phải đổi token dùng khắp app thì vẫn lên bảng, ghi rõ "đổi token, ảnh hưởng
   toàn app": chọn hay không là việc của người dùng, không phải lý do để loại.

   Hai vòng đầu của dự án mồi, nhiều lỗi probe đã đo ra mà bảng giao không có. Máy đo ra
   mà bảng không có thì người dùng không có cách nào biết đã bị bỏ.
4. **Rà hạng Gu và Cấu trúc lần cuối**: dòng nào đề xuất bớt màu, đổi màu brand, làm nhạt khối màu
   đậm của brand thì xoá (`V1`, "Không bao giờ là lỗi"). Dòng Gọn cũng rà: đổi màu trong
   bảng vai màu là sai chế độ 2.
5. **Kết**: *"Trả lời số dòng muốn sửa, ví dụ `sửa 1, 3, 4`."* Chế độ soi: không tự đề
   nghị sửa hết. Hai chế độ dựng lại: dòng nào đã chọn sẵn thì đánh ✓ ở đầu dòng, kết bằng
   *"Mình sẽ sửa các dòng ✓. Trả lời `ok`, hoặc bỏ bớt, ví dụ `bỏ 7, 12`."*

**Người dùng chọn xong:**

- Chỉ sửa đúng các dòng đó, bằng token và component của họ. Lỗi nằm ở component dùng
  chung thì sửa ở component đó, và nói trước là nó đổi luôn các màn khác.
- Sửa xong thì chụp lại cùng khổ (có dark thì chụp cả hai chế độ), đặt ảnh trước và
  sau cạnh nhau, rồi chạy lại probe trên route đó để chắc lỗi đã hết mà không đẻ lỗi
  mới.
