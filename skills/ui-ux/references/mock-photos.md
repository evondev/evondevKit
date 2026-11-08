# Ảnh trong dữ liệu giả — luật S16

Thuộc nhóm `S` (phạm vi, `SKILL.md` mục 1), tách ra đây vì chỉ cần khi mục trên màn có ảnh.

**S16. Dữ liệu giả có ảnh thì dùng ảnh chụp thật, không khối xám hay hình vẽ** ⚑. Mục mà
sản phẩm thật sẽ có ảnh (phòng, sản phẩm, bài viết, ảnh bìa công ty, avatar người) thì
mockup và wireframe dùng ảnh thật, trang mới trông như sản phẩm đang chạy:

- **Ảnh cảnh, vật**: Unsplash, dạng
  `https://images.unsplash.com/photo-<id>?w=800&q=80&auto=format&fit=crop`, đúng chủ đề của
  mục (phòng trọ là nội thất phòng, tin tuyển dụng là văn phòng). Không tự bịa `<id>`: lấy bằng công cụ đọc trang
  web (WebFetch) mở `https://unsplash.com/s/photos/<chủ-đề>` rồi nhặt các link `images.unsplash.com/photo-…` trong trang
  (curl tới trang ảnh, link tải của Unsplash ra 401; tìm kiếm web thường không trả id); không có công cụ đó thì tìm web giới
  hạn `unsplash.com/photos`. Rồi `curl -sI` từng link, không ra 200 thì thay. Mỗi mục một ảnh khác nhau. **Bỏ ảnh có biển
  tên, logo, chữ thương hiệu thật** (bệnh viện, cửa hàng, khách sạn có thật): bản mẫu đặt tên giả cạnh biển tên thật thì
  vừa sai vừa dính thương hiệu người khác.
- **Avatar người**: ảnh chân dung (`https://randomuser.me/api/portraits/women/<0-99>.jpg`,
  `.../men/<0-99>.jpg`), khớp giới của tên giả. Ảnh vẫn theo khuôn của `components/avatar.md`.
- **Logo công ty giả**: ô chữ cái theo `components/avatar.md` (hình vuông bo góc), không lấy
  logo thương hiệu thật gắn cho công ty giả.
- **Vẫn giữ ca biên của `S8`**: ít nhất một mục không ảnh, một người không avatar, để thấy
  chỗ rơi về chữ cái hay khung "Chưa có ảnh".
- Next.js thì thêm hai host vào `images.remotePatterns` trong `next.config`; dự án có ảnh
  riêng (thư mục `public/`, CDN của họ) thì dùng ảnh của họ trước.
- Lúc giao, dòng "số liệu giả" của `S15` nói luôn: ảnh từ Unsplash và randomuser là ảnh
  mẫu, thay bằng ảnh thật trước khi chạy thật.

Tám hình vẽ gần giống nhau cho tám mục thì trang trông "nhìn chán" dù bố cục đã đúng.
