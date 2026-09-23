# Empty state

Nguồn: `new-tab-todo/src/features/reminders/components/reminders-widget.tsx`

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
- **Không thêm `opacity-70`.** `--muted` đã sát ngưỡng (5.3:1), mờ thêm 70% là tụt xuống ~2.9:1, trượt 4.5:1 của chữ 14px. Chữ đã mờ bằng màu thì đừng mờ thêm bằng opacity (sửa 22/09/2026).
- `py-6` cho khối trống một chiều cao vừa phải, để card không xẹp xuống rồi bung lên khi dữ liệu về.
- Câu chữ mô tả đúng bối cảnh đang lọc ("ở mục này"), không phải câu chung chung "Không có dữ liệu".
- **Lọc ra 0 kết quả là trạng thái rỗng, không phải lỗi.** Không viền đỏ ô lọc, không câu đỏ: người dùng chưa nhập sai gì, khoảng lọc vẫn hợp lệ (`M30`: `red` chỉ dành cho cái phải sửa mới đi tiếp được). Vẫn là một dòng chữ mờ, đặt ở **chỗ đáng lẽ có kết quả**, và nói luôn cách nới lọc: "Không có sản phẩm nào từ 47.500.000 đ. Hạ giá Từ xuống để xem thêm." (đã dính 23/09/2026: thanh trượt khoảng giá tô đỏ cả hai ô).
- Trạng thái đang tải: **dữ liệu đọc từ máy** (localStorage, state sẵn có) thì cùng công thức, chỉ khác chữ, không skeleton, không spinner. **Dữ liệu qua mạng** thì dùng khung chờ đúng hình, xem mục dưới.

Chỉ dựng empty state có hình và CTA khi đó là màn hình chính của cả app và người
dùng lần đầu vào chưa có gì để làm. Trong một widget hay một tab thì không.

---

## Cột rỗng khác danh sách rỗng

Danh sách rỗng thì một dòng chữ mờ là xong. **Cột rỗng trong một board thì
không**, vì cột vẫn phải nhìn ra được là một vùng thả.

```html
<li class="flex min-h-[7rem] items-center justify-center rounded-xl bg-background/60 px-3">
  <p class="text-center text-xs text-muted">Chưa có việc nào</p>
</li>
```

- **Giữ chiều cao tối thiểu** `min-h-[7rem]`, đủ để thấy vùng thả và để các cột không cao thấp lệch nhau quá.
- Nền chìm hơn nền cột một bậc, để đọc ra đây là chỗ trống chứ không phải thẻ.
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
