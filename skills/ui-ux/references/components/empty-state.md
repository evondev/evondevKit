# Empty state

Nguồn: `new-tab-todo/src/features/reminders/components/reminders-widget.tsx`

```tsx
{isLoading ? (
  <p className="py-6 text-center text-sm text-muted">Đang tải…</p>
) : visibleReminders.length === 0 ? (
  <p className="py-6 text-center text-sm text-muted opacity-70">
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

- Đúng một câu, `text-sm text-muted opacity-70`. Không tiêu đề, không hình, không icon, không nút.
- `py-6` cho khối trống một chiều cao vừa phải, để card không xẹp xuống rồi bung lên khi dữ liệu về.
- Câu chữ mô tả đúng bối cảnh đang lọc ("ở mục này"), không phải câu chung chung "Không có dữ liệu".
- Trạng thái đang tải cũng cùng công thức, chỉ khác chữ. Không skeleton, không spinner cho một danh sách đọc từ máy.

Chỉ dựng empty state có hình và CTA khi đó là màn hình chính của cả app và người
dùng lần đầu vào chưa có gì để làm. Trong một widget hay một tab thì không.

---

## Cột rỗng khác danh sách rỗng

Danh sách rỗng thì một dòng chữ mờ là xong. **Cột rỗng trong một board thì
không**, vì cột vẫn phải nhìn ra được là một vùng thả.

```html
<li class="flex min-h-[7rem] items-center justify-center rounded-xl bg-background/60 px-3">
  <p class="text-center text-xs text-muted opacity-70">Chưa có việc nào</p>
</li>
```

- **Giữ chiều cao tối thiểu** `min-h-[7rem]`, đủ để thấy vùng thả và để các cột không cao thấp lệch nhau quá.
- Nền chìm hơn nền cột một bậc, để đọc ra đây là chỗ trống chứ không phải thẻ.
- Vẫn chỉ một dòng chữ. Không icon, không nút "thêm việc đầu tiên".

Cùng nguyên tắc cho ô rỗng trong lịch, và cho khung kéo thả tệp. Đây cũng là hai
chỗ hiếm hoi `border-dashed` được dùng, xem luật `F21` trong `../rules-form.md`.
