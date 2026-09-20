# Bố cục trang bán hàng

Người dùng chưa đưa skeleton thì đưa 2-3 phương án dưới đây cho họ chọn, kèm
một câu vì sao mình nghiêng về phương án nào. Chọn xong mới dựng.

Code mẫu đã được duyệt: `sales-pricing-3-cot.html`. Chép cấu trúc từ đó, đừng
dịch lại từ chữ.

---

## Bảng giá

**A. Ba cột ngang, gói giữa nổi** (mặc định, hợp khi có đúng 3 gói và chênh giá rõ)

```
        ┌──── ★ ────┐
┌───────┐ ┌───────┐ ┌───────┐
│ tên   │ │ tên   │ │ tên   │
│ mô tả │ │ mô tả │ │ mô tả │   <- min-h để 3 card thẳng tầng
│ ⬛ giá │ │ ⬛ giá │ │ ⬛ giá │
│ ghi chú│ │ ghi chú│ │ ghi chú│
│ ───── │ │ ───── │ │ ───── │   <- đường kẻ phải thẳng hàng nhau
│ ✓ ... │ │ ✓ ... │ │ ✓ ... │
│ ✓ ... │ │ ✓ ... │ │ ✓ ... │
│       │ │       │ │       │   <- mt-auto đẩy nút xuống
│ [nút] │ │ [NÚT] │ │ [nút] │   <- chỉ 1 nút primary
│ phụ   │ │ phụ   │ │ phụ   │   <- 3 dòng phụ phải KHÁC nhau
└───────┘ └───────┘ └───────┘
```

**B. Bảng so sánh dọc** (hợp khi từ 4 gói trở lên, hoặc khác nhau ở nhiều hạng mục)

```
              │ Gói 1 │ Gói 2 │ Gói 3 │ Gói 4
  giá         │  99K  │ 199K  │ 299K  │  ---
  ────────────┼───────┼───────┼───────┼──────
  thành viên  │   1   │  10   │  50   │  ∞
  lưu trữ     │  5GB  │ 100GB │  1TB  │  ∞
  ────────────┼───────┼───────┼───────┼──────
              │ [nút] │ [NÚT] │ [nút] │ [nút]
```

**C. Một gói lớn cộng hai gói nhỏ** (hợp khi thật sự muốn bán một gói, hai gói kia chỉ để neo giá)

```
┌───────────────────┐  ┌─────────┐
│ gói chính         │  │ gói nhỏ │
│ ⬛⬛ giá lớn        │  ├─────────┤
│ ✓ ... ✓ ...       │  │ gói nhỏ │
│ [NÚT]             │  └─────────┘
└───────────────────┘
```

---

## Hero đầu trang

**A. Căn trái, hai cột** (mặc định, chữ trái ảnh phải)

```
┌──────────────────┬──────────────────┐
│ nhãn nhỏ         │                  │
│ TIÊU ĐỀ 2-3 DÒNG │      ảnh /       │
│ câu dẫn 2 dòng   │   ảnh chụp app   │
│ [NÚT] [nút phụ]  │                  │
│ dòng tin cậy     │                  │
└──────────────────┴──────────────────┘
```

**B. Căn giữa, ảnh nằm dưới** (hợp khi ảnh là ảnh chụp app rộng)

```
        nhãn nhỏ
     TIÊU ĐỀ 2 DÒNG
    câu dẫn, tối đa 2 dòng
      [NÚT] [nút phụ]
┌─────────────────────────────┐
│      ảnh chụp app rộng      │
└─────────────────────────────┘
```

Không dùng hero chiếm nguyên màn hình. Phần đầu của khối tiếp theo phải ló ra.

---

## Khối tính năng

**A. Lưới 2x3 hoặc 3x2**, mỗi ô là icon nhỏ, tiêu đề một dòng, mô tả hai dòng.
Không bọc mỗi ô vào card riêng khi nền đã khác nền trang.

**B. Xen kẽ trái phải**, mỗi tính năng một hàng, chữ và ảnh đổi bên. Hợp khi có
3-4 tính năng cần giải thích kỹ, không hợp khi có 6 tính năng ngắn.

---

## Câu hỏi thường gặp

Một khối duy nhất, chia bằng đường kẻ ngang, **hiện hết** khi dưới 6 câu. Không
bọc mỗi câu vào một card. Không lưới 2 cột.

```
┌─────────────────────────────┐
│ Câu hỏi 1                   │
│ trả lời                     │
│ ─────────────────────────── │
│ Câu hỏi 2                   │
│ trả lời                     │
└─────────────────────────────┘
```
