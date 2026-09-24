# Checklist

Ba cổng. Mỗi cổng chạy ở một thời điểm khác nhau — đừng gộp làm một lượt cuối.

Mỗi dòng ở đây là một lỗi **đã thật sự xảy ra**. Dòng nào ba vòng test liền không
bắt được lỗi nào thì xoá (luật ở `SKILL.md` mục 4).

---

## Cổng 1 — trước khi viết dòng class đầu tiên

- [ ] Đây là **refactor** hay **dựng mới**? Chưa trả lời thì chưa được đi tiếp.
- [ ] **Đã báo dòng "Audit: …" chưa?** Không có dòng đó là chưa audit, dù có grep hay không.
- [ ] Đã grep `package.json` và `components/ui` chưa — họ dùng Tailwind? shadcn? Hay bộ khác?
- [ ] **Thứ sắp dựng đã có trong codebase chưa?** Grep tên nó (`Avatar`, `Dropdown`, `Modal`…). Có rồi thì dùng, đừng dựng cái thứ hai.
- [ ] **Đã chạy audit tầng 3 (phong cách) chưa?** Dự án có phong cách khác flat thì theo dự án, không hỏi, báo một dòng lúc giao; dự án flat mà tự đổi sang glass là sai (`P1`).
- [ ] Phong cách đã chọn không phải flat: đã mở đúng khối của nó trong `styles.md` và kiểm hết mục **Bẫy** chưa?
- [ ] **Tương phản (`P3`)**: chữ thường ≥ 4.5 : 1, đo ở **chỗ tệ nhất** — đầu nhạt của gradient, vùng sáng nhất phía sau kính. Chữ phụ `/50` là thứ trượt trước.
- [ ] Theo phong cách của dự án nhưng **không theo lỗi** của dự án: vẫn chỉ một nút chính (`I3`), vẫn một màu nhấn (`M3`).
- [ ] **Không có `package.json`?** Vậy sắp đưa code gì ra — `.tsx` hay HTML thuần? Đưa JSX cho dự án không React là hỏng.
- [ ] Đã grep token sẵn có chưa (`--primary`, `--brand`, `font-family`)? Có thì dùng, đừng hỏi.
- [ ] **Copy sắp viết bằng tiếng gì** — đã grep i18n và nhãn hiện có chưa (`T24`)?
- [ ] Đề bài có từ nào mơ hồ không (bảng, thẻ, danh sách, khung, trang, lịch)?
- [ ] Đề để hở: đã dựng **đủ bộ khối mặc định** trong file layout chưa, hay làm mỏng dính (`S5`)? Không hỏi phạm vi.
- [ ] Không có wireframe thì đã dựng **bố cục mặc định** trong file layout chưa, hay tự bịa? Đã báo một dòng "muốn kiểu khác thì nói" chưa?
- [ ] Đề nhiều hơn một màn? Đã chốt **hợp đồng nguyên tố** (`system.md` `D1`) chưa?
- [ ] Người dùng nói "chưa biết muốn UI thế nào" → đã dựng hướng A và báo còn B, C chưa?

---

## Cổng 2 — dựng xong, trước khi báo

- [ ] **Mười phép thử `N1`–`N10`** (`principles.md`) đã chạy chưa? Thứ không có dòng riêng trong checklist này thì bám chúng.

### Phạm vi

- [ ] Đối chiếu với đề bài: có section nào **mình tự thêm** không? Có thì bỏ.
- [ ] Có con số hay chính sách nào mình tự bịa mà lẽ ra phải để `[cần điền]` không?
- [ ] Có dòng nào để `[cần điền]` mà lẽ ra phải điền số giả không?
- [ ] Project có sẵn component mà mình viết lại không?

### Màu

- [ ] Đếm màu nhấn trên màn hình. Nhiều hơn một thì cắt (tag phân loại không tính, `M8`).
- [ ] **Cả màn có chỗ nào dùng màu nhấn không?** Không có là chưa quyết định, không phải tối giản (`D5`).
- [ ] Có khối nào được tô nền màu chỉ để phân loại không? Phân loại bằng icon + chữ (`M5`).
- [ ] Grep mã hex. Chỉ được có trong khối đổi thương hiệu ở đầu file.
- [ ] Mọi mã hex có đúng 6 hoặc 8 ký tự sau `#` không? Lệch là CSS chết âm thầm.
- [ ] Khối thương hiệu có khớp **từng ký tự** với `tokens.css` không?

### Viền, bóng, khối

- [ ] Có `shadow-*` nào trên khối **nằm trong trang** không? Bóng chỉ cho modal/dropdown (`M15`), ngoại lệ trong trang chỉ có ô chọn của tab `segmented` và núm công tắc (`shadow-sm`).
- [ ] Có token viền nào tự đẻ ra ngoài `--border`, `--border-strong`, `--border-focus` không?
- [ ] Có chỗ nào mỗi mục một card không? Gom thành một khung chia đường kẻ (`F3`).
- [ ] Dòng tiêu đề và nút "Xem tất cả" có nằm **trong** khung không?
- [ ] Phần tử nổi bật có mang quá một dấu hiệu không (badge + viền + to hơn)?
- [ ] Bảng có bị bọc vào card không?
- [ ] **Bảng**: rê chuột lên một dòng, nền hover có trùng màu nền trang không? Phải `--surface-hover` (`I10`). Cột trạng thái là badge màu (`M7`)? Từ 3 hành động hoặc có xoá thì đã gom vào nút ba chấm chưa (`I11`)? Tab trạng thái là ô nền `--surface-hover` viền mảnh, không chip đen?
- [ ] Bo góc có nằm trong bốn bậc không, và có bo nhầm link chữ không nền không?

### Nút và trạng thái

- [ ] Nút mặc định có phải **nút viền** không, hay đang là nền nhấn? Icon chỉ ở nút mà glyph gọi đúng hành động; nút form và nút trong modal chỉ có chữ (`I1`)
- [ ] Trong một nhóm có đúng một nút nền nhấn không?
- [ ] Nút phụ có trông như đã bị khoá không? Chữ và nền có đủ chênh không?
- [ ] "Xem tất cả" / "Đọc thêm" có đang là nút nền xám hay link chữ trơn không? Phải là nút `ghost` `h-8`, căn phải, không icon mũi tên (`I7`).
- [ ] **Rê chuột lên một hàng: có phần tử con nào biến mất không?** (`M18`)
- [ ] Rê chuột lên hàng: nền hover có ôm sát chữ không? Phải có padding đủ bốn phía.
- [ ] Màn chỉ có MỘT card giữa trang trống? Vậy card phải **không viền** (`M29`), và không bao giờ có cả viền lẫn bóng.
- [ ] **Đăng xuất** ở cuối menu sau đường chia, lúc thường trung tính, **rê vào thì đỏ** như mục xoá (`I4`)?
- [ ] **Nút xoá** đứng riêng: nền `rose-500/10` + chữ `rose-700` ngay lúc thường, không viền, không đỏ đặc (`I4`)? **Mục** xoá trong menu: rê vào thì chữ, icon VÀ nền cùng đỏ lên chưa? Icon còn xám là thiếu `group`. Chữ đỏ là `rose-700` chưa, hay đang `rose-500` hồng tươi (3.2:1, trượt tương phản)? Radix thì đi bằng phím mũi tên cũng đỏ (`data-[highlighted]`)?
- [ ] Đỏ đang dùng đúng sắc chưa (`M30`)? Lỗi là `red`, hành động nguy hiểm lúc rê vào là `rose`. Không có viền hay banner `rose`.
- [ ] Đường chia trong dropdown, card: có chạm hai mép khối không, hay thụt theo padding (`F25`)?
- [ ] **Bo lồng nhau (`M19`)**: bo khung ngoài = bo phần tử trong + padding khung? Dropdown mặc định `rounded-2xl` + `p-1` + mục `rounded-xl` (`layouts/overlay.md`). Command palette rộng thì `p-2` + mục `rounded-lg`. Trong bằng ngoài là góc phình.
- [ ] **Vùng cuộn trong lớp nổi** (select, dropdown dài, command palette): chưa rê chuột, mép dưới có cắt ngang một mục (lộ khoảng nửa) không? Cắt sát ranh giới hai mục là trông như đã hết. Rê chuột vào (không cuộn) thì thanh cuộn có hiện không? Chỉ hiện khi cuộn là đang dùng CSS thanh cuộn cũ (`I18`).
- [ ] **Sidebar**: nền trắng chứ không trùng nền trang; hover và mục đang chọn cùng nền mờ `--background`, không `--secondary`; hover vào thì icon và chữ cùng đậm lên; số đếm là số trơn `text-muted`, không pill, không badge màu brand (`I15`); nhãn nhóm IN HOA, giữa các nhóm không kẻ đường chia (chỉ khoảng trắng + nhãn), profile là hàng không viền có icon `ChevronsUpDown`, nhiều nhóm thì thu gọn được; thanh cuộn tự ẩn (`I18`).
- [ ] **Thu gọn sidebar**: thu về dải icon `w-16`; **mục nào đang hiện lúc mở thì lúc thu vẫn hiện**, nhóm đang đóng vẫn đóng; nhãn nhóm chỉ `opacity-0` + `inert`, giữ chiều cao hàng; chấm góc icon chỉ cho số cần xử lý, cùng độ đậm với số lúc mở; mục đang chọn vẫn sáng và được cuộn vào tầm nhìn; lúc thu ẩn thanh cuộn (vẫn cuộn được); bấm mở/thu thì icon, logo, avatar ĐỨNG YÊN (không `justify-center`, không đổi padding), chữ không gỡ khỏi DOM mà bị cắt dần và mờ đi; mỗi icon có tooltip kèm số đếm; focus theo `I13` (`layouts/app.md`).
- [ ] **Chân sidebar**: profile là một hàng `h-10` **không viền**, avatar không viền, icon `ChevronsUpDown` ở mép phải, cả hàng là nút mở menu; lúc thu rê vào thì vòng quanh avatar, không tô ô vuông; email ở đầu menu, không cắt; menu rộng bằng hàng; Đăng xuất cuối menu, đỏ khi rê (`layouts/app.md`).
- [ ] **Rê chuột chậm từ mép trái sang mép phải** của từng mục menu, link sidebar, dòng bấm được: con trỏ có giữ bàn tay suốt không? Đổi một lần là vùng bấm hụt (`I29`).
- [ ] Tailwind v4: `<button>` có `cursor-pointer` chưa, hoặc base CSS đã trả lại chưa (`W7`)?
- [ ] **Bấm Tab qua các nút, tab, checkbox**: có vòng mờ `ring-foreground/50` cách 2px không? Bấm chuột thì không được hiện. **Trong menu** thì mục đang focus đổi nền như hover, không vòng (`I13`).
- [ ] **Bấm Tab qua ô nhập, select**: có viền `--border-focus` **và** ring mờ `--ring-focus` `ring-2` chưa? `ring-4` là quá dày (`F20`). Select đang mở cũng giữ viền + ring (`I13`).
- [ ] **Checkbox / radio / công tắc** (`components/choice-controls.md`): cỡ mặc định 20px (công tắc 24×44), không phải 16px? Card chọn: đang chọn có viền + ring? Khoá thì nhãn mờ theo? Nhóm radio có sẵn một lựa chọn và có `<legend>`?
- [ ] Vừa Tab vừa rê chuột trong menu: có **hai mục sáng cùng lúc** không? Chỉ được một (`data-[highlighted]`).
- [ ] Rê chuột lên **nút chính**: có đổi màu không? Nút `primary` là chỗ hay quên hover nhất (`I9`).
- [ ] **Bấm vào chữ nhãn**: ô có focus không (`for`/`htmlFor`)? Con trỏ có thành bàn tay không?
- [ ] **Bấm vào khoảng trắng bên phải chữ nhãn**: ô KHÔNG được focus. Focus là thiếu `w-fit` (`I26`).
- [ ] Form có ô mật khẩu: có nút hiện/ẩn chưa, và nó có `type="button"` không (`I27`)?
- [ ] Có placeholder nào chỉ chép lại nhãn ("Nhập email của bạn") không? Có thì bỏ (`T25`).
- [ ] Đọc từng câu lỗi: có câu nào **trùng chữ** với placeholder hay nhãn của chính ô đó không? Trùng là bỏ.
- [ ] Chữ đỏ dưới ô có thật sự là lỗi không, hay là **gợi ý bị tô đỏ**? Gợi ý thì xám và hiện sẵn.
- [ ] **Màn xác thực: đã báo một dòng** về "quên mật khẩu" / ghi nhớ đăng nhập / mạng xã hội chưa? Dựng theo mặc định thì được, dựng xong im lặng thì không.
- [ ] "Quên mật khẩu?" có nằm cùng hàng với nhãn không? Dưới ô nhập là **tranh chỗ với câu lỗi**.
- [ ] "Quên mật khẩu?" có bị làm mờ không? Mờ là đọc ra disabled (`I8`).
- [ ] Ô mật khẩu có đang lấy `••••••` làm placeholder không? Nhìn y hệt mật khẩu đã gõ (`T26`).
- [ ] Form có yêu cầu độ dài tối thiểu: đã ghi bằng chữ ở dòng gợi ý chưa, hay đợi gõ sai mới báo?
- [ ] Modal có ô nhập mà bấm ra ngoài vẫn đóng không? (`I20`)
- [ ] Modal đã gỡ dismiss thì **còn đường đóng khác** chưa?
- [ ] Có đủ ba trạng thái chưa: đang tải, rỗng, lỗi? Khung chờ có **đúng hình** nội dung không?
- [ ] Danh sách quá 25 dòng đã có phân trang chưa, và có hiện tổng số không?
- [ ] Phân trang: nav có nằm phải cùng hàng ở mọi số trang không? Trang đang chọn có trông như ô input không? Một trang thì đã ẩn nav, 0 dòng thì đã ẩn footer chưa?
- [ ] Toast: rộng theo chữ chưa? Hành động là nút có hover, dồn phải cùng ✕ chưa? Câu dài đã tách hai tầng thay vì vỡ ba dòng chưa? (`layouts/overlay.md`)

### Chữ

- [ ] Tiêu đề khối có lớn hơn chữ bên trong **ít nhất một bậc** không?
- [ ] `body` đã có `antialiased` chưa?
- [ ] Có dòng chữ nào dài quá 75 ký tự không?
- [ ] Có tiêu đề nào rớt lại một chữ ở dòng cuối, hay bị chẻ sai nghĩa không?
- [ ] Có dòng mô tả nào đang bị `truncate` không? Mô tả thì cho xuống dòng.
- [ ] Số xếp cột đã có `tabular-nums` chưa?
- [ ] Font đã nạp chưa, hay đang rơi về `system-ui`?

### Nội dung

- [ ] Có emoji nào trong tiêu đề, câu chào, hay đang đóng vai icon không?
- [ ] Có chữ hướng dẫn thừa không ("Bấm để lưu", chữ "Có" cạnh dấu tick)?
- [ ] Có dấu gạch dài trong copy tiếng Việt không?
- [ ] Nút đăng nhập bằng Google hay Apple đã có logo gốc chưa?
- [ ] Có tự gán mỗi mục một icon khác nhau, hay ba mục ba icon giống hệt nhau?

### Grep một lượt

```bash
grep -nE "gradient|backdrop-blur|shadow-(xl|2xl)|scale-1|text-transparent|border-dashed" <file>
```

Phải sạch, trừ ngoại lệ đã ghi trong luật.

---

## Cổng 3 — vòng tra tấn, BẮT BUỘC sau mỗi lần dựng

Không cần dựng file mới. Mở lại file đã có rồi làm sáu việc:

1. [ ] Thu cửa sổ xuống **375px**. **Trang cuộn ngang là hỏng.**
2. [ ] Vùng nào cuộn ngang thì **cuộn hết sang phải** — phần tử cuối có dính mép không?
3. [ ] Đổi một tiêu đề thành câu dài **200 ký tự**.
4. [ ] Đổi một con số thành `0`, một con số thành `1.284.500`.
5. [ ] Xoá hết dữ liệu của một danh sách, xem trạng thái rỗng.
6. [ ] Có dark mode thì xem lại toàn bộ ở dark mode.

Kiểm thêm ở 375px:

- [ ] Flex và grid item chứa nội dung động đã có `min-w-0` chưa? (`T13` — nguyên nhân số một của cuộn ngang)
- [ ] Lưới nào còn giữ 2 cột ở mobile không? Ô số liệu phải xuống 1 cột.
- [ ] Hàng chip có rớt xuống hàng dưới một cái lẻ không? Phải cho cuộn ngang.
- [ ] Board hay dòng thời gian có bị wrap thành 2 hàng không? Phải cuộn ngang trong khung.
- [ ] Bảng có bị bóp cột không? Phải cuộn ngang trong khung, có `min-w`.
- [ ] Card ở mobile còn `p-8` không? Phải `p-4`, tối đa `p-5`.
- [ ] Chip lọc có đứng cùng hàng với ô nhập và chênh chiều cao quá một bậc không?
- [ ] Chip lọc: đang chọn là `bg-primary text-primary-foreground` (không gõ cứng màu)? Nhãn dài đã `max-w-48` + `truncate` + `title` chưa? Có `aria-pressed` chưa?
- [ ] Nhìn lại một lượt: có chỗ nào **chật dồn cục** không? Chật là chưa xong.

Nếu có dark mode:

- [ ] Có chỗ nào dùng màu nhấn làm **đường mảnh** không (viền focus, gạch chân, chỉ báo đang chọn)? (`M22`)
- [ ] Nút phụ có **chìm hơn** card không, hay đang nổi lên? Thang bề mặt phải cùng thứ tự ở cả hai theme (`M21`).
- [ ] Grep `text-white`. Chữ trên nền nhấn phải là `--primary-foreground`.
- [ ] `.dark` đã khai lại màu nhấn chưa? Chưa là màu nhấn tàng hình.

> **Bốn vòng test gần nhất, ba lỗi giá trị nhất đều đến từ cổng 3**, không phải
> từ lúc dựng. Không chạy cổng này thì coi như chưa test.
>
> Đây cũng là loại lỗi mà chấm bằng ảnh chụp màn rộng **không bao giờ** thấy.
