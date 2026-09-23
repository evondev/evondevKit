# Ô nhập nhiều tag (tag input)

Gõ một giá trị rồi Enter thành một thẻ: email người nhận, nhãn, người được gán.
Ô theo `input.md`, thẻ là pill như badge (`M7`, `F1`), câu lỗi theo
`layouts/form.md`.

- **Enter và dấu phẩy đều thành thẻ.** Dán cả danh sách thì tách theo dấu phẩy. Backspace lúc **chưa gõ chữ nào** thì bỏ thẻ cuối.
- **Giá trị sai khuôn vẫn được thêm thành thẻ**, không chặn lúc gõ. Dán 30 email mà chặn ngay thì người dùng mất dòng và không biết mất dòng nào. Thẻ sai đổi sang tông đỏ kèm icon, sửa bằng cách bỏ thẻ rồi gõ lại.
- **Lỗi ở thẻ nào thì đỏ ở thẻ đó, viền ô giữ nguyên.** Chỉ lỗi của **cả ô** (chưa thêm được ai) mới viền đỏ cả ô như mọi ô nhập khác. Hai phạm vi lỗi, hai cách hiện, không lẫn (`N3`).
- **Câu lỗi nói đúng thứ code đang kiểm**, không bịa thêm luật (`N6`): hàm kiểm "có `@` và tên miền có dấu chấm" thì câu phải là "cần có dấu @ và tên miền", **không** phải "phải có đuôi .com" — `@saoviet.vn` là hợp lệ.
- **Giá trị dài xuống dòng trong thẻ** (`wrap-anywhere`), không `truncate`, không tooltip: email là thứ người dùng phải đọc đủ mới biết gửi đúng ai (`N8`). Thẻ hết chỗ thì xuống dòng và ô cao theo.
- **Nút bỏ trên mỗi thẻ có `aria-label` kèm giá trị** ("Bỏ ngoc.tran@saoviet.vn"), không chỉ "Bỏ".
- **Placeholder là câu hướng dẫn** (`T25`: "Nhập email người nhận"), không dùng ví dụ giả `ten@congty.com`. Dòng gợi ý dưới ô nói cách thêm ("Gõ xong bấm Enter để thêm người nhận") — đây là thứ người dùng chưa biết trước khi gõ, không phải chữ thừa (`T20`).
- **Khoá**: ô chìm xuống nền trang, **thẻ giữ nguyên màu để còn đọc được**, chỉ nút bỏ tắt, và nói lý do ngay dưới ("Chỉ người tạo chiến dịch sửa được danh sách này") (`N6`).
