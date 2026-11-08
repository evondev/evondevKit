# Trang bảo mật

Là trang cài đặt kiểu A (`settings.md`). Bộ mục mặc định:

| Mục | Hàng | Lưu |
| --- | --- | --- |
| Xác thực hai lớp | Dòng trạng thái + nút mở luồng; đã bật thì thêm hàng Phương thức, Mã dự phòng | Luồng riêng (modal), không công tắc |
| Phiên đăng nhập | Mỗi thiết bị một dòng, phiên đang dùng đứng đầu; chân khung có nút đăng xuất hàng loạt | Làm ngay, toast báo xong |

Mật khẩu đã có ở trang hồ sơ (mục Đăng nhập) thì không lặp lại ở đây. App không có
trang hồ sơ thì hàng Mật khẩu đứng đầu trang này, dựng y như bên hồ sơ.

```
Xác thực hai lớp
┌──────────────────────────────────────────────────────────┐
│ Chưa bật                              [Bật xác thực hai lớp] │  <- chưa bật
│ Ngoài mật khẩu, nhập thêm mã 6 số từ ứng dụng xác thực.  │
└──────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────┐
│ ✓ Đã bật từ 12/06/2026                            [Tắt]  │  <- đã bật
│ ──────────────────────────────────────────────────────── │
│ Ứng dụng xác thực   Google Authenticator          [Đổi]  │
│ ──────────────────────────────────────────────────────── │
│ Mã dự phòng         Còn 8 / 10 mã           [Tạo mã mới] │
└──────────────────────────────────────────────────────────┘

Phiên đăng nhập
Thấy thiết bị lạ thì đăng xuất thiết bị đó rồi đổi mật khẩu.
┌──────────────────────────────────────────────────────────┐
│ [▭] Chrome trên macOS  Thiết bị này                      │
│     Hà Nội, Việt Nam                                     │
│ ──────────────────────────────────────────────────────── │
│ [▯] Safari trên iPhone                     [Đăng xuất]   │
│     Hà Nội, Việt Nam · 2 giờ trước                       │
│ ──────────────────────────────────────────────────────── │
│                          [Đăng xuất 4 thiết bị khác]     │  <- cùng cỡ, cùng dạng nút dòng
└──────────────────────────────────────────────────────────┘
```

- **Xác thực hai lớp không phải công tắc** (`../../components/choice-controls.md`, "Hàng cài
  đặt"). Bật phải qua ba bước: quét mã QR (hoặc chép khoá), nhập mã 6 số để thử, lưu mã
  dự phòng. Tắt phải nhập lại mật khẩu. Nên là dòng trạng thái + nút mở luồng.
  Đã dính khi dựng thành công tắc: gạt là hiện "Đã lưu" trong khi chưa quét mã nào, và lúc đã bật thì không còn
  chỗ cho phương thức và mã dự phòng.
  - Chưa bật: chữ "Chưa bật" `text-sm font-medium` + câu hệ quả `text-muted`, nút **`primary`**
    "Bật xác thực hai lớp" bên phải (dưới `sm` xuống dưới chữ, căn trái). Lý do nền nhấn
    (`I2`): đây là việc trang muốn người dùng làm, và là nút chính duy nhất của trang. Nút viền
    đứng ngang hàng bốn nút "Đăng xuất" thì việc nên làm nhất trang không nổi hơn
    việc gì (chủ dự án: "bật xác thực hai lớp tôi nghĩ nền đen"). Không tô chữ "Chưa bật"
    vàng hay đỏ: nút đặc đã đủ kéo mắt, trang cài đặt không phải chỗ doạ người dùng (`M7`).
  - Đã bật: dòng đầu icon `check` `text-emerald-600` + "Đã bật từ 12/06/2026", nút
    `outline` "Tắt" (không `rose`: tắt không mất dữ liệu, bật lại được, `I4`). Dưới là hai
    hàng kiểu A: Ứng dụng xác thực (nút "Đổi"), Mã dự phòng ghi số mã còn lại (nút "Tạo mã
    mới"). Còn từ 2 mã trở xuống thì câu phụ `text-muted` "Sắp hết mã, tạo mã mới rồi cất
    ở chỗ an toàn." Mất điện thoại mà không có mã dự phòng là mất tài khoản, nên hàng này
    không giấu vào luồng khác.
  - Luồng bật, luồng tắt: skill để handler rỗng (`onEnable`, `onDisable`), trang chỉ đổi
    hình theo trạng thái máy chủ trả về (`N10`).
- **Dòng phiên** theo `../../components/list-row.md`: icon loại thiết bị trong ô `size-10
  rounded-lg bg-background`, tên thiết bị `text-sm font-medium truncate`, dòng phụ `text-xs
  text-muted` "vị trí · lần hoạt động cuối", nút `outline` "Đăng xuất" cỡ nút form (`h-11 md:h-10 rounded-xl`, như nút "Bật xác thực hai lớp"),
  **rê vào / Tab tới thì đỏ** (dạng "nút lặp lại trên từng dòng" của `I4`), `aria-label` có
  tên thiết bị. Phiên đang dùng đứng đầu, nhãn `text-xs text-muted` "Thiết bị
  này" cạnh tên, **không nút** (tự đăng xuất đi qua menu tài khoản). Dưới `sm` nút xuống
  dưới chữ, căn trái.
- **Đăng xuất một thiết bị làm ngay**, không hỏi, toast "Đã đăng xuất thiết bị" với tên
  thiết bị ở dòng dưới. Không có Hoàn tác: phiên đã thu hồi thì không gọi về được.
- **Đăng xuất hàng loạt: nút nguy hiểm đứng riêng** (nền `rose-500/10`, chữ `rose-700`,
  `I4`), **cùng cỡ nút dòng** (`h-11 md:h-10 rounded-xl`), ở chân khung, chỉ hiện khi còn thiết bị
  khác. Đỏ vì nó đá mọi thiết bị khác ra cùng lúc và không gọi lại được, kể cả máy của
  chính mình đang dùng dở; đăng xuất ở skill này là việc nguy hiểm (`I4`, chủ dự án chốt).
  **Hỏi lại trước** (`D3`: nhiều thiết bị một lúc) bằng hộp xác nhận đỏ như hộp xoá (icon
  `log-out` nền `rose-500/10`, nút xác nhận `rose`).
  Đừng dùng lại lý lẽ "không mất dữ liệu" (chủ dự án đã bác) để đổi sang nút viền trung tính:
  cả trang không còn gì nói "cẩn thận" nữa. Nút `rose` cao hơn nút dòng thì hai cỡ nút chồng nhau trong một khung: giữ
  cùng cỡ nút dòng, giữ màu `rose`.
- **Cả trang một cỡ nút** (`h-11 md:h-10`), không `h-8` cho nút trong dòng phiên. Ở 1280px
  dòng không cao thêm (ô icon `size-10` đã cao 40px, nút cao bằng ô icon); ở 375px mỗi dòng
  cao thêm 12px nhưng nút đạt 44px, cỡ bấm tối thiểu khuyến nghị cho màn cảm ứng (nút 32px
  thì hụt). Nút dòng và nút hàng loạt `h-8` đứng dưới nút "Bật xác thực
  hai lớp" `h-10` là một trang hai cỡ nút (chủ dự án: "để h-10 luôn cho đồng bộ").
- **Gỡ dòng xong thì chuyển focus** (`I31`): đăng xuất một thiết bị thì focus sang nút
  "Đăng xuất" của dòng kế (hết dòng thì dòng trên); đăng xuất hàng loạt xong thì focus lên
  tiêu đề mục "Phiên đăng nhập" (`tabIndex={-1}`). Không chuyển thì focus rơi
  về `<body>`, trình đọc màn hình mất chỗ.
- **Khung chờ**: dòng đầu là phiên đang dùng nên **không có khối nút**, các dòng sau có
  (`I19`: khung chờ đúng hình).
- **Trang trạng thái** đủ các ca: xác thực hai lớp chưa bật, đã bật, đã bật mà sắp hết mã
  dự phòng; danh sách đang tải, lỗi tải, đang đăng xuất một dòng (spinner trong nút, nút
  giữ cỡ), chỉ còn thiết bị này (không chân khung), tên thiết bị rất dài; hộp xác nhận
  đăng xuất hàng loạt; hai toast.

---

## Kiểm trước khi giao

Chạy cùng cổng 2 của `checklist.md` khi trang có đúng thứ này.

- [ ] **Trang bảo mật**: "Bật xác thực hai lớp" là nút `primary` (`I2`: việc nên làm nhất của trang)? Nút đăng xuất hàng loạt đỏ sẵn nhưng cùng cỡ `h-11 md:h-10` với nút "Đăng xuất" trong dòng (cả trang một cỡ nút), còn nút trong dòng chỉ đỏ lúc rê (`I4`, `layouts/app/security.md`)?
