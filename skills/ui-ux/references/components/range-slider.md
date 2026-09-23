# Thanh trượt khoảng giá (range slider)

Lọc theo một khoảng số: giá, diện tích, số lượng. Gồm **thanh trượt hai tay cầm
+ hai ô nhập "Từ" / "Đến"**. Ô nhập theo `input.md`, dòng 0 kết quả theo
`empty-state.md`.

- **Luôn có hai ô nhập đi kèm thanh trượt.** Thanh trượt đi nhanh theo bậc, ô nhập là đường vào thứ hai và là chỗ đặt số lẻ mà bậc trượt không tới (7.350.000). Hai ô `tabular-nums`, `text-base` ở mobile (iOS phóng to trang khi ô dưới 16px), hậu tố `đ` xám nằm trong ô, nhãn "Từ" / "Đến" ở trên.
- **Số trong ô chỉ áp khi rời ô hoặc bấm Enter**, không áp theo từng ký tự: gõ dở "5" trong "5.000.000" mà áp ngay thì đầu kia bị kéo theo, và danh sách nhảy loạn (`N7`).
- **Tay cầm `size-5`, viền 2px, nhưng vùng bấm 44×44** (`before:-inset-3.5`, neo theo *border box* — `-inset-3` chỉ ra 40px vì viền đã ăn 4px). **Cả dải rãnh cao 44px** (`h-11`) và bấm vào rãnh thì tay cầm gần nhất chạy tới, nên trên điện thoại không phải nhắm trúng vòng nhỏ (`N9`).
- **Vùng kéo `touch-none`**: chạm vào dải này thì không cuộn trang theo. Đây là đánh đổi có chủ ý của dải 44px.
- **Hai tay cầm không đổi chỗ cho nhau.** Kéo sát thì chúng chạm nhau và dừng (Từ = Đến), không vượt qua. Lúc đang chồng nhau, bấm phím sang phải là tay cầm phải đi, sang trái là tay cầm trái đi.
- **Bàn phím** (`N9`): Tab tới từng tay cầm, mũi tên đi một bậc, PageUp/PageDown đi bậc lớn, Home/End về hai đầu. Sau khi kéo, tiêu điểm ở đúng tay cầm vừa kéo.
- **Hai đầu rãnh có nhãn giá trị nhỏ nhất và lớn nhất** (`0 đ`, `50.000.000 đ`), `text-xs text-muted`.
- **Lọc ra 0 kết quả không tô đỏ gì cả** (`M30`, `empty-state.md`): một dòng `text-sm text-muted` ở chỗ đáng lẽ có danh sách, nói số cụ thể và cách nới lọc ("Không có sản phẩm nào từ 47.500.000 đ trở lên. Đắt nhất đang bán là 42.900.000 đ, hạ giá Từ xuống để xem thêm"). Dòng đó và dòng đếm kết quả cùng `py-6` nên khối không co giãn khi đổi qua lại (`N1`).
- **Khoá**: rãnh, tay cầm và hai ô cùng chìm xuống, con trỏ `not-allowed`, và **nói lý do ngay bên dưới** ("Gói Cơ bản chưa lọc được theo giá") — khoá mà không nói vì sao là bế tắc (`N6`).
- Ràng buộc nghiệp vụ (khoảng tối thiểu, bước làm tròn) là **logic của người dùng**, skill không tự bịa ra để có thêm một ca lỗi (`N10`).
