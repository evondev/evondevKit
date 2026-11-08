# Dashboard

**A. Hàng số liệu trên, lưới widget dưới** (mặc định)

```
┌─────────────────────────────────────┐
│ header pill: lời chào      [Cài đặt]│
├───────┬───────┬───────┬─────────────┤
│ số 1  │ số 2  │ số 3  │ số 4        │  <- 1 khối chia kẻ, KHÔNG 4 card
├───────┴───────┴───┬─────────────────┤
│ widget chính      │ widget phụ      │  <- widget chính col-span-2
│ (col-span-2)      ├─────────────────┤
│                   │ widget phụ      │
└───────────────────┴─────────────────┘
```

Không chia đều ba cột. Widget quan trọng nhất chiếm gấp đôi.
Bốn ô số liệu dùng **một màu duy nhất**, khác nhau ở con số chứ không ở màu.

**Các khối thường có trên một màn tổng quan.** Đề để hở thì dựng **bộ mặc định**
dưới đây, không hỏi (`S5`). Bộ mặc định: **hàng ô số liệu + biểu đồ xu hướng
(widget chính) + danh sách tiến độ + việc cần làm hôm nay** — bốn khối. Có nhiều
người cùng làm thì thêm hoạt động gần đây. Lúc giao liệt kê các khối đã dựng.

| Khối | Khi nào đáng có |
| --- | --- |
| Hàng ô số liệu | Gần như luôn. Bốn ô là vừa, sáu ô là bắt đầu loãng. Mobile 2×2, xem `../../components/charts.md` |
| Biểu đồ xu hướng theo thời gian | Khi có dữ liệu tích luỹ theo tuần hoặc tháng |
| Danh sách tiến độ theo nhóm | Khi công việc chia được thành dự án hoặc nhóm |
| Việc cần làm hôm nay | Khi người dùng vào đây để bắt tay làm, không phải để xem báo cáo |
| Hoạt động gần đây | Khi có nhiều người cùng làm và cần biết ai vừa đụng gì |
| Bảng chi tiết | Khi màn này thay luôn cả trang danh sách. Có bảng rồi thì bỏ bớt widget |

Ba khối là mỏng cho một màn tổng quan. Bốn tới năm là vừa. Đề đòi quá sáu khối
thì vẫn dựng, lúc giao gợi ý một câu khối nào nên tách sang màn riêng.

Xem `../../components/charts.md` cho công thức biểu đồ và luật màu.

**Chi tiết từng khối**:

- **Widget chính đếm theo kỳ thì là biểu đồ cột, không phải đường.** "Việc xong mỗi tuần", "đơn mỗi ngày" là số đếm rời của từng kỳ; cột có số trên đầu đọc được cả 8 tuần một lượt, đường chỉ ghi số ở điểm cuối, muốn biết tuần 24/08 bao nhiêu phải rê chuột từng điểm. Chọn loại theo bảng "Cột hay đường" ở `../../components/charts.md`.
- **Danh sách tiến độ: thanh luôn `bg-primary`, chỉ cụm "2 việc quá hạn" tô hổ phách.** Quá hạn là một chuyện khác với phần trăm xong; tô cả thanh 93% màu hổ phách đọc ra "tiến độ đang có vấn đề", và hai trên bốn thanh cam thành thứ nặng nhất màn. Tô cả dòng phụ "112 / 120 việc · 2 việc quá hạn" cũng sai: khối việc hôm nay ngay bên cạnh chỉ tô cụm "Quá hạn 2 ngày", hai khối một màn hai cách (`N5`). Chi tiết ở "Thanh tiến độ trong danh sách", `../../components/charts.md`.
- **Hoạt động gần đây là luồng tin của cả workspace, không phải dòng thời gian của một bản ghi.** Đừng bê `../../components/timeline.md` (vòng icon theo loại việc, đường nối, nhãn loại việc đậm, người làm dòng cuối cỡ nhỏ): câu hỏi ở đây là "**ai** vừa đụng **gì**", mà khuôn timeline đưa loại việc lên chữ đậm, tên việc xám, người làm xuống dòng mờ nhất. Mỗi mục bốn dòng, sáu mục cao 820px. Khuôn, như các app quản lý dự án phổ biến:

  ```
  (TK)  Tuấn Khang hoàn thành Cập nhật ảnh đội ngũ trên trang giới thiệu
        Website Evondev Studio · 09:37
  ```

  - Avatar người làm `size-8` bên trái (`avatar.md`), không vòng icon loại việc, không đường nối (các mục không phải các bước của một thứ).
  - Một câu `text-sm text-muted line-clamp-2`: **tên người** `font-medium text-foreground`, động từ xám, **tên đối tượng** `text-foreground` và là link sang đối tượng đó (`N8`; cả khối không link nào là trang cụt, như "Bản ghi khác nhắc tới trên trang là link" ở dưới).
  - Dòng phụ `text-xs text-muted`: dự án · giờ. Hôm nay ghi giờ, hôm qua ghi "Hôm qua", cũ hơn ghi ngày. Dự án dài `truncate`, giờ `shrink-0`.
  - **5 mục**, header có "Xem tất cả" như các khối danh sách khác trên màn (`card.md`). Trang cao 1512px còn ~1150px, hai cột kết thúc gần ngang nhau.
- **Hai cột lưới phải kết thúc gần ngang nhau.** Khối việc hôm nay `self-start` (đúng, không kéo card trắng rỗng), nhưng cột phải dài gấp đôi thì dưới cột trái là một mảng xám 450px. Chữa bằng cách **cắt số hàng của khối dài** (luồng hoạt động 5 mục, việc hôm nay tối đa 8 rồi "Xem tất cả"), không kéo khối ngắn, không đổi thứ tự khối.
- **Workspace mới (chưa có dự án nào): khung "Các bước bắt đầu" thay cả lưới.** Đừng dựng đủ năm khối rồi cho mỗi khối một câu "Chưa có…": năm khung cùng nói một ý (`N3`), khung biểu đồ cao 340px chỉ chứa một dòng chữ, và cả màn **không có lối đi tiếp** nào (`N6`). Khung theo mục **Các bước bắt đầu** ngay dưới; app không có checklist thì một khối chào: tiêu đề `text-base font-semibold` ("Bắt đầu với dự án đầu tiên"), một câu vì sao, nút `primary` "+ Tạo dự án" (`I2`: lối đi tiếp duy nhất của màn rỗng). Nằm trong một card trắng như mọi khối khác, không nền trong suốt. Từ lúc có một dự án thì lưới trở lại **dưới** khung các bước (khung còn tới khi xong hết hoặc bị ẩn), khối nào chưa có số thì theo ca rỗng của khối đó (biểu đồ một điểm, việc hôm nay trống).
- **Khối không có dữ liệu thì bỏ "Xem tất cả"**, nút dẫn sang một danh sách rỗng là thừa. "Hôm nay không có việc nào đến hạn" chỉ đúng khi có việc mà không việc nào đến hạn hôm nay; chưa có việc nào thì câu là "Chưa có việc nào được giao cho bạn".
- **Câu rỗng của các khối cùng hàng cùng căn một kiểu.** Khung biểu đồ căn câu giữa theo chiều dọc, khung tiến độ bên cạnh để câu sát đầu: cùng hàng hai vị trí (`N5`). Cả hai căn giữa khung.

**B. Cột trái điều hướng, nội dung phải** (khi có từ 5 mục điều hướng trở lên)

Xem **Khung app có sidebar** (`shell.md`) cho công thức đầy đủ.

## Các bước bắt đầu (onboarding)

Checklist cho người mới vào app: tạo dự án, mời người, giao việc đầu tiên… Khuôn theo cách các bộ thiết kế lớn dựng "setup guide":
mỗi bước một ô tick tròn, bước mở ra xem được, chỉ bước đầu tiên mở sẵn, có nút ẩn cả khung,
dòng "1 / 5 bước".

```
┌──────────────────────────────────────────────────┐
│ Các bước bắt đầu                     1 / 5 bước ✕ │
│ ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         │
├──────────────────────────────────────────────────┤
│ (✓) Tạo workspace                              ⌄ │
├──────────────────────────────────────────────────┤
│ ( ) Tạo dự án đầu tiên                         ⌃ │
│     Dự án gom việc, tài liệu và người làm…       │
│     [ Tạo dự án ]                                │
├──────────────────────────────────────────────────┤
│ ( ) Mời thành viên                             ⌄ │
├──────────────────────────────────────────────────┤
│ ( ) Giao việc đầu tiên                         ⌄ │
└──────────────────────────────────────────────────┘
```

- **Một chỗ, mặc định là đầu trang Tổng quan.** Người mới vào app là rơi vào tổng quan, nên
  khung nằm ở đó: workspace chưa có gì thì thay cả lưới, có rồi thì nằm trên lưới, **cách lưới
  `mt-6` (24px), không dùng khe `gap-3` của lưới**. Dòng chú thích `text-xs` trên hàng số
  (`mb-2`, "Tuần đầu, chưa có tuần trước để so") mà cách khung trên 12px, cách hàng số 8px thì chênh
  4px, đọc như chú thích của khung các bước; 24px so với 8px thì rõ nó đi
  với hàng số. Đừng dựng
  thêm một trang "Chào mừng" riêng khi tổng quan đã có khối chào: bấm "Vào tổng quan" xong lại
  gặp "Bắt đầu với dự án đầu tiên" + nút "Tạo dự án", hai màn nói một việc (`N3`), header
  trang chào còn ghi "Tổng quan" cạnh nút "Vào tổng quan". Trang riêng chỉ
  khi sản phẩm có mục "Bắt đầu" hẳn trong sidebar, và lúc đó tổng quan không có khối chào nữa.
  Không cần tiêu đề "Chào mừng tới …": tên workspace đã ở đầu sidebar (`form.md`, không bịa câu chào).
- **Khung**: một card, các bước chia đường kẻ (`F3`, không mỗi bước một card). Hàng đầu: tên
  "Các bước bắt đầu" `text-sm font-medium`, "1 / 5 bước" bên phải, thanh tiến độ dưới
  (`../../components/charts.md`), nút ẩn `X` ghost `size-8` ở góc phải, **thẳng cột với chevron
  của các dòng** dưới.
- **Vòng bên trái là ô tick, không đánh số.** Chưa xong: vòng `size-5` viền đứt
  `border-[1.5px] border-dashed border-foreground/40`. Xong: `size-5 bg-primary` + `Check` trắng
  `size-3`. Số thứ tự đọc như bước bắt buộc làm lần lượt; người dùng làm bước 3 và 5 trước thì
  màn thành "bước 2 là bước tiếp theo" giữa hai bước đã xong. Đừng mượn vòng số `size-8` từ
  thanh các bước của form nhiều bước. Thứ tự trong danh sách đã là gợi ý.
- **Mỗi bước là một mục accordion, chỉ bước tiếp theo mở sẵn.** Nút tiêu đề rộng hết hàng
  theo `../../components/accordion.md`: vòng, tên `text-sm font-medium`, `ChevronDown` bên phải,
  dòng `px-4 py-3 sm:px-5` (cao 44px, vừa vùng bấm ở màn cảm ứng), vòng thẳng tâm dòng tên.
  **Không nền hover** ⚑: nút `ghost` thì thêm `hover:bg-transparent`, rê vào chỉ chevron đậm lên
  (`accordion.md`, Hover và focus). Nền xám chỉ phủ hàng tiêu đề, dừng ngay trên câu mô tả, nên câu
  trông như dính vào mép dưới của mảng xám (chủ dự án). Câu không có `mt` vì nó phải
  bám vào tên bước, nên đừng sửa bằng cách thêm khoảng cách: bỏ nền hover.
  Bước tiếp theo = bước chưa xong đầu tiên làm được ngay. Mở ra: phần thân `pb-4`, thụt trái bằng
  `px` của dòng + vòng 20px + `gap-3`; một câu vì sao `text-sm text-muted` **không `mt`**, rồi nút
  `mt-4` **dưới câu, thẳng mép trái với tên**, ở mọi bề rộng (không đẩy sang phải rồi xếp lại ở màn
  hẹp). Đo được: tên → câu 12px, câu → nút 16px, nút → mép dưới 16px; câu bám vào tên của nó.
  Đừng thêm `mt-1` cho câu: nó chồng lên đệm dưới của nút tiêu đề, tên → câu 20px mà câu → nút
  13px, câu trôi xuống bám vào nút (FAQ ở `accordion.md` cũng không có `mt` ở câu trả lời).
  Đừng mở hết các bước: năm câu mô tả + bốn nút xếp một cột phải, tên bước lặp lại trên nút
  ("Mời thành viên" / "Mời thành viên"), card cao 830px ở 1280 và 1540px ở 375; accordion còn
  390px và 830px, một nút đặc.
- **Nút**: bước tiếp theo `primary`, là nút đặc duy nhất của khung (`I3`); bước khác người dùng
  tự mở thì nút viền. Không có nút "Vào tổng quan": khung đã nằm trên tổng quan.
- **Bước khoá** (phải xong bước khác trước): vòng như bước chưa xong, mở ra là câu lý do
  nói bước cần làm trước ("Tạo dự án trước: mỗi việc phải nằm trong một dự án"), **không nút mờ**.
  Nút `disabled` 50% trên nền trắng gần như tan mất, đọc như một khung rỗng.
- **Bước xong**: tên `text-muted`, **không gạch ngang** (gạch ngang là của danh sách việc người
  dùng tự tick; bước ở đây app tự đánh dấu), đóng sẵn, vẫn mở ra được.
- **Ẩn**: bấm `X` là ẩn luôn, không hộp xác nhận; toast "Đã ẩn các bước bắt đầu" có "Hoàn tác"
  (`../../system.md`, xoá khôi phục được).
- **Đã làm được việc chính, chỉ còn bước tuỳ chọn** ⚑: khung **thu về một hàng** (tên, "3 / 4
  bước", chevron mở lại, `X`) và **xuống dưới khối việc chính** của tổng quan (khối Học tiếp, việc
  hôm nay). Còn bước bắt buộc trước việc chính thì khung mới đứng trên. Đừng giữ khung mở to ở đầu
  trang: ba dòng đã xong với ba vòng đặc, một bước tuỳ chọn mở sẵn, đẩy nút việc chính xuống nửa
  dưới màn. Đó là thứ nặng nhất màn mà không phải việc người dùng đến để làm (chủ dự án:
  khung 3/4 đè hàng việc chính). Khung hướng dẫn đã qua mốc dùng được thì
  vẫn tìm thấy, nhưng không chiếm mỗi lần vào app.
- **Xong hết**: thanh xanh lá, danh sách bước **thu hết**, khung còn hàng đầu và một câu "Xong hết
  các bước. Workspace đã sẵn sàng cho cả nhóm." cùng nút `X`. Đừng in lại năm dòng đã xong: năm vòng
  đen xếp cột thành thứ nặng nhất màn mà không còn việc gì để làm. Cách này là
  lựa chọn của skill, các bộ thiết kế lớn chưa chốt ca xong hết.
- **Trạng thái cần có ở trang `/states`**: vừa vào (xong một bước), làm không theo thứ tự, bước khoá
  đã mở khoá, chỉ còn bước tuỳ chọn (khung một hàng dưới việc chính), xong hết, và đã ẩn (tổng quan
  không còn khung).

---

## Kiểm trước khi giao

Chạy cùng cổng 2 của `checklist.md` khi trang có đúng thứ này.

- [ ] Màn tổng quan: số đếm theo kỳ đã là cột chưa (`charts.md`, "Cột hay đường")? Thanh tiến độ trong danh sách có thanh nào tô hổ phách không (phải `bg-primary`, chỉ cụm "quá hạn" có màu)? "Hoạt động gần đây" có đang bê khuôn timeline không (phải avatar + một câu, 5 mục)? Hai cột lưới có kết thúc gần ngang nhau không? Workspace mới có khung "Các bước bắt đầu" (hoặc khối chào có nút "Tạo dự án"), không phải năm khung "Chưa có…"?
- [ ] **Các bước bắt đầu** (`layouts/app/dashboard.md`): chỉ ở một chỗ, không có thêm trang "Chào mừng" lặp khối chào của tổng quan? Vòng bên trái là ô tick viền đứt, không số? Chỉ bước tiếp theo mở sẵn, nút nằm dưới câu vì sao, là nút đặc duy nhất? Bước khoá có nút mờ không (không được)? Tên bước xong có gạch ngang không (không được)? Có nút `X` ẩn, thẳng cột chevron? Xong hết thì khung thu lại, không in năm dòng đã xong? Mở một bước ra đo: tên → câu vì sao có nhỏ hơn câu → nút không (câu phải bám tên)? Khung cách lưới bên dưới 24px, dòng chú thích hàng số không lơ lửng giữa hai khối?
