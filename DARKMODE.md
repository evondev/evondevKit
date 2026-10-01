# Dark mode — ghi chép trước khi làm

Ghi chép để chuẩn bị đưa dark mode vào skill `ui-ux`. Chưa phải luật. Luật nào
chốt thì chuyển vào `references/rules-color.md`, `tokens.css`, rồi gạch ở đây.

- **Phần 1 — một dự án thật đã chạy dark mode (26/09/2026): xong.**
- **Phần 2 — đối chiếu shadcn/ui, Radix, sáu bộ thiết kế lớn và 13 sản phẩm web
  (26/09/2026): xong.** Tra thật từ mã nguồn token, docs, HTML trang thật.
- **Phần 3 — đề xuất cho skill: chủ dự án chốt và đã đưa vào skill 01/10/2026.** Mỗi mục ghi chỗ nằm trong skill.

---

## Phần 1. Dự án thật

Next.js 16, Tailwind v4, token CSS tự viết (không dùng bộ token của shadcn). Dark
mode đã chạy thật với người dùng từ tháng 6/2026; bảng màu tối của skill
(`#05060f`, `#0f111a`, viền `rgba(160,180,220,…)`) chính là lấy từ đây.

### Tóm tắt

**Đáng học:**

1. Màu đi qua token, component gần như không phải viết `dark:`. Khối `.dark` chỉ
   có 10 dòng mà cả app đổi theo.
2. Nút và ô nhập **đổi cách vẽ** ở nền tối chứ không chỉ đổi màu: nút đảo màu
   không thành khối trắng, ô nhập bỏ viền chuyển sang đổ nền mờ, bóng tắt.
3. Nền xám nhạt (`gray-100`) sang tối thành **trắng phủ mờ** (`white/6`, `white/10`),
   nên đặt trên nền trang hay trên card đều đúng.
4. Vùng cố ý luôn sáng (`.force-light`) bằng cách khai lại token tại chỗ, một lần
   chữa cho mọi component con.
5. Thư viện bên ngoài (toast, hộp thoại, thanh tiến trình) cũng đọc token, lật theo
   theme không cần code thêm.

**Chỗ hở:** chữ trắng trên màu nhấn tối chỉ 2.65:1, năm chỗ nền đỏ nhạt quên bản
tối, thiếu `color-scheme`, chế độ tự động theo **giờ** chứ không theo hệ điều
hành, tài liệu dark mode trong dự án đã cũ và bị comment đi. Chi tiết ở dưới.

### 1. Cơ chế bật tắt

**Class trên `<html>`**, Tailwind v4 khai biến thể bằng:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

`:where()` giữ độ ưu tiên bằng 0, nên `dark:` không tự dưng thắng class khác.

**Ba chế độ, bấm một nút xoay vòng:** Tự động → Sáng → Tối → Tự động. Icon
`SunMoon` / `Sun` / `Moon`, `aria-label` và `title` đổi theo chế độ. Nút đặt ở
header app, header landing và thanh trên trang công khai.

**"Tự động" là theo giờ** (6:00–17:59 sáng, còn lại tối), kiểm lại mỗi phút nên
để app mở qua 18h là tự lật. Mặc định là tự động. Lưu ở `localStorage` khoá
`themeMode`.

**Chống nháy:** một script nội tuyến đầu `<body>` đọc `localStorage` + giờ rồi gắn
`.dark` trước khi vẽ. Provider render lần đầu với giá trị cố định cho khớp server,
đọc `localStorage` sau khi mount (đã từng dính lệch hydration khi đọc ngay lúc
khởi tạo state, sửa 06/06/2026).

Nhận xét:

- Theo giờ là lựa chọn riêng, hợp app học buổi tối. Nhưng người đã đặt hệ điều
  hành tối từ trưa thì vẫn thấy app sáng: **không đọc `prefers-color-scheme`**.
  Số đông app để "Hệ thống" làm mặc định (cần tra lại ở phần 2).
- Xoay vòng một nút thì người dùng không biết bấm tiếp sẽ ra gì, phải bấm thử. Ba
  lựa chọn đặt trong menu hoặc nhóm nút thì thấy hết một lần.
- `<html>` không có `suppressHydrationWarning` trong khi script sửa class của nó
  trước khi React hydrate: ở dev nhiều khả năng báo lệch thuộc tính.
- Lật theme thì mọi nút có `transition-[color,background-color…] 200ms` chạy chuyển
  màu cùng lúc, nền trang đổi tức thì còn nút đổi chậm hơn. Không có bước tắt
  transition lúc lật.

### 2. Token

| Token | Sáng | Tối | Ghi chú |
| --- | --- | --- | --- |
| `--background` | `#f4f4f6` | `#05060f` | navy gần đen |
| `--surface` (card) | `#ffffff` | `#0f111a` | chênh nền 1.07:1, gần như bằng nhau |
| `--foreground` | `#2c2c2c` | `#e9edf5` | 17.2:1 trên nền, không trắng tuyệt đối |
| `--muted` | `#828282` | `#8b93a7` | tối 6.6:1 đạt; **sáng chỉ 3.5:1, trượt** |
| `--border` | `#eff0f0` | `rgba(160,180,220,.10)` | tối là rgba ánh xanh lạnh |
| `--border-card` | `transparent` | `rgba(160,180,220,.08)` | sáng card không viền, tối có — nhưng **không component nào dùng** |
| `--primary` | `#ef6741` | `#ff7551` | màu nhấn sáng lên ở nền tối |
| `--primary-dark` | `#ef6741` | `#ff8a66` | tên là "dark" mà bản tối lại sáng hơn |
| `--primary-light` | `#ef67410d` | `rgba(239,103,65,.13)` | nền nhạt của màu nhấn, tối tăng độ đục |
| `--secondary` | `#7bcfa8` | `#7bcfa8` | giữ nguyên |

Nhận xét:

- **Chữ trên nền tối lấy xám ánh xanh (`#8b93a7`), không lấy xám trung tính.** Cả
  bảng tối cùng một sắc lạnh, ăn với nền navy.
- **Nền và card gần bằng nhau (1.07:1)** nên viền gánh việc tách khối. Skill đã có
  luật này (`M23`).
- **Màu nhấn sáng lên thì chữ trắng trên nó rớt:** `#fff` trên `#ff7551` chỉ
  **2.65:1** (bản sáng 3.14:1, cũng trượt). Nút primary vẫn `text-white` ở cả hai
  theme. Skill đã tránh được chỗ này bằng `--primary-foreground` đảo theo theme.
- **Tên token theo sắc độ thì gãy khi có dark mode.** `--primary-dark` thật ra là
  "màu nhấn lúc rê vào / chữ link", nên ở nền tối nó phải sáng hơn. Đặt tên theo
  vai trò (`--primary-hover`) thì không có mâu thuẫn này. Skill đang đặt theo vai
  trò, giữ.
- Có token chết (`--border-card`). Khối `.dark` càng ít dòng càng dễ giữ đúng,
  thừa một dòng là thừa một chỗ phải kiểm.

### 3. Component đổi cách vẽ ở nền tối

Đây là phần đáng học nhất: không chỉ thay mã màu mà đổi **cách** tạo khối.

| Thành phần | Nền sáng | Nền tối | Vì sao |
| --- | --- | --- | --- |
| Nút mặc định (đảo màu) | `bg-foreground text-background`, khối đen chữ trắng | `bg-white/5 text-foreground border-border` | đảo thẳng thì ra khối trắng chói giữa màn tối, nặng hơn cả nút primary |
| Ô nhập | `bg-surface border-border` | `bg-white/4 border-transparent` | ô tối dựa vào nền phủ mờ để thấy vùng gõ, bỏ thêm một đường kẻ |
| Nền xám nhạt (badge, tag, bong bóng chat, rãnh thanh tiến trình, nút tắt) | `bg-gray-100` | `bg-white/6` … `white/10` | trắng phủ mờ đúng trên cả nền trang lẫn card; xám đặc chỉ đúng trên một nền |
| Viền badge xám | `border-gray-200` | `border-border` | về lại token viền chung |
| Vòng quanh avatar huy hiệu | `ring-1 ring-border` | `ring-0` | ảnh đã tách được khỏi nền tối, vòng thừa |
| Nút cảnh báo có bóng màu | `shadow-sm shadow-amber-200/60` | `shadow-none` | bóng màu trên nền tối thành vầng sáng bẩn |
| Màu trạng thái (lỗi, đạt, cảnh báo) | nền `-50`, viền `-200`, chữ `-600` | nền `-950/40`, viền `-900`, chữ `-400` | cùng công thức cho đỏ, xanh, hổ phách, tím |
| Chip màu theo nhóm | nền `-50` chữ `-600` | nền `-500/20` chữ `-300` | sắc sáng lên hai bậc |
| Gradient trang trí hero | bốn vệt màu loang trên nền trắng | `dark:hidden` | loang màu sáng trên nền tối là chói |
| Nền layout | `bg-background` | `bg-transparent` | để lộ nền của `body` |

Bên ngoài component:

- **Toast và hộp thoại** của thư viện được đè style bằng token (`var(--surface)`,
  `var(--border)`), thêm tiền tố `body` để thắng style thư viện chèn lúc chạy.
  Nền che sau hộp thoại là `rgba(5,6,15,.6)`, cùng sắc với nền tối.
- **Thanh tiến trình chuyển trang** lấy `color="var(--primary)"`, tự đổi sắc theo
  theme.
- **Thanh cuộn** lấy `var(--border)`, tự đổi.
- **Viền sáng chạy quanh card** (conic-gradient xoay) dùng xanh lạnh `#c7d3ea`,
  ăn với nền navy. Đây là hiệu ứng trang trí riêng, không đưa vào mặc định flat.

### 4. Vùng luôn sáng: `.force-light`

Trang chia sẻ tài nguyên (nền kem) cố ý không theo dark mode. Cách làm: một class
khai lại **toàn bộ** token của bản sáng.

```css
.force-light {
  --background: #f4f4f6;
  --foreground: #2c2c2c;
  /* … đủ mọi token như :root … */
}
```

Đặt class lên khung ngoài cùng của trang là mọi component con (ô nhập, nút, viền
thẻ) quay về bản sáng, không phải truyền bảng màu xuống từng cái. Comment trong
code ghi đúng lý do: *chữ đen trên nền tối là kiểu lỗi chỉ người bật dark mode mới
thấy, nên rất lâu mới có người báo.*

Hở: class `dark:` trong vùng đó vẫn ăn (`.dark *` vẫn khớp), nên component nào viết
`dark:bg-white/4` sẽ ra nền tối mờ trên nền kem. Muốn kín thì biến thể phải loại
vùng này ra, ví dụ `&:where(.dark, .dark *):not(.force-light, .force-light *)`,
hoặc component chỉ dùng token.

### 5. Chỗ hở, có số đo

1. **Chữ trắng trên màu nhấn nền tối 2.65:1** (xem mục 2).
2. **Năm chỗ nền đỏ nhạt không có bản tối:** ô đáp án sai, dòng tóm tắt, câu lỗi
   ở màn ôn từ vựng và bảng Nói mỗi ngày (`border-red-300 bg-red-50 text-red-600`).
   Ở nền tối ra khối hồng gần trắng giữa màn đen. Thêm ba câu lỗi `text-red-600`
   trần cũng không có bản `-400`. Nguyên nhân gốc: màu trạng thái viết bằng class
   Tailwind rải ở từng component, mỗi chỗ phải nhớ tự thêm `dark:`. Công thức
   `bg-red-950/40 border-red-900 text-red-400` lặp lại 7 lần — đáng lẽ là một bộ
   token `--error-*` như `tokens.css` của skill.
3. **Không có `color-scheme`.** Thanh cuộn gốc, ô chọn ngày, autofill, `<select>`
   của trình duyệt vẫn vẽ bản sáng trong nền tối.
4. **Không có `<meta name="theme-color">`** theo theme: thanh địa chỉ trên điện
   thoại vẫn màu sáng.
5. **Không đọc tuỳ chọn hệ điều hành** (mục 1).
6. **Lật theme có chuyển màu lệch nhịp** (mục 1).
7. **Tài liệu dark mode trong dự án đã cũ:** bảng màu xanh lá, nền `gray-950`, khoá
   `localStorage` là `theme` — cả ba đã đổi, cả mục bị comment đi. Người đọc
   tài liệu sẽ làm theo bảng sai.

### 6. Đối chiếu với skill hiện tại

**Skill đã có** (lấy từ dự án này):

- `M20` mặc định chỉ light, dark mode chỉ làm khi được yêu cầu.
- `M21` giữ thứ tự bề mặt ở cả hai theme.
- `M22` màu nhấn ở nền tối chỉ làm nền, đường mảnh hạ độ đục 42%.
- `M23` navy không xám, viền rgba gánh việc tách khối.
- `tokens.css` khối `.dark`: màu nhấn đảo kèm `--primary-foreground`, bộ màu
  trạng thái tối (`-400` chữ, `-500` phủ mờ nền) — đã tránh được lỗi 1 và 2 ở trên.
- `P10` (tối là chính): hạ độ đậm chữ một bậc, ảnh cần `ring-white/10`.

Đề xuất nằm ở Phần 3, sau khi đã đối chiếu.

---

## Phần 2. Đối chiếu các bộ lớn

**Nguồn:** shadcn/ui bản Tailwind v4 (token mặc định + mã từng component) kèm
next-themes; Radix Colors và Radix Themes; sáu bộ thiết kế lớn khác (file token
đã build, docs chính thức); 13 sản phẩm web (trang help + HTML thật lấy bằng
`curl`). Gọi chung là "8 bộ" cho phần thiết kế, "13 trang" cho phần trình duyệt.
Chỗ nào chưa xác minh được thì ghi rõ.

### 1. Mặc định và nút đổi theme

- **Mặc định theo hệ điều hành.** 6/6 trang có bằng chứng đều mặc định "Hệ
  thống", next-themes mặc định `"system"`. Không bên nào có bằng chứng mặc định
  Sáng.
- **Đúng ba lựa chọn Sáng / Tối / Hệ thống** là số đông. Bộ lớn hơn (mờ, tương
  phản cao, mù màu, màu riêng) chỉ ở vài sản phẩm rất lớn.
- **Không trang nào dùng một nút bấm xoay vòng.** Có hai kiểu:
  - Trong app: **Cài đặt → Giao diện**, dạng select hoặc danh sách; hoặc **menu
    tài khoản** có mục Giao diện với ba lựa chọn.
  - Trang công khai / docs: **nhóm nút 3 icon** (radiogroup) ở footer, hoặc nút icon
    trên header mở menu 3 mục (mẫu `ModeToggle` của shadcn).
- Một bộ hệ điều hành khuyên **không có công tắc riêng trong app**: người dùng phải
  chỉnh hai nơi, và tưởng app lỗi khi không theo máy. Bộ hệ điều hành kia khuyên
  ngược lại: có ba lựa chọn, mặc định Hệ thống. Web theo cách thứ hai.
- Bộ docs của shadcn có phím tắt `D` để lật (bỏ qua khi đang gõ).

**So với dự án thật:** tự động theo **giờ** và nút xoay vòng đều lệch số đông.

### 2. Bậc bề mặt ở nền tối

**Tầng nổi sáng hơn nền** là quy ước gần như chung:

| Bộ | Chìm | Nền trang | Card / nổi | Popover / overlay |
| --- | --- | --- | --- | --- |
| Bộ A | `#18191a` | `#1f1f21` | `#242528` | `#2b2c2f` |
| Bộ B (tone) | 4 | 6 | 10–12 | 17–22 |
| Bộ C | — | `#121212` | + trắng phủ 5% | + 8–16% theo độ cao |
| Radix | — | `#111111` | — | `#191919` |
| shadcn | — | `oklch .145` ≈ `#0a0a0a` | `.205` ≈ `#171717` | **bằng card** |

- Mỗi bậc sáng hơn chừng **3–5 đơn vị L**; đủ để thấy khi đặt cạnh nhau, không đủ
  để tách khối một mình (nên vẫn cần viền, xem mục 3 và 6).
- Ngoại lệ: shadcn cho modal **bằng nền trang**, tách nhờ lớp phủ `black/50` + viền
  + bóng. Một bộ khác cho overlay **tối hơn nền trang**, tách bằng vòng viền. Vậy
  "tầng nổi sáng hơn" là số đông, không tuyệt đối.
- Hệ điều hành có hai bộ màu nền: *base* (lùi) và *elevated* (nổi), tự đổi sang
  elevated cho popover và sheet.

**Vùng tô (nút phụ, tab đang chọn, ô nhập, hover) ở nền tối SÁNG hơn card**, ở
mọi bộ có số liệu (7/8, bộ còn lại không công bố giá trị):

- shadcn: `secondary / muted / accent` = `.269`, sáng hơn card `.205`. Bản sáng thì
  ngược lại (`.97` tối hơn card trắng).
- Radix: bậc 3–5 (nền component) sáng hơn bậc 1–2 (nền app) ở nền tối, tối hơn ở
  nền sáng. Thang được thiết kế để giữ **khoảng cách** với nền, không giữ thứ tự
  độ sáng.
- Một bộ khác: control `#212830` trên trang `#0d1117`.
- Dự án thật: `white/6`–`white/10`, cũng sáng hơn card.

Lý do: vùng tô là **lớp phủ**. Nền sáng phủ đen mờ (tối đi), nền tối phủ trắng mờ
(sáng lên). Thứ được giữ qua hai theme là **độ chênh với nền phía sau**, không
phải chiều sáng tối. ⚠️ Chỗ này **trái luật `M21`** của skill (xem Phần 3).

### 3. Sắc nền và viền

- **Nền:** 4/8 bộ trung tính hoặc gần trung tính (chroma ≈ 0), 1 bộ ám navy nhẹ
  (`#0d1117`), 1 bộ ám **màu thương hiệu** rất nhẹ (chroma 6), Radix có cả xám
  trung tính lẫn xám ám (slate, mauve…), 1 bộ không nói. Navy là một gu, **không
  phải quy ước**.
- **Không đen tuyệt đối cho nền chính** (một bộ nói rõ: xám đậm thấy được bóng và
  đỡ mỏi mắt; đen chỉ khi cần tiết kiệm pin màn OLED). Chữ chính cũng không trắng
  tuyệt đối (`#eeeeee`, `#f0f6fc`, `oklch .985`).
- **Viền chia là alpha:** shadcn `white/10`, một bộ `#ffffff25`, một bộ
  `#e3e4f21f`. Chỉ một bộ dùng xám đặc.
- **Viền ô nhập đậm hơn viền chia**, ở mọi bộ có tách hai token:

  | Bộ | Viền chia | Viền ô nhập |
  | --- | --- | --- |
  | shadcn | `white/10` | `white/15` |
  | Bộ A | alpha `…1f` | đặc `#7e8188` |
  | Bộ B | tone 30 | tone 60 (cần 3:1) |

  Một bộ ghi thẳng: viền mờ **không được** làm ranh giới vùng bấm, vì cần 3:1.

### 4. Nút primary ở nền tối

Hai phe, gần chia đôi:

- **Giữ màu thương hiệu, chữ trắng** (3 bộ). Màu chỉ xê dịch nhẹ (xanh lá
  `#1f883d` → `#238636`; một bộ còn **tối** nền đi và giữ chữ trắng).
- **Sáng lên, chữ đảo sang tối** (3 bộ + shadcn): tone 40 → 80 và chữ tone 20;
  `#1868db` → `#669df1` và chữ `#1f1f21`; shadcn đảo nền gần đen → gần trắng.
- Một bộ khuyên màu nhấn nền tối **giảm bão hoà** (tone 200 thay 500), vì màu gắt
  "rung" trên nền tối, và màu thương hiệu gắt chỉ dùng cho 1–2 chỗ.

Điểm chung duy nhất: **chữ trên nút đi theo màu nền nút**, kiểm lại 4.5:1 ở cả
hai theme. Màu sáng lên mà chữ vẫn trắng là đúng lỗi của dự án thật (2.65:1).
Skill đang theo phe "sáng lên + đảo chữ", hợp với màu nhấn gần đen.

### 5. Ô nhập ở nền tối

**Mọi bộ có số liệu đều giữ viền** (thêm một bộ nữa chỉ ghi viền tone 60, không ghi nền). Khác nhau ở nền:

| Bộ | Nền ô | Viền |
| --- | --- | --- |
| shadcn | `input/30` ≈ trắng 4.5%, **sáng hơn** nền | `white/15` |
| Radix | `black/25`, **chìm hơn** panel | `gray-a7` (`#ffffff3b`) |
| Bộ A | nền trang, thêm bóng trong `inset 0 1px 0` | đặc `#3d444d` |
| Bộ B | tầng nổi `#242528` | đặc `#7e8188` |
| Bộ C | nền 1 | viền + cạnh dưới đậm, focus cạnh dưới 2px màu nhấn |

**So với dự án thật:** bỏ viền (`border-transparent`) chỉ còn nền `white/4` là
lệch số đông; ô nhập mất ranh giới 3:1.

shadcn áp đúng công thức nền + viền đó cho textarea, select, checkbox, radio, OTP,
tab đang chọn và nút outline. Rê vào thì nền đậm lên (`input/50`).

### 6. Bóng ở nền tối

**Không bộ nào bỏ bóng.** Ba cách, thường đi cùng nhau:

- **Giữ nguyên** (shadcn: card `shadow-sm`, menu `shadow-md`, dialog `shadow-lg`,
  không có `dark:shadow-*`).
- **Đậm hơn**: độ đục gấp đôi (`.12/.14` → `.24/.28`); một bộ lên tới alpha `99`.
- **Thêm vòng sáng 1px** ở trước bóng: `0 0 0 1px #3d444d`, `0 0 0 1px gray-a6`,
  `0 0 0 1px #bdbdbd1f`. Vòng này mới là thứ thật sự tách lớp; bóng lớn trên nền
  gần đen gần như không thấy.

Một bộ nói rõ: bóng khó thấy ở nền tối nên tầng nổi **phải đi cặp** bề mặt sáng
hơn + bóng, không dựa một mình bóng. Không bộ nào dùng vầng sáng thay bóng.

Bóng **màu** (bóng cam, bóng hổ phách) không có trong bộ nào; dự án thật tắt nó ở
nền tối là hợp lý.

### 7. Màu trạng thái ở nền tối

Công thức giống nhau ở gần hết các bộ:

- **Chữ và icon sáng lên**: đỏ `-400` / bậc 11 / tint30 (`#f85149`, `#ff9592`,
  `#fd9891`).
- **Nền nhạt** là chính sắc đó phủ mờ (`#f851491a` ≈ 10%, `#2ea04326` ≈ 15%,
  `destructive/20`), hoặc một màu đặc rất tối cùng sắc (`#42221f`, shade40).
- **Nền đặc** (nút xoá, badge đậm): giữ hoặc sáng lên; shadcn hạ còn
  `destructive/60` để bớt gắt. Một bộ để nút xoá lúc nghỉ **chỉ đỏ chữ** trên nền
  control, rê vào mới đỏ đặc.
- Có bộ đổi đỏ/xanh thành cam/xanh dương cho người mù màu.

Skill đã theo đúng công thức này trong `tokens.css`.

### 8. Chart, ảnh, logo

- **Chart có bảng màu riêng cho nền tối** (shadcn `--chart-1..5` bản `.dark`, và
  `ChartConfig` nhận `theme: { light, dark }`; hai bộ khác có token chart theo
  theme).
- **Ảnh hai bản:** component ảnh có `srcDark`; README dùng
  `<picture><source media="(prefers-color-scheme: dark)">`.
- **Ảnh nền trắng**: làm tối nhẹ để không chói.
- **Avatar**: nền `white/10`, viền `white/15` và vòng cùng màu nền trang.
- Logo trên nền tối chuyển bản trắng.

### 9. Tầng trình duyệt (13 trang, HTML thật)

| Thứ | Số trang có | Ghi chú |
| --- | --- | --- |
| CSS `color-scheme` | 7/13 | next-themes đặt sẵn qua `style.colorScheme` (mặc định bật) |
| Script chống nháy trong `<head>` | 6/13 | thêm 1 trang render thuộc tính từ server |
| `meta theme-color` | 7/13 | chỉ **2** trang có cặp sáng/tối theo `media` |
| `meta color-scheme` | 3/13 | |

- Thuộc tính trên `<html>`: `data-theme` nhiều nhất, sau đó `class="dark"`.
- **Tắt transition lúc lật:** next-themes `disableTransitionOnChange` chèn
  `*{transition:none!important}`, ép vẽ lại rồi gỡ. Trang docs shadcn bật cờ này.
- `<html suppressHydrationWarning>` là bắt buộc khi script sửa `<html>` trước React.
- Đồng bộ giữa các tab: next-themes nghe sự kiện `storage`.
- Một trang docs lớn cập nhật `theme-color` bằng hook mỗi lần lật (và ghi hai mã
  tối khác nhau ở hai file — chính họ cũng lệch).

### 10. Chữ ở nền tối

- **Không bộ nào có dữ liệu hạ độ đậm chữ ở nền tối** (không có `dark:font-*`,
  font-weight không nằm trong file theme; các bộ chỉ có docs cũng không nhắc). ⚠️ Trái mẹo trong `P10` của skill.
- Thứ bậc chữ bằng **độ sáng**: chính `#eeeeee`–`#f0f6fc`, phụ `#9198a1`–`#b4b4b4`,
  hoặc độ đục 87% / 60% / 38%.
- Chữ phụ nền tối **sáng hơn** tỉ lệ so với bản sáng (shadcn `.556` → `.708`).
- Nhiều bộ có bản **tương phản cao** (≥ 7:1) riêng cho nền tối. Một bộ khuyên chữ
  nhỏ màu tự chọn nên đạt 7:1.

### Kỹ thuật khác

- **Tooltip đảo màu:** `bg-foreground text-background`, nên ở nền tối tooltip sáng.
- **Hover ở nền tối nhẹ tay hơn** (`accent/50`, `input/50`) vì vùng tô đã gần nền.
- **Bôi đen chữ** có token riêng, nền tối đảo sang sáng.
- **Gradient trang trí** ở nền sáng thì bỏ ở nền tối (`dark:bg-background`).
- Viền lưới nền tối **đậm hơn** nền sáng một nấc (`border/50` → `border`).
- Khoá theme theo trang: next-themes `forcedTheme`, lúc đó ẩn nút đổi theme. Cùng
  việc với `.force-light` của dự án thật.
- Mọi bộ khai giá trị riêng cho từng token tối; một bộ nói thẳng: màu tối **không
  phải** màu sáng đảo ngược.

---

## Phần 3. Đề xuất cho skill

Gộp Phần 1 và 2. Mỗi dòng ghi: làm gì, căn cứ, luật bị đụng.

### Ba chỗ skill đang trái số đông — đã chốt 01/10/2026

- [x] **`M21` (giữ thứ tự sáng tối của bề mặt).** → viết lại `M21`; `--secondary`, `--item-hover`, `--button-hover` tối là trắng phủ mờ; lớp rê `hover:bg-background` đổi thành `hover:bg-item-hover` khắp skill. 7/7 bộ có số liệu cho vùng tô (nút phụ, tab
      đang chọn, ô nhập, hover) **sáng hơn card** ở nền tối, tối hơn ở nền sáng.
      Chính `tokens.css` cũng đã vậy (`--secondary #1c202d` > `--surface #0f111a`,
      sửa 23/09). Đề xuất viết lại: *tầng nổi (card, popover, modal) sáng dần ở
      nền tối; vùng tô là lớp phủ, giữ độ chênh với nền phía sau chứ không giữ
      chiều*. Ca gốc của `M21` (nút phụ `#1c2030` trên card `#0f111a` "nổi lên")
      cần xem lại: có thể lỗi thật là độ chênh quá lớn, không phải chiều.
- [x] **`M23` (navy, không xám).** → viết lại `M23`: navy là gu, dự án có bảng tối riêng thì theo dự án; bóng giữ, đậm hơn, đi cặp viền. 4/8 bộ trung tính, navy là 1/8. Đề xuất: giữ
      navy làm gu mặc định của skill nhưng ghi rõ là gu; dự án có xám riêng thì
      theo dự án (`P10` đã nói vậy). Phần "bóng gần như vô dụng" sửa thành: giữ
      bóng, đậm hơn, thêm vòng 1px (mục 6).
- [x] **`P10` "hạ độ đậm chữ một bậc".** → bỏ, thay bằng thứ bậc chữ theo độ sáng. Không bộ nào làm. Đề xuất bỏ, hoặc hạ thành
      ghi chú "tuỳ font, đo bằng mắt".

### Thêm mới

- [x] → `M31`. **Cơ chế bật tắt chuẩn:** Sáng / Tối / Hệ thống, mặc định Hệ thống. Trong
      app đặt ở Cài đặt → Giao diện hoặc menu tài khoản; trang công khai là nhóm 3
      icon ở footer hoặc header. Không nút xoay vòng. Có dạng tham chiếu cho
      Next.js (next-themes: `attribute="class"`, `defaultTheme="system"`,
      `enableSystem`, `disableTransitionOnChange`, `suppressHydrationWarning`).
- [x] → `M31`, `color-scheme` trong `tokens.css`; thêm `@custom-variant dark` theo class. **Tầng trình duyệt:** `color-scheme` luôn đi cùng theme; `theme-color` hai
      thẻ theo `media` (tuỳ chọn).
- [x] → `--surface-overlay`, `--elevation-popover` / `--elevation-modal` (class `shadow-popover` / `shadow-modal`), bảng khung ở đầu `layouts/overlay.md`. Modal, panel giữ `--surface`. **Token tầng nổi thứ ba** (`--surface-overlay` cho popover, menu, modal).
      `tokens.css` hiện chỉ có nền trang và card.
- [x] → `M14`: giữ hai vai, đo nền tối `--border` 1.23:1, `--border-strong` 1.47:1, không đổi giá trị. **Hai token viền:** viền chia (alpha thấp) và viền điều khiển (≥ 3:1).
      `--border-strong` hiện có thể làm vai thứ hai, cần đo lại ở nền tối.
- [x] → `M32`, `components/input.md` bỏ `dark:border-transparent`. **Ô nhập nền tối:** giữ viền + nền phủ mờ; không bỏ viền.
- [x] → `M23`, `M15`, `--elevation-*` khối `.dark`. **Bóng nền tối:** vòng 1px + bóng đậm hơn; tắt bóng màu.
- [x] → `M32`. **Nút đảo màu** (nền foreground) không thành khối trắng đặc: nền trắng mờ +
      viền, hoặc chuyển về variant secondary.
- [x] → `M21`. **Vùng tô nền tối là trắng phủ mờ** (`white/4`–`white/10`), không phải xám đặc.
- [x] → `M32`. **Gradient, vệt màu trang trí** tắt hoặc thay ở nền tối.
- [x] → `M32`, `components/charts.md` (mục Nền tối), `components/avatar.md` (tông tối). **Chart có bảng màu tối; ảnh cần bản tối thì `<picture>`; avatar có vòng.**
- [x] → `M32`. **Tooltip đảo màu.**
- [x] → `M33`, `.force-light` / `.force-dark` trong `tokens.css`. **Vùng khoá theme** (`.force-light` / `forcedTheme`) bằng khai lại token, kèm
      cách chặn `dark:` rò vào.
- [x] → `M33`. **Thư viện bên ngoài đọc token** (toast, hộp thoại, thanh tiến trình).
- [x] → `findDarkModeProblems` (mục "DARK MODE"): mảng sáng (Hỏng), ô nhập không viền, nền rê `bg-background`, thiếu `color-scheme`, trang không lật. Chữ trắng trên màu nhấn: phép đo tương phản chung đã bắt. **`probe.mjs` chạy lại các phép đo ở `.dark`**, bắt riêng: nền `-50`/`-100`
      sáng giữa màn tối, chữ trắng trên màu nhấn đã sáng lên, ô nhập không viền,
      `color-scheme` thiếu.
- [x] → `system.md` bước 5 (`/design-system`). Trang mẫu `/components` có nút lật theme để review cả hai bản.
