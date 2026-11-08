# Trang khoá API

Là trang cài đặt kiểu A, **một mục** "Khoá của workspace": câu mô tả nói khoá dùng ở đâu và
phải giữ thế nào, nút `primary` "Tạo khoá API" ngang hàng tiêu đề mục (việc chính duy nhất
của trang, `I2`; dưới `sm` xuống dưới câu mô tả, căn trái). Không đầu trang riêng (xem "Khu
cài đặt có nhiều trang").

```
Khoá của workspace                                          [+ Tạo khoá API]
Dùng để gọi API từ máy chủ của bạn. Giữ khoá như mật khẩu…
┌─────────────────────────────────────────────────────────────────────────┐
│ Máy chủ production                                                  ⋯   │
│ evd_live_…a3f9 · Toàn quyền · Dùng 2 phút trước · Không hết hạn         │
│ ─────────────────────────────────────────────────────────────────────── │
│ Đồng bộ đơn hàng sang phần mềm kế toán cho chi nhánh…               ⋯   │
│ evd_live_…7c1e · Chỉ đọc · Dùng 3 ngày trước · Hết hạn sau 3 ngày       │  <- hổ phách
│ ─────────────────────────────────────────────────────────────────────── │
│ Script báo cáo cũ (Đã hết hạn)                                      ⋯   │  <- cuối danh sách
│ evd_live_…5e6f · Chỉ đọc · Dùng 11/09                                   │
└─────────────────────────────────────────────────────────────────────────┘
```

- **Dòng khoá** theo `../../components/list-row.md`, **không ô icon đầu dòng**: mọi dòng cùng
  một icon chìa khoá là một ý nói năm lần (`N3`). Tên `text-sm font-medium truncate` (có
  `title`). Dòng phụ `text-xs text-muted`: **chuỗi khoá đã che** `font-mono` (`T17`) gồm phần
  đầu và bốn ký tự cuối (`evd_live_…a3f9`: phần đầu nói khoá thật hay khoá thử, đuôi để đối
  chiếu), quyền, lần dùng cuối (`<time>` có giờ đủ trong `title`, `T16b`; chưa dùng thì
  "Chưa dùng lần nào"), hạn dùng. Ngày theo `T16b`: năm nay thì bỏ năm ("Dùng 07/09", "Hết
  hạn 23/12"), khác năm mới ghi đủ. Đừng để "Dùng 07/09/2026" đứng cạnh "Hết hạn
  23/12" trong cùng một dòng.
- **Hạn dùng ba mức** như `list-row.md`: còn xa `text-muted` "Hết hạn 23/12"; còn từ 7 ngày
  trở xuống ghi số ngày, `text-amber-700` "Hết hạn sau 3 ngày" (`M7`, đó là thứ phải làm);
  đã hết hạn thì badge trung tính "Đã hết hạn" cạnh tên và **bỏ mảnh hạn dùng** khỏi dòng phụ
  (không nói hai lần). Khoá hết hạn xếp xuống cuối, còn lại mới tạo đứng đầu.
- **Thao tác của dòng là nút `⋯`** (`I11`: có xoá thì gom vào ba chấm), cỡ `size-10`,
  `aria-label` có tên khoá. Menu: **"Đổi tên"**, đường chia, **"Thu hồi khoá"** (mục menu
  nguy hiểm, đỏ lúc rê, `I4`). Khoá đã hết hạn: "Xoá" thay "Thu hồi khoá" (thu hồi một khoá đã
  chết là chữ sai việc, `N6`). Ba nền tảng lớn đều gom thao tác của dòng
  khoá vào nút ba chấm, hai trong đó có mục sửa tên. Vì có từ hai việc nên khác dòng phiên
  đăng nhập (chỉ một việc, nút "Đăng xuất" hiện thẳng).
  Đừng mượn khuôn dòng phiên (nút viền "Thu hồi" `h-11` trên mọi dòng): ở 375px nút rơi xuống
  dưới chữ, mỗi dòng cao 143px, năm khoá dài hơn một màn; với `⋯` nút ở lại bên phải, dòng còn
  87px.
- **Đổi tên** mở hộp một ô (modal có form, `I20`), điền sẵn tên hiện tại, con trỏ nằm sẵn
  trong ô, nút "Lưu" / "Huỷ". Lỗi trùng tên so với các khoá **khác** (so với chính nó thì không
  tính). Đổi xong đóng hộp, toast "Đã đổi tên khoá" với tên mới ở dòng dưới, focus về nút `⋯`
  của dòng đó. Không hỏi lại: tên chỉ để người trong workspace nhận ra khoá, ứng dụng đang dùng
  khoá không bị ảnh hưởng. Lưu gì, gọi gì khi bấm Lưu là việc của người dùng (`N10`): skill để
  handler `onRename` rỗng.
- **Dòng phụ ở màn hẹp chia hai dòng theo nghĩa**, không để trình duyệt tự ngắt: "chuỗi khoá
  · quyền" / "lần dùng · hạn dùng". Từ `sm` nối thành một dòng. Ngắt tự do thì dấu `·` rớt
  lên đầu dòng sau ("· Chưa dùng lần nào"). Cách làm ở
  `list-row.md`, "Dòng phụ nhiều mảnh".
- **Thu hồi hỏi lại** bằng hộp xác nhận đỏ như hộp xoá (`I4` câu 2, kết thúc thứ đang chạy; `D3`: ứng dụng đang dùng khoá hỏng
  ngay, không gọi lại được), icon `key-round`, tên khoá in đậm đầu câu, nút "Thu hồi khoá".
  **Xoá khoá đã hết hạn làm ngay**, không hỏi: khoá đó đã không gọi được gì. Cả hai xong thì
  toast, tên khoá ở dòng dưới; không Hoàn tác. Gỡ dòng thì chuyển focus (`I31`): sang nút `⋯`
  của dòng kế, hết thì dòng trên, không còn dòng nào thì tiêu đề mục.
- **Hộp tạo khoá** (modal có form, `I20`: bấm ra ngoài không đóng): ba trường.
  - "Tên khoá", gợi ý "Đặt theo nơi dùng khoá, để sau này biết khoá nào thu hồi được." Con
    trỏ nằm sẵn ở ô. Trùng tên khoá đang có thì báo lỗi dưới ô.
  - "Quyền": card chọn (`choice-controls.md`), vì hai lựa chọn có hệ quả khác hẳn nhau; **sẵn
    lựa chọn hẹp nhất** ("Chỉ đọc"). Tài liệu tạo khoá của hai nền tảng lớn
    đều dặn chọn quyền tối thiểu cần dùng.
  - "Hạn dùng": select 30 ngày / 90 ngày / 1 năm / Không hết hạn, **có sẵn một hạn**, không sẵn
    "Không hết hạn". Chữ gợi ý dưới ô ghi ngày hết hạn thật ("Hết hạn ngày 25/12/2026."), không
    bắt người dùng tự cộng.
- **Tạo xong thì cùng hộp chuyển sang bước hiện khoá**, không đóng hộp này mở hộp khác (một
  nhịp chớp, focus đi hai lần). Tiêu đề "Sao chép khoá API", câu mô tả nói đây là lần duy nhất
  thấy khoá đầy đủ. Khoá nằm trong khối `bg-background rounded-xl px-4 py-3 font-mono
  break-all select-all` (bấm là bôi đen cả khoá; không cắt "…" vì người dùng cần đối chiếu
  khoá đã dán). Dưới khối là nút `primary` "Sao chép khoá" (`I2`: việc duy nhất của bước này) có icon `copy`, nhận focus khi bước
  này hiện; chép xong icon thành `check` 1,5 giây, chữ giữ nguyên (`N1`), kèm `role="status"`
  "Đã sao chép". Chân hộp chỉ còn "Xong" (`secondary`). Không đặt nút sao chép cạnh khối khoá
  trên một hàng: ở 640 và 1280px khoá bị ép xuống hai dòng và khối đen to
  bằng khối khoá đứng cạnh nó.
- **Trang trạng thái** đủ các ca: đang tải (khung chờ đúng hình dòng, chỗ nút là ô `size-10`),
  lỗi tải, chưa có khoá (một dòng chữ, nút tạo đã ở đầu mục), tên khoá rất dài, khoá sắp hết
  hạn, khoá đã hết hạn, menu `⋯` đang mở; hộp xác nhận thu hồi; hộp tạo trống, lỗi thiếu tên,
  lỗi trùng tên, đang tạo; bước hiện khoá, vừa sao chép; hai toast.

---

## Kiểm trước khi giao

Chạy cùng cổng 2 của `checklist.md` khi trang có đúng thứ này.

- [ ] **Trang khoá API** (`layouts/app/api-keys.md`): thao tác của dòng là nút `⋯` (Đổi tên, Thu hồi khoá / Xoá), không nút viền lặp trên từng dòng? Ở 375px dòng phụ có dấu `·` nào rớt lên đầu dòng không (phải chia hai nhóm theo nghĩa)? Ngày năm nay có bỏ năm không ("Dùng 07/09", không "07/09/2026")? Khoá hết hạn có badge và không lặp mảnh hạn dùng? Hộp tạo sẵn "Chỉ đọc" và một hạn cụ thể, không sẵn "Không hết hạn"? Bước hiện khoá nằm trong cùng hộp, bấm ra ngoài không đóng?
