# Bố cục màn hình trong app

> **Chốt loại màn hình trước, mở file này sau.** Có sẵn code mẫu kanban thì rất
> dễ đọc mọi đề mơ hồ thành kanban. Xem luật `S12` trong `../../SKILL.md`.


Không có wireframe thì dựng bố cục mặc định (hoặc cái mà điều kiện trong đề
chọn), báo một dòng lúc giao. Xem câu 4 trong `../../SKILL.md`. Nhịp ở đây là nhịp app:
`p-5`, `gap-3`, `text-sm`, viền mảnh, bóng gần như không.

---

## Dashboard

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

**Các khối thường có trên một màn tổng quan.** Đề để hở thì lấy từ đây ra 2-3
phương án phạm vi cho người dùng chọn, đừng tự quyết:

| Khối | Khi nào đáng có |
| --- | --- |
| Hàng ô số liệu | Gần như luôn. Bốn ô là vừa, sáu ô là bắt đầu loãng. Mobile xuống một cột, xem `../components/charts.md` |
| Biểu đồ xu hướng theo thời gian | Khi có dữ liệu tích luỹ theo tuần hoặc tháng |
| Danh sách tiến độ theo nhóm | Khi công việc chia được thành dự án hoặc nhóm |
| Việc cần làm hôm nay | Khi người dùng vào đây để bắt tay làm, không phải để xem báo cáo |
| Hoạt động gần đây | Khi có nhiều người cùng làm và cần biết ai vừa đụng gì |
| Bảng chi tiết | Khi màn này thay luôn cả trang danh sách. Có bảng rồi thì bỏ bớt widget |

Ba khối là mỏng cho một màn tổng quan. Bốn tới năm là vừa. Quá sáu thì phải hỏi
xem có nên tách bớt sang màn riêng không.

Xem `../components/charts.md` cho công thức biểu đồ và luật màu.

**B. Cột trái điều hướng, nội dung phải** (khi có từ 5 mục điều hướng trở lên)

Xem mục **Khung app có sidebar** bên dưới cho công thức đầy đủ.

---

## Khung app có sidebar

```
┌──────────────┬──────────────────────────────────────┐
│ ◐ Tên tổ chức ⌄ │ Trang / Mục hiện tại      [nút][nút]│
│ [tìm      /] ├──────────────────────────────────────┤
│              │                                      │
│ ⌂ Trang chủ  │                                      │
│ ✉ Hộp thư  20│  <- số đếm căn phải                  │
│ ☑ Việc     + │                                      │
│              │                                      │
│ WORKSPACE  ⋯+│  <- nhãn nhóm, chữ nhỏ, xám          │
│ ▤ Dự án    ⌄ │                                      │
│ ▦ Mẫu      ⌄ │                                      │
│              │                                      │
│ ⚙ Cài đặt    │                                      │
│ ◐ Tên người ⋯│  <- ghim đáy                         │
└──────────────┴──────────────────────────────────────┘
```

- **Sidebar cùng màu nền với vùng nội dung**, tách bằng **một đường kẻ dọc mờ** `--border`, không tách bằng chênh lệch nền. Đây là ngoại lệ hợp lệ của M3, vì hai vùng này ngang hàng nhau chứ không phải khối nổi trên nền.
- **Rộng `w-60` tới `w-64`**, cố định, `shrink-0`.
- **Mục đang chọn tô nền xám nhạt** `--secondary`, bo `rounded-lg`, **không tô màu nhấn**. Màu nhấn để dành cho nút hành động.
- **Icon nét mảnh, cùng bộ, luôn `text-muted`**, kể cả ở mục đang chọn. Chỉ chữ đổi sang `text-foreground`.
- **Nhãn nhóm** (`WORKSPACE`, `PROJECTS`) dùng `text-xs text-muted`, có thể kèm chevron thu gọn và nút `+` bên phải.
- **Số đếm căn phải**, xem `../components/small-controls.md`.
- **Khối tài khoản ghim đáy**, avatar cộng tên cộng email, kèm `⋯` mở menu.
- **Ô tìm ở đầu sidebar** có gợi ý phím tắt `/` hoặc `⌘K` ở mép phải.
- Mobile thì sidebar ẩn, mở bằng nút, trượt từ trái. Xem `overlay.md`.

Vùng nội dung có **thanh tiêu đề riêng** ở trên: đường dẫn ở trái, nhóm nút ở
phải. Thanh đó cũng tách bằng đường kẻ ngang mờ, không tách bằng nền.

```
┌──────┬──────────────────────────────┐
│ w-60 │ header h-16                  │
│ nav  ├──────────────────────────────┤
│      │ nội dung                     │
└──────┴──────────────────────────────┘
```

---

## Bảng kanban

```
Cần làm      4    Đang làm     3    Chờ duyệt    2    Xong        3
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ tiêu đề việc │  │ tiêu đề việc │  │ tiêu đề việc │  │ ✓ tiêu đề    │
│ dự án · hạn  │  │ dự án · hạn  │  │ dự án · hạn  │  │ dự án · xong │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
┌──────────────┐  ┌──────────────┐
│ ...          │  │ ...          │
└──────────────┘  └──────────────┘
```

- **Cột không tô màu riêng.** Tên cột cộng số đếm là đủ. Bốn cột bốn màu là dấu hiệu chưa quyết định được cái nào quan trọng, và nó phá luật một màu nhấn.
- **Thẻ là card thật**, đây là ngoại lệ hợp lệ của luật `F3`: thẻ kanban là vật kéo thả được, không phải một dòng trong danh sách.
- **Thẻ `p-4`, gap giữa thẻ `gap-3`, gap giữa cột `gap-4`.** Xem `budgets.md`. Đừng hạ xuống `p-3`, chật.
- **Tiêu đề việc không `truncate`**, cho xuống tối đa hai dòng rồi mới cắt. Thẻ hẹp mà cắt một dòng thì đọc không ra việc gì.
- **Màn hẹp thì cuộn ngang trong khung**, mỗi cột `w-[280px] shrink-0`, không wrap thành hai hàng. Xem luật `R6` trong `../responsive.md`. Lề đặt trên hàng bên trong (`flex gap-4 px-3`), không đặt trên khung cuộn, nếu không cột cuối dính sát mép.
- **Cột rỗng vẫn phải chiếm chỗ**, xem `../components/empty-state.md`.
- Quá năm cột thì hỏi xem có nên gộp bớt trạng thái không.

**Code mẫu đã duyệt: `app-kanban.html`.** Chép cấu trúc từ đó, đừng dịch lại từ
mấy gạch đầu dòng trên. File đó đã qua vòng tra tấn 375px, cuộn ngang có lề hai
đầu, chip cuộn ngang, thẻ `p-4`, chip lọc `h-9`.

---

## Danh sách có bộ lọc

```
┌─────────────────────────────────────┐
│ Tiêu đề              [+ Thêm mới]   │
│ (chip) (chip) (chip)      [tìm    ] │  <- chip tròn, chip đang chọn tô đặc
├─────────────────────────────────────┤
│ ⬤ nội dung dòng      giá trị  ⋯ ⋯  │  <- hành động phụ ẩn, hiện khi hover
│ ⬤ nội dung dòng      giá trị       │
│ ⬤ nội dung dòng      giá trị       │
└─────────────────────────────────────┘
```

Xem `../components/list-row.md` cho công thức từng dòng. Danh sách là **một khối
chia đường kẻ**, không phải mỗi dòng một card.

---

## Danh sách rỗng

Một dòng chữ mờ, `py-6`, không hình, không nút. Xem `../components/empty-state.md`.

Chỉ dựng empty state có hình và CTA khi đó là màn hình chính của cả app và người
dùng lần đầu vào chưa có gì để làm.

---

## Trang cài đặt

**A. Một cột, chia mục có tiêu đề** (mặc định, dưới 15 tuỳ chọn)

```
Tài khoản
┌─────────────────────────────────────┐
│ Tên hiển thị          [ô nhập     ] │
│ ─────────────────────────────────── │
│ Email                 name@mail.com │
└─────────────────────────────────────┘

Giao diện
┌─────────────────────────────────────┐
│ Chế độ tối                    [   ○]│
└─────────────────────────────────────┘

Vùng nguy hiểm
┌─────────────────────────────────────┐
│ Xoá tài khoản              [Xoá]    │
└─────────────────────────────────────┘
```

- Mỗi mục là **một khối chia kẻ**, không phải mỗi tuỳ chọn một card.
- Nhãn trái, điều khiển phải, cùng một hàng.
- Không viết chữ giải thích dưới mọi dòng. Chỉ giải thích thứ thật sự khó đoán.
- Vùng nguy hiểm tách xuống cuối cùng.
- **Không có nút "Lưu thay đổi" tổng.** Trang cài đặt tự lưu ngay khi bật toggle hoặc rời khỏi ô nhập, mỗi dòng hiện dấu đã lưu thoáng qua rồi tắt. Vừa có nút Lưu vừa có toggle tự lưu là hai mô hình lẫn nhau, người dùng không biết bật xong có phải bấm Lưu không. Thật sự cần nút Lưu thì toggle cũng phải chờ bấm Lưu, và nút phải mờ đi khi chưa có gì đổi.

**B. Tab dọc bên trái** (từ 15 tuỳ chọn trở lên, hoặc trên 4 nhóm)
