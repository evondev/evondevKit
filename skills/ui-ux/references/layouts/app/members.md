# Trang thành viên và phân quyền

Là bảng quản lý ở mục "Bảng dữ liệu" (`data-table.md`), khác ở những chỗ dưới đây. Hai việc
chính của trang là **mời** và **đổi vai trò**, nên cả hai phải thấy được ngay khi
nhìn, không nằm sau lúc rê chuột hay trong menu ⋯.

```
[Tất cả 18] Đang hoạt động 14  Chờ chấp nhận 4     [tìm…] [Vai trò ▾] [+ Mời thành viên]
┌──────────────────────────────────────────────────────────────────────────┐
│ ☐  Thành viên                                   Vai trò          Ngày tham gia  │
├──────────────────────────────────────────────────────────────────────────┤
│    ⬤ Trần Nguyễn Anh Tuấn Khang  Bạn            Chủ sở hữu       04/03/2024     │ <- khoá: chữ trơn, không ⌄, không ⋯
│       tran.khang@evondev-studio.com                                             │
│ ☐  ⬤ Lê Minh Anh                                Quản trị viên ⌄  17/06/2024   ⋯ │
│       minhanh.le@evondev-studio.com                                             │
│ ☐  ⬤ hoang.long.pham@gmail.com (Chờ chấp nhận)  Thành viên ⌄     —            ⋯ │ <- ngoại lệ mới có badge
│       Đã mời 24/09                                                              │
└──────────────────────────────────────────────────────────────────────────┘
```

- **Ô vai trò đổi được thì luôn có `ChevronDown` `size-3.5 text-muted` sau chữ**, không chỉ hiện nền lúc rê. Chỉ có nền lúc rê thì ô "Quản trị viên" đứng yên trông y hệt ô "Chủ sở hữu" không đổi được, và việc đề bài đòi ("đổi vai trò") không ai tìm ra (phải rê đúng vào chữ mới biết bấm được). Các app quản lý thành viên phổ biến đều để mũi tên luôn hiện ở cột vai trò. Dòng khoá (chủ sở hữu, chính mình) là chữ trơn không mũi tên: **có mũi tên hay không chính là tín hiệu đổi được hay không**, không cần thêm icon khoá. Ô `px-2`, nút ô `px-2` (như ô hạn chót, không `-mx-2`), nền rê `bg-foreground/8`, giữ nền lúc danh sách mở (`aria-expanded:bg-foreground/8`) như ô sửa tại chỗ ở bảng công việc (`I10`: nút trong dòng đang rê dùng `/8`, `/5` gần trùng nền dòng).
  - **Mũi tên thẳng một cột**: nút rộng bằng **nhãn dài nhất** trong danh sách vai trò, mũi tên `ml-auto` bám mép phải nút. Để nút co theo chữ thì "Chỉ xem ⌄", "Thành viên ⌄", "Quản trị viên ⌄" mỗi dòng mũi tên một chỗ, cột trông lệch (lệch 12px giữa hai vai trò). Không cần đo bằng JS: trong nút đặt một `grid`, mọi nhãn chồng lên cùng một ô (`col-start-1 row-start-1`), nhãn đang chọn hiện, các nhãn còn lại `invisible` + `aria-hidden`; ô grid tự rộng bằng nhãn dài nhất. Không khoá `w-36` cứng: đổi tên vai trò hay đổi sang tiếng Anh là lệch lại.
  - Khác bảng công việc (mục "Bảng nhóm theo trạng thái"): ở đó mỗi dòng ba bốn ô sửa được, mũi tên khắp nơi là nhiễu, nên dấu bấm được chỉ hiện lúc rê. Luật chung: **ô sửa tại chỗ là việc chính của trang thì dấu bấm được luôn hiện; ô sửa tại chỗ phụ thì hiện lúc rê.**
  - Danh sách mở ra theo Select ở `../../components/choice-controls.md`: mỗi vai trò một dòng tên + một câu nói làm được gì, vai trò đang có có dấu check. Chọn là lưu và đóng, toast "Đã đổi vai trò" kèm **Hoàn tác** (`D3`), không hộp xác nhận: đổi vai trò đổi lại được. Chủ sở hữu không nằm trong danh sách (chuyển quyền sở hữu là luồng riêng có xác nhận).
- **Không có cột Trạng thái.** "Đang hoạt động" là trạng thái thường của thành viên; một cột badge xanh lặp trên 14/18 dòng là một câu nói 14 lần (`N3`). **Chỉ dòng ngoại lệ mới có dấu**: lời mời chưa chấp nhận có badge xám "Chờ chấp nhận" ngay sau email ở tầng trên (chỗ của nhãn "Bạn"), tầng dưới "Đã mời 24/09", ngày tham gia `—`. Thành viên bị tạm ngưng (nếu dự án có) cũng là ngoại lệ, cùng cách. Tab trạng thái vẫn giữ để lọc. Bỏ cột thì dưới `sm` mỗi dòng còn hai tầng (tên + email bên trái, vai trò bên phải) thay vì ba tầng vì badge chiếm riêng một hàng.
- **Lọc vai trò là một nút dropdown "Vai trò" cạnh ô tìm, không phải hàng chip.** Menu có checkbox, chọn được nhiều; đang lọc một vai trò thì nút ghi tên vai trò đó ("Quản trị viên"), nhiều vai trò thì "Vai trò · 2", `ChevronDown` cuối nút. Nút này là ô Select: không hover, lúc mở viền `border-focus` + `ring-2`, nền giữ trắng (`../../components/button.md`). Hàng chip dưới hàng tab dành cho bảng mà lọc là cách đi chính (khách hàng theo nhãn). Ở đây vai trò đã hiện ở cột, lọc theo vai trò là việc ít làm, mà hàng chip chiếm nguyên một hàng trên bảng: hai hàng lọc cho 18 người. Các app quản lý thành viên phổ biến đều lọc vai trò bằng một dropdown. Dưới `sm` nút này đứng cùng hàng với nút "Trạng thái:".
- **Email đứng ở tầng trên (lời mời chưa có tên) thì cắt phần trước `@`, giữ tên miền** (`AccountEmail` ở `overlay.md`, `N8`): với lời mời, tên miền nói người này trong công ty hay ngoài công ty. Cắt cuối thì "nguyen.thi.thuy.duong.ketoan.chinhanh.hcm@co…" mất hẳn tên miền. Email ở tầng dưới của thành viên đã có tên thì cắt cuối như thường: cả bảng chung một tên miền, phần phân biệt là phần trước `@`.
- **Menu ⋯ chỉ còn việc không nằm ở ô nào**: thành viên có "Xoá khỏi workspace"; lời mời có "Gửi lại lời mời", "Thu hồi lời mời". Đổi vai trò không lặp trong menu (đã ở ô). Dòng khoá không có checkbox, không có ⋯.
- **Thanh hàng loạt có "Đổi vai trò" (dropdown) cạnh "Xoá N thành viên"**: đổi vai trò cho cả nhóm người mới vào là việc hay làm hơn xoá hàng loạt. Đổi xong một toast gộp kèm Hoàn tác.
- **Modal mời nhận nhiều email một lần**: ô email là tag input (`../../components/tag-input.md`), dán cả danh sách, một vai trò cho cả lô, nút ghi số ("Gửi 3 lời mời"). Ô một email thì mời năm người phải mở modal năm lần. Các app quản lý thành viên phổ biến đều cho mời nhiều người một lần. Chọn vai trò trong modal dùng cùng danh sách có câu mô tả như ở ô bảng.
  - **Email trùng nói đúng ca, đỏ ở đúng thẻ đó:** đã là thành viên thì "Đã là thành viên"; đã mời mà chưa chấp nhận thì "Đã mời 24/09, chưa chấp nhận". Không gộp hai ca thành "Email này đã có trong workspace": người đang chờ chấp nhận chưa ở trong workspace, và việc người mời cần làm là gửi lại lời mời chứ không phải bỏ cuộc.

---

## Kiểm trước khi giao

Chạy cùng cổng 2 của `checklist.md` khi trang có đúng thứ này.

- [ ] **Trang thành viên**: ô vai trò đổi được có `ChevronDown` luôn hiện, dòng khoá (chủ sở hữu, chính mình) là chữ trơn không mũi tên, hay phải rê chuột mới biết đổi được? Có cột Trạng thái lặp "Đang hoạt động" trên gần hết các dòng không (chỉ lời mời mới có badge "Chờ chấp nhận" cạnh email)? Lọc vai trò là một dropdown cạnh ô tìm, hay thêm một hàng chip dưới hàng tab? Email của lời mời bị cắt mất tên miền không? Modal mời nhận nhiều email (tag input), email trùng phân biệt "Đã là thành viên" với "Đã mời …, chưa chấp nhận"? Thanh hàng loạt có "Đổi vai trò" (`layouts/app/members.md`, "Trang thành viên và phân quyền")?
