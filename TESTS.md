# Bộ đề test skill evon:ui-ux

Luật chung cho mọi vòng test:

- **Mỗi bản một session mới.** Không chạy hai bản trong cùng session, bản sau sẽ nhìn thấy bản trước rồi bắt chước.
- **Đề bài giống hệt từng chữ** giữa bản tự do và bản theo skill, chỉ khác dòng đọc skill và đường dẫn xuất.
- Bản tự do **không được nhắc gì về style**. Không "làm cho đẹp", không "clean", không "đừng làm kiểu AI".
- Mở session ở `~/dev/ui-eval-2`.

---

## Vòng đã chạy: danh sách có bộ lọc

Đo đúng một thứ: **AI có dừng lại chờ chọn bố cục không**, hay lại tự chọn rồi
dựng luôn.

### Bản tự do

> Dựng màn hình danh sách công việc có bộ lọc cho một app quản lý công việc. Xuất ra `free/tasks.html`, một file HTML dùng Tailwind qua CDN, không build, mở bằng trình duyệt là chạy. Nội dung tiếng Việt.

### Bản theo skill

> Đọc `~/dev/ui-taste/skills/ui-ux/SKILL.md` và làm đúng theo đó, kể cả các file trong `references/` mà nó trỏ tới.
>
> Dựng màn hình danh sách công việc có bộ lọc cho một app quản lý công việc. Xuất ra `taste/tasks.html`, một file HTML dùng Tailwind qua CDN, không build, mở bằng trình duyệt là chạy. Nội dung tiếng Việt.

**Đạt** nếu lượt đầu nó trả về khung bố cục rồi dừng, chưa có file nào.
**Trượt** nếu lượt đầu đã có `tasks.html`.

Chọn bố cục xong mới để nó dựng tiếp.

---

## Vòng đã chạy: nội dung đã mô tả rõ

Kiểm tra skill có hiểu đúng "chỉ hỏi bố cục, không hỏi lại nội dung" không.

### Bản theo skill

> Đọc `~/dev/ui-taste/skills/ui-ux/SKILL.md` và làm đúng theo đó, kể cả các file trong `references/` mà nó trỏ tới.
>
> Dựng trang đăng nhập gồm: ô email, ô mật khẩu, link quên mật khẩu, nút đăng nhập, nút đăng nhập bằng Google, dòng "chưa có tài khoản" dẫn sang trang đăng ký. Không thêm gì ngoài danh sách trên.
>
> Xuất ra `taste/login.html`, một file HTML dùng Tailwind qua CDN. Nội dung tiếng Việt.

**Đạt** nếu nó chỉ đưa 2 khung bố cục (một cột giữa màn, hay hai cột có ảnh bên
phải) rồi dừng, và không hỏi lại có cần nút Google không, không đề xuất thêm
phần tử nào.

---

## Chưa chạy: bốn vòng cho phần mới

Bốn nhánh dưới đây viết trong đợt dọn 20/09/2026 và **chưa chạy vòng nào**. Mỗi
vòng đo đúng một thứ.

### V22 — Nhận đúng nhánh refactor

> Mở session ở một project Next có sẵn CSS cũ. Đọc `~/dev/ui-taste/skills/ui-ux/SKILL.md` và làm đúng theo đó.
>
> Làm lại giao diện trang danh sách cho đẹp hơn.

**Đạt** nếu lượt đầu nó nhận ra đây là **refactor**, mở `refactor.md`, và chạy bộ
lệnh đo trước khi mở file nào.
**Trượt** nếu nó đi thẳng vào dựng lại từ đầu, hoặc hỏi "bro muốn UI thế nào".

### V23 — Tự tìm codebase, không hỏi

> Mở session ở một project đã cài shadcn. Đọc skill rồi dựng màn cài đặt tài khoản.

**Đạt** nếu nó grep `package.json` và `components/ui`, rồi nói thẳng "dự án dùng
shadcn, tôi sẽ dùng `Button` và `Input` của bro".
**Trượt** nếu nó hỏi "bro dùng thư viện gì", hoặc tự viết lại `Button`.

### V24 — Ba hướng UI khi người dùng chưa biết

> Đọc skill rồi dựng màn tổng quan cho một app quản lý đơn hàng. Chưa có thiết kế, bro làm sao đẹp thì làm.

**Đạt** nếu nó đưa **ba hướng** (đường tóc phẳng / khối chìm / dày đặc dữ liệu),
mỗi hướng một câu nói hợp khi nào, rồi **dừng chờ chọn** — chưa có file nào.
**Trượt** nếu nó tự chọn, hoặc nếu ba hướng nghe giống hệt nhau.

Kiểm thêm: chọn **B** hoặc **C** thì nó có nói rõ hướng đó **đè lên luật nào**
không (`M13`, `M15`, hay phần nhịp trong `budgets.md`).

### V25 — Đề nhiều màn, hợp đồng nguyên tố

> Đọc skill rồi dựng UI kanban board quản lý công việc và table quản lý project, có đủ CRUD.

Đây đúng là đề đã làm một người dùng thật phàn nàn ba lần. **Đạt** nếu:

1. Nó đếm ra khoảng 8 bề mặt, không phải 2.
2. Nó viết ra **bảy dòng hợp đồng nguyên tố** (`D1`) trước khi dựng.
3. Nó hỏi bố cục **một lượt** cho cả bộ, không hỏi 8 lần.
4. Dựng xong: badge trạng thái ở board và ở bảng **cùng một hình dạng** (`D2`).
5. Form tạo và form sửa là **cùng một khuôn** (`D3`).
6. Có chỗ dùng màu nhấn, không phải cả bộ xám tịt (`D5`).


## Đã chạy xong

> ⚠️ Số hiệu luật trong bảng dưới (`P14`, `M3f`, `C19`…) là **cách đánh số cũ**,
> trước đợt dọn 20/09/2026. Tra lại bằng bảng nhóm trong `README.md` nếu cần.

| Vòng | Đề bài | Kết quả |
| --- | --- | --- |
| 1-7 | Bảng giá 3 gói, **có** `skeleton.png` | Đạt. `taste/pricing-v5.html` được duyệt, đã copy vào `references/layouts/sales-pricing-3-cot.html` làm code mẫu |
| 8 | Trang cài đặt tài khoản, **không** có ảnh | Bố cục đạt, nhưng tự chọn phương án A không chờ duyệt. Token bị gõ sai thành mã tím. Đã siết luật |
| 21 | Dark mode cho bảng giá, chạy lại sau khi sửa file mẫu | **Đạt.** Không đẻ token viền mới, ba card chỉ `ring-border-card`, tách khối bằng chênh lệch surface với background. M3f đứng vững |
| 20 | Dark mode cho bảng giá, lần 1 | Tự đẻ `--primary-ring: rgba(233,237,245,0.22)` rồi viền card nổi bật, trên navy trông chói. Đã thêm M3f và gỡ viền khỏi file mẫu |
| 19 | Thêm dark mode vào `app-kanban.html` đã duyệt | **Đạt.** Tự phát hiện `tokens.css` thiếu màu chữ trên nền nhấn và tự thêm `--primary-foreground`. Tự hạ bậc màu trạng thái cho đỡ chói trên navy. Lỗi duy nhất: `focus:border-primary` thành sợi trắng đặc ở dark. Đã thêm `--border-focus` và luật M9. M8 gỡ dấu ⚑ |
| 18 | Bảng quản lý dự án | **Không tính.** Bản theo skill hiểu "bảng" thành kanban board và dựng board lần hai, bản tự do dựng `<table>` thật. Hai bên làm hai thứ khác nhau nên không so được. Nguyên nhân: từ "bảng" mơ hồ, và `app-kanban.html` mới đóng băng kéo cách hiểu về phía board. Đã thêm P14 và P15 |
| 17 | Form tạo việc có lỗi validate, đề để hở | **Đạt cả 6 tiêu chí.** Lỗi dưới ô, ô lỗi giữ nền trắng chỉ đổi viền và ring, câu lỗi nói cách sửa, nhãn trên ô, một nút primary cuối form, nhóm cách nhau bằng khoảng trắng. Tự dùng `aria-invalid` và `aria-describedby`. Tự nhận ra `border-dashed` được phép ở khung kéo thả tệp. Hai lỗ hổng: không đánh dấu trường bắt buộc, và luật banner tóm tắt lỗi viết sai sắc thái nên nó bỏ luôn |
| 16 | Kanban, chạy lại lần 2 | **Đạt.** Lề hai đầu vùng cuộn đúng. Đã đóng băng thành `references/layouts/app-kanban.html` |
| 15 | Kanban, chạy lại lần 1 | Bảy luật vòng 14 đều ăn, không luật nào phản tác dụng. Lỗi còn lại: lề đặt trên khung cuộn nên cột cuối dính mép khi cuộn hết sang phải |
| 14 | Bảng kanban, đề để hở, có tra tấn 375px | Luật vòng 13 ăn ngay, hàng ô số liệu ra đúng công thức mới. Cột không tô màu riêng, thẻ là card đúng ngoại lệ 16b. Bốn lỗi: board wrap thành 2 hàng ở tablet làm vỡ thứ tự trạng thái, hàng chip `flex-wrap` rớt một chip lẻ ở 375px, thẻ hạ xuống `p-3` nên chật, chip lọc chính cao 26px đứng cạnh input 40px |
| 13 | **Tra tấn** hai file cũ: 375px, tiêu đề 200 ký tự, số `1.284.500` | Dashboard **tràn ngang ở 375px**. Nguyên nhân: hàng ô số liệu `grid-cols-2` ngay từ mobile, cộng grid item mặc định `min-width: auto` nên không chịu co nhỏ hơn nội dung, số dài đẩy cả lưới. `tasks.html` thì `truncate` chịu được, tính đạt. Đã thêm 12b, 15b, 15c và mục ô số liệu ở màn hẹp trong `charts.md` |
| 12 | Màn tổng quan, chạy lại sau khi thêm bước hỏi phạm vi | Ra 5 khối thay vì 3, chuẩn hoá cột đúng (28 thành 100%), cột cùng một màu, thanh tiến độ đúng công thức. Lỗi còn lại: card biểu đồ `row-span-2` bị kéo cao mà nội dung đóng cứng `h-56` rồi `mt-auto` đẩy xuống đáy, hơn nửa card thành khoảng trống chết. Đã thêm luật 17d |
| 11 | Màn tổng quan có số liệu và biểu đồ, đề **để hở** | Bản tự do tự đẻ sidebar, thanh trên, câu chào có emoji, 4 bảng màu, biểu đồ tự vẽ 1.4s. Bản theo skill đúng luật khó: ô số liệu là một khối `divide-x`, bốn số cùng màu, cột biểu đồ cùng một màu. Nhưng chỉ ra 3 khối, mỏng cho một màn tổng quan. Nguyên nhân: đề để hở thì luật 0 hoá thành làm ít nhất có thể. Đã thêm bước hỏi phạm vi và `charts.md` |
| 10 | Trang đăng nhập, nội dung liệt kê sẵn | **Không tách bạch được.** Câu "không thêm gì ngoài danh sách trên" trong đề bài làm phần lớn việc, bản tự do cũng nhịn được. Skill thắng ở ô nhập `h-12 rounded-xl text-base md:text-sm` và nút phụ nền đặc; thua ở chỗ bỏ mất logo Google. Đã thêm ngoại lệ logo thương hiệu |
| 9 | Danh sách công việc có bộ lọc, **không** có ảnh | **Đạt.** Dừng đúng lúc chờ chọn bố cục. Chép token nguyên văn, tự phân loại đúng là màn hình trong app nên lấy đúng nhịp app. Bản tự do dùng 5 màu nhấn và empty state `border-dashed py-16` có icon và nút. Lỗi duy nhất: `brand-light` với màu nhấn trung tính thì badge mờ tịt, đã sửa |

## Vòng tra tấn, BẮT BUỘC sau mỗi lần dựng

Không cần dựng file mới, mở lại file đã có rồi làm bốn việc:

1. Thu cửa sổ xuống **375px**. Trang cuộn ngang là hỏng.
2. Đổi một tiêu đề thành câu dài 200 ký tự.
3. Đổi một con số thành `0`, một con số thành `1.284.500`.
4. Xoá hết dữ liệu của một danh sách, xem trạng thái rỗng.
5. Vùng nào cuộn ngang thì **cuộn hết sang phải**, xem phần tử cuối có dính mép không.

Bốn vòng gần nhất, ba lỗi giá trị nhất đều đến từ vòng tra tấn chứ không phải từ
vòng dựng. Không chạy bước này thì coi như chưa test.

Vòng 13 cho thấy đây là loại lỗi mà chấm bằng ảnh chụp màn rộng không bao giờ
thấy, và cũng là loại lỗi mà không AI nào tự tránh.

## Chấm thế nào

1. Nhìn 3 giây, bản nào giống trang AI đẻ hàng loạt hơn.
2. Bản theo skill có chỗ nào **tệ hơn** không. Đây là phần đáng giá nhất, nó chỉ ra luật nào đang siết quá tay.
3. Bản tự do có chỗ nào **đẹp mà skill đang cấm** không. Có thì luật đó viết sai.
