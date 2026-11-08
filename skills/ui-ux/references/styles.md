# Phong cách thị giác — luật P

Nguồn duy nhất cho: nhận ra dự án đang dùng phong cách gì, phong cách đó được đè
luật nào, và bẫy riêng của từng phong cách. Lệnh audit nằm ở `scripts/audit.sh` (`SKILL.md` câu 2),
tầng 3. File này dạy cách **đọc** kết quả.

---

## Hai tầng

**P1. Mặc định là flat. Dự án đã có phong cách riêng thì theo dự án. Không hỏi.**

Ba ca, chọn đúng một:

| Ca | Làm gì |
| --- | --- |
| **Người dùng tự nêu phong cách** ("làm trang giá kiểu glassmorphism") | Làm theo phong cách đó, **không hỏi lại** |
| **Audit thấy dự án có phong cách khác flat** (`P4`) | **Theo phong cách dự án**, dựng luôn, báo một dòng lúc giao (mẫu bên dưới) |
| **Dự án flat hoặc trống**, người dùng không nêu gì | **Màn trong app web** (dashboard, danh sách, bảng, form, cài đặt): **bộ mặt khuyên dùng** theo người dùng của sản phẩm (`P13`), không mặc nhiên Clean; wireframe nhánh `U` có nhóm Kiểu liệt kê đủ mười bộ để người dùng tự đổi (`wireframe.md`, `U3`). Màn khác: Flat (`P6`). Không hỏi về phong cách. Có màu chỉ khi người dùng tự xin trong đề: trang lướt để chọn theo `P12`, màn trong app theo Sắc Tinted hay Vivid (`P17`), mặc định Neutral; hai chế độ dựng lại: dòng Có màu (`V1d`), không chọn sẵn. Wireframe không có nấc Có màu, có nhóm Sắc trong menu Kiểu |

Vì sao theo dự án chứ không theo flat: một màn flat giữa app glass là màn lạc
loài, người dùng thấy ngay. Nhất quán thắng gu.

Mẫu dòng báo lúc giao:

> Dự án đang dùng **glass** (thấy ở 7 file: card, modal, sidebar), màn này làm
> glass cho khớp. Muốn flat theo mặc định của skill thì nói, mình đổi.

Người dùng đã chọn thì giữ cho các màn sau trong cùng dự án.

**Chọn phong cách nào thì cũng không theo lỗi của dự án.** Phong cách với lỗi là
hai thứ khác nhau. Dự án làm trang giá ba cột, mỗi cột một nút một màu (tím,
trắng, xanh), mà người dùng chọn theo phong cách dự án thì:

- **Theo:** gradient tím, bo góc lớn, nền tối. Đó là phong cách.
- **Không theo:** ba nút ba màu cùng nặng như nhau. Đó là lỗi `I3`. Chỉ một nút được là nút chính, dù phong cách là gì.

Phép thử: *bỏ thứ này đi thì màn hình trông **khác**, hay trông **tệ hơn**?*
Khác là phong cách, cứ theo. Tệ hơn là nguyên tắc, không được bỏ.

**P2. Luật nào phong cách được đè, luật nào không.**

| Loại | Luật | Phong cách đã chọn theo `P1` được đè không |
| --- | --- | --- |
| **Gu flat** | `M1` nền xám nhạt · `M2` tỉ lệ 95/5 · `M12` không gradient · `M13` tách bằng viền · `M15` bóng chỉ cho lớp nổi · `M20` mặc định sáng · `M23` tối là navy · `M29` card một mình không viền · `F19` không glass · `F20` không phát sáng · `F22` không animate hình khối | **Được**, theo đúng khối của phong cách đó bên dưới |
| **Nguyên tắc** | Toàn bộ `N` `S` `T` `I` `R` · `M3` một màu nhấn · `M4` màu báo trạng thái (ngoại lệ hẹp: Sắc Tinted, Vivid của `P17` đè chỉ ở các chỗ bảng của nó nêu tên: ô icon, chuỗi biểu đồ, một số liệu cần chú ý) · `M11` ba sắc độ chữ · `M19` bo lồng · `M24`–`M28` token · `M30` hai sắc đỏ · bố cục `F1`–`F18`, `F21`, `F23`–`F25` · **`P3` tương phản** | **Không bao giờ** |

Mỗi luật gu flat có dòng *"Gu flat"* ngay tại chỗ. Thấy dòng đó mà phong cách
đã chọn không phải flat thì quay về đây.

**P3. Tương phản chữ: con số cứng, ở mọi phong cách.**

| Thứ | Tối thiểu |
| --- | --- |
| Chữ thường | **4.5 : 1** so với nền ngay phía sau |
| Chữ lớn (từ 24px, hoặc từ 18.66px đậm) | **3 : 1** |
| Icon mang nghĩa; viền **ô nhập, checkbox, radio chưa chọn** | **3 : 1** so với nền kề bên. Nút có nhãn chữ **không** cần viền đạt 3:1 (WCAG 1.4.11: chữ đã nhận diện được nút) |

Token mặc định:

| Token | Nền sáng | Nền tối | Đạt |
| --- | --- | --- | --- |
| `--muted` (chữ phụ, placeholder) | 4.95 : 1 trên card, 4.51 : 1 trên nền trang | 6.1 : 1 | ✅ 4.5 |
| `--border-focus` | 16.8 : 1 | 3.6 : 1 | ✅ 3 |
| **Viền ô nhập, select, nút outline, checkbox, radio** (`--border-strong`) | ~1.2 : 1 | ~1.5 : 1 | ❌ 3 |
| **Track công tắc lúc tắt** (`muted/40`) | ~1.6 : 1 | | ❌ 3 |

**`--muted` chỉ đạt trên ba nền sáng nhất**: card `--surface`, `--surface-hover`, nền trang
`--background`. Trên nền xám đậm hơn nó trượt: `--secondary` 4.04, `--background-hover`
4.01, lớp phủ `foreground/5` trên nền trang 4.12, `foreground/8` trên dòng đang rê 4.05.
Chữ phụ nằm trên những nền đó (số đếm trong tab đang chọn, chữ trong ô sửa tại chỗ lúc rê)
thì dùng **`text-foreground/70`**: lớp phủ theo màu chữ nên đậm theo nền, đạt từ 4.82 : 1
trên mọi nền xám của skill. Đừng nhạt hơn `/70`: `/65` đã trượt trên `--secondary` (4.17).
Icon phụ `text-muted` thì cứ giữ, icon chỉ cần 3 : 1.

⚠️ **Viền điều khiển KHÔNG đạt 3 : 1, và đó là đánh đổi có chủ ý.** Đạt thì cần viền
xám cỡ `#8a8a91`; chủ dự án thấy đậm và xấu, bác.
`#f2f2f2` (1.1:1) thì lại mờ quá, radio chưa chọn gần như vô hình; `#e4e4e7` (1.27:1) thì
đường kẻ sidebar đậm. Chốt `#eaeaea` (~1.2:1). Đừng đổi mà không hỏi. Skill
bù bằng ba thứ khác để người dùng nhận ra ô nhập: nhãn luôn hiện phía trên
(`I26`), placeholder, và viền + ring khi focus.

Dự án **phải đạt WCAG AA đầy đủ** (cơ quan nhà nước, y tế, ngân hàng) thì thêm
token riêng cho viền điều khiển (`--border-control: #8a8a91`, nền tối `#5e6578`)
và đổi class của ô nhập, select, checkbox, radio sang nó (nút outline thì không cần); track
công tắc lúc tắt lên `muted/75`. **Đừng** đổi thẳng
`--border-strong`: đường kẻ sidebar, tab, badge dùng chung token đó sẽ đậm theo.

Flat hiếm khi trượt con số của chữ, vì chữ đậm nằm trên nền trắng đặc. Glass,
gradient và tối thì **trượt đầu tiên**. Nên luật này được viết ở đây, cạnh các
phong cách làm nó trượt.

**Đo ở chỗ tệ nhất**, không đo ở giữa:

- Trên gradient, đo ở **đầu gần màu chữ nhất**.
- Trên glass, đo ở chỗ phía sau **gây bất lợi nhất**: chữ trắng thì đo trên vùng ảnh sáng nhất phía sau, chữ đen thì đo trên vùng tối nhất.
- Placeholder và chữ phụ cũng tính. Chữ phụ `text-white/50` trên nền kính thường là thứ trượt trước tiên.

---

## Nhận diện

**P4. Tự tìm phong cách của dự án, để biết có theo hay không. Một phong
cách chỉ là "của dự án" khi nó có mặt trên bề mặt chính.**

Chạy `scripts/audit.sh` (`SKILL.md` câu 2), đọc số ở tầng 3:

| Kết quả | Kết luận |
| --- | --- |
| Tín hiệu có ở **từ 3 file component trở lên**, trên card, modal, header, sidebar | Đó là phong cách của dự án → **theo**, báo theo mẫu `P1` |
| Chỉ 1–2 file | Ngoại lệ cục bộ: một banner, một trang quảng bá. **Không** tính là phong cách của dự án, làm flat |
| Có token riêng cho nó (`--glass-bg`, `--gradient-*`, `--shadow-card`) | Tính là phong cách của dự án **dù đếm file ra ít**, vì có token là có chủ đích → **theo** |
| **Tối**: layout gốc có nền tối | Tính là phong cách của dự án **chỉ với một file đó**, vì nền tối chỉ nằm ở gốc → **theo** |
| **Màu**: nền, viền, chữ có sắc (chip tô màu nhấn nhạt, khối nền xanh nhạt, pill màu) ở **từ 3 file trở lên** | Dự án có ngôn ngữ màu → **theo**: màn mới dùng đúng những cách tô đó, không rút về xám (nguyên tắc "dự án đã có ngôn ngữ màu" ở đầu `principles.md`). Luật về nghĩa và đọc được vẫn giữ |
| Có token thang màu biểu đồ (`--chart-1`…) | Biểu đồ phân loại dùng thang đó (`components/charts.md`) |
| Dòng comment `/* Bộ mặt: … (P13) */` ở khối font, hoặc `force-dark` trên khung sidebar | Dự án đã chốt một bộ mặt → **theo bộ đó** cho màn mới, không khuyên lại |
| Không tín hiệu nào đáng kể | Flat hoặc dự án trống → bộ mặt khuyên dùng nếu là màn trong app web (`P13`), còn lại flat (`P6`) |

Đếm ra để **quyết định theo dự án hay flat**. Ngưỡng 3 file là để một banner lẻ
không kéo cả màn sang phong cách khác.

Người dùng gửi **ảnh tham chiếu** thì đó là ca "tự nêu phong cách" của `P1`: nhận
diện bằng mắt theo dòng "Nhận ra từ ảnh" ở từng khối bên dưới, rồi làm theo luôn,
không hỏi. Có ảnh thì ảnh thắng code.

**P5. Phong cách chồng nhau thì áp cả hai khối. Codebase lẫn lộn thì theo phần
mới nhất.**

- **Glass + tối** là cặp rất hay gặp. Áp cả `P8` lẫn `P10`.
- **Nổi + gradient ở một điểm**: card nổi, chỉ gói đề xuất có gradient. Áp `P7`, còn `P9` chỉ áp cho đúng điểm đó.
- **Codebase lẫn lộn** (trang cũ flat, trang mới glass): theo phần **mới nhất** (xem ngày sửa file trong git), vì đó thường là hướng dự án đang đi tới. Lúc giao nói rõ khu nào đang dùng gì và mình đã theo bên nào.

---

## Từng phong cách

Mỗi khối có bốn phần: nhận ra, luật được đè, công thức, bẫy.

### P6. Flat đường tóc — mặc định của skill

**Luôn là mặc định**, trừ khi người dùng chọn khác theo `P1`. Toàn bộ các luật
`M` và `F` viết cho phong cách này. Không đè gì cả.

- **Nhận ra từ code:** không có `backdrop-blur`, không có gradient trên bề mặt, bóng không vượt `shadow-sm`, card có `border`.
- **Nhận ra từ ảnh:** nền xám nhạt, card trắng viền rất mảnh, gần như không có bóng.

### P7. Nổi — thứ bậc bằng bóng

- **Nhận ra từ code:** `shadow-md` trở lên trên card thường, card ít hoặc không có `border`.
- **Nhận ra từ ảnh:** card nổi lên khỏi nền bằng bóng mềm, gói đề xuất nổi cao hơn các gói còn lại.
- **Được đè:** `M13`, `M15`, `M29`. `F22` được đè một phần: card bấm được thì hover **tăng bóng** một bậc, vẫn không `scale`.

```html
<div class="rounded-2xl bg-surface shadow-card ring-1 ring-black/3 hover:shadow-md">
```

**Thang bóng, mỗi tầng một bậc, không hai tầng trùng nhau:**

| Tầng | Bóng |
| --- | --- |
| Card | `shadow-card` (token của `tokens.css`, nhẹ hơn `shadow-sm`) |
| Card bấm được, khi hover | `shadow-md` |
| Dropdown, popover | `shadow-popover` (= `shadow-lg`, `M15`) |
| Modal, panel trượt, **gồm sidebar trượt ở màn hẹp** | `shadow-modal` (= `shadow-xl`) |

**Bẫy**

- **Card với modal cùng bóng thì modal không còn nổi.** Thang trên tồn tại để lớp cao hơn luôn nổi hơn. Tăng bóng card lên `shadow-lg` là modal phải lên theo, và dropdown cũng vậy.
- **Bộ token bóng đủ bốn bậc, kể cả khi trang chưa có modal.** Sidebar trượt dưới `lg` là tầng modal, và nó chỉ hiện ở màn hẹp nên hay bị quên. Chỉ định ba token (card, card khi rê, popover) thì sidebar trượt nằm phẳng trên lớp phủ, không bóng, thấp hơn cả card phía sau. Probe báo "Panel, modal mở ra không nổi hơn trang".
- **`ring-1 ring-black/3` đi cùng bóng là hợp lệ ở đây.** Nó vạch mép card cho sắc nét trên nền trắng. **Không lên `ring-black/5` + `shadow-sm`**: trên nền trang xám, hai thứ cộng lại thành một nét xám quanh card, đọc như viền đậm (chủ dự án chê, 07/11/2026). Bỏ hẳn ring thì mép card nhòe vào nền. Đây là chỗ đè `M29`: ở flat thì viền với bóng không đi cùng nhau, ở phong cách nổi thì được.
- **Ở nền tối, bóng một mình khó thấy.** Dự án nổi mà có dark mode thì ở chế độ tối giữ thang bóng, đậm hơn, thêm viền 1px (`ring-1 ring-white/10`), và bề mặt sáng dần theo tầng (`M21`, `M23`). Ba thứ đi cùng nhau; đừng chỉ tăng bóng lên cho bằng được.
- `scale-105` khi hover làm chữ bị mờ trong lúc chuyển động. Chỉ tăng bóng, không phóng to.

### P8. Glass — kính mờ

- **Nhận ra từ code:** `backdrop-blur`, `backdrop-filter`, nền bán trong suốt `bg-white/10`, `bg-black/20`, viền `border-white/10`.
- **Nhận ra từ ảnh:** bề mặt trong mờ, thấy thấp thoáng màu hoặc ảnh phía sau, mép có một đường sáng mảnh.
- **Được đè:** `F19`, `M13` (viền chuyển thành viền trắng mờ), `M15`, `M1`.

```html
<!-- Nền tối -->
<div class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

<!-- Nền sáng -->
<div class="rounded-2xl border border-white/50 bg-white/60 shadow-sm backdrop-blur-xl">

<!-- Trình duyệt không hỗ trợ blur thì rơi về nền gần đặc -->
<div class="bg-white/90 supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:backdrop-blur-xl">
```

**Bẫy**

- **Kính mà phía sau không có gì thì chỉ là một card xám.** Đây là phần của `F19` vẫn còn nguyên giá trị: blur chỉ có nghĩa khi phía sau có ảnh, gradient hay nội dung cuộn qua. Dự án glass mà màn mới có nền trơn thì **phải có thứ gì đó phía sau**, thường là lớp gradient nền của dự án. Đừng đặt kính lên nền phẳng.
- **Tương phản trượt theo thứ nằm phía sau** (`P3`). Kính của mình có thể đạt chuẩn trên nền tối nhưng trượt khi người dùng cuộn qua một ảnh sáng. Đo ở chỗ tệ nhất. Không đạt thì tăng độ đục của nền kính, đừng tăng độ đậm chữ.
- **Blur tốn GPU, nhất là trên mobile.** Chi phí tăng theo diện tích nhân với số lớp chồng nhau. Dùng cho header, sidebar, modal, và một đến ba card nổi bật. **Không** dùng cho từng dòng trong một danh sách dài đang cuộn, vì trang sẽ giật.
- **Luôn có fallback** như dòng thứ ba ở trên. Không hỗ trợ blur mà nền vẫn `/5` thì chữ nằm trên nền gần như trong suốt.
- Viền trắng mờ là **bắt buộc**. Thiếu nó thì mép kính tan vào nền và khối không có hình.

### P9. Gradient và màu thương hiệu đặc

- **Nhận ra từ code:** `bg-gradient-*`, `bg-linear-*` (Tailwind v4), `linear-gradient`, `radial-gradient` trên card hay nút; hoặc cả card đổ màu thương hiệu đặc.
- **Nhận ra từ ảnh:** gói đề xuất đổ gradient hoặc màu thương hiệu cả khối, nút có chuyển màu.
- **Được đè:** `M12`, và tỉ lệ `M2`.

**Không đè `M3`.** Gradient vẫn đi từ **màu nhấn của dự án**. Ba gói ba gradient
ba màu là ba màu nhấn, tức là trượt `M3` và `I3` cùng lúc.

```html
<!-- Gói đề xuất: đổ màu cả khối, nút đảo màu -->
<div class="rounded-2xl bg-linear-to-br from-primary to-primary-hover text-primary-foreground">
  <button class="bg-surface text-foreground">Chọn gói này</button>
</div>
```

**Bẫy**

- **Gradient ở mọi nơi thì không nơi nào nổi.** Gradient là cách nói "chỗ này quan trọng nhất". Dùng cho **một** loại bề mặt: gói đề xuất, hoặc nút chính. Không phải cả hai, và không phải mọi card. Đây là phần của `M2` vẫn còn nguyên.
- **Gradient không `transition` được.** `transition-colors` không nội suy được `background-image`, nên hover sẽ nhảy cái rụp hoặc không đổi gì. Làm hover bằng `hover:brightness-110` kèm `transition-[filter]`, hoặc bằng một lớp phủ đổi độ đục.
- **Chữ trên gradient đo ở đầu nhạt nhất** (`P3`). Đạt ở giữa không có nghĩa là đạt ở góc.
- **Nút nằm trên khối đã đổ màu thì đảo màu**: nền `--surface`, chữ `--foreground`. Nút màu nhấn đặt trên nền màu nhấn thì biến mất.
- Gradient trải trên diện tích lớn dễ bị **sọc** (banding). Giữ hai điểm màu gần nhau, hoặc thu vùng gradient nhỏ lại.

### P10. Tối là chính

- **Nhận ra từ code:** nền gốc tối (`bg-zinc-950`, `bg-black`, `bg-neutral-900`) trên `body` hoặc layout, ít hoặc không có biến thể `dark:`, hoặc có `color-scheme: dark`.
- **Nhận ra từ ảnh:** nền đen hoặc gần đen là mặc định, không phải một chế độ bật lên.
- **Được đè:** `M1`, `M20`, `M23`. Dự án dùng xám kẽm thì giữ xám kẽm, đừng đổi sang navy.
- **Vẫn áp:** `M21`, `M22`. Hai luật đó viết cho nền tối, và nền tối ở đây là nền chính.

**Bẫy**

- **Đừng đen tuyệt đối với trắng tuyệt đối.** `#000` với `#fff` chênh nhau quá gắt, chữ bị nhoè sáng khi đọc lâu. Dùng nền gần đen (`zinc-950`) và chữ gần trắng (`zinc-100`).
- **Độ đậm chữ giữ nguyên như bản sáng.** Thứ bậc chữ ở nền tối đi bằng **độ sáng**: chữ chính gần trắng, chữ phụ xám sáng hơn tỉ lệ so với bản sáng (`--muted` tối `#8b93a7`, 6.6:1). Không bộ thiết kế lớn nào hạ độ đậm ở nền tối; font nào trông dày quá thì đo bằng mắt trên chính font đó, không hạ theo luật.
- **Thứ bậc bằng bề mặt sáng dần theo tầng, cộng viền và bóng.** Nền trang tối nhất, card sáng hơn một bậc, lớp nổi sáng hơn nữa (`M21`). Bóng vẫn giữ nhưng đậm hơn và đi cặp viền 1px, vì một mình bóng ở nền tối khó thấy (`M23`).
- Viền `border-white/10` gánh việc tách khối (`M23`), vì các bề mặt tối chênh nhau quá ít.
- Vùng tô (nút phụ, mục đang chọn, nền rê) là trắng phủ mờ, sáng hơn card (`M21`).
- Ảnh và avatar cần `ring-1 ring-white/10`. Thiếu nó thì ảnh tối tan vào nền.

### P11. Neumorphism và 3D — nhận ra, theo, nhưng vá tương phản

- **Nhận ra neumorphism:** mỗi khối có **hai** bóng ngược hướng (một sáng một tối) trên nền **cùng màu** với chính nó.
- **Nhận ra 3D:** icon và minh hoạ dựng hình khối, kiểu clay, có ánh sáng và đổ bóng.

**Neumorphism trượt `P3` theo cấu trúc.** Khối cùng màu với nền nên nút gần như
vô hình, và trạng thái bấm với không bấm khó phân biệt. Theo phong cách của họ,
nhưng **nút chính phải có màu nhấn hoặc viền đạt 3 : 1**, và trạng thái đang
chọn phải khác bằng một thứ ngoài bóng.

**3D thường nằm ở minh hoạ, không phải ở khung giao diện.** Coi icon 3D như ảnh,
cùng lý do với ngoại lệ avatar của `M12`. Khung (card, nút, ô nhập) theo phong
cách nền của dự án. Đừng tự dựng nút 3D vì thấy dự án có icon 3D.

---

### P12. Có màu — hai công thức: trang lướt để chọn, và dashboard

Flat thuần đọc ra "buồn màu" ở hai chỗ: trang người dùng cuối lướt để chọn (tìm việc, tìm
phòng, sản phẩm, khoá học), trang nào cũng như trang quản trị (chủ dự án thấy); và dashboard dự án mới chưa có brand, màu nhấn
gần đen nên chọn "Màu" vẫn trắng đen. Hai chế độ dựng lại đưa nó thành dòng Có màu
(`review.md`, `V1d`); người dùng tự xin trong đề thì dựng theo công thức dưới; ngoài hai chỗ đó thì
theo `P1`. Wireframe không có nấc Có màu (`wireframe.md`, `U3`).

- **Nhận ra từ ảnh:** đầu trang là một dải màu đậm (đặc hoặc chuyển màu) ôm header và ô tìm,
  chân trang cùng màu; vài mục trong danh sách có nền nhạt màu nhấn kèm nhãn "Gấp", "Hot";
  tiêu đề mục đậm.
- **Được đè:** `M2` (tỉ lệ 95/5), `M12` (chỉ ở dải). Chỗ đè `M4` của dashboard nằm ở `P17`.
  Nguyên tắc `P2` giữ nguyên, nhất là `M3` một màu nhấn cho hành động và `P3`
  tương phản.

**Công thức A, trang lướt để chọn**, đúng năm chỗ, không thêm chỗ thứ sáu:

| Chỗ | Làm gì |
| --- | --- |
| Dải đầu trang | Khối bọc header + ô tìm (hay hàng tên trang) nền màu nhấn đậm: `bg-primary`, hoặc `bg-linear-to-r from-primary to-primary-hover` (hai điểm gần nhau, `P9`). Chữ, link header trắng; ô tìm nền trắng; nút Tìm đảo màu (`bg-surface text-foreground`, `P9`). Dải hết ở dưới hàng tìm, nội dung bắt đầu trên nền trang như cũ, không kéo card lấn lên dải bằng số âm (`N11`) |
| Chân trang | Cùng màu dải, chữ trắng. Trang không có chân thì bỏ |
| Mục nổi bật | **Chỉ khi dữ liệu có trường đó** (gấp, hot, được tài trợ): nền `bg-primary/5`, viền `border-primary/25`, nhãn đặc `bg-primary text-primary-foreground` ở góc. Không có trường thì không bịa, lúc giao ghi "cần trường … để làm mục nổi bật" |
| Chữ | Tiêu đề mục `font-semibold`; tên trang giữ `text-xl` (luật đã chốt 11) mà lên `font-semibold`, từ khoá hay con số trong tên trang tô `text-primary`; tiêu đề khối trong panel chi tiết `text-lg font-semibold`. Giá, lương giữ `font-semibold` như cũ |
| Điểm nhỏ | Chấm đầu dòng danh sách trong chi tiết `marker:text-primary`; ô chữ viết tắt thay logo nền `bg-primary/10 text-primary` thay cho xám |

**Công thức B, dashboard và trang làm việc trong app**: đã thành nấc **Tinted** của `P17`. Không
dải màu, không mục "hot" (lạc loài ở trang báo cáo). Đề xin "có màu" cho dashboard thì dựng Tinted,
xin rực hơn thì Vivid.

Badge trạng thái khi người dùng xin "badge có màu" (cả hai công thức): đỏ, hổ phách, xanh lá giữ
nghĩa `M7`. Các trạng thái xám (đang chạy đúng luồng) mới được lấy sắc phân loại (`--cat-*` hay bảng
sắc của dự án), và **các sắc trong một bảng trạng thái cách nhau từ ~45° trên vòng màu**, không lấy
hai sắc kề nhau: `sky`–`blue` (~23°), `blue`–`indigo`, `indigo`–`violet`, `emerald`–`teal`. Không trùng
sắc màu nhấn (nút chính teal thì không badge teal). Không đủ sắc cách xa thì trạng thái nhiều dòng
nhất (thường là bước bình thường nhất, vd "Đã xác nhận") giữ xám: một danh sách toàn một màu badge là
mảng màu, không còn phân biệt. Sai: "Đã xác nhận" `sky-700` cạnh "Đang khám" `blue-700`, liếc ra một
màu xanh.

**Bẫy**

- **Sắc phân loại không mang nghĩa trạng thái**: đỏ, hổ phách, xanh lá để dành cho `M4`. Ô icon
  "Chờ duyệt" không tô hổ phách chỉ vì "chờ"; tô theo bộ sắc phân loại.
- **Chip lọc đang chọn không đặc màu nhấn** khi đã có dải: sáu chip đặc cam dưới một dải cam là
  hai mảng cùng nặng tranh nhau. Chip theo `layouts/overlay.md` (nền `foreground/10` + `inset-ring`).
- **Nổi bật tối đa khoảng một phần năm danh sách.** Mục nào cũng hot thì không mục nào hot (`M2`).
- **Mục nổi bật vẫn khác mục đang chọn**: đang chọn giữ nền của `I10`, không trùng `bg-primary/5`.
- Tương phản chữ trắng trên dải đo ở đầu nhạt nhất (`P3`); màu nhấn nhạt (vàng, cam sáng) thì dải
  dùng `primary-hover` hay một bậc đậm hơn, chữ vẫn trắng.

### P13. Bộ mặt dashboard — các trục, mười bộ có tên, khuyên theo người dùng

Flat, Inter và màu nhấn gần đen là mặc định trung tính. Mặc định ấy đúng cho từng dự án,
nhưng ba dashboard khác ngành dựng liền nhau thì ra cùng một mặt (chủ dự án:
khách khen UX, rồi chê UI ba dự án nhìn như nhau). Bố cục giống nhau là chuyện bình thường,
vì app nào cũng sidebar, header, card số liệu, bảng (quy ước). Thứ làm hai app trông khác
nhau là **bộ mặt**.

**Bốn trục, chọn riêng từng trục** (chủ dự án). Gộp mọi thứ vào một tên thì kiểu
mới chỉ khác một trục (sidebar trong suốt, nội dung trong khối bọc) không có chỗ đứng; gộp điều
hướng với vùng chứa vào một trục thì không ghép được dải icon với khối bọc, trong khi nhiều app
làm đúng như vậy.

| Trục | Quyết định | Các giá trị |
| --- | --- | --- |
| **Điều hướng** (nav) | Mục chính của app nằm ở đâu, dạng gì | `sidebar`: cột có chữ (`layouts/app.md`, Khung app có sidebar), biến thể `sidebar-dark` mang `force-dark` (`M33`) · `rail`: dải icon, biến thể `rail-labeled` icon trên chữ dưới (Dải icon) · `topnav`: hàng link trong header, không sidebar (Menu ngang) |
| **Vùng chứa** (container) | Nền nào, khối nào chứa nội dung | `classic`: điều hướng trắng, nội dung trên nền xám · `inset`: điều hướng trên nền trang, nội dung trong một khối trắng bo góc (Khung bọc) · `unified`: một mặt phẳng trắng, ngăn bằng đường kẻ (Một mặt phẳng) · `floating`: sidebar là khối trắng tách mép, chỉ với `sidebar`, `rail` (Sidebar nổi) · `canvas`: một mặt phẳng xám, card trắng là bề mặt duy nhất (Mặt nền mở) |
| **Header** | Header của trang chạy tới đâu | `content` (mặc định): header nằm trên vùng nội dung, đầu điều hướng có logo · `full`: header chạy hết bề ngang màn, logo và ô tìm ở đó, điều hướng bắt đầu dưới header (Header toàn màn). `topnav` luôn là `full` |
| **Bề mặt** (surface) | Nền, viền, bóng, chữ lớn | Flat `P6` · Nổi `P7` · Tối `P10` · Không viền `P14` · Xếp lớp `P15` · Editorial `P16` |
| **Font** (`--app-font`) | Chữ cả app | Inter · Be Vietnam Pro · IBM Plex Sans |
| **Sắc** ⚑ | Màu gắn với dữ liệu tới đâu | `neutral` (mặc định) · `tinted` · `vivid` (`P17`). Không nằm trong mười bộ, ghép với bộ nào cũng được |

Ghép điều hướng với vùng chứa theo mục **Ghép điều hướng với vùng chứa** trong
`layouts/app/shell.md`: tổ hợp nào chạy được, tổ hợp nào không (`topnav` + `floating` không có sidebar
để nổi).

Bố cục nội dung (bảng trước, kanban, lịch, card) **không** nằm trong bộ mặt: đó là phương án
của wireframe (`U3`), chọn theo việc chính của màn (`U2`).

**Mười bộ có tên.** Tên tiếng Anh, giữ nguyên cả khi đề viết tiếng Việt (chủ dự án: "Gọn, Mềm,
Đêm người dùng đọc không hiểu"). Bộ là tổ hợp đã kiểm của các trục; header mặc định `content`:

| Bộ mặt | Điều hướng | Vùng chứa | Bề mặt | Font | Hợp khi người dùng ở `U1` là |
| --- | --- | --- | --- | --- | --- |
| **Clean** | `sidebar` | `classic` | Flat `P6` | Inter | Người làm việc với bảng và số ở văn phòng: công cụ nội bộ, B2B, kế toán, quản trị nhiều bảng |
| **Dark Sidebar** | `sidebar-dark` | `classic` | Flat `P6` ở vùng nội dung | Inter | Người mở phần mềm cả ngày, chuyển module liên tục: CRM, kho, nhân sự, phòng khám, đặt lịch |
| **Soft** | `sidebar`, không viền | `classic`, biến thể mở `canvas` ⚑ | Nổi `P7` | Be Vietnam Pro | Chủ shop, spa, người không rành máy, mở app giữa giờ làm: ít bảng, nhiều card, nhiều ảnh. Màn toàn card (không bảng chạy hết bề ngang) thì biến thể mở |
| **Midnight** | `sidebar` | `classic`, theo nền tối | Tối `P10` | IBM Plex Sans | Người trực theo dõi số cả ca: vận hành thời gian thực, giao dịch, giám sát |
| **Inset** ⚑ | `sidebar` | `inset` | Flat `P6`, biến thể Xếp lớp `P15` ⚑ | Inter | Người làm việc nhiều view trên cùng dữ liệu (board, danh sách, tổng quan) cả ngày: quản lý việc, hoá đơn, dự án, công cụ SaaS dùng hằng ngày |
| **Paper** ⚑ | `sidebar` | `unified` | Flat `P6`, khối tách bằng đường kẻ; biến thể Không viền `P14` ⚑ | Inter | Người đọc bảng, danh sách dài chạy hết bề ngang, gần như không card: danh sách việc, ticket, CRM dạng bảng, kho tài liệu |
| **Float** ⚑ | `sidebar` | `floating` | Flat `P6` | Inter | Đội nội dung, marketing, sáng tạo xem nhiều card và ảnh: lịch đăng bài, thư viện ảnh, quản lý chiến dịch |
| **Rail** ⚑ | `rail` hoặc `rail-labeled` | `classic` | Flat `P6` | Inter | Cần bề ngang cho nội dung, app ít mục chính: bản đồ điều phối, lịch, trình soạn, giám sát, công cụ cho lập trình viên. Người dùng thành thạo mở app cả ngày thì chỉ icon (tới 8 mục); chưa thuộc icon, vài lần một tuần thì có nhãn (tới 7 mục) |
| **Topbar** ⚑ | `topnav` | `classic` | Flat `P6` | Inter | Người ghé vài lần một tuần để xem số hay làm một việc, app từ 6 mục chính trở xuống, không nhóm menu: cổng khách hàng, báo cáo đơn giản, app của chủ shop nhỏ |
| **Editorial** ⚑ | `topnav` (quá 6 mục thì `sidebar`) | `unified` | Editorial `P16` | Inter | Người **đọc** số nhiều hơn thao tác: chủ doanh nghiệp, quản lý xem báo cáo tuần, tổng quan tài chính, trang tổng kết cho nhà đầu tư. Màn chủ yếu là số và biểu đồ, ít form |

**Ngoài mười bộ**: skill chỉ khuyên mười bộ trên. Tổ hợp khác (dải icon trong khối bọc, header
toàn màn với sidebar trắng) chỉ khi người dùng tự xin hoặc gửi ảnh tham chiếu: đọc ảnh ra từng
trục rồi ghép theo `layouts/app.md`, ghi đủ các trục vào `DESIGN.md`. **Header `full`** hợp khi
app có ô tìm toàn cục là việc chính hay có nút đổi workspace; khi còn cờ ⚑ thì chỉ nhắc một dòng
lúc giao ("muốn header chạy hết bề ngang cho ô tìm thì nói"), không tự dựng.

Màu nhấn đứng riêng, không nằm trong bộ mặt: dự án có brand thì giữ brand, chưa có thì nhóm
Nhấn của wireframe (`U3`) hay màu đầu của nhóm đó. Bộ mặt bám **người dùng**, màu nhấn gợi ý bám
**ngành** (`brand-tokens.md`): hai thứ chọn riêng. Bộ mặt nào cũng ghép được với màu nào. Sắc
(`P17`) cũng đứng riêng như vậy: mặc định Neutral, không theo bộ mặt.

**Dùng khi:** màn trong app web, dự án flat hoặc trống (`P4`), đề không nêu phong cách. Dự
án có phong cách riêng, có ảnh tham chiếu, đề nêu kiểu, hay chế độ giữ brand thì không dùng
bảng này (`P1`). App điện thoại theo `mobile.md`, không theo bảng này: bộ mặt của nó ở `J15` (`mobile/faces.md`).

**Bộ và biến thể còn cờ ⚑ không được tự khuyên** (chủ dự án): Inset, Paper, Float,
Rail, Topbar, Editorial; biến thể Soft mở, Paper không viền, Inset xếp lớp; header `full`. Chúng
chưa qua test ở dự án thật. Skill chỉ tự khuyên trong bốn bộ đã kiểm: **Clean, Dark Sidebar,
Soft (biến thể `classic`), Midnight**, nên người đang dùng bản cũ không thấy hành vi mặc định đổi.
Bộ có cờ vẫn dùng được khi người dùng tự chọn trong nhóm Kiểu của wireframe, tự xin trong đề, hay
gửi ảnh tham chiếu. Bộ nào qua test thì gỡ cờ ⚑ ở bảng trên, từ đó mới vào danh sách tự khuyên.

**Chọn bộ nào** ⚑: khuyên **một** bộ trong các bộ không cờ, bám người dùng ở `U1`, không bám ngành. Spa mà người mở
app là kế toán đối soát cả ngày thì Clean, không phải Soft. Nếu không đọc được người dùng là ai
thì Clean. Không hỏi (`P1`):

- Nhánh `U` có wireframe: nhóm Kiểu liệt kê mười bộ, **mặc định là bộ khuyên dùng**, khung lý
  do một dòng vì sao cho từng bộ (`wireframe.md`, `U3`).
- "Dựng luôn" và chế độ dựng lại theo gu skill: dựng bộ khuyên dùng, báo một dòng lúc giao.
- Mẫu dòng báo, nói bằng người dùng chứ không bằng tính từ: *"Bộ mặt: **Soft** (card nổi, font
  Be Vietnam Pro) vì chủ spa mở app giữa ca, xem card lịch hẹn nhiều hơn bảng. Muốn kiểu khác
  thì nói: Clean, Dark Sidebar, Midnight, Inset, Paper, Float, Rail, Topbar, Editorial."* Không viết "hiện đại", "sang".

**Ghi lại bộ đã chọn** để màn sau giữ đúng (`P1`, `P4`): dòng Bộ mặt trong `DESIGN.md`
(`system.md`, `D10`) ghi cả tên bộ lẫn ba trục, cộng một dòng comment ngay trên khối font của
file token, `/* Bộ mặt: Soft (P13) */`. Thiếu cả hai thì màn sau audit ra "flat có bóng", khuyên
lại từ đầu, hai màn hai mặt. `DESIGN.md` đã ghi bộ mặt thì theo đó, không khuyên lại. Dự án cũ
còn ghi tên tiếng Việt thì đọc theo bảng: Gọn = Clean, Sidebar tối = Dark Sidebar, Mềm = Soft,
Đêm = Midnight; sửa tại chỗ sang tên mới.

**Được đè:** luật gu flat của khối `P` tương ứng, cộng dòng "sidebar nền trắng" ở
`layouts/app/shell.md` cho Dark Sidebar, Inset, Paper, Float, Rail, Topbar. **Không đè:** toàn bộ cột Nguyên tắc của `P2`, gồm
`F1` bo góc và `P3` tương phản. Bộ mặt không đổi bố cục, không đổi component, không thêm khối.

**Font**: cả ba font có bộ `vietnamese` trên Google Fonts (đã kiểm 03/11/2026), vẫn kiểm bằng
mắt chữ "ữ", "ợ", "ằ" ở cỡ nhỏ nhất của màn (`T5`). Project thật nạp qua `@fontsource/inter`,
`@fontsource/be-vietnam-pro`, `@fontsource/ibm-plex-sans` (`brand-tokens.md`), chỉ bốn weight
400, 500, 600, 700. Đổi font chỉ là đổi dòng `--app-font`, không thêm font thứ hai.

**Bẫy**

- **Đừng tự chế bộ thứ mười một** bằng cách lấy font của Soft ghép khung của Midnight. Mười bộ là mười
  điểm xuất phát đã kiểm. Người dùng tự xin trộn ("Inset mà nền tối", "dải icon trong khối bọc")
  hay gửi ảnh tham chiếu thì làm theo họ, ghi đủ các trục vào `DESIGN.md`.
- **Dark Sidebar: cả khung mang `force-dark`, không tô từng phần tử.** Logo, badge số, ô tìm,
  hàng profile, tooltip lúc thu gọn đều đọc token tối. Tô tay `bg-zinc-900` cho riêng nền thì
  badge, ô tìm vẫn ra token sáng, nổi thành mảng trắng giữa cột tối. Logo dựng bằng token nên
  tự đúng trên nền tối (`components/logo.md`); logo ảnh của dự án thì cần bản nền tối. Dưới
  `lg` panel trượt vẫn tối, cùng khung.
- **Soft: Be Vietnam Pro rộng hơn Inter khoảng 3%** (đo nhãn tiếng Việt 14px,
  weight 500). Nhãn sidebar, tab, nút vừa khít ở Inter có thể bị cắt. Probe ở 1280 và đo cắt chữ
  theo `T14` sau khi đổi font, đừng đo ở Inter rồi mới đổi.
- **Soft vẫn đủ bốn bậc bóng của `P7`**, kể cả sidebar trượt dưới `lg`. Bóng ở card mà modal
  phẳng là lỗi của `P7`, không phải "mềm".
- **Midnight: đi hết bẫy của `P10`**, nhất là tiêu đề, tên sản phẩm đổi màu theo nền và chuỗi
  biểu đồ ở nền tối (`components/charts.md`).
- **Inset: nền rê, nền đang chọn của sidebar phải đổi theo nền trang.** `--item-hover` của
  sidebar trắng trùng đúng màu nền trang, đặt lên nền xám là rê vào không thấy gì. Theo mục
  Khung bọc trong `layouts/app/shell-inset.md`.
- **Paper: cả màn trắng thì mọi ranh giới là đường kẻ `--border-strong`.** `--border` (`#f7f7f8`)
  trên nền trắng gần như không thấy, khung app mất ranh giới. Khối nội dung không bọc card trắng
  (trắng trên trắng chỉ còn cái viền): tách nhóm bằng tiêu đề, khoảng trắng và đường kẻ, bảng chạy
  hết bề ngang. Theo mục Một mặt phẳng trong `layouts/app/shell-unified.md`.
- **Rail, Topbar có trần số mục**: Rail chỉ icon tới 8 mục chính, Rail có nhãn tới 7, Topbar tới
  6, cả ba không nhóm lồng.
  Đếm mục chính của app ở `U2` trước khi khuyên; vượt trần thì không khuyên hai bộ này, kể cả khi
  người dùng hợp. Người dùng tự chọn mà vượt trần thì làm theo, báo một dòng: Rail thì tooltip
  là cách duy nhất biết mục, Topbar thì mục thừa vào nút "Thêm".
- **Soft mở (`canvas`) cũng là biến thể, không phải bộ mới**: sidebar trong suốt, mục đang chọn
  là viên trắng có bóng nhẹ của `P7`, card trắng đặt thẳng trên nền xám (mục Mặt nền mở). Chỉ
  khi màn toàn card: bảng chạy hết bề ngang trên nền xám không có khối nào chứa thì trông như
  thủng. Ghi `Vùng chứa: canvas` vào `DESIGN.md`.
- **Paper không viền, Inset xếp lớp là biến thể, không phải bộ mới.** Paper không viền khi màn là
  danh sách, tài liệu đọc dọc, người dùng thành thạo đọc nhanh (`P14`); giữ bản kẻ khi màn có bảng
  nhiều cột phải dò theo dòng. Inset xếp lớp khi màn có nhiều vùng con lồng nhau (cột board, nhóm
  thẻ, panel bên) mà viền quanh từng vùng thành lưới khung (`P15`). Ghi `Bề mặt: borderless` hay
  `Bề mặt: layered` vào `DESIGN.md`.
- **Rail là một bộ, hai biến thể.** Người dùng chọn Rail thì chọn biến thể theo người dùng ở `U1`, ghi vào `DESIGN.md`
  (`Khung: rail-labeled`), lúc giao báo một dòng: *"Bộ mặt: **Rail** có nhãn vì chủ shop mở app
  vài lần một tuần, chưa thuộc icon. Muốn chỉ icon thì nói."*
- **Float không bóng.** Sidebar nổi bằng khoảng cách và nền trắng trên xám, không bằng
  `shadow`: bóng là của lớp nổi (`M15`). Muốn có bóng thì đó là Soft.

### P14. Không viền — tách nhóm bằng khoảng trắng và chữ ⚑

Biến thể của Paper (`P13`). Một mặt phẳng trắng, **hầu như không card, không đường kẻ**: nhóm
tách bằng khoảng trắng và tiêu đề. Đè luật card của `P6` cho khối nội dung, không đè control.

- **Khoảng giữa hai nhóm từ `mt-10` (40px)**, gấp ít nhất 2,5 lần khoảng trong nhóm. Không có
  đường kẻ thì khoảng trắng là tín hiệu duy nhất; hai khoảng gần bằng nhau thì người đọc không
  biết đâu là hết nhóm (`N3`).
- **Mỗi nhóm có tiêu đề** theo `T8`, cộng một câu phụ nếu cần. Không tiêu đề, không viền thì một
  nhóm chỉ là một mảng chữ trôi.
- **Ô số liệu không khung**: nhãn `text-sm text-muted` trên, số `text-2xl font-semibold
  tabular-nums` dưới, các ô cách nhau `gap-x-12`. Thêm khung là quay về Flat.
- **Bảng giữ một đường kẻ dưới hàng tiêu đề cột**, dòng không kẻ; dòng cao `h-12` và rê
  `hover:bg-surface-hover` toàn dòng. Bảng từ 6 cột trở lên, phải dò theo dòng thì không dùng
  biến thể này, giữ Paper kẻ.
- **Control giữ nguyên viền**: ô nhập, select, nút viền vẫn có viền. Không viền là cho khối chứa,
  không phải cho thứ bấm được: ô nhập không viền trên nền trắng là ô vô hình.
- **Đường kẻ khung app còn lại**: `border-r` sidebar, `border-b` header theo Một mặt phẳng; chỉ
  vùng nội dung bỏ kẻ.

### P15. Xếp lớp — tách vùng bằng tông nền, không viền ⚑

Biến thể của Inset (`P13`). Ba tầng nền chồng nhau, **không viền nào ở khối chứa**: chiều sâu
đến từ tông nền, không từ đường kẻ hay bóng.

| Tầng | Là gì | Sáng | Tối |
| --- | --- | --- | --- |
| 0 | Nền trang, điều hướng nằm trên | `--background` | `--background` |
| 1 | Khối bọc nội dung | `--surface` | `--surface` |
| 2 | Vùng con trong khối: cột board, nhóm, panel bên | `bg-foreground/4` | `bg-foreground/4` |
| 3 | Thẻ, dòng trong vùng con | `--surface` | `--secondary` (lớp trắng 8% chồng lên tầng 2) |

- **Tầng sau sáng hơn tầng trước ở nền tối** (`P10`). Tầng 2 dùng `foreground/4` vì nó tự đảo theo
  nền. Thẻ tầng 3 ở nền tối **không** dùng `--surface` (tối hơn vùng chứa, trông như bị khoét) và
  **không** dùng `--surface-overlay`: nó chỉ chênh tầng 2 khoảng 1 bậc, thẻ tan vào cột (đo trên
  trang mẫu). Dùng `--secondary`, lớp trắng 8% chồng lên tầng 2, chênh ~18 bậc.
- **Hai tầng kề nhau chênh ít nhất ~8 bậc độ sáng** (đo: sáng 11, 8, 8; tối 10, 9, 18); chênh ít hơn thì ranh giới biến mất, người
  ta lại thêm viền. Không thêm tầng thứ năm: bốn tông xám lồng nhau là bẩn.
- **Bỏ viền khối bọc, viền thẻ, viền vùng con.** Control giữ viền như `P14`.
- **Vùng con bo lớn hơn thẻ bên trong một bậc** (`F1`, bo lồng nhau): vùng `rounded-2xl p-2`, thẻ
  `rounded-xl`.

### P16. Editorial — chữ lớn, lưới chặt, tương phản cao ⚑

Bề mặt của bộ **Editorial** (`P13`). Trang đọc như một bản báo cáo in: **số và chữ là thứ nặng
nhất**, không card, không nền màu.

- **Thang chữ lớn hơn `budgets.md` một nấc cho tiêu đề và số**: tên trang `text-3xl
  font-semibold tracking-tight`, số chính `text-5xl font-semibold tabular-nums tracking-tight`,
  số phụ `text-2xl`. Chữ thân vẫn `text-sm` (`T6`): chỉ tiêu đề và số lớn lên.
- **Nhãn nhỏ IN HOA**: `text-xs font-medium uppercase tracking-wider text-muted` trên mỗi số, mỗi
  nhóm. IN HOA bằng CSS, chữ trong dữ liệu vẫn viết thường (như nhãn nhóm sidebar).
- **Mỗi phần mở bằng một đường kẻ đậm** `border-t border-foreground` chạy hết bề ngang lưới, tên
  phần ngay dưới. Đây là chỗ duy nhất được kẻ màu `--foreground`; dòng trong bảng vẫn
  `--border-strong`. Kẻ đậm khắp nơi thì không còn gì nổi.
- **Lưới 12 cột chặt**: mọi khối bắt đầu và kết thúc ở mép cột, khoảng giữa cột đều `gap-x-8`.
  Không card nên mép cột là thứ duy nhất giữ trật tự.
- **Biểu đồ đơn sắc cộng một màu nhấn**: chuỗi chính `--foreground`, chuỗi so sánh xám, màu nhấn
  chỉ cho một điểm cần chú ý (`components/charts.md`). Không lưới nền dày. **Nền tối chuỗi chính hạ
  còn 70%** (`color-mix(in srgb, var(--foreground) 70%, transparent)`, khai một token cho cả biểu đồ,
  chú giải, thanh trong bảng), như `--chart-fill` (`M32`): `--foreground` nguyên là gần trắng, bảy cột
  thành khối chói nhất màn, điểm nhấn cam bên cạnh không còn nổi (bản dựng thử báo cáo tuần).
- **Sắc**: Editorial chỉ đi với Neutral (`P17`). Trong một app đã chọn Tinted, trang Editorial vẫn
  bỏ `--cat-*`: bảng chia theo kênh dùng thanh `--foreground`, không chấm màu kênh.
- **Không trang trí in ấn**: không vạch cắt góc, không ký hiệu, không số trang giả. Editorial là
  thứ bậc chữ, không phải đạo cụ.

### P17. Sắc — trục thứ năm của bộ mặt: Neutral, Tinted, Vivid ⚑

Bộ mặt nào cũng ra trung tính: màu chỉ có ở nút chính, mục đang chọn và badge trạng thái.
Muốn một dashboard nhiều màu, người dùng phải gửi ảnh và viết đề dài (chủ dự án).
Các dashboard nhiều màu mà vẫn dễ đọc không tô bừa: **màu nào cũng gắn với một thứ trong dữ liệu**,
ở ba tầng: **nghĩa** (mức độ, trạng thái), **phân loại** (loại việc, người phụ trách, nguồn), và
**nhấn thương hiệu** (gradient ở một hai chỗ). Sắc là số tầng được bật. Trục này đứng riêng
giống màu nhấn, ghép được với mọi bộ mặt (`P13`).

| Nấc | Bật tầng | Hợp khi |
| --- | --- | --- |
| **Neutral** (mặc định) | Như hiện tại: `M4`, `charts.md` | Mọi dự án, khi đề không xin màu |
| **Tinted** ⚑ | Nghĩa + phân loại | Dữ liệu có loại rõ (loại việc, agent, bộ phận, nguồn) hay có mức độ (sự cố, ưu tiên); người dùng xin "nhiều màu", "sinh động", "colorful" |
| **Vivid** ⚑ | Nghĩa + phân loại + gradient nhấn | Sản phẩm cho người dùng cá nhân, giáo dục, sáng tạo; trang tổng kết muốn khoe kết quả; người dùng xin "rực", "gradient", "vivid", "trẻ trung" |

**Token, không chọn màu tại chỗ.** Sắc phân loại là `--cat-1`…`--cat-6`, gradient nhấn là
`--primary` → `--accent-to`, khai trong khối Sắc của `tokens.css` (cả bản tối). Điểm cuối gradient
lấy theo bảng "Gradient nhấn" của `brand-tokens.md`, không tự chọn. Viết hex hay `bg-blue-50` tại
chỗ thì mỗi màn ra một bảng màu, dark mode không lật theo.

**Tinted**: đè `M4` và câu "con số để nguyên màu chữ chính" của `charts.md`, **chỉ** ở các chỗ dưới:

| Chỗ | Làm gì |
| --- | --- |
| Ô icon card số liệu | Ô `size-8 rounded-lg bg-cat-N/10 text-cat-N`, icon lucide `size-4`, mỗi card một sắc theo thứ tự `cat-1`…`cat-4`. Con số vẫn `text-foreground` |
| Ô icon đầu dòng **theo loại** | Loại việc, agent, bộ phận, nguồn: cùng kiểu ô, **một loại một sắc cố định trên mọi màn** (Chấm bài luôn `cat-1`). Ghi bảng gán loại → sắc vào `DESIGN.md` để màn sau giữ. Dữ liệu không có loại thì không ô |
| Ô icon đầu dòng **theo mức độ** | Danh sách mà mức độ là thứ người dùng quét trước (sự cố, ticket, cảnh báo): ô tô theo bảng trạng thái `M7`: mức cao `bg-error-bg text-error-strong` (đỏ lỗi, không phải `--danger` của nút xoá, `M30`), mức vừa `bg-warning-bg text-warning`. **Dòng đã xong, đã đóng thì ô về xám**: chỉ thứ còn mở mới có màu, nên liếc là thấy còn bao nhiêu việc |
| Người, agent phụ trách | Ô vuông nhỏ `size-5 rounded-md` theo sắc của loại agent, đặt cạnh avatar. Avatar ảnh giữ nguyên |
| Badge mức độ, trạng thái | Badge `M7` thêm chấm `size-1.5 rounded-full` cùng màu đứng trước chữ. Mức thấp, "xong" bình thường thì xám (`M4`) |
| Một số liệu cần chú ý | **Tối đa một số mỗi hàng card số liệu** được tô màu trạng thái, chỉ khi đang ở mức báo động (còn sự cố mở, vượt ngân sách). Về mức bình thường thì lại `text-foreground`. Bốn số bốn màu vẫn là lỗi |
| Biểu đồ | Cột chồng theo mức độ dùng màu trạng thái (cao `--error`, vừa `--warning`, thấp `slate-300`, bản tối `slate-600`). Theo loại thì `--cat-*` theo thứ tự loại. Một chuỗi vẫn `--chart-fill` (`charts.md`) |
| Mục đang diễn ra | Lịch, ca, tiết học, kỳ hiện tại: vạch trái `w-0.5 bg-primary` + nhãn giờ `text-primary`. Mục khác vạch `--border-strong` |

**Vivid** = Tinted, thêm gradient nhấn và vệt loang. Đè `M12` (`P9`), **chỉ** ở các chỗ dưới:

| Chỗ | Làm gì |
| --- | --- |
| Nút chính | `bg-linear-to-r from-primary to-accent-to`, hover theo bẫy của `P9` (`hover:brightness-110`, `transition-[filter]`). Vẫn chỉ một nút chính mỗi vùng (`I3`) |
| Khối hero | **Một khối mỗi màn**: số tổng kết, kết quả nổi bật nhất. Viền gradient 1px: `border border-transparent [background:linear-gradient(var(--surface),var(--surface))_padding-box,linear-gradient(to_right,var(--primary),var(--accent-to))_border-box]`. Nền vẫn `--surface`, chữ vẫn `--foreground` |
| Nhãn thành tích | Trong khối hero, khi dữ liệu có (kỷ lục, vượt mục tiêu): pill gradient chữ trắng. Không dữ liệu thì không bịa |
| Một điểm trên biểu đồ | Kỳ đang chọn hay kỳ cao nhất: cột gradient dọc, hoặc chấm điểm `bg-primary` có nhãn số. Các cột khác `--chart-fill/15` |
| Vệt loang | Tối đa **hai** khối mỗi màn, chỉ khối giải thích, gợi ý ở cột phụ hay hàng profile cuối sidebar: `bg-linear-to-b from-primary/8 to-transparent` ở ~96px đầu khối. Không ở card có bảng |
| Thanh tiến độ theo loại | Mỗi loại một `--cat-*`, cùng thứ tự với chú giải |

**Gán sắc phân loại**

- `cat-1`…`cat-4` cho ô icon (tối đa bốn sắc một màn), `cat-5`, `cat-6` chỉ cho biểu đồ 5–6 nhóm.
  Loại thứ năm trở đi trong ô icon thì xám, hoặc gộp loại.
- **Sắc nào cách `--primary` dưới ~30° trên vòng màu thì bỏ qua**, lấy sắc tiếp theo (nút chính tím
  thì không ô icon tím). Đo bằng cột "Hướng màu" của `brand-tokens.md`.
- **Sắc phân loại chỉ cho icon, chấm, mảng biểu đồ, thanh tiến độ, không cho chữ.** Bản 600 trên nền
  nhạt chỉ đạt 3.3–5.4 : 1, đủ cho icon (3 : 1), thiếu cho chữ nhỏ (`P3`). Chữ trong badge vẫn theo
  bảng trạng thái `M7`.
- Bảng sắc tránh đỏ, hổ phách, xanh lá (để dành cho trạng thái). Ô "Chờ duyệt" không tô hổ phách
  chỉ vì "chờ": đó là loại, không phải mức.
- **Một thứ chỉ mang một loại màu**: thanh tiến độ, số vượt, quá hạn vẫn tô theo `M4`; thanh ngân
  sách của bộ phận Kỹ thuật không tô `cat-2` chỉ vì Kỹ thuật là `cat-2`.

**Chọn nấc nào** ⚑: Tinted, Vivid chưa qua test ở dự án thật nên **không tự khuyên**: mặc định
Neutral ở mọi lối. Chỉ bật khi:

- Đề có chữ xin màu: "nhiều màu", "có màu hơn", "sinh động", "colorful" → Tinted; "rực",
  "gradient", "vivid", "trẻ trung", "nổi bật hẳn" → Vivid. Không hỏi lại (`P1`).
- Người dùng chọn trong nhóm Sắc của wireframe (`wireframe.md`, `U3`).
- Ảnh tham chiếu có màu kiểu này: đọc ảnh ra nấc gần nhất, dựng theo bảng trên, không chép từng mã
  màu của ảnh.
- Hai chế độ dựng lại: dòng Có màu (`V1d`) của dashboard là Tinted.

Lúc giao màn Neutral dashboard có dữ liệu phân loại, báo một dòng nói bằng vấn đề, theo mẫu:
*"Màn đang trung tính. Muốn mỗi loại việc một màu, sự cố còn mở có màu riêng cho dễ quét thì
nói 'Tinted'; muốn thêm gradient ở nút chính và khối tổng kết thì nói 'Vivid'."*

**Ghép với bộ mặt**: mười bộ ghép được với cả ba nấc, trừ **Editorial chỉ đi với Neutral**: nó là
bộ đơn sắc có chủ đích (`P16`). Người dùng tự chọn Editorial kèm Tinted thì làm theo, báo một dòng.
Midnight và Vivid: gradient, vệt loang dùng bản tối của token, vệt loang `from-primary/12`.

**Ghi lại** (`P1`, `P4`): dòng `Sắc` trong `DESIGN.md` (`system.md`, `D10`) kèm bảng gán loại →
sắc, cộng comment `/* Sắc: Tinted (P17) */` ở đầu khối Sắc của file token. Dự án Neutral thì xoá
khối Sắc khỏi file token. Thấy khối Sắc có giá trị khi audit thì dự án đã chọn nấc đó, theo luôn.

**Không đè:** toàn bộ cột Nguyên tắc của `P2` ngoài các chỗ hai bảng trên nêu tên: `M3` một màu nhấn
cho hành động, `M7` bảng trạng thái, `P3` tương phản, `I3` một nút chính.

**Bẫy**

- **Màu không gắn với dữ liệu là trang trí.** Bốn card số liệu bốn nền màu, cột biểu đồ mỗi cột một
  sắc dù cùng chỉ số: đó không phải Tinted, đó là lỗi `M2`. Phép thử: hỏi "sắc này nói loại gì,
  mức gì?"; không trả lời được thì xám.
- **Hai sắc phân loại cạnh nhau phải tách được**: `cat-1` xanh dương với `cat-5` sky lệch 21°, nên
  sky không bao giờ vào ô icon.
- **Gradient đếm theo màn, không theo khối**: nút chính + một hero + một điểm biểu đồ là hết. Thêm
  gradient ở tab đang chọn, ở header thì không còn chỗ nào nổi (`M2`).
- **Dark mode**: ô icon `bg-cat-N/15` (nền tối nuốt 10%), điểm cuối gradient lấy cột tối của bảng
  `brand-tokens.md`. Hex viết cứng không lật theo theme.
- **Vivid không đổi font, không đổi bo góc.** Font là trục Font của `P13`. Muốn chữ tròn hơn thì
  chọn bộ mặt có font đó, không lén đổi `--app-font` theo Sắc.

## Không có trong bảng

Gặp phong cách không khớp khối nào (brutalism, retro, skeuomorphism...):

1. **Đo trước khi đoán.** Mở ba component chính (card, nút, ô nhập) ra đọc class thật, đừng suy từ tên file hay từ một ảnh.
2. **Theo những gì đo được**, đè đúng những luật gu flat mà phong cách đó chạm vào.
3. **Giữ nguyên toàn bộ cột "Nguyên tắc" của `P2`.** Phong cách lạ đến đâu cũng không đè được `I3`, `P3`, hay 375px.
4. **Báo trong dòng `Audit:`** rằng đây là phong cách ngoài bảng, và mình đã đè những luật nào.

Phong cách ngoài bảng mà người dùng **chưa chọn** thì vẫn theo `P1`: dự án có
thì theo dự án, không thì flat; báo lúc giao.
