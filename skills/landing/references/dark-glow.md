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
  Pro hay Inter; mono cho nhãn và code. H1 `text-5xl sm:text-6xl lg:text-7xl` nét 600–700, `tracking-tight`; ở 1440 dòng
  chuyển màu dài gần hết bề ngang nội dung, nhỏ hơn `text-6xl` thì hero hụt so với ánh đèn.
- **H1 hai dòng**: dòng một chữ trắng, dòng hai **chữ chuyển màu** từ màu nhấn sang sắc kề (tím → hồng)
  (`B4`). Câu dẫn `--muted`, tối đa 3 dòng, canh giữa.
- **Nút chính** đặc màu nhấn, bo `rounded-full`, quầng `shadow-[0_0_24px_-4px_var(--glow)]`, rê thì quầng
  đậm lên. Nút phụ viền `--border`, nền `--surface`. Dưới hàng nút: ba dấu tích nói điều kiện ("6 khoá
  miễn phí · Có bài học thử · Không gói tháng").
- **Card** bo `rounded-2xl`, nền `--surface`, viền `--border`, không bóng đen; card quan trọng có viền
  trên sáng (`linear-gradient` màu nhấn ở mép trên 1px).

**Món ký tên: đèn chiếu rọi vào món chính** (`B41`). Món chính (khung code, màn sản phẩm) nằm dưới hàng
nút; phía trên nó một **cây đèn thật**: lõi sáng trắng hẹp, chùm màu nhấn loe xuống, vệt chói ở chỗ đèn chạm
mép khung, viền khung bắt sáng rồi tắt dần xuống hai cạnh. Chỉ một quầng `radial-gradient` màu nhấn mờ
thì đọc thành bóng đổ màu, không ai thấy đèn (14/11/2026, wireframe trang bán khoá học: quầng xanh nhạt
sau khung, đặt cạnh trang mẫu thì phẳng hẳn).

```html
<div class="spotlight relative rounded-2xl border border-border bg-surface">
  <div class="beam" aria-hidden="true"></div>
  … thanh tiêu đề, code …
</div>
```

```css
/* Ba lớp, mỗi lớp một phần tử giả; không đặt filter / opacity trên .beam (làm mờ luôn lõi) */
.spotlight { isolation: isolate; }
.spotlight .beam {
  position: absolute; left: 50%; bottom: 100%; translate: -50% 0; z-index: -1; pointer-events: none;
  width: min(1100px, 120%); height: 200px;
}
/* 1. Chùm rộng màu nhấn, đỉnh nón ở trên, loe xuống mép khung */
.spotlight .beam::before {
  content: ""; position: absolute; inset: 0;
  background: conic-gradient(at 50% 0%, transparent 130deg, var(--glow) 165deg, var(--glow) 195deg, transparent 230deg);
  mask-image: linear-gradient(to bottom, transparent, black 80%); filter: blur(18px);
}
/* 2. Lõi trắng hẹp ở giữa chùm */
.spotlight .beam::after {
  content: ""; position: absolute; inset: 0; opacity: 0.8; filter: blur(8px);
  background: conic-gradient(at 50% 0%, transparent 165deg, color-mix(in oklab, var(--primary) 50%, white) 176deg,
    white 180deg, color-mix(in oklab, var(--primary) 50%, white) 184deg, transparent 195deg);
  mask-image: linear-gradient(to bottom, transparent 10%, black 90%);
}
/* 3. Vệt chói chỗ đèn chạm mép khung, cắt nửa dưới để không loang vào thanh tiêu đề */
.spotlight::before {
  content: ""; position: absolute; left: 50%; top: -40px; translate: -50% 0; z-index: -1; pointer-events: none;
  width: 60%; height: 80px; border-radius: 50%; opacity: 0.85; filter: blur(20px);
  background: radial-gradient(closest-side, white, color-mix(in oklab, var(--primary) 70%, white) 35%, transparent);
  clip-path: inset(-100px -100px 50% -100px);
}
/* 4. Viền khung bắt sáng: sáng ở mép trên, tắt dần xuống hai cạnh */
.spotlight::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1px; pointer-events: none;
  background: linear-gradient(to bottom, color-mix(in oklab, var(--primary) 40%, white),
    color-mix(in oklab, var(--primary) 50%, transparent) 25%, transparent 60%);
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
```

- **Chừa chỗ cho đèn**: từ hàng dấu tích tới mép trên khung 140–180px (`mt-36 sm:mt-44`). Khung đặt sát
  hàng nút (dưới 100px) thì chùm sáng không có chỗ hiện, chỉ còn vệt chói.
- **Soát bằng mắt**: chụp vùng từ hàng nút tới khung, phải thấy được lõi trắng và hình nón. Chỉ thấy
  một mảng sáng mờ thì tăng `--glow` (tới 60%) hay `opacity` lõi, không đổi sang `radial-gradient`.
- **375**: giữ cả bốn lớp, `height` của `.beam` còn 120px, khoảng chừa 96px.

Thêm một quầng mờ ở đỉnh hero (dưới header) để đầu trang không đen đặc. Khung code có **dòng được bắt**
(dòng lỗi tô nền đỏ mờ, nhãn mono góc phải "Phát hiện lỗi") để ánh sáng chỉ vào một ý, không chỉ để đẹp.

**Hiệu ứng theo khối, mỗi loại một chỗ** (`B11`):

| Khối | Hiệu ứng |
| --- | --- |
| Hero | đèn chiếu rọi món chính, chữ chuyển màu H1 |
| Dải chip công nghệ | chạy ngang, mép tan (`B36`) |
| Video / màn sản phẩm lớn | quầng sau khung, nút play tròn trắng giữa |
| Cảm nhận | **sao băng**: 8–12 vệt sáng mảnh rơi chéo chậm (6–12 giây một vệt), sau tiêu đề, mật độ thấp; section cắt vệt tràn bằng `overflow-clip`, không `overflow-hidden` (thẻ `reveal` bên trong kẹt mờ, `B34`) |
| CTA cuối | card có quầng màu nhấn loang từ đáy |

## Khối

Thứ tự hay gặp: hero canh giữa → dải chip công nghệ → hàng số (ô kẻ trái `border-l`, số lớn, nhãn hai
dòng) → video hay màn sản phẩm → tính năng 3×2 (icon trong ô vuông viền, tiêu đề, hai dòng) → lưới thẻ có
ảnh bìa (khoá học, sản phẩm) → người đứng sau (ảnh thật `B43`, số liệu kênh) → cảm nhận → các bước (ba
vòng số nối bằng đường) → FAQ hai cột (`B26`) → CTA cuối.

Nhãn section là pill nhỏ mono có chấm màu nhấn (`● CÁCH HỌC`), tiêu đề section hai dòng: dòng một trắng,
dòng hai `--muted`.

## Soát cuối

- [ ] Đèn chiếu rọi vào món chính, thấy được lõi trắng và hình nón (không chỉ quầng mờ); món chính có một
  chỗ được "bắt" (dòng lỗi, kết quả).
- [ ] Chữ chuyển màu chỉ ở H1 (và tối đa một tiêu đề cuối trang); hai đầu đạt 4.5:1.
- [ ] Mỗi hiệu ứng nền một khối; giảm chuyển động thì sao băng, chip chạy, quầng đứng yên.
- [ ] Ở 375: quầng không làm chữ mờ, nút xếp dọc full ngang, sao băng giảm còn 4–6 vệt.
