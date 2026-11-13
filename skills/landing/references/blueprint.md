# Blueprint: lớp nhìn — luật B2–B11

Mở ở bước dựng (`B2` của `SKILL.md`), trước khi viết khối đầu tiên. Khối nào đặt ở đâu, chữ viết ra
sao thì ở `sections.md`. Số trong ngoặc là số trang trên 20 landing Blueprint đo kỹ (11/11/2026).

Blueprint đọc ra từ bốn thứ, thiếu một là thành landing SaaS đại trà: **khung có đường kẻ lộ**
(`B5`), **ô lưới chung đường kẻ, vuông góc** (`B6`), **nhãn mono** (`B7`), **một màu nhấn** (`B4`).

## B2. Token, ba nền

**Gốc là `../../ui-ux/references/tokens.css`** (cùng tên biến, có sẵn `@theme inline` nên viết được
`bg-background`, `border-border`, `text-muted`, `bg-surface`, `bg-primary`): dán nguyên, rồi **đè đúng
các biến dưới đây** theo nền đã chọn. Nút, ô nhập, vòng focus của `ui-ux` nhờ vậy chạy đúng mà không
sửa gì. Không viết mã màu trong class.

| Token | Sáng (mặc định) | Kem | Tối | Dùng cho |
| --- | --- | --- | --- | --- |
| `--background` | `#fafafa` | `#f5f2eb` | `#0a0a0a` | nền trang, nền ô lưới |
| `--surface` | `#ffffff` | `#fbfaf7` | `#141414` | thứ nổi khỏi lưới: khung thử, khung code, mảnh giao diện |
| `--foreground` | `#0a0a0a` | `#1c1a17` | `#fafafa` | chữ chính |
| `--muted` | `#525252` | `#57534e` | `#a3a3a3` | chữ phụ, nhãn mono |
| `--border` | `#e5e5e5` | `#e2dccf` | `#262626` | **mọi đường kẻ**: khung, ô, đường ngăn |
| `--border-strong` | `#d4d4d4` | `#cfc7b6` | `#3a3a3a` | viền ô nhập, nút viền |
| `--button-hover` | `#ededed` | `#ece7dc` | `#1f1f1f` | rê nút viền, tab, dòng |
| `--primary` | màu nhấn `B4` | màu nhấn `B4` | màu nhấn `B4` bản tối | nút chính, cụm nhấn |

Đổi `--primary` thì suy lại `--primary-hover`, `--primary-foreground`, `--ring-focus`, `--border-focus`
như `brand-tokens.md` của `ui-ux` dặn. Nền Tối: đè thêm các biến `--surface-*`, `--item-hover` sang
tông tối, không để giá trị sáng của `tokens.css` lọt vào (ô nhập trắng giữa trang đen).

- **Nền sáng không trắng tinh**: trang đo được nền `#f7`–`#fa`, trắng dành cho `--surface` để khung
  thử và khung code nổi lên mà không cần bóng.
- **Kem** (4/20) hợp sản phẩm muốn ấm, gần người (AI cho người dùng cuối, công cụ dữ liệu); **Tối**
  (5/20) hợp hạ tầng, bảo mật, terminal. Sáng là mặc định khi không có lý do.
- Một màu cho mọi đường kẻ. Đường đậm hơn (`--border-strong`) chỉ cho viền control, không cho khung.

## B3. Font

Một sans cho chữ, một mono **cùng họ** cho nhãn, số, lệnh, code.

| Copy | Sans | Mono |
| --- | --- | --- |
| Tiếng Anh | Geist | Geist Mono |
| Tiếng Việt | Inter | JetBrains Mono |

Cả hai cặp có trên Google Fonts; copy tiếng Việt phải có subset `vietnamese` (`T5` của `ui-ux`), nên
không dùng cặp đầu cho tiếng Việt. Nạp nét 400, 500, 600.

- **Biến thể toàn mono** (3/20): cả trang chữ mono, kể cả đoạn văn. Chỉ khi đề xin ("kiểu terminal",
  "toàn mono") hay sản phẩm sống trong terminal. Đoạn văn mono khó đọc hơn: tối đa `max-w-2xl`, `text-[15px]/7`.

## B4. Một màu nhấn

Chọn theo sản phẩm, không mặc nhiên cam. Ba mã mặc định đạt 4.5:1 trên nền Sáng:

| Nhấn | Nền Sáng / Kem | Nền Tối |
| --- | --- | --- |
| Cam (hạ tầng, dữ liệu, tốc độ) | `#c2410c` | `#fb923c` |
| Xanh dương (API, nền tảng, doanh nghiệp) | `#1d4ed8` | `#60a5fa` |
| Xanh lá (CLI, mã nguồn mở, hiệu năng) | `#15803d` | `#4ade80` |

- **Kiểm 4.5:1 trên `--background` của nền đang dùng**, không trên trắng; thiếu thì hạ độ sáng tới khi
  đạt. Chữ trên nút đặc màu nhấn cũng 4.5:1.
- Màu nhấn dùng ở: nút chính, **một cụm chữ trong H1** (tuỳ), chấm và vạch nhỏ trong nhãn mono, thanh của
  sản phẩm mình trong benchmark, chỗ đang chọn trong tab. Không tô nền section, không tô icon hàng loạt.
- Nút chính nền màu nhấn (mặc định) hay nền `--foreground` (chữ trắng / đen): khoảng nửa số trang mỗi
  kiểu. Một trang một kiểu, mọi nút chính giống nhau.
- **Không có màu thứ hai**. Trạng thái (lỗi, cảnh báo) trong mảnh giao diện dùng màu ngữ nghĩa nhỏ,
  không thành màu nhấn thứ hai.

## B5. Khung có hai đường kẻ dọc

Mọi section nằm trong `.frame`: `max-w-300 mx-auto border-x border-border`. Dưới 1232px
khung lùi vào `mx-4` (`sm:mx-6`) và **vẫn giữ hai đường kẻ**: trang đo được ở 390 đều giữ.

- **Section ngăn nhau bằng đúng một đường**: `border-t` của section dưới, không `border-b` của section
  trên. Hai đường sát nhau là lỗi dễ thấy nhất của kiểu này.
- **Header và footer cũng trong khung**: hai đường dọc chạy xuyên từ đỉnh tới đáy trang.
- **Dấu `+` ở giao điểm** (góc trên hai bên của section có tiêu đề): icon `Plus` lucide 12px màu
  `--muted`, đặt `absolute` ở góc rồi kéo tâm về đúng giao điểm bằng `-translate-x-1/2 -translate-y-1/2`.
  Đây là chỗ được dùng số âm (`N11` của `ui-ux`): ghi comment ngay trên. Chỉ từ `lg`; ở màn hẹp dấu cộng
  sát mép màn đọc thành vết bẩn.
- Nội dung trong section đệm `px-6 lg:px-12`; lưới ô (`B6`) thì **không đệm ngang**, chạm hai đường khung.
- **Chú thích kiểu bản vẽ** (tuỳ, thêm chất kỹ thuật): dấu góc chữ L 8px ôm khung món chính, đường kích
  thước có hai vạch đầu và số mono (`1200px`, `24 rules`), toạ độ mono nhỏ ở góc (`x: 0 y: 0`), dấu
  chữ thập ở tâm sơ đồ. Nét 1px `--border-strong`, chữ `text-[11px] font-mono text-muted`,
  `aria-hidden="true"`. **Tối đa hai chỗ cả trang** (món chính hero, sơ đồ), chỉ từ `lg`; rải khối nào
  cũng có thì thành nhiễu. Dấu góc chữ L chỉ ôm **khung vuông góc hay bo tối đa `rounded-md`**: khung
  `rounded-xl` thì góc bo lùi vào, dấu L đứng ngoài khoảng trống chéo như vết rơi.

## B6. Ô lưới chung đường kẻ

Lưới ô là cách Blueprint chia khối: dải logo, tính năng, hàng số, lời dev, benchmark.

```html
<div class="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
  <div class="bg-background p-6 sm:p-8">…</div>
</div>
```

- **Khe 1px để lộ nền là đường kẻ**: không bao giờ đôi đường, không viền từng ô. Ô cuối hàng lẻ thì
  thêm ô trống cùng nền cho kín lưới (không để lộ một mảng `--border`).
- **Ô vuông góc, không bóng** (13/20 trang ô vuông góc). Thứ nổi lên **trong** ô (khung code, mảnh giao
  diện) mới có `bg-surface`, bo `rounded-lg`, viền `border-border`.
- **Luôn ghi `grid-cols-1` ở khổ hẹp**: lưới không ghi số cột thì cột giãn theo nội dung dài nhất, một
  dòng lệnh dài đẩy cả trang tràn ngang.
- Hiệu ứng hiện dần đặt **trên cả lưới**, không trên từng ô: ô đang mờ để lộ nền `--border`, thành một
  mảng xám suốt lúc cuộn.
- **Không phải khối nào cũng là lưới ô.** Lưới ô hợp khối nhiều mục ngang hàng (logo, tính năng, hàng số,
  lời dev). Benchmark, code theo tab, sơ đồ, FAQ, CTA cuối là **khối mở**: một món lớn giữa khung, không
  chia ô. Trang mẫu đo được xen kẽ hai loại, có trang chen một dải nền đảo hay nền màu nhấn giữa trang.
  **Không quá hai khối lưới ô liền nhau**: trang toàn ô có viền đọc thành bảng tính, nhàm từ màn thứ ba.

## B7. Nhãn mono

Chữ nhỏ mono đứng trên tiêu đề section, ở góc khung, cạnh số và lệnh. Là thứ làm trang "đọc ra kỹ thuật".

- Dạng: `font-mono text-xs uppercase tracking-wider text-muted`, kèm một chấm hay vạch 6px màu
  nhấn phía trước, hoặc số thứ tự `01 /`. Viết hoa dày (8/20) là mặc định; thường kèm `//` là biến thể.
- Nội dung **nói về sản phẩm**: `BENCHMARKS`, `01 / INSTALL`, `v2.4.0`, `128 RULES`. Không nhãn chung
  chung (`FEATURES` trên khối tính năng là chấp nhận được; `AMAZING` thì không).
- Số đo, phiên bản, lệnh, thời gian luôn mono, kể cả giữa đoạn văn (`<code>` không nền).

## B8. Cỡ chữ

| | 1440 | 375 | Ghi chú |
| --- | --- | --- | --- |
| H1 | `text-6xl` (60px), 48–72 | `text-4xl` (36px), 32–44 | nét 500, `tracking-tight`; cỡ 72+ thì nét 400 (12/20 trang nét 400–500) |
| Câu dẫn hero | `text-lg/8` | `text-base/7` | `--muted`, tối đa 2 dòng ở 1440 (`max-w-2xl`) |
| H2 | `text-4xl`–`text-5xl` | `text-3xl` | nét 500, `tracking-tight`, `max-w-3xl` |
| H3 trong ô | `text-base font-medium` | như trên | |
| Đoạn trong ô | `text-sm/6` | như trên | `--muted` |

- Trung vị H1 đo được 60–64px ở 1440, khoảng 38px ở 390. Nét 600–800 (6/20) chỉ khi chữ hẹp, viết hoa.
- Cụm màu nhấn trong H1 xuống dòng riêng bằng `<br />` chỉ khi phần trước vừa một dòng ở 375; dài hơn
  thì `<br class="hidden sm:block" />`. Tiêu đề trơ một chữ cuối dòng là lỗi.

## B9. Nút, chip lệnh, vi tương tác

- **Nút**: `h-10 px-4 text-sm font-medium`, bo theo khung: `rounded-md` (mặc định) hay vuông góc nếu
  trang để ô vuông và muốn gắt hơn. Nút chính đặc (`B4`), nút phụ viền `--border-strong` nền
  `--surface`. Dưới `sm` hai nút hero xếp dọc full ngang.
- **Chip lệnh cài**: `font-mono text-sm`, nền `--surface`, viền `--border`, `h-10`, dấu `$` màu
  `--muted` đầu dòng, nút copy icon ở cuối. Bấm copy: icon thành dấu tích và `aria-live` báo "Copied"
  1,5 giây.
  **Lệnh hiện đủ ở 1024 trở lên**: chip rộng theo lệnh (`w-fit`, không `flex-1` trong hàng hẹp), không làm
  mờ mép (`mask-image`) khi lệnh vừa khung; mép mờ chỉ khi lệnh thật sự tràn (JS gắn class khi
  `scrollWidth > clientWidth`). **Chip hero dùng lệnh ngắn nhất chạy được** (`docker run acme/acme`, không
  kèm `-p`, `-e`), lệnh đủ cờ để ở bước Bắt đầu (`B21`). Dev muốn đọc hết thứ mình sắp dán vào terminal:
  lệnh mất chữ cuối (`tideway/tidewa…`) đọc thành lệnh sai.
  **Lệnh không bao giờ bẻ dòng** (`whitespace-nowrap`), ở chip, ở bước, ở mọi khổ: lệnh gãy làm hai dòng đọc
  thành hai lệnh. Khung hẹp hơn lệnh (375, cột chia đôi ở 1024) thì cuộn ngang trong khung, mép mờ khi tràn
  thật; lệnh nhiều cờ trong khung code thì ngắt bằng `\` cuối dòng như terminal thật.
- **Phản hồi khi nhấn, không khi rê**: rê chỉ đổi nền / màu (`--hover`); nhấn co `scale-[0.97]` 120ms.
  Mũi tên trong nút và link chữ trượt 2px khi rê.
- Tab (code, khung thử): `role="tablist"`, ← → Home End chuyển tab, tab rộng theo chữ.

## B10. Chuyển động

Ít: chỉ 3/20 trang chạy nhiều chuyển động (trên 90 animation một lúc), còn lại vài chỗ. Ba chỗ được động:

1. **Màn mở**: nhãn, H1, câu dẫn, hàng nút, món chính hiện lần lượt một lần (opacity + `translateY(8px)`,
   400ms, trễ 0/80/160/240/320ms).
2. **Món chính tự chạy một lần** (khung thử, terminal; `B14`) sau 1,2 giây. Khách đã gõ, bấm, focus thì bỏ lượt.
3. **Hiện dần khi cuộn tới** ở khối lớn (một lần, cả khối, `B6`).

Dải logo chạy ngang là tuỳ chọn: chậm (40 giây một vòng), dừng khi rê. **Giảm chuyển động**
(`prefers-reduced-motion`): mọi thứ đứng yên ở trạng thái cuối, món chính hiện kết quả ngay.

Cách làm từng hiệu ứng (code, mốc cuộn, cuộn ghim, hình động hợp Blueprint, khi nào được dùng thư
viện, component nào cấm) ở `references/motion.md` (`B33`–`B40`). Chuyển động nào cũng phải cho khách
thấy sản phẩm làm gì; chỉ để đẹp thì bỏ.

## B11. Không làm

- Không ảnh 3D, không quầng sáng mờ, không gradient tím, không video nền, không ảnh trình bày (laptop,
  điện thoại nghiêng, mockup xếp chéo): đều cần người vẽ, và che mất sản phẩm thật.
- Không bo góc ô lưới, không bóng ô, không viền đậm hơn `--border` cho khung.
- Không quá một màu nhấn. Không icon emoji.
- Không carousel lời khách, không tweet nhúng.
- Không chữ tên sản phẩm khổng lồ ở footer (2/20 làm; không phải mặc định).
- Không banner cookie hay popup che hero (5/24 trang đo được bị che ở 390).

---

## Danh sách soát cuối (bước `B3`)

Cuộn hết trang ở 1440 và 375, đánh dấu từng dòng:

- [ ] Hai đường kẻ dọc chạy liền từ header tới footer, ở cả 375.
- [ ] Không chỗ nào hai đường ngang sát nhau; lưới ô không đôi viền, không lộ mảng `--border`.
- [ ] Ô vuông góc, không bóng; chỉ khung code / khung thử / mảnh giao diện có nền `--surface`.
- [ ] Không quá hai khối lưới ô liền nhau; có khối mở và ít nhất một dải nền khác xen giữa.
- [ ] Đúng một màu nhấn; chữ màu nhấn đạt 4.5:1 trên nền trang.
- [ ] Màn đầu 1440×900 thấy: H1, câu dẫn có số, nút chính, chip lệnh (nếu là thứ cài được), món chính.
- [ ] Không chữ quảng cáo rỗng (`B29`); mỗi khối có ít nhất một con số hay một mảnh sản phẩm.
- [ ] Trang dài 8–12 màn ở 1440 (`B12`).
- [ ] 375: không tràn ngang, H1 không trơ một chữ, nút hero xếp dọc, code cuộn trong khung.
- [ ] Copy, tab, accordion bấm được bằng phím; giảm chuyển động thì trang đứng yên.
- [ ] Mỗi chuyển động nói được sản phẩm làm gì; vòng lặp không quá 3 loại, không chạm chữ; không thư
  viện nào ngoài `motion` nếu người dùng chưa xin (`B39`, `B40`).
- [ ] Tiêu đề section gần nội dung của nó hơn gần section trên (`B19`); hai khung cạnh nhau cùng đáy,
  cột bước cao bằng terminal (`B21`); kết quả mẫu của khung thử vừa khung, không cắt ngang (`B14`).
- [ ] Không ý nào lặp trong màn đầu (phiên bản, license ở nhãn góc và ở nhãn tin mới); dấu góc L tối đa
  hai chỗ, chỉ quanh khung vuông góc (`B5`).
- [ ] Có ảnh share 1200×630 dựng bằng code, có đủ thẻ meta, thu còn 500px rộng vẫn đọc được H1 (`B32`).
