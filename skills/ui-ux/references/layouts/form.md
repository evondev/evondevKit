# Bố cục form và xác thực

Chưa có skeleton thì đưa 2-3 phương án cho chọn, kèm một câu vì sao mình nghiêng
về cái nào.

---

## Đăng nhập, đăng ký

**A. Một cột giữa màn** (mặc định, hợp mọi trường hợp)

```
        ┌─────────────────┐
        │ logo            │
        │ Tiêu đề         │
        │ câu dẫn 1 dòng  │
        │                 │
        │ nhãn            │
        │ [ô nhập       ] │
        │ nhãn            │
        │ [ô nhập       ] │
        │        quên mk? │
        │ [   NÚT       ] │
        │ ─── hoặc ───    │
        │ [ nút Google  ] │
        │ chưa có tk? Tạo │
        └─────────────────┘
```

Khối rộng `max-w-md`. **Không viền** — đây là card đứng một mình, xem `M29`.
Không căn giữa chữ trong form, chỉ căn giữa cả khối.

**B. Hai cột, form trái ảnh phải** (hợp khi muốn chèn lời chứng thực hoặc ảnh sản phẩm)

```
┌──────────────┬──────────────┐
│ form như A   │  ảnh / trích │
│              │  dẫn khách   │
└──────────────┴──────────────┘
```

---

## Nút đăng nhập mạng xã hội

Số lượng quyết định bố cục, và **từ 3 nút trở lên thì phải hỏi**, đừng tự xếp:

| Số nút | Bố cục |
| --- | --- |
| 1–2 | Xếp dọc, full width, có chữ: `Đăng nhập bằng Google` |
| **3 trở lên** | **Hỏi người dùng**, đưa hai phương án dưới đây rồi chờ chọn |

Xếp dọc 3–4 nút full width thì phần mạng xã hội **dài hơn cả form thật**, và
người dùng phải cuộn qua một dãy nút giống hệt nhau mới thấy ô email. Thứ chính
của màn bị đẩy lên trên thành thứ phụ.

**A. Chia cột, chỉ icon** (nghiêng về cái này khi có từ 3 nút)

```
        │ [   Đăng nhập   ]  │
        │ ─── hoặc ───       │
        │ [ G ] [ GH ] [ X ] │
        └────────────────────┘
```

- Nút vuông, cao bằng ô nhập, chia đều `grid-cols-3`.
- **Bắt buộc có `aria-label`** — không có chữ thì trình đọc màn hình chỉ thấy một cái nút trống.
- Logo giữ màu gốc theo `F16`, đừng tô xám cho "đồng bộ".
- Quá 4 nút thì không xếp một hàng nữa: giữ 2–3 cái dùng nhiều nhất, phần còn lại bỏ hẳn.

**B. Vẫn xếp dọc, đủ chữ** (hợp khi người dùng ít rành công nghệ, hoặc logo dễ nhầm)

Chữ đầy đủ đọc rõ hơn icon trần, đổi lại tốn chiều dọc. Chọn B thì nói rõ
đánh đổi đó lúc giao.

**Nhớ đâu là cái chính.** Ô email và nút đăng nhập là nhân vật chính của màn,
khối mạng xã hội là đường tắt. Khối tắt mà chiếm nhiều chỗ hơn đường chính thì
bố cục đã sai, dù từng nút đều đẹp.

---

## Đánh dấu trường bắt buộc

Người dùng phải biết trường nào bắt buộc **trước khi** bấm gửi, không phải sau
khi bị báo lỗi. Chọn một trong hai cách theo tỉ lệ, đừng dùng cả hai:

| Tình huống | Cách đánh dấu |
| --- | --- |
| Đa số trường bắt buộc | Ghi `Không bắt buộc` bên cạnh nhãn của số ít trường tuỳ chọn |
| Đa số trường tuỳ chọn | Ghi dấu `*` sau nhãn của trường bắt buộc, kèm một dòng chú thích ở đầu form |

Dấu `*` dùng `text-muted`, không tô đỏ. Đỏ để dành cho lỗi thật, đánh dấu bắt
buộc mà đỏ sẵn thì lúc có lỗi không còn gì để nhấn.

---

## Form nhiều trường

**A. Một cột dọc** (mặc định, dưới 8 trường)

Nhãn nằm trên ô nhập, không nằm cạnh. Trường liên quan nhau thì gom nhóm, cách
nhóm khác bằng khoảng trắng lớn hơn, không bằng đường kẻ.

**B. Chia mục có tiêu đề** (từ 8 trường trở lên)

```
Thông tin cá nhân
[ô] [ô]
[ô           ]

Địa chỉ
[ô           ]
[ô] [ô] [ô]

              [Huỷ] [LƯU]
```

Nút hành động nằm cuối, căn phải, primary bên phải cùng.

**C. Nhiều bước** (khi có trên 15 trường hoặc các bước phụ thuộc nhau)

Thanh bước ở trên, mỗi bước một màn, nút "Quay lại" và "Tiếp" ở đáy. Không dùng
nhiều bước cho form ngắn, nó chỉ làm chậm.

---

## Trạng thái lỗi

Lỗi hiện **dưới ô nhập**, không hiện trong placeholder, không hiện ở tooltip.

```
nhãn
[ô nhập                    ]   <- viền đỏ đặc, ring đỏ rất mờ
Email này đã có người dùng     <- chữ đỏ, text-xs, ngay dưới ô
```

- Viền `red-500` đặc, ring `red-500/10` rất mờ. Không tô nền đỏ cả ô.
- Câu lỗi nói **cách sửa**, không nói "không hợp lệ". "Email này đã có người dùng" chứ không phải "Email không hợp lệ".
- Chỉ hiện lỗi sau khi người ta rời khỏi ô hoặc bấm gửi, không hiện ngay khi vừa gõ ký tự đầu.
- **Form dài hơn một màn thì phải có banner tóm tắt lỗi ở đầu**, liệt kê từng lỗi kèm link nhảy tới đúng trường đó. Banner **không thay thế** lỗi hiện tại chỗ, phải có cả hai. Form ngắn gọn trong một màn thì không cần banner, vì mắt thấy hết rồi.

```html
<div role="alert" class="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
  <p class="text-sm font-medium text-red-700">Chưa gửi được, còn 3 chỗ cần sửa</p>
  <ul class="mt-2 space-y-1 text-sm text-red-600">
    <li><a href="#tieu-de" class="underline underline-offset-2">Tiêu đề</a>, chưa điền</li>
  </ul>
</div>
```

Đây là chỗ duy nhất được tô nền đỏ. Ô nhập thì không bao giờ.
