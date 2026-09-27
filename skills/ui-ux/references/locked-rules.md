# Luật chủ dự án đã chốt

Những luật dưới đây chủ dự án đã xem bản dựng thật rồi mới quyết. **Không lật, không làm
khác đi**, kể cả khi số đông làm khác hay có lý lẽ nghe hợp lý. Muốn đổi thì hỏi chủ dự án
trước.

Cột **"Lý lẽ đã bị bác"** ghi đúng những câu từng dẫn tới bản sai. Viết spec mà thấy mình
đang nghĩ ra một câu giống vậy thì dừng lại: đó là lỗi cũ quay lại.

**Khi nào mở file này:** viết mục mới hoặc sửa spec có nói tới màu nút, mức nặng của nút
(`primary`, `outline`, `secondary`, đỏ, trung tính), bo góc, cỡ chữ tiêu đề, hover, focus,
chuyển động. Sửa skill xong chạy `node skills/ui-ux/scripts/lint-skill.mjs` (từ gốc repo).

| # | Luật đã chốt | Chốt ngày | Lý lẽ đã bị bác | Luật gốc |
| --- | --- | --- | --- | --- |
| 1 | Việc nguy hiểm tô đỏ theo ba câu của `I4` (mất dữ liệu, kết thúc thứ đang chạy, cắt quyền). Đăng xuất, đăng xuất hàng loạt, huỷ gói đều đỏ | 23/09, 26/09, 27/09/2026 | "Không mất dữ liệu nên trung tính". "Vẫn dùng được tới hết kỳ nên không đỏ". "Nhiều app để trung tính" | `rules-state.md` `I4` |
| 2 | Nút nguy hiểm là nền mờ `rose-500/10`, chữ `rose-700`, luôn hiện | 21/09/2026 | Đỏ đặc `bg-rose-500 text-white`. Viền đỏ | `rules-state.md` `I4`, `components/button.md` |
| 3 | Hộp xác nhận việc nguy hiểm đỏ như hộp xoá. Hộp trung tính (icon xám, nút `primary`) chỉ khi ba câu của `I4` đều "không" | 26/09, 27/09/2026 | Lấy hộp đăng xuất hàng loạt, hộp huỷ gói làm ví dụ cho hộp trung tính | `layouts/overlay.md` |
| 4 | `outline` là nút mặc định; `secondary` không thay nó | 21/09/2026 | Đổi mặc định sang `secondary` cho "có mặt rõ hơn" | `components/button.md` |
| 5 | Nút viền rê vào chỉ đổi nền `--button-hover` (`#f1f1f3`), viền giữ nguyên | 26/09/2026 | Viền đậm lên `foreground/20`. `hover:bg-background` (tan vào nền trang) | `components/button.md` |
| 6 | Nút lọc dạng dropdown ngoài form không có hover, như ô Select | 25/09/2026 | Mượn hover nút viền: tô nền xám, rồi viền đậm lên | `components/choice-controls.md` |
| 7 | Tab trạng thái dưới `sm` thành nút dropdown có nhãn "Trạng thái:" | 25/09/2026 | Nút chỉ ghi "Tất cả · 32", không nhãn | `layouts/app.md`, "Bảng dữ liệu" |
| 8 | Dòng đã chọn và dòng đang rê cùng một nền mờ (`I10`) | 23/09/2026 | "Mỗi trạng thái phải một nền khác" | `principles.md` |
| 9 | Focus ô nhập: viền `--border-focus` + `ring-2` mờ (`I13`) | 21/09/2026 | Tăng độ đậm ring thành vòng viền thứ hai | `components/input.md` |
| 10 | Bo góc theo chiều cao: từ 40px trở lên tối thiểu 12px, dưới 40px thì 8px | 21/09/2026 | Chọn theo tên loại ("mục menu thì 8px") | `rules-form.md` |
| 11 | Tên trang `xl`, `2xl` chỉ cho hero | 16/09/2026 | Tên trang `2xl` ở desktop | `budgets.md` |
| 12 | Panel trượt 500ms vào, 350ms ra | 23/09/2026 | Rút ngắn 300/200ms cho "nhanh hơn". `linear` | `layouts/overlay.md` |
| 13 | Thanh cuộn ẩn bằng màu trong suốt, giữ bề rộng 4px | 08/09/2026 | `scrollbar-width: none` (nội dung bị đẩy ngang khi thanh hiện) | `tokens.css` |
| 14 | Hàng tab cuộn ngang ở màn hẹp: chỉ gợi ý cho người dùng chọn cách báo "còn nữa", không áp sẵn | 25/09/2026 | Tự áp dropdown hoặc thanh cuộn luôn hiện | `responsive.md` |
| 15 | Dấu `*` trường bắt buộc tô đỏ | 25/09/2026 | Dấu `*` xám cho "đỡ ồn" | `rules-color.md`, `principles.md` |

Chủ dự án chốt thêm luật nào thì thêm một dòng ở đây, cùng lúc với chỗ sửa ở luật gốc.
