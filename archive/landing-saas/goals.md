# Mục tiêu của trang — luật G

Mục tiêu quyết định section nào bật, xếp ra sao, nút chính ghi gì. Giống "việc chính của từng
màn" bên `ui-ux`, nhưng landing chỉ có một việc: dẫn khách tới **một** hành động.

⚑ Bảng dưới đếm từ 20 trang đang chạy, 5 trang mỗi mục tiêu, tra 01/10/2026. Số trong ngoặc là
số trang trên 5 có làm vậy. Mẫu "dùng thử" nghiêng về công cụ cho dev.

---

## G1. Bảng bật section theo mục tiêu ⚑

`✓` bật mặc định. `–` tắt. Tắt không có nghĩa là cấm: người dùng nêu trong đề thì bật (`E2`).

| # | Section (`sections.md`) | Dùng thử | Mua luôn | Đặt demo | Danh sách chờ |
| --- | --- | --- | --- | --- | --- |
| 1 | Header | ✓ | ✓ | ✓ | ✓ gọn: logo, 0–3 link, nút (4/5) |
| 2 | Hero | ✓ chia đôi | ✓ canh giữa (3/5) | ✓ chia đôi (4/5) | ✓ chia đôi, form email (3/5) |
| 3a | Dải logo ngay dưới hero | ✓ (5/5) | – thay bằng dòng số người dùng ngay hero (4/5) | ✓ kèm số khách (4/5) | – (0/5) |
| 4 | Tính năng | ✓ bento `K4` A (5/5 có lưới) | ✓ | ✓ lưới 3 × 2 (4/5), `K4` B, có thể sau A | ✓ một hàng 3 card bento |
| 5 | Cách hoạt động | – (1/5) | – (0/5) | – (1/5) | ✓ 3 bước (3/5) |
| 6 | Pricing | – trang riêng (5/5), link "Bảng giá" trên header | ✓ ngay trên trang (4/5) | – (5/5) | – (5/5) |
| 3b | Testimonial | ✓ (5/5) | ✓ ngay sau pricing (4/4) | ✓ (5/5) | – (0/5) |
| 7 | FAQ | – (1/5) | ✓ cạnh pricing (3/5) | – (0/5) | – (2/5) |
| 8 | CTA cuối trang | ✓ hai nút (4/5) | ✓ (3/5) | ✓ panel, có ô email (5/5) | ✓ form email lần hai (3/5) |
| 9 | Footer | ✓ cột link | ✓ cột link | ✓ cột link, nền tối (5/5) | ✓ một hàng gọn (2/5) |

**Thứ tự mặc định** (số là cột `#`):

| Mục tiêu | Thứ tự |
| --- | --- |
| Dùng thử | 1 · 2 · 3a · 4 · 3b · 8 · 9 |
| Mua luôn | 1 · 2 · 4 · 6 · 3b · 7 · 8 · 9 |
| Đặt demo | 1 · 2 · 3a · 4 · 3b · 8 · 9 |
| Danh sách chờ | 1 · 2 · 4 · 5 · 8 · 9 |

Không có trong bộ nền (để bản sau): bảng so sánh với đối thủ, video demo riêng, integrations,
khối code mẫu, changelog, khối số liệu lớn (0–2/5 ở mọi mục tiêu). Người dùng xin thì mượn
khuôn gần nhất trong `sections.md`, báo một dòng *"X chưa có mẫu, mình mượn khuôn của Y"*.

## G2. Chữ nút chính theo mục tiêu ⚑

Nút gọi **đúng việc khách sắp làm**. Chữ chung chung ("Bắt đầu", "Get started", "Tìm hiểu
thêm") chỉ dùng khi đề yêu cầu.

| Mục tiêu | Tiếng Việt | Tiếng Anh | Nút phụ ở hero |
| --- | --- | --- | --- |
| Dùng thử | Dùng thử miễn phí | Start for free | Viền "Liên hệ tư vấn" (3/5 có), hoặc không |
| Mua luôn | Mua [Tên sản phẩm] | Get [Product] | Viền "Xem cách hoạt động", cuộn xuống tính năng (3/5) |
| Đặt demo | Đặt lịch demo | Book a demo | Không (3/5 không có) |
| Danh sách chờ | Đăng ký chờ | Join the waitlist | Không. Chữ nút gọi đúng tên danh sách chờ (5/5) |

- **Mua luôn: nút ở header và hero cuộn xuống `#pricing`**, không mở thẳng thanh toán (4/4
  trang có nút ở hero). Nút thanh toán chỉ nằm trên card giá.
- **Danh sách chờ: không dùng "Đăng ký", "Bắt đầu"**: khách tưởng vào dùng được ngay.

## G3. Câu nhỏ dưới nút chính ⚑

Một dòng `text-sm text-muted` ngay dưới hàng nút ở hero, nói điều làm khách bớt ngại bấm.

| Mục tiêu | Mặc định | Ghi chú |
| --- | --- | --- |
| Danh sách chờ | ✓ (4/5): khi nào mở, sẽ nhận gì ("Mở đợt đầu tháng 11. Chỉ gửi email khi tới lượt bạn.") | Không hứa thứ đề không nói |
| Mua luôn | ✓ (3/5): hàng avatar chồng nhau + 5 sao + số người mua, cạnh nút | Số giả thì đánh dấu (`H9`) |
| Dùng thử | – (1/5) | "Không cần thẻ" chỉ khi người dùng xác nhận đúng |
| Đặt demo | – (1/5) | |

Câu hứa về tiền và cam kết ("Không cần thẻ", "Hoàn tiền 30 ngày", "Huỷ lúc nào cũng được")
là thứ có hậu quả: chỉ ghi khi người dùng đã nói, không thì để `[cần điền]` (`S7` của
`ui-ux`).

## G4. Pricing theo mục tiêu ⚑

Bản đầu chốt ba dạng "một gói / ba gói nổi gói giữa / tháng năm kèm Enterprise". Tra thật
01/10/2026 thì không khớp số đông, nên bỏ. Pricing đi theo mục tiêu:

- **Dùng thử:** không có section pricing trên landing (5/5). Header có link "Bảng giá" sang
  trang riêng; trang đó dựng theo `../ui-ux/references/layouts/pricing.md`. Trang giá thật
  của loại này thường 4 gói (Free, hai gói trả phí, Enterprise "liên hệ") kèm bảng so sánh.
- **Mua luôn:** section pricing ngay trên trang, `id="pricing"`. 2–4 card theo khuôn card của
  `layouts/pricing.md`, **không gói nào nổi** trừ khi người dùng nói gói nào nên mua (0/5 nổi
  gói giữa). Dòng đầu section **nói rõ "trả một lần"** nếu đúng vậy (5/5). FAQ đứng ngay sau
  testimonial, nói về license, hoàn tiền, thanh toán, cập nhật.
- **Đặt demo, danh sách chờ:** không pricing (5/5 cả hai). Đặt demo có thể có link "Bảng giá"
  trên header sang trang báo giá (4/5), chỉ khi người dùng có trang đó.

## G5. Mục tiêu thứ hai ⚑

Nhiều trang có hai lối (dùng thử và đặt demo). Vẫn **một** nút chính: lối kia thành nút viền
ở hero và nút thứ hai ở CTA cuối trang, không bao giờ là nút đặc thứ hai trên header. Người
dùng không nói lối nào chính thì lấy lối rẻ hơn với khách (dùng thử thắng demo, danh sách
chờ thắng mua trước).
