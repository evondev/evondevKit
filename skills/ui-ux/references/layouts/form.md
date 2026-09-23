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
| **Placeholder** | **Không có** (`T25`) | Email, mật khẩu: nhãn đã đủ, placeholder chỉ chép lại nhãn |
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

**C. Nhiều bước** (khi **các bước phụ thuộc nhau** hoặc là luồng làm một lần: onboarding, thanh toán, đăng ký hồ sơ. Form dài mà các phần độc lập thì dùng kiểu B có mục, như trang cài đặt của Stripe, GitHub — số trường nhiều không phải lý do chia bước)

Thanh bước ở trên, mỗi bước một màn, nút "Quay lại" và "Tiếp" ở đáy. Không dùng
nhiều bước cho form ngắn, nó chỉ làm chậm.

**Thanh các bước:**

```
(✓)━━━━━━━━━━━━(2)──────────────( 3 )
Thông tin công ty  **Người liên hệ**  Xác nhận
Tên, mã số thuế…   Họ tên, email…     Kiểm tra lại rồi gửi
```

| Trạng thái | Vòng `size-8 rounded-full` | Nhãn | Đường nối phía sau |
| --- | --- | --- | --- |
| Đã xong | nền `primary`, icon `check` `size-4` `primary-foreground` | `text-foreground` | `h-0.5 bg-primary` |
| Đang làm | `border-2 border-foreground`, số `font-semibold` | `font-semibold text-foreground` | `h-0.5 bg-border` |
| Chưa tới | nền `bg-background`, số `text-muted` | `text-muted` | `h-0.5 bg-border` |
| Có lỗi | nền `bg-red-600`, chữ `!` `text-sm font-bold text-white` (ký tự, không icon) | `text-red-700`, mô tả thay bằng câu lỗi `text-red-600` | như trạng thái của nó |

- **Vòng lỗi là vòng đặc đỏ với dấu `!`, không phải vòng viền đỏ bọc icon `circle-alert`.** Icon đó tự có một vòng tròn, đặt vào vòng viền thành hai vòng lồng nhau, nhìn rối và nhỏ xíu (đã dính 22/09/2026). Vòng đặc cùng khuôn với bước đã xong (đặc + ký hiệu), chỉ đổi màu và ký hiệu.
- Dựng bằng `<ol>`, bước đang làm có `aria-current="step"`. Mô tả dưới nhãn `text-sm text-muted text-pretty`, cho xuống dòng, không `truncate` ở màn rộng. Thiếu `text-pretty` là trơ một chữ ở dòng cuối (đã dính 22/09/2026 ở bản dọc).
- **Bước đã xong bấm được để quay lại** (vòng + nhãn là một nút, `cursor-pointer`, hover nhãn gạch chân). Bước chưa tới không bấm được. Có cho nhảy cóc tới bước chưa tới hay không là logic, người dùng quyết.
- **Màn hẹp dưới `sm` thu gọn**, không cố nhét ba cột: một dòng "Bước 2 / 3 · Người liên hệ" `text-sm font-medium` + một thanh mảnh `h-1` chia đoạn theo số bước. Đoạn bước đã xong `bg-primary`, **đoạn bước đang làm `bg-primary/30`** (nửa đậm), chưa tới `bg-border`. Ba tầng như ba kiểu vòng ở màn rộng. Không tô đậm đủ đoạn đang làm: đứng ở bước cuối sẽ trông y như đã xong hết. Cũng không để đoạn đang làm xám như chưa tới: chữ ghi "Bước 2 / 3" mà thanh chỉ sáng một đoạn, đọc như thanh bị thiếu (đã dính cả hai chiều 22/09/2026). **Tên bước được xuống dòng**, `text-pretty`, không `truncate`: tên bước là thứ người dùng cần đọc (`N8`), và đổi bước là đổi cả màn nên dòng chữ cao thêm một dòng không tính là nhảy (`N1`). Cụm "Bước 2 / 3 ·" `whitespace-nowrap` để không bị bẻ đôi. Mô tả ẩn. Không để các cột bước wrap thành hai hàng (`R6`). Có bước lỗi thì đoạn của bước đó đỏ, và **thêm một dòng `text-xs text-red-600` dưới thanh nói bước nào sai** ("Bước 1 còn thiếu mã số thuế"), bấm được để quay lại. Chỉ có đoạn đỏ mà không có chữ thì màn hẹp không biết sai ở đâu.
- Không quá 5 bước. Hơn nữa là form đang cần gộp bước lại.

---

## Trạng thái lỗi

Lỗi hiện **dưới ô nhập**, không hiện trong placeholder, không hiện ở tooltip.

```
nhãn
[ô nhập                    ]   <- viền đỏ đặc; quầng đỏ mờ chỉ khi đang focus
Email này đã có người dùng     <- chữ đỏ, text-xs, ngay dưới ô
```

- Viền `red-500` đặc, ring `red-500/10` rất mờ. Không tô nền đỏ cả ô.
- Câu lỗi nói **cách sửa**, không nói "không hợp lệ". "Email này đã có người dùng" chứ không phải "Email không hợp lệ".
- **Câu lỗi không được trùng chữ với placeholder hay nhãn.** Trùng là dấu hiệu nó không mang thêm thông tin nào — xem mục dưới.
- Gợi ý thời điểm (người dùng quyết): hiện lỗi sau khi rời ô hoặc bấm gửi, đừng hiện ngay ký tự đầu tiên. Skill chỉ lo lỗi **trông ra sao**, dựng nó như một trạng thái tĩnh của ô.
- **Sửa xong một ô thì câu lỗi mất, nhưng chỗ của nó ở lại** tới lần bấm gửi sau (`min-h-5` trên dòng dưới ô). Rút câu lỗi đi ngay thì mọi ô bên dưới nhảy lên 20px đúng lúc người dùng đang đưa chuột xuống ô kế tiếp (`N1`, đã dính 23/09/2026 ở form tạo công việc). Ô nào có sẵn dòng gợi ý thì không cần: gợi ý quay về đúng chỗ câu lỗi vừa rời.
- **Mặc định: chỉ lỗi tại chỗ, không banner tóm tắt.** Bấm gửi mà có lỗi thì cuộn tới và **focus ô lỗi đầu tiên**; mỗi ô sai viền đỏ + một câu dưới ô. Đây là cách của Linear, Stripe, GitHub. Banner liệt kê lỗi trên một form thường chỉ đọc lại đúng mấy câu đã nằm dưới từng ô: hai tín hiệu cho một ý (`N3`), và cả màn đỏ rực (đã dính 23/09/2026: form tạo công việc 6 trường, banner 4 dòng lặp y 4 câu lỗi; chủ dự án: "thực tế có ai làm mục đỏ ở trên đâu"). Luật cũ "form dài hơn một màn thì có banner" sai, vì ở 375px form nào cũng dài hơn một màn.
- **Banner chỉ dùng cho hai ca:**
  1. **Lỗi không gắn với ô nào**: mất mạng, hết phiên, không có quyền, trùng dữ liệu phía máy chủ. Banner một dòng nói chuyện gì và làm gì tiếp, không liệt kê.
  2. **Form rất dài, chia nhiều mục có tiêu đề** (từ khoảng 12 trường, hoặc phải cuộn qua nhiều mục): lỗi ở mục cuối không thể thấy khi đang đứng ở đầu. Lúc đó banner liệt kê từng lỗi kèm link nhảy tới đúng ô, và **vẫn giữ** lỗi tại chỗ.

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
ở chỗ câu lỗi trên nút Đăng nhập (xem khung wireframe đăng nhập ở đầu file) chứ không dưới một ô cụ thể.
