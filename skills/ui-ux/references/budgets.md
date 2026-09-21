# Ngân sách và nhịp

Đếm được thì mới giữ được. Vượt số nào thì phải có lý do, và nói lý do đó lúc giao.

Skill này chỉ lo **màn hình trong app** — dashboard, danh sách, bảng, form, cài
đặt. Nhánh trang bán hàng đã gỡ khỏi skill (nằm ở `archive/` của repo).

---

## Trần

| Hạng mục | Trần | Ghi chú |
| --- | --- | --- |
| Màu nhấn | 1 | Màu thứ hai phải xin phép. Tag phân loại không tính, xem `M8` |
| Họ chữ | 1 | Phân vai bằng weight, không bằng font thứ hai |
| Sắc độ chữ | 3 | chính, phụ, và màu trên nền nhấn |
| Bậc bo góc | 4 | full, lớn, giữa, nhỏ |
| Bậc shadow | 2 | **chỉ cho lớp nổi**: dropdown/popover, và modal. Trong trang thì không bóng — xem `M15` |
| Token viền | 2 | một cho đường tóc, tối đa một bậc đậm hơn. Cộng `--border-focus`. Xem `M16` |
| Tầng lồng khối | 2 | |
| Độ dài dòng chữ | 75 ký tự | |
| Dạng nút | 3 | viền+icon (mặc định), nền nhấn (hành động chính), chỉ-icon |
| Bậc spacing | thang 4/8/12/16/20/24/32/40 | Không dùng số lẻ ngoài thang |

---

## Nhịp

| | Giá trị |
| --- | --- |
| Padding trang | `p-4 sm:p-6` |
| Padding card | `p-4` ở mobile, `p-5` từ `sm` |
| Padding trong thẻ, desktop | 20–24px |
| Gap lưới | `gap-3` |
| Padding section | `py-4` |
| Chiều cao dòng danh sách | 12–16px chiều dọc |
| Chiều cao nút | `py-2.5` |
| **Nút trong form** | **`h-12`, bằng đúng ô nhập, ở MỌI breakpoint** |
| Nút "xem tất cả", "đọc thêm" | `h-10`, ngang `px-3` tới `px-4`, căn phải |
| Viền card | đường tóc 1px, một token duy nhất |
| Bóng card | **không có** |

**Nút trong form phải cao bằng ô nhập, và cả hai phải đổi cùng nhau.** Ô nhập giữ
`h-12` ở mọi bề rộng màn (`R8`), nên nút trong form cũng giữ `h-12` — **không**
hạ về `h-10` ở mobile như `R4` nói cho nút thường.

Hạ một cái mà giữ cái kia là lỗi thấy ngay: nút đăng nhập 40px nằm dưới ô nhập
48px trông như hai thứ của hai bộ khác nhau. Đây là lỗi đã dính ở vòng test form
đăng nhập, và lý do là `R4` bị áp máy móc cho nút submit.

Áp cho mọi nút nằm trong luồng form — đăng nhập, đăng ký, đổi mật khẩu, nút
`Lưu` / `Huỷ` cuối form. Không áp cho nút trong header hay trong dòng danh sách.

`p-3` cho padding trang **chỉ** dành cho màn hình cố ý sát mép: trang tab mới của
trình duyệt, bảng điều khiển toàn màn, kiosk. Trang app bình thường dùng
`p-4 sm:p-6`, nếu không nội dung dính lề và cả trang trông chật dù từng khối đều
đúng nhịp.

---

## Thẻ nhỏ trong cột hoặc lưới dày

Thẻ kanban, thẻ trong lưới nhiều cột, thẻ trong panel hẹp đều là card nên vẫn bám
thang. Đừng tự hạ xuống cho gọn — gọn quá thành chật (luật `F12`).

| | Giá trị |
| --- | --- |
| Padding thẻ | `p-4`, **không** xuống `p-3` |
| Gap giữa các thẻ trong một cột | `gap-3` |
| Gap giữa các cột | `gap-4` |
| Khoảng cách tiêu đề cột với thẻ đầu | `mb-3` |

Thẻ chứa hai dòng chữ trở lên thì `p-3` là chật. `p-3` chỉ dành cho chip, nhãn,
và ô điều khiển nhỏ.

---

## Thang cỡ chữ

Tám tên, và tám tên đó là **hết**. Không inline pixel ngoài thang (`T7`).

| Token | Dùng cho |
| --- | --- |
| `xs` | nhãn, dấu thời gian |
| `sm` | chú thích, chữ phụ |
| `base` | **mặc định của app** |
| `md` | nút, tiêu đề cấp 4 |
| `lg` | tiêu đề khối, tên thẻ, **tiêu đề trang chi tiết** |
| `xl` | **tên của một trang**, ở mọi khổ màn |
| `2xl` | chỉ cho hero của trang trình diễn |
| `3xl` | hero |

Thứ bậc bắt buộc: **tên trang (`xl`) > tiêu đề khối (`lg`) > tên thẻ (`base`)**,
mỗi bậc cách nhau đúng một nấc ở **mọi** breakpoint (luật `T8`).

⚠️ Hai bẫy đã dính ở focus.camp:

- `md` và `lg` lỡ cùng một giá trị, nên "8 size chuẩn" thực ra chỉ có **7**. Kiểm thang của dự án trước khi tin vào tên token.
- Tên trang từng là `2xl` ở desktop, chủ dự án chốt hạ về `xl` ngày 16/09/2026 vì đọc ra **quá to so với nội dung bên dưới**. `2xl` chỉ còn cho hero.

---

## Ở mobile thì hạ bậc

Bảng nhịp cho màn hẹp nằm ở `responsive.md`. Đừng chép lại ở đây — một nguồn thôi.
