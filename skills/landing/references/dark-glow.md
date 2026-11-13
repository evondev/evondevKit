# Dark glow — luật B44

Kiểu thứ hai của skill, bên cạnh Blueprint. Nền gần đen, ánh sáng màu nhấn rọi vào sản phẩm, chữ chuyển
màu, nút có quầng, card bo tròn. Blueprint đẹp nhờ đường kẻ và sự gọn; Dark glow đẹp nhờ ánh sáng và
chiều sâu.

**Dùng khi**: đề gọi tên ("dark glow", "nền tối có ánh sáng", "glow", "kiểu phát sáng"); trang bán
khoá học lập trình, cộng đồng dev, sản phẩm AI cho người dùng cuối. Sản phẩm cho dev (`SKILL.md` câu 3)
thì wireframe được đưa Dark glow làm **một** phương án bên cạnh các phương án Blueprint.

⚑ Rút từ một trang bán khoá học lập trình chủ dự án dựng và các landing nền tối được nhắc nhiều; chưa
qua bài test riêng.

## B44. Lớp nhìn

**Token** (đè lên `tokens.css` của `ui-ux` như `B2`):

| Token | Giá trị | Dùng cho |
| --- | --- | --- |
| `--background` | gần đen ánh màu nhấn (`#07060d` khi nhấn tím) | nền trang |
| `--surface` | `color-mix(in oklab, white 4%, var(--background))` | card, khung code |
| `--border` | `rgb(255 255 255 / 0.08)` | viền card, đường ngăn |
| `--primary` | màu nhấn rực (`#8b5cf6` tím, `#3b82f6` xanh, `#f97316` cam) | nút, quầng, chữ chuyển màu |
| `--glow` | `color-mix(in oklab, var(--primary) 45%, transparent)` | mọi quầng sáng |

- **Lưới nền** mờ (`--border` ở 3–4%, ô 48px), tan dần ra mép như `B13`.
- **Font**: tiêu đề sans có cá tính (Bricolage Grotesque, có subset `vietnamese`), thân chữ Be Vietnam
  Pro hay Inter; mono cho nhãn và code. H1 nét 600–700, `tracking-tight`.
- **H1 hai dòng**: dòng một chữ trắng, dòng hai **chữ chuyển màu** từ màu nhấn sang sắc kề (tím → hồng)
  (`B4`). Câu dẫn `--muted`, tối đa 3 dòng, canh giữa.
- **Nút chính** đặc màu nhấn, bo `rounded-full`, quầng `shadow-[0_0_24px_-4px_var(--glow)]`, rê thì quầng
  đậm lên. Nút phụ viền `--border`, nền `--surface`. Dưới hàng nút: ba dấu tích nói điều kiện ("6 khoá
  miễn phí · Có bài học thử · Không gói tháng").
- **Card** bo `rounded-2xl`, nền `--surface`, viền `--border`, không bóng đen; card quan trọng có viền
  trên sáng (`linear-gradient` màu nhấn ở mép trên 1px).

**Món ký tên: đèn chiếu rọi vào món chính** (`B41`). Món chính (khung code, màn sản phẩm) nằm dưới hàng
nút; phía trên nó một luồng sáng:

```css
/* Luồng sáng hình nón từ đỉnh xuống mép trên khung, loang hai bên */
.spotlight::before {
  content: ""; position: absolute; inset: -160px 10% auto; height: 220px; pointer-events: none;
  background: radial-gradient(60% 100% at 50% 100%, var(--glow), transparent 70%);
  filter: blur(24px);
}
/* Vạch sáng mảnh ngay mép trên khung */
.spotlight::after {
  content: ""; position: absolute; inset: 0 20% auto; height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary), transparent);
}
```

Thêm một quầng mờ ở đỉnh hero (dưới header) để đầu trang không đen đặc. Khung code có **dòng được bắt**
(dòng lỗi tô nền đỏ mờ, nhãn mono góc phải "Phát hiện lỗi") để ánh sáng chỉ vào một ý, không chỉ để đẹp.

**Hiệu ứng theo khối, mỗi loại một chỗ** (`B11`):

| Khối | Hiệu ứng |
| --- | --- |
| Hero | đèn chiếu rọi món chính, chữ chuyển màu H1 |
| Dải chip công nghệ | chạy ngang, mép tan (`B36`) |
| Video / màn sản phẩm lớn | quầng sau khung, nút play tròn trắng giữa |
| Cảm nhận | **sao băng**: 8–12 vệt sáng mảnh rơi chéo chậm (6–12 giây một vệt), sau tiêu đề, mật độ thấp |
| CTA cuối | card có quầng màu nhấn loang từ đáy |

## Khối

Thứ tự hay gặp: hero canh giữa → dải chip công nghệ → hàng số (ô kẻ trái `border-l`, số lớn, nhãn hai
dòng) → video hay màn sản phẩm → tính năng 3×2 (icon trong ô vuông viền, tiêu đề, hai dòng) → lưới thẻ có
ảnh bìa (khoá học, sản phẩm) → người đứng sau (ảnh thật `B43`, số liệu kênh) → cảm nhận → các bước (ba
vòng số nối bằng đường) → FAQ hai cột (`B26`) → CTA cuối.

Nhãn section là pill nhỏ mono có chấm màu nhấn (`● CÁCH HỌC`), tiêu đề section hai dòng: dòng một trắng,
dòng hai `--muted`.

## Soát cuối

- [ ] Đèn chiếu rọi vào món chính, món chính có một chỗ được "bắt" (dòng lỗi, kết quả).
- [ ] Chữ chuyển màu chỉ ở H1 (và tối đa một tiêu đề cuối trang); hai đầu đạt 4.5:1.
- [ ] Mỗi hiệu ứng nền một khối; giảm chuyển động thì sao băng, chip chạy, quầng đứng yên.
- [ ] Ở 375: quầng không làm chữ mờ, nút xếp dọc full ngang, sao băng giảm còn 4–6 vệt.
