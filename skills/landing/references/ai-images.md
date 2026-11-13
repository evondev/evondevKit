# Ảnh vẽ riêng cho trang — luật B31

Mở file này khi trang **cần ảnh vẽ riêng để tạo không khí**: ảnh nền hero, ảnh minh hoạ từng mục,
nền một dải section, mặt lá bài, nhân vật. Thường gặp ở loại landing ngoài Blueprint (huyền học,
spa, nhà hàng, game, khoá học, sự kiện, sản phẩm tiêu dùng), hoặc khi đề xin "có ảnh", "có hình
minh hoạ". **Blueprint chỉ dùng cho món ký tên** (`B41`) dạng vật thể render 3D hay minh hoạ, một
ảnh mỗi trang; phần còn lại Blueprint đẹp nhờ sản phẩm thật, không nhờ ảnh vẽ.
Ảnh chụp cho **mục dữ liệu** (sản phẩm, phòng, avatar) vẫn theo `S16` của `ui-ux`
(`../ui-ux/references/mock-photos.md`), không theo file này.

**B31. Trang cần ảnh vẽ riêng thì skill viết danh sách ảnh kèm prompt; người dùng sinh ảnh rồi bỏ
vào, skill dựng trang quanh ảnh** ⚑. Ảnh không khí lấy từ kho ảnh có sẵn thì không khớp bố cục, khớp
màu, và hay trùng trang khác. Ảnh sinh theo prompt viết **cho đúng chỗ đặt** thì chừa sẵn vùng cho
chữ, cùng bảng màu với token, cả bộ trông cùng một tay vẽ.

## 1. Dựng trang trước, ảnh giữ chỗ

- Mỗi ảnh một đường dẫn cố định `assets/<tên-ảnh>.webp`, tên kebab-case nói chỗ đặt (`hero-bg`,
  `module-tarot`, `section-booking-bg`).
- **Thiếu file thì trang vẫn đọc được**: ảnh nền đặt bằng `background-image` trên khối đã có màu nền
  token; ảnh nội dung đặt trong khung có `aspect-ratio` cố định và nền token (trang HTML thuần thêm
  `onerror="this.remove()"` cho `<img>` để không hiện icon ảnh vỡ). Chữ trên vùng ảnh đã đạt 4.5:1
  với màu nền giữ chỗ.
- Wireframe (`B1`): khung xám ghi tên file và kích thước, không cần ảnh.

## 2. Viết `image-prompts.md` ở gốc dự án

Mỗi ảnh một mục, đủ sáu dòng:

| Dòng | Ghi gì |
| --- | --- |
| **File** | `assets/hero-bg.webp` |
| **Chỗ đặt** | một dòng tiếng Việt: nền hero, chữ đè lên nửa trái |
| **Kích thước xuất** | px và tỉ lệ: hero ngang 1600×900 (16:9); thẻ dọc 520×760 (~2:3); nền dải 1600×600 |
| **Vùng trống** | chỗ chữ nằm phải trơn và tối (hay sáng) đều, không chi tiết: "45% bên trái gần đen trơn" |
| **Màu** | mã hex lấy từ token của trang (nền, nhấn, chữ) |
| **Prompt** | tiếng Anh, dán thẳng vào công cụ sinh ảnh (ChatGPT, Gemini…) |

Luật viết prompt:

- **Một câu phong cách chung**, lặp nguyên văn ở cuối mọi prompt (chất liệu, ánh sáng, bảng màu hex,
  độ chi tiết). Thiếu câu này thì mỗi ảnh một kiểu, ghép lại trông như nhặt nhạnh.
- Bố cục nói bằng vị trí: "subject on the right third", "empty dark negative space on the left half
  for text overlay", "centered, generous margin around the subject".
- Luôn có: `no text, no letters, no logo, no watermark`. Chữ trên trang đặt bằng HTML, chữ trong ảnh
  sinh ra thường méo và không dịch được.
- Không người thật, thương hiệu thật, nhân vật có bản quyền, phong cách gọi tên hoạ sĩ còn sống.
- Ảnh hero ngang mà nhân vật nằm sát mép thì ở 375 bị cắt mất: thêm một mục ảnh dọc riêng
  (`hero-bg-mobile`, 900×1400) hoặc ghi rõ "subject within the center 40% horizontally".

Ví dụ một mục:

```
File: assets/hero-bg.webp — nền hero, chữ đè nửa trái
1600×900 (16:9) · vùng trống: 45% bên trái gần đen trơn · màu: #0f0b1a, #c9a24b, #6b4fa0
Prompt: A calm spa room at dusk, a stone basin with floating petals and a single candle,
subject on the right third, empty dark negative space on the left half for text overlay,
soft side light. Style: painterly digital illustration, warm low-key lighting, palette of
deep plum #0f0b1a, muted gold #c9a24b and lavender #6b4fa0, fine detail, no text, no letters,
no logo, no watermark, 16:9.
```

Phiên có sẵn công cụ sinh ảnh (skill hay MCP sinh ảnh, người dùng đã có key) thì sinh luôn bằng chính
các prompt này; không có thì giao file cho người dùng, **không** lấy ảnh không khí từ kho ảnh chụp
thay vào.

## 3. Người dùng bỏ ảnh vào thì rà từng ảnh

Mở xem **từng file** (đọc ảnh, không chỉ kiểm tra file tồn tại):

- Vùng trống đúng chỗ chữ nằm; chữ đè lên vẫn đạt 4.5:1. Không đạt thì thêm lớp phủ
  `linear-gradient` từ màu nền token về trong suốt, phía có chữ.
- Không chữ lạ, logo lạ, tay hay mặt méo. Có thì báo tên file, đề nghị sinh lại, sửa prompt.
- Cả bộ cùng một kiểu; ảnh lạc tông thì chỉ ra ảnh nào.
- Nén `webp`: hero rộng tối đa 1600px, khoảng 250KB trở xuống; ảnh thẻ khoảng 80KB.
- Ở 375: chủ thể không bị cắt (`background-position` giữ chủ thể, hoặc ảnh dọc riêng).

## 4. Lúc giao

Mục **Cần bạn làm** của `S15`: *"Sinh N ảnh theo `image-prompts.md` (ChatGPT, Gemini hay công cụ bạn
quen), lưu đúng tên vào `assets/`, nhắn mình để rà."* Trang vẫn chạy được khi chưa có ảnh.
