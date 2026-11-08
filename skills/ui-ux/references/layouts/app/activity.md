# Trang hoạt động (nhật ký) ⚑

Luồng thay đổi của cả workspace, xem đầy đủ: khối "Hoạt động gần đây" của Dashboard mở rộng ra
cả trang. Khác dòng thời gian của **một** bản ghi (`components/timeline.md`): ở đây câu hỏi là
**ai** vừa đụng **gì**.

```
Hoạt động                      [Người ⌄] [Loại ⌄] [7 ngày qua ⌄] [tìm   ]
HÔM NAY
◐ Lan Anh đã đổi HD-0030 sang Đã thu                               10:42
         Chưa thu → Đã thu
◐ Minh đã tạo hoá đơn HD-0112 cho Phòng khám Nha Việt              09:15
HÔM QUA
⚙ Hệ thống đã gửi nhắc thu HD-0078                                 17:00
                              [Tải thêm]
```

- **Mỗi mục một câu**: avatar `size-7`, câu "**Tên người** đã làm gì **tên đối tượng**" (tên người
  và tên đối tượng đậm, động từ thường), giờ bên phải `text-xs text-muted tabular-nums`. Dòng phụ chỉ
  khi có giá trị cũ → mới. Không vòng icon theo loại việc, không đường nối dọc: đó là khuôn
  timeline của một bản ghi.
- **Nhóm theo ngày**: nhãn "Hôm nay", "Hôm qua", "Thứ Hai, 03/11" theo khuôn nhãn nhóm (IN HOA,
  `text-xs text-muted`), dính đầu khi cuộn.
- **Việc do hệ thống làm**: avatar là ô icon (`Bot`, `Settings`), tên "Hệ thống"; không mượn avatar
  người.
- **Tên đối tượng là link** tới bản ghi đó.
- **Cuối danh sách "Tải thêm"**, nút viền giữa, không phân trang số: nhật ký đọc theo thời gian, nhảy
  tới "trang 7" không có nghĩa.
- **Lọc theo người, loại việc, khoảng ngày**; rỗng do lọc theo `components/empty-state.md`.
- **Nhật ký kiểm tra cho quản trị** (cần địa chỉ IP, thiết bị, xuất file, lọc theo cột) thì là **Bảng
  dữ liệu**, không phải luồng này.
