# Trang chi tiết bản ghi

```
thanh header:  ☰  Khách hàng                                  🔔  (T)
┌──────────────────────────────────────────────────────────────────────┐
│ (N) Nguyễn Minh Anh  <h1> text-lg              [✉ Email] [+ Tạo đơn] ⋯│
│     ● Đang giao dịch  Lumen Studio                                    │
│                                                                       │
│ 12 tháng gần nhất, so với 12 tháng trước         ┌ Liên hệ ─────────┐ │
│ ┌ Doanh thu ┬ Đơn đã giao ┬ Giá trị ┬ Hoàn ┐     │ Email   ✉ ⧉      │ │
│ └───────────┴─────────────┴─────────┴──────┘     │ Điện thoại ☎ ⧉   │ │
│ ┌ Đơn hàng 24 · Tin nhắn · Tệp 4 · Hoạt động ┐   └──────────────────┘ │
│ │ DH-10412  20/09  3 SP  ● Đã giao  12,6 tr │   ┌ Phân loại ───────┐ │
│ │ ...                                       │   │ Nhãn, phụ trách   │ │
│ │ Xem tất cả 24 đơn →                       │   └──────────────────┘ │
│ └───────────────────────────────────────────┘                        │
└──────────────────────────────────────────────────────────────────────┘
  khung nội dung từ 70rem (@container, không phải xl): cột chính minmax(0,1fr) + cột phải 22rem;
  hẹp hơn một cột: số liệu → hai card (khung từ 40rem thì đứng cạnh nhau) → khối tab
```

Đầu trang theo mục trên (`<h1>` `text-lg`, thanh header chỉ ghi cấp cha). Hàng số liệu theo
`../../components/charts.md`, card Liên hệ / Phân loại theo `../../components/description-list.md`
(xếp chồng, cột phải hẹp), dòng thời gian theo `../../components/timeline.md`.

- **Cột phải chỉ mở khi cột chính còn ≥ ~744px: khung nội dung (không phải màn) từ `@[70rem]`.** Khung
  trang là `@container`, lưới `@[70rem]:grid-cols-[minmax(0,1fr)_22rem]`. Mở theo `xl:` thì ở 1280px, sidebar
  mở, khung 992px trừ cột phải còn 616px cho bốn ô số và bảng: "14/10 · 09:00" gãy đôi trong ô số, nhãn ô
  hai dòng, cột Dịch vụ 122px xuống hai ba dòng ở cả 11 dòng. Một cột ở 1280px: ô số một dòng, bảng
  không dòng nào gãy, hai card đứng cạnh nhau. 1366px (khung 1078px) vẫn một cột; 1440px mở cột phải
  (cột chính 776px).
- **Card cột phải xếp theo việc chính của trang, không chép thứ tự Liên hệ → Phân loại của khuôn khách
  hàng.** Card phục vụ việc chính đứng đầu: hồ sơ bệnh nhân bác sĩ mở trước khi khám thì **Y tế** (bệnh
  nền, thuốc đang dùng, lưu ý) trước **Liên hệ**; trang khách của bán hàng thì Liên hệ trước. Một cột
  thì card đầu đứng trái / trên, nên thứ tự này quyết cái gì hiện ngay dưới hàng số ở điện thoại. Chép
  thứ tự thì "Sợ tiêm, giải thích từng bước trước khi gây tê" nằm cuối card Y tế, dưới cả địa chỉ
  và người thân; ở 375px phải cuộn qua hết card Liên hệ mới tới.

- **Trang chi tiết không phải panel xem nhanh phóng to.** Panel để liếc một khách giữa danh sách; trang để làm việc với khách đó, và việc chính là xem, mở **các bản ghi con**. Mượn khuôn của panel (hàng tên, ô số, danh sách mô tả) được, bê nguyên bộ tab của panel thì không (`../../principles.md`, "Dựng một thứ chưa có mẫu").
- **Tab đầu tiên là bản ghi con chính**: khách hàng → Đơn hàng, dự án → Công việc, công ty → Người liên hệ. Tiếp theo mới tới Tin nhắn, Tệp, Hoạt động. Chép tab Tin nhắn / Tệp / Hoạt động của panel thì ô số ghi 24 đơn, nút chính là "Tạo đơn", mà muốn xem đơn phải lội tab Hoạt động, nơi 24 đơn chỉ là 24 dòng "Đơn đã giao" lẫn với "Gắn nhãn VIP", không lọc, không mở được đơn nào.
- **Tab bản ghi con là bảng gọn**, không phải dòng thời gian: Mã đơn (`font-mono`, link sang đơn), Ngày đặt, Số sản phẩm, Trạng thái (badge `M7`), Tổng tiền căn phải `tabular-nums`. Mới nhất lên đầu, 10 dòng, cuối bảng là link "Xem tất cả 24 đơn" sang danh sách đơn đã lọc sẵn theo khách này, **căn trái thẳng mép chữ cột đầu**, cùng phía với "Xem hoạt động cũ hơn" ở tab Hoạt động: đổi tab mà lối "xem thêm" nhảy từ mép phải sang mép trái là mắt phải đi tìm lại. Không phân trang trong tab. Dưới `sm` thành danh sách dòng như bảng quản lý (mục "Bảng dữ liệu").
- **Tab bản ghi con có số đếm, tab dòng chảy thì không**: "Đơn hàng 24", "Tệp 4", còn "Tin nhắn", "Hoạt động" để chữ trơn. Dữ liệu có sẵn số nên đây là ca được thêm số của `../../components/small-controls.md`; khách mới nhìn hàng tab là biết tab nào rỗng, khỏi bấm từng tab. Số tin nhắn, số hoạt động thì lớn dần mãi, đọc không ra gì.
- **Hai số cùng đếm một thứ mà khác kỳ thì ô số ghi kỳ ngay trong nhãn.** Số trên tab đếm từ trước tới nay (bảng liệt kê đủ), hàng số liệu tính 12 tháng như panel (`N5`). Ô nào đếm cùng thứ với tab thì nhãn là "Đơn đã giao · 12 tháng", các ô khác giữ nhãn trơn, dòng kỳ trên hàng vẫn ghi một lần. Thiếu kỳ trong nhãn thì "Đơn đã giao 24" và "Đơn hàng 42" cách nhau 100px, dòng "12 tháng gần nhất" ở trên hàng không đủ gỡ, người đọc tưởng số sai. Không đổi hàng số sang trọn đời: panel và trang của cùng một khách sẽ ra hai bộ số.
- **Bản ghi khác nhắc tới trên trang là link**: mã đơn trong dòng hoạt động, mã đơn trong bảng, tên tệp. Cả vùng nội dung không có link nào là trang cụt: thấy "Đơn DH-10412" mà không mở được.
- **Hành động gắn với một giá trị thì nằm cạnh giá trị đó**, không vào menu ⋯ đầu trang. Email là link `mailto:`, số điện thoại là link `tel:`, rê vào hàng thì hiện icon button sao chép (`description-list.md`). Menu ⋯ chỉ còn việc với cả bản ghi: Sửa thông tin, rồi Xoá sau đường chia (`I11`). Đừng để "Gọi điện" và "Sao chép email" trong menu ⋯ ở góc trên: số điện thoại và email ngay bên dưới thành chữ chết.
- **Khách chưa có đơn nào thì bỏ hẳn hàng số liệu.** Tab Đơn hàng rỗng đã nói "Chưa có đơn nào", nút "Tạo đơn" đã ở đầu trang; giữ thêm khung "Chưa có đơn nào. Số liệu hiện sau đơn đầu tiên" là hai khối cùng nói một ý (`N3`). Khung gọn đó chỉ dành cho panel, nơi không có tab Đơn hàng (`../../components/charts.md`).
- **Không tìm thấy bản ghi** (id sai, đã xoá) là một ca 404 trong khung app: dựng đúng khối căn giữa của "Trang lỗi" (`error-pages.md`) (dòng "404" mờ, `<h1>` "Không tìm thấy khách hàng", một câu vì sao), nhưng **nút đặc là "Về danh sách khách hàng"**, không phải "Về trang tổng quan": người mở một khách hỏng gần như luôn muốn tìm khách khác (`N6`). Lối phụ "Quay lại trang trước" như 404. Thanh header vẫn ghi cấp cha. Không dựng đầu trang căn trái kèm một link chữ trơn: link cao 20px là chỗ bấm dưới 32px trên điện thoại, và một trang lỗi trong khung app mà hai kiểu là hai khuôn cho một việc.

---

## Kiểm trước khi giao

Chạy cùng cổng 2 của `checklist.md` khi trang có đúng thứ này.

- [ ] **Trang chi tiết bản ghi**: tab đầu có phải bản ghi con chính (Đơn hàng của khách, Công việc của dự án), là bảng gọn có link sang từng bản ghi, hay phải lội tab Hoạt động mới thấy? Tab bản ghi con có số đếm, tab Tin nhắn / Hoạt động chữ trơn? Email, số điện thoại bấm được và có nút sao chép cạnh giá trị, hay "Gọi điện", "Sao chép email" nằm trong menu ⋯? Mã đơn nhắc tới ở đâu cũng là link? Ô "Đơn đã giao" (12 tháng) và tab "Đơn hàng" (trọn đời) khác số thì nhãn ô đã ghi "· 12 tháng" chưa? Email dài xuống dòng ở sau `@` hay vỡ giữa chữ? "Xem tất cả" cuối bảng căn trái cùng phía "Xem hoạt động cũ hơn"? Khách chưa có đơn thì hàng số liệu đã bỏ chưa, hay còn khung "Chưa có đơn nào" nói trùng tab rỗng? Dòng hoạt động "Đơn đã giao" vòng xám, không phải một cột vòng xanh (`timeline.md`)? Id sai thì có trang "Không tìm thấy" với `<h1>` và lối về danh sách (`layouts/app.md`)?
