# Hình khối và bố cục — luật F

Nguồn duy nhất cho mọi luật về khối, lưới, khoảng cách. Con số cụ thể ở
`budgets.md`. Luật về màn hẹp ở `responsive.md`.

---

## Khối

**F1. Bo góc gán theo vai trò, không gán theo cảm hứng.**

`rounded-full` cho thứ tròn, bậc lớn nhất cho container, bậc giữa cho input và
nút, bậc nhỏ cho control nhỏ và badge. Bốn bậc, hết. Chỉ bo thứ **có nền hoặc có
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

**F4. Không bọc bảng vào card.** Bảng đã tự có khung bằng đường kẻ rồi.

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

<!-- Đúng: nền tràn ra ngoài lề, chữ vẫn thẳng hàng -->
<ul class="-mx-3">
  <li class="rounded-lg px-3 py-3 hover:bg-background">…</li>
</ul>
```

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

**F20. Không viền phát sáng, không `ring-4`, không shadow màu neon.**

**F21. Không `border-dashed`.** Hai ngoại lệ: khung kéo thả tệp, và ô rỗng trong
board hay lịch.

**F22. Không animate hình khối.** Không `scale-105` khi hover, không nhấc lên,
không đổ bóng thêm.

**F23. Không hiệu ứng xuất hiện cho nội dung tĩnh.** Không fade-in cả trang,
không cho biểu đồ tự vẽ, cột tự mọc, số tự đếm lên.

**F24. Không `transition-all`** trừ đúng một chỗ: card hover. Còn lại là
`transition-colors`.
