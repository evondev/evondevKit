# App điện thoại — Nhân vật và minh hoạ

Một mục của luật `J`. Luật nền `J1`–`J8` và bảng các mục ở `mobile.md`, mở file đó trước.

## J16. Nhân vật và minh hoạ ⚑

**App nào dùng nhân vật**: app cho một người tự làm việc của mình mỗi ngày, không lấy ảnh chụp làm chủ: học, thói quen,
sức khoẻ cá nhân, ghi chép, tiết kiệm cá nhân; theo người dùng và việc, không theo bộ mặt (Clean cũng dùng). Không dùng
ở app làm việc cho cửa hàng, công ty, quản lý (`J14`), và app lấy ảnh làm chủ (dưới).

App vui, app học, app sức khoẻ trông "có hồn" nhờ nhân vật: màn chào có người chào, bài tập có người nói câu mẫu,
đúng sai có cử chỉ. Thay bằng icon trong vòng tròn thì luồng đúng luật mà trống, nhất là màn chào, màn luyện nói,
màn xong.

**Nguồn, theo thứ tự:**
1. **Dự án có bộ hình** (grep `illustration`, `mascot`, `character`, thư mục `public/illustrations`, `assets/images`,
   file Lottie `.json`, `.riv`): dùng của họ, không trộn bộ khác.
2. **Chưa có** (người dùng lần đầu, chưa chuẩn bị gì): **người 3D của Fluent Emoji** (Microsoft, giấy phép **MIT**: dùng
   thương mại, không cần ghi công trên màn, chỉ giữ dòng bản quyền trong file license của dự án). Cùng bộ với đồ vật 3D ở
   dưới nên cả app một kiểu vẽ. Mỗi người có nhiều cử chỉ (đưa tay giới thiệu, giơ tay, OK, buồn, nhún vai), đủ cho các
   khoảnh khắc của `J16`. Bản mẫu nạp PNG qua jsDelivr ghim một commit, gán vào `img[data-art]` theo tên người và cử chỉ
   (`mobile-playful.html`); dự án thật tải file về `public/`.
   - **Không lấy người vẽ tay nét đen** (DiceBear Open Peeps, Notionists): chủ dự án đã duyệt là trông thô,
     và đứng cạnh đồ vật 3D thì thành hai kiểu vẽ.
   - **Không lấy unDraw**: giấy phép cấm nhúng, tích hợp, thu thập tự động khi chưa xin phép, đúng việc skill làm.
   - **Không lấy Flaticon, Freepik, Icons8, bộ CC BY**: bản free bắt ghi công trên sản phẩm, cấm nhúng link thẳng, phải
     đăng nhập tải tay. Skill không tải tự động được, người dùng dễ quên ghi công khi ra bản thật.
   - **Không mang hình trả phí vào skill**: giấy phép mua về thường cấm phát lại trong bộ mẫu, mà skill là repo công khai.
   - Không tự vẽ SVG nhân vật hay minh hoạ (`J8`).

**Hình đồ vật** (bộ Playful; Tinted, Glow cũng dùng cho món, danh mục, phần thưởng, `J15`): bộ đếm (chuỗi ngày, kim cương, tim), nút bài trên lộ trình, huy hiệu cấp, ô số ở màn xong
dùng **đồ vật 3D**, không icon nét. Icon nét một màu ở các chỗ đó làm app trông thô như bản nháp, kể cả khi bố cục đúng.
Nguồn, theo thứ tự:
1. **Dự án có bộ hình** (grep như trên, thêm `icons/3d`, `emoji`): dùng của họ.
2. **Chưa có** (người dùng lần đầu, chưa chuẩn bị gì): **Fluent Emoji 3D** của Microsoft, giấy phép **MIT** (dùng thương
   mại, không cần ghi công trên màn, chỉ giữ dòng bản quyền trong file license của dự án). Bản mẫu nạp PNG qua jsDelivr
   **ghim một commit** (`cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@<sha>/assets/<Tên>/3D/<tên>_3d.png`, tên có dấu
   cách thì `encodeURI`), gán vào `img[data-emoji]` từ một bảng tên đặt một chỗ; dự án thật tải file về `public/`. Mỗi
   bài một đồ vật nói nội dung bài (đi biển là bãi biển, gọi món là cốc cà phê), không một icon chung cho mọi bài. Bài
   khoá: đồ vật xám mờ (`grayscale`, `opacity: 0.45`) và ổ khoá nhỏ ở góc; bài xong: tick nhỏ ở góc; chuỗi ngày chưa giữ
   hôm nay: lửa xám mờ.
   - Icon giao diện (✕, loa, mic, mũi tên, thanh tab) vẫn Lucide. Đồ vật 3D chỉ ở các chỗ trên; một app một bộ đồ vật.
   - Huy hiệu lục giác bo góc (mask là một lục giác bo góc, `aspect-ratio: 0.866`), không lục giác góc nhọn của
     `clip-path: polygon`: góc nhọn cạnh đồ vật 3D mềm trông cứng.

**Cảnh nền** (bộ Playful: lộ trình bài học, màn xong). Nền vẽ tay riêng (bản đồ đảo, dải sa mạc) không có nguồn free nào
ra đúng: mỗi app một bộ do hoạ sĩ vẽ. Dự án có thì dùng của họ; chưa có thì **ghép từ cảnh 3D cùng bộ Fluent Emoji**
(cây, núi, đảo, lều, núi lửa, mây), không tự vẽ bản đồ (`J8`), không lấy bộ nền vẽ phẳng (thành hai kiểu vẽ):
- Lộ trình nền một màu đất nhạt (token `--map`, dải tên cấp dính đầu màn cùng nền). Cảnh đứng **thành cụm 1–2 vật trên
  một mảng đất bầu dục** (token `--ground`), như hòn đảo nhỏ; vật rời không có đất trông như dán sticker.
- Cụm đặt ở **phía trống của đường zíc zắc**, không đè nút, nhãn, bong bóng; mỗi cấp 4–5 cụm, có thể theo chủ đề cấp
  (cấp đi chơi: dừa, lều, đảo). Cảnh của cấp còn khoá xám mờ như bài khoá. Cảnh là `aria-hidden`, `pointer-events: none`.
- Màn xong, lên cấp: một dải cảnh ở đáy, trên mảng đất rộng, ngay trên nút chính. Nền màn vẫn trắng (`J1`).
- Chữ phụ trên nền `--map` vẫn đạt 4.5:1: nền tô màu làm `--muted` cũ tụt dưới ngưỡng, đo lại.
- Lúc giao nói một dòng: cảnh là bộ free giữ chỗ; muốn đúng tranh vẽ tay thì cần hoạ sĩ hoặc người dùng đưa hình.

**Một nhân vật cho cả app**: giữ một người (một giới, một màu da) ở mọi màn; chỉ **cử chỉ** đổi theo khoảnh khắc: chào,
rỗng, chờ, đang nghe `raising hand` · nói, hướng dẫn `tipping hand` · đúng, xong `gesturing ok` · sai `frowning` · hết
lượt, lỡ chuỗi `shrugging`. Không dùng bản chỉ có đầu (`Woman`, `Man`) cạnh bản có thân: trông như đổi nhân vật. Bạn hội
thoại trong bài tập là người thứ hai cùng bộ, khác giới.
Hai kiểu vẽ trong một app (người vẽ tay cạnh ảnh chụp, cạnh đồ vật 3D) thì trông ghép.

**Chỗ dùng và cỡ:**

| Chỗ | Cỡ |
| --- | --- |
| Màn chào (`J12`), kèm bong bóng một câu chào | 160–176px |
| Bài tập: người nói câu mẫu, bong bóng ở trên đầu nhân vật | 140–160px, giữa màn |
| Màn xong, màn kết quả onboarding (`O8`), trạng thái rỗng (`J12`) | 35–50% bề ngang màn |
| Rỗng một phần trên màn gốc vẫn có khối số (hôm nay chưa ghi, thẻ số chính ở trên) | 112–128px, nút của trạng thái rỗng phải thấy ở 360×640 không cuộn |
| Bạn hội thoại cạnh bong bóng tin nhắn | 56px |
| Sheet báo một khoảnh khắc (lỡ chuỗi, lên hạng) | 144px, trên tiêu đề sheet |
| Khối chúc mừng đầu một màn danh sách (xong hết việc hôm nay) | 144px trong khối, danh sách vẫn ở dưới |

Avatar của người dùng trong app có nhân vật là ô chữ cái (`components/avatar.md`), không ảnh chụp (`S16`): ảnh chân dung
thật cạnh người vẽ tay là hai kiểu vẽ.

Không ở màn làm việc lặp lại (danh sách, form, cài đặt, giỏ hàng) và không ở màn câu hỏi của onboarding: câu hỏi là
tiêu đề lớn (`O8`).

**App ghi chép món ăn** (đếm kcal, nhật ký bữa ăn) không lấy ảnh làm chủ dù món có ảnh: món là dữ liệu chung người dùng
chọn từ danh sách, không phải hàng của một quán (`S16` áp cho app bán món của quán). Đồ ăn là đồ vật 3D, món tự nhập không
có hình thì icon nét trong cùng ô.

**App lấy ảnh chụp làm chủ thì không dùng nhân vật vẽ tay**: bộ mặt Photo, Immersive (`J15`), app đặt món, bán hàng
(`J11`), đặt phòng. Màn xong, rỗng của các app này dùng icon trong vòng tròn 80px (`J12`) hay ảnh thật của món, của phòng. Người vẽ
tay đứng giữa toàn ảnh đồ uống chụp thật là hai kiểu vẽ trong một app, trông như ghép từ hai nơi.

**Lúc giao** nói một dòng: nhân vật và đồ vật 3D là bộ free giữ chỗ (Fluent Emoji, MIT); có bộ hình thương hiệu thì thay ở một chỗ, đoạn script
gán `img[data-art]` theo tên nhân vật và cử chỉ, bảng tên cho `img[data-emoji]`. Bảng luồng (`J1`) giữ móc `data-art` khi chép màn.
