# Trang lỗi (404, 403, 500, bảo trì)

Bốn trang, **hai chỗ đặt** theo việc khung app còn
dựng được không:

| Trang | Đặt ở đâu | Việc chính (nút đặc) | Lối phụ |
| --- | --- | --- | --- |
| 404 trong app (đã đăng nhập) | **trong khung app**, sidebar và header giữ nguyên | Về trang tổng quan | Quay lại trang trước (chỉ khi có trang trước) |
| Bản ghi không tìm thấy (khách, đơn… id sai hoặc đã xoá) | trong khung app, cùng khối với 404 | Về danh sách của loại bản ghi đó ("Về danh sách khách hàng") | Quay lại trang trước (chỉ khi có trang trước) |
| 403 | trong khung app | Gửi yêu cầu cấp quyền | Về trang tổng quan; dòng cuối "Bạn đang đăng nhập bằng … · Đổi tài khoản" |
| 500 của một trang (khung vẫn chạy) | trong khung app | Tải lại trang | Về trang tổng quan; dòng cuối mã lỗi `font-mono` + nút sao chép |
| 404 khi chưa đăng nhập, 500 làm sập cả app, bảo trì | **đứng riêng**: cùng khối như trong khung, thêm logo căn giữa ở trên; **không card** | 404: về trang chủ / đăng nhập. 500: Tải lại trang. Bảo trì: không nút đặc, "Tải lại trang" là nút viền | — |

- **Người đã đăng nhập gặp lỗi thì vẫn ở trong app.** Bỏ khung app đi là bỏ luôn đường ra: muốn
  sang trang khác phải bấm đúng một nút trên card. Các hướng dẫn thiết kế trang 404 đều giữ
  thanh điều hướng của site, và router lồng nhau dựng trang not-found **bên trong** layout cha.
  Header ghi tên lỗi ("Không tìm thấy trang"), không ghi tên trang cũ, không đường dẫn.
- **Route bắt mọi đường dẫn trong khung app phải có trang.** `{ path: "*" }` không `element`
  thì khung dựng vùng nội dung trống, header vẫn ghi "Tổng quan": người dùng tưởng trang đang
  tải. Lưới router bắt ở cấp gốc chỉ phủ đường dẫn
  ngoài khung.
- **Khối trong khung: không card, căn giữa, chữ căn giữa** như khối lỗi tải
  (`../../components/empty-state.md`): `mx-auto max-w-md pt-16 pb-16 text-center sm:pt-24`, nằm
  thẳng trên nền trang. Nút `h-11 md:h-10`, dưới `sm` rộng hết và xếp dọc (nút đặc trên), từ
  `sm` co theo chữ, đứng ngang, căn giữa, nút đặc trước.
- **Đứng riêng cũng là khối đó, không card.** Trang `min-h-screen bg-background px-4 pt-24
  sm:pt-40`, logo (`ProductBrand`, `../../components/logo.md`) căn giữa ở trên, tiêu đề cách logo `mt-8`; chữ, nút, khoảng
  cách giống hệt bản trong khung. Trang lỗi không phải form: mượn card màn xác thực
  (nút `h-12` rộng hết card) thì trang 404 chỉ có một thanh đen 400px là thứ nặng nhất màn, và đặt
  cạnh bản trong khung thì một loại trang ra hai khuôn khác hẳn nhau (`N5`; chủ dự án thấy "xấu xấu"). Các bộ component trang 404 phổ biến cũng là trang trơn,
  không card. `M29` (một card giữa trang trống) chỉ còn cho màn xác thực và onboarding một khối.
- **404 có dòng mã "404" nhỏ mờ trên tiêu đề**: `text-sm font-medium text-muted tabular-nums`,
  tiêu đề `mt-1`. Các bộ component trang 404 phổ biến đều có dòng này; "404" là chữ người dùng
  nhận ra và gõ đi tìm. 403, 500, bảo trì không có (500 đã có mã lỗi riêng ở dòng cuối, hai mã
  là thừa).
- **Tiêu đề `text-xl font-semibold`** (`T2`), không `font-bold`. Không icon to, không hình minh
  hoạ, không đỏ: người dùng không có gì phải sửa (`M30`).
- **Câu dẫn nói vì sao và làm gì tiếp**, một hai câu. 404: "Đường dẫn có thể bị gõ sai, hoặc
  trang đã được chuyển sang chỗ khác." 403: nêu tên trang (`font-medium text-foreground`) và ai
  được vào. 500: "Lỗi nằm ở phía hệ thống, không phải do bạn." Bảo trì: giờ mở lại, viết theo
  kiểu câu văn (`T16b`: "lúc 23:30 hôm nay", không "23:30 · 26/09/2026").
- **403: xin quyền và tài khoản đang dùng.** Vào nhầm tài khoản là lý do hay gặp nhất, nên dòng
  cuối nói email đang đăng nhập và có link "Đổi tài khoản", như trang "cần quyền truy cập" của
  bộ văn phòng trực tuyến lớn. Email giữa câu thì dấu chấm đi theo `EmailText` `suffix`, và cả
  email là một khối: vừa một dòng thì xuống dòng nguyên cụm, không bẻ đôi sau `@`
  (`../../components/description-list.md`). **"Đổi tài khoản" đứng một dòng riêng** dưới câu
  (`mx-auto mt-1 flex h-8 w-fit items-center px-1.5`), không nối sau email: nối sau thì dòng email + link rộng 448px, rộng
  nhất khối (câu dẫn 439px, tiêu đề 310px), chân nặng hơn đầu (đo ở
  1280px). Tách dòng thì chân còn ~270px.
- **403 đã gửi: đổi cả tiêu đề và câu dẫn, không nhét dòng chữ xanh vào chỗ nút.** Tiêu đề "Đã
  gửi yêu cầu", câu dẫn "Bạn sẽ nhận email khi **<tên>** chấp nhận yêu cầu.", hàng nút chỉ còn
  "Về trang tổng quan" (vẫn nút viền, giữ kiểu theo vai); dòng tài khoản giữ nguyên. Tiêu đề
  `tabIndex={-1}`, gửi xong chuyển tiêu điểm vào đó (`I31`). Bộ văn phòng trực tuyến lớn cũng
  đổi cả màn thành "Request sent" + câu hẹn email. Đừng để ô nút ẩn giữ chỗ với dòng "✓ Đã gửi
  yêu cầu" nằm giữa ô đó: chữ ngắn hơn nút, cả hàng lệch tâm 16px sang phải, trông như thiếu một
  nút.
- **"Quay lại trang trước" chỉ khi có trang trước trong app.** Mở thẳng bằng link (tab mới) thì
  nút này đưa người dùng ra khỏi app hoặc không làm gì; ẩn đi. React Router: `location.key ===
  "default"` là trang đầu của phiên.

---

## Kiểm trước khi giao

Chạy cùng cổng 2 của `checklist.md` khi trang có đúng thứ này.

- [ ] **Trang lỗi**: gõ một đường dẫn sai **bên trong** khung app (vd `/dashboard/khong-co`): có ra trang 404 trong khung, sidebar còn, header ghi "Không tìm thấy trang" không, hay vùng nội dung trống mà header vẫn tên trang cũ? 403, 500 của một trang cũng nằm trong khung; chỉ bảo trì, chưa đăng nhập, sập cả app mới đứng riêng, và đứng riêng cũng là khối căn giữa không card (logo ở trên), không thanh đen rộng hết. 404 có dòng "404" nhỏ mờ trên tiêu đề chưa? Tiêu đề `font-semibold`, không đỏ (`M30`: người dùng không có gì phải sửa), không hình? Email giữa câu có để dấu chấm rơi xuống đầu dòng không (`suffix` của `EmailText`), có bị bẻ sau `@` dù vừa một dòng không? 403 đã gửi: tiêu đề đổi thành "Đã gửi yêu cầu", hay dòng chữ xanh nằm trong ô nút làm hàng lệch tâm? "Đổi tài khoản" có đứng dòng riêng dưới email không, hay nối sau email làm dòng chân rộng nhất khối? Giờ mở lại viết kiểu câu văn chưa (`layouts/app.md`, "Trang lỗi")?
