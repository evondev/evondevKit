# Luật

Bốn nhóm: màu, chữ, hình khối, trạng thái. Phần cấm nằm ở `SKILL.md` mục 1,
không lặp lại ở đây. Con số cụ thể về nhịp và cỡ nằm ở `budgets.md`.

Luật có dấu ⚑ là **chưa được kiểm chứng qua vòng test nào**, dùng thì biết là
đang dùng thứ chưa ai thử. Hiện không còn luật nào mang dấu này.

---

## Màu

**M1.** Nền trang xám nhạt, không trắng. Card mới trắng.

**M2.** Card không viền nhìn thấy. Viền để `transparent`, dựa vào chênh lệch nền. Dùng `ring-1` thay `border` vì `ring` không đẩy layout.

**M3. Tách khối bằng nền và khoảng trắng trước, đường kẻ là lựa chọn sau cùng.** Không phải là cấm đường kẻ, mà là thử ba cách kia trước đã. Thứ tự ưu tiên: chênh lệch nền, rồi khoảng trắng, rồi bóng mềm, cuối cùng mới tới đường kẻ. Buộc phải kẻ thì kẻ mờ bằng `--border`, không bao giờ đậm hơn. Đường kẻ vẫn đúng khi chia **các mục bên trong một khối** như danh sách hay bảng; để tách **hai khối lớn** thì dùng nền.

**M3b. Một token một việc.** `--border` là đường kẻ và viền ô nhập. `--border-card` là viền card, trong suốt ở light mode. `--background` là nền trang và nền hover của hàng. Đừng lấy `--border` đi viền card, cũng đừng lấy `--background` đi tô ô trạng thái nhỏ.

**M3c. Phần tử con trong hàng có hover không được trùng token với nền hover của hàng.** Hàng hover chìm về `--background` (luật T5). Nếu ô vuông trạng thái, checkbox hay avatar bên trong cũng dùng `--background` làm nền, hoặc chỉ có viền `--border`, thì rê chuột vào là chúng biến mất. Con phải đậm hơn: nền dùng `--background-hover`, viền dùng `--muted/40`. **Cách kiểm: rê chuột lên hàng, đếm xem còn nhìn thấy đủ mọi thứ không.**

**M3d. Viền dùng ít, và khi dùng thì mờ và mỏng.** Không phải là cấm, mà là mặc định thì không có, cần lắm mới thêm.

| Chỗ | Viền |
| --- | --- |
| `input`, `textarea`, `select` | **Có, đây là chỗ viền đúng vai.** Người ta phải nhìn ra ranh giới vùng gõ được |
| Nút | Gần như không. Nút phụ tách bằng nền `--secondary`. Thật sự cần thì 1px mờ, đừng để viền là thứ duy nhất định nghĩa cái nút |
| Card, section, khối lớn | Mặc định không. Tách bằng nền, khoảng trắng, bóng trước đã. Nền tối thì viền `--border-card` ở độ đục 8% là hợp lệ, vì lúc đó chênh lệch nền quá ít |
| Chia mục trong một khối | Đường kẻ `divide-y` thì được, đó là đường chia chứ không phải viền bao |
| Chỗ khác | Cần lắm mới dùng |

**Khi đã quyết định dùng thì luôn là 1px, và mờ**: nền sáng dùng `--border`, nền tối dùng `rgba` dưới 10%. Không bao giờ dày hơn 1px, không bao giờ đậm hơn `--border`. Một đường kẻ đậm luôn là cách rẻ nhất để tách hai thứ, và nhìn ra ngay.

**M3f. Không đẻ token viền mới từ màu nhấn.** Viền tĩnh chỉ có đúng hai token: `--border` cho ô nhập và đường kẻ, `--border-card` cho card. Viền trạng thái có đúng một: `--border-focus`, và nó chỉ hiện lúc focus.

Thấy mình sắp viết `--primary-ring`, `--accent-border` hay tương tự thì dừng lại: đó là dấu hiệu đang muốn nhấn một khối bằng viền, mà nhấn bằng viền là cách rẻ nhất. Xem M3e. Chuyện này đã xảy ra thật, một bản dựng tự chế `--primary-ring: rgba(233,237,245,0.22)` rồi viền card nổi bật, trên nền tối trông sáng chói.

Đừng nhầm với M9: M9 cho phép màu nhấn làm đường mảnh ở 35%, nhưng đó là **viền lúc focus**, một trạng thái thoáng qua và cần thấy rõ. Viền tĩnh thì phải chìm.

**M3e. Phần tử nổi bật trong một nhóm chỉ cần một dấu hiệu.** Card gói giá đã có badge và đã cao hơn hai card kia thì đừng thêm viền nữa. Ba dấu hiệu cho một việc là thừa hai, và cái thừa luôn là cái rẻ tiền nhất.

**M4.** Đúng một màu nhấn cho cả app. Nút chính, link, trạng thái đang chọn dùng chung nó.

**M4b. Màu mã hoá dữ liệu không tính vào ngân sách một màu nhấn.** Tag phân loại, nhãn nhóm, ảnh đại diện được phép nhiều màu, vì màu ở đó **mang thông tin** chứ không trang trí. Điều kiện:

- Chỉ dùng cho phân loại thật, thứ mà người ta cần liếc là phân biệt được.
- Luôn **pastel nhạt**: nền màu ở khoảng 10%, chữ đậm cùng tông.
- **Một nhãn một màu cố định** trong cả app. "Technology" xanh dương thì ở đâu cũng xanh dương.
- Không lan sang nút, nền khối, hay đường kẻ. Chúng vẫn chỉ có một màu nhấn.

**M5.** Màu chỉ để báo trạng thái. Đỏ là quá hạn hoặc hỏng, amber là cần chú ý, emerald là xong. Ngoài ba chỗ đó thì đen trắng xám.

**M6.** Chữ chỉ ba sắc độ: `foreground`, `muted`, và trắng khi nằm trên nền nhấn.

**M7.** Không gradient ở bất kỳ đâu. **Ngoại lệ duy nhất: ảnh đại diện và dấu hiệu nhận diện** — avatar người dùng, icon workspace, logo tổ chức. Chúng là hình tròn hoặc vuông nhỏ dưới 40px, và gradient ở đó đóng vai ảnh chứ không đóng vai nền. Không được dùng gradient cho nút, card, nền trang, hay chữ.

**M10. Đảo theme thì giữ nguyên QUAN HỆ giữa các bề mặt, không chỉ đảo màu.** Thang bề mặt trong skill này, từ chìm nhất lên nổi nhất:

`--secondary` (nút phụ, vùng chìm) → `--background` (nền trang) → `--surface` (card)

Thứ tự đó phải đúng ở **cả hai theme**. Ở nền sáng nút phụ tối hơn card, thì ở nền tối nó cũng phải tối hơn card, chứ không phải sáng lên. Đã có bản dựng đặt nút phụ `#1c2030` trên card `#0f111a`: cùng một nút mà light thì chìm, dark thì nổi, đọc ra là hai thiết kế khác nhau.

Cách kiểm nhanh: liệt kê ba màu bề mặt của mỗi theme rồi xếp theo độ sáng, hai danh sách phải cùng thứ tự.

**M9. Ở nền tối, màu nhấn chỉ dùng làm nền, không dùng làm đường mảnh.** Màu nhấn trong dark mode là gần trắng. Tô nền nút thì đẹp; nhưng đem làm viền ô nhập lúc focus, gạch chân, hay đường chỉ báo đang chọn thì thành sợi trắng đặc một pixel, gắt và rẻ. Đường mảnh dùng chính màu đó **hạ độ đục xuống khoảng 35%**, sáng hơn viền thường là đủ để biết đang focus. Token có sẵn: `--border-focus`.

**M8.** Dark mode là navy rất tối, không phải xám trung tính. Viền dark mode là `rgba` mờ, không phải màu đặc. **Ở nền tối thì viền đảo vai**: nền sáng tách khối bằng chênh lệch nền và bóng, nền tối thì `#0f111a` với `#05060f` chênh nhau rất ít nên viền `rgba` trở thành thứ chính để tách khối, và bóng gần như vô dụng.

---

## Chữ

**C0. `antialiased` trên `body`.** Một dòng, đặt một lần, và nó đổi cảm giác của cả trang: chữ mảnh hơn, sạch hơn, bớt cái vẻ nặng nề của font render mặc định trên màn hình thường.

```html
<body class="antialiased">
```

**C1. Một họ chữ cho cả app.** Phân vai bằng weight và cỡ: heading `700` kèm `tracking-tight`, body `400`, nhãn phụ `500`. Font thứ hai phải xin phép, và phải nói được nó khác font body ở chỗ nào.

**C1b. Ngoại lệ cho landing: được dùng một font serif cho tiêu đề lớn.** Chỉ áp dụng cho **trang bán hàng**, và chỉ cho tiêu đề từ `text-4xl` trở lên. Trong app thì không, tuyệt đối.

Ba điều kiện, thiếu một là bỏ luôn ý định:

1. **Không bao giờ cho số.** Giá, số liệu, chỉ số luôn dùng font body. Đây là lỗi đã xảy ra thật ở vòng 6, "99K" viết bằng serif trông như bìa tạp chí.
2. **Không cho chữ dưới `text-2xl`.** Serif ở cỡ nhỏ thì nét mảnh gãy, và tiếng Việt dấu nặng càng dễ vỡ.
3. **Kiểm dấu tiếng Việt trước khi chốt font.** Xem `brand-tokens.md`.

Không chắc thì đừng dùng. Một font tử tế vẫn hơn hai font ghép sai.

**C2.** Có xin được font thứ hai thì nó chỉ dành cho heading, không bao giờ cho body, và **không bao giờ cho số**. Giá, số liệu, chỉ số luôn dùng font body.

**C3.** Cỡ chữ mặc định tuỳ loại màn hình, đừng trộn hai loại:
- **Trong app**: `text-sm` là mặc định, `text-xs` cho chú thích.
- **Trang bán hàng**: `text-base` là mặc định, tiêu đề lớn hơn hẳn. Mô tả sản phẩm không bao giờ xuống `text-xs`.

**C3b. Tiêu đề của một khối phải lớn hơn chữ lớn nhất bên trong khối, ít nhất một bậc.** Tiêu đề card `text-base font-semibold` thì mục bên trong tối đa `text-sm`. Mục bên trong dùng `text-base` thì tiêu đề phải lên `text-lg`. Bằng nhau là mắt không đọc ra đâu là nhãn của khối, đâu là nội dung, và cả khối trông phẳng lì.

Cùng nguyên tắc cho độ đậm: tiêu đề khối `600` hoặc `700`, mục bên trong tối đa `500`.

**C3d. Không để chữ đơn côi ở dòng cuối.** Một tiêu đề xuống dòng rồi còn trơ một chữ ở hàng dưới thì nhìn như lỗi, không như thiết kế. Tệ hơn là **chẻ sai nghĩa**: "làm gì có" bị bẻ thành "làm" ở dòng trên và "gì có" ở dòng dưới, đọc vấp.

Cách xử, theo thứ tự:

1. `text-balance` cho tiêu đề ngắn, `text-pretty` cho đoạn văn. Trình duyệt tự chia cho các dòng đều nhau và tránh bỏ lại một chữ.
2. Cụm từ không được tách thì nối bằng `&nbsp;`: `làm&nbsp;gì&nbsp;có`.
3. Chỉnh `max-width` của khối để câu rơi vào chỗ đẹp hơn.
4. Rút gọn câu. Thường đây mới là cách đúng nhất.

Kiểm ở đúng bề rộng thật, nhất là 375px, vì chữ đơn côi chỉ lộ ở một vài bề rộng nhất định.

**C4. `min-w-0` cho mọi flex và grid item chứa nội dung động.** Flex item và grid item mặc định có `min-width: auto`, tức **không chịu co nhỏ hơn nội dung của nó**. Một con số `1.284.500`, một cái tên dài là đủ để cột nở ra, lưới nở theo, cả trang tràn ngang. Đây là nguyên nhân số một của lỗi cuộn ngang, và chỉ lộ ra ở màn hẹp.

**C5.** Chữ trong **danh sách dày** thì `truncate` kèm `min-w-0`. Nhưng **dòng mô tả cho xuống dòng**, đừng cắt. Quy ước: tiêu đề một dòng thì cắt, câu giải thích thì xuống dòng.

---

## Hình khối

**H1.** Bo góc gán theo vai trò: `rounded-full` cho tròn, `rounded-2xl` hoặc `rounded-3xl` cho container, `rounded-xl` cho input và nút, `rounded-lg` cho control nhỏ. Chỉ bo thứ có nền hoặc có viền, link chữ giữa dòng thì không bo.

**H2.** Shadow và spacing lấy từ `budgets.md`, vì hai thứ đó **khác nhau giữa app và trang bán hàng**. Đừng nhớ con số, mở bảng ra.

**H3.** Lồng khối có chủ đích, tối đa hai tầng. `backdrop-blur` chỉ khi phía sau thật sự có ảnh.

**H4. Mọi luật về màn hẹp nằm ở `responsive.md`.** Trang không cuộn ngang, lưới xuống cột, không để phần tử rớt hàng lẻ, nhịp ở mobile, và ngoại lệ cho thứ tự tuyến tính. Đừng nhớ, mở file ra.

**H5. Card cùng lưới thẳng hàng theo từng tầng, không chỉ thẳng chân.** Mô tả dài ngắn khác nhau thì khối giá, đường kẻ ngang, danh sách và nút đều lệch. Cho khối mô tả một `min-h` cố định. Đường kẻ ngang ba card không thẳng là thứ mắt bắt được ngay.

**H6. Thẳng chân bằng `mt-auto` cho nút hành động.** Số dòng nội dung lệch nhau là chuyện thường, nút vẫn phải cùng độ cao.

**H7. Widget bị kéo cao hơn nội dung thì nội dung giãn theo.** Card `row-span-2` thì cho nội dung nở bằng `flex-1` kèm `min-h`. Đừng đóng cứng chiều cao rồi `mt-auto` đẩy xuống đáy, phần trên thành khoảng trống chết. `mt-auto` chỉ dành cho **nút**, không dành cho khối nội dung.

---

## Trạng thái

**T1.** Nút chỉ ba variant: `primary`, `ghost`, `danger`. Không outline, không secondary. Cỡ thì theo vai trò, xem `budgets.md`, đừng đẻ ma trận variant nhân size.

**T1b. "Xem tất cả", "Đọc thêm", "Xem thêm" là nút, không phải link chữ.** Đây là hành động dẫn sang một màn khác, nên nó phải trông bấm được, không phải một dòng chữ màu nằm lẫn trong nội dung.

- Dùng **nút phụ**, nền `--secondary`, không viền.
- **Căn phải.** Khối có header thì đặt ở header bên phải, cùng hàng với tiêu đề. Danh sách phải đọc hết mới bấm thì đặt cuối khối, vẫn căn phải.
- **Không icon.** Không mũi tên, không dấu chevron.
- `h-10`, ngang `px-3` tới `px-4`.

**T2. Trong một nhóm lựa chọn chỉ một nút được là `primary`**, còn lại là nút phụ. Ba nút đặc màu như nhau là chưa quyết định hộ người dùng.

**T3. Nút phụ có hai dạng, chọn một rồi dùng nhất quán cả app.**

| Dạng | Công thức | Hợp khi |
| --- | --- | --- |
| **Nền chìm** | nền `--secondary`, không viền | Nút phụ đứng cạnh nút primary, cần chìm rõ xuống |
| **Nền trắng viền tóc** | nền `--surface`, viền 1px `--border` | Thanh công cụ nhiều nút ngang hàng nhau: Sắp xếp, Lọc, Chia sẻ, Xuất dữ liệu |

`--secondary` luôn chìm hơn `--surface` ở cả hai theme, xem M10. Dạng viền tóc thì
viền phải thật mảnh và thật nhạt, đúng `--border`, không đậm hơn.

**Cấm trộn hai dạng trong cùng một màn hình.** Chỗ nền chìm chỗ viền tóc là dấu
hiệu chưa quyết định. Cấm nền chênh với nền cha dưới một bậc thấy được, kiểu `bg-background` đặt trên card `bg-surface`. Nút phụ mà chữ nhạt trên nền nhạt thì người dùng đọc ra là nút đã bị khoá.

**T4.** Mọi trạng thái hover phải **nhìn thấy được**. Đổi màu xong tự hỏi: chênh lệch này có nhận ra khi liếc không.

**T5.** Hover của một dòng là chìm xuống nền, không tô đậm lên, không phóng to.

**T5b. Phần tử có nền hover phải có padding đủ bốn phía.** Chỉ đặt `py` mà quên `px` thì lúc thường không thấy gì, nhưng vừa hover là nền hiện ra ôm sát chữ, chữ dính lề trái phải, nhìn như lỗi. Nền hover cần chỗ thở y như card cần chỗ thở.

Muốn chữ vẫn thẳng lề với các khối khác mà nền hover vẫn tràn rộng ra thì dùng đúng kỹ thuật của vùng cuộn:

```html
<!-- Sai: hover xong chữ dính hai mép -->
<li class="py-3 hover:bg-background">…</li>

<!-- Đúng: nền tràn ra ngoài lề, chữ vẫn thẳng hàng -->
<ul class="-mx-3">
  <li class="rounded-lg px-3 py-3 hover:bg-background">…</li>
</ul>
```

**T6.** Focus ring xám trung tính, mảnh, chỉ hiện với `focus-visible`.

**T7.** Nút mặc định không icon. Icon chỉ khi mang chức năng. Ngoại lệ là logo thương hiệu bên thứ ba, xem `SKILL.md` luật C22.

**T8.** Hành động phụ (sửa, xoá) mờ đi lúc thường, chỉ hiện khi rê vào dòng.

**T9.** Chỉ đổi màu khi chuyển trạng thái. Ngoại lệ duy nhất là card hover được `transition-all`.

**T10.** Scrollbar ẩn hẳn nhưng vẫn cuộn được.

**T12. Dữ liệu nhiều thì phân trang, đừng đổ hết ra.** Danh sách hay bảng quá khoảng 25 dòng thì thêm phân trang, hoặc nút tải thêm. Đổ ra vài trăm dòng thì trang nặng, cuộn mãi không tới đâu, và người ta mất luôn cảm giác mình đang ở đâu trong tập dữ liệu.

Kèm theo phân trang thì luôn hiện **tổng số** và **đang xem tới đâu**: "51 tới 75 trong 312 dòng". Thiếu con số đó thì phân trang chỉ là mấy cái nút vô nghĩa.

**T11. Ngưỡng giấu nội dung sau một cú bấm:** chỉ dùng accordion hay tab khi danh sách dài hơn 6 mục, hoặc mỗi phần trả lời dài quá 3 dòng. Dưới ngưỡng đó thì hiện hết.
