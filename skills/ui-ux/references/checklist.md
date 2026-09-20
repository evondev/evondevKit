# Checklist

Ba cổng. Mỗi cổng chạy ở một thời điểm khác nhau — đừng gộp làm một lượt cuối.

Mỗi dòng ở đây là một lỗi **đã thật sự xảy ra**. Dòng nào ba vòng test liền không
bắt được lỗi nào thì xoá (luật ở `SKILL.md` mục 4).

---

## Cổng 1 — trước khi viết dòng class đầu tiên

- [ ] Đây là **refactor** hay **dựng mới**? Chưa trả lời thì chưa được đi tiếp.
- [ ] Đã grep `package.json` và `components/ui` chưa — họ dùng Tailwind? shadcn? Hay bộ khác?
- [ ] **Không có `package.json`?** Vậy sắp đưa code gì ra — `.tsx` hay HTML thuần? Đưa JSX cho dự án không React là hỏng.
- [ ] Đã grep token sẵn có chưa (`--primary`, `--brand`, `font-family`)? Có thì dùng, đừng hỏi.
- [ ] **Copy sắp viết bằng tiếng gì** — đã grep i18n và nhãn hiện có chưa (`T24`)?
- [ ] Đề bài có từ nào mơ hồ không (bảng, thẻ, danh sách, khung, trang, lịch)?
- [ ] Đề để hở mà đã hỏi phạm vi chưa, hay tự quyết rồi làm mỏng dính?
- [ ] Không có skeleton mà **đã đưa 2–3 bố cục rồi DỪNG chờ chọn chưa**? Tự chọn hộ là sai.
- [ ] Đề nhiều hơn một màn? Đã chốt **hợp đồng nguyên tố** (`system.md` `D1`) chưa?
- [ ] Người dùng nói "chưa biết muốn UI thế nào" → đã đưa 3 hướng kèm lý do chưa?

---

## Cổng 2 — dựng xong, trước khi báo

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

- [ ] Có `shadow-*` nào trên khối **nằm trong trang** không? Bóng chỉ cho modal/dropdown (`M15`).
- [ ] Có token viền nào tự đẻ ra ngoài `--border`, `--border-strong`, `--border-focus` không?
- [ ] Có chỗ nào mỗi mục một card không? Gom thành một khung chia đường kẻ (`F3`).
- [ ] Dòng tiêu đề và nút "Xem tất cả" có nằm **trong** khung không?
- [ ] Phần tử nổi bật có mang quá một dấu hiệu không (badge + viền + to hơn)?
- [ ] Bảng có bị bọc vào card không?
- [ ] Bo góc có nằm trong bốn bậc không, và có bo nhầm link chữ không nền không?

### Nút và trạng thái

- [ ] Nút mặc định có phải **viền + icon** không, hay đang là nền nhấn? (`I1`)
- [ ] Trong một nhóm có đúng một nút nền nhấn không?
- [ ] Nút phụ có trông như đã bị khoá không? Chữ và nền có đủ chênh không?
- [ ] "Xem tất cả" / "Đọc thêm" có đang là link chữ không? Phải là nút, căn phải, không icon mũi tên.
- [ ] **Rê chuột lên một hàng: có phần tử con nào biến mất không?** (`M18`)
- [ ] Rê chuột lên hàng: nền hover có ôm sát chữ không? Phải có padding đủ bốn phía.
- [ ] Màn chỉ có MỘT card giữa trang trống? Vậy card phải **không viền** (`M29`), và không bao giờ có cả viền lẫn bóng.
- [ ] Rê chuột lên **nút chính**: có đổi màu không? Nút `primary` là chỗ hay quên hover nhất (`I9`).
- [ ] **Bấm vào chữ nhãn**: ô có focus không (`for`/`htmlFor`)? Con trỏ có thành bàn tay không?
- [ ] **Bấm vào khoảng trắng bên phải chữ nhãn**: ô KHÔNG được focus. Focus là thiếu `w-fit` (`I26`).
- [ ] Form có ô mật khẩu: có nút hiện/ẩn chưa, và nó có `type="button"` không (`I27`)?
- [ ] Mọi ô trong form đều có placeholder, hoặc đều không có — không được chỗ có chỗ không (`T25`).
- [ ] Đọc từng câu lỗi: có câu nào **trùng chữ** với placeholder hay nhãn của chính ô đó không? Trùng là bỏ.
- [ ] Chữ đỏ dưới ô có thật sự là lỗi không, hay là **gợi ý bị tô đỏ**? Gợi ý thì xám và hiện sẵn.
- [ ] "Quên mật khẩu?" có nằm cùng hàng với nhãn không? Dưới ô nhập là **tranh chỗ với câu lỗi**.
- [ ] "Quên mật khẩu?" có bị làm mờ không? Mờ là đọc ra disabled (`I8`).
- [ ] Modal có ô nhập mà bấm ra ngoài vẫn đóng không? (`I20`)
- [ ] Modal đã gỡ dismiss thì **còn đường đóng khác** chưa?
- [ ] Có đủ ba trạng thái chưa: đang tải, rỗng, lỗi? Khung chờ có **đúng hình** nội dung không?
- [ ] Danh sách quá 25 dòng đã có phân trang chưa, và có hiện tổng số không?

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
