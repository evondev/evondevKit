# Bảng giá

> ⚑ Chưa qua vòng test nào. Rút ra từ một lượt dựng thật (trang giá khoá học 3 gói).

**Một bố cục mặc định, dựng luôn.** Người dùng muốn kiểu khác (gộp một khối,
nút lên trên, bảng so sánh, card đảo màu…) thì họ nói, mình sửa theo. Đừng bày
phương án.

Đây là trang trình diễn: tiêu đề trang được dùng cỡ `2xl` (`budgets.md`), nhưng
**giá luôn là font body** (`T3`).

---

## Bố cục

```
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Tên      │ │ Tên [bdg]│ │ Tên      │  1 tên, badge nổi bật bên phải
│ mô tả    │ │ mô tả    │ │ mô tả    │  2 đúng 1 câu
│ GIÁ /th  │ │ GIÁ /th  │ │ GIÁ /th  │  3 giá + đơn vị cùng dòng
│ dòng phụ │ │ dòng phụ │ │ dòng phụ │  4 điều kiện của giá
├──────────┤ ├──────────┤ ├──────────┤    đường chia tràn mép card (F25)
│ Bao gồm: │ │ Mọi thứ… │ │ Mọi thứ… │  5 tiêu đề danh sách
│ ✓ ...    │ │ ✓ ...    │ │ ✓ ...    │  6 tính năng
│ – ...    │ │ ✓ ...    │ │ ✓ ...    │
│ [ nút  ] │ │ [ NÚT  ] │ │ [ nút  ] │  7 nút, luôn đáy card
└──────────┘ └──────────┘ └──────────┘
```

Các card rộng bằng nhau, cao bằng nhau. Hàng giữa các card căn bằng `subgrid`,
không chừa `min-h-*` (đoán độ dài chữ là sai ngay ở ca `S8`):

```html
<div class="grid gap-4 lg:grid-cols-3">
  <!-- row-span-7 = số hàng trong sơ đồ. Thêm hàng thì đổi cả hai số. -->
  <article class="row-span-7 grid grid-rows-subgrid gap-y-0 rounded-2xl border border-border bg-surface p-7">
    …
  </article>
</div>
```

Gói nào cũng đủ 7 hàng. Thiếu dòng phụ thì để phần tử rỗng, đừng bỏ.

Màn hẹp: một cột dưới `lg`, giữ thứ tự rẻ đến đắt.

---

## Từng hàng

| Hàng | Làm | Đừng |
| --- | --- | --- |
| Tên | `text-lg font-semibold`, tối đa khoảng 3 từ | To bằng giá. Đây là **ngoại lệ có chủ ý của `T8`**: giá là thứ đọc đầu tiên |
| Mô tả | Đúng 1 câu, gói nào cũng có | Gói có gói không |
| Giá | `text-3xl font-bold tabular-nums`, đơn vị `/tháng` cùng dòng, căn `baseline`. Gói miễn phí ghi "Miễn phí" | "0đ" |
| Dòng phụ | Điều kiện riêng của gói (`T22`), **vừa một dòng**: "Trả theo năm: 990.000đ/tháng" | Câu dài bị chẻ giữa con số (`T10`) |
| Tiêu đề danh sách | "Bao gồm:" ở gói thấp nhất, "Mọi thứ trong Pro, thêm:" ở gói trên. `text-sm text-muted` | "Toàn bộ quyền lợi của gói Pro" viết thành một mục có dấu check |
| Tính năng | Check nét `Check` lucide `size-4`. Mục không có: `Minus` + chữ `--muted`. Con số đứng đầu: "4 buổi kèm 1-1 mỗi tháng" | Check tròn tô đặc, check mờ cho mục không có |
| Nút | Rộng hết card. Chữ là động từ + gói: "Đăng ký gói Pro" | Ba nút cùng chữ "Chọn gói" |

---

## Gói nổi bật: đúng hai tín hiệu

1. **Badge nhỏ** góc phải hàng tên: `rounded-full px-2.5 py-1 text-xs font-medium`, chữ nói lý do ("Phổ biến nhất"). Không emoji, không ngôi sao (`T21`).
2. **Nút `primary`**, nút primary duy nhất cả dãy.

Không làm card cao hơn, to hơn, viền màu, vòng sáng, `scale-105` (`F20`, `F22`).
Đề không có gói nào cần đẩy thì không đặt badge.

Nút các gói khác: **nền `--secondary`**, không viền
— variant `secondary` ở `../components/button.md`. Nút rộng hết card mà chỉ có
viền mảnh thì trông rỗng.

---

## Màu thương hiệu

Màu nhấn chỉ nằm ở **nút và badge của gói nổi bật**. Còn lại trung tính (`M2`, `M3`).

| Thứ | Theo `--primary`? |
| --- | --- |
| Nút gói nổi bật | Có |
| Badge | Có. Màu trung tính thì tô đặc `bg-primary text-primary-foreground`, có sắc thì `bg-primary-light text-primary` |
| Check, giá, tên gói | Không. Check tô màu ở cả dãy là gói nổi bật hết nổi; giá màu nhấn đọc ra là link, màu sáng còn không đạt tương phản (`P3`) |
| Nút các gói khác | Không |

---

## Những thứ không dựng nếu đề không nhắc

- **Nút chuyển tháng/năm.** Có giá năm thì ghi ở dòng phụ dưới giá. Đề nhắc giảm giá trả năm mà không đưa số thì hỏi số, không bịa (`S7`).
- **FAQ** (`S1`). Có thì bung hết; hơn 5 câu mới dùng `<details>`.
- **Bảng so sánh** (`S1`).
