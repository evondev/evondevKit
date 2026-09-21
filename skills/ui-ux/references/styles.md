# Phong cách thị giác — luật P

Nguồn duy nhất cho: nhận ra dự án đang dùng phong cách gì, phong cách đó được đè
luật nào, và bẫy riêng của từng phong cách. Lệnh audit nằm ở `SKILL.md` câu 2,
tầng 3. File này dạy cách **đọc** kết quả.

---

## Hai tầng

**P1. Mặc định là flat. Phong cách khác chỉ khi người dùng chọn.**

Ba ca, chọn đúng một:

| Ca | Làm gì |
| --- | --- |
| **Người dùng tự nêu phong cách** ("làm trang giá kiểu glassmorphism") | Làm theo phong cách đó, **không hỏi lại** |
| **Audit thấy dự án có phong cách khác flat** (`P4`) | **Hỏi một câu**, gộp cùng lượt với câu bố cục ở mục 0 (mẫu bên dưới) |
| **Dự án flat hoặc trống**, người dùng không nêu gì | Flat (`P6`). Không hỏi về phong cách |

Mẫu câu hỏi, kèm hệ quả của từng lựa chọn để người dùng chọn có căn cứ:

> Dự án đang dùng **glass** (thấy ở 7 file: card, modal, sidebar). Màn này làm:
> - **Flat** theo mặc định của skill: gọn, dễ đọc, nhưng sẽ lệch so với phần còn lại của app.
> - **Glass** như dự án: nhất quán với các màn khác.

Chọn xong thì khỏi hỏi lại cho các màn sau trong cùng dự án.

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
| **Nguyên tắc** | Toàn bộ `S` `T` `I` `R` · `M3` một màu nhấn · `M4` màu báo trạng thái · `M11` ba sắc độ chữ · `M19` bo lồng · `M24`–`M28` token · `M30` hai sắc đỏ · bố cục `F1`–`F18`, `F21`, `F23`–`F25` · **`P3` tương phản** | **Không bao giờ** |

Mỗi luật gu flat có dòng *"Gu flat"* ngay tại chỗ. Thấy dòng đó mà phong cách
đã chọn không phải flat thì quay về đây.

**P3. Tương phản chữ: con số cứng, ở mọi phong cách.**

| Thứ | Tối thiểu |
| --- | --- |
| Chữ thường | **4.5 : 1** so với nền ngay phía sau |
| Chữ lớn (từ 24px, hoặc từ 18.66px đậm) | **3 : 1** |
| Viền ô nhập, icon mang nghĩa, viền nút không nền | **3 : 1** so với nền kề bên |

Flat hiếm khi trượt con số này, vì chữ đậm nằm trên nền trắng đặc. Glass,
gradient và tối thì **trượt đầu tiên**. Nên luật này được viết ở đây, cạnh các
phong cách làm nó trượt.

**Đo ở chỗ tệ nhất**, không đo ở giữa:

- Trên gradient, đo ở **đầu gần màu chữ nhất**.
- Trên glass, đo ở chỗ phía sau **gây bất lợi nhất**: chữ trắng thì đo trên vùng ảnh sáng nhất phía sau, chữ đen thì đo trên vùng tối nhất.
- Placeholder và chữ phụ cũng tính. Chữ phụ `text-white/50` trên nền kính thường là thứ trượt trước tiên.

---

## Nhận diện

**P4. Tự tìm phong cách của dự án, để biết có cần hỏi hay không. Một phong
cách chỉ là "của dự án" khi nó có mặt trên bề mặt chính.**

Chạy lệnh tầng 3 ở `SKILL.md` câu 2, rồi đọc số:

| Kết quả | Kết luận |
| --- | --- |
| Tín hiệu có ở **từ 3 file component trở lên**, trên card, modal, header, sidebar | Đó là phong cách của dự án → **hỏi** theo mẫu `P1` |
| Chỉ 1–2 file | Ngoại lệ cục bộ: một banner, một trang quảng bá. **Không** tính là phong cách của dự án, không hỏi, làm flat |
| Có token riêng cho nó (`--glass-bg`, `--gradient-*`, `--shadow-card`) | Tính là phong cách của dự án **dù đếm file ra ít**, vì có token là có chủ đích → **hỏi** |
| **Tối**: layout gốc có nền tối | Tính là phong cách của dự án **chỉ với một file đó**, vì nền tối chỉ nằm ở gốc → **hỏi** |
| Không tín hiệu nào đáng kể | Flat hoặc dự án trống → flat (`P6`), không hỏi |

Đếm ra chỉ để **quyết định có hỏi hay không**. Không bao giờ tự đổi sang phong
cách khác chỉ vì audit thấy nó.

Người dùng gửi **ảnh tham chiếu** thì đó là ca "tự nêu phong cách" của `P1`: nhận
diện bằng mắt theo dòng "Nhận ra từ ảnh" ở từng khối bên dưới, rồi làm theo luôn,
không hỏi. Có ảnh thì ảnh thắng code.

**P5. Phong cách chồng nhau thì áp cả hai khối. Codebase lẫn lộn thì nói ra
trong câu hỏi.**

- **Glass + tối** là cặp rất hay gặp. Áp cả `P8` lẫn `P10`.
- **Nổi + gradient ở một điểm**: card nổi, chỉ gói đề xuất có gradient. Áp `P7`, còn `P9` chỉ áp cho đúng điểm đó.
- **Codebase lẫn lộn** (trang cũ flat, trang mới glass): nói thẳng chuyện đó trong câu hỏi của `P1`, kèm khu nào đang dùng gì, rồi để người dùng chọn. Phần **mới nhất** của dự án thường là hướng họ đang đi tới, nên nói thêm một câu như vậy nếu thấy rõ.

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
<div class="rounded-2xl bg-surface shadow-sm ring-1 ring-black/5 hover:shadow-md">
```

**Thang bóng, mỗi tầng một bậc, không hai tầng trùng nhau:**

| Tầng | Bóng |
| --- | --- |
| Card | `shadow-sm` |
| Card bấm được, khi hover | `shadow-md` |
| Dropdown, popover | `shadow-lg` |
| Modal | `shadow-xl` |

**Bẫy**

- **Card với modal cùng bóng thì modal không còn nổi.** Thang trên tồn tại để lớp cao hơn luôn nổi hơn. Tăng bóng card lên `shadow-lg` là modal phải lên theo, và dropdown cũng vậy.
- **`ring-1 ring-black/5` đi cùng bóng là hợp lệ ở đây.** Nó vạch mép card cho sắc nét trên nền trắng. Đây là chỗ đè `M29`: ở flat thì viền với bóng không đi cùng nhau, ở phong cách nổi thì được.
- **Ở nền tối, bóng gần như vô hình.** Dự án nổi mà có dark mode thì ở chế độ tối thứ bậc chuyển sang bề mặt sáng dần theo tầng (`M21`), đừng tăng bóng lên cho bằng được.
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
- **Hạ độ đậm chữ một bậc.** Chữ sáng trên nền tối trông đậm hơn đúng cỡ đó trên nền sáng. Tiêu đề `700` thì hạ xuống `600`.
- **Thứ bậc bằng bề mặt sáng dần theo tầng, không bằng bóng.** Nền trang tối nhất, card sáng hơn một bậc, modal sáng hơn nữa (`M21`). Bóng ở nền tối gần như không thấy.
- Viền `border-white/10` gánh việc tách khối (`M23`), vì các bề mặt tối chênh nhau quá ít.
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

## Không có trong bảng

Gặp phong cách không khớp khối nào (brutalism, retro, skeuomorphism...):

1. **Đo trước khi đoán.** Mở ba component chính (card, nút, ô nhập) ra đọc class thật, đừng suy từ tên file hay từ một ảnh.
2. **Theo những gì đo được**, đè đúng những luật gu flat mà phong cách đó chạm vào.
3. **Giữ nguyên toàn bộ cột "Nguyên tắc" của `P2`.** Phong cách lạ đến đâu cũng không đè được `I3`, `P3`, hay 375px.
4. **Báo trong dòng `Audit:`** rằng đây là phong cách ngoài bảng, và mình đã đè những luật nào.

Phong cách ngoài bảng mà người dùng **chưa chọn** thì vẫn theo `P1`: hỏi trước,
mặc định flat.
