# Hình khối và bố cục — luật F

Nguồn duy nhất cho mọi luật về khối, lưới, khoảng cách. Con số cụ thể ở
`budgets.md`. Luật về màn hẹp ở `responsive.md`.

---

## Khối

**F1. Bo góc gán theo vai trò và CHIỀU CAO, không gán theo cảm hứng.**

Bốn bậc, hết:

| Bậc | Giá trị | Cho |
| --- | --- | --- |
| Tròn | `rounded-full` | Avatar, chip, badge, thứ tròn |
| Lớn | `rounded-2xl` 16px | Card, khung dropdown, modal |
| Giữa | `rounded-xl` 12px | **Mặc định.** Mọi phần tử **cao từ 40px trở lên**: nút, ô nhập, link sidebar, dòng danh sách có hover, mục menu cao 40px |
| Nhỏ | `rounded-lg` 8px | **Chỉ** phần tử **cao dưới 40px** (36px trở xuống): nút nhỏ `h-9`, mục menu gọn, icon button `h-7`/`h-8`, ô vuông nhỏ |

**Luật chiều cao: từ 40px trở lên thì tối thiểu 12px.** Nhìn chiều cao phần tử
trước rồi mới chọn bậc, đừng chọn theo tên loại ("mục menu thì 8px"). Mục menu
cao 40px mà bo 8px thì góc trông cứng, lạc tông với nút và ô nhập 12px đứng gần
(chủ dự án chốt 21/09/2026). Dưới 40px thì 12px bắt đầu tròn quá so với chiều
cao, nên hạ về 8px.

Dùng `rounded-md`, `rounded` hay số tuỳ chế là đẻ bậc thứ năm. *Ngoại lệ có tên:
ô checkbox, 20px bo `rounded-md`, 16px bo `rounded` (`components/choice-controls.md`):
ô vuông nhỏ hơn 24px mà bo 8px thì thành gần tròn, lẫn với radio.* Chỉ bo thứ **có nền hoặc có
viền**; link chữ giữa dòng thì không bo.

Bo lồng nhau giảm dần theo độ sâu — xem `M19`.

**F2. Lồng khối tối đa hai tầng.** Card lồng card lồng card là dấu hiệu chưa
quyết định cái gì chứa cái gì.

**F3. Không mỗi mục một card.**

Nhiều mục cùng loại thì gom vào **một khối**, chia bằng đường kẻ. Bốn card trắng
giống hệt nhau xếp lưới thì mắt đọc ra bốn khối ngang hàng, không đọc ra một
danh sách.

Dòng tiêu đề của danh sách (icon + nhãn, số liệu bên phải) và dòng hành động cuối
("Xem tất cả") nằm **TRONG** khung, không nằm ngoài.

*Ngoại lệ: thẻ kanban*, vì nó là vật kéo thả được.

**F4. Không bọc bảng vào card.** Bảng đã tự có khung bằng đường kẻ rồi: chính bảng là một khung trắng viền mảnh, không lồng thêm card có padding bên ngoài.

**F5. Không chia đều ba cột chỉ vì có ba mục.** Bố cục theo mức quan trọng.
Widget quan trọng nhất chiếm nhiều cột hơn.

**F6. Phần tử nổi bật trong một nhóm chỉ cần một dấu hiệu.** Card đã có badge và
đã cao hơn hai card kia thì đừng thêm viền nữa. Ba dấu hiệu cho một việc là thừa
hai, và cái thừa luôn là cái rẻ tiền nhất.

**F7. Không hero chiếm nguyên màn hình.** Trong app thì vào là thấy việc — không
banner, không dòng chào mừng chiếm chỗ.

---

## Thẳng hàng

**F8. Card cùng lưới thẳng hàng theo từng tầng, không chỉ thẳng chân.**

Mô tả dài ngắn khác nhau thì khối giá, đường kẻ ngang, danh sách và nút đều lệch.
Cho khối mô tả một `min-h` cố định. **Đường kẻ ngang của ba card không thẳng là
thứ mắt bắt được ngay.**

**F9. Thẳng chân bằng `mt-auto` cho nút hành động.** Số dòng nội dung lệch nhau
là chuyện thường, nút vẫn phải cùng độ cao.

**F10. Widget bị kéo cao hơn nội dung thì nội dung giãn theo.**

Card `row-span-2` thì cho nội dung nở bằng `flex-1` kèm `min-h`. Đừng đóng cứng
chiều cao rồi `mt-auto` đẩy xuống đáy — phần trên thành khoảng trống chết.

`mt-auto` chỉ dành cho **nút**, không dành cho khối nội dung.

*Cách kiểm:* widget nào có khoảng trống chết quá một phần ba chiều cao là nội
dung chưa giãn.

---

## Khoảng thở

**F11. Khoảng thở trong thẻ rộng hơn bro tưởng.** Padding trong thẻ ~20–24px ở
desktop, dòng danh sách ~12–16px chiều dọc, khoảng giữa các thẻ đều nhau. Con số
chính xác ở `budgets.md`.

**F12. Thẻ nhỏ vẫn là thẻ.** Thẻ kanban, thẻ trong lưới nhiều cột, thẻ trong
panel hẹp đều bám thang chung. Đừng tự hạ xuống một bậc cho gọn — gọn quá thành
chật. Bậc nhỏ nhất chỉ dành cho chip, nhãn và ô điều khiển nhỏ.

**F13. Phần tử có nền hover phải có padding đủ bốn phía.**

Chỉ đặt `py` mà quên `px` thì lúc thường không thấy gì, nhưng vừa hover là nền
hiện ra ôm sát chữ, chữ dính lề trái phải, nhìn như lỗi.

Muốn chữ vẫn thẳng lề với các khối khác mà nền hover vẫn tràn rộng ra thì dùng
đúng kỹ thuật này:

```html
<!-- Sai: hover xong chữ dính hai mép -->
<li class="py-3 hover:bg-background">…</li>

<!-- Đúng: nền tràn ra ngoài lề, chữ vẫn thẳng hàng. Card không padding ngang, mỗi khối
     tự mang px: tiêu đề px-5, khối danh sách px-2 (= 5 − 3) để chữ dòng px-3 thẳng tiêu đề -->
<section class="rounded-2xl bg-surface py-5">
  <h2 class="px-5">…</h2>
  <ul class="px-2">
    <li class="rounded-xl px-3 py-3 hover:bg-background">…</li>
  </ul>
</section>
```

Không kéo danh sách ra bằng `-mx-3` (`N11`). Đo 27/09/2026 card "Việc hôm nay" ở `/dashboard`,
375 và 1280px: bản padding từng khối và bản `-mx-*` trùng từng pixel (chữ tiêu đề, ô tick, nền
dòng). Ô trong bảng cùng cách: ô chứa nút bớt padding đúng bằng `px` của nút (`td` `px-2` khi
nút `px-2`, các ô khác `px-4`), không kéo nút ra.

**F14. Không spacing tuỳ hứng, không bo góc tuỳ hứng.** Lấy từ `budgets.md`.

Bẫy đi kèm: thanh tiến độ, chip và badge bo bằng **nửa chiều cao** thì đừng ghi
một con số tình cờ đúng bằng nửa chiều cao lúc đó — dùng `rounded-full`. Đổi
chiều cao là bo sai ngay, mà không ai nhớ để sửa kèm.

---

## Icon

**F15. Icon nét mảnh, một màu xám, và cả màn chỉ dùng một bộ.** Không SVG inline
tự vẽ, không emoji. Lấy ở đâu thì tuỳ dự án có gì:

| Dự án | Lấy icon ở đâu |
| --- | --- |
| Có npm | `lucide-react` (mặc định), hoặc bộ icon họ đã cài sẵn — đừng thêm bộ thứ hai |
| Không có npm, HTML thuần | Lucide qua CDN, hoặc dán SVG của Lucide vào. Vẫn là Lucide, chỉ khác cách nạp |
| Họ đã có bộ icon riêng | Dùng bộ của họ. Trộn hai bộ icon vào một màn lộ ngay |

Luật ở đây là **nét mảnh, một màu, đồng bộ** — không phải tên thư viện.

**F16. Ngoại lệ: logo thương hiệu bên thứ ba.** Nút đăng nhập bằng Google, Apple,
GitHub phải có đúng logo của họ, giữ nguyên màu gốc, dán SVG thẳng vào. Lucide
không có, và đây là dấu hiệu nhận diện mang chức năng.

**F17. Cùng một nhóm thì cùng một icon, trừ khi từng mục thật sự khác nghĩa.**

Ô icon cạnh từng mục thì mỗi mục **được phép một icon khác nhau**, miễn cùng bộ,
cùng độ dày nét, cùng màu, cùng kiểu hộp. Nhưng ba icon **giống hệt nhau** cho ba
mục thì ô icon mất sạch ý nghĩa — thà bỏ hẳn.

**F18. Nút chỉ có icon phải có `aria-label`, và phải cao bằng nút chữ đứng cạnh.**

---

## Hiệu ứng

**F19. Không glassmorphism.** `backdrop-blur` chỉ khi phía sau **thật sự** có ảnh
— ví dụ người dùng đặt được ảnh nền nên độ trong của vỏ đổi theo. Không có ảnh
nền thì không blur.

*Gu flat — phong cách khác đã chọn theo `P1` thì xem `P2` trong `references/styles.md`.*

**F20. Không viền phát sáng, không `ring-4`, không shadow màu neon.**

*Gu flat — phong cách khác đã chọn theo `P1` thì xem `P2` trong `references/styles.md`.*

**F21. Không `border-dashed`.** Hai ngoại lệ: khung kéo thả tệp, và ô rỗng trong
board hay lịch.

**F22. Không animate hình khối.** Không `scale-105` khi hover, không nhấc lên,
không đổ bóng thêm.

*Gu flat — phong cách khác đã chọn theo `P1` thì xem `P2` trong `references/styles.md`.*

**F23. Không hiệu ứng xuất hiện cho nội dung tĩnh.** Không fade-in cả trang,
không cho biểu đồ tự vẽ, cột tự mọc, số tự đếm lên.

**F24. Không `transition-all`** trừ đúng một chỗ: card hover. Còn lại là
`transition-colors`.

---

## Đường chia

**F25. Đường chia trong khối có padding phải tràn hết bề ngang, không thụt theo
padding.**

Dropdown, card, panel đều có `p-*` quanh nội dung. Đặt `<hr>` vào trong đó thì
nó thụt vào hai đầu, thành một đoạn gạch lơ lửng giữa khối — nhìn như vẽ hụt chứ
không như một vách ngăn.

Đường chia là thứ **chia khối**, nên nó phải chạm hai mép khối. Hai cách, chọn
theo cấu trúc:

Chọn cách theo **nền hover của mục có thụt vào so với mép khung hay không**:

```html
<!-- Cách 1 — menu, dropdown: mục hover thụt vào, cách mép khung một khe.
     Khung chỉ padding dọc; khe ngang nằm ở từng nhóm mục, vạch đứng giữa hai nhóm nên tự chạm mép. -->
<div class="rounded-2xl py-1">
  <div class="px-1">
    <button class="flex h-10 w-full items-center rounded-xl px-3">…</button>
  </div>
  <hr class="my-1 border-border" />
  <div class="px-1">
    <button class="flex h-10 w-full items-center rounded-xl px-3">…</button>
  </div>
</div>

<!-- Cách 2 — danh sách trong card: dòng tràn hết bề ngang, không thụt.
     Khung không padding ngang, padding nằm ở từng dòng. -->
<div class="py-1.5">
  <a class="block px-4 py-3">…</a>
  <hr class="border-border" />
  <a class="block px-4 py-3">…</a>
</div>
```

**Đừng dùng cách 2 cho menu.** Bỏ padding ngang của khung là nền hover chạm sát
mép, mất khe hở, và bo góc của mục với bo góc của khung không còn đồng tâm
(`M19`).

**Cách 1 không kéo vạch ra bằng `-mx-*`** (`N11`). Bản cũ để khung `p-2` rồi cho vạch
`-mx-2`: hai con số phải khớp nhau, đổi padding khung mà quên đổi âm lề là vạch lại hụt
hoặc tràn khỏi khung. Gom mục thành nhóm `px-*` thì không còn số nào phải khớp. Nhóm
chỉ là `<div>` trơn, không `role`: trình đọc màn hình vẫn thấy các `menuitem` là con của
`menu`. Đo 27/09/2026 trên 12 menu (tài khoản, ⋯ của thành viên, ⋯ của khoá API; 375 và
1280px): vị trí từng mục, từng vạch và chiều cao menu trùng từng pixel với bản `-mx-1`.

Cùng lý do, `divide-y` trên danh sách trong card cũng tràn hết bề ngang — xem
`references/components/card.md`.

Ngoại lệ duy nhất: đường chia **giữa các dòng của một danh sách** mà muốn bắt đầu
thẳng hàng với chữ (bỏ qua avatar bên trái). Cái đó là thụt có chủ ý, và phải
thụt đúng bằng chiều rộng avatar cộng gap, không phải bằng padding.
