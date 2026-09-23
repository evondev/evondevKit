# Khu bình luận có trả lời lồng nhau

Bình luận dưới một bản ghi: task, tài liệu, đơn hàng. Chữ mượn dòng danh sách
(`list-row.md`), nút theo `button.md`, menu ba chấm theo `layouts/overlay.md`.

- **Mỗi bình luận**: avatar `size-8` (`avatar.md`), tên `text-sm font-medium`, thời gian `text-xs text-muted` kèm giờ tuyệt đối ở `title` (`T16b`), nội dung `text-sm` cho xuống dòng, dưới cùng là nút `ghost` có icon `Reply` ghi "Trả lời". Hai cỡ chữ, không hơn.
- **Thụt lề mỗi tầng ~29px** (`ml-4` + viền + `pl-3`), đường dọc `border-l` rơi đúng tâm avatar của bình luận cha.
- **Màn hẹp chỉ thụt tối đa 2 tầng.** Sâu hơn thì hàng con **không thụt nữa**, thay bằng dòng `text-xs text-muted` "Trả lời **<tên>**" ở đầu bình luận. Thụt tiếp là cột chữ còn ~140px, ô trả lời vỡ hai dòng placeholder, và nội dung xuống dòng từng hai ba chữ (`R5`, đã dính 23/09/2026).
- **Ô trả lời ở màn hẹp bỏ avatar bên trái** (lấy lại 44px), ô viết chiếm hết bề ngang. Ô gốc ở cuối khu thì vẫn có avatar.
- **Nút trong ô viết**: gửi là `primary` và **khoá khi ô trống** (`opacity-50`), huỷ là `secondary`. Một nút thì **không kéo rộng hết hàng ở màn hẹp** — `R3` chỉ áp khi cụm nút không vừa.
- **Bốn trạng thái của một bình luận** (`N2`), mỗi cái một hình riêng:
  - *đang gửi*: spinner `size-4` cạnh tên, cả khối `text-muted`, link "Trả lời" mờ và không bấm được;
  - *gửi lỗi*: dòng `text-xs text-red-600` kèm icon cạnh tên ("Gửi không thành công") — **`red` chứ không phải `rose`**, vì gửi hỏng là việc đã xảy ra rồi, không phải cảnh báo trước khi bấm (`M30`) — cộng hai nút "Thử lại" (`outline`) và "Xoá" (nền `rose-500/10`, chữ `rose-700`, theo `I4`);
  - *đã xoá*: một dòng xám "Bình luận đã bị xoá" kèm thời gian, **vẫn giữ nguyên các trả lời bên dưới**, không xoá cả nhánh;
  - *thường*: menu ba chấm **luôn hiện** (`I11`: từ 3 hành động trở lên hoặc có xoá thì không ẩn theo hover, nếu không trên điện thoại sẽ không ai thấy), mục "Xoá bình luận" chỉ đỏ lúc rê (`I4`).
- **Rỗng**: một dòng chữ mờ "Chưa có bình luận nào" (`empty-state.md`), ô viết vẫn đứng nguyên chỗ cũ (`N1`).
- Đếm số ở tiêu đề khu ("Bình luận 7") là số trơn `text-muted`, không badge màu.
