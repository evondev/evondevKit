# Responsive

Mọi luật về màn hẹp gom hết ở đây. `rules-form.md` không lặp lại, chỉ trỏ sang.

**Ngưỡng kiểm là 375px.** Kiểm trước khi báo xong, không phải kiểm sau khi bị
chê. Vòng tra tấn bắt buộc nằm ở `checklist.md` cổng 3.

---

**R1. Trang không bao giờ được cuộn ngang.** Thân trang vừa khít mọi bề rộng, kể cả 375px.

Triệu chứng dễ nhận nhất: cuộn sang ngang thì thấy **một mảng trống** bên phải, vì có một phần tử nào đó rộng hơn màn đẩy cả trang ra. Thấy mảng trống đó là biết ngay có thứ gì đang tràn, đi tìm bằng cách bỏ dần `min-w-0` ra. Nội dung thật sự rộng thì cho cuộn trong khung riêng `overflow-x-auto`, đừng để nó đẩy cả trang. Kiểm ở 375px **trước khi** báo xong.

**R2. Lưới xuống một cột ở mobile.** Mặc định `grid-cols-1`, rồi mới `sm:grid-cols-2` và `lg:grid-cols-4`.

**R3. Không để phần tử rớt hàng lẻ.** Wrap mà còn dư một cái đứng một mình ở hàng dưới thì đọc ra là lỗi, không phải là thiết kế.

- **Cụm nút thì không bao giờ rớt hàng.** Tìm cách giữ trên một hàng: rút chữ, giảm `px`, hạ chiều cao. Không được nữa thì cho cả cụm xuống một cột, mỗi nút một hàng đầy đủ, chứ đừng để hai nút trên một nút dưới.
- **Lưới có số cột lẻ thì đi thẳng từ 1 lên số cột đó**, bỏ qua bậc giữa: `grid-cols-1 lg:grid-cols-3`, đừng chèn `sm:grid-cols-2` vì 3 mục chia 2 cột sẽ thành 2 trên 1 dưới.
- **Số cột chẵn thì wrap thoải mái**, 4 mục chia 2 cột ra 2 hàng đều nhau, không ai lẻ loi.

**R4. Nhịp ở mobile: card `p-4`, tối đa `p-5`.** Đừng mang `p-8` của màn rộng xuống màn hẹp, 32px lề mỗi bên trên màn 375px là ăn mất một phần năm bề ngang. Nút ở mobile hạ về `h-10` — **trừ nút nằm trong form**, cái đó phải giữ chiều cao
bằng ô nhập, xem `references/budgets.md`.

**R5. Chật là hỏng, không phải là đã responsive.** Thu nhỏ mà nội dung dồn cục, chữ vỡ ba bốn dòng, ảnh méo thì đó là chưa xử, không phải là xong. Cách xử, theo thứ tự nên thử:

1. Đổi hàng ngang thành xếp dọc.
2. Ảnh chữ nhật đổi thành **vuông nhỏ**, `h-16 w-16` hoặc `h-20 w-20`, đừng giữ tỉ lệ ngang rồi bóp lại.
3. Giảm cỡ chữ một bậc.
4. Cắt tiêu đề còn tối đa hai dòng bằng `line-clamp-2`.

Và luôn giữ: **ngày tháng, nhãn phụ phải nhỏ hơn tiêu đề ít nhất một bậc.** Tiêu đề `text-sm` thì ngày `text-xs`. Bằng nhau là mắt không biết đọc cái nào trước.

**R6. Ngoại lệ của R1 và R2: thứ tự tuyến tính thì không được wrap.** Board trạng thái, các bước quy trình, dòng thời gian, hàng chip lọc, hàng tab đều thuộc loại này. Xếp thành hai hàng thì mắt đọc theo hình chữ Z và mất dòng chảy; bốn chip ở 375px thì ba cái một hàng và một cái rớt xuống đứng lẻ, nhìn như lỗi. Cho cuộn ngang trong khung, mỗi phần tử `shrink-0`, cột kanban `w-[280px]`.

**Lề của vùng cuộn đặt trên hàng bên trong, không đặt trên khung cuộn.** Padding bên phải của khung `overflow-x-auto` bị nhiều trình duyệt bỏ qua khi cuộn tới cuối, nên phần tử cuối dính sát mép trong khi phần tử đầu vẫn có lề.

```html
<!-- Sai: cột cuối dính mép -->
<div class="overflow-x-auto px-3"><div class="flex gap-4">...</div></div>

<!-- Đúng -->
<div class="-mx-3 overflow-x-auto sm:-mx-5"><div class="flex gap-4 px-3 sm:px-5">...</div></div>
```

Cách khác cũng được: chèn phần tử đệm cuối hàng, `<div class="w-3 shrink-0 sm:w-5" aria-hidden="true"></div>`.

---

**R7. Chữ trong card ở mobile: tiêu đề `text-sm`, mô tả `text-sm`.** Card ở màn hẹp đã hẹp sẵn, `text-base` làm tiêu đề vỡ ba bốn dòng và mô tả đẩy card dài lê thê. Tới `sm` trở lên mới cho lên `text-base`.

**R8. Chữ GÕ ĐƯỢC không bao giờ xuống dưới 16px ở mobile.** `input`, `textarea`,
`select` — dưới 16px thì iOS **tự phóng to cả trang** khi chạm vào ô, và không
tự thu lại. Người dùng đang điền form bỗng thấy trang nhảy một cái rồi lệch hẳn.

```html
<input class="text-base md:text-sm" />
```

Đây là **ngoại lệ của `R7`**: chữ chỉ để đọc trong card thì hạ về `text-sm` ở
mobile, chữ gõ được thì không. Cùng lý do, ô nhập giữ `h-12` ở mọi bề rộng thay
vì thu nhỏ theo màn.

**R9. Bảng ở màn hẹp thì cuộn ngang, đừng bóp cột.** Đây là lỗi hay gặp nhất với bảng: để nguyên `<table>` co lại theo bề rộng màn, kết quả là mỗi ô chỉ còn vài chục pixel, chữ vỡ ba bốn dòng, cột nọ dính cột kia, đọc không ra gì.

```html
<div class="-mx-4 overflow-x-auto sm:-mx-6">
  <div class="min-w-[44rem] px-4 sm:px-6">
    <table class="w-full">…</table>
  </div>
</div>
```

- **`min-w`** cho khối bọc bảng, đủ để mọi cột thở. Không có nó thì bảng vẫn co.
- **`whitespace-nowrap`** cho ô ngày tháng, số, trạng thái. Chữ dài như tên hay mô tả thì cho xuống dòng bình thường.
- Lề đặt trên **khối bên trong**, không đặt trên khung cuộn. Xem R6.
- Cột quan trọng nhất, thường là cột đầu, có thể ghim bằng `sticky left-0` kèm nền `--surface`.

Đây là ngoại lệ hợp lệ của R1, cùng loại với R6: cuộn trong khung chứ không phải cả trang.

**R10. Tab hoặc chip quá nhiều ở màn hẹp thì rút chữ, không rút được thì gom vào dropdown.** Thứ tự nên thử:

1. **Rút chữ, nếu vẫn còn nghĩa.** "Đến hạn hôm nay" thành "Hôm nay". Mất nghĩa thì đừng rút.
2. **Cho cả hàng cuộn ngang**, xem R6. Hợp khi các mục ngang vai nhau.
3. **Gom vào một dropdown**, hiện mục đang chọn kèm mũi tên. Hợp khi có trên sáu mục, hoặc khi hàng cuộn ngang làm người ta không thấy hết lựa chọn.

Đừng để `flex-wrap`, đó là cách duy nhất sai trong ba cách trên.

---

## R8. Ở mobile thì hạ bậc, đừng bê nguyên nhịp desktop xuống

| | Mobile (dưới `sm`) | Từ `sm` trở lên |
| --- | --- | --- |
| Padding trang | `p-4` | `sm:p-6` |
| Padding card | `p-4`, tối đa `p-5` | xem `budgets.md` |
| Chiều cao nút | `h-10` | xem `budgets.md` |
| Tiêu đề trong card | `text-sm` | `text-base` |
| Mô tả trong card | `text-sm` | `text-sm` hoặc `text-base` tuỳ loại trang |
| Ngày tháng, nhãn phụ | `text-xs`, luôn nhỏ hơn tiêu đề một bậc | như trên |
| Ô nhập, textarea, select | **`text-base`, không hạ.** Dưới 16px thì iOS tự zoom | `md:text-sm` |

`p-8` là nhịp của màn rộng. Bê xuống 375px thì riêng lề đã ăn
mất một phần năm bề ngang.

---

## Thứ tự kiểm ở 375px

1. Trang có cuộn ngang không. Có là hỏng, trừ ngoại lệ R6.
2. Vùng nào cuộn ngang thì cuộn hết sang phải, phần tử cuối còn lề không.
3. Có cụm nút nào rớt hàng không, có phần tử nào đứng lẻ ở hàng dưới không.
4. Card còn `p-8` không.
5. Ngày tháng có nhỏ hơn tiêu đề không.
6. Nhìn tổng thể: có chỗ nào chật dồn cục không. Chật là chưa xong.
