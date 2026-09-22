# Bố cục form và xác thực

Không có wireframe thì dựng bố cục mặc định (hoặc cái mà điều kiện trong đề
chọn), rồi báo một dòng lúc giao. Xem câu 4 trong `../../SKILL.md`.

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
        │ nhãn   quên mk? │
        │ [ô nhập       ] │
        │ (chỗ câu lỗi)   │
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

## Mặc định cho màn xác thực — dựng luôn, báo một dòng

**Đừng hỏi bốn câu.** Người dùng gõ "dựng màn đăng nhập" là muốn thấy màn đăng
nhập, không muốn làm một bài khảo sát. Dựng theo mặc định dưới đây, rồi **nói
một dòng** cho họ biết mình đã chọn gì.

| Thứ | Mặc định | Vì sao |
| --- | --- | --- |
| **"Quên mật khẩu?"** | **Có** | Thiếu nó thì người quên mật khẩu không còn đường nào vào. Đây là phần tử duy nhất mà thiếu là hỏng chức năng, không phải hỏng thẩm mỹ |
| **Ghi nhớ đăng nhập** | **Không** | Nó đổi thời hạn phiên ở **backend**, không phải chỉ là cái checkbox. Vẽ ra mà backend không làm gì là lừa người dùng — sai nhiều hơn là thiếu |
| **Đăng nhập mạng xã hội** | **Không** | Phải có backend và nhà cung cấp cụ thể mới có nghĩa, mà cái đó thì không đoán được |
| **Kiểu placeholder** | **Câu hướng dẫn** (`T25`) | Xem `T25` cho ca ngoại lệ |
| **Chiều cao ô và nút** | **`h-12`** | Ngoại lệ duy nhất của `h-11 md:h-10` (`budgets.md`): form đứng một mình giữa trang, cả màn chỉ có nó, ô to hơn một bậc là hợp. Form trong app, modal, cài đặt thì không |

**Dòng báo, đặt chung với dòng báo bố cục lúc giao:**

> Mình sẽ dựng kèm "Quên mật khẩu?", chưa có ghi nhớ đăng nhập và đăng nhập mạng
> xã hội (hai cái đó cần backend). Muốn khác thì nói.

Một dòng, không phải một bảng câu hỏi. Người dùng **không nhắc gì** thì coi như
đồng ý, dựng theo mặc định, đi tiếp.

**Họ nói muốn thêm thì thêm ngay, đừng hỏi lại.** "Thêm remember me" là đủ rõ —
dựng luôn, không hỏi "bro muốn tích sẵn không, đặt ở đâu". Mặc định phần dưới
đã trả lời hết mấy câu đó rồi.

### Ghi nhớ đăng nhập — khi họ yêu cầu

- **Không tích sẵn.** Tích sẵn là quyết định hộ người dùng về bảo mật.
- Nhãn **"Ghi nhớ đăng nhập"**, đừng dịch thẳng "Nhớ tôi" — tiếng Việt đọc ra như máy dịch (`T24`).
- Đặt cùng hàng với "Quên mật khẩu?": checkbox trái, link phải.
- Nói một câu lúc giao: cái này cần backend đổi thời hạn phiên, không chỉ là checkbox.
- App có dữ liệu nhạy cảm hoặc hay dùng trên máy chung — ngân hàng, hồ sơ sức khoẻ, quản trị nội bộ — thì **nói một câu khuyên bỏ**, rồi vẫn làm theo ý họ.

---

## "Quên mật khẩu?"

**Nằm cùng hàng với nhãn "Mật khẩu", căn phải.** Không nằm dưới ô nhập, không
nằm dưới nút submit.

```html
<div class="flex items-center justify-between">
  <label for="password" class="w-fit cursor-pointer text-sm font-medium">Mật khẩu</label>
  <a href="/quen-mat-khau" class="text-sm text-foreground hover:underline">Quên mật khẩu?</a>
</div>
```

**Vì sao không để dưới ô nhập** — dòng đó đã có chủ: gợi ý lúc thường, câu lỗi
khi sai. Và "gõ sai mật khẩu" chính là lúc link này cần rõ nhất, nên hai thứ đạt
đỉnh cùng lúc ở cùng một chỗ. Hàng nhãn thì luôn chỉ có một dòng, không bao giờ
đụng.

**Vì sao không để dưới nút submit** — ở đó nó lẫn vào khu "hoặc / đăng nhập bằng
Google / chưa có tài khoản?", thành một link tình cờ nằm giữa một đống link.

Ba thông số:

| | Lấy gì | Vì sao |
| --- | --- | --- |
| Cỡ | `text-sm`, **bằng nhãn** | Cùng hàng mà lệch cỡ thì trông như canh hụt. Nhỏ hơn cũng làm vùng chạm mobile hẹp lại |
| Màu | `--foreground`, **không làm mờ** | Chữ nhạt đọc ra là đã bị khoá (`I8`). Đây là lối thoát duy nhất của người không vào được tài khoản — làm nó trông disabled là chặn đúng người đang cần |
| Độ đậm | `font-normal` (nhãn là `font-medium`) | Phân cấp bằng **một** thứ thôi. `M13`: thứ bậc đến từ cỡ chữ, độ đậm, màu chữ — dùng cả ba cùng lúc là thừa |

**Là link, không phải nút.** `I7` bắt "Xem tất cả" phải là nút, nhưng đó là luật
cho dashboard. Trong form mà thành nút thì nó cạnh tranh với nút đăng nhập nằm
ngay dưới. Có `cursor-pointer`, gạch chân khi hover.

---

## Nút đăng nhập mạng xã hội

Số lượng quyết định bố cục:

| Số nút | Bố cục |
| --- | --- |
| 1–2 | Xếp dọc, full width, có chữ: `Đăng nhập bằng Google` |
| **3 trở lên** | **A** bên dưới. Báo một dòng lúc giao: muốn xếp dọc đủ chữ thì nói |

Xếp dọc 3–4 nút full width thì phần mạng xã hội **dài hơn cả form thật**, và
người dùng phải cuộn qua một dãy nút giống hệt nhau mới thấy ô email. Thứ chính
của màn bị đẩy lên trên thành thứ phụ.

**A. Chia cột, chỉ icon** (mặc định khi có từ 3 nút)

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

**B. Vẫn xếp dọc, đủ chữ** (chỉ khi người dùng yêu cầu)

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
- **Câu lỗi không được trùng chữ với placeholder hay nhãn.** Trùng là dấu hiệu nó không mang thêm thông tin nào — xem mục dưới.
- Gợi ý thời điểm (người dùng quyết): hiện lỗi sau khi rời ô hoặc bấm gửi, đừng hiện ngay ký tự đầu tiên. Skill chỉ lo lỗi **trông ra sao**, dựng nó như một trạng thái tĩnh của ô.
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

---

## Gợi ý và câu lỗi là hai thứ khác nhau

Một field có **ba** chỗ chứa chữ, mỗi chỗ một việc. Lẫn lộn chúng là lỗi hay gặp
nhất ở form, và nhìn ảnh chụp rất khó nhận ra vì "trông vẫn đủ chữ".

| Chỗ | Việc | Màu | Khi nào hiện |
| --- | --- | --- | --- |
| **Nhãn** | Ô này là gì | `--foreground` | Luôn |
| **Gợi ý** | Thứ người dùng chưa biết trước khi gõ | `--muted`, `text-xs` | Luôn |
| **Câu lỗi** | Vừa gõ sai cái gì, sửa thế nào | đỏ, `text-xs` | Chỉ khi sai |

**Dưới ô chỉ có MỘT dòng.** Có lỗi thì câu lỗi **thay chỗ** gợi ý, không đẩy gợi
ý xuống thành hai dòng chồng nhau.

### Ba câu hỏi trước khi viết một dòng chữ đỏ

1. **Câu này có trùng chữ với placeholder hoặc nhãn không?** Trùng thì bỏ. Placeholder ghi "Nhập mật khẩu của bạn" mà chữ đỏ dưới ô cũng ghi "Nhập mật khẩu của bạn" thì người dùng đọc hai lần cùng một câu, và vẫn không biết mình sai ở đâu.
2. **Nó nói người dùng LÀM GÌ tiếp, hay chỉ nói ô đang trống?** Mắt đã thấy ô trống rồi.
3. **Nó có phải lỗi không, hay là gợi ý bị tô nhầm màu đỏ?** "Nhập email bạn dùng để đăng nhập" là gợi ý — nó đúng cả khi người dùng chưa làm gì sai. Gợi ý thì xám và hiện sẵn, đừng đợi có lỗi mới đỏ lên.

### Ô trống thì viết gì

| Ô | Sai | Đúng |
| --- | --- | --- |
| Email | `Nhập email của bạn` *(trùng placeholder)* | `Chưa nhập email` |
| Mật khẩu | `Nhập mật khẩu của bạn` *(trùng placeholder)* | `Chưa nhập mật khẩu` |
| Email sai định dạng | `Email không hợp lệ` | `Email phải có dấu @` |
| Mật khẩu ngắn | `Mật khẩu không hợp lệ` | `Mật khẩu cần ít nhất 8 ký tự` |
| Sai thông tin đăng nhập | `Đăng nhập thất bại` | `Email hoặc mật khẩu chưa đúng` |

Dòng cuối là ca riêng: nói rõ sai cái nào **là lỗ hổng bảo mật** — người ngoài dò
được email nào có tài khoản. Nên ở đúng ca này thì mơ hồ là cố ý, và câu lỗi đặt
ở banner đầu form chứ không dưới một ô cụ thể.
