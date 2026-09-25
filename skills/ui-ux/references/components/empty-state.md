# Empty state

Nguồn: widget nhắc việc của một dự án thật.

```tsx
{isLoading ? (
  <p className="py-6 text-center text-sm text-muted">Đang tải…</p>
) : visibleReminders.length === 0 ? (
  <p className="py-6 text-center text-sm text-muted">
    Chưa có nhắc nào ở mục này
  </p>
) : (
  <ul className="flex flex-col">…</ul>
)}
```

**Vì sao ổn**

Đây là chỗ AI bịa lộ liễu nhất. Mặc định nó dựng một khối to đùng: hình minh hoạ,
tiêu đề `text-xl font-bold`, một đoạn động viên, rồi một nút CTA. Kết quả là ô
trống lại nổi hơn ô có dữ liệu.

Bản đúng là **một dòng chữ mờ**:

- Đúng một câu, `text-sm text-muted`. Không tiêu đề, không hình, không icon, không nút.
- **Không thêm `opacity-70`.** `--muted` đã sát ngưỡng (4.95:1), mờ thêm 70% là tụt xuống ~2.8:1, trượt 4.5:1 của chữ 14px. Chữ đã mờ bằng màu thì đừng mờ thêm bằng opacity (sửa 22/09/2026).
- `py-6` cho khối trống một chiều cao vừa phải, để card không xẹp xuống rồi bung lên khi dữ liệu về.
- Câu chữ mô tả đúng bối cảnh đang lọc ("ở mục này"), không phải câu chung chung "Không có dữ liệu".
- **Lọc ra 0 kết quả là trạng thái rỗng, không phải lỗi.** Không viền đỏ ô lọc, không câu đỏ: người dùng chưa nhập sai gì, khoảng lọc vẫn hợp lệ (`M30`: `red` chỉ dành cho cái phải sửa mới đi tiếp được). Vẫn là một dòng chữ mờ, đặt ở **chỗ đáng lẽ có kết quả**, và nói luôn cách nới lọc: "Không có sản phẩm nào từ 47.500.000 đ. Hạ giá Từ xuống để xem thêm." (đã dính 23/09/2026: thanh trượt khoảng giá tô đỏ cả hai ô).
- Trạng thái đang tải: **dữ liệu đọc từ máy** (localStorage, state sẵn có) thì cùng công thức, chỉ khác chữ, không skeleton, không spinner. **Dữ liệu qua mạng** thì dùng khung chờ đúng hình, xem mục dưới.

Chỉ dựng empty state có hình và CTA khi đó là màn hình chính của cả app và người
dùng lần đầu vào chưa có gì để làm. Trong một widget hay một tab thì không.

**Người dùng là người mở đầu** (khung chat mới) thì không dùng câu báo rỗng: đưa 2–3
việc bấm được ngay, vẫn không hình không tiêu đề (`N6`, `chat.md`).

## Rỗng do lọc: câu nói đúng điều đang lọc, và có lối ra

Ngoại lệ của "không nút": danh sách rỗng **vì người dùng đang tìm hay lọc** thì người
đó tự dẫn mình vào ngõ cụt, phải có lối ra ngay tại chỗ (`N6`). Vẫn một dòng mờ, thêm
**một link chữ** ngay sau câu, không nút đặc, không hình:

```tsx
<p className="py-6 text-center text-sm text-muted">
  Không có khách hàng nào khớp {quotedQuery}. Thử từ khoá khác.{" "}
  <Button variant="ghost" onClick={clearFilters}
    className="inline h-auto p-0 align-baseline font-medium text-foreground underline-offset-4 hover:bg-transparent hover:underline">
    Xoá tìm kiếm
  </Button>
</p>
```

- **Câu theo đúng thứ đang lọc**: chỉ từ khoá thì nhắc lại từ khoá và "Thử từ khoá khác." (không "ngắn hơn": gõ "zzzz" 4 ký tự mà bảo gõ ngắn hơn là vô lý); chỉ chip thì "Không có khách hàng nào có nhãn này. Bỏ bớt nhãn để xem thêm."; cả hai thì câu chung. Đừng khuyên "bỏ bớt nhãn" khi không nhãn nào đang chọn (đã dính 25/09/2026).
- **Từ khoá dài cắt bằng số ký tự trong JS, không bằng CSS**: giữ ~24 ký tự + `…`, cặp ngoặc kép dính liền từ khoá (`"Công ty cổ phần thươ…"`), từ khoá đủ trong `title`. Cắt bằng `truncate` trên span nội tuyến thì dấu mở ngoặc rơi xuống cuối dòng trên và hở một khoảng trước dấu đóng (đã dính 25/09/2026). Từ khoá tô `--foreground`, phần câu còn lại `text-muted`.
- Link đổi chữ theo thứ nó gỡ: "Xoá tìm kiếm" (chỉ từ khoá), **"Xoá lọc"** (có chip) — **cùng chữ với nút "Xoá lọc" cuối hàng chip**, vì hai nút làm cùng một việc; hai chữ khác nhau ("Xoá lọc" / "Xoá bộ lọc") là bắt người dùng đoán chúng có khác nhau không (`N6`, đã dính 25/09/2026). Bấm là gỡ hết, trả tiêu điểm về ô tìm.
- Link màu `--foreground`, không màu nhấn: đây là lối ra, không phải hành động chính của trang.
- Hàng tiêu đề bảng giữ nguyên (để người dùng thấy mình vẫn ở bảng nào) nhưng **ẩn checkbox chọn tất cả**: chọn tất cả của 0 dòng là nút vô nghĩa.

---

## Cột rỗng khác danh sách rỗng

Danh sách rỗng thì một dòng chữ mờ là xong. **Cột rỗng trong một board thì
không**, vì cột vẫn phải nhìn ra được là một vùng thả.

```html
<li class="flex min-h-[7rem] items-center justify-center rounded-2xl border border-dashed border-foreground/15 px-3">
  <p class="text-center text-sm text-muted">Chưa có việc nào</p>
</li>
```

- **Giữ chiều cao tối thiểu** `min-h-[7rem]`, đủ để thấy vùng thả và để các cột không cao thấp lệch nhau quá.
- **Viền đứt, không nền.** Cột kanban nằm thẳng trên nền trang, nên "nền chìm hơn một bậc" thành một mảng xám đặc, là khối nặng nhất cả board, nặng hơn mọi thẻ có việc (đã dính 24/09/2026). Viền đứt nói "chỗ để thả" mà không có khối (`F21` cho phép đúng chỗ này). Viền `foreground/15`, không `--border-strong`: `#eaeaea` trên nền trang `#f4f4f6` chỉ chênh 1.05:1, khung trống biến mất. Bo `rounded-2xl` bằng thẻ, để khung trống cùng khuôn với thẻ sẽ rơi vào.
- Chữ `text-sm` như chữ phụ của thẻ, không `text-xs`; cùng câu với nhóm rỗng của view danh sách ("Chưa có việc nào", thêm "ở nhóm này" khi nằm giữa các nhóm).
- Vẫn chỉ một dòng chữ. Không icon, không nút "thêm việc đầu tiên".

Cùng nguyên tắc cho ô rỗng trong lịch, và cho khung kéo thả tệp. Đây cũng là hai
chỗ hiếm hoi `border-dashed` được dùng, xem luật `F21` trong `../rules-form.md`.

---

## Khung chờ (dữ liệu qua mạng)

Theo `I19`: khung chờ **đúng hình** dòng thật, để lúc dữ liệu về trang không nhảy.

```html
<ul aria-busy="true" class="divide-y divide-border">
  <li class="flex items-center gap-3 px-4 py-3">   <!-- cùng padding, cùng divide với dòng thật -->
    <div class="size-8 shrink-0 animate-pulse rounded-full bg-background motion-reduce:animate-none"></div>
    <div class="min-w-0 flex-1 space-y-2">
      <div class="h-3 w-2/5 animate-pulse rounded-full bg-background motion-reduce:animate-none"></div>
      <div class="h-3 w-1/4 animate-pulse rounded-full bg-background motion-reduce:animate-none"></div>
    </div>
    <div class="h-3 w-16 animate-pulse rounded-full bg-background motion-reduce:animate-none"></div>
  </li>
</ul>
<span class="sr-only" role="status">Đang tải danh sách khách hàng</span>
```

- **Mượn nguyên khuôn dòng thật**: cùng cỡ avatar, cùng padding, cùng đường chia `divide-y`. Dòng thật có đường chia mà khung chờ không có thì lúc dữ liệu về vẫn thấy cả khối đổi hình.
- **Thanh chữ cao `h-3`, chiều dài lệch nhau** giữa các dòng (`w-2/5`, `w-1/2`, `w-1/3`…). Dài bằng nhau thì trông như sọc kẻ, không giống chữ.
- Số dòng bằng số dòng mỗi trang, hoặc đủ lấp khung, không bịa 3 dòng cho một khung 10 dòng.
- **Bảng nhóm thì khung chờ bắt đầu bằng một hàng nhóm**, không thẳng vào dòng dữ liệu, kẻo lúc dữ liệu về cả bảng tụt một hàng (`../layouts/app.md`, mục Bảng nhóm theo trạng thái).
- `animate-pulse` luôn đi kèm `motion-reduce:animate-none`. Trình đọc màn hình không thấy khung, nên phải có `aria-busy` và một câu `sr-only`.

---

## Lỗi tải

```html
<div role="alert" class="flex flex-col items-center gap-3 py-10 text-center">
  <div>
    <p class="text-sm font-medium text-red-600">Không tải được danh sách khách hàng</p>
    <p class="mt-1 text-sm text-muted">Mất kết nối mạng</p>
  </div>
  <!-- Nút viền + icon rotate-cw theo I1: "Thử lại". Gọi gì là handler rỗng (onRetry). -->
</div>
```

- **Hai tầng như toast lỗi** (`../layouts/overlay.md`): tầng trên nói chuyện gì hỏng, `font-medium` `red-600` (`--error-text`, không `red-500`); tầng dưới `text-muted` nói vì sao. Không biết vì sao thì bỏ tầng dưới, đừng bịa.
- **Nút Thử lại là nút viền có icon** (`I1`), nằm ngay dưới chữ, căn giữa.
- Không icon to, không hình minh hoạ, không nền đỏ cả khối. Lỗi tải là tạm thời, bấm lại là xong, không cần hét lên.
- **Chữ rỗng và chữ lỗi cùng `py`**, để đổi qua lại giữa hai trạng thái thì khung không co giãn.
